import { Capacitor } from "@capacitor/core";

/**
 * Sincroniza la afirmación y la racha con el WidgetKit nativo de iOS (App Group: group.com.suelta.app)
 */
export async function sincronizarWidgetNativo({ afirmacion, racha, estilo = "afirmacion" }) {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const plugin = Capacitor.Plugins?.SueltaWidget;
    if (plugin && typeof plugin.actualizarDatos === "function") {
      await plugin.actualizarDatos({
        afirmacion: afirmacion || "Hoy suelto lo que no puedo controlar y elijo mi paz interior.",
        racha: typeof racha === "number" && racha > 0 ? racha : 1,
        estilo: estilo || "afirmacion"
      });
    }
  } catch (err) {
    console.warn("Aviso sincronizando WidgetKit:", err);
  }
}

export default sincronizarWidgetNativo;
