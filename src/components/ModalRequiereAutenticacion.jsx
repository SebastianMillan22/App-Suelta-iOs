import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Lock, Sparkles, X, Mail, Check, ArrowRight } from "lucide-react";
import { auth, db } from "../firebase";
import { sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { t } from "../data/translations.js";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";

export function ModalRequiereAutenticacion({
  isOpen,
  onClose,
  motivo = "general", // "prueba" | "pago" | "restaurar" | "general"
  plan = "anual",
  idioma = "es",
  onIrRegistro,
  onLoginGoogle,
  onLoginApple,
  onLoginEmail
}) {
  useBloquearScrollFondo(isOpen);
  const [tab, setTab] = useState("login"); // "login" | "registro"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState("");

  if (!isOpen) return null;

  const esPrueba = motivo === "prueba" || plan === "prueba";

  const handleGoogleClick = async () => {
    setError("");
    setCargando(true);
    try {
      if (onLoginGoogle) {
        await onLoginGoogle();
        onClose();
      }
    } catch (err) {
      const errMsg = err?.message || String(err);
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(errMsg);
      }
    } finally {
      setCargando(false);
    }
  };

  const handleAppleClick = async () => {
    setError("");
    setCargando(true);
    try {
      if (onLoginApple) {
        await onLoginApple();
        onClose();
      } else {
        const { OAuthProvider, signInWithPopup } = await import("firebase/auth");
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        await signInWithPopup(auth, provider);
        onClose();
      }
    } catch (err) {
      const errMsg = err?.message || String(err);
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(errMsg);
      }
    } finally {
      setCargando(false);
    }
  };

  const handleEmailLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("Por favor completa tu correo y contraseña.", idioma));
      return;
    }
    setError("");
    setCargando(true);
    try {
      if (onLoginEmail) {
        await onLoginEmail(email, password);
        onClose();
      }
    } catch (err) {
      setError(t("Correo o contraseña incorrectos. Revisa tus datos e intenta de nuevo.", idioma));
    } finally {
      setCargando(false);
    }
  };

  const handleEmailRegistroSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("Por favor completa tu correo y contraseña.", idioma));
      return;
    }
    if (password.length < 6) {
      setError(t("La contraseña debe tener al menos 6 caracteres.", idioma));
      return;
    }
    setError("");
    setCargando(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const nombreFinal = nombre.trim() || email.split("@")[0];
      
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          nombre: nombreFinal,
          fechaRegistro: Date.now(),
          idioma: idioma
        }, { merge: true });
      } catch (dbErr) {
        console.warn("Aviso guardando perfil inicial:", dbErr);
      }

      onClose();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError(t("Este correo ya está registrado. Por favor cambia a Iniciar Sesión.", idioma));
        setTab("login");
      } else {
        setError(err?.message || t("Error al crear la cuenta. Intenta de nuevo.", idioma));
      }
    } finally {
      setCargando(false);
    }
  };

  const handleRecuperarPassword = async () => {
    if (!email) {
      setError(t("Ingresa tu correo arriba para enviarte el enlace de recuperación.", idioma));
      return;
    }
    setError("");
    setMensajeRecuperacion(t("Enviando enlace...", idioma));
    try {
      await sendPasswordResetEmail(auth, email);
      setMensajeRecuperacion(t("¡Enlace enviado! Revisa tu bandeja de entrada o spam.", idioma));
    } catch (err) {
      setError(t("No se pudo enviar el enlace. Verifica que el correo esté registrado.", idioma));
      setMensajeRecuperacion("");
    }
  };

  const modalNode = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        minHeight: "100vh",
        zIndex: 999999,
        background: "rgba(15, 23, 42, 0.82)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
        overscrollBehavior: "contain",
        touchAction: "none",
        boxSizing: "border-box"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-modal-scrollable="true"
        style={{
          background: "#FFFFFF",
          width: "100%",
          maxWidth: "380px",
          margin: "auto",
          borderRadius: "22px",
          padding: "22px 20px 20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          position: "relative",
          maxHeight: "calc(100dvh - 32px)",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          display: "flex",
          flexDirection: "column",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: "border-box"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#f1f5f9",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          aria-label={t("Cerrar", idioma)}
        >
          <X size={16} />
        </button>

        {/* Cabecera compacta con icono */}
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              background: esPrueba ? "rgba(111, 168, 146, 0.16)" : "rgba(224, 122, 95, 0.16)",
              color: esPrueba ? "#3F6B5B" : "#B24C35",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8
            }}
          >
            {esPrueba ? <Sparkles size={22} /> : <Lock size={22} />}
          </div>

          <h3
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#1e293b",
              margin: "0 0 4px",
              lineHeight: 1.25
            }}
          >
            {esPrueba
              ? t("Activa tu prueba dentro de la app", idioma)
              : t("Acceso seguro a tu espacio", idioma)}
          </h3>

          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              lineHeight: 1.4,
              margin: 0,
              padding: "0 4px"
            }}
          >
            {esPrueba
              ? t("Ingresa o crea tu cuenta para guardar tu progreso de bienestar.", idioma)
              : t("Identifícate para vincular tus suscripciones y contenidos.", idioma)}
          </p>
        </div>

        {/* Selector de pestañas Iniciar sesión / Crear cuenta */}
        <div
          style={{
            display: "flex",
            background: "#f1f5f9",
            borderRadius: "12px",
            padding: "3px",
            marginBottom: 14
          }}
        >
          <button
            type="button"
            onClick={() => {
              setError("");
              setTab("login");
            }}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              borderRadius: "10px",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              background: tab === "login" ? "#FFFFFF" : "transparent",
              color: tab === "login" ? "#0f172a" : "#64748b",
              boxShadow: tab === "login" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.15s ease"
            }}
          >
            {t("Iniciar sesión", idioma)}
          </button>
          <button
            type="button"
            onClick={() => {
              setError("");
              setTab("registro");
            }}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              borderRadius: "10px",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              background: tab === "registro" ? "#FFFFFF" : "transparent",
              color: tab === "registro" ? "#0f172a" : "#64748b",
              boxShadow: tab === "registro" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.15s ease"
            }}
          >
            {t("Crear cuenta", idioma)}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: 11.5,
              marginBottom: 10,
              lineHeight: 1.3
            }}
          >
            {error}
          </div>
        )}

        {mensajeRecuperacion && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: 11.5,
              marginBottom: 10,
              lineHeight: 1.3
            }}
          >
            {mensajeRecuperacion}
          </div>
        )}

        {/* Formulario Iniciar Sesión */}
        {tab === "login" && (
          <form onSubmit={handleEmailLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                {t("Correo electrónico", idioma)}
              </label>
              <input
                type="email"
                required
                placeholder="ej. camila@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                {t("Contraseña", idioma)}
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleRecuperarPassword}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3F6B5B",
                  fontSize: 11.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline"
                }}
              >
                {t("¿Olvidaste tu contraseña?", idioma)}
              </button>
            </div>

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                background: "#3F6B5B",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                marginTop: 2,
                boxShadow: "0 3px 10px rgba(63, 107, 91, 0.25)"
              }}
            >
              {cargando ? t("Iniciando sesión...", idioma) : t("Entrar a mi cuenta", idioma)}
            </button>
          </form>
        )}

        {/* Formulario Crear Cuenta */}
        {tab === "registro" && (
          <form onSubmit={handleEmailRegistroSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                {t("Tu nombre", idioma)}
              </label>
              <input
                type="text"
                placeholder={t("ej. Camila", idioma) || "ej. Camila"}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                {t("Correo electrónico", idioma)}
              </label>
              <input
                type="email"
                required
                placeholder="ej. camila@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#475569" }}>
                {t("Crea una contraseña (mínimo 6 caracteres)", idioma)}
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid #cbd5e1",
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                background: esPrueba ? "#3F6B5B" : "#E07A5F",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                marginTop: 2,
                boxShadow: esPrueba ? "0 3px 10px rgba(63, 107, 91, 0.25)" : "0 3px 10px rgba(224, 122, 95, 0.25)"
              }}
            >
              {cargando ? t("Creando cuenta...", idioma) : t("Crear mi cuenta", idioma)}
            </button>
          </form>
        )}

        {/* Separador sutil para opción secundaria */}
        <div style={{ display: "flex", alignItems: "center", margin: "10px 0 6px" }}>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          <span style={{ padding: "0 8px", fontSize: 10.5, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {t("o también", idioma)}
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
        </div>

        {/* Botón secundario Google (popup interno, nunca redirige) */}
        <button
          onClick={handleGoogleClick}
          disabled={cargando}
          style={{
            width: "100%",
            background: "#FFFFFF",
            border: "1.2px solid #cbd5e1",
            borderRadius: "12px",
            padding: "9px 12px",
            color: "#334155",
            fontSize: 12.5,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
          }}
        >
          <svg width="15" height="15" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7v2.24h2.9c1.7-1.57 2.69-3.88 2.69-6.57z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.58-5.05-3.72H.95v2.3C2.43 15.89 5.5 18 9 18z"/>
            <path fill="#FBBC05" d="M3.95 10.68c-.18-.54-.28-1.12-.28-1.68s.1-1.14.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l3-2.3z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.43 0 9 0 5.5 0 2.43 2.11.95 5.02l3 2.3c.71-2.14 2.7-3.72 5.05-3.72z"/>
          </svg>
          <span>{cargando ? t("Conectando...", idioma) : t("Continuar con Google", idioma)}</span>
        </button>

        {/* Botón Apple (Requisito App Store Guideline 4.8) */}
        <button
          onClick={handleAppleClick}
          disabled={cargando}
          style={{
            width: "100%",
            background: "#000000",
            border: "1.2px solid #000000",
            borderRadius: "12px",
            padding: "9px 12px",
            color: "#FFFFFF",
            fontSize: 12.5,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            marginTop: 6
          }}
        >
          <svg width="15" height="15" viewBox="0 0 170 170" fill="#FFFFFF">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.7-14.44-6.01-9.67-10.74-20.47-14.19-32.41-3.46-11.94-5.19-23.2-5.19-33.78 0-14.75 3.65-27.15 10.96-37.19 7.31-10.04 16.7-15.17 28.16-15.39 4.36 0 9.29 1.14 14.81 3.42 5.51 2.29 9.3 3.48 11.35 3.58 2.07-.1 6.03-1.35 11.89-3.74 5.86-2.39 10.78-3.48 14.75-3.26 12.19.65 21.94 4.99 29.27 13.04-10.66 6.52-15.88 15.54-15.66 27.06.22 9.13 3.69 16.85 10.43 23.15 6.74 6.3 14.78 9.99 24.12 11.08-2.17 6.74-4.78 13.68-7.83 20.82zM119.22 33.15c0-7.39 2.61-14.13 7.83-20.21 5.22-6.09 11.63-9.88 19.23-11.39.22 1.09.33 2.17.33 3.26 0 7.39-2.72 14.23-8.15 20.53-5.43 6.3-12.06 10.05-19.89 11.24-.22-1.08-.35-2.22-.35-3.43z" />
          </svg>
          <span>{cargando ? t("Conectando...", idioma) : t("Continuar con Apple", idioma)}</span>
        </button>

        {/* Botón cancelar */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              fontSize: 11.5,
              fontWeight: 500,
              cursor: "pointer",
              padding: "4px"
            }}
          >
            {t("Cancelar y seguir explorando", idioma)}
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalNode, document.body);
  }
  return modalNode;
}
