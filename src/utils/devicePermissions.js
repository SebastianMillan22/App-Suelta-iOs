import { dispararGuiaPermisos } from "./permisosEvents";
import { solicitarPermisoNotificaciones } from "./nativeReminders.js";

// Utilidad integral para gestión de permisos nativos de Cámara, Micrófono y Notificaciones en Android / Móvil

export async function consultarPermisosDispositivo() {
  const estado = {
    microfono: "prompt",
    camara: "prompt",
    notificaciones: "default",
    soportaMedia: typeof navigator !== "undefined" && !!navigator.mediaDevices,
    soportaReconocimientoVoz: typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  };

  if (typeof window === "undefined") return estado;

  // Notificaciones
  if ("Notification" in window) {
    estado.notificaciones = Notification.permission;
  }

  // Permissions API si está disponible en Android
  if (navigator.permissions && navigator.permissions.query) {
    try {
      const micQuery = await navigator.permissions.query({ name: "microphone" });
      if (micQuery) estado.microfono = micQuery.state;
    } catch (e) {}

    try {
      const camQuery = await navigator.permissions.query({ name: "camera" });
      if (camQuery) estado.camara = camQuery.state;
    } catch (e) {}
  }

  return estado;
}

// Solicitar permiso nativo de micrófono
export async function solicitarPermisoMicrofono() {
  if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // Fallback a SpeechRecognition
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SR) return { ok: true, metodo: "speech_recognition" };
    return { ok: false, error: "El micrófono no está soportado en este dispositivo." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Detener las pistas inmediatamente tras obtener el permiso
    stream.getTracks().forEach((t) => t.stop());
    return { ok: true, metodo: "media_devices" };
  } catch (error) {
    console.warn("Permiso de micrófono no otorgado:", error);
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      dispararGuiaPermisos("microfono");
    }
    return { 
      ok: false, 
      error: error.name === "NotAllowedError" || error.name === "PermissionDeniedError" 
        ? "Permiso de micrófono denegado por el usuario o navegador." 
        : error.message 
    };
  }
}

// Solicitar permiso nativo de cámara
export async function solicitarPermisoCamara(facingMode = "user") {
  if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return { ok: false, error: "La cámara no está soportada en este dispositivo." };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } } 
    });
    // Detener las pistas inmediatamente tras obtener el permiso
    stream.getTracks().forEach((t) => t.stop());
    return { ok: true };
  } catch (error) {
    console.warn("Permiso de cámara no otorgado:", error);
    if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
      dispararGuiaPermisos("camara");
    }
    return { 
      ok: false, 
      error: error.name === "NotAllowedError" || error.name === "PermissionDeniedError"
        ? "Permiso de cámara denegado por el usuario o navegador." 
        : error.message 
    };
  }
}

// Tomar foto directamente con la cámara del dispositivo móvil
export function abrirSelectorCamaraNativa({ onFotoCapturada, facingMode = "user" }) {
  if (typeof document === "undefined") return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = facingMode === "user" ? "user" : "environment";
  input.style.display = "none";

  input.onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (onFotoCapturada && event.target.result) {
          onFotoCapturada(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
    input.remove();
  };

  document.body.appendChild(input);
  input.click();
}

/**
 * Solicita automáticamente todos los permisos del dispositivo (Notificaciones, Micrófono, Cámara)
 * de forma secuencial al iniciar sesión o ingresar a la aplicación para que todo quede 100% funcional.
 */
export async function solicitarTodosLosPermisosAutomaticos({ onEstadoPermisos = () => {} } = {}) {
  const resultados = {
    notificaciones: false,
    microfono: false,
    camara: false
  };

  try {
    // 1. Permiso de Notificaciones nativas
    try {
      const notifRes = await solicitarPermisoNotificaciones();
      resultados.notificaciones = !!notifRes?.ok || notifRes?.estado === "granted";
    } catch (e) {
      console.warn("Aviso solicitando permiso de notificaciones:", e);
    }

    // Pequeña pausa entre solicitudes para no saturar al sistema operativo Android
    await new Promise((r) => setTimeout(r, 400));

    // 2. Permiso de Micrófono
    try {
      const micRes = await solicitarPermisoMicrofono();
      resultados.microfono = !!micRes?.ok;
    } catch (e) {
      console.warn("Aviso solicitando permiso de micrófono:", e);
    }

    await new Promise((r) => setTimeout(r, 400));

    // 3. Permiso de Cámara
    try {
      const camRes = await solicitarPermisoCamara();
      resultados.camara = !!camRes?.ok;
    } catch (e) {
      console.warn("Aviso solicitando permiso de cámara:", e);
    }

    onEstadoPermisos(resultados);
  } catch (err) {
    console.warn("Error en solicitarTodosLosPermisosAutomaticos:", err);
  }

  return resultados;
}
