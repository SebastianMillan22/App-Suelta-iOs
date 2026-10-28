import HamburgerButton from "./HamburgerButton.jsx";
import React, { useState, useEffect } from "react";
import { 
  Bell, 
  BellRing, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  Plus, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Flame,
  Wind,
  Mic,
  Camera,
  Check,
  Languages
} from "lucide-react";
import { 
  solicitarPermisoNotificaciones, 
  obtenerEstadoPermiso, 
  obtenerEstadoPermisoAsync,
  asegurarCanalNotificacionesAndroid,
  enviarNotificacionNativa, 
  enviarRecordatorioInicialPrueba, 
  programarRecordatoriosDiarios,
  reproducirChimeCalmante,
  vibrarDispositivo,
  AFIRMACIONES_RECORDATORIOS,
  CONFIG_RECORDATORIOS_INICIAL
} from "../utils/nativeReminders";
import {
  solicitarPermisoMicrofono,
  solicitarPermisoCamara,
  consultarPermisosDispositivo,
  abrirSelectorCamaraNativa
} from "../utils/devicePermissions";
import { ModalGuiaPermisosAjustes } from "./ModalGuiaPermisosAjustes";
import { t } from "../data/translations.js";

export function ScreenRecordatoriosWidget({ 
  onBack, 
  onOpenMenu = null,
  nombre = "amigo/a", 
  retoDiaActual = 1, 
  retoCompletados = [], 
  idioma = "es",
  configInicial = null,
  onGuardarConfig = null,
  installPrompt = null
}) {
  const [permisoEstado, setPermisoEstado] = useState(obtenerEstadoPermiso());
  const [micEstado, setMicEstado] = useState("prompt");
  const [camEstado, setCamEstado] = useState("prompt");
  const [config, setConfig] = useState(() => {
    if (configInicial && typeof configInicial === "object") {
      return { ...CONFIG_RECORDATORIOS_INICIAL, ...configInicial };
    }
    try {
      const guardado = window.localStorage.getItem("suelta_recordatorios_config");
      if (guardado) return JSON.parse(guardado);
    } catch (e) {}
    return CONFIG_RECORDATORIOS_INICIAL;
  });

  const [nuevoHorario, setNuevoHorario] = useState("12:00");
  const [probandoNotif, setProbandoNotif] = useState(false);
  const [probandoMic, setProbandoMic] = useState(false);
  const [probandoCam, setProbandoCam] = useState(false);
  const [fotoPrueba, setFotoPrueba] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mostrarGuiaWidget, setMostrarGuiaWidget] = useState(false);
  const [modalPermisosTipo, setModalPermisosTipo] = useState(null); // "microfono" | "notificaciones" | "camara" | null
  const [widgetEstilo, setWidgetEstilo] = useState("afirmacion"); // "afirmacion" | "racha" | "respiracion"

  // Comprobar y actualizar el estado de permisos nativos al montar y cada vez que la app vuelve a primer plano
  const refrescarPermisos = async () => {
    try {
      await asegurarCanalNotificacionesAndroid();
      const stAsync = await obtenerEstadoPermisoAsync();
      const st = stAsync === "prompt-with-rationale" ? "prompt" : stAsync;
      setPermisoEstado(st);
      if (st === "granted") {
        setConfig((prev) => ({ ...prev, activo: true }));
      }
    } catch (e) {}

    try {
      const perm = await consultarPermisosDispositivo();
      if (perm.microfono) setMicEstado(perm.microfono);
      if (perm.camara) setCamEstado(perm.camara);
    } catch (e) {}
  };

  useEffect(() => {
    refrescarPermisos();

    // Cuando el usuario regresa de Ajustes de Android a la app, actualizar inmediatamente el estado a 'Activo'
    const handleFocus = () => {
      refrescarPermisos();
    };
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const handleSolicitarMic = async () => {
    setProbandoMic(true);
    const res = await solicitarPermisoMicrofono();
    setProbandoMic(false);
    if (res.ok) {
      setMicEstado("granted");
      setMensajeExito(t("¡Permiso de micrófono concedido! Ahora puedes usar el dictado por voz en tus historias, diario y reflexiones.", idioma) || "¡Permiso de micrófono concedido!");
      setTimeout(() => setMensajeExito(""), 5000);
    } else {
      setMicEstado("denied");
      setModalPermisosTipo("microfono");
    }
  };

  const handleSolicitarCam = async () => {
    setProbandoCam(true);
    const res = await solicitarPermisoCamara();
    setProbandoCam(false);
    if (res.ok) {
      setCamEstado("granted");
      setMensajeExito(t("¡Permiso de cámara concedido! Ahora puedes capturar tu foto de perfil o adjuntar fotos a tu diario.", idioma) || "¡Permiso de cámara concedido!");
      setTimeout(() => setMensajeExito(""), 5000);
    } else {
      setCamEstado("denied");
      setModalPermisosTipo("camara");
    }
  };

  const handleTomarFotoPrueba = () => {
    abrirSelectorCamaraNativa({
      facingMode: "user",
      onFotoCapturada: (dataUrl) => {
        setFotoPrueba(dataUrl);
        setCamEstado("granted");
        setMensajeExito(t("Foto de prueba capturada exitosamente con tu cámara.", idioma));
        setTimeout(() => setMensajeExito(""), 5000);
      }
    });
  };

  const actualizarConfig = (nuevoEstado) => {
    setConfig(nuevoEstado);
    try {
      window.localStorage.setItem("suelta_recordatorios_config", JSON.stringify(nuevoEstado));
    } catch (e) {}
    if (onGuardarConfig) {
      onGuardarConfig(nuevoEstado);
    }
    // Programar en el sistema operativo Android
    programarRecordatoriosDiarios(nuevoEstado);
  };

  const handleSolicitarPermiso = async () => {
    const res = await solicitarPermisoNotificaciones();
    const stAsync = await obtenerEstadoPermisoAsync();
    const nuevoPermiso = stAsync === "prompt-with-rationale" ? "prompt" : stAsync;
    setPermisoEstado(nuevoPermiso);

    if (res.ok || nuevoPermiso === "granted") {
      // Activar recordatorios en la configuración
      const updated = { ...config, activo: true };
      actualizarConfig(updated);

      // Enviar el recordatorio inicial de comprobación según el requerimiento del usuario
      await enviarRecordatorioInicialPrueba({ nombre, idioma });
      setMensajeExito(t("¡Permiso otorgado y recordatorio inicial de comprobación enviado a tu Android!", idioma) || "¡Permiso otorgado!");
      setTimeout(() => setMensajeExito(""), 6000);
    } else {
      setModalPermisosTipo("notificaciones");
    }
  };

  const handleProbarNotificacion = async () => {
    setProbandoNotif(true);
    const item = AFIRMACIONES_RECORDATORIOS[Math.floor(Math.random() * AFIRMACIONES_RECORDATORIOS.length)];
    
    await enviarNotificacionNativa({
      titulo: item.titulo,
      mensaje: item.mensaje,
      tag: "suelta-test-" + Date.now(),
      data: { url: "/#app" },
      reproducirSonido: config.sonido,
      vibrar: config.vibracion
    });

    setMensajeExito(t("Recordatorio de prueba enviado con éxito a tu dispositivo.", idioma) || "Recordatorio enviado con éxito.");
    setTimeout(() => {
      setProbandoNotif(false);
      setMensajeExito("");
    }, 4500);
  };

  const handleAgregarHorario = () => {
    if (!nuevoHorario || config.horarios.includes(nuevoHorario)) return;
    const ordenados = [...config.horarios, nuevoHorario].sort();
    actualizarConfig({ ...config, horarios: ordenados });
  };

  const handleEliminarHorario = (h) => {
    const filtrados = config.horarios.filter((item) => item !== h);
    actualizarConfig({ ...config, horarios: filtrados });
  };

  const handleInstalarWidget = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === "accepted") {
          actualizarConfig({ ...config, widgetInstalado: true });
          setMensajeExito(t("¡Widget y aplicación añadidos con éxito a tu pantalla principal!", idioma) || "¡Widget añadido con éxito!");
          setTimeout(() => setMensajeExito(""), 5000);
          return;
        }
      } catch (e) {
        console.warn("Prompt de instalación:", e);
      }
    }
    // Si no está disponible el evento automático, abrir guía nativa de Android
    setMostrarGuiaWidget(true);
  };

  const rachaDias = retoCompletados.length || retoDiaActual;

  return (
    <div className="ss-fade" style={{ padding: "0 20px 30px", minHeight: "100%", display: "flex", flexDirection: "column", background: "#fcfaf7" }}>
      {/* TopBar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 12px", borderBottom: "1px solid #e7dfd5" }}>
        <button 
          onClick={onBack}
          style={{ background: "transparent", border: "none", color: "#3f6b5b", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
        >
          {t("← Volver", idioma)}
        </button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, margin: 0, color: "#2d3748", fontWeight: 700 }}>
          {t("Recordatorios y Widget Android", idioma)}
        </h2>
        {onOpenMenu ? (
          <HamburgerButton onClick={onOpenMenu} />
        ) : (
          <div style={{ width: 40 }} />
        )}
      </div>

      <div className="ss-stagger ss-no-scrollbar" style={{ flex: 1, marginTop: 14, overflowY: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
        
        {/* Banner de Éxito Flotante */}
        {mensajeExito && (
          <div style={{
            background: "#e8f5e9",
            border: "1px solid #c8e6c9",
            borderRadius: 14,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#2e7d32",
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(46,125,50,0.12)",
            animation: "fadeIn 0.3s ease"
          }}>
            <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
            <span>{mensajeExito}</span>
          </div>
        )}

        {/* 1. ESTADO DE PERMISOS NATIVOS DE ANDROID & DISPOSITIVO MÓVIL */}
        <div style={{
          background: "white",
          border: "1px solid #e7dfd5",
          borderRadius: 18,
          padding: "18px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2d3748", margin: "0 0 4px" }}>
              {t("Permisos y Funciones del Dispositivo Móvil", idioma)}
            </h3>
            <p style={{ fontSize: 12.5, color: "#718096", margin: 0, lineHeight: 1.45 }}>
              {t("Administra y activa los permisos de tu Android para una experiencia 100% fluida.", idioma)}
            </p>
          </div>

          {/* ITEM 1: NOTIFICACIONES */}
          <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: permisoEstado === "granted" ? "#e8f5e9" : "#fff3e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: permisoEstado === "granted" ? "#2e7d32" : "#e65100",
                  flexShrink: 0
                }}>
                  {permisoEstado === "granted" ? <BellRing size={20} /> : <Bell size={20} />}
                </div>
                <div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#2d3748", margin: "0 0 2px" }}>
                    {t("Notificaciones y Recordatorios", idioma)}
                  </h4>
                  <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    {permisoEstado === "granted" 
                      ? t("Autorizado: Recordatorios a la barra de estado y pantalla de bloqueo.", idioma)
                      : t("Para recibir afirmaciones diarias y pausas de respiración a tiempo.", idioma)}
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 999,
                background: permisoEstado === "granted" ? "#e8f5e9" : "#fee2e2",
                color: permisoEstado === "granted" ? "#2e7d32" : "#b91c1c"
              }}>
                {permisoEstado === "granted" ? t("Activo", idioma) : t("Pendiente", idioma)}
              </span>
            </div>

            {permisoEstado !== "granted" ? (
              <button
                onClick={handleSolicitarPermiso}
                className="ss-btn"
                style={{
                  width: "100%",
                  marginTop: 10,
                  background: "#3f6b5b",
                  color: "white",
                  padding: "10px 0",
                  fontSize: 12.5,
                  fontWeight: 700,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <BellRing size={14} /> {t("Activar Notificaciones", idioma)}
              </button>
            ) : (
              <button
                onClick={handleProbarNotificacion}
                disabled={probandoNotif}
                className="ss-btn"
                style={{
                  width: "100%",
                  marginTop: 8,
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#166534",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "8px 0",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <Sparkles size={13} /> {probandoNotif ? t("Enviando...", idioma) : t("Probar recordatorio ahora", idioma)}
              </button>
            )}
          </div>

          {/* ITEM 2: MICRÓFONO & DICTADO POR VOZ */}
          <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: micEstado === "granted" ? "#e8f5e9" : "#e0f2fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: micEstado === "granted" ? "#2e7d32" : "#0284c7",
                  flexShrink: 0
                }}>
                  <Mic size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#2d3748", margin: "0 0 2px" }}>
                    {t("Micrófono (Dictado por Voz)", idioma)}
                  </h4>
                  <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    {micEstado === "granted" 
                      ? t("Autorizado: Dicta tus historias, reflexiones y diario en voz alta.", idioma)
                      : t("Permite contar tus emociones hablando sin necesidad de escribir.", idioma)}
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 999,
                background: micEstado === "granted" ? "#e8f5e9" : "#f1f5f9",
                color: micEstado === "granted" ? "#2e7d32" : "#475569"
              }}>
                {micEstado === "granted" ? t("Activo", idioma) : t("Solicitar", idioma)}
              </span>
            </div>

            <button
              onClick={handleSolicitarMic}
              disabled={probandoMic}
              className="ss-btn"
              style={{
                width: "100%",
                marginTop: 10,
                background: micEstado === "granted" ? "#f0fdf4" : "#3f6b5b",
                border: micEstado === "granted" ? "1px solid #bbf7d0" : "none",
                color: micEstado === "granted" ? "#166534" : "white",
                padding: "9px 0",
                fontSize: 12.5,
                fontWeight: 700,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6
              }}
            >
              <Mic size={14} /> {probandoMic ? t("Comprobando...", idioma) : micEstado === "granted" ? t("Comprobar y Probar Micrófono", idioma) : t("Habilitar Permiso de Micrófono", idioma)}
            </button>
          </div>

          {/* ITEM 3: CÁMARA & FOTOGRAFÍA */}
          <div style={{ padding: "12px", background: "#f8fafc", borderRadius: 14, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: camEstado === "granted" ? "#e8f5e9" : "#fdf4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: camEstado === "granted" ? "#2e7d32" : "#c026d3",
                  flexShrink: 0
                }}>
                  <Camera size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#2d3748", margin: "0 0 2px" }}>
                    {t("Cámara del Dispositivo", idioma)}
                  </h4>
                  <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    {camEstado === "granted" 
                      ? t("Autorizada: Para foto de perfil y registro visual de bienestar.", idioma)
                      : t("Permite tomar fotos directamente desde tu celular para tu perfil y diario.", idioma)}
                  </p>
                </div>
              </div>
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 999,
                background: camEstado === "granted" ? "#e8f5e9" : "#f1f5f9",
                color: camEstado === "granted" ? "#2e7d32" : "#475569"
              }}>
                {camEstado === "granted" ? t("Activo", idioma) : t("Solicitar", idioma)}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button
                onClick={handleSolicitarCam}
                disabled={probandoCam}
                className="ss-btn"
                style={{
                  flex: 1,
                  background: "#3f6b5b",
                  color: "white",
                  padding: "9px 0",
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <Camera size={14} /> {probandoCam ? t("Verificando...", idioma) : t("Habilitar Cámara", idioma)}
              </button>
              <button
                onClick={handleTomarFotoPrueba}
                className="ss-btn"
                style={{
                  flex: 1,
                  background: "#fdf4ff",
                  border: "1px solid #f5d0fe",
                  color: "#a21caf",
                  padding: "9px 0",
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                {t("📸 Tomar Foto", idioma)}
              </button>
            </div>

            {fotoPrueba && (
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, background: "white", padding: "8px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <img src={fotoPrueba} alt="Foto prueba" style={{ width: 42, height: 42, borderRadius: 8, objectFit: "cover" }} />
                <span style={{ fontSize: 11.5, color: "#166534", fontWeight: 600 }}>{t("Foto de prueba capturada exitosamente con tu cámara.", idioma)}</span>
              </div>
            )}
          </div>

          {/* ITEM 4: AUTOCORRECTOR & TECLADO */}
          <div style={{ padding: "12px", background: "#f0fdf4", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a", flexShrink: 0 }}>
                <Languages size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: 13.5, fontWeight: 700, color: "#166534", margin: "0 0 2px" }}>
                  {t("Autocorrector y Teclado Activo", idioma)}
                </h4>
                <p style={{ fontSize: 11.5, color: "#15803d", margin: 0, lineHeight: 1.4 }}>
                  {t("Corrección ortográfica, sugerencias inteligentes y mayúsculas automáticas habilitadas en toda la app.", idioma)}
                </p>
              </div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "#dcfce7", color: "#166534" }}>
              {t("100% LIBRE", idioma)}
            </span>
          </div>
        </div>

        {/* 2. WIDGET DE PANTALLA PRINCIPAL (DISPOSITIVO ANDROID) */}
        <div style={{
          background: "linear-gradient(145deg, #ffffff 0%, #f7fbf9 100%)",
          border: "1px solid #d1e7dd",
          borderRadius: 20,
          padding: "18px",
          boxShadow: "0 6px 18px rgba(63,107,91,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Smartphone size={20} color="#3f6b5b" />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2d3748", margin: 0 }}>
                {t("Widget para Pantalla Principal", idioma)}
              </h3>
            </div>
            <span style={{ fontSize: 11, background: "#e8f5e9", color: "#2e7d32", padding: "3px 8px", borderRadius: 6, fontWeight: 700 }}>
              {t("Android Nativo", idioma)}
            </span>
          </div>

          <p style={{ fontSize: 12.5, color: "#718096", margin: "0 0 14px", lineHeight: 1.45 }}>
            {t("Instala el widget interactivo en la pantalla de inicio de tu celular para ver tu afirmación diaria y racha sin abrir la app:", idioma)}
          </p>

          {/* Selector de Estilo de Widget */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
            {[
              { id: "afirmacion", label: t("✨ Afirmación", idioma) },
              { id: "racha", label: t("🔥 Reto 21 Días", idioma) },
              { id: "respiracion", label: t("🌬️ Respirar", idioma) }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setWidgetEstilo(st.id)}
                style={{
                  padding: "8px 4px",
                  borderRadius: 10,
                  fontSize: 11.5,
                  fontWeight: widgetEstilo === st.id ? 700 : 500,
                  background: widgetEstilo === st.id ? "#3f6b5b" : "white",
                  color: widgetEstilo === st.id ? "white" : "#4a5568",
                  border: `1px solid ${widgetEstilo === st.id ? "#3f6b5b" : "#e2e8f0"}`,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* VISTA PREVIA DEL WIDGET EN PANTALLA PRINCIPAL */}
          <div style={{
            background: "linear-gradient(135deg, #2d4a3e 0%, #1a3027 100%)",
            borderRadius: 18,
            padding: "16px",
            color: "white",
            boxShadow: "0 8px 24px rgba(26,48,39,0.25)",
            position: "relative",
            overflow: "hidden",
            marginBottom: 16
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>🌿</span>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: "#a7f3d0" }}>¡SUELTA! WIDGET</span>
              </div>
              <span style={{ fontSize: 10, background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: 999 }}>
                {t("Hoy", idioma)}
              </span>
            </div>

            {widgetEstilo === "afirmacion" && (
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, margin: "0 0 8px", lineHeight: 1.4, color: "#fefefe", fontStyle: "italic" }}>
                  "{t("Hoy reconozco lo que mi cuerpo expresa y me permito soltar la tensión con amor.", idioma) || "Hoy reconozco lo que mi cuerpo expresa y me permito soltar la tensión con amor."}"
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#cbd5e1" }}>{t("Hola", idioma)}, {nombre}</span>
                  <span style={{ fontSize: 11, color: "#fef08a", fontWeight: 700 }}>🔥 {t("Día", idioma)} {retoDiaActual} {t("del Reto", idioma)}</span>
                </div>
              </div>
            )}

            {widgetEstilo === "racha" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 10px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(254,240,138,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fef08a" }}>
                    <Flame size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{t("Racha Activa:", idioma)} {rachaDias} {rachaDias === 1 ? t("día", idioma) : t("días", idioma)}</h4>
                    <p style={{ margin: 0, fontSize: 11.5, color: "#cbd5e1" }}>{t("Progreso de reprogramación bioemocional", idioma)}</p>
                  </div>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(100, (rachaDias / 21) * 100)}%`, height: "100%", background: "#fef08a", borderRadius: 999 }} />
                </div>
              </div>
            )}

            {widgetEstilo === "respiracion" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Wind size={20} color="#a7f3d0" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t("Pausa Somática 4-7-8", idioma)}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#a7f3d0", fontWeight: 700 }}>528 Hz</span>
                </div>
                <p style={{ fontSize: 11.5, color: "#e2e8f0", margin: "0 0 6px", lineHeight: 1.4 }}>
                  {t("Toca el widget para activar 3 respiraciones profundas y regular tu nervio vago.", idioma)}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleInstalarWidget}
            className="ss-btn ss-bounce"
            style={{
              width: "100%",
              background: "#3f6b5b",
              color: "white",
              padding: "12px 0",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(63,107,91,0.2)"
            }}
          >
            <Smartphone size={16} /> {t("Instaurar Widget en Pantalla Principal", idioma)}
          </button>
        </div>

        {/* Modal / Guía Paso a Paso para Instaurar Widget en Android */}
        {mostrarGuiaWidget && (
          <div style={{
            background: "#ffffff",
            border: "1.5px solid #3f6b5b",
            borderRadius: 18,
            padding: "16px 18px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#2d3748", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                {t("📱 Cómo añadir a la pantalla de tu móvil Android:", idioma)}
              </h4>
              <button 
                onClick={() => setMostrarGuiaWidget(false)}
                style={{ background: "transparent", border: "none", color: "#718096", fontSize: 16, cursor: "pointer", fontWeight: 700 }}
              >
                ✕
              </button>
            </div>
            <ol style={{ fontSize: 12.5, color: "#4a5568", paddingLeft: 18, margin: "0 0 12px", lineHeight: 1.6 }}>
              <li><strong>{t("Mantén presionado el icono de la app Suelta en tu pantalla de inicio o cajón de aplicaciones.", idioma)}</strong></li>
              <li>{t("Toca en \"Widgets\" o \"Accesos directos\" en el menú flotante que aparece sobre el icono.", idioma)}</li>
              <li>{t("Arrastra tu widget de afirmación, racha o respiración al espacio deseado de tu pantalla de inicio.", idioma)}</li>
              <li><strong>{t("¡Listo! Tu progreso y afirmaciones diarias se actualizarán automáticamente sin consumir batería adicional.", idioma)}</strong></li>
            </ol>
            <button
              onClick={() => setMostrarGuiaWidget(false)}
              className="ss-btn ss-btn-ghost"
              style={{ width: "100%", fontSize: 12, padding: "8px 0" }}
            >
              {t("Entendido", idioma)}
            </button>
          </div>
        )}

        {/* 3. PROGRAMACIÓN DE HORARIOS Y FRECUENCIA */}
        <div style={{
          background: "white",
          border: "1px solid #e7dfd5",
          borderRadius: 18,
          padding: "18px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} color="#3f6b5b" />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2d3748", margin: 0 }}>
                {t("Horarios y Frecuencia de Envío", idioma)}
              </h3>
            </div>
            
            {/* Switch Activo / Inactivo */}
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, color: config.activo ? "#2e7d32" : "#718096" }}>
              <span>{config.activo ? t("Activado", idioma) : t("Pausado", idioma)}</span>
              <input
                type="checkbox"
                checked={config.activo}
                onChange={(e) => {
                  const nuevo = { ...config, activo: e.target.checked };
                  actualizarConfig(nuevo);
                }}
                style={{ accentColor: "#3f6b5b", width: 18, height: 18 }}
              />
            </label>
          </div>

          {/* Modo de Programación */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <button
              onClick={() => actualizarConfig({ ...config, modo: "horarios" })}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: config.modo === "horarios" ? 700 : 500,
                background: config.modo === "horarios" ? "#f1f7f4" : "#f8fafc",
                color: config.modo === "horarios" ? "#3f6b5b" : "#64748b",
                border: `1px solid ${config.modo === "horarios" ? "#3f6b5b" : "#e2e8f0"}`,
                cursor: "pointer"
              }}
            >
              {t("Horas Fijas al Día", idioma)}
            </button>
            <button
              onClick={() => actualizarConfig({ ...config, modo: "intervalo" })}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 10,
                fontSize: 12,
                fontWeight: config.modo === "intervalo" ? 700 : 500,
                background: config.modo === "intervalo" ? "#f1f7f4" : "#f8fafc",
                color: config.modo === "intervalo" ? "#3f6b5b" : "#64748b",
                border: `1px solid ${config.modo === "intervalo" ? "#3f6b5b" : "#e2e8f0"}`,
                cursor: "pointer"
              }}
            >
              {t("Cada X Horas", idioma)}
            </button>
          </div>

          {config.modo === "horarios" ? (
            <div>
              <p style={{ fontSize: 12, color: "#718096", margin: "0 0 10px" }}>
                {t("Elige las horas exactas en las que tu dispositivo te recordará tu práctica:", idioma)}
              </p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {config.horarios.map((h) => (
                  <span
                    key={h}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#f1f7f4",
                      border: "1px solid #3f6b5b",
                      color: "#3f6b5b",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 700
                    }}
                  >
                    ⏰ {h}
                    <button
                      onClick={() => handleEliminarHorario(h)}
                      style={{ background: "transparent", border: "none", color: "#b91c1c", cursor: "pointer", padding: 0, marginLeft: 2, display: "flex" }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Agregar nuevo horario */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="time"
                  value={nuevoHorario}
                  onChange={(e) => setNuevoHorario(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    fontFamily: "inherit",
                    background: "#f8fafc"
                  }}
                />
                <button
                  onClick={handleAgregarHorario}
                  style={{
                    background: "#3f6b5b",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "8px 14px",
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <Plus size={15} /> {t("Añadir hora", idioma)}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 12, color: "#718096", margin: "0 0 10px" }}>
                {t("Frecuencia continua durante el día:", idioma)}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
                {[2, 4, 6, 8].map((hrs) => (
                  <button
                    key={hrs}
                    onClick={() => actualizarConfig({ ...config, intervaloHoras: hrs })}
                    style={{
                      padding: "10px 0",
                      borderRadius: 10,
                      fontSize: 12,
                      fontWeight: config.intervaloHoras === hrs ? 700 : 500,
                      background: config.intervaloHoras === hrs ? "#3f6b5b" : "#f8fafc",
                      color: config.intervaloHoras === hrs ? "white" : "#4a5568",
                      border: `1px solid ${config.intervaloHoras === hrs ? "#3f6b5b" : "#e2e8f0"}`,
                      cursor: "pointer"
                    }}
                  >
                    {t("Cada", idioma)} {hrs}h
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. TIPOS DE RECORDATORIOS Y PREFERENCIAS SENSORIALES */}
        <div style={{
          background: "white",
          border: "1px solid #e7dfd5",
          borderRadius: 18,
          padding: "18px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "#2d3748", margin: "0 0 12px" }}>
            {t("Tipos de Recordatorios & Sensaciones", idioma)}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {[
              { id: "afirmacion", label: t("🌿 Afirmaciones & Epigenética", idioma), desc: t("Pensamientos sanadores para regular tus células", idioma) },
              { id: "respiracion", label: t("🌬️ Pausas de Respiración Somática", idioma), desc: t("Ejercicios de calma y reducción de cortisol", idioma) },
              { id: "reto", label: t("🔥 Práctica del Reto de 21 Días", idioma), desc: t("Avanzar en tu camino diario de autodescubrimiento", idioma) },
              { id: "diario", label: t("📓 Escritura en Diario BuJo", idioma), desc: t("Espacio para nombrar emociones y gratitud", idioma) }
            ].map((cat) => (
              <label 
                key={cat.id} 
                style={{ 
                  display: "flex", 
                  alignItems: "flex-start", 
                  justifyContent: "space-between", 
                  gap: 10, 
                  padding: "10px 12px", 
                  background: "#f8fafc", 
                  borderRadius: 12, 
                  cursor: "pointer" 
                }}
              >
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#2d3748", display: "block" }}>{cat.label}</span>
                  <span style={{ fontSize: 11.5, color: "#718096" }}>{cat.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={!!config.categorias[cat.id]}
                  onChange={(e) => {
                    const nuevasCat = { ...config.categorias, [cat.id]: e.target.checked };
                    actualizarConfig({ ...config, categorias: nuevasCat });
                  }}
                  style={{ accentColor: "#3f6b5b", width: 18, height: 18, marginTop: 2 }}
                />
              </label>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
            <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "#2d3748", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={config.sonido}
                onChange={(e) => {
                  if (e.target.checked) reproducirChimeCalmante();
                  actualizarConfig({ ...config, sonido: e.target.checked });
                }}
                style={{ accentColor: "#3f6b5b", width: 16, height: 16 }}
              />
              <Volume2 size={16} color="#3f6b5b" /> {t("Chime 528 Hz", idioma)}
            </label>

            <label style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "#2d3748", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={config.vibracion}
                onChange={(e) => {
                  if (e.target.checked) vibrarDispositivo([150, 60, 150]);
                  actualizarConfig({ ...config, vibracion: e.target.checked });
                }}
                style={{ accentColor: "#3f6b5b", width: 16, height: 16 }}
              />
              <Vibrate size={16} color="#3f6b5b" /> {t("Vibración Háptica", idioma)}
            </label>
          </div>
        </div>

        {/* Botón de Guardar & Volver */}
        <button
          onClick={onBack}
          className="ss-btn ss-btn-primary"
          style={{ width: "100%", padding: "14px 0", fontSize: 14, fontWeight: 700, borderRadius: 14 }}
        >
          {t("Guardar y Continuar", idioma)}
        </button>

        {/* Modal Paso a Paso y Redirección a Ajustes de Android */}
        <ModalGuiaPermisosAjustes
          isOpen={!!modalPermisosTipo}
          onClose={() => setModalPermisosTipo(null)}
          tipo={modalPermisosTipo}
          idioma={idioma}
          onReintentar={() => {
            if (modalPermisosTipo === "microfono") handleSolicitarMic();
            else if (modalPermisosTipo === "notificaciones") handleSolicitarPermiso();
            else if (modalPermisosTipo === "camara") handleSolicitarCam();
          }}
        />

      </div>
    </div>
  );
}
