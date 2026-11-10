import Foundation
import Capacitor
import WidgetKit

@objc(SueltaWidgetPlugin)
public class SueltaWidgetPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SueltaWidgetPlugin"
    public let jsName = "SueltaWidget"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "actualizarDatos", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "recargarWidgets", returnType: CAPPluginReturnPromise)
    ]

    @objc func actualizarDatos(_ call: CAPPluginCall) {
        let afirmacion = call.getString("afirmacion") ?? "Hoy suelto lo que no puedo controlar y elijo mi paz interior."
        let racha = call.getInt("racha") ?? 1
        let estilo = call.getString("estilo") ?? "afirmacion"

        if let defaults = UserDefaults(suiteName: "group.com.suelta.app") {
            defaults.set(afirmacion, forKey: "suelta_widget_afirmacion")
            defaults.set(racha, forKey: "suelta_widget_racha")
            defaults.set(estilo, forKey: "suelta_widget_estilo")
            defaults.synchronize()
        }

        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }

        call.resolve(["success": true])
    }

    @objc func recargarWidgets(_ call: CAPPluginCall) {
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.reloadAllTimelines()
        }
        call.resolve(["success": true])
    }
}
