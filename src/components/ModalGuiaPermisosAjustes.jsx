import React from "react";
import { createPortal } from "react-dom";
import { Settings, ShieldAlert, Mic, Bell, Camera, ChevronRight, Check, X, ExternalLink } from "lucide-react";
import { t } from "../data/translations.js";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";

function esIos() {
  if (typeof window === "undefined") return false;
  const platform = window.Capacitor?.getPlatform?.();
  if (platform === "ios") return true;
  return /iPad|iPhone|iPod/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
}

/**
 * Modal universal para redirigir a los Ajustes de iOS o Android
 * y mostrar el paso a paso exacto para otorgar permisos.
 */
export function ModalGuiaPermisosAjustes({
  isOpen,
  onClose,
  tipo = "microfono", // "microfono" | "notificaciones" | "camara" | "general"
  onReintentar = null,
  idioma = "es"
}) {
  useBloquearScrollFondo(isOpen);
  const [abriendo, setAbriendo] = React.useState(false);

  if (!isOpen) return null;
  const esDispositivoIos = esIos();

  // Intenta abrir la pantalla de ajustes de la aplicación nativa para dar permisos
  const abrirAjustesDispositivo = async () => {
    setAbriendo(true);
    try {
      // 1. En iOS, abrir app-settings: lleva directamente a Ajustes > Suelta
      if (esDispositivoIos) {
        if (window.Capacitor?.Plugins?.App?.openUrl) {
          try {
            await window.Capacitor.Plugins.App.openUrl({ url: "app-settings:" });
            setTimeout(() => setAbriendo(false), 1200);
            return;
          } catch (_) {}
        }
        try {
          window.location.href = "app-settings:";
          setTimeout(() => setAbriendo(false), 1200);
          return;
        } catch (_) {}
      }

      const pkgName = "suelta_app.com";

      // 2. Plugins nativos de Capacitor (NativeSettings / App / Permissions)
      if (window.Capacitor?.Plugins?.NativeSettings) {
        const ns = window.Capacitor.Plugins.NativeSettings;
        const targetOption = tipo === "notificaciones" ? "app_notification_settings" : "application_details";
        
        if (typeof ns.openAndroid === "function") {
          await ns.openAndroid({ option: targetOption, package: pkgName });
          setTimeout(() => setAbriendo(false), 1500);
          return;
        }
        if (typeof ns.open === "function") {
          await ns.open({ optionAndroid: targetOption, package: pkgName });
          setTimeout(() => setAbriendo(false), 1500);
          return;
        }
      }

      // 3. Capacitor App Plugin / OpenUrl directo
      if (window.Capacitor?.Plugins?.App?.openUrl) {
        try {
          if (tipo === "notificaciones" && !esDispositivoIos) {
            await window.Capacitor.Plugins.App.openUrl({
              url: `intent:#Intent;action=android.settings.APP_NOTIFICATION_SETTINGS;S.android.provider.extra.APP_PACKAGE=${pkgName};S.app_package=${pkgName};end`
            });
            setTimeout(() => setAbriendo(false), 1500);
            return;
          }
        } catch (e) {}

        try {
          await window.Capacitor.Plugins.App.openUrl({ url: esDispositivoIos ? "app-settings:" : `package:${pkgName}` });
          setTimeout(() => setAbriendo(false), 1500);
          return;
        } catch (e) {
          try {
            await window.Capacitor.Plugins.App.openUrl({ url: "app-settings:" });
            setTimeout(() => setAbriendo(false), 1500);
            return;
          } catch (e2) {}
        }
      }

      // 4. Android Intent directo para detalles de la aplicación o notificaciones
      if (typeof window !== "undefined" && !esDispositivoIos) {
        let intentUrl = "";
        if (tipo === "notificaciones") {
          intentUrl = `intent:#Intent;action=android.settings.APP_NOTIFICATION_SETTINGS;S.android.provider.extra.APP_PACKAGE=${pkgName};S.app_package=${pkgName};end`;
        } else {
          intentUrl = `intent:#Intent;action=android.settings.APPLICATION_DETAILS_SETTINGS;data=package:${pkgName};end`;
        }

        try {
          const link = document.createElement("a");
          link.href = intentUrl;
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          setTimeout(() => link.remove(), 200);
        } catch (e) {}
      }

      // 5. Solicitar permiso directamente en este toque
      if (tipo === "microfono" && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((t) => t.stop());
          if (onReintentar) onReintentar();
          onClose();
          return;
        } catch (e) {
          console.warn("Aviso solicitando micrófono directo:", e);
        }
      } else if (tipo === "camara" && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach((t) => t.stop());
          if (onReintentar) onReintentar();
          onClose();
          return;
        } catch (e) {
          console.warn("Aviso solicitando cámara directa:", e);
        }
      } else if (tipo === "notificaciones" && typeof Notification !== "undefined" && Notification.requestPermission) {
        try {
          const res = await Notification.requestPermission();
          if (res === "granted") {
            if (onReintentar) onReintentar();
            onClose();
            return;
          }
        } catch (e) {
          console.warn("Aviso solicitando notificaciones directas:", e);
        }
      }
    } catch (e) {
      console.warn("Aviso abriendo ajustes o permisos:", e);
    } finally {
      setTimeout(() => setAbriendo(false), 1500);
    }
  };

  const config = {
    microfono: {
      titulo: t("Activar Permiso de Micrófono", idioma),
      icono: Mic,
      colorIcono: "#0284c7",
      bgIcono: "#e0f2fe",
      motivo: t("El micrófono te permite expresarte y dictar tus historias, diario emocional y reflexiones de voz sin tener que escribir a mano.", idioma),
      pasos: esDispositivoIos ? [
        t("Toca el botón 'Abrir Ajustes' abajo para ir a la configuración de Suelta en tu iPhone.", idioma),
        t("En la lista de permisos de Suelta, activa el interruptor de 'Micrófono'.", idioma),
        t("Regresa a Suelta para disfrutar del dictado por voz y notas de audio.", idioma)
      ] : [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a la sección 'Aplicaciones' (o 'Administrador de aplicaciones').", idioma),
        t("Busca y selecciona 'Suelta'.", idioma),
        t("Toca en 'Permisos' y activa la opción 'Micrófono' (selecciona 'Permitir solo mientras la app está en uso').", idioma),
        t("Regresa a Suelta para disfrutar del dictado y notas de audio.", idioma)
      ]
    },
    notificaciones: {
      titulo: t("Activar Notificaciones y Recordatorios", idioma),
      icono: Bell,
      colorIcono: "#e11d48",
      bgIcono: "#ffe4e6",
      motivo: t("Las notificaciones te envían afirmaciones de bienestar, recordatorios de tu reto de 21 días y pausas de respiración en los horarios que elijas.", idioma),
      pasos: esDispositivoIos ? [
        t("Toca el botón 'Abrir Ajustes' abajo para ir a la configuración de Suelta en tu iPhone.", idioma),
        t("Toca en 'Notificaciones' y activa 'Permitir notificaciones'.", idioma),
        t("Elige tus estilos preferidos (Tiras, Pantalla bloqueada y Sonidos).", idioma),
        t("Regresa a Suelta: tus recordatorios y afirmaciones diarias quedarán activos.", idioma)
      ] : [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a 'Aplicaciones' > 'Suelta' > 'Notificaciones'.", idioma),
        t("Activa el interruptor principal 'Permitir todas las notificaciones de Suelta'.", idioma),
        t("Asegúrate de que el canal 'Recordatorios de Bienestar ¡Suelta!' esté en estado 'Permitido'.", idioma),
        t("Regresa a Suelta: tus recordatorios y afirmaciones diarias quedarán activos.", idioma)
      ]
    },
    camara: {
      titulo: t("Activar Permiso de Cámara", idioma),
      icono: Camera,
      colorIcono: "#16a34a",
      bgIcono: "#dcfce7",
      motivo: t("La cámara te permite capturar fotos para personalizar tu perfil y registrar momentos de calma en tu diario visual.", idioma),
      pasos: esDispositivoIos ? [
        t("Toca el botón 'Abrir Ajustes' abajo para ir a la configuración de Suelta en tu iPhone.", idioma),
        t("Activa el interruptor de 'Cámara' (y 'Fotos' si deseas adjuntar desde tu galería).", idioma),
        t("Regresa a Suelta para tomar fotos directamente desde la app.", idioma)
      ] : [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a 'Aplicaciones' > 'Suelta' > 'Permisos'.", idioma),
        t("Toca en 'Cámara' y selecciona 'Permitir solo mientras la app está en uso'.", idioma),
        t("Regresa a Suelta para tomar fotos directamente desde la app.", idioma)
      ]
    },
    general: {
      titulo: t("Permisos de la Aplicación", idioma),
      icono: Settings,
      colorIcono: "#3f6b5b",
      bgIcono: "#eaf3ef",
      motivo: t("Para aprovechar al máximo todas las funciones de ¡Suelta!, asegúrate de otorgar los permisos necesarios.", idioma),
      pasos: esDispositivoIos ? [
        t("Abre Ajustes en tu iPhone y desliza hacia abajo hasta encontrar 'Suelta'.", idioma),
        t("Activa los permisos de Cámara, Micrófono y Notificaciones.", idioma),
        t("Regresa a la app Suelta.", idioma)
      ] : [
        t("Abre Ajustes > Aplicaciones > Suelta.", idioma),
        t("Toca en 'Permisos' y revisa los permisos autorizados.", idioma),
        t("Regresa a la app Suelta.", idioma)
      ]
    }
  };

  const info = config[tipo] || config.general;
  const IconoComponente = info.icono;

  const modalContent = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(17, 29, 24, 0.65)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        padding: "16px",
        boxSizing: "border-box"
      }}
      onClick={onClose}
    >
      <div
        data-modal-scrollable="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          borderRadius: 24,
          padding: "24px 20px",
          width: "100%",
          maxWidth: 420,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box",
          position: "relative",
          animation: "ssSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) both"
        }}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          aria-label={t("Cerrar", idioma)}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(0,0,0,0.05)",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#4a5568"
          }}
        >
          <X size={16} />
        </button>

        {/* Cabecera */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingRight: 30 }}>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            background: info.bgIcono,
            color: info.colorIcono,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <IconoComponente size={24} />
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
              {esDispositivoIos ? t("Ajustes de iOS", idioma) : t("Ajustes de Android", idioma)}
            </span>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>
              {info.titulo}
            </h3>
          </div>
        </div>

        {/* Motivo amigable */}
        <div style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "12px 14px",
          fontSize: 12.5,
          color: "#475569",
          lineHeight: 1.5
        }}>
          {info.motivo}
        </div>

        {/* Paso a paso */}
        <div>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#334155", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <span>{t("Paso a paso para habilitarlo:", idioma)}</span>
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {info.pasos.map((paso, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "#334155", lineHeight: 1.45 }}>
                <span style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#3f6b5b",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1
                }}>
                  {idx + 1}
                </span>
                <span style={{ flex: 1 }}>{paso}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de Acción Principal para Abrir Ajustes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
          <button
            onClick={abrirAjustesDispositivo}
            disabled={abriendo}
            className="ss-btn ss-btn-primary"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 6px 16px rgba(63, 107, 91, 0.25)"
            }}
          >
            <Settings size={18} />
            <span>
              {abriendo 
                ? t("Abriendo Ajustes...", idioma) 
                : (esDispositivoIos ? t("Abrir Ajustes de iOS", idioma) : t("Abrir Ajustes del Dispositivo", idioma))}
            </span>
            <ExternalLink size={15} style={{ opacity: 0.8 }} />
          </button>

          <button
            onClick={onClose}
            className="ss-btn ss-btn-ghost"
            style={{
              width: "100%",
              padding: "11px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 12
            }}
          >
            {t("Entendido, lo haré más tarde", idioma)}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
}
