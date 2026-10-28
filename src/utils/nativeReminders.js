// Utilidad nativa de Notificaciones, Recordatorios y Widgets para Android y PWA
import { LocalNotifications } from "./capacitorLocalNotifications.js";
import { dispararGuiaPermisos } from "./permisosEvents";

// Banco de afirmaciones bioemocionales para los recordatorios
export const AFIRMACIONES_RECORDATORIOS = [
  {
    titulo: "🌿 Momento de Soltar",
    mensaje: "Respira profundo: tu cuerpo está expresando lo que tu mente aprendió a guardar. Permítete liberar la tensión de hoy.",
    tipo: "afirmacion"
  },
  {
    titulo: "✨ Sintonía con tu Cuerpo",
    mensaje: "Haz una pausa de 1 minuto: relaja tus hombros, suelta la mandíbula y reconéctate con tu respiración natural.",
    tipo: "respiracion"
  },
  {
    titulo: "🔥 Tu Reto de 21 Días te Espera",
    mensaje: "Cada día de práctica reprograma tus patrones emocionales profundos. Toca para continuar tu práctica de hoy.",
    tipo: "reto"
  },
  {
    titulo: "📓 Espacio de Gratitud & Diario",
    mensaje: "Nombrar lo que sientes le da un lugar a tu sabiduría. Tómate 2 minutos para escribir en tu diario.",
    tipo: "diario"
  },
  {
    titulo: "🌸 Epigenética & Sanación",
    mensaje: "Tus células responden al estado de tu paz interior. Hoy eliges crear un ambiente interno de calma y seguridad.",
    tipo: "afirmacion"
  },
  {
    titulo: "🌬️ Pausa Somática 4-7-8",
    mensaje: "Inhala en 4, retén en 7 y exhala en 8. Regula tu sistema nervioso y regresa al centro.",
    tipo: "respiracion"
  }
];

export const CONFIG_RECORDATORIOS_INICIAL = {
  activo: true,
  modo: "horarios", // "horarios" | "intervalo"
  horarios: ["09:00", "15:00", "21:00"],
  intervaloHoras: 4,
  categorias: {
    afirmacion: true,
    respiracion: true,
    reto: true,
    diario: true
  },
  sonido: true,
  vibracion: true,
  ultimoEnvio: null,
  widgetInstalado: false
};

let swRegistration = null;

// Registro del Service Worker
export async function registrarServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    swRegistration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    console.log("Service Worker de ¡Suelta! registrado con éxito:", swRegistration.scope);
    return swRegistration;
  } catch (error) {
    console.warn("No se pudo registrar el Service Worker (esperado en algunos iframes):", error);
    return null;
  }
}

// Configurar canal de notificaciones nativo de Android (Requerido en Android 8.0+ y 13+)
export async function asegurarCanalNotificacionesAndroid() {
  try {
    if (LocalNotifications && typeof LocalNotifications.createChannel === "function") {
      await LocalNotifications.createChannel({
        id: "suelta_recordatorios",
        name: "Recordatorios de Bienestar ¡Suelta!",
        description: "Afirmaciones, prácticas bioemocionales y recordatorios diarios",
        importance: 4, // HIGH
        visibility: 1, // PUBLIC
        vibration: true,
        sound: undefined,
        lights: true,
        lightColor: "#3f6b5b"
      });
      console.log("Canal de notificaciones Android 'suelta_recordatorios' registrado con éxito.");
    }
  } catch (err) {
    console.warn("Aviso al crear canal de notificaciones Android:", err);
  }
}

// Obtener estado actual del permiso
export async function obtenerEstadoPermisoAsync() {
  try {
    if (LocalNotifications && typeof LocalNotifications.checkPermissions === "function") {
      const res = await LocalNotifications.checkPermissions();
      if (res && res.display) {
        return res.display; // 'granted', 'denied', 'prompt', 'prompt-with-rationale'
      }
    }
  } catch (e) {}

  if (typeof window !== "undefined" && "Notification" in window) {
    return Notification.permission; // 'default', 'granted', 'denied'
  }
  return "unsupported";
}

// Obtener estado síncrono para UI
export function obtenerEstadoPermiso() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission; // 'default', 'granted', 'denied'
}

// Solicitar permiso nativo al dispositivo con soporte dual (Capacitor nativo + Web)
export async function solicitarPermisoNotificaciones() {
  // Aseguramos primero el canal de notificación en Android
  await asegurarCanalNotificacionesAndroid();

  // 1. Intentar primero con el plugin nativo de Capacitor (Android 13+ POST_NOTIFICATIONS)
  try {
    if (LocalNotifications && typeof LocalNotifications.requestPermissions === "function") {
      const nativoRes = await LocalNotifications.requestPermissions();
      console.log("Respuesta de permiso nativo LocalNotifications:", nativoRes);
      if (nativoRes && nativoRes.display === "granted") {
        return { ok: true, estado: "granted", fuente: "capacitor" };
      } else if (nativoRes && nativoRes.display === "denied") {
        dispararGuiaPermisos("notificaciones");
        return { ok: false, estado: "denied", fuente: "capacitor" };
      }
    }
  } catch (e) {
    console.warn("LocalNotifications plugin no disponible, probando fallback web:", e);
  }

  // 2. Fallback estándar a Notification API
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { ok: false, estado: "unsupported", error: "Notificaciones no soportadas en este dispositivo." };
  }

  try {
    const permiso = await Notification.requestPermission();
    if (permiso === "granted") {
      if (!swRegistration && "serviceWorker" in navigator) {
        await registrarServiceWorker();
      }
      return { ok: true, estado: "granted", fuente: "web" };
    } else {
      if (permiso === "denied") {
        dispararGuiaPermisos("notificaciones");
      }
      return { ok: false, estado: permiso, fuente: "web" };
    }
  } catch (error) {
    console.error("Error al solicitar permiso de notificaciones:", error);
    dispararGuiaPermisos("notificaciones");
    return { ok: false, estado: "error", error: error.message };
  }
}

// Chime armónico y relajante sintetizado (Web Audio API)
export function reproducirChimeCalmante() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    
    // Acorde sanador suave (528 Hz frecuencia de transformación + 432 Hz afinación natural + 660 Hz brillo)
    const frecuencias = [528, 432, 660];
    
    frecuencias.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.8);
    });

    // Cerrar el contexto de audio tras la reproducción para liberar buffers de memoria
    setTimeout(() => {
      try {
        if (ctx && ctx.state !== "closed") {
          ctx.close();
        }
      } catch (e) {}
    }, 2200);
  } catch (e) {
    console.warn("Audio chime no disponible:", e);
  }
}

// Vibración táctil del dispositivo
export function vibrarDispositivo(patron = [180, 80, 180]) {
  try {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(patron);
    }
  } catch (e) {
    // Silencioso si no está soportado
  }
}

// Envío de notificación 100% nativa con fallback y Service Worker
export async function enviarNotificacionNativa({
  titulo = "🌿 ¡Suelta! Recordatorio de Bienestar",
  mensaje = "Es momento de reconectar con tu paz interior.",
  tag = "suelta-reminder",
  data = { url: "/#app" },
  reproducirSonido = true,
  vibrar = true
} = {}) {
  if (reproducirSonido) {
    reproducirChimeCalmante();
  }
  if (vibrar) {
    vibrarDispositivo([180, 70, 180, 70, 250]);
  }

  // 1. Intentar primero con Capacitor LocalNotifications nativo de Android
  try {
    if (LocalNotifications && typeof LocalNotifications.schedule === "function") {
      await asegurarCanalNotificacionesAndroid();
      const notifId = Math.floor(Math.random() * 900000) + 10000;
      await LocalNotifications.schedule({
        notifications: [
          {
            id: notifId,
            title: titulo,
            body: mensaje,
            channelId: "suelta_recordatorios",
            extra: data,
            schedule: { at: new Date(Date.now() + 200) }
          }
        ]
      });
      console.log("Notificación enviada exitosamente mediante Capacitor LocalNotifications nativo.");
      return true;
    }
  } catch (e) {
    console.warn("Aviso al enviar con LocalNotifications de Capacitor:", e);
  }

  const opciones = {
    body: mensaje,
    icon: "/favicon.png",
    badge: "/favicon.png",
    vibrate: vibrar ? [200, 100, 200, 100, 200] : undefined,
    tag,
    renotify: true,
    requireInteraction: false,
    data,
    actions: [
      { action: "open", title: "🌿 Abrir ¡Suelta!" },
      { action: "calma", title: "🧘 Respirar" }
    ]
  };

  // 2. Intentar mediante Service Worker Registration
  try {
    let reg = swRegistration;
    if (!reg && "serviceWorker" in navigator) {
      reg = await navigator.serviceWorker.getRegistration();
    }
    if (reg && reg.showNotification) {
      await reg.showNotification(titulo, opciones);
      console.log("Notificación enviada mediante Service Worker.");
      return true;
    }
  } catch (e) {
    console.warn("Error mostrando notificación con Service Worker, intentando API directa:", e);
  }

  // 3. Fallback a la Notification API estándar del navegador
  try {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      const notif = new Notification(titulo, {
        body: mensaje,
        icon: "/favicon.png",
        badge: "/favicon.png",
        tag
      });
      notif.onclick = () => {
        window.focus();
        if (data.url && window.location) {
          window.location.hash = data.url.replace("/", "");
        }
        notif.close();
      };
      return true;
    }
  } catch (e) {
    console.warn("Error con Notification API:", e);
  }

  return false;
}

// Programar los recordatorios en los horarios elegidos por el usuario (ej: 08:00, 14:00, 20:00)
export async function programarRecordatoriosDiarios(config) {
  if (!config || !config.activo || !Array.isArray(config.horarios) || config.horarios.length === 0) {
    // Cancelar si está desactivado
    try {
      if (LocalNotifications && typeof LocalNotifications.cancel === "function") {
        const pendientes = await LocalNotifications.getPending();
        if (pendientes && pendientes.notifications && pendientes.notifications.length > 0) {
          await LocalNotifications.cancel({ notifications: pendientes.notifications });
        }
      }
    } catch (e) {}
    return;
  }

  try {
    if (LocalNotifications && typeof LocalNotifications.schedule === "function") {
      await asegurarCanalNotificacionesAndroid();
      
      // Cancelar notificaciones previas
      try {
        const pendientes = await LocalNotifications.getPending();
        if (pendientes && pendientes.notifications && pendientes.notifications.length > 0) {
          await LocalNotifications.cancel({ notifications: pendientes.notifications });
        }
      } catch (e) {}

      const notificacionesNuevas = [];

      config.horarios.forEach((horario, idx) => {
        const [horas, minutos] = horario.split(":").map(Number);
        if (isNaN(horas) || isNaN(minutos)) return;

        const afirmacion = AFIRMACIONES_RECORDATORIOS[idx % AFIRMACIONES_RECORDATORIOS.length];

        notificacionesNuevas.push({
          id: 1000 + idx,
          title: afirmacion.titulo,
          body: afirmacion.mensaje,
          channelId: "suelta_recordatorios",
          extra: { url: "/#app" },
          schedule: {
            on: {
              hour: horas,
              minute: minutos
            },
            repeats: true,
            allowWhileIdle: true
          }
        });
      });

      if (notificacionesNuevas.length > 0) {
        await LocalNotifications.schedule({ notifications: notificacionesNuevas });
        console.log(`Programados ${notificacionesNuevas.length} recordatorios diarios en Android.`);
      }
    }
  } catch (e) {
    console.warn("Aviso al programar recordatorios recurrentes:", e);
  }
}

// Recordatorio inicial de comprobación inmediata en el dispositivo móvil
export async function enviarRecordatorioInicialPrueba({ nombre = "amigo/a", idioma = "es" } = {}) {
  const currentLang = idioma || "es";
  let titulo = "✨ ¡Suelta! Conexión Activa en tu Dispositivo";
  let mensaje = `¡Excelente, ${nombre}! Los recordatorios están configurados al 100% en tu Android. Recibirás tus afirmaciones y pausas de bienestar en los horarios que elijas.`;

  if (currentLang === "en") {
    titulo = "✨ ¡Suelta! Active Connection on your Device";
    mensaje = `Great, ${nombre}! Reminders are 100% configured on your Android. You will receive your wellness affirmations and pauses at the times you choose.`;
  } else if (currentLang === "fr") {
    titulo = "✨ ¡Suelta! Connexion Active sur votre Appareil";
    mensaje = `Parfait, ${nombre} ! Les rappels sont configurés à 100% sur votre Android. Vous recevrez vos affirmations et pauses bien-être aux horaires choisis.`;
  } else if (currentLang === "it") {
    titulo = "✨ ¡Suelta! Connessione Attiva sul tuo Dispositivo";
    mensaje = `Ottimo, ${nombre}! I promemoria sono configurati al 100% sul tuo Android. Riceverai le tue affermazioni e pause di benessere negli orari che preferisci.`;
  }

  return await enviarNotificacionNativa({
    titulo,
    mensaje,
    tag: "suelta-bienvenida-test",
    data: { url: "/#reto" },
    reproducirSonido: true,
    vibrar: true
  });
}
