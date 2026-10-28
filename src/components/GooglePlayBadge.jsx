import React from "react";
import { t } from "../data/translations.js";

export function GooglePlayIcon({ size = 20, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path
        d="M52.3 27.6C48.7 31.4 46.6 37.3 46.6 45.1V466.9C46.6 474.7 48.7 480.6 52.3 484.4L53.7 485.7L285.5 253.9V248.1L53.7 16.3L52.3 27.6Z"
        fill="#00E5FF"
      />
      <path
        d="M362.8 331.2L285.5 253.9V248.1L362.8 170.8L364.5 171.8L456 223.8C482.1 238.6 482.1 262.8 456 277.7L364.5 229.7L362.8 331.2Z"
        fill="#FFD600"
      />
      <path
        d="M285.5 251.0L52.3 484.4C60.9 493.5 75.1 494.6 91.2 485.5L362.8 331.2L285.5 251.0Z"
        fill="#FF3D00"
      />
      <path
        d="M285.5 261.0L362.8 180.8L91.2 26.5C75.1 17.4 60.9 18.5 52.3 27.6L285.5 261.0Z"
        fill="#00E676"
      />
    </svg>
  );
}

export function GooglePlayShieldBadge({ idioma = "es", style = {} }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: 14,
      padding: "10px 14px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
      ...style
    }}>
      <GooglePlayIcon size={24} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 5 }}>
          <span>Google Play Billing</span>
          <span style={{ fontSize: 9.5, background: "#e8f5e9", color: "#01875f", padding: "1px 6px", borderRadius: 4, fontWeight: 800 }}>
            {t("OFICIAL", idioma) || "OFICIAL"}
          </span>
        </p>
        <p style={{ margin: 0, fontSize: 10.5, color: "#64748b", lineHeight: 1.3 }}>
          {t("Facturación protegida y gestionada directamente por Google Play Store", idioma)}
        </p>
      </div>
    </div>
  );
}

export default GooglePlayIcon;
