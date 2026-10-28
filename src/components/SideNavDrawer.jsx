import React, { useEffect, useRef } from "react";
import {
  Home,
  User,
  Sparkles,
  Compass,
  Heart,
  BookOpen,
  Users,
  Award,
  Globe,
  Settings,
  HelpCircle,
  LogOut,
  X,
  ChevronRight,
  Shield,
  Activity,
  Smile,
  Moon,
  Leaf,
  Bell
} from "lucide-react";
import { t } from "../data/translations";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";

export default function SideNavDrawer({
  isOpen,
  onClose,
  currentStage,
  hubItemId = null,
  onNavigate,
  user = {},
  idioma = "es",
  onOpenIdiomaModal,
  onOpenTutorial,
  onOpenGuiaChecklist,
  onCerrarSesion,
  onVerSuscripcion,
  esPremium = false,
  planPago = "free",
  tieneAccesoTotal = false,
  enPruebaActiva = false,
  pruebaExpirada = false,
  diaPruebaActual = 1,
  diasRestantesPrueba = 0,
  onAbrirModalPrueba = null
}) {
  useBloquearScrollFondo(isOpen);
  const drawerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Escuchar tecla Escape para cerrar
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Manejo de gestos táctiles para deslizar y cerrar hacia la izquierda
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Si desliza hacia la izquierda más de 45px y el gesto fue horizontal
    if (diffX < -45 && diffY < 80) {
      onClose();
    }
  };

  const nombreMostrado = user.apodo || user.nombre || (idioma === "en" ? "Friend" : idioma === "fr" ? "Ami(e)" : idioma === "it" ? "Amico/a" : "Caminante");
  const inicial = (nombreMostrado.trim().charAt(0) || "S").toUpperCase();

  const getSubtitulo = () => {
    if (tieneAccesoTotal) {
      return idioma === "en" ? "👑 Full Access (VIP)" : idioma === "fr" ? "👑 Accès Total (VIP)" : idioma === "it" ? "👑 Accesso Totale (VIP)" : "👑 Acceso Total (VIP)";
    }
    if (esPremium && planPago === "anual") {
      return idioma === "en" ? "Annual Member" : idioma === "fr" ? "Membre Annuel" : idioma === "it" ? "Membro Annuale" : "Miembro Anual";
    }
    if (esPremium && planPago === "mensual") {
      return idioma === "en" ? "Premium Member" : idioma === "fr" ? "Membre Premium" : idioma === "it" ? "Membro Premium" : "Miembro Premium";
    }
    if (enPruebaActiva) {
      return idioma === "en" ? `🌱 Day ${diaPruebaActual}/3 (${diasRestantesPrueba}d left)` : idioma === "fr" ? `🌱 Jour ${diaPruebaActual}/3 (${diasRestantesPrueba}j restants)` : idioma === "it" ? `🌱 Giorno ${diaPruebaActual}/3 (${diasRestantesPrueba}g restanti)` : `🌱 Prueba · Día ${diaPruebaActual}/3 (${diasRestantesPrueba}d restantes)`;
    }
    if (pruebaExpirada) {
      return idioma === "en" ? "🔒 3 Days Ended" : idioma === "fr" ? "🔒 3 Jours Terminés" : idioma === "it" ? "🔒 3 Giorni Conclusi" : "🔒 3 días cumplidos";
    }
    return idioma === "en" ? "Wellness Journey" : idioma === "fr" ? "Espace Bien-être" : idioma === "it" ? "Viaggio Benessere" : "Caminante de bienestar";
  };

  const tieneAccesoModulos = tieneAccesoTotal || esPremium || enPruebaActiva;
  const bloqueaModulosGenerales = !tieneAccesoModulos;
  const bloqueaEspecialistas = !tieneAccesoTotal && planPago !== "anual";

  const menuPrincipal = [
    {
      id: "inicio",
      label: t("Inicio", idioma),
      icon: Home,
      stage: "inicio"
    },
    {
      id: "perfil",
      label: t("Mi perfil", idioma),
      icon: User,
      stage: "perfil"
    },
    {
      id: "reto",
      label: t("Mi reto", idioma),
      icon: Leaf,
      stage: "reto",
      bloqueado: bloqueaModulosGenerales,
      badge: bloqueaModulosGenerales ? "🔒" : null
    },
    {
      id: "herramientas",
      label: t("Calma", idioma),
      icon: Moon,
      stage: "herramientas",
      bloqueado: bloqueaModulosGenerales,
      badge: bloqueaModulosGenerales ? "🔒" : null
    },
    {
      id: "hub",
      label: t("Perspectivas", idioma),
      icon: Compass,
      stage: "hub",
      bloqueado: bloqueaModulosGenerales,
      badge: bloqueaModulosGenerales ? "🔒" : null
    },
    {
      id: "diario",
      label: t("Diario", idioma),
      icon: BookOpen,
      stage: "diario"
    },
    {
      id: "cuestionarios",
      label: idioma === "en" ? "Questionnaires" : idioma === "fr" ? "Questionnaires" : idioma === "it" ? "Questionari" : "Cuestionarios",
      icon: Sparkles,
      stage: "cuestionarios"
    },
    {
      id: "recordatoriosWidget",
      label: idioma === "en" ? "Reminders & Widget" : idioma === "fr" ? "Rappels & Widget" : idioma === "it" ? "Promemoria & Widget" : "Recordatorios & Widget",
      icon: Bell,
      stage: "recordatoriosWidget"
    },
    {
      id: "especialistas",
      label: t("Expertos", idioma),
      icon: Users,
      stage: "especialistas",
      bloqueado: bloqueaEspecialistas,
      badge: bloqueaEspecialistas ? "🔒" : null
    }
  ];

  const handleItemClick = (item) => {
    if (item.stage) {
      onNavigate(item.stage, item.bloqueado);
      onClose();
    }
  };

  const getIdiomaLabel = () => {
    const mapa = { es: "Español", en: "English", fr: "Français", it: "Italiano" };
    return mapa[idioma] || "Español";
  };

  return (
    <aside
      ref={drawerRef}
      id="suelta-lateral-drawer"
      aria-label="Menú lateral de navegación"
      aria-hidden={!isOpen}
      data-modal-scrollable="true"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "82%",
        maxWidth: 320,
        height: "100%",
        backgroundColor: "#548373",
        backgroundImage: "linear-gradient(165deg, #5b8d7c 0%, #467263 55%, #385e51 100%)",
        color: "#ffffff",
        zIndex: 100005,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "env(safe-area-inset-top, 24px) 0 env(safe-area-inset-bottom, 24px)",
        boxShadow: isOpen ? "12px 0 36px rgba(0,0,0,0.3)" : "none",
        transform: isOpen ? "translateX(0)" : "translateX(-105%)",
        opacity: isOpen ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
        overflowY: "auto",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        pointerEvents: isOpen ? "auto" : "none",
        fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif"
      }}
    >
      {/* SECCIÓN SUPERIOR: PERFIL DEL USUARIO */}
      <div style={{ padding: "18px 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <button
            onClick={() => {
              onNavigate("perfil");
              onClose();
            }}
            id="btn-drawer-perfil-header"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "left",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            {/* Avatar circular */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.22)",
                border: "2px solid rgba(255, 255, 255, 0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                flexShrink: 0
              }}
            >
              {inicial}
            </div>

            {/* Nombre y subtítulo */}
            <div style={{ overflow: "hidden" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "-0.2px",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
              >
                {nombreMostrado}
              </h2>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: 13,
                  color: "rgba(255, 255, 255, 0.78)",
                  fontWeight: 400,
                  lineHeight: 1.2
                }}
              >
                {getSubtitulo()}
              </p>
            </div>
          </button>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            id="btn-cerrar-drawer"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>

        {/* Línea divisoria elegante */}
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.18)",
            margin: "12px 0 6px"
          }}
        />
      </div>

      {/* LISTA DE ELEMENTOS PRINCIPALES DE NAVEGACIÓN */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, paddingRight: 16 }}>
        {menuPrincipal.map((item) => {
          const IconComponent = item.icon;
          const esEspecialistasActivo = (item.stage === "especialistas" && currentStage === "especialistas") || (item.stage === "especialistas" && currentStage === "hubDetalle" && hubItemId === "especialistas");
          const esHubActivo = (item.stage === "hub" && currentStage === "hub") || (item.stage === "hub" && currentStage === "hubDetalle" && hubItemId !== "especialistas");
          const esActivo = esEspecialistasActivo || esHubActivo || (item.stage === "herramientas" && currentStage === "herramientaDetalle") || (item.stage === "cuestionarios" && currentStage === "cuestionarioDetalle") || currentStage === item.stage;

          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleItemClick(item)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                width: "100%",
                padding: "13px 22px 13px 24px",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
                fontSize: 15.5,
                fontWeight: esActivo ? 600 : 450,
                // Estilo píldora activa redondeada a la derecha exactamente como la referencia
                backgroundColor: esActivo ? "#ffffff" : "transparent",
                color: esActivo ? "#345e50" : "rgba(255, 255, 255, 0.92)",
                borderRadius: esActivo ? "0 999px 999px 0" : "0 14px 14px 0",
                boxShadow: esActivo ? "0 4px 18px rgba(0,0,0,0.12)" : "none",
                transition: "all 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                position: "relative"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  color: esActivo ? "#345e50" : "rgba(255, 255, 255, 0.92)",
                  transition: "transform 0.2s ease"
                }}
              >
                <IconComponent size={21} strokeWidth={esActivo ? 2.4 : 2} />
              </div>

              <span style={{ flex: 1, letterSpacing: "-0.1px" }}>
                {item.label}
              </span>

              {item.badge && !esActivo && (
                <span
                  style={{
                    fontSize: 11,
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "#ffffff",
                    padding: "2px 7px",
                    borderRadius: 99,
                    fontWeight: 600
                  }}
                >
                  {item.badge}
                </span>
              )}

              {item.bloqueado && (
                <span style={{ fontSize: 13, opacity: 0.75 }}>🔒</span>
              )}
            </button>
          );
        })}

        {/* SEGUNDA SECCIÓN: AJUSTES, SUSCRIPCIÓN, IDIOMA Y GUÍA */}
        <div
          style={{
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.18)",
            margin: "12px 24px 10px"
          }}
        />

        {/* Mi suscripción */}
        <button
          id="nav-item-suscripcion"
          onClick={() => {
            if (onVerSuscripcion) onVerSuscripcion();
            else onNavigate("suscripcion");
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            width: "100%",
            padding: "11px 22px 11px 24px",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
            fontSize: 14.5,
            fontWeight: currentStage === "suscripcion" ? 600 : 400,
            backgroundColor: currentStage === "suscripcion" ? "#ffffff" : "transparent",
            color: currentStage === "suscripcion" ? "#345e50" : "rgba(255, 255, 255, 0.88)",
            borderRadius: currentStage === "suscripcion" ? "0 999px 999px 0" : "0 14px 14px 0",
            transition: "all 0.25s ease"
          }}
        >
          <Award size={19} strokeWidth={2} />
          <span style={{ flex: 1 }}>{t("Suscripción", idioma)}</span>
          {esPremium ? (
            <span style={{ fontSize: 10, backgroundColor: "rgba(255,255,255,0.25)", padding: "2px 6px", borderRadius: 99 }}>PRO</span>
          ) : null}
        </button>

        {/* Selector de idioma */}
        {onOpenIdiomaModal && (
          <button
            id="nav-item-idioma"
            onClick={() => {
              onOpenIdiomaModal();
              onClose();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              padding: "11px 22px 11px 24px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              fontSize: 14.5,
              fontWeight: 400,
              backgroundColor: "transparent",
              color: "rgba(255, 255, 255, 0.88)",
              borderRadius: "0 14px 14px 0",
              transition: "all 0.25s ease"
            }}
          >
            <Globe size={19} strokeWidth={2} />
            <span style={{ flex: 1 }}>{idioma === "en" ? "Language" : idioma === "fr" ? "Langue" : idioma === "it" ? "Lingua" : "Idioma"}</span>
            <span
              style={{
                fontSize: 11.5,
                backgroundColor: "rgba(255,255,255,0.22)",
                padding: "2px 8px",
                borderRadius: 99,
                fontWeight: 600,
                letterSpacing: "0.5px"
              }}
            >
              {idioma.toUpperCase()}
            </span>
          </button>
        )}

        {/* Guía y Checklist Paso a Paso */}
        {(onOpenGuiaChecklist || onOpenTutorial) && (
          <button
            id="nav-item-tutorial"
            onClick={() => {
              if (onOpenGuiaChecklist) onOpenGuiaChecklist();
              else if (onOpenTutorial) onOpenTutorial();
              onClose();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              padding: "11px 22px 11px 24px",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              fontSize: 14.5,
              fontWeight: 500,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
              borderRadius: "0 14px 14px 0",
              transition: "all 0.25s ease",
              marginTop: 2
            }}
          >
            <Sparkles size={19} strokeWidth={2} color="#34d399" />
            <span style={{ flex: 1 }}>
              {idioma === "en"
                ? "Start Here: Module Guide"
                : idioma === "fr"
                ? "Commencez ici : Guide des modules"
                : idioma === "it"
                ? "Inizia qui: Guida ai moduli"
                : "Inicia aquí: Guía y Checklist"}
            </span>
            <span style={{ fontSize: 10, backgroundColor: "rgba(16,185,129,0.25)", color: "#34d399", padding: "2px 7px", borderRadius: 99, fontWeight: 700 }}>
              {idioma === "en" ? "STEP BY STEP" : idioma === "fr" ? "PAS À PAS" : idioma === "it" ? "PASSO DOPO PASSO" : "PASO A PASO"}
            </span>
          </button>
        )}
      </nav>

      {/* SECCIÓN INFERIOR: ESTADO DE PRUEBA / VIP Y CERRAR SESIÓN */}
      <div style={{ padding: "12px 24px 8px" }}>
        {tieneAccesoTotal ? (
          <div style={{
            background: "rgba(223, 161, 95, 0.22)",
            border: "1px solid rgba(223, 161, 95, 0.4)",
            borderRadius: 12,
            padding: "8px 12px",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <span style={{ fontSize: 16 }}>👑</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {t("Acceso Total VIP Activo", idioma)}
            </span>
          </div>
        ) : enPruebaActiva ? (
          <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 12,
            padding: "9px 12px",
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            cursor: "pointer"
          }}
          onClick={() => {
            onClose();
            if (onAbrirModalPrueba) onAbrirModalPrueba();
            else if (onVerSuscripcion) onVerSuscripcion();
          }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{diaPruebaActual === 3 ? "⏳" : diaPruebaActual === 2 ? "🌿" : "🌱"}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  {`Prueba: Día ${diaPruebaActual} de 3`}
                </span>
              </div>
              <span style={{ fontSize: 10, background: "rgba(255, 255, 255, 0.2)", color: "#fff", padding: "2px 6px", borderRadius: 99, fontWeight: 700 }}>
                {diasRestantesPrueba === 1 ? "1d restante" : `${diasRestantesPrueba}d`}
              </span>
            </div>
            <span style={{ fontSize: 10.5, color: "rgba(255, 255, 255, 0.85)" }}>
              {t("Toca para ver aviso y adquirir suscripción", idioma)} &rarr;
            </span>
          </div>
        ) : pruebaExpirada ? (
          <div style={{
            background: "rgba(239, 68, 68, 0.18)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>🔒</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fee2e2" }}>
                {t("Has cumplido tus 3 días de prueba", idioma)}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onAbrirModalPrueba) onAbrirModalPrueba();
                else if (onVerSuscripcion) onVerSuscripcion();
                else onNavigate("paywall");
              }}
              style={{
                background: "#dc2626",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                padding: "7px 10px",
                fontSize: 11.5,
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            >
              {t("Adquirir suscripción ahora", idioma)} &rarr;
            </button>
          </div>
        ) : null}

        <div
          style={{
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.18)",
            marginBottom: 14
          }}
        />

        <button
          id="btn-drawer-logout"
          onClick={() => {
            onClose();
            if (onCerrarSesion) onCerrarSesion();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            width: "100%",
            background: "none",
            border: "none",
            padding: "8px 0",
            color: "rgba(255, 255, 255, 0.88)",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 15,
            fontWeight: 500,
            transition: "opacity 0.2s ease"
          }}
        >
          <LogOut size={20} strokeWidth={2.2} />
          <span>{t("Cerrar sesión", idioma)}</span>
        </button>
      </div>
    </aside>
  );
}
