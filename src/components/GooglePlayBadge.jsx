import React from "react";
import { t } from "../data/translations.js";

function esPlataformaApple() {
  if (typeof window === "undefined") return false;
  const platform = window.Capacitor?.getPlatform?.();
  if (platform === "ios") return true;
  return /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
}

export function AppleStoreIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 170 170"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.94-14.32-7.58-11.53-13.43-24.87-17.55-40.04-4.12-15.17-6.18-29.28-6.18-42.34 0-16.14 4.16-29.6 12.48-40.38 8.32-10.79 18.79-16.3 31.42-16.54 4.58 0 9.87 1.25 15.86 3.75 5.99 2.5 9.94 3.79 11.85 3.86 1.63 0 5.79-1.37 12.49-4.1 6.7-2.73 12.22-3.88 16.56-3.46 12.63.76 22.84 5.37 30.63 13.84-11.05 6.72-16.47 16.03-16.27 27.93.2 9.54 3.86 17.56 10.98 24.06 7.12 6.5 15.35 10.15 24.69 10.95-2.28 7.04-5.14 14.1-8.58 21.19zm-31.5-103.88c0 7.42-2.78 14.37-8.34 20.85-6.84 7.9-15.19 12.63-25.05 14.2-.33-1.63-.5-3.04-.5-4.22 0-7.31 2.92-14.37 8.76-21.18 2.92-3.4 6.53-6.23 10.83-8.49 4.3-2.26 8.54-3.53 12.72-3.81.44.88.89 1.67 1.58 2.65z" />
    </svg>
  );
}

export function GooglePlayIcon({ size = 20, className = "" }) {
  const isApple = esPlataformaApple();
  if (isApple) {
    return <AppleStoreIcon size={size} className={className} />;
  }

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
  const isApple = esPlataformaApple();

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
          <span>{isApple ? "Apple In-App Purchase" : "Google Play Billing"}</span>
          <span style={{ fontSize: 9.5, background: isApple ? "#f1f5f9" : "#e8f5e9", color: isApple ? "#0f172a" : "#01875f", padding: "1px 6px", borderRadius: 4, fontWeight: 800 }}>
            {t("OFICIAL", idioma) || "OFICIAL"}
          </span>
        </p>
        <p style={{ margin: 0, fontSize: 10.5, color: "#64748b", lineHeight: 1.3 }}>
          {isApple 
            ? (t("Facturación segura y protegida directamente por Apple App Store", idioma) || "Facturación segura y protegida directamente por Apple App Store")
            : (t("Facturación protegida y gestionada directamente por Google Play Store", idioma) || "Facturación protegida y gestionada directamente por Google Play Store")
          }
        </p>
      </div>
    </div>
  );
}

export default GooglePlayIcon;
