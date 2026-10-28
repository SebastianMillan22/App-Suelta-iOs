import React from "react";
import { createPortal } from "react-dom";
import { Settings, ShieldAlert, Mic, Bell, Camera, ChevronRight, Check, X, ExternalLink } from "lucide-react";
import { t } from "../data/translations.js";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";

/**
 * Modal universal para redirigir a los Ajustes de Android
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

  // Intenta abrir la pantalla de ajustes de la aplicación nativa para dar permisos
  const abrirAjustesDispositivo = async () => {
    setAbriendo(true);
    try {
      const pkgName = "suelta_app.com";

      // 1. Plugins nativos de Capacitor (NativeSettings / App / Permissions)
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

      // 2. Capacitor App Plugin / OpenUrl directo
      if (window.Capacitor?.Plugins?.App?.openUrl) {
        try {
          if (tipo === "notificaciones") {
            await window.Capacitor.Plugins.App.openUrl({
              url: `intent:#Intent;action=android.settings.APP_NOTIFICATION_SETTINGS;S.android.provider.extra.APP_PACKAGE=${pkgName};S.app_package=${pkgName};end`
            });
            setTimeout(() => setAbriendo(false), 1500);
            return;
          }
        } catch (e) {}

        try {
          await window.Capacitor.Plugins.App.openUrl({ url: `package:${pkgName}` });
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

      // 3. Android Intent directo para detalles de la aplicación o notificaciones
      if (typeof window !== "undefined") {
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

      // 4. Solicitar permiso directamente en este toque
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
      pasos: [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a la sección 'Aplicaciones' (o 'Administrador de aplicaciones').", idioma),
        t("Busca y selecciona 'Suelta'.", idioma),
        t("Toca en 'Permisos' (o 'Permisos de la app').", idioma),
        t("Selecciona 'Micrófono' y cámbialo a 'Permitir solo mientras la app está en uso'.", idioma)
      ]
    },
    notificaciones: {
      titulo: t("Activar Permiso de Notificaciones", idioma),
      icono: Bell,
      colorIcono: "#d97706",
      bgIcono: "#fef3c7",
      motivo: t("Las notificaciones te envían tus recordatorios de calma, afirmaciones diarias y te avisan para continuar tu reto de 21 días.", idioma),
      pasos: [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a 'Aplicaciones' y selecciona 'Suelta'.", idioma),
        t("Toca en la sección 'Notificaciones'.", idioma),
        t("Activa el interruptor 'Permitir todas las notificaciones de Suelta'.", idioma),
        t("Asegúrate de que no esté en modo 'Silencioso' o bloqueado por Ahorro de Batería.", idioma)
      ]
    },
    camara: {
      titulo: t("Activar Permiso de Cámara", idioma),
      icono: Camera,
      colorIcono: "#9333ea",
      bgIcono: "#f3e8ff",
      motivo: t("La cámara te permite tomar tu foto de perfil de bienestar y registrar imágenes significativas en tu diario.", idioma),
      pasos: [
        t("Abre los Ajustes o Configuración de tu teléfono Android.", idioma),
        t("Ve a 'Aplicaciones' > Busca 'Suelta'.", idioma),
        t("Toca en 'Permisos'.", idioma),
        t("Selecciona 'Cámara' y cámbiala a 'Permitir solo mientras la app está en uso'.", idioma)
      ]
    }
  }[tipo] || {
    titulo: t("Habilitar Permisos de la App", idioma),
    icono: Settings,
    colorIcono: "#3f6b5b",
    bgIcono: "#e8f5e9",
    motivo: t("Para que Suelta funcione con todas sus herramientas, necesita los permisos de tu sistema Android.", idioma),
    pasos: [
      t("Abre los Ajustes de tu teléfono Android.", idioma),
      t("Ve a 'Aplicaciones' > 'Suelta' > 'Permisos'.", idioma),
      t("Habilita los permisos que requieras (Micrófono, Notificaciones o Cámara).", idioma)
    ]
  };

  const IconoPrincipal = config.icono;

  const modalNode = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(15, 23, 42, 0.75)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
        overscrollBehavior: "contain",
        touchAction: "none",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-modal-scrollable="true"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#ffffff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: "24px 20px 28px",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxHeight: "90dvh",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          animation: "slideUp 0.25s ease-out"
        }}
      >
        {/* Barra superior de arrastre */}
        <div style={{ width: 44, height: 4, background: "#cbd5e1", borderRadius: 2, margin: "0 auto 4px" }} />

        {/* Encabezado */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: config.bgIcono,
                color: config.colorIcono,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <IconoPrincipal size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1e293b", margin: 0, lineHeight: 1.25 }}>
                {config.titulo}
              </h3>
              <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <ShieldAlert size={13} /> {t("Permiso bloqueado o denegado en el sistema", idioma)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              cursor: "pointer",
              flexShrink: 0
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Explicación / Por qué es necesario */}
        <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: 14, border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: 13, color: "#334155", margin: 0, lineHeight: 1.45 }}>
            {config.motivo}
          </p>
        </div>

        {/* Botón principal directo para abrir Ajustes de Android */}
        <button
          onClick={() => {
            abrirAjustesDispositivo();
          }}
          disabled={abriendo}
          style={{
            width: "100%",
            background: abriendo ? "#0d5c56" : "#0f766e",
            color: "#ffffff",
            border: "none",
            borderRadius: 14,
            padding: "14px 16px",
            fontSize: 15,
            fontWeight: 700,
            cursor: abriendo ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 12px rgba(15,118,110,0.25)",
            transition: "all 0.15s ease",
            opacity: abriendo ? 0.85 : 1
          }}
        >
          <Settings size={18} className={abriendo ? "animate-spin" : ""} />
          <span>{abriendo ? t("Abriendo Ajustes...", idioma) : t("Ir a Ajustes de la Aplicación", idioma)}</span>
          <ExternalLink size={15} style={{ opacity: 0.8 }} />
        </button>

        {/* Paso a paso visual numerado */}
        <div>
          <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#475569", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t("Paso a paso para activarlo en tu Android:", idioma)}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {config.pasos.map((paso, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: idx === config.pasos.length - 1 ? "#f0fdf4" : "#ffffff",
                  border: `1px solid ${idx === config.pasos.length - 1 ? "#bbf7d0" : "#f1f5f9"}`
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: idx === config.pasos.length - 1 ? "#22c55e" : "#0f766e",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1
                  }}
                >
                  {idx + 1}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: idx === config.pasos.length - 1 ? "#15803d" : "#334155",
                    fontWeight: idx === config.pasos.length - 1 ? 600 : 400,
                    lineHeight: 1.4
                  }}
                >
                  {paso}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones inferiores */}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: "#f1f5f9",
              color: "#475569",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {t("Entendido", idioma)}
          </button>
          {onReintentar && (
            <button
              onClick={() => {
                onClose();
                onReintentar();
              }}
              style={{
                flex: 1,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#166534",
                borderRadius: 12,
                padding: "12px",
                fontSize: 13.5,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6
              }}
            >
              <Check size={16} />
              <span>{t("Ya los di, comprobar", idioma)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalNode, document.body);
  }

  return modalNode;
}
