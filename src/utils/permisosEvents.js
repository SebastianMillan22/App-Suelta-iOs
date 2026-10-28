// Evento global para solicitar la apertura del modal de permisos
// Se puede disparar desde cualquier punto de la app (useDictado, notificaciones, cámara, etc.)

export const EVENTO_ABRIR_GUIA_PERMISOS = "suelta:abrir-guia-permisos";

export function dispararGuiaPermisos(tipo = "microfono") {
  if (typeof window !== "undefined") {
    const evento = new CustomEvent(EVENTO_ABRIR_GUIA_PERMISOS, {
      detail: { tipo }
    });
    window.dispatchEvent(evento);
  }
}
