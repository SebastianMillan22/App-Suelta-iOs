import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check, User, ArrowRight, Sparkles, Loader2, Plus, Lock, Key, Trash2, ShieldCheck, Mail, UserPlus } from "lucide-react";
import { useBloquearScrollFondo } from "../utils/useBloquearScrollFondo.js";
import { t } from "../data/translations.js";
import { FLOR_DATA_URI } from "../images.js";

const GOOGLE_CLIENT_ID = "706031612034-8g9v90l77et2nlkkqhcjum6crnhm2eeg.apps.googleusercontent.com";

// Helper para limpiar cualquier residuo de cuentas hardcodeadas previas
const limpiarCuentasLegacy = (lista) => {
  if (!Array.isArray(lista)) return [];
  return lista.filter(c => {
    if (!c || !c.email) return false;
    const em = c.email.toLowerCase().trim();
    // Excluir cuentas que se hubieran precargado como demo
    if (em === "sebastianmillan2002@gmail.com" || em === "millanbejaranosebastian@gmail.com") {
      // Solo mantener si fue agregada explícitamente por el usuario actual con fecha reciente y uid válido
      return c.uid && c.ultimaConexion && !c.id?.startsWith("sebastian");
    }
    return true;
  });
};

// Helper para persistir cuentas recordadas de forma segura y centralizada en este dispositivo
export const guardarCuentaRecordadaLocal = (cuenta) => {
  if (!cuenta || !cuenta.email) return;
  try {
    const emailLimpio = cuenta.email.toLowerCase().trim();
    const nombreLimpio = cuenta.nombre || emailLimpio.split("@")[0];
    const cuentasRaw = JSON.parse(localStorage.getItem("suelta_google_accounts") || "[]");
    const filtradas = limpiarCuentasLegacy(cuentasRaw).filter(c => c.email?.toLowerCase() !== emailLimpio);
    const nuevaLista = [
      {
        id: cuenta.id || "acc_" + Date.now(),
        uid: cuenta.uid || "",
        nombre: nombreLimpio,
        email: emailLimpio,
        foto: cuenta.foto || null,
        esPredeterminada: true,
        ultimaConexion: Date.now()
      },
      ...filtradas.map(c => ({ ...c, esPredeterminada: false }))
    ];
    localStorage.setItem("suelta_google_accounts", JSON.stringify(nuevaLista));
  } catch (e) {
    console.warn("Aviso guardando cuenta en localStorage:", e);
  }
};

export const eliminarCuentaRecordadaLocal = (emailAEliminar) => {
  if (!emailAEliminar) return;
  try {
    const emailLimpio = emailAEliminar.toLowerCase().trim();
    const cuentasRaw = JSON.parse(localStorage.getItem("suelta_google_accounts") || "[]");
    const filtradas = cuentasRaw.filter(c => c && c.email?.toLowerCase().trim() !== emailLimpio);
    localStorage.setItem("suelta_google_accounts", JSON.stringify(filtradas));
  } catch (e) {
    console.warn("Aviso eliminando cuenta recordada local:", e);
  }
};


export function ModalSeleccionCuentaGoogle({
  isOpen,
  onClose,
  onSeleccionarCuenta,
  onCredentialGoogle,
  onLoginGooglePopup,
  idioma = "es"
}) {
  useBloquearScrollFondo(isOpen);

  const [cargando, setCargando] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState(null);
  const [mostrarOtroEmail, setMostrarOtroEmail] = useState(false);
  const [otroEmail, setOtroEmail] = useState("");
  const [otroNombre, setOtroNombre] = useState("");
  const [otroPassword, setOtroPassword] = useState("");
  const [incluirPassword, setIncluirPassword] = useState(false);
  const [errorLocal, setErrorLocal] = useState("");

  // Cuentas guardadas exclusivamente en este dispositivo (sin cuentas demo de terceros)
  const [cuentasDisponibles, setCuentasDisponibles] = useState(() => {
    try {
      const guardadas = JSON.parse(localStorage.getItem("suelta_google_accounts") || "[]");
      const limpias = limpiarCuentasLegacy(guardadas);
      if (limpias.length !== guardadas.length) {
        localStorage.setItem("suelta_google_accounts", JSON.stringify(limpias));
      }
      return limpias;
    } catch (e) {
      return [];
    }
  });

  // Refrescar lista de cuentas al abrir
  useEffect(() => {
    if (isOpen) {
      setErrorLocal("");
      try {
        const guardadas = JSON.parse(localStorage.getItem("suelta_google_accounts") || "[]");
        const limpias = limpiarCuentasLegacy(guardadas);
        if (limpias.length !== guardadas.length) {
          localStorage.setItem("suelta_google_accounts", JSON.stringify(limpias));
        }
        setCuentasDisponibles(limpias);
        // Si no hay cuentas guardadas previamente en este dispositivo, mostrar formulario de agregar
        if (limpias.length === 0) {
          setMostrarOtroEmail(true);
        } else {
          setMostrarOtroEmail(false);
        }
      } catch (e) {
        setCuentasDisponibles([]);
        setMostrarOtroEmail(true);
      }
    }
  }, [isOpen]);

  // Google Identity Services (GIS) One-Tap / Web
  useEffect(() => {
    if (!isOpen) return;

    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            if (response && response.credential) {
              setCargando(true);
              try {
                if (onCredentialGoogle) {
                  await onCredentialGoogle(response.credential);
                  onClose();
                }
              } catch (e) {
                setErrorLocal(e?.message || "Error al autenticar con Google");
              } finally {
                setCargando(false);
              }
            }
          },
          auto_select: false,
          cancel_on_tap_outside: false
        });
      } catch (err) {
        console.warn("Aviso inicializando Google Identity Services:", err);
      }
    }
  }, [isOpen, onCredentialGoogle, onClose]);

  if (!isOpen) return null;

  const handleElegirCuenta = async (cuenta) => {
    setErrorLocal("");
    setCuentaSeleccionada(cuenta.email);
    setCargando(true);
    try {
      guardarCuentaRecordadaLocal(cuenta);
      const guardadas = JSON.parse(localStorage.getItem("suelta_google_accounts") || "[]");
      setCuentasDisponibles(limpiarCuentasLegacy(guardadas));

      if (onSeleccionarCuenta) {
        await onSeleccionarCuenta(cuenta);
        onClose();
      }
    } catch (err) {
      console.error("Error al validar cuenta in-app:", err);
      const msg = err?.message || String(err);
      if (err?.code === "auth/wrong-password" || msg.includes("wrong-password")) {
        setErrorLocal("La contraseña ingresada no es correcta para esta cuenta.");
      } else if (err?.code === "auth/invalid-credential" || msg.includes("invalid-credential")) {
        setErrorLocal("Credenciales inválidas. Verifica tu correo o contraseña.");
      } else {
        setErrorLocal(msg || "No se pudo validar la sesión con esta cuenta.");
      }
    } finally {
      setCargando(false);
      setCuentaSeleccionada(null);
    }
  };

  const handleEliminarCuentaLocal = (e, emailAEliminar) => {
    e.stopPropagation();
    try {
      const filtradas = cuentasDisponibles.filter(c => c.email?.toLowerCase() !== emailAEliminar.toLowerCase());
      localStorage.setItem("suelta_google_accounts", JSON.stringify(filtradas));
      setCuentasDisponibles(filtradas);
      if (filtradas.length === 0) {
        setMostrarOtroEmail(true);
      }
    } catch (err) {
      console.warn("Error eliminando cuenta local:", err);
    }
  };

  const handleIniciarConGoogleDirecto = async () => {
    setErrorLocal("");
    setCargando(true);
    try {
      if (onLoginGooglePopup) {
        await onLoginGooglePopup();
        onClose();
      } else if (typeof window !== "undefined" && window.google?.accounts?.id) {
        window.google.accounts.id.prompt();
      }
    } catch (err) {
      const msg = String(err?.message || err || "");
      if (!msg.includes("popup-closed-by-user") && !msg.includes("cancelled")) {
        setErrorLocal(err?.message || "No se pudo iniciar sesión con Google.");
      }
    } finally {
      setCargando(false);
    }
  };

  const handleValidarOtroEmail = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const em = otroEmail.trim().toLowerCase();
    if (!em || !em.includes("@")) {
      setErrorLocal("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (incluirPassword && otroPassword && otroPassword.length < 6) {
      setErrorLocal("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const nom = otroNombre.trim() || em.split("@")[0];
    await handleElegirCuenta({
      id: "acc_" + Date.now(),
      nombre: nom,
      email: em,
      password: incluirPassword ? otroPassword : null,
      foto: null,
      esPredeterminada: true
    });
  };

  const avatarColors = [
    "#E57373", "#81C784", "#64B5F6", "#FFB74D", "#BA68C8", "#4DB6AC", "#F06292"
  ];

  const modalNode = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
        overscrollBehavior: "contain",
        touchAction: "none"
      }}
      className="ss-fade"
      onClick={onClose}
    >
      <div
        data-modal-scrollable="true"
        style={{
          width: "100%",
          maxWidth: 440,
          maxHeight: "88dvh",
          background: "#2D2E30",
          color: "#E8EAED",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: "20px 20px 28px",
          boxShadow: "0 -15px 45px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          boxSizing: "border-box",
          position: "relative"
        }}
        className="ss-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar (X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "none",
            color: "#BDC1C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Logo de Suelta en la parte superior */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.25)"
            }}
          >
            <img src={FLOR_DATA_URI} alt="Suelta" style={{ width: 34, height: 34, objectFit: "contain" }} />
          </div>

          <h2 style={{ margin: "4px 0 0", fontSize: 21, fontWeight: 500, color: "#FFFFFF", textAlign: "center", letterSpacing: "-0.2px" }}>
            {cuentasDisponibles.length > 0 ? "Elegir una cuenta" : "Acceder a ¡Suelta!"}
          </h2>
          <p style={{ margin: "0 0 4px", fontSize: 13.5, color: "#BDC1C6", textAlign: "center" }}>
            {cuentasDisponibles.length > 0 ? "para continuar usando Suelta" : "Inicia sesión con tu cuenta de Google o correo"}
          </p>
        </div>

        {errorLocal && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(234, 67, 53, 0.18)",
              border: "1px solid rgba(234, 67, 53, 0.4)",
              borderRadius: 12,
              color: "#F28B82",
              fontSize: 13,
              lineHeight: 1.4
            }}
          >
            {errorLocal}
          </div>
        )}

        {/* Botón principal oficial de Google cuando no hay cuentas o para conectar otra */}
        {onLoginGooglePopup && (
          <button
            type="button"
            onClick={handleIniciarConGoogleDirecto}
            disabled={cargando}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              padding: "12px 16px",
              background: "#FFFFFF",
              color: "#3c4043",
              border: "1px solid #dadce0",
              borderRadius: 12,
              fontSize: 14.5,
              fontWeight: 600,
              cursor: cargando ? "wait" : "pointer",
              boxShadow: "0 1px 3px rgba(60,64,67,0.15)",
              transition: "background 0.15s ease",
              boxSizing: "border-box"
            }}
          >
            {/* Ícono oficial de Google */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>{cuentasDisponibles.length > 0 ? "Elegir otra cuenta de Google" : "Continuar con Google"}</span>
          </button>
        )}

        {/* Lista de cuentas registradas en este dispositivo */}
        {cuentasDisponibles.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#9AA0A6", textTransform: "uppercase", letterSpacing: "0.5px", padding: "4px 8px" }}>
              Cuentas en este dispositivo
            </div>
            {cuentasDisponibles.map((cuenta, idx) => {
              const estaProcesando = cargando && cuentaSeleccionada === cuenta.email;
              const colorAvatar = avatarColors[idx % avatarColors.length];
              return (
                <div key={cuenta.email}>
                  <div
                    onClick={() => !cargando && handleElegirCuenta(cuenta)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 10px",
                      cursor: cargando ? "wait" : "pointer",
                      borderRadius: 12,
                      transition: "background 0.15s ease",
                      background: estaProcesando ? "rgba(255,255,255,0.08)" : "transparent"
                    }}
                    onMouseOver={(e) => { if (!cargando) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                    onMouseOut={(e) => { if (!estaProcesando) e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                      {cuenta.foto ? (
                        <img
                          src={cuenta.foto}
                          alt=""
                          style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: colorAvatar,
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 17,
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {cuenta.nombre ? cuenta.nombre.charAt(0).toUpperCase() : "U"}
                        </div>
                      )}

                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 500, color: "#FFFFFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {cuenta.nombre}
                        </div>
                        <div style={{ fontSize: 13, color: "#BDC1C6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
                          {cuenta.email}
                        </div>
                      </div>
                    </div>

                    {estaProcesando ? (
                      <Loader2 size={18} className="ss-spin" color="#8AB4F8" />
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleEliminarCuentaLocal(e, cuenta.email)}
                        title="Quitar de este dispositivo"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: "6px",
                          borderRadius: "8px",
                          color: "#70757A",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  {/* Separador sutil */}
                  <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", margin: "0 4px" }} />
                </div>
              );
            })}
          </div>
        )}

        {/* Sección para agregar cuenta o registrarse */}
        {!mostrarOtroEmail ? (
          <div
            onClick={() => setMostrarOtroEmail(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 10px",
              cursor: "pointer",
              borderRadius: 12,
              transition: "background 0.15s ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#E8EAED",
                flexShrink: 0
              }}
            >
              <UserPlus size={22} color="#BDC1C6" />
            </div>
            <span style={{ fontSize: 14.5, fontWeight: 500, color: "#FFFFFF" }}>
              Agregar otra cuenta o ingresar con correo
            </span>
          </div>
        ) : (
          <form onSubmit={handleValidarOtroEmail} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4, background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <UserPlus size={16} color="#8AB4F8" />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#FFFFFF" }}>
                  {cuentasDisponibles.length > 0 ? "Agregar nueva cuenta" : "Ingresar con correo"}
                </span>
              </div>
              {cuentasDisponibles.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMostrarOtroEmail(false)}
                  style={{ background: "none", border: "none", color: "#BDC1C6", fontSize: 12, cursor: "pointer" }}
                >
                  Volver a mis cuentas
                </button>
              )}
            </div>

            <input
              type="text"
              placeholder="Nombre completo (opcional)"
              value={otroNombre}
              onChange={(e) => setOtroNombre(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 13.5,
                background: "#202124",
                color: "#FFFFFF",
                boxSizing: "border-box"
              }}
            />

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={otroEmail}
              required
              onChange={(e) => setOtroEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 13px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 13.5,
                background: "#202124",
                color: "#FFFFFF",
                boxSizing: "border-box"
              }}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "2px 0" }}>
              <span style={{ fontSize: 12, color: "#BDC1C6" }}>
                ¿Proteger con contraseña propia?
              </span>
              <button
                type="button"
                onClick={() => setIncluirPassword(!incluirPassword)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8AB4F8",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {incluirPassword ? "Omitir clave" : "+ Añadir clave fija"}
              </button>
            </div>

            {incluirPassword && (
              <input
                type="password"
                placeholder="Contraseña (mínimo 6 caracteres)"
                value={otroPassword}
                onChange={(e) => setOtroPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 13px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 13.5,
                  background: "#202124",
                  color: "#FFFFFF",
                  boxSizing: "border-box"
                }}
              />
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button
                type="submit"
                disabled={cargando}
                style={{
                  flex: 1,
                  background: "#8AB4F8",
                  color: "#202124",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px",
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer"
                }}
              >
                {cargando ? "Accediendo..." : "Acceder"}
              </button>
              {cuentasDisponibles.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMostrarOtroEmail(false);
                    setOtroPassword("");
                    setIncluirPassword(false);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#E8EAED",
                    border: "none",
                    borderRadius: 10,
                    padding: "11px 16px",
                    fontWeight: 600,
                    fontSize: 13.5,
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}

        {/* Separador inferior */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.12)", margin: "4px 0" }} />

        {/* Mensaje de privacidad */}
        <p style={{ margin: 0, fontSize: 12, color: "#9AA0A6", lineHeight: 1.45, padding: "0 4px" }}>
          Tus datos se mantienen cifrados y seguros. Al continuar, Google compartirá tu nombre, correo electrónico y foto de perfil para acceder a Suelta.
        </p>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode;
}
