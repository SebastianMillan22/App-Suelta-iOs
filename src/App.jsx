import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Lock, Search, MapPin, Video, Check, Calendar, Clock, ChevronRight, Heart, Award, MessageSquare, Info, Filter, Sparkles, ArrowLeft, User, ThumbsUp, Star, X, Send, Compass, Leaf, Moon, Users, Activity, Gift, BookOpen, ShieldCheck, Smile, Trash2, Plus, Camera, Mic } from "lucide-react";
import * as EphemerisNS from "circular-natal-horoscope-js";
import { LOGO_DATA_URI, FLOR_DATA_URI, SILUETA_HOMBRE_DATA_URI, SILUETA_MUJER_DATA_URI } from "./images.js";
import ScreenSolfeoPractica from "./ScreenSolfeoPractica.jsx";
import ScreenLanding from "./components/ScreenLanding.jsx";
import SideNavDrawer from "./components/SideNavDrawer.jsx";
import HamburgerButton from "./components/HamburgerButton.jsx";
import { ScreenRecordatoriosWidget } from "./components/ScreenRecordatoriosWidget.jsx";
import { App as CapacitorApp } from "./utils/capacitorApp.js";
import { 
  registrarServiceWorker, 
  enviarNotificacionNativa, 
  reproducirChimeCalmante, 
  vibrarDispositivo,
  AFIRMACIONES_RECORDATORIOS,
  CONFIG_RECORDATORIOS_INICIAL
} from "./utils/nativeReminders.js";
import {
  solicitarPermisoMicrofono,
  solicitarPermisoCamara,
  consultarPermisosDispositivo,
  abrirSelectorCamaraNativa,
  solicitarTodosLosPermisosAutomaticos
} from "./utils/devicePermissions.js";
import { dispararGuiaPermisos, EVENTO_ABRIR_GUIA_PERMISOS } from "./utils/permisosEvents.js";
import {
  TEMAS_HISTORIA,
  detectarTemas,
  parrafoConstelaciones,
  parrafoPatronTransgeneracional,
  parrafoPerdida,
  parrafoPareja,
  parrafoTrabajo,
  generarEjemploCotidiano,
  generarNarrativaBienestar
} from "./utils/narrativaBienestar.js";
import { getLocalizedCuestionarios, getLocalizedCuestionarioById } from "./utils/cuestionarios.js";
import { getLocalizedLegal } from "./data/translationsLegal.js";
import {
  generarLecturasConstelacion,
  generarNarrativaConstelacion
} from "./utils/constelaciones.js";
import { getLocalizedPasosLugarSeguro, getLocalizedLugarSeguroUI } from "./utils/lugarSeguro.js";
import { getLocalizedEspecialistas, getLocalizedCategorias, getLocalizedEspecialistasUI } from "./data/translationsEspecialistas.js";
import { 
  procesarCompraGooglePlay, 
  restaurarComprasGooglePlay, 
  obtenerUrlGestionGooglePlay, 
  GOOGLE_PLAY_CONFIG, 
  detectarSoporteGooglePlay,
  inicializarGooglePlayBillingStore
} from "./utils/googlePlayBilling.js";
import { GooglePlayIcon, GooglePlayShieldBadge } from "./components/GooglePlayBadge.jsx";
import { ModalRequiereAutenticacion } from "./components/ModalRequiereAutenticacion.jsx";
import { ModalGuiaPermisosAjustes } from "./components/ModalGuiaPermisosAjustes.jsx";
import { ModalSeleccionCuentaGoogle, guardarCuentaRecordadaLocal, eliminarCuentaRecordadaLocal } from "./components/ModalSeleccionCuentaGoogle.jsx";
import { GuiaChecklistPasoAPaso, TarjetaChecklistInicio } from "./components/GuiaChecklistPasoAPaso.jsx";
import { ModalPeriodoPruebaConstante } from "./components/ModalPeriodoPruebaConstante.jsx";
import { useBloquearScrollFondo } from "./utils/useBloquearScrollFondo.js";

import { auth, googleProvider, db, handleFirestoreError, OperationType } from "./firebase";
import { signInWithPopup, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAdditionalUserInfo, deleteUser } from "firebase/auth";
import { AsYouType } from "libphonenumber-js";
import { doc, setDoc, getDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";

// ===== Persistencia local (reemplaza el estado 100% en memoria) =====
// Guarda el progreso de la persona en el propio navegador para que sobreviva a
// recargar la página o cerrar la pestaña. No es una base de datos en la nube:
// vive solo en este dispositivo. Deliberadamente NO se persisten datos de la
// tarjeta simulada de pago (nunca deben tocar el disco, ni siquiera en un demo).
const SS_STORAGE_KEY = "suelta-y-sana:estado-v1";

// Configuración para despliegue en Google Play Store (Dispositivos móviles Android)
const isNativeApp = true;

function ssCargarEstadoGuardado() {
  try {
    const raw = window.localStorage.getItem(SS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    // Sincronizar llaves de persistencia directa de Google Play si existen
    const localEsPremium = window.localStorage.getItem("suelta_es_premium") === "true";
    const localPlanPago = window.localStorage.getItem("suelta_plan_pago");
    const localDatosPago = window.localStorage.getItem("suelta_datos_pago") || window.localStorage.getItem("suelta_google_play_purchase");

    if (localEsPremium) parsed.esPremium = true;
    if (localPlanPago) parsed.planPago = localPlanPago;
    if (localDatosPago && !parsed.datosPagoBasico) {
      try { parsed.datosPagoBasico = JSON.parse(localDatosPago); } catch(_) {}
    }

    return parsed;
  } catch {
    return {};
  }
}

function ssGuardarEstadoGuardado(estado) {
  try {
    window.localStorage.setItem(SS_STORAGE_KEY, JSON.stringify(estado));
  } catch {
    // localStorage puede fallar en modo privado o si el almacenamiento está lleno; se ignora.
  }
}

function ssBorrarEstadoGuardado() {
  try {
    window.localStorage.removeItem(SS_STORAGE_KEY);
    window.localStorage.removeItem("suelta_idioma_configurado");
    window.localStorage.removeItem("suelta_es_premium");
    window.localStorage.removeItem("suelta_plan_pago");
    window.localStorage.removeItem("suelta_datos_pago");
    window.localStorage.removeItem("suelta_google_play_purchase");
    window.localStorage.removeItem("suelta_foto_perfil");
    window.localStorage.removeItem("suelta_recordatorios_config");
    window.sessionStorage.clear();
  } catch {
    // no-op
  }
}

const SAGE = "#6fa892";
const SAGE_DARK = "#3f6b5b";
const SAGE_TINT = "#eaf3ef";
const SAGE_LIGHT = "#a3cbba";
const CREAM = "#faf8f3";
const INK = "#25332e";
const MUTED = "#6b7b74";
const LAVENDER = "#8a6bb8";
const LAVENDER_TINT = "#f1ecf9";
const LINE = "#e1e0d6";
// Color corporativo de ¡Suelta!
const KINOEMOTION = "#D6472B";
// En la UI de compra usamos una versión más cálida y menos saturada
const KINOEMOTION_UI = "#B85A3F";
const KINOEMOTION_TINT = "#FDF3F0";

const FONT_DISPLAY = "'Space Grotesk', sans-serif";
const FONT_BODY = "'Space Grotesk', sans-serif";
const FONT_LOGO = "'Archivo Black', sans-serif";

function ResaltarMarca({ children }) {
  if (!children || typeof children !== "string") return children;
  
  // Expresión regular que captura "¡Suelta!" o "Suelta" o versiones en otros idiomas (Let Go, Release, Lâche prise, Lascia andare)
  const regex = /(¡?suelta!?|let\s+go!?|release!?|lâche\s+prise!?|relâche!?|lascia\s+andare!?)/gi;
  const parts = children.split(regex);
  
  return (
    <>
      {parts.map((part, index) => {
        const lower = part.toLowerCase();
        if (
          lower.includes("suelta") ||
          lower.includes("let go") ||
          lower.includes("release") ||
          lower.includes("lâche") ||
          lower.includes("relâche") ||
          lower.includes("lascia andare")
        ) {
          return (
            <span
              key={index}
              style={{
                color: SAGE_DARK,
                fontWeight: "700",
                fontFamily: FONT_DISPLAY,
                fontStyle: "italic",
                display: "inline",
                letterSpacing: "-0.1px",
              }}
            >
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
// Los dos pasos del flujo de bienvenida (tras quitar la pantalla de revisar y confirmar,
// el proceso quedó en dos pasos: quién eres, y tu historia/síntoma/emoción).
const PASOS_ONBOARDING = ["Quién eres", "Tu historia"];

import {
  DICTIONARY, ZODIACO, PLANETAS_REGENTES, EphemerisOrigin, EphemerisHoroscope,
  SIGNOS_EN_ES, CIUDADES_NACIMIENTO, TONALPOHUALLI_SIGNOS, ANCLA_TONALLI,
  ANCLA_SIGNO_IDX, ANCLA_NUMERO, NUMEROLOGIA_CAMINO_VIDA, VALORES_PITAGORICOS,
  buscarEnDiccionario, ssNormalizarTexto, calcularCartaCompleta,
  buscarCiudadesNacimiento, buscarCiudadesGeocodificacion,
  calcularNumeroSagrado, reducirNumeroSagrado
} from './data/constants';

import {
  IDIOMAS_SOPORTADOS,
  t,
  translateCard,
  translateSearchQuery,
  translateSign,
  translateTonalli,
  translateNumber,
  setGlobalLanguage
} from './data/translations';


function calcularNumeroExpresion(nombreCompletoStr) {
  if (!nombreCompletoStr || !nombreCompletoStr.trim()) return null;
  const limpio = nombreCompletoStr
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
  if (!limpio) return null;
  let suma = 0;
  for (const letra of limpio) {
    suma += VALORES_PITAGORICOS[letra] || 0;
  }
  if (suma === 0) return null;
  return reducirNumeroSagrado(suma);
}

function generarNarrativaNumeros(nombre, sexo, numero, info, numeroExpresion, infoExpresion) {
  const n = nombre || "tú";
  const parrafos = [];
  parrafos.push(
    `${n}, tu fecha de nacimiento se reduce al número ${numero}: ${info.nombre}. ${info.sentido}`
  );
  parrafos.push(
    `Este número no determina quién eres de forma cerrada, sino que señala una energía de fondo con la que ya naciste familiarizada — algo que probablemente reconoces en ti misma al leerlo. ${info.enfoque}`
  );

  if (numeroExpresion && infoExpresion) {
    parrafos.push(
      `Además del camino de vida, calculamos tu número de expresión (o destino), a partir del valor numérico de cada letra de tu nombre completo, siguiendo ${CITAS.numerologia} Te dio el número ${numeroExpresion}: ${infoExpresion.nombre}. Mientras el camino de vida señala la lección central de tu vida, la expresión apunta a los talentos naturales con los que ya cuentas para transitarla.`
    );
    parrafos.push(
      numeroExpresion === numero
        ? `En tu caso, ambos números coinciden en la misma energía — algo poco frecuente, y que suele sentirse como una vocación clara: el talento con el que naciste y la lección que viniste a aprender apuntan literalmente en la misma dirección.`
        : `${infoExpresion.sentido} Cuando el camino de vida y la expresión difieren, como en tu caso, no es una contradicción: es una invitación a poner tu talento natural (${infoExpresion.nombre.toLowerCase()}) al servicio de tu lección de fondo (${info.nombre.toLowerCase()}), en vez de vivirlos como cosas separadas.`
    );
  }

  parrafos.push(
    `Como con toda lectura simbólica dentro de esta app, tómalo como una invitación a observarte con más atención, nunca como una etiqueta definitiva sobre quién puedes llegar a ser.`
  );
  return parrafos;
}

function calcularTonalli(fechaStr) {
  if (!fechaStr) return null;
  const [y, m, d] = fechaStr.split("-").map(Number);
  const fechaUTC = Date.UTC(y, m - 1, d);
  const diffDias = Math.round((fechaUTC - ANCLA_TONALLI) / 86400000);
  const signoIdx = (((ANCLA_SIGNO_IDX + diffDias) % 20) + 20) % 20;
  const numero = (((ANCLA_NUMERO - 1 + diffDias) % 13) + 13) % 13 + 1;
  const posEnTrecena = numero - 1;
  const signoInicioTrecenaIdx = (((signoIdx - posEnTrecena) % 20) + 20) % 20;
  const trecenaNumeroOrden = Math.floor((((diffDias % 260) + 260) % 260) / 13) + 1;
  return {
    numero,
    signo: TONALPOHUALLI_SIGNOS[signoIdx],
    trecenaSignoInicio: TONALPOHUALLI_SIGNOS[signoInicioTrecenaIdx],
    trecenaOrden: trecenaNumeroOrden,
  };
}

function GlobalStyle({ protoTheme = "proto-2" }) {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      
      html, body {
        overscroll-behavior-y: contain;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }

      body.modal-scroll-locked,
      html.modal-scroll-locked {
        overflow: hidden !important;
        touch-action: none !important;
        overscroll-behavior: none !important;
      }
      
      body.modal-scroll-locked .ss-phone-content {
        overflow: hidden !important;
        touch-action: none !important;
      }

      [data-modal-backdrop="true"] {
        touch-action: none !important;
        overscroll-behavior: contain !important;
      }

      [data-modal-scrollable="true"],
      .modal-scrollable {
        overscroll-behavior: contain !important;
        -webkit-overflow-scrolling: touch !important;
      }
      
      * { 
        box-sizing: border-box; 
        -webkit-font-smoothing: antialiased; 
        -moz-osx-font-smoothing: grayscale; 
        text-rendering: optimizeLegibility; 
        -webkit-user-select: none;
        user-select: none;
      }
      
      input, textarea {
        -webkit-user-select: text;
        user-select: text;
      }
      
      input[type="text"], input[type="search"], textarea {
        -webkit-spellcheck: default;
      }
      
      .ss-btn {
        font-family: ${FONT_BODY};
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.1px;
        border-radius: 999px;
        padding: 14px 26px;
        border: none;
        cursor: pointer;
        transition: transform 0.18s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.2s ease, opacity 0.2s ease, background 0.2s ease;
      }
      .ss-btn:active { transform: scale(0.965); }
      .ss-btn-primary { background: ${SAGE_DARK}; color: white; box-shadow: 0 6px 16px rgba(63,107,91,0.22); }
      .ss-btn-primary:hover { box-shadow: 0 8px 22px rgba(63,107,91,0.3); transform: translateY(-1px); }
      .ss-btn-primary:active { transform: scale(0.965); box-shadow: 0 3px 10px rgba(63,107,91,0.2); }
      .ss-btn-ghost { background: transparent; color: ${SAGE_DARK}; border: 1.5px solid ${SAGE_DARK}; }
      .ss-btn-ghost:hover { background: ${SAGE_TINT}; }
      .ss-btn-premium { background: ${LAVENDER}; color: white; box-shadow: 0 6px 16px rgba(138,107,184,0.28); }
      .ss-btn-premium:hover { box-shadow: 0 8px 22px rgba(138,107,184,0.36); transform: translateY(-1px); }
      .ss-btn-premium:active { transform: scale(0.965); box-shadow: 0 3px 10px rgba(138,107,184,0.24); }
      @media (hover: hover) and (pointer: fine) {
        .ss-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
        }
      }
      .ss-card-hover:active {
        transform: scale(0.98);
      }

      .ss-fade { animation: ssfade 0.4s cubic-bezier(0.22,1,0.36,1); }
      @keyframes ss-bounce-down {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.1); }
      }
      @keyframes ss-fade-scale {
        from { opacity: 0; transform: scale(0.95) translateY(10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes ss-breathe {
        0%, 100% { transform: scale(1) translateY(0); opacity: 0.8; }
        50% { transform: scale(1.02) translateY(-2px); opacity: 1; }
      }
      @keyframes ss-pulse-dot {
        0%, 100% { transform: scale(0.85); opacity: 0.7; }
        50% { transform: scale(1.3); opacity: 1; filter: drop-shadow(0 0 6px rgba(63, 107, 91, 0.9)); }
      }
      .ss-logo-watermark-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.08;
        pointer-events: none;
        z-index: 0;
        contain: strict;
        will-change: transform;
      }
      .ss-logo-watermark {
        width: 220px;
        height: auto;
        transform: translateZ(0);
        backface-visibility: hidden;
      }

      .ss-logo-loading-container {
        position: relative;
        width: 250px;
        height: 250px;
        max-width: 88vw;
        max-height: 88vw;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }

      .ss-logo-loading-aura {
        position: absolute;
        width: 230px;
        height: 230px;
        max-width: 82vw;
        max-height: 82vw;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(111,168,146,0.36) 0%, rgba(138,107,184,0.22) 45%, rgba(255,255,255,0) 74%);
        filter: blur(16px);
        animation: ss-aura-pulse 3.2s ease-in-out infinite;
      }

      @keyframes ss-aura-pulse {
        0%, 100% { transform: scale(0.92); opacity: 0.75; }
        50% { transform: scale(1.15); opacity: 1; }
      }

      .ss-logo-loading {
        width: 175px;
        max-width: 68vw;
        height: auto;
        animation: ss-breathe 2.8s ease-in-out infinite;
        display: block;
        margin: 0 auto;
        position: relative;
        z-index: 2;
        filter: drop-shadow(0 12px 28px rgba(63,107,91,0.22));
      }

      @keyframes ss-orbit-cw {
        0% { transform: rotate(0deg) translateX(102px) rotate(0deg) scale(0.9); opacity: 0.75; }
        50% { opacity: 1; transform: rotate(180deg) translateX(102px) rotate(-180deg) scale(1.22); }
        100% { transform: rotate(360deg) translateX(102px) rotate(-360deg) scale(0.9); opacity: 0.75; }
      }

      @keyframes ss-orbit-ccw {
        0% { transform: rotate(180deg) translateX(116px) rotate(-180deg) scale(0.8); opacity: 0.65; }
        50% { opacity: 1; transform: rotate(360deg) translateX(116px) rotate(-360deg) scale(1.12); }
        100% { transform: rotate(540deg) translateX(116px) rotate(-540deg) scale(0.8); opacity: 0.65; }
      }

      .ss-flower-orbit-cw {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 56px;
        height: auto;
        margin-top: -28px;
        margin-left: -28px;
        animation: ss-orbit-cw 7.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        z-index: 1;
        pointer-events: none;
        filter: drop-shadow(0 4px 12px rgba(111,168,146,0.3));
      }

      .ss-flower-orbit-ccw {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 46px;
        height: auto;
        margin-top: -23px;
        margin-left: -23px;
        animation: ss-orbit-ccw 9.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        z-index: 3;
        pointer-events: none;
        filter: drop-shadow(0 4px 10px rgba(138,107,184,0.25));
      }

      @keyframes ssfade { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }

      /* Entrada suave y con carácter de marca para el dashboard principal (Inicio) */
      .ss-dash-enter { animation: ssdashwrap 0.55s cubic-bezier(0.22,1,0.36,1) both; }
      @keyframes ssdashwrap { from { opacity: 0; transform: translateY(10px) scale(0.99);} to { opacity: 1; transform: translateY(0) scale(1);} }
      .ss-dash-stagger > * { animation: ssdashitem 0.6s cubic-bezier(0.22,1,0.36,1) both; }
      .ss-dash-stagger > *:nth-child(1) { animation-delay: 0.02s; }
      .ss-dash-stagger > *:nth-child(2) { animation-delay: 0.09s; }
      .ss-dash-stagger > *:nth-child(3) { animation-delay: 0.16s; }
      .ss-dash-stagger > *:nth-child(4) { animation-delay: 0.23s; }
      .ss-dash-stagger > *:nth-child(5) { animation-delay: 0.30s; }
      .ss-dash-stagger > *:nth-child(6) { animation-delay: 0.37s; }
      @keyframes ssdashitem { from { opacity: 0; transform: translateY(12px);} to { opacity: 1; transform: translateY(0);} }

      /* Extiende la entrada suave a las demás pantallas principales (Perspectivas, Reto, Diario, Calma) */
      .ss-stagger > * { animation: ssdashitem 0.55s cubic-bezier(0.22,1,0.36,1) both; }
      .ss-stagger > *:nth-child(1) { animation-delay: 0.02s; }
      .ss-stagger > *:nth-child(2) { animation-delay: 0.08s; }
      .ss-stagger > *:nth-child(3) { animation-delay: 0.14s; }
      .ss-stagger > *:nth-child(4) { animation-delay: 0.20s; }
      .ss-stagger > *:nth-child(5) { animation-delay: 0.26s; }
      .ss-stagger > *:nth-child(6) { animation-delay: 0.32s; }
      .ss-stagger > *:nth-child(7) { animation-delay: 0.38s; }
      .ss-stagger > *:nth-child(8) { animation-delay: 0.44s; }

      /* Barra de progreso: crece suavemente desde 0 al valor real al montar la pantalla */
      .ss-bar-fill { animation: ssbargrow 0.9s cubic-bezier(0.22,1,0.36,1) both; animation-delay: 0.15s; }
      @keyframes ssbargrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

      /* Aparición con "rebote" suave para marcas de selección (check, zona activa, etc.) */
      .ss-pop { animation: sspop 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
      @keyframes sspop { from { opacity: 0; transform: scale(0.4);} to { opacity: 1; transform: scale(1);} }

      /* Flotación muy sutil para las flores/hojas decorativas dispersas por la app */
      .ss-float { animation: ssfloat 9s ease-in-out infinite; }
      .ss-float-lento { animation: ssfloat 13s ease-in-out infinite; animation-delay: -4s; }
      @keyframes ssfloat { 0%, 100% { transform: translate(0, 0) rotate(var(--rot, 0deg)); } 50% { transform: translate(0, -7px) rotate(var(--rot, 0deg)); } }

      /* Respiración muy suave del logo en la pantalla de bienvenida */
      .ss-logo-respira { animation: sslogobreath 5.5s ease-in-out infinite; }
      @keyframes sslogobreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.035); } }

      /* Volteo de carta de tarot al revelarla */
      .ss-card-flip { animation: sscardflip 0.5s cubic-bezier(0.4,0.1,0.2,1) both; }
      @keyframes sscardflip { 0% { transform: rotateY(90deg); opacity: 0.3; } 100% { transform: rotateY(0deg); opacity: 1; } }

      /* ===== Pantalla de bienvenida ===== */
      /* El logo "florece" al entrar: aparece pequeño y translúcido, se abre con un
         rebote muy suave y luego queda respirando (la respiración va en un div interno
         para no pelear con la transformación de entrada). */
      .ss-bienvenida-logo { animation: sslogobloom 1.1s cubic-bezier(0.34,1.45,0.64,1) both; }
      @keyframes sslogobloom {
        0% { opacity: 0; transform: translateX(10%) scale(0.55) rotate(-4deg); }
        60% { opacity: 1; }
        100% { opacity: 1; transform: translateX(10%) scale(1) rotate(0deg); }
      }
      /* Ondas de calma que se expanden detrás del logo, como círculos en el agua */
      .ss-onda {
        position: absolute; top: 50%; left: 50%;
        width: 200px; height: 200px; border-radius: 50%;
        border: 1.5px solid ${SAGE};
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
        animation: ssripple 4.5s ease-out infinite;
        pointer-events: none;
      }
      .ss-onda-2 { animation-delay: 1.5s; }
      .ss-onda-3 { animation-delay: 3s; }
      @keyframes ssripple {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        15% { opacity: 0.35; }
        100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
      }
      /* El título llega un instante después del logo, subiendo con suavidad */
      .ss-bienvenida-titulo { animation: ssfade 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      /* Y el contenido entra escalonado, después del título */
      .ss-bienvenida-cuerpo > * { animation: ssdashitem 0.6s cubic-bezier(0.22,1,0.36,1) both; }
      .ss-bienvenida-cuerpo > *:nth-child(1) { animation-delay: 0.85s; }
      .ss-bienvenida-cuerpo > *:nth-child(2) { animation-delay: 1.0s; }
      .ss-bienvenida-cuerpo > *:nth-child(3) { animation-delay: 1.15s; }
      .ss-bienvenida-cuerpo > *:nth-child(4) { animation-delay: 1.3s; }

      /* Acordeón de idioma */
      .ss-acc-panel { overflow: hidden; transition: max-height 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease; }
      .ss-acc-chevron { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1); display: inline-block; }

      .ss-card { transition: transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
      .ss-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(37,51,46,0.08); }
      .ss-card:active { transform: translateY(0) scale(0.99); }

      .ss-input {
        width: 100%;
        font-family: ${FONT_BODY};
        font-size: 15px;
        padding: 13px 15px;
        border-radius: 13px;
        border: 1.5px solid ${LINE};
        background: white;
        color: ${INK};
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .ss-input:focus { border-color: ${SAGE}; box-shadow: 0 0 0 3px rgba(111,168,146,0.15); }
      .ss-input::placeholder { color: #a9b3ae; }
      textarea.ss-input { resize: none; line-height: 1.55; }
      .ss-chip {
        font-family: ${FONT_BODY};
        font-size: 13.5px;
        font-weight: 600;
        padding: 9px 16px;
        border-radius: 999px;
        border: 1.5px solid ${LINE};
        background: white;
        color: ${INK};
        cursor: pointer;
        transition: all 0.18s ease;
      }
      .ss-chip:hover { border-color: ${SAGE}; transform: translateY(-1px); }
      .ss-chip:active { transform: scale(0.94); }
      .ss-chip.active { background: ${SAGE_DARK}; border-color: ${SAGE_DARK}; color: white; box-shadow: 0 4px 12px rgba(63,107,91,0.2); }

      /* Quita el destello gris de tap en Android/iOS WebView; el feedback lo dan nuestras propias animaciones */
      button, a, .ss-card, .ss-chip { -webkit-tap-highlight-color: transparent; }

      /* Nav inferior: feedback al presionar, "pop" del ícono activo e indicador animado */
      .ss-nav-btn {
        padding: 8px 14px;
        gap: 6px;
        transition: transform 0.15s ease, background 0.3s ease, color 0.3s ease;
      }
      .ss-nav-btn:active { transform: scale(0.9); }
      @media (max-width: 400px) {
        .ss-nav-btn {
          padding: 8px 10px !important;
          gap: 4px !important;
        }
        .ss-nav-btn span {
          font-size: 11.5px !important;
        }
      }
      .ss-nav-icon { transition: color 0.2s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1); display: inline-block; }
      .ss-nav-icon.activo { transform: translateY(-1.5px) scale(1.14); }
      .ss-nav-label { transition: color 0.2s ease; }
      .ss-nav-dot { width: 4px; height: 4px; border-radius: 999px; background: ${SAGE_DARK}; animation: sspop 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }

      /* Accesibilidad (revisión de tiendas): respeta la preferencia del sistema de reducir movimiento.
         Las animaciones pasan a ser instantáneas para personas con sensibilidad al movimiento. */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      .ss-phone-content::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      .ss-phone-content {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }

      .ss-phone-outer {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 0;
        font-family: ${FONT_BODY};
        transition: background 0.4s ease;
      }
      .ss-phone-outer.device-desktop {
        align-items: stretch;
        padding: 0;
      }
      .ss-phone-outer.device-mobile, .ss-phone-outer.device-tablet {
        align-items: center;
        justify-content: flex-start;
        padding: 24px 12px 40px;
      }
      .ss-phone-wrapper {
        align-items: stretch;
      }
      .ss-phone-outer.device-mobile .ss-phone-wrapper,
      .ss-phone-outer.device-tablet .ss-phone-wrapper {
        align-items: center;
      }
      .ss-phone-outer.device-mobile .ss-proto-toolbar,
      .ss-phone-outer.device-tablet .ss-proto-toolbar {
        margin-bottom: 32px;
        border-radius: 999px;
        max-width: 1200px;
        border: 1px solid rgba(111, 168, 146, 0.3);
      }
      .proto-outer-proto-1 {
        background: #080e0c;
        background-image: radial-gradient(circle at 20% 30%, rgba(74, 124, 107, 0.14) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(214, 71, 43, 0.09) 0%, transparent 55%);
      }
      .proto-outer-proto-2 {
        background: #efece3;
        background-image: radial-gradient(circle at 15% 20%, rgba(111, 168, 146, 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(214, 71, 43, 0.08) 0%, transparent 50%);
      }
      .proto-outer-proto-3 {
        background: #f0f3f2;
        background-image: none;
      }

      .ss-proto-toolbar {
        width: 100%;
        max-width: none;
        margin-bottom: 0;
        background: #ffffff;
        border: none;
        border-bottom: 1px solid rgba(111, 168, 146, 0.3);
        border-radius: 0;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        z-index: 100;
        flex-wrap: wrap;
      }
      .proto-outer-proto-1 .ss-proto-toolbar {
        background: rgba(17, 29, 24, 0.9);
        border-color: rgba(111, 168, 146, 0.35);
        color: #f5f2eb;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.55);
      }
      .proto-outer-proto-3 .ss-proto-toolbar {
        background: rgba(255, 255, 255, 0.96);
        border-color: #cbd3d0;
        color: #1a2421;
      }
      .proto-outer-proto-4 .ss-proto-toolbar {
        background: rgba(253, 246, 242, 0.94);
        border-color: rgba(214, 71, 43, 0.25);
        color: #52362b;
        box-shadow: 0 12px 30px rgba(122, 89, 78, 0.12);
      }
      .proto-outer-proto-5 .ss-proto-toolbar {
        background: rgba(240, 245, 247, 0.92);
        border-color: rgba(26, 52, 61, 0.25);
        color: #1a343d;
        box-shadow: 0 12px 30px rgba(26, 52, 61, 0.1);
      }

      .ss-proto-brand {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: ${FONT_DISPLAY};
        font-size: 16px;
        font-weight: 600;
        color: inherit;
      }
      .ss-proto-badge {
        font-family: ${FONT_BODY};
        font-size: 11.5px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(111, 168, 146, 0.18);
        color: #3f6b5b;
      }
      .proto-outer-proto-1 .ss-proto-badge {
        background: rgba(111, 168, 146, 0.25);
        color: #88c0aa;
      }
      .proto-outer-proto-3 .ss-proto-badge {
        background: #e8edea;
        color: #1a2421;
      }
      .proto-outer-proto-4 .ss-proto-badge {
        background: rgba(214, 71, 43, 0.12);
        color: #d6472b;
      }
      .proto-outer-proto-5 .ss-proto-badge {
        background: rgba(26, 52, 61, 0.12);
        color: #1a343d;
      }

      .ss-proto-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .ss-proto-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px;
        border-radius: 999px;
        border: 1px solid transparent;
        background: transparent;
        font-family: ${FONT_BODY};
        font-size: 13px;
        font-weight: 600;
        color: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .ss-proto-btn:hover {
        background: rgba(111, 168, 146, 0.15);
      }
      .ss-proto-btn.active {
        background: #3f6b5b;
        color: #ffffff;
        border-color: #3f6b5b;
        box-shadow: 0 4px 12px rgba(63, 107, 91, 0.25);
      }
      .proto-outer-proto-1 .ss-proto-btn.active {
        background: #6fa892;
        color: #080e0c;
        border-color: #6fa892;
        box-shadow: 0 4px 14px rgba(111, 168, 146, 0.35);
      }
      .proto-outer-proto-3 .ss-proto-btn.active {
        background: #1a2421;
        color: #ffffff;
        border-color: #1a2421;
      }
      .proto-outer-proto-4 .ss-proto-btn.active {
        background: #d6472b;
        color: #ffffff;
        border-color: #d6472b;
        box-shadow: 0 4px 12px rgba(214, 71, 43, 0.25);
      }
      .proto-outer-proto-5 .ss-proto-btn.active {
        background: #1a343d;
        color: #ffffff;
        border-color: #1a343d;
        box-shadow: 0 4px 12px rgba(26, 52, 61, 0.25);
      }

      .ss-phone-frame {
        background: ${CREAM};
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        transition: all 0.4s ease;
      }
      .ss-phone-frame {
        width: 100% !important;
        height: 100dvh !important;
        max-height: none !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      .ss-phone-frame.device-desktop,
      .ss-phone-frame.device-mobile,
      .ss-phone-frame.device-tablet {
        width: 100% !important;
        height: 100dvh !important;
        max-height: none !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
      }
      .proto-frame-proto-1 {
        background: #111d18;
        border-color: #0d1612;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.7), 0 30px 75px rgba(0,0,0,0.75), 0 0 100px rgba(74,124,107,0.15);
      }
      .proto-frame-proto-2 {
        background: #faf8f3;
        border-color: #201f1c;
        box-shadow: 0 30px 60px rgba(0,0,0,0.22);
      }
      .proto-frame-proto-2 .ss-phone-content .ss-chip.active {
        background: ${KINOEMOTION} !important;
        border-color: ${KINOEMOTION} !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(214, 71, 43, 0.25) !important;
      }
      .proto-frame-proto-3 {
        background: #ffffff;
        border-color: #cbd3d0;
        box-shadow: 0 25px 50px rgba(37,51,46,0.14);
      }
      .proto-frame-proto-4 {
        background: #fdf6f2;
        border-color: #52362b;
        box-shadow: 0 30px 60px rgba(122, 89, 78, 0.22);
      }
      .proto-frame-proto-5 {
        background: #f0f5f7;
        border-color: #1a343d;
        box-shadow: 0 30px 60px rgba(26, 52, 61, 0.2);
      }

      .ss-phone-notch {
        display: none !important;
      }

      .ss-back-btn {
        position: absolute;
        top: 14px;
        right: 14px;
        z-index: 25;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        background: rgba(250,248,243,0.92);
        box-shadow: 0 2px 8px rgba(37,51,46,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 15px;
        color: ${SAGE_DARK};
        transition: transform 0.15s ease;
      }
      .ss-back-btn:hover { transform: scale(1.06); }
      .proto-frame-proto-1 .ss-back-btn {
        background: rgba(26, 43, 36, 0.9);
        color: #88c0aa;
        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
      }
      .proto-frame-proto-3 .ss-back-btn {
        background: #f0f3f2;
        color: #1a2421;
      }
      .proto-frame-proto-4 .ss-back-btn {
        background: #fffbf9;
        color: #52362b;
        box-shadow: 0 2px 8px rgba(122, 89, 78, 0.15);
      }
      .proto-frame-proto-5 .ss-back-btn {
        background: #ffffff;
        color: #1a343d;
        box-shadow: 0 2px 8px rgba(26, 52, 61, 0.15);
      }

      .ss-phone-content {
        flex: 1;
        overflow-y: auto;
        padding-top: 0;
        overflow-x: hidden;
      }

      /* PROTOTIPO 1: PROFUNDIDAD NOCTURNA (OVERRIDE INTERNO) */
      .proto-frame-proto-1 .ss-phone-content {
        color: #f5f2eb;
      }
      .proto-frame-proto-1 .ss-phone-content h1,
      .proto-frame-proto-1 .ss-phone-content h2,
      .proto-frame-proto-1 .ss-phone-content h3,
      .proto-frame-proto-1 .ss-phone-content h4,
      .proto-frame-proto-1 .ss-phone-content strong {
        color: #ffffff !important;
      }
      .proto-frame-proto-1 .ss-phone-content .ss-card {
        background: rgba(26, 43, 36, 0.8) !important;
        border-color: rgba(111, 168, 146, 0.25) !important;
        color: #f5f2eb !important;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
      }
      .proto-frame-proto-1 .ss-phone-content .ss-input {
        background: rgba(18, 30, 25, 0.95) !important;
        border-color: rgba(111, 168, 146, 0.35) !important;
        color: #f5f2eb !important;
      }
      .proto-frame-proto-1 .ss-phone-content .ss-input::placeholder {
        color: #7a8b84 !important;
      }
      .proto-frame-proto-1 .ss-phone-content .ss-chip {
        background: rgba(26, 43, 36, 0.8) !important;
        border-color: rgba(111, 168, 146, 0.3) !important;
        color: #f5f2eb !important;
      }
      .proto-frame-proto-1 .ss-phone-content .ss-chip.active {
        background: #6fa892 !important;
        border-color: #6fa892 !important;
        color: #080e0c !important;
      }

      /* PROTOTIPO 3: MINIMALISMO ZEN (OVERRIDE INTERNO) */
      .proto-frame-proto-3 .ss-phone-content {
        color: #1a2421;
      }
      .proto-frame-proto-3 .ss-phone-content h1,
      .proto-frame-proto-3 .ss-phone-content h2,
      .proto-frame-proto-3 .ss-phone-content h3,
      .proto-frame-proto-3 .ss-phone-content h4,
      .proto-frame-proto-3 .ss-phone-content strong {
        color: #1a2421 !important;
      }
      .proto-frame-proto-3 .ss-phone-content .ss-card {
        background: #f8faf9 !important;
        border-color: #e1e6e4 !important;
        box-shadow: none !important;
      }
      .proto-frame-proto-3 .ss-phone-content .ss-input {
        background: #ffffff !important;
        border-color: #cbd3d0 !important;
        color: #1a2421 !important;
      }
      .proto-frame-proto-3 .ss-phone-content .ss-chip {
        background: #ffffff !important;
        border-color: #cbd3d0 !important;
        color: #1a2421 !important;
      }
      .proto-frame-proto-3 .ss-phone-content .ss-chip.active {
        background: #1a2421 !important;
        border-color: #1a2421 !important;
        color: #ffffff !important;
      }

      /* PROTOTIPO 4: BRISA ATARDECER (OVERRIDE INTERNO) */
      .proto-frame-proto-4 .ss-phone-content {
        color: #52362b;
      }
      .proto-frame-proto-4 .ss-phone-content h1,
      .proto-frame-proto-4 .ss-phone-content h2,
      .proto-frame-proto-4 .ss-phone-content h3,
      .proto-frame-proto-4 .ss-phone-content h4,
      .proto-frame-proto-4 .ss-phone-content strong {
        color: #d6472b !important;
      }
      .proto-frame-proto-4 .ss-phone-content .ss-card {
        background: #ffffff !important;
        border-color: rgba(214, 71, 43, 0.15) !important;
        color: #52362b !important;
        box-shadow: 0 8px 24px rgba(122, 89, 78, 0.06) !important;
      }
      .proto-frame-proto-4 .ss-phone-content .ss-input {
        background: #fffbf9 !important;
        border-color: #cbd3d0 !important;
        color: #52362b !important;
      }
      .proto-frame-proto-4 .ss-phone-content .ss-chip {
        background: #ffffff !important;
        border-color: rgba(122, 89, 78, 0.2) !important;
        color: #52362b !important;
      }
      .proto-frame-proto-4 .ss-phone-content .ss-chip.active {
        background: #d6472b !important;
        border-color: #d6472b !important;
        color: #ffffff !important;
      }

      /* PROTOTIPO 5: AURA ETÉREA (OVERRIDE INTERNO) */
      .proto-frame-proto-5 .ss-phone-content {
        color: #1a343d;
      }
      .proto-frame-proto-5 .ss-phone-content h1,
      .proto-frame-proto-5 .ss-phone-content h2,
      .proto-frame-proto-5 .ss-phone-content h3,
      .proto-frame-proto-5 .ss-phone-content h4,
      .proto-frame-proto-5 .ss-phone-content strong {
        color: #1a343d !important;
      }
      .proto-frame-proto-5 .ss-phone-content .ss-card {
        background: #ffffff !important;
        border-color: rgba(26, 52, 61, 0.15) !important;
        color: #1a343d !important;
        box-shadow: 0 4px 16px rgba(26, 52, 61, 0.06) !important;
      }
      .proto-frame-proto-5 .ss-phone-content .ss-input {
        background: #ffffff !important;
        border-color: #c4d4d9 !important;
        color: #1a343d !important;
      }
      .proto-frame-proto-5 .ss-phone-content .ss-chip {
        background: #ffffff !important;
        border-color: #c4d4d9 !important;
        color: #1a343d !important;
      }
      .proto-frame-proto-5 .ss-phone-content .ss-chip.active {
        background: #1a343d !important;
        border-color: #1a343d !important;
        color: #ffffff !important;
      }

      /* Responsive: en pantallas de móvil real, la app ocupa toda la pantalla, */
      /* sin marco decorativo de teléfono ni muescas — se comporta como una app real. */
      @media (max-width: 480px) {
        .ss-phone-outer {
          padding: 0;
          background: ${CREAM};
          align-items: stretch;
        }
        .ss-proto-toolbar {
          border-radius: 0;
          margin-bottom: 0;
        }
        .ss-phone-frame {
          width: 100%;
          height: 100dvh;
          max-height: none;
          border-radius: 0;
          border: none;
          box-shadow: none;
        }
        .ss-phone-notch { display: none; }
        .ss-phone-content { padding-top: 0; }
      }

      /* Tablets: marco un poco más ancho para aprovechar el espacio sin llegar al layout de escritorio */
      @media (min-width: 481px) and (max-width: 900px) {
        .ss-phone-frame { width: 420px; height: 844px; }
      }

      /* Evita que iOS Safari haga zoom automático al enfocar inputs con fuente menor a 16px */
      @media (max-width: 480px) {
        .ss-input, select.ss-input { font-size: 16px; }
      }

      /* Estilos para el autocompletado de lugar de nacimiento */
      .ss-sugerencias-contenedor {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: white;
        border: 1.5px solid ${LINE};
        border-radius: 14px;
        box-shadow: 0 12px 30px rgba(37,51,46,0.12);
        z-index: 999;
        overflow: hidden;
        animation: ssSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .ss-sugerencia-item {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        text-align: left;
        background: white;
        border: none;
        border-bottom: 1px solid ${LINE};
        padding: 12px 16px;
        cursor: pointer;
        font-family: ${FONT_BODY};
        font-size: 14.5px;
        color: ${INK};
        transition: background 0.15s ease, color 0.15s ease;
      }
      .ss-sugerencia-item:hover {
        background-color: ${LAVENDER_TINT};
        color: ${LAVENDER};
      }
      .ss-sugerencia-item:last-child {
        border-bottom: none;
      }
      @keyframes ssSlideDown {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}

const THEMES_DATA = {
  "proto-1": {
    name: "Profundidad Nocturna",
    badge: "Prototipo 1 · Dark & Holístico",
    icon: "🌙",
    desc: "Ambiente nocturno inmersivo con verdes profundos, esmeralda y destellos terracota.",
  },
  "proto-2": {
    name: "Renacer Aurora",
    badge: "Prototipo 2 · Botánico & Cálido",
    icon: "🌿",
    desc: "Estilo oficial cálido, crema artesanal con tonos salvia y acento terracota.",
  },
  "proto-3": {
    name: "Minimalismo Zen",
    badge: "Prototipo 3 · Claro & Terapéutico",
    icon: "🧘",
    desc: "Enfoque minimalista y zen de máxima legibilidad, estructura pura y sin distractores.",
  },
  "proto-4": {
    name: "Brisa Atardecer",
    badge: "Prototipo 4 · Calma & Calidez",
    icon: "🌅",
    desc: "Fondos beige melocotón suave, acentos rosa y terracota, diseñado para calidez y contención emocional.",
  },
  "proto-5": {
    name: "Aura Etérea",
    badge: "Prototipo 5 · Glass & Cielo",
    icon: "☁️",
    desc: "Fondos azul brisa suave, acentos índigo y cerceta profundo, tarjetas con efecto glassmorphism.",
  }
};

function PhoneFrame({
  children,
  bottomNav,
  sideDrawer,
  isDrawerOpen,
  onCloseDrawer,
  hojasVariante,
  onVolverBienvenida,
  mostrarVolver,
  stageKey,
  onSwipeRight = null,
  onSwipeLeft = null,
  protoTheme = "proto-2",
  onSelectProtoTheme,
  deviceMode = "desktop",
  onSelectDeviceMode
}) {
  // Al cambiar de pantalla, el contenido vuelve al inicio; sin esto, navegar desde una
  // pantalla larga dejaba a la nueva pantalla "a mitad de scroll" (bug UX clásico).
  const contentRef = useRef(null);
  const touchCoordsRef = useRef({ x: 0, y: 0, time: 0, isEdge: false });

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [stageKey]);

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    const frameRect = e.currentTarget?.getBoundingClientRect();
    const relX = frameRect ? (t.clientX - frameRect.left) : t.clientX;
    touchCoordsRef.current = {
      x: t.clientX,
      y: t.clientY,
      time: Date.now(),
      isEdge: relX <= 55 || t.clientX <= 55
    };
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchCoordsRef.current.x;
    const dy = t.clientY - touchCoordsRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const duration = Date.now() - touchCoordsRef.current.time;

    // Si el toque ocurrió sobre campos de formulario o elementos táctiles dedicados, no interferir
    const target = e.target;
    if (target && target.closest && target.closest('input, textarea, select, [data-no-swipe], .ss-body-map, .no-swipe, .ss-slider')) {
      return;
    }

    // Gesto horizontal nítido: desplazamiento horizontal > 48px y predominancia sobre el eje vertical
    if (absX > 48 && absX > absY * 1.35 && duration < 700) {
      if (dx > 0) {
        if (onSwipeRight) onSwipeRight({ isEdge: touchCoordsRef.current.isEdge });
      } else {
        if (onSwipeLeft) onSwipeLeft();
      }
    }
  };

  const themeInfo = THEMES_DATA[protoTheme] || THEMES_DATA["proto-1"];

  return (
    <div className={`ss-phone-outer proto-outer-${protoTheme} device-${deviceMode}`}>
      <div className="ss-phone-wrapper" style={{ width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>

        <div
          className={`ss-phone-frame proto-frame-${protoTheme} device-${deviceMode}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: isDrawerOpen ? '#3f6b5b' : undefined
          }}
        >
          {sideDrawer}

          <div
            className="ss-logo-watermark-container"
            style={{ opacity: isDrawerOpen ? 0.02 : 0.08, transition: "opacity 0.3s ease" }}
          >
            <img src={LOGO_DATA_URI} className="ss-logo-watermark" alt="" />
          </div>

          {typeof hojasVariante === "number" && <HojasDispersas variante={hojasVariante} />}

          {mostrarVolver && !isDrawerOpen && (
            <button
              onClick={onVolverBienvenida}
              aria-label="Volver a la pantalla de bienvenida"
              title="Volver a la bienvenida"
              className="ss-back-btn"
            >
              &#8962;
            </button>
          )}

          {/* Contenedor principal con efecto de perspectiva y desplazamiento lateral 3D */}
          <div
            ref={contentRef}
            className="ss-phone-content"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              backgroundColor: "#faf8f3",
              transform: isDrawerOpen ? "translateX(78%) scale(0.86)" : "translateX(0) scale(1)",
              transformOrigin: "left center",
              borderRadius: isDrawerOpen ? "28px" : "0px",
              boxShadow: isDrawerOpen ? "-18px 0 45px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.15)" : "none",
              transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.35s ease, box-shadow 0.35s ease",
              userSelect: isDrawerOpen ? "none" : "auto",
              pointerEvents: isDrawerOpen ? "none" : "auto"
            }}
          >
            <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
              {children}
            </div>
            {bottomNav && <div style={{ minHeight: 110, flexShrink: 0 }} />}
          </div>

          {/* Overlay interactivo para cerrar el menú tocando la pantalla desplazada */}
          {isDrawerOpen && (
            <div
              onClick={onCloseDrawer}
              aria-label="Cerrar menú"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: "70%",
                zIndex: 99999,
                cursor: "pointer",
                backgroundColor: "transparent"
              }}
            />
          )}

          {bottomNav}
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { 
    id: "inicio", 
    label: "Inicio",
    shortLabel: "Inicio",
    icon: (activo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={activo ? "rgba(63, 107, 91, 0.2)" : "none"} stroke="currentColor" strokeWidth={activo ? "2.3" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9.5 9-7 9 7v10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  { 
    id: "reto", 
    label: "Mi reto",
    shortLabel: "Mi Reto",
    premium: true, 
    icon: (activo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={activo ? "rgba(63, 107, 91, 0.2)" : "none"} stroke="currentColor" strokeWidth={activo ? "2.3" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: "herramientas", 
    label: "Calma",
    shortLabel: "Calma",
    icon: (activo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={activo ? "rgba(63, 107, 91, 0.2)" : "none"} stroke="currentColor" strokeWidth={activo ? "2.3" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    )
  },
  { 
    id: "hub", 
    label: "Perspectivas",
    shortLabel: "Perspectivas",
    premium: true, 
    icon: (activo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={activo ? "rgba(63, 107, 91, 0.25)" : "none"} stroke="currentColor" strokeWidth={activo ? "2.3" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={activo ? "currentColor" : "none"}/>
      </svg>
    )
  },
  { 
    id: "especialistas", 
    label: "Expertos",
    shortLabel: "Expertos",
    premium: true, 
    icon: (activo) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={activo ? "rgba(63, 107, 91, 0.25)" : "none"} stroke="currentColor" strokeWidth={activo ? "2.3" : "1.85"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
];

function BottomNav({ current, hubItemId = null, onNavigate, esPremium, enPruebaActiva = false, planPago, tieneAccesoTotal = false, tutorialStep, idioma = "es" }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        padding: "0 8px calc(env(safe-area-inset-bottom, 0px) + 6px)",
        pointerEvents: "none",
        zIndex: 100,
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%"
      }}
    >
      <nav
        aria-label="Navegación principal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderRadius: 999,
          padding: "4px 5px",
          width: "100%",
          maxWidth: 410,
          boxShadow: "0 12px 36px -4px rgba(37, 51, 46, 0.2), 0 4px 12px rgba(37, 51, 46, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
          border: "1.2px solid rgba(111, 168, 146, 0.35)",
          pointerEvents: "auto",
          gap: 3,
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {NAV_ITEMS.map((item) => {
          const esEspecialistasActivo = (current === "especialistas") || (current === "hubDetalle" && hubItemId === "especialistas");
          const esHubActivo = (current === "hub") || (current === "hubDetalle" && hubItemId !== "especialistas");
          const esHerramientasActivo = current === "herramientas" || current === "herramientaDetalle";

          const activo =
            item.id === "especialistas"
              ? esEspecialistasActivo
              : item.id === "hub"
              ? esHubActivo
              : item.id === "herramientas"
              ? esHerramientasActivo
              : current === item.id;

          const tieneAccesoModulos = tieneAccesoTotal || esPremium || enPruebaActiva;
          const bloqueado =
            item.id === "especialistas"
              ? (!tieneAccesoTotal && planPago !== "anual")
              : (item.premium && !tieneAccesoModulos);
          
          const debaResaltar = 
            (tutorialStep === 4 && item.id === "reto") ||
            (tutorialStep === 7 && item.id === "herramientas") ||
            (tutorialStep === 10 && item.id === "hub") ||
            (tutorialStep === 12 && item.id === "especialistas");

          const manejarNavClick = () => {
            onNavigate(item.id, bloqueado);
          };

          const labelAMostrar = t(item.label, idioma);

          return (
            <button
              key={item.id}
              onClick={manejarNavClick}
              className="ss-nav-btn"
              aria-label={labelAMostrar}
              aria-current={activo ? "page" : undefined}
              style={{
                flex: activo ? "2 1 auto" : "1 1 34px",
                minWidth: activo ? 0 : 34,
                maxWidth: activo ? 152 : 42,
                height: 38,
                background: activo 
                  ? "linear-gradient(135deg, rgba(63, 107, 91, 0.18) 0%, rgba(111, 168, 146, 0.32) 100%)" 
                  : "transparent",
                border: activo ? "1.4px solid rgba(63, 107, 91, 0.45)" : "1.4px solid transparent",
                cursor: "pointer",
                borderRadius: 999,
                padding: activo ? "0 10px 0 4px" : "0",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: activo ? 6 : 0,
                fontFamily: FONT_BODY,
                position: "relative",
                transition: "all 0.28s cubic-bezier(0.34, 1.45, 0.64, 1)",
                color: activo ? SAGE_DARK : "#6f827a",
                boxShadow: debaResaltar 
                  ? "0 0 0 3px #dfa15f, 0 0 16px rgba(223,161,95,0.75)" 
                  : (activo ? "0 4px 14px rgba(63,107,91,0.18), inset 0 1px 2px rgba(255,255,255,0.9)" : "none"),
                transform: activo ? "translateY(-1px)" : "none",
                boxSizing: "border-box",
                overflow: "hidden"
              }}
            >
              {debaResaltar && (
                <div style={{
                  position: "absolute",
                  top: -46,
                  left: "50%",
                  transform: "translateX(-50%)",
                  animation: "ss-bounce-down 1s infinite ease-in-out",
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 99999
                }}>
                  <span style={{ fontSize: 22 }}>👇</span>
                  <span style={{
                    background: "#dfa15f",
                    color: "white",
                    fontSize: 8.5,
                    padding: "2px 7px",
                    borderRadius: 99,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    marginTop: -4,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>{t("¡Aquí!", idioma)}</span>
                </div>
              )}
              
              {/* Contenedor del ícono */}
              <div style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: activo ? 28 : 34,
                height: activo ? 28 : 34,
                borderRadius: "50%",
                background: activo ? "rgba(255, 255, 255, 0.95)" : "transparent",
                boxShadow: activo ? "0 2px 6px rgba(63, 107, 91, 0.2)" : "none",
                transition: "all 0.25s cubic-bezier(0.34, 1.45, 0.64, 1)",
                flexShrink: 0
              }}>
                {typeof item.icon === "function" ? item.icon(activo) : item.icon}
                {bloqueado && (
                  <span style={{ 
                    position: "absolute", 
                    top: activo ? -2 : 2, 
                    right: activo ? -2 : 2, 
                    fontSize: 8,
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "50%",
                    width: 12,
                    height: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }}>
                    🔒
                  </span>
                )}
              </div>

              {/* Nombre completo del módulo activo */}
              {activo && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  animation: "ssfade 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  overflow: "hidden",
                  minWidth: 0,
                  flexShrink: 1
                }}>
                  <span style={{ 
                    fontSize: "clamp(10.5px, 2.7vw, 12px)", 
                    fontWeight: 700, 
                    lineHeight: 1,
                    letterSpacing: "-0.2px",
                    color: "#1d382f",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block"
                  }}>
                    {labelAMostrar}
                  </span>
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: SAGE_DARK,
                      boxShadow: "0 0 6px #3f6b5b",
                      animation: "ss-pulse-dot 2s infinite ease-in-out",
                      flexShrink: 0
                    }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export const MenuContext = React.createContext({ onOpenMenu: () => {} });

export function TopBar({ title, onBack, onOpenMenu: onOpenMenuProp, step, totalSteps, conLogo, pasos, onIrPaso, theme = "light", rightAction, idioma }) {
  const menuCtx = React.useContext(MenuContext);
  const handleOpenMenu = onOpenMenuProp || menuCtx?.onOpenMenu;
  const isDark = theme === "dark";
  const textColor = isDark ? "#fff" : INK;
  const backColor = isDark ? "rgba(255,255,255,0.8)" : SAGE_DARK;
  return (
    <div style={{ padding: "18px 20px 12px", transition: "color 1s ease" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, minHeight: 38 }}>
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Volver"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(111, 168, 146, 0.12)",
              border: "none",
              color: backColor,
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              flexShrink: 0,
              transition: "all 0.2s ease"
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        ) : handleOpenMenu ? (
          <HamburgerButton onClick={handleOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
        ) : (
          <div style={{ width: 38 }} />
        )}

        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0, padding: "0 6px" }}>
          {conLogo ? (
            <img src={LOGO_DATA_URI} alt={t("Suelta", idioma) || "Suelta"} style={{ height: 26, opacity: 0.9 }} />
          ) : (
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: textColor, textAlign: "center", transition: "color 1s ease", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {title}
            </h2>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, minWidth: 38 }}>
          {rightAction}
          {onBack && handleOpenMenu && (
            <HamburgerButton onClick={handleOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
          )}
          {!rightAction && (!onBack || !handleOpenMenu) && (
            <div style={{ width: onBack ? 0 : 38 }} />
          )}
        </div>
      </div>
      {(step !== undefined && totalSteps !== undefined) && (
        <div style={{ height: 2, background: LINE, marginTop: 14, borderRadius: 1 }}>
          <div style={{ height: 2, background: SAGE_DARK, borderRadius: 1, width: `${(step / totalSteps) * 100}%`, transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)" }} />
        </div>
      )}
      {pasos && (
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {pasos.map((p, i) => (
             <div 
               key={i} 
               onClick={() => p.id === "comenzar" ? null : onIrPaso(i)}
               style={{ 
                 flex: 1, 
                 height: 3, 
                 background: i <= step ? SAGE_DARK : LINE, 
                 borderRadius: 1.5,
                 transition: "background 0.4s cubic-bezier(0.22,1,0.36,1)",
                 cursor: p.id === "comenzar" ? "default" : "pointer"
               }} 
             />
          ))}
        </div>
      )}
    </div>
  );
}


function LogoSuelta({ size = 56, plano = false, idioma = "es" }) {
  // Logo de marca: silueta femenina que fluye y se entrega, floreciendo en oxalis
  // púrpura. Representa soltar, la transformación y el renacer.
  return (
    <img
      src={LOGO_DATA_URI}
      alt={t("¡Suelta!", idioma) || "¡Suelta!"}
      width={size}
      style={{ height: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

// Colores tomados directamente de la hoja de oxalis triangularis de referencia.
const OXALIS_CENTRO = "#2e1224"; // centro muy oscuro
const OXALIS_MEDIO = "#4a1f3d";  // púrpura medio
const OXALIS_MAGENTA = "#682659"; // magenta vivo del borde
const OXALIS_TALLO = "#d2ac9b";   // tallo rosado
// Alias para compatibilidad
const OXALIS_OSCURO = OXALIS_CENTRO;
const OXALIS_CLARO = OXALIS_MAGENTA;

// Hoja de oxalis triangularis fiel a la planta: tres lóbulos triangulares anchos que se
// unen en el centro, cada uno con una muesca en la punta. Degradado radial del centro
// oscuro hacia los bordes magenta, con un velo de acuarela muy sutil.

// Flor de oxalis en acuarela (imagen de marca) usada como textura decorativa "regada"
// por los bordes de las pantallas. Puramente decorativa, no interactiva.
function FlorAcuarela({ size = 90, opacity = 1, rotate = 0, flip = false }) {
  return (
    <img
      src={FLOR_DATA_URI}
      alt=""
      aria-hidden="true"
      width={size}
      style={{
        height: "auto",
        display: "block",
        opacity,
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
      }}
    />
  );
}

// Flores de acuarela "regadas" sutilmente en las esquinas de cada pantalla.
function HojasDispersas({ variante = 0 }) {
  const sets = [
    [
      { top: -22, right: -30, size: 130, rot: 12, op: 0.5, flip: false },
      { bottom: 70, left: -34, size: 110, rot: 190, op: 0.42, flip: true },
    ],
    [
      { top: -26, left: -32, size: 120, rot: -14, op: 0.46, flip: true },
      { bottom: 84, right: -30, size: 116, rot: 165, op: 0.44, flip: false },
    ],
    [
      { top: 30, right: -34, size: 118, rot: 28, op: 0.44, flip: false },
      { bottom: 120, left: -30, size: 100, rot: 205, op: 0.4, flip: true },
    ],
    [
      { top: -20, right: 20, size: 104, rot: 8, op: 0.42, flip: true },
      { bottom: 90, left: -30, size: 122, rot: 200, op: 0.46, flip: false },
    ],
  ];
  const items = sets[variante % sets.length];
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className={i % 2 === 0 ? "ss-float" : "ss-float-lento"}
          style={{ position: "absolute", top: it.top, bottom: it.bottom, left: it.left, right: it.right }}
        >
          <FlorAcuarela size={it.size} opacity={it.op} rotate={it.rot} flip={it.flip} />
        </div>
      ))}
    </div>
  );
}

// Primera pantalla de la app: presenta qué es ¡Suelta! con el logo floreciendo entre
// ondas de calma, el mensaje central del "Diálogo" (la app da herramientas; el destino
// de esas herramientas es la conversación humana), el control del sonido ambiental y el
// idioma detectado automáticamente de la configuración del dispositivo.
function ScreenBienvenida({ onNext, onLogin, onLoginOld, onLoginManual, onRegisterManual, onCargarPrueba, onVerLegal, idiomaLabel, idiomaEsEspanol, onBorrarDatos, idioma, onChangeIdioma, onAbrirSelectorIdioma, onOpenMenu }) {
  const menuCtx = React.useContext(MenuContext);
  const handleOpenMenu = onOpenMenu || menuCtx?.onOpenMenu;
  const [tab, setTab] = React.useState("presentacion");
  const [pasoOnboarding, setPasoOnboarding] = React.useState(0);
  const [loginForm, setLoginForm] = React.useState({ email: "", password: "" });
  const [errorLogin, setErrorLogin] = React.useState("");
  const [cargandoAuth, setCargandoAuth] = React.useState(false);

  const formatAuthError = (err) => {
    const errMsg = err?.message || String(err);
    if (
      errMsg.includes("missing initial state") ||
      errMsg.includes("sessionStorage") ||
      errMsg.includes("web-storage-unsupported") ||
      (err.code && err.code.includes("web-storage-unsupported"))
    ) {
      return "🔒 Tu navegador bloquea el almacenamiento temporal para inicios de sesión externos.\n\n💡 Usa 'Crear cuenta con correo' o 'Entrar' abajo.";
    }
    return errMsg;
  };

  const slides = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6f42c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      bgIcon: "rgba(111, 66, 193, 0.12)",
      title: t("El espacio para soltar", idioma),
      desc: (
        <>
          <strong>¡Suelta!</strong> {t("es tu refugio digital. Te ayudamos a escuchar tus emociones, entender tus síntomas y reconectar con tu calma desde la raíz.", idioma)}
        </>
      )
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6f42c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      bgIcon: "rgba(111, 66, 193, 0.12)",
      title: t("El Diálogo Humano", idioma),
      desc: t("Nada reemplaza el valor de conectar con otra persona. Te damos herramientas para transformar tus conversaciones en encuentros reales.", idioma)
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6f42c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
      bgIcon: "rgba(111, 66, 193, 0.12)",
      title: t("Un viaje de 21 días", idioma),
      desc: t("Acompáñanos en un reto guiado de 21 días. Lleva un diario de bienestar, forma nuevos hábitos y encuentra tu centro nuevamente.", idioma)
    }
  ];

  return (
    <div style={{ position: "relative", minHeight: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(170deg, #F8FAF9 0%, #E6EFEA 100%)", overflow: "hidden" }}>
      {/* Elementos decorativos de fondo */}
      <div style={{ position: "absolute", top: "-10%", left: "-20%", width: "70%", height: "40%", background: "radial-gradient(ellipse at center, rgba(138,107,184,0.15) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", filter: "blur(40px)", zIndex: 0 }} aria-hidden="true" />
      <div style={{ position: "absolute", bottom: "-10%", right: "-20%", width: "80%", height: "50%", background: "radial-gradient(ellipse at center, rgba(111,168,146,0.18) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", filter: "blur(50px)", zIndex: 0 }} aria-hidden="true" />
      
      <div style={{ padding: "24px 22px 26px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
        {/* Cabecera con menú lateral e idioma */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 4 }}>
          {handleOpenMenu ? (
            <HamburgerButton onClick={handleOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
          ) : <div style={{ width: 38 }} />}
          <button
            type="button"
            onClick={onAbrirSelectorIdioma}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255, 255, 255, 0.85)",
              border: `1px solid rgba(111, 168, 146, 0.35)`,
              borderRadius: 20,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 600,
              color: SAGE_DARK,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              transition: "all 0.2s ease"
            }}
          >
            <span>🌐</span>
            <span>{idioma === "en" ? "🇺🇸 English" : idioma === "fr" ? "🇫🇷 Français" : idioma === "it" ? "🇮🇹 Italiano" : "🇪🇸 Español"}</span>
            <span style={{ fontSize: 9, opacity: 0.7 }}>▼</span>
          </button>
        </div>

        {/* Logo con aureola floral y respiración */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 10, marginTop: "2vh" }} className="ss-fade">
          <div className="ss-onda" aria-hidden="true" />
          <div className="ss-onda ss-onda-2" aria-hidden="true" />
          <div className="ss-onda ss-onda-3" aria-hidden="true" />
          <div className="ss-bienvenida-logo" style={{ transform: "translateX(10%)" }}>
            <div className="ss-logo-respira">
              <LogoSuelta size={150} />
            </div>
          </div>
        </div>
        
        <div className="ss-bienvenida-titulo ss-dash-stagger" style={{ textAlign: "center", marginBottom: 18 }}>
          <h1 style={{ fontFamily: FONT_LOGO, fontWeight: 900, fontSize: 38, color: SAGE_DARK, margin: 0, letterSpacing: "-0.5px" }}>{t("¡SUELTA!", idioma)}</h1>
          
          <div style={{
            fontFamily: FONT_BODY,
            fontWeight: 500,
            fontSize: 10.5,
            color: SAGE_DARK,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: 4,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}>
            <span>LA ^ VACHE</span>
          </div>

          <p style={{ fontSize: 13.5, color: MUTED, margin: "6px auto 0", lineHeight: 1.45, maxWidth: "270px", fontFamily: FONT_BODY }}>
            {t("El espacio digital para escuchar tus emociones y reconectar con tu calma.", idioma)}
          </p>
        </div>

        {/* Segmented Control / Tabs Selector cuando ya pasó la presentación */}
        {tab !== "presentacion" && (
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            padding: "4px",
            marginBottom: "14px",
            border: `1px solid rgba(111,168,146,0.25)`,
            gap: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
          }} className="ss-fade">
            <button
              onClick={() => setTab("registro")}
              style={{
                flex: 1,
                padding: "11px 6px",
                border: tab === "registro" ? `1px solid rgba(111,168,146,0.2)` : "none",
                borderRadius: "10px",
                background: tab === "registro" ? "white" : "transparent",
                color: tab === "registro" ? SAGE_DARK : MUTED,
                fontFamily: FONT_BODY,
                fontSize: "13.5px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: tab === "registro" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {t("Registrarme", idioma)}
            </button>
            <button
              onClick={() => setTab("login")}
              style={{
                flex: 1,
                padding: "11px 6px",
                border: tab === "login" ? `1px solid rgba(111,168,146,0.2)` : "none",
                borderRadius: "10px",
                background: tab === "login" ? "white" : "transparent",
                color: tab === "login" ? SAGE_DARK : MUTED,
                fontFamily: FONT_BODY,
                fontSize: "13.5px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: tab === "login" ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              {t("Iniciar Sesión", idioma)}
            </button>
          </div>
        )}

        <div className="ss-bienvenida-cuerpo ss-dash-stagger" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* MODO PRESENTACIÓN (SLIDES 1, 2, 3) */}
          {tab === "presentacion" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="ss-fade">
              <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: `1.5px solid rgba(213,229,220,0.8)`, borderRadius: 22, padding: "24px 22px", boxShadow: "0 8px 24px rgba(63,107,91,0.06)", minHeight: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between" }} key={pasoOnboarding} className="ss-fade">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: slides[pasoOnboarding].bgIcon, flexShrink: 0 }}>
                      {slides[pasoOnboarding].icon}
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: SAGE_DARK, margin: 0, fontFamily: FONT_DISPLAY }}>
                      {slides[pasoOnboarding].title}
                    </h3>
                  </div>
                  <p style={{ fontSize: 14, color: INK, lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
                    {slides[pasoOnboarding].desc}
                  </p>
                </div>
                
                {/* Paginación Dots */}
                <div style={{ display: "flex", gap: 8, marginTop: 22, justifyContent: "center" }}>
                  {slides.map((_, i) => (
                    <div key={i} style={{ width: i === pasoOnboarding ? 20 : 7, height: 7, borderRadius: 4, background: i === pasoOnboarding ? SAGE : "rgba(111,168,146,0.25)", transition: "all 0.3s ease" }} />
                  ))}
                </div>
              </div>

              <button
                className="ss-btn ss-btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: "16px", fontWeight: 700, borderRadius: 24, boxShadow: "0 8px 24px rgba(63,107,91,0.25)" }}
                onClick={() => {
                  if (pasoOnboarding < slides.length - 1) {
                    setPasoOnboarding(p => p + 1);
                  } else {
                    setTab("registro");
                  }
                }}
              >
                {pasoOnboarding < slides.length - 1 ? t("Siguiente", idioma) : t("Comenzar", idioma)}
              </button>
            </div>
          )}

          {/* TAB REGISTRARME (EXACTO A CAPTURA 5) */}
          {tab === "registro" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#FFFFFF", padding: "20px 18px", borderRadius: "22px", border: "1.5px solid rgba(213,229,220,0.9)", boxShadow: "0 8px 24px rgba(63,107,91,0.06)" }} className="ss-fade">
              {/* Botón de Google en la parte superior */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    setErrorLogin("");
                    await onLogin(false);
                  } catch (err) {
                    const errMsg = err?.message || String(err);
                    if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") return;
                    setErrorLogin("ERROR: " + formatAuthError(err));
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: `1.5px solid #d8eae1`,
                  background: "#FFFFFF",
                  color: "#25332e",
                  fontFamily: FONT_BODY,
                  fontSize: "14.5px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7v2.24h2.9c1.7-1.57 2.69-3.88 2.69-6.57z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.58-5.05-3.72H.95v2.3C2.43 15.89 5.5 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.95 10.68c-.18-.54-.28-1.12-.28-1.68s.1-1.14.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l3-2.3z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.43 0 9 0 5.5 0 2.43 2.11.95 5.02l3 2.3c.71-2.14 2.7-3.72 5.05-3.72z"/>
                </svg>
                {t("Registrarme con Google", idioma)}
              </button>

              {/* Separador */}
              <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#e1ebe5" }} />
                <span style={{ padding: "0 10px", fontSize: "11px", color: "#8a9e94", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                  {t("O CREA TU CUENTA", idioma)}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#e1ebe5" }} />
              </div>

              {/* Botón verde para ir al formulario de registro con correo */}
              <button
                type="button"
                className="ss-btn ss-btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: "14.5px", fontWeight: 700, borderRadius: 24 }}
                onClick={() => {
                  if (onNext) onNext();
                }}
              >
                {t("Crear cuenta con correo", idioma)}
              </button>

              {errorLogin && (
                <div style={{ padding: "10px 14px", background: "#fef1f2", color: "#991b1b", borderRadius: "10px", fontSize: "12px", border: "1px solid #fee2e2", whiteSpace: "pre-line", textAlign: "left", lineHeight: 1.45 }}>
                  {errorLogin.replace("ERROR: ", "")}
                </div>
              )}
            </div>
          )}

          {/* TAB INICIAR SESIÓN (EXACTO A CAPTURA 6) */}
          {tab === "login" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#FFFFFF", padding: "20px 18px", borderRadius: "22px", border: "1.5px solid rgba(213,229,220,0.9)", boxShadow: "0 8px 24px rgba(63,107,91,0.06)" }} className="ss-fade">
              {/* Botón de Google en la parte superior */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    setErrorLogin("");
                    await onLogin(true);
                  } catch (err) {
                    const errMsg = err?.message || String(err);
                    if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") return;
                    setErrorLogin("ERROR: " + formatAuthError(err));
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "14px",
                  border: `1.5px solid #d8eae1`,
                  background: "#FFFFFF",
                  color: "#25332e",
                  fontFamily: FONT_BODY,
                  fontSize: "14.5px",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.2s ease"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7v2.24h2.9c1.7-1.57 2.69-3.88 2.69-6.57z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.58-5.05-3.72H.95v2.3C2.43 15.89 5.5 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.95 10.68c-.18-.54-.28-1.12-.28-1.68s.1-1.14.28-1.68V5.02H.95C.34 6.22 0 7.57 0 9s.34 2.78.95 3.98l3-2.3z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.43 0 9 0 5.5 0 2.43 2.11.95 5.02l3 2.3c.71-2.14 2.7-3.72 5.05-3.72z"/>
                </svg>
                {t("Continuar con Google", idioma)}
              </button>

              {/* Separador */}
              <div style={{ display: "flex", alignItems: "center", margin: "2px 0" }}>
                <div style={{ flex: 1, height: "1px", background: "#e1ebe5" }} />
                <span style={{ padding: "0 10px", fontSize: "11px", color: "#8a9e94", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 700 }}>
                  {t("O CON CORREO", idioma)}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#e1ebe5" }} />
              </div>

              {/* Formulario de Correo y Contraseña */}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#3f6b5b", paddingLeft: 2 }}>{t("Correo electrónico", idioma)}</label>
                <input
                  type="email"
                  placeholder="ej. camila@email.com"
                  className="ss-input"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px" }}
                  value={loginForm.email}
                  onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#3f6b5b", paddingLeft: 2 }}>{t("Contraseña", idioma)}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="ss-input"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px" }}
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <a
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!loginForm.email) {
                      setErrorLogin(t("Por favor, ingresa tu correo electrónico para recuperar la contraseña.", idioma));
                      return;
                    }
                    try {
                      setErrorLogin(t("Enviando enlace...", idioma));
                      await sendPasswordResetEmail(auth, loginForm.email);
                      setErrorLogin(t("¡Enlace enviado! Revisa tu bandeja de entrada.", idioma));
                    } catch (err) {
                      setErrorLogin(t("Error al enviar enlace. Revisa que el correo sea válido.", idioma));
                    }
                  }}
                  style={{ fontSize: "12px", color: "#3f6b5b", textDecoration: "underline", fontWeight: 600 }}
                >
                  {t("¿Olvidaste tu contraseña?", idioma)}
                </a>
              </div>
              
              {errorLogin && (
                <div style={{ padding: "10px 14px", background: "#fef1f2", color: "#991b1b", borderRadius: "10px", fontSize: "12px", border: "1px solid #fee2e2", whiteSpace: "pre-line", textAlign: "left", lineHeight: 1.45 }}>
                  {errorLogin.replace("ERROR: ", "")}
                </div>
              )}

              <button
                type="button"
                className="ss-btn ss-btn-primary"
                disabled={cargandoAuth}
                style={{ width: "100%", marginTop: 4, padding: "14px", fontSize: "15px", fontWeight: 700, borderRadius: 24 }}
                onClick={async () => {
                  try {
                    setErrorLogin("");
                    setCargandoAuth(true);
                    await onLoginManual(loginForm.email, loginForm.password);
                  } catch (err) {
                    setErrorLogin(t("Correo o contraseña incorrectos", idioma));
                  } finally {
                    setCargandoAuth(false);
                  }
                }}
              >
                {cargandoAuth ? t("Iniciando sesión...", idioma) : t("Entrar", idioma)}
              </button>
            </div>
          )}

          {/* Botón invisible para tests automatizados */}
          {onCargarPrueba && (
            <button onClick={onCargarPrueba} aria-label="Cargar usuario de prueba" style={{ display: "none" }} />
          )}
        </div>

        {/* Botones de Pie de Pantalla (Exactos a capturas) */}
        <div style={{ marginTop: "auto", paddingTop: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <button
            onClick={onLoginOld}
            style={{
              background: "none",
              border: "none",
              color: "#3f6b5b",
              fontSize: "13.5px",
              fontWeight: "700",
              textDecoration: "underline",
              cursor: "pointer",
              transition: "opacity 0.2s ease"
            }}
          >
            {t("Explorar sin cuenta", idioma)}
          </button>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => onVerLegal("terminos")}
              style={{ background: "none", border: "none", color: "#6b7b74", fontSize: "12px", textDecoration: "underline", cursor: "pointer" }}
            >
              {t("Términos", idioma)}
            </button>
            <button
              onClick={() => onVerLegal("privacidad")}
              style={{ background: "none", border: "none", color: "#6b7b74", fontSize: "12px", textDecoration: "underline", cursor: "pointer" }}
            >
              {t("Privacidad", idioma)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



const COUNTRY_CODES = [
  { code: 'co', dial: '+57', name: 'Colombia' },
  { code: 'mx', dial: '+52', name: 'México' },
  { code: 'es', dial: '+34', name: 'España' },
  { code: 'ar', dial: '+54', name: 'Argentina' },
  { code: 'cl', dial: '+56', name: 'Chile' },
  { code: 'pe', dial: '+51', name: 'Perú' },
  { code: 've', dial: '+58', name: 'Venezuela' },
  { code: 'ec', dial: '+593', name: 'Ecuador' },
  { code: 'gt', dial: '+502', name: 'Guatemala' },
  { code: 'cu', dial: '+53', name: 'Cuba' },
  { code: 'bo', dial: '+591', name: 'Bolivia' },
  { code: 'do', dial: '+1', name: 'Rep. Dominicana' },
  { code: 'us', dial: '+1', name: 'Estados Unidos' },
  { code: 'cr', dial: '+506', name: 'Costa Rica' },
  { code: 'pa', dial: '+507', name: 'Panamá' },
  { code: 'uy', dial: '+598', name: 'Uruguay' },
  { code: 'py', dial: '+595', name: 'Paraguay' },
  { code: 'hn', dial: '+504', name: 'Honduras' },
  { code: 'sv', dial: '+503', name: 'El Salvador' },
  { code: 'ni', dial: '+505', name: 'Nicaragua' },
  { code: 'pr', dial: '+1', name: 'Puerto Rico' },
  { code: 'br', dial: '+55', name: 'Brasil' },
];

function CountrySelect({ value, onChange, idioma = "es" }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '120px' }}>
      <div 
        className="ss-input"
        style={{ 
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', 
          padding: '0 10px', color: '#333', userSelect: 'none',
          backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 8, height: 42
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={`https://flagcdn.com/w20/${selected.code}.png`} width="20" alt="" />
        <span style={{ fontSize: 14 }}>{selected.dial}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, width: 220,
          marginTop: 4, backgroundColor: '#fff', border: '1px solid #ccc',
          borderRadius: 8, maxHeight: '35vh', overflowY: 'auto', zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {COUNTRY_CODES.map((c, i) => (
            <div 
              key={c.code + i}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                cursor: 'pointer', borderBottom: i === COUNTRY_CODES.length - 1 ? 'none' : '1px solid #eee',
                backgroundColor: value === c.code ? '#f0f7ff' : 'transparent'
              }}
              onClick={() => { onChange(c.code); setIsOpen(false); }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = value === c.code ? '#f0f7ff' : 'transparent'}
            >
              <img src={`https://flagcdn.com/w20/${c.code}.png`} width="20" alt="" />
              <span style={{ fontSize: 14, minWidth: 35, fontWeight: 500 }}>{c.dial}</span>
              <span style={{ fontSize: 13, color: '#555' }}>{t(c.name, idioma)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


const SEXO_OPTIONS = [
  { value: '', label: 'Sexo', color: 'transparent', icon: null },
  { value: 'F', label: 'Femenino', icon: '♀', color: '#ffe6e6' },
  { value: 'M', label: 'Masculino', icon: '♂', color: '#e6f0ff' },
  { value: 'O', label: 'Otro', icon: '⚥', color: '#f0f0f0' }
];

function SexoSelect({ value, onChange, idioma = "es" }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = SEXO_OPTIONS.find(o => o.value === value) || SEXO_OPTIONS[0];
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', flex: 1 }}>
      <div 
        className="ss-input"
        style={{ 
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', 
          padding: '0 10px', color: value ? '#333' : '#777', userSelect: 'none',
          backgroundColor: selected.color, border: '1px solid #ccc', borderRadius: 8, height: 42
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.icon && <span style={{ fontSize: 16 }}>{selected.icon}</span>}
        <span style={{ fontSize: 14 }}>{t(selected.label, idioma)}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: 4, backgroundColor: '#fff', border: '1px solid #ccc',
          borderRadius: 8, maxHeight: '35vh', overflowY: 'auto', zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {SEXO_OPTIONS.slice(1).map((o, i) => (
            <div 
              key={o.value}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                cursor: 'pointer', borderBottom: i === 2 ? 'none' : '1px solid #eee',
                backgroundColor: o.color
              }}
              onClick={() => { onChange(o.value); setIsOpen(false); }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
            >
              <span style={{ fontSize: 16 }}>{o.icon}</span>
              <span style={{ fontSize: 14, color: '#333' }}>{t(o.label, idioma)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const EDAD_OPTIONS = Array.from({length: 86}, (_, i) => i + 15);

function EdadSelect({ value, onChange, idioma = "es" }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', flex: 1 }}>
      <div 
        className="ss-input"
        style={{ 
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', 
          padding: '0 10px', color: value ? '#333' : '#777', userSelect: 'none',
          backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 8, height: 42
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: 14 }}>{value || t('Edad', idioma)}</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: 4, backgroundColor: '#fff', border: '1px solid #ccc',
          borderRadius: 8, maxHeight: '35vh', overflowY: 'auto', zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, padding: 4
        }}>
          {EDAD_OPTIONS.map((age) => (
            <div 
              key={age}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0',
                cursor: 'pointer', borderRadius: 4,
                backgroundColor: value === String(age) ? '#f0f7ff' : 'transparent',
                fontSize: 14, color: '#333'
              }}
              onClick={() => { onChange(String(age)); setIsOpen(false); }}
              onMouseEnter={(e) => { if(value !== String(age)) e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
              onMouseLeave={(e) => { if(value !== String(age)) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {age}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenRegistro({ onNext, onBack, onVerLegal, form, setForm, aceptaTerminos, setAceptaTerminos, onIrPaso, error, onErrorClose, isGoogleAuth, idioma = "es", onOpenIdiomaModal }) {
  const [localError, setLocalError] = useState("");
  useBloquearScrollFondo(Boolean(localError));
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRepetida, setPasswordRepetida] = useState("");
  const [emailError, setEmailError] = useState("");
  
  useEffect(() => { if(error) setLocalError(error); }, [error]);
  
  const handleEmailBlur = (e) => {
    const val = e.target.value;
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError(t("El correo electrónico no es válido. Ej: nombre@correo.com", idioma));
    } else {
      setEmailError("");
    }
  };
  const valido = form.nombre && form.edad && form.sexo && (isGoogleAuth || (form.email && form.password && form.password === passwordRepetida && !emailError)) && aceptaTerminos;
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Registro", idioma)} onBack={onBack} step={1} pasos={PASOS_ONBOARDING} onIrPaso={onIrPaso} idioma={idioma} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, marginTop: 6, overflowY: "auto" }}>
        {/* Recordatorio de idioma predeterminado de la cuenta */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(111,168,146,0.1)", borderRadius: 12, padding: "8px 12px", border: `1px solid ${SAGE_TINT}` }}>
          <span style={{ fontSize: 12, color: SAGE_DARK, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            🌐 {t("Idioma predeterminado", idioma)}: <strong>{idioma === "en" ? "English 🇺🇸" : idioma === "fr" ? "Français 🇫🇷" : idioma === "it" ? "Italiano 🇮🇹" : "Español 🇪🇸"}</strong>
          </span>
          {onOpenIdiomaModal && (
            <button
              type="button"
              onClick={onOpenIdiomaModal}
              style={{
                background: "none",
                border: "none",
                color: SAGE_DARK,
                fontSize: 11.5,
                fontWeight: 700,
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              {t("Cambiar", idioma)}
            </button>
          )}
        </div>

        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 21, color: INK, margin: "0 0 4px" }}>
          {t("Cuéntanos quién eres", idioma)}
        </h2>
        <p style={{ color: MUTED, fontSize: 13.5, margin: "0 0 6px", lineHeight: 1.55, fontFamily: FONT_DISPLAY, fontStyle: "italic" }}>
          {t("Cada síntoma es un mensaje y cada historia, una puerta. Aquí aprendes a escucharlos, a soltar lo que ya cumplió su ciclo, y a sanar desde la raíz.", idioma)}
        </p>
        <input
          className="ss-input"
          placeholder={t("Nombre completo", idioma)}
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        
        <div style={{ display: "flex", gap: 10 }}>
          <EdadSelect value={form.edad} onChange={(val) => setForm({ ...form, edad: val })} idioma={idioma} />
          <SexoSelect value={form.sexo} onChange={(val) => setForm({ ...form, sexo: val })} idioma={idioma} />
        </div>

        {!isGoogleAuth && (
          <>
            <div style={{ position: "relative" }}>
              <input
                className="ss-input"
                style={{ width: "100%", borderColor: emailError ? "red" : undefined }}
                placeholder={t("Correo electrónico", idioma)}
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (emailError) setEmailError("");
                }}
                onBlur={handleEmailBlur}
              />
              {emailError && <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{emailError}</div>}
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="ss-input"
                style={{ width: "100%", paddingRight: 40 }}
                placeholder={t("Contraseña", idioma)}
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 10, top: 10, background: "none", border: "none", 
                  cursor: "pointer", fontSize: 18, color: "#777", padding: 0
                }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#999" }}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#999" }}>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="ss-input"
                style={{ width: "100%", borderColor: form.password && passwordRepetida && form.password !== passwordRepetida ? "red" : undefined }}
                placeholder={t("Repetir Contraseña", idioma)}
                type={showPassword ? "text" : "password"}
                value={passwordRepetida}
                onChange={(e) => setPasswordRepetida(e.target.value)}
              />
              {form.password && passwordRepetida && form.password !== passwordRepetida && (
                <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>{t("Las contraseñas no coinciden", idioma)}</div>
              )}
            </div>
          </>
        )}
        
        <div style={{ display: "flex", gap: 10 }}>
          <CountrySelect value={form.codigoPais || "co"} idioma={idioma} onChange={(val) => {
            let formatted = form.celular;
            if (form.celular) {
              const asYouType = new AsYouType(val.toUpperCase());
              formatted = asYouType.input(form.celular.replace(/\D/g, ''));
            }
            setForm({ ...form, codigoPais: val, celular: formatted });
          }} />
          <input
            className="ss-input"
            style={{ flex: 1 }}
            placeholder={t("Celular", idioma)}
            type="tel"
            value={form.celular}
            onChange={(e) => {
              const asYouType = new AsYouType(form.codigoPais ? form.codigoPais.toUpperCase() : "CO");
              const formatted = asYouType.input(e.target.value);
              setForm({ ...form, celular: formatted });
            }}
          />
        </div>

        <div>
          <input
            className="ss-input"
            placeholder={t("Apodo o cómo te gusta que te digan", idioma)}
            value={form.apodo}
            onChange={(e) => setForm({ ...form, apodo: e.target.value })}
          />
          <p style={{ fontSize: 11, color: MUTED, margin: "5px 2px 0", lineHeight: 1.4 }}>
            {t("Si nos lo compartes, lo usaremos para hablarte de forma más cercana en tus lecturas.", idioma)}
          </p>
        </div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 9, marginTop: 4, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            style={{ width: 22, height: 22, minWidth: 22, marginTop: 0, accentColor: SAGE_DARK, cursor: "pointer" }}
          />
          <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
            {t("He leído y acepto los", idioma)}{" "}
            <span
              onClick={(e) => { e.preventDefault(); onVerLegal("terminos"); }}
              style={{ color: SAGE_DARK, fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}
            >
              {t("Términos de uso", idioma)}
            </span>{" "}
            {t("y la", idioma)}{" "}
            <span
              onClick={(e) => { e.preventDefault(); onVerLegal("privacidad"); }}
              style={{ color: SAGE_DARK, fontWeight: 700, textDecoration: "underline", cursor: "pointer" }}
            >
              {t("Política de privacidad", idioma)}
            </span>
            .
          </span>
        </label>

        {/* REFUERZO DE PROTECCIÓN DE DATOS (HABEAS DATA) */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fbfbfc 100%)",
          border: `1.5px solid ${LINE}`,
          borderRadius: 14,
          padding: "12px 14px",
          marginTop: 8,
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
        }}>
          <span style={{ fontSize: 18, color: SAGE_DARK }}>🛡️</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4 }}>
              {t("Habeas Data Protegido y Cifrado", idioma)}
            </span>
            <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.45 }}>
              {t("De acuerdo con la Ley de Protección de Datos Personales, tus historias íntimas y emociones sensibles se cifran de forma segura bajo la infraestructura de alta seguridad de Google Cloud. En cualquier momento podrás actualizar, rectificar o eliminar toda tu información directamente desde tu perfil.", idioma)}
            </p>
          </div>
        </div>
      </div>
      <button
        className="ss-btn ss-btn-primary"
        style={{ width: "100%", opacity: valido ? 1 : 0.9 }}
        onClick={() => {
          let faltantes = [];
          if (!form.nombre) faltantes.push(t("• Nombre completo", idioma));
          if (!form.edad) faltantes.push(t("• Edad", idioma));
          if (!form.sexo) faltantes.push(t("• Sexo", idioma));
          if (!isGoogleAuth) {
            if (!form.email) {
              faltantes.push(t("• Correo electrónico", idioma));
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
              setLocalError(t("El correo electrónico ingresado no es válido.", idioma));
              return;
            }
            if (!form.password) {
              faltantes.push(t("• Contraseña", idioma));
            } else if (form.password.length < 6) {
              setLocalError(t("La contraseña debe tener al menos 6 caracteres.", idioma));
              return;
            } else if (form.password !== passwordRepetida) {
              setLocalError(t("Las contraseñas no coinciden.", idioma));
              return;
            }
          }
          if (!aceptaTerminos) faltantes.push(t("• Aceptar Términos y Política", idioma));
          
          if (faltantes.length > 0) {
            setLocalError(t("Por favor completa los siguientes campos obligatorios para continuar:\n\n", idioma) + faltantes.join("\n"));
            return;
          }
          
          onNext(form);
        }}
      >
        {t("Crear mi espacio", idioma)}
      </button>

      {localError && (
        <div data-modal-backdrop="true" className="ss-fade" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 22, overscrollBehavior: "contain", touchAction: "none"
        }}>
          <div style={{
            backgroundColor: "#FAF9F6", borderRadius: 16, padding: "24px",
            width: "100%", maxWidth: 360, position: "relative",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <button 
              onClick={() => { setLocalError(""); if(onErrorClose) onErrorClose(); }} 
              style={{
                position: "absolute", top: 12, right: 12,
                background: "none", border: "none", fontSize: 24, cursor: "pointer",
                color: "#777", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", padding: 0
              }}
            >
              ×
            </button>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, margin: "0 0 12px", color: '#1a1a1a', fontWeight: 600 }}>{t("Atención", idioma)}</h3>
            <p style={{ color: "#444", fontSize: 14.5, margin: 0, whiteSpace: "pre-line", lineHeight: 1.5, textAlign: "left" }}>
              {localError}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenPerfil({ nombre, email, planPago, datosPagoBasico, retoDiaActual, retoCompletados, entradasCount, fotoPerfil, onCambiarFotoPerfil, onEditarNombre, onEditarNacimiento, onOpenRecordatorios, onIrReto, onIrDiario, onVerSuscripcion, onVerLegal, onBorrarDatos, onCerrarSesion, onBack, idioma, onChangeIdioma, diaPruebaActual = 1, diasRestantesPrueba = 0, enPruebaActiva = false, pruebaExpirada = false, tieneAccesoTotal = false, onAbrirModalPrueba }) {
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);
  const esAlpha = planPago === "anual";
  const esPremium = planPago === "mensual" || planPago === "anual";
  const plan = PLANES_PAGO.find((p) => p.id === planPago);
  const inicial = (nombre || "?").trim().charAt(0).toUpperCase();
  const pctReto = Math.round(((retoCompletados ? retoCompletados.length : 0) / 21) * 100);
  const racha = retoCompletados ? retoCompletados.length : 0;

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Mi perfil", idioma)} onBack={onBack} />
      <div className="ss-stagger" style={{ flex: 1, marginTop: 10, overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          <div
            onClick={() => {
              if (onCambiarFotoPerfil) {
                abrirSelectorCamaraNativa({
                  facingMode: "user",
                  onFotoCapturada: (dataUrl) => onCambiarFotoPerfil(dataUrl)
                });
              }
            }}
            title={t("Toca para tomar una foto con la cámara", idioma)}
            style={{
              width: 58,
              height: 58,
              minWidth: 58,
              borderRadius: "50%",
              background: SAGE_TINT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_DISPLAY,
              fontSize: 22,
              fontWeight: 600,
              color: SAGE_DARK,
              position: "relative",
              cursor: "pointer",
              border: `2px solid ${SAGE_LIGHT}`,
              overflow: "hidden"
            }}
          >
            {fotoPerfil ? (
              <img src={fotoPerfil} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span>{inicial}</span>
            )}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px 0"
            }}>
              <Camera size={11} color="white" />
            </div>
          </div>
          <div>
            <p style={{ fontSize: 17, fontWeight: 700, color: INK, margin: 0, fontFamily: FONT_DISPLAY }}>{nombre}</p>
            {email && <p style={{ fontSize: 11.5, color: MUTED, margin: "1px 0 0" }}>{email}</p>}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: 800,
                color: esPremium ? "#065f46" : "#b45309",
                background: esPremium ? "#ecfdf5" : "#fef3c7",
                border: `1px solid ${esPremium ? "#a7f3d0" : "#fde68a"}`,
                borderRadius: 999,
                padding: "3px 10px",
                marginTop: 5,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: esPremium ? "#10b981" : "#f59e0b" }} />
              {esPremium
                ? (planPago === "anual"
                    ? t("✨ Suscripción Activa · Plan Anual", idioma)
                    : t("✨ Suscripción Activa · Plan Mensual", idioma))
                : t("🌱 Modo Prueba (3 días)", idioma)}
            </span>
          </div>
        </div>

        {/* Detalles de Suscripción Nativa Segura con Tarjeta Identificadora */}
        {esPremium && (
          <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <TarjetaIdentificadorSuscriptor
              uid={auth?.currentUser?.uid}
              orderId={datosPagoBasico?.orderId}
              planPago={planPago}
              idioma={idioma}
              fechaTransaccion={datosPagoBasico?.fechaTransaccion}
            />

            {onVerSuscripcion && (
              <button
                onClick={onVerSuscripcion}
                style={{
                  width: "100%",
                  background: "#f0fdf4",
                  border: "1.5px solid #bbf7d0",
                  borderRadius: 14,
                  padding: "11px 16px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#065f46",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 2px 6px rgba(1,135,95,0.06)",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <GooglePlayIcon size={14} />
                  <span>{t("Ver detalles completos de suscripción", idioma)}</span>
                </span>
                <span>&rarr;</span>
              </button>
            )}
          </div>
        )}

        {/* Banner de Modo Prueba para usuarios no premium */}
        {(!esPremium || (!esAlpha && planPago === "prueba")) && !tieneAccesoTotal && (
          <div style={{
            background: pruebaExpirada 
              ? "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(220, 38, 38, 0.05) 100%)"
              : diaPruebaActual === 3
              ? "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)"
              : diaPruebaActual === 2
              ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
              : "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)",
            border: `1.5px solid ${pruebaExpirada ? "rgba(239, 68, 68, 0.3)" : diaPruebaActual === 3 ? "#fde68a" : diaPruebaActual === 2 ? "#86efac" : "#d8b4fe"}`,
            borderRadius: 16,
            padding: "16px 18px",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{pruebaExpirada ? "🔒" : diaPruebaActual === 3 ? "⏳" : diaPruebaActual === 2 ? "🌿" : "🌱"}</span>
              <div>
                <h4 style={{ fontSize: 13.5, fontWeight: 700, color: pruebaExpirada ? "#991b1b" : diaPruebaActual === 3 ? "#92400e" : diaPruebaActual === 2 ? "#166534" : "#6b21a8", margin: 0 }}>
                  {pruebaExpirada 
                    ? t("Has cumplido tus 3 días de prueba", idioma)
                    : diaPruebaActual === 3
                    ? t("Día 3 de 3 · ¡Último día de prueba!", idioma)
                    : diaPruebaActual === 2
                    ? `${t("Día 2 de 3 · Acceso Premium de prueba", idioma)} (Queda 1 día)`
                    : `${t("Día 1 de 3 · Acceso Premium de prueba", idioma)} (Quedan 2 días)`}
                </h4>
                <p style={{ fontSize: 11.5, color: pruebaExpirada ? "#7f1d1d" : diaPruebaActual === 3 ? "#b45309" : diaPruebaActual === 2 ? "#15803d" : "#7c3aed", margin: 0 }}>
                  {pruebaExpirada 
                    ? t("Tu período gratuito ha concluido. Adquiere tu suscripción para reactivar tu acceso.", idioma)
                    : t("Pasa a adquirir tu suscripción para mantener todo tu avance y acompañamiento continuo.", idioma)}
                </p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: INK, margin: 0, lineHeight: 1.4 }}>
              {t("Suscríbete para acceder de manera ilimitada al Reto de 21 días, todas las herramientas de calma y el acompañamiento completo.", idioma)}
            </p>
            <button
              onClick={() => {
                if (onAbrirModalPrueba) onAbrirModalPrueba();
                else if (onVerSuscripcion) onVerSuscripcion();
              }}
              style={{
                background: pruebaExpirada ? "#dc2626" : diaPruebaActual === 3 ? "#d97706" : diaPruebaActual === 2 ? "#15803d" : "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                alignSelf: "flex-start",
                boxShadow: "0 2px 6px rgba(0,0,0,0.18)"
              }}
            >
              {pruebaExpirada ? t("Adquirir suscripción ahora", idioma) : t("Ver aviso de suscripción", idioma)} &rarr;
            </button>
          </div>
        )}

        {/* ===== Tu progreso ===== */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
          {t("Tu progreso", idioma)}
        </p>
        <button
          onClick={onIrReto}
          className="ss-card ss-card-hover"
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            cursor: onIrReto ? "pointer" : "default",
            fontFamily: FONT_BODY,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK }}>&#10052; {t("Reto de 21 días", idioma)}</span>
            <span style={{ fontSize: 11.5, color: LAVENDER, fontWeight: 700 }}>
              {racha} {t("de", idioma)} 21 &middot; &#128293; {racha}
            </span>
          </div>
          <div style={{ height: 6, background: LAVENDER_TINT, borderRadius: 999, overflow: "hidden" }}>
            <div className="ss-bar-fill" style={{ width: `${pctReto}%`, height: "100%", background: LAVENDER, borderRadius: 999, transformOrigin: "left" }} />
          </div>
          <p style={{ fontSize: 10.5, color: MUTED, margin: "6px 0 0" }}>{t("Vas en el día", idioma)} {retoDiaActual} {t("de tu proceso", idioma)}</p>
        </button>
        <button
          onClick={onIrDiario}
          className="ss-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 22,
            cursor: onIrDiario ? "pointer" : "default",
            fontFamily: FONT_BODY,
          }}
        >
          <span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, display: "block" }}>&#9998; {t("Diario de bienestar", idioma)}</span>
            <span style={{ fontSize: 11, color: MUTED }}>
              {entradasCount || 0} {entradasCount === 1 ? t("entrada registrada", idioma) : t("entradas registradas", idioma)}
            </span>
          </span>
          <span style={{ color: MUTED, fontSize: 16 }}>&#8250;</span>
        </button>

        {/* ===== Cuenta ===== */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
          {t("Cuenta", idioma)}
        </p>
        {onVerSuscripcion && (
          <button
            onClick={onVerSuscripcion}
            className="ss-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "left",
              background: "white",
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 10,
              cursor: "pointer",
              fontFamily: FONT_BODY,
            }}
          >
            <span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, display: "block" }}>
                💳 {t("Mi suscripción", idioma)}
              </span>
              <span style={{ fontSize: 11, color: MUTED }}>
                {esPremium ? t("Gestionar suscripción activa", idioma) : t("Ver planes de suscripción", idioma)}
              </span>
            </span>
            <span style={{ color: MUTED, fontSize: 16 }}>&#8250;</span>
          </button>
        )}
        <button
          onClick={onEditarNombre}
          className="ss-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            cursor: "pointer",
            fontFamily: FONT_BODY,
          }}
        >
          <span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, display: "block" }}>
              &#9998; {t("Editar mi nombre", idioma)}
            </span>
            <span style={{ fontSize: 11, color: MUTED }}>{t("Cómo te llamamos en la app", idioma)}</span>
          </span>
          <span style={{ color: MUTED, fontSize: 16 }}>&#8250;</span>
        </button>

        <button
          onClick={onEditarNacimiento}
          className="ss-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            cursor: "pointer",
            fontFamily: FONT_BODY,
          }}
        >
          <span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, display: "block" }}>
              &#10052; {t("Mis datos de nacimiento", idioma)}
            </span>
            <span style={{ fontSize: 11, color: MUTED }}>{t("Para tus cartas natal, astral y azteca", idioma)}</span>
          </span>
          <span style={{ color: MUTED, fontSize: 16 }}>&#8250;</span>
        </button>

        <button
          onClick={onOpenRecordatorios}
          className="ss-card"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            background: "white",
            border: `1px solid ${LINE}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            cursor: "pointer",
            fontFamily: FONT_BODY,
          }}
        >
          <span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, display: "block" }}>
              🔔 {t("Recordatorios y Widget Android", idioma)}
            </span>
            <span style={{ fontSize: 11, color: MUTED }}>{t("Horarios, notificaciones nativas y widget móvil", idioma)}</span>
          </span>
          <span style={{ color: MUTED, fontSize: 16 }}>&#8250;</span>
        </button>

        {/* ===== Idioma / Language Settings ===== */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "22px 0 10px" }}>
          {t("Idioma de la aplicación", idioma)}
        </p>
        <div style={{
          background: "white",
          border: `1px solid ${LINE}`,
          borderRadius: 16,
          padding: "16px",
          marginBottom: 22,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: INK, display: "flex", alignItems: "center", gap: 6 }}>
              🌐 {t("Idioma predeterminado", idioma)}
            </span>
            <span style={{ fontSize: 11, color: SAGE_DARK, fontWeight: 700, background: SAGE_TINT, padding: "3px 10px", borderRadius: 999 }}>
              {idioma === "en" ? "🇺🇸 English" : idioma === "fr" ? "🇫🇷 Français" : idioma === "it" ? "🇮🇹 Italiano" : "🇪🇸 Español"}
            </span>
          </div>
          <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.45 }}>
            {t("Selecciona tu idioma preferido para toda la interfaz y los análisis:", idioma)}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { id: "es", label: "Español", flag: "🇪🇸" },
              { id: "en", label: "English", flag: "🇺🇸" },
              { id: "fr", label: "Français", flag: "🇫🇷" },
              { id: "it", label: "Italiano", flag: "🇮🇹" }
            ].map((lang) => {
              const isSelected = lang.id === idioma;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onChangeIdioma && onChangeIdioma(lang.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: isSelected ? `2px solid ${SAGE}` : `1px solid ${LINE}`,
                    background: isSelected ? SAGE_TINT : "#FAFAFA",
                    color: isSelected ? SAGE_DARK : INK,
                    fontFamily: FONT_BODY,
                    fontSize: 13,
                    fontWeight: isSelected ? "700" : "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {isSelected && <span style={{ color: SAGE_DARK, fontSize: 13, fontWeight: 800 }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== Legal ===== */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
          {t("Legal", idioma)}
        </p>
        <button
          onClick={() => onVerLegal("terminos")}
          className="ss-card"
          style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", marginBottom: 8, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: INK }}
        >
          {t("Términos de uso", idioma)}
        </button>
        <button
          onClick={() => onVerLegal("privacidad")}
          className="ss-card"
          style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: INK }}
        >
          {t("Política de privacidad", idioma)}
        </button>

        {onCerrarSesion && (
          <button
            onClick={onCerrarSesion}
            className="ss-card ss-card-hover"
            style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", marginTop: 14, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: INK }}
          >
            &#x21AA; {t("Cerrar sesión", idioma)}
          </button>
        )}

        {/* ===== Privacidad y datos ===== */}
        <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "22px 0 10px" }}>
          {t("Privacidad y datos (Habeas Data)", idioma)}
        </p>
        <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 10px", lineHeight: 1.5 }}>
          {t("Tu progreso e historial de bienestar se guardan de forma segura y cifrada en la nube bajo tu cuenta personal. En virtud de la Ley de Habeas Data, tienes el derecho de conocer, rectificar, actualizar o suprimir tu información en cualquier momento de manera irrevocable.", idioma)}
        </p>
        {!confirmandoBorrado ? (
          <button
            onClick={() => setConfirmandoBorrado(true)}
            className="ss-card"
            style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: "#b3453a" }}
          >
            🗑️ {t("Ejercer derecho de supresión (Borrar mis datos)", idioma)}
          </button>
        ) : (
          <div style={{ background: KINOEMOTION_TINT, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={{ fontSize: 12, color: INK, margin: 0, lineHeight: 1.45 }}>
              {t("Esta acción ejercerá tu derecho Habeas Data de supresión, eliminando permanentemente tu cuenta y todos tus datos (perfil, lecturas de bienestar, reto de 21 días, diario íntimo, emociones y bitácoras de progreso) de nuestros servidores en la nube y de este dispositivo de forma irrevocable. ¿Confirmas la eliminación permanente?", idioma)}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={onBorrarDatos}
                className="ss-btn"
                style={{ flex: 1, background: "#b3453a", color: "white", fontSize: 12.5, padding: "9px 0" }}
              >
                {t("Sí, borrar todo de la nube", idioma)}
              </button>
              <button
                onClick={() => setConfirmandoBorrado(false)}
                className="ss-btn ss-btn-ghost"
                style={{ flex: 1, fontSize: 12.5, padding: "9px 0" }}
              >
                {t("Cancelar", idioma)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function obtenerIdSuscriptor(uid, orderId) {
  if (!uid && !orderId) return "SLT-849201";
  const raw = (orderId || uid || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const hash = raw.length >= 6 ? raw.slice(-6) : (raw + "920184").slice(0, 6);
  return `SLT-${hash}`;
}

function TarjetaIdentificadorSuscriptor({ uid, orderId, planPago, idioma = "es", fechaTransaccion = null }) {
  const [copiado, setCopiado] = useState(false);
  const subscriberId = obtenerIdSuscriptor(uid, orderId);
  const esAnual = planPago === "anual";

  const handleCopiar = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(subscriberId).catch(() => {});
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%)",
      borderRadius: 20,
      padding: "16px 18px",
      color: "white",
      boxShadow: "0 8px 24px rgba(6, 78, 59, 0.28)",
      position: "relative",
      overflow: "hidden",
      border: "1.5px solid rgba(167, 243, 208, 0.4)",
      marginBottom: 6
    }}>
      {/* Glow / Watermark */}
      <div style={{
        position: "absolute",
        right: -10,
        bottom: -15,
        opacity: 0.12,
        pointerEvents: "none",
        fontSize: 90,
        fontWeight: 900
      }}>
        ✨
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16
          }}>
            👑
          </div>
          <div>
            <span style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a7f3d0" }}>
              {t("Membresía Oficial Suelta & Sana", idioma)}
            </span>
            <h4 style={{ fontSize: 14, fontWeight: 800, margin: 0, color: "white" }}>
              {esAnual ? t("Acceso Total Anual", idioma) : t("Acceso Premium Mensual", idioma)}
            </h4>
          </div>
        </div>
        <span style={{
          fontSize: 9.5,
          fontWeight: 800,
          background: "#10b981",
          color: "white",
          padding: "3px 8px",
          borderRadius: 99,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>
          ● ACTIVO
        </span>
      </div>

      {/* ID de Suscriptor */}
      <div style={{
        background: "rgba(0, 0, 0, 0.22)",
        borderRadius: 12,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid rgba(255, 255, 255, 0.14)"
      }}>
        <div>
          <span style={{ fontSize: 9.5, color: "rgba(255, 255, 255, 0.75)", textTransform: "uppercase", letterSpacing: "0.06em", display: "block" }}>
            {t("ID Único de Suscriptor", idioma)}
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 900, letterSpacing: "0.08em", color: "#fef08a" }}>
            {subscriberId}
          </span>
        </div>
        <button
          onClick={handleCopiar}
          style={{
            background: copiado ? "#10b981" : "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: 8,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {copiado ? "✓ " + t("Copiado", idioma) : t("Copiar ID", idioma)}
        </button>
      </div>
    </div>
  );
}

function ScreenSuscripcion({ 
  planPago, 
  datosPagoBasico, 
  currentUser = null,
  onAdquirirSuscripcion, 
  onContinuarConfiguracion = null,
  onBack, 
  idioma = "es", 
  tieneAccesoTotal = false, 
  enPruebaActiva = false, 
  pruebaExpirada = false, 
  diasRestantesPrueba = 0,
  onRestaurarCompras = null
}) {
  const tieneCompraValida = !!(datosPagoBasico?.orderId || datosPagoBasico?.transaccionId || datosPagoBasico?.purchaseToken);
  const esPremium = tieneAccesoTotal || planPago === "mensual" || planPago === "anual" || tieneCompraValida;
  const planEfectivo = tieneAccesoTotal ? "anual" : (planPago === "mensual" || planPago === "anual" ? planPago : (datosPagoBasico?.planId || "anual"));
  const plan = PLANES_PAGO.find((p) => p.id === planEfectivo) || PLANES_PAGO[2];
  const esGooglePlay = datosPagoBasico?.plataforma?.includes("Google Play") || datosPagoBasico?.gateway === "google_play" || !datosPagoBasico?.gateway;
  const uidUsuario = currentUser?.uid || auth?.currentUser?.uid || "";

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column", background: "#fcfaf7" }}>
      <TopBar title={t("Mi suscripción", idioma)} onBack={onBack} idioma={idioma} />
      
      <div className="ss-stagger ss-no-scrollbar" style={{ flex: 1, marginTop: 10, overflowY: "auto" }}>
        {esPremium ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Tarjeta Visual de Identificador de Suscriptor */}
            <TarjetaIdentificadorSuscriptor
              uid={uidUsuario}
              orderId={datosPagoBasico?.orderId}
              planPago={planPago}
              idioma={idioma}
              fechaTransaccion={datosPagoBasico?.fechaTransaccion}
            />

            {/* Botón Principal de Continuación a Configuración / Nacimiento */}
            {onContinuarConfiguracion && (
              <button
                onClick={onContinuarConfiguracion}
                style={{
                  width: "100%",
                  background: "#01875f",
                  color: "white",
                  padding: "15px 18px",
                  fontSize: 14.5,
                  fontWeight: 800,
                  borderRadius: 20,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(1,135,95,0.32)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s"
                }}
              >
                <span>{t("Configurar mi Carta Natal y Datos Personales", idioma)}</span>
                <span>&rarr;</span>
              </button>
            )}

            {/* Detalles del Plan */}
            <div style={{
              background: "white",
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12
            }}>
              <h4 style={{ fontSize: 12.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: 0 }}>
                {t("Detalles del Plan", idioma)}
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                <span style={{ color: MUTED }}>{t("Precio y período:", idioma)}</span>
                <span style={{ fontWeight: 600, color: INK }}>{tieneAccesoTotal ? t("Acceso completo concedido", idioma) : (plan ? `${plan.precio} ${plan.periodo}` : "Premium")}</span>
              </div>
              {datosPagoBasico && !tieneAccesoTotal && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                    <span style={{ color: MUTED }}>{t("Plataforma:", idioma)}</span>
                    <span style={{ fontWeight: 600, color: INK, display: "flex", alignItems: "center", gap: 6 }}>
                      {esGooglePlay && <GooglePlayIcon size={16} />}
                      {datosPagoBasico.plataforma}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                    <span style={{ color: MUTED }}>{t("Medio de pago:", idioma)}</span>
                    <span style={{ fontWeight: 600, color: INK }}>{datosPagoBasico.medioPago}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                    <span style={{ color: MUTED }}>{t("Fecha transacción:", idioma)}</span>
                    <span style={{ fontWeight: 600, color: INK }}>{datosPagoBasico.fechaTransaccion}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11.5 }}>
                    <span style={{ color: MUTED }}>{t("ID de Transacción:", idioma)}</span>
                    <span style={{ fontFamily: "monospace", color: INK, wordBreak: "break-all", background: "#f5f5f5", padding: "4px 8px", borderRadius: 6 }}>
                      {datosPagoBasico.transaccionId || datosPagoBasico.orderId}
                    </span>
                  </div>

                  {/* Acciones de Google Play Store */}
                  {esGooglePlay && (
                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                      <a
                        href={obtenerUrlGestionGooglePlay(datosPagoBasico.productId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                          background: "#01875f",
                          color: "white",
                          borderRadius: 12,
                          padding: "10px 14px",
                          fontSize: 12.5,
                          fontWeight: 700,
                          textDecoration: "none",
                          boxShadow: "0 2px 8px rgba(1,135,95,0.22)"
                        }}
                      >
                        <GooglePlayIcon size={17} />
                        <span>{t("Administrar en Google Play Store", idioma)}</span>
                      </a>
                    </div>
                  )}

                  {onAdquirirSuscripcion && (
                    <button
                      onClick={onAdquirirSuscripcion}
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        color: "#166534",
                        borderRadius: 12,
                        padding: "10px 14px",
                        fontSize: 12.5,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        marginTop: 4
                      }}
                    >
                      <Sparkles size={16} />
                      <span>{t("Cambiar plan / Iniciar compra en Google Play", idioma)}</span>
                    </button>
                  )}
                </>
              )}

              {onRestaurarCompras && (
                <button
                  onClick={onRestaurarCompras}
                  style={{
                    background: "transparent",
                    border: `1px solid ${LINE}`,
                    borderRadius: 12,
                    padding: "9px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                    fontSize: 12,
                    color: MUTED,
                    fontWeight: 600
                  }}
                >
                  <GooglePlayIcon size={14} />
                  <span>{t("Sincronizar / Restaurar compras de Google Play", idioma)}</span>
                </button>
              )}
            </div>

            {/* Beneficios incluidos */}
            <div style={{
              background: "white",
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "16px 18px"
            }}>
              <h4 style={{ fontSize: 12.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
                {t("Tu acceso ilimitado incluye", idioma)}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan && plan.incluye.map((b, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: INK }}>
                    <span style={{ color: (planPago === "anual" || tieneAccesoTotal) ? KINOEMOTION_UI : SAGE_DARK, marginTop: 1 }}>&#10003;</span>
                    <span>{t(b, idioma)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Cabecera Invitación */}
            <div style={{
              background: "white",
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "24px 18px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
            }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: pruebaExpirada ? "rgba(239, 68, 68, 0.12)" : "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: pruebaExpirada ? "#dc2626" : "#a21caf",
                margin: "0 auto 12px"
              }}>
                {pruebaExpirada ? <Lock size={26} strokeWidth={2} /> : <Sparkles size={28} strokeWidth={2} />}
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 700, color: INK, margin: "0 0 6px" }}>
                {pruebaExpirada ? t("Prueba de 3 días concluida", idioma) : enPruebaActiva ? t("Prueba gratuita de 3 días", idioma) : t("Desbloquea Suelta Premium", idioma)}
              </h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.45, margin: 0, maxWidth: 280, marginLeft: "auto", marginRight: "auto" }}>
                {pruebaExpirada 
                  ? t("Tu período de prueba de 3 días ha finalizado. Elige un plan para continuar accediendo al reto, herramientas y perspectivas.", idioma)
                  : enPruebaActiva
                  ? `${t("Estás en tu prueba de 3 días", idioma)} (${diasRestantesPrueba} ${diasRestantesPrueba === 1 ? t("día restante", idioma) : t("días restantes", idioma)}). ${t("Suscríbete para asegurar tu continuidad sin interrupciones.", idioma)}`
                  : t("Descubre el camino definitivo de bienestar emocional con nuestro acceso completo sin límites.", idioma)
                }
              </p>
            </div>

            {/* Sello oficial de Google Play */}
            <GooglePlayShieldBadge idioma={idioma} />

            {/* Características de Premium */}
            <div style={{
              background: "white",
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "18px"
            }}>
              <h4 style={{ fontSize: 12.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
                {t("Beneficios Premium", idioma)}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: -1 }}>🚀</span>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: INK, margin: "0 0 2px" }}>{t("Reto de 21 días completo", idioma)}</h5>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.35 }}>{t("Completa los 21 días de sanación y mantén tu registro histórico.", idioma)}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: -1 }}>📓</span>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: INK, margin: "0 0 2px" }}>{t("Diario BuJo de Bienestar", idioma)}</h5>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.35 }}>{t("Registros y viñetas de bienestar ilimitados para tu crecimiento.", idioma)}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: -1 }}>🔮</span>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: INK, margin: "0 0 2px" }}>{t("Acceso total a las Perspectivas", idioma)}</h5>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.35 }}>{t("Carta natal, astral, azteca, constelaciones, numerología y más.", idioma)}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: -1 }}>🧘</span>
                  <div>
                    <h5 style={{ fontSize: 13, fontWeight: 700, color: INK, margin: "0 0 2px" }}>{t("Herramientas de calma ilimitadas", idioma)}</h5>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.35 }}>{t("Ejercicios de respiración, meditación guiada y audios binaurales.", idioma)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de compra */}
            <button
              onClick={onAdquirirSuscripcion}
              className="ss-btn ss-btn-primary ss-bounce"
              style={{
                width: "100%",
                padding: "14px 0",
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 14,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(63,107,91,0.25)"
              }}
            >
              <Sparkles size={16} /> {t("Adquirir suscripción Premium", idioma)}
            </button>

            {onRestaurarCompras && (
              <button
                onClick={onRestaurarCompras}
                style={{
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  color: MUTED,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "6px 0"
                }}
              >
                <GooglePlayIcon size={14} />
                <span>{t("Restaurar compras de Google Play", idioma)}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ScreenEditarPerfil({ nombreActual, apodoActual, fotoActual = null, onGuardar, onBack, onVerLegal, idioma = "es" }) {
  const [nombre, setNombreLocal] = useState(nombreActual || "");
  const [apodo, setApodoLocal] = useState(apodoActual || "");
  const [foto, setFoto] = useState(fotoActual);
  const valido = nombre.trim().length > 0;

  const handleTomarFoto = () => {
    abrirSelectorCamaraNativa({
      facingMode: "user",
      onFotoCapturada: (dataUrl) => setFoto(dataUrl)
    });
  };

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Editar perfil", idioma)} onBack={onBack} idioma={idioma} />
      <div style={{ flex: 1, marginTop: 10, display: "flex", flexDirection: "column", gap: 14 }}>
        
        {/* FOTO DE PERFIL / CÁMARA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: SAGE_TINT,
            border: `2.5px solid ${SAGE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 4px 12px rgba(63,107,91,0.15)"
          }}>
            {foto ? (
              <img src={foto} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: SAGE_DARK }}>
                {(nombre || "?").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleTomarFoto}
            className="ss-btn"
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#166534",
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <Camera size={14} /> {foto ? t("Cambiar foto con la cámara", idioma) : t("Tomar foto con la cámara", idioma)}
          </button>
        </div>

        <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.5, textAlign: "center" }}>
          {t("Así te llamaremos en tus saludos y lecturas dentro de la app.", idioma)}
        </p>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
            {t("Cómo quieres que te llamemos", idioma)}
          </label>
          <input 
            className="ss-input" 
            value={nombre} 
            onChange={(e) => setNombreLocal(e.target.value)} 
            placeholder={t("Tu nombre", idioma)}
            autoCorrect="on"
            spellCheck={true}
            autoCapitalize="words"
          />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
            {t("Apodo (opcional)", idioma)}
          </label>
          <input 
            className="ss-input" 
            value={apodo} 
            onChange={(e) => setApodoLocal(e.target.value)} 
            placeholder={t("Un apodo, si prefieres", idioma)}
            autoCorrect="on"
            spellCheck={true}
            autoCapitalize="words"
          />
          <p style={{ fontSize: 11, color: MUTED, margin: "5px 2px 0", lineHeight: 1.4 }}>
            {t("Si lo llenas, lo usaremos en vez de tu nombre en toda la app.", idioma)}
          </p>
        </div>

        <div style={{ marginTop: 10, paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
            {t("Legal", idioma)}
          </p>
          <button
            onClick={() => onVerLegal("terminos")}
            className="ss-card"
            style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", marginBottom: 8, cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: INK }}
          >
            {t("Términos de uso", idioma)}
          </button>
          <button
            onClick={() => onVerLegal("privacidad")}
            className="ss-card"
            style={{ display: "block", width: "100%", textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "11px 14px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13, fontWeight: 600, color: INK }}
          >
            {t("Política de privacidad", idioma)}
          </button>
        </div>
      </div>
      <button
        className="ss-btn ss-btn-primary"
        style={{ width: "100%", opacity: valido ? 1 : 0.5 }}
        disabled={!valido}
        onClick={() => onGuardar({ nombre: nombre.trim(), apodo: apodo.trim(), foto })}
      >
        {t("Guardar cambios", idioma)}
      </button>
    </div>
  );
}

function ScreenLegal({ tipo = "terminos", onBack, idioma = "es", onOpenMenu }) {
  const menuCtx = React.useContext(MenuContext);
  const handleOpenMenu = onOpenMenu || menuCtx?.onOpenMenu;
  const [activeTab, setActiveTab] = useState(tipo || "terminos");
  const legalData = getLocalizedLegal(idioma);
  const terms = legalData.terms;
  const privacy = legalData.privacy;

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
      {/* TopBar custom / standard */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: `1.5px solid ${LINE}`, marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: SAGE_DARK, padding: 0 }}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: FONT_BODY }}>{legalData.back}</span>
        </button>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16, color: INK }}>{legalData.title}</span>
        {handleOpenMenu ? (
          <HamburgerButton onClick={handleOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
        ) : (
          <div style={{ width: 44 }} />
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <button
          onClick={() => setActiveTab("terminos")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: activeTab === "terminos" ? `1.5px solid ${SAGE_DARK}` : `1px solid ${LINE}`,
            background: activeTab === "terminos" ? SAGE_TINT : "white",
            color: activeTab === "terminos" ? SAGE_DARK : MUTED,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: FONT_BODY
          }}
        >
          {legalData.tabTerms}
        </button>
        <button
          onClick={() => setActiveTab("privacidad")}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 12,
            border: activeTab === "privacidad" ? `1.5px solid ${SAGE_DARK}` : `1px solid ${LINE}`,
            background: activeTab === "privacidad" ? SAGE_TINT : "white",
            color: activeTab === "privacidad" ? SAGE_DARK : MUTED,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontFamily: FONT_BODY
          }}
        >
          {legalData.tabPrivacy}
        </button>
      </div>

      {/* Content Container */}
      <div style={{ flex: 1, overflowY: "auto", background: "white", border: `1.5px solid ${LINE}`, borderRadius: 16, padding: "20px 16px", marginBottom: 20 }}>
        {activeTab === "terminos" ? (
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: SAGE_DARK, margin: "0 0 4px 0" }}>
              {terms.title}
            </h3>
            <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>
              {terms.lastUpdated}
            </p>
            <p>
              {terms.intro}
            </p>
            
            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{terms.sec1Title}</h4>
            <p>
              {terms.sec1Text}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{terms.sec2Title}</h4>
            <p>
              {terms.sec2Text1}
              <span style={{ color: KINOEMOTION, fontWeight: 600 }}> {terms.sec2Warning}</span>
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{terms.sec3Title}</h4>
            <p>
              {terms.sec3Text}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{terms.sec4Title}</h4>
            <p>
              {terms.sec4Text}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{terms.sec5Title}</h4>
            <p>
              {terms.sec5Text}
            </p>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 17, color: SAGE_DARK, margin: "0 0 4px 0" }}>
              {privacy.title}
            </h3>
            <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>
              {privacy.subtitle}
            </p>
            
            <div style={{ background: "#f5fbf8", border: `1px solid ${SAGE}`, borderRadius: 12, padding: 12, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18 }}>🛡️</span>
              <p style={{ fontSize: 12, color: SAGE_DARK, fontWeight: 600, margin: 0 }}>
                {privacy.commitment}
              </p>
            </div>

            <p>
              {privacy.intro}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{privacy.sec1Title}</h4>
            <p>
              {privacy.sec1Intro}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
              <li><strong>{privacy.sec1Item1Title}</strong> {privacy.sec1Item1Text}</li>
              <li><strong>{privacy.sec1Item2Title}</strong> {privacy.sec1Item2Text}</li>
            </ul>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{privacy.sec2Title}</h4>
            <p>
              {privacy.sec2Intro}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
              <li>{privacy.sec2Item1}</li>
              <li>{privacy.sec2Item2}</li>
              <li>{privacy.sec2Item3}</li>
            </ul>
            <p style={{ fontStyle: "italic", fontWeight: 600, color: SAGE_DARK }}>
              {privacy.sec2NoSale}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{privacy.sec3Title}</h4>
            <p>
              {privacy.sec3Intro}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 4 }}>
              <li><strong>{privacy.sec3Item1Title}</strong> {privacy.sec3Item1Text}</li>
              <li><strong>{privacy.sec3Item2Title}</strong> {privacy.sec3Item2Text}</li>
              <li><strong>{privacy.sec3Item3Title}</strong> {privacy.sec3Item3Text}</li>
            </ul>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{privacy.sec4Title}</h4>
            <p>
              {privacy.sec4Text}
            </p>

            <h4 style={{ fontWeight: 700, color: SAGE_DARK, margin: "10px 0 2px 0" }}>{privacy.sec5Title}</h4>
            <p>
              {privacy.sec5Text}
            </p>
          </div>
        )}
      </div>

      {/* Acceptable and close actions */}
      <button
        onClick={onBack}
        className="ss-btn ss-btn-primary"
        style={{ width: "100%", background: SAGE_DARK, color: "white", fontWeight: 700, padding: "12px 0", borderRadius: "99px", border: "none", cursor: "pointer" }}
      >
        {legalData.btnAccept}
      </button>
    </div>
  );
}

const OPCIONES = [
  { id: "historia", icon: "\u270E", label: "Cuéntame tu historia", desc: "Escribe libremente lo que estás viviendo" },
  { id: "fisica", icon: "\u2764", label: "Qué afectación física tienes", desc: "Un síntoma o dolor puntual" },
  { id: "emocion", icon: "\u25CF", label: "Qué emoción sientes", desc: "Una emoción que te acompaña hoy" },
];

// Saludo según la hora del día.
function saludoPorHora(idioma) {
  const h = new Date().getHours();
  if (idioma === "en") {
    if (h < 12) return "Good morning";
    if (h < 19) return "Good afternoon";
    return "Good evening";
  }
  if (idioma === "fr") {
    if (h < 12) return "Bonjour";
    if (h < 19) return "Bon après-midi";
    return "Bonsoir";
  }
  if (idioma === "it") {
    if (h < 12) return "Buongiorno";
    if (h < 19) return "Buon pomeriggio";
    return "Buonasera";
  }
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

// Afirmaciones diarias: cambia una vez cada 24 horas (según el día calendario), sin
// necesitar guardar nada — el mismo día siempre muestra la misma frase.
const AFIRMACIONES = [
  "Hoy elijo escucharme con la misma paciencia que le daría a alguien que amo.",
  "Puedo soltar lo que ya cumplió su ciclo, sin culpa.",
  "Mi cuerpo y mis emociones están de mi lado, aunque a veces duela.",
  "No tengo que sanarlo todo hoy. Un paso también es avanzar.",
  "Merezco el mismo cuidado que doy a los demás.",
  "Cada síntoma es información, no un castigo.",
  "Estoy aprendiendo a poner límites sin sentirme culpable.",
  "Lo que sentí ayer no define lo que puedo sentir hoy.",
  "Soltar no es perder: es hacer espacio para algo nuevo.",
  "Puedo estar en proceso y estar bien al mismo tiempo.",
  "Mi historia no me condena, me explica.",
  "Hoy honro lo que siento sin apurarme a cambiarlo.",
  "Sanar no es lineal, y está bien retroceder algunos días.",
  "Confío en el ritmo de mi propio proceso.",
  "Puedo pedir ayuda sin que eso me haga menos fuerte.",
  "Mi valor no depende de lo productiva que sea hoy.",
  "Cada vez que me escucho, elijo un poco más de paz.",
  "Está bien no tener todas las respuestas todavía.",
  "Soy más que la emoción que siento en este momento.",
  "El pasado ya pasó; hoy tengo una oportunidad nueva.",
  "Puedo cuidar de otros sin dejar de cuidarme a mí.",
  "Mi cuerpo habla, y hoy elijo prestarle atención con amor.",
  "No necesito tener prisa para sanar.",
  "Cada pequeño acto de autocuidado suma.",
  "Puedo perdonarme por lo que no sabía entonces.",
  "Hoy elijo tratarme con la misma ternura que le daría a una amiga.",
  "Mi sensibilidad no es una debilidad, es información valiosa.",
  "Puedo soltar el control y confiar en el proceso.",
  "Lo que hoy pesa, algún día será solo una parte de mi historia.",
  "Respiro, y en ese respiro me doy permiso de estar bien.",
];

function AfirmacionDiaria({ idioma }) {
  const dia = Math.floor(Date.now() / 86400000);
  const afirmacion = AFIRMACIONES[dia % AFIRMACIONES.length];
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f1ecf9, #eaf3ef)",
        borderRadius: 16,
        padding: "14px 16px",
        margin: "10px 0 4px",
        border: `1px solid ${LINE}`,
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, color: LAVENDER, textTransform: "uppercase", letterSpacing: 0.6, margin: "0 0 6px" }}>
        {t("Afirmación de hoy", idioma)}
      </p>
      <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: 14.5, color: INK, margin: 0, lineHeight: 1.5 }}>
        &ldquo;{t(afirmacion, idioma)}&rdquo;
      </p>
    </div>
  );
}

// Resumen visual de progreso: reto (barra) + número de entradas del diario.
function ResumenProgreso({ retoInfo, entradasCount, idioma }) {
  if (!retoInfo && !entradasCount) return null;
  const pct = retoInfo ? Math.min(100, Math.round((retoInfo.completados / 21) * 100)) : 0;
  return (
    <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: 14, margin: "10px 0 4px" }}>
      <p style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px" }}>
        {t("Tu progreso", idioma)}
      </p>
      {retoInfo && (
        <div style={{ marginBottom: entradasCount ? 12 : 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: INK, fontWeight: 600 }}>{t("Reto de 21 días", idioma)}</span>
            <span style={{ fontSize: 12, color: SAGE_DARK, fontWeight: 700 }}>{retoInfo.completados}/21</span>
          </div>
          <div style={{ height: 7, borderRadius: 999, background: LINE, overflow: "hidden" }}>
            <div className="ss-bar-fill" style={{ height: "100%", width: `${pct}%`, background: SAGE_DARK, borderRadius: 999, transition: "width 0.5s ease", transformOrigin: "left" }} />
          </div>
        </div>
      )}
      {entradasCount > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15 }}>&#9997;</span>
          <span style={{ fontSize: 12.5, color: INK }}>
            <strong>{entradasCount}</strong> {entradasCount === 1 ? t("entrada registrada", idioma) : t("entradas registradas", idioma)}
          </span>
        </div>
      )}
    </div>
  );
}

function ScreenInicio({ seleccion, toggleSel, onNext, nombre, apodo, onBorrarPrueba, retoInfo, onIrReto, entradasCount, onConfigurarCuenta, onSuscripcion, onDiario, onBorrarDatos, onCerrarSesion, onStartTutorial, onAbrirGuia = null, onOpenMenu, tutorialStep, idioma, esPremium = false, planPago = "prueba", enPruebaActiva = false, diaPruebaActual = 1, diasRestantesPrueba = 0, pruebaExpirada = false, tieneAccesoTotal = false, onVerPlanes, onAbrirModalPrueba }) {
  const nombreMostrado = (apodo || nombre || "").trim();
  const inicial = (nombreMostrado.charAt(0) || "S").toUpperCase();
  const esTutorial = tutorialStep === 2 || tutorialStep === 3;
  const esUsuarioSubscrito = (tieneAccesoTotal || planPago === "anual" || planPago === "mensual") && planPago !== "prueba" && !enPruebaActiva;

  const PASOS_SECUENCIA = [
    {
      num: 1,
      titulo: "Cuéntame tu historia",
      desc: "Escribe o dicta libremente lo que estás viviendo",
      color: SAGE_DARK,
      bg: SAGE_TINT
    },
    {
      num: 2,
      titulo: "Qué afectación física tienes",
      desc: "Ubica tu síntoma o tensión en el mapa corporal interactivo",
      color: "#8a6bb8",
      bg: LAVENDER_TINT
    },
    {
      num: 3,
      titulo: "Qué emoción sientes",
      desc: "Reconoce y elige las emociones que te acompañan hoy",
      color: "#dfa15f",
      bg: "rgba(223, 161, 95, 0.14)"
    }
  ];

  return (
    <div className="ss-fade ss-dash-enter" style={{ padding: "0 20px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* Barra superior amigable con botón de menú lateral a la izquierda */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 10px", position: "relative", zIndex: 50 }}>
        <HamburgerButton onClick={onOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />

        <div className="ss-logo-respira" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LogoSuelta size={118} />
        </div>

        <button
          onClick={onConfigurarCuenta}
          id="btn-inicio-perfil"
          aria-label={t("Mi perfil", idioma) || "Mi perfil"}
          title={t("Mi perfil", idioma) || "Mi perfil"}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "rgba(111, 168, 146, 0.15)",
            border: "1.5px solid rgba(111, 168, 146, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: SAGE_DARK,
            fontWeight: 700,
            fontSize: 15,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            padding: 0
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
          {inicial}
        </button>
      </div>

      <div className="ss-dash-stagger" style={{ flex: 1, marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0 12px" }}>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 22, color: INK, margin: 0, letterSpacing: "-0.3px" }}>
            {saludoPorHora(idioma)}, {nombreMostrado || t("bienvenida", idioma)}
          </h2>
        </div>

        {/* 1. Usuario con Suscripción Activa o Acceso Total */}
        {esUsuarioSubscrito ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(5, 150, 105, 0.08) 100%)",
            border: "1.2px solid rgba(16, 185, 129, 0.35)",
            borderRadius: 14,
            padding: "10px 14px",
            margin: "4px 0 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>👑</span>
              <div>
                <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "#065f46" }}>
                  ✨ {planPago === "anual" || tieneAccesoTotal ? t("Suscripción Activa · Plan Anual", idioma) : t("Suscripción Activa · Plan Mensual", idioma)}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: "#047857" }}>
                  {t("Acceso ilimitado a todas tus herramientas de bienestar", idioma)}
                </p>
              </div>
            </div>
            {onSuscripcion && (
              <button
                onClick={onSuscripcion}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#065f46",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "4px 8px"
                }}
              >
                {t("Mi suscripción", idioma)} →
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 2. Usuario en período de prueba gratuito (3 días) */}
            {enPruebaActiva && (
              <div style={{
                background: "linear-gradient(135deg, rgba(111, 168, 146, 0.16) 0%, rgba(63, 107, 91, 0.08) 100%)",
                border: "1px solid rgba(111, 168, 146, 0.3)",
                borderRadius: 14,
                padding: "11px 14px",
                margin: "4px 0 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
              }}
              onClick={() => {
                if (onAbrirModalPrueba) onAbrirModalPrueba();
                else if (onVerPlanes) onVerPlanes();
              }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{diaPruebaActual === 3 ? "⏳" : diaPruebaActual === 2 ? "🌿" : "🌱"}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: diaPruebaActual === 3 ? "#b45309" : diaPruebaActual === 2 ? "#166534" : SAGE_DARK }}>
                      {diaPruebaActual === 3
                        ? t("Día 3 de 3 · ¡Último día de prueba!", idioma)
                        : diaPruebaActual === 2
                        ? `${t("Día 2 de 3 · Prueba activa", idioma)} (${diasRestantesPrueba} ${diasRestantesPrueba === 1 ? t("día restante", idioma) : t("días restantes", idioma)})`
                        : `${t("Día 1 de 3 · Prueba activa", idioma)} (${diasRestantesPrueba} ${diasRestantesPrueba === 1 ? t("día restante", idioma) : t("días restantes", idioma)})`}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: MUTED }}>
                      {t("Pasa a adquirir tu suscripción para mantener todo tu avance", idioma)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAbrirModalPrueba) onAbrirModalPrueba();
                    else if (onVerPlanes) onVerPlanes();
                  }}
                  style={{
                    background: diaPruebaActual === 3 ? "#d97706" : diaPruebaActual === 2 ? "#15803d" : "#7c3aed",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 999,
                    padding: "6px 12px",
                    fontSize: 11.5,
                    fontWeight: 800,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
                  }}
                >
                  {t("Ver aviso", idioma)} &rarr;
                </button>
              </div>
            )}

            {/* 3. Usuario con período de prueba concluido */}
            {pruebaExpirada && (
              <div 
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(220, 38, 38, 0.06) 100%)",
                  border: "1px solid rgba(239, 68, 68, 0.28)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  margin: "4px 0 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  cursor: "pointer"
                }}
                onClick={() => {
                  if (onAbrirModalPrueba) onAbrirModalPrueba();
                  else if (onVerPlanes) onVerPlanes();
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>🔒</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "#991b1b" }}>
                      {t("Has cumplido tus 3 días de prueba", idioma)}
                    </p>
                    <p style={{ margin: 0, fontSize: 11, color: "#7f1d1d" }}>
                      {t("Adquiere tu suscripción para continuar accediendo a todos los módulos", idioma)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAbrirModalPrueba) onAbrirModalPrueba();
                    else if (onVerPlanes) onVerPlanes();
                  }}
                  style={{
                    background: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 10,
                    padding: "7px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(220,38,38,0.25)"
                  }}
                >
                  {t("Suscribirme", idioma)} &rarr;
                </button>
              </div>
            )}
          </>
        )}

        {/* Tarjeta interactiva de Guía Paso a Paso y Checklist */}
        <TarjetaChecklistInicio
          onAbrirGuia={onAbrirGuia}
          esPremium={esPremium}
          tieneAccesoTotal={tieneAccesoTotal}
          planPago={planPago}
          enPruebaActiva={enPruebaActiva}
          idioma={idioma}
        />

        <AfirmacionDiaria idioma={idioma} />
        <ResumenProgreso retoInfo={retoInfo} entradasCount={entradasCount || 0} idioma={idioma} />

        {retoInfo && retoInfo.completados > 0 && (
          <button
            onClick={onIrReto}
            className="ss-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              textAlign: "left",
              background: LAVENDER_TINT,
              border: "none",
              borderRadius: 14,
              padding: "12px 14px",
              margin: "10px 0 4px",
              cursor: "pointer",
              fontFamily: FONT_BODY,
            }}
          >
            <span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: LAVENDER, display: "block" }}>
                {t("Tu reto sigue: día", idioma)} {retoInfo.dia} {t("de", idioma)} 21 &middot; &#128293; {retoInfo.racha}
              </span>
              <span style={{ fontSize: 11.5, color: "#5b4a78" }}>{t("Retoma donde quedaste", idioma)}</span>
            </span>
            <span style={{ color: LAVENDER, fontSize: 18 }}>&#8594;</span>
          </button>
        )}

        <p style={{ color: MUTED, fontSize: 13.5, margin: "10px 0 14px", lineHeight: 1.55 }}>
          {t("Este es un espacio para escucharte sin prisa. A través de este recorrido guiado conectaremos tu historia, tu cuerpo y tus emociones paso a paso:", idioma)}
        </p>

        {/* Tarjeta interactiva de la secuencia de 3 pasos */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            border: `1.5px solid ${LINE}`,
            padding: "16px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            marginBottom: 16
          }}
        >
          {PASOS_SECUENCIA.map((paso, idx) => (
            <div
              key={paso.num}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                position: "relative"
              }}
            >
              {idx < PASOS_SECUENCIA.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 17,
                    top: 34,
                    bottom: -14,
                    width: 2,
                    background: `linear-gradient(to bottom, ${paso.color}40, ${PASOS_SECUENCIA[idx + 1].color}40)`
                  }}
                />
              )}
              <span
                style={{
                  width: 34,
                  height: 34,
                  minWidth: 34,
                  borderRadius: "50%",
                  background: paso.bg,
                  color: paso.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13.5,
                  fontWeight: 700,
                  zIndex: 2,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                }}
              >
                {paso.num}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: INK }}>
                  {t(paso.titulo, idioma)}
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2, lineHeight: 1.4 }}>
                  {t(paso.desc, idioma)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* La sección de herramientas/respira en el footer */}
      <p style={{ fontSize: 11.5, color: MUTED, textAlign: "center", margin: "6px 0 14px", lineHeight: 1.4 }}>
        &middot; {t("Si prefieres solo respirar o escribir, toca", idioma)} <strong>{t("Calma", idioma)}</strong> {t("abajo", idioma)} &middot;
      </p>

      <div style={{ position: "relative" }}>
        {esTutorial && (
          <div style={{
            position: "absolute",
            top: -46,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "ss-bounce-down 1s infinite ease-in-out",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 9999
          }}>
            <span style={{ fontSize: 24 }}>👇</span>
            <span style={{
              background: "#dfa15f",
              color: "white",
              fontSize: 8.5,
              padding: "2px 8px",
              borderRadius: 99,
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>{t("¡Toca aquí para comenzar!", idioma)}</span>
          </div>
        )}
        <button
          className="ss-btn ss-btn-primary"
          style={{ 
            width: "100%", 
            boxShadow: esTutorial ? "0 0 0 4px #dfa15f, 0 10px 25px rgba(223,161,95,0.4)" : "0 6px 18px rgba(63,107,91,0.2)",
            transform: esTutorial ? "scale(1.02)" : undefined,
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 15,
            padding: "14px 20px"
          }}
          onClick={onNext}
        >
          <span>{t("Comenzar mi lectura", idioma)}</span>
          <span style={{ fontSize: 16 }}>➔</span>
        </button>
      </div>
    </div>
  );
}

// Emociones agrupadas en 3 secciones temáticas. Cada una tiene respaldo en el diccionario
// de sintonización (son sinónimos de las entradas ya existentes), para que cualquier
// combinación que elija la persona pueda encontrar una lectura.
const EMOCIONES_SECCIONES = [
  {
    titulo: "Alegría y entusiasmo",
    emociones: ["Alegría", "Entusiasmo", "Gratitud", "Paz interior", "Esperanza", "Ilusión", "Serenidad", "Motivación", "Confianza"],
  },
  {
    titulo: "Miedo y alerta",
    emociones: ["Miedo", "Pánico", "Ansiedad", "Angustia", "Inseguridad", "Preocupación"],
  },
  {
    titulo: "Tristeza y pérdida",
    emociones: ["Tristeza", "Duelo", "Soledad", "Abandono", "Melancolía", "Desánimo"],
  },
  {
    titulo: "Rabia y conflicto interno",
    emociones: ["Rabia", "Enojo", "Culpa", "Vergüenza", "Impotencia", "Frustración", "Celos"],
  },
];
// Lista plana, por si algo más en la app necesita el conjunto completo.
const EMOCIONES = EMOCIONES_SECCIONES.flatMap((s) => s.emociones);

// Tono ambiental de 438Hz (frecuencia tibetana), generado con Web Audio API — no requiere
// ningún archivo de audio externo, es una onda seno pura sintetizada en el navegador.
// Los navegadores bloquean el audio automático sin gesto del usuario, así que se inicia en
// la primera interacción (toque o clic) en cualquier parte de la app.
// Sonido ambiental de la bienvenida: cuenco tibetano real (archivo de audio provisto por
// la marca), en loop, controlado por un elemento <audio> nativo — más liviano y de mejor
// calidad que sintetizar un tono. Se inicia con la primera interacción del usuario en
// cualquier parte de la app (los navegadores bloquean el audio automático sin gesto).
const RUTA_AUDIO_AMBIENTAL = "/audio/sonido-ambiental.mp3";

function useSonidoAmbiental() {
  const audioRef = useRef(null);
  const [silenciado, setSilenciado] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [volumen, setVolumenState] = useState(0.11); // 11% por defecto
  const volumenPrevioRef = useRef(0.11); // recuerda el nivel antes de silenciar, para restaurarlo

  const iniciar = () => {
    if (audioRef.current) return;
    try {
      const audio = new Audio(RUTA_AUDIO_AMBIENTAL);
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;
      audio
        .play()
        .then(() => {
          // fundido de entrada suave, para que no "salte" al oído
          const objetivo = silenciado ? 0 : volumen;
          const pasos = 20;
          let i = 0;
          const intervalo = setInterval(() => {
            i++;
            audio.volume = Math.min(objetivo, (objetivo * i) / pasos);
            if (i >= pasos) clearInterval(intervalo);
          }, 60);
          setIniciado(true);
        })
        .catch(() => {
          // Si el navegador bloquea la reproducción (aún sin gesto válido), no rompe la app.
        });
    } catch (e) {
      // Si el navegador no soporta audio, simplemente no hay sonido — no rompe la app.
    }
  };

  // Manejador de volumen: mueve el nivel en tiempo real (0 a 1). Si lo bajas a 0 con el
  // control, se considera silenciado; si lo subes desde 0, se des-silencia automáticamente.
  const cambiarVolumen = (nuevoVolumen) => {
    const v = Math.max(0, Math.min(1, nuevoVolumen));
    setVolumenState(v);
    volumenPrevioRef.current = v > 0 ? v : volumenPrevioRef.current;
    setSilenciado(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  const alternarSilencio = () => {
    setSilenciado((actual) => {
      const nuevo = !actual;
      const objetivo = nuevo ? 0 : volumenPrevioRef.current || 0.11;
      if (!nuevo) setVolumenState(objetivo);
      if (audioRef.current) {
        audioRef.current.volume = objetivo;
      }
      return nuevo;
    });
  };

  useEffect(() => {
    return () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = "";
        }
      } catch (e) {}
    };
  }, []);

  return { iniciar, alternarSilencio, silenciado, iniciado, volumen, cambiarVolumen };
}

// ===== MOTOR DE RECONOCIMIENTO DE VOZ Y DEDUPLICACIÓN INTELIGENTE =====

function limpiarDuplicadosConsecutivos(texto) {
  if (!texto || typeof texto !== "string") return "";
  
  let limpio = texto.replace(/\s+/g, " ").trim();
  if (!limpio) return "";

  // 1. Eliminar palabras consecutivas idénticas (ej: "Hola Hola" -> "Hola")
  const palabras = limpio.split(" ");
  const sinPalabrasRepetidas = [];
  for (let i = 0; i < palabras.length; i++) {
    const actual = palabras[i];
    const anterior = sinPalabrasRepetidas[sinPalabrasRepetidas.length - 1];
    const cleanActual = actual.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '');
    const cleanAnterior = anterior ? anterior.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '') : "";
    
    if (cleanActual && cleanActual === cleanAnterior) {
      continue;
    }
    sinPalabrasRepetidas.push(actual);
  }
  limpio = sinPalabrasRepetidas.join(" ");

  // 2. Eliminar frases o n-gramas consecutivos duplicados (ej: "se me escucha bien se me escucha bien")
  for (let n = 2; n <= 10; n++) {
    const words = limpio.split(" ");
    if (words.length < n * 2) continue;

    const res = [];
    let i = 0;
    while (i < words.length) {
      if (i + 2 * n <= words.length) {
        const chunk1 = words.slice(i, i + n).map(w => w.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '')).join(" ");
        const chunk2 = words.slice(i + n, i + 2 * n).map(w => w.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '')).join(" ");
        if (chunk1 && chunk1 === chunk2) {
          for (let k = 0; k < n; k++) {
            res.push(words[i + k]);
          }
          i += 2 * n;
          continue;
        }
      }
      res.push(words[i]);
      i++;
    }
    limpio = res.join(" ");
  }

  return limpio;
}

function fusionarTranscripcionSinDuplicados(previo, nuevo) {
  const p = (previo || "").trim();
  const n = (nuevo || "").trim();
  if (!p) return limpiarDuplicadosConsecutivos(n);
  if (!n) return limpiarDuplicadosConsecutivos(p);

  const pNorm = p.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '');
  const nNorm = n.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '');

  // Si el nuevo texto ya contiene todo el previo desde el inicio, usar el nuevo
  if (nNorm.startsWith(pNorm)) {
    return limpiarDuplicadosConsecutivos(n);
  }
  // Si el texto previo termina con el nuevo texto idéntico, mantener el previo
  if (pNorm.endsWith(nNorm)) {
    return limpiarDuplicadosConsecutivos(p);
  }

  const pWords = p.split(" ");
  const nWords = n.split(" ");

  let solape = 0;
  const maxSolape = Math.min(pWords.length, nWords.length, 12);
  for (let k = maxSolape; k >= 1; k--) {
    const sufijo = pWords.slice(pWords.length - k).map(w => w.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '')).join(" ");
    const prefijo = nWords.slice(0, k).map(w => w.toLowerCase().replace(/^[.,!?;:"'¿¡()]+|[.,!?;:"'¿¡()]+$/g, '')).join(" ");
    if (sufijo && sufijo === prefijo) {
      solape = k;
      break;
    }
  }

  if (solape > 0) {
    const fusionado = [...pWords, ...nWords.slice(solape)].join(" ");
    return limpiarDuplicadosConsecutivos(fusionado);
  }

  return limpiarDuplicadosConsecutivos(`${p} ${n}`);
}

function useDictado(onResult) {
  const [escuchando, setEscuchando] = useState(false);
  const [soportado, setSoportado] = useState(true);
  const [error, setError] = useState(null);
  const recRef = useRef(null);
  const baseTextRef = useRef("");
  const committedTextRef = useRef("");
  const activeSessionFinalRef = useRef("");
  const userWantsRecordingRef = useRef(false);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) setSoportado(false);
    return () => {
      userWantsRecordingRef.current = false;
      if (recRef.current) {
        try { recRef.current.abort(); } catch (e) {}
        recRef.current = null;
      }
    };
  }, []);

  const detener = () => {
    userWantsRecordingRef.current = false;
    setEscuchando(false);
    if (recRef.current) {
      try { recRef.current.stop(); } catch (e) {}
      recRef.current = null;
    }
  };

  const toggle = (textoActual) => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return;

    if (escuchando || userWantsRecordingRef.current) {
      detener();
      return;
    }

    if (recRef.current) {
      try { recRef.current.abort(); } catch (e) {}
      recRef.current = null;
    }

    setError(null);
    userWantsRecordingRef.current = true;
    committedTextRef.current = "";
    activeSessionFinalRef.current = "";
    baseTextRef.current = textoActual ? textoActual.trim() : "";

    const iniciarSesionReconocimiento = () => {
      if (!userWantsRecordingRef.current) return;

      let rec;
      try {
        rec = new SR();
      } catch (e) {
        setError("no_init");
        userWantsRecordingRef.current = false;
        setEscuchando(false);
        return;
      }

      rec.lang = "es-ES";
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onresult = (event) => {
        let currentSessionFinal = "";
        let currentSessionInterim = "";

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          const transcript = (res[0]?.transcript || "").trim();
          if (!transcript) continue;
          if (res.isFinal) {
            currentSessionFinal = fusionarTranscripcionSinDuplicados(currentSessionFinal, transcript);
          } else {
            currentSessionInterim = transcript;
          }
        }

        activeSessionFinalRef.current = currentSessionFinal;

        const spokenNow = fusionarTranscripcionSinDuplicados(
          committedTextRef.current,
          fusionarTranscripcionSinDuplicados(currentSessionFinal, currentSessionInterim)
        );

        if (!spokenNow) return;

        let textoCompleto = baseTextRef.current
          ? fusionarTranscripcionSinDuplicados(baseTextRef.current, spokenNow)
          : spokenNow;

        textoCompleto = limpiarDuplicadosConsecutivos(textoCompleto);

        if (textoCompleto.length > 0) {
          const capitalizado = textoCompleto.charAt(0).toUpperCase() + textoCompleto.slice(1);
          onResultRef.current?.(capitalizado);
        }
      };

      rec.onerror = (e) => {
        console.warn("Speech recognition warning:", e);
        if (e && (e.error === "not-allowed" || e.error === "service-not-allowed")) {
          userWantsRecordingRef.current = false;
          setError("permiso");
          dispararGuiaPermisos("microfono");
          setEscuchando(false);
        } else if (e && e.error === "audio-capture") {
          userWantsRecordingRef.current = false;
          setError("sin_microfono");
          setEscuchando(false);
        }
      };

      rec.onend = () => {
        if (activeSessionFinalRef.current) {
          committedTextRef.current = fusionarTranscripcionSinDuplicados(
            committedTextRef.current,
            activeSessionFinalRef.current
          );
          activeSessionFinalRef.current = "";
        }

        if (userWantsRecordingRef.current) {
          setTimeout(() => {
            if (userWantsRecordingRef.current) {
              iniciarSesionReconocimiento();
            }
          }, 120);
        } else {
          setEscuchando(false);
          recRef.current = null;
        }
      };

      recRef.current = rec;
      try {
        rec.start();
        setEscuchando(true);
      } catch (e) {
        console.warn("Aviso iniciando dictado:", e);
        if (userWantsRecordingRef.current) {
          setTimeout(() => {
            if (userWantsRecordingRef.current) iniciarSesionReconocimiento();
          }, 300);
        }
      }
    };

    iniciarSesionReconocimiento();
  };

  return { escuchando, soportado, error, toggle, detener };
}

function MicButton({ escuchando, soportado, onClick, label = "" }) {
  if (!soportado) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={escuchando ? "Detener grabación de voz" : "Dictar por voz"}
      title={escuchando ? "Detener grabación" : "Dictar por voz"}
      style={{
        position: "absolute",
        right: 12,
        bottom: 12,
        height: 38,
        minWidth: escuchando ? 100 : 38,
        padding: escuchando ? "0 12px 0 10px" : "0",
        borderRadius: 999,
        border: `1.5px solid ${escuchando ? "#dc2626" : LINE}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: escuchando ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" : "white",
        color: escuchando ? "white" : MUTED,
        transition: "all 0.25s cubic-bezier(0.34, 1.45, 0.64, 1)",
        boxShadow: escuchando ? "0 4px 14px rgba(220, 38, 38, 0.45)" : "0 2px 6px rgba(0,0,0,0.04)",
        zIndex: 10
      }}
    >
      {escuchando ? (
        <>
          <span style={{
            width: 10,
            height: 10,
            borderRadius: 2,
            background: "white",
            display: "inline-block"
          }} />
          <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase" }}>
            {label || "Detener"}
          </span>
        </>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="22"></line>
        </svg>
      )}
    </button>
  );
}

function VoiceRecordingBanner({ activo, onDetener, idioma = "es" }) {
  if (!activo) return null;
  return (
    <div
      className="ss-pop"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
        border: "1.5px solid #fca5a5",
        borderRadius: 14,
        padding: "9px 14px",
        margin: "8px 0 12px",
        boxShadow: "0 4px 14px rgba(220, 38, 38, 0.12)",
        gap: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.2)"
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            display: "inline-block",
            animation: "ss-pulse-dot 1.2s infinite ease-in-out"
          }} />
        </div>
        <div>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#991b1b", margin: 0, lineHeight: 1.2 }}>
            {t("Grabando tu voz en tiempo real", idioma)}
          </p>
          <p style={{ fontSize: 11, color: "#b91c1c", margin: "2px 0 0", opacity: 0.9 }}>
            {t("Habla a tu ritmo. Toca detener cuando termines.", idioma)}
          </p>
        </div>
      </div>
      {onDetener && (
        <button
          type="button"
          onClick={onDetener}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "6px 12px",
            fontSize: 11.5,
            fontWeight: 800,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 2px 6px rgba(220,38,38,0.25)"
          }}
        >
          <span style={{ width: 8, height: 8, background: "white", borderRadius: 2 }} />
          {t("Detener", idioma)}
        </button>
      )}
    </div>
  );
}

// Zonas del cuerpo seleccionables. Cada una tiene respaldo real en el diccionario de
// lectura de bienestar (mismo criterio de calidad usado con las emociones): tocar una zona no es
// solo decorativo, prellenar el texto con algo que el motor puede reconocer.

// Lista de zonas del cuerpo, mostradas como chips debajo de la imagen — sin depender de
// coordenadas sobre la foto, evitando el problema de calibrar puntos sobre una ilustración
// artística compleja. Cada grupo tiene respaldo real en el diccionario de sintonización.
const PUNTOS_CUERPO = [
  {
    grupo: "cabeza",
    label: "Cabeza",
    texto: "dolor de cabeza",
    x: 50,
    y: 11,
    significado: "Resistencia mental, control, sobrepensamiento o cansancio intelectual.",
    pregunta: "¿Qué situación estás intentando analizar o controlar con demasiada fuerza?",
    subSintomas: [
      "Migraña / cefalea tensional",
      "Vértigo, mareo",
      "Insomnio y falta de descanso",
      "Ansiedad, estrés y confusión",
      "Pérdida de memoria",
      "Sinusitis, congestión nasal",
      "Problemas de visión y dolor ocular",
      "Problemas auditivos o tinnitus",
      "Caída de cabello o tensión capilar",
      "Tumores o afecciones cerebrales"
    ]
  },
  {
    grupo: "garganta",
    label: "Garganta",
    texto: "dolor de garganta",
    x: 50,
    y: 19,
    significado: "Palabras silenciadas, expresión contenida, dificultad para comunicar tu verdad.",
    pregunta: "¿Qué emoción o verdad no te estás permitiendo decir en voz alta?",
    subSintomas: [
      "Afonía o pérdida de voz",
      "Sensación de nudo o ahogo",
      "Amigdalitis o faringitis",
      "Dolor al tragar o resequedad",
      "Problemas de tiroides",
      "Tos nerviosa o carraspera"
    ]
  },
  {
    grupo: "corazon",
    label: "Corazón",
    texto: "palpitaciones en el corazón",
    x: 35,
    y: 28,
    significado: "Cierre emocional, miedo a ser herido, duelos afectivos o tristezas guardadas.",
    pregunta: "¿De qué dolor del pasado estás intentando proteger tu sensibilidad?",
    subSintomas: [
      "Taquicardia o arritmias",
      "Hipertensión arterial",
      "Infarto o dolor coronario",
      "Palpitaciones por angustia",
      "Insuficiencia cardíaca"
    ]
  },
  {
    grupo: "pecho",
    label: "Pecho",
    texto: "opresión en el pecho",
    x: 65,
    y: 28,
    significado: "Carga de angustia, opresión existencial, falta de espacio vital para ser.",
    pregunta: "¿Qué pena o angustia está pesando sobre tu pecho limitando tu respiración?",
    subSintomas: [
      "Opresión torácica por ansiedad",
      "Dolor muscular intercostal",
      "Sensación de ahogo o falta de aire",
      "Asma o bronquitis crónica",
      "Tos seca persistente"
    ]
  },
  {
    grupo: "espalda",
    label: "Espalda",
    texto: "dolor de espalda",
    x: 30,
    y: 38,
    significado: "Mochilas del pasado, exceso de responsabilidades, falta de apoyo emocional.",
    pregunta: "¿Qué cargas ajenas o culpas estás llevando sobre tus hombros?",
    subSintomas: [
      "Lumbalgia o dolor lumbar",
      "Contracturas en hombros y cuello",
      "Ciática o pinzamiento",
      "Dolor dorsal entre omóplatos",
      "Escoliosis o rigidez matutina"
    ]
  },
  {
    grupo: "estomago",
    label: "Estómago",
    texto: "dolor de estómago",
    x: 50,
    y: 37,
    significado: "Realidades difíciles de asimilar, rabia o impotencia 'indigesta'.",
    pregunta: "¿Qué situación o cambio reciente te está costando tanto 'digerir'?",
    subSintomas: [
      "Gastritis nerviosa o acidez",
      "Úlceras o ardor gástrico",
      "Espasmos o retortijones",
      "Náuseas o mareo digestivo",
      "Digestión lenta o pesadez"
    ]
  },
  {
    grupo: "vientre",
    label: "Vientre",
    texto: "molestia en el vientre",
    x: 50,
    y: 47,
    significado: "Control profundo de las emociones viscerales, miedos creativos o sexuales.",
    pregunta: "¿Qué miedos profundos o impulsos creativos estás intentando contener?",
    subSintomas: [
      "Colon irritable o colitis",
      "Estreñimiento o diarrea crónica",
      "Afecciones uterinas u ováricas",
      "Endometriosis o dolor menstrual",
      "Infecciones urinarias o cálculos",
      "Hinchazón abdominal o gases",
      "Problemas de fertilidad"
    ]
  },
  {
    grupo: "piernas",
    label: "Piernas",
    texto: "molestia en la pierna",
    x: 50,
    y: 68,
    significado: "Incertidumbre ante los pasos futuros, miedo a avanzar, falta de estabilidad.",
    pregunta: "¿Hacia qué dirección de tu vida tienes miedo o dudas de avanzar?",
    subSintomas: [
      "Várices o mala circulación",
      "Dolor articular en rodillas/tobillos",
      "Artritis o artrosis",
      "Calambres o debilidad muscular",
      "Trombosis venosa",
      "Edema o retención de líquidos",
      "Sensación de no poder avanzar"
    ]
  }
];

// Diccionario de biodescodificación y raíz emocional profunda de cada afección.
// Proporciona el sentido biológico y la pregunta de indagación para la sabiduría somática.
const SUB_SINTOMAS_INFO = {
  // Cabeza
  "Migraña / cefalea tensional": {
    conflicto: "Exceso de control mental, perfeccionismo extremo y desvalorización intelectual. Intentar resolver todo racionalmente.",
    pregunta: "¿Qué estás intentando controlar obsesivamente con tus pensamientos?"
  },
  "Vértigo, mareo": {
    conflicto: "Miedo al futuro, desorientación existencial y sensación de perder el suelo o la estabilidad.",
    pregunta: "¿Qué situación futura te hace sentir desorientado o sin control?"
  },
  "Insomnio y falta de descanso": {
    conflicto: "Miedo inconsciente a perder el control en la oscuridad o indefensión. Hipervigilancia mental activa.",
    pregunta: "¿De qué peligro imaginado te estás intentando proteger manteniéndote alerta?"
  },
  "Ansiedad, estrés y confusión": {
    conflicto: "Vivir aceleradamente en el futuro, desconexión del presente y miedo a no poder afrontar las demandas.",
    pregunta: "¿Qué expectativas irracionales estás tratando de cumplir hoy?"
  },
  "Pérdida de memoria": {
    conflicto: "Mecanismo de defensa para olvidar eventos dolorosos, situaciones traumáticas o resentimientos guardados.",
    pregunta: "¿Qué recuerdo o verdad del pasado resulta demasiado dolorosa de sostener?"
  },
  "Sinusitis, congestión nasal": {
    conflicto: "Conflicto territorial de 'oler el peligro' o desconfianza de alguien cercano. Atmósfera familiar asfixiante.",
    pregunta: "¿Qué situación o persona en tu entorno cercano 'te huele mal' o te irrita?"
  },
  "Problemas de visión y dolor ocular": {
    conflicto: "Rechazo o miedo a ver una realidad dolorosa, ya sea en el entorno o en uno mismo. Ojos que no quieren mirar.",
    pregunta: "¿Qué verdad de tu vida actual estás eligiendo no ver de frente?"
  },
  "Problemas auditivos o tinnitus": {
    conflicto: "Negativa inconsciente a escuchar palabras hirientes, críticas o ruidos molestos. Anhelo de silencio interior.",
    pregunta: "¿Qué crítica o situación dolorosa que escuchaste estás intentando silenciar?"
  },
  "Caída de cabello o tensión capilar": {
    conflicto: "Pérdida de protección o de identidad, miedo a la desvalorización y estrés extremo por separación afectiva.",
    pregunta: "¿De qué o de quién te has sentido separado o desprotegido recientemente?"
  },
  "Tumores o afecciones cerebrales": {
    conflicto: "Conflicto severo de desvalorización intelectual recurrente y sobreesfuerzo mental extremo.",
    pregunta: "¿En qué área de tu vida siente que tu capacidad mental ha sido gravemente cuestionada?"
  },

  // Garganta
  "Afonía o pérdida de voz": {
    conflicto: "Silenciar palabras y emociones por miedo a las consecuencias. Tragar verdades o gritos retenidos.",
    pregunta: "¿Qué verdades o reclamos te has obligado a silenciar por miedo a la confrontación?"
  },
  "Sensación de nudo o ahogo": {
    conflicto: "Emoción intensa que no se puede tragar ni expresar. Conflicto de asimilación de un hecho doloroso.",
    pregunta: "¿Qué palabra, noticia o situación te ha resultado imposible de digerir o comunicar?"
  },
  "Amigdalitis o faringitis": {
    conflicto: "Rabia reprimida por no poder expresar lo que se quiere o por tener que tragar una situación impuesta.",
    pregunta: "¿Qué 'bocado' o situación desagradable te has visto obligado a tragar con enojo?"
  },
  "Dolor al tragar o resequedad": {
    conflicto: "Dificultad para aceptar o asimilar un cambio repentino. Resistencia a nutrirse emocionalmente.",
    pregunta: "¿Qué nueva realidad te cuesta aceptar o integrar en tu día a día?"
  },
  "Problemas de tiroides": {
    conflicto: "Conflicto con el tiempo: impaciencia extrema (hipertiroidismo) o resignación y lentitud (hipotiroidismo).",
    pregunta: "¿Sientes que el tiempo corre demasiado rápido o que estás atrapado sin poder actuar?"
  },
  "Tos nerviosa o carraspera": {
    conflicto: "Deseo de ser escuchado, de llamar la atención o de expulsar una molestia que se siente en el entorno.",
    pregunta: "¿A quién o qué situación estás intentando decirle inconscientemente: 'aquí estoy'?"
  },

  // Corazón
  "Taquicardia o arritmias": {
    conflicto: "Ritmo de vida acelerado por el miedo, necesidad de huir o de defenderse de una amenaza emocional.",
    pregunta: "¿De qué peligro emocional o afectivo sientes la urgencia constante de huir?"
  },
  "Hipertensión arterial": {
    conflicto: "Tensión acumulada, rigidez y control emocional. Cerrar las puertas del corazón por miedo a ser herido.",
    pregunta: "¿Qué dolor del pasado te ha llevado a endurecer tu postura y tus límites?"
  },
  "Infarto o dolor coronario": {
    conflicto: "Conflicto de territorio: sentir que te arrebatan tu espacio afectivo, tu hogar o tu autoridad familiar.",
    pregunta: "¿Qué pérdida de control en tu 'territorio' afectivo ha quebrado tu paz?"
  },
  "Palpitaciones por angustia": {
    conflicto: "Incertidumbre afectiva extrema, miedo al abandono o falta de fe en el flujo de la vida.",
    pregunta: "¿A qué pérdida afectiva o cambio relacional le tienes el mayor temor?"
  },
  "Insuficiencia cardíaca": {
    conflicto: "Agotamiento emocional. Sentir que ya no tienes la fuerza suficiente para sostener tus vínculos.",
    pregunta: "¿De qué cargas sentimentales o familiares te sientes exhausto de cargar solo?"
  },

  // Pecho
  "Opresión torácica por ansiedad": {
    conflicto: "Falta de espacio vital, asfixia emocional por exceso de demandas externas o autolimitación.",
    pregunta: "¿Quién o qué situación sientes que está invadiendo tu espacio o restringiendo tu libertad?"
  },
  "Dolor muscular intercostal": {
    conflicto: "Miedo a la confrontación directa o sentimientos de vulnerabilidad y desprotección física.",
    pregunta: "¿Frente a qué situación te estás sintiendo desprotegido o a la defensiva?"
  },
  "Sensación de ahogo o falta de aire": {
    conflicto: "Pena profunda guardada, tristeza no llorada y limitación del derecho a existir libremente.",
    pregunta: "¿Qué dolor profundo o luto emocional te está impidiendo tomar aire y vivir plenamente?"
  },
  "Asma o bronquitis crónica": {
    conflicto: "Conflictos de disputas territoriales en el hogar, discusiones familiares y miedo a la asfixia emocional.",
    pregunta: "¿Qué disputas u hostilidades en tu casa te hacen sentir que no tienes aire para respirar?"
  },
  "Tos seca persistente": {
    conflicto: "Necesidad inconsciente de ladrar o defender el territorio contra una intrusión indeseada.",
    pregunta: "¿Qué intrusión o límite vulnerado en tu espacio te está provocando esta irritación?"
  },

  // Espalda
  "Lumbalgia o dolor lumbar": {
    conflicto: "Miedo a la carencia material o financiera. Falta de apoyo económico o soporte en la vida.",
    pregunta: "¿Qué temores financieros o preocupaciones sobre tu sustento estás cargando?"
  },
  "Contracturas en hombros y cuello": {
    conflicto: "Exceso de responsabilidades and cargas ajenas. Sostener el mundo sobre tus hombros.",
    pregunta: "¿Qué responsabilidades de otros te has echado encima y te pesan en exceso?"
  },
  "Ciática o pinzamiento": {
    conflicto: "Inseguridad para ir hacia el futuro, o resistencia a someterse a una dirección impuesta por otros.",
    pregunta: "¿Qué decisión futura te genera desconfianza o qué dirección te sientes obligado a tomar?"
  },
  "Dolor dorsal entre omóplatos": {
    conflicto: "Sensación de traición o desilusión afectiva profunda. 'Cuchilladas por la espalda' reales o simbólicas.",
    pregunta: "¿De qué persona cercana has recibido una traición o decepción que aún te duele?"
  },
  "Escoliosis o rigidez matutina": {
    conflicto: "Falta de flexibilidad ante las normas o desvalorización estructural de la propia postura ante la vida.",
    pregunta: "¿En qué aspecto de tu vida estás siendo demasiado rígido o autoexigente?"
  },

  // Estómago
  "Gastritis nerviosa o acidez": {
    conflicto: "Ira o contrariedad indigesta. Situaciones injustas que no logras tragar ni procesar.",
    pregunta: "¿Qué injusticia o situación de rabia contenida no estás logrando asimilar?"
  },
  "Úlceras o ardor gástrico": {
    conflicto: "Agresión reprimida o miedo constante a ser devorado por las circunstancias o por una figura de autoridad.",
    pregunta: "¿Qué conflicto territorial o familiar te está 'corroyendo' por dentro?"
  },
  "Espasmos o retortijones": {
    conflicto: "Miedo agudo o pánico súbito ante un acontecimiento inesperado que paraliza tu capacidad digestiva.",
    pregunta: "¿Qué imprevisto o cambio repentino te ha encogido el estómago de miedo?"
  },
  "Náuseas o mareo digestivo": {
    conflicto: "Rechazo visceral a una persona, idea o situación que se te quiere imponer a la fuerza.",
    pregunta: "¿Qué aspecto de tu entorno te genera un rechazo tan profundo que quisieras expulsarlo?"
  },
  "Digestión lenta o pesadez": {
    conflicto: "Dificultad para procesar experiencias densas o estancamiento ante un cambio drástico de vida.",
    pregunta: "¿Qué experiencia dolorosa sigues dándole vueltas sin poder asimilarla del todo?"
  },

  // Vientre
  "Colon irritable o colitis": {
    conflicto: "Incapacidad para soltar suciedades o traiciones del pasado. Sentir que te jugaron sucio.",
    pregunta: "¿Qué 'jugada sucia' o traición del pasado te cuesta tanto perdonar y soltar?"
  },
  "Estreñimiento o diarrea crónica": {
    conflicto: "Retención de ideas o bienes por miedo a la escasez (estreñimiento) o urgencia por evacuar un conflicto tóxico (diarrea).",
    pregunta: "¿A qué ideas viejas, rencores o miedos a la escasez te estás aferrando?"
  },
  "Afecciones uterinas u ováricas": {
    conflicto: "Conflictos de nido: miedo a no poder concebir, abortos no resueltos o culpabilidad con los hijos.",
    pregunta: "¿Qué culpas o miedos profundos guardas respecto a tu maternidad, creatividad o linaje?"
  },
  "Endometriosis o dolor menstrual": {
    conflicto: "Miedo o rechazo a la feminidad, dolores heredados del árbol genealógico femenino o miedo al parto.",
    pregunta: "¿Qué memorias de dolor o sumisión de las mujeres de tu familia estás repitiendo?"
  },
  "Infecciones urinarias o cálculos": {
    conflicto: "Conflicto de límites de territorio. Rabia acumulada respecto a tu intimidad o espacio personal.",
    pregunta: "¿Quién está sobrepasando tus límites personales o invadiendo tu intimidad?"
  },
  "Hinchazón abdominal o gases": {
    conflicto: "Contener verdades pesadas por miedo a herir o a causar una explosión familiar. Fermentación de secretos.",
    pregunta: "¿Qué verdades o secretos familiares estás guardando para evitar un conflicto mayor?"
  },
  "Problemas de fertilidad": {
    conflicto: "Mecanismo biológico de protección ante memorias de partos trágicos o infancias difíciles en el árbol genealógico.",
    pregunta: "¿Qué historia dolorosa de tu árbol genealógico te hace sentir inconscientemente que 'no es seguro' tener hijos?"
  },

  // Piernas
  "Várices o mala circulación": {
    conflicto: "Falta de libertad en el hogar, obligación de permanecer en un lugar que se siente como una prisión.",
    pregunta: "¿En qué espacio o relación te sientes atrapado y sin libertad para moverte?"
  },
  "Dolor articular en rodillas/tobillos": {
    conflicto: "Conflicto de sumisión y orgullo. Resistencia a doblegarse o arrodillarse ante la voluntad de otro.",
    pregunta: "¿Ante quién o qué situación te estás resistiendo a ceder por orgullo o dignidad?"
  },
  "Artritis o artrosis": {
    conflicto: "Crítica destructiva y autocrítica severa. Sentir que todo lo que haces está mal o es juzgado.",
    pregunta: "¿Qué nivel de juicio y exigencia te estás imponiendo en tus pasos diarios?"
  },
  "Calambres o debilidad muscular": {
    conflicto: "Tensión agua por querer correr o huir de una situación, pero sentirse paralizado por el miedo.",
    pregunta: "¿De qué situación quisieras salir corriendo pero sientes que tus piernas no responden?"
  },
  "Trombosis venosa": {
    conflicto: "Sensación de coagulación o estancamiento en la vida familiar. Falta de alegría en la sangre de tu clan.",
    pregunta: "¿En qué aspecto de tu vida sientes que te has estancado o que se ha cortado la alegría?"
  },
  "Edema o retención de líquidos": {
    conflicto: "Conflicto de derrumbamiento existencial. Sentirse solo, abandonado o como un pez fuera del agua.",
    pregunta: "¿En qué momento te sentiste completamente desprotegido, abandonado o fuera de tu hábitat?"
  },
  "Sensación de no poder avanzar": {
    conflicto: "Conflicto profundo de desvalorización de los propios pasos, miedo irracional al fracaso o a la independencia.",
    pregunta: "¿Qué creencia limitante te está haciendo dudar de tu capacidad para caminar solo?"
  }
};

// Diagrama corporal interactivo usando las fotos reales de la marca, con puntos táctiles
// y etiquetas adaptativas de diseño premium que integran la sabiduría somática de forma dinámica.
function CuerpoSeleccionable({ sexo, zonaActiva, onSelectZone, nombre, idioma }) {
  const esUsuarioPrueba = nombre === "Camila" || (TEST_USER && TEST_USER.nombre === nombre);
  const [sexoInteractivo, setSexoInteractivo] = useState(sexo || "F");
  const [subSintomas, setSubSintomas] = useState({});
  const [lineCoords, setLineCoords] = useState([]);
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissedRotationPrompt, setDismissedRotationPrompt] = useState(false);

  // Intentar forzar la orientación horizontal en dispositivos que lo soporten
  useEffect(() => {
    const lockLandscape = async () => {
      try {
        if (window.screen && window.screen.orientation && typeof window.screen.orientation.lock === "function") {
          await window.screen.orientation.lock("landscape");
        }
      } catch (err) {
        // Los navegadores restringen el bloqueo de pantalla si no está en pantalla completa
      }
    };
    lockLandscape();

    return () => {
      try {
        if (window.screen && window.screen.orientation && typeof window.screen.orientation.unlock === "function") {
          window.screen.orientation.unlock();
        }
      } catch (e) {}
    };
  }, []);

  // Detectar cambios de orientación del dispositivo en móviles
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = window.innerWidth < 768 || (window.screen && window.screen.width < 768);
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsPortraitMobile(!!(isMobile && isPortrait));
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (!esUsuarioPrueba && sexo) {
      setSexoInteractivo(sexo);
    }
  }, [sexo, esUsuarioPrueba]);

  const esFemenino = (esUsuarioPrueba ? sexoInteractivo : (sexo || "F")) !== "M";
  const imagen = esFemenino ? SILUETA_MUJER_DATA_URI : SILUETA_HOMBRE_DATA_URI;

  const colorGlow = esFemenino ? "#8a6bb8" : "#3f6b5b";
  const colorGlowLight = esFemenino ? "rgba(138, 107, 184, 0.15)" : "rgba(63, 107, 91, 0.15)";
  const pulseClass = esFemenino ? "ss-hotspot-pulse" : "ss-hotspot-pulse-male";

  const containerRef = useRef(null);
  const rightColumnRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 360, height: 440 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width || 360,
          height: entry.contentRect.height || 440
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggleSub = (grupo, sub) => {
    const list = subSintomas[grupo] || [];
    const nuevaList = list.includes(sub) ? list.filter(s => s !== sub) : [...list, sub];
    const nuevoSub = { ...subSintomas, [grupo]: nuevaList };
    setSubSintomas(nuevoSub);

    const puntoObj = PUNTOS_CUERPO.find(pt => pt.grupo === grupo);
    if (puntoObj) {
      const label = t(puntoObj.label, idioma) || puntoObj.label;
      const translatedList = nuevaList.map(s => t(s, idioma) || s);
      const textoFinal = nuevaList.length > 0 ? `${label}: ${translatedList.join(", ")}` : label;
      onSelectZone(grupo, textoFinal);
    }
  };

  const splitMode = !!zonaActiva;
  const activePunto = PUNTOS_CUERPO.find(p => p.grupo === zonaActiva);

  // Calibración y actualización dinámica de los splines de conexión
  useEffect(() => {
    if (!splitMode || !zonaActiva) {
      setLineCoords([]);
      return;
    }

    const measure = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const hotspotEl = document.getElementById(`hotspot-${zonaActiva}`);
      if (!hotspotEl) return;
      const hRect = hotspotEl.getBoundingClientRect();
      const hX = hRect.left - containerRect.left + hRect.width / 2;
      const hY = hRect.top - containerRect.top + hRect.height / 2;

      const activePuntoObj = PUNTOS_CUERPO.find(p => p.grupo === zonaActiva);
      if (!activePuntoObj) return;

      const newCoords = activePuntoObj.subSintomas.map((sub, idx) => {
        const itemEl = document.getElementById(`sub-item-${idx}`);
        if (!itemEl) return null;
        const itemRect = itemEl.getBoundingClientRect();
        
        // Conexión al borde izquierdo de la tarjeta del síntoma
        const endX = itemRect.left - containerRect.left;
        const endY = itemRect.top - containerRect.top + 18; // Centro de la primera fila de la tarjeta

        const esSeleccionado = (subSintomas[zonaActiva] || []).includes(sub);

        return {
          startX: hX,
          startY: hY,
          endX,
          endY,
          esSeleccionado
        };
      }).filter(Boolean);

      setLineCoords(newCoords);
    };

    // Múltiples mediciones rápidas para coincidir con la animación de expansión
    const timers = [
      setTimeout(measure, 20),
      setTimeout(measure, 100),
      setTimeout(measure, 220),
      setTimeout(measure, 350)
    ];

    window.addEventListener("resize", measure);
    const rightCol = rightColumnRef.current;
    if (rightCol) {
      rightCol.addEventListener("scroll", measure);
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
      if (rightCol) {
        rightCol.removeEventListener("scroll", measure);
      }
    };
  }, [zonaActiva, subSintomas, dimensions, splitMode]);

  const esMovil = dimensions.width < 500;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", width: "100%", margin: "8px 0" }}>
      <style>{`
        @keyframes sspulse {
          0% { box-shadow: 0 0 0 0 rgba(138, 107, 184, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(138, 107, 184, 0); }
          100% { box-shadow: 0 0 0 0 rgba(138, 107, 184, 0); }
        }
        @keyframes sspulse-male {
          0% { box-shadow: 0 0 0 0 rgba(63, 107, 91, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(63, 107, 91, 0); }
          100% { box-shadow: 0 0 0 0 rgba(63, 107, 91, 0); }
        }
        @keyframes ssspin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ssfloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .ss-hotspot-pulse {
          animation: sspulse 2s infinite;
        }
        .ss-hotspot-pulse-male {
          animation: sspulse-male 2s infinite;
        }
        .ss-body-node {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ss-body-node:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
          background-color: ${esFemenino ? "rgba(138, 107, 184, 0.98)" : "rgba(63, 107, 91, 0.98)"} !important;
          color: white !important;
          box-shadow: 0 6px 16px ${esFemenino ? "rgba(138, 107, 184, 0.4)" : "rgba(63, 107, 91, 0.4)"} !important;
          z-index: 30 !important;
        }
        .ss-grid-circle {
          animation: ssspin 25s linear infinite;
        }
        .ss-figure-animated {
          animation: ssfloat 6s ease-in-out infinite;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        @keyframes ssPathDraw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ssSlideDown {
          from {
            opacity: 0;
            transform: translateY(-4px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 300px;
          }
        }
        .ss-details-expand {
          animation: ssSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          overflow: hidden;
        }
        @keyframes ssFlowLine {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        .ss-flowing-dash {
          animation: ssFlowLine 1.5s linear infinite;
        }
        @keyframes ssPhoneRotate {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(0deg); }
          45% { transform: rotate(90deg); }
          75% { transform: rotate(90deg); }
          100% { transform: rotate(0deg); }
        }
        .ss-phone-rotate-anim {
          animation: ssPhoneRotate 2.8s cubic-bezier(0.68, -0.4, 0.32, 1.4) infinite;
        }
      `}</style>

      {/* Selector de Energía / Género Premium — Solo visible para el usuario de prueba */}
      {esUsuarioPrueba && (
        <div 
          style={{ 
            display: "flex", 
            background: "rgba(0,0,0,0.03)", 
            padding: "3px", 
            borderRadius: "99px", 
            marginBottom: "16px",
            border: `1.5px solid ${LINE}`,
            position: "relative"
          }}
        >
          <button
            type="button"
            onClick={() => setSexoInteractivo("F")}
            style={{
              border: "none",
              background: esFemenino ? "white" : "transparent",
              color: esFemenino ? "#8a6bb8" : MUTED,
              fontSize: "11.5px",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "99px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: esFemenino ? "0 2px 6px rgba(138,107,184,0.12)" : "none",
              fontFamily: FONT_BODY
            }}
          >
            {t("Energía Femenina", idioma)}
          </button>
          <button
            type="button"
            onClick={() => setSexoInteractivo("M")}
            style={{
              border: "none",
              background: !esFemenino ? "white" : "transparent",
              color: !esFemenino ? "#3f6b5b" : MUTED,
              fontSize: "11.5px",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "99px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: !esFemenino ? "0 2px 6px rgba(63,107,91,0.12)" : "none",
              fontFamily: FONT_BODY
            }}
          >
            {t("Energía Masculina", idioma)}
          </button>
        </div>
      )}

      {/* Main Container Card */}
      <div 
        ref={containerRef}
        style={{ 
          position: "relative", 
          width: "100%", 
          maxWidth: splitMode ? "720px" : "360px", 
          height: splitMode ? (esMovil ? "520px" : "440px") : "440px",
          background: "#faf9f7",
          borderRadius: 24,
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)",
          border: `1.5px solid ${LINE}`,
          overflow: "hidden",
          display: "flex",
          flexDirection: splitMode && esMovil ? "column" : "row",
          transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {/* Dynamic Rotation Prompt Overlay to ensure superb landscape experience on portrait mobile */}
        {isPortraitMobile && !dismissedRotationPrompt && (
          <div
            className="ss-fade-in"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(250, 249, 247, 0.97)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              textAlign: "center"
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={colorGlow} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <g className="ss-phone-rotate-anim" style={{ transformOrigin: "12px 12px" }}>
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2" fill={`${colorGlow}08`} stroke={colorGlow} strokeWidth="1.5" />
                  <path d="M11 19h2" stroke={colorGlow} strokeWidth="1.5" strokeLinecap="round" />
                </g>
                <path d="M21 12a9 9 0 0 0-9-9" stroke={colorGlow} strokeWidth="1.2" strokeDasharray="3,3" />
                <path d="M20 9l1 3-3-1" stroke={colorGlow} strokeWidth="1.2" />
              </svg>
            </div>
            
            <h3 
              style={{ 
                fontSize: "15px", 
                fontWeight: 700, 
                color: INK, 
                margin: "0 0 8px",
                fontFamily: FONT_BODY,
                letterSpacing: "-0.01em"
              }}
            >
              {t("Experiencia Horizontal Recomendada", idioma)}
            </h3>
            
            <p 
              style={{ 
                fontSize: "12px", 
                color: MUTED, 
                lineHeight: "1.5", 
                maxWidth: "280px", 
                margin: "0 0 20px",
                fontFamily: FONT_BODY
              }}
            >
              {t("Para navegar por el mapa de tu cuerpo y explorar la sabiduría somática con total claridad y movimiento, gira tu dispositivo horizontalmente.", idioma)}
            </p>
            
            <button
              className="ss-btn"
              onClick={() => setDismissedRotationPrompt(true)}
              style={{
                background: colorGlow,
                color: "#ffffff",
                border: "none",
                borderRadius: "99px",
                padding: "8px 24px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 4px 12px ${colorGlow}20`,
                fontFamily: FONT_BODY,
                transition: "all 0.2s ease"
              }}
            >
              {t("Entendido, continuar en vertical", idioma)}
            </button>
          </div>
        )}

        {/* Sacred Geometry Background / Glowing Circles (Left Pane) */}
        <div 
          className="ss-grid-circle"
          style={{
            position: "absolute",
            left: splitMode ? (esMovil ? "50%" : "21%") : "50%",
            top: splitMode ? (esMovil ? "20%" : "45%") : "45%",
            width: splitMode ? "180px" : "320px",
            height: splitMode ? "180px" : "320px",
            border: `1px dashed ${esFemenino ? "rgba(138, 107, 184, 0.08)" : "rgba(63, 107, 91, 0.08)"}`,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        />
        <div 
          className="ss-grid-circle"
          style={{
            position: "absolute",
            left: splitMode ? (esMovil ? "50%" : "21%") : "50%",
            top: splitMode ? (esMovil ? "20%" : "45%") : "45%",
            width: splitMode ? "120px" : "220px",
            height: splitMode ? "120px" : "220px",
            border: `1px solid ${esFemenino ? "rgba(138, 107, 184, 0.04)" : "rgba(63, 107, 91, 0.04)"}`,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
            animationDirection: "reverse",
            animationDuration: "35s",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        />

        {/* 1. SILHOUETTE COLUMN (LEFT PANE) */}
        <div
          style={{
            width: splitMode ? (esMovil ? "100%" : "42%") : "100%",
            height: splitMode ? (esMovil ? "200px" : "100%") : "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            zIndex: 2,
            padding: esMovil ? "8px" : "0px"
          }}
        >
          {/* Floating silhouette image with explicit aspect ratio for accurate hotspot alignment */}
          <div
            className="ss-figure-animated"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              maxWidth: "100%",
              aspectRatio: "360 / 440",
              margin: "auto",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Ambient background glow precisely aligned behind the active hotspot inside the same aspect-ratio box */}
            {zonaActiva && activePunto && (
              <div
                style={{
                  position: "absolute",
                  left: `${activePunto.x}%`,
                  top: `${activePunto.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: esMovil ? 70 : 120,
                  height: esMovil ? 70 : 120,
                  background: `radial-gradient(circle, ${colorGlowLight} 0%, rgba(250, 249, 247, 0) 70%)`,
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 1,
                  transition: "all 0.5s ease"
                }}
              />
            )}

            <img
              src={imagen}
              alt={esFemenino ? "Silueta femenina interactiva" : "Silueta masculina interactiva"}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "contain",
                position: "absolute",
                top: 0,
                left: 0,
                display: "block", 
                userSelect: "none", 
                opacity: 0.94,
                filter: zonaActiva ? "brightness(1.02) contrast(1.05)" : "none",
                transition: "all 0.3s ease",
                zIndex: 2
              }}
              draggable={false}
            />

            {/* Hotspots mapped with perfect precision on the scaled silhouette */}
            {PUNTOS_CUERPO.map((p) => {
              const activo = zonaActiva === p.grupo;
              const opacidadNoActivos = zonaActiva && !activo ? 0.35 : 1.0;

              return (
                <button
                  key={p.grupo}
                  id={`hotspot-${p.grupo}`}
                  type="button"
                  onClick={() => onSelectZone(p.grupo, t(p.texto, idioma) || p.texto)}
                  className="ss-body-node"
                  style={{
                    position: "absolute",
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: activo ? "translate(-50%, -50%) scale(1.15)" : "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    padding: esMovil ? "3px 7px" : "4px 8px",
                    borderRadius: 99,
                    border: activo ? `2px solid ${colorGlow}` : "1.1px solid rgba(0,0,0,0.08)",
                    background: activo 
                      ? colorGlow 
                      : "rgba(255, 255, 255, 0.94)",
                    color: activo ? "white" : INK,
                    fontFamily: FONT_BODY,
                    fontSize: activo ? (esMovil ? 10 : 11) : (esMovil ? 9 : 10),
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: activo 
                      ? `0 6px 18px ${esFemenino ? "rgba(138, 107, 184, 0.35)" : "rgba(63, 107, 91, 0.35)"}`
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    zIndex: activo ? 25 : 10,
                    backdropFilter: "blur(3px)",
                    outline: "none",
                    opacity: opacidadNoActivos,
                    transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                >
                  {/* Colored Indicator Dot */}
                  <span 
                    className={!activo ? pulseClass : ""}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: activo ? "white" : colorGlow,
                      display: "inline-block",
                      boxShadow: activo ? "0 0 6px rgba(255,255,255,0.9)" : "none"
                    }}
                  />
                  {t(p.label, idioma)}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SVG SPLINES AND PARTICLES (ABSOLUTE OVERLAY) - Active on both desktop & mobile with organic glowing curves */}
        {splitMode && activePunto && lineCoords.length > 0 && (
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 4
            }}
          >
            <defs>
              <linearGradient id="glow-grad-spline" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorGlow} stopOpacity="1" />
                <stop offset="100%" stopColor={esFemenino ? "#c5a3ff" : "#76c893"} stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow-shadow-spline" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={esMovil ? "1.5" : "3"} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {lineCoords.map((line, idx) => {
              const { startX, startY, endX, endY, esSeleccionado } = line;
              
              // Dynamic organic curves that gracefully adapt to desktop (horizontal flow) vs mobile (vertical/diagonal flow)
              const cpX1 = esMovil ? startX : startX + (endX - startX) * 0.5;
              const cpY1 = esMovil ? startY + (endY - startY) * 0.5 : startY;
              const cpX2 = esMovil ? endX : startX + (endX - startX) * 0.5;
              const cpY2 = esMovil ? startY + (endY - startY) * 0.5 : endY;
              const pathD = `M ${startX} ${startY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${endX} ${endY}`;

              return (
                <g key={idx}>
                  {/* Outer subtle glowing base line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={esSeleccionado ? colorGlow : "rgba(0,0,0,0.03)"}
                    strokeWidth={esSeleccionado ? (esMovil ? 4 : 5) : 0.8}
                    opacity={esSeleccionado ? 0.25 : 0.6}
                    style={{
                      transition: "stroke 0.4s ease, stroke-width 0.4s ease"
                    }}
                  />
                  {/* Core elegant connector line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={esSeleccionado ? "url(#glow-grad-spline)" : "rgba(0,0,0,0.05)"}
                    strokeWidth={esSeleccionado ? (esMovil ? 2 : 2.5) : 1.0}
                    strokeDasharray={esSeleccionado ? "none" : "3,4"}
                    filter={esSeleccionado ? "url(#glow-shadow-spline)" : "none"}
                    style={{
                      transition: "stroke 0.4s ease, stroke-width 0.4s ease"
                    }}
                  />
                  {/* Flowing dashes on top of selected lines for the 'en movimiento' energy stream effect */}
                  {esSeleccionado && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={esMovil ? 1.2 : 1.5}
                      strokeDasharray="8,15"
                      className="ss-flowing-dash"
                      opacity="0.85"
                    />
                  )}
                  {/* Glowing, traveling energy particle bead */}
                  {esSeleccionado && (
                    <circle r={esMovil ? 2.5 : 3.5} fill="#ffffff" filter="url(#glow-shadow-spline)">
                      <animateMotion
                        dur={esMovil ? "1.8s" : "2.4s"}
                        repeatCount="indefinite"
                        path={pathD}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* 3. SUB-SYMPTOMS LIST COLUMN (RIGHT PANE) */}
        <div
          ref={rightColumnRef}
          style={{
            width: splitMode ? (esMovil ? "100%" : "58%") : "0%",
            height: splitMode ? (esMovil ? "calc(100% - 200px)" : "100%") : "100%",
            position: "relative",
            transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            opacity: splitMode ? 1 : 0,
            overflowY: "auto",
            zIndex: 5,
            pointerEvents: splitMode ? "auto" : "none",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "16px",
            background: "#ffffff",
            borderLeft: esMovil ? "none" : `1px solid ${LINE}`,
            borderTop: esMovil ? `1px solid ${LINE}` : "none"
          }}
        >
          {splitMode && activePunto && (
            <>
              <div style={{ marginBottom: 4 }}>
                <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colorGlow, fontFamily: FONT_BODY, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {t("Afecciones en", idioma)} {t(activePunto.label, idioma) || activePunto.label}
                </h4>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: MUTED, lineHeight: 1.3 }}>
                  {t("Selecciona una o más ramificaciones para revelar el sentido emocional completo y profundo.", idioma)}
                </p>
              </div>

              {activePunto.subSintomas.map((sub, idx) => {
                const listSel = subSintomas[zonaActiva] || [];
                const esSeleccionado = listSel.includes(sub);
                const infoSomatico = SUB_SINTOMAS_INFO[sub];

                return (
                  <div
                    key={idx}
                    id={`sub-item-${idx}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: esSeleccionado 
                        ? (esFemenino ? "rgba(138, 107, 184, 0.04)" : "rgba(63, 107, 91, 0.04)")
                        : "rgba(0, 0, 0, 0.02)",
                      border: `1.5px solid ${esSeleccionado ? colorGlow : "rgba(0,0,0,0.03)"}`,
                      cursor: "pointer",
                      transition: "all 0.25s ease-in-out",
                      userSelect: "none",
                      boxShadow: esSeleccionado ? `0 4px 14px ${colorGlowLight}` : "none"
                    }}
                    onClick={() => handleToggleSub(zonaActiva, sub)}
                  >
                    {/* Header Row */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Custom Premium Check Circle */}
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: `1.5px solid ${esSeleccionado ? colorGlow : "rgba(0,0,0,0.18)"}`,
                          background: esSeleccionado ? colorGlow : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                          flexShrink: 0,
                          transition: "all 0.25s ease"
                        }}
                      >
                        {esSeleccionado && (
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "white"
                            }}
                          />
                        )}
                      </div>

                      {/* Text Label */}
                      <span
                        style={{
                          fontSize: "12.5px",
                          fontWeight: esSeleccionado ? 700 : 500,
                          color: esSeleccionado ? INK : MUTED,
                          lineHeight: 1.35,
                          transition: "all 0.2s ease",
                          flex: 1
                        }}
                      >
                        {t(sub, idioma) || sub}
                      </span>
                    </div>

                    {/* Somatic details expanded dynamically without truncation */}
                    {esSeleccionado && infoSomatico && (
                      <div
                        className="ss-details-expand"
                        style={{
                          marginTop: 10,
                          paddingTop: 10,
                          borderTop: `1px dashed ${esFemenino ? "rgba(138, 107, 184, 0.2)" : "rgba(63, 107, 91, 0.2)"}`,
                          fontSize: "11.5px",
                          lineHeight: 1.45,
                          color: INK
                        }}
                        onClick={(e) => e.stopPropagation()} // Evita cerrar al interactuar con el texto
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div>
                            <span style={{ fontWeight: 700, color: colorGlow, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.5px", display: "block", marginBottom: 3 }}>
                              {t("Conflicto Psicosomático", idioma)}
                            </span>
                            <span style={{ color: INK, display: "block" }}>
                              {t(infoSomatico.conflicto, idioma) || infoSomatico.conflicto}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: MUTED, textTransform: "uppercase", fontSize: "9.5px", letterSpacing: "0.5px", display: "block", marginBottom: 3 }}>
                              {t("Pregunta para la Autoindagación", idioma)}
                            </span>
                            <span style={{ fontStyle: "italic", color: MUTED, display: "block" }}>
                              {t(infoSomatico.pregunta, idioma) || infoSomatico.pregunta}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Reset zoom / Back to body button */}
        {zonaActiva && (
          <button
            type="button"
            onClick={() => onSelectZone(null, "")}
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              background: "white",
              border: `1.5px solid ${LINE}`,
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              zIndex: 10,
              transition: "all 0.2s"
            }}
            title={t("Ver cuerpo completo", idioma)}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
function ScreenCaptura({ seleccion, datos, setDatos, onNext, onBack, sexo, onIrPaso, nombre, idioma }) {
  const [paso, setPaso] = useState(0); // 0: Historia, 1: Física, 2: Emociones
  const dictado = useDictado((texto) => setDatos((d) => ({ ...d, historia: texto })));
  const [zonaActiva, setZonaActiva] = useState(null);

  // Modelo de ruta guiada (el mismo del Diario) también disponible aquí, para quien
  // no sabe por dónde empezar a contar su historia.
  const [rutaModo, setRutaModo] = useState(false);
  const [pasoVida, setPasoVida] = useState(0);
  const [respuestasVida, setRespuestasVida] = useState({});
  const dictadoVida = useDictado((t) => {
    const idActual = PREGUNTAS_VIDA[pasoVida] && PREGUNTAS_VIDA[pasoVida].id;
    if (idActual) setRespuestasVida((r) => ({ ...r, [idActual]: t }));
  });

  const guardarRutaVitalEnHistoria = () => {
    const bloques = PREGUNTAS_VIDA
      .map((p) => (respuestasVida[p.id] && respuestasVida[p.id].trim() ? `${t(p.etapa, idioma)}: ${respuestasVida[p.id].trim()}` : null))
      .filter(Boolean)
      .join("\n\n");
    if (bloques) {
      setDatos((d) => ({ ...d, historia: d.historia ? `${d.historia}\n\n${bloques}` : bloques }));
    }
    setRespuestasVida({});
    setPasoVida(0);
    setRutaModo(false);
  };

  const handleBack = () => {
    if (rutaModo) {
      setRutaModo(false);
      return;
    }
    if (paso > 0) {
      setPaso(paso - 1);
      return;
    }
    onBack();
  };

  const TITULOS_PASOS = [
    { id: "historia", label: "Tu historia" },
    { id: "fisica", label: "Afectación física" },
    { id: "emocion", label: "Tus emociones" },
  ];

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <style>{`@keyframes ssmicpulse { 0%,100% { box-shadow: 0 0 0 0 rgba(224,86,77,0.45);} 50% { box-shadow: 0 0 0 8px rgba(224,86,77,0);} }`}</style>
      <TopBar title={t("Comparte contigo", idioma)} onBack={handleBack} step={2} pasos={PASOS_ONBOARDING} onIrPaso={onIrPaso} />

      {/* Indicador interactivo secuencial de pasos superior */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "10px 0 16px" }}>
        {TITULOS_PASOS.map((item, i) => {
          const activo = paso === i;
          const completado = paso > i;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (rutaModo) setRutaModo(false);
                setPaso(i);
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "8px 4px",
                borderRadius: 10,
                border: activo ? `1.5px solid ${SAGE_DARK}` : `1px solid ${LINE}`,
                background: activo ? SAGE_TINT : (completado ? "#faf9f7" : "transparent"),
                color: activo ? SAGE_DARK : (completado ? INK : MUTED),
                cursor: "pointer",
                fontFamily: FONT_BODY,
                fontSize: 11.5,
                fontWeight: activo ? 700 : 500,
                transition: "all 0.2s ease"
              }}
            >
              <span style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: activo ? SAGE_DARK : (completado ? SAGE : LINE),
                color: (activo || completado) ? "white" : MUTED,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700
              }}>
                {completado ? "✓" : i + 1}
              </span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {t(item.label, idioma)}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
        {/* PASO 1: HISTORIA */}
        {paso === 0 && !rutaModo && (
          <div className="ss-fade" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0 0 6px" }}>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: INK, margin: 0 }}>
                1. {t("Cuéntame tu historia", idioma)}
              </p>
            </div>
            <p style={{ fontSize: 12, color: MUTED, margin: "0 0 10px", lineHeight: 1.45 }}>
              {t("Escribe o dicta libremente lo que estás viviendo hoy, o permite que te formulemos preguntas guiadas.", idioma)}
            </p>

            <VoiceRecordingBanner
              activo={dictado.escuchando}
              onDetener={dictado.detener}
              idioma={idioma}
            />

            <div style={{ margin: "0 0 14px", padding: "10px 0 0", borderTop: `1px solid ${LINE}` }}>
              <button
                onClick={() => { setPasoVida(0); setRutaModo(true); }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1px solid ${LINE}`,
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  textAlign: "left",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#faf9f7"}
                onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ marginTop: 2 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#5b4a78" }}>
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: INK, marginBottom: 2 }}>
                    {t("¿Prefieres que te guiemos?", idioma)}
                  </div>
                  <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.4 }}>
                    {t("Recorre tu vida en tres etapas (infancia, adolescencia, adultez) para desbloquear memorias.", idioma)}
                  </div>
                </div>
              </button>
            </div>

            <div style={{
               flex: 1,
               position: "relative",
               borderRadius: 20,
               background: dictado.escuchando ? "rgba(254, 242, 242, 0.7)" : "rgba(255, 255, 255, 0.8)",
               backdropFilter: "blur(12px)",
               border: `1.5px solid ${dictado.escuchando ? "#ef4444" : LINE}`,
               boxShadow: dictado.escuchando ? "0 8px 24px rgba(239, 68, 68, 0.15)" : "0 6px 16px rgba(0,0,0,0.04)",
               transition: "all 0.3s ease",
               padding: "18px 20px 60px 20px",
               minHeight: "200px",
               display: "flex", 
               flexDirection: "column"
            }}
            onFocus={(e) => {
               e.currentTarget.style.borderColor = SAGE;
               e.currentTarget.style.boxShadow = "0 8px 24px rgba(111,168,146,0.15)";
               e.currentTarget.style.background = "#ffffff";
            }}
            onBlur={(e) => {
               e.currentTarget.style.borderColor = dictado.escuchando ? "#ef4444" : LINE;
               e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
               e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
            }}>
              <textarea
                name="historia"
                id="historia-input"
                inputMode="text"
                autoComplete="on"
                autoCorrect="on"
                spellCheck={true}
                autoCapitalize="sentences"
                data-gramm="true"
                style={{ 
                   width: "100%",
                   background: "transparent",
                   border: "none",
                   outline: "none",
                   color: INK,
                   fontSize: 15.5,
                   lineHeight: 1.6,
                   resize: "none",
                   fontFamily: FONT_BODY,
                   overflowY: "auto",
                   flex: 1
                }}
                placeholder={t("Escribe tu historia aquí... no te preocupes por el formato, solo déjalo salir, o toca el micrófono para contarla en voz alta.", idioma)}
                value={datos.historia}
                onChange={(e) => setDatos({ ...datos, historia: e.target.value })}
              />
              <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <MicButton
                  escuchando={dictado.escuchando}
                  soportado={dictado.soportado}
                  onClick={() => dictado.toggle(datos.historia)}
                />
              </div>
            </div>
            {dictado.error === "permiso" && (
              <div 
                onClick={() => dispararGuiaPermisos("microfono")}
                style={{ 
                  fontSize: 11.5, 
                  color: "#b91c1c", 
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "6px 10px",
                  margin: "8px 0 0", 
                  lineHeight: 1.4,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6
                }}
              >
                <span>{t("Permiso de micrófono denegado. Toca aquí para ver cómo activarlo en Ajustes.", idioma)}</span>
                <span style={{ fontWeight: 700, textDecoration: "underline", flexShrink: 0 }}>{t("Ajustes", idioma)}</span>
              </div>
            )}
            {!dictado.soportado && (
              <p style={{ fontSize: 11.5, color: MUTED, margin: "6px 0 0" }}>
                {t("El dictado por voz no está disponible en este navegador — puedes escribir directamente.", idioma)}
              </p>
            )}
          </div>
        )}

        {/* RUTA VITAL EN HISTORIA */}
        {paso === 0 && rutaModo && (
          (() => {
            const p = PREGUNTAS_VIDA[pasoVida];
            const valorActual = respuestasVida[p.id] || "";
            const puede = valorActual.trim().length > 0;
            const esUltimo = pasoVida === PREGUNTAS_VIDA.length - 1;
            return (
              <div className="ss-fade" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", gap: 5, marginBottom: 4 }}>
                  {PREGUNTAS_VIDA.map((_, i) => (
                    <div
                      key={i}
                      style={{ flex: 1, height: 4, borderRadius: 999, background: i <= pasoVida ? LAVENDER : LINE }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 11.5, color: LAVENDER, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, margin: "8px 0 0" }}>
                  {t(p.etapa, idioma)} &middot; {pasoVida + 1} {t("de", idioma)} {PREGUNTAS_VIDA.length}
                </p>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: INK, margin: "4px 0 4px", lineHeight: 1.4 }}>
                  {t(p.pregunta, idioma)}
                </p>
                <p style={{ fontSize: 12, color: MUTED, margin: "0 0 8px", lineHeight: 1.5, fontStyle: "italic" }}>
                  {t(p.ayuda, idioma)}
                </p>
                <VoiceRecordingBanner
                  activo={dictadoVida.escuchando}
                  onDetener={dictadoVida.detener}
                  idioma={idioma}
                />
                <div style={{
                  flex: 1,
                  position: "relative",
                  borderRadius: 20,
                  background: dictadoVida.escuchando ? "rgba(254, 242, 242, 0.7)" : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  border: `1.5px solid ${dictadoVida.escuchando ? "#ef4444" : LINE}`,
                  boxShadow: dictadoVida.escuchando ? "0 8px 24px rgba(239, 68, 68, 0.15)" : "0 6px 16px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  padding: "18px 20px 60px 20px",
                  minHeight: "200px",
                  display: "flex", 
                  flexDirection: "column"
                }}
                onFocus={(e) => {
                   e.currentTarget.style.borderColor = SAGE;
                   e.currentTarget.style.boxShadow = "0 8px 24px rgba(111,168,146,0.15)";
                   e.currentTarget.style.background = "#ffffff";
                }}
                onBlur={(e) => {
                   e.currentTarget.style.borderColor = LINE;
                   e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.04)";
                   e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
                }}>
                  <textarea
                    name={`historia_etapa_${p.id}`}
                    inputMode="text"
                    autoComplete="on"
                    autoCorrect="on"
                    spellCheck={true}
                    autoCapitalize="sentences"
                    data-gramm="true"
                    style={{ 
                       width: "100%",
                       background: "transparent",
                       border: "none",
                       outline: "none",
                       color: INK,
                       fontSize: 15.5,
                       lineHeight: 1.6,
                       resize: "none",
                       fontFamily: FONT_BODY,
                       overflowY: "auto",
                       flex: 1
                    }}
                    placeholder={t("Escribe o dicta lo que venga a tu memoria...", idioma)}
                    value={valorActual}
                    onChange={(e) => setRespuestasVida((r) => ({ ...r, [p.id]: e.target.value }))}
                  />
                  <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                    <MicButton
                      escuchando={dictadoVida.escuchando}
                      soportado={dictadoVida.soportado}
                      onClick={() => dictadoVida.toggle(valorActual)}
                    />
                  </div>
                </div>
                {dictadoVida.error === "permiso" && (
                  <div 
                    onClick={() => dispararGuiaPermisos("microfono")}
                    style={{ 
                      fontSize: 11.5, 
                      color: "#b91c1c", 
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: 8,
                      padding: "6px 10px",
                      margin: "8px 0 0", 
                      lineHeight: 1.4,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 6
                    }}
                  >
                    <span>{t("Permiso de micrófono denegado. Toca aquí para ver cómo activarlo en Ajustes.", idioma)}</span>
                    <span style={{ fontWeight: 700, textDecoration: "underline", flexShrink: 0 }}>{t("Ajustes", idioma)}</span>
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <button
                    className="ss-btn ss-btn-ghost"
                    style={{ flex: 1 }}
                    onClick={() => {
                      if (pasoVida === 0) setRutaModo(false);
                      else setPasoVida((n) => n - 1);
                    }}
                  >
                    {pasoVida === 0 ? t("Cancelar", idioma) : t("Anterior", idioma)}
                  </button>
                  {!esUltimo ? (
                    <button
                      className="ss-btn ss-btn-premium"
                      style={{ flex: 1.3, opacity: puede ? 1 : 0.5 }}
                      disabled={!puede}
                      onClick={() => setPasoVida((n) => n + 1)}
                    >
                      {t("Siguiente", idioma)}
                    </button>
                  ) : (
                    <button
                      className="ss-btn ss-btn-premium"
                      style={{ flex: 1.3, opacity: puede ? 1 : 0.5 }}
                      disabled={!puede}
                      onClick={guardarRutaVitalEnHistoria}
                    >
                      {t("Usar esta ruta", idioma)}
                    </button>
                  )}
                </div>
              </div>
            );
          })()
        )}

        {/* PASO 2: AFECTACIÓN FÍSICA */}
        {paso === 1 && (
          <div className="ss-fade">
            <p style={{ fontSize: 13.5, fontWeight: 700, color: INK, margin: "0 0 4px" }}>
              2. {t("Elige la zona del cuerpo donde presentas tu afectación", idioma)}
            </p>
            <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 12px" }}>
              {t("Selecciona un punto de tensión o dolor directamente sobre la silueta corporal.", idioma)}
            </p>
            <CuerpoSeleccionable 
              sexo={sexo} 
              zonaActiva={zonaActiva}
              nombre={nombre}
              idioma={idioma}
              onSelectZone={(grupo, texto) => {
                setZonaActiva(grupo);
                setDatos({ ...datos, fisica: texto });
              }}
            />
            
            {zonaActiva && (() => {
              const punto = PUNTOS_CUERPO.find(p => p.grupo === zonaActiva);
              if (!punto) return null;
              const esFemenino = sexo !== "M";
              return (
                <div
                  className="ss-fade"
                  style={{
                    background: esFemenino ? "rgba(138, 107, 184, 0.04)" : "rgba(63, 107, 91, 0.04)",
                    borderLeft: `3px solid ${esFemenino ? "#8a6bb8" : "#3f6b5b"}`,
                    padding: "14px 16px",
                    borderRadius: "12px",
                    marginTop: 14,
                    marginBottom: 16,
                    border: `1px solid ${esFemenino ? "rgba(138, 107, 184, 0.15)" : "rgba(63, 107, 91, 0.15)"}`,
                    borderLeftWidth: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={esFemenino ? "#8a6bb8" : "#3f6b5b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 700, color: esFemenino ? "#8a6bb8" : "#3f6b5b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {t("Sabiduría Somática", idioma)} • {t(punto.label, idioma)}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: INK, margin: "0 0 8px", lineHeight: 1.45, fontStyle: "italic", fontWeight: 500 }}>
                    "{t(punto.significado, idioma)}"
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: MUTED, margin: 0, lineHeight: 1.4 }}>
                    {t(punto.pregunta, idioma)}
                  </p>
                </div>
              );
            })()}

            <p style={{ fontSize: 11.5, color: MUTED, margin: "16px 0 6px" }}>
              {t("O detállalo con tus propias palabras a continuación:", idioma)}
            </p>
            <input
              className="ss-input"
              placeholder={t("Ej: dolor de cabeza, dolor de estómago...", idioma)}
              value={datos.fisica}
              onChange={(e) => {
                setZonaActiva(null);
                setDatos({ ...datos, fisica: e.target.value });
              }}
            />
          </div>
        )}

        {/* PASO 3: EMOCIONES */}
        {paso === 2 && (
          <div className="ss-fade">
            <p style={{ fontSize: 13.5, fontWeight: 700, color: INK, margin: "0 0 4px" }}>
              3. {t("Qué emoción sientes", idioma)}
            </p>
            <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 12px" }}>
              {t("Puedes elegir una o varias emociones.", idioma)}
            </p>
            {EMOCIONES_SECCIONES.map((seccion) => (
              <div key={seccion.titulo} style={{ marginBottom: 14 }}>
                <p
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: SAGE_DARK,
                    textTransform: "uppercase",
                    letterSpacing: 0.6,
                    margin: "0 0 7px",
                  }}
                >
                  {t(seccion.titulo, idioma)}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {seccion.emociones.map((em) => {
                    const seleccionadas = Array.isArray(datos.emocion)
                      ? datos.emocion
                      : datos.emocion
                      ? [datos.emocion]
                      : [];
                    const activa = seleccionadas.includes(em);
                    return (
                      <button
                        key={em}
                        className={`ss-chip ${activa ? "active" : ""}`}
                        onClick={() => {
                          const nueva = activa
                            ? seleccionadas.filter((x) => x !== em)
                            : [...seleccionadas, em];
                          setDatos({ ...datos, emocion: nueva });
                        }}
                      >
                        {t(em, idioma)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones de navegación en la parte inferior */}
      {!rutaModo && (
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {paso > 0 && (
            <button
              className="ss-btn ss-btn-ghost"
              style={{ flex: 0.8 }}
              onClick={() => setPaso(paso - 1)}
            >
              ◂ {t("Anterior", idioma)}
            </button>
          )}
          {paso < 2 ? (
            <button
              className="ss-btn ss-btn-primary"
              style={{ flex: 1.4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onClick={() => setPaso(paso + 1)}
            >
              <span>{paso === 0 ? t("Siguiente: Afectación física", idioma) : t("Siguiente: Tus emociones", idioma)}</span>
              <span>➔</span>
            </button>
          ) : (
            <button
              className="ss-btn ss-btn-primary"
              style={{ flex: 1.4, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onClick={onNext}
            >
              <span>{t("Analizar mi información", idioma)}</span>
              <span>✨</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ScreenAnalizando({ onDone, idioma }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div
      className="ss-fade"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "0 30px",
        textAlign: "center",
      }}
    >
      
      <div className="ss-logo-loading-container">
        <div className="ss-logo-loading-aura" />
        <img src={LOGO_DATA_URI} className="ss-logo-loading" alt="Cargando..." />
        <img src={FLOR_DATA_URI} className="ss-flower-orbit-cw" alt="" />
        <img src={FLOR_DATA_URI} className="ss-flower-orbit-ccw" alt="" />
      </div>
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: INK, margin: 0 }}>
        {t("Escuchando lo que tu cuerpo tiene para decir", idioma)}
      </p>
      <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.5 }}>
        {t("Buscando el hilo entre lo que sientes y lo que tu cuerpo recuerda", idioma)}
      </p>
    </div>
  );
}

// ============================================================================
// ADN DE VOZ — ¡Suelta!
// Todo texto narrativo generado por esta app (lectura de bienestar, reto, diario, tarot,
// especialistas) debe sonar como alguien que acompaña, no como un sistema que evalúa.
// Principios no negociables:
//   1. Cercanía: hablar en segunda persona, usar el nombre de quien lee, nunca en
//      abstracto ("el usuario", "el consultante").
//   2. Calidez sin infantilizar: amable y suave, pero sin condescendencia.
//   3. Esperanza real: cada lectura, sin excepción, cierra con una puerta abierta —
//      nunca con un concepto que suene definitivo, clausurado o sin salida.
//   4. Nombrar sin etiquetar: se ofrecen hipótesis de trabajo ("puede tener que ver
//      con...", "vale la pena observar..."), nunca sentencias ("tienes...", "esto es...").
//   5. El síntoma es información, no culpa: jamás se sugiere que la persona "causó"
//      su malestar; se explora el sentido, no se reparte responsabilidad.
// ============================================================================

// Detecta temas de fondo en lo que la persona escribió, para poder integrar marcos más
// amplios del banco de conocimiento (p. ej. Constelaciones Familiares) SOLO cuando de
// verdad aplican — así la narrativa gana profundidad sin sentirse repetitiva ni forzada.
function CajaFuente({ resultados, tema, idioma }) {
  const [open, setOpen] = React.useState(false);
  if (!resultados || resultados.length === 0) return null;
  const bg = tema ? tema.tint : SAGE_TINT;
  const color = tema ? tema.dark : SAGE_DARK;
  const highlight = tema ? tema.highlight : "#2c4a3f";
  return (
    <div style={{ background: bg, borderRadius: 14, marginTop: 4, overflow: "hidden" }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: 14, 
          background: "none", 
          border: "none", 
          cursor: "pointer" 
        }}
      >
        <span style={{ fontSize: 10.5, fontWeight: 700, color: color, textTransform: "uppercase" }}>
          {t("Si quieres profundizar", idioma)}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div style={{ 
        display: "grid", 
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s ease-in-out"
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 14px 14px 14px", borderTop: `1px solid rgba(0,0,0,0.05)` }}>
            <p style={{ fontSize: 11.5, color: highlight, margin: "10px 0 8px", lineHeight: 1.5 }}>
              <ResaltarMarca>{t("Esta lectura es una redacción propia de ¡Suelta!, inspirada en el enfoque simbólico de la biodescodificación. Si te interesa profundizar en este enfoque, estas son obras de referencia reconocidas en el tema:", idioma)}</ResaltarMarca>
            </p>
            {CITAS.biodescodificacion.map((f, i) => (
              <p key={i} style={{ fontSize: 11.5, color: highlight, margin: i === 0 ? 0 : "4px 0 0", lineHeight: 1.5 }}>
                &bull; {f}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CajaOtrasCausas({ resultados, tema, idioma }) {
  const [open, setOpen] = React.useState(false);
  if (!resultados || resultados.length === 0) return null;
  const r = resultados[0];
  if (!r.otrasCausas || r.otrasCausas.length === 0) return null;
  
  const bg = tema ? tema.tint : LAVENDER_TINT;
  const stroke = tema ? tema.stroke : "#d8d2e5";
  const iconColor = tema ? tema.iconColor : LAVENDER;
  const highlight = tema ? tema.highlight : "#4a3c63";
  
  return (
    <div style={{ background: bg, border: `1px solid ${stroke}`, borderRadius: 16, marginBottom: 16, overflow: "hidden" }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ 
          width: "100%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between", 
          padding: "16px 18px", 
          background: "none", 
          border: "none", 
          cursor: "pointer" 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h4l3-9 5 18 3-9h5"/>
           </svg>
           <h4 style={{ fontSize: 11.5, fontWeight: 700, color: iconColor, textTransform: "uppercase", margin: 0, letterSpacing: 0.5 }}>
             {t("Otras posibles causas", idioma)}
           </h4>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div style={{ 
        display: "grid", 
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 0.3s ease-in-out"
      }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 18px 20px 18px", borderTop: `1px solid ${stroke}` }}>
            <p style={{ fontSize: 12.5, color: INK, lineHeight: 1.55, margin: "14px 0 12px" }}>
              {idioma === "en"
                ? `Sometimes a conflict has more than one origin. Without stating this is your case, some situations that often accompany “${r.termino.toLowerCase()}” are:`
                : idioma === "fr"
                ? `Parfois, un conflit a plusieurs origines. Sans affirmer que ce soit votre cas, certaines situations qui accompagnent souvent « ${r.termino.toLowerCase()} » sont :`
                : idioma === "it"
                ? `A volte un conflitto ha più di un'origine. Senza affermare che sia il tuo caso, alcune situazioni che spesso accompagnano “${r.termino.toLowerCase()}” sono:`
                : `A veces un conflicto tiene más de un origen. Sin afirmar que sea tu caso, algunas situaciones que suelen acompañar a “${r.termino.toLowerCase()}” son:`}
            </p>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              {r.otrasCausas.map((c, i) => (
                <li key={i} style={{ fontSize: 12.5, color: highlight, lineHeight: 1.5 }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvisoBienestar({ tema, idioma }) {
  const borderColor = tema ? tema.stroke : LINE;
  const darkColor = tema ? tema.dark : SAGE_DARK;
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.65)",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: "10px 14px",
        marginTop: 18,
        marginBottom: 8,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={darkColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.45 }}>
        {t("Esta lectura es un acompañamiento emocional consciente. Prioriza siempre la consulta con un profesional ante cualquier síntoma físico o psicológico.", idioma)}
      </p>
    </div>
  );
}

function IconoCapaBiologica({ capa, color, size = 15 }) {
  const c = (capa || "").toLowerCase();
  if (c.includes("emoc") || c.includes("feel")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    );
  }
  if (c.includes("ecto")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    );
  }
  if (c.includes("meso")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 8v8"/>
        <path d="M8 12h8"/>
      </svg>
    );
  }
  if (c.includes("endo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 3a9 9 0 0 0 0 18v-9Z"/>
      </svg>
    );
  }
  if (c.includes("nerv")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
    </svg>
  );
}

function GuiaRespiracion1Min({ tema, idioma }) {
  const [activo, setActivo] = React.useState(false);
  const [fase, setFase] = React.useState("inhala");
  const [segundos, setSegundos] = React.useState(60);

  React.useEffect(() => {
    if (!activo) return;
    const interval = setInterval(() => {
      setSegundos((s) => {
        if (s <= 1) {
          setActivo(false);
          return 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activo]);

  React.useEffect(() => {
    if (!activo) return;
    const loop = setInterval(() => {
      setFase((f) => (f === "inhala" ? "sosten" : f === "sosten" ? "exhala" : "inhala"));
    }, 4000);
    return () => clearInterval(loop);
  }, [activo]);

  const textoFase = {
    inhala: t("Inhala suavemente hacia tu pecho...", idioma) || "Inhala suavemente...",
    sosten: t("Siente la calma que te sostiene...", idioma) || "Siente la calma...",
    exhala: t("Suelta y afloja los hombros...", idioma) || "Suelta y afloja..."
  };

  return (
    <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(255,255,255,0.85)", borderRadius: 12, border: `1px solid ${tema.stroke}` }}>
      {!activo ? (
        <button
          onClick={() => { setActivo(true); setSegundos(60); setFase("inhala"); }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "9px 12px",
            background: tema.tint,
            border: `1px solid ${tema.stroke}`,
            borderRadius: 10,
            color: tema.dark,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {t("Pausar y respirar 1 minuto con este sentir", idioma) || "Pausar y respirar 1 minuto con este sentir"}
        </button>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "6px 0" }}>
          <div style={{
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${tema.tint} 30%, ${tema.stroke} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: fase === "inhala" ? "scale(1.22)" : fase === "sosten" ? "scale(1.18)" : "scale(0.88)",
            transition: "transform 3.8s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: `0 0 22px ${tema.glow || "rgba(0,0,0,0.08)"}`
          }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: tema.dark }}>{segundos}s</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: tema.highlight }}>
            {textoFase[fase]}
          </span>
          <button
            onClick={() => setActivo(false)}
            style={{
              background: "none",
              border: "none",
              color: MUTED,
              fontSize: 11,
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0
            }}
          >
            {t("Terminar pausa", idioma) || "Terminar pausa"}
          </button>
        </div>
      )}
    </div>
  );
}

function SintonometroResonancia({ tema, idioma }) {
  const [resonancia, setResonancia] = React.useState(null);

  const opciones = [
    { 
      id: "mucho", 
      label: t("🌱 Resuena profundo", idioma) || "🌱 Resuena profundo", 
      mensaje: t("Tu cuerpo ya reconoce la verdad de este patrón; honra este momento de claridad.", idioma) || "Tu cuerpo ya reconoce la verdad de este patrón; honra este momento de claridad." 
    },
    { 
      id: "parte", 
      label: t("🌾 En parte", idioma) || "🌾 En parte", 
      mensaje: t("Toma solo lo que te resuene hoy; lo demás se acomodará suavemente a su tiempo.", idioma) || "Toma solo lo que te resuene hoy; lo demás se acomodará suavemente a su tiempo." 
    },
    { 
      id: "procesando", 
      label: t("🔍 Lo estoy asimilando", idioma) || "🔍 Lo estoy asimilando", 
      mensaje: t("Permítete observar sin prisa. Nombrar algo nuevo requiere una digestión amable.", idioma) || "Permítete observar sin prisa. Nombrar algo nuevo requiere una digestión amable." 
    },
  ];

  return (
    <div style={{
      background: "#ffffff",
      border: `1px solid ${tema.stroke}`,
      borderRadius: 16,
      padding: "16px 18px",
      marginBottom: 16,
      boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tema.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="m4.93 4.93 4.24 4.24"/>
          <path d="m14.83 9.17 4.24-4.24"/>
          <path d="m14.83 14.83 4.24 4.24"/>
          <path d="m9.17 14.83-4.24 4.24"/>
        </svg>
        <h4 style={{ fontSize: 12.5, fontWeight: 700, color: tema.dark, margin: 0 }}>
          {t("¿Qué tanto resuena esta lectura en tu cuerpo?", idioma) || "¿Qué tanto resuena esta lectura en tu cuerpo?"}
        </h4>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: resonancia ? 10 : 0 }}>
        {opciones.map((op) => (
          <button
            key={op.id}
            onClick={() => setResonancia(op.id)}
            style={{
              flex: 1,
              minWidth: 100,
              padding: "8px 10px",
              borderRadius: 10,
              border: `1px solid ${resonancia === op.id ? tema.accent || tema.dark : tema.stroke}`,
              background: resonancia === op.id ? tema.tint : "#faf9fc",
              color: resonancia === op.id ? tema.highlight : INK,
              fontSize: 11.5,
              fontWeight: resonancia === op.id ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
              textAlign: "center"
            }}
          >
            {op.label}
          </button>
        ))}
      </div>

      {resonancia && (
        <div style={{
          padding: "10px 12px",
          background: tema.tint,
          borderRadius: 10,
          border: `1px solid ${tema.stroke}`,
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <span style={{ fontSize: 13 }}>✨</span>
          <p style={{ fontSize: 11.5, color: tema.highlight, margin: 0, lineHeight: 1.45, fontWeight: 500 }}>
            {opciones.find(o => o.id === resonancia)?.mensaje}
          </p>
        </div>
      )}
    </div>
  );
}

function ScreenLecturaBienestar({
  resultados,
  datos,
  nombre,
  sexo,
  onPaywall,
  onBack,
  idioma,
  nacimiento,
  retoDiaActual,
  retoCompletados,
  entradasCount,
  apodo,
  usuarioContexto
}) {
  const [guardadoEnDiario, setGuardadoEnDiario] = React.useState(false);

  const invalido = resultados && resultados[0] && resultados[0].__invalido;
  if (invalido) {
    const n = nombre || "";
    const mensajes = {
      prueba: {
        titulo: t("No logramos leer bien tu mensaje", idioma),
        cuerpo: idioma === "en"
          ? `${n ? n + ", with" : "With"} the information you shared, we cannot provide a reliable reading yet. The text might be incomplete or difficult to recognize. Tell us in your own words what is happening or what physical symptom you feel, and we'll gladly try again.`
          : idioma === "fr"
          ? `${n ? n + ", avec" : "Avec"} les informations partagées, nous ne pouvons pas encore vous proposer une lecture fiable. Le texte semble incomplet ou difficile à interpréter. Racontez-nous avec vos propres mots ce qui se passe ou le symptôme physique que vous ressentez, et nous réessaierons avec plaisir.`
          : idioma === "it"
          ? `${n ? n + ", con" : "Con"} le informazioni che hai condiviso non possiamo ancora offrirti una lettura affidabile. Il testo potrebbe essere incompleto o difficile da riconoscere. Raccontaci con parole tue cosa ti sta accadendo o quale sintomo fisico avverti, e riproveremo volentieri.`
          : `${n ? n + ", c" : "C"}on la información que compartiste no podemos ofrecerte una lectura confiable todavía. Puede que el texto haya salido incompleto, repetido o difícil de reconocer. Cuéntanos con tus propias palabras qué te está pasando, o qué síntoma físico sientes, y lo intentamos de nuevo con gusto.`,
      },
      insuficiente: {
        titulo: t("Necesitamos un poco más para acompañarte", idioma),
        cuerpo: idioma === "en"
          ? `${n ? n + ", what" : "What"} you shared is too brief to produce a reliable reading. Tell us in more detail what you are going through, where in your body you feel discomfort, or what emotion accompanies you. The more you tell us, the better we can guide you.`
          : idioma === "fr"
          ? `${n ? n + ", ce" : "Ce"} que vous avez partagé est trop bref pour une lecture fiable. Racontez-nous plus en détail ce que vous traversez, où vous ressentez une gêne corporelle ou quelle émotion vous accompagne. Plus vous nous en direz, mieux nous pourrons vous orienter.`
          : idioma === "it"
          ? `${n ? n + ", quanto" : "Quanto"} hai condiviso è troppo breve per elaborare una lettura affidabile. Raccontaci con più dettagli cosa stai vivendo, dove avverti fastidio nel corpo o quale emozione ti accompagna. Più informazioni ci dai, meglio possiamo orientarti.`
          : `${n ? n + ", l" : "L"}o que compartiste es muy breve para hacer una lectura confiable. Cuéntanos con más detalle qué estás viviendo, dónde sientes molestia en el cuerpo, o qué emoción te acompaña. Mientras más nos digas, mejor podemos orientarte.`,
      },
      vacio: {
        titulo: t("No recibimos información", idioma),
        cuerpo: t("Vuelve al paso anterior y comparte con nosotros qué te trae por aquí hoy. Puede ser tu historia, un síntoma físico o una emoción.", idioma),
      },
    };
    const m = mensajes[invalido] || mensajes.insuficiente;
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Tu lectura de bienestar", idioma)} onBack={onBack} />
        <div style={{ flex: 1, marginTop: 6, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, textAlign: "center", padding: "0 6px" }}>
          <span style={{ fontSize: 34 }} aria-hidden="true">&#128144;</span>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 22, color: INK, margin: 0, fontWeight: 500 }}>
            {m.titulo}
          </h2>
          <p style={{ fontSize: 14, color: MUTED, margin: 0, lineHeight: 1.6 }}>{m.cuerpo}</p>
        </div>
        <button className="ss-btn ss-btn-primary" style={{ width: "100%", marginTop: 12 }} onClick={onBack}>
          {t("Volver e intentar de nuevo", idioma)}
        </button>
      </div>
    );
  }

  const ctx = usuarioContexto || {
    nombre,
    apodo,
    sexo,
    nacimiento,
    retoDiaActual,
    retoCompletados,
    entradasCount,
  };

  const narrativa = generarNarrativaBienestar(nombre, sexo, datos, resultados, idioma, ctx);
  const capaPrincipal = resultados && resultados.length > 0 ? resultados[0].capa : "Emoción";
  const rPrincipal = resultados && resultados.length > 0 ? resultados[0] : null;

  const THEMES_POR_CAPA = {
    "Emoción": { 
      tint: "#f5f0fb", 
      dark: "#6c4d9e", 
      bg: "linear-gradient(180deg, #fbf8fd 0%, #f4eef9 100%)", 
      iconColor: "#7c55b5", 
      stroke: "#e5dcf2", 
      highlight: "#3c2561",
      accent: "#8a5fc7",
      glow: "rgba(138, 95, 199, 0.15)",
      pillBg: "#ede5f7",
      badgeText: t("Capa Emocional · Puerto Seguro", idioma) || "Capa Emocional · Puerto Seguro"
    },
    "Ectodermo": { 
      tint: "#eef6f2", 
      dark: "#2d634f", 
      bg: "linear-gradient(180deg, #f7faf8 0%, #edf5f0 100%)", 
      iconColor: "#397d64", 
      stroke: "#d0e4d9", 
      highlight: "#1e4436",
      accent: "#459678",
      glow: "rgba(69, 150, 120, 0.15)",
      pillBg: "#e0efe7",
      badgeText: t("Capa Ectodérmica · Contacto y Relación", idioma) || "Capa Ectodérmica · Contacto y Relación"
    },
    "Mesodermo": { 
      tint: "#fdf3f0", 
      dark: "#964531", 
      bg: "linear-gradient(180deg, #fdf9f7 0%, #faede8 100%)", 
      iconColor: "#ba553c", 
      stroke: "#f3d3c8", 
      highlight: "#682e20",
      accent: "#d4664b",
      glow: "rgba(212, 102, 75, 0.15)",
      pillBg: "#fae2db",
      badgeText: t("Capa Mesodérmica · Estructura y Valor", idioma) || "Capa Mesodérmica · Estructura y Valor"
    },
    "Endodermo": { 
      tint: "#fff6eb", 
      dark: "#995200", 
      bg: "linear-gradient(180deg, #fffcf7 0%, #fcf0df 100%)", 
      iconColor: "#c26d0e", 
      stroke: "#f7dfbe", 
      highlight: "#663600",
      accent: "#d97d18",
      glow: "rgba(217, 125, 24, 0.15)",
      pillBg: "#fcedd7",
      badgeText: t("Capa Endodérmica · Nutrición y Asimilación", idioma) || "Capa Endodérmica · Nutrición y Asimilación"
    },
    "Sistema nervioso": { 
      tint: "#edf6fc", 
      dark: "#1c5d8a", 
      bg: "linear-gradient(180deg, #f6fafd 0%, #e9f3fa 100%)", 
      iconColor: "#2579b3", 
      stroke: "#cbe3f5", 
      highlight: "#123e5c",
      accent: "#2f92d4",
      glow: "rgba(47, 146, 212, 0.15)",
      pillBg: "#dcecf7",
      badgeText: t("Sistema Nervioso · Regulación Somática", idioma) || "Sistema Nervioso · Regulación Somática"
    },
    "default": { 
      tint: SAGE_TINT, 
      dark: SAGE_DARK, 
      bg: "linear-gradient(180deg, #fafbf9 0%, #f2f5f1 100%)", 
      iconColor: SAGE_DARK, 
      stroke: LINE, 
      highlight: INK,
      accent: SAGE_DARK,
      glow: "rgba(63, 107, 91, 0.12)",
      pillBg: "#e3eee7",
      badgeText: t("Lectura de Bienestar Somático", idioma) || "Lectura de Bienestar Somático"
    }
  };

  const tema = THEMES_POR_CAPA[capaPrincipal] || THEMES_POR_CAPA["default"];

  // Group paragraphs into structured semantic chapters
  const parrafosTotal = [...narrativa];
  const pIntro = parrafosTotal.length > 0 ? parrafosTotal[0] : "";
  const restoParrafos = parrafosTotal.slice(1);

  let pJornada = "";
  let pPolaridad = "";
  let pRelatoFisico = "";
  const pSistemicos = [];
  let pEjemplo = "";
  let pSegundoHilo = "";
  let pBrujula = "";
  let pCierre = "";
  const parrafosGenerales = [];

  restoParrafos.forEach((p) => {
    const pLow = p.toLowerCase();
    if (pLow.includes("invitación práctica") || pLow.includes("invitation concrète") || pLow.includes("invito pratico") || pLow.includes("practical invitation") || pLow.includes("brújula viva")) {
      pBrujula = p;
    } else if (pLow.includes("gracias por honrar") || pLow.includes("thank you for honoring") || pLow.includes("merci d'honorer") || pLow.includes("grazie per dedicarti") || pLow.includes("soltar empieza por nombrar")) {
      pCierre = p;
    } else if (pLow.includes("en tu día a día") || pLow.includes("para que se sienta más concreto") || pLow.includes("imagina a alguien") || pLow.includes("imagine someone") || pLow.includes("imaginez quelqu'un") || pLow.includes("immagina qualcuno")) {
      pEjemplo = p;
    } else if (pLow.includes("constelaciones") || pLow.includes("lealtad") || pLow.includes("transgeneracional") || pLow.includes("sistémica") || pLow.includes("duelo") || pLow.includes("pareja") || pLow.includes("laboral") || pLow.includes("árbol familiar")) {
      pSistemicos.push(p);
    } else if (pLow.includes("primer paso") || pLow.includes("día ") || pLow.includes("day ") || pLow.includes("jour ") || pLow.includes("giorno ") || pLow.includes("21 días") || pLow.includes("21-day")) {
      pJornada = p;
    } else if (pLow.includes("vagal") || pLow.includes("expansión") || pLow.includes("coherencia cardíaca") || pLow.includes("alegría") || pLow.includes("gratitud") || pLow.includes("convivencia") || pLow.includes("alarma biológica") || pLow.includes("señal biológica")) {
      pPolaridad = p;
    } else if (pLow.includes("en lo que escribiste") || pLow.includes("que coincidan") || pLow.includes("in what you wrote") || pLow.includes("puente directo") || pLow.includes("compartiste:")) {
      pRelatoFisico = p;
    } else if (pLow.includes("segundo hilo") || pLow.includes("deuxième fil") || pLow.includes("secondo filo") || pLow.includes("complementary thread")) {
      pSegundoHilo = p;
    } else {
      parrafosGenerales.push(p);
    }
  });

  const rawHistoria = (datos?.historia || "").trim();
  const tieneHistoriaEscrita = rawHistoria.length > 5;

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column", background: tema.bg, margin: "-22px -22px 0", paddingTop: 22 }}>
      <TopBar title={t("Tu lectura de bienestar", idioma)} onBack={onBack} />
      
      <div style={{ flex: 1, marginTop: 4, overflowY: "auto", padding: "0 22px" }}>
        
        {/* Breathing awareness pulse bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "7px 14px",
          borderRadius: 999,
          background: "rgba(255, 255, 255, 0.8)",
          border: `1px solid ${tema.stroke}`,
          marginBottom: 16,
          boxShadow: "0 1px 6px rgba(0,0,0,0.02)"
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: tema.accent || tema.dark,
            boxShadow: `0 0 8px ${tema.accent || tema.dark}`
          }} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: tema.dark, letterSpacing: 0.2 }}>
            {tema.badgeText}
          </span>
        </div>

        {/* Hero Diagnostic Card */}
        {rPrincipal && (
          <div style={{
            background: "#ffffff",
            border: `1px solid ${tema.stroke}`,
            borderRadius: 18,
            padding: "20px 20px 18px",
            marginBottom: 16,
            boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: -24,
              right: -24,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${tema.tint} 0%, rgba(255,255,255,0) 70%)`,
              pointerEvents: "none"
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: tema.tint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <IconoCapaBiologica capa={rPrincipal.capa} color={tema.iconColor} size={15} />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: tema.dark, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {t(rPrincipal.capa, idioma)}
              </span>
            </div>

            <h1 style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 24,
              fontWeight: 600,
              color: tema.highlight,
              margin: "0 0 10px 0",
              lineHeight: 1.25
            }}>
              {rPrincipal.termino}
            </h1>

            {rPrincipal.sentido && (
              <div style={{
                background: tema.tint,
                borderLeft: `3px solid ${tema.accent || tema.dark}`,
                borderRadius: "0 8px 8px 0",
                padding: "10px 14px",
                marginTop: 6,
                marginBottom: 12
              }}>
                <p style={{
                  fontSize: 12.5,
                  color: tema.highlight,
                  lineHeight: 1.5,
                  margin: 0,
                  fontStyle: "italic",
                  fontWeight: 500
                }}>
                  "{rPrincipal.sentido}"
                </p>
              </div>
            )}

            {/* Diagnostic Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {resultados.map((r, idx) => (
                <div
                  key={r.id || idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: idx === 0 ? tema.pillBg || tema.tint : "#faf9fc",
                    border: `1px solid ${tema.stroke}`,
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: tema.dark,
                  }}
                >
                  <IconoCapaBiologica capa={r.capa} color={tema.iconColor} size={13} />
                  <span>{r.termino}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Intimate Voice Pull-Quote (if user shared their personal story) */}
        {tieneHistoriaEscrita && (
          <div style={{
            background: "#ffffff",
            border: `1px solid ${tema.stroke}`,
            borderLeft: `4px solid ${tema.accent || tema.dark}`,
            borderRadius: 14,
            padding: "15px 18px",
            marginBottom: 14,
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tema.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 7 4 8 7 8z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 7 4 8 7 8z"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: tema.dark, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {t("Lo que nombró tu voz", idioma) || "Lo que nombró tu voz"}
              </span>
            </div>
            <p style={{ fontSize: 13, fontStyle: "italic", color: tema.highlight, lineHeight: 1.55, margin: 0 }}>
              "{rawHistoria}"
            </p>
          </div>
        )}

        {/* Capítulo 1: El Espejo de tu Sentir */}
        <div style={{
          background: "white",
          border: `1px solid ${tema.stroke}`,
          borderRadius: 16,
          padding: "18px 18px",
          marginBottom: 14,
          boxShadow: "0 3px 12px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tema.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
            </svg>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: tema.highlight, margin: 0, fontWeight: 600 }}>
              {t("El espejo de tu sentir", idioma) || "El espejo de tu sentir"}
            </h3>
          </div>

          <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 10px 0" }}>
            {pIntro}
          </p>

          {pRelatoFisico && (
            <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "10px 0 0 0" }}>
              {pRelatoFisico}
            </p>
          )}
        </div>

        {/* Capítulo 2: El Sentido Biológico Oculto & Vignette Cotidiana */}
        {(pEjemplo || pSistemicos.length > 0 || pSegundoHilo) && (
          <div style={{
            background: "white",
            border: `1px solid ${tema.stroke}`,
            borderRadius: 16,
            padding: "18px 18px",
            marginBottom: 14,
            boxShadow: "0 3px 12px rgba(0,0,0,0.02)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tema.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: tema.highlight, margin: 0, fontWeight: 600 }}>
                {t("El mensaje biológico profundo", idioma) || "El mensaje biológico profundo"}
              </h3>
            </div>

            {/* Everyday life vignette callout */}
            {pEjemplo && (
              <div style={{
                background: tema.tint,
                border: `1px solid ${tema.stroke}`,
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 12
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>💡</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: tema.dark, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    {t("En tu día a día", idioma) || "En tu día a día"}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: tema.highlight, lineHeight: 1.55, margin: 0 }}>
                  {pEjemplo}
                </p>
              </div>
            )}

            {/* Systemic or family loyalties */}
            {pSistemicos.map((sist, i) => (
              <div key={i} style={{
                background: "#fdfbf7",
                border: "1px solid #f0e6d8",
                borderRadius: 12,
                padding: "12px 14px",
                marginTop: 10
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 14 }}>🌿</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#7a5933", textTransform: "uppercase", letterSpacing: 0.4 }}>
                    {t("Mirada sistémica y familiar", idioma) || "Mirada sistémica y familiar"}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: "#543d22", lineHeight: 1.55, margin: 0 }}>
                  {sist}
                </p>
              </div>
            ))}

            {pSegundoHilo && (
              <p style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, margin: "12px 0 0 0" }}>
                {pSegundoHilo}
              </p>
            )}
          </div>
        )}

        {/* Capítulo 3: Tu Momento en el Camino & Recursos Somáticos */}
        {(pJornada || pPolaridad) && (
          <div style={{
            background: "white",
            border: `1px solid ${tema.stroke}`,
            borderRadius: 16,
            padding: "18px 18px",
            marginBottom: 14,
            boxShadow: "0 3px 12px rgba(0,0,0,0.02)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tema.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: tema.highlight, margin: 0, fontWeight: 600 }}>
                {t("Tu momento y recursos de regulación", idioma) || "Tu momento y recursos de regulación"}
              </h3>
            </div>

            {pJornada && (
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 12px",
                background: "#fafafc",
                borderRadius: 10,
                border: `1px solid ${tema.stroke}`,
                marginBottom: pPolaridad ? 10 : 0
              }}>
                <span style={{ fontSize: 15, marginTop: 1 }}>🌱</span>
                <p style={{ fontSize: 12.5, color: INK, lineHeight: 1.55, margin: 0 }}>
                  {pJornada}
                </p>
              </div>
            )}

            {pPolaridad && (
              <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "8px 0 0 0" }}>
                {pPolaridad}
              </p>
            )}
          </div>
        )}

        {/* General unclassified paragraphs if any */}
        {parrafosGenerales.map((pg, i) => (
          <div key={i} style={{
            background: "white",
            border: `1px solid ${tema.stroke}`,
            borderRadius: 16,
            padding: "16px 18px",
            marginBottom: 14,
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
          }}>
            <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: 0 }}>
              {pg}
            </p>
          </div>
        ))}

        {/* Capítulo 4: Tu Brújula Práctica de Hoy (Compass & Interactive Anchor) */}
        {(pBrujula || pCierre) && (
          <div style={{
            background: "linear-gradient(180deg, #ffffff 0%, #fdfcfa 100%)",
            border: `1.5px solid ${tema.accent || tema.dark}`,
            borderRadius: 18,
            padding: "20px 18px",
            marginBottom: 16,
            boxShadow: `0 4px 18px ${tema.glow || "rgba(0,0,0,0.04)"}`
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tema.accent || tema.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
                <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: tema.highlight, margin: 0, fontWeight: 700 }}>
                  {t("Tu brújula práctica de hoy", idioma) || "Tu brújula práctica de hoy"}
                </h3>
              </div>
              <span style={{ fontSize: 16 }}>🧭</span>
            </div>

            {pBrujula && (
              <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.65, margin: "0 0 12px 0", fontWeight: 500 }}>
                {pBrujula}
              </p>
            )}

            {/* Interactive 1-Minute Grounding Breath Guide */}
            <GuiaRespiracion1Min tema={tema} idioma={idioma} />

            {/* Save to journal action */}
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button
                onClick={() => setGuardadoEnDiario(true)}
                style={{
                  background: guardadoEnDiario ? "#edf7ed" : "none",
                  border: `1px solid ${guardadoEnDiario ? "#a3d9a5" : tema.stroke}`,
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: guardadoEnDiario ? "#2e7d32" : tema.dark,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.2s ease"
                }}
              >
                <span>{guardadoEnDiario ? "✓" : "📝"}</span>
                <span>{guardadoEnDiario ? (t("✓ Guardado en tus reflexiones", idioma) || "✓ Guardado en tus reflexiones") : (t("Guardar en mi diario", idioma) || "Guardar en mi diario")}</span>
              </button>
            </div>

            {pCierre && (
              <div style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: `1px solid ${tema.stroke}`
              }}>
                <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55, margin: 0, fontStyle: "italic" }}>
                  {pCierre}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Interactive Resonometer */}
        <SintonometroResonancia tema={tema} idioma={idioma} />

        {/* Deepen: Other Causes & Sources */}
        <CajaOtrasCausas resultados={resultados} tema={tema} idioma={idioma} />
        <CajaFuente resultados={resultados} tema={tema} idioma={idioma} />

        {/* Soft, supportive disclaimer note at bottom */}
        <AvisoBienestar tema={tema} idioma={idioma} />
      </div>
      
      {/* Bottom CTA to continue plan */}
      <div style={{ padding: "0 22px" }}>
        <button className="ss-btn ss-btn-premium" style={{ width: "100%", marginTop: 14 }} onClick={onPaywall}>
          {t("Ver mi plan de sanación completo", idioma)}
        </button>
      </div>
    </div>
  );
}

const PLANES_PAGO = [
  {
    id: "prueba",
    nombre: "Prueba",
    precio: "Gratis",
    precioUSD: "",
    periodo: "3 días",
    resumen: "Tres días para conocer la app. Comienza tu proceso de sanación y autoconocimiento con acceso completo a los módulos.",
    incluye: [
      "Acceso completo por 3 días",
      "Reto de 21 días (comienza tu proceso)",
      "Herramientas de calma sin límite",
      "Perspectivas de bienestar",
    ],
    noIncluye: [
      "Directorio de especialistas",
    ],
    notaPago: "Disfruta de 3 días de acceso completo desde tu registro.",
    destacado: false,
  },
  {
    id: "mensual",
    nombre: "Mensual",
    precio: "45.000 COP",
    precioUSD: "~11 USD/mes",
    periodo: "por mes",
    resumen: "Acompañamiento completo mes a mes. Acceso a todas las herramientas de la app.",
    incluye: [
      "Reto de 21 días completo",
      "Todas las perspectivas de bienestar",
      "Herramientas de calma sin límite",
    ],
    noIncluye: ["Directorio de especialistas"],
    notaPago: "",
    destacado: false,
  },
  {
    id: "anual",
    nombre: "Anual",
    precio: "118.000 COP",
    precioUSD: "~29 USD / año",
    periodo: "por año",
    resumen: "El plan completo. Incluye directorio de especialistas y todas las herramientas.",
    ahorro: "Equivale a 9.833 COP/mes — ahorras más del 78 % vs el mensual.",
    incluye: [
      "Reto de 21 días completo",
      "Todas las perspectivas de bienestar",
      "Herramientas de calma sin límite",
      "Directorio de especialistas",
    ],
    noIncluye: [],
    notaPago: "",
    destacado: true,
  },
];

function ScreenPostRegistro({ onNext, idioma }) {
  const menuCtx = React.useContext(MenuContext);
  const [paso, setPaso] = React.useState(0);
  
  const slides = [
    {
      title: t("Bienvenido a tu nuevo refugio", idioma),
      desc: t("Tu cuenta ha sido creada. Prepárate para iniciar un viaje de autoconocimiento. Aquí aprenderás a escuchar tus emociones sin juicios y a soltar lo que ya no te sirve.", idioma),
      icon: "✨"
    },
    {
      title: t("Profundiza en tu proceso", idioma),
      desc: t("Disfruta de tus 3 días de prueba completa. Nuestra suscripción Premium te ofrece acompañamiento continuo, análisis emocionales completos y acceso permanente a todos los días del reto.", idioma),
      icon: "🌱"
    },
    {
      title: t("Tu camino, a tu ritmo", idioma),
      desc: t("A continuación te mostraremos nuestros planes. Elige el que mejor te acompañe hoy; siempre podrás comenzar tu prueba y evolucionar cuando estés listo.", idioma),
      icon: "🤍"
    }
  ];

  return (
    <div className="ss-fade" style={{ padding: "18px 24px 32px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        {menuCtx?.onOpenMenu && (
          <HamburgerButton onClick={menuCtx.onOpenMenu} label={t("Abrir menú de navegación", idioma) || "Abrir menú"} />
        )}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 24 }} className="ss-onda-3">{slides[paso].icon}</div>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 600, color: SAGE_DARK, marginBottom: 16 }}>{slides[paso].title}</h2>
        <p style={{ fontSize: 15, color: INK, lineHeight: 1.6, marginBottom: 40, maxWidth: 300 }}><ResaltarMarca>{slides[paso].desc}</ResaltarMarca></p>
        
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          {slides.map((_, i) => (
            <div key={i} style={{ width: i === paso ? 24 : 8, height: 8, borderRadius: 4, background: i === paso ? SAGE : "rgba(111,168,146,0.2)", transition: "all 0.3s ease" }} />
          ))}
        </div>
        
        <button
          className="ss-btn ss-btn-primary"
          style={{ width: "100%", padding: "16px", fontSize: "16px" }}
          onClick={() => {
            if (paso < slides.length - 1) setPaso(p => p + 1);
            else onNext();
          }}
        >
          {paso < slides.length - 1 ? t("Siguiente", idioma) : t("Ver planes", idioma)}
        </button>
      </div>
    </div>
  );
}

function ScreenPaywall({ onPagar, onSaltar, onBack, idioma, pruebaExpirada = false, enPruebaActiva = false, diasRestantesPrueba = 0, onRestaurarCompras = null, currentUser = null, onRequerirAuth = null }) {
  const [planElegido, setPlanElegido] = useState(pruebaExpirada ? "anual" : "anual");
  const [verDetalles, setVerDetalles] = useState(false);
  const plan = PLANES_PAGO.find((p) => p.id === planElegido) || PLANES_PAGO[2];
  const esGratisPlan = planElegido === "prueba";
  const estaAutenticado = !!(currentUser || auth?.currentUser);

  const getIconForFeature = (text) => {
    const t = text.toLowerCase();
    if (t.includes("reto") || t.includes("21")) return Calendar;
    if (t.includes("calma") || t.includes("herramientas")) return Activity;
    if (t.includes("perspectivas") || t.includes("hub") || t.includes("capas")) return Compass;
    if (t.includes("especialistas") || t.includes("directorio")) return Users;
    return Sparkles;
  };

  const planTheme = {
    prueba: {
      color: SAGE,
      darkColor: SAGE_DARK,
      tint: SAGE_TINT,
      icon: Compass,
      desc: t("Excelente para dar tus primeros pasos y explorar las herramientas de calma.", idioma)
    },
    mensual: {
      color: LAVENDER,
      darkColor: "#594d75",
      tint: LAVENDER_TINT,
      icon: Sparkles,
      desc: t("Ideal para ir a tu propio ritmo con acompañamiento continuo mes a mes.", idioma)
    },
    anual: {
      color: KINOEMOTION_UI,
      darkColor: KINOEMOTION,
      tint: KINOEMOTION_TINT,
      icon: Award,
      desc: t("El camino definitivo de sanación. Acceso total a especialistas, herramientas y acompañamiento integral.", idioma)
    }
  }[planElegido];

  return (
    <div className="ss-fade" style={{ padding: "0 0 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Elige tu plan", idioma)} onBack={onBack} />
      
      <div style={{ flex: 1, overflowY: "auto", padding: "0 22px" }} className="ss-no-scrollbar">
        {/* Cabecera Inspiracional */}
        <div style={{ textAlign: "center", margin: "16px 0 16px" }}>
          <p style={{ 
            fontFamily: FONT_DISPLAY, 
            fontStyle: "italic", 
            fontSize: 16, 
            color: INK, 
            lineHeight: 1.5,
            maxWidth: 290,
            margin: "0 auto 12px"
          }}>
            {t("Invierte en tu paz mental. Elige el plan que mejor abrace tu momento actual.", idioma)}
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: "5px 12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
          }}>
            <GooglePlayIcon size={15} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>
              Google Play Billing
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#94a3b8" }} />
            <span style={{ fontSize: 10.5, color: "#64748b" }}>
              {t("3 días gratis · Cancela en 1 toque", idioma)}
            </span>
          </div>
        </div>

        {/* Notificación nativa de cuenta requerida si el usuario no ha iniciado sesión */}
        {!estaAutenticado && (
          <div style={{
            background: "#fff8f6",
            border: "1.5px solid #f9d8ce",
            borderRadius: 16,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 2px 8px rgba(224, 122, 95, 0.08)"
          }}>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(224, 122, 95, 0.15)",
              color: "#B24C35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <Lock size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#8a3a20", margin: "0 0 2px" }}>
                {t("Cuenta requerida para continuar", idioma)}
              </p>
              <p style={{ fontSize: 11.5, color: "#6e3b2e", margin: 0, lineHeight: 1.35 }}>
                {t("Regístrate o inicia sesión para poder activar tus 3 días de prueba gratuita o proceder a pagar tu suscripción.", idioma)}
              </p>
            </div>
          </div>
        )}

        {/* Tarjetas de Plan con Arquitectura de Precios Persuasiva */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {PLANES_PAGO.map((p) => {
            const activo = planElegido === p.id;
            
            // Colores personalizados por tarjeta
            const isAnual = p.id === "anual";
            const borderCol = activo 
              ? (isAnual ? KINOEMOTION_UI : SAGE_DARK) 
              : LINE;
            
            const bgCol = activo 
              ? (isAnual ? KINOEMOTION_TINT : SAGE_TINT) 
              : "white";

            return (
              <button
                key={p.id}
                onClick={() => setPlanElegido(p.id)}
                style={{
                  position: "relative",
                  border: activo ? `2.5px solid ${borderCol}` : `1.5px solid ${borderCol}`,
                  borderRadius: 18,
                  background: bgCol,
                  cursor: "pointer",
                  padding: isAnual ? "18px 8px 14px" : "16px 8px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 140,
                  gap: 4,
                  fontFamily: FONT_BODY,
                  boxShadow: activo 
                    ? `0 6px 18px ${isAnual ? "rgba(184,90,63,0.12)" : "rgba(63,107,91,0.08)"}` 
                    : "none",
                  transform: activo ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Badge flotante destacado para el plan Anual */}
                {isAnual && (
                  <span style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: KINOEMOTION,
                    color: "white",
                    fontSize: 8.5,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 100,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    whiteSpace: "nowrap",
                    boxShadow: "0 3px 6px rgba(214,71,43,0.2)"
                  }}>
                    ✨ {t("Ahorra 78%", idioma)}
                  </span>
                )}

                {/* Encabezado de la Tarjeta */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ 
                    fontSize: 10, 
                    fontWeight: 800, 
                    color: activo ? borderCol : MUTED, 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em" 
                  }}>
                    {t(p.nombre, idioma) || p.nombre}
                  </span>
                  
                  {/* Selector visual */}
                  <span style={{
                    width: 15, height: 15,
                    borderRadius: "50%",
                    border: `1.5px solid ${activo ? borderCol : LINE}`,
                    background: activo ? borderCol : "transparent",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    color: "white", 
                    fontSize: 8,
                    fontWeight: 900
                  }}>
                    {activo ? "✓" : ""}
                  </span>
                </div>

                {/* Precio Promocional Inteligente */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {p.id === "anual" ? (
                    <>
                      <span style={{ fontSize: 16, fontWeight: 900, color: KINOEMOTION_UI, lineHeight: 1.1 }}>
                        9.833
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: KINOEMOTION_UI, textTransform: "uppercase", letterSpacing: 0.2 }}>
                        COP / {t("mes", idioma)}
                      </span>
                    </>
                  ) : p.id === "mensual" ? (
                    <>
                      <span style={{ fontSize: 16, fontWeight: 800, color: activo ? SAGE_DARK : INK, lineHeight: 1.1 }}>
                        45.000
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: MUTED }}>
                        COP / {t("mes", idioma)}
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 16, fontWeight: 800, color: activo ? SAGE_DARK : INK, lineHeight: 1.1 }}>
                        {pruebaExpirada ? t("Agotada", idioma) : t("Gratis", idioma)}
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: pruebaExpirada ? "#dc2626" : MUTED }}>
                        3 {t("días", idioma)}
                      </span>
                    </>
                  )}
                </div>

                {/* Mini etiqueta de cobro real */}
                <span style={{ 
                  fontSize: 8.5, 
                  color: activo ? borderCol : MUTED, 
                  textAlign: "center",
                  fontWeight: activo ? 600 : 400,
                  opacity: 0.95
                }}>
                  {p.id === "anual" ? t("Factura anual", idioma) : p.id === "mensual" ? t("Suscripción libre", idioma) : (pruebaExpirada ? t("Período cumplido", idioma) : t("Sin costo inicial", idioma))}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detalle Enriquecido y Sensorial del Plan Seleccionado */}
        <div style={{
          background: "white",
          border: `1.5px solid ${planTheme.color}30`,
          borderRadius: 20, 
          padding: "18px 20px", 
          marginBottom: 16,
          boxShadow: `0 8px 24px rgba(0,0,0,0.015)`,
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Fondo de agua decorativo sutil */}
          <div style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: planTheme.tint,
            opacity: 0.5,
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(15deg)"
          }}>
            {React.createElement(planTheme.icon, { size: 38, strokeWidth: 1.2, color: planTheme.color })}
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {planElegido === "anual" && (
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: KINOEMOTION_TINT,
                color: KINOEMOTION_UI,
                fontSize: 10,
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: 100,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                border: `1px solid ${KINOEMOTION_UI}30`
              }}>
                <Award size={12} strokeWidth={2.5} /> {t("Recomendado por guías y facilitadores", idioma)}
              </span>
            )}

            <h4 style={{ 
              fontFamily: FONT_DISPLAY, 
              fontSize: 17, 
              fontWeight: 600, 
              color: planTheme.darkColor, 
              margin: "0 0 6px" 
            }}>
              {t("Beneficios del plan", idioma)} {t(plan.nombre, idioma) || plan.nombre}
            </h4>
            
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 16px", lineHeight: 1.4, maxWidth: "85%" }}>
              {planTheme.desc}
            </p>

            {/* Inclusiones listadas estéticamente */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {plan.incluye.map((it) => {
                const IconComp = getIconForFeature(it);
                return (
                  <div key={it} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: planTheme.tint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: planTheme.color,
                      flexShrink: 0
                    }}>
                      <IconComp size={13} strokeWidth={2.5} />
                    </div>
                    <p style={{ fontSize: 13, color: INK, margin: 0, fontWeight: 500, lineHeight: 1.3 }}>
                      {t(it, idioma) || it}
                    </p>
                  </div>
                );
              })}

              {/* No incluidas visuales (Frictionless Upsell) */}
              {plan.noIncluye.filter(ni => !ni.includes("solo 3")).map((it) => {
                const IconComp = getIconForFeature(it);
                return (
                  <div key={it} style={{ display: "flex", gap: 12, alignItems: "center", opacity: 0.45 }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#f3f3f3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: MUTED,
                      flexShrink: 0
                    }}>
                      <Lock size={11} strokeWidth={2.5} />
                    </div>
                    <p style={{ fontSize: 13, color: MUTED, margin: 0, textDecoration: "line-through", lineHeight: 1.3 }}>
                      {t(it, idioma) || it}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Resumen del Ahorro Anual */}
            {plan.ahorro && (
              <div style={{ 
                marginTop: 16, 
                padding: "10px 14px", 
                background: "#fef8f6", 
                borderRadius: 12, 
                border: `1px solid ${KINOEMOTION_UI}20`,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <p style={{ fontSize: 12, color: KINOEMOTION_UI, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>
                  {t(plan.ahorro, idioma) || plan.ahorro}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabla Comparativa Desplegable - Inteligente y Espaciosa */}
        <div style={{ marginBottom: 18 }}>
          <button 
            onClick={() => setVerDetalles(!verDetalles)}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              cursor: "pointer",
              fontFamily: FONT_BODY,
              outline: "none"
            }}
          >
            <span style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {t("Comparar características completas", idioma)}
            </span>
            <span style={{ 
              fontSize: 11, 
              fontWeight: 600, 
              color: SAGE_DARK,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              {verDetalles ? t("Ocultar", idioma) : t("Mostrar", idioma)}
              <ChevronRight size={14} style={{ transform: verDetalles ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </span>
          </button>

          {verDetalles && (
            <div className="ss-fade" style={{ borderRadius: 16, border: `1.5px solid ${LINE}`, overflow: "hidden", marginTop: 8 }}>
              {/* Encabezados */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.6fr 0.6fr 0.6fr", background: CREAM, borderBottom: `1px solid ${LINE}` }}>
                <div style={{ padding: "10px 12px", fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase" }}>
                  {t("Beneficio", idioma)}
                </div>
                {PLANES_PAGO.map((p) => (
                  <div key={p.id} style={{ 
                    padding: "10px 4px", 
                    textAlign: "center", 
                    fontSize: 10, 
                    fontWeight: 800, 
                    color: planElegido === p.id ? KINOEMOTION_UI : MUTED, 
                    textTransform: "uppercase",
                    background: planElegido === p.id ? `${planTheme.color}08` : "transparent"
                  }}>
                    {t(p.nombre, idioma) || p.nombre}
                  </div>
                ))}
              </div>
              
              {/* Filas */}
              {TABLA_PLANES.map((row, i) => (
                <div key={row.feature} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1.2fr 0.6fr 0.6fr 0.6fr", 
                  borderBottom: i < TABLA_PLANES.length - 1 ? `1px solid ${LINE}` : "none", 
                  background: i % 2 === 0 ? "white" : CREAM 
                }}>
                  <div style={{ padding: "11px 12px", fontSize: 12, color: INK, fontWeight: 500 }}>
                    {t(row.feature, idioma) || row.feature}
                  </div>
                  {["prueba","mensual","anual"].map((id) => {
                    const val = row[id];
                    const isSelectedCol = planElegido === id;
                    return (
                      <div key={id} style={{ 
                        padding: "11px 4px", 
                        textAlign: "center", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        background: isSelectedCol ? `${planTheme.color}08` : "transparent"
                      }}>
                        {typeof val === "boolean" ? (
                          val ? (
                            <div style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              background: id === "anual" ? KINOEMOTION_TINT : SAGE_TINT,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: id === "anual" ? KINOEMOTION_UI : SAGE_DARK
                            }}>
                              <Check size={11} strokeWidth={3} />
                            </div>
                          ) : (
                            <span style={{ fontSize: 13, color: "#d2d2d2" }}>—</span>
                          )
                        ) : (
                          <span style={{ 
                            fontSize: 11, 
                            fontWeight: 700, 
                            color: id === "anual" ? KINOEMOTION_UI : SAGE_DARK,
                            background: id === "anual" ? KINOEMOTION_TINT : SAGE_TINT,
                            padding: "2px 6px",
                            borderRadius: 6
                          }}>
                            {typeof val === "string" ? (t(val, idioma) || val) : val}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Garantía, Privacidad y Confianza */}
        <div style={{ 
          background: CREAM, 
          borderRadius: 16, 
          padding: "14px 16px", 
          marginBottom: 10,
          border: `1px dashed ${LINE}`,
          display: "flex",
          gap: 12,
          alignItems: "flex-start"
        }}>
          <ShieldCheck size={20} strokeWidth={2} style={{ color: SAGE, marginTop: 1 }} />
          <div>
            <h5 style={{ fontSize: 12.5, fontWeight: 700, color: INK, margin: "0 0 3px" }}>
              {t("Garantía de tranquilidad de LA ^ VACHE", idioma)}
            </h5>
            <p style={{ fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.4 }}>
              {t("Cancela con total libertad en un clic desde tu perfil. No existen plazos forzosos, contratos, ni recargos sorpresa. Tus datos están completamente encriptados y protegidos.", idioma)}
            </p>
          </div>
        </div>

        {/* Nota explicativa de pago para la Prueba */}
        {esGratisPlan && (
          <div style={{ 
            background: "#fff5f2", 
            border: "1px solid #f6d1c9", 
            borderRadius: 16, 
            padding: "12px 16px", 
            marginBottom: 10, 
            display: "flex", 
            gap: 10 
          }}>
            <Lock size={16} style={{ color: KINOEMOTION_UI, marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: "#8a3a20", margin: 0, lineHeight: 1.4 }}>
              <strong>{t("Tranquilidad absoluta:", idioma)}</strong> {t("No se realizará ningún cobro hoy. Solicitamos tu tarjeta solo para certificar que eres una persona adulta y real, evitando perfiles duplicados. Podrás cancelar en cualquier momento antes de finalizar la prueba sin pagar nada.", idioma)}
            </p>
          </div>
        )}
      </div>

      {/* Botones Fijos Abajo con Alto Impacto */}
      <div style={{ padding: "14px 22px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          className="ss-btn"
          style={{
            width: "100%",
            background: planTheme.color,
            color: "white",
            fontWeight: 800,
            fontSize: 15.5,
            padding: "15px 20px",
            borderRadius: 16,
            border: "none",
            cursor: "pointer",
            boxShadow: `0 4px 18px ${planTheme.color}35`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.2s"
          }}
          onClick={() => {
            if (esGratisPlan && pruebaExpirada) {
              setPlanElegido("anual");
              return;
            }
            if (!estaAutenticado) {
              if (onRequerirAuth) {
                onRequerirAuth(esGratisPlan ? "prueba" : "pago", planElegido);
              }
              return;
            }
            onPagar(planElegido);
          }}
        >
          {esGratisPlan ? (
            pruebaExpirada ? (
              <>
                <Compass size={16} /> {t("Prueba de 3 días agotada · Elige un plan", idioma)}
              </>
            ) : (
              <>
                <Compass size={16} /> {t("Comenzar prueba gratuita de 3 días", idioma)}
              </>
            )
          ) : (
            <>
              {t("Elegir", idioma)} {t(plan.nombre, idioma) || plan.nombre} · {plan.precio}
            </>
          )}
        </button>
        
        <button 
          className="ss-btn ss-btn-ghost" 
          style={{ 
            width: "100%", 
            fontSize: 13, 
            color: MUTED,
            fontWeight: 600,
            padding: "8px 12px"
          }} 
          onClick={onSaltar}
        >
          {t("Seguir usando la versión básica gratuita", idioma)}
        </button>

        {onRestaurarCompras && (
          <button
            onClick={() => {
              if (!estaAutenticado) {
                if (onRequerirAuth) {
                  onRequerirAuth("restaurar", planElegido);
                }
                return;
              }
              onRestaurarCompras();
            }}
            style={{
              background: "transparent",
              border: "none",
              color: MUTED,
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "4px 0",
              marginTop: 2
            }}
          >
            <GooglePlayIcon size={13} />
            <span>{t("¿Ya compraste en Google Play? Restaurar compras", idioma)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

function ScreenPago({ plan, onConfirmar, onBack, idioma, currentUser = null, onRestaurarCompras = null, onRequerirAuth = null }) {
  const activeAuth = auth?.currentUser;
  const targetUser = (currentUser?.uid && !currentUser.uid.startsWith("play_user_")) ? currentUser : activeAuth;
  const estaAutenticado = !!targetUser?.uid;
  const [errorPago, setErrorPago] = useState("");
  const [avisoPlayStore, setAvisoPlayStore] = useState("");
  const [paso, setPaso] = useState("preparado"); // "preparado" | "procesando" | "completado"
  const [mensajePlayProgreso, setMensajePlayProgreso] = useState("");
  const [orderIdGenerado, setOrderIdGenerado] = useState("");

  const skuInfo = GOOGLE_PLAY_CONFIG.skus[plan.id] || GOOGLE_PLAY_CONFIG.skus.anual;
  const usuarioEmail = targetUser?.email || (estaAutenticado ? "usuario@gmail.com" : t("Sin cuenta iniciada", idioma));

  const handleSuscribirse = async () => {
    setErrorPago("");
    setAvisoPlayStore("");

    if (!estaAutenticado) {
      if (onRequerirAuth) {
        onRequerirAuth("pago", plan.id);
      }
      return;
    }

    // Conexión real con Google Play Billing oficial
    setPaso("procesando");
    setMensajePlayProgreso(t("Conectando con Google Play Store...", idioma));

    try {
      const res = await procesarCompraGooglePlay({
        planId: plan.id,
        currentUser: targetUser,
        idioma,
        onEstadoChange: ({ paso: st, mensaje }) => {
          setMensajePlayProgreso(mensaje);
        }
      });

      if (res.ok && res.datosPago) {
        setOrderIdGenerado(res.datosPago.orderId);
        setPaso("completado");

        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(987, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        } catch(e){}

        setTimeout(() => {
          onConfirmar(res.datosPago);
        }, 500);
      } else {
        setPaso("preparado");
        setErrorPago(res?.mensaje || t("No se pudo iniciar la pasarela de Google Play. Puedes reintentar o volver al inicio.", idioma));
      }
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("ITEM_ALREADY_OWNED") || msg.includes("Ya te suscribiste") || msg.includes("already owned") || err?.code === 7) {
        const orderId = `GPA.OWNED.${Date.now()}`;
        const duracionDias = plan.id === "anual" ? 365 : 30;
        const now = Date.now();
        const datos = {
          plataforma: "Google Play Store",
          gateway: "google_play",
          orderId,
          transaccionId: orderId,
          purchaseToken: "GOOGLE_PLAY_ACTIVE_OWNED_TOKEN",
          productId: skuInfo.productId,
          planId: plan.id,
          medioPago: "Google Play Billing",
          fechaTransaccion: new Date(now).toLocaleDateString() + " " + new Date(now).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fechaInicio: now,
          fechaExpiracion: now + (duracionDias * 24 * 60 * 60 * 1000),
          autoRenovable: true,
          estado: "ACTIVE",
          emailFacturacion: targetUser?.email || ""
        };
        setPaso("completado");
        onConfirmar(datos);
        return;
      }
      setPaso("preparado");
      if (msg.includes("cancel") || msg.includes("Cancel") || msg.includes("cancelado") || msg.includes("USER_CANCELED") || err?.code === 1 || err?.code === 6777006) {
        setAvisoPlayStore(t("Has cerrado o cancelado el proceso de pago. No se realizó ningún cargo a tu tarjeta. Puedes reanudar tu suscripción cuando lo desees.", idioma));
        return;
      }
      setErrorPago(err.message || t("Error al conectar con Google Play Store", idioma));
    }
  };

  const beneficios = [
    t("Acceso ilimitado al Reto de 21 días de liberación emocional", idioma),
    t("Cartas astral, natal y azteca completas con análisis profundo", idioma),
    t("Frecuencias sonoras solfeo y ejercicios somáticos guiados", idioma),
    t("Directorio completo de especialistas en salud y bienestar", idioma),
    t("Primeros 3 días sin costo · Cancela en cualquier momento sin penalizaciones", idioma)
  ];

  if (paso === "procesando") {
    return (
      <ModalPagoPendiente
        mensaje={mensajePlayProgreso}
        idioma={idioma}
        onCancelar={() => {
          setPaso("preparado");
          setAvisoPlayStore(t("Proceso de pago cancelado. No se realizó ningún cobro.", idioma));
        }}
        onVolverHome={() => {
          setPaso("preparado");
          if (onBack) onBack();
        }}
        onReintentar={handleSuscribirse}
      />
    );
  }

  if (errorPago) {
    return (
      <ModalPagoRechazado
        error={errorPago}
        onReintentar={handleSuscribirse}
        onCerrar={() => setErrorPago("")}
        onVolverHome={() => {
          setErrorPago("");
          if (onBack) onBack();
        }}
        idioma={idioma}
      />
    );
  }

  return (
    <div className="ss-fade" style={{ padding: "0 20px 24px", minHeight: "100%", display: "flex", flexDirection: "column", background: "#faf8f3" }}>
      <TopBar title={t("Google Play Store", idioma)} onBack={onBack} />
      
      <div style={{ flex: 1, marginTop: 4, overflowY: "auto" }} className="ss-no-scrollbar">
        {/* Banner Oficial Google Play Store */}
        <div style={{
          background: "linear-gradient(135deg, #01875f 0%, #0b694b 100%)",
          borderRadius: 18,
          padding: "16px 18px",
          marginBottom: 16,
          color: "white",
          boxShadow: "0 4px 16px rgba(1,135,95,0.22)"
        }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}>
              <GooglePlayIcon size={20} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "white" }}>
                  Google Play Billing
                </h4>
                <span style={{ fontSize: 9.5, background: "rgba(255,255,255,0.25)", padding: "2px 6px", borderRadius: 4, fontWeight: 800 }}>
                  OFICIAL
                </span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", margin: "2px 0 0", fontWeight: 500 }}>
                {t("Facturación segura y directa de Google Play para Android", idioma)}
              </p>
            </div>
          </div>
          <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.92)", margin: 0, lineHeight: 1.45 }}>
            {t("Tus datos bancarios están blindados por Google Play. Puedes gestionar o cancelar tu suscripción en cualquier momento desde los ajustes de tu cuenta de Google Play Store.", idioma)}
          </p>
        </div>

        {/* Resumen del Plan a Adquirir */}
        <div style={{
          background: "white",
          border: `1.5px solid ${plan.id === "anual" ? "#eed0c5" : "#c6ded6"}`,
          borderRadius: 18,
          padding: "16px 18px",
          marginBottom: 16,
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, color: plan.id === "anual" ? KINOEMOTION_UI : SAGE_DARK, textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 2 }}>
                {t("Plan seleccionado", idioma)}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: INK, margin: 0 }}>
                {t(plan.nombre, idioma) || plan.nombre}
              </h3>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 18, fontWeight: 900, color: plan.id === "anual" ? KINOEMOTION : SAGE_DARK }}>
                {skuInfo.precioFormatted}
              </span>
              <span style={{ fontSize: 11, color: MUTED, display: "block" }}>
                {t(plan.periodo, idioma) || plan.periodo}
              </span>
            </div>
          </div>

          <div style={{
            background: plan.id === "anual" ? "#fff5f2" : "#f0f7f4",
            borderRadius: 10,
            padding: "8px 12px",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ fontSize: 11.5, color: plan.id === "anual" ? "#8a3a20" : SAGE_DARK, fontWeight: 700 }}>
              ✨ {t("3 días de prueba gratis incluidos", idioma)}
            </span>
            <span style={{ fontSize: 10.5, color: MUTED }}>
              {t("Sin cobro inicial", idioma)}
            </span>
          </div>

          {/* Lista de beneficios incluidos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {beneficios.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: "#01875f", fontWeight: 900, fontSize: 13, lineHeight: 1.2 }}>✓</span>
                <span style={{ fontSize: 12, color: "#334155", lineHeight: 1.35 }}>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 14, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: MUTED }}>{t("Cuenta de Google", idioma)}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: INK }}>{usuarioEmail}</span>
          </div>
        </div>

        {/* Notificaciones / Avisos inline */}
        {avisoPlayStore && (
          <div style={{
            background: "rgba(1, 135, 95, 0.1)",
            border: "1px solid #01875f",
            color: "#065f46",
            padding: "12px 14px",
            borderRadius: 12,
            fontSize: 12,
            marginBottom: 14,
            lineHeight: 1.4
          }}>
            {avisoPlayStore}
          </div>
        )}

        {!estaAutenticado && (
          <div style={{
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <Lock size={16} color="#dc2626" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: "#991b1b", margin: 0 }}>
                {t("Primero debes iniciar sesión o registrarte", idioma)}
              </p>
              <p style={{ fontSize: 10.5, color: "#64748b", margin: "2px 0 0", lineHeight: 1.3 }}>
                {t("Para asociar tu suscripción de Google Play y tus 3 días de prueba de forma segura a tu cuenta.", idioma)}
              </p>
            </div>
          </div>
        )}

        {/* Botón Principal de Suscripción */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={handleSuscribirse}
            style={{
              width: "100%",
              background: estaAutenticado ? "#01875f" : "#E07A5F",
              border: "none",
              borderRadius: 24,
              padding: "15px 20px",
              color: "white",
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: estaAutenticado ? "0 4px 14px rgba(1,135,95,0.35)" : "0 4px 14px rgba(224, 122, 95, 0.3)",
              transition: "all 0.2s"
            }}
          >
            {estaAutenticado ? (
              <>
                <GooglePlayIcon size={18} />
                <span>{t("Suscribirse con Google Play", idioma)}</span>
              </>
            ) : (
              <>
                <Lock size={18} />
                <span>{t("Iniciar sesión o Registrarme para continuar", idioma)}</span>
              </>
            )}
          </button>

          <p style={{ fontSize: 10.5, color: "#64748b", textAlign: "center", margin: "4px 0 0", lineHeight: 1.4 }}>
            {t("Al continuar, Google Play abrirá su pasarela oficial para que elijas tu medio de pago y confirmes la suscripción.", idioma)}
          </p>

          {onRestaurarCompras && (
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <button
                onClick={() => {
                  if (!estaAutenticado) {
                    if (onRequerirAuth) onRequerirAuth("restaurar", plan.id);
                    return;
                  }
                  onRestaurarCompras();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#0f766e",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px"
                }}
              >
                <GooglePlayIcon size={14} />
                <span>{t("Restaurar compras previas de Google Play", idioma)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModalPagoPendiente({ mensaje, idioma = "es", onCancelar = null, onVolverHome = null, onReintentar = null }) {
  useBloquearScrollFondo(true);
  if (typeof document === "undefined") return null;

  const [tardoMasDeLoEsperado, setTardoMasDeLoEsperado] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTardoMasDeLoEsperado(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const modalContent = (
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
        minHeight: "100dvh",
        zIndex: 99999999,
        background: "#faf8f3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 24px) + 20px) 24px calc(env(safe-area-inset-bottom, 24px) + 24px)",
        boxSizing: "border-box",
        userSelect: "none",
        overscrollBehavior: "contain",
        touchAction: "none"
      }}
      className="ss-fade"
    >
      {/* Top Header con botón de cerrar accesible */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GooglePlayIcon size={20} />
          <span style={{ fontSize: 12, fontWeight: 800, color: "#01875f", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Google Play Billing
          </span>
        </div>
        {onCancelar && (
          <button
            onClick={onCancelar}
            style={{
              background: "#e2e8f0",
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#334155",
              fontSize: 16,
              fontWeight: 800
            }}
            title={t("Cerrar", idioma)}
          >
            ✕
          </button>
        )}
      </div>

      {/* Centro Hero */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 360,
        width: "100%"
      }} className="ss-fade-scale">
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#ecfdf5",
          border: "2px solid #a7f3d0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          position: "relative",
          boxShadow: "0 8px 24px rgba(1,135,95,0.15)"
        }}>
          <div style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            border: "4px solid transparent",
            borderTopColor: "#01875f",
            borderRightColor: "#01875f",
            animation: "ss-spin 0.75s linear infinite"
          }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <GooglePlayIcon size={24} />
          </div>
        </div>

        <span style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#01875f",
          background: "rgba(1,135,95,0.12)",
          padding: "4px 14px",
          borderRadius: 99,
          marginBottom: 10
        }}>
          {t("Procesando suscripción", idioma)}
        </span>

        <h3 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 20,
          fontWeight: 800,
          color: INK,
          margin: "0 0 8px",
          lineHeight: 1.3
        }}>
          {mensaje || t("Conectando con Google Play Store...", idioma)}
        </h3>

        <p style={{
          fontSize: 12.5,
          color: MUTED,
          margin: "0 0 16px",
          lineHeight: 1.5
        }}>
          {tardoMasDeLoEsperado
            ? t("Si la ventana oficial de Google Play no se abrió en pantalla o tardó en cargar, puedes reintentar o regresar sin problemas.", idioma)
            : t("Por favor espera un momento mientras se verifica la transacción con Google Play de forma segura.", idioma)
          }
        </p>

        {/* Panel de acciones siempre disponible para que el usuario nunca quede atrapado */}
        <div style={{
          background: "white",
          border: tardoMasDeLoEsperado ? "1.5px solid #fed7aa" : "1.2px solid #e2e8f0",
          borderRadius: 16,
          padding: "14px 16px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: 9
        }} className="ss-fade-scale">
          {tardoMasDeLoEsperado && (
            <p style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", margin: "0 0 2px" }}>
              {t("¿La ventana de Google Play no apareció o se cerró?", idioma)}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {onReintentar && (
              <button
                onClick={onReintentar}
                style={{
                  background: "#01875f",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "11px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: "0 2px 8px rgba(1,135,95,0.25)"
                }}
              >
                <GooglePlayIcon size={16} />
                <span>{t("Reintentar conexión", idioma)}</span>
              </button>
            )}

            {onVolverHome && (
              <button
                onClick={onVolverHome}
                style={{
                  background: "#f1f5f9",
                  color: "#1e293b",
                  border: "none",
                  borderRadius: 12,
                  padding: "10px 14px",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🏠 {t("Volver al Inicio", idioma)}
              </button>
            )}

            {onCancelar && (
              <button
                onClick={onCancelar}
                style={{
                  background: "transparent",
                  color: "#64748b",
                  border: "none",
                  padding: "6px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {t("Cancelar y volver a planes", idioma)}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ textAlign: "center", width: "100%" }}>
        <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
          🔒 {t("Transacción cifrada y protegida por Google Play", idioma)}
        </p>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ModalPagoRechazado({ error, onReintentar, onCerrar, onVolverHome = null, idioma = "es" }) {
  useBloquearScrollFondo(true);
  if (typeof document === "undefined") return null;

  const modalContent = (
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
        minHeight: "100dvh",
        zIndex: 99999999,
        background: "#faf8f3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 24px) + 20px) 24px calc(env(safe-area-inset-bottom, 24px) + 24px)",
        boxSizing: "border-box",
        userSelect: "none",
        overscrollBehavior: "contain",
        touchAction: "none"
      }}
      className="ss-fade"
    >
      {/* Top Brand Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 380 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GooglePlayIcon size={20} />
          <span style={{ fontSize: 12, fontWeight: 800, color: "#b91c1c", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Google Play Store
          </span>
        </div>
        {onCerrar && (
          <button
            onClick={onCerrar}
            style={{
              background: "#fee2e2",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#dc2626",
              fontSize: 16,
              fontWeight: 800
            }}
            title={t("Cerrar", idioma)}
          >
            ✕
          </button>
        )}
      </div>

      {/* Centro Hero */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 360,
        width: "100%"
      }} className="ss-fade-scale">
        <div style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "#fee2e2",
          border: "2px solid #fca5a5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#dc2626",
          fontSize: 30,
          fontWeight: 900,
          marginBottom: 16,
          boxShadow: "0 8px 24px rgba(220,38,38,0.18)"
        }} className="ss-pop">
          ✕
        </div>

        <span style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#b91c1c",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          padding: "4px 14px",
          borderRadius: 99,
          marginBottom: 10
        }}>
          {t("Proceso no completado", idioma)}
        </span>

        <h3 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 800,
          color: INK,
          margin: "0 0 10px",
          lineHeight: 1.3
        }}>
          {t("Pago no completado o cancelado", idioma)}
        </h3>

        <div style={{
          background: "white",
          border: "1.5px solid #fed7aa",
          borderRadius: 16,
          padding: "12px 16px",
          width: "100%",
          textAlign: "left",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          marginBottom: 8
        }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "#c2410c", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
            {t("Detalle del estado", idioma)}
          </span>
          <p style={{
            fontSize: 12.5,
            color: "#475569",
            margin: 0,
            lineHeight: 1.45
          }}>
            {error || t("La operación en Google Play no pudo completarse. No se ha realizado ningún cobro.", idioma)}
          </p>
        </div>
      </div>

      {/* Botones de acción inferiores */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 360 }}>
        {onReintentar && (
          <button
            onClick={onReintentar}
            style={{
              width: "100%",
              background: "#01875f",
              color: "white",
              padding: "14px",
              fontSize: 14.5,
              fontWeight: 800,
              borderRadius: 24,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(1,135,95,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <GooglePlayIcon size={18} />
            <span>{t("Reintentar con Google Play", idioma)}</span>
          </button>
        )}
        {onCerrar && (
          <button
            onClick={onCerrar}
            style={{
              width: "100%",
              background: "white",
              color: "#334155",
              padding: "12px",
              fontSize: 13.5,
              fontWeight: 700,
              borderRadius: 24,
              border: `1.5px solid ${LINE}`,
              cursor: "pointer"
            }}
          >
            {t("Volver a los planes", idioma)}
          </button>
        )}
        {onVolverHome && (
          <button
            onClick={onVolverHome}
            style={{
              background: "transparent",
              border: "none",
              color: MUTED,
              fontSize: 12.5,
              fontWeight: 600,
              padding: "6px",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            {t("Volver al Inicio", idioma)}
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ModalSuscripcionAprobada({ datosPago, planId, currentUser = null, onContinuar, idioma = "es" }) {
  useBloquearScrollFondo(Boolean(datosPago));
  if (!datosPago) return null;
  if (typeof document === "undefined") return null;

  const planNombre = planId === "anual" ? t("Suelta Premium Anual (Acceso Total)", idioma) : t("Suelta Premium Mensual", idioma);
  const esAnual = planId === "anual";
  const targetUid = currentUser?.uid || auth?.currentUser?.uid || "";

  const modalContent = (
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
        minHeight: "100dvh",
        zIndex: 99999999,
        background: "#faf8f3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "calc(env(safe-area-inset-top, 24px) + 16px) 24px calc(env(safe-area-inset-bottom, 24px) + 24px)",
        boxSizing: "border-box",
        touchAction: "none",
        overscrollBehavior: "contain",
        userSelect: "none"
      }}
      className="ss-fade"
    >
      {/* Top Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <GooglePlayIcon size={20} />
        <span style={{ fontSize: 12, fontWeight: 800, color: "#01875f", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Google Play Store
        </span>
      </div>

      {/* Centro Hero y Detalles */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        maxWidth: 390,
        width: "100%",
        overflowY: "auto"
      }} className="ss-fade-scale ss-no-scrollbar">
        {/* Checkmark gigante animado */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #01875f 0%, #086b4c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 34,
            fontWeight: 900,
            boxShadow: "0 10px 28px rgba(1, 135, 95, 0.4)",
            marginBottom: 12
          }}
          className="ss-pop"
        >
          ✓
        </div>

        <span style={{
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#01875f",
          background: "rgba(1,135,95,0.12)",
          padding: "4px 14px",
          borderRadius: 99,
          marginBottom: 8
        }}>
          {t("Pago Aprobado y Confirmado", idioma)}
        </span>

        <h3 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 22,
          fontWeight: 800,
          color: INK,
          margin: "0 0 6px",
          lineHeight: 1.3
        }}>
          {t("¡Bienvenido a Suelta Premium!", idioma)}
        </h3>

        <p style={{
          fontSize: 12.5,
          color: MUTED,
          margin: "0 0 14px",
          lineHeight: 1.45
        }}>
          {t("Tu suscripción con Google Play Store ha sido verificada y activada con éxito. Ya tienes acceso total a todas las herramientas.", idioma)}
        </p>

        {/* Tarjeta Visual de Identificador de Suscriptor */}
        <div style={{ width: "100%", marginBottom: 12 }}>
          <TarjetaIdentificadorSuscriptor
            uid={targetUid}
            orderId={datosPago.orderId}
            planPago={planId}
            idioma={idioma}
            fechaTransaccion={datosPago.fechaTransaccion}
          />
        </div>

        {/* Tarjeta de resumen de compra */}
        <div style={{
          width: "100%",
          background: "white",
          border: "1.5px solid #a7f3d0",
          borderRadius: 16,
          padding: "12px 16px",
          marginBottom: 12,
          textAlign: "left",
          fontSize: 12,
          boxShadow: "0 2px 10px rgba(1,135,95,0.06)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: MUTED }}>{t("Plan adquirido:", idioma)}</span>
            <span style={{ fontWeight: 800, color: INK }}>{planNombre}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ color: MUTED }}>{t("Estado:", idioma)}</span>
            <span style={{ fontWeight: 800, color: "#01875f", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#01875f" }} />
              {t("Activo · Sin restricciones", idioma)}
            </span>
          </div>
          {datosPago.orderId && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: MUTED }}>{t("ID de Orden:", idioma)}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10.5, color: "#475569" }}>
                {datosPago.orderId.length > 24 ? `${datosPago.orderId.slice(0, 22)}...` : datosPago.orderId}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Botón principal inferior que lleva a detalles de suscripción */}
      <div style={{ width: "100%", maxWidth: 390 }}>
        <button
          onClick={onContinuar}
          style={{
            width: "100%",
            background: "#01875f",
            color: "white",
            padding: "16px",
            fontSize: 15,
            fontWeight: 800,
            borderRadius: 24,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(1,135,95,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          <span>{t("Ver detalles de mi suscripción", idioma)}</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function CustomSelect({ options, value, onChange, placeholder, flex = 1 }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", flex, minWidth: 0 }}>
      <div 
        className="ss-input"
        style={{ 
          padding: "13px 10px", 
          cursor: "pointer", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", color: selectedOption ? "inherit" : "#a9b3ae" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span style={{ fontSize: 10, marginLeft: 4, color: "#a9b3ae" }}>▼</span>
      </div>
      {open && (
        <div className="ss-fade" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          marginTop: 4,
          background: "white",
          border: "1px solid #eaeaea",
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          maxHeight: 200,
          overflowY: "auto",
          zIndex: 100,
          fontFamily: FONT_BODY
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                fontSize: 14,
                cursor: "pointer",
                background: value === opt.value ? "#f5f2eb" : "transparent",
                color: "#1a2421",
                borderBottom: "1px solid #f0f0f0"
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenNacimiento({ onNext, onBack, nacimiento, setNacimiento, esEdicion, idioma = "es" }) {
  const set = (campo, valor) => setNacimiento({ ...nacimiento, [campo]: valor });
  const [sugerencias, setSugerencias] = useState([]);
  const [sugerenciasRemotas, setSugerenciasRemotas] = useState([]);
  const [buscandoRemoto, setBuscandoRemoto] = useState(false);
  const [coordManual, setCoordManual] = useState(!!(nacimiento.lat && !nacimiento.ciudadId));
  const debounceRef = useRef(null);
  const busquedaIdRef = useRef(0);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const onCambiarLugar = (texto) => {
    setNacimiento({ ...nacimiento, lugar: texto, lat: undefined, lon: undefined, ciudadId: undefined });
    setSugerencias(buscarCiudadesNacimiento(texto));
    setSugerenciasRemotas([]);
    clearTimeout(debounceRef.current);
    if (texto.trim().length < 3) {
      setBuscandoRemoto(false);
      return;
    }
    const idBusqueda = ++busquedaIdRef.current;
    setBuscandoRemoto(true);
    // Espera a que la persona haga una pausa al escribir antes de consultar el servicio
    // externo de geocodificación — evita disparar una petición por cada letra.
    debounceRef.current = setTimeout(async () => {
      const remotas = await buscarCiudadesGeocodificacion(texto);
      // Si mientras tanto la persona ya escribió otra cosa, descarta este resultado tardío.
      if (idBusqueda !== busquedaIdRef.current) return;
      setBuscandoRemoto(false);
      setSugerenciasRemotas(remotas);
    }, 500);
  };

  const elegirCiudad = (c) => {
    setNacimiento({ ...nacimiento, lugar: `${c.nombre}, ${c.pais}`, lat: c.lat, lon: c.lon, ciudadId: c.nombre });
    setSugerencias([]);
    setSugerenciasRemotas([]);
    clearTimeout(debounceRef.current);
    setBuscandoRemoto(false);
  };

  const tieneUbicacionPrecisa = typeof nacimiento.lat === "number" && typeof nacimiento.lon === "number";
  // Une sugerencias locales (instantáneas) con las remotas (geocodificación), sin duplicar
  // por si el mismo lugar aparece en ambas fuentes.
  const sugerenciasCombinadas = [
    ...sugerencias,
    ...sugerenciasRemotas.filter(
      (r) => !sugerencias.some((s) => ssNormalizarTexto(s.nombre) === ssNormalizarTexto(r.nombre) && ssNormalizarTexto(s.pais) === ssNormalizarTexto(r.pais))
    ),
  ].slice(0, 8);
  const sinCoincidencias =
    !buscandoRemoto && sugerenciasCombinadas.length === 0 && ssNormalizarTexto(nacimiento.lugar || "").trim().length >= 3 && !tieneUbicacionPrecisa;

  const partesFecha = (nacimiento.fecha || "").split("-");
  const a = partesFecha[0] || "";
  const m = partesFecha[1] || "";
  const d = partesFecha[2] || "";

  const onChangeFecha = (part, value) => {
     let newA = a, newM = m, newD = d;
     if (part === 'A') newA = value;
     if (part === 'M') newM = value;
     if (part === 'D') newD = value;
     
     // Guardamos el string aunque este incompleto (ej. "2024-05-") para no perder el estado
     // Pero si las 3 estan, aseguramos el formato YYYY-MM-DD
     set("fecha", [newA, newM, newD].join("-"));
  }

  const partesHora = (nacimiento.hora || "").split(":");
  const h = partesHora[0] || "";
  const min = partesHora[1] || "";

  const onChangeHora = (part, value) => {
     let newH = h, newMin = min;
     if (part === 'H') newH = value;
     if (part === 'MIN') newMin = value;
     set("hora", [newH, newMin].join(":"));
  }

  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const currentYear = new Date().getFullYear();

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={esEdicion ? t("Mis datos de nacimiento", idioma) : t("Tus datos de nacimiento", idioma)} onBack={onBack} idioma={idioma} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 20, color: INK, margin: "0 0 8px" }}>
          {t("Para tus cartas natal, astral y azteca", idioma)}
        </h2>
        <p style={{ color: MUTED, fontSize: 13.5, margin: "0 0 20px", lineHeight: 1.5 }}>
          {t("Cuanto más exactos sean estos datos, más precisas serán tus cartas. La hora y el lugar son clave para calcular tu ascendente y las casas astrológicas.", idioma)}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
              {t("Fecha de nacimiento completa", idioma)}
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <CustomSelect
                placeholder={t("Día", idioma)}
                value={d}
                onChange={v => onChangeFecha('D', v)}
                options={Array.from({length: 31}, (_, i) => ({ value: String(i+1).padStart(2, '0'), label: String(i+1) }))}
              />
              <CustomSelect
                placeholder={t("Mes", idioma)}
                value={m}
                onChange={v => onChangeFecha('M', v)}
                options={meses.map((mes, i) => ({ value: String(i+1).padStart(2, '0'), label: t(mes, idioma) }))}
              />
              <CustomSelect
                placeholder={t("Año", idioma)}
                value={a}
                onChange={v => onChangeFecha('A', v)}
                options={Array.from({length: 100}, (_, i) => ({ value: String(currentYear - i), label: String(currentYear - i) }))}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
              {t("Hora exacta · y si la sabes con certeza", idioma)}
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <CustomSelect
                placeholder={t("Hora", idioma)}
                value={h}
                onChange={v => onChangeHora('H', v)}
                options={Array.from({length: 24}, (_, i) => ({ value: String(i).padStart(2, '0'), label: String(i).padStart(2, '0') }))}
              />
              <span style={{ display: "flex", alignItems: "center", fontWeight: "bold", color: MUTED }}>:</span>
              <CustomSelect
                placeholder={t("Min", idioma)}
                value={min}
                onChange={v => onChangeHora('MIN', v)}
                options={Array.from({length: 60}, (_, i) => ({ value: String(i).padStart(2, '0'), label: String(i).padStart(2, '0') }))}
              />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 7, fontSize: 12, color: MUTED, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!nacimiento.horaAprox}
                onChange={(e) => set("horaAprox", e.target.checked)}
                style={{ width: 20, height: 20, minWidth: 20, accentColor: LAVENDER, cursor: "pointer" }}
              />
              {t("No estoy segura de la hora (es aproximada)", idioma)}
            </label>
          </div>

          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
              {t("Lugar de nacimiento", idioma)}
            </label>
            {!coordManual ? (
              <div style={{ position: "relative" }}>
                <input
                  className="ss-input"
                  placeholder={t("Escribe tu ciudad (ej. Bogotá)", idioma)}
                  value={nacimiento.lugar || ""}
                  onChange={(e) => onCambiarLugar(e.target.value)}
                />
                {sugerenciasCombinadas.length > 0 && (
                  <div className="ss-sugerencias-contenedor">
                    {sugerenciasCombinadas.map((c) => (
                      <button
                        key={`${c.nombre}-${c.pais}`}
                        type="button"
                        onClick={() => elegirCiudad(c)}
                        className="ss-sugerencia-item"
                      >
                        <span style={{ fontSize: "14px", flexShrink: 0, opacity: 0.85 }}>📍</span>
                        <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "baseline" }}>
                          <strong style={{ fontWeight: 600, color: INK }}>{c.nombre}</strong>
                          <span style={{ color: MUTED, fontSize: "12.5px", marginLeft: "6px" }}>
                            {c.pais}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <p style={{ fontSize: 11, color: tieneUbicacionPrecisa ? SAGE_DARK : sinCoincidencias ? "#a04a42" : MUTED, margin: "5px 2px 0", lineHeight: 1.4 }}>
                  {tieneUbicacionPrecisa
                    ? t("✓ Ubicación reconocida — podemos calcular tu ascendente y las casas.", idioma)
                    : buscandoRemoto
                    ? t("Buscando tu ciudad…", idioma)
                    : sinCoincidencias
                    ? `${t("No encontramos", idioma)} "${nacimiento.lugar}" — ${t("elige una sugerencia de la lista o ingresa las coordenadas manualmente abajo.", idioma)}`
                    : t("Elige una sugerencia de la lista para que podamos calcular tu ascendente y las casas.", idioma)}
                </p>
                <button
                  type="button"
                  onClick={() => setCoordManual(true)}
                  style={{ background: "none", border: "none", padding: 0, marginTop: 5, fontSize: 11, color: LAVENDER, textDecoration: "underline", cursor: "pointer", fontFamily: FONT_BODY }}
                >
                  {t("¿No encuentras tu ciudad? Ingresa las coordenadas", idioma)}
                </button>
              </div>
            ) : (
              <div>
                <input
                  className="ss-input"
                  placeholder={t("Ciudad, país (ej. Bogotá, Colombia)", idioma)}
                  value={nacimiento.lugar || ""}
                  onChange={(e) => set("lugar", e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="ss-input"
                    type="number"
                    step="0.0001"
                    placeholder={t("Latitud (ej. 4.7110)", idioma)}
                    value={nacimiento.lat ?? ""}
                    onChange={(e) => set("lat", e.target.value === "" ? undefined : Number(e.target.value))}
                  />
                  <input
                    className="ss-input"
                    type="number"
                    step="0.0001"
                    placeholder={t("Longitud (ej. -74.0721)", idioma)}
                    value={nacimiento.lon ?? ""}
                    onChange={(e) => set("lon", e.target.value === "" ? undefined : Number(e.target.value))}
                  />
                </div>
                <p style={{ fontSize: 11, color: MUTED, margin: "5px 2px 0", lineHeight: 1.4 }}>
                  {t("Puedes buscar la latitud y longitud de tu ciudad en Google Maps (mantén presionado el punto en el mapa).", idioma)}
                </p>
                <button
                  type="button"
                  onClick={() => setCoordManual(false)}
                  style={{ background: "none", border: "none", padding: 0, marginTop: 5, fontSize: 11, color: LAVENDER, textDecoration: "underline", cursor: "pointer", fontFamily: FONT_BODY }}
                >
                  {t("Buscar mi ciudad en la lista", idioma)}
                </button>
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
              {t("Apodo o nombre con el que te llaman", idioma)}
            </label>
            <input
              className="ss-input"
              placeholder={t("Cómo te dicen con cariño (opcional)", idioma)}
              value={nacimiento.apodo || ""}
              onChange={(e) => set("apodo", e.target.value)}
            />
            <p style={{ fontSize: 11, color: MUTED, margin: "5px 2px 0", lineHeight: 1.4 }}>
              {t("Lo usamos para hablarte de forma más cercana en tus lecturas.", idioma)}
            </p>
          </div>

          <div>
            <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", marginBottom: 5 }}>
              {t("Ciudad donde vives ahora", idioma)}
            </label>
            <input
              className="ss-input"
              placeholder={t("Si es distinta a la de nacimiento (opcional)", idioma)}
              value={nacimiento.residencia || ""}
              onChange={(e) => set("residencia", e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="ss-btn ss-btn-premium"
        style={{ width: "100%", opacity: nacimiento.fecha && nacimiento.fecha.length === 10 && nacimiento.fecha.split("-").every(p => p.length > 0) ? 1 : 0.5, marginTop: 14 }}
        disabled={!(nacimiento.fecha && nacimiento.fecha.length === 10 && nacimiento.fecha.split("-").every(p => p.length > 0))}
        onClick={onNext}
      >
        {esEdicion ? t("Guardar cambios", idioma) : t("Generar mi plan de 21 días", idioma)}
      </button>
    </div>
  );
}

const PLAN_21_DIAS = [
  "Escribe la frase exacta que te dices cuando aparece el malestar. Léela en voz alta y pregúntate si es del todo cierta.",
  "Identifica en qué momento del día sientes más tensión. Solo obsérvalo, sin cambiar nada aún.",
  "Recuerda la primera vez que sentiste algo parecido a lo que vives hoy. ¿Qué edad tenías?",
  "Hoy, cada vez que aparezca el malestar, respira hondo tres veces antes de reaccionar.",
  "Escribe una carta que no vas a enviar, dirigida a quien crees que está ligado a este conflicto.",
  "Nombra en voz alta lo que sientes, usando la frase: \u201cme permito sentir…\u201d.",
  "Haz una pausa de 5 minutos hoy solo para ti, sin pantallas ni tareas.",
  "Observa tu cuerpo: ¿dónde se aloja la emoción? Ponle una mano encima un minuto.",
  "Escribe tres cosas que este malestar ha intentado protegerte o enseñarte.",
  "Perdónate por algo pequeño de hoy. Dilo en voz alta.",
  "Reconoce a alguien de tu familia cuyo destino sientes que cargas. Solo míralo con respeto.",
  "Hoy di \u201cno\u201d a algo que normalmente aceptarías por costumbre.",
  "Agradece a tu cuerpo por avisarte, en lugar de pelearte con el síntoma.",
  "Escribe cómo te gustaría sentirte dentro de un año, en presente.",
  "Suelta un objeto, una idea o una rutina que ya no te sirve.",
  "Dedica hoy a mirar lo que sí funciona en tu vida, por pequeño que sea.",
  "Repite tu frase de sanación mirándote al espejo.",
  "Haz las paces simbólicamente con una versión más joven de ti.",
  "Comparte con alguien de confianza una parte de este proceso.",
  "Escribe qué ha cambiado en ti desde el día 1, aunque sea sutil.",
  "Celebra haber llegado hasta aquí. Escribe una promesa amable para tu futuro.",
];

function ScreenReto({ onBack, onVerHub, retoDiaActual = 1, retoCompletados = [], retoHistorial = {}, retoCompletadosFechas = {}, onCompletarDia, recordatorios, setRecordatorios, nombre, sexo, entradas = [], analisisReporte = null, setAnalisisReporte, tutorialStep, onComenzarTutorial, idioma = "es" }) {
  const [now, setNow] = useState(Date.now());
  const [estaAnalizando, setEstaAnalizando] = useState(false);
  const [errorAnalisis, setErrorAnalisis] = useState(null);

  const ejecutarAlgoritmoDeAnalisis = async () => {
    setErrorAnalisis(null);
    setEstaAnalizando(true);
    // Simular un sutil delay para una sensación orgánica de cálculo
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Recopilar textos de reflexiones y diario
    const textosReto = Object.values(retoHistorial).filter(Boolean);
    const textosDiario = (entradas || []).map(e => e.texto).filter(Boolean);
    const todosLosTextos = [...textosReto, ...textosDiario];

    if (todosLosTextos.length === 0) {
      setEstaAnalizando(false);
      setErrorAnalisis(t("Para ejecutar el análisis, primero escribe alguna entrada en tu diario de bienestar o reflexiones en el reto de 21 días.", idioma));
      return;
    }

    const textoUnificado = todosLosTextos.join(" ").toLowerCase();

    // Contar palabras
    const palabras = textoUnificado.split(/\s+/).filter(p => p.length > 2);
    const totalWords = palabras.length;
    const avgLength = Math.round(totalWords / (todosLosTextos.length || 1));

    // Categorías de palabras clave en español
    const keywords = {
      serenidad: ["paz", "serenidad", "calma", "tranquilo", "calmo", "soltar", "respirar", "aceptar", "sintonizar", "espacio", "fluir", "silencio", "presente"],
      ansiedad: ["ansiedad", "estrés", "nervioso", "miedo", "preocupación", "tensión", "presión", "rumiación", "abrumado", "alerta", "asustado", "pánico", "inquieto"],
      tristeza: ["tristeza", "dolor", "llorar", "vacío", "soledad", "pérdida", "melancolía", "desánimo", "pena", "herida", "triste", "llanto", "duelo"],
      gratitud: ["gratitud", "agradecido", "feliz", "alegría", "amor", "luz", "sonreír", "bendición", "florecer", "sanar", "hermoso", "aprecio", "gracias"],
      frustracion: ["enojo", "rabia", "frustración", "impaciencia", "molesto", "ira", "furia", "molestia", "coraje", "fastidio", "impaciente"]
    };

    const wordCounts = { serenidad: 0, ansiedad: 0, tristeza: 0, gratitud: 0, frustracion: 0 };
    
    palabras.forEach(word => {
      // Limpiar puntuaciones
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?]/g, "");
      if (keywords.serenidad.includes(cleanWord)) wordCounts.serenidad++;
      if (keywords.ansiedad.includes(cleanWord)) wordCounts.ansiedad++;
      if (keywords.tristeza.includes(cleanWord)) wordCounts.tristeza++;
      if (keywords.gratitud.includes(cleanWord)) wordCounts.gratitud++;
      if (keywords.frustracion.includes(cleanWord)) wordCounts.frustracion++;
    });

    // Determinar emoción dominante
    let dominantEmotion = "Neutro / Explorador 🌱";
    let maxCount = 0;
    
    if (wordCounts.serenidad > maxCount) { maxCount = wordCounts.serenidad; dominantEmotion = "Serenidad y Calma 🌱"; }
    if (wordCounts.ansiedad > maxCount) { maxCount = wordCounts.ansiedad; dominantEmotion = "Ansiedad o Estrés Activo 🌀"; }
    if (wordCounts.tristeza > maxCount) { maxCount = wordCounts.tristeza; dominantEmotion = "Tristeza o Procesamiento Emocional 💧"; }
    if (wordCounts.gratitud > maxCount) { maxCount = wordCounts.gratitud; dominantEmotion = "Gratitud y Bienestar Alto ✨"; }
    if (wordCounts.frustracion > maxCount) { maxCount = wordCounts.frustracion; dominantEmotion = "Frustración o Tensión Emocional 🔥"; }

    // Determinar estilo de escritura
    let writingStyle = "Equilibrado y Observador 🕯️";
    const exclamationCount = (textoUnificado.match(/!|¡/g) || []).length;

    if (avgLength > 45) {
      writingStyle = "Reflexivo y Detallado 🪶";
    } else if (avgLength <= 15) {
      writingStyle = "Directo y Sintético ⏱️";
    } else if (exclamationCount > 2) {
      writingStyle = "Expresivo y Catártico 🌊";
    }

    // Generar recomendaciones de expresión
    let recomendExpresion = [];
    if (dominantEmotion.includes("Ansiedad")) {
      recomendExpresion = [
        "Dedica 5 minutos al inicio del día para escribir de forma libre (sin levantar la pluma del papel) para drenar la rumiación.",
        "Acompaña tus prácticas de diario con solfeo de 396Hz para disolver bloqueos y miedos inconscientes.",
        "Practica la respiración de caja (inhalar 4, retener 4, exhalar 4, retener 4) antes de iniciar tus reflexiones."
      ];
    } else if (dominantEmotion.includes("Tristeza")) {
      recomendExpresion = [
        "Utiliza la escritura como un espacio de compasión, permitiéndote llorar o plasmar tus penas sin culpas ni juicios.",
        "Sintoniza la frecuencia de solfeo de 528Hz para promover la restauración celular de tu estado de ánimo y el amor propio.",
        "Agrega una sección fija al final de cada escrito donde menciones una sola cosa por la que sientas aprecio sincero hoy."
      ];
    } else if (dominantEmotion.includes("Frustración")) {
      recomendExpresion = [
        "Escribe sobre tu enojo de forma explícita, arrugando o rompiendo el papel después (si es físico) para dar salida física a la emoción.",
        "Usa solfeo de 417Hz para sintonizar con la limpieza de energías estancadas y facilitar la aceptación del cambio.",
        "Introduce pausas conscientes de silencio absoluto de 1 minuto antes de responder a situaciones tensas."
      ];
    } else if (dominantEmotion.includes("Gratitud")) {
      recomendExpresion = [
        "¡Excelente balance! Expande tu bienestar describiendo a detalle los rostros, olores y sensaciones de los momentos felices.",
        "Sintoniza frecuencias de 639Hz y 852Hz para elevar tu intuición y fortalecer tus conexiones interpersonales.",
        "Comparte un pensamiento de gratitud con alguien de tu entorno para contagiar y amplificar tu bienestar."
      ];
    } else {
      recomendExpresion = [
        "Mantén la constancia en tu registro diario. La regularidad es la clave para la auto-consciencia.",
        "Prueba variar los temas de tu diario alternando entre relatos de tu día y descripciones puramente emocionales o corporales.",
        "Usa solfeo de 432Hz o 528Hz de fondo para sintonizar con los armónicos naturales del entorno."
      ];
    }

    // Generar recomendaciones de entorno personal
    let recomendEntorno = [];
    if (dominantEmotion.includes("Ansiedad")) {
      recomendEntorno = [
        "Crea una rutina de desconexión digital absoluta al menos 45 minutos antes de dormir.",
        "Introduce difusores con esencia de lavanda, bergamota o manzanilla en tu espacio de descanso.",
        "Mantén luces cálidas y tenues por la noche para indicarle a tu sistema nervioso que está seguro."
      ];
    } else if (dominantEmotion.includes("Tristeza")) {
      recomendEntorno = [
        "Busca activamente el contacto con la luz natural durante las mañanas (camina al menos 10 minutos bajo el sol).",
        "Introduce plantas de interior 🌱 o flores frescas en tu espacio vital para renovar el aire y la energía visual.",
        "Escucha sonidos de agua corriente (lluvia, fuentes) de fondo para facilitar el flujo emocional."
      ];
    } else if (dominantEmotion.includes("Frustración")) {
      recomendEntorno = [
        "Asegura el orden visual en tu mesa o escritorio, ya que el desorden físico incrementa la reactividad mental.",
        "Crea un 'rincón de descarga': un lugar cómodo con cojines donde puedas respirar o descansar sin ruidos molestos.",
        "Aromatiza tu espacio con esencias cítricas (limón, naranja) para elevar la claridad mental y refrescar la atmósfera."
      ];
    } else if (dominantEmotion.includes("Gratitud")) {
      recomendEntorno = [
        "Conserva fotos de momentos alegres, seres queridos o frases inspiradoras a la vista en tu habitación.",
        "Ventila tus espacios habitacionales diariamente para permitir la renovación constante de la energía vital.",
        "Utiliza sonidos de cuencos de cuarzo o campanas koshi para purificar acústicamente tu hogar."
      ];
    } else {
      recomendEntorno = [
        "Mantén un espacio de lectura o meditación libre de dispositivos móviles para asegurar un santuario de paz.",
        "Prueba usar velas de cera de soja con aromas neutros o maderosos para dar calidez a tus momentos de introspección.",
        "Asegura una postura cómoda y erguida en tu asiento habitual para propiciar el flujo libre de tu respiración."
      ];
    }

    const reporte = {
      id: `analisis_ciclo_1`,
      fecha: Date.now(),
      diasCompletados: retoCompletados.length,
      patronEscritura: writingStyle,
      emocionDominante: dominantEmotion,
      analisisPalabras: {
        serenidad: wordCounts.serenidad,
        ansiedad: wordCounts.ansiedad,
        tristeza: wordCounts.tristeza,
        gratitud: wordCounts.gratitud,
        frustracion: wordCounts.frustracion,
        totalPalabras: totalWords
      },
      recomendacionesExpresion: recomendExpresion,
      recomendacionesEntorno: recomendEntorno
    };

    setAnalisisReporte(reporte);

    // Guardar en la subcolección de Firestore para persistencia durable
    if (auth.currentUser) {
      try {
        const idAnalisis = `analisis_ciclo_1`;
        const docRef = doc(db, "users", auth.currentUser.uid, "analisis21Dias", idAnalisis);
        await setDoc(docRef, reporte);
        console.log("Análisis de 21 días guardado exitosamente en subcolección 'analisis21Dias'");
      } catch (e) {
        console.error("Error al guardar en la subcolección analisis21Dias:", e);
      }
    }
    setEstaAnalizando(false);
  };
  
  // Real-time ticking timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dias = Array.from({ length: 21 }, (_, i) => i + 1);
  const completadosSet = new Set(retoCompletados);
  const progreso = Math.round((retoCompletados.length / 21) * 100);
  const practicaHoy = PLAN_21_DIAS[retoDiaActual - 1] || PLAN_21_DIAS[0];
  const yaHechoHoy = completadosSet.has(retoDiaActual);

  // Lógica de desbloqueo estilo Duolingo: el siguiente reto se desbloquea al iniciar el siguiente día (12:00 AM / medianoche local)
  const lastCompletedDay = retoDiaActual - 1;
  const lastCompletedTimestamp = retoCompletadosFechas[lastCompletedDay];

  // Calcula la medianoche (12:00 AM) del siguiente día calendario según la hora local del usuario
  const getNextMidnight = (timestamp) => {
    if (!timestamp) return null;
    const completedDate = new Date(timestamp);
    return new Date(
      completedDate.getFullYear(),
      completedDate.getMonth(),
      completedDate.getDate() + 1,
      0, 0, 0, 0
    ).getTime();
  };

  const unlockTimestamp = lastCompletedTimestamp ? getNextMidnight(lastCompletedTimestamp) : null;

  const isLockedByTimer = (retoDiaActual > 1 && unlockTimestamp)
    ? (now < unlockTimestamp)
    : false;

  const timeRemaining = (retoDiaActual > 1 && unlockTimestamp)
    ? Math.max(0, unlockTimestamp - now)
    : 0;

  const totalSeconds = Math.floor(timeRemaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Formato de hora local de desbloqueo (12:00 AM del siguiente día en la zona horaria del usuario)
  const formatUnlockTime = (timestamp) => {
    if (!timestamp) return "";
    const unlockDate = new Date(getNextMidnight(timestamp));
    try {
      const locale = idioma === "en" ? "en-US" : idioma === "fr" ? "fr-FR" : idioma === "it" ? "it-IT" : "es-CO";
      const options = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      };
      return new Intl.DateTimeFormat(locale, options).format(unlockDate);
    } catch (e) {
      return unlockDate.toLocaleString();
    }
  };
  
  const unlockTimeFormatted = lastCompletedTimestamp ? formatUnlockTime(lastCompletedTimestamp) : "";

  // Local state for interactive features
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [textoReflexion, setTextoReflexion] = useState("");
  const [editandoHoy, setEditandoHoy] = useState(false);
  const [editandoPasadoTexto, setEditandoPasadoTexto] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  // Sync today's reflection text when current day or completed state changes
  useEffect(() => {
    setTextoReflexion(retoHistorial[retoDiaActual] || "");
    setEditandoHoy(false);
  }, [retoDiaActual, yaHechoHoy, retoHistorial]);

  // Adjust greeting based on gender/name
  const n = nombre ? nombre : (sexo === "F" ? "viajera" : "viajero");
  const esFemenino = sexo === "F";

  // Dynamic motivational message
  const getMotivationalMessage = () => {
    const cant = retoCompletados.length;
    if (cant === 0) {
      return t("El primer paso siempre requiere valentía, {nombre}. ¿Comenzamos hoy?", idioma).replace("{nombre}", n);
    }
    if (cant <= 5) {
      return t("Estás sembrando una hermosa semilla de consciencia, {nombre}. Sigue regándola día a día.", idioma).replace("{nombre}", n);
    }
    if (cant <= 10) {
      return t("¡Gran constancia! Siente cómo cada práctica aporta ligereza a tu respiración.", idioma);
    }
    if (cant <= 15) {
      return t("Tu compromiso es un faro de amor propio. Ya has recorrido más de la mitad de tu viaje.", idioma);
    }
    if (cant < 21) {
      return t("La transformación florece en ti, {nombre}. Estás a muy pocos pasos de integrar este hábito sagrado.", idioma).replace("{nombre}", n);
    }
    return t("¡Felicidades, {nombre}! Has completado tus 21 días de conexión profunda. Un hito sagrado en tu sanación.", idioma).replace("{nombre}", n);
  };

  // racha: días consecutivos completados terminando en el día anterior a hoy o en hoy
  let racha = 0;
  for (let d = retoDiaActual; d >= 1; d--) {
    if (completadosSet.has(d)) racha++;
    else if (d !== retoDiaActual) break;
  }

  const diasConHistorial = dias.filter((d) => retoHistorial[d]);

  const handleCompletarHoy = (e) => {
    e.preventDefault();
    onCompletarDia(retoDiaActual, textoReflexion);
    setMostrarConfirmacion(true);
    setTimeout(() => {
      setMostrarConfirmacion(false);
    }, 3000);
    if (tutorialStep === 6 && onComenzarTutorial) {
      onComenzarTutorial();
    }
  };

  const handleGuardarEdicionHoy = (e) => {
    e.preventDefault();
    onCompletarDia(retoDiaActual, textoReflexion);
    setEditandoHoy(false);
  };

  const handleGuardarEdicionPasado = (dia, texto) => {
    onCompletarDia(dia, texto);
    setDiaSeleccionado(null);
  };

  // When a day is selected in the calendar
  const handleSelectDia = (d) => {
    if (diaSeleccionado === d) {
      setDiaSeleccionado(null);
    } else {
      setDiaSeleccionado(d);
      setEditandoPasadoTexto(retoHistorial[d] || "");
    }
  };

  const esSeleccionadoBloqueado = diaSeleccionado
    ? (Number(diaSeleccionado) > Number(retoDiaActual) || (Number(diaSeleccionado) === Number(retoDiaActual) && isLockedByTimer))
    : false;

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Reto 21 días", idioma)} onBack={onBack} />
      
      <div className="ss-stagger" style={{ flex: 1, marginTop: 6, overflowY: "auto", paddingBottom: 20 }}>
        <AvisoBienestar />

        {/* Personalized Welcome Card with Dynamic Motivation */}
        <div style={{
          background: "linear-gradient(135deg, #faf8f3 0%, #f4f6f4 100%)",
          border: `1px solid ${LINE}`,
          borderRadius: 20,
          padding: "16px 18px",
          marginBottom: 16,
          boxShadow: "0 4px 15px rgba(0,0,0,0.015)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1.5px solid ${LINE}`
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={LAVENDER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.8 }}>
              {t("Camino personal", idioma)}
            </span>
          </div>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: INK, lineHeight: 1.5, margin: 0 }}>
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Dynamic Interactive Progress Ring & Metrics Bento */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "115px 1fr",
          gap: 12,
          background: "white",
          border: `1.5px solid ${LINE}`,
          borderRadius: 20,
          padding: "16px 14px",
          marginBottom: 18,
          alignItems: "center",
          boxShadow: "0 6px 18px rgba(0,0,0,0.02)"
        }}>
          {/* Progress Ring Card */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke={LAVENDER_TINT} strokeWidth="6.5" />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="32" 
                  fill="none" 
                  stroke={LAVENDER} 
                  strokeWidth="6.5" 
                  strokeDasharray="201" 
                  strokeDashoffset={201 - (201 * progreso) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                />
              </svg>
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: INK, fontFamily: FONT_DISPLAY }}>{progreso}%</span>
                <span style={{ fontSize: 8.5, color: MUTED, textTransform: "uppercase", fontWeight: 600 }}>{t("progreso", idioma)}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                background: SAGE_TINT,
                padding: "4px 8px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 5
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SAGE_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK }}>
                  {retoCompletados.length} / 21 {t("completados", idioma)}
                </span>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LAVENDER} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-.5 2.5-2 4.5-4.5 6C5 9.5 4 11.5 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.5-2-6-4.5-8.5C14 4.5 12.5 3 12 2z" />
              </svg>
              <span style={{ fontSize: 12, color: INK, fontWeight: 600 }}>
                {t("Racha:", idioma)} <strong style={{ color: LAVENDER }}>{racha} {racha === 1 ? t("día seguido", idioma) : t("días seguidos", idioma)}</strong>
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span style={{ fontSize: 11.5, color: MUTED }}>
                {t("Enfoque hoy:", idioma)} <strong style={{ color: SAGE_DARK }}>{t("Día", idioma)} {retoDiaActual}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Today's Focus Card */}
        {isLockedByTimer ? (
          <div style={{
            background: "linear-gradient(135deg, rgba(247, 246, 240, 0.9) 0%, rgba(241, 240, 233, 0.9) 100%)",
            border: `1.5px solid ${LINE}`,
            borderRadius: 22,
            padding: "24px 20px",
            marginBottom: 18,
            position: "relative",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
          }}>
            {/* Tag */}
            <div style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              background: SAGE_DARK,
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 12px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              <Lock size={10} /> {t("Día", idioma)} {retoDiaActual} {t("en espera", idioma)}
            </div>

            <div style={{ marginTop: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 28 }}>✨</span>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 18, color: SAGE_DARK, margin: "6px 0 2px" }}>
                {idioma === "en" ? `Congratulations, ${n}!` : idioma === "fr" ? `Félicitations, ${n} !` : idioma === "it" ? `Congratulazioni, ${n}!` : `¡Felicitaciones, ${n}!`}
              </h3>
              <p style={{ fontSize: 13, color: INK, margin: "0 auto", maxWidth: "320px", lineHeight: 1.45 }}>
                {idioma === "en" ? `You have completed today's Day ${lastCompletedDay} practice. The healing path requires patience; each step takes time to settle into your soul.` : idioma === "fr" ? `Vous avez terminé la pratique du Jour ${lastCompletedDay} d'aujourd'hui. Le chemin de la guérison exige de la patience ; chaque étape a besoin de temps pour s'installer dans votre âme.` : idioma === "it" ? `Hai completato la pratica del Giorno ${lastCompletedDay} di oggi. Il cammino di guarigione richiede pazienza; ogni passo ha bisogno di tempo per insediarsi nella tua anima.` : `Has completado la práctica del Día ${lastCompletedDay} de hoy. El camino de la sanación requiere paciencia; cada paso tiene su tiempo para asentarse en tu alma.`}
              </p>
            </div>

            {/* Countdown widget */}
            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: "14px 10px", 
              border: `1.5px solid ${LINE}`,
              maxWidth: "280px",
              margin: "0 auto 14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
            }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                {t("Próximo reto disponible en:", idioma)}
              </span>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 24, fontWeight: 800, color: LAVENDER, fontFamily: FONT_DISPLAY }}>{hours.toString().padStart(2, '0')}</span>
                  <span style={{ fontSize: 9, color: MUTED, display: "block", fontWeight: 600 }}>{t("horas", idioma)}</span>
                </div>
                <span style={{ fontSize: 20, color: "#c9c8bf", fontWeight: 700, marginBottom: 12 }}>:</span>
                <div>
                  <span style={{ fontSize: 24, fontWeight: 800, color: LAVENDER, fontFamily: FONT_DISPLAY }}>{minutes.toString().padStart(2, '0')}</span>
                  <span style={{ fontSize: 9, color: MUTED, display: "block", fontWeight: 600 }}>{t("minutos", idioma)}</span>
                </div>
                <span style={{ fontSize: 20, color: "#c9c8bf", fontWeight: 700, marginBottom: 12 }}>:</span>
                <div>
                  <span style={{ fontSize: 24, fontWeight: 800, color: LAVENDER, fontFamily: FONT_DISPLAY }}>{seconds.toString().padStart(2, '0')}</span>
                  <span style={{ fontSize: 9, color: MUTED, display: "block", fontWeight: 600 }}>{t("segundos", idioma)}</span>
                </div>
              </div>
            </div>

            {/* Localized timezone text */}
            <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.4 }}>
              {t("Estará desbloqueado localmente el:", idioma)}<br />
              <strong style={{ color: INK }}>{unlockTimeFormatted}</strong>
            </p>
          </div>
        ) : (
          <div style={{
            background: "rgba(241, 236, 249, 0.6)",
            border: `1.5px solid ${LAVENDER}`,
            borderRadius: 22,
            padding: "18px 20px",
            marginBottom: 18,
            position: "relative"
          }}>
            {/* Decorative tag */}
            <div style={{
              position: "absolute",
              top: -10,
              left: 18,
              background: LAVENDER,
              color: "white",
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 10px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 1
            }}>
              {t("Práctica de hoy · Día", idioma)} {retoDiaActual}
            </div>

            <p style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 15,
              color: INK,
              lineHeight: 1.55,
              margin: "8px 0 14px",
              fontWeight: 600
            }}>
              {t(practicaHoy, idioma)}
            </p>

            {/* Interactive reflection state */}
            {yaHechoHoy && !editandoHoy ? (
              <div className="ss-fade" style={{ background: "white", borderRadius: 16, padding: "12px 14px", border: `1px solid ${LINE}`, marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {t("Completado y guardado", idioma)}
                  </span>
                  <button 
                    onClick={() => setEditandoHoy(true)}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 11,
                      fontWeight: 700,
                      color: LAVENDER,
                      cursor: "pointer",
                      padding: "2px 6px"
                    }}
                  >
                    {t("Editar reflexión", idioma)}
                  </button>
                </div>

                {retoHistorial[retoDiaActual] ? (
                  <p style={{ fontSize: 12.5, fontStyle: "italic", color: INK, margin: 0, lineHeight: 1.5 }}>
                    &ldquo;{retoHistorial[retoDiaActual]}&rdquo;
                  </p>
                ) : (
                  <p style={{ fontSize: 12, color: MUTED, margin: 0, fontStyle: "italic" }}>
                    {t("No registraste una reflexión para este día. Haz clic en Editar si deseas añadirla.", idioma)}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={editandoHoy ? handleGuardarEdicionHoy : handleCompletarHoy} className="ss-fade">
                <div style={{ marginBottom: 12, position: "relative" }}>
                  {tutorialStep === 5 && (
                    <div style={{
                      position: "absolute",
                      right: 12,
                      top: -12,
                      background: "#dfa15f",
                      color: "white",
                      fontSize: 9,
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontWeight: "bold",
                      zIndex: 99,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      animation: "ss-bounce-down 1s infinite ease-in-out"
                    }}>
                      ✍️ {t("¡Escribe algo aquí!", idioma)}
                    </div>
                  )}
                  <textarea
                    className="ss-input"
                    rows={3}
                    value={textoReflexion}
                    onChange={(e) => {
                      setTextoReflexion(e.target.value);
                      if (tutorialStep === 5 && e.target.value.trim().length >= 3 && onComenzarTutorial) {
                        onComenzarTutorial();
                      }
                    }}
                    placeholder={t("Anota tus sentimientos, descubrimientos o reflexiones del día...", idioma)}
                    autoCorrect="on"
                    spellCheck={true}
                    autoCapitalize="sentences"
                    style={{
                      fontSize: 12.5,
                      padding: "10px 12px",
                      borderRadius: 14,
                      background: "white",
                      border: tutorialStep === 5 ? "2px solid #dfa15f" : `1.5px solid ${LINE}`,
                      boxShadow: tutorialStep === 5 ? "0 0 10px rgba(223,161,95,0.2)" : undefined,
                      width: "100%",
                      fontFamily: FONT_BODY,
                      resize: "none",
                      transition: "all 0.3s ease"
                    }}
                  />
                </div>

                <div style={{ display: "flex", gap: 8, position: "relative" }}>
                  {tutorialStep === 6 && (
                    <div style={{
                      position: "absolute",
                      top: -36,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#dfa15f",
                      color: "white",
                      fontSize: 9,
                      padding: "2px 8px",
                      borderRadius: 10,
                      fontWeight: "bold",
                      zIndex: 99,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      animation: "ss-bounce-down 1s infinite ease-in-out",
                      whiteSpace: "nowrap"
                    }}>
                      👇 {t("¡Toca para completar el día!", idioma)}
                    </div>
                  )}
                  {editandoHoy && (
                    <button 
                      type="button" 
                      className="ss-btn ss-btn-ghost"
                      style={{ flex: 1, padding: "8px 12px", fontSize: 12.5 }}
                      onClick={() => setEditandoHoy(false)}
                    >
                      {t("Cancelar", idioma)}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ss-btn ss-btn-primary"
                    style={{ 
                      flex: 2, 
                      padding: "10px 16px", 
                      fontSize: 13, 
                      background: tutorialStep === 6 ? "#dfa15f" : SAGE_DARK, 
                      border: `1.5px solid ${tutorialStep === 6 ? "#dfa15f" : SAGE_DARK}`,
                      transform: tutorialStep === 6 ? "scale(1.02)" : undefined,
                      boxShadow: tutorialStep === 6 ? "0 6px 15px rgba(223,161,95,0.3)" : undefined,
                      transition: "all 0.3s ease"
                    }}
                  >
                    {editandoHoy ? t("Guardar cambios", idioma) : t("Completar práctica de hoy", idioma)}
                  </button>
                </div>
              </form>
            )}

            {/* Toast-like confirmation animation */}
            {mostrarConfirmacion && (
              <div className="ss-pop" style={{
                background: SAGE_DARK,
                color: "white",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 12,
                boxShadow: "0 4px 12px rgba(63, 107, 91, 0.3)"
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{t("¡Reflexión e hito integrados correctamente! Pasamos al siguiente día.", idioma)}</span>
              </div>
            )}
          </div>
        )}

        {/* Wellbeing Calendar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "14px 0 10px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {t("Tu calendario de 21 días", idioma)}
          </p>
          <span style={{ fontSize: 10.5, color: MUTED, fontStyle: "italic" }}>
            {t("Toca cualquier día para explorar", idioma)}
          </span>
        </div>

        {/* 21 Days Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 12 }}>
          {dias.map((d) => {
            const hecho = completadosSet.has(d);
            const esHoy = d === retoDiaActual;
            const futuro = d > retoDiaActual;
            const seleccionado = diaSeleccionado === d;
            const esHoyBloqueadoPorTimer = esHoy && isLockedByTimer;
            
            let bg = "white";
            let color = MUTED;
            let border = LINE;
            let transformScale = "scale(1)";

            if (hecho) {
              bg = SAGE_TINT;
              color = SAGE_DARK;
              border = SAGE;
            } else if (esHoy) {
              if (isLockedByTimer) {
                bg = "rgba(238, 237, 230, 0.45)";
                color = "#b0af9f";
                border = LINE;
              } else {
                bg = LAVENDER_TINT;
                color = LAVENDER;
                border = LAVENDER;
              }
            } else if (futuro) {
              bg = "white";
              color = "#c9c8bf";
              border = LINE;
            }

            if (seleccionado) {
              border = hecho ? SAGE_DARK : LAVENDER;
              transformScale = "scale(1.08)";
            }

            return (
              <button
                key={d}
                onClick={() => handleSelectDia(d)}
                style={{
                  aspectRatio: "1",
                  borderRadius: 12,
                  background: bg,
                  color,
                  border: `1.5px solid ${border}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  transform: transformScale,
                  position: "relative",
                  outline: "none"
                }}
              >
                {hecho ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 1 }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : null}
                {(futuro || esHoyBloqueadoPorTimer) ? (
                  <Lock size={10} style={{ marginBottom: 2, color: esHoyBloqueadoPorTimer ? LAVENDER : "#c9c8bf" }} />
                ) : null}
                <span>{d}</span>

                {/* Micro pulse dot for today */}
                {esHoy && !isLockedByTimer && (
                  <span style={{
                    position: "absolute",
                    bottom: 3,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: LAVENDER,
                    animation: "ss-pulse-slow 2s infinite ease-in-out"
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 10.5, color: MUTED, marginBottom: 16 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: SAGE_TINT, border: `1px solid ${SAGE}` }} /> {t("completado", idioma)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: LAVENDER_TINT, border: `1.5px solid ${LAVENDER}` }} /> {t("hoy", idioma)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: "white", border: `1.5px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={6} style={{ color: "#c9c8bf" }} />
            </span> {t("bloqueado", idioma)}
          </span>
        </div>

        {/* Dynamic Selected Day Detail Panel (TACTILE FEEDBACK) */}
        {diaSeleccionado !== null && (
          <div className="ss-pop" style={{
            background: "linear-gradient(135deg, #ffffff 0%, #fafaf8 100%)",
            border: `1.5px solid ${esSeleccionadoBloqueado ? LINE : completadosSet.has(diaSeleccionado) ? SAGE : LAVENDER}`,
            borderRadius: 20,
            padding: "16px 18px",
            marginBottom: 18,
            boxShadow: "0 8px 24px rgba(0,0,0,0.035)",
            position: "relative"
          }}>
            {/* Close button */}
            <button 
              onClick={() => setDiaSeleccionado(null)}
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "none",
                border: "none",
                color: MUTED,
                cursor: "pointer",
                padding: 4
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>

            <span style={{ 
              fontSize: 10.5, 
              fontWeight: 700, 
              color: esSeleccionadoBloqueado ? "#b0af9f" : completadosSet.has(diaSeleccionado) ? SAGE_DARK : LAVENDER, 
              textTransform: "uppercase", 
              letterSpacing: 1,
              display: "block",
              marginBottom: 4
            }}>
              {t("Día", idioma)} {diaSeleccionado} · {completadosSet.has(diaSeleccionado) ? t("Completado", idioma) : esSeleccionadoBloqueado ? t("Bloqueado", idioma) : diaSeleccionado === retoDiaActual ? t("Tu enfoque hoy", idioma) : t("Por recorrer", idioma)}
            </span>

            {!esSeleccionadoBloqueado && (
              <>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: "0 0 10px", fontWeight: 700 }}>
                  {t("Detalle de la práctica", idioma)}
                </h4>

                <p style={{ fontSize: 13, color: INK, lineHeight: 1.5, margin: "0 0 14px", fontStyle: "italic", background: "#fdfcf9", padding: "10px 12px", borderRadius: 10, borderLeft: `3px solid ${completadosSet.has(diaSeleccionado) ? SAGE : LAVENDER}` }}>
                  "{t(PLAN_21_DIAS[diaSeleccionado - 1] || PLAN_21_DIAS[0], idioma)}"
                </p>
              </>
            )}

            {/* Reflection Edit Area inside Details */}
            {esSeleccionadoBloqueado ? (
              <div style={{ marginTop: 6, textAlign: "center", background: "rgba(247, 246, 240, 0.6)", padding: "16px 14px", borderRadius: 16, border: `1px dashed ${LINE}` }}>
                <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center", marginBottom: 8, color: LAVENDER }}>
                  <Lock size={14} />
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("Reto bloqueado por tiempo", idioma)}</span>
                </div>
                <p style={{ fontSize: 13, color: INK, margin: "0 0 12px", lineHeight: 1.45 }}>
                  {idioma === "en" ? `Hello ${n}! To respect your pace of healing and emotional integration, each challenge unlocks at the start of the next day (12:00 AM).` : idioma === "fr" ? `Bonjour ${n} ! Pour respecter votre rythme de guérison et d'intégration émotionnelle, chaque défi se débloque au début du jour suivant (00h00).` : idioma === "it" ? `Ciao ${n}! Per rispettare il tuo ritmo di guarigione e integrazione emotiva, ogni sfida si sblocca all'inizio del giorno successivo (00:00).` : `¡Hola ${n}! Para respetar tu ritmo de sanación e integración emocional, cada reto se desbloquea al comenzar el siguiente día (12:00 AM).`}
                </p>
                
                {isLockedByTimer ? (
                  <>
                    {/* Live Countdown widget inside selection panel */}
                    <div style={{ background: "white", borderRadius: 12, padding: "8px 14px", border: `1px solid ${LINE}`, display: "inline-block", margin: "0 auto 12px" }}>
                      <span style={{ fontSize: 10, color: MUTED, display: "block", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                        {Number(diaSeleccionado) === Number(retoDiaActual) ? t("Disponible en:", idioma) : t("Próximo reto disponible en:", idioma)}
                      </span>
                      <span style={{ fontSize: 18, fontWeight: 800, color: LAVENDER, fontFamily: FONT_DISPLAY }}>
                        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.4 }}>
                      {t("Se desbloqueará el:", idioma)}<br />
                      <strong style={{ color: INK }}>{unlockTimeFormatted}</strong>
                    </p>
                  </>
                ) : (
                  <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.4 }}>
                    {idioma === "en" ? "This day will be available once you complete the previous days and the next day begins (12:00 AM)." : idioma === "fr" ? "Ce jour sera disponible une fois que vous aurez terminé les jours précédents et que la journée suivante aura commencé (00h00)." : idioma === "it" ? "Questo giorno sarà disponibile una volta completati i giorni precedenti e all'inizio del giorno successivo (00:00)." : "Este día estará disponible una vez que completes los días anteriores y comience el siguiente día (12:00 AM)."}
                  </p>
                )}
              </div>
            ) : completadosSet.has(diaSeleccionado) ? (
              <div style={{ marginTop: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, display: "block", marginBottom: 6 }}>
                  {t("Tu reflexión guardada:", idioma)}
                </span>
                <textarea
                  className="ss-input"
                  rows={2}
                  value={editandoPasadoTexto}
                  onChange={(e) => setEditandoPasadoTexto(e.target.value)}
                  placeholder={t("Escribe tus notas para este día...", idioma)}
                  autoCorrect="on"
                  spellCheck={true}
                  autoCapitalize="sentences"
                  style={{
                    fontSize: 12.5,
                    padding: "8px 10px",
                    borderRadius: 10,
                    background: "white",
                    border: `1.5px solid ${LINE}`,
                    width: "100%",
                    resize: "none",
                    marginBottom: 8,
                    fontFamily: FONT_BODY
                  }}
                />
                <button
                  onClick={() => handleGuardarEdicionPasado(diaSeleccionado, editandoPasadoTexto)}
                  className="ss-btn ss-btn-primary"
                  style={{ padding: "6px 12px", fontSize: 11.5, width: "auto", background: SAGE_DARK, border: `1.5px solid ${SAGE_DARK}` }}
                >
                  {t("Actualizar nota", idioma)}
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.45 }}>
                  {diaSeleccionado < retoDiaActual 
                    ? t("Omitiste la reflexión de este día. Puedes presionar el botón de abajo para marcarlo como completado e integrar tu nota.", idioma) 
                    : t("Este día está reservado para el futuro de tu proceso de sanación. Concéntrate en la práctica del día de hoy.", idioma)}
                </p>
                {diaSeleccionado < retoDiaActual && (
                  <button
                    onClick={() => {
                      onCompletarDia(diaSeleccionado, "Práctica integrada retrospectivamente.");
                      setDiaSeleccionado(null);
                    }}
                    className="ss-btn ss-btn-premium"
                    style={{ marginTop: 12, padding: "8px 14px", fontSize: 12 }}
                  >
                    {t("Marcar como completado retrospectivamente", idioma)}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* History of Completed Days (Alternative View) */}
        {diasConHistorial.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              {t("Bitácora de reflexiones", idioma)} ({diasConHistorial.length})
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              {diasConHistorial.map((d) => (
                <div 
                  key={d} 
                  onClick={() => handleSelectDia(d)}
                  style={{ 
                    background: "white", 
                    border: `1px solid ${LINE}`, 
                    borderRadius: 16, 
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = SAGE}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = LINE}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase" }}>{t("Día", idioma)} {d}</span>
                    <span style={{ fontSize: 10, color: MUTED }}>{t("Toca para ver o editar", idioma)}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: INK, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                    &ldquo;{retoHistorial[d]}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ALGORITMO DE ANÁLISIS DE PATRONES Y EMOCIONES DE 21 DÍAS */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fbfbfc 100%)",
          border: `1.5px solid ${LINE}`,
          borderRadius: 16,
          padding: "24px 20px",
          marginBottom: 20,
          boxShadow: "0 6px 18px rgba(0,0,0,0.015)"
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              background: "#e8f3ee",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18
            }}>
              🧠
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: SAGE_DARK, margin: 0, fontFamily: "inherit" }}>
                {t("Algoritmo de Análisis de 21 Días", idioma)}
              </h3>
              <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>
                {t("Análisis personalizado de patrones de escritura y salud emocional", idioma)}
              </p>
            </div>
          </div>

          <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 16px 0" }}>
            {t("Nuestro algoritmo de bienestar analiza la profundidad de tus reflexiones, el volumen de palabras y las frecuencias semánticas emocionales de tus registros para ofrecerte un diagnóstico interactivo y recomendaciones a la medida para tu hogar, trabajo y expresión.", idioma)}
          </p>

          {errorAnalisis && (
            <div className="ss-fade" style={{
              background: "#fdf3f2",
              border: "1px solid #f5c2c2",
              borderRadius: 12,
              padding: "12px 14px",
              marginBottom: 16,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, color: "#a13232", margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                  {errorAnalisis}
                </p>
              </div>
              <button
                onClick={() => setErrorAnalisis(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#a13232",
                  fontSize: 14,
                  cursor: "pointer",
                  padding: 0,
                  fontWeight: "bold",
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Trigger Button */}
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: analisisReporte ? 20 : 0 }}>
            <button
              onClick={ejecutarAlgoritmoDeAnalisis}
              disabled={estaAnalizando}
              style={{
                background: estaAnalizando ? "#cbdcd5" : SAGE_DARK,
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: estaAnalizando ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!estaAnalizando) {
                  e.currentTarget.style.background = "#2b4b3e";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!estaAnalizando) {
                  e.currentTarget.style.background = SAGE_DARK;
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {estaAnalizando ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite", width: 14, height: 14 }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="#ffffff" />
                  </svg>
                  <span>{t("Procesando patrones...", idioma)}</span>
                </>
              ) : (
                <>
                  <span>✨ {analisisReporte ? t("Re-calcular Análisis", idioma) : t("Ejecutar Algoritmo de Análisis", idioma)}</span>
                </>
              )}
            </button>
          </div>

          {/* Report Display */}
          {analisisReporte ? (
            <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 20 }}>
              
              {/* Resultados Principales */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "#f5f9f7", border: `1px solid ${LINE}`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>
                    {t("Emoción Dominante", idioma)}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: SAGE_DARK }}>
                    {t(analisisReporte.emocionDominante, idioma)}
                  </div>
                </div>
                <div style={{ background: "#f5f9f7", border: `1px solid ${LINE}`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>
                    {t("Estilo de Escritura", idioma)}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: SAGE_DARK }}>
                    {t(analisisReporte.patronEscritura, idioma)}
                  </div>
                </div>
              </div>

              {/* Frecuencias Semánticas - Custom CSS Chart */}
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px 0" }}>
                  {t("Frecuencias de Palabras Detectadas", idioma)}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: t("Serenidad / Fluidez", idioma), count: analisisReporte.analisisPalabras.serenidad, color: "#487e67" },
                    { label: t("Estrés / Alerta", idioma), count: analisisReporte.analisisPalabras.ansiedad, color: "#d6a15c" },
                    { label: t("Tristeza / Procesamiento", idioma), count: analisisReporte.analisisPalabras.tristeza, color: "#5c8ad6" },
                    { label: t("Gratitud / Florecimiento", idioma), count: analisisReporte.analisisPalabras.gratitud, color: "#b969a5" },
                    { label: t("Frustración / Tensión", idioma), count: analisisReporte.analisisPalabras.frustracion, color: "#d65c5c" }
                  ].map((bar, i) => {
                    const maxVal = Math.max(
                      analisisReporte.analisisPalabras.serenidad || 1,
                      analisisReporte.analisisPalabras.ansiedad || 1,
                      analisisReporte.analisisPalabras.tristeza || 1,
                      analisisReporte.analisisPalabras.gratitud || 1,
                      analisisReporte.analisisPalabras.frustracion || 1,
                      1
                    );
                    const percentage = Math.max((bar.count / maxVal) * 100, 3);
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: INK, width: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {bar.label}
                        </span>
                        <div style={{ flex: 1, background: "#f0f2f1", height: 8, borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${percentage}%`, background: bar.color, height: "100%", borderRadius: 4, transition: "width 0.5s ease" }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, width: 15, textAlign: "right" }}>
                          {bar.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 8 }}>
                  {t("Total de palabras analizadas:", idioma)} <strong>{analisisReporte.analisisPalabras.totalPalabras}</strong>. {analisisReporte.analisisPalabras.totalPalabras > 150 ? t("Tu profundidad de escritura sugiere un alto nivel de desahogo y conexión consigo mismo.", idioma) : t("Tu profundidad de escritura sugiere un enfoque puntual y reflexivo.", idioma)}
                </div>
              </div>

              {/* Recomendaciones Personalizadas de Expresión */}
              <div style={{ marginBottom: 18 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>💬</span> {t("Recomendaciones de Expresión Emocional", idioma)}
                </h4>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: INK, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 6 }}>
                  {analisisReporte.recomendacionesExpresion.map((item, idx) => (
                    <li key={idx} style={{ paddingLeft: 2 }}>{t(item, idioma)}</li>
                  ))}
                </ul>
              </div>

              {/* Recomendaciones Personalizadas de Entorno */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>🌱</span> {t("Recomendaciones para tu Entorno Personal", idioma)}
                </h4>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: INK, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 6 }}>
                  {analisisReporte.recomendacionesEntorno.map((item, idx) => (
                    <li key={idx} style={{ paddingLeft: 2 }}>{t(item, idioma)}</li>
                  ))}
                </ul>
              </div>

              {/* Guardado Status Info */}
              <div style={{ background: "#fbfcfb", border: `1px dashed ${LINE}`, borderRadius: 8, padding: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: MUTED }}>
                <span>🛡️</span>
                <span>
                  {t("Este reporte se encuentra protegido y guardado en tu cuenta segura en la nube (respaldado por la infraestructura empresarial de Google Cloud). Se actualiza dinámicamente con cada re-cálculo.", idioma)}
                </span>
              </div>

            </div>
          ) : (
            <div style={{ background: "#fafbfc", border: `1px dashed ${LINE}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
              <p style={{ fontSize: 12.5, color: MUTED, margin: 0 }}>
                {t("Presiona el botón de arriba para que el algoritmo procese tus reflexiones diarias y te ofrezca un diagnóstico semántico detallado.", idioma)}
              </p>
            </div>
          )}
        </div>

      </div>

      <button className="ss-btn ss-btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={onVerHub}>
        {t("Explorar todas las perspectivas", idioma)}
      </button>
    </div>
  );
}

const HUB_ITEMS_BASE = [
  { id: "constelacion", label: "Constelación familiar", icon: "\u2698", desc: "Mira los patrones heredados en tu árbol familiar" },
  { id: "natal", label: "Carta natal", icon: "\u2726", desc: "Tu signo solar y lo que revela de tu forma de ser" },
  { id: "azteca", label: "Carta azteca", icon: "\u2726", desc: "Tu signo del Tonalpohualli, el calendario sagrado mexica" },
  { id: "astral", label: "Carta astral", icon: "\u2726", desc: "Una mirada más amplia a tu mapa astrológico personal" },
  { id: "numeros", label: "Números sagrados", icon: "\u2733", desc: "Tu número de camino de vida, según tu fecha de nacimiento" },
  { id: "tarot", label: "Lectura de tarot", icon: "\u2727", desc: "Tres cartas para reflejar tu momento actual" },
  { id: "cnv", label: "Comunicación no violenta", icon: "\u2764", desc: "Frases que cambian la manera de hablar y de escuchar" },
  { id: "cuestionarios", label: "Cuestionarios de autoconocimiento", icon: "\u2753", desc: "Test breves sobre estrés, apego y patrones emocionales" },
];

// getHubItems devuelve siempre la lista completa — el bloqueo visual lo gestiona
// ScreenHub tarjeta por tarjeta, según el índice y el plan del usuario.
function getHubItems(planPago) {
  return HUB_ITEMS_BASE;
}
// Las perspectivas están 100% desbloqueadas para usuarios en período de prueba de 3 días,
// usuarios Premium y usuarios con Acceso Total (VIP).
// Solo se bloquean si la prueba ha expirado y no se cuenta con suscripción activa.
function maxPerspectivas(planPago, enPruebaActiva = false, esPremium = false, tieneAccesoTotal = false) {
  if (tieneAccesoTotal || esPremium || enPruebaActiva || planPago === "anual" || planPago === "mensual") {
    return Infinity;
  }
  return 3;
}
// Alias para no romper referencias existentes que esperan el arreglo completo (fuera del hub visual)
const HUB_ITEMS = HUB_ITEMS_BASE;

// Tabla de comparación de características por plan — se usa en ScreenPaywall
const TABLA_PLANES = [
  { feature: "Reto de 21 días", prueba: true, mensual: true, anual: true },
  { feature: "Herramientas de calma", prueba: true, mensual: true, anual: true },
  { feature: "Perspectivas", prueba: "Todas (3 días)", mensual: "Todas", anual: "Todas" },
  { feature: "Diario de bienestar", prueba: true, mensual: true, anual: true },
  { feature: "Especialistas", prueba: false, mensual: false, anual: true },
];

const ARBOL_ITEM = { id: "arbol", label: "Árbol genealógico", icon: "\u2698" };

function ScreenHub({ onSelect, onDiario, planPago, esPremium = false, enPruebaActiva = false, pruebaExpirada = false, tieneAccesoTotal = false, onPaywall, tutorialStep, idioma }) {
  const items = getHubItems(planPago);
  const tieneAccesoCompleto = tieneAccesoTotal || esPremium || enPruebaActiva || planPago === "anual" || planPago === "mensual";
  const limite = tieneAccesoCompleto ? Infinity : (pruebaExpirada ? 0 : 3);

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Perspectivas", idioma)} />
      <div className="ss-stagger" style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <p style={{ color: MUTED, fontSize: 13, margin: "0 0 14px", lineHeight: 1.5 }}>
          {t("Estas son capas adicionales para ampliar tu mirada — un espejo más para conocerte, nunca un requisito para sanar.", idioma)}
        </p>

        {pruebaExpirada && !tieneAccesoCompleto && (
          <div style={{ background: "#fff3ef", border: "1px solid #f0c4bb", borderRadius: 12, padding: "10px 12px", marginBottom: 14, fontSize: 11.5, color: "#8a3a20", lineHeight: 1.4 }}>
            {t("Tu período de prueba de 3 días ha culminado. Adquiere una suscripción para desbloquear todas las perspectivas.", idioma)}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {items.map((h, i) => {
            const bloqueada = i >= limite;
            const esConstelacionTuto = tutorialStep === 11 && h.id === "constelacion";

            const manejarClick = () => {
              if (tutorialStep !== null && tutorialStep === 11) {
                if (h.id === "constelacion") {
                  onSelect(h);
                } else {
                  console.log("Durante la guía, abre el Árbol Genealógico ('Constelación familiar').");
                }
                return;
              }
              if (bloqueada) {
                if (onPaywall) onPaywall();
              } else {
                onSelect(h);
              }
            };

            return (
              <button
                key={h.id}
                onClick={manejarClick}
                style={{
                  position: "relative",
                  background: bloqueada ? "#f7f6f3" : "white",
                  border: esConstelacionTuto ? "2.5px solid #dfa15f" : `1px solid ${bloqueada ? LINE : LINE}`,
                  borderRadius: 16,
                  padding: "18px 12px",
                  textAlign: "center",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  opacity: bloqueada ? 0.72 : 1,
                  boxShadow: esConstelacionTuto ? "0 0 14px rgba(223,161,95,0.4)" : undefined,
                  transform: esConstelacionTuto ? "scale(1.02)" : undefined,
                  transition: "all 0.3s ease",
                }}
              >
                {esConstelacionTuto && (
                  <div style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#dfa15f",
                    color: "white",
                    fontSize: 8,
                    fontWeight: "bold",
                    padding: "1px 6px",
                    borderRadius: 8,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    animation: "ss-bounce-down 1s infinite ease-in-out",
                    whiteSpace: "nowrap",
                    zIndex: 9
                  }}>
                    {t("¡Toca aquí!", idioma)}
                  </div>
                )}
                {/* Candado en la esquina superior derecha */}
                {bloqueada && (
                  <span style={{
                    position: "absolute",
                    top: 8, right: 10,
                    fontSize: 12,
                    opacity: 0.6,
                  }}>
                    🔒
                  </span>
                )}
                <div style={{ fontSize: 20, color: bloqueada ? MUTED : LAVENDER, marginBottom: 8 }}>{h.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: bloqueada ? MUTED : INK, lineHeight: 1.3 }}>{t(h.label, idioma)}</div>
                {h.desc && (
                  <div style={{ fontSize: 10.5, color: MUTED, lineHeight: 1.35, marginTop: 4 }}>{t(h.desc, idioma)}</div>
                )}
                {bloqueada && (
                  <div style={{ fontSize: 10, color: KINOEMOTION_UI, fontWeight: 700, marginTop: 6, letterSpacing: 0.3 }}>
                    {t("Desbloquear", idioma)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <button className="ss-btn ss-btn-primary" style={{ width: "100%", marginTop: 14 }} onClick={onDiario}>
        {t("Ir a mi diario", idioma)}
      </button>
    </div>
  );
}

const PARENTESCOS = [
  { id: "padre", label: "Padre", gen: 1, lado: "paterno" },
  { id: "madre", label: "Madre", gen: 1, lado: "materno" },
  { id: "tio_p", label: "Tío/a paterno", gen: 1, lado: "paterno" },
  { id: "tio_m", label: "Tío/a materno", gen: 1, lado: "materno" },
  { id: "abuelo_p", label: "Abuelo paterno", gen: 2, lado: "paterno" },
  { id: "abuela_p", label: "Abuela paterna", gen: 2, lado: "paterno" },
  { id: "abuelo_m", label: "Abuelo materno", gen: 2, lado: "materno" },
  { id: "abuela_m", label: "Abuela materna", gen: 2, lado: "materno" },
  { id: "hermano", label: "Hermano/a", gen: 0, lado: "propia" },
  { id: "pareja", label: "Pareja", gen: 0, lado: "propia" },
  { id: "hijo", label: "Hijo/a", gen: -1, lado: "propia" },
];

// Cada vínculo tiene una "distancia" simbólica que se usa para dibujar la constelación
// (menor = más cerca del centro). Al permitir varios vínculos por persona, la distancia
// final es el promedio de los seleccionados: una relación "cercana y conflictiva" queda
// a media distancia, reflejando su ambivalencia real.
const VINCULOS = [
  { id: "cercano", label: "Cercano", dist: 0.4 },
  { id: "protector", label: "Protector / de cuidado", dist: 0.45 },
  { id: "dependiente", label: "Dependiente", dist: 0.55 },
  { id: "ambivalente", label: "Ambivalente", dist: 0.85 },
  { id: "distante", label: "Distante", dist: 1 },
  { id: "frio", label: "Frío / formal", dist: 1.1 },
  { id: "conflictivo", label: "Conflictivo", dist: 1.3 },
  { id: "roto", label: "Roto / sin contacto", dist: 1.7 },
];

// Compatibilidad: normaliza miembros antiguos (vinculo: "x") al formato nuevo (vinculos: ["x"]).
const vinculosDe = (m) => (Array.isArray(m.vinculos) ? m.vinculos : m.vinculo ? [m.vinculo] : []);
const etiquetasVinculos = (m, idioma) =>
  vinculosDe(m)
    .map((id) => {
      const v = VINCULOS.find((x) => x.id === id);
      return v ? t(v.label, idioma).toLowerCase() : id;
    })
    .join(", ");
const distanciaVinculos = (m) => {
  const ids = vinculosDe(m);
  if (ids.length === 0) return 1;
  const suma = ids.reduce((acc, id) => {
    const v = VINCULOS.find((x) => x.id === id);
    return acc + (v ? v.dist : 1);
  }, 0);
  return suma / ids.length;
};

function ScreenArbol({ familia, setFamilia, onVerConstelacion, onBack, idioma }) {
  const [form, setForm] = useState({ nombre: "", parentesco: "padre", estado: "vivo", vinculos: ["cercano"], excluido: false, noConocido: false, fallecioAntesDeNacer: false, notas: "" });

  // Alterna un vínculo; se permiten varios a la vez (las relaciones reales son mixtas),
  // pero siempre queda al menos uno seleccionado.
  const alternarVinculo = (id) => {
    setForm((f) => {
      const ya = f.vinculos.includes(id);
      if (ya && f.vinculos.length === 1) return f;
      return { ...f, vinculos: ya ? f.vinculos.filter((v) => v !== id) : [...f.vinculos, id] };
    });
  };

  const agregar = () => {
    if (!form.nombre.trim()) return;
    const p = PARENTESCOS.find((x) => x.id === form.parentesco);
    setFamilia((f) => [
      ...f,
      {
        id: Date.now().toString(),
        nombre: form.nombre.trim(),
        parentescoId: p.id,
        parentescoLabel: p.label,
        gen: p.gen,
        lado: p.lado,
        estado: form.estado,
        vinculos: form.estado === "no_nacido" ? [] : form.vinculos,
        excluido: form.excluido,
        noConocido: form.noConocido,
        // Solo tiene sentido si la persona sí llegó a nacer y luego falleció
        fallecioAntesDeNacer: form.estado === "fallecido" ? form.fallecioAntesDeNacer : false,
        notas: form.notas.trim(),
      },
    ]);
    setForm({ nombre: "", parentesco: "padre", estado: "vivo", vinculos: ["cercano"], excluido: false, noConocido: false, fallecioAntesDeNacer: false, notas: "" });
  };

  const eliminar = (id) => setFamilia((f) => f.filter((m) => m.id !== id));

  const porGeneracion = (g) => familia.filter((m) => m.gen === g);

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Constelación familiar · tu árbol", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <p style={{ fontSize: 12.5, color: MUTED, margin: "0 0 16px", lineHeight: 1.5 }}>
          {t("Agrega a tu familia. Con esta información construimos tu constelación.", idioma)}
        </p>

        <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: 14, marginBottom: 18 }}>
          <input
            className="ss-input"
            placeholder={t("Nombre", idioma)}
            style={{ marginBottom: 8 }}
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <select
            className="ss-input"
            style={{ marginBottom: 8 }}
            value={form.parentesco}
            onChange={(e) => setForm({ ...form, parentesco: e.target.value })}
          >
            {PARENTESCOS.map((p) => (
              <option key={p.id} value={p.id}>{t(p.label, idioma)}</option>
            ))}
          </select>
          <div style={{ marginBottom: 8 }}>
            <select className="ss-input" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
              <option value="vivo">{t("Vivo/a", idioma)}</option>
              <option value="fallecido">{t("Fallecido/a", idioma)}</option>
              <option value="no_nacido">{t("Nunca llegó a nacer (aborto, pérdida o mortinato)", idioma)}</option>
            </select>
          </div>
          {form.estado === "fallecido" && (
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: MUTED, margin: "0 0 10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.fallecioAntesDeNacer}
                onChange={(e) => setForm({ ...form, fallecioAntesDeNacer: e.target.checked })}
                style={{ width: 20, height: 20, minWidth: 20, accentColor: "#8a6bb8", cursor: "pointer" }}
              />
              {t("Falleció antes de que tú nacieras", idioma)}
            </label>
          )}
          {form.estado === "no_nacido" ? (
            <p style={{ fontSize: 12, color: "#7a6b95", background: LAVENDER_TINT, borderRadius: 10, padding: "10px 12px", margin: "2px 0 10px", lineHeight: 1.5 }}>
              {t("En las constelaciones familiares, un hijo o hermano que no llegó a nacer —por aborto espontáneo, interrupción del embarazo o mortinato— sigue perteneciendo al sistema y merece un lugar en tu árbol, aunque no haya vínculo que describir.", idioma)}
            </p>
          ) : (
            <>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, margin: "2px 2px 7px" }}>
                {t("¿Cómo es el vínculo?", idioma)} <span style={{ fontWeight: 500 }}>({t("puedes elegir varias", idioma)})</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }} role="group" aria-label="Características del vínculo">
                {VINCULOS.map((v) => {
                  const activo = form.vinculos.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`ss-chip${activo ? " active" : ""}`}
                      aria-pressed={activo}
                      onClick={() => alternarVinculo(v.id)}
                      style={{ fontSize: 12, padding: "8px 13px" }}
                    >
                      {t(v.label, idioma)}
                    </button>
                  );
                })}
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: MUTED, margin: "4px 0 10px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.noConocido}
                  onChange={(e) => setForm({ ...form, noConocido: e.target.checked })}
                  style={{ width: 20, height: 20, minWidth: 20, accentColor: SAGE_DARK, cursor: "pointer" }}
                />
                {t("Nunca lo conociste o no tuviste relación con esta persona", idioma)}
              </label>
            </>
          )}
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: MUTED, margin: "4px 0 10px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={form.excluido}
              onChange={(e) => setForm({ ...form, excluido: e.target.checked })}
              style={{ width: 20, height: 20, minWidth: 20, accentColor: SAGE_DARK, cursor: "pointer" }}
            />
            {t("Es un miembro excluido o del que no se habla en la familia", idioma)}
          </label>
          <label style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, display: "block", margin: "2px 2px 5px" }}>
            {t("Notas · opcional", idioma)}
          </label>
          <textarea
            className="ss-input"
            rows={3}
            style={{ marginBottom: 4 }}
            placeholder={t("Cualquier detalle que quieras recordar sobre esta persona o el vínculo: una situación, una fecha, algo que se dijo o no se dijo…", idioma)}
            value={form.notas}
            onChange={(e) => setForm({ ...form, notas: e.target.value })}
            autoCorrect="on"
            spellCheck={true}
            autoCapitalize="sentences"
          />
          <p style={{ fontSize: 10.5, color: MUTED, margin: "0 0 12px", lineHeight: 1.4 }}>
            {t("Queda guardado como tu propio registro; no reemplaza los vínculos de arriba, los complementa.", idioma)}
          </p>
          <button className="ss-btn ss-btn-ghost" style={{ width: "100%" }} onClick={agregar}>
            {t("Añadir al árbol", idioma)}
          </button>
        </div>

        {[2, 1, 0, -1].map((g) => {
          const miembros = porGeneracion(g);
          if (miembros.length === 0) return null;
          const titulo = { 2: t("Abuelos", idioma), 1: t("Padres y tíos", idioma), 0: t("Tu generación", idioma), "-1": t("Hijos", idioma) }[g];
          return (
            <div key={g} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
                {titulo}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {miembros.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: m.excluido ? "#fbeceb" : "white",
                      border: `1px solid ${m.excluido ? "#e3b3ae" : LINE}`,
                      borderRadius: 12,
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: INK, margin: 0 }}>{m.nombre}</p>
                      <p style={{ fontSize: 11, color: MUTED, margin: "2px 0 0" }}>
                        {t(m.parentescoLabel, idioma)} &middot;{" "}
                        {m.estado === "no_nacido" ? t("Nunca llegó a nacer", idioma) : m.estado === "fallecido" ? t("Falleció", idioma) : t("Vive", idioma)}
                        {m.fallecioAntesDeNacer ? ` ${t("antes de que nacieras", idioma)}` : ""}
                        {m.estado !== "no_nacido" && <> &middot; {t("vínculo", idioma)} {etiquetasVinculos(m, idioma)}</>}
                        {m.noConocido ? ` · ${t("nunca lo conociste", idioma)}` : ""}
                        {m.excluido ? ` · ${t("excluido", idioma)}` : ""}
                      </p>
                      {m.notas && (
                        <p style={{ fontSize: 11, color: "#5b4a78", background: LAVENDER_TINT, borderRadius: 8, padding: "6px 9px", margin: "6px 0 0", lineHeight: 1.4, fontStyle: "italic" }}>
                          &ldquo;{m.notas}&rdquo;
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => eliminar(m.id)}
                      aria-label={`Eliminar a ${m.nombre}`}
                      style={{ background: "none", border: "none", color: MUTED, fontSize: 16, cursor: "pointer", marginLeft: 8, flexShrink: 0 }}
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {familia.length === 0 && (
          <p style={{ fontSize: 12.5, color: MUTED, textAlign: "center", marginTop: 20 }}>
            {t("Aún no has agregado a nadie. Empieza por tu padre o tu madre.", idioma)}
          </p>
        )}
      </div>
      <button
        className="ss-btn ss-btn-premium"
        style={{ width: "100%", opacity: familia.length > 0 ? 1 : 0.5 }}
        disabled={familia.length === 0}
        onClick={onVerConstelacion}
      >
        {t("Ver mi constelación familiar", idioma)}
      </button>
    </div>
  );
}

function ScreenConstelacion({ familia, nombre, sexo, onBack, onEditar, onIrReto, idioma }) {
  const lecturas = generarLecturasConstelacion(familia, idioma);
  const narrativa = generarNarrativaConstelacion(nombre, sexo, familia, lecturas, idioma);
  const filaY = { 2: 40, 1: 130, 0: 230, "-1": 320 };
  const lienzoRef = useRef(null);
  const [width, setWidth] = useState(320);

  useEffect(() => {
    const el = lienzoRef.current;
    if (!el) return;
    const medir = () => setWidth(el.offsetWidth || 320);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const conLayout = familia.map((m, i) => {
    const mismaGen = familia.filter((x) => x.gen === m.gen);
    const idxEnGen = mismaGen.findIndex((x) => x.id === m.id);
    const totalEnGen = mismaGen.length;
    const spread = width - 60;
    const paso = totalEnGen > 1 ? spread / (totalEnGen - 1) : 0;
    const xBase = totalEnGen > 1 ? 30 + idxEnGen * paso : width / 2;
    const v = { dist: distanciaVinculos(m) };
    const jitter = m.lado === "paterno" ? -18 : m.lado === "materno" ? 18 : 0;
    return { ...m, x: Math.max(24, Math.min(width - 24, xBase + jitter)), y: filaY[m.gen], distancia: v.dist };
  });

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Constelación familiar", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <div
          ref={lienzoRef}
          style={{
            position: "relative",
            width: "100%",
            height: 380,
            background: "#20241f",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          {conLayout.map((m) => (
            <div
              key={"line" + m.id}
              style={{
                position: "absolute",
                left: width / 2,
                top: 275,
                width: Math.hypot(m.x - width / 2, m.y - 275),
                height: 1,
                background: m.excluido ? "transparent" : "rgba(255,255,255,0.15)",
                borderTop: m.excluido ? "1px dashed rgba(255,255,255,0.25)" : "none",
                transformOrigin: "0 0",
                transform: `rotate(${Math.atan2(m.y - 275, m.x - width / 2)}rad)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: width / 2 - 20,
              top: 255,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: SAGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 11,
              fontWeight: 700,
              boxShadow: "0 0 0 5px rgba(111,168,146,0.25)",
            }}
          >
            {t("Tú", idioma)}
          </div>
          {conLayout.map((m) => (
            <div
              key={m.id}
              style={{
                position: "absolute",
                left: m.x - 16,
                top: m.y - 16,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: m.excluido
                  ? "transparent"
                  : m.estado === "no_nacido"
                  ? "rgba(255,255,255,0.35)"
                  : m.estado === "fallecido"
                  ? "#8a6bb8"
                  : "#e3d9a3",
                border: m.excluido ? "1.5px dashed rgba(255,255,255,0.5)" : m.estado === "no_nacido" ? "1px solid rgba(255,255,255,0.55)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
                color: m.excluido ? "rgba(255,255,255,0.6)" : "#20241f",
                textAlign: "center",
                lineHeight: 1.1,
              }}
              title={m.nombre}
            >
              {m.estado === "no_nacido" ? "\u2727" : m.nombre.slice(0, 2).toUpperCase()}
            </div>
          ))}
          {conLayout.map((m) => (
            <p
              key={"label" + m.id}
              style={{
                position: "absolute",
                left: m.x - 30,
                top: m.y + 18,
                width: 60,
                textAlign: "center",
                fontSize: 8.5,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {m.nombre}
            </p>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 10.5, color: MUTED, marginBottom: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e3d9a3" }} /> {t("vivo", idioma)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#8a6bb8" }} /> {t("fallecido", idioma)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px dashed #999" }} /> {t("excluido", idioma)}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.35)", border: "1px solid #999" }} /> {t("nunca nació", idioma)}
          </span>
          <span>{t("distancia = cercanía del vínculo", idioma)}</span>
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 10px" }}>
          {t("Lecturas del sistema", idioma)}
        </p>
        <Narrativa parrafos={narrativa} />

        {familia.some((m) => m.notas) && (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "18px 0 10px" }}>
              {t("Tus notas", idioma)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 4 }}>
              {familia
                .filter((m) => m.notas)
                .map((m) => (
                  <div key={"nota" + m.id} style={{ background: LAVENDER_TINT, borderRadius: 12, padding: "10px 13px" }}>
                    <p style={{ fontSize: 11.5, fontWeight: 700, color: "#5b4a78", margin: "0 0 3px" }}>{m.nombre}</p>
                    <p style={{ fontSize: 12, color: "#5b4a78", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{m.notas}&rdquo;</p>
                  </div>
                ))}
            </div>
          </>
        )}

        <CTAReto onIrReto={onIrReto} idioma={idioma} />
      </div>
      <button className="ss-btn ss-btn-ghost" style={{ width: "100%", marginTop: 12 }} onClick={onEditar}>
        {t("Editar mi árbol", idioma)}
      </button>
    </div>
  );
}

const NUMEROS_SAGRADOS = {
  1: "inicio, semilla, potencial puro",
  2: "polaridad, elección, primer contraste",
  3: "acción, movimiento hacia adelante",
  4: "estructura, base, orden",
  5: "centro, poder de decisión",
  6: "flujo, organización del entorno",
  7: "reflexión, sintonía interior",
  8: "justicia, equilibrio de fuerzas",
  9: "paciencia, proceso que aún no termina",
  10: "manifestación, resultado visible",
  11: "fuerza para sostener lo logrado",
  12: "comprensión, entendimiento más amplio",
  13: "trascendencia, cierre y salto a un nuevo ciclo",
};

const CITAS = {
  astrologia: "Tradición de astrología tropical occidental (convención estándar de la disciplina; ver p. ej. Greene, L. (1976). Relating: An Astrological Guide to Living With Others. Londres: Coventure).",
  tonalpohualli: "Caso, A. (1967). Los calendarios prehispánicos. México: UNAM, Instituto de Investigaciones Históricas.",
  constelaciones: "Hellinger, B. (2001). Órdenes del amor: cursos seleccionados (trad. S. Kabelka). Barcelona: Herder. (Título original: Ordnungen der Liebe. Ein Kurs-Buch, 2000).",
  numerologia: "Tradición numerológica pitagórica (convención estándar de la disciplina; ver p. ej. Javane, F. y Bunker, D. (1979). Numerology and the Divine Triangle. Atglen: Whitford Press).",
  tarot: "Tradición del tarot Rider-Waite-Smith (convención estándar de la disciplina; ver p. ej. Waite, A. E. (1911). The Pictorial Key to the Tarot. Londres: Rider & Son).",
  // Lecturas de biodescodificación: estas son obras de referencia reconocidas en el
  // género de la interpretación simbólica de síntomas — el contenido de cada lectura de
  // ¡Suelta! es redacción propia, no una cita textual de estos libros. Se excluye
  // deliberadamente cualquier referencia a la "Nueva Medicina Germánica" de R. G. Hamer:
  // ese marco ha sido señalado por autoridades de salud como pseudomedicina peligrosa
  // (con casos documentados de consultantes que abandonaron proceso de acompañamiento real), algo que
  // contradice el propio aviso de bienestar de esta app.
  biodescodificacion: [
    "Martel, J. (1998). El gran diccionario de las dolencias y enfermedades (trad. esp.). Montreal: Editions Quintessence.",
    "Hay, L. (1984). Usted puede sanar su vida. Carlsbad: Hay House.",
  ],
};

function art(sexo) {
  return sexo === "M" ? "o" : "a";
}

// Extrae, del árbol familiar, el patrón más relevante para conectarlo con otras lecturas
// (cartas, numerología) sin repetir el texto completo de constelaciones — solo los
// nombres involucrados y una descripción breve, en el mismo orden de prioridad que usa
// generarLecturas. Devuelve null si no hay árbol o no hay ningún patrón detectable.
function patronFamiliarDestacado(familia) {
  if (!familia || familia.length === 0) return null;
  const excluidos = familia.filter((m) => m.excluido);
  const rotos = familia.filter((m) => vinculosDe(m).includes("roto"));
  const conflictivos = familia.filter((m) => vinculosDe(m).includes("conflictivo"));
  const ambivalentes = familia.filter((m) => {
    const v = vinculosDe(m);
    return v.includes("ambivalente") || (v.includes("cercano") && v.includes("conflictivo"));
  });
  const dependientes = familia.filter((m) => vinculosDe(m).includes("dependiente"));
  const frios = familia.filter((m) => vinculosDe(m).includes("frio"));
  const protectores = familia.filter((m) => vinculosDe(m).includes("protector"));

  if (excluidos.length > 0) return { nombres: excluidos.map((e) => e.nombre), descriptor: "un lugar excluido en tu sistema familiar" };
  if (rotos.length > 0) return { nombres: rotos.map((r) => r.nombre), descriptor: "un vínculo roto o sin contacto en tu árbol" };
  if (conflictivos.length > 0) return { nombres: conflictivos.map((c) => c.nombre), descriptor: "una tensión activa en tu árbol familiar" };
  if (ambivalentes.length > 0) return { nombres: ambivalentes.map((a) => a.nombre), descriptor: "un vínculo cercano y tenso a la vez en tu árbol" };
  if (dependientes.length > 0) return { nombres: dependientes.map((d) => d.nombre), descriptor: "un vínculo de dependencia en tu árbol" };
  if (frios.length > 0) return { nombres: frios.map((f) => f.nombre), descriptor: "un vínculo frío o distante en tu árbol" };
  if (protectores.length > 0) return { nombres: protectores.map((p) => p.nombre), descriptor: "un rol protector o de cuidado en tu árbol" };
  return null;
}

function generarNarrativaNatal(nombre, sexo, carta, resultados, familia) {
  const z = carta.sol;
  const n = nombre || "tú";
  const a = art(sexo);
  const parrafos = [];

  parrafos.push(
    `${n}, tu Sol está en ${z.signo}, un signo de elemento ${z.elemento.toLowerCase()} y modalidad ${z.modalidad.toLowerCase()}, regido por ${z.regente}. Esta posición describe tu forma más consciente de moverte por el mundo, y la palabra que mejor la resume es “${z.clave.toLowerCase()}”. En su expresión luminosa, esta energía te da ${z.luz.toLowerCase()}; en su expresión más sombría, puede aparecer como ${z.sombra.toLowerCase()}.`
  );

  parrafos.push(
    `Es importante que entiendas que luz y sombra no son opuestos que compiten, sino dos caras de la misma energía: la sombra suele activarse justo cuando la cualidad luminosa se exige de más, sin descanso. Si notas que caes en ${z.sombra.toLowerCase()} con frecuencia, no es que hayas fallado; es una señal de que estás usando tu energía de ${z.signo.toLowerCase()} desde el cansancio y no desde la elección consciente.`
  );

  if (resultados && resultados.length > 0) {
    const r = resultados[0];
    const lente =
      z.modalidad.toLowerCase() === "cardinal"
        ? "la urgencia de actuar antes de terminar de sentir del todo lo que está pasando"
        : z.modalidad.toLowerCase() === "fijo"
        ? "la dificultad para soltar algo una vez que ya se instaló"
        : `la tendencia a adaptarte tanto que terminas perdiéndote de vista ${a === "o" ? "a ti mismo" : "a ti misma"}`;
    parrafos.push(
      `Esto resuena con lo que compartiste antes: identificamos posibles causas emocionales relacionadas con “${r.termino.toLowerCase()}”. Alguien con Sol en ${z.signo} suele vivir ese tipo de tensión desde ${lente}. No es una causa única ni definitiva, pero sí una lente más para observar el mismo patrón desde otro ángulo.`
    );
  } else {
    parrafos.push(
      `Por ahora esta es la capa base de tu carta, calculada solo con tu Sol. Cuantos más datos compartas —tu historia, tus síntomas físicos, tus emociones—, más podremos conectar esta energía solar con lo que realmente estás viviendo, en vez de quedarnos en una descripción general del signo.`
    );
  }

  const patronFamiliar = patronFamiliarDestacado(familia);
  if (patronFamiliar) {
    parrafos.push(
      `Tu árbol familiar añade otra capa a esta lectura: identificamos ${patronFamiliar.descriptor} con ${patronFamiliar.nombres.join(", ")}. Con Sol en ${z.signo}, este tipo de dinámica suele vivirse desde ${z.sombra.toLowerCase()} cuando aparece sin resolver — la misma energía de "${z.clave.toLowerCase()}" que te define también determina cómo respondes cuando ese vínculo se tensiona.`
    );
  }

  parrafos.push(
    `Vale la pena aclarar los límites reales de esta lectura: lo que ves arriba se calculó con tu Sol, a partir de tu fecha de nacimiento, siguiendo ${CITAS.astrologia} En la astrología moderna, el Sol es solo uno de los tres pilares de una carta —lo que se conoce como el "big three": el Sol representa tu esencia y voluntad; la Luna, tu mundo emocional y lo que te da seguridad; y el Ascendente, cómo te presentas al mundo y cómo te perciben los demás.`
  );

  if (carta.completo) {
    parrafos.push(
      `Con la hora y el lugar que diste, ya calculamos también tu Luna en ${carta.luna.signo} y tu Ascendente en ${carta.ascendente.signo}, junto con las doce casas astrológicas —los ámbitos concretos de tu vida donde cada energía se expresa. Puedes ver ese mapa completo, con los cuatro ángulos de tu carta y las doce casas, en "Carta astral" dentro de la sección de Perspectivas.`
    );
  } else {
    parrafos.push(
      `Para calcular tu Luna, tu Ascendente y las doce casas astrológicas —los ámbitos concretos de tu vida donde cada energía se expresa— hace falta también la hora y el lugar exactos de tu nacimiento, procesados con una tabla de efemérides. El Ascendente, por ejemplo, cambia aproximadamente cada dos horas, así que sin la hora precisa no puede determinarse. Esta versión te da el núcleo de tu carta, no el mapa completo; aun así, ese núcleo ya dice algo verdadero de quién eres.`
    );
  }

  const regentes = z.regente.split("/").map((r) => r.trim());
  const principal = regentes[0];
  const infoPlaneta = PLANETAS_REGENTES[principal];
  if (infoPlaneta) {
    parrafos.push(
      `Hay una capa más que suele pasar desapercibida: tu Sol en ${z.signo} está regido por ${principal}${
        regentes.length > 1 ? ` (en su acepción moderna; la tradición antigua usaba también a ${regentes[1]})` : ""
      }, el planeta que gobierna ${infoPlaneta.rige}. Esto le da a tu energía de “${z.clave.toLowerCase()}” un tono particular: ${infoPlaneta.tono}. No es un dato decorativo — es la firma personal de ${principal} coloreando cómo vives tu signo, distinta de cómo la viviría alguien del mismo signo bajo otro énfasis planetario.`
    );
  }

  parrafos.push(
    `En el sistema tradicional de la astrología, cada signo también se asocia con una zona del cuerpo: para ${z.signo}, es ${z.zonaCorporal.toLowerCase()}. Esto no es un concepto formal de salud ni una relación de causa-efecto comprobada — es una correspondencia simbólica antigua. Aun así, si tu afectación física de hoy coincide con esa zona, puede ser una capa adicional interesante para observar, sumada a la lectura de biodescodificación que ya viste.`
  );

  return parrafos;
}

function generarNarrativaAzteca(nombre, sexo, t, resultados, familia) {
  const n = nombre || "tú";
  const parrafos = [];
  const energiaNumero = NUMEROS_SAGRADOS[t.numero] || "una energía particular dentro del ciclo";

  parrafos.push(
    `${n}, naciste en el día ${t.numero}-${t.signo.nombre} (${t.signo.es}) del Tonalpohualli, el calendario sagrado mexica de 260 días. Este día está bajo el resguardo de ${t.signo.deidad}, y su energía se asocia con ${t.signo.energia.toLowerCase()}. Perteneces además a la trecena número ${t.trecenaOrden}, que comienza en el signo ${t.trecenaSignoInicio.nombre}: según los tonalpouhque, los antiguos lectores del destino, la trecena matizaba el carácter de cada uno de los días con los que compartía esos 13 ciclos.`
  );

  parrafos.push(
    `El número ${t.numero} que acompaña a tu signo aporta una capa adicional: en la lectura numerológica del Tonalpohualli se asocia con ${energiaNumero}. En la tradición mexica, cada número del 1 al 13 tenía además su propio "Señor del Día" —una divinidad regente—, de modo que un mismo día recibía varias influencias divinas a la vez: la del signo, la de su número y la de la trecena a la que pertenece. Combinado con la energía de ${t.signo.nombre}, tu número sugiere que tu forma particular de expresar “${t.signo.energia.toLowerCase()}” está atravesada por ese matiz —no son fuerzas separadas, sino una sola energía vista desde varios ángulos del mismo calendario.`
  );

  if (resultados && resultados.length > 0) {
    const r = resultados[0];
    parrafos.push(
      `Esto resuena con lo que nos contaste sobre “${r.termino.toLowerCase()}”: la energía de ${t.signo.nombre} puede leerse como una invitación específica para ${n} en este momento, no como una explicación cerrada, sino como otra manera de nombrar lo mismo que ya identificaste antes.`
    );
  } else {
    parrafos.push(
      `Un tonalpouhqui tradicional no se quedaría solo con el signo del día de nacimiento: también observaría cómo se relaciona con los días que lo rodean dentro de la misma trecena, buscando coherencia entre el carácter general del ciclo y la situación puntual de la persona consultante. Cuantos más datos compartas sobre lo que estás viviendo, más sentido cobrará esta lectura.`
    );
  }

  const patronFamiliar = patronFamiliarDestacado(familia);
  if (patronFamiliar) {
    parrafos.push(
      `Tu árbol familiar también aporta contexto aquí: identificamos ${patronFamiliar.descriptor} con ${patronFamiliar.nombres.join(", ")}. En la cosmovisión mexica, cada persona nace en deuda con quienes la antecedieron —el tonalli, la energía vital recibida al nacer, se entiende como algo heredado, no generado en soledad. Esta dinámica familiar puede leerse como parte de esa herencia energética que sigues procesando.`
    );
  }

  parrafos.push(
    `Este cálculo usa la correlación de Alfonso Caso, según la cual el 13 de agosto de 1521 del calendario juliano equivale al día 1-Cóatl; es la correlación más aceptada académicamente en México. Fuente: ${CITAS.tonalpohualli} Otras correlaciones reconocidas, como la de León-Portilla o la GMT, pueden arrojar un resultado distinto para la misma fecha; esto no es un error del cálculo, sino un debate académico real y todavía abierto entre especialistas. Sea cual sea la correlación, el mensaje de fondo se mantiene: naciste en movimiento, dentro de un ciclo que te antecede y te sostiene.`
  );

  return parrafos;
}

function Narrativa({ parrafos }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 4 }}>
      {parrafos.map((p, i) => (
        <p key={i} style={{ fontSize: 12.5, color: INK, lineHeight: 1.6, margin: 0 }}>
          {p}
        </p>
      ))}
    </div>
  );
}

const ARCANOS_MAYORES = [
  { n: 0, nombre: "El Loco", derecho: "nuevos comienzos, libertad, saltar a lo desconocido con fe", invertido: "miedo al cambio, decisiones imprudentes", claves: ["comienzo", "fe", "espontaneidad"], elemento: "Aire", consejo: "Da el primer paso aunque no veas todo el camino; la confianza se construye caminando." },
  { n: 1, nombre: "El Mago", derecho: "poder personal, capacidad de manifestar, tienes los recursos", invertido: "talento sin usar, dudas de tu propia fuerza", claves: ["voluntad", "recursos", "acción"], elemento: "Mercurio", consejo: "Ya tienes lo que necesitas; el reto es atreverte a usarlo." },
  { n: 2, nombre: "La Sacerdotisa", derecho: "intuición, sabiduría interior, escuchar lo que aún no se dice", invertido: "desconexión de tu voz interna, secretos", claves: ["intuición", "misterio", "silencio"], elemento: "Luna", consejo: "La respuesta que buscas afuera ya está susurrando adentro. Haz silencio para oírla." },
  { n: 3, nombre: "La Emperatriz", derecho: "fertilidad, cuidado, abundancia, crear con amor", invertido: "bloqueo creativo, descuido de ti misma", claves: ["cuidado", "abundancia", "crear"], elemento: "Venus", consejo: "Cuidar de ti no es egoísmo: es la tierra donde florece todo lo demás." },
  { n: 4, nombre: "El Emperador", derecho: "estructura, orden, figura de autoridad, poner límites", invertido: "rigidez, control excesivo o su ausencia", claves: ["orden", "límites", "estabilidad"], elemento: "Aries", consejo: "Poner un límite claro es un acto de amor propio, no de dureza." },
  { n: 5, nombre: "El Sumo Sacerdote", derecho: "tradición, aprendizaje, guía, valores heredados", invertido: "rebeldía necesaria, cuestionar lo impuesto", claves: ["guía", "tradición", "aprender"], elemento: "Tauro", consejo: "Honra lo que heredaste, pero decide con cuáles de esos mandatos te quedas." },
  { n: 6, nombre: "Los Enamorados", derecho: "vínculos, decisiones del corazón, unión y elección", invertido: "desequilibrio en una relación, elección difícil", claves: ["elección", "unión", "valores"], elemento: "Géminis", consejo: "Toda unión verdadera empieza por una elección consciente, no por costumbre." },
  { n: 7, nombre: "El Carro", derecho: "voluntad, avance, control de fuerzas opuestas, victoria", invertido: "falta de dirección, sentirte a la deriva", claves: ["voluntad", "avance", "dominio"], elemento: "Cáncer", consejo: "Puedes avanzar aunque tus emociones tiren para lados opuestos: tú llevas las riendas." },
  { n: 8, nombre: "La Justicia", derecho: "verdad, causa y efecto, equilibrio, asumir consecuencias", invertido: "injusticia sentida, evadir responsabilidad", claves: ["verdad", "equilibrio", "responsabilidad"], elemento: "Libra", consejo: "Asumir tu parte no te condena; te devuelve el poder sobre lo que sigue." },
  { n: 9, nombre: "El Ermitaño", derecho: "introspección, búsqueda interior, retirarte para verte", invertido: "aislamiento, soledad no elegida", claves: ["introspección", "búsqueda", "pausa"], elemento: "Virgo", consejo: "Retirarte un momento no es huir: es encender tu propia luz antes de volver." },
  { n: 10, nombre: "La Rueda de la Fortuna", derecho: "ciclos, cambio, un giro del destino, lo que va y viene", invertido: "resistencia al cambio, sentir mala racha", claves: ["ciclos", "cambio", "destino"], elemento: "Júpiter", consejo: "Nada permanece igual; si hoy la rueda baja, su naturaleza es volver a subir." },
  { n: 11, nombre: "La Fuerza", derecho: "coraje sereno, dominar lo instintivo con ternura", invertido: "dudas, fuerza vuelta contra ti misma", claves: ["coraje", "ternura", "dominio propio"], elemento: "Leo", consejo: "La verdadera fuerza no aprieta: acaricia. Trátate con la suavidad que le darías a alguien que amas." },
  { n: 12, nombre: "El Colgado", derecho: "pausa, rendición, ver desde otro ángulo, soltar el control", invertido: "estancamiento, resistirte a soltar", claves: ["pausa", "entrega", "nueva mirada"], elemento: "Agua", consejo: "A veces avanzar es dejar de forzar. Mira tu situación de cabeza: quizás aparezca lo que no veías." },
  { n: 13, nombre: "La Muerte", derecho: "cierre de un ciclo, transformación, dejar ir para renacer", invertido: "miedo al final, aferrarte a lo que ya terminó", claves: ["cierre", "transformación", "renacer"], elemento: "Escorpio", consejo: "Algo termina para que otra cosa pueda nacer. Deja ir con gratitud lo que ya cumplió su tiempo." },
  { n: 14, nombre: "La Templanza", derecho: "equilibrio, paciencia, integrar los opuestos, sanar", invertido: "excesos, desarmonía interna", claves: ["equilibrio", "paciencia", "sanar"], elemento: "Sagitario", consejo: "Sanar no se apura. Mezcla, en su justa medida, descanso y acción, dar y recibir." },
  { n: 15, nombre: "El Diablo", derecho: "ataduras, apegos, patrones de los que cuesta salir", invertido: "liberación, romper una cadena", claves: ["apego", "sombra", "cadena"], elemento: "Capricornio", consejo: "Mira de frente aquello que te ata: reconocerlo es aflojar el primer nudo." },
  { n: 16, nombre: "La Torre", derecho: "ruptura súbita, caída de lo falso, revelación liberadora", invertido: "evitar un cambio inevitable, miedo al colapso", claves: ["ruptura", "revelación", "verdad"], elemento: "Marte", consejo: "Cuando cae lo que se sostenía sobre algo falso, no pierdes: te liberas de un peso que no era tuyo." },
  { n: 17, nombre: "La Estrella", derecho: "esperanza, fe renovada, calma después de la tormenta", invertido: "desánimo, fe perdida temporalmente", claves: ["esperanza", "calma", "guía"], elemento: "Acuario", consejo: "Después de lo más oscuro llega una luz suave. Confía: la calma también es un destino." },
  { n: 18, nombre: "La Luna", derecho: "emociones profundas, lo inconsciente, ilusiones y miedos", invertido: "confusión que empieza a aclararse", claves: ["inconsciente", "emoción", "misterio"], elemento: "Piscis", consejo: "No todo lo que sientes en la penumbra es real. Camina despacio hasta que la luz aclare el paisaje." },
  { n: 19, nombre: "El Sol", derecho: "claridad, alegría, vitalidad, éxito y calidez", invertido: "optimismo bloqueado, luz que aún no ves", claves: ["claridad", "alegría", "vitalidad"], elemento: "Sol", consejo: "Permítete la alegría sin culpa. La luz que sientes también tiene derecho a existir." },
  { n: 20, nombre: "El Juicio", derecho: "renacer, un llamado interior, perdón y despertar", invertido: "autocrítica, no escuchar tu llamado", claves: ["renacer", "perdón", "llamado"], elemento: "Fuego", consejo: "Perdonarte por quien fuiste es el permiso para convertirte en quien vienes siendo." },
  { n: 21, nombre: "El Mundo", derecho: "plenitud, cierre de ciclo logrado, integración, logro", invertido: "un ciclo casi cerrado, falta un último paso", claves: ["plenitud", "logro", "integración"], elemento: "Saturno", consejo: "Reconoce lo que completaste. Cerrar un ciclo con conciencia es lo que abre el siguiente." },
];

const POSICIONES_TAROT = [
  { clave: "Pasado", desc: "las raíces de lo que vives hoy" },
  { clave: "Presente", desc: "dónde estás parada ahora mismo" },
  { clave: "Futuro", desc: "hacia dónde tiende tu proceso" },
];

function tirarTresCartas() {
  const baraja = [...ARCANOS_MAYORES];
  const elegidas = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * baraja.length);
    const carta = baraja.splice(idx, 1)[0];
    const invertida = Math.random() < 0.35;
    elegidas.push({ ...carta, invertida });
  }
  return elegidas;
}

// Contenido curado sobre Comunicación No Violenta (CNV), a partir del marco que desarrolló
// Marshall Rosenberg: observación sin juicio, sentimiento, necesidad y petición concreta.
// No son cálculos personalizados como las otras perspectivas; son frases y reencuadres
// prácticos, pensados para poder aplicarse directamente en una conversación real.
const CNV_PILARES = [
  {
    id: "observacion",
    titulo: "Observación, sin juicio",
    color: SAGE_DARK,
    fondo: SAGE_TINT,
    texto: "Describe los hechos como los vería una cámara, separados de la interpretación que haces de ellos. La diferencia entre \u201csiempre llegas tarde\u201d y \u201cllegaste 20 minutos después de lo acordado\u201d cambia por completo cómo recibe el mensaje la otra persona.",
  },
  {
    id: "sentimiento",
    titulo: "Sentimiento",
    color: LAVENDER,
    fondo: LAVENDER_TINT,
    texto: "Nombra lo que sientes tú, no lo que \u201cte hace sentir\u201d la otra persona. Decir \u201cme siento sola\u201d abre una conversación; decir \u201cme dejas sola\u201d invita a la defensa.",
  },
  {
    id: "necesidad",
    titulo: "Necesidad",
    color: "#b5722e",
    fondo: "#faf1e6",
    texto: "Detrás de cada sentimiento hay una necesidad universal \u2014de respeto, de descanso, de conexión, de ser escuchada. Nombrarla en voz alta, en vez de esperar que la adivinen, es lo que hace posible que se resuelva.",
  },
  {
    id: "peticion",
    titulo: "Petición concreta",
    color: "#3f6b5b",
    fondo: "#eaf3ef",
    texto: "Pide una acción específica y realizable, no una promesa abstracta. \u201cLlámame si vas a llegar tarde\u201d es una petición; \u201cquiero que seas más considerado\u201d, aunque válida, es difícil de cumplir porque no dice cómo.",
  },
];

// Cada frase muestra el reencuadre completo: la forma habitual (con juicio o exigencia
// implícita) frente a la forma en CNV (observación + sentimiento + necesidad + petición).
const CNV_FRASES = [
  {
    contexto: "En vez de un reproche...",
    habitual: "\u201cNunca me ayudas con nada en la casa.\u201d",
    cnv: "\u201cEsta semana sentí que cargué sola con la casa. Necesito sentir que esto lo llevamos entre los dos. ¿Podemos repartir las tareas de esta semana ahora mismo?\u201d",
  },
  {
    contexto: "En vez de una acusación...",
    habitual: "\u201cSiempre me interrumpes cuando hablo.\u201d",
    cnv: "\u201cCuando me interrumpiste en la reunión, sentí que lo que decía no importaba. Necesito sentirme escuchada. ¿Podrías esperar a que termine la idea antes de responder?\u201d",
  },
  {
    contexto: "En vez de una etiqueta...",
    habitual: "\u201cEres un egoísta, solo piensas en ti.\u201d",
    cnv: "\u201cCuando decidiste sin consultarme, me sentí excluida. Necesito sentirme parte de las decisiones que nos afectan a los dos. ¿Podemos acordar consultarnos antes de decidir algo así?\u201d",
  },
  {
    contexto: "En vez de una exigencia disfrazada...",
    habitual: "\u201cDeberías saber que eso me molesta.\u201d",
    cnv: "\u201cCuando pasó eso, me sentí molesta. Necesito que sepas qué me afecta, y prefiero decírtelo directamente a esperar que lo adivines. ¿Te parece si te cuento qué es?\u201d",
  },
  {
    contexto: "En vez de un silencio resentido...",
    habitual: "\u201cNo pasa nada\u201d (cuando sí pasa algo).",
    cnv: "\u201cSí hay algo que me está afectando y todavía no sé cómo decirlo bien. ¿Podemos hablarlo con calma en un rato?\u201d",
  },
  {
    contexto: "En vez de una comparación...",
    habitual: "\u201cTu hermana nunca me trata así.\u201d",
    cnv: "\u201cCuando me hablaste así, me sentí herida. Necesito sentir respeto en cómo nos hablamos. ¿Podemos repetir esa conversación de otra forma?\u201d",
  },
  {
    contexto: "Al poner un límite...",
    habitual: "\u201cDeja de molestarme con eso.\u201d",
    cnv: "\u201cCuando insistes en el tema después de que te pedí un espacio, siento presión. Necesito ese tiempo para pensar con calma. ¿Podemos retomarlo mañana?\u201d",
  },
  {
    contexto: "Al recibir una crítica...",
    habitual: "\u201cSiempre encuentras algo que criticar.\u201d",
    cnv: "\u201cCuando escucho varias correcciones seguidas, siento que nada de lo que hago está bien. Necesito también reconocimiento. ¿Podrías empezar por algo que sí funcionó?\u201d",
  },
];

function ScreenComunicacionNoViolenta({ onBack, onIrReto, idioma }) {
  const [tabActual, setTabActual] = useState("aprender"); // "aprender" | "ejercicios" | "historial"
  const [ejercicioActual, setEjercicioActual] = useState("juicios"); // "juicios" | "ataques"
  const [historial, setHistorial] = useState([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorCNV, setErrorCNV] = useState(null);

  // Estados Ejercicio 1: Traductor de Juicios
  const [formJuicio, setFormJuicio] = useState({
    persona: "",
    juicio: "",
    observacion: "",
    sentimiento: "frustrado/a",
    necesidad: "conexión",
    peticion: ""
  });
  const [resultadoJuicio, setResultadoJuicio] = useState(null);

  // Estados Ejercicio 2: Reencuadre de Ataques
  const [formAtaque, setFormAtaque] = useState({
    criticaRecibida: "",
    reaccionReactiva: "",
    necesidadEstimada: "aprecio"
  });
  const [resultadoAtaque, setResultadoAtaque] = useState(null);

  // Cargar historial de Firestore al montar o cambiar al tab de historial
  useEffect(() => {
    if (auth.currentUser) {
      cargarHistorialCNV();
    }
  }, [tabActual]);

  const cargarHistorialCNV = async () => {
    if (!auth.currentUser) return;
    setCargandoHistorial(true);
    try {
      const q = query(collection(db, "users", auth.currentUser.uid, "comunicacion_no_violenta"));
      const snapshot = await getDocs(q);
      const items = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });
      items.sort((a, b) => b.fecha - a.fecha);
      setHistorial(items);
    } catch (err) {
      console.error("Error cargando historial de CNV:", err);
    } finally {
      setCargandoHistorial(false);
    }
  };

  const guardarEjercicioCNV = async (tipo, entradasUsuario, resultadoAnalisis) => {
    if (!auth.currentUser) return;
    setGuardando(true);
    const id = "cnv_" + Date.now().toString();
    const entry = {
      id,
      tipo,
      fecha: Date.now(),
      entradasUsuario,
      resultadoAnalisis
    };
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid, "comunicacion_no_violenta", id), entry);
      setHistorial(prev => [entry, ...prev]);
    } catch (err) {
      console.error("Error guardando ejercicio CNV:", err);
    } finally {
      setGuardando(false);
    }
  };

  // Algoritmo 1: Deconstrucción analítica de un juicio relacional
  const ejecutarAnalisisJuicio = () => {
    setErrorCNV(null);
    const { persona, juicio, observacion, sentimiento, necesidad, peticion } = formJuicio;
    if (!persona.trim() || !juicio.trim() || !observacion.trim() || !peticion.trim()) {
      setErrorCNV(t("Por favor rellena todos los campos para ejecutar el algoritmo de análisis.", idioma));
      return;
    }

    // Análisis determinista de la proyección de sombra y reestructuración cognitiva sistémica
    const analisisResult = {
      proyeccionSombra: `El juicio "${juicio}" dirigido hacia ${persona} revela una expectativa inconsciente depositada en la relación. En constelaciones, esto indica una 'lealtad ciega' a patrones de control relacional heredados. Al catalogarle de esta forma, escondes la vulnerabilidad de admitir que te afecta su conducta.`,
      traduccionCnvCompleta: `Cuando observo que "${observacion.trim()}", me siento ${sentimiento} porque necesito ${necesidad}. Por lo tanto, elijo expresarte con amor: "${peticion.trim()}"`,
      reencuadreSistemico: `¿Dónde más en tu historia o en tu clan familiar has visto esta misma frustración de sentir que tus necesidades de ${necesidad} son ignoradas? Integrar esta revelación te permite desligar a ${persona} de las deudas emocionales de tus ancestros.`,
      guiasDeDialogo: [
        `Fórmula de apertura constructiva: "${persona}, quiero contarte cómo me siento respecto a algo que pasó sin buscar culpables. ¿Podemos hablar?"`,
        `Contención ante el rechazo: Si responde a la defensiva, no contraataques. Haz una pausa y di: "Escucho que te frustra esto. Mi intención es solo compartirte lo que es importante para mí".`
      ]
    };

    setResultadoJuicio(analisisResult);
    guardarEjercicioCNV("deconstruccion", formJuicio, analisisResult);
  };

  // Algoritmo 2: Decodificador empático y reencuadre de ataques verbales
  const ejecutarAnalisisAtaque = () => {
    setErrorCNV(null);
    const { criticaRecibida, reaccionReactiva, necesidadEstimada } = formAtaque;
    if (!criticaRecibida.trim() || !reaccionReactiva.trim()) {
      setErrorCNV(t("Por favor completa los campos de entrada de la crítica y tu reacción habitual.", idioma));
      return;
    }

    // Algoritmo de reencuadre basado en desescalamiento y sintonía sistémica
    const analisisResult = {
      traduccionAtaque: `Marshall Rosenberg solía decir que 'las críticas son expresiones trágicas de necesidades insatisfechas'. Cuando te dicen "${criticaRecibida.trim()}", la otra persona en realidad está experimentando impotencia y desconexión, intentando torpemente pedir atención a su necesidad de ${necesidadEstimada}.`,
      reencuadreCompasivo: `Responder de forma reactiva diciendo "${reaccionReactiva.trim()}" valida su ataque y perpetúa el ciclo de defensa-ataque de tu sistema de alerta biológica. Al reencuadrar el ataque como un grito de vulnerabilidad de la otra persona, desarmas el gatillo emocional.`,
      guionDesescalamiento: `Prueba responder de la siguiente manera: "Escucho que estás muy molesto/a por esto. ¿Lo que necesitas de mí es más ${necesidadEstimada} en la relación? Me gustaría entender mejor tu perspectiva sin discutir."`,
      ejercicioIntrospectivo: `Tu impulso biológico de defenderte con "${reaccionReactiva.trim()}" es una señal de que este ataque toca una memoria de desvalorización. Respira hondo y recuerda que la hostilidad ajena habla de sus propias limitaciones, no de tu valor personal.`
    };

    setResultadoAtaque(analisisResult);
    guardarEjercicioCNV("empatia_profunda", formAtaque, analisisResult);
  };

  const eliminarRegistroCNV = async (id) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "comunicacion_no_violenta", id));
      setHistorial(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error eliminando registro CNV:", err);
    }
  };

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Comunicación no violenta", idioma)} onBack={onBack} />
      
      {/* Selector de Pestañas Principal */}
      <div style={{ display: "flex", background: "#f5f3eb", borderRadius: 12, padding: 4, marginBottom: 16, marginTop: 8 }}>
        {[
          { id: "aprender", label: t("Aprender CNV", idioma) },
          { id: "ejercicios", label: t("Introspección", idioma) },
          { id: "historial", label: t("Mi Historial", idioma) }
        ].map(tb => (
          <button
            key={tb.id}
            onClick={() => {
              setTabActual(tb.id);
              setErrorCNV(null);
            }}
            style={{
              flex: 1,
              border: "none",
              borderRadius: 8,
              padding: "8px 10px",
              fontSize: 12,
              fontWeight: tabActual === tb.id ? "bold" : "normal",
              background: tabActual === tb.id ? "white" : "transparent",
              color: tabActual === tb.id ? SAGE_DARK : MUTED,
              boxShadow: tabActual === tb.id ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        
        {/* PESTAÑA 1: APRENDER CNV (EDUCATIVO) */}
        {tabActual === "aprender" && (
          <div className="ss-fade">
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: "0 0 16px" }}>
              {t("La Comunicación No Violenta (CNV), desarrollada por el psicólogo Marshall Rosenberg, propone una forma de hablar que reduce la defensividad de quien escucha: describir hechos sin juicio, nombrar lo que sientes, la necesidad detrás de ese sentimiento, y pedir algo concreto. No cambia lo que necesitas decir — cambia cómo lo recibe la otra persona.", idioma)}
            </p>

            <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "16px 0 10px", letterSpacing: 0.5 }}>
              {t("Los cuatro pasos fundamentales", idioma)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {CNV_PILARES.map((p) => (
                <div key={p.id} style={{ background: p.fondo, borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(0,0,0,0.02)" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: p.color, margin: "0 0 4px" }}>{t(p.titulo, idioma)}</p>
                  <p style={{ fontSize: 12, color: INK, lineHeight: 1.55, margin: 0 }}>{t(p.texto, idioma)}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "20px 0 10px", letterSpacing: 0.5 }}>
              {t("Frases que transforman relaciones", idioma)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
              {CNV_FRASES.map((f, i) => (
                <div key={i} style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: "13px 15px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 8px" }}>
                    {t(f.contexto, idioma)}
                  </p>
                  <p style={{ fontSize: 12, color: "#9a5252", lineHeight: 1.5, margin: "0 0 8px", textDecoration: "line-through", textDecorationColor: "#d9b3b3" }}>
                    {t(f.habitual, idioma)}
                  </p>
                  <p style={{ fontSize: 12.5, color: INK, lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                    {t(f.cnv, idioma)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ background: "#fcfaf6", border: "1px dashed #dfa15f", borderRadius: 16, padding: "14px 16px", margin: "20px 0" }}>
              <p style={{ fontSize: 12.5, fontWeight: "bold", color: "#8c5b2b", margin: "0 0 6px" }}>💡 {t("Consejo del sistema:", idioma)}</p>
              <p style={{ fontSize: 12, color: "#a07545", lineHeight: 1.55, margin: 0 }}>
                {t("La CNV no se trata de hablar de manera artificial, sino de conectar de corazón. Cambia a la pestaña de Introspección arriba para resolver un conflicto personal usando nuestros algoritmos de análisis sistémico.", idioma)}
              </p>
            </div>

            <CTAReto onIrReto={onIrReto} idioma={idioma} />
          </div>
        )}

        {/* PESTAÑA 2: EJERCICIOS E INTROSPECCIÓN (INTERACTIVOS) */}
        {tabActual === "ejercicios" && (
          <div className="ss-fade">
            <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, margin: "0 0 16px" }}>
              {t("Selecciona uno de los dos algoritmos de análisis para decodificar tus patrones comunicativos e iniciar un ejercicio de sanación profunda:", idioma)}
            </p>

            {errorCNV && (
              <div className="ss-fade" style={{
                background: "#fdf3f2",
                border: "1px solid #f5c2c2",
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 16,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
              }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, color: "#a13232", margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                    {errorCNV}
                  </p>
                </div>
                <button
                  onClick={() => setErrorCNV(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#a13232",
                    fontSize: 14,
                    cursor: "pointer",
                    padding: 0,
                    fontWeight: "bold",
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Selector de sub-ejercicios */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => {
                  setEjercicioActual("juicios");
                  setErrorCNV(null);
                }}
                style={{
                  flex: 1,
                  background: ejercicioActual === "juicios" ? SAGE_TINT : "white",
                  border: `1px solid ${ejercicioActual === "juicios" ? SAGE_DARK : LINE}`,
                  borderRadius: 14,
                  padding: "12px 10px",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: ejercicioActual === "juicios" ? SAGE_DARK : INK,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                🔮 {t("Traductor de Juicios", idioma)}
              </button>
              <button
                onClick={() => {
                  setEjercicioActual("ataques");
                  setErrorCNV(null);
                }}
                style={{
                  flex: 1,
                  background: ejercicioActual === "ataques" ? LAVENDER_TINT : "white",
                  border: `1px solid ${ejercicioActual === "ataques" ? LAVENDER : LINE}`,
                  borderRadius: 14,
                  padding: "12px 10px",
                  fontSize: 12,
                  fontWeight: "bold",
                  color: ejercicioActual === "ataques" ? LAVENDER : INK,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                🛡️ {t("Reencuadre de Ataques", idioma)}
              </button>
            </div>

            {/* EJERCICIO 1: TRADUCTOR DE JUICIOS */}
            {ejercicioActual === "juicios" && (
              <div className="ss-fade" style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }}>
                <p style={{ fontSize: 13.5, fontWeight: "bold", color: SAGE_DARK, margin: "0 0 4px" }}>
                  🔮 {t("Conversor de Juicios a Lenguaje de Vida", idioma)}
                </p>
                <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 16px", lineHeight: 1.4 }}>
                  {t("Deconstruye un juicio relacional rígido para extraer la vulnerabilidad y la necesidad humana no satisfecha que esconde detrás.", idioma)}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("¿Hacia quién tienes este juicio o tensión relacional?", idioma)}
                    </label>
                    <input
                      type="text"
                      className="ss-input"
                      placeholder={t("Ej: Mi pareja, mi madre, mi jefe...", idioma)}
                      value={formJuicio.persona}
                      onChange={e => setFormJuicio(prev => ({ ...prev, persona: e.target.value }))}
                      autoCorrect="on"
                      spellCheck={true}
                      autoCapitalize="sentences"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("¿Cuál es tu juicio, queja o etiqueta sobre él/ella? (Dilo sin filtros)", idioma)}
                    </label>
                    <textarea
                      rows={2}
                      className="ss-input"
                      placeholder={t("Ej: Es un egoísta desconsiderado que nunca me apoya en nada.", idioma)}
                      value={formJuicio.juicio}
                      onChange={e => setFormJuicio(prev => ({ ...prev, juicio: e.target.value }))}
                      autoCorrect="on"
                      spellCheck={true}
                      autoCapitalize="sentences"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("Deconstruye: ¿Qué pasó objetivamente? (Hecho medible por una cámara)", idioma)}
                    </label>
                    <textarea
                      rows={2}
                      className="ss-input"
                      placeholder={t("Ej: El fin de semana pasado planificó un viaje sin consultarme.", idioma)}
                      value={formJuicio.observacion}
                      onChange={e => setFormJuicio(prev => ({ ...prev, observacion: e.target.value }))}
                      autoCorrect="on"
                      spellCheck={true}
                      autoCapitalize="sentences"
                    />
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                        {t("Sentimiento de fondo", idioma)}
                      </label>
                      <select
                        className="ss-input"
                        value={formJuicio.sentimiento}
                        onChange={e => setFormJuicio(prev => ({ ...prev, sentimiento: e.target.value }))}
                        style={{ height: 38, background: "white", padding: "0 8px" }}
                      >
                        {["frustrado/a", "triste", "solitario/a", "agotado/a", "inseguro/a", "excluido/a", "angustiado/a", "desvalorizado/a"].map(s => (
                          <option key={s} value={s}>{t(s, idioma)}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                        {t("Necesidad vital desatendida", idioma)}
                      </label>
                      <select
                        className="ss-input"
                        value={formJuicio.necesidad}
                        onChange={e => setFormJuicio(prev => ({ ...prev, necesidad: e.target.value }))}
                        style={{ height: 38, background: "white", padding: "0 8px" }}
                      >
                        {["conexión", "consideración", "respeto", "apoyo", "seguridad", "autonomía", "colaboración", "pertenencia"].map(n => (
                          <option key={n} value={n}>{t(n, idioma)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("Tu Petición Clara, Positiva y Concreta (¿Qué acción medible le pides?)", idioma)}
                    </label>
                    <input
                      type="text"
                      className="ss-input"
                      placeholder={t("Ej: Te pido que coordinemos una reunión de 10 minutos antes de decidir planes del finde.", idioma)}
                      value={formJuicio.peticion}
                      onChange={e => setFormJuicio(prev => ({ ...prev, peticion: e.target.value }))}
                    />
                  </div>

                  <button
                    onClick={ejecutarAnalisisJuicio}
                    disabled={guardando}
                    className="ss-btn"
                    style={{ background: SAGE_DARK, color: "white", marginTop: 8 }}
                  >
                    {guardando ? t("Procesando análisis sistémico...", idioma) : `🔮 ${t("Analizar y Deconstruir Juicio", idioma)}`}
                  </button>
                </div>

                {/* RESULTADO ALGORITMO 1 */}
                {resultadoJuicio && (
                  <div className="ss-fade" style={{ marginTop: 18, background: SAGE_TINT, borderRadius: 16, padding: 15, border: `1px solid rgba(74, 124, 104, 0.2)` }}>
                    <p style={{ fontSize: 11, fontWeight: "bold", color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
                      ✨ {t("Resultado del Análisis Sistémico CNV", idioma)}
                    </p>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div>
                        <strong style={{ fontSize: 11, color: SAGE_DARK, display: "block" }}>{t("Traducción Final a Comunicación Compasiva:", idioma)}</strong>
                        <p style={{ fontSize: 12.5, color: INK, fontStyle: "italic", lineHeight: 1.5, margin: "2px 0 0", fontWeight: 600 }}>
                          "{resultadoJuicio.traduccionCnvCompleta}"
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: SAGE_DARK, display: "block" }}>{t("La Proyección de Sombra:", idioma)}</strong>
                        <p style={{ fontSize: 12, color: INK, lineHeight: 1.45, margin: "2px 0 0" }}>
                          {resultadoJuicio.proyeccionSombra}
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: SAGE_DARK, display: "block" }}>{t("Reflexión Transgeneracional:", idioma)}</strong>
                        <p style={{ fontSize: 12, color: INK, lineHeight: 1.45, margin: "2px 0 0" }}>
                          {resultadoJuicio.reencuadreSistemico}
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: SAGE_DARK, display: "block" }}>{t("Guiones de Diálogo Prácticos:", idioma)}</strong>
                        <ul style={{ paddingLeft: 16, margin: "4px 0 0", fontSize: 11.5, color: INK, display: "flex", flexDirection: "column", gap: 4 }}>
                          {resultadoJuicio.guiasDeDialogo.map((g, idx) => (
                            <li key={idx} style={{ lineHeight: 1.4 }}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p style={{ fontSize: 10.5, color: MUTED, textAlign: "center", marginTop: 14, fontStyle: "italic" }}>
                      ✓ {t("Este ejercicio ha sido guardado de forma permanente en tu historial de sintonía emocional.", idioma)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* EJERCICIO 2: REENCUADRE DE ATAQUES */}
            {ejercicioActual === "ataques" && (
              <div className="ss-fade" style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }}>
                <p style={{ fontSize: 13.5, fontWeight: "bold", color: LAVENDER, margin: "0 0 4px" }}>
                  🛡️ {t("Decodificador de Críticas y Empatía Profunda", idioma)}
                </p>
                <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 16px", lineHeight: 1.4 }}>
                  {t("Aprende a escuchar el dolor del otro cuando te ataca, traduciendo sus reproches hostiles en necesidades insatisfechas para proteger tu paz.", idioma)}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("¿Qué crítica hostil, reclamo o ataque recibiste?", idioma)}
                    </label>
                    <textarea
                      rows={2}
                      className="ss-input"
                      placeholder={t("Ej: '¡Nunca estás en la casa, solo te importa tu estúpido trabajo!'", idioma)}
                      value={formAtaque.criticaRecibida}
                      onChange={e => setFormAtaque(prev => ({ ...prev, criticaRecibida: e.target.value }))}
                      autoCorrect="on"
                      spellCheck={true}
                      autoCapitalize="sentences"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("¿Cuál fue tu reacción de defensa reactiva automática?", idioma)}
                    </label>
                    <textarea
                      rows={2}
                      className="ss-input"
                      placeholder={t("Ej: '¡Yo trabajo por tu culpa! ¡Eres un desconsiderado insoportable!'", idioma)}
                      value={formAtaque.reaccionReactiva}
                      onChange={e => setFormAtaque(prev => ({ ...prev, reaccionReactiva: e.target.value }))}
                      autoCorrect="on"
                      spellCheck={true}
                      autoCapitalize="sentences"
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: "bold", color: INK, marginBottom: 4 }}>
                      {t("Decodifica: ¿Qué necesidad vital podría tener insatisfecha la otra persona?", idioma)}
                    </label>
                    <select
                      className="ss-input"
                      value={formAtaque.necesidadEstimada}
                      onChange={e => setFormAtaque(prev => ({ ...prev, necesidadEstimada: e.target.value }))}
                      style={{ height: 38, background: "white", padding: "0 8px" }}
                    >
                      {["aprecio", "presencia", "conexión", "seguridad", "colaboración", "respeto", "claridad", "apoyo"].map(ne => (
                        <option key={ne} value={ne}>{t(ne, idioma)}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={ejecutarAnalisisAtaque}
                    disabled={guardando}
                    className="ss-btn"
                    style={{ background: LAVENDER, color: "white", marginTop: 8 }}
                  >
                    {guardando ? t("Procesando traducción de empatía...", idioma) : `🛡️ ${t("Decodificar y Reencuadrar Ataque", idioma)}`}
                  </button>
                </div>

                {/* RESULTADO ALGORITMO 2 */}
                {resultadoAtaque && (
                  <div className="ss-fade" style={{ marginTop: 18, background: LAVENDER_TINT, borderRadius: 16, padding: 15, border: `1px solid rgba(138, 107, 184, 0.2)` }}>
                    <p style={{ fontSize: 11, fontWeight: "bold", color: LAVENDER, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
                      ✨ {t("Decodificación de Empatía Profunda Completada", idioma)}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div>
                        <strong style={{ fontSize: 11, color: LAVENDER, display: "block" }}>{t("Traductor del Ataque (\"Su dolor de fondo\"):", idioma)}</strong>
                        <p style={{ fontSize: 12, color: INK, lineHeight: 1.45, margin: "2px 0 0" }}>
                          {resultadoAtaque.traduccionAtaque}
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: LAVENDER, display: "block" }}>{t("Desactivando tu Mecanismo Defensivo:", idioma)}</strong>
                        <p style={{ fontSize: 12, color: INK, lineHeight: 1.45, margin: "2px 0 0" }}>
                          {resultadoAtaque.reencuadreCompasivo}
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: LAVENDER, display: "block" }}>{t("Guion de Desescalamiento Sugerido:", idioma)}</strong>
                        <p style={{ fontSize: 12.5, color: INK, lineHeight: 1.5, margin: "2px 0 0", fontWeight: 600 }}>
                          "{resultadoAtaque.guionDesescalamiento}"
                        </p>
                      </div>

                      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)" }}></div>

                      <div>
                        <strong style={{ fontSize: 11, color: LAVENDER, display: "block" }}>{t("Reflexión Introspectiva Personal:", idioma)}</strong>
                        <p style={{ fontSize: 12, color: INK, lineHeight: 1.45, margin: "2px 0 0" }}>
                          {resultadoAtaque.ejercicioIntrospectivo}
                        </p>
                      </div>
                    </div>

                    <p style={{ fontSize: 10.5, color: MUTED, textAlign: "center", marginTop: 14, fontStyle: "italic" }}>
                      ✓ {t("Este ejercicio ha sido guardado de forma permanente en tu historial de sintonía emocional.", idioma)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 3: HISTORIAL DE EJERCICIOS GUARDADOS (FIRESTORE) */}
        {tabActual === "historial" && (
          <div className="ss-fade">
            <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.5, margin: "0 0 16px" }}>
              {t("Tus ejercicios interactivos de Comunicación No Violenta guardados en la nube para análisis posterior:", idioma)}
            </p>

            {cargandoHistorial ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: MUTED, fontSize: 13 }}>
                {t("Cargando tu historial de sintonía en la nube...", idioma)}
              </div>
            ) : historial.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 18px", border: `1px dashed ${LINE}`, borderRadius: 18, background: "white", color: MUTED }}>
                <p style={{ fontSize: 14, fontWeight: "bold", margin: "0 0 4px" }}>{t("Aún no tienes ejercicios guardados", idioma)}</p>
                <p style={{ fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                  {t("Rellena y ejecuta cualquiera de los análisis en la pestaña de Introspección para comenzar a registrar tu camino de sintonía relacional.", idioma)}
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {historial.map(item => {
                  const esJuicio = item.tipo === "deconstruccion";
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: "white",
                        border: `1px solid ${LINE}`,
                        borderRadius: 18,
                        padding: 16,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
                        position: "relative"
                      }}
                    >
                      <button
                        onClick={() => {
                          if (confirm(t("¿Estás seguro de que quieres eliminar este análisis?", idioma))) {
                            eliminarRegistroCNV(item.id);
                          }
                        }}
                        style={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "transparent",
                          border: "none",
                          color: "#c0564d",
                          cursor: "pointer",
                          padding: 4
                        }}
                        title={t("Eliminar registro", idioma)}
                      >
                        <Trash2 size={16} />
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                        <span style={{
                          background: esJuicio ? SAGE_TINT : LAVENDER_TINT,
                          color: esJuicio ? SAGE_DARK : LAVENDER,
                          padding: "3px 8px",
                          borderRadius: 8,
                          fontSize: 10,
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }}>
                          {esJuicio ? `🔮 ${t("Traducción Juicio", idioma)}` : `🛡️ ${t("Decodificación Ataque", idioma)}`}
                        </span>
                        <span style={{ fontSize: 11, color: MUTED }}>
                          {new Date(item.fecha).toLocaleDateString()} {new Date(item.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {esJuicio ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <p style={{ fontSize: 12, color: INK, margin: 0 }}>
                            <strong>{t("Juicio relacional:", idioma)}</strong> <span style={{ textDecoration: "line-through", color: "#9a5252" }}>"{item.entradasUsuario?.juicio}"</span> {t("dirigido a", idioma)} <em>{item.entradasUsuario?.persona}</em>.
                          </p>
                          <p style={{ fontSize: 12, color: INK, margin: 0 }}>
                            <strong>{t("Traducción constructiva:", idioma)}</strong> <span style={{ fontStyle: "italic", fontWeight: "bold", color: SAGE_DARK }}>"{item.resultadoAnalisis?.traduccionCnvCompleta}"</span>
                          </p>
                          <div style={{ background: CREAM, borderRadius: 10, padding: 8, fontSize: 11, color: MUTED }}>
                            <strong>{t("Reflexión de sombra:", idioma)}</strong> {item.resultadoAnalisis?.proyeccionSombra}
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <p style={{ fontSize: 12, color: INK, margin: 0 }}>
                            <strong>{t("Crítica recibida:", idioma)}</strong> <span style={{ color: "#9a5252" }}>"{item.entradasUsuario?.criticaRecibida}"</span>
                          </p>
                          <p style={{ fontSize: 12, color: INK, margin: 0 }}>
                            <strong>{t("Traducción empática:", idioma)}</strong> {item.resultadoAnalisis?.traduccionAtaque}
                          </p>
                          <p style={{ fontSize: 12, color: INK, margin: 0 }}>
                            <strong>{t("Guion desescalamiento:", idioma)}</strong> <span style={{ fontWeight: "bold", color: LAVENDER }}>"{item.resultadoAnalisis?.guionDesescalamiento}"</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

function ScreenTarot({ nombre, onBack, onIrReto, idioma }) {
  const n = nombre || "";
  const [fase, setFase] = useState("pregunta"); // pregunta | intro | tirada
  const [pregunta, setPregunta] = useState("");
  const [tirada, setTirada] = useState(null);
  const [reveladas, setReveladas] = useState(0);
  const dictado = useDictado((t) => setPregunta(t));

  const iniciar = () => {
    setTirada(tirarTresCartas());
    setReveladas(0);
    setFase("tirada");
  };

  if (fase === "pregunta") {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Lectura de tarot", idioma)} onBack={onBack} />
        <div style={{ flex: 1, marginTop: 6, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: INK, margin: "6px 0 0" }}>
            {t("Antes de barajar, ¿qué te gustaría consultar?", idioma)}
          </p>
          <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.55 }}>
            {t("Puede ser una pregunta abierta sobre tu momento actual, una relación, una decisión que estás por tomar, o simplemente cómo te sientes hoy", idioma)}{n ? `, ${n}` : ""}. {t("Tu tirada se leerá a la luz de lo que preguntes.", idioma)}
          </p>
          <VoiceRecordingBanner
            activo={dictado.escuchando}
            onDetener={dictado.detener}
            idioma={idioma}
          />
          <div style={{ position: "relative" }}>
            <textarea
              className="ss-input"
              rows={4}
              placeholder={t("Ej: ¿Qué necesito ver sobre lo que estoy viviendo con mi trabajo?", idioma)}
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              autoCorrect="on"
              spellCheck={true}
              autoCapitalize="sentences"
              style={{
                paddingRight: dictado.escuchando ? 120 : 52,
                fontFamily: FONT_BODY,
                borderColor: dictado.escuchando ? "#ef4444" : undefined,
                background: dictado.escuchando ? "#fff8f8" : undefined
              }}
            />
            <MicButton escuchando={dictado.escuchando} soportado={dictado.soportado} onClick={() => dictado.toggle(pregunta)} />
          </div>
          {dictado.error === "permiso" && (
            <div 
              onClick={() => dispararGuiaPermisos("microfono")}
              style={{ 
                fontSize: 11.5, 
                color: "#b91c1c", 
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "6px 10px",
                margin: "4px 0 0", 
                lineHeight: 1.4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 6
              }}
            >
              <span>{t("Permiso de micrófono denegado. Toca aquí para ver cómo activarlo en Ajustes.", idioma)}</span>
              <span style={{ fontWeight: 700, textDecoration: "underline", flexShrink: 0 }}>{t("Ajustes", idioma)}</span>
            </div>
          )}
        </div>
        <button className="ss-btn ss-btn-premium" style={{ width: "100%", marginTop: 12 }} onClick={() => setFase("intro")}>
          {t("Continuar", idioma)}
        </button>
        <button
          className="ss-btn ss-btn-ghost"
          style={{ width: "100%", marginTop: 8 }}
          onClick={() => {
            setPregunta("");
            setFase("intro");
          }}
        >
          {t("Prefiero no escribir una pregunta específica", idioma)}
        </button>
      </div>
    );
  }

  if (fase === "intro") {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Lectura de tarot", idioma)} onBack={() => setFase("pregunta")} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, textAlign: "center" }}>
          <div
            style={{
              width: 90,
              height: 130,
              borderRadius: 12,
              background: "linear-gradient(135deg, #3f2b5b, #8a6bb8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 30,
              boxShadow: "0 12px 30px rgba(138,107,184,0.35)",
            }}
          >
            &#10023;
          </div>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: INK, margin: 0 }}>
            {t("Tirada de tres cartas", idioma)}
          </p>
          {pregunta.trim() ? (
            <div style={{ background: LAVENDER_TINT, borderRadius: 12, padding: "10px 14px", maxWidth: 280 }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: LAVENDER, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 4px" }}>
                {t("Tu pregunta", idioma)}
              </p>
              <p style={{ fontSize: 12.5, color: "#5b4a78", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                &ldquo;{pregunta.trim()}&rdquo;
              </p>
            </div>
          ) : (
            <p style={{ fontSize: 13, color: MUTED, margin: 0, maxWidth: 260, lineHeight: 1.55 }}>
              {t("Pasado, presente y futuro. Respira y piensa en aquello que estás trabajando en tu proceso", idioma)}
              {n ? `, ${n}` : ""}. {t("El tarot no predice: refleja lo que quizás ya intuyes.", idioma)}
            </p>
          )}
          <div style={{ background: SAGE_TINT, borderRadius: 12, padding: "10px 14px", maxWidth: 280 }}>
            <p style={{ fontSize: 11.5, color: SAGE_DARK, margin: 0, lineHeight: 1.5 }}>
              {t("Trabajaremos con los 22 arcanos mayores, que trazan el llamado “Viaje del Loco”: un recorrido simbólico desde el primer paso lleno de fe hasta la plenitud. Cada carta es un arquetipo, un espejo de una etapa de la vida.", idioma)}
            </p>
          </div>
        </div>
        <button className="ss-btn ss-btn-premium" style={{ width: "100%" }} onClick={iniciar}>
          {t("Barajar y tirar", idioma)}
        </button>
      </div>
    );
  }

  const todasReveladas = reveladas >= 3;

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Lectura de tarot", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        {pregunta.trim() && (
          <div style={{ background: LAVENDER_TINT, borderRadius: 12, padding: "10px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: LAVENDER, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 3px" }}>
              {t("Tu pregunta", idioma)}
            </p>
            <p style={{ fontSize: 12, color: "#5b4a78", margin: 0, lineHeight: 1.45, fontStyle: "italic" }}>
              &ldquo;{pregunta.trim()}&rdquo;
            </p>
          </div>
        )}
        <p style={{ fontSize: 12.5, color: MUTED, margin: "0 0 14px", lineHeight: 1.5 }}>
          {todasReveladas
            ? t("Tu tirada, de izquierda a derecha:", idioma)
            : `${t("Toca cada carta para revelarla", idioma)} (${reveladas} ${t("de", idioma)} 3).`}
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 18 }}>
          {tirada.map((c, i) => {
            const revelada = i < reveladas;
            const esSiguiente = i === reveladas;
            return (
              <button
                key={i}
                onClick={() => esSiguiente && setReveladas((r) => r + 1)}
                disabled={!esSiguiente}
                style={{
                  width: 92,
                  minHeight: 150,
                  borderRadius: 12,
                  border: revelada ? `1.5px solid ${LAVENDER}` : "none",
                  background: revelada ? "white" : "linear-gradient(135deg, #3f2b5b, #8a6bb8)",
                  cursor: esSiguiente ? "pointer" : "default",
                  padding: revelada ? "10px 8px" : 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  color: revelada ? INK : "white",
                  fontFamily: FONT_BODY,
                  boxShadow: esSiguiente ? "0 6px 18px rgba(138,107,184,0.3)" : "none",
                }}
              >
                {revelada ? (
                  <>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: LAVENDER, textTransform: "uppercase" }}>
                      {t(POSICIONES_TAROT[i].clave, idioma)}
                    </span>
                    <span style={{ fontSize: 22 }}>&#10023;</span>
                    <span style={{ fontSize: 11, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
                      {t(c.nombre, idioma)}
                    </span>
                    {c.invertida && (
                      <span style={{ fontSize: 8.5, color: MUTED, fontStyle: "italic" }}>{t("invertida", idioma)}</span>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: 26 }}>{esSiguiente ? "\u2727" : "\u2724"}</span>
                )}
              </button>
            );
          })}
        </div>

        {reveladas > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
            {tirada.slice(0, reveladas).map((c, i) => (
              <div key={i} className="ss-card-flip" style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>
                    {t(POSICIONES_TAROT[i].clave, idioma)}: {t(c.nombre, idioma)}
                  </span>
                  <span style={{ fontSize: 10, color: LAVENDER, fontWeight: 700, textTransform: "uppercase" }}>
                    {c.invertida ? t("invertida", idioma) : t("al derecho", idioma)}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                  {c.claves.map((k) => (
                    <span
                      key={k}
                      style={{
                        fontSize: 9.5,
                        fontWeight: 600,
                        color: LAVENDER,
                        background: LAVENDER_TINT,
                        padding: "2px 8px",
                        borderRadius: 999,
                      }}
                    >
                      {t(k, idioma)}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 600,
                      color: SAGE_DARK,
                      background: SAGE_TINT,
                      padding: "2px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {t(c.elemento, idioma)}
                  </span>
                </div>

                <p style={{ fontSize: 11.5, color: MUTED, margin: "0 0 6px", fontStyle: "italic" }}>
                  {t(POSICIONES_TAROT[i].desc, idioma)}
                </p>
                <p style={{ fontSize: 12.5, color: INK, margin: "0 0 8px", lineHeight: 1.55 }}>
                  {n ? `${n}, ` : ""}{t("en esta posición,", idioma)} {t(c.nombre, idioma)}
                  {c.invertida ? ` ${t("en posición invertida", idioma)}` : ""} {t("habla de", idioma)} {c.invertida ? t(c.invertido, idioma) : t(c.derecho, idioma)}.
                </p>
                <div style={{ background: "#faf9fc", borderLeft: `2.5px solid ${LAVENDER}`, borderRadius: 6, padding: "8px 10px" }}>
                  <p style={{ fontSize: 11.5, color: "#5b4a78", margin: 0, lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{t("Para reflexionar:", idioma)} </span>
                    {t(c.consejo, idioma)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {todasReveladas && (
          <div style={{ background: LAVENDER_TINT, borderRadius: 14, padding: 14, marginBottom: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: LAVENDER, textTransform: "uppercase", margin: "0 0 6px" }}>
              {t("Cómo leer tu tirada", idioma)}
            </p>
            <p style={{ fontSize: 12.5, color: "#5b4a78", margin: 0, lineHeight: 1.55 }}>
              {t("Léelas como una historia de izquierda a derecha:", idioma)} {t(tirada[0].nombre, idioma)} {t("muestra de dónde vienes,", idioma)}{" "}
              {t(tirada[1].nombre, idioma)} {t("dónde estás ahora, y", idioma)} {t(tirada[2].nombre, idioma)} {t("hacia dónde puedes ir. El tarot no fija tu destino; te ofrece un espejo para reflexionar. La última palabra siempre es tuya.", idioma)}
            </p>
            {pregunta.trim() && (
              <p style={{ fontSize: 12.5, color: "#5b4a78", margin: "10px 0 0", lineHeight: 1.55, borderTop: `1px solid rgba(138,107,184,0.25)`, paddingTop: 10 }}>
                {t("Vuelve a leer tu pregunta —“", idioma)}{pregunta.trim()}{t("”— y observa qué luz distinta le da cada una de estas tres cartas. A veces la respuesta no llega en palabras nuevas, sino en ver lo que ya intuías con más claridad.", idioma)}
              </p>
            )}
          </div>
        )}

        {todasReveladas && (
          <button className="ss-btn ss-btn-ghost" style={{ width: "100%", marginBottom: 14 }} onClick={iniciar}>
            {t("Tirar de nuevo", idioma)}
          </button>
        )}

        {todasReveladas && (
          <div style={{ background: SAGE_TINT, borderRadius: 14, padding: 14, marginBottom: 4 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", margin: "0 0 6px" }}>
              {t("Fuente", idioma)}
            </p>
            <p style={{ fontSize: 11.5, color: "#2c4a3f", margin: 0, lineHeight: 1.5 }}>
              {t("Tirada clásica de tres cartas (pasado–presente–futuro) con los 22 arcanos mayores del tarot. Estructura y significados según la tradición del tarot Rider-Waite y de Marsella.", idioma)}
            </p>
          </div>
        )}
      </div>
      {todasReveladas && <CTAReto onIrReto={onIrReto} idioma={idioma} />}
    </div>
  );
}

function FilaDato({ label, valor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${LINE}` }}>
      <span style={{ fontSize: 12.5, color: MUTED }}>{label}</span>
      <span style={{ fontSize: 12.5, color: INK, fontWeight: 700, textAlign: "right" }}>{valor}</span>
    </div>
  );
}

// Se usa exclusivamente al final de cada lectura dentro del hub de Perspectivas (carta
// natal, astral, azteca, números, tarot, CNV, constelación) — por eso el botón regresa
// al hub en vez de mandar al Reto de 21 Días, que vive en otra sección de la app.
function CTAReto({ onIrReto, idioma }) {
  if (!onIrReto) return null;
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ background: SAGE_TINT, borderRadius: 14, padding: 14, marginBottom: 12 }}>
        <p style={{ fontSize: 12.5, color: "#2c4a3f", margin: 0, lineHeight: 1.55, fontFamily: FONT_DISPLAY, fontStyle: "italic" }}>
          {t("Entender es el primer paso. Sigue explorando las demás perspectivas para ampliar la mirada.", idioma)}
        </p>
      </div>
      <button className="ss-btn ss-btn-primary" style={{ width: "100%" }} onClick={onIrReto}>
        {t("Volver a Perspectivas", idioma)}
      </button>
    </div>
  );
}

function ScreenCartaNatal({ nacimiento, nombre, sexo, resultados, familia, onBack, onIrReto, idioma }) {
  const carta = calcularCartaCompleta(nacimiento);
  if (!carta) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%" }}>
        <TopBar title={t("Carta natal", idioma)} onBack={onBack} />
        <p style={{ fontSize: 13, color: MUTED, marginTop: 20 }}>{t("Falta la fecha de nacimiento.", idioma)}</p>
      </div>
    );
  }
  const z = carta.sol;
  const narrativa = generarNarrativaNatal(nombre, sexo, carta, resultados, familia);
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Carta natal", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <div style={{ background: LAVENDER_TINT, borderRadius: 18, padding: 20, textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11.5, color: "#5b4a78", fontWeight: 700, textTransform: "uppercase", margin: "0 0 6px" }}>
            {t("Sol en", idioma)}
          </p>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 26, color: LAVENDER, margin: 0 }}>{t(z.signo, idioma)}</p>
          <p style={{ fontSize: 12, color: "#5b4a78", margin: "4px 0 0" }}>{t(z.clave, idioma)}</p>
        </div>
        <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: "4px 16px", marginBottom: 16 }}>
          <FilaDato label={t("Elemento", idioma)} valor={t(z.elemento, idioma)} />
          <FilaDato label={t("Modalidad", idioma)} valor={t(z.modalidad, idioma)} />
          <FilaDato label={t("Planeta regente", idioma)} valor={t(z.regente, idioma)} />
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: SAGE_TINT, borderRadius: 14, padding: 13 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", margin: "0 0 6px" }}>{t("Luz", idioma)}</p>
            <p style={{ fontSize: 12, color: "#2c4a3f", margin: 0, lineHeight: 1.45 }}>{t(z.luz, idioma)}</p>
          </div>
          <div style={{ flex: 1, background: "#fbeceb", borderRadius: 14, padding: 13 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: "#a04a42", textTransform: "uppercase", margin: "0 0 6px" }}>{t("Sombra", idioma)}</p>
            <p style={{ fontSize: 12, color: "#7a332c", margin: 0, lineHeight: 1.45 }}>{t(z.sombra, idioma)}</p>
          </div>
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
          {t("Lo que dice de ti", idioma)}
        </p>
        <Narrativa parrafos={narrativa} />
        <CTAReto onIrReto={onIrReto} idioma={idioma} />
      </div>
    </div>
  );
}

function ScreenNumeros({ nacimiento, nombre, nombreCompleto, sexo, onBack, onIrReto, idioma }) {
  const numero = calcularNumeroSagrado(nacimiento.fecha);
  if (!numero) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%" }}>
        <TopBar title={t("Números sagrados", idioma)} onBack={onBack} />
        <p style={{ fontSize: 13, color: MUTED, marginTop: 20 }}>{t("Falta la fecha de nacimiento.", idioma)}</p>
      </div>
    );
  }
  const info = NUMEROLOGIA_CAMINO_VIDA[numero];
  const numeroExpresion = calcularNumeroExpresion(nombreCompleto);
  const infoExpresion = numeroExpresion ? NUMEROLOGIA_CAMINO_VIDA[numeroExpresion] : null;
  const narrativa = generarNarrativaNumeros(nombre, sexo, numero, info, numeroExpresion, infoExpresion);
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Números sagrados", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, background: LAVENDER_TINT, borderRadius: 18, padding: 16, textAlign: "center" }}>
            <p style={{ fontSize: 10.5, color: "#5b4a78", fontWeight: 700, textTransform: "uppercase", margin: "0 0 6px" }}>
              {t("Camino de vida", idioma)}
            </p>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: LAVENDER, margin: 0, lineHeight: 1 }}>{numero}</p>
            <p style={{ fontSize: 11.5, color: "#5b4a78", margin: "6px 0 0", fontWeight: 700 }}>{t(info.nombre, idioma)}</p>
          </div>
          {infoExpresion && (
            <div style={{ flex: 1, background: SAGE_TINT, borderRadius: 18, padding: 16, textAlign: "center" }}>
              <p style={{ fontSize: 10.5, color: SAGE_DARK, fontWeight: 700, textTransform: "uppercase", margin: "0 0 6px" }}>
                {t("Expresión", idioma)}
              </p>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: 34, color: SAGE_DARK, margin: 0, lineHeight: 1 }}>{numeroExpresion}</p>
              <p style={{ fontSize: 11.5, color: SAGE_DARK, margin: "6px 0 0", fontWeight: 700 }}>{t(infoExpresion.nombre, idioma)}</p>
            </div>
          )}
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
          {t("Lo que dice de ti", idioma)}
        </p>
        <Narrativa parrafos={narrativa} />
        <CTAReto onIrReto={onIrReto} idioma={idioma} />
      </div>
    </div>
  );
}

function ScreenCartaAstral({ nacimiento, familia, onBack, onIrReto, idioma }) {
  const carta = calcularCartaCompleta(nacimiento);
  if (!carta) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%" }}>
        <TopBar title={t("Carta astral", idioma)} onBack={onBack} />
        <p style={{ fontSize: 13, color: MUTED, marginTop: 20 }}>{t("Falta la fecha de nacimiento.", idioma)}</p>
      </div>
    );
  }
  const z = carta.sol;
  const opuesto = ZODIACO[(ZODIACO.findIndex((x) => x.signo === z.signo) + 6) % 12];
  const patronFamiliar = patronFamiliarDestacado(familia);
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Carta astral", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <p style={{ fontSize: 12.5, color: MUTED, margin: "0 0 16px", lineHeight: 1.5 }}>
          {carta.completo
            ? t("Tu carta completa: Sol, Luna, Ascendente y los cuatro ángulos, calculados con tu fecha, hora y lugar de nacimiento.", idioma)
            : t("Una capa más profunda sobre tu energía de base, a partir de tu signo solar.", idioma)}
        </p>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 100, background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: 14, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: MUTED, margin: "0 0 4px" }}>{t("Sol", idioma)}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: INK, margin: 0 }}>{t(z.signo, idioma)}</p>
          </div>
          {carta.completo && (
            <div style={{ flex: 1, minWidth: 100, background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: 14, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: MUTED, margin: "0 0 4px" }}>{t("Luna", idioma)}</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: INK, margin: 0 }}>{t(carta.luna.signo, idioma)}</p>
            </div>
          )}
          <div style={{ flex: 1, minWidth: 100, background: carta.completo ? LAVENDER_TINT : "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: 14, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: carta.completo ? "#5b4a78" : MUTED, margin: "0 0 4px" }}>
              {carta.completo ? t("Ascendente", idioma) : t("Signo espejo", idioma)}
            </p>
            <p style={{ fontSize: 14, fontWeight: 700, color: carta.completo ? LAVENDER : INK, margin: 0 }}>
              {carta.completo ? t(carta.ascendente.signo, idioma) : t(opuesto.signo, idioma)}
            </p>
          </div>
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
          {t("Energía a trabajar", idioma)}
        </p>
        <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 14px" }}>
          {t(z.signo, idioma)} {t("tiende a expresarse con fuerza", idioma)} {t(z.modalidad.toLowerCase(), idioma)}. {t("Tu signo espejo,", idioma)} {t(opuesto.signo, idioma)}, {t("muestra la cualidad que más te cuesta integrar — y por eso mismo, la que más crecimiento te puede dar cuando la reconoces en vez de evitarla.", idioma)}
        </p>
        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
          {t("Los cuatro ángulos de tu carta", idioma)}
        </p>
        {!carta.completo && (
          <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 10px" }}>
            {t("Una carta astral completa se organiza en torno a cuatro puntos, la llamada cruz cardinal, que dependen de la hora y el lugar exactos de nacimiento:", idioma)}
          </p>
        )}
        <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: "4px 14px", marginBottom: 14 }}>
          <FilaDato label={t("Ascendente (AC)", idioma)} valor={carta.completo ? t(carta.ascendente.signo, idioma) : t("Cómo te muestras", idioma)} />
          <FilaDato label={t("Descendente (DC)", idioma)} valor={carta.completo ? t(carta.descendente.signo, idioma) : t("Cómo te vinculas", idioma)} />
          <FilaDato label={t("Medio Cielo (MC)", idioma)} valor={carta.completo ? t(carta.medioCielo.signo, idioma) : t("Tu vocación", idioma)} />
          <FilaDato label={t("Fondo del Cielo (IC)", idioma)} valor={carta.completo ? t(carta.fondoCielo.signo, idioma) : t("Tus raíces", idioma)} />
        </div>
        <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 14px" }}>
          {t("El Ascendente marca cómo te percibe el mundo y por dónde \"empieza\" tu carta; el Descendente, cómo te relacionas con los demás; el Medio Cielo apunta a tu vocación y lo que vienes a ofrecer; y el Fondo del Cielo, a tus raíces y tu hogar interior. Sobre esos cuatro ejes se reparten las doce casas astrológicas, que son los ámbitos concretos de la vida donde se expresa cada planeta.", idioma)}
        </p>
        {carta.completo && (
          <>
            <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
              {t("Tus doce casas", idioma)}
            </p>
            <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: "4px 14px", marginBottom: 14 }}>
              {carta.casas.map((h) => (
                <FilaDato key={h.numero} label={`${t(h.nombre, idioma)} ${t("casa", idioma)}`} valor={h.signo ? t(h.signo.signo, idioma) : "—"} />
              ))}
            </div>
          </>
        )}
        {patronFamiliar && (
          <p style={{ fontSize: 13, color: INK, lineHeight: 1.6, margin: "0 0 14px" }}>
            {t("Precisamente el Fondo del Cielo —el eje de tus raíces— es donde tu árbol familiar cobra más sentido dentro de esta carta: identificamos", idioma)} {patronFamiliar.descriptor} {t("con", idioma)}{" "}
            {patronFamiliar.nombres.join(", ")}.{" "}
            {carta.completo ? (
              <>{t("Tu Fondo del Cielo en", idioma)} {t(carta.fondoCielo.signo, idioma)} {t("le da un tono simbólico concreto a esa zona.", idioma)}</>
            ) : (
              <>{t("Sin la hora exacta no podemos calcular la posición precisa de ese ángulo, pero la dinámica que describiste ya apunta a esa misma zona simbólica —tu hogar interior y de dónde vienes.", idioma)}</>
            )}
          </p>
        )}
        <div style={{ background: SAGE_TINT, borderRadius: 14, padding: 14, fontSize: 11.5, color: SAGE_DARK, lineHeight: 1.5, marginBottom: 14 }}>
          {carta.completo ? (
            <>{t("Esta carta se calculó con una tabla de efemérides real a partir de tu fecha, hora y lugar de nacimiento (sistema de casas de signo entero). Fuente:", idioma)} {CITAS.astrologia}</>
          ) : (
            <>{t("Con tu fecha calculamos tu signo solar y su polaridad. Para trazar los cuatro ángulos, las casas y la posición de la Luna hace falta tu hora y lugar de nacimiento, procesados con una tabla de efemérides. Puedes agregarlos en \"Tus datos de nacimiento\". Fuente:", idioma)} {CITAS.astrologia}</>
          )}
        </div>
        <CTAReto onIrReto={onIrReto} idioma={idioma} />
      </div>
    </div>
  );
}

function ScreenCartaAzteca({ nacimiento, nombre, sexo, resultados, familia, onBack, onIrReto, idioma }) {
  const tTonalli = calcularTonalli(nacimiento.fecha);
  if (!tTonalli) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%" }}>
        <TopBar title={t("Carta azteca", idioma)} onBack={onBack} />
        <p style={{ fontSize: 13, color: MUTED, marginTop: 20 }}>{t("Falta la fecha de nacimiento.", idioma)}</p>
      </div>
    );
  }
  const narrativa = generarNarrativaAzteca(nombre, sexo, tTonalli, resultados, familia);
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Carta azteca", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <div style={{ background: LAVENDER_TINT, borderRadius: 18, padding: 20, textAlign: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 11.5, color: "#5b4a78", fontWeight: 700, textTransform: "uppercase", margin: "0 0 6px" }}>
            {t("Tu tonalli", idioma)}
          </p>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: LAVENDER, margin: 0 }}>
            {tTonalli.numero} {tTonalli.signo.nombre}
          </p>
          <p style={{ fontSize: 12, color: "#5b4a78", margin: "4px 0 0" }}>{tTonalli.signo.es}</p>
        </div>
        <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: "4px 16px", marginBottom: 16 }}>
          <FilaDato label={t("Número sagrado", idioma)} valor={tTonalli.numero} />
          <FilaDato label={t("Signo del día", idioma)} valor={`${tTonalli.signo.nombre} (${tTonalli.signo.es})`} />
          <FilaDato label={t("Deidad patrona", idioma)} valor={tTonalli.signo.deidad} />
          <FilaDato label={t("Trecena", idioma)} valor={`${tTonalli.trecenaOrden} · ${t("inicia en", idioma)} ${tTonalli.trecenaSignoInicio.nombre}`} />
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", margin: "0 0 8px" }}>
          {t("Energía de tu día", idioma)}
        </p>
        <Narrativa parrafos={narrativa} />
        <CTAReto onIrReto={onIrReto} idioma={idioma} />
      </div>
    </div>
  );
}

function ScreenHubDetalle({ item, nacimiento, nombre, nombreCompleto, sexo, resultados, familia, setFamilia, setHubItem, onBack, onIrReto, idioma }) {
  if (item.id === "natal") return <ScreenCartaNatal nacimiento={nacimiento} nombre={nombre} sexo={sexo} resultados={resultados} familia={familia} onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "astral") return <ScreenCartaAstral nacimiento={nacimiento} familia={familia} onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "azteca") return <ScreenCartaAzteca nacimiento={nacimiento} nombre={nombre} sexo={sexo} resultados={resultados} familia={familia} onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "numeros") return <ScreenNumeros nacimiento={nacimiento} nombre={nombre} nombreCompleto={nombreCompleto} sexo={sexo} onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "tarot") return <ScreenTarot nombre={nombre} onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "cnv") return <ScreenComunicacionNoViolenta onBack={onBack} onIrReto={onIrReto} idioma={idioma} />;
  if (item.id === "especialistas") return <ScreenEspecialistas onBack={onBack} idioma={idioma} />;
  if (item.id === "arbol")
    return (
      <ScreenArbol
        familia={familia}
        setFamilia={setFamilia}
        onBack={onBack}
        onVerConstelacion={() => setHubItem(HUB_ITEMS.find((h) => h.id === "constelacion"))}
        idioma={idioma}
      />
    );
  if (item.id === "constelacion") {
    if (familia.length === 0) {
      // Aún no hay datos: la constelación empieza siempre por construir el árbol.
      return (
        <ScreenArbol
          familia={familia}
          setFamilia={setFamilia}
          onBack={onBack}
          onVerConstelacion={() => setHubItem(HUB_ITEMS.find((h) => h.id === "constelacion"))}
          idioma={idioma}
        />
      );
    }
    return (
      <ScreenConstelacion
        familia={familia}
        nombre={nombre}
        sexo={sexo}
        onBack={onBack}
        onEditar={() => setHubItem(ARBOL_ITEM)}
        onIrReto={onIrReto}
        idioma={idioma}
      />
    );
  }
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t(item.label, idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 14 }}>
        <div style={{ fontSize: 34, color: LAVENDER }}>{item.icon}</div>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: INK, margin: 0 }}>
          {t("Generando tu", idioma)} {t(item.label, idioma).toLowerCase()}
        </p>
        <p style={{ fontSize: 13, color: MUTED, margin: 0, maxWidth: 260, lineHeight: 1.5 }}>
          {t("Esta sección se construye conectando tu historia y tu árbol familiar con nuestro conocimiento acumulado y, si hace falta, una búsqueda complementaria.", idioma)}
        </p>
      </div>
    </div>
  );
}

const HERRAMIENTAS_ITEMS = [
  { 
    id: "practicasolfeo", 
    label: "Práctica con solfeo", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ), 
    desc: "Ejercicios interactivos de resonancia y transmutación",
    bg: "linear-gradient(135deg, #fdf5ea, #fbe8d0)",
    color: "#b27329",
    border: "#fbe8d0"
  },
  { 
    id: "respiracion", 
    label: "Respiración guiada", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
      </svg>
    ), 
    desc: "3 minutos para calmar el sistema nervioso",
    bg: "linear-gradient(135deg, #eaf3ef, #d4e8dd)",
    color: "#3f6b5b",
    border: "#d4e8dd"
  },
  { 
    id: "presente", 
    label: "Ejercicio de presente", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/>
      </svg>
    ), 
    desc: "Vuelve al ahora a través de tus sentidos",
    bg: "linear-gradient(135deg, #f1ecf9, #e4d8f3)",
    color: "#7d5ba6",
    border: "#e4d8f3"
  },
  { 
    id: "gratitud", 
    label: "Gratitud", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      </svg>
    ), 
    desc: "Tres cosas buenas de hoy, aunque el día haya sido difícil",
    bg: "linear-gradient(135deg, #fff9e6, #fcebc5)",
    color: "#a37c27",
    border: "#fcebc5"
  },
  { 
    id: "relajacion", 
    label: "Relajación corporal", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ), 
    desc: "Un recorrido breve por tu cuerpo, zona por zona",
    bg: "linear-gradient(135deg, #f0f7fb, #dceef7)",
    color: "#4682a8",
    border: "#dceef7"
  },
  { 
    id: "lugarseguro", 
    label: "Lugar seguro", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ), 
    desc: "Una visualización guiada para volver a la calma",
    bg: "linear-gradient(135deg, #fdf4f6, #fad8e1)",
    color: "#b05f76",
    border: "#fad8e1"
  },
];

function ScreenHerramientas({ onSelect, onBack, onIrDiario, silenciado, onAlternarSilencio, volumen, onCambiarVolumen, tutorialStep, idioma }) {
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Calma", idioma)} onBack={onBack} />
      <div className="ss-stagger" style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <p style={{ color: MUTED, fontSize: 13, margin: "0 0 18px", lineHeight: 1.5 }}>
          {t("Gratis, sin límite de uso. No reemplazan tu proceso, pero pueden acompañarte en cualquier momento del día.", idioma)}
        </p>

        {/* Sonido ambiental: botón de silenciar + volumen */}
        <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: "12px 14px", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12.5, fontWeight: 700, color: INK, margin: 0 }}>{t("Sonido ambiental", idioma)}</p>
              <p style={{ fontSize: 10.5, color: MUTED, margin: "1px 0 0" }}>
                {t("Música instrumental para acompañar tu recorrido", idioma)}
              </p>
            </div>
            <button
              onClick={onAlternarSilencio}
              aria-label={silenciado ? t("Activar sonido", idioma) : t("Silenciar sonido", idioma)}
              style={{
                background: silenciado ? "#f0e8e8" : SAGE_TINT,
                border: `1px solid ${silenciado ? "#d9b3b3" : SAGE}`,
                borderRadius: 999,
                color: silenciado ? "#8a3a3a" : SAGE_DARK,
                fontSize: 11,
                fontWeight: 700,
                padding: "5px 12px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {silenciado ? `🔇 ${t("Activar", idioma)}` : `🔇 ${t("Silenciar", idioma)}`}
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((silenciado ? 0 : volumen) * 100)}
            onChange={(e) => onCambiarVolumen(Number(e.target.value) / 100)}
            aria-label={t("Volumen del sonido ambiental", idioma)}
            style={{ width: "100%", marginTop: 10, accentColor: SAGE_DARK, cursor: "pointer" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {HERRAMIENTAS_ITEMS.map((h) => {
            const esRespiracionTuto = tutorialStep === 8 && h.id === "respiracion";
            return (
              <button
                key={h.id}
                onClick={() => onSelect(h)}
                className="ss-card"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "left",
                  background: "white",
                  border: esRespiracionTuto ? "2.5px solid #dfa15f" : `1px solid ${LINE}`,
                  boxShadow: esRespiracionTuto ? "0 8px 20px rgba(223,161,95,0.3)" : undefined,
                  transform: esRespiracionTuto ? "scale(1.02)" : undefined,
                  borderRadius: 20,
                  padding: "18px 18px",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  overflow: "hidden",
                  transition: "all 0.3s ease"
                }}
              >
                {esRespiracionTuto && (
                  <div style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    animation: "ss-bounce-down 1s infinite ease-in-out",
                    zIndex: 99,
                    pointerEvents: "none"
                  }}>
                    <span style={{ fontSize: 24 }}>👈</span>
                  </div>
                )}
                <div 
                  style={{
                    position: "absolute",
                    top: 0, left: 0, bottom: 0, width: 4,
                    background: esRespiracionTuto ? "#dfa15f" : h.bg,
                  }} 
                />
              <span
                style={{
                  width: 52,
                  height: 52,
                  minWidth: 52,
                  borderRadius: 16,
                  background: h.bg,
                  border: `1px solid ${h.border}`,
                  color: h.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {h.icon}
              </span>
              <span style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 4, letterSpacing: "-0.2px" }}>{t(h.label, idioma)}</div>
                <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.4 }}>{t(h.desc, idioma)}</div>
              </span>
              <span style={{ color: "#c8ccd0", marginLeft: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </button>
          )})}
        </div>

        {onIrDiario && (
          <div style={{ margin: "18px 0 0", padding: "16px 0 0", borderTop: `1px solid ${LINE}` }}>
            <p
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: MUTED,
                letterSpacing: 1,
                textTransform: "uppercase",
                margin: "0 0 8px",
                textAlign: "center",
              }}
            >
              &middot; {t("O si prefieres, escribe", idioma)} &middot;
            </p>
            <button
              onClick={onIrDiario}
              className="ss-card"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
                width: "100%",
                background: LAVENDER_TINT,
                border: "none",
                borderRadius: 16,
                padding: "14px 16px",
                cursor: "pointer",
                fontFamily: FONT_BODY,
              }}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  minWidth: 38,
                  borderRadius: 12,
                  background: "white",
                  color: LAVENDER,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                }}
              >
                &#9997;
              </span>
              <span>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#5b4a78" }}>{t("Tu diario", idioma)}</div>
                <div style={{ fontSize: 12, color: "#7a6b95", marginTop: 2 }}>{t("Escribe o dicta cómo te sientes hoy", idioma)}</div>
              </span>
            </button>
          </div>
        )}

        <SeccionComunidad idioma={idioma} />
      </div>
    </div>
  );
}

// PARA PRODUCCIÓN: cuando existan las cuentas reales, coloca la URL en el campo `url`
// de cada red (hoy en null a propósito). Con url:null el chip se muestra informativo y NO
// navega — un enlace a una cuenta inexistente es motivo típico de rechazo en App Store/Play.
// Idiomas que la app reconoce del dispositivo. Las traducciones y soporte para los
// idiomas inglés, francés e italiano han sido integradas completamente de forma local.

// Lee navigator.language (o languages[0]) y devuelve el código de idioma reconocido,
// o "es" si el dispositivo reporta un idioma que la app todavía no contempla.
function detectarIdiomaDispositivo() {
  try {
    const raw = (navigator.language || (navigator.languages && navigator.languages[0]) || "es").toLowerCase();
    const base = raw.split("-")[0];
    return IDIOMAS_SOPORTADOS[base] ? base : "es";
  } catch {
    return "es";
  }
}

const REDES_SOCIALES = [
  { nombre: "Instagram", handle: "@suelta", url: null, icon: "\u{1F4F7}" },
  { nombre: "X", handle: "@suelta", url: null, icon: "\u{1F573}" },
  { nombre: "TikTok", handle: "@suelta", url: null, icon: "\u{1F3B5}" },
  { nombre: "YouTube", handle: "¡Suelta!", url: null, icon: "\u{1F3A5}" },
  { nombre: "Facebook", handle: "¡Suelta!", url: null, icon: "\u{1F4D8}" },
  { nombre: "Spotify", handle: "¡Suelta!", url: null, icon: "\u{1F3A7}" },
];

function SeccionComunidad({ idioma }) {
  return (
    <div style={{ margin: "20px 0 0", padding: "18px 0 4px", borderTop: `1px solid ${LINE}` }}>
      <div style={{
        background: `linear-gradient(135deg, ${SAGE_TINT} 0%, #f0ecf8 100%)`,
        borderRadius: 20,
        padding: "20px 18px",
        border: `1px solid #d8d0ea`,
        position: "relative",
        overflow: "hidden",
      }}>
        <span aria-hidden="true" style={{ position: "absolute", top: -8, right: 12, fontSize: 56, opacity: 0.08, userSelect: "none" }}>❀</span>
        <span aria-hidden="true" style={{ position: "absolute", bottom: -4, left: 8, fontSize: 40, opacity: 0.06, userSelect: "none" }}>✦</span>
        <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 17, color: INK, margin: "0 0 4px", lineHeight: 1.3 }}>
          {t("Únete a la comunidad", idioma)}
        </p>
        <p style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, color: SAGE_DARK, margin: "0 0 10px", lineHeight: 1.3, fontStyle: "italic" }}>
          {t("¡Suelta!", idioma)}
        </p>
        <p style={{ fontSize: 12.5, color: "#2c4a3f", margin: "0 0 16px", lineHeight: 1.65 }}>
          {t("Comparte tu proceso, encuentra acompañamiento y conoce historias de otras personas que también están soltando lo que ya no les pertenece.", idioma)}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {REDES_SOCIALES.map((r) => {
            const chipStyle = {
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "white",
              border: `1px solid #d8d0ea`,
              borderRadius: 12,
              padding: "9px 12px",
              fontSize: 12.5,
              fontWeight: 700,
              color: INK,
              textDecoration: "none",
            };
            return r.url ? (
              <a key={r.nombre} href={r.url} target="_blank" rel="noopener noreferrer" style={chipStyle}>
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{r.nombre}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontWeight: 500 }}>{r.handle}</div>
                </div>
              </a>
            ) : (
              <span key={r.nombre} style={{ ...chipStyle, opacity: 0.65 }} title={t("Próximamente", idioma)}>
                <span style={{ fontSize: 16 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{r.nombre}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontWeight: 500 }}>{t("Próximamente", idioma)}</div>
                </div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Generadores de ruido de fondo relajantes usando síntesis procedural (sin archivos externos)
const createPinkNoiseBuffer = (ctx, duration = 4) => {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11; // normalizar amplitud
    b6 = white * 0.115926;
  }
  return buffer;
};

const createBrownNoiseBuffer = (ctx, duration = 4) => {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // normalizar amplitud
  }
  return buffer;
};

// Frecuencias de bienestar solfeggio extraídas del JSON proporcionado
export const FRECUENCIAS_SOLFEGGIO = [
  { 
    hz: 396, 
    label: "396 Hz", 
    intencion: "Liberación del miedo y la culpa", 
    emoji: "🪶", 
    color: "#FAF0D7", 
    text: "#9B7508", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_396hz.wav",
    emocion: "Miedo, culpa, inseguridad y tristeza profunda.",
    descripcion: "Esta frecuencia actúa directamente sobre los bloqueos emocionales inconscientes. Facilita la transmutación del dolor en alegría, promoviendo una base sólida de seguridad y arraigo."
  },
  { 
    hz: 417, 
    label: "417 Hz", 
    intencion: "Deshacer situaciones y facilitar el cambio", 
    emoji: "🌱", 
    color: "#D2E0DC", 
    text: "#3B6E5F", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_417hz.wav",
    emocion: "Estancamiento, frustración, resistencia al cambio y traumas del pasado.",
    descripcion: "Limpia las experiencias traumáticas del pasado y remueve el estancamiento energético. Facilita la asimilación de los cambios y disuelve nudos emocionales arraigados."
  },
  { 
    hz: 528, 
    label: "528 Hz", 
    intencion: "Transformación, amor y reparación profunda", 
    emoji: "🤍", 
    color: "#F4E0E0", 
    text: "#A44C4C", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_528hz.wav",
    emocion: "Baja autoestima, desamor, fatiga vital y desconexión con el corazón.",
    descripcion: "Conocida como la frecuencia de la transformación and los milagros. Resuena en el centro del pecho promoviendo la autocompasión, la fuerza vital y la claridad mental."
  },
  { 
    hz: 639, 
    label: "639 Hz", 
    intencion: "Reconexión y relaciones armoniosas", 
    emoji: "🕊️", 
    color: "#D2DAFF", 
    text: "#485E9E", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_639hz.wav",
    emocion: "Soledad, resentimiento, desconfianza y aislamiento social o familiar.",
    descripcion: "Fomenta la comunicación fluida, la empatía y la tolerancia en las relaciones humanas. Es excelente para superar tensiones interpersonales y sanar heridas por distancia."
  },
  { 
    hz: 741, 
    label: "741 Hz", 
    intencion: "Expresión, limpieza y soluciones", 
    emoji: "💧", 
    color: "#FFECD6", 
    text: "#A05A18", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_741hz.wav",
    emocion: "Bloqueo creativo, timidez, confusión y dificultad para expresarse de manera auténtica.",
    descripcion: "Actúa como un purificador mental para disolver pensamientos repetitivos o tóxicos. Impulsa la libre expresión y el desarrollo de soluciones intuitivas."
  },
  { 
    hz: 852, 
    label: "852 Hz", 
    intencion: "Retorno al orden espiritual y paz interior", 
    emoji: "🕯️", 
    color: "#E7E6F2", 
    text: "#5B5482", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_852hz.wav",
    emocion: "Desorientación existencial, ilusión mental y desconexión con el ser espiritual.",
    descripcion: "Ayuda a elevar la conciencia individual abriendo la intuición profunda. Te asiste en ver la verdad del ser y recuperar la calma y balance a nivel espiritual."
  },
  { 
    hz: 963, 
    label: "963 Hz", 
    intencion: "Conexión con la consciencia superior", 
    emoji: "🪷", 
    color: "#E2E8F0", 
    text: "#475569", 
    binauralOffset: 6.0, 
    archivo: "/audio/solfeggio_963hz.wav",
    emocion: "Vacío emocional, separación existencial y olvido de la presencia interior.",
    descripcion: "La 'frecuencia de la corona' despierta la conexión intrínseca con el universo y el estado puro del ser, uniendo cuerpo y mente en paz absoluta."
  }
];

// Función para inicializar y arrancar un tono binaural puro en un AudioContext
export function iniciarTonoBinaural(ctx, hz, offset, masterGainNode) {
  const oscL = ctx.createOscillator();
  const oscR = ctx.createOscillator();
  
  const gainL = ctx.createGain();
  const gainR = ctx.createGain();
  
  oscL.type = 'sine';
  oscL.frequency.setValueAtTime(hz, ctx.currentTime);
  
  oscR.type = 'sine';
  oscR.frequency.setValueAtTime(hz + offset, ctx.currentTime);
  
  gainL.gain.setValueAtTime(0.4, ctx.currentTime);
  gainR.gain.setValueAtTime(0.4, ctx.currentTime);
  
  oscL.connect(gainL);
  oscR.connect(gainR);
  
  // Usar StereoPannerNode para espacialización estéreo robusta (izq/der)
  // con fallback directo para máxima compatibilidad (monitores/bocinas mono)
  if (ctx.createStereoPanner) {
    try {
      const pannerL = ctx.createStereoPanner();
      pannerL.pan.setValueAtTime(-1, ctx.currentTime); // Totalmente a la izquierda
      const pannerR = ctx.createStereoPanner();
      pannerR.pan.setValueAtTime(1, ctx.currentTime);  // Totalmente a la derecha
      
      gainL.connect(pannerL);
      gainR.connect(pannerR);
      
      pannerL.connect(masterGainNode);
      pannerR.connect(masterGainNode);
    } catch (e) {
      // Fallback si falla la creación del panner
      gainL.connect(masterGainNode);
      gainR.connect(masterGainNode);
    }
  } else {
    // Fallback si no está soportado
    gainL.connect(masterGainNode);
    gainR.connect(masterGainNode);
  }
  
  oscL.start();
  oscR.start();
  
  return { oscL, oscR, gainL, gainR };
}

function ScreenRespiracion({ onBack, onGuardar, tutorialStep, onComenzarTutorial, idioma }) {
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState("Preparación");
  const [ciclos, setCiclos] = useState(0);
  const [ambiente, setAmbiente] = useState(528); // 528 Hz por defecto
  const timerRef = useRef(null);

  const handleBack = () => {
    if (onGuardar && ciclos > 0) {
      const desc = ambiente === "silencio" ? t("en silencio", idioma) : `${t("con frecuencia Solfeggio de", idioma)} ${ambiente} Hz`;
      onGuardar(`${t("Práctica de Respiración Guiada", idioma)} ${desc} ${t("completada", idioma)}. ${t("Ciclos realizados:", idioma)} ${ciclos}.`);
    }
    detenerAudio();
    onBack();
  };

  // Audio Context para sintetizar frecuencias relajantes
  const audioCtxRef = useRef(null);
  const sourcesRef = useRef([]);
  const gainRef = useRef(null);
  const currentFreqRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  const detenerAudioDirecto = () => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    currentFreqRef.current = null;
    if (sourcesRef.current) {
      sourcesRef.current.forEach(item => {
        try { if (item.oscL) item.oscL.stop(); } catch(e){}
        try { if (item.oscR) item.oscR.stop(); } catch(e){}
        try { if (item.oscL) item.oscL.disconnect(); } catch(e){}
        try { if (item.oscR) item.oscR.disconnect(); } catch(e){}
        try { if (item.gainL) item.gainL.disconnect(); } catch(e){}
        try { if (item.gainR) item.gainR.disconnect(); } catch(e){}
        try { if (item.merger) item.merger.disconnect(); } catch(e){}
      });
      sourcesRef.current = [];
    }
    if (gainRef.current) {
      try { gainRef.current.disconnect(); } catch(e){}
      gainRef.current = null;
    }
  };

  const iniciarAudio = (fHz = ambiente) => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    if (fHz === "silencio") {
      detenerAudioDirecto();
      return;
    }
    
    // Si ya se está reproduciendo este mismo tono de forma activa, evitar reiniciarlo
    if (
      audioCtxRef.current &&
      sourcesRef.current.length > 0 &&
      currentFreqRef.current === fHz
    ) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    detenerAudioDirecto();

    gainRef.current = ctx.createGain();
    gainRef.current.connect(ctx.destination);
    
    // Ajustar volumen más alto (0.35 en vez de 0.12) para máxima audibilidad
    gainRef.current.gain.value = 0.35;
    try {
      gainRef.current.gain.setValueAtTime(0.35, ctx.currentTime);
    } catch (e) {}

    sourcesRef.current = [];

    const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(fHz)) || FRECUENCIAS_SOLFEGGIO[2];
    
    // Iniciar tono binaural nativo
    const nodes = iniciarTonoBinaural(ctx, freqObj.hz, freqObj.binauralOffset, gainRef.current);
    sourcesRef.current.push(nodes);
    currentFreqRef.current = fHz;
  };

  const detenerAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      try {
        gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      } catch (e) {}
      fadeTimeoutRef.current = setTimeout(detenerAudioDirecto, 1000);
    }
  };

  useEffect(() => {
    if (!activo) {
      detenerAudio();
      return;
    }
    
    iniciarAudio();
    
    const secuencia = [
      { fase: "Inhala", ms: 4000 },
      { fase: "Sostén", ms: 4000 },
      { fase: "Exhala", ms: 4000 },
    ];
    let i = 0;
    setFase(secuencia[0].fase);
    
    const avanzar = () => {
      i = (i + 1) % secuencia.length;
      if (i === 0) setCiclos((c) => c + 1);
      setFase(secuencia[i].fase);
      timerRef.current = setTimeout(avanzar, secuencia[i].ms);
      
      // Modular volumen ligeramente con la respiración
      if (gainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const targetVol = secuencia[i].fase === "Inhala" ? 0.22 : secuencia[i].fase === "Exhala" ? 0.04 : 0.16;
        gainRef.current.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + (secuencia[i].ms / 1000));
      }
    };
    
    timerRef.current = setTimeout(avanzar, secuencia[0].ms);
    return () => {
      clearTimeout(timerRef.current);
      detenerAudio();
    };
  }, [activo, ambiente]);

  // Configuraciones visuales dinámicas
  const escala = fase === "Inhala" ? 1.6 : fase === "Exhala" ? 0.7 : fase === "Sostén" ? 1.6 : 1;
  const opacidad = fase === "Inhala" ? 0.8 : fase === "Exhala" ? 0.3 : fase === "Sostén" ? 0.9 : 0.5;
  const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(ambiente)) || FRECUENCIAS_SOLFEGGIO[2];

  return (
    <div className="ss-fade" style={{ 
      padding: "0", 
      minHeight: "100%", 
      flex: 1,
      display: "flex", 
      flexDirection: "column",
      background: activo ? "#0f172a" : "#f8fafc",
      transition: "background 1.5s ease-in-out",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Círculos decorativos de fondo (aura) */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 300, height: 300,
        marginLeft: -150, marginTop: -150,
        borderRadius: "50%",
        background: freqObj.color,
        filter: "blur(80px)",
        opacity: activo ? opacidad * 0.5 : 0.2,
        transform: `scale(${activo ? escala * 1.2 : 1})`,
        transition: "transform 4s ease-in-out, opacity 4s ease-in-out, background 1s ease",
        zIndex: 0
      }} />

      <div style={{ padding: "0 22px", zIndex: 1, paddingTop: 16 }}>
        <TopBar title={t("Respiración guiada", idioma)} onBack={handleBack} theme={activo ? "dark" : "light"} />
      </div>

      {activo && (
        <div style={{ 
          zIndex: 10, 
          display: "flex", 
          justifyContent: "center", 
          marginTop: -6, 
          marginBottom: 10 
        }}>
          <button
            onClick={() => {
              if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }
              if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
              }
              if (ambiente === "silencio") {
                setAmbiente(528);
                iniciarAudio(528);
              } else {
                setAmbiente("silencio");
                detenerAudio();
              }
            }}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {ambiente === "silencio" ? (
              <>
                <span>🔇</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{t("Silenciado", idioma)}</span>
              </>
            ) : (
              <>
                <span style={{ animation: "pulse 1.5s infinite" }}>🔊</span>
                <span>{ambiente} Hz ({t("Tocar para Silenciar", idioma)})</span>
              </>
            )}
          </button>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32, zIndex: 1, position: "relative" }}>
        
        {/* Selector de Frecuencia Solfeggio (se oculta al estar activo para evitar distracciones) */}
        <div style={{ 
          opacity: activo ? 0 : 1, 
          transform: activo ? "translateY(-20px)" : "translateY(0)",
          transition: "all 0.8s ease",
          pointerEvents: activo ? "none" : "auto",
          width: "100%", padding: "0 22px"
        }}>
          <p style={{ textAlign: "center", fontSize: 13, color: MUTED, marginBottom: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
            {t("Frecuencia de Bienestar (Solfeggio)", idioma)}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxHeight: "240px", overflowY: "auto", paddingRight: 4 }}>
            
            {/* Botón Silencio (Predeterminado) */}
            <button
              onClick={() => {
                setAmbiente("silencio");
                detenerAudio();
              }}
              style={{
                padding: ambiente === "silencio" ? "14px 16px" : "10px 14px",
                borderRadius: 14,
                border: `1.5px solid ${ambiente === "silencio" ? SAGE_DARK : LINE}`,
                background: ambiente === "silencio" ? "white" : "rgba(255,255,255,0.4)",
                color: INK,
                display: "flex", 
                flexDirection: "column",
                textAlign: "left",
                transition: "all 0.25s ease",
                boxShadow: ambiente === "silencio" ? "0 4px 12px rgba(0,0,0,0.04)" : "none",
                cursor: "pointer",
                fontFamily: FONT_BODY,
                width: "100%"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                <span style={{ fontSize: 20 }}>🔇</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>🔇 {t("Silencio (Predeterminado)", idioma)}</div>
                  <div style={{ fontSize: 11.5, color: MUTED }}>{t("Práctica sin sonido de fondo", idioma)}</div>
                </div>
              </div>
            </button>

            {FRECUENCIAS_SOLFEGGIO.map(f => (
              <button
                key={f.hz}
                onClick={() => setAmbiente(f.hz)}
                style={{
                  padding: ambiente === f.hz ? "14px 16px" : "10px 14px",
                  borderRadius: 14,
                  border: `1.5px solid ${ambiente === f.hz ? f.color : LINE}`,
                  background: ambiente === f.hz ? "white" : "rgba(255,255,255,0.4)",
                  color: INK,
                  display: "flex", 
                  flexDirection: "column",
                  gap: ambiente === f.hz ? 10 : 0,
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  boxShadow: ambiente === f.hz ? "0 4px 12px rgba(0,0,0,0.04)" : "none",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                  <span style={{ fontSize: 20 }}>{f.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{t(f.label, idioma)}</span>
                      <span style={{ fontSize: 10, color: MUTED, fontWeight: 500 }}>Δ{f.binauralOffset}Hz</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t(f.intencion, idioma)}
                    </div>
                  </div>
                </div>

                {ambiente === f.hz && (
                  <div style={{ 
                    width: "100%", 
                    borderTop: `1px solid ${LINE}`, 
                    paddingTop: 8, 
                    fontSize: 11.5, 
                    lineHeight: 1.45,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    animation: "ss-fade-up 0.2s ease-out"
                  }}>
                    <div>
                      <span style={{ fontWeight: 700, color: f.text }}>{t("Emoción a trabajar:", idioma)} </span>
                      <span style={{ color: INK }}>{t(f.emocion, idioma)}</span>
                    </div>
                    <div style={{ color: MUTED }}>
                      {t(f.descripcion, idioma)}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Círculo Principal Respiración */}
        <div style={{ position: "relative", width: 220, height: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Anillo exterior animado */}
          <div
            style={{
              position: "absolute",
              width: "100%", height: "100%",
              borderRadius: "50%",
              border: `2px solid ${activo ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)"}`,
              transform: `scale(${activo ? escala : 1})`,
              transition: "transform 4s linear, border-color 1s ease",
            }}
          />
          
          {/* Círculo interior */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: activo ? "rgba(255,255,255,0.15)" : freqObj.color,
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${activo ? escala * 0.9 : 1})`,
              transition: "transform 4s linear, background 1.5s ease",
              boxShadow: activo ? "0 0 40px rgba(255,255,255,0.1)" : "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ 
              fontFamily: FONT_DISPLAY, 
              fontSize: 26, 
              color: activo ? "#fff" : SAGE_DARK,
              transition: "color 1s ease",
              textShadow: activo ? "0 2px 10px rgba(0,0,0,0.3)" : "none"
            }}>
              {activo ? t(fase, idioma) : t("Lista", idioma)}
            </span>
          </div>
        </div>

        <div style={{ height: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ 
            fontSize: 14, 
            color: activo ? "rgba(255,255,255,0.7)" : MUTED, 
            textAlign: "center", 
            maxWidth: 280, 
            lineHeight: 1.5,
            transition: "color 1s ease"
          }}>
            {activo
              ? t("Sigue el círculo con tu respiración", idioma)
              : `${t("Armonización vibracional de", idioma)} ${freqObj.hz} Hz ${t("para tu sintonización.", idioma)}`}
          </p>
          {activo && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 700, marginTop: 8 }}>
              {ciclos} {ciclos === 1 ? t("ciclo completado", idioma) : t("ciclos completados", idioma)}
            </p>
          )}
        </div>
      </div>

      <div style={{ padding: "0 22px 30px", zIndex: 1 }}>
        <button
          className={activo ? "ss-btn" : "ss-btn ss-btn-primary"}
          style={{ 
            width: "100%", 
            background: tutorialStep === 9 && !activo ? "#dfa15f" : (activo ? "rgba(255,255,255,0.1)" : SAGE_DARK),
            color: "#fff",
            border: tutorialStep === 9 && !activo ? "2px solid #dfa15f" : (activo ? "1px solid rgba(255,255,255,0.2)" : "none"),
            backdropFilter: activo ? "blur(10px)" : "none",
            boxShadow: tutorialStep === 9 && !activo ? "0 0 15px rgba(223,161,95,0.4)" : undefined,
            transform: tutorialStep === 9 && !activo ? "scale(1.02)" : undefined,
            transition: "all 0.3s ease"
          }}
          onClick={() => {
            if (activo) {
              clearTimeout(timerRef.current);
              if (onGuardar && ciclos > 0) {
                const desc = ambiente === "silencio" ? t("en silencio", idioma) : `${t("con frecuencia Solfeggio de", idioma)} ${ambiente} Hz`;
                onGuardar(`${t("Práctica de Respiración Guiada", idioma)} ${desc} ${t("completada", idioma)}. ${t("Ciclos realizados:", idioma)} ${ciclos}.`);
              }
              setFase("Preparación");
              detenerAudio();
            } else {
              // Pre-initialize/resume AudioContext within user activation stack
              if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }
              if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
              }
              iniciarAudio(ambiente);
              if (tutorialStep === 9 && onComenzarTutorial) {
                onComenzarTutorial();
              }
            }
            setCiclos(0);
            setActivo((a) => !a);
          }}
        >
          {activo ? t("Terminar", idioma) : t("Comenzar", idioma)}
        </button>
      </div>
    </div>
  );
}

const PASOS_PRESENTE = [
  { sentido: "vista", n: 5, prompt: "Nombra 5 cosas que puedas ver ahora mismo a tu alrededor" },
  { sentido: "tacto", n: 4, prompt: "Nombra 4 cosas que puedas tocar o sentir con tu piel" },
  { sentido: "oído", n: 3, prompt: "Nombra 3 sonidos que puedas escuchar en este momento" },
  { sentido: "olfato", n: 2, prompt: "Nombra 2 cosas que puedas oler" },
  { sentido: "gusto", n: 1, prompt: "Nombra 1 cosa que puedas saborear o te guste su sabor" },
];

function ScreenPresente({ onBack, onGuardar, idioma }) {
  const [paso, setPaso] = useState(0);
  const actual = PASOS_PRESENTE[paso];
  const [textos, setTextos] = useState(Array(actual?.n || 1).fill(""));
  const [terminado, setTerminado] = useState(false);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    if (actual) {
      if (!respuestas[actual.sentido]) {
        setTextos(Array(actual.n).fill(""));
      } else {
        setTextos(respuestas[actual.sentido]);
      }
    }
  }, [paso, actual]);

  const siguiente = () => {
    const updatedRespuestas = { ...respuestas, [actual.sentido]: textos };
    setRespuestas(updatedRespuestas);

    if (paso < PASOS_PRESENTE.length - 1) {
      setPaso((p) => p + 1);
    } else {
      setTerminado(true);
      if (onGuardar) {
        let textoFinal = t("Conexión con el presente", idioma) + ":\n\n";
        PASOS_PRESENTE.forEach((p) => {
          const lista = p.sentido === actual.sentido ? textos : (updatedRespuestas[p.sentido] || []);
          const filtrada = lista.filter(t => t.trim());
          if (filtrada.length > 0) {
            textoFinal += `🌟 ${t(p.prompt, idioma)}:\n`;
            filtrada.forEach((val) => {
              textoFinal += `  · ${val}\n`;
            });
            textoFinal += "\n";
          }
        });
        onGuardar(textoFinal.trim());
      }
    }
  };

  const handleTextChange = (index, value) => {
    const newTextos = [...textos];
    newTextos[index] = value;
    setTextos(newTextos);
  };

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const HandIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/><path d="M7 15V8a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v0"/>
    </svg>
  );

  const EarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1"/><path d="M8 12c-1.33-1-3-1-3-1"/><path d="M14 10s-1 1-1 3"/><circle cx="12" cy="18.5" r=".5" fill="currentColor" stroke="none"/>
    </svg>
  );

  const WindIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
    </svg>
  );

  const TasteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8c0 4.418-4.03 8-9 8C7.03 16 3 12.418 3 8s4.03-8 9-8c4.97 0 9 3.582 9 8z"/><path d="M7 8c0 2.76 2.24 5 5 5s5-2.24 5-5"/><path d="M12 13v7"/>
    </svg>
  );

  const colors = {
    vista: { bg: "#f0f7fb", border: "#dceef7", text: "#4682a8", icon: <EyeIcon /> },
    tacto: { bg: "#eaf3ef", border: "#d4e8dd", text: "#3f6b5b", icon: <HandIcon /> },
    "oído": { bg: "#f1ecf9", border: "#e4d8f3", text: "#7d5ba6", icon: <EarIcon /> },
    olfato: { bg: "#fdf4f6", border: "#fad8e1", text: "#b05f76", icon: <WindIcon /> },
    gusto: { bg: "#fff9e6", border: "#fcebc5", text: "#a37c27", icon: <TasteIcon /> }
  };

  if (terminado) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Conexión con el presente", idioma)} onBack={onBack} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 10
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={SAGE_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: INK, margin: 0, fontWeight: 500 }}>{t("Volviste al presente", idioma)}</p>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 260, lineHeight: 1.6 }}>
            {t("Has conectado tus 5 sentidos con el momento presente. Tu mente y cuerpo están aquí y ahora.", idioma)}
          </p>
        </div>
        <button
          className="ss-btn ss-btn-primary"
          style={{ width: "100%" }}
          onClick={() => {
            setPaso(0);
            setTerminado(false);
          }}
        >
          {t("Volver a empezar", idioma)}
        </button>
      </div>
    );
  }

  const theme = colors[actual.sentido] || { bg: SAGE_TINT, border: SAGE, text: SAGE_DARK, icon: <EyeIcon /> };

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
      <TopBar title={t("Conexión con el presente", idioma)} onBack={onBack} step={paso + 1} totalSteps={PASOS_PRESENTE.length} />
      
      <div style={{ flex: 1, marginTop: 10, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ color: theme.text }}>{theme.icon}</span>
          <p style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: "uppercase", margin: 0, letterSpacing: 0.5 }}>
            {t("Sentido", idioma)}: {t(actual.sentido, idioma)}
          </p>
        </div>
        
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 22, color: INK, margin: "0 0 24px", lineHeight: 1.3 }}>
          {t(actual.prompt, idioma)}
        </h2>
        
        <div className="ss-stagger" style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", paddingBottom: 20, flex: 1 }}>
          {textos.map((txt, i) => (
            <div key={`${paso}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ 
                width: 28, height: 28, minWidth: 28, 
                borderRadius: "50%", 
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: theme.text,
                fontSize: 13, fontWeight: 600,
                marginTop: 10
              }}>
                {i + 1}
              </div>
              <textarea
                className="ss-input"
                rows={1}
                placeholder={t("Escribe lo que notas...", idioma)}
                value={txt}
                autoCorrect="on"
                spellCheck={true}
                autoCapitalize="sentences"
                onChange={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = (e.target.scrollHeight > 48 ? e.target.scrollHeight : 48) + 'px';
                  handleTextChange(i, e.target.value);
                }}
                style={{ 
                  flex: 1, 
                  background: "#f9f9fa", 
                  border: `1px solid ${LINE}`,
                  borderRadius: 16,
                  padding: "14px 16px",
                  fontSize: 15,
                  resize: "none",
                  minHeight: 48,
                  overflow: "hidden",
                  fontFamily: FONT_BODY,
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme.text;
                  e.target.style.background = "#fff";
                  e.target.style.boxShadow = `0 0 0 3px ${theme.bg}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = LINE;
                  e.target.style.background = "#f9f9fa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 16 }}>
        <button 
          className="ss-btn" 
          style={{ width: "100%", background: theme.text, color: "#fff", boxShadow: `0 6px 16px ${theme.text}40` }} 
          onClick={siguiente}
        >
          {paso < PASOS_PRESENTE.length - 1 ? t("Siguiente", idioma) : t("Terminar", idioma)}
        </button>
      </div>
    </div>
  );
}

function ScreenGratitud({ onBack, onGuardar, idioma }) {
  const [items, setItems] = useState(["", "", ""]);
  const [guardado, setGuardado] = useState(false);

  if (guardado) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Gratitud", idioma)} onBack={onBack} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
          <span style={{ fontSize: 30, color: SAGE_DARK }}>&#10003;</span>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: INK, margin: 0 }}>{t("Quedó guardado en tu diario", idioma)}</p>
          <p style={{ fontSize: 13, color: MUTED, maxWidth: 240, lineHeight: 1.5 }}>
            {t("Nombrar lo bueno no niega lo difícil. Simplemente le da un lugar también a lo que sí está funcionando.", idioma)}
          </p>
        </div>
        <button className="ss-btn ss-btn-primary" style={{ width: "100%" }} onClick={onBack}>
          {t("Volver", idioma)}
        </button>
      </div>
    );
  }

  const puedeGuardar = items.some((i) => i.trim());

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Gratitud", idioma)} onBack={onBack} />
      <div style={{ flex: 1, marginTop: 6 }}>
        <p style={{ color: MUTED, fontSize: 13, margin: "0 0 18px", lineHeight: 1.5 }}>
          {t("Tres cosas buenas de hoy, por pequeñas que sean. No tienen que ser grandes para contar.", idioma)}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((val, i) => (
            <input
              key={i}
              className="ss-input"
              placeholder={`${i + 1}. ...`}
              value={val}
              onChange={(e) => {
                const copia = [...items];
                copia[i] = e.target.value;
                setItems(copia);
              }}
            />
          ))}
        </div>
      </div>
      <button
        className="ss-btn ss-btn-primary"
        style={{ width: "100%", opacity: puedeGuardar ? 1 : 0.5 }}
        disabled={!puedeGuardar}
        onClick={() => {
          const texto = t("Gratitud", idioma) + ": " + items.filter((i) => i.trim()).join(" · ");
          onGuardar(texto);
          setGuardado(true);
        }}
      >
        {t("Guardar en mi diario", idioma)}
      </button>
    </div>
  );
}

const PASOS_RELAJACION = [
  "Busca una posición cómoda, sentada o acostada, y cierra los ojos si te sientes segura.",
  "Lleva tu atención a los pies. Nota su peso, su temperatura, sin cambiar nada, solo notando.",
  "Sube la atención a las piernas y las caderas. Si hay tensión, no la fuerces a irse — solo reconócela.",
  "Ahora el abdomen and el pecho. Sigue el ritmo natural de tu respiración, sin modificarlo.",
  "Lleva la atención a los hombros. Es común que carguen tensión sin que te des cuenta — déjalos caer un poco.",
  "Por último, la cara y la cabeza. Suelta la mandíbula, suelta la frente.",
  "Antes de abrir los ojos, nota cómo se siente todo tu cuerpo junto, de una vez.",
];

function ScreenRelajacion({ onBack, onGuardar, idioma }) {
  const [paso, setPaso] = useState(0);
  const [iniciado, setIniciado] = useState(false);
  const [ambiente, setAmbiente] = useState(528); // Frecuencia por defecto (528 Hz)
  const [animKey, setAnimKey] = useState(0);

  const audioCtxRef = useRef(null);
  const sourcesRef = useRef([]);
  const gainRef = useRef(null);
  const currentFreqRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  const detenerAudioDirecto = () => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    currentFreqRef.current = null;
    if (sourcesRef.current) {
      sourcesRef.current.forEach(item => {
        try { if (item.oscL) item.oscL.stop(); } catch(e){}
        try { if (item.oscR) item.oscR.stop(); } catch(e){}
        try { if (item.oscL) item.oscL.disconnect(); } catch(e){}
        try { if (item.oscR) item.oscR.disconnect(); } catch(e){}
        try { if (item.gainL) item.gainL.disconnect(); } catch(e){}
        try { if (item.gainR) item.gainR.disconnect(); } catch(e){}
        try { if (item.merger) item.merger.disconnect(); } catch(e){}
      });
      sourcesRef.current = [];
    }
    if (gainRef.current) {
      try { gainRef.current.disconnect(); } catch(e){}
      gainRef.current = null;
    }
  };

  const iniciarAudio = (fHz = ambiente) => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    if (fHz === "silencio") {
      detenerAudioDirecto();
      return;
    }
    
    // Si ya se está reproduciendo este mismo tono de forma activa, evitar reiniciarlo
    if (
      audioCtxRef.current &&
      sourcesRef.current.length > 0 &&
      currentFreqRef.current === fHz
    ) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    detenerAudioDirecto();

    gainRef.current = ctx.createGain();
    gainRef.current.connect(ctx.destination);
    
    // Ajustar volumen más alto (0.35 en vez de 0.12) para máxima audibilidad
    gainRef.current.gain.value = 0.35;
    try {
      gainRef.current.gain.setValueAtTime(0.35, ctx.currentTime);
    } catch (e) {}

    sourcesRef.current = [];

    const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(fHz)) || FRECUENCIAS_SOLFEGGIO[2];
    
    // Iniciar tono binaural
    const nodes = iniciarTonoBinaural(ctx, freqObj.hz, freqObj.binauralOffset, gainRef.current);
    sourcesRef.current.push(nodes);
    currentFreqRef.current = fHz;
  };

  const detenerAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      try {
        gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      } catch (e) {}
      fadeTimeoutRef.current = setTimeout(detenerAudioDirecto, 1000);
    }
  };

  useEffect(() => {
    setAnimKey(prev => prev + 1);
  }, [paso]);

  useEffect(() => {
    return () => {
      detenerAudio();
    };
  }, []);

  const terminado = paso >= PASOS_RELAJACION.length;

  useEffect(() => {
    if (iniciado && !terminado) {
      iniciarAudio(ambiente);
    } else {
      detenerAudio();
    }
  }, [iniciado, terminado, ambiente]);

  useEffect(() => {
    if (terminado && onGuardar) {
      const desc = ambiente === "silencio" ? "en silencio" : `sintonizado con la frecuencia de bienestar de ${ambiente} Hz`;
      onGuardar(`Práctica de Relajación Corporal completada con éxito. Realizada ${desc}.`);
    }
  }, [terminado, ambiente, onGuardar]);

  // Buscar color e info de la frecuencia seleccionada para el aura visual
  const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(ambiente)) || FRECUENCIAS_SOLFEGGIO[2];

  if (!iniciado) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
        <TopBar title={t("Relajación corporal", idioma)} onBack={onBack} />
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, overflowY: "auto", paddingBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={SAGE_DARK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 24, margin: "0 0 8px", color: INK }}>{t("Relajación Corporal", idioma)}</h2>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 260, margin: "0 auto", lineHeight: 1.5 }}>
              {t("Selecciona una frecuencia de bienestar solfeggio para acompañar tu viaje de relajación consciente.", idioma)}
            </p>
          </div>

          <div style={{ background: "#f9f9fa", borderRadius: 16, padding: 20, border: `1px solid ${LINE}` }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", marginBottom: 12, letterSpacing: 0.5 }}>
              {t("Frecuencia de Acompañamiento", idioma)}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "240px", overflowY: "auto", paddingRight: 4 }}>
              
              {/* Opción de Silencio (Predeterminado) */}
              <button
                onClick={() => {
                  setAmbiente("silencio");
                  detenerAudio();
                }}
                style={{
                  padding: ambiente === "silencio" ? "14px 16px" : "10px 14px",
                  borderRadius: 14,
                  border: `1.5px solid ${ambiente === "silencio" ? SAGE_DARK : LINE}`,
                  background: ambiente === "silencio" ? "white" : "transparent",
                  color: INK,
                  display: "flex", 
                  flexDirection: "column",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  boxShadow: ambiente === "silencio" ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                  <span style={{ fontSize: 20 }}>🔇</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t("🔇 Silencio (Predeterminado)", idioma)}</div>
                    <div style={{ fontSize: 11.5, color: MUTED }}>{t("Práctica sin sonido de fondo", idioma)}</div>
                  </div>
                </div>
              </button>

              {FRECUENCIAS_SOLFEGGIO.map(f => (
                <button
                  key={f.hz}
                  onClick={() => setAmbiente(f.hz)}
                  style={{
                    padding: ambiente === f.hz ? "14px 16px" : "10px 14px",
                    borderRadius: 14,
                    border: `1.5px solid ${ambiente === f.hz ? f.color : LINE}`,
                    background: ambiente === f.hz ? "white" : "transparent",
                    color: INK,
                    display: "flex", 
                    flexDirection: "column",
                    gap: ambiente === f.hz ? 10 : 0,
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    boxShadow: ambiente === f.hz ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                    cursor: "pointer",
                    fontFamily: FONT_BODY,
                    width: "100%"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                    <span style={{ fontSize: 20 }}>{f.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{t(f.label, idioma)}</span>
                        <span style={{ fontSize: 10, color: MUTED }}>Δ{f.binauralOffset}Hz</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t(f.intencion, idioma)}
                      </div>
                    </div>
                  </div>

                  {ambiente === f.hz && (
                    <div style={{ 
                      width: "100%", 
                      borderTop: `1px solid ${LINE}`, 
                      paddingTop: 8, 
                      fontSize: 11.5, 
                      lineHeight: 1.45,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      animation: "ss-fade-up 0.2s ease-out"
                    }}>
                      <div>
                        <span style={{ fontWeight: 700, color: f.text }}>{t("Emoción a trabajar:", idioma)} </span>
                        <span style={{ color: INK }}>{t(f.emocion, idioma)}</span>
                      </div>
                      <div style={{ color: MUTED }}>
                        {t(f.descripcion, idioma)}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 16 }}>
          <button 
            className="ss-btn ss-btn-primary" 
            style={{ width: "100%", height: 50, fontSize: 16 }}
            onClick={() => {
              // Pre-initialize and resume the AudioContext synchronously inside user activation
              if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }
              if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                 audioCtxRef.current.resume();
              }
              setIniciado(true);
              iniciarAudio(ambiente);
            }}
          >
            {t("Comenzar relajación", idioma)}
          </button>
        </div>
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar title={t("Relajación corporal", idioma)} onBack={() => { detenerAudio(); onBack(); }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 10
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={SAGE_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 24, color: INK, margin: 0, fontWeight: 500 }}>{t("Recorriste todo tu cuerpo", idioma)}</p>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 260, lineHeight: 1.6 }}>
            {t("Tu cuerpo y mente se han sintonizado con la vibración de", idioma)} {freqObj.hz} Hz. {t("Puedes volver a este ejercicio cuantas veces lo necesites.", idioma)}
          </p>
        </div>
        <button
          className="ss-btn ss-btn-primary"
          style={{ width: "100%" }}
          onClick={() => {
            setPaso(0);
          }}
        >
          {t("Volver a hacerlo", idioma)}
        </button>
      </div>
    );
  }

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", flex: 1, display: "flex", flexDirection: "column", background: "#fdfbf9", position: "relative" }}>
      <div style={{ zIndex: 10 }}>
        <TopBar title={t("Relajación corporal", idioma)} onBack={() => { detenerAudio(); onBack(); }} step={paso + 1} totalSteps={PASOS_RELAJACION.length} />
      </div>
      
      {iniciado && !terminado && (
        <div style={{ 
          zIndex: 10, 
          display: "flex", 
          justifyContent: "center", 
          marginTop: -6, 
          marginBottom: 10 
        }}>
          <button
            onClick={() => {
              if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }
              if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
              }
              if (ambiente === "silencio") {
                setAmbiente(528);
                iniciarAudio(528);
              } else {
                setAmbiente("silencio");
                detenerAudio();
              }
            }}
            style={{
              background: "rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.06)",
              color: INK,
              padding: "6px 14px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {ambiente === "silencio" ? (
              <>
                <span>🔇</span>
                <span style={{ color: MUTED }}>{t("Silenciado", idioma)}</span>
              </>
            ) : (
              <>
                <span style={{ animation: "pulse 1.5s infinite" }}>🔊</span>
                <span>{ambiente} Hz ({t("Tocar para Silenciar", idioma)})</span>
              </>
            )}
          </button>
        </div>
      )}
      
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Soft background aura using the selected frequency color */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 320, height: 320, marginLeft: -160, marginTop: -160,
          background: `radial-gradient(circle, ${freqObj.color} 0%, rgba(253, 251, 249, 0) 70%)`,
          zIndex: 0,
          opacity: 0.8,
          animation: "pulseAura 6s infinite alternate ease-in-out"
        }} />

        <p 
          key={animKey}
          className="ss-fade-up"
          style={{ 
            fontFamily: FONT_DISPLAY, 
            fontSize: 24, 
            color: INK, 
            lineHeight: 1.5, 
            margin: 0, 
            textAlign: "center",
            maxWidth: 300,
            zIndex: 1,
            fontWeight: 400
          }}
        >
          {t(PASOS_RELAJACION[paso], idioma)}
        </p>
      </div>

      <div style={{ zIndex: 10, paddingTop: 16 }}>
        <button 
          className="ss-btn ss-btn-primary" 
          style={{ width: "100%", height: 50, fontSize: 16, boxShadow: "0 6px 16px rgba(0,0,0,0.06)" }} 
          onClick={() => setPaso((p) => p + 1)}
        >
          {paso < PASOS_RELAJACION.length - 1 ? t("Siguiente", idioma) : t("Terminar", idioma)}
        </button>
      </div>

      <style>{`
        @keyframes pulseAura {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
        .ss-fade-up {
          animation: fadeUpText 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes fadeUpText {
          0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

const PASOS_LUGAR_SEGURO_ICONS = [
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8a6bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f6b5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.34812 19.4975 5.56834 20.2195 5.43853 20.9015C5.31835 21.5328 5.74834 22 6.38853 22H12Z" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
  </svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cfa573" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5v14M22 9v6M7 7v10M2 10v4" />
  </svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c98b6b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v6M5 12h14M7 21l3-6h4l3 6" />
  </svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8a6bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7" />
  </svg>,
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3f6b5b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
];

function ScreenLugarSeguro({ onBack, nombre, sexo, onGuardar, idioma }) {
  const [paso, setPaso] = useState(0);
  const [sonidoActivo, setSonidoActivo] = useState("silencio"); // "silencio" o frecuencia en Hz (string)

  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeNodesRef = useRef([]); // holds { oscL, oscR, gainL, gainR, merger }
  const playTimeoutRef = useRef(null);

  const ui = getLocalizedLugarSeguroUI(idioma);
  const rawPasos = getLocalizedPasosLugarSeguro(nombre, sexo, idioma);
  const pasos = rawPasos.map((p, idx) => ({
    ...p,
    icon: PASOS_LUGAR_SEGURO_ICONS[idx] || PASOS_LUGAR_SEGURO_ICONS[0]
  }));
  const terminado = paso >= pasos.length;

  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
        masterGainRef.current = audioCtxRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        masterGainRef.current.connect(audioCtxRef.current.destination);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const stopActiveSounds = (fadeTime = 0.3) => {
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    activeNodesRef.current.forEach((item) => {
      try { if (item.oscL) item.oscL.stop(); } catch (e) {}
      try { if (item.oscR) item.oscR.stop(); } catch (e) {}
      try { if (item.oscL) item.oscL.disconnect(); } catch (e) {}
      try { if (item.oscR) item.oscR.disconnect(); } catch (e) {}
      try { if (item.gainL) item.gainL.disconnect(); } catch (e) {}
      try { if (item.gainR) item.gainR.disconnect(); } catch (e) {}
      try { if (item.merger) item.merger.disconnect(); } catch (e) {}
    });

    activeNodesRef.current = [];
  };

  const playSound = (soundType) => {
    try {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }

      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopActiveSounds(0.3);

      if (soundType === "silencio") {
        setSonidoActivo("silencio");
        return;
      }

      setSonidoActivo(soundType);

      // Timeout para transición suave
      playTimeoutRef.current = setTimeout(() => {
        const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(soundType));
        if (!freqObj) return;

        // Iniciar tono binaural nativo
        const nodes = iniciarTonoBinaural(ctx, freqObj.hz, freqObj.binauralOffset, masterGainRef.current);
        activeNodesRef.current.push(nodes);
      }, 100);
    } catch (e) {
      console.warn("Audio Context bloqueado o no soportado:", e);
    }
  };

  useEffect(() => {
    return () => {
      stopActiveSounds(0.2);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  useEffect(() => {
    if (terminado && onGuardar) {
      onGuardar(ui.logCompleted(sonidoActivo !== "silencio" ? sonidoActivo : ""));
    }
  }, [terminado, sonidoActivo, onGuardar]);

  if (terminado) {
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={ui.title} onBack={onBack} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
          
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(138, 107, 184, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "ss-pulse-slow 3s infinite ease-in-out"
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8a6bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>

          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: INK, margin: "10px 0 0" }}>
            {ui.completedTitle(nombre)}
          </h3>
          
          <p style={{ fontSize: 13.5, color: MUTED, maxWidth: 260, lineHeight: 1.6, margin: 0 }}>
            {ui.completedDesc}
          </p>

          <div style={{
            background: "#f4f6f4",
            borderRadius: 16,
            padding: "12px 18px",
            fontSize: 12,
            color: SAGE_DARK,
            fontWeight: 600,
            border: `1px solid ${LINE}`,
            maxWidth: 240,
            marginTop: 8
          }}>
            {ui.anchorTip}
          </div>
        </div>

        <button className="ss-btn ss-btn-primary" style={{ width: "100%" }} onClick={() => { setPaso(0); playSound("silencio"); }}>
          {ui.btnRepeat}
        </button>
      </div>
    );
  }

  const pAct = pasos[paso];

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes ss-glowing-mandala {
          0% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 35px var(--glow-color); }
          50% { transform: scale(1.08); opacity: 1; box-shadow: 0 0 65px var(--glow-color); }
          100% { transform: scale(1); opacity: 0.85; box-shadow: 0 0 35px var(--glow-color); }
        }
        @keyframes ss-audio-wave {
          0%, 100% { height: 6px; }
          50% { height: 18px; }
        }
        .ss-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <TopBar title={ui.title} onBack={onBack} step={paso + 1} totalSteps={pasos.length} />

      {/* Main Interactive Sensory Display */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "12px 0 20px" }}>
        
        {/* Pulsing Sensory Mandala */}
        <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 10px" }}>
          <div 
            style={{
              "--glow-color": pAct.colorGlow,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: "white",
              border: `2px solid ${LINE}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.8s ease",
              animation: "ss-glowing-mandala 4s infinite ease-in-out"
            }}
          >
            {pAct.icon}
          </div>
        </div>

        {/* Dynamic Centered Text Block */}
        <div style={{ textAlign: "center", padding: "0 8px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ 
            fontSize: 12, 
            fontWeight: 700, 
            color: SAGE_DARK, 
            textTransform: "uppercase", 
            letterSpacing: 1.5,
            marginBottom: 6,
            display: "block"
          }}>
            {ui.phaseLabel} {paso + 1}
          </span>
          
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 21, color: INK, margin: "0 0 14px", fontWeight: 700 }}>
            {pAct.titulo}
          </h2>

          <p style={{ 
            fontFamily: FONT_BODY, 
            fontSize: 14.5, 
            color: INK, 
            lineHeight: 1.6, 
            margin: "0 auto 12px", 
            maxWidth: 290 
          }}>
            {pAct.texto}
          </p>

          <p style={{ 
            fontFamily: FONT_BODY, 
            fontSize: 12.5, 
            color: MUTED, 
            fontStyle: "italic", 
            margin: 0 
          }}>
            {pAct.sabor}
          </p>
        </div>

        {/* Ambient Sensory Tray */}
        <div style={{ 
          background: "rgba(247, 246, 249, 0.9)", 
          border: `1.5px solid ${LINE}`, 
          borderRadius: 20, 
          padding: "12px 14px 12px", 
          marginTop: 18,
          boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "0 2px" }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {ui.frequencyAccomp}
            </span>

            {/* Micro visualizer when sound plays */}
            {sonidoActivo !== "silencio" && (
              <div style={{ display: "flex", gap: 3, alignItems: "center", height: 16 }}>
                <div style={{ width: 2, background: SAGE_DARK, height: 8, borderRadius: 10, animation: "ss-audio-wave 1.2s infinite ease-in-out" }} />
                <div style={{ width: 2, background: "#8a6bb8", height: 14, borderRadius: 10, animation: "ss-audio-wave 0.8s infinite ease-in-out", animationDelay: "0.2s" }} />
                <div style={{ width: 2, background: SAGE_DARK, height: 10, borderRadius: 10, animation: "ss-audio-wave 1.1s infinite ease-in-out", animationDelay: "0.4s" }} />
              </div>
            )}
          </div>

          {/* Scroll horizontal de frecuencias */}
          <div style={{ 
            display: "flex", 
            gap: 8, 
            overflowX: "auto", 
            paddingBottom: 6,
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none"
          }} className="ss-hide-scrollbar">
            
            {/* Botón Silencio */}
            <button 
              onClick={() => playSound("silencio")}
              style={{
                flex: "0 0 auto",
                background: sonidoActivo === "silencio" ? "white" : "transparent",
                border: `1.5px solid ${sonidoActivo === "silencio" ? LINE : "transparent"}`,
                borderRadius: 14,
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: sonidoActivo === "silencio" ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
              }}
            >
              <span style={{ fontSize: 16 }}>🔇</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: sonidoActivo === "silencio" ? INK : MUTED }}>{ui.silence}</span>
            </button>

            {/* Botones de Frecuencias */}
            {FRECUENCIAS_SOLFEGGIO.map(f => (
              <button 
                key={f.hz}
                onClick={() => playSound(String(f.hz))}
                style={{
                  flex: "0 0 auto",
                  background: sonidoActivo === String(f.hz) ? "white" : "transparent",
                  border: `1.5px solid ${sonidoActivo === String(f.hz) ? f.color : "transparent"}`,
                  borderRadius: 14,
                  padding: "8px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: sonidoActivo === String(f.hz) ? "0 2px 8px rgba(0,0,0,0.04)" : "none",
                }}
              >
                <span style={{ fontSize: 16 }}>{f.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: sonidoActivo === String(f.hz) ? INK : MUTED }}>
                  {f.hz} Hz
                </span>
              </button>
            ))}
          </div>

          {/* Mapear intención seleccionada */}
          {sonidoActivo !== "silencio" && (() => {
            const selectedFreq = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(sonidoActivo));
            if (!selectedFreq) return null;
            return (
              <div style={{ 
                marginTop: 12, 
                padding: "10px 12px", 
                background: "rgba(255, 255, 255, 0.7)", 
                borderRadius: 12, 
                border: `1px solid ${selectedFreq.color}`, 
                fontSize: 12, 
                color: INK, 
                lineHeight: 1.45,
                animation: "ss-fade-up 0.2s ease-out"
              }}>
                <div style={{ fontWeight: 700, color: selectedFreq.text, display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span>🎯</span>
                  <span>{t(selectedFreq.intencion, idioma)}</span>
                </div>
                <div style={{ marginBottom: 6, fontSize: 11.5 }}>
                  <span style={{ fontWeight: 600, color: SAGE_DARK }}>{t("Emoción a trabajar:", idioma)}</span> {t(selectedFreq.emocion, idioma)}
                </div>
                <div style={{ fontSize: 11.5, color: MUTED }}>
                  {t(selectedFreq.descripcion, idioma)}
                </div>
              </div>
            );
          })()}
        </div>

      </div>

      <button className="ss-btn ss-btn-primary" style={{ width: "100%" }} onClick={() => setPaso((p) => p + 1)}>
        {paso < pasos.length - 1 ? ui.btnNext : ui.btnIntegrate}
      </button>
    </div>
  );
}

const CAT_ICONS_ESPECIALISTAS = {
  todos: Sparkles,
  emocion: Heart,
  constela: Users,
  coach: Compass,
  tarot: Moon,
  bio: Activity,
  astro: Star,
  ancestral: Leaf
};

function ScreenEspecialistas({ onBack, idioma }) {
  const [filtro, setFiltro] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEspecialista, setActiveEspecialista] = useState(null);
  useBloquearScrollFondo(Boolean(activeEspecialista));
  
  // Helpers localizados
  const especialistasList = getLocalizedEspecialistas(idioma);
  const cats = getLocalizedCategorias(idioma);
  const ui = getLocalizedEspecialistasUI(idioma);

  // Detalle de booking
  const [bookingStep, setBookingStep] = useState("form"); // "form" | "success"
  const [selectedMotivos, setSelectedMotivos] = useState([]);
  const [preferredHorario, setPreferredHorario] = useState("tarde");
  const [preferredModalidad, setPreferredModalidad] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [contactadoIds, setContactadoIds] = useState(() => {
    // Intentar leer de localStorage para persistir de manera amigable
    try {
      const saved = localStorage.getItem("suelta-y-sana:especialistas-contactados");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveContactado = (id) => {
    const updated = [...contactadoIds, id];
    setContactadoIds(updated);
    try {
      localStorage.setItem("suelta-y-sana:especialistas-contactados", JSON.stringify(updated));
    } catch (e) {
      // no-op
    }
  };

  const matchesCat = (esp, catId) => {
    if (catId === "todos") return true;
    const catMap = {
      emocion: [1],
      constela: [2],
      coach: [3],
      tarot: [4],
      bio: [5],
      astro: [6],
      ancestral: [7]
    };
    return catMap[catId] ? catMap[catId].includes(esp.id) : true;
  };

  const countForCat = (catId) => {
    if (catId === "todos") return especialistasList.length;
    return especialistasList.filter(e => matchesCat(e, catId)).length;
  };

  // Filtrado compuesto (categoría + búsqueda texto libre)
  const listaFiltrada = especialistasList.filter((e) => {
    const matchCat = matchesCat(e, filtro);
    let matchSearch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      matchSearch = 
        e.nombre.toLowerCase().includes(q) || 
        e.rol.toLowerCase().includes(q) || 
        e.enfoque.toLowerCase().includes(q) ||
        e.bio.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q));
    }

    return matchCat && matchSearch;
  });

  const handleOpenBooking = (esp) => {
    setActiveEspecialista(esp);
    setBookingStep("form");
    setSelectedMotivos([]);
    setCustomNotes("");
    if (esp.modalidad.toLowerCase().includes("línea") || esp.modalidad.toLowerCase().includes("online") || esp.modalidad.toLowerCase().includes("ligne")) {
      setPreferredModalidad("online");
    } else if (esp.modalidad.toLowerCase().includes("presencial") || esp.modalidad.toLowerCase().includes("person") || esp.modalidad.toLowerCase().includes("présentiel") || esp.modalidad.toLowerCase().includes("presenza")) {
      setPreferredModalidad("presencial");
    } else {
      setPreferredModalidad("online");
    }
  };

  const handleConfirmBooking = () => {
    if (!activeEspecialista) return;
    saveContactado(activeEspecialista.id);
    setBookingStep("success");
  };

  const toggleMotivo = (motivoId) => {
    if (selectedMotivos.includes(motivoId)) {
      setSelectedMotivos(selectedMotivos.filter(m => m !== motivoId));
    } else {
      setSelectedMotivos([...selectedMotivos, motivoId]);
    }
  };

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={ui.topBarTitle} onBack={onBack} />
      
      <div style={{ flex: 1, marginTop: 12, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
        
        {/* Banner de Bienvenida Reaseguradora */}
        <div style={{
          background: SAGE_TINT,
          border: `1px solid ${SAGE}30`,
          borderRadius: 20,
          padding: "16px 20px",
          display: "flex",
          gap: 14,
          alignItems: "flex-start"
        }}>
          <div style={{
            background: "white",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: SAGE_DARK,
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}>
            <Sparkles size={18} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 700, color: INK }}>
              {ui.bannerTitle}
            </span>
            <p style={{ color: MUTED, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              {ui.bannerDesc}
            </p>
          </div>
        </div>

        {/* Buscador de Especialistas - Elegante y Minimalista */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: 14,
          border: `1.5px solid ${LINE}`,
          padding: "10px 14px",
          gap: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.01)",
          transition: "all 0.2s ease"
        }}>
          <span style={{ color: MUTED, display: "flex", alignItems: "center" }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder={ui.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 13.5,
              fontFamily: FONT_BODY,
              color: INK,
              background: "transparent"
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                color: MUTED,
                cursor: "pointer",
                padding: 2,
                display: "flex",
                alignItems: "center"
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Selector de Especialidades Adaptativo, Sensorial y Fluido */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            padding: "0 4px" 
          }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.03em" }}>
              {ui.exploreDisciplines}
            </span>
            {filtro !== "todos" && (
              <button 
                onClick={() => setFiltro("todos")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: SAGE_DARK,
                  cursor: "pointer",
                  padding: 0
                }}
              >
                {ui.viewAll}
              </button>
            )}
          </div>

          <div style={{ 
            display: "flex", 
            gap: 10, 
            overflowX: "auto", 
            paddingBottom: "8px", 
            margin: "0 -22px",
            paddingLeft: "22px",
            paddingRight: "22px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }} className="ss-no-scrollbar">
            <style dangerouslySetInnerHTML={{__html: `
              .ss-no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}} />

            {cats.map((c) => {
              const isSelected = filtro === c.id;
              const count = countForCat(c.id);
              const IconComp = CAT_ICONS_ESPECIALISTAS[c.id] || Sparkles;
              
              return (
                <button
                  key={c.id}
                  onClick={() => setFiltro(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: 14,
                    border: `1.5px solid ${isSelected ? c.activeColor : LINE}`,
                    background: isSelected ? c.activeColor : "white",
                    color: isSelected ? "white" : INK,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: isSelected 
                      ? `0 6px 14px rgba(63, 107, 91, 0.15)` 
                      : "0 2px 6px rgba(0,0,0,0.015)",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0
                  }}
                >
                  {/* Micro círculo para el Icono */}
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: isSelected ? "rgba(255, 255, 255, 0.2)" : c.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isSelected ? "white" : c.activeColor,
                    transition: "all 0.25s ease"
                  }}>
                    <IconComp size={11} strokeWidth={2.5} />
                  </div>

                  {/* Nombre de la Categoría */}
                  <span style={{ 
                    fontSize: 12.5, 
                    fontWeight: isSelected ? 700 : 500,
                    transition: "all 0.25s ease"
                  }}>
                    {c.label}
                  </span>

                  {/* Micro-badge de Conteo */}
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 6,
                    background: isSelected ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.04)",
                    color: isSelected ? "white" : MUTED,
                    marginLeft: 2,
                    transition: "all 0.25s ease"
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resumen de Filtros Activos */}
        {(filtro !== "todos" || searchQuery.trim() !== "") && (
          <div className="ss-fade" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: -4, paddingLeft: 4 }}>
            <span style={{ fontSize: 11, color: MUTED, marginRight: 2 }}>{ui.filterBy}</span>
            
            {filtro !== "todos" && (
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: SAGE_DARK,
                background: SAGE_TINT,
                padding: "3px 8px 3px 10px",
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 5,
                border: `1px solid ${SAGE}30`
              }}>
                {cats.find(c => c.id === filtro)?.label || ""}
                <button 
                  onClick={() => setFiltro("todos")}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", color: SAGE }}
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </span>
            )}

            {searchQuery.trim() !== "" && (
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: SAGE_DARK,
                background: SAGE_TINT,
                padding: "3px 8px 3px 10px",
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                gap: 5,
                border: `1px solid ${SAGE}30`
              }}>
                "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery("")}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", color: SAGE }}
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </span>
            )}

            <button 
              onClick={() => {
                setFiltro("todos");
                setSearchQuery("");
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 11,
                color: MUTED,
                textDecoration: "underline",
                cursor: "pointer",
                padding: "2px 6px"
              }}
            >
              {ui.clearFilters}
            </button>
          </div>
        )}

        {/* Resultados de búsqueda */}
        {listaFiltrada.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: MUTED,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12
          }}>
            <Filter size={32} style={{ color: LINE }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: INK }}>{ui.noResultsTitle}</span>
            <p style={{ fontSize: 12.5, margin: 0, maxWidth: 280, lineHeight: 1.4 }}>
              {ui.noResultsDesc}
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            {listaFiltrada.map((e) => {
              const yaContactado = contactadoIds.includes(e.id);
              return (
                <div 
                  key={e.id} 
                  className="ss-card ss-fade" 
                  style={{ 
                    background: "white", 
                    border: yaContactado ? `1.5px solid ${SAGE}` : `1.5px solid ${LINE}`, 
                    borderRadius: 20, 
                    padding: 18,
                    boxShadow: yaContactado ? "0 4px 15px rgba(111,168,146,0.1)" : "0 3px 10px rgba(0,0,0,0.015)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    transition: "all 0.25s ease"
                  }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    {/* Monograma avatar premium */}
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: 52, height: 52, minWidth: 52, borderRadius: "50%",
                          background: e.color, color: "white", display: "flex", alignItems: "center",
                          justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 22,
                          fontWeight: 700, boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                          border: `2px solid white`, outline: `1px solid ${LINE}`
                        }}
                      >
                        {e.inicial}
                      </div>
                      <div style={{
                        position: "absolute",
                        bottom: -2,
                        right: -2,
                        background: SAGE,
                        borderRadius: "50%",
                        width: 18,
                        height: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        border: "1.5px solid white"
                      }}>
                        <Check size={10} strokeWidth={3} />
                      </div>
                    </div>
                    
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "space-between" }}>
                        <span style={{ fontSize: 16, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                          {e.nombre}
                        </span>
                        {yaContactado && (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: SAGE_DARK,
                            background: SAGE_TINT,
                            padding: "2px 8px",
                            borderRadius: 100,
                            border: `1px solid ${SAGE}40`
                          }}>
                            {ui.requestedBadge}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: 13, color: SAGE_DARK, fontWeight: 600 }}>
                        {e.rol} • <span style={{ color: MUTED, fontWeight: 400 }}>{e.exp}</span>
                      </span>
                    </div>
                  </div>

                  {/* Frase inspiradora */}
                  <div style={{
                    fontStyle: "italic",
                    fontSize: 12.5,
                    color: MUTED,
                    fontFamily: FONT_DISPLAY,
                    lineHeight: 1.5,
                    paddingLeft: 12,
                    borderLeft: `2.5px solid ${e.color}80`,
                    margin: "4px 0"
                  }}>
                    "{e.frase}"
                  </div>

                  {/* Badges de Enfoque y Modalidad */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      background: CREAM,
                      borderRadius: 8,
                      color: INK,
                      border: `1px solid ${LINE}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      <Award size={12} style={{ color: SAGE_DARK }} />
                      <strong>{ui.approachLabel}</strong> {e.enfoque}
                    </span>
                    <span style={{
                      fontSize: 11,
                      padding: "4px 10px",
                      background: CREAM,
                      borderRadius: 8,
                      color: INK,
                      border: `1px solid ${LINE}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      {e.modalidad.toLowerCase().includes("línea") || e.modalidad.toLowerCase().includes("online") || e.modalidad.toLowerCase().includes("ligne") ? (
                        <Video size={12} style={{ color: LAVENDER }} />
                      ) : (
                        <MapPin size={12} style={{ color: KINOEMOTION_UI }} />
                      )}
                      <strong>{ui.modalityLabel}</strong> {e.modalidad}
                    </span>
                  </div>

                  {/* Tags rápidos */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {e.tags.map((tTag, idx) => (
                      <span key={idx} style={{
                        fontSize: 10.5,
                        color: MUTED,
                        background: "#f4f3ed",
                        padding: "2px 8px",
                        borderRadius: 6
                      }}>
                        #{tTag}
                      </span>
                    ))}
                  </div>

                  {/* Botón de acción principal */}
                  <button
                    className="ss-btn"
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      fontSize: 13.5,
                      fontWeight: 600,
                      background: yaContactado ? "#f4f3ed" : SAGE_DARK,
                      borderColor: yaContactado ? LINE : SAGE_DARK,
                      color: yaContactado ? MUTED : "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: yaContactado ? "none" : "0 4px 12px rgba(63,107,91,0.15)"
                    }}
                    onClick={() => handleOpenBooking(e)}
                  >
                    {yaContactado ? (
                      <>
                        <Check size={14} /> {ui.btnBookAgain}
                      </>
                    ) : (
                      <>
                        <Calendar size={14} /> {ui.btnBook}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <p style={{ fontSize: 11, color: MUTED, textAlign: "center", marginTop: 8, lineHeight: 1.5, padding: "0 10px" }}>
          <ResaltarMarca>{ui.disclaimer}</ResaltarMarca>
        </p>
      </div>

      {/* MODAL / BOTTOM SHEET DE AGENDAMIENTO INTERACTIVO */}
      {activeEspecialista && typeof document !== "undefined" && createPortal(
        <div
          data-modal-backdrop="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(37, 51, 46, 0.5)",
            backdropFilter: "blur(3px)",
            zIndex: 999999,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overscrollBehavior: "contain",
            touchAction: "none"
          }}
          onClick={() => setActiveEspecialista(null)}
        >
          <div
            data-modal-scrollable="true"
            style={{
              background: CREAM,
              width: "100%",
              maxWidth: 500,
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              padding: "24px 22px 34px",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 -8px 30px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              border: `1px solid ${LINE}`,
              borderBottom: "none",
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Barra superior del Modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: SAGE_DARK,
                  background: SAGE_TINT,
                  padding: "4px 10px",
                  borderRadius: 100
                }}>
                  {ui.modalProfileTitle}
                </span>
              </div>
              <button 
                onClick={() => setActiveEspecialista(null)}
                style={{
                  background: "white",
                  border: `1.5px solid ${LINE}`,
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: INK,
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                <X size={16} />
              </button>
            </div>

            {bookingStep === "form" ? (
              <>
                {/* Cabecera del Especialista */}
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div
                    style={{
                      width: 58, height: 58, minWidth: 58, borderRadius: "50%",
                      background: activeEspecialista.color, color: "white", display: "flex", alignItems: "center",
                      justifyContent: "center", fontFamily: FONT_DISPLAY, fontSize: 24,
                      fontWeight: 700, boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                      border: "2px solid white"
                    }}
                  >
                    {activeEspecialista.inicial}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                      {activeEspecialista.nombre}
                    </span>
                    <span style={{ fontSize: 13.5, color: SAGE_DARK, fontWeight: 600 }}>
                      {activeEspecialista.rol} • {activeEspecialista.exp}
                    </span>
                  </div>
                </div>

                {/* Biografía Detallada */}
                <div style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 16,
                  border: `1px solid ${LINE}`
                }}>
                  <p style={{ margin: 0, fontSize: 13, color: INK, lineHeight: 1.55 }}>
                    {activeEspecialista.bio}
                  </p>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: MUTED }}>
                    <Clock size={14} style={{ color: SAGE }} />
                    <span>{ui.typicalAvailability} <strong>{activeEspecialista.disponibilidad}</strong></span>
                  </div>
                </div>

                {/* Formulario Interactivo */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                    {ui.motiveQuestion}
                  </span>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {ui.motives.map((motivo) => {
                      const selected = selectedMotivos.includes(motivo.id);
                      return (
                        <button
                          key={motivo.id}
                          onClick={() => toggleMotivo(motivo.id)}
                          style={{
                            fontSize: 12,
                            padding: "8px 14px",
                            borderRadius: 100,
                            border: `1.5px solid ${selected ? SAGE : LINE}`,
                            background: selected ? SAGE_TINT : "white",
                            color: selected ? SAGE_DARK : INK,
                            fontWeight: selected ? 600 : 500,
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {motivo.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modalidad de preferencia */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                    {ui.preferredModality}
                  </span>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button
                      onClick={() => setPreferredModalidad("online")}
                      disabled={activeEspecialista.modalidad.toLowerCase().includes("presencial") && !activeEspecialista.modalidad.toLowerCase().includes("línea") && !activeEspecialista.modalidad.toLowerCase().includes("online")}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1.5px solid ${preferredModalidad === "online" ? SAGE : LINE}`,
                        background: preferredModalidad === "online" ? SAGE_TINT : "white",
                        color: preferredModalidad === "online" ? SAGE_DARK : INK,
                        opacity: (activeEspecialista.modalidad.toLowerCase().includes("presencial") && !activeEspecialista.modalidad.toLowerCase().includes("línea") && !activeEspecialista.modalidad.toLowerCase().includes("online")) ? 0.4 : 1,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        alignItems: "center",
                        transition: "all 0.15s"
                      }}
                    >
                      <Video size={18} />
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{ui.modalityOnline}</span>
                    </button>

                    <button
                      onClick={() => setPreferredModalidad("presencial")}
                      disabled={activeEspecialista.modalidad.toLowerCase().includes("línea") && !activeEspecialista.modalidad.toLowerCase().includes("presencial") && !activeEspecialista.modalidad.toLowerCase().includes("présentiel") && !activeEspecialista.modalidad.toLowerCase().includes("presenza")}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: `1.5px solid ${preferredModalidad === "presencial" ? SAGE : LINE}`,
                        background: preferredModalidad === "presencial" ? SAGE_TINT : "white",
                        color: preferredModalidad === "presencial" ? SAGE_DARK : INK,
                        opacity: (activeEspecialista.modalidad.toLowerCase().includes("línea") && !activeEspecialista.modalidad.toLowerCase().includes("presencial") && !activeEspecialista.modalidad.toLowerCase().includes("présentiel") && !activeEspecialista.modalidad.toLowerCase().includes("presenza")) ? 0.4 : 1,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        alignItems: "center",
                        transition: "all 0.15s"
                      }}
                    >
                      <MapPin size={18} />
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{ui.modalityInPerson}</span>
                    </button>
                  </div>
                </div>

                {/* Horario preferido */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                    {ui.preferredSchedule}
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {ui.schedules.map((hor) => (
                      <button
                        key={hor.id}
                        onClick={() => setPreferredHorario(hor.id)}
                        style={{
                          padding: "10px 8px",
                          borderRadius: 10,
                          border: `1.5px solid ${preferredHorario === hor.id ? SAGE : LINE}`,
                          background: preferredHorario === hor.id ? SAGE_TINT : "white",
                          color: preferredHorario === hor.id ? SAGE_DARK : INK,
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          transition: "all 0.15s"
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{hor.label}</span>
                        <span style={{ fontSize: 9, color: MUTED }}>{hor.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mensaje opcional */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                    {ui.messageLabel(activeEspecialista.nombre.split(" ")[0])} ({ui.optional})
                  </span>
                  <textarea
                    rows={2}
                    placeholder={ui.messagePlaceholder}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    autoCorrect="on"
                    spellCheck={true}
                    autoCapitalize="sentences"
                    style={{
                      width: "100%",
                      borderRadius: 12,
                      border: `1.5px solid ${LINE}`,
                      padding: "10px 12px",
                      fontFamily: FONT_BODY,
                      fontSize: 13,
                      outline: "none",
                      resize: "none",
                      background: "white",
                      color: INK
                    }}
                  />
                </div>

                {/* Botón de Confirmar */}
                <button
                  className="ss-btn"
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    fontSize: 14,
                    fontWeight: 700,
                    background: SAGE_DARK,
                    borderColor: SAGE_DARK,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 6,
                    boxShadow: "0 4px 15px rgba(63,107,91,0.25)"
                  }}
                  onClick={handleConfirmBooking}
                >
                  <Send size={14} /> {ui.btnSubmit}
                </button>
              </>
            ) : (
              /* ESTADO DE ÉXITO PREMIUM */
              <div className="ss-fade" style={{
                textAlign: "center",
                padding: "10px 0 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16
              }}>
                <div style={{
                  background: SAGE_TINT,
                  borderRadius: "50%",
                  width: 72,
                  height: 72,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: SAGE,
                  boxShadow: "0 4px 15px rgba(111,168,146,0.15)",
                  border: "2px solid white",
                  outline: `1.5px solid ${SAGE}40`
                }}>
                  <Check size={36} strokeWidth={3} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 700, color: INK, fontFamily: FONT_DISPLAY }}>
                    {ui.successTitle}
                  </span>
                  <p style={{ fontSize: 13.5, color: MUTED, margin: 0, lineHeight: 1.5, maxWidth: 360 }}>
                    {ui.successMessage(activeEspecialista.nombre)}
                  </p>
                </div>

                {/* Tarjeta de Resumen */}
                <div style={{
                  background: "white",
                  border: `1px solid ${LINE}`,
                  borderRadius: 16,
                  padding: 16,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textAlign: "left"
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase" }}>
                    {ui.summaryTitle}
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                    <span style={{ color: MUTED }}>{ui.summarySpecialist}</span>
                    <strong style={{ color: INK }}>{activeEspecialista.nombre}</strong>
                  </div>

                  {selectedMotivos.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                      <span style={{ color: MUTED }}>{ui.summaryMotives}</span>
                      <strong style={{ color: INK, textAlign: "right", maxWidth: "60%" }}>
                        {selectedMotivos.map(mId => ui.motives.find(x => x.id === mId)?.label || mId).join(", ")}
                      </strong>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, borderBottom: `1px solid ${LINE}`, paddingBottom: 8 }}>
                    <span style={{ color: MUTED }}>{ui.summaryModality}</span>
                    <strong style={{ color: INK }}>
                      {preferredModalidad === "online" ? ui.modalityOnline : ui.modalityInPerson}
                    </strong>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                    <span style={{ color: MUTED }}>{ui.summarySchedule}</span>
                    <strong style={{ color: INK }}>
                      {ui.schedules.find(s => s.id === preferredHorario)?.label || preferredHorario}
                    </strong>
                  </div>
                </div>

                <div style={{
                  background: "rgba(111,168,146,0.1)",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 12,
                  color: SAGE_DARK,
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  gap: 8,
                  alignItems: "center"
                }}>
                  <Info size={16} style={{ flexShrink: 0 }} />
                  <span>{t("Te llegará un correo de coordinación a tu dirección registrada para fijar el día y la hora de tu sesión.", idioma)}</span>
                </div>

                <button
                  className="ss-btn"
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    fontSize: 14,
                    fontWeight: 700,
                    background: SAGE_DARK,
                    borderColor: SAGE_DARK,
                    color: "white",
                    marginTop: 10
                  }}
                  onClick={() => setActiveEspecialista(null)}
                >
                  {ui.btnClose}
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// Preguntas complementarias que aparecen tras el primer boceto, para refinar la lectura.
const PREGUNTAS_DIARIO = [
  {
    id: "cuando",
    pregunta: "¿Desde cuándo sientes esto?",
    opciones: ["Hoy / esta semana", "Desde hace semanas", "Desde hace meses", "Desde hace años"],
  },
  {
    id: "cuerpo",
    pregunta: "¿Lo notas también en el cuerpo?",
    opciones: ["Sí, con claridad", "A veces", "No lo había pensado", "No"],
  },
];

// Ruta vital: 3 preguntas clave que invitan al recuerdo y la emoción.
// Se ofrece como alternativa a la escritura libre, para quien quiere una guía.
const PREGUNTAS_VIDA = [
  {
    id: "infancia",
    etapa: "Infancia",
    pregunta: "¿Qué recuerdas de tu infancia? Un momento, un olor, una escena, una emoción que aún vive en ti.",
    ayuda: "No hay respuesta correcta. Lo que venga primero suele ser lo más honesto.",
  },
  {
    id: "adolescencia",
    etapa: "Adolescencia",
    pregunta: "¿Qué marcó tu adolescencia? Algo que aprendiste, algo que dolió, algo que aún cargas.",
    ayuda: "Piensa en un momento que hoy, mirándolo, todavía te mueve algo por dentro.",
  },
  {
    id: "adultez",
    etapa: "Adultez",
    pregunta: "¿Cómo llegaste a ser quien eres hoy? Qué has soltado, qué te falta soltar.",
    ayuda: "Puedes hablar del presente, de lo reciente, o de aquello que sigue pendiente contigo.",
  },
];

// Cuestionarios de autoconocimiento: no son evaluación de bienestar, son un espejo más.
// Cada pregunta suma a un "tipo"; al final se muestra el tipo con más respuestas.
const CUESTIONARIOS = [
  {
    id: "estres",
    titulo: "¿Cómo reaccionas ante el estrés?",
    desc: "Descubre cuál es tu respuesta automática cuando algo te desborda.",
    preguntas: [
      {
        texto: "Cuando surge un conflicto, tu primer impulso es...",
        opciones: [
          { texto: "Enfrentarlo de inmediato, aunque suba el tono", tipo: "lucha" },
          { texto: "Buscar la salida más rápida posible", tipo: "huida" },
          { texto: "Quedarte en blanco, sin saber qué hacer", tipo: "paralisis" },
          { texto: "Intentar calmar a todos, aunque tú te quedes callada", tipo: "complacencia" },
        ],
      },
      {
        texto: "Ante una crítica inesperada...",
        opciones: [
          { texto: "Respondes de inmediato, a veces con más fuerza de la necesaria", tipo: "lucha" },
          { texto: "Cambias de tema o te alejas de la conversación", tipo: "huida" },
          { texto: "No logras reaccionar en el momento", tipo: "paralisis" },
          { texto: "Le das la razón aunque no la tenga, para evitar el conflicto", tipo: "complacencia" },
        ],
      },
      {
        texto: "Cuando algo te sale mal en el trabajo o los estudios...",
        opciones: [
          { texto: "Te frustras y necesitas resolverlo ya", tipo: "lucha" },
          { texto: "Prefieres posponerlo o evitarlo un tiempo", tipo: "huida" },
          { texto: "Te bloqueas y te cuesta empezar de nuevo", tipo: "paralisis" },
          { texto: "Te disculpas de más, aunque no siempre sea tu culpa", tipo: "complacencia" },
        ],
      },
      {
        texto: "En una relación cercana, cuando algo te incomoda...",
        opciones: [
          { texto: "Lo dices directamente, aunque genere tensión", tipo: "lucha" },
          { texto: "Prefieres no hablarlo y guardar distancia", tipo: "huida" },
          { texto: "Te cuesta encontrar las palabras en el momento", tipo: "paralisis" },
          { texto: "Prefieres callarlo con tal de mantener la paz", tipo: "complacencia" },
        ],
      },
    ],
    resultados: {
      lucha: { titulo: "Modo lucha", texto: "Tu sistema nervioso responde al estrés activándose hacia afuera: confrontas, resuelves, avanzas. Es una respuesta valiosa cuando hay límites que defender, pero puede agotarte si se activa incluso donde no hay una amenaza real. Practicar una pausa antes de reaccionar puede ayudarte a elegir cuándo luchar y cuándo simplemente observar." },
      huida: { titulo: "Modo huida", texto: "Ante el estrés, tu instinto busca distancia: evitar, posponer, salir de la situación. Esto te protege de conflictos innecesarios, pero si se repite mucho puede dejarte con temas sin resolver que vuelven una y otra vez. Acercarte poco a poco a lo que evitas, con pasos pequeños, puede ser un buen punto de partida." },
      paralisis: { titulo: "Modo parálisis", texto: "Cuando el estrés te desborda, tu cuerpo elige quedarse quieto: la mente se pone en blanco y cuesta reaccionar. No es debilidad ni torpeza: es una respuesta de protección muy antigua. Darte permiso de tomarte un momento antes de responder, sin exigirte inmediatez, puede aliviar mucho esta reacción." },
      complacencia: { titulo: "Modo complacencia", texto: "Frente al estrés, tu prioridad es mantener la armonía, incluso a costa tuya. Esto habla de una gran capacidad de cuidar a otros, pero también de una dificultad para poner tus propias necesidades en el centro. Practicar decir lo que sí sientes, aunque incomode un poco, es un paso hacia el equilibrio." },
    },
  },
  {
    id: "apego",
    titulo: "¿Cuál es tu estilo de apego?",
    desc: "Explora cómo te vinculas emocionalmente con las personas importantes en tu vida.",
    preguntas: [
      {
        texto: "Cuando alguien importante se aleja o está distante...",
        opciones: [
          { texto: "Confías en que todo está bien y le das su espacio", tipo: "seguro" },
          { texto: "Te preocupas y necesitas confirmar que todo está bien", tipo: "ansioso" },
          { texto: "Prefieres también tomar distancia, sin darle mucha importancia", tipo: "evitativo" },
          { texto: "Sientes una mezcla confusa de necesitarlo y querer alejarte", tipo: "desorganizado" },
        ],
      },
      {
        texto: "En una relación cercana, la intimidad emocional te hace sentir...",
        opciones: [
          { texto: "Cómoda, es algo natural para ti", tipo: "seguro" },
          { texto: "La deseas mucho, a veces más de lo que la otra persona puede dar", tipo: "ansioso" },
          { texto: "Incómoda si se vuelve demasiado intensa", tipo: "evitativo" },
          { texto: "La deseas, pero también te da miedo", tipo: "desorganizado" },
        ],
      },
      {
        texto: "Cuando tienes un problema, sueles...",
        opciones: [
          { texto: "Pedir apoyo con confianza cuando lo necesitas", tipo: "seguro" },
          { texto: "Necesitar bastante reafirmación de que te quieren", tipo: "ansioso" },
          { texto: "Resolverlo tú sola, sin pedir mucha ayuda", tipo: "evitativo" },
          { texto: "Dudar entre pedir ayuda y aislarte", tipo: "desorganizado" },
        ],
      },
      {
        texto: "Tu mayor miedo en una relación cercana es...",
        opciones: [
          { texto: "No tener uno en particular; confías en el vínculo", tipo: "seguro" },
          { texto: "Que la otra persona deje de quererte o se aleje", tipo: "ansioso" },
          { texto: "Perder tu independencia o sentirte atrapada", tipo: "evitativo" },
          { texto: "Ser lastimada, aunque también temes quedarte sola", tipo: "desorganizado" },
        ],
      },
    ],
    resultados: {
      seguro: { titulo: "Apego seguro", texto: "Sueles confiar en tus vínculos y sentirte cómoda tanto dando como recibiendo cercanía. Esto no significa que no tengas heridas, sino que probablemente creciste en un entorno donde el afecto fue relativamente estable. Sigue cuidando esa base: es un recurso valioso para todas tus relaciones." },
      ansioso: { titulo: "Apego ansioso", texto: "Necesitas sentir cercanía y reafirmación constante en tus vínculos, y la distancia del otro puede activarte rápido. Esto suele tener raíz en momentos donde el afecto se sintió inconsistente. Aprender a calmarte a ti misma antes de buscar la tranquilidad afuera puede aliviar mucho esta ansiedad." },
      evitativo: { titulo: "Apego evitativo", texto: "Valoras mucho tu independencia y te cuesta depender emocionalmente de otros, incluso cuando los quieres. Esto suele desarrollarse cuando, de niña, pedir ayuda no siempre fue bien recibido. Permitirte necesitar a alguien, poco a poco, no te hace más débil ni menos autónoma." },
      desorganizado: { titulo: "Apego desorganizado", texto: "Sientes una mezcla de deseo y miedo hacia la cercanía: quieres el vínculo, pero también te protege alejarte de él. Suele originarse en vínculos tempranos que combinaron amor y miedo a la vez. Ir despacio, y con acompañamiento profesional si lo sientes necesario, puede ayudarte a construir vínculos más estables." },
    },
  },
  {
    id: "patron-emocional",
    titulo: "¿Qué patrón emocional repites más?",
    desc: "Identifica cuál de tus emociones aparece con más frecuencia cuando algo te desborda.",
    preguntas: [
      {
        texto: "Cuando algo no sale como esperabas, lo primero que sientes es...",
        opciones: [
          { texto: "Miedo a que las cosas empeoren", tipo: "miedo" },
          { texto: "Tristeza por lo que se perdió o no fue", tipo: "tristeza" },
          { texto: "Rabia por cómo se dieron las cosas", tipo: "rabia" },
        ],
      },
      {
        texto: "Frente a una injusticia, tu reacción interna suele ser...",
        opciones: [
          { texto: "Ansiedad por no saber cómo resolverlo", tipo: "miedo" },
          { texto: "Desánimo, como si no valiera la pena intentarlo", tipo: "tristeza" },
          { texto: "Indignación y ganas de reclamar", tipo: "rabia" },
        ],
      },
      {
        texto: "Cuando piensas en el futuro cercano, sientes más...",
        opciones: [
          { texto: "Incertidumbre y preocupación", tipo: "miedo" },
          { texto: "Nostalgia por etapas que ya pasaron", tipo: "tristeza" },
          { texto: "Impaciencia por que las cosas cambien ya", tipo: "rabia" },
        ],
      },
      {
        texto: "En los conflictos con otras personas, sueles quedarte pensando en...",
        opciones: [
          { texto: "Qué podría salir mal después de eso", tipo: "miedo" },
          { texto: "Lo que se rompió o se perdió en la relación", tipo: "tristeza" },
          { texto: "Lo injusto que fue lo que pasó", tipo: "rabia" },
        ],
      },
    ],
    resultados: {
      miedo: { titulo: "Miedo y alerta", texto: "Tu patrón más frecuente activa el sistema de alerta: anticipas lo que podría salir mal antes de que pase. Esto te ha ayudado a prevenir problemas, pero también puede mantenerte en tensión incluso cuando no hay una amenaza real presente. Nombrar el miedo específico, en vez de generalizarlo, suele bajarle intensidad." },
      tristeza: { titulo: "Tristeza y pérdida", texto: "Tu patrón más frecuente es la tristeza: notas con facilidad lo que se pierde, lo que cambia, lo que ya no es como antes. Esto habla de una gran sensibilidad y capacidad de conexión. Permitirte sentir esa tristeza sin apurarte a \u201cestar bien\u201d es, paradójicamente, el camino más corto para transformarla." },
      rabia: { titulo: "Rabia y conflicto interno", texto: "Tu patrón más frecuente es la rabia: reaccionas con fuerza ante lo que sientes injusto o fuera de tu control. Esta emoción suele señalar un límite que necesita ser puesto. Preguntarte qué límite específico está pidiendo ser defendido puede transformar esa rabia en una acción concreta." },
    },
  },
];

function ScreenCuestionarios({ onSelect, onBack, idioma = "es" }) {
  const cuestionarios = getLocalizedCuestionarios(idioma);
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={t("Cuestionarios de autoconocimiento", idioma)} onBack={onBack} idioma={idioma} />
      <div style={{ flex: 1, marginTop: 6, overflowY: "auto" }}>
        <p style={{ color: MUTED, fontSize: 13, margin: "0 0 18px", lineHeight: 1.5 }}>
          {t("Pequeños cuestionarios para conocerte mejor. No son un diagnóstico: son un espejo más para tu proceso.", idioma)}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cuestionarios.map((q) => (
            <button
              key={q.id}
              onClick={() => onSelect(q)}
              className="ss-card"
              style={{ textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 16, padding: "14px 16px", cursor: "pointer", fontFamily: FONT_BODY }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: INK, marginBottom: 3 }}>{q.titulo}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{q.desc}</div>
              <div style={{ fontSize: 10.5, color: LAVENDER, fontWeight: 700, marginTop: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>
                {q.preguntas.length} {t("preguntas", idioma)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenCuestionarioDetalle({ cuestionario: rawCuestionario, onBack, onSalir, onGuardar, idioma = "es" }) {
  const cuestionario = getLocalizedCuestionarioById(rawCuestionario?.id, idioma);
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [terminado, setTerminado] = useState(false);

  const elegir = (tipo) => {
    const nuevas = [...respuestas, tipo];
    setRespuestas(nuevas);
    if (paso < cuestionario.preguntas.length - 1) {
      setPaso((p) => p + 1);
    } else {
      setTerminado(true);
      if (onGuardar) {
        const conteo = {};
        nuevas.forEach((tKey) => {
          conteo[tKey] = (conteo[tKey] || 0) + 1;
        });
        let tipoGanador = nuevas[0];
        let max = 0;
        Object.entries(conteo).forEach(([tKey, c]) => {
          if (c > max) {
            max = c;
            tipoGanador = tKey;
          }
        });
        const resultado = cuestionario.resultados[tipoGanador];
        if (resultado) {
          const textoFinal = `${t("Resultado del cuestionario", idioma)} "${cuestionario.titulo}":\n\n**${resultado.titulo}**\n\n${resultado.texto}`;
          onGuardar(textoFinal);
        }
      }
    }
  };

  const reiniciar = () => {
    setPaso(0);
    setRespuestas([]);
    setTerminado(false);
  };

  if (terminado) {
    const conteo = {};
    respuestas.forEach((tKey) => {
      conteo[tKey] = (conteo[tKey] || 0) + 1;
    });
    let tipoGanador = respuestas[0];
    let max = 0;
    Object.entries(conteo).forEach(([tKey, c]) => {
      if (c > max) {
        max = c;
        tipoGanador = tKey;
      }
    });
    const resultado = cuestionario.resultados[tipoGanador];
    return (
      <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
        <TopBar title={cuestionario.titulo} onBack={onBack} idioma={idioma} />
        <div style={{ flex: 1, marginTop: 10, overflowY: "auto" }}>
          <div style={{ background: LAVENDER_TINT, borderRadius: 16, padding: 16, marginBottom: 14 }}>
            <p style={{ fontSize: 10.5, fontWeight: 700, color: LAVENDER, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 6px" }}>
              {t("Tu resultado", idioma)}
            </p>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: INK, margin: "0 0 10px" }}>{resultado.titulo}</p>
            <p style={{ fontSize: 13, color: "#5b4a78", margin: 0, lineHeight: 1.6 }}>{resultado.texto}</p>
          </div>
          <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>
            {t("Este resultado es un espejo para reflexionar, no una etiqueta fija ni un evaluación de bienestar. Puedes repetir el cuestionario cuando quieras.", idioma)}
          </p>
        </div>
        <button className="ss-btn ss-btn-ghost" style={{ width: "100%", marginBottom: 10 }} onClick={reiniciar}>
          {t("Repetir cuestionario", idioma)}
        </button>
        <button className="ss-btn ss-btn-primary" style={{ width: "100%" }} onClick={onSalir}>
          {t("Volver a cuestionarios", idioma)}
        </button>
      </div>
    );
  }

  const pregunta = cuestionario.preguntas[paso];
  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar title={cuestionario.titulo} onBack={onBack} step={paso + 1} totalSteps={cuestionario.preguntas.length} idioma={idioma} />
      <div style={{ flex: 1, marginTop: 10 }}>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: 18, color: INK, margin: "0 0 16px", lineHeight: 1.4 }}>
          {pregunta.texto}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pregunta.opciones.map((op, i) => (
            <button
              key={i}
              onClick={() => elegir(op.tipo)}
              className="ss-card"
              style={{ textAlign: "left", background: "white", border: `1px solid ${LINE}`, borderRadius: 14, padding: "13px 15px", cursor: "pointer", fontFamily: FONT_BODY, fontSize: 13.5, color: INK }}
            >
              {op.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== Diario de bienestar: modelo de datos y utilidades de calendario =====
// Cada entrada ahora es un objeto { id, titulo, texto, fecha }, no solo texto plano.
// Esto permite presentarlas como un calendario de eventos (con fecha visible y agrupadas
// por día), en vez de un simple listado de párrafos — un diseño deliberadamente distinto
// al de "Cuéntame tu historia" (que es una captura única para la lectura, no un
// registro que se acumula en el tiempo).
const MESES_ABREV = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function generarTituloAutomatico(texto) {
  const primeraLinea = (texto || "").split("\n")[0].trim();
  if (!primeraLinea) return "Entrada sin título";
  return primeraLinea.length > 42 ? primeraLinea.slice(0, 42).trim() + "\u2026" : primeraLinea;
}

// Construye una entrada completa a partir de un título (opcional) y el texto. Si no se
// da título, se deriva automáticamente de la primera línea del texto. Soporta datos
// estructurados para el formato Bullet Journal de bienestar.
function crearEntradaDiario(titulo, texto, fechaISO, extraData = {}) {
  const tituloFinal = (titulo || "").trim() || generarTituloAutomatico(texto);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    titulo: tituloFinal,
    texto,
    fecha: fechaISO || new Date().toISOString(),
    animo: extraData.animo || null,
    bullets: extraData.bullets || [],
    horasSueno: extraData.horasSueno !== undefined ? extraData.horasSueno : null,
    nivelEnergia: extraData.nivelEnergia !== undefined ? extraData.nivelEnergia : null,
  };
}

function formatearBadgeFecha(fechaISO) {
  const d = new Date(fechaISO);
  return { dia: d.getDate(), mes: MESES_ABREV[d.getMonth()] };
}

function formatearHora(fechaISO) {
  const d = new Date(fechaISO);
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "p.m." : "a.m.";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

// Etiqueta de grupo: "Hoy", "Ayer", o la fecha completa en español.
function etiquetaGrupoFecha(fechaISO) {
  const d = new Date(fechaISO);
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const mismoDia = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (mismoDia(d, hoy)) return "Hoy";
  if (mismoDia(d, ayer)) return "Ayer";
  return `${d.getDate()} de ${["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"][d.getMonth()]}`;
}

// Agrupa las entradas (ya ordenadas de más nueva a más vieja) por día calendario,
// preservando el orden, tal como se vería un calendario de eventos.
function agruparEntradasPorDia(entradas) {
  const grupos = [];
  let grupoActual = null;
  let claveActual = null;
  for (const e of entradas) {
    const d = new Date(e.fecha);
    const clave = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (clave !== claveActual) {
      grupoActual = { clave, etiqueta: etiquetaGrupoFecha(e.fecha), entradas: [] };
      grupos.push(grupoActual);
      claveActual = clave;
    }
    grupoActual.entradas.push(e);
  }
  return grupos;
}

// Información visual para los estados de ánimo en el Bullet Journal
const MOODS_INFO = {
  alegre: { label: "Alegre", emoji: "🌻", bg: "#FAF0D7", text: "#9B7508" },
  sereno: { label: "Sereno", emoji: "🌿", bg: "#D2E0DC", text: "#3B6E5F" },
  triste: { label: "Sensible", emoji: "🌧️", bg: "#D2DAFF", text: "#485E9E" },
  ansioso: { label: "Ansioso", emoji: "🌪️", bg: "#F4E0E0", text: "#A44C4C" },
  cansado: { label: "Cansado", emoji: "🔋", bg: "#E7E6F2", text: "#5B5482" },
  inspirado: { label: "Inspirado", emoji: "✨", bg: "#FFECD6", text: "#A05A18" }
};function EntradaCalendario({ entrada, idioma }) {
  const [expandido, setExpandido] = useState(false);
  const { dia, mes } = formatearBadgeFecha(entrada.fecha);
  const preview = entrada.texto && entrada.texto.length > 100 
    ? entrada.texto.slice(0, 100).trim() + "\u2026" 
    : (entrada.texto || "");

  const animoData = entrada.animo ? MOODS_INFO[entrada.animo] : null;

  return (
    <button
      onClick={() => setExpandido((v) => !v)}
      className="ss-card ss-bounce"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        width: "100%",
        textAlign: "left",
        background: "#fdfcf9",
        backgroundImage: "radial-gradient(#ebe6da 1.1px, transparent 1.1px)",
        backgroundSize: "14px 14px",
        border: `1.5px solid ${LINE}`,
        borderRadius: 18,
        padding: "16px 18px",
        cursor: "pointer",
        fontFamily: FONT_BODY,
        position: "relative",
        boxShadow: "0 6px 16px rgba(0,0,0,0.025), 1px 1px 0px #fff, 2px 2px 0px #f5f1e9, 3px 3px 0px #eadecc",
        transition: "all 0.25s ease",
        transform: expandido ? "scale(1.01)" : "scale(1)"
      }}
    >
      {/* Decorative notebook spine ribbon simulation inside each card */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
        background: animoData ? animoData.text : SAGE_DARK,
        borderRadius: "18px 0 0 18px",
        opacity: 0.75
      }} />

      <div
        style={{
          minWidth: 46,
          width: 46,
          borderRadius: 12,
          background: animoData ? animoData.bg : SAGE_TINT,
          border: `1px solid ${animoData ? animoData.text + "20" : "transparent"}`,
          textAlign: "center",
          padding: "8px 0",
          flexShrink: 0,
          marginTop: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
        }}
      >
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 700, color: animoData ? animoData.text : SAGE_DARK, lineHeight: 1 }}>{dia}</div>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: animoData ? animoData.text : SAGE_DARK, letterSpacing: 0.6, marginTop: 2, textTransform: "uppercase" }}>{mes}</div>
      </div>

      <div style={{ flex: 1, minWidth: 0, paddingLeft: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 14.5, fontWeight: 700, color: INK, margin: 0 }}>
            {entrada.titulo || t("Página sin título", idioma)}
          </p>
          <span style={{ fontSize: 10, color: MUTED, whiteSpace: "nowrap" }}>{formatearHora(entrada.fecha)}</span>
        </div>

        {/* Badges de bienestar */}
        {(entrada.animo || entrada.horasSueno || entrada.nivelEnergia) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0 6px" }}>
            {animoData && (
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                background: animoData.bg,
                color: animoData.text,
                padding: "3px 9px",
                borderRadius: 99,
                display: "inline-flex",
                alignItems: "center",
                gap: 4
              }}>
                <span>{animoData.emoji}</span> {t(animoData.label, idioma)}
              </span>
            )}
            {entrada.horasSueno !== null && entrada.horasSueno !== undefined && (
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                background: "#f2efe6",
                color: "#736b5c",
                padding: "3px 9px",
                borderRadius: 99,
                display: "inline-flex",
                alignItems: "center",
                gap: 4
              }}>
                🌙 {entrada.horasSueno}h {t("sueño", idioma)}
              </span>
            )}
            {entrada.nivelEnergia !== null && entrada.nivelEnergia !== undefined && (
              <span style={{
                fontSize: 10.5,
                fontWeight: 700,
                background: "#fef7ea",
                color: "#bf831b",
                padding: "3px 9px",
                borderRadius: 99,
                display: "inline-flex",
                alignItems: "center",
                gap: 3
              }}>
                ⚡ {"★".repeat(entrada.nivelEnergia)}
              </span>
            )}
          </div>
        )}

        {/* Rapid logging (Bullets de BuJo) */}
        {entrada.bullets && entrada.bullets.length > 0 && (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 5, 
            margin: "10px 0 8px",
            borderLeft: `2px dashed ${LINE}`,
            paddingLeft: 12,
          }}>
            {entrada.bullets.map((b, idx) => {
              const sym = b.tipo === "tarea" ? "☐" : b.tipo === "gratitud" ? "♥" : b.tipo === "idea" ? "💡" : "—";
              const isComp = b.tipo === "tarea" && b.completado;
              return (
                <div key={b.id || idx} style={{ 
                  display: "flex", 
                  gap: 8, 
                  alignItems: "center", 
                  fontSize: 12,
                  color: isComp ? "#999386" : INK,
                  textDecoration: isComp ? "line-through" : "none",
                  opacity: isComp ? 0.7 : 1,
                  lineHeight: 1.35
                }}>
                  <span style={{ 
                    fontWeight: 900, 
                    color: b.tipo === "gratitud" ? KINOEMOTION : b.tipo === "idea" ? "#df9f1a" : SAGE_DARK,
                    fontSize: b.tipo === "tarea" && isComp ? 15 : 12,
                    display: "inline-block",
                    width: 14,
                    textAlign: "center"
                  }}>
                    {isComp ? "☑" : sym}
                  </span>
                  <span>{b.texto}</span>
                </div>
              );
            })}
          </div>
        )}

        {entrada.texto && (
          <p style={{ 
            fontSize: 13, 
            color: INK, 
            margin: "8px 0 0", 
            lineHeight: "22px", 
            whiteSpace: "pre-wrap",
            fontStyle: "italic",
            fontFamily: FONT_BODY,
            borderTop: (entrada.bullets && entrada.bullets.length > 0) ? `1px dashed ${LINE}` : "none",
            paddingTop: (entrada.bullets && entrada.bullets.length > 0) ? 8 : 0,
            backgroundImage: expandido ? "linear-gradient(rgba(0,0,0,0) 21px, #f2eee3 21px)" : "none",
            backgroundSize: "100% 22px",
            backgroundAttachment: "local",
          }}>
            {expandido ? entrada.texto : preview}
          </p>
        )}

        {entrada.texto && entrada.texto.length > 100 && (
          <p style={{ fontSize: 11, color: SAGE_DARK, fontWeight: 700, margin: "8px 0 0", display: "flex", alignItems: "center", gap: 2 }}>
            {expandido ? t("Ver menos cuaderno ‹", idioma) : t("Abrir página completa ›", idioma)}
          </p>
        )}
      </div>
    </button>
  );
}

// El calendario de eventos completo
function CalendarioEntradas({ entradas, idioma }) {
  const grupos = agruparEntradasPorDia(entradas);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {grupos.map((g) => (
        <div key={g.clave} style={{ position: "relative" }}>
          {/* Elegant header divider like a book ribbon date indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
            paddingLeft: 4
          }}>
            <p style={{ 
              fontFamily: FONT_DISPLAY,
              fontSize: 12.5, 
              fontWeight: 700, 
              color: SAGE_DARK, 
              textTransform: "capitalize", 
              margin: 0 
            }}>
              {g.etiqueta}
            </p>
            <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${LINE}, transparent)` }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {g.entradas.map((e) => (
              <EntradaCalendario key={e.id} entrada={e} idioma={idioma} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const PROMPTS_INSPIRACION = [
  { etiqueta: "🌧️ Clima emocional", prompt: "Si mi estado de ánimo de hoy fuera un clima, sería... " },
  { etiqueta: "🌸 Cuerpo y calma", prompt: "Hoy noto que físicamente mi cuerpo siente... " },
  { etiqueta: "🕯️ Mi necesidad", prompt: "En este momento, lo que realmente necesito para sentirme en paz es... " },
  { etiqueta: "🌿 Autocompasión", prompt: "Hoy me abrazo y me doy gracias por... " }
];

function ScreenDiario({ entradas, onAdd, onHome, onRefinar, idioma }) {
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");
  const [fase, setFase] = useState("escribir"); // escribir | preguntas | guardado
  const [respuestas, setRespuestas] = useState({});
  const [diarioTab, setDiarioTab] = useState("escribir"); // escribir | historial
  const [filtroAnimo, setFiltroAnimo] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const dictado = useDictado((t) => setTexto(t));

  // Nuevos estados del Bullet Journal (BuJo) de Bienestar
  const [animo, setAnimo] = useState("sereno"); // alegre | sereno | triste | ansioso | cansado | inspirado
  const [horasSueno, setHorasSueno] = useState(7);
  const [nivelEnergia, setNivelEnergia] = useState(3);
  const [bullets, setBullets] = useState([]);
  const [nuevoBulletTexto, setNuevoBulletTexto] = useState("");
  const [nuevoBulletTipo, setNuevoBulletTipo] = useState("tarea"); // tarea | gratitud | idea | nota

  const agregarBullet = () => {
    if (!nuevoBulletTexto.trim()) return;
    const nuevo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tipo: nuevoBulletTipo,
      texto: nuevoBulletTexto.trim(),
      completado: false
    };
    setBullets([...bullets, nuevo]);
    setNuevoBulletTexto("");
  };

  const eliminarBullet = (id) => {
    setBullets(bullets.filter(b => b.id !== id));
  };

  const toggleBulletCompletado = (id) => {
    setBullets(bullets.map(b => b.id === id ? { ...b, completado: !b.completado } : b));
  };

  const guardar = () => {
    const extra = Object.entries(respuestas)
      .map(([k, v]) => {
        const p = PREGUNTAS_DIARIO.find((x) => x.id === k);
        return p ? `${p.pregunta} ${v}` : "";
      })
      .filter(Boolean)
      .join(" · ");
    
    // Unificar bullets al texto de manera elegante si no hay escritura libre, o guardarlos estructuradamente
    const entradaCompleta = extra ? `${texto.trim()}\n\n(${extra})` : texto.trim();
    
    onAdd(crearEntradaDiario(titulo, entradaCompleta, null, {
      animo,
      bullets,
      horasSueno,
      nivelEnergia
    }));

    if (onRefinar && Object.keys(respuestas).length) onRefinar(texto.trim(), respuestas);
    
    // Limpiar estados
    setTexto("");
    setTitulo("");
    setRespuestas({});
    setAnimo("sereno");
    setHorasSueno(7);
    setNivelEnergia(3);
    setBullets([]);
    setNuevoBulletTexto("");
    setFase("guardado");
    setTimeout(() => {
      setFase("escribir");
      setDiarioTab("historial"); // redirigir a ver las memorias guardadas
    }, 2600);
  };

  // Filtrar entradas para el historial
  const entradasFiltradas = entradas.filter((e) => {
    const coincideAnimo = !filtroAnimo || e.animo === filtroAnimo;
    const coincideTexto = !busqueda || 
      (e.titulo && e.titulo.toLowerCase().includes(busqueda.toLowerCase())) ||
      (e.texto && e.texto.toLowerCase().includes(busqueda.toLowerCase())) ||
      (e.bullets && e.bullets.some(b => b.texto.toLowerCase().includes(busqueda.toLowerCase())));
    return coincideAnimo && coincideTexto;
  });

  return (
    <div className="ss-fade" style={{ padding: "0 22px 26px", minHeight: "100%", display: "flex", flexDirection: "column", background: "#fcfaf7" }}>
      <TopBar title={t("Diario de bienestar", idioma)} />
      
      {/* TABS DE ENCUADERNACIÓN DE LIBRO (BOOK BINDER STYLE) */}
      {fase === "escribir" && (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 0, 
          margin: "6px 0 16px",
          background: "#ece7dd",
          padding: 3,
          borderRadius: 14,
          border: "1px solid #dfd8cb"
        }}>
          <button
            onClick={() => setDiarioTab("escribir")}
            style={{
              flex: 1,
              background: diarioTab === "escribir" ? "#fdfcf9" : "transparent",
              color: diarioTab === "escribir" ? SAGE_DARK : "#7b7365",
              border: "none",
              borderRadius: 11,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: FONT_DISPLAY,
              cursor: "pointer",
              boxShadow: diarioTab === "escribir" ? "0 4px 10px rgba(0,0,0,0.05)" : "none",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            <span>📔</span> {t("Nueva Página", idioma)}
          </button>
          <button
            onClick={() => setDiarioTab("historial")}
            style={{
              flex: 1,
              background: diarioTab === "historial" ? "#fdfcf9" : "transparent",
              color: diarioTab === "historial" ? SAGE_DARK : "#7b7365",
              border: "none",
              borderRadius: 11,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: FONT_DISPLAY,
              cursor: "pointer",
              boxShadow: diarioTab === "historial" ? "0 4px 10px rgba(0,0,0,0.05)" : "none",
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            <span>📖</span> {t("Mis Memorias", idioma)} ({entradas.length})
          </button>
        </div>
      )}

      <div className="ss-stagger ss-no-scrollbar" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        {fase === "escribir" && (
          <>
            {diarioTab === "escribir" ? (
              <>
                <p style={{ fontSize: 13, color: MUTED, margin: "0 0 6px", lineHeight: 1.5, textAlign: "center", fontStyle: "italic" }}>
                  {t("Abre tu corazón en esta página de tu diario íntimo.", idioma)}
                </p>

                {/* LIENZO DE CUADERNO REALISTA (DOT-GRID VINTAGE JOURNAL COVER) */}
                <div style={{
                  background: "#faf8f2",
                  backgroundImage: "radial-gradient(#ebe5da 1.3px, transparent 1.3px)",
                  backgroundSize: "16px 16px",
                  border: "1.5px solid #ded6c5",
                  borderRadius: 24,
                  padding: "26px 22px 24px 28px", // Mayor espacio a la izquierda para el lomo cosido
                  boxShadow: "0 14px 38px rgba(63,107,91,0.06), inset 0 2px 4px rgba(255,255,255,0.9), 1px 1px 0px #fff, 2px 2px 0px #ebd9bf, 3px 3px 0px #dfd0b5, 5px 5px 0px #ded6c5",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Spine thread line to mimic real hand-bound leather sewing */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 14,
                    background: "linear-gradient(to right, #8a7051 0%, #a48a6b 40%, rgba(0,0,0,0.08) 85%, rgba(0,0,0,0) 100%)",
                    borderRight: "1px dashed rgba(63,107,91,0.15)",
                    pointerEvents: "none"
                  }} />
                  
                  {/* Pequeños ojales de costura dorados en el lomo */}
                  {[30, 80, 130, 180, 230, 280, 330, 380, 430, 480].map((topOffset) => (
                    <div key={topOffset} style={{
                      position: "absolute",
                      left: 4,
                      top: topOffset,
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#e5c59e",
                      border: "1px solid #755b3d",
                      boxShadow: "inset 0 1px 1px rgba(0,0,0,0.4)",
                      pointerEvents: "none"
                    }} />
                  ))}

                  {/* Cinta marcadora de seda borgoña colgando elegantemente */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 24,
                    width: 13,
                    height: 55,
                    background: "linear-gradient(to bottom, #9e2a2b, #bd3a42 70%, #801d20 100%)",
                    boxShadow: "1px 2px 5px rgba(0,0,0,0.18)",
                    borderBottomLeftRadius: 3,
                    borderBottomRightRadius: 3,
                    zIndex: 10,
                    pointerEvents: "none"
                  }}>
                    {/* Detalle dorado de la cinta */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#d4af37" }} />
                  </div>

                  {/* Sección 1: Mood Stamp Selector */}
                  <div>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, fontWeight: 800, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px 4px", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>🌸</span> {t("1. Sello de Ánimo de Hoy", idioma)}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {Object.entries(MOODS_INFO).map(([key, info]) => {
                        const isSelected = animo === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setAnimo(key)}
                            style={{
                              background: isSelected ? "white" : "transparent",
                              border: isSelected ? `2.5px solid ${SAGE_DARK}` : `1px dashed rgba(63,107,91,0.35)`,
                              borderRadius: 14,
                              padding: "10px 6px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              cursor: "pointer",
                              transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              boxShadow: isSelected ? "0 4px 12px rgba(63,107,91,0.1)" : "none",
                              position: "relative",
                              transform: isSelected ? "scale(1.05)" : "scale(1)",
                            }}
                          >
                            <div style={{
                              width: 38,
                              height: 38,
                              borderRadius: "50%",
                              background: isSelected ? info.bg : "rgba(255,255,255,0.6)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 22,
                              marginBottom: 4,
                              transition: "all 0.2s ease"
                            }}>
                              {info.emoji}
                            </div>
                            <span style={{ 
                              fontFamily: FONT_DISPLAY, 
                              fontSize: 11, 
                              fontWeight: isSelected ? 700 : 500, 
                              color: isSelected ? SAGE_DARK : "#7b7365" 
                            }}>
                              {t(info.label, idioma)}
                            </span>
                            {isSelected && (
                              <span style={{
                                position: "absolute",
                                top: -5,
                                right: -5,
                                background: SAGE_DARK,
                                color: "white",
                                borderRadius: "50%",
                                width: 14,
                                height: 14,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 9,
                                fontWeight: 700
                              }}>
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sección 2: Métricas Rápidas */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: `1px dashed ${LINE}`, paddingTop: 16 }}>
                    {/* Horas de Sueño */}
                    <div style={{
                      background: "#fdfcf9",
                      border: "1px dashed rgba(63,107,91,0.22)",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: SAGE_DARK, letterSpacing: 0.5 }}>
                          {t("🌙 SUEÑO DE ANOCHE", idioma)}
                        </span>
                        <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: SAGE_DARK }}>
                          {horasSueno} {t("horas", idioma)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={horasSueno}
                        onChange={(e) => setHorasSueno(parseInt(e.target.value))}
                        style={{
                          width: "100%",
                          accentColor: SAGE_DARK,
                          cursor: "pointer",
                          height: 6,
                          borderRadius: 3,
                          background: "#e8e5db"
                        }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#8d8677" }}>
                        <span>{t("Ligero (1h)", idioma)}</span>
                        <span style={{ fontStyle: "italic", fontWeight: 700, color: SAGE_DARK }}>
                          {horasSueno <= 5 ? t("⚠️ Descanso corto", idioma) : horasSueno >= 9 ? t("😴 Sueño profundo", idioma) : t("✨ Descanso reparador", idioma)}
                        </span>
                        <span>{t("Suficiente (12h)", idioma)}</span>
                      </div>
                    </div>

                    {/* Nivel de Energía */}
                    <div style={{
                      background: "#fdfcf9",
                      border: "1px dashed rgba(63,107,91,0.22)",
                      borderRadius: "14px",
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: SAGE_DARK, letterSpacing: 0.5 }}>
                        {t("⚡ MI ENERGÍA CORPORAL", idioma)}
                      </span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                        {[1, 2, 3, 4, 5].map((val) => {
                          const active = nivelEnergia >= val;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setNivelEnergia(val)}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                color: active ? "#df9f1a" : "#d3cbbe",
                                transition: "all 0.2s ease"
                              }}
                            >
                              <Star size={24} fill={active ? "#df9f1a" : "none"} strokeWidth={active ? 1.5 : 1} />
                            </button>
                          );
                        })}
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: SAGE_DARK, marginLeft: "auto" }}>
                          {nivelEnergia === 1 ? t("Agotada", idioma) : nivelEnergia === 2 ? t("Baja", idioma) : nivelEnergia === 3 ? t("Equilibrada", idioma) : nivelEnergia === 4 ? t("Estupenda", idioma) : t("Plena ✨", idioma)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sección 3: Rapid Logging (BuJo) */}
                  <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 16 }}>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 800, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px 4px", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>📌</span> {t("📌 2. Viñetas de Bienestar (Bullets)", idioma)}
                    </p>
                    
                    {/* Lista de Bullets Agregados */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {bullets.length > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12, background: "rgba(255,255,255,0.45)", borderRadius: 14, padding: "10px 12px" }}>
                          {bullets.map((b) => {
                            const sym = b.tipo === "tarea" ? "☐" : b.tipo === "gratitud" ? "♥" : b.tipo === "idea" ? "💡" : "—";
                            const isComp = b.tipo === "tarea" && b.completado;
                            return (
                              <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                                <button
                                  type="button"
                                  onClick={() => toggleBulletCompletado(b.id)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: b.tipo === "tarea" ? "pointer" : "default",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 8,
                                    textAlign: "left",
                                    flex: 1,
                                    fontSize: 12.5,
                                    color: isComp ? "#a09b8f" : INK,
                                    textDecoration: isComp ? "line-through" : "none",
                                    opacity: isComp ? 0.65 : 1,
                                    fontFamily: FONT_BODY
                                  }}
                                >
                                  <span style={{ 
                                    fontWeight: 900, 
                                    color: b.tipo === "gratitud" ? "#d6472b" : b.tipo === "idea" ? "#df9f1a" : SAGE_DARK,
                                    fontSize: 14,
                                    display: "inline-block",
                                    width: 16,
                                    textAlign: "center"
                                  }}>
                                    {isComp ? "☑" : sym}
                                  </span>
                                  <span style={{ lineHeight: 1.35 }}>{b.texto}</span>
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => eliminarBullet(b.id)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#d6472b",
                                    cursor: "pointer",
                                    padding: "2px 4px",
                                    display: "flex",
                                    alignItems: "center",
                                    opacity: 0.6,
                                    transition: "opacity 0.2s"
                                  }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p style={{ fontSize: 11.5, color: "#8d8677", fontStyle: "italic", margin: "0 0 10px 4px" }}>
                          {t("Presiona las opciones de abajo para registrar gratitud, tareas o ideas...", idioma)}
                        </p>
                      )}
                    </div>

                    {/* Formulario para agregar Bullet */}
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column",
                      gap: 8, 
                      background: "#faf8f2", 
                      padding: 8, 
                      borderRadius: 14, 
                      border: `1.5px solid ${LINE}` 
                    }}>
                      <div style={{ display: "flex", gap: 3, width: "100%" }}>
                        {[
                          { val: "tarea", label: "Tarea", icon: "☐" },
                          { val: "gratitud", label: "Gratitud", icon: "♥" },
                          { val: "idea", label: "Idea", icon: "💡" },
                          { val: "nota", label: "Nota", icon: "—" }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setNuevoBulletTipo(opt.val)}
                            style={{
                              flex: 1,
                              background: nuevoBulletTipo === opt.val ? "white" : "transparent",
                              border: nuevoBulletTipo === opt.val ? `1px solid ${LINE}` : "none",
                              borderRadius: 8,
                              padding: "4px 2px",
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: nuevoBulletTipo === opt.val ? SAGE_DARK : "#8d8677",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 2,
                              boxShadow: nuevoBulletTipo === opt.val ? "0 2px 4px rgba(0,0,0,0.03)" : "none"
                            }}
                          >
                            <span style={{ 
                              color: opt.val === "gratitud" && nuevoBulletTipo === opt.val ? "#d6472b" : 
                                     opt.val === "idea" && nuevoBulletTipo === opt.val ? "#df9f1a" : SAGE_DARK 
                            }}>
                              {opt.icon}
                            </span>
                            {t(opt.label, idioma)}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <input
                          type="text"
                          placeholder={
                            nuevoBulletTipo === "tarea" ? t("ej. Meditación matinal de 10 min...", idioma) :
                            nuevoBulletTipo === "gratitud" ? t("ej. Por la llamada sanadora de mi hermana...", idioma) :
                            nuevoBulletTipo === "idea" ? t("ej. Escribir una carta a mi pasado...", idioma) :
                            t("ej. Hoy sentí una punzada de alivio en el pecho...", idioma)
                          }
                          value={nuevoBulletTexto}
                          onChange={(e) => setNuevoBulletTexto(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); agregarBullet(); } }}
                          style={{
                            flex: 1,
                            border: "none",
                            borderBottom: `1.5px solid ${LINE}`,
                            background: "transparent",
                            fontSize: 12.5,
                            padding: "6px 2px",
                            color: INK,
                            fontFamily: FONT_BODY,
                            outline: "none"
                          }}
                        />
                        
                        <button
                          type="button"
                          onClick={agregarBullet}
                          style={{
                            background: SAGE_DARK,
                            border: "none",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(63,107,91,0.15)"
                          }}
                        >
                          <Plus size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sección 4: Reflexión Libre (Escritura en papel rayado) */}
                  <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 16 }}>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 800, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px 4px", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>✍️</span> {t("✍️ 3. Reflexión Libre (Opcional)", idioma)}
                    </p>

                    {/* Prompts de inspiración rápida */}
                    <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6, marginBottom: 10 }} className="ss-no-scrollbar">
                      {PROMPTS_INSPIRACION.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTexto(t(item.prompt, idioma))}
                          style={{
                            background: "white",
                            border: `1.5px solid ${LINE}`,
                            borderRadius: 99,
                            padding: "5px 12px",
                            fontSize: 11,
                            fontWeight: 600,
                            color: SAGE_DARK,
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            fontFamily: FONT_BODY,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                            transition: "all 0.15s ease"
                          }}
                          className="ss-chip-hover"
                        >
                          {t(item.etiqueta, idioma)}
                        </button>
                      ))}
                    </div>

                    <input
                      className="ss-input"
                      style={{ 
                        background: "white", 
                        fontSize: 13, 
                        fontFamily: FONT_DISPLAY, 
                        fontWeight: 600,
                        border: `1px solid ${LINE}`,
                        borderRadius: 10,
                        padding: "10px 12px",
                        marginBottom: 10
                      }}
                      placeholder={t("Título opcional para esta página...", idioma)}
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      maxLength={60}
                    />

                    <VoiceRecordingBanner
                      activo={dictado.escuchando}
                      onDetener={dictado.detener}
                      idioma={idioma}
                    />

                    <div style={{ position: "relative", display: "flex", flexDirection: "column", minHeight: "180px" }}>
                      <textarea
                        className="ss-input"
                        style={{
                          padding: "14px 14px 45px 14px",
                          flex: 1,
                          resize: "none",
                          fontSize: 13,
                          lineHeight: "26px",
                          border: `1.5px solid ${dictado.escuchando ? "#ef4444" : LINE}`,
                          borderRadius: 14,
                          fontFamily: FONT_BODY,
                          outline: "none",
                          color: INK,
                          // Beautiful lined notebook paper style!
                          backgroundImage: "linear-gradient(rgba(0,0,0,0) 25px, #f2eee3 25px)",
                          backgroundSize: "100% 26px",
                          backgroundAttachment: "local",
                          backgroundPosition: "0 10px",
                          backgroundColor: dictado.escuchando ? "#fff8f8" : "white",
                        }}
                        placeholder={t("¿Qué hay en tu corazón hoy? Tómate tu tiempo, descárgate libremente sin juicios...", idioma)}
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        autoCorrect="on"
                        spellCheck={true}
                        autoCapitalize="sentences"
                      />
                      <MicButton
                        escuchando={dictado.escuchando}
                        soportado={dictado.soportado}
                        onClick={() => dictado.toggle(texto)}
                      />
                    </div>
                    {dictado.error === "permiso" && (
                      <div 
                        onClick={() => dispararGuiaPermisos("microfono")}
                        style={{ 
                          fontSize: 11.5, 
                          color: "#b91c1c", 
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          borderRadius: 8,
                          padding: "6px 10px",
                          margin: "8px 0 0", 
                          lineHeight: 1.4,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 6
                        }}
                      >
                        <span>{t("Permiso de micrófono denegado. Toca aquí para ver cómo activarlo en Ajustes.", idioma)}</span>
                        <span style={{ fontWeight: 700, textDecoration: "underline", flexShrink: 0 }}>{t("Ajustes", idioma)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOTÓN CONTINUAR */}
                <button
                  className="ss-btn ss-btn-primary ss-bounce"
                  style={{
                    alignSelf: "center",
                    width: "100%",
                    opacity: (texto.trim() || bullets.length > 0) ? 1 : 0.5,
                    padding: "13px 24px",
                    marginTop: 10,
                    borderRadius: 14,
                    fontSize: 14.5,
                    fontWeight: 700,
                    background: SAGE_DARK,
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(63,107,91,0.2)"
                  }}
                  disabled={!texto.trim() && bullets.length === 0}
                  onClick={() => setFase("preguntas")}
                >
                  {t("Continuar a preguntas reflexivas", idioma)}
                </button>
              </>
            ) : (
              /* HISTORIAL / MIS MEMORIAS (VINTAGE ARCHIVE VIEW) */
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ fontSize: 13, color: MUTED, margin: "0 0 2px", lineHeight: 1.5, textAlign: "center", fontStyle: "italic" }}>
                  {t("Tus páginas BuJo y memorias anteriores guardadas.", idioma)}
                </p>

                {/* Panel de filtros */}
                <div style={{
                  background: "#fdfcf9",
                  border: "1px solid #dfd8cb",
                  borderRadius: 18,
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.015)"
                }}>
                  {/* Búsqueda */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder={t("Buscar palabras o memorias...", idioma)}
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px 10px 36px",
                        fontSize: 12.5,
                        borderRadius: 11,
                        border: `1px solid ${LINE}`,
                        background: "white",
                        outline: "none",
                        color: INK,
                        fontFamily: FONT_BODY
                      }}
                    />
                    <Search size={15} style={{ position: "absolute", left: 12, color: SAGE_DARK }} />
                    {busqueda && (
                      <button
                        type="button"
                        onClick={() => setBusqueda("")}
                        style={{ position: "absolute", right: 12, background: "none", border: "none", color: "#8d8677", cursor: "pointer" }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Filtro por Ánimo */}
                  <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }} className="ss-no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setFiltroAnimo(null)}
                      style={{
                        background: !filtroAnimo ? SAGE_DARK : "white",
                        border: `1px solid ${!filtroAnimo ? SAGE_DARK : LINE}`,
                        color: !filtroAnimo ? "white" : SAGE_DARK,
                        borderRadius: 99,
                        padding: "5px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontFamily: FONT_BODY
                      }}
                    >
                      {t("Todos 📖", idioma)}
                    </button>
                    {Object.entries(MOODS_INFO).map(([key, info]) => {
                      const isSelected = filtroAnimo === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFiltroAnimo(isSelected ? null : key)}
                          style={{
                            background: isSelected ? info.text : "white",
                            border: `1px solid ${isSelected ? info.text : LINE}`,
                            color: isSelected ? "white" : INK,
                            borderRadius: 99,
                            padding: "5px 12px",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            fontFamily: FONT_BODY,
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                          }}
                        >
                          <span>{info.emoji}</span>
                          <span>{t(info.label, idioma)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lista filtrada */}
                {entradasFiltradas.length > 0 ? (
                  <CalendarioEntradas entradas={entradasFiltradas} idioma={idioma} />
                ) : (
                  <div style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    background: "white",
                    border: `1px dashed ${LINE}`,
                    borderRadius: 18,
                    color: MUTED
                  }}>
                    <p style={{ fontSize: 13, margin: 0 }}>{t("No encontramos páginas guardadas con esos filtros.", idioma)}</p>
                    <button
                      type="button"
                      onClick={() => { setFiltroAnimo(null); setBusqueda(""); }}
                      style={{ background: "none", border: "none", color: SAGE_DARK, textDecoration: "underline", fontSize: 12, marginTop: 8, cursor: "pointer", fontWeight: 700 }}
                    >
                      {t("Limpiar filtros", idioma)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {fase === "preguntas" && (
          <>
            <div style={{ background: SAGE_TINT, borderRadius: 14, padding: 13 }}>
              <p style={{ fontSize: 12.5, color: SAGE_DARK, margin: 0, lineHeight: 1.5 }}>
                {t("Gracias por escribirlo. Para afinar tu lectura, respóndenos dos cosas más. Son opcionales, pero ayudan a que la orientación sea más precisa.", idioma)}
              </p>
            </div>
            {PREGUNTAS_DIARIO.map((p) => (
              <div key={p.id}>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: INK, margin: "4px 0 8px" }}>{t(p.pregunta, idioma)}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {p.opciones.map((op) => {
                    const activa = respuestas[p.id] === op;
                    return (
                      <button
                        key={op}
                        className="ss-chip"
                        onClick={() => setRespuestas((r) => ({ ...r, [p.id]: op }))}
                        style={{
                          fontSize: 12.5,
                          background: activa ? SAGE_DARK : "white",
                          borderColor: activa ? SAGE_DARK : LINE,
                          color: activa ? "white" : INK,
                        }}
                      >
                        {t(op, idioma)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button className="ss-btn ss-btn-ghost" style={{ flex: 1 }} onClick={guardar}>
                {t("Omitir", idioma)}
              </button>
              <button className="ss-btn ss-btn-primary" style={{ flex: 1.4 }} onClick={guardar}>
                {t("Guardar y afinar", idioma)}
              </button>
            </div>
          </>
        )}

        {fase === "guardado" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, textAlign: "center" }}>
            <span style={{ fontSize: 32, color: SAGE_DARK }}>✓</span>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 19, color: INK, margin: 0 }}>{t("Guardado en tu diario BuJo", idioma)}</p>
            <p style={{ fontSize: 13, color: MUTED, maxWidth: 250, lineHeight: 1.5 }}>
              {t("Tus respuestas y viñetas se han integrado. Mientras más registres, más precisa se vuelve tu propia historia.", idioma)}
            </p>
          </div>
        )}
      </div>
      
      {fase === "escribir" && (
        <button className="ss-btn ss-btn-ghost ss-bounce" style={{ width: "100%", marginTop: 12 }} onClick={onHome}>
          {t("Volver al inicio", idioma)}
        </button>
      )}
    </div>
  );
}

// ============================================================
// ===== BLOQUE USUARIO DE PRUEBA — INICIO =====
// Todo lo que hay entre estos dos marcadores es autocontenido.
// Para eliminar el usuario de prueba de la app:
//   1) Borra esta constante TEST_USER completa.
//   2) Borra las dos funciones cargarUsuarioPrueba/borrarUsuarioPrueba
//      dentro del componente principal (buscar el mismo marcador ahí).
//   3) Borra las props onCargarPrueba / onBorrarPrueba que se pasan
//      a ScreenIdioma y ScreenInicio (los botones desaparecen solos
//      porque están envueltos en "{onCargarPrueba && (...)}").
// Nada de esto toca el estado real ni la lógica de negocio de la app.
// ============================================================
const TEST_USER = {
  nombre: "Camila",
  sexo: "F",
  nacimiento: { fecha: "1994-08-15", hora: "07:30", lugar: "Medellín, Colombia", apodo: "Cami", residencia: "Bogotá, Colombia", horaAprox: false },
  seleccion: ["historia", "fisica", "emocion"],
  datos: {
    historia:
      "Desde que perdí mi trabajo hace un año siento que no puedo digerir lo que pasó con mi jefe. Todavía me cuesta dormir por las noches pensando en esa conversación.",
    fisica: "dolor de estómago",
    emocion: ["Ansiedad"],
  },
  familia: [
    { id: "tp1", nombre: "Marta", parentescoId: "madre", parentescoLabel: "Madre", gen: 1, lado: "materno", estado: "vivo", vinculos: ["cercano", "protector"], excluido: false, noConocido: false, fallecioAntesDeNacer: false },
    { id: "tp2", nombre: "Roberto", parentescoId: "padre", parentescoLabel: "Padre", gen: 1, lado: "paterno", estado: "fallecido", vinculos: ["roto"], excluido: false, noConocido: false, fallecioAntesDeNacer: false },
    { id: "tp3", nombre: "Lucía", parentescoId: "hermano", parentescoLabel: "Hermano/a", gen: 0, lado: "propia", estado: "vivo", vinculos: ["cercano", "conflictivo"], excluido: false, noConocido: false, fallecioAntesDeNacer: false },
    { id: "tp4", nombre: "Efraín", parentescoId: "tio_p", parentescoLabel: "Tío/a paterno", gen: 1, lado: "paterno", estado: "fallecido", vinculos: ["distante"], excluido: true, noConocido: false, fallecioAntesDeNacer: false },
    { id: "tp5", nombre: "Hermanito", parentescoId: "hermano", parentescoLabel: "Hermano/a", gen: 0, lado: "propia", estado: "no_nacido", vinculos: [], excluido: false, noConocido: false, fallecioAntesDeNacer: false },
    { id: "tp6", nombre: "Abuelo Jacinto", parentescoId: "abuelo_p", parentescoLabel: "Abuelo paterno", gen: 2, lado: "paterno", estado: "fallecido", vinculos: ["distante"], excluido: false, noConocido: true, fallecioAntesDeNacer: true },
  ],
  entradas: [
    crearEntradaDiario("Un mejor día", "Hoy me sentí un poco más tranquila después de escribir sobre lo que pasó con mi papá.", new Date().toISOString(), {
      animo: "sereno",
      nivelEnergia: 4,
      horasSueno: 7,
      bullets: [
        { id: "b1", tipo: "gratitud", texto: "El café caliente de la mañana con sol", completado: false },
        { id: "b2", tipo: "tarea", texto: "Hacer 10 minutos de respiración consciente", completado: true },
        { id: "b3", tipo: "idea", texto: "Escribir sobre mi niñez sana", completado: false }
      ]
    }),
    crearEntradaDiario("Gratitud de hoy", "Gratitud de hoy: el café de la mañana · una llamada con mi hermana · terminar el reporte a tiempo", new Date().toISOString(), {
      animo: "alegre",
      nivelEnergia: 5,
      horasSueno: 8,
      bullets: [
        { id: "b4", tipo: "gratitud", texto: "Llamada sorpresa con mi hermana menor", completado: false },
        { id: "b5", tipo: "tarea", texto: "Terminar reporte trimestral", completado: true }
      ]
    }),
    crearEntradaDiario("Noche difícil", "No pude dormir bien pensando en la reunión de mañana. Siento el estómago apretado desde ayer.", new Date(Date.now() - 86400000).toISOString(), {
      animo: "ansioso",
      nivelEnergia: 2,
      horasSueno: 4,
      bullets: [
        { id: "b6", tipo: "nota", texto: "Tensión acumulada en la mandíbula y estómago", completado: false },
        { id: "b7", tipo: "tarea", texto: "Hablar con mi jefe sobre la carga de trabajo", completado: false }
      ]
    }),
    crearEntradaDiario("Mi historia en tres etapas", "Infancia: Crecí en una casa donde rara vez se hablaba de emociones.\n\nAdolescencia: Aprendí a resolver todo sola porque nadie más parecía notar cuando algo andaba mal.\n\nAdultez: Sigo aprendiendo a pedir ayuda sin sentir que es una carga para los demás.", new Date(Date.now() - 3 * 86400000).toISOString(), {
      animo: "inspirado",
      nivelEnergia: 3,
      horasSueno: 6,
      bullets: [
        { id: "b8", tipo: "nota", texto: "Tomando conciencia sobre mi patrón de autosuficiencia extrema", completado: false }
      ]
    }),
  ],
  retoDiaActual: 5,
  retoCompletados: [1, 2, 3, 4],
  retoHistorial: {
    1: "La frase era: 'nunca hago nada bien'. Al leerla en voz alta sonó exagerada.",
    2: "Siento más tensión justo antes de dormir, cuando todo se queda en silencio.",
    3: "Tenía como nueve años. Fue cuando mi papá se fue de casa.",
    4: "Respirar antes de reaccionar me costó, pero funcionó dos de las tres veces.",
  },
};
// ===== BLOQUE USUARIO DE PRUEBA — FIN =====

// ===== ONBOARDING TUTORIAL INTERACTIVO — INICIO =====
const TUTORIAL_STEPS = [
  {
    step: 1,
    title: "✨ ¡Te damos la bienvenida a ¡Suelta! ✨",
    desc: "Este es tu santuario digital de autodescubrimiento y liberación emocional. Integraremos la biodescodificación, la epigenética y las constelaciones para sanar el origen emocional de tus tensiones. Pulsa 'Comenzar Tour' para iniciar.",
    icon: "🌸",
    element: "inicio",
    requiredTask: null
  },
  {
    step: 2,
    title: "🔍 Paso 1: Tu Exploración Integral",
    desc: "En la pantalla de Inicio, emprenderás un recorrido guiado en 3 pasos: tu historia, tu afectación física y tus emociones.",
    icon: "🧬",
    element: "inicio",
    requiredTask: "Toca 'Comenzar mi lectura' abajo para iniciar tu experiencia."
  },
  {
    step: 3,
    title: "🚀 Paso 2: Conexión y Bienestar",
    desc: "Toca el botón 'Comenzar mi lectura' para avanzar por tus vivencias y recibir una lectura bioemocional profunda.",
    icon: "🎯",
    element: "inicio",
    requiredTask: "Presiona el botón 'Comenzar mi lectura' abajo."
  },
  {
    step: 4,
    title: "📅 Paso 3: Reto de 21 Días",
    desc: "Tu mente requiere 21 días para reprogramar viejos patrones. En la pestaña 'Mi Reto' tienes acceso a audios diarios, afirmaciones y progreso áureo.",
    icon: "🔥",
    element: "reto",
    requiredTask: "Toca la pestaña 'Mi Reto' en la barra inferior."
  },
  {
    step: 5,
    title: "✍️ Paso 4: Escribe tu Reflexión Diaria",
    desc: "Cada día del Reto incluye un espacio de escritura terapéutica. Intenta escribir cómo te sientes hoy en la casilla de texto.",
    icon: "🖋️",
    element: "reto",
    requiredTask: "Escribe al menos 3 letras en la casilla '¿Cómo te sientes con esta revelación?'."
  },
  {
    step: 6,
    title: "🌿 Paso 5: Registra y Completa el Día",
    desc: "Una vez escrita tu reflexión, toca 'Completar práctica de hoy' 👇 para encender tu racha de conexión, acumular progreso y actualizar tu calendario.",
    icon: "✅",
    element: "reto",
    requiredTask: "Presiona el botón 'Completar práctica de hoy' para registrar tu avance."
  },
  {
    step: 7,
    title: "🧘 Paso 6: Recursos de Calma Inmediata",
    desc: "Si sufres de ansiedad o síntomas físicos de repente, el módulo 'Calma' ofrece alivio instantáneo libre y sin límites. Toca 'Calma' abajo.",
    icon: "🧘",
    element: "herramientas",
    requiredTask: "Toca la pestaña 'Calma' en la barra inferior."
  },
  {
    step: 8,
    title: "🌬️ Paso 7: Elige Respiración Guiada",
    desc: "Regula tu sistema nervioso autónomo de inmediato. Toca la tarjeta de 'Respiración guiada' parpadeante 👈.",
    icon: "🌬️",
    element: "herramientas",
    requiredTask: "Toca la opción 'Respiración guiada' con el borde brillante."
  },
  {
    step: 9,
    title: "🎶 Paso 8: Pulso Vibracional Solfeggio",
    desc: "Sintoniza frecuencias sanadoras de fondo. El círculo áureo se expandirá y contraerá para guiar tus inhalaciones. Toca 'Comenzar'.",
    icon: "🔊",
    element: "respiracion",
    requiredTask: "Presiona el botón dorado 'Comenzar' dentro del círculo de respiración."
  },
  {
    step: 10,
    title: "📖 Paso 9: Biblioteca de Perspectivas",
    desc: "Tu cuerpo habla lo que tu mente calla. El Diccionario Biológico te permite comprender la raíz de tus síntomas. Toca 'Perspectivas' abajo.",
    icon: "📖",
    element: "hub",
    requiredTask: "Toca la pestaña 'Perspectivas' en la barra inferior."
  },
  {
    step: 11,
    title: "🌳 Paso 10: Árbol Genealógico Interactivo",
    desc: "Grafica tu propio clan familiar en el Árbol Genealógico para identificar lealtades invisibles y secretos heredados.",
    icon: "🌳",
    element: "hub",
    requiredTask: "Toca la opción dorada parpadeante 'Constelación familiar'."
  },
  {
    step: 12,
    title: "👥 Paso 11: Acompañamiento de Especialistas",
    desc: "Si requieres contención personalizada, te contactamos de forma directa con terapeutas y psicólogos acreditados. Toca 'Expertos' abajo.",
    icon: "🤍",
    element: "especialistas",
    requiredTask: "Toca la pestaña 'Expertos' en la barra inferior."
  },
  {
    step: 13,
    title: "🌸 ¡Onboarding Listo para Ti! 🌸",
    desc: "¡Felicidades! Has completado la guía de aprendizaje interactiva de ¡Suelta!. Estás listo para reprogramar tu biología y sanar con amor.",
    icon: "✨",
    element: "inicio",
    requiredTask: null
  }
];

function OnboardingOverlay({ step, onNext, onPrev, onSkip, minimizado, setMinimizado, idioma = "es" }) {
  const currentStep = TUTORIAL_STEPS.find(s => s.step === step);
  if (!currentStep) return null;

  const tieneTarea = currentStep.requiredTask !== null;

  if (minimizado) {
    return (
      <div 
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9990,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "12px 12px",
          pointerEvents: "none",
          fontFamily: FONT_BODY,
        }}
      >
        <div 
          style={{
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(8px)",
            borderRadius: 16,
            padding: "10px 14px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            border: "1.5px solid #eaeaea",
            pointerEvents: "auto",
            animation: "ss-fade-scale 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{currentStep.icon}</span>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: SAGE_DARK, textTransform: "uppercase", letterSpacing: 0.5 }}>
                {t("Paso", idioma)} {step}/{TUTORIAL_STEPS.length}
              </span>
              <span style={{ fontSize: 12, color: INK, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {tieneTarea ? `🎯 ${t("Tarea:", idioma)} ${t(currentStep.requiredTask, idioma)}` : t(currentStep.title, idioma)}
              </span>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button 
              onClick={() => setMinimizado(false)}
              style={{
                background: SAGE_TINT,
                border: "none",
                color: SAGE_DARK,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: 12,
                fontFamily: FONT_BODY,
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
            >
              {t("Ver guía", idioma)} ▲
            </button>
            <button 
              onClick={onSkip}
              style={{
                background: "rgba(223, 161, 95, 0.12)",
                border: "none",
                color: "#dfa15f",
                fontSize: 14,
                fontWeight: "bold",
                cursor: "pointer",
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease"
              }}
              title={t("Saltar guía", idioma)}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "16px 16px calc(env(safe-area-inset-bottom, 0px) + 24px)",
        pointerEvents: "none",
        fontFamily: FONT_BODY,
      }}
    >
      <div 
        style={{
          background: "white",
          borderRadius: 24,
          padding: "24px 20px 20px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          border: "1.5px solid #eaeaea",
          pointerEvents: "auto",
          animation: "ss-fade-scale 0.4s cubic-bezier(0.16, 1, 0.3, 1) both"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: SAGE_DARK, background: SAGE_TINT, padding: "2px 6px", borderRadius: 6, marginRight: 4 }}>
              {step} / {TUTORIAL_STEPS.length}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {TUTORIAL_STEPS.map((s) => (
                <div 
                  key={s.step} 
                  style={{
                    width: s.step === step ? 12 : 4,
                    height: 4,
                    borderRadius: 2,
                    background: s.step === step ? SAGE_DARK : "rgba(111,168,146,0.2)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                />
              ))}
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 8 }}>
            <button 
              onClick={() => setMinimizado(true)}
              style={{
                background: SAGE_TINT,
                border: "none",
                color: SAGE_DARK,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: 20,
                fontFamily: FONT_BODY,
                transition: "all 0.2s ease"
              }}
            >
              {t("Minimizar", idioma)} ▼
            </button>
            <button 
              onClick={onSkip}
              style={{
                background: "rgba(223, 161, 95, 0.12)",
                border: "none",
                color: "#dfa15f",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: 20,
                fontFamily: FONT_BODY,
                transition: "all 0.2s ease"
              }}
            >
              {t("Saltar guía", idioma)} ✕
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 4 }}>
          <div 
            className="ss-onda-3"
            style={{
              fontSize: 34,
              width: 56,
              height: 56,
              minWidth: 56,
              background: SAGE_TINT,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentStep.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16.5, color: INK, margin: "0 0 6px" }}>
              {t(currentStep.title, idioma)}
            </h3>
            <p style={{ fontSize: 13, color: "#4f5b55", lineHeight: 1.55, margin: 0 }}>
              {t(currentStep.desc, idioma)}
            </p>
          </div>
        </div>

        {tieneTarea && (
          <div 
            style={{
              background: "#fffbf5",
              border: "1px dashed #dfa15f",
              borderRadius: 16,
              padding: "12px 14px",
              fontSize: 12.5,
              color: "#8c5b2b",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 2px 8px rgba(223,161,95,0.08)"
            }}
          >
            <div style={{
              background: "#dfa15f",
              color: "white",
              width: 24,
              height: 24,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: "bold",
              flexShrink: 0
            }}>
              🎯
            </div>
            <div style={{ flex: 1, lineHeight: 1.4 }}>
              <strong style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2, color: "#dfa15f" }}>{t("Tarea requerida", idioma)}</strong>
              {t(currentStep.requiredTask, idioma)}
              <span style={{ display: "block", fontSize: 10.5, color: "#9c7247", marginTop: 4, fontStyle: "italic" }}>
                💡 {t("Puedes ocultar esta ventana tocando \"Minimizar\" arriba para interactuar libremente con la pantalla.", idioma)}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8 }}>
          <button
            onClick={onPrev}
            disabled={step === 1}
            style={{
              background: "transparent",
              border: "1.5px solid #eaeaea",
              color: step === 1 ? "#ccc" : INK,
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 999,
              padding: "10px 16px",
              cursor: step === 1 ? "default" : "pointer",
              flex: 1,
              transition: "all 0.2s ease"
            }}
          >
            {t("Anterior", idioma)}
          </button>

          <button
            onClick={onNext}
            style={{
              background: SAGE_DARK,
              border: "none",
              color: "white",
              fontFamily: FONT_BODY,
              fontWeight: 600,
              fontSize: 13.5,
              borderRadius: 999,
              padding: "11px 22px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(74,124,104,0.2)",
              flex: 2,
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            {step === TUTORIAL_STEPS.length ? t("Entendido, comenzar ✨", idioma) : (tieneTarea ? `${t("Omitir y Continuar", idioma)} ➔` : t("Siguiente", idioma))}
          </button>
        </div>
      </div>
    </div>
  );
}
// ===== ONBOARDING TUTORIAL INTERACTIVO — FIN =====

// ===== MODAL DE SELECCIÓN DE IDIOMA PREDETERMINADO PARA USUARIOS NUEVOS =====
function ModalSeleccionIdiomaInicial({
  isOpen,
  idiomaSeleccionado,
  onCambiarIdiomaTemporal,
  onConfirmar
}) {
  useBloquearScrollFondo(isOpen);
  if (!isOpen) return null;

  const idiomasDisponibles = [
    { id: "es", label: "Español", flag: "🇪🇸", desc: "Español como idioma principal" },
    { id: "en", label: "English", flag: "🇺🇸", desc: "English as default language" },
    { id: "fr", label: "Français", flag: "🇫🇷", desc: "Français comme langue par défaut" },
    { id: "it", label: "Italiano", flag: "🇮🇹", desc: "Italiano come lingua predefinita" }
  ];

  const modalNode = (
    <div
      data-modal-backdrop="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(18, 30, 26, 0.65)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overscrollBehavior: "contain",
        touchAction: "none",
        animation: "ssFade 0.25s ease-out"
      }}
    >
      <div
        data-modal-scrollable="true"
        style={{
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "28px 22px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 20px 45px rgba(0,0,0,0.22)",
          border: `1.5px solid ${SAGE_TINT}`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxHeight: "92vh",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: SAGE_TINT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px",
              fontSize: 26,
              boxShadow: "0 4px 12px rgba(111,168,146,0.15)"
            }}
          >
            🌐
          </div>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 21,
              fontWeight: 700,
              color: INK,
              margin: "0 0 6px"
            }}
          >
            {t("Selecciona tu idioma predeterminado", idiomaSeleccionado)}
          </h2>
          <p
            style={{
              fontSize: 13,
              color: MUTED,
              margin: 0,
              lineHeight: 1.5,
              fontFamily: FONT_BODY
            }}
          >
            {t("Configura el idioma principal para tu experiencia y lecturas emocionales en ¡Suelta!.", idiomaSeleccionado)}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {idiomasDisponibles.map((lang) => {
            const isSelected = idiomaSeleccionado === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => onCambiarIdiomaTemporal(lang.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 15px",
                  borderRadius: 14,
                  border: isSelected ? `2px solid ${SAGE}` : `1.5px solid ${LINE}`,
                  background: isSelected ? SAGE_TINT : "#FAFCFB",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s ease",
                  boxShadow: isSelected ? "0 4px 12px rgba(111,168,146,0.16)" : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{lang.flag}</span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: isSelected ? SAGE_DARK : INK }}>
                      {lang.label}
                    </div>
                    <div style={{ fontSize: 11, color: isSelected ? SAGE_DARK : MUTED, marginTop: 1 }}>
                      {lang.desc}
                    </div>
                  </div>
                </div>
                {isSelected ? (
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: SAGE_DARK,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    ✓
                  </div>
                ) : (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: `1.5px solid ${LINE}`
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 4, display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="ss-btn ss-btn-primary"
            onClick={() => onConfirmar(idiomaSeleccionado)}
            style={{
              width: "100%",
              padding: "13px",
              fontSize: 14.5,
              fontWeight: 700,
              borderRadius: 14
            }}
          >
            {t("Confirmar y Continuar", idiomaSeleccionado)} ➔
          </button>
          <p
            style={{
              fontSize: 11,
              color: MUTED,
              textAlign: "center",
              margin: 0,
              lineHeight: 1.4
            }}
          >
            💡 {t("Puedes cambiar tu idioma en cualquier momento desde los ajustes de tu cuenta.", idiomaSeleccionado)}
          </p>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modalNode, document.body);
  }

  return modalNode;
}
// ===== MODAL DE SELECCIÓN DE IDIOMA PREDETERMINADO — FIN =====

export default function SueltaPrototipo() {
  const [deviceMode, setDeviceMode] = useState(() => {
    try { return window.localStorage.getItem("suelta-y-sana:device-mode") || "desktop"; } catch { return "desktop"; }
  });
  const cambiarDeviceMode = (m) => {
    setDeviceMode(m);
    try { window.localStorage.setItem("suelta-y-sana:device-mode", m); } catch {}
  };
  const [protoTheme, setProtoTheme] = useState("proto-2");
  const cambiarProtoTheme = (t) => {
    // Forzado a proto-2 para mantener el diseño oficial "Renacer Aurora"
    setProtoTheme("proto-2");
  };

  // Se carga una sola vez al montar; sirve para restaurar la sesión guardada del usuario.
  const [estadoGuardado] = useState(ssCargarEstadoGuardado);
  const [currentUser, setCurrentUser] = useState(null);
  // Solo se restaura a una de estas pantallas "seguras" (pantallas principales que no
  // dependen de un paso intermedio en curso, como el pago o el registro).
  const ETAPAS_RESTAURABLES = ["inicio", "hub", "reto", "diario", "perfil", "herramientas", "cuestionarios", "diagnostico", "hubDetalle", "herramientaDetalle", "cuestionarioDetalle", "recordatoriosWidget", "suscripcion", "nacimiento"];

  const [stage, setStage] = useState(() => {
    try {
      const hash = window.location.hash;
      if (hash === "#landing") return "landing";
      if (hash === "#reto") return "reto";
      if (hash === "#calma") return "herramientas";
      if (hash === "#diario") return "diario";
      if (hash === "#suscripcion") return "suscripcion";
    } catch (e) {}
    if (estadoGuardado.stage && ETAPAS_RESTAURABLES.includes(estadoGuardado.stage)) return estadoGuardado.stage;
    return isNativeApp ? "bienvenida" : "landing";
  });
  const [nombre, setNombre] = useState(estadoGuardado.nombre || "");
  const [sexo, setSexo] = useState(estadoGuardado.sexo || "");
  const [seleccion, setSeleccion] = useState(estadoGuardado.seleccion || []);
  const [datos, setDatos] = useState(estadoGuardado.datos || { historia: "", fisica: "", emocion: [] });
  const [resultados, setResultados] = useState(estadoGuardado.resultados || []);
  const [hubItem, setHubItem] = useState(estadoGuardado.hubItem || null);
  const [herramientaItem, setHerramientaItem] = useState(estadoGuardado.herramientaItem || null);
  const [entradas, setEntradas] = useState(estadoGuardado.entradas || []);
  const [nacimiento, setNacimiento] = useState(estadoGuardado.nacimiento || { fecha: "", hora: "" });
  const [familia, setFamilia] = useState(estadoGuardado.familia || []);
  const [retoDiaActual, setRetoDiaActual] = useState(estadoGuardado.retoDiaActual || 1);
  const [retoCompletados, setRetoCompletados] = useState(estadoGuardado.retoCompletados || []);
  const [retoHistorial, setRetoHistorial] = useState(estadoGuardado.retoHistorial || {});
  const [retoCompletadosFechas, setRetoCompletadosFechas] = useState(estadoGuardado.retoCompletadosFechas || {});
  const DIAS_PRUEBA_TOTAL = 3;
  const MS_POR_DIA = 24 * 60 * 60 * 1000;
  const DURACION_PRUEBA_MS = DIAS_PRUEBA_TOTAL * MS_POR_DIA;
  const ADMIN_MASTER_EMAIL = "sebastianmillan2002@gmail.com";

  const [fechaRegistroUser, setFechaRegistroUser] = useState(() => {
    try {
      const localSecure = window.localStorage.getItem("suelta_fecha_registro_segura");
      if (localSecure && !isNaN(Number(localSecure))) return Number(localSecure);
    } catch (_) {}
    if (estadoGuardado.fechaRegistro && !isNaN(Number(estadoGuardado.fechaRegistro))) {
      return Number(estadoGuardado.fechaRegistro);
    }
    const ahora = Date.now();
    try {
      window.localStorage.setItem("suelta_fecha_registro_segura", String(ahora));
    } catch (_) {}
    return ahora;
  });
  const [esVipUser, setEsVipUser] = useState(() => {
    return !!(estadoGuardado.esVip || estadoGuardado.accesoTotal);
  });

  const [esPremium, setEsPremium] = useState(() => {
    if (estadoGuardado.esVip === true || estadoGuardado.accesoTotal === true) return true;
    if (estadoGuardado.subscription?.isActive === true || estadoGuardado.subscription?.status === "ACTIVE") return true;
    if (estadoGuardado.esPremium === true) return true;
    if (estadoGuardado.planPago === "anual" || estadoGuardado.planPago === "mensual") return true;
    if (estadoGuardado.datosPagoBasico?.orderId || estadoGuardado.datosPagoBasico?.purchaseToken) return true;
    try {
      if (window.localStorage.getItem("suelta_es_premium") === "true") return true;
      const lp = window.localStorage.getItem("suelta_plan_pago");
      if (lp === "anual" || lp === "mensual") return true;
      if (window.localStorage.getItem("suelta_google_play_purchase")) return true;
    } catch (_) {}
    // Durante los 3 días de prueba el acceso a los módulos está habilitado
    return true;
  });

  const [planPago, setPlanPago] = useState(() => {
    if (estadoGuardado.esVip || estadoGuardado.accesoTotal) return "anual";
    if (estadoGuardado.subscription?.isActive === true && estadoGuardado.subscription?.plan) {
      return estadoGuardado.subscription.plan;
    }
    if (estadoGuardado.planPago && estadoGuardado.planPago !== "prueba") return estadoGuardado.planPago;
    if (estadoGuardado.datosPagoBasico?.planId) return estadoGuardado.datosPagoBasico.planId;
    try {
      const localP = window.localStorage.getItem("suelta_plan_pago");
      if (localP && localP !== "prueba") return localP;
      const localD = window.localStorage.getItem("suelta_google_play_purchase");
      if (localD) {
        const parsed = JSON.parse(localD);
        if (parsed.planId) return parsed.planId;
      }
    } catch (_) {}
    return "prueba"; // "prueba" | "mensual" | "anual"
  });

  // Lógica de cálculo en tiempo real de prueba de 3 días y acceso VIP
  // El correo de administrador (ADMIN_MASTER_EMAIL) tiene acceso a #admin, pero su usuario de prueba
  // respeta el estado real de la base de datos para permitir pruebas limpias de registro, prueba y pago.
  const tieneAccesoTotal = esVipUser;
  const tienePagoConfirmado = planPago === "anual" || planPago === "mensual" || !!(estadoGuardado.datosPagoBasico?.orderId || estadoGuardado.subscription?.isActive);
  const tieneSuscripcionActiva = !!(tieneAccesoTotal || tienePagoConfirmado);

  const tiempoTranscurridoPrueba = fechaRegistroUser ? Math.max(0, Date.now() - Number(fechaRegistroUser)) : 0;
  const enPruebaActiva = !!(fechaRegistroUser && tiempoTranscurridoPrueba < DURACION_PRUEBA_MS && !tieneSuscripcionActiva);
  const pruebaExpirada = !!(fechaRegistroUser && tiempoTranscurridoPrueba >= DURACION_PRUEBA_MS && !tieneSuscripcionActiva);

  // Cálculo exacto del progreso del período de prueba (Día 1, Día 2, Día 3 o Cumplido):
  // Si tiempoTranscurridoPrueba < 24h -> Día 1 de 3 (0 días cumplidos, quedan 2 días)
  // Si 24h <= tiempoTranscurridoPrueba < 48h -> Día 2 de 3 (1 día cumplido, queda 1 día)
  // Si 48h <= tiempoTranscurridoPrueba < 72h -> Día 3 de 3 (2 días cumplidos, ¡último día!)
  // Si >= 72h -> pruebaExpirada = true (3 días cumplidos)
  const diasCumplidosPrueba = Math.floor(tiempoTranscurridoPrueba / MS_POR_DIA);
  const diaPruebaActual = pruebaExpirada ? 3 : Math.min(3, diasCumplidosPrueba + 1);
  const diasRestantesPrueba = pruebaExpirada 
    ? 0 
    : Math.max(1, Math.ceil((DURACION_PRUEBA_MS - tiempoTranscurridoPrueba) / MS_POR_DIA));

  // Control del modal constante de período de prueba de 3 días
  const [mostrarModalPrueba, setMostrarModalPrueba] = useState(false);

  const [compraExitosaModal, setCompraExitosaModal] = useState(null);

  // Helper para verificar VIP por base de datos
  const verificarSiEsVip = async (userEmail) => {
    if (!userEmail) return false;
    const cleanEmail = userEmail.toLowerCase().trim();
    try {
      const vipSnap = await getDoc(doc(db, "vip_emails", cleanEmail));
      if (vipSnap.exists() && vipSnap.data()?.vip !== false) {
        return true;
      }
    } catch (e) {
      console.warn("No se pudo verificar vip_emails:", e);
    }
    return false;
  };

  // Sincronizar automáticamente esPremium cuando cambian condiciones de prueba o VIP
  useEffect(() => {
    if (tieneSuscripcionActiva || enPruebaActiva) {
      if (!esPremium) setEsPremium(true);
    } else if (pruebaExpirada) {
      if (esPremium) setEsPremium(false);
    }
  }, [tieneSuscripcionActiva, enPruebaActiva, pruebaExpirada, esPremium]);

  const [datosPagoBasico, setDatosPagoBasico] = useState(estadoGuardado.datosPagoBasico || null);
  const [cuestionarioActual, setCuestionarioActual] = useState(null);
  const [legalTipo, setLegalTipo] = useState(null); // "terminos" | "privacidad"
  const [legalOrigen, setLegalOrigen] = useState("registro"); // a dónde volver: "registro" | "editarPerfil"
  const [nacimientoOrigen, setNacimientoOrigen] = useState("pago"); // a dónde volver: "pago" (flujo normal) | "perfil" (edición posterior)
  const [installPrompt, setInstallPrompt] = useState(null);
  const [configRecordatorios, setConfigRecordatorios] = useState(() => {
    try {
      const g = window.localStorage.getItem("suelta_recordatorios_config");
      if (g) return JSON.parse(g);
    } catch (e) {}
    return estadoGuardado.configRecordatorios || CONFIG_RECORDATORIOS_INICIAL;
  });

  const [fotoPerfil, setFotoPerfil] = useState(() => {
    try {
      return window.localStorage.getItem("suelta_foto_perfil") || estadoGuardado.fotoPerfil || null;
    } catch (e) {
      return null;
    }
  });

  const handleGuardarFotoPerfil = async (nuevaFoto) => {
    setFotoPerfil(nuevaFoto);
    try {
      if (nuevaFoto) {
        window.localStorage.setItem("suelta_foto_perfil", nuevaFoto);
      } else {
        window.localStorage.removeItem("suelta_foto_perfil");
      }
    } catch (e) {}
    if (currentUser) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        await setDoc(docRef, { fotoPerfil: nuevaFoto, appState: { fotoPerfil: nuevaFoto } }, { merge: true });
      } catch (e) {
        console.error("Error guardando foto de perfil en Firestore:", e);
      }
    }
  };

  // Registro del Service Worker, Google Play Store e instalación nativa
  useEffect(() => {
    registrarServiceWorker();
    inicializarGooglePlayBillingStore((compra) => {
      if (compra && compra.planId) {
        setEsPremium(true);
        setPlanPago(compra.planId);
        if (compra.datosPago) {
          setDatosPagoBasico(compra.datosPago);
          setCompraExitosaModal({ datosPago: compra.datosPago, planId: compra.planId });
        }
      }
    });

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      console.log("Evento beforeinstallprompt capturado para widget/instalación nativa en Android.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  // Programador de recordatorios en segundo plano cuando la app está activa
  useEffect(() => {
    if (!configRecordatorios?.activo) return;

    const intervalId = setInterval(() => {
      try {
        const now = new Date();
        const horaStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const fechaStr = now.toDateString();

        if (configRecordatorios.modo === "horarios" && configRecordatorios.horarios?.includes(horaStr)) {
          const sentKey = `suelta_notif_${horaStr}_${fechaStr}`;
          if (!window.localStorage.getItem(sentKey)) {
            window.localStorage.setItem(sentKey, "sent");
            const item = AFIRMACIONES_RECORDATORIOS[Math.floor(Math.random() * AFIRMACIONES_RECORDATORIOS.length)];
            enviarNotificacionNativa({
              titulo: item.titulo,
              mensaje: item.mensaje,
              reproducirSonido: configRecordatorios.sonido,
              vibrar: configRecordatorios.vibracion
            });
          }
        }
      } catch (err) {
        console.warn("Scheduler error:", err);
      }
    }, 45000);

    return () => clearInterval(intervalId);
  }, [configRecordatorios]);
  // Estado del formulario de registro, elevado aquí (no local a ScreenRegistro) para que
  // sobreviva si la persona sale a leer Términos/Privacidad y luego vuelve.
  const [regForm, setRegForm] = useState({ nombre: "", edad: "", sexo: "", email: "", celular: "", codigoPais: "co", apodo: "", password: "" });
  const [regAceptaTerminos, setRegAceptaTerminos] = useState(false);
  const [regError, setRegError] = useState("");
  // De dónde se llegó al registro: "bienvenida" en el flujo normal, o "captura" si se usó el
  // atajo del paso a paso para editar el registro a mitad de camino. Al terminar o
  // cancelar, se vuelve ahí — no siempre a Inicio.
  const [regDesde, setRegDesde] = useState("bienvenida");
  const [paywallDesde, setPaywallDesde] = useState("diagnostico");
  // Idioma detectado automáticamente de la configuración del dispositivo (navigator.language) o cargado de la persistencia.
  const [idiomaDetectado, setIdiomaDetectado] = useState(() => {
    try {
      const guardadoDirecto = window.localStorage.getItem("suelta_idioma");
      if (guardadoDirecto && IDIOMAS_SOPORTADOS[guardadoDirecto]) return guardadoDirecto;
      if (estadoGuardado.idioma && IDIOMAS_SOPORTADOS[estadoGuardado.idioma]) return estadoGuardado.idioma;
      return detectarIdiomaDispositivo();
    } catch {
      return estadoGuardado.idioma || detectarIdiomaDispositivo();
    }
  });
  useEffect(() => {
    setGlobalLanguage(idiomaDetectado);
    try {
      window.localStorage.setItem("suelta_idioma", idiomaDetectado);
      const nombreApp = t("¡Suelta!", idiomaDetectado) || "¡Suelta!";
      document.title = nombreApp;
      document.documentElement.lang = idiomaDetectado;
    } catch (e) {}
  }, [idiomaDetectado]);

  // Modal para selección de idioma predeterminado cuando el usuario es nuevo
  const [mostrarModalIdioma, setMostrarModalIdioma] = useState(() => {
    try {
      const yaConfigurado = window.localStorage.getItem("suelta_idioma_configurado");
      if (yaConfigurado || estadoGuardado.idioma || window.localStorage.getItem("suelta_idioma")) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  });
  const [idiomaTemporalModal, setIdiomaTemporalModal] = useState(idiomaDetectado);

  const handleConfirmarIdiomaModal = async (nuevoIdioma) => {
    const lang = nuevoIdioma || idiomaTemporalModal || idiomaDetectado;
    setIdiomaDetectado(lang);
    try {
      window.localStorage.setItem("suelta_idioma", lang);
      window.localStorage.setItem("suelta_idioma_configurado", "true");
    } catch (e) {}
    setMostrarModalIdioma(false);

    if (currentUser) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        await setDoc(docRef, {
          idioma: lang,
          appState: { idioma: lang }
        }, { merge: true });
      } catch (e) {
        console.error("Error guardando idioma en Firestore:", e);
      }
    }
  };

  const handleGuardarIdiomaDesdeAjustes = async (nuevoIdioma) => {
    setIdiomaDetectado(nuevoIdioma);
    try {
      window.localStorage.setItem("suelta_idioma", nuevoIdioma);
      window.localStorage.setItem("suelta_idioma_configurado", "true");
    } catch (e) {}
    if (currentUser) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        await setDoc(docRef, {
          idioma: nuevoIdioma,
          appState: { idioma: nuevoIdioma }
        }, { merge: true });
      } catch (e) {
        console.error("Error actualizando idioma en Firestore:", e);
      }
    }
  };
  const [direccionEnvio, setDireccionEnvio] = useState(estadoGuardado.direccionEnvio || {});
  // La tarjeta simulada NUNCA se persiste (ni siquiera en localStorage): vive solo en memoria.
  const [tarjeta, setTarjeta] = useState({ numero: "", vencimiento: "", cvv: "", nombreTarjeta: "" });
  const [planPendiente, setPlanPendiente] = useState(null); // plan elegido en el paywall, a la espera de confirmar el pago
  const [mostrarModalRequiereAuth, setMostrarModalRequiereAuth] = useState(false);
  const [motivoRequiereAuth, setMotivoRequiereAuth] = useState("pago"); // "prueba" | "pago" | "restaurar"
  const [modalPermisoAjustesTipo, setModalPermisoAjustesTipo] = useState(null); // "microfono" | "notificaciones" | "camara" | null
  const [mostrarModalGoogleInApp, setMostrarModalGoogleInApp] = useState(false);

  const solicitarAutenticacionParaPago = (motivo = "pago", planId = "anual") => {
    setMotivoRequiereAuth(planId === "prueba" || motivo === "prueba" ? "prueba" : "pago");
    setPlanPendiente(planId || "anual");
    setMostrarModalRequiereAuth(true);
  };
  const [email, setEmail] = useState(estadoGuardado.email || "");
  const [nombreCompleto, setNombreCompleto] = useState(estadoGuardado.nombreCompleto || "");
  const [recordatoriosReto, setRecordatoriosReto] = useState(estadoGuardado.recordatoriosReto || { activos: false, email: "", hora: "08:00" });
  const [analisisReporte, setAnalisisReporte] = useState(estadoGuardado.analisisReporte || null);
  const [tutorialCompletado, setTutorialCompletado] = useState(estadoGuardado.tutorialCompletado || false);
  const [guiaChecklistAbierta, setGuiaChecklistAbierta] = useState(false);
  const [submodalChecklistAbierto, setSubmodalChecklistAbierto] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollRef = useRef(null);

  const [errorNotificacion, setErrorNotificacion] = useState(() => {
    try {
      const isCuentaEliminada = window.localStorage.getItem("suelta-y-sana:cuenta-eliminada-exito");
      if (isCuentaEliminada === "true") {
        window.localStorage.removeItem("suelta-y-sana:cuenta-eliminada-exito");
        return {
          tipo: "exito",
          titulo: "Cuenta y datos eliminados",
          mensaje: "Tu cuenta y todos tus datos personales han sido eliminados de manera permanente y segura de nuestros servidores y de este dispositivo."
        };
      }
      const isRecentLoginErr = window.localStorage.getItem("suelta-y-sana:recent-login-error");
      const err = window.localStorage.getItem("suelta-y-sana:delete-user-error");
      if (isRecentLoginErr === "true") {
        window.localStorage.removeItem("suelta-y-sana:recent-login-error");
        return {
          tipo: "aviso",
          titulo: "Aviso de seguridad",
          mensaje: "Tus datos de salud y bienestar han sido eliminados de nuestros servidores. Por políticas de seguridad de Google, para dar de baja definitiva las credenciales de acceso se requería una sesión muy reciente."
        };
      }
      if (err) {
        window.localStorage.removeItem("suelta-y-sana:delete-user-error");
        return {
          tipo: "aviso",
          titulo: "Aviso de seguridad",
          mensaje: "Tus datos locales y de perfil se han limpiado correctamente."
        };
      }
    } catch (e) {}
    return null;
  });

  const algunModalAbierto = Boolean(
    drawerOpen ||
    guiaChecklistAbierta ||
    submodalChecklistAbierto ||
    mostrarModalIdioma ||
    mostrarModalRequiereAuth ||
    modalPermisoAjustesTipo ||
    errorNotificacion ||
    mostrarModalPrueba
  );
  useBloquearScrollFondo(algunModalAbierto);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#landing" || hash === "" || hash === "#") {
        setStage(isNativeApp ? (estadoGuardado.stage || (estadoGuardado.nombre ? "inicio" : "bienvenida")) : "landing");
      } else if (hash === "#app") {
        setStage(estadoGuardado.stage || (estadoGuardado.nombre ? "inicio" : "bienvenida"));
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [estadoGuardado]);

  const navegar = useCallback((destino, bloqueado) => {
    setDrawerOpen(false);

    const tieneAccesoModulos = tieneAccesoTotal || esPremium || enPruebaActiva;

    if (destino === "especialistas") {
      // Especialistas vive solo en el plan Anual o usuarios con Acceso Total (VIP)
      if (!tieneAccesoTotal && planPago !== "anual") {
        setPaywallDesde(stage);
        setStage("paywall");
        return;
      }
      setHubItem({ id: "especialistas", label: "Hablar con un especialista", icon: "\u2695" });
      setStage("hubDetalle");
      return;
    }

    // Si la prueba ha expirado y el usuario no tiene acceso total ni suscripción activa, se activa el muro de pago y el modal constante
    if (pruebaExpirada && !tieneSuscripcionActiva) {
      const modulosProtegidos = ["reto", "hub", "hubDetalle", "cuestionarios", "cuestionarioDetalle", "especialistas", "diario", "herramientas", "herramientaDetalle"];
      if (modulosProtegidos.includes(destino)) {
        setPaywallDesde(stage);
        setMostrarModalPrueba(true);
        setStage("paywall");
        return;
      }
    }

    if (bloqueado && !tieneAccesoModulos) {
      setPaywallDesde(stage);
      setStage("paywall");
      return;
    }

    setStage(destino);
  }, [stage, pruebaExpirada, tieneSuscripcionActiva, tieneAccesoTotal, planPago, esPremium, enPruebaActiva]);

  // Soporte nativo para el botón 'Atrás' en dispositivos móviles Android (Google Play) y navegación por gestos
  const handleAndroidBack = useCallback(() => {
    if (mostrarModalPrueba) {
      setMostrarModalPrueba(false);
      return;
    }
    if (submodalChecklistAbierto) {
      window.dispatchEvent(new CustomEvent("cerrar-submodal-checklist"));
      return;
    }
    if (guiaChecklistAbierta) {
      setGuiaChecklistAbierta(false);
      return;
    }
    if (drawerOpen) {
      setDrawerOpen(false);
      return;
    }
    if (modalPermisoAjustesTipo) {
      setModalPermisoAjustesTipo(null);
      return;
    }
    if (mostrarModalGoogleInApp) {
      setMostrarModalGoogleInApp(false);
      return;
    }
    if (mostrarModalRequiereAuth) {
      setMostrarModalRequiereAuth(false);
      return;
    }
    if (cuestionarioActual) {
      setCuestionarioActual(null);
      return;
    }
    if (stage === "hubDetalle") {
      setStage("hub");
      return;
    }
    if (stage === "herramientaDetalle") {
      setStage("herramientas");
      return;
    }
    if (stage === "cuestionarioDetalle") {
      setStage("cuestionarios");
      return;
    }
    if (stage === "cuestionarios") {
      setStage("hub");
      return;
    }
    if (stage === "recordatoriosWidget") {
      setStage("perfil");
      return;
    }
    if (stage === "editarPerfil") {
      setStage("perfil");
      return;
    }
    if (stage === "suscripcion") {
      setStage("perfil");
      return;
    }
    if (stage === "legal") {
      setStage(legalOrigen || "inicio");
      return;
    }
    if (stage === "pago") {
      setStage("paywall");
      return;
    }
    if (stage === "paywall") {
      setStage(paywallDesde || (currentUser ? "inicio" : "bienvenida"));
      return;
    }
    if (stage === "nacimiento") {
      setStage(nacimientoOrigen === "perfil" ? "perfil" : "pago");
      return;
    }
    if (stage === "postRegistro") {
      setStage("inicio");
      return;
    }
    if (stage === "login" || stage === "registro") {
      setStage("bienvenida");
      return;
    }
    if (stage === "diagnostico") {
      setStage("captura");
      return;
    }
    if (stage === "captura") {
      setStage("inicio");
      return;
    }
    if (["reto", "diario", "perfil", "herramientas", "hub"].includes(stage)) {
      setStage("inicio");
      return;
    }

    // Si ya está en la pantalla principal (inicio o bienvenida), no cerrar la app con un simple deslizamiento
    if (stage === "inicio" || stage === "bienvenida") {
      // Quedarse de forma segura en la pantalla de inicio sin forzar el cierre de la app
      return;
    }
  }, [submodalChecklistAbierto, guiaChecklistAbierta, drawerOpen, modalPermisoAjustesTipo, mostrarModalRequiereAuth, cuestionarioActual, stage, currentUser, legalOrigen, paywallDesde, nacimientoOrigen, mostrarModalPrueba, pruebaExpirada]);

  // Asegurar que a los usuarios sin suscripción activa les aparezca el mensaje modal constante del período de prueba de 3 días
  // Asegurar que a los usuarios sin suscripción activa les aparezca el aviso modal del período de prueba
  // pero permitiendo descartarlo para continuar usando la app sin suscripción
  useEffect(() => {
    if (tieneSuscripcionActiva) {
      if (mostrarModalPrueba) setMostrarModalPrueba(false);
      return;
    }

    // 1. Si los 3 días de prueba han sido cumplidos (prueba concluida / expirada):
    // Mostrar el modal avisando el fin de la prueba una vez por sesión en la pantalla de inicio,
    // permitiendo al usuario continuar sin suscripción si no la desea adquirir
    if (pruebaExpirada && stage === "inicio") {
      const sesionExpiradaKey = "suelta_modal_prueba_expirada_visto";
      let yaVistoExp = false;
      try {
        yaVistoExp = !!window.sessionStorage.getItem(sesionExpiradaKey);
      } catch (_) {}

      if (!yaVistoExp) {
        setMostrarModalPrueba(true);
        try {
          window.sessionStorage.setItem(sesionExpiradaKey, "true");
        } catch (_) {}
      }
      return;
    }

    // 2. Si el usuario lleva 1, 2 o 3 días de acceso premium de prueba:
    // Mostrar el modal avisando el día de prueba actual una vez por sesión en la pantalla de inicio
    if (enPruebaActiva && stage === "inicio") {
      const sesionKey = `suelta_modal_prueba_dia_${diaPruebaActual}_visto`;
      let yaVisto = false;
      try {
        yaVisto = !!window.sessionStorage.getItem(sesionKey);
      } catch (_) {}

      if (!yaVisto) {
        setMostrarModalPrueba(true);
        try {
          window.sessionStorage.setItem(sesionKey, "true");
        } catch (_) {}
      }
    }
  }, [tieneSuscripcionActiva, pruebaExpirada, enPruebaActiva, diaPruebaActual, stage]);

  // Secuencia de las pestañas principales del BottomNav
  const TABS_ORDEN = ["inicio", "reto", "herramientas", "hub", "especialistas"];

  const handleSwipeGesture = useCallback((direccion, isEdge = false, edgeSide = "left") => {
    // 0. Si el submodal de detalle de la guía interactiva está abierto, cerrarlo primero
    if (submodalChecklistAbierto) {
      if (isEdge || direccion === "right" || direccion === "down") {
        window.dispatchEvent(new CustomEvent("cerrar-submodal-checklist"));
      }
      return;
    }

    // 1. Si la guía interactiva está abierta, deslizar desde el borde o hacia la derecha la cierra
    if (guiaChecklistAbierta) {
      if (isEdge || direccion === "right" || direccion === "down") {
        setGuiaChecklistAbierta(false);
      }
      return;
    }

    // 2. Si el menú lateral está abierto y se desliza hacia la izquierda -> cerrar el menú
    if (drawerOpen && direccion === "left") {
      setDrawerOpen(false);
      return;
    }

    // 3. Modales bloqueantes
    if (compraExitosaModal || modalPermisoAjustesTipo || mostrarModalRequiereAuth) {
      if (isEdge || direccion === "right") {
        handleAndroidBack();
      }
      return;
    }

    // 4. Gesto del borde (Edge Swipe) desde el borde izquierdo o derecho
    // Este es el gesto estándar de navegación por gestos de Android (Configuración del celular)
    if (isEdge) {
      // En la pantalla 'inicio', un deslizamiento desde el borde izquierdo hacia la derecha abre el menú lateral
      if (stage === "inicio" && direccion === "right" && edgeSide === "left" && !drawerOpen) {
        setDrawerOpen(true);
        return;
      }
      // En CUALQUIER otra pantalla (reto, herramientas, hub, diario, perfil, etc.) o desde el borde derecho,
      // un deslizamiento de borde SIEMPRE regresa hacia atrás
      handleAndroidBack();
      return;
    }

    // 5. Deslizar hacia la derecha en cualquier pantalla que no sea inicio regresa a la pantalla anterior
    if (direccion === "right") {
      if (stage !== "inicio" && stage !== "bienvenida") {
        handleAndroidBack();
        return;
      }
    }

    // 6. En la pantalla de inicio, deslizar hacia la izquierda puede avanzar al siguiente módulo
    if (stage === "inicio" && direccion === "left") {
      navegar("reto");
    }
  }, [submodalChecklistAbierto, guiaChecklistAbierta, drawerOpen, compraExitosaModal, modalPermisoAjustesTipo, mostrarModalRequiereAuth, stage, handleAndroidBack, navegar]);

  const handleAndroidBackRef = useRef(handleAndroidBack);
  handleAndroidBackRef.current = handleAndroidBack;

  const handleSwipeGestureRef = useRef(handleSwipeGesture);
  handleSwipeGestureRef.current = handleSwipeGesture;

  useEffect(() => {
    // Sincronizar un historial artificial para que el gesto deslizar 'Atrás' nativo de Android
    // (Edge Swipe Back) siempre tenga historial que consumir y ejecute handleAndroidBack()
    // en lugar de salir abruptamente de la app.
    if (typeof window !== "undefined" && window.history) {
      try {
        window.history.pushState({ stage, guia: guiaChecklistAbierta, submodal: submodalChecklistAbierto, drawer: drawerOpen, timestamp: Date.now() }, "", window.location.href);
      } catch (_) {}
    }
  }, [stage, guiaChecklistAbierta, submodalChecklistAbierto, drawerOpen]);

  useEffect(() => {
    let capacitorListener = null;

    // 1. Integración nativa oficial de Capacitor para navegación por gestos en Android (Edge Swipe Back)
    try {
      if (CapacitorApp && typeof CapacitorApp.addListener === "function") {
        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (handleAndroidBackRef.current) {
            handleAndroidBackRef.current();
          }
        }).then(handle => {
          capacitorListener = handle;
          console.log("Capacitor backButton registrado con éxito para Android Gestures.");
        }).catch(e => console.log("Capacitor App backButton listener:", e));
      }
    } catch (e) {
      console.log("Capacitor App not available in environment:", e);
    }

    // 2. Soporte oficial para evento 'backbutton' de Cordova y Android WebView Bridge
    const handleBackButtonDoc = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (handleAndroidBackRef.current) {
        handleAndroidBackRef.current();
      }
    };
    document.addEventListener("backbutton", handleBackButtonDoc);

    // 3. Historial inicial de seguridad para Chrome Android / WebView PWA
    try {
      if (typeof window !== "undefined" && window.history) {
        window.history.pushState({ guard: 1, timestamp: Date.now() }, "", window.location.href);
        window.history.pushState({ guard: 2, timestamp: Date.now() }, "", window.location.href);
      }
    } catch (_) {}

    const handlePopState = () => {
      try {
        window.history.pushState({ stage: "intermedio", guard: true, timestamp: Date.now() }, "", window.location.href);
      } catch (_) {}
      if (handleAndroidBackRef.current) {
        handleAndroidBackRef.current();
      }
    };
    window.addEventListener("popstate", handlePopState);

    // Escucha global para abrir modal de paso a paso de permisos y redirección a ajustes
    const handleEventoPermisos = (e) => {
      const tipo = e?.detail?.tipo || "microfono";
      setModalPermisoAjustesTipo(tipo);
    };
    window.addEventListener(EVENTO_ABRIR_GUIA_PERMISOS, handleEventoPermisos);

    // Escucha de gestos de deslizamiento en toda la ventana (Window Touch Swipe)
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchLeftEdge = false;
    let isTouchRightEdge = false;

    const onGlobalTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = Date.now();
      isTouchLeftEdge = t.clientX <= 55;
      isTouchRightEdge = t.clientX >= (window.innerWidth - 55);
    };

    const onGlobalTouchEnd = (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const duration = Date.now() - touchStartTime;

      const target = e.target;
      if (target && target.closest && target.closest('input, textarea, select, [data-no-swipe], .ss-body-map, .no-swipe, .ss-slider')) {
        return;
      }

      // Deslizamiento horizontal intencional
      if (absX > 35 && absX > absY * 1.15 && duration < 850) {
        if (dx > 0) {
          // Desliza hacia la derecha
          if (handleSwipeGestureRef.current) {
            handleSwipeGestureRef.current("right", isTouchLeftEdge, "left");
          }
        } else {
          // Desliza hacia la izquierda (si comenzó en el borde derecho, es back gesture de Android)
          if (handleSwipeGestureRef.current) {
            handleSwipeGestureRef.current("left", isTouchRightEdge, "right");
          }
        }
      }
    };

    window.addEventListener("touchstart", onGlobalTouchStart, { passive: true });
    window.addEventListener("touchend", onGlobalTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("backbutton", handleBackButtonDoc);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener(EVENTO_ABRIR_GUIA_PERMISOS, handleEventoPermisos);
      window.removeEventListener("touchstart", onGlobalTouchStart);
      window.removeEventListener("touchend", onGlobalTouchEnd);
      if (capacitorListener?.remove) {
        capacitorListener.remove();
      }
    };
  }, []);
  const [authCargado, setAuthCargado] = useState(false);
  
  // La guía instructiva antigua ha sido reemplazada por el checklist interactivo paso a paso (GuiaChecklistPasoAPaso).
  // No se fuerza ningún tutorial invasivo al inicio.
  useEffect(() => {
    // Si el usuario es nuevo y nunca ha visto la guía, el componente TarjetaChecklistInicio en la Home
    // le muestra el porcentaje y le permite abrir la guía cuando desee.
  }, [stage, authCargado]);

  // Solicitar automáticamente todos los permisos del dispositivo (Notificaciones, Micrófono, Cámara, Widget)
  // de forma secuencial cuando el usuario ingresa a la aplicación o inicia sesión.
  useEffect(() => {
    if (!authCargado) return;

    const enPantallaPrincipal = stage === "inicio" || stage === "reto" || stage === "hub" || stage === "diario" || stage === "herramientas" || stage === "perfil" || stage === "nacimiento";
    const yaSolicitados = typeof window !== "undefined" && window.sessionStorage?.getItem("suelta_permisos_auto_solicitados");

    if (enPantallaPrincipal && !yaSolicitados) {
      try { window.sessionStorage?.setItem("suelta_permisos_auto_solicitados", "true"); } catch(e) {}

      const timer = setTimeout(() => {
        solicitarTodosLosPermisosAutomaticos({
          onEstadoPermisos: (estados) => {
            console.log("Permisos nativos solicitados automáticamente al ingresar:", estados);
          }
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [authCargado, stage]);

  const isDeletingRef = useRef(false);
  const isLoggingOutRef = useRef(false);
  const isRegisteringWithGoogleRef = useRef(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (res) => {
        if (res) {
          console.log("Sesión recuperada tras redireccionamiento de Google:", res.user);
          const user = res.user;

          const userDocRef = doc(db, "users", user.uid);
          let userDocSnap;
          try {
            userDocSnap = await getDoc(userDocRef);
          } catch (e) {
            await new Promise(r => setTimeout(r, 1000));
            userDocSnap = await getDoc(userDocRef);
          }

          if (!userDocSnap.exists()) {
            console.log("Google Redirect: El documento no existe. Auto-creando...");
            const activeNombre = user.displayName || user.email.split('@')[0];
            const activeSexo = "Otro";
            const activeEmail = user.email || "no-email";
            const activeApodo = activeNombre.split(' ')[0];
            
            const isVipUserRedir = await verificarSiEsVip(activeEmail);
            const fechaRegRedir = Date.now();
            const planRedir = isVipUserRedir ? "anual" : "prueba";

            const rawEstado = {
              stage: "inicio",
              nombre: activeNombre,
              sexo: activeSexo,
              seleccion,
              datos,
              resultados,
              hubItem,
              herramientaItem,
              entradas,
              nacimiento,
              familia,
              retoDiaActual,
              retoCompletados,
              retoHistorial,
              retoCompletadosFechas,
              esPremium: true,
              planPago: planRedir,
              datosPagoBasico,
              direccionEnvio,
              email: activeEmail,
              nombreCompleto: activeNombre,
              recordatoriosReto,
              analisisReporte,
              fechaRegistro: fechaRegRedir,
              esVip: isVipUserRedir,
              accesoTotal: isVipUserRedir,
            };

            const cleanedRaw = { ...rawEstado };
            delete cleanedRaw.entradas;

            await setDoc(userDocRef, {
              email: activeEmail,
              nombre: activeNombre,
              apodo: activeApodo,
              sexo: activeSexo,
              edad: "26-35",
              celular: "",
              fechaRegistro: fechaRegRedir,
              esVip: isVipUserRedir,
              accesoTotal: isVipUserRedir,
              subscription: {
                isActive: isVipUserRedir,
                plan: planRedir,
                vip: isVipUserRedir,
                startedAt: fechaRegRedir
              },
              planPago: planRedir,
              appState: JSON.parse(JSON.stringify(cleanedRaw))
            }, { merge: true });

            setNombre(activeNombre);
            setNombreCompleto(activeNombre);
            setEmail(activeEmail);
            setFechaRegistroUser(fechaRegRedir);
            setEsVipUser(isVipUserRedir);
            setEsPremium(true);
            setPlanPago(planRedir);
          } else {
            await setDoc(userDocRef, {
              email: user.email,
              nombre: user.displayName || user.email.split('@')[0]
            }, { merge: true });
          }
          setStage("inicio");
        }
      })
      .catch((err) => {
        console.error("Error al recuperar resultado de redireccionamiento de Google:", err);
      });
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (isRegisteringWithGoogleRef.current) {
        console.log("onAuthStateChanged: Omitiendo procesamiento porque se está registrando con Google.");
        setAuthCargado(true);
        return;
      }
      if (user) {
        if (user.email) {
          guardarCuentaRecordadaLocal({
            uid: user.uid,
            email: user.email,
            nombre: user.displayName || user.email.split('@')[0],
            foto: user.photoURL || null
          });
        }
        let userExists = false;
        let isOfflineOrError = false;
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (isRegisteringWithGoogleRef.current) {
              console.log("onAuthStateChanged: El usuario ya existe pero está en flujo de registro con Google. Evitando auto-login.");
              userExists = false;
            } else {
              userExists = true;
              const data = docSnap.data();
            const loadedNombre = data.nombre || data.apodo || (user.displayName ? user.displayName.split(' ')[0] : user.email.split('@')[0]);
            setNombre(loadedNombre);
            if (data.nombreCompleto) setNombreCompleto(data.nombreCompleto);
            setEmail(data.email || user.email);
            if (data.sexo) setSexo(data.sexo);
            const loadedIdioma = data.idioma || (data.appState && data.appState.idioma);
            if (loadedIdioma) {
              setIdiomaDetectado(loadedIdioma);
              try { window.localStorage.setItem("suelta_idioma_configurado", "true"); } catch {}
              setMostrarModalIdioma(false);
            }
            
            if (data.appState) {
              const s = data.appState;
              if (s.seleccion) setSeleccion(s.seleccion);
              if (s.datos) setDatos(s.datos);
              if (s.resultados) setResultados(s.resultados);
              
              // Cargar de manera robusta la subcolección 'diario' para evitar el límite de 1MB de Firestore en el documento principal
              try {
                const diarioSnap = await getDocs(collection(db, "users", user.uid, "diario"));
                const cargadas = [];
                diarioSnap.forEach((d) => {
                  cargadas.push(d.data());
                });
                cargadas.sort((a, b) => {
                  const dateA = new Date(a.fecha || a.id || 0).getTime();
                  const dateB = new Date(b.fecha || b.id || 0).getTime();
                  return dateB - dateA;
                });
                if (cargadas.length > 0) {
                  setEntradas(cargadas);
                } else if (s.entradas) {
                  setEntradas(s.entradas);
                }
              } catch (diarioErr) {
                console.error("Error al cargar entradas de subcolección diario:", diarioErr);
                if (s.entradas) setEntradas(s.entradas);
              }

              if (s.nacimiento) setNacimiento(s.nacimiento);
              if (s.familia) setFamilia(s.familia);
              if (s.retoDiaActual) setRetoDiaActual(s.retoDiaActual);
              if (s.retoCompletados) setRetoCompletados(s.retoCompletados);
              if (s.retoHistorial) setRetoHistorial(s.retoHistorial);
              if (s.retoCompletadosFechas) setRetoCompletadosFechas(s.retoCompletadosFechas);
              // Estado de suscripción y acceso (VIP y período de prueba de 3 días)
              const docData = docSnap.data() || {};
              const subDoc = docData.subscription || s.subscription;
              const subActiva = subDoc?.isActive === true || subDoc?.status === "ACTIVE";
              
              // 1. Verificación de Acceso Total / VIP
              const cleanUserEmail = (user.email || "").toLowerCase().trim();
              let isVip = docData.esVip === true || docData.accesoTotal === true || subDoc?.vip === true;
              if (!isVip && cleanUserEmail) {
                isVip = await verificarSiEsVip(cleanUserEmail);
              }
              setEsVipUser(isVip);

              // 2. Fecha de registro y cálculo de días de prueba
              let fechaReg = docData.fechaRegistro;
              if (!fechaReg) {
                try {
                  const localSecure = window.localStorage.getItem("suelta_fecha_registro_segura");
                  if (localSecure && !isNaN(Number(localSecure))) {
                    fechaReg = Number(localSecure);
                  }
                } catch (_) {}
                if (!fechaReg) {
                  fechaReg = Date.now();
                }
                setDoc(docRef, { fechaRegistro: fechaReg }, { merge: true }).catch(() => {});
              }
              setFechaRegistroUser(fechaReg);
              try {
                window.localStorage.setItem("suelta_fecha_registro_segura", String(fechaReg));
              } catch (_) {}

              // 3. Determinar estado de acceso y compras
              const datosPagoRecuperados = docData.datosPagoBasico || s.datosPagoBasico || null;
              if (datosPagoRecuperados) setDatosPagoBasico(datosPagoRecuperados);

              const tieneDatosPagoValidos = !!(datosPagoRecuperados?.orderId || datosPagoRecuperados?.purchaseToken || datosPagoRecuperados?.transaccionId);
              const planGuardado = docData.planPago || subDoc?.plan || s.planPago || (tieneDatosPagoValidos ? datosPagoRecuperados?.planId : null);
              const tieneCompraActiva = subActiva || docData.esPremium === true || planGuardado === "anual" || planGuardado === "mensual" || tieneDatosPagoValidos;

              const transcurrido = Date.now() - Number(fechaReg);
              const enPrueba = transcurrido < DURACION_PRUEBA_MS;

              if (isVip) {
                setEsPremium(true);
                setPlanPago("anual");
              } else if (tieneCompraActiva) {
                const planEfectivo = planGuardado || (subDoc?.plan === "anual" ? "anual" : "mensual");
                setEsPremium(true);
                setPlanPago(planEfectivo);
                try {
                  window.localStorage.setItem("suelta_es_premium", "true");
                  window.localStorage.setItem("suelta_plan_pago", planEfectivo);
                  if (datosPagoRecuperados) {
                    window.localStorage.setItem("suelta_datos_pago", JSON.stringify(datosPagoRecuperados));
                    window.localStorage.setItem("suelta_google_play_purchase", JSON.stringify(datosPagoRecuperados));
                  }
                } catch (_) {}
              } else if (enPrueba) {
                setEsPremium(true);
                setPlanPago("prueba");
              } else {
                setEsPremium(false);
                setPlanPago("prueba");
              }
              if (s.direccionEnvio) setDireccionEnvio(s.direccionEnvio);
              if (s.recordatoriosReto) setRecordatoriosReto(s.recordatoriosReto);
              if (s.tutorialCompletado !== undefined) setTutorialCompletado(s.tutorialCompletado);

              if (s.stage && ETAPAS_RESTAURABLES.includes(s.stage)) {
                setStage(s.stage);
              } else {
                setStage(prev => (prev === "bienvenida" || prev === "registro" ? "inicio" : prev));
              }
            } else {
              setStage(prev => (prev === "bienvenida" || prev === "registro" ? "inicio" : prev));
            }
          }
          } else {
            // El usuario está logueado pero no tiene documento en Firestore.
            // Si el usuario ya tiene progreso local (nombre guardado), lo guardamos de inmediato en la DB en lugar de borrarlo.
            const activeNombre = nombre || estadoGuardado.nombre;
            if (activeNombre) {
              console.log("Usuario autenticado sin documento en DB, pero con progreso local. Guardando en la nube...");
              userExists = true;
              const activeSexo = sexo || estadoGuardado.sexo || "Otro";
              const activeEmail = email || user.email || "no-email";
              
              const rawEstado = {
                stage: stage === "bienvenida" || stage === "registro" ? "inicio" : stage,
                nombre: activeNombre,
                sexo: activeSexo,
                seleccion,
                datos,
                resultados,
                hubItem,
                herramientaItem,
                entradas,
                nacimiento,
                familia,
                retoDiaActual,
                retoCompletados,
                retoHistorial,
                retoCompletadosFechas,
                esPremium,
                  planPago,
                datosPagoBasico,
                direccionEnvio,
                email: activeEmail,
                nombreCompleto: nombreCompleto || activeNombre,
                recordatoriosReto,
                analisisReporte,
              };

              try {
                // Migrar entradas locales a subcolección diario de manera asíncrona para no perder datos locales
                if (entradas && entradas.length > 0) {
                  for (const ent of entradas) {
                    try {
                      await setDoc(doc(db, "users", user.uid, "diario", ent.id), JSON.parse(JSON.stringify(ent)));
                    } catch (migrE) {
                      console.error("Error migrando entrada local:", ent.id, migrE);
                    }
                  }
                }

                const cleanedRaw = { ...rawEstado };
                delete cleanedRaw.entradas;

                await setDoc(docRef, {
                  email: activeEmail,
                  nombre: activeNombre,
                  apodo: activeNombre.split(' ')[0],
                  sexo: activeSexo,
                  edad: "26-35",
                  celular: "",
                  appState: JSON.parse(JSON.stringify(cleanedRaw))
                }, { merge: true });
                setNombre(activeNombre);
                setEmail(activeEmail);
                setStage(prev => (prev === "bienvenida" || prev === "registro" ? "inicio" : prev));
              } catch (e) {
                console.error("Error al sincronizar estado local a Firestore en onAuthStateChanged:", e);
              }
            } else {
              // Es un usuario de Google nuevo y sin progreso local previo.
              // Auto-creamos su documento básico para evitar que quede atrapado en el flujo de registro.
              console.log("Auto-creando documento básico en Firestore para nuevo usuario...");
              userExists = true;
              const activeNombre = user.displayName || user.email.split('@')[0];
              const activeEmail = user.email;
              const activeApodo = activeNombre.split(' ')[0];
              
              const rawEstado = {
                stage: "inicio",
                nombre: activeNombre,
                sexo: "Otro",
                seleccion,
                datos,
                resultados,
                hubItem,
                herramientaItem,
                entradas,
                nacimiento,
                familia,
                retoDiaActual,
                retoCompletados,
                retoHistorial,
                retoCompletadosFechas,
                esPremium,
                  planPago,
                datosPagoBasico,
                direccionEnvio,
                email: activeEmail,
                nombreCompleto: activeNombre,
                recordatoriosReto,
                analisisReporte,
              };

              const cleanedRaw = { ...rawEstado };
              delete cleanedRaw.entradas;

              try {
                await setDoc(docRef, {
                  email: activeEmail,
                  nombre: activeNombre,
                  apodo: activeApodo,
                  sexo: "Otro",
                  edad: "26-35",
                  celular: "",
                  appState: JSON.parse(JSON.stringify(cleanedRaw))
                }, { merge: true });
                setNombre(activeNombre);
                setNombreCompleto(activeNombre);
                setEmail(activeEmail);
                setStage("inicio");
              } catch (e) {
                console.error("Error al auto-crear perfil en Firestore:", e);
              }
            }
          }
        } catch (e) {
          isOfflineOrError = true;
          const msg = e?.message || String(e);
          if (!msg.includes("permissions") && !msg.includes("Missing or insufficient")) {
            console.warn("Firestore error in onAuthStateChanged (falling back to offline mode/local state):", e);
          }
        }
        
        if (userExists || isOfflineOrError) {
          setStage(s => (s === "bienvenida" || s === "registro" ? "inicio" : s));
        } else {
          // Si no tiene documento ni pudimos auto-crearlo, nos aseguramos de no desloguear forzosamente
          setStage(s => {
            if (s !== "bienvenida" && s !== "registro" && s !== "captura" && s !== "postRegistro") {
              return "inicio";
            }
            return s;
          });
        }
      } else {
        // User not logged in. If they have saved state (name/valid stage), they are a guest user who already passed onboarding.
        // Don't force them back to bienvenida.
        setStage(s => {
          if (s === "registro" || s === "legal") return s;
          if (estadoGuardado.nombre || (estadoGuardado.stage && ETAPAS_RESTAURABLES.includes(estadoGuardado.stage))) {
            return (s === "bienvenida" || s === "landing") ? "inicio" : s;
          }
          return "bienvenida";
        });
      }
      setAuthCargado(true);
    });
    return unsubscribe;
  }, [auth]);

  // Flujo 100% dentro de la app: Invoca el selector nativo de Google en Android o el modal integrado
  const handleGoogleLogin = async (isLoginOnly = false) => {
    const isCapacitorNative = typeof window !== "undefined" && window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform();
    if (isCapacitorNative) {
      try {
        const { GoogleAuth } = await import("@codetrix-studio/capacitor-google-auth");
        try {
          await GoogleAuth.initialize({
            clientId: "706031612034-8g9v90l77et2nlkkqhcjum6crnhm2eeg.apps.googleusercontent.com",
            scopes: ["profile", "email"],
            grantOfflineAccess: false,
          });
        } catch (_) {}
        // IMPORTANTE: Asegurar signOut previo en GoogleAuth para obligar al sistema Android
        // a mostrar SIEMPRE el selector de cuentas ("Elegir una cuenta") permitiendo al usuario
        // cambiar de cuenta o agregar una nueva en lugar de reutilizar la anterior en silencio
        try {
          await GoogleAuth.signOut();
        } catch (_) {}
        const googleUser = await GoogleAuth.signIn();
        if (googleUser && googleUser.email) {
          try {
            window.sessionStorage.setItem("suelta_used_google_native_auth", "true");
          } catch (_) {}
          await handleSeleccionarCuentaGoogleInApp({
            id: googleUser.id,
            email: googleUser.email,
            nombre: googleUser.name || `${googleUser.givenName || ''} ${googleUser.familyName || ''}`.trim() || googleUser.email.split('@')[0],
            foto: googleUser.imageUrl || null,
            idToken: googleUser.authentication?.idToken
          });
          return;
        }
      } catch (nativeErr) {
        console.warn("Aviso en GoogleAuth nativo:", nativeErr);
        const errMsg = String(nativeErr?.message || nativeErr || "");
        if (errMsg.includes("12501") || errMsg.includes("cancel") || errMsg.includes("Canceled") || errMsg.includes("USER_CANCELLED")) {
          return;
        }
      }
    }

    // Modal de selección de cuentas
    setMostrarModalGoogleInApp(true);
  };

  // Valida y autentica la cuenta de Google o cuenta personalizada directamente dentro de la aplicación
  const handleSeleccionarCuentaGoogleInApp = async (cuenta) => {
    try {
      const emailNormalizado = (cuenta?.email || "").toLowerCase().trim();
      if (!emailNormalizado || !emailNormalizado.includes("@")) {
        throw new Error("Por favor selecciona un correo electrónico válido.");
      }
      const nombreNormalizado = cuenta?.nombre || emailNormalizado.split("@")[0];
      const apodoNormalizado = nombreNormalizado.split(" ")[0];

      // 1. Intentar inicio de sesión o creación determinista / por clave en Firebase Auth para mantener sesión activa
      const pwdDeterminista = cuenta?.password || ("Suelta_GoogleAuth_" + emailNormalizado.replace(/[^a-zA-Z0-9]/g, "_") + "_2026");
      let firebaseUser = null;
      try {
        const res = await signInWithEmailAndPassword(auth, emailNormalizado, pwdDeterminista);
        firebaseUser = res.user;
      } catch (authErr) {
        if (
          authErr?.code === "auth/user-not-found" ||
          authErr?.code === "auth/invalid-credential" ||
          authErr?.code === "auth/invalid-login-credentials"
        ) {
          try {
            const resCreate = await createUserWithEmailAndPassword(auth, emailNormalizado, pwdDeterminista);
            firebaseUser = resCreate.user;
          } catch (createErr) {
            if (createErr?.code === "auth/email-already-in-use" && !cuenta?.password) {
              // Si el usuario ya existía con otra clave y no se especificó una, intentar ingresar con clave determinista de respaldo
              try {
                const fallbackRes = await signInWithEmailAndPassword(auth, emailNormalizado, "Suelta_GoogleAuth_" + emailNormalizado.replace(/[^a-zA-Z0-9]/g, "_") + "_2026");
                firebaseUser = fallbackRes.user;
              } catch (_) {}
            }
            console.warn("Aviso vinculando Firebase Auth in-app:", createErr?.code || createErr?.message);
          }
        } else if (authErr?.code === "auth/wrong-password" && cuenta?.password) {
          throw new Error("La contraseña ingresada no coincide con esta cuenta registrada.");
        }
      }

      // 2. Buscar documento de usuario existente en Firestore por email
      let existingUserDoc = null;
      let targetUid = firebaseUser?.uid;

      try {
        const q = query(collection(db, "users"), where("email", "==", emailNormalizado));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          existingUserDoc = querySnap.docs[0];
          if (!targetUid) {
            targetUid = existingUserDoc.id;
          }
        }
      } catch (e) {
        console.warn("Aviso consultando usuario en Firestore por email:", e);
      }

      if (!targetUid) {
        targetUid = "google_" + emailNormalizado.replace(/[^a-zA-Z0-9]/g, "_");
      }

      // Guardar cuenta recordada en el almacenamiento local para que siempre aparezca en la lista
      guardarCuentaRecordadaLocal({
        id: cuenta?.id || ("acc_" + Date.now()),
        uid: targetUid,
        nombre: nombreNormalizado,
        email: emailNormalizado,
        foto: cuenta?.foto || null
      });

      const activeUserObj = firebaseUser || {
        uid: targetUid,
        email: emailNormalizado,
        displayName: nombreNormalizado,
        photoURL: cuenta?.foto || null
      };

      setCurrentUser(activeUserObj);

      const userDocRef = doc(db, "users", targetUid);
      let userDocSnap = null;
      try {
        userDocSnap = await getDoc(userDocRef);
      } catch (e) {
        await new Promise(r => setTimeout(r, 600));
        try { userDocSnap = await getDoc(userDocRef); } catch (_) {}
      }

      const isVipGoogle = await verificarSiEsVip(emailNormalizado);

      if (!userDocSnap || !userDocSnap.exists()) {
        console.log("In-App Google Login: Creando nuevo documento para", emailNormalizado);
        const fechaRegGoogle = Date.now();
        const planGoogle = isVipGoogle ? "anual" : "prueba";

        const rawEstado = {
          stage: "inicio",
          nombre: nombreNormalizado,
          sexo: sexo || estadoGuardado.sexo || "Otro",
          seleccion,
          datos,
          resultados,
          hubItem,
          herramientaItem,
          entradas,
          nacimiento,
          familia,
          retoDiaActual,
          retoCompletados,
          retoHistorial,
          retoCompletadosFechas,
          esPremium: true,
          planPago: planGoogle,
          datosPagoBasico,
          direccionEnvio,
          email: emailNormalizado,
          nombreCompleto: nombreNormalizado,
          recordatoriosReto,
          analisisReporte,
          fechaRegistro: fechaRegGoogle,
          esVip: isVipGoogle,
          accesoTotal: isVipGoogle,
        };

        const cleanedRaw = { ...rawEstado };
        delete cleanedRaw.entradas;

        try {
          await setDoc(userDocRef, {
            email: emailNormalizado,
            nombre: nombreNormalizado,
            apodo: apodoNormalizado,
            sexo: sexo || estadoGuardado.sexo || "Otro",
            edad: "26-35",
            celular: "",
            fechaRegistro: fechaRegGoogle,
            esVip: isVipGoogle,
            accesoTotal: isVipGoogle,
            subscription: {
              isActive: isVipGoogle,
              plan: planGoogle,
              vip: isVipGoogle,
              startedAt: fechaRegGoogle
            },
            planPago: planGoogle,
            appState: JSON.parse(JSON.stringify(cleanedRaw))
          }, { merge: true });
        } catch (setErr) {
          console.warn("Aviso guardando perfil inicial en Firestore:", setErr);
        }

        setNombre(nombreNormalizado);
        setNombreCompleto(nombreNormalizado);
        setEmail(emailNormalizado);
        setFechaRegistroUser(fechaRegGoogle);
        setEsVipUser(isVipGoogle);
        setEsPremium(true);
        setPlanPago(planGoogle);
      } else {
        console.log("In-App Google Login: Cargando usuario existente", emailNormalizado);
        const data = userDocSnap.data() || {};
        const loadedNombre = data.nombre || data.apodo || nombreNormalizado;
        setNombre(loadedNombre);
        if (data.nombreCompleto) setNombreCompleto(data.nombreCompleto);
        setEmail(data.email || emailNormalizado);
        if (data.sexo) setSexo(data.sexo);
        setEsVipUser(data.esVip === true || isVipGoogle);
        setEsPremium(true);
        setPlanPago(data.planPago || (isVipGoogle ? "anual" : "prueba"));
        if (data.appState) {
          const s = data.appState;
          if (s.seleccion) setSeleccion(s.seleccion);
          if (s.datos) setDatos(s.datos);
          if (s.resultados) setResultados(s.resultados);
          if (s.nacimiento) setNacimiento(s.nacimiento);
          if (s.familia) setFamilia(s.familia);
          if (s.retoDiaActual) setRetoDiaActual(s.retoDiaActual);
          if (s.retoCompletados) setRetoCompletados(s.retoCompletados);
          if (s.retoHistorial) setRetoHistorial(s.retoHistorial);
          if (s.retoCompletadosFechas) setRetoCompletadosFechas(s.retoCompletadosFechas);
        }

        try {
          const diarioSnap = await getDocs(collection(db, "users", targetUid, "diario"));
          const cargadas = [];
          diarioSnap.forEach((d) => cargadas.push(d.data()));
          if (cargadas.length > 0) setEntradas(cargadas);
        } catch (_) {}
      }

      // Persistir de inmediato en localStorage para que sobreviva a recargas
      try {
        const estadoActualizado = {
          stage: "inicio",
          nombre: nombreNormalizado,
          email: emailNormalizado,
          esPremium: true,
          planPago: isVipGoogle ? "anual" : "prueba"
        };
        window.localStorage.setItem(SS_STORAGE_KEY, JSON.stringify(estadoActualizado));
        window.localStorage.setItem("suelta_es_premium", "true");
        window.localStorage.setItem("suelta_plan_pago", isVipGoogle ? "anual" : "prueba");
      } catch (_) {}

      setStage("inicio");
      setMostrarModalGoogleInApp(false);
    } catch (err) {
      console.warn("Aviso en validación in-app de Google, aplicando ingreso local seguro:", err);
      // Respaldo de contingencia: Si ocurre cualquier error, ingresar de todos modos
      const fallbackEmail = (cuenta?.email || "usuario@gmail.com").toLowerCase().trim();
      const fallbackNombre = cuenta?.nombre || fallbackEmail.split("@")[0];
      setNombre(fallbackNombre);
      setEmail(fallbackEmail);
      setEsPremium(true);
      setPlanPago("anual");
      try {
        const estadoFallback = {
          stage: "inicio",
          nombre: fallbackNombre,
          email: fallbackEmail,
          esPremium: true,
          planPago: "anual"
        };
        window.localStorage.setItem(SS_STORAGE_KEY, JSON.stringify(estadoFallback));
      } catch (_) {}
      setStage("inicio");
      setMostrarModalGoogleInApp(false);
    }
  };

  // Decodifica y procesa credencial de Google Identity Services (GIS) en 1 toque
  const handleCredentialGoogleGIS = async (credentialJwt) => {
    try {
      const base64Url = credentialJwt.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const parsed = JSON.parse(jsonPayload);
      if (parsed && parsed.email) {
        await handleSeleccionarCuentaGoogleInApp({
          id: parsed.sub || ("gis_" + Date.now()),
          nombre: parsed.name || parsed.email.split("@")[0],
          email: parsed.email,
          foto: parsed.picture || null,
          esPredeterminada: true
        });
      }
    } catch (e) {
      console.warn("Aviso decodificando credencial de Google GIS:", e);
    }
  };

  // Autenticación oficial con ventana emergente de Google (para web/navegadores)
  const handleGooglePopupLogin = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user && user.email) {
        await handleSeleccionarCuentaGoogleInApp({
          id: user.uid,
          email: user.email,
          nombre: user.displayName || user.email.split("@")[0],
          foto: user.photoURL || null
        });
        setMostrarModalGoogleInApp(false);
      }
    } catch (popupErr) {
      console.warn("Aviso en login con Google popup:", popupErr);
      const msg = String(popupErr?.message || popupErr || "");
      if (msg.includes("popup-closed-by-user") || msg.includes("cancelled")) {
        return;
      }
      throw popupErr;
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        console.log("Email Login: Auto-creando documento de respaldo...");
        const activeNombre = user.displayName || user.email.split('@')[0];
        const activeApodo = activeNombre.split(' ')[0];
        
        const isVipEmailUser = await verificarSiEsVip(user.email);
        const fechaRegEmail = Date.now();
        const planEmail = isVipEmailUser ? "anual" : "prueba";

        const rawEstado = {
          stage: "inicio",
          nombre: activeNombre,
          sexo: "Otro",
          seleccion,
          datos,
          resultados,
          hubItem,
          herramientaItem,
          entradas,
          nacimiento,
          familia,
          retoDiaActual,
          retoCompletados,
          retoHistorial,
          retoCompletadosFechas,
          esPremium: true,
          planPago: planEmail,
          datosPagoBasico,
          direccionEnvio,
          email: user.email,
          nombreCompleto: activeNombre,
          recordatoriosReto,
          analisisReporte,
          fechaRegistro: fechaRegEmail,
          esVip: isVipEmailUser,
          accesoTotal: isVipEmailUser,
        };
        
        try {
          // Migrar entradas locales a subcolección diario de manera asíncrona para no perder datos locales
          if (entradas && entradas.length > 0) {
            for (const ent of entradas) {
              try {
                await setDoc(doc(db, "users", user.uid, "diario", ent.id), JSON.parse(JSON.stringify(ent)));
              } catch (migrE) {
                console.error("Error migrando entrada local:", ent.id, migrE);
              }
            }
          }

          const cleanedRaw = { ...rawEstado };
          delete cleanedRaw.entradas;

          await setDoc(userDocRef, {
            email: user.email,
            nombre: activeNombre,
            apodo: activeApodo,
            sexo: "Otro",
            edad: "26-35",
            celular: "",
            fechaRegistro: fechaRegEmail,
            esVip: isVipEmailUser,
            accesoTotal: isVipEmailUser,
            subscription: {
              isActive: isVipEmailUser,
              plan: planEmail,
              vip: isVipEmailUser,
              startedAt: fechaRegEmail
            },
            planPago: planEmail,
            appState: JSON.parse(JSON.stringify(cleanedRaw))
          }, { merge: true });

          setNombre(activeNombre);
          setNombreCompleto(activeNombre);
          setEmail(user.email);
          setFechaRegistroUser(fechaRegEmail);
          setEsVipUser(isVipEmailUser);
          setEsPremium(true);
          setPlanPago(planEmail);
        } catch (e) {
          console.error("Error auto-creando documento en Email Login:", e);
        }
      }

      // Persistir cuenta recordada de forma local
      guardarCuentaRecordadaLocal({
        uid: user.uid,
        email: user.email,
        nombre: user.displayName || user.email.split('@')[0]
      });

      setStage("inicio");
    } catch (error) {
      if (error.code !== "auth/invalid-credential" && error.code !== "auth/wrong-password" && error.code !== "auth/user-not-found" && error.code !== "auth/invalid-email") {
        console.warn("Aviso en inicio de sesión por correo:", error.code || error.message);
      }
      throw error;
    }
  };

  const handleEmailRegister = async (nombreInput, emailInput, passwordInput) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      const user = res.user;
      const activeNombre = (nombreInput || "").trim() || emailInput.split('@')[0];
      const isVipReg = await verificarSiEsVip(user.email);
      const fechaRegNuevo = Date.now();
      const planNuevo = isVipReg ? "anual" : "prueba";

      const rawEstado = {
        stage: "inicio",
        nombre: activeNombre,
        sexo: "Otro",
        seleccion,
        datos,
        resultados,
        hubItem,
        herramientaItem,
        entradas,
        nacimiento,
        familia,
        retoDiaActual: 1,
        retoCompletados: [],
        retoHistorial: [],
        retoCompletadosFechas: {},
        esPremium: true,
        planPago: planNuevo,
        datosPagoBasico,
        direccionEnvio,
        email: user.email,
        nombreCompleto: activeNombre,
        recordatoriosReto,
        analisisReporte,
        fechaRegistro: fechaRegNuevo,
        esVip: isVipReg,
        accesoTotal: isVipReg
      };

      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          nombre: activeNombre,
          apodo: activeNombre.split(" ")[0],
          edad: "28",
          sexo: "Otro",
          idioma: idiomaDetectado,
          fechaRegistro: fechaRegNuevo,
          esVip: isVipReg,
          accesoTotal: isVipReg,
          subscription: {
            isActive: isVipReg,
            plan: planNuevo,
            vip: isVipReg,
            startedAt: fechaRegNuevo
          },
          planPago: planNuevo,
          appState: JSON.parse(JSON.stringify(rawEstado))
        }, { merge: true });

        setNombre(activeNombre);
        setNombreCompleto(activeNombre);
        setEmail(user.email);
        setFechaRegistroUser(fechaRegNuevo);
        setEsVipUser(isVipReg);
        setEsPremium(true);
        setPlanPago(planNuevo);
      } catch (e) {
        console.warn("Aviso guardando perfil inicial en Firestore:", e);
      }

      // Persistir cuenta recién creada de forma local
      guardarCuentaRecordadaLocal({
        uid: user.uid,
        email: user.email,
        nombre: activeNombre
      });

      setStage("inicio");
    } catch (error) {
      console.warn("Aviso en registro por correo:", error.code || error.message);
      throw error;
    }
  };



  // Guarda automáticamente el progreso de la persona en este dispositivo cada vez que cambia
  // algo relevante. Deliberadamente se excluyen: la tarjeta simulada, y estado puramente de
  // navegación transitoria (legalTipo, cuestionarioActual, regForm, planPendiente, etc.).
  useEffect(() => {
    if (isDeletingRef.current || isLoggingOutRef.current) return;
    const estado = {
      stage,
      nombre,
      sexo,
      seleccion,
      datos,
      resultados,
      hubItem,
      herramientaItem,
      entradas,
      nacimiento,
      familia,
      retoDiaActual,
      retoCompletados,
      retoHistorial,
      retoCompletadosFechas,
      esPremium,
      planPago,
      datosPagoBasico,
      direccionEnvio,
      email,
      nombreCompleto,
      recordatoriosReto,
      analisisReporte,
      tutorialCompletado,
      idioma: idiomaDetectado,
      fechaRegistro: fechaRegistroUser,
      esVip: esVipUser,
      accesoTotal: tieneAccesoTotal,
    };
    ssGuardarEstadoGuardado(estado);
    
    if (currentUser && stage !== "bienvenida" && stage !== "registro" && stage !== "legal") {
      const emailToSave = email || currentUser.email || "no-email";
      const nombreToSave = nombre || currentUser.displayName || emailToSave.split('@')[0] || "Usuario";
      
      // Limpiar el estado de cualquier objeto no serializable (como clases, funciones, symbols, etc.) para evitar fallos internos en Firestore
      let cleanedState = estado;
      try {
        cleanedState = JSON.parse(JSON.stringify(estado));
        if (cleanedState) {
          delete cleanedState.entradas; // Evitar superar el límite de tamaño de 1MB de Firestore excluyendo las entradas del diario
        }
      } catch (err) {
        console.error("Error serializing appState for Firestore:", err);
      }

      setDoc(doc(db, "users", currentUser.uid), { 
        appState: cleanedState,
        email: emailToSave,
        nombre: nombreToSave,
        fechaRegistro: fechaRegistroUser || Date.now(),
        esVip: esVipUser,
        accesoTotal: tieneAccesoTotal
      }, { merge: true }).catch(e => console.error("Error saving state to Firestore:", e));

      // Guardar también en la colección específica de constelaciones para futuro análisis sistémico
      if (Array.isArray(familia) && familia.length > 0) {
        setDoc(doc(db, "users", currentUser.uid, "constelaciones", "arbol"), {
          familia: familia,
          fechaActualizacion: Date.now()
        }, { merge: true }).catch(e => console.error("Error saving constelacion to Firestore:", e));
      }
    }
  }, [
    currentUser,
    stage,
    nombre,
    sexo,
    seleccion,
    datos,
    resultados,
    hubItem,
    herramientaItem,
    entradas,
    nacimiento,
    familia,
    retoDiaActual,
    retoCompletados,
    retoHistorial,
    retoCompletadosFechas,
    esPremium,
    planPago,
    datosPagoBasico,
    direccionEnvio,
    email,
    nombreCompleto,
    recordatoriosReto,
    analisisReporte,
    idiomaDetectado,
  ]);

  const agregarNuevaEntrada = async (nuevaEntrada) => {
    setEntradas((prev) => [nuevaEntrada, ...prev]);
    if (currentUser) {
      try {
        const entradaRef = doc(db, "users", currentUser.uid, "diario", nuevaEntrada.id);
        const cleanedEntrada = JSON.parse(JSON.stringify(nuevaEntrada));
        await setDoc(entradaRef, cleanedEntrada);
        console.log("Entrada del diario guardada robustamente en subcolección:", nuevaEntrada.id);
      } catch (err) {
        console.error("Error al guardar la entrada del diario en la subcolección:", err);
        handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}/diario/${nuevaEntrada.id}`);
      }

      // TAMBIÉN: Guardamos en la subcolección 'progreso' si corresponde a una práctica de bienestar
      try {
        const tipoPractica = nuevaEntrada.titulo || "Práctica General";
        const practicasConocidas = [
          "Práctica con Solfeo",
          "Respiración guiada",
          "Ejercicio de presencia",
          "Momento de gratitud",
          "Relajación corporal",
          "Lugar seguro",
          "Cuestionario"
        ];
        const esPractica = practicasConocidas.some(p => tipoPractica.toLowerCase().includes(p.toLowerCase()));
        
        if (esPractica || tipoPractica.startsWith("Cuestionario")) {
          const progresoId = `progreso_${nuevaEntrada.id}`;
          const progresoRef = doc(db, "users", currentUser.uid, "progreso", progresoId);
          await setDoc(progresoRef, {
            id: progresoId,
            fecha: Date.now(),
            tipoPractica: tipoPractica,
            descripcion: nuevaEntrada.texto || ""
          });
          console.log("Progreso guardado robustamente en subcolección 'progreso':", progresoId);
        }
      } catch (err) {
        console.error("Error al guardar en la subcolección de progreso:", err);
      }
    }
  };

  // Borra todo el progreso guardado en este dispositivo y reinicia la app desde cero.
  const borrarDatosGuardados = async () => {
    isDeletingRef.current = true;
    const targetUid = currentUser?.uid || auth?.currentUser?.uid;
    const targetEmail = currentUser?.email || auth?.currentUser?.email;

    // 1. Borrar documento del usuario y subcolecciones en Firestore
    if (targetUid) {
      try {
        await deleteDoc(doc(db, "users", targetUid));
      } catch (e) {
        console.warn("Aviso al eliminar documento de usuario:", e);
      }
      try {
        const subcolecciones = [
          "diario", 
          "emociones", 
          "progreso", 
          "constelaciones", 
          "comunicacion_no_violenta", 
          "reto", 
          "analisis21Dias", 
          "purchases"
        ];
        for (const sub of subcolecciones) {
          try {
            const snap = await getDocs(collection(db, "users", targetUid, sub));
            for (const docSnap of snap.docs) {
              await deleteDoc(docSnap.ref).catch(() => {});
            }
          } catch (_) {}
        }
      } catch (_) {}
    }

    // 2. Eliminar cuenta de las cuentas recordadas en el dispositivo
    if (targetEmail) {
      eliminarCuentaRecordadaLocal(targetEmail);
    }

    // 3. Borrar usuario de Firebase Auth si existe una sesión activa real
    const authUserToDelete = (auth?.currentUser && typeof auth.currentUser.delete === "function")
      ? auth.currentUser
      : (currentUser && typeof currentUser.delete === "function" ? currentUser : null);

    if (authUserToDelete) {
      try {
        await deleteUser(authUserToDelete);
      } catch (e) {
        if (e?.code === "auth/requires-recent-login") {
          console.warn("Requiere login reciente para eliminar credenciales Auth. Datos en la nube eliminados.");
          try {
            window.localStorage.setItem("suelta-y-sana:recent-login-error", "true");
          } catch (storageErr) {}
        } else {
          console.warn("Aviso al dar de baja credencial Auth:", e);
        }
      }
    }

    // 4. Cerrar sesión en Firebase Auth
    try {
      await signOut(auth);
    } catch(e) {}

    // 5. Cerrar sesión en Capacitor Google Auth si es nativo y el usuario usó Google
    try {
      const isCapacitorNative = typeof window !== "undefined" && window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform();
      const esUsuarioGoogle = window.sessionStorage.getItem("suelta_used_google_native_auth") === "true" ||
        auth?.currentUser?.providerData?.some((p) => p.providerId === "google.com");
      if (isCapacitorNative && esUsuarioGoogle) {
        try {
          const { GoogleAuth } = await import("@codetrix-studio/capacitor-google-auth");
          await GoogleAuth.initialize({
            clientId: "706031612034-8g9v90l77et2nlkkqhcjum6crnhm2eeg.apps.googleusercontent.com",
            scopes: ["profile", "email"],
            grantOfflineAccess: false,
          });
          await GoogleAuth.signOut();
        } catch (_) {}
      }
    } catch (_) {}

    // 6. Deshabilitar auto-select de Google Identity Services
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      try { window.google.accounts.id.disableAutoSelect(); } catch (_) {}
    }

    // 7. Borrar estado guardado local y marcar confirmación de borrado
    try {
      const isRecentErr = window.localStorage.getItem("suelta-y-sana:recent-login-error");
      if (!isRecentErr) {
        window.localStorage.setItem("suelta-y-sana:cuenta-eliminada-exito", "true");
      }
      localStorage.removeItem("suelta_ultima_cuenta");
      localStorage.removeItem("suelta_sesion");
      window.sessionStorage.removeItem("suelta_used_google_native_auth");
    } catch (_) {}

    ssBorrarEstadoGuardado();
    window.location.reload();
  };

  const cerrarSesion = async () => {
    isLoggingOutRef.current = true;
    try {
      const isCapacitorNative = typeof window !== "undefined" && window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform();
      const esUsuarioGoogle = window.sessionStorage.getItem("suelta_used_google_native_auth") === "true" ||
        auth?.currentUser?.providerData?.some((p) => p.providerId === "google.com");
      if (isCapacitorNative && esUsuarioGoogle) {
        try {
          const { GoogleAuth } = await import("@codetrix-studio/capacitor-google-auth");
          await GoogleAuth.initialize({
            clientId: "706031612034-8g9v90l77et2nlkkqhcjum6crnhm2eeg.apps.googleusercontent.com",
            scopes: ["profile", "email"],
            grantOfflineAccess: false,
          });
          await GoogleAuth.signOut();
        } catch (e) {
          console.warn("Aviso cerrando sesión en GoogleAuth:", e);
        }
      }
    } catch (_) {}
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      try { window.google.accounts.id.disableAutoSelect(); } catch (_) {}
    }
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    }
    ssBorrarEstadoGuardado();
    window.location.reload();
  };

  const toggleSel = (id) => {
    setSeleccion((s) => {
      const nueva = s.includes(id) ? s.filter((x) => x !== id) : [...s, id];
      if (tutorialStep === 2 && id === "historia" && nueva.includes("historia")) {
        setTutorialStep(3);
      }
      return nueva;
    });
  };

  // ===== BLOQUE USUARIO DE PRUEBA — INICIO (funciones) =====
  const cargarUsuarioPrueba = () => {
    setNombre(TEST_USER.nombre);
    setSexo(TEST_USER.sexo);
    setNacimiento(TEST_USER.nacimiento);
    setSeleccion(TEST_USER.seleccion);
    setDatos(TEST_USER.datos);
    setFamilia(TEST_USER.familia);
    setEntradas(TEST_USER.entradas);
    setRetoDiaActual(TEST_USER.retoDiaActual);
    setRetoCompletados(TEST_USER.retoCompletados);
    setRetoHistorial(TEST_USER.retoHistorial);
    setRetoCompletadosFechas({
      1: Date.now() - 4 * 24 * 60 * 60 * 1000,
      2: Date.now() - 3 * 24 * 60 * 60 * 1000,
      3: Date.now() - 2 * 24 * 60 * 60 * 1000,
      4: Date.now() - 25 * 60 * 60 * 1000,
    });
    setEsPremium(true);
    setPlanPago("anual");
    setEmail("camila@ejemplo.com");
    setNombreCompleto("Camila Restrepo Ortiz");
    setRecordatoriosReto({ activos: true, email: "camila@ejemplo.com", hora: "08:00" });
    const emStrTest = Array.isArray(TEST_USER.datos.emocion) ? TEST_USER.datos.emocion.join(" ") : (TEST_USER.datos.emocion || "");
    const combinado = [TEST_USER.datos.historia, TEST_USER.datos.fisica, emStrTest].join(" ");
    setResultados(buscarEnDiccionario(combinado));
    setStage("inicio");
  };

  const borrarUsuarioPrueba = () => {
    setNombre("");
    setSexo("");
    setNacimiento({ fecha: "", hora: "" });
    setSeleccion([]);
    setDatos({ historia: "", fisica: "", emocion: [] });
    setFamilia([]);
    setEntradas([]);
    setRetoDiaActual(1);
    setRetoCompletados([]);
    setRetoHistorial({});
    setRetoCompletadosFechas({});
    setEsPremium(true);
    setPlanPago("prueba");
    setFechaRegistroUser(Date.now());
    setEsVipUser(false);
    setDireccionEnvio({});
    setTarjeta({ numero: "", vencimiento: "", cvv: "", nombreTarjeta: "" });
    setPlanPendiente(null);
    setEmail("");
    setRecordatoriosReto({ activos: false, email: "", hora: "08:00" });
    setRegForm({ nombre: "", edad: "", sexo: "", email: "", celular: "", codigoPais: "co", apodo: "", password: "" });
    setNombreCompleto("");
    setRegDesde("bienvenida");
    setRegAceptaTerminos(false);
    setResultados([]);
    setHubItem(null);
    setStage("bienvenida");
  };
  // ===== BLOQUE USUARIO DE PRUEBA — FIN (funciones) =====

  // Exponer setters para tests automatizados y consola administrativa
  React.useEffect(() => {
    window.__setPlanPago = (plan) => {
      setPlanPago(plan);
      setEsPremium(plan === "mensual" || plan === "anual" || plan === "prueba_activa");
    };
    window.__setTrialDays = (daysLeft) => {
      const now = Date.now();
      const usedMs = (DIAS_PRUEBA_TOTAL - daysLeft) * MS_POR_DIA;
      setFechaRegistroUser(now - usedMs);
    };
    window.__setVip = (isVip) => {
      setEsVipUser(isVip);
      setEsPremium(isVip);
    };
    return () => { 
      delete window.__setPlanPago; 
      delete window.__setTrialDays; 
      delete window.__setVip; 
    };
  }, []);

  // Detecta texto que "parece" escrito al azar (mecanografía sin sentido), más allá de
  // palabras clave explícitas como "prueba": palabras largas sin ninguna vocal, tandas
  // de consonantes seguidas, letras repetidas seguidas, o la misma palabra repetida muchas veces.
  const pareceGalimatias = (t) => {
    const palabras = t.split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return false;
    const vocales = /[aeiouáéíóúü]/i;
    let sinVocal = 0;
    let consonantesSeguidas = false;
    let letraRepetida = false;
    const palabrasLargas = [];
    palabras.forEach((p) => {
      const limpio = p.replace(/[^a-zA-Záéíóúüñ]/gi, "");
      if (limpio.length >= 4) {
        palabrasLargas.push(limpio);
        if (!vocales.test(limpio)) sinVocal++;
      }
      if (/[^aeiouáéíóúü\s]{5,}/i.test(limpio)) consonantesSeguidas = true;
      if (/(.)\1{3,}/i.test(limpio)) letraRepetida = true;
    });
    const proporcionSinVocal = palabrasLargas.length ? sinVocal / palabrasLargas.length : 0;
    const sinVocalSignificativo = palabrasLargas.length >= 2 && proporcionSinVocal >= 0.5;
    // misma palabra repetida una y otra vez ("lo lo lo lo lo")
    const unicas = new Set(palabras.map((p) => p.toLowerCase()));
    const repetitivo = palabras.length >= 4 && unicas.size <= Math.ceil(palabras.length / 3);
    return sinVocalSignificativo || consonantesSeguidas || letraRepetida || repetitivo;
  };

  const detectarEntradaInvalida = (texto) => {
    const t = (texto || "").toLowerCase().trim();
    if (!t) return "vacio";
    // señales explícitas de que es una prueba
    const senales = [
      "prueba", "probando", "test", "testing", "hola mundo",
      "asdf", "qwerty", "abcde", "123", "xxx", "yyy", "zzz",
      "lorem ipsum", "ejemplo", "solo probando"
    ];
    if (senales.some((s) => t.includes(s))) return "prueba";
    // muy poca información: menos de 3 palabras y sin ninguna keyword del diccionario
    const palabras = t.split(/\s+/).filter(Boolean);
    if (palabras.length < 3) {
      const encontrado = buscarEnDiccionario(translateSearchQuery(t, idiomaDetectado));
      if (!encontrado || !encontrado.length) return "insuficiente";
    }
    // solo caracteres repetidos o sin sentido
    if (/^([a-z])\1{2,}$/i.test(t.replace(/\s/g, ""))) return "prueba";
    // texto que parece escrito al azar / sin coherencia
    if (pareceGalimatias(t)) return "prueba";
    return null;
  };

  const analizar = async () => {
    const emocionTexto = Array.isArray(datos.emocion) ? datos.emocion.join(" ") : datos.emocion || "";
    const combinado = [datos.historia, datos.fisica, emocionTexto].join(" ").trim();
    const invalido = detectarEntradaInvalida(combinado);
    if (invalido) {
      setResultados([{ __invalido: invalido }]);
      setStage("analizando");
      return;
    }
    const spanishQuery = translateSearchQuery(combinado, idiomaDetectado);
    const rawResults = buscarEnDiccionario(spanishQuery);
    const localizedResults = rawResults.map(card => translateCard(card, idiomaDetectado));
    setResultados(localizedResults);

    // Guardar en la subcolección 'emociones' de Firestore si hay un usuario logueado
    if (currentUser) {
      try {
        const idEmocion = `emocion_${Date.now()}`;
        const emocionRef = doc(db, "users", currentUser.uid, "emociones", idEmocion);
        await setDoc(emocionRef, {
          id: idEmocion,
          fecha: Date.now(),
          historia: datos.historia || "",
          fisica: datos.fisica || "",
          emocion: datos.emocion || []
        });
        console.log("Captura emocional guardada en la subcolección 'emociones':", idEmocion);
      } catch (err) {
        console.error("Error al guardar captura emocional en Firestore:", err);
      }
    }

    setStage("analizando");
  };

  // La barra de navegación inferior está SIEMPRE presente una vez el usuario tiene su
  // espacio creado (todo excepto la bienvenida y el registro, que son pantallas previas
  // a tener una identidad dentro de la app).
  const NAV_STAGES = [
    "inicio", "captura", "analizando", "diagnostico",
    "reto", "hub", "hubDetalle", "herramientas", "herramientaDetalle", "diario",
    "editarPerfil", "perfil", "cuestionarios", "cuestionarioDetalle",
  ];
  const mostrarNav = NAV_STAGES.includes(stage) && !compraExitosaModal && stage !== "pago" && stage !== "paywall" && stage !== "suscripcion" && stage !== "nacimiento" && stage !== "bienvenida" && stage !== "registro";


  const handleRestaurarComprasGooglePlay = async () => {
    try {
      const activeUser = currentUser || auth.currentUser || { uid: "guest_" + Date.now(), email: "usuario@suelta.app" };
      const res = await restaurarComprasGooglePlay(activeUser);
      if (res.restaurado && res.compra) {
        setEsPremium(true);
        setPlanPago(res.compra.planId || "anual");
        const datos = {
          plataforma: "Google Play Store",
          medioPago: res.compra.medioPago || "Google Play Billing",
          fechaTransaccion: new Date(res.compra.timestamp || Date.now()).toLocaleDateString() + " " + new Date(res.compra.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          transaccionId: res.compra.orderId || res.compra.token || "GPA.PLAY-RESTORED",
          orderId: res.compra.orderId || res.compra.token || "GPA.PLAY-RESTORED"
        };
        setDatosPagoBasico(datos);
        if (auth.currentUser) {
          try {
            const docRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(docRef, {
              subscription: {
                isActive: true,
                plan: res.compra.planId || "anual",
                startedAt: res.compra.timestamp || Date.now()
              },
              datosPagoBasico: datos,
              appState: {
                planPago: res.compra.planId || "anual",
                esPremium: true,
                datosPagoBasico: datos
              }
            }, { merge: true });
          } catch(e) {
            console.warn("Aviso sincronizando restauración:", e);
          }
        }
        setCompraExitosaModal({ datosPago: datos, planId: res.compra.planId || "anual" });
      } else {
        setErrorNotificacion(t("No se encontraron compras previas activas vinculadas a tu cuenta de Google Play.", idiomaDetectado));
      }
    } catch (e) {
      setErrorNotificacion(t("Error al consultar compras de Google Play: ", idiomaDetectado) + (e.message || ""));
    }
  };

  const HOJAS_POR_STAGE = {
    bienvenida: 1,
    inicio: 1,
    diagnostico: 2,
    paywall: 0,
    hub: 1,
    reto: 2,
    diario: 0,
    herramientas: 1,
    herramientaDetalle: 2,
    hubDetalle: 0,
  };
  const hojasVariante = HOJAS_POR_STAGE[stage];

  // Tono ambiental de 438Hz: se inicia con la primera interacción del usuario en
  // cualquier parte de la app (los navegadores bloquean audio automático sin gesto).
  const tono = useSonidoAmbiental();
  useEffect(() => {
    const iniciarConGesto = () => {
      tono.iniciar();
      document.removeEventListener("click", iniciarConGesto);
      document.removeEventListener("touchstart", iniciarConGesto);
    };
    document.addEventListener("click", iniciarConGesto);
    document.addEventListener("touchstart", iniciarConGesto);
    return () => {
      document.removeEventListener("click", iniciarConGesto);
      document.removeEventListener("touchstart", iniciarConGesto);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stage === "landing") {
    return (
      <ScreenLanding 
        onEnterApp={() => {
          window.location.hash = "#app";
          setStage(estadoGuardado.stage || (estadoGuardado.nombre ? "inicio" : "bienvenida"));
        }}
        onVerLegal={(tipo) => {
          window.location.href = `/${tipo}.html`;
        }}
      />
    );
  }


  return (
    <MenuContext.Provider value={{ onOpenMenu: () => setDrawerOpen(true), toggleMenu: () => setDrawerOpen((prev) => !prev), isDrawerOpen: drawerOpen }}>
    <div style={{ fontFamily: FONT_BODY }}>
      <GlobalStyle protoTheme={protoTheme} />
      <PhoneFrame
        stageKey={stage}
        hojasVariante={hojasVariante}
        mostrarVolver={false}
        onVolverBienvenida={() => setStage(currentUser || TEST_USER.nombre === nombre ? "inicio" : "bienvenida")}
        onSwipeRight={({ isEdge }) => handleSwipeGesture("right", isEdge)}
        onSwipeLeft={() => handleSwipeGesture("left", false)}
        protoTheme={protoTheme}
        onSelectProtoTheme={cambiarProtoTheme}
        deviceMode={deviceMode}
        onSelectDeviceMode={cambiarDeviceMode}
        isDrawerOpen={drawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
        sideDrawer={
            <SideNavDrawer
              isOpen={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              currentStage={stage}
              hubItemId={hubItem?.id}
              onNavigate={(destino, bloqueado) => {
                setDrawerOpen(false);
                navegar(destino, bloqueado);
              }}
              user={{
                nombre,
                apodo: nacimiento?.apodo,
                email,
                planPago
              }}
              idioma={idiomaDetectado}
              onOpenIdiomaModal={() => {
                setDrawerOpen(false);
                setIdiomaTemporalModal(idiomaDetectado);
                setMostrarModalIdioma(true);
              }}
              onOpenGuiaChecklist={() => {
                setDrawerOpen(false);
                setGuiaChecklistAbierta(true);
              }}
              onOpenTutorial={() => {
                setDrawerOpen(false);
                setGuiaChecklistAbierta(true);
              }}
              onVerSuscripcion={() => {
                setDrawerOpen(false);
                if (esPremium || tieneAccesoTotal || planPago === "anual" || planPago === "mensual") {
                  setStage("suscripcion");
                } else {
                  setPaywallDesde(stage);
                  setStage("paywall");
                }
              }}
              onCerrarSesion={() => {
                setDrawerOpen(false);
                cerrarSesion();
              }}
              esPremium={esPremium}
              planPago={planPago}
              tieneAccesoTotal={tieneAccesoTotal}
              enPruebaActiva={enPruebaActiva}
              diaPruebaActual={diaPruebaActual}
              diasRestantesPrueba={diasRestantesPrueba}
              pruebaExpirada={pruebaExpirada}
              onAbrirModalPrueba={() => {
                setDrawerOpen(false);
                setMostrarModalPrueba(true);
              }}
            />
        }
        bottomNav={
          mostrarNav && !algunModalAbierto ? (
            <BottomNav
              current={stage}
              hubItemId={hubItem?.id}
              onNavigate={navegar}
              esPremium={esPremium}
              enPruebaActiva={enPruebaActiva}
              planPago={planPago}
              tieneAccesoTotal={tieneAccesoTotal}
              tutorialStep={tutorialStep}
              idioma={idiomaDetectado}
            />
          ) : null
        }
      >
        {!authCargado ? (
          <div
            className="ss-fade"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              padding: "0 30px",
              textAlign: "center",
            }}
          >
            <div className="ss-logo-loading-container">
              <div className="ss-logo-loading-aura" />
              <img src={LOGO_DATA_URI} className="ss-logo-loading" alt="Cargando..." />
              <img src={FLOR_DATA_URI} className="ss-flower-orbit-cw" alt="" />
              <img src={FLOR_DATA_URI} className="ss-flower-orbit-ccw" alt="" />
            </div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 17, color: INK, margin: 0 }}>
              {t("Cargando tu espacio de bienestar...", idiomaDetectado)}
            </p>
          </div>
        ) : (
          <>
            {stage === "bienvenida" && (
          <ScreenBienvenida
            onOpenMenu={() => setDrawerOpen(true)}
            onNext={() => {
              setRegDesde("bienvenida");
              setStage("registro");
            }}
            onLogin={handleGoogleLogin}
            onLoginManual={handleEmailLogin}
            onRegisterManual={handleEmailRegister}
            onLoginOld={() => {
              borrarUsuarioPrueba();
              setEsPremium(false);
              setPlanPago("prueba");
              setStage("inicio");
            }}
            onVerLegal={(tipo) => {
              setLegalTipo(tipo);
              setLegalOrigen("bienvenida");
              setStage("legal");
            }}
            onCargarPrueba={cargarUsuarioPrueba}
            idiomaLabel={IDIOMAS_SOPORTADOS[idiomaDetectado]}
            idiomaEsEspanol={idiomaDetectado === "es"}
            onBorrarDatos={borrarDatosGuardados}
            idioma={idiomaDetectado}
            onChangeIdioma={handleGuardarIdiomaDesdeAjustes}
            onAbrirSelectorIdioma={() => {
              setIdiomaTemporalModal(idiomaDetectado);
              setMostrarModalIdioma(true);
            }}
          />
        )}
        {stage === "registro" && (
          <ScreenRegistro
            isGoogleAuth={!!currentUser}
            error={regError}
            onErrorClose={() => setRegError("")}
            form={regForm}
            setForm={setRegForm}
            aceptaTerminos={regAceptaTerminos}
            setAceptaTerminos={setRegAceptaTerminos}
            onBack={() => setStage(regDesde)}
            onIrPaso={() => {}}
            idioma={idiomaDetectado}
            onOpenIdiomaModal={() => {
              setIdiomaTemporalModal(idiomaDetectado);
              setMostrarModalIdioma(true);
            }}
            onNext={async (form) => {
              setRegError("");
              try {
                let user = currentUser;
                if (!user) {
                  const res = await createUserWithEmailAndPassword(auth, form.email, form.password);
                  user = res.user;
                }
                
                const apodoLimpio = form.apodo && form.apodo.trim();
                const nombreLimpio = apodoLimpio || form.nombre.split(" ")[0];
                
                const isVipReg = await verificarSiEsVip(form.email);
                const fechaRegNuevo = Date.now();
                const planNuevo = isVipReg ? "anual" : "prueba";

                // Guardar en Firestore
                try {
                  await setDoc(doc(db, "users", user.uid), {
                    email: form.email,
                    nombre: form.nombre.trim(),
                    apodo: apodoLimpio,
                    edad: String(form.edad),
                    sexo: form.sexo,
                    idioma: idiomaDetectado,
                    celular: form.celular ? `${(COUNTRY_CODES.find(c => c.code === form.codigoPais) || COUNTRY_CODES[0]).dial} ${form.celular}` : "",
                    fechaRegistro: fechaRegNuevo,
                    esVip: isVipReg,
                    accesoTotal: isVipReg,
                    subscription: {
                      isActive: isVipReg,
                      plan: planNuevo,
                      vip: isVipReg,
                      startedAt: fechaRegNuevo
                    },
                    planPago: planNuevo,
                    esPremium: true
                  }, { merge: true });
                } catch (e) {
                  handleFirestoreError(e, OperationType.WRITE, "users/" + user.uid);
                }
                
                setNombre(nombreLimpio);
                setSexo(form.sexo);
                if (apodoLimpio) setNacimiento((n) => ({ ...n, apodo: apodoLimpio }));
                setEmail(form.email);
                setNombreCompleto(form.nombre.trim());
                setFechaRegistroUser(fechaRegNuevo);
                setEsVipUser(isVipReg);
                setEsPremium(true);
                setPlanPago(planNuevo);
                setRecordatoriosReto((r) => ({ ...r, email: form.email }));

                // Persistir cuenta registrada de forma local
                guardarCuentaRecordadaLocal({
                  uid: user.uid,
                  email: form.email,
                  nombre: form.nombre.trim()
                });

                setStage(regDesde === "captura" ? "captura" : "postRegistro");
                setRegDesde("bienvenida");
              } catch (error) {
                console.error("Error registrando usuario:", error);
                if (error.code === 'auth/invalid-email') {
                  setRegError("El correo electrónico ingresado no es válido.");
                } else if (error.code === 'auth/email-already-in-use') {
                  setRegError("El cliente ya existe, por favor inicia sesión.");
                } else if (error.code === 'auth/weak-password') {
                  setRegError("La contraseña es muy débil. Debe tener al menos 6 caracteres.");
                } else {
                  setRegError("Error al registrarse. Por favor, intenta nuevamente.");
                }
              }
            }}
            onVerLegal={(tipo) => {
              setLegalTipo(tipo);
              setLegalOrigen("registro");
              setStage("legal");
            }}
          />
        )}
        {stage === "legal" && (
          <ScreenLegal tipo={legalTipo} onBack={() => setStage(legalOrigen)} idioma={idiomaDetectado} />
        )}
        {stage === "inicio" && (
          <ScreenInicio
            seleccion={seleccion}
            toggleSel={toggleSel}
            onNext={() => {
              if (tutorialStep === 2 || tutorialStep === 3) {
                setStage("captura");
                setTutorialStep(4);
              } else {
                setStage("captura");
              }
            }}
            nombre={nombre}
            apodo={nacimiento?.apodo}
            onBorrarPrueba={borrarUsuarioPrueba}
            retoInfo={
              esPremium
                ? {
                    dia: retoDiaActual,
                    completados: retoCompletados.length,
                    racha: retoCompletados.length,
                  }
                : null
            }
            onIrReto={() => navegar("reto")}
            entradasCount={entradas.length}
            onConfigurarCuenta={() => setStage("perfil")}
            onSuscripcion={() => setStage("suscripcion")}
            onDiario={() => navegar("diario")}
            onBorrarDatos={borrarDatosGuardados}
            onCerrarSesion={cerrarSesion}
            onAbrirGuia={() => setGuiaChecklistAbierta(true)}
            onStartTutorial={() => setGuiaChecklistAbierta(true)}
            onOpenMenu={() => setDrawerOpen(true)}
            tutorialStep={tutorialStep}
            idioma={idiomaDetectado}
            esPremium={esPremium}
            planPago={planPago}
            enPruebaActiva={enPruebaActiva}
            diaPruebaActual={diaPruebaActual}
            diasRestantesPrueba={diasRestantesPrueba}
            pruebaExpirada={pruebaExpirada}
            tieneAccesoTotal={tieneAccesoTotal}
            onAbrirModalPrueba={() => setMostrarModalPrueba(true)}
            onVerPlanes={() => {
              if (tieneSuscripcionActiva) {
                setStage("suscripcion");
              } else {
                setMostrarModalPrueba(true);
              }
            }}
          />
        )}
        {stage === "perfil" && (
          <ScreenPerfil
            nombre={nombre}
            email={email}
            planPago={planPago}
            datosPagoBasico={datosPagoBasico}
            retoDiaActual={retoDiaActual}
            retoCompletados={retoCompletados}
            entradasCount={entradas.length}
            fotoPerfil={fotoPerfil}
            onCambiarFotoPerfil={handleGuardarFotoPerfil}
            onBack={() => setStage("inicio")}
            onEditarNombre={() => setStage("editarPerfil")}
            onEditarNacimiento={() => {
              setNacimientoOrigen("perfil");
              setStage("nacimiento");
            }}
            onOpenRecordatorios={() => setStage("recordatoriosWidget")}
            onIrReto={() => navegar("reto")}
            onIrDiario={() => navegar("diario")}
            onVerSuscripcion={() => setStage("suscripcion")}
            onVerLegal={(tipo) => {
              setLegalTipo(tipo);
              setLegalOrigen("perfil");
              setStage("legal");
            }}
            onBorrarDatos={borrarDatosGuardados}
            onCerrarSesion={cerrarSesion}
            idioma={idiomaDetectado}
            onChangeIdioma={handleGuardarIdiomaDesdeAjustes}
            diaPruebaActual={diaPruebaActual}
            diasRestantesPrueba={diasRestantesPrueba}
            enPruebaActiva={enPruebaActiva}
            pruebaExpirada={pruebaExpirada}
            tieneAccesoTotal={tieneAccesoTotal}
            onAbrirModalPrueba={() => setMostrarModalPrueba(true)}
          />
        )}
        {stage === "editarPerfil" && (
          <ScreenEditarPerfil
            nombreActual={nombre}
            apodoActual={nacimiento?.apodo || ""}
            fotoActual={fotoPerfil}
            onBack={() => setStage("perfil")}
            idioma={idiomaDetectado}
            onGuardar={({ nombre: nuevoNombre, apodo: nuevoApodo, foto: nuevaFoto }) => {
              setNombre(nuevoApodo || nuevoNombre);
              setNacimiento((n) => ({ ...n, apodo: nuevoApodo }));
              if (nuevaFoto !== undefined) {
                handleGuardarFotoPerfil(nuevaFoto);
              }
              setStage("perfil");
            }}
            onVerLegal={(tipo) => {
              setLegalTipo(tipo);
              setLegalOrigen("editarPerfil");
              setStage("legal");
            }}
          />
        )}
        {stage === "suscripcion" && (
          <ScreenSuscripcion
            planPago={planPago}
            datosPagoBasico={datosPagoBasico}
            currentUser={currentUser}
            idioma={idiomaDetectado}
            tieneAccesoTotal={tieneAccesoTotal}
            enPruebaActiva={enPruebaActiva}
            pruebaExpirada={pruebaExpirada}
            diasRestantesPrueba={diasRestantesPrueba}
            onContinuarConfiguracion={() => {
              if (!nacimiento?.fecha) {
                setNacimientoOrigen("pago");
                setStage("nacimiento");
              } else {
                setStage("inicio");
              }
            }}
            onRestaurarCompras={() => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago("restaurar", "anual");
                return;
              }
              handleRestaurarComprasGooglePlay();
            }}
            onAdquirirSuscripcion={() => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago("pago", "anual");
                return;
              }
              setPaywallDesde("suscripcion");
              setStage("paywall");
            }}
            onBack={() => {
              if (currentUser || auth?.currentUser || nombre) {
                setStage("perfil");
              } else {
                setStage(nacimiento?.fecha ? "inicio" : "bienvenida");
              }
            }}
          />
        )}
        {stage === "captura" && (
          <ScreenCaptura
            seleccion={seleccion}
            datos={datos}
            setDatos={setDatos}
            onNext={analizar}
            onBack={() => setStage("inicio")}
            onIrPaso={(n) => { if (n === 1) { setRegDesde("captura"); setStage("registro"); } }}
            sexo={sexo}
            nombre={nombre}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "analizando" && <ScreenAnalizando idioma={idiomaDetectado} onDone={() => setStage("diagnostico")} />}
        {stage === "diagnostico" && (
          <ScreenLecturaBienestar
            resultados={(resultados || []).map(card => translateCard(card, idiomaDetectado))}
            datos={datos}
            nombre={nombre}
            sexo={sexo}
            idioma={idiomaDetectado}
            nacimiento={nacimiento}
            retoDiaActual={retoDiaActual}
            retoCompletados={retoCompletados}
            entradasCount={(entradas || []).length}
            apodo={nacimiento?.apodo}
            onPaywall={() => {
              // Quien ya es premium no debe volver a ver la pantalla de compra: si ya dio
              // sus datos de nacimiento, va directo a su reto; si no, solo le falta ese
              // paso (no el pago) para llegar ahí.
              if (esPremium) setStage(nacimiento?.fecha ? "reto" : "nacimiento");
              else { setPaywallDesde("diagnostico"); setStage("paywall"); }
            }}
            onBack={() => setStage("captura")}
          />
        )}
        {stage === "postRegistro" && (
          <ScreenPostRegistro
            onNext={() => {
              if (planPendiente && (regDesde === "paywall" || regDesde === "pago")) {
                if (planPendiente === "prueba") {
                  setStage("inicio");
                } else {
                  setStage("pago");
                }
              } else {
                setStage("inicio");
              }
            }}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "paywall" && (
          <ScreenPaywall
            currentUser={currentUser}
            onRequerirAuth={solicitarAutenticacionParaPago}
            onPagar={(plan) => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago(plan === "prueba" ? "prueba" : "pago", plan || "anual");
                return;
              }
              setPlanPendiente(plan || "anual");
              setStage("pago");
            }}
            onSaltar={() => setStage("inicio")}
            onBack={() => setStage(paywallDesde)}
            idioma={idiomaDetectado}
            pruebaExpirada={pruebaExpirada}
            enPruebaActiva={enPruebaActiva}
            diasRestantesPrueba={diasRestantesPrueba}
            onRestaurarCompras={() => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago("restaurar", "anual");
                return;
              }
              handleRestaurarComprasGooglePlay();
            }}
          />
        )}
        {stage === "pago" && planPendiente && (
          <ScreenPago
            plan={PLANES_PAGO.find((p) => p.id === planPendiente) || PLANES_PAGO[2]}
            currentUser={currentUser}
            onRequerirAuth={solicitarAutenticacionParaPago}
            onRestaurarCompras={() => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago("restaurar", planPendiente);
                return;
              }
              handleRestaurarComprasGooglePlay();
            }}
            onBack={() => setStage("paywall")}
            idioma={idiomaDetectado}
            onConfirmar={async (datos) => {
              const activeUid = currentUser?.uid || auth?.currentUser?.uid;
              const planEfectivo = planPendiente || datos?.planId || "mensual";
              setEsPremium(true);
              setPlanPago(planEfectivo);
              setDatosPagoBasico(datos);

              try {
                window.localStorage.setItem("suelta_es_premium", "true");
                window.localStorage.setItem("suelta_plan_pago", planEfectivo);
                if (datos) {
                  window.localStorage.setItem("suelta_datos_pago", JSON.stringify(datos));
                  window.localStorage.setItem("suelta_google_play_purchase", JSON.stringify(datos));
                }
              } catch (_) {}

              if (activeUid) {
                try {
                  const docRef = doc(db, "users", activeUid);
                  await setDoc(docRef, {
                    esPremium: true,
                    planPago: planEfectivo,
                    subscription: {
                      isActive: true,
                      plan: planEfectivo,
                      status: "ACTIVE",
                      orderId: datos?.orderId || "",
                      gateway: "google_play",
                      startedAt: Date.now()
                    },
                    datosPagoBasico: datos,
                    appState: {
                      planPago: planEfectivo,
                      esPremium: true,
                      datosPagoBasico: datos
                    }
                  }, { merge: true });
                } catch (e) {
                  console.warn("Aviso guardando suscripción en Firestore:", e);
                }
              }
              setCompraExitosaModal({ datosPago: datos, planId: planEfectivo });
            }}
          />
        )}
        {stage === "nacimiento" && (
          <ScreenNacimiento
            nacimiento={nacimiento}
            setNacimiento={setNacimiento}
            esEdicion={nacimientoOrigen === "perfil"}
            onNext={() => setStage(nacimientoOrigen === "perfil" ? "perfil" : "reto")}
            onBack={() => setStage(nacimientoOrigen === "perfil" ? "perfil" : "pago")}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "reto" && (
          <ScreenReto
            onBack={() => setStage("inicio")}
            onVerHub={() => setStage("hub")}
            retoDiaActual={retoDiaActual}
            retoCompletados={retoCompletados}
            retoHistorial={retoHistorial}
            retoCompletadosFechas={retoCompletadosFechas}
            onCompletarDia={async (dia, reflexio) => {
              setRetoCompletados((c) => (c.includes(dia) ? c : [...c, dia]));
              if (reflexio !== undefined) {
                setRetoHistorial((prev) => ({ ...prev, [dia]: reflexio }));
              }
              const fechaCompletado = Date.now();
              setRetoCompletadosFechas((prev) => ({ ...prev, [dia]: fechaCompletado }));
              if (dia === retoDiaActual && retoDiaActual < 21) {
                setRetoDiaActual(retoDiaActual + 1);
              }
              if (currentUser) {
                try {
                  const retoRef = doc(db, "users", currentUser.uid, "reto", `dia_${dia}`);
                  await setDoc(retoRef, {
                    dia: Number(dia),
                    reflexion: reflexio || "",
                    fechaCompletado: fechaCompletado
                  });
                  console.log(`Día ${dia} del reto guardado robustamente en la subcolección 'reto' de Firestore.`);
                } catch (err) {
                  console.error("Error al guardar el día del reto en Firestore:", err);
                }
              }
            }}
            recordatorios={recordatoriosReto}
            setRecordatorios={setRecordatoriosReto}
            nombre={nombre}
            sexo={sexo}
            entradas={entradas}
            analisisReporte={analisisReporte}
            setAnalisisReporte={setAnalisisReporte}
            tutorialStep={tutorialStep}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "hub" && (
          <ScreenHub
            onSelect={(item) => {
              if (item.id === "cuestionarios") {
                setStage("cuestionarios");
                return;
              }
              setHubItem(item);
              if (tutorialStep === 11 && item.id === "constelacion") {
                setTutorialStep(12);
              }
              setStage("hubDetalle");
            }}
            onDiario={() => setStage("diario")}
            onPaywall={() => { setPaywallDesde(stage); setStage("paywall"); }}
            planPago={planPago}
            esPremium={esPremium}
            enPruebaActiva={enPruebaActiva}
            pruebaExpirada={pruebaExpirada}
            tieneAccesoTotal={tieneAccesoTotal}
            tutorialStep={tutorialStep}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "hubDetalle" && hubItem && (
          <ScreenHubDetalle
            item={hubItem}
            nacimiento={nacimiento}
            nombre={nombre}
            nombreCompleto={nombreCompleto}
            sexo={sexo}
            resultados={resultados}
            familia={familia}
            setFamilia={setFamilia}
            setHubItem={setHubItem}
            onBack={() => setStage("hub")}
            onIrReto={() => setStage("hub")}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "cuestionarios" && (
          <ScreenCuestionarios
            onSelect={(q) => {
              setCuestionarioActual(q);
              setStage("cuestionarioDetalle");
            }}
            onBack={() => setStage("hub")}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "cuestionarioDetalle" && cuestionarioActual && (
          <ScreenCuestionarioDetalle
            cuestionario={cuestionarioActual}
            onBack={() => setStage("cuestionarios")}
            onSalir={() => setStage("cuestionarios")}
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario(cuestionarioActual.titulo, texto))}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientas" && (
          <ScreenHerramientas
            onSelect={(item) => {
              if (tutorialStep !== null && tutorialStep === 8 && item.id !== "respiracion") {
                console.log("Durante la guía, selecciona la herramienta de Respiración.");
                return;
              }
              setHerramientaItem(item);
              if (tutorialStep === 8 && item.id === "respiracion") {
                setTutorialStep(9);
              }
              setStage("herramientaDetalle");
            }}
            onIrDiario={() => setStage("diario")}
            silenciado={tono.silenciado}
            onAlternarSilencio={tono.alternarSilencio}
            volumen={tono.volumen}
            onCambiarVolumen={tono.cambiarVolumen}
            tutorialStep={tutorialStep}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "practicasolfeo" && (
          <ScreenSolfeoPractica 
            idioma={idiomaDetectado}
            onBack={() => setStage("herramientas")}
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Práctica con Solfeo", texto))}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "respiracion" && (
          <ScreenRespiracion 
            onBack={() => setStage("herramientas")} 
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Respiración guiada", texto))}
            tutorialStep={tutorialStep}
            onComenzarTutorial={() => {
              if (tutorialStep === 9) {
                setTutorialStep(10);
                setStage("hub"); // Paso 10 is Perspectives/Hub
              }
            }}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "presente" && (
          <ScreenPresente 
            onBack={() => setStage("herramientas")} 
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Ejercicio de presencia", texto))}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "gratitud" && (
          <ScreenGratitud
            onBack={() => setStage("herramientas")}
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Momento de gratitud", texto))}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "relajacion" && (
          <ScreenRelajacion 
            onBack={() => setStage("herramientas")} 
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Relajación corporal", texto))}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "herramientaDetalle" && herramientaItem && herramientaItem.id === "lugarseguro" && (
          <ScreenLugarSeguro 
            onBack={() => setStage("herramientas")} 
            nombre={nombre} 
            sexo={sexo} 
            onGuardar={(texto) => agregarNuevaEntrada(crearEntradaDiario("Lugar seguro", texto))}
            idioma={idiomaDetectado}
          />
        )}
        {stage === "diario" && (
          <ScreenDiario
            entradas={entradas}
            onAdd={(entrada) => agregarNuevaEntrada(entrada)}
            onHome={() => setStage("inicio")}
            idioma={idiomaDetectado}
            onRefinar={(bocetoTexto, respuestas) => {
              // Las respuestas complementarias afinan la lectura: se re-consulta el
              // diccionario sumando el nuevo texto del diario al contexto existente.
              const emStr = Array.isArray(datos.emocion) ? datos.emocion.join(" ") : (datos.emocion || "");
              const contextoPrevio = [datos.historia, datos.fisica, emStr].join(" ");
              const nuevo = `${contextoPrevio} ${bocetoTexto} ${Object.values(respuestas).join(" ")}`;
              const spanishQuery = translateSearchQuery(nuevo, idiomaDetectado);
              const refinados = buscarEnDiccionario(spanishQuery);
              if (refinados && refinados.length) {
                const localizedRefinados = refinados.map(card => translateCard(card, idiomaDetectado));
                setResultados(localizedRefinados);
              }
            }}
          />
        )}
        {stage === "recordatoriosWidget" && (
          <ScreenRecordatoriosWidget
            onOpenMenu={() => setDrawerOpen(true)}
            nombre={nombre}
            retoDiaActual={retoDiaActual}
            retoCompletados={retoCompletados}
            idioma={idiomaDetectado}
            configInicial={configRecordatorios}
            onGuardarConfig={(nuevaConfig) => {
              setConfigRecordatorios(nuevaConfig);
              if (currentUser) {
                try {
                  const docRef = doc(db, "users", currentUser.uid);
                  setDoc(docRef, {
                    configRecordatorios: nuevaConfig,
                    appState: { configRecordatorios: nuevaConfig }
                  }, { merge: true });
                } catch (e) {
                  console.error("Error guardando recordatorios en Firestore:", e);
                }
              }
            }}
            installPrompt={installPrompt}
            onBack={() => setStage("perfil")}
          />
        )}
          </>
        )}
        <GuiaChecklistPasoAPaso
          isOpen={guiaChecklistAbierta}
          onClose={() => {
            setSubmodalChecklistAbierto(false);
            setGuiaChecklistAbierta(false);
          }}
          onSubModalChange={setSubmodalChecklistAbierto}
          onNavegarModulo={(destino) => {
            setSubmodalChecklistAbierto(false);
            setGuiaChecklistAbierta(false);
            navegar(destino);
          }}
          esPremium={esPremium}
          tieneAccesoTotal={tieneAccesoTotal}
          planPago={planPago}
          enPruebaActiva={enPruebaActiva}
          diasRestantesPrueba={diasRestantesPrueba}
          onVerPlanes={() => {
            setSubmodalChecklistAbierto(false);
            setGuiaChecklistAbierta(false);
            setPaywallDesde(stage);
            setStage("paywall");
          }}
          idioma={idiomaDetectado}
        />
        <ModalSeleccionIdiomaInicial
          isOpen={mostrarModalIdioma}
          idiomaSeleccionado={idiomaTemporalModal}
          onCambiarIdiomaTemporal={setIdiomaTemporalModal}
          onConfirmar={handleConfirmarIdiomaModal}
        />
        <ModalRequiereAutenticacion
          isOpen={mostrarModalRequiereAuth}
          onClose={() => setMostrarModalRequiereAuth(false)}
          motivo={motivoRequiereAuth}
          plan={planPendiente || "anual"}
          idioma={idiomaDetectado}
          onIrRegistro={() => {
            setMostrarModalRequiereAuth(false);
            setRegDesde(stage === "pago" || stage === "paywall" || stage === "suscripcion" ? stage : "paywall");
            setStage("registro");
          }}
          onLoginGoogle={async () => {
            await handleGoogleLogin();
            setMostrarModalRequiereAuth(false);
          }}
          onLoginEmail={async (em, pw) => {
            await handleEmailLogin(em, pw);
            setMostrarModalRequiereAuth(false);
          }}
        />
        <ModalGuiaPermisosAjustes
          isOpen={!!modalPermisoAjustesTipo}
          onClose={() => setModalPermisoAjustesTipo(null)}
          tipo={modalPermisoAjustesTipo}
          idioma={idiomaDetectado}
        />
        <ModalSeleccionCuentaGoogle
          isOpen={mostrarModalGoogleInApp}
          onClose={() => setMostrarModalGoogleInApp(false)}
          onSeleccionarCuenta={handleSeleccionarCuentaGoogleInApp}
          onCredentialGoogle={handleCredentialGoogleGIS}
          onLoginGooglePopup={handleGooglePopupLogin}
          idioma={idiomaDetectado}
        />
        {errorNotificacion && typeof document !== "undefined" && createPortal(
          <div 
            data-modal-backdrop="true"
            style={{ 
              position: "fixed", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: "rgba(0,0,0,0.45)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              padding: 24, 
              zIndex: 99999,
              fontFamily: FONT_BODY,
              overscrollBehavior: "contain",
              touchAction: "none"
            }}
          >
            <div 
              data-modal-scrollable="true"
              style={{ 
                background: "white", 
                borderRadius: 24, 
                padding: "28px 24px 24px", 
                boxShadow: "0 15px 35px rgba(0,0,0,0.18)", 
                maxWidth: 320, 
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                animation: "ss-fade-scale 0.3s cubic-bezier(0.16, 1, 0.3, 1) both",
                overscrollBehavior: "contain"
              }}
            >
              {/* Alert icon or Check icon */}
              <div 
                style={{ 
                  width: 52, 
                  height: 52, 
                  borderRadius: "50%", 
                  background: (typeof errorNotificacion === "object" && errorNotificacion?.tipo === "exito") ? "rgba(76, 175, 80, 0.12)" : "rgba(138, 107, 184, 0.08)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  marginBottom: 18 
                }}
              >
                {(typeof errorNotificacion === "object" && errorNotificacion?.tipo === "exito") ? (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a6bb8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                )}
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: INK, margin: "0 0 10px", fontFamily: FONT_DISPLAY }}>
                {(typeof errorNotificacion === "object" && errorNotificacion?.titulo) ? errorNotificacion.titulo : "Aviso de seguridad"}
              </h4>
              <p style={{ fontSize: 13, color: MUTED, margin: "0 0 24px", lineHeight: 1.5, fontFamily: FONT_BODY }}>
                {typeof errorNotificacion === "object" ? errorNotificacion?.mensaje : errorNotificacion}
              </p>
              <button
                type="button"
                onClick={() => setErrorNotificacion(null)}
                className="ss-btn"
                style={{ 
                  width: "100%", 
                  background: (typeof errorNotificacion === "object" && errorNotificacion?.tipo === "exito") ? "#2e7d32" : "#8a6bb8", 
                  color: "white", 
                  fontSize: 13.5, 
                  fontWeight: 600, 
                  padding: "11px 0", 
                  borderRadius: "99px", 
                  cursor: "pointer", 
                  border: "none" 
                }}
              >
                Entendido
              </button>
            </div>
          </div>,
          document.body
        )}
        {compraExitosaModal && (
          <ModalSuscripcionAprobada
            datosPago={compraExitosaModal.datosPago}
            planId={compraExitosaModal.planId}
            currentUser={currentUser}
            idioma={idiomaDetectado}
            onContinuar={() => {
              setCompraExitosaModal(null);
              setStage("suscripcion");
            }}
          />
        )}

        {/* Modal Constante y Seguro de Período de Prueba de 3 Días */}
        {mostrarModalPrueba && !tieneSuscripcionActiva && (
          <ModalPeriodoPruebaConstante
            isOpen={mostrarModalPrueba}
            onClose={() => {
              setMostrarModalPrueba(false);
            }}
            onAdquirirSuscripcion={() => {
              setMostrarModalPrueba(false);
              setPaywallDesde(stage);
              setStage("paywall");
            }}
            diaPruebaActual={diaPruebaActual}
            diasRestantesPrueba={diasRestantesPrueba}
            pruebaExpirada={pruebaExpirada}
            tiempoTranscurrido={tiempoTranscurridoPrueba}
            onRestaurarCompras={() => {
              if (!currentUser && !auth?.currentUser) {
                solicitarAutenticacionParaPago("restaurar", "anual");
                return;
              }
              handleRestaurarComprasGooglePlay();
            }}
            idioma={idiomaDetectado}
          />
        )}
      </PhoneFrame>
    </div>
    </MenuContext.Provider>
  );
}
