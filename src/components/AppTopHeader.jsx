import React from "react";
import HamburgerButton from "./HamburgerButton.jsx";
import { LOGO_DATA_URI } from "../images.js";
import { User, Sparkles } from "lucide-react";
import { t } from "../data/translations.js";

export default function AppTopHeader({
  onOpenMenu,
  user = {},
  title,
  showLogo = true,
  rightAction,
  onProfileClick,
  idioma = "es"
}) {
  const nombreMostrado = user.apodo || user.nombre || "";
  const inicial = (nombreMostrado.trim().charAt(0) || "").toUpperCase();

  return (
    <header
      id="suelta-app-top-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px 10px",
        position: "relative",
        zIndex: 40,
        minHeight: 58
      }}
    >
      {/* Botón menú lateral a la izquierda */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <HamburgerButton onClick={onOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
      </div>

      {/* Centro: Logo o Título */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, padding: "0 12px" }}>
        {showLogo ? (
          <img
            src={LOGO_DATA_URI}
            alt="Suelta"
            style={{
              height: 28,
              width: "auto",
              opacity: 0.92,
              filter: "drop-shadow(0 2px 4px rgba(63,107,91,0.1))"
            }}
          />
        ) : (
          <h1
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 700,
              color: "#25332e",
              letterSpacing: "-0.2px",
              fontFamily: "'Space Grotesk', sans-serif"
            }}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Derecha: Acción personalizada o Avatar de perfil */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        {rightAction ? (
          rightAction
        ) : onProfileClick ? (
          <button
            onClick={onProfileClick}
            id="btn-top-profile-avatar"
            aria-label={t("Mi perfil", idioma)}
            title={t("Mi perfil", idioma)}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: "rgba(111, 168, 146, 0.15)",
              border: "1.5px solid rgba(111, 168, 146, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: 0,
              color: "#3f6b5b",
              fontWeight: 700,
              fontSize: 15,
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(63,107,91,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {inicial ? inicial : <User size={18} strokeWidth={2.2} />}
          </button>
        ) : (
          <div style={{ width: 38 }} />
        )}
      </div>
    </header>
  );
}
