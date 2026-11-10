import WidgetKit
import SwiftUI

// Modelo de datos para la línea de tiempo del Widget
struct SueltaEntry: TimelineEntry {
    let date: Date
    let afirmacion: String
    let racha: Int
    let estilo: String
}

// Proveedor de datos que lee desde el App Group compartido
struct SueltaTimelineProvider: TimelineProvider {
    let appGroupId = "group.com.suelta.app"

    func placeholder(in context: Context) -> SueltaEntry {
        SueltaEntry(
            date: Date(),
            afirmacion: "Hoy suelto lo que no puedo controlar y elijo mi paz interior.",
            racha: 3,
            estilo: "afirmacion"
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (SueltaEntry) -> Void) {
        let entry = obtenerDatosCompartidos()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SueltaEntry>) -> Void) {
        let entry = obtenerDatosCompartidos()
        // Actualizar cada 2 horas o cuando la app principal lo solicite vía WidgetCenter
        let proximaActualizacion = Calendar.current.date(byAdding: .hour, value: 2, to: Date()) ?? Date().addingTimeInterval(7200)
        let timeline = Timeline(entries: [entry], policy: .after(proximaActualizacion))
        completion(timeline)
    }

    private func obtenerDatosCompartidos() -> SueltaEntry {
        let defaults = UserDefaults(suiteName: appGroupId)
        let afirmacionGuardada = defaults?.string(forKey: "suelta_widget_afirmacion")
        let rachaGuardada = defaults?.integer(forKey: "suelta_widget_racha") ?? 0
        let estiloGuardado = defaults?.string(forKey: "suelta_widget_estilo") ?? "afirmacion"

        let afirmacionFinal = (afirmacionGuardada != nil && !afirmacionGuardada!.isEmpty)
            ? afirmacionGuardada!
            : "Hoy suelto lo que no puedo controlar y elijo mi paz interior."

        let rachaFinal = rachaGuardada > 0 ? rachaGuardada : 1

        return SueltaEntry(
            date: Date(),
            afirmacion: afirmacionFinal,
            racha: rachaFinal,
            estilo: estiloGuardado
        )
    }
}

// Vistas en SwiftUI con la paleta de bienestar de ¡Suelta!
struct SueltaWidgetEntryView: View {
    var entry: SueltaTimelineProvider.Entry
    @Environment(\.widgetFamily) var family

    // Colores oficiales de Suelta
    let colorSalvia = Color(red: 0.247, green: 0.420, blue: 0.357) // #3F6B5B
    let colorCrema = Color(red: 0.980, green: 0.973, blue: 0.953)  // #FAF8F3
    let colorCoral = Color(red: 0.878, green: 0.478, blue: 0.373)  // #E07A5F
    let colorTextoOscuro = Color(red: 0.106, green: 0.173, blue: 0.141)

    var body: some View {
        ZStack {
            colorCrema

            switch family {
            case .systemSmall:
                vistaPequena
            case .systemMedium:
                vistaMediana
            default:
                vistaMediana
            }
        }
    }

    // Vista Tamaño Pequeño (1x1)
    var vistaPequena: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text("¡SUELTA!")
                    .font(.system(size: 11, weight: .heavy, design: .rounded))
                    .foregroundColor(colorSalvia)
                    .tracking(0.5)

                Spacer()

                HStack(spacing: 2) {
                    Text("🔥")
                        .font(.system(size: 11))
                    Text("\(entry.racha)d")
                        .font(.system(size: 11, weight: .bold, design: .rounded))
                        .foregroundColor(colorCoral)
                }
                .padding(.horizontal, 6)
                .padding(.vertical, 2)
                .background(colorCoral.opacity(0.12))
                .cornerRadius(8)
            }

            Spacer(minLength: 0)

            Text("“\(entry.afirmacion)”")
                .font(.system(size: 12, weight: .medium, design: .serif))
                .foregroundColor(colorTextoOscuro)
                .lineLimit(4)
                .multilineTextAlignment(.leading)
                .minimumScaleFactor(0.85)

            Spacer(minLength: 0)

            HStack {
                Circle()
                    .fill(colorSalvia)
                    .frame(width: 5, height: 5)
                Text("Paz Interior")
                    .font(.system(size: 9.5, weight: .semibold))
                    .foregroundColor(colorSalvia.opacity(0.85))
            }
        }
        .padding(14)
    }

    // Vista Tamaño Mediano (2x1)
    var vistaMediana: some View {
        HStack(spacing: 14) {
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 6) {
                    Text("¡SUELTA!")
                        .font(.system(size: 11, weight: .heavy, design: .rounded))
                        .foregroundColor(colorSalvia)
                        .tracking(0.5)

                    Text("•")
                        .foregroundColor(colorSalvia.opacity(0.5))

                    Text("AFIRMACIÓN DIARIA")
                        .font(.system(size: 9.5, weight: .bold))
                        .foregroundColor(colorSalvia.opacity(0.8))
                }

                Text("“\(entry.afirmacion)”")
                    .font(.system(size: 13.5, weight: .medium, design: .serif))
                    .foregroundColor(colorTextoOscuro)
                    .lineLimit(3)
                    .lineSpacing(2)
                    .multilineTextAlignment(.leading)
                    .minimumScaleFactor(0.9)

                Spacer(minLength: 0)

                HStack(spacing: 4) {
                    Image(systemName: "wind")
                        .font(.system(size: 10))
                        .foregroundColor(colorSalvia)
                    Text("Pausa, respira y suelta el control")
                        .font(.system(size: 10.5, weight: .medium))
                        .foregroundColor(colorSalvia.opacity(0.85))
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)

            VStack(spacing: 8) {
                VStack(spacing: 2) {
                    Text("🔥")
                        .font(.system(size: 20))
                    Text("\(entry.racha)")
                        .font(.system(size: 18, weight: .heavy, design: .rounded))
                        .foregroundColor(colorCoral)
                    Text("DÍAS")
                        .font(.system(size: 9, weight: .bold))
                        .foregroundColor(colorCoral.opacity(0.85))
                }
                .frame(width: 62, height: 68)
                .background(colorCoral.opacity(0.12))
                .cornerRadius(14)

                Text("TU RACHA")
                    .font(.system(size: 8.5, weight: .heavy))
                    .foregroundColor(colorTextoOscuro.opacity(0.6))
                    .tracking(0.5)
            }
            .padding(.trailing, 2)
        }
        .padding(16)
    }
}

// Configuración del Widget en iOS
@main
struct SueltaWidget: Widget {
    let kind: String = "SueltaWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: SueltaTimelineProvider()) { entry in
            SueltaWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Suelta — Bienestar Diario")
        .description("Tu afirmación diaria, recordatorios de respiración y racha de bienestar en tu pantalla de inicio.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
