import React, { useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Sparkles, Clock, ShieldCheck, CheckCircle2, Lock, ArrowRight, X, Heart, Star } from "lucide-react";
import { t } from "../data/translations.js";

const FONT_DISPLAY = "'Cinzel Decorative', Georgia, serif";
const FONT_BODY = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";

/**
 * ModalPeriodoPruebaConstante
 * 
 * Mensaje modal constante y seguro para el período de prueba de 3 días.
 * Informa a los usuarios que no tienen suscripción activa:
 * - Día 1 de 3 (quedan 2 días)
 * - Día 2 de 3 (queda 1 día)
 * - Día 3 de 3 (último día de prueba)
 * - Cumplidos los 3 días (prueba concluida / bloqueante)
 * 
 * Diseñado con soporte de gesto deslizante hacia abajo (swipe/pull to dismiss)
 * para evitar que se congele sobre la pantalla.
 */
export function ModalPeriodoPruebaConstante({
  isOpen,
  onClose,
  onAdquirirSuscripcion,
  diaPruebaActual = 1,
  diasRestantesPrueba = 2,
  pruebaExpirada = false,
  tiempoTranscurrido = 0,
  onRestaurarCompras = null,
  idioma = "es"
}) {
  const [dragY, setDragY] = useState(0);
  const touchStartYRef = useRef(null);
  const isDraggingRef = useRef(false);

  if (!isOpen) return null;

  // Determinar los datos específicos de cada día
  const config = useMemo(() => {
    if (pruebaExpirada) {
      return {
        badgeTexto: t("3 DÍAS CUMPLIDOS · PRUEBA FINALIZADA", idioma),
        badgeBg: "rgba(239, 68, 68, 0.12)",
        badgeColor: "#991b1b",
        badgeBorder: "rgba(239, 68, 68, 0.28)",
        iconoPrincipal: "lock",
        iconoColor: "#dc2626",
        iconoBg: "rgba(239, 68, 68, 0.1)",
        titulo: t("Has cumplido tus 3 días de prueba", idioma),
        subtitulo: t("Tu período de acceso Premium gratuito ha finalizado", idioma),
        mensaje: t(
          "Completaste tus 3 días de prueba de acceso Premium. Para seguir disfrutando de todas las herramientas de bienestar, el reto de 21 días, tus constelaciones familiares y el diario emocional guiado, pasa a adquirir tu suscripción ahora.",
          idioma
        ),
        avisoDestacado: t("Tu progreso y reflexiones están guardados de forma segura. Desbloquéalos adquiriendo tu suscripción.", idioma),
        btnTexto: t("Adquirir suscripción Premium", idioma),
        btnBg: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
        permiteCerrar: true,
        textoCerrar: t("Continuar sin suscripción", idioma),
        progresoPorcentaje: 100
      };
    }

    if (diaPruebaActual === 3) {
      return {
        badgeTexto: t("DÍA 3 DE 3 · ¡ÚLTIMO DÍA DE PRUEBA!", idioma),
        badgeBg: "rgba(245, 158, 11, 0.14)",
        badgeColor: "#b45309",
        badgeBorder: "rgba(245, 158, 11, 0.3)",
        iconoPrincipal: "clock",
        iconoColor: "#d97706",
        iconoBg: "rgba(245, 158, 11, 0.12)",
        titulo: t("¡Hoy es tu último día de prueba!", idioma),
        subtitulo: t("Día 3 de 3 de acceso Premium gratuito", idioma),
        mensaje: t(
          "Hoy culmina tu período de prueba de 3 días. Estás viviendo tus últimas horas de acceso libre a todo el ecosistema de Suelta & Sana. Pasa a adquirir una suscripción hoy mismo para no perder tu ritmo ni el acceso a tus herramientas de sanación.",
          idioma
        ),
        avisoDestacado: t("Asegura tu continuidad: adquiere tu suscripción hoy y mantén todas tus herramientas activas.", idioma),
        btnTexto: t("Adquirir suscripción Premium ahora", idioma),
        btnBg: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
        permiteCerrar: true,
        textoCerrar: t("Aprovechar mis últimas horas de prueba", idioma),
        progresoPorcentaje: 90
      };
    }

    if (diaPruebaActual === 2) {
      return {
        badgeTexto: t("DÍA 2 DE 3 · ACCESO PREMIUM", idioma),
        badgeBg: "rgba(111, 168, 146, 0.16)",
        badgeColor: "#15803d",
        badgeBorder: "rgba(111, 168, 146, 0.32)",
        iconoPrincipal: "leaf",
        iconoColor: "#16a34a",
        iconoBg: "rgba(22, 163, 74, 0.12)",
        titulo: t("Estás en tu 2° día de prueba", idioma),
        subtitulo: t("Llevas 2 días · Te queda 1 día restante de prueba", idioma),
        mensaje: t(
          "Llevas 2 días disfrutando de tu acceso Premium de prueba. Tu proceso de introspección y bienestar ya ha comenzado. Recuerda que mañana será tu último día gratuito: pasa a adquirir una suscripción para garantizar tu acompañamiento continuo sin interrupciones.",
          idioma
        ),
        avisoDestacado: t("Te queda 1 día de prueba. Da el siguiente paso y asegura tu suscripción para no perder tu avance.", idioma),
        btnTexto: t("Adquirir suscripción Premium", idioma),
        btnBg: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
        permiteCerrar: true,
        textoCerrar: t("Continuar con mi Día 2 de prueba", idioma),
        progresoPorcentaje: 66
      };
    }

    // Día 1 por defecto
    return {
      badgeTexto: t("DÍA 1 DE 3 · ACCESO PREMIUM", idioma),
      badgeBg: "rgba(138, 107, 184, 0.14)",
      badgeColor: "#6b21a8",
      badgeBorder: "rgba(138, 107, 184, 0.28)",
      iconoPrincipal: "sparkles",
      iconoColor: "#7c3aed",
      iconoBg: "rgba(124, 58, 237, 0.12)",
      titulo: t("Bienvenido a tu prueba de 3 días", idioma),
      subtitulo: t("Día 1 de 3 · Te quedan 2 días de acceso gratuito", idioma),
      mensaje: t(
        "Hoy inicias tu período de prueba de 3 días con acceso total a todas las herramientas terapéuticas, constelaciones y análisis emocionales. Pasa a adquirir tu suscripción para asegurar tu camino de transformación personal continuo.",
        idioma
      ),
      avisoDestacado: t("Disfruta hoy de tu Día 1 y adquiere tu suscripción para no preocuparte por el vencimiento.", idioma),
      btnTexto: t("Adquirir suscripción Premium", idioma),
      btnBg: "linear-gradient(135deg, #6b21a8 0%, #7c3aed 100%)",
      permiteCerrar: true,
      textoCerrar: t("Continuar con mi Día 1 de prueba", idioma),
      progresoPorcentaje: 33
    };
  }, [diaPruebaActual, pruebaExpirada, idioma]);

  const handleTouchStart = (e) => {
    if (!config.permiteCerrar) return;
    const scrollTarget = e.currentTarget;
    if (scrollTarget && scrollTarget.scrollTop > 5) return;
    touchStartYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartYRef.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    } else {
      setDragY(0);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragY > 75 && config.permiteCerrar && onClose) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
    touchStartYRef.current = null;
  };

  const modalNode = (
    <div
      role="dialog"
      aria-modal="true"
      data-modal-scrollable="true"
      className="modal-scrollable"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(15, 23, 42, 0.72)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 14px calc(env(safe-area-inset-bottom, 0px) + 16px)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        touchAction: "pan-y"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && config.permiteCerrar && onClose) {
          onClose();
        }
      }}
    >
      <div
        data-modal-scrollable="true"
        className="modal-scrollable"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          background: "#ffffff",
          borderRadius: 26,
          maxWidth: 390,
          width: "100%",
          maxHeight: "min(88vh, 660px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          padding: "18px 22px 22px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          position: "relative",
          animation: dragY === 0 ? "ss-fade-scale 0.28s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
          transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
          transition: dragY > 0 ? "none" : "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          fontFamily: FONT_BODY,
          color: "#1e293b",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Manija táctil para deslizar hacia abajo y cerrar */}
        {config.permiteCerrar && (
          <div
            style={{
              width: 38,
              height: 4.5,
              borderRadius: 99,
              background: "#cbd5e1",
              margin: "-4px auto 12px",
              cursor: "grab",
              flexShrink: 0
            }}
          />
        )}
        {/* Botón Cerrar (Solo si la prueba está activa) */}
        {config.permiteCerrar && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t("Cerrar", idioma)}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(100, 116, 139, 0.08)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            <X size={17} strokeWidth={2.4} />
          </button>
        )}

        {/* Badge superior indicando estado exacto */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: config.badgeBg,
              color: config.badgeColor,
              border: `1px solid ${config.badgeBorder}`,
              borderRadius: 999,
              padding: "5px 13px",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}
          >
            {pruebaExpirada ? (
              <Lock size={12} strokeWidth={2.6} />
            ) : diaPruebaActual === 3 ? (
              <Clock size={12} strokeWidth={2.6} />
            ) : (
              <Sparkles size={12} strokeWidth={2.6} />
            )}
            <span>{config.badgeTexto}</span>
          </div>
        </div>

        {/* Ícono central destacado */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 22,
              background: config.iconoBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: config.iconoColor,
              boxShadow: "0 8px 16px -4px rgba(0,0,0,0.06)"
            }}
          >
            {pruebaExpirada ? (
              <Lock size={30} strokeWidth={2.3} />
            ) : diaPruebaActual === 3 ? (
              <Clock size={32} strokeWidth={2.3} />
            ) : diaPruebaActual === 2 ? (
              <CheckCircle2 size={32} strokeWidth={2.3} />
            ) : (
              <Sparkles size={32} strokeWidth={2.3} />
            )}
          </div>
        </div>

        {/* Título y subtítulo */}
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 20,
            fontWeight: 800,
            color: "#0f172a",
            fontFamily: FONT_DISPLAY,
            lineHeight: 1.25
          }}
        >
          {config.titulo}
        </h3>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 12.5,
            fontWeight: 600,
            color: "#64748b"
          }}
        >
          {config.subtitulo}
        </p>

        {/* Línea de Progreso Visual de 3 Días */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 14,
            padding: "12px 14px 10px",
            marginBottom: 16,
            border: "1px solid #e2e8f0"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#475569" }}>
              {t("Progreso de tu período de prueba (3 días)", idioma)}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: config.iconoColor }}>
              {pruebaExpirada ? t("Cumplido", idioma) : `${diaPruebaActual}/3`}
            </span>
          </div>

          {/* 3 Steps visuales */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Paso 1 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: diaPruebaActual >= 1 ? (pruebaExpirada ? "#ef4444" : "#10b981") : "#cbd5e1",
                  transition: "background 0.3s"
                }}
              />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: diaPruebaActual >= 1 ? "#0f172a" : "#94a3b8" }}>
                {t("Día 1", idioma)}
              </span>
            </div>

            {/* Paso 2 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: diaPruebaActual >= 2 ? (pruebaExpirada ? "#ef4444" : "#10b981") : "#cbd5e1",
                  transition: "background 0.3s"
                }}
              />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: diaPruebaActual >= 2 ? "#0f172a" : "#94a3b8" }}>
                {t("Día 2", idioma)}
              </span>
            </div>

            {/* Paso 3 */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  height: 6,
                  borderRadius: 99,
                  background: diaPruebaActual >= 3 ? (pruebaExpirada ? "#ef4444" : "#f59e0b") : "#cbd5e1",
                  transition: "background 0.3s"
                }}
              />
              <span style={{ fontSize: 9.5, fontWeight: 700, color: diaPruebaActual >= 3 ? "#0f172a" : "#94a3b8" }}>
                {t("Día 3", idioma)}
              </span>
            </div>
          </div>
        </div>

        {/* Mensaje descriptivo con viñeta destacada */}
        <p
          style={{
            margin: "0 0 14px",
            fontSize: 13,
            lineHeight: 1.5,
            color: "#334155"
          }}
        >
          {config.mensaje}
        </p>

        {/* Caja de aviso o llamada a la acción */}
        <div
          style={{
            background: pruebaExpirada ? "rgba(239, 68, 68, 0.08)" : "rgba(248, 250, 252, 0.9)",
            border: `1px solid ${pruebaExpirada ? "rgba(239, 68, 68, 0.22)" : "#e2e8f0"}`,
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
            textAlign: "left"
          }}
        >
          <span style={{ fontSize: 18 }}>{pruebaExpirada ? "🔒" : diaPruebaActual === 3 ? "⚡" : "✨"}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: pruebaExpirada ? "#991b1b" : "#475569", lineHeight: 1.4 }}>
            {config.avisoDestacado}
          </span>
        </div>

        {/* Beneficios clave incluidos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20, textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#475569" }}>
            <CheckCircle2 size={14} color="#16a34a" strokeWidth={2.5} />
            <span>{t("Reto guiado de 21 días de sanación y desapego", idioma)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#475569" }}>
            <CheckCircle2 size={14} color="#16a34a" strokeWidth={2.5} />
            <span>{t("Constelaciones familiares y lectura transgeneracional", idioma)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#475569" }}>
            <CheckCircle2 size={14} color="#16a34a" strokeWidth={2.5} />
            <span>{t("Diario emocional con análisis somático y frecuencias", idioma)}</span>
          </div>
        </div>

        {/* Botón Principal: Adquirir Suscripción */}
        <button
          type="button"
          onClick={() => {
            if (onAdquirirSuscripcion) {
              onAdquirirSuscripcion();
            }
          }}
          className="ss-btn"
          style={{
            width: "100%",
            background: config.btnBg,
            color: "#ffffff",
            border: "none",
            borderRadius: 14,
            padding: "13px 18px",
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 10px 20px -6px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "transform 0.15s, box-shadow 0.15s"
          }}
        >
          <Sparkles size={16} />
          <span>{config.btnTexto}</span>
          <ArrowRight size={15} />
        </button>

        {/* Botón Secundario: permite al usuario continuar sin suscripción */}
        {config.permiteCerrar && onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#475569",
              fontSize: 13,
              fontWeight: 700,
              padding: "10px 0 4px",
              marginTop: 6,
              cursor: "pointer",
              transition: "color 0.2s"
            }}
          >
            {config.textoCerrar}
          </button>
        )}

        {/* Enlace para restaurar compras */}
        {onRestaurarCompras && (
          <button
            type="button"
            onClick={onRestaurarCompras}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: 11.5,
              fontWeight: 600,
              padding: "6px 0 2px",
              marginTop: 2,
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {t("¿Ya compraste tu suscripción? Restaurar compras", idioma)}
          </button>
        )}

        {/* Indicador de seguridad nativa de Google Play */}
        <div
          style={{
            marginTop: 14,
            paddingTop: 10,
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 11,
            color: "#94a3b8"
          }}
        >
          <ShieldCheck size={13} color="#64748b" />
          <span>{t("Google Play Billing oficial · Sin cargos automáticos sorpresa", idioma)}</span>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : null;
}
