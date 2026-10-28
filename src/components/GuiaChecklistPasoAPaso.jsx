import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Sparkles, 
  Leaf, 
  Moon, 
  Compass, 
  BookOpen, 
  Users, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Info,
  HelpCircle,
  Heart,
  Award,
  Zap
} from "lucide-react";
import { GooglePlayIcon } from "./GooglePlayBadge.jsx";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";
import { getLocalizedGuiaUI, getLocalizedEstructuraGuia } from "../data/translationsGuiaChecklist.js";

export const CLAVE_LOCAL_CHECKLIST = "suelta_checklist_guia_v2";

export function GuiaChecklistPasoAPaso({
  isOpen,
  onClose,
  onNavegarModulo,
  esPremium = false,
  tieneAccesoTotal = false,
  planPago = "prueba",
  enPruebaActiva = false,
  diasRestantesPrueba = 0,
  onVerPlanes,
  idioma = "es",
  onSubModalChange
}) {
  const [completados, setCompletados] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_LOCAL_CHECKLIST);
      return guardado ? JSON.parse(guardado) : {};
    } catch (_) {
      return {};
    }
  });

  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    iniciaAqui: true,
    modulos: true,
    membresia: false
  });

  const [modalDetalleItem, setModalDetalleItem] = useState(null);
  useBloquearScrollFondo(isOpen || Boolean(modalDetalleItem));

  // Notificar al componente raíz sobre la apertura/cierre del submodal de detalle
  useEffect(() => {
    if (onSubModalChange) {
      onSubModalChange(Boolean(modalDetalleItem));
    }
  }, [modalDetalleItem, onSubModalChange]);

  // Escuchar evento de cierre disparado por gestos nativos o botón atrás de Android
  useEffect(() => {
    const handleCerrarSubModal = () => {
      setModalDetalleItem(null);
    };
    window.addEventListener("cerrar-submodal-checklist", handleCerrarSubModal);
    return () => window.removeEventListener("cerrar-submodal-checklist", handleCerrarSubModal);
  }, []);

  // Soporte nativo para botón 'Atrás' y navegación por gestos en el móvil
  useEffect(() => {
    if (!isOpen) return;

    const handleBack = (e) => {
      if (modalDetalleItem) {
        if (e && e.preventDefault) e.preventDefault();
        setModalDetalleItem(null);
      } else if (onClose) {
        if (e && e.preventDefault) e.preventDefault();
        onClose();
      }
    };

    const handlePopState = () => {
      if (modalDetalleItem) {
        setModalDetalleItem(null);
      } else if (onClose) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (modalDetalleItem) {
          setModalDetalleItem(null);
        } else if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener("backbutton", handleBack);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("backbutton", handleBack);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, modalDetalleItem, onClose]);

  const abrirDetalleItem = (item) => {
    setModalDetalleItem(item);
    if (typeof window !== "undefined" && window.history) {
      try {
        window.history.pushState({ modalGuia: item.id, ts: Date.now() }, "", window.location.href);
      } catch (_) {}
    }
  };

  const guardarChecklist = (nuevoEstado) => {
    setCompletados(nuevoEstado);
    try {
      window.localStorage.setItem(CLAVE_LOCAL_CHECKLIST, JSON.stringify(nuevoEstado));
    } catch (_) {}
  };

  const alternarItem = (id, e) => {
    if (e) e.stopPropagation();
    const nuevo = { ...completados, [id]: !completados[id] };
    guardarChecklist(nuevo);
  };

  const toggleSeccion = (sec) => {
    setSeccionesAbiertas((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const esUsuarioSubscrito = (tieneAccesoTotal || planPago === "anual" || planPago === "mensual") && planPago !== "prueba" && !enPruebaActiva;

  const idiomaEfectivo = idioma || (typeof window !== "undefined" ? window.localStorage.getItem("suelta_idioma") : null) || "es";
  const lang = (idiomaEfectivo || "es").slice(0, 2).toLowerCase();
  const validLang = ["es", "en", "fr", "it"].includes(lang) ? lang : "es";
  const ui = getLocalizedGuiaUI(validLang);
  const ESTRUCTURA_GUIA = getLocalizedEstructuraGuia(validLang, {
    esUsuarioSubscrito,
    enPruebaActiva,
    planPago,
    tieneAccesoTotal,
    diasRestantesPrueba
  });

  // Cálculo de porcentaje completado
  const todosLosItems = ESTRUCTURA_GUIA.flatMap((s) => s.items);
  const totalItems = todosLosItems.length;
  const itemsCompletadosCount = todosLosItems.filter((it) => completados[it.id]).length;
  const porcentaje = totalItems > 0 ? Math.round((itemsCompletadosCount / totalItems) * 100) : 0;

  // Ítem activo dinámicamente localizado en el idioma actual
  const itemDetalleActual = modalDetalleItem 
    ? (todosLosItems.find((it) => it.id === (modalDetalleItem.id || modalDetalleItem)) || modalDetalleItem)
    : null;

  if (!isOpen) return null;

  const modalNode = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 999999,
        background: "rgba(26, 40, 34, 0.48)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        boxSizing: "border-box",
        overscrollBehavior: "contain",
        touchAction: "none"
      }}
      className="ss-fade"
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "92dvh",
          maxHeight: "92dvh",
          background: "#faf8f3",
          color: "#25332e",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 -10px 40px rgba(37, 51, 46, 0.18)",
          border: "1.5px solid #e1e0d6"
        }}
        className="ss-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Manija de arrastre y Cabecera */}
        <div style={{ padding: "14px 20px 14px", borderBottom: "1px solid #e1e0d6", background: "#ffffff" }}>
          <div style={{ width: 44, height: 4, background: "#d5dbd7", borderRadius: 99, margin: "0 auto 12px" }} />
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #eaf3ef 0%, #d8eae1 100%)",
                border: "1.5px solid #c8dfd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3f6b5b",
                boxShadow: "0 2px 8px rgba(63,107,91,0.12)"
              }}>
                <Sparkles size={20} color="#3f6b5b" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 17.5, fontWeight: 800, color: "#25332e", fontFamily: "Playfair Display, Georgia, serif", letterSpacing: "-0.2px" }}>
                  {ui.tituloModal}
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: "#6b7b74" }}>
                  {ui.subtituloModal}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                background: "#eaf3ef",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3f6b5b",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 700
              }}
              title={ui.cerrar}
            >
              ✕
            </button>
          </div>

          {/* Barra de Progreso del Checklist */}
          <div style={{ marginTop: 14, background: "#faf8f3", padding: "10px 14px", borderRadius: 14, border: "1px solid #e1e0d6" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#25332e" }}>
                {ui.tuProgreso}
              </span>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#3f6b5b" }}>
                {porcentaje}% ({itemsCompletadosCount}/{totalItems})
              </span>
            </div>
            <div style={{ width: "100%", height: 6, background: "#e8eeeb", borderRadius: 99, overflow: "hidden" }}>
              <div 
                style={{ 
                  width: `${porcentaje}%`, 
                  height: "100%", 
                  background: "linear-gradient(90deg, #6fa892 0%, #3f6b5b 100%)", 
                  borderRadius: 99,
                  transition: "width 0.4s ease"
                }} 
              />
            </div>
          </div>
        </div>

        {/* Lista de Secciones y Acordeones */}
        <div data-modal-scrollable="true" style={{ flex: 1, overflowY: "auto", padding: "16px 18px 24px", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }} className="ss-no-scrollbar">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ESTRUCTURA_GUIA.map((seccion) => {
              const estaAbierta = seccionesAbiertas[seccion.id];
              const itemsCompletadosSeccion = seccion.items.filter((it) => completados[it.id]).length;

              return (
                <div 
                  key={seccion.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: 18,
                    border: "1.5px solid #e1e0d6",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(37,51,46,0.03)"
                  }}
                >
                  {/* Encabezado de la Sección */}
                  <button
                    onClick={() => toggleSeccion(seccion.id)}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "#25332e",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "#25332e", fontFamily: "Playfair Display, Georgia, serif" }}>
                          {seccion.titulo}
                        </span>
                        <span style={{
                          fontSize: 10.5,
                          fontWeight: 800,
                          background: itemsCompletadosSeccion === seccion.items.length ? "#eaf3ef" : "#f1f5f3",
                          color: itemsCompletadosSeccion === seccion.items.length ? "#3f6b5b" : "#6b7b74",
                          padding: "2px 8px",
                          borderRadius: 99,
                          border: "1px solid #d3e5dc"
                        }}>
                          {itemsCompletadosSeccion}/{seccion.items.length}
                        </span>
                      </div>
                      <span style={{ fontSize: 11.5, color: "#6b7b74" }}>
                        {seccion.subtitulo}
                      </span>
                    </div>

                    <div style={{ color: "#6b7b74", paddingLeft: 8 }}>
                      {estaAbierta ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Ítems desplegables de la sección */}
                  {estaAbierta && (
                    <div style={{ borderTop: "1px solid #e1e0d6", padding: "6px 8px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                      {seccion.items.map((item) => {
                        const estaChecked = !!completados[item.id];
                        const esBloqueado = item.disponibilidad === "bloqueado";
                        const esAnualReq = item.disponibilidad === "anual";

                        return (
                          <div
                            key={item.id}
                            onClick={() => abrirDetalleItem(item)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 12px",
                              borderRadius: 12,
                              background: estaChecked ? "rgba(111, 168, 146, 0.08)" : "transparent",
                              cursor: "pointer",
                              transition: "background 0.2s"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                              {/* Checkbox interactivo */}
                              <button
                                onClick={(e) => alternarItem(item.id, e)}
                                style={{
                                  background: "transparent",
                                  border: "none",
                                  padding: 0,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: estaChecked ? "#3f6b5b" : "#c2ccc6"
                                }}
                              >
                                {estaChecked ? <CheckCircle2 size={20} color="#3f6b5b" /> : <Circle size={20} color="#9cb0a5" />}
                              </button>

                              <span style={{ fontSize: 17 }}>{item.icono}</span>

                              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{
                                    fontSize: 13.5,
                                    fontWeight: 700,
                                    color: estaChecked ? "#6b7b74" : "#25332e",
                                    textDecoration: estaChecked ? "line-through" : "none",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                  }}>
                                    {item.titulo}
                                  </span>
                                  {esBloqueado && (
                                    <span style={{ fontSize: 9.5, background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca", padding: "1px 6px", borderRadius: 6, fontWeight: 700 }}>
                                      {ui.badgeBloqueado}
                                    </span>
                                  )}
                                  {esAnualReq && (
                                    <span style={{ fontSize: 9.5, background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", padding: "1px 6px", borderRadius: 6, fontWeight: 700 }}>
                                      {ui.badgeAnual}
                                    </span>
                                  )}
                                  {item.disponibilidad === "desbloqueado" && esUsuarioSubscrito && (
                                    <span style={{ fontSize: 9.5, background: "#eaf3ef", color: "#3f6b5b", border: "1px solid #c8dfd4", padding: "1px 6px", borderRadius: 6, fontWeight: 700 }}>
                                      {ui.badgeDesbloqueado}
                                    </span>
                                  )}
                                  {item.disponibilidad === "prueba" && (
                                    <span style={{ fontSize: 9.5, background: "#eaf3ef", color: "#3f6b5b", border: "1px solid #c8dfd4", padding: "1px 6px", borderRadius: 6, fontWeight: 700 }}>
                                      {ui.badgePrueba}
                                    </span>
                                  )}
                                </div>
                                <span style={{ fontSize: 11, color: "#6b7b74", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  {item.descCorta}
                                </span>
                              </div>
                            </div>

                            <ChevronRight size={16} color="#9cb0a5" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Banner inferior de suscripción o estado adaptado a Suelta */}
          <div style={{
            marginTop: 18,
            background: esUsuarioSubscrito 
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.05) 100%)"
              : "linear-gradient(135deg, #3f6b5b 0%, #2f5446 100%)",
            border: esUsuarioSubscrito ? "1.5px solid #a7f3d0" : "1.5px solid #2f5446",
            borderRadius: 18,
            padding: "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: esUsuarioSubscrito ? "none" : "0 4px 18px rgba(63,107,91,0.22)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{esUsuarioSubscrito ? "👑" : "✨"}</span>
              <div>
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: esUsuarioSubscrito ? "#065f46" : "#ffffff", fontFamily: "Playfair Display, Georgia, serif" }}>
                  {esUsuarioSubscrito ? ui.bannerActivoTitulo : ui.bannerPruebaTitulo}
                </h4>
                <p style={{ margin: 0, fontSize: 11.5, color: esUsuarioSubscrito ? "#047857" : "rgba(255,255,255,0.9)" }}>
                  {esUsuarioSubscrito ? ui.bannerActivoSub : ui.bannerPruebaSub}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (esUsuarioSubscrito) {
                  if (onNavegarModulo) onNavegarModulo("suscripcion");
                } else {
                  if (onVerPlanes) onVerPlanes();
                }
              }}
              style={{
                width: "100%",
                background: esUsuarioSubscrito ? "#059669" : "#ffffff",
                color: esUsuarioSubscrito ? "#ffffff" : "#2f5446",
                border: "none",
                borderRadius: 14,
                padding: "11px 16px",
                fontSize: 13,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
              }}
            >
              <span>{esUsuarioSubscrito ? ui.bannerActivoBtn : ui.bannerPruebaBtn}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Explicación Detallada del Ítem Seleccionado */}
      {itemDetalleActual && (
        <div
          data-no-swipe="true"
          data-modal-backdrop="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000000,
            background: "rgba(22, 36, 29, 0.62)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: 0,
            boxSizing: "border-box",
            overscrollBehavior: "contain",
            touchAction: "none"
          }}
          className="ss-fade no-swipe"
          onClick={() => setModalDetalleItem(null)}
        >
          <div
            data-no-swipe="true"
            data-modal-scrollable="true"
            style={{
              width: "100%",
              maxWidth: 480,
              maxHeight: "88dvh",
              background: "#faf8f3",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              border: "1.5px solid #d5e5dc",
              borderBottom: "none",
              padding: "16px 20px 28px",
              color: "#25332e",
              boxShadow: "0 -15px 45px rgba(22, 36, 29, 0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              boxSizing: "border-box"
            }}
            className="ss-slide-up"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              e.currentTarget._startY = touch.clientY;
              e.currentTarget._startX = touch.clientX;
            }}
            onTouchEnd={(e) => {
              if (e.currentTarget._startY !== undefined && e.changedTouches && e.changedTouches[0]) {
                const dy = e.changedTouches[0].clientY - e.currentTarget._startY;
                const dx = e.changedTouches[0].clientX - (e.currentTarget._startX || 0);
                if (dy > 65 || (dx > 75 && Math.abs(dx) > Math.abs(dy) * 1.3)) {
                  setModalDetalleItem(null);
                }
              }
            }}
          >
            {/* Manija de arrastre táctil / Pull indicator */}
            <div style={{ width: 44, height: 4.5, background: "#cfdbd5", borderRadius: 99, margin: "0 auto 4px" }} />

            {/* Cabecera del modal */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #eaf3ef 0%, #d8eae1 100%)",
                  border: "1.5px solid #c2dbd0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 27,
                  boxShadow: "0 4px 14px rgba(63, 107, 91, 0.14)",
                  flexShrink: 0
                }}>
                  {itemDetalleActual.icono}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      background: "rgba(111, 168, 146, 0.16)",
                      color: "#2f5446",
                      padding: "2px 8px",
                      borderRadius: 99,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      <Sparkles size={11} color="#3f6b5b" />
                      {ui.pasoBadge}
                    </span>
                    {completados[itemDetalleActual.id] && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        background: "#eaf3ef",
                        color: "#3f6b5b",
                        border: "1px solid #c8dfd4",
                        padding: "1px 7px",
                        borderRadius: 99
                      }}>
                        ✓ {ui.completadoBadge}
                      </span>
                    )}
                  </div>
                  <h3 style={{
                    margin: 0,
                    fontSize: 18.5,
                    fontWeight: 800,
                    color: "#25332e",
                    fontFamily: "Playfair Display, Georgia, serif",
                    lineHeight: 1.25,
                    letterSpacing: "-0.2px"
                  }}>
                    {itemDetalleActual.titulo}
                  </h3>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#61736b", lineHeight: 1.4 }}>
                    {itemDetalleActual.descCorta}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalDetalleItem(null)}
                style={{
                  background: "#eaf3ef",
                  border: "1px solid #cce0d6",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#2f5446",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0
                }}
                title={ui.cerrar}
              >
                <X size={16} />
              </button>
            </div>

            {/* ¿En qué consiste? / Fundamento */}
            <div style={{
              background: "#ffffff",
              padding: "14px 16px",
              borderRadius: 18,
              border: "1px solid #e1e0d6",
              borderLeft: "4px solid #3f6b5b",
              boxShadow: "0 2px 8px rgba(37, 51, 46, 0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <Leaf size={13} color="#3f6b5b" />
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#3f6b5b",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em"
                }}>
                  {ui.queEsTitulo}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#25332e", lineHeight: 1.55 }}>
                {itemDetalleActual.contenidoLargo?.queEs}
              </p>
            </div>

            {/* Lo que puedes hacer y practicar */}
            <div style={{
              background: "#ffffff",
              padding: "14px 16px",
              borderRadius: 18,
              border: "1px solid #e1e0d6",
              boxShadow: "0 2px 8px rgba(37, 51, 46, 0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <CheckCircle2 size={13} color="#6b7b74" />
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#6b7b74",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em"
                }}>
                  {ui.quePuedesHacerTitulo}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {itemDetalleActual.contenidoLargo?.quePuedesHacer?.map((punto, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12.5, color: "#25332e", lineHeight: 1.45 }}>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#eaf3ef",
                      border: "1px solid #c8dfd4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#3f6b5b",
                      fontSize: 11,
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: 1
                    }}>
                      ✓
                    </div>
                    <span>{punto}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción del modal de detalle */}
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4 }}>
              {itemDetalleActual.contenidoLargo?.destino && (
                <button
                  onClick={() => {
                    const destino = itemDetalleActual.contenidoLargo.destino;
                    setCompletados((prev) => {
                      const nuevo = { ...prev, [itemDetalleActual.id]: true };
                      guardarChecklist(nuevo);
                      return nuevo;
                    });
                    setModalDetalleItem(null);
                    onClose();
                    if (onNavegarModulo) {
                      onNavegarModulo(destino);
                    }
                  }}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #3f6b5b 0%, #29473c 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 16,
                    padding: "13.5px 18px",
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 6px 18px rgba(47, 84, 70, 0.28)",
                    transition: "transform 0.15s ease"
                  }}
                >
                  <span>{itemDetalleActual.contenidoLargo?.accionTexto || ui.irAModulo}</span>
                  <ArrowRight size={17} />
                </button>
              )}

              <button
                onClick={() => {
                  alternarItem(itemDetalleActual.id);
                  setModalDetalleItem(null);
                }}
                style={{
                  width: "100%",
                  background: "#ffffff",
                  color: completados[itemDetalleActual.id] ? "#b91c1c" : "#2f5446",
                  border: completados[itemDetalleActual.id] ? "1.5px solid #fecaca" : "1.5px solid #c8dfd4",
                  borderRadius: 14,
                  padding: "11px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  transition: "background 0.2s"
                }}
              >
                {completados[itemDetalleActual.id] ? (
                  <>
                    <X size={15} color="#b91c1c" />
                    <span>{ui.desmarcarCompletado}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} color="#3f6b5b" />
                    <span>{ui.marcarCompletado}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode;
}

export function TarjetaChecklistInicio({
  onAbrirGuia,
  esPremium = false,
  tieneAccesoTotal = false,
  planPago = "prueba",
  enPruebaActiva = false,
  idioma = "es"
}) {
  const [completados, setCompletados] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_LOCAL_CHECKLIST);
      return guardado ? JSON.parse(guardado) : {};
    } catch (_) {
      return {};
    }
  });

  const idiomaEfectivo = idioma || (typeof window !== "undefined" ? window.localStorage.getItem("suelta_idioma") : null) || "es";
  const lang = (idiomaEfectivo || "es").slice(0, 2).toLowerCase();
  const validLang = ["es", "en", "fr", "it"].includes(lang) ? lang : "es";
  const ui = getLocalizedGuiaUI(validLang);

  useEffect(() => {
    const handleStorage = () => {
      try {
        const guardado = window.localStorage.getItem(CLAVE_LOCAL_CHECKLIST);
        setCompletados(guardado ? JSON.parse(guardado) : {});
      } catch (_) {}
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const totalItems = 10;
  const count = Object.values(completados).filter(Boolean).length;
  const pct = Math.min(100, Math.round((count / totalItems) * 100));

  return (
    <div
      onClick={onAbrirGuia}
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f4f8f6 100%)",
        border: "1.5px solid #d7e6df",
        borderRadius: 18,
        padding: "14px 16px",
        margin: "8px 0 12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 4px 18px rgba(63, 107, 91, 0.07)",
        transition: "all 0.2s ease"
      }}
      className="ss-fade-scale"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "linear-gradient(135deg, #eaf3ef 0%, #d8eae1 100%)",
            border: "1px solid #c8dfd4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3f6b5b"
          }}>
            <Sparkles size={19} color="#3f6b5b" />
          </div>
          <div>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: "#25332e", display: "block", fontFamily: "Playfair Display, Georgia, serif" }}>
              {ui.tarjetaInicioTitulo}
            </span>
            <span style={{ fontSize: 11, color: "#6b7b74" }}>
              {ui.tarjetaInicioSub}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontSize: 11.5,
            fontWeight: 800,
            background: "#eaf3ef",
            color: "#3f6b5b",
            padding: "3px 9px",
            borderRadius: 99,
            border: "1px solid #c8dfd4"
          }}>
            {pct}%
          </span>
          <ChevronRight size={18} color="#6b7b74" />
        </div>
      </div>

      <div style={{ width: "100%", height: 6, background: "#e8eeeb", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, #6fa892, #3f6b5b)", borderRadius: 99, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}
