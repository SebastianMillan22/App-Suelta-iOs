import React, { useState, useEffect, useRef } from "react";
import { TopBar, FRECUENCIAS_SOLFEGGIO, iniciarTonoBinaural } from "./App.jsx";
import { t } from "./data/translations.js";

const SAGE = "#6fa892";
const SAGE_DARK = "#3f6b5b";
const SAGE_TINT = "#eaf3ef";
const INK = "#25332e";
const MUTED = "#6b7b74";
const LINE = "#e1e0d6";
const FONT_BODY = "'Plus Jakarta Sans', sans-serif";
const FONT_DISPLAY = "'Plus Jakarta Sans', sans-serif";

const EMOCIONES_TRANSMUTACION = [
  {
    emocion: "Miedo o Culpa",
    hz: 396,
    icon: "🪶",
    pregunta: "¿De qué carga o expectativa te gustaría liberarte hoy con la ayuda de este tono?",
    frecuenciaLabel: "Frecuencia recomendada: 396 Hz (Liberación)"
  },
  {
    emocion: "Estancamiento o Resistencia",
    hz: 417,
    icon: "🌱",
    pregunta: "¿Qué situación o hábito del pasado sientes que es hora de soltar y transformar?",
    frecuenciaLabel: "Frecuencia recomendada: 417 Hz (Cambio y Limpieza)"
  },
  {
    emocion: "Falta de Amor Propio o Fatiga",
    hz: 528,
    icon: "🤍",
    pregunta: "Escribe una afirmación de compasión hacia ti misma en este momento. ¿Cómo te abres a recibir reparación?",
    frecuenciaLabel: "Frecuencia recomendada: 528 Hz (Amor y Milagros)"
  },
  {
    emocion: "Soledad o Tensiones Familiares",
    hz: 639,
    icon: "🕊️",
    pregunta: "¿A qué vínculo o relación te gustaría enviar hoy intenciones de empatía, perdón y armonía?",
    frecuenciaLabel: "Frecuencia recomendada: 639 Hz (Relaciones)"
  },
  {
    emocion: "Bloqueo Creativo o Timidez",
    hz: 741,
    icon: "💧",
    pregunta: "¿Qué verdad sientes que has estado callando o guardando y necesitas expresar con claridad?",
    frecuenciaLabel: "Frecuencia recomendada: 741 Hz (Expresión)"
  },
  {
    emocion: "Desorientación o Confusión",
    hz: 852,
    icon: "🕯️",
    pregunta: "Si tu intuición más profunda pudiera hablarte ahora mismo, ¿qué respuesta te daría sobre tu situación actual?",
    frecuenciaLabel: "Frecuencia recomendada: 852 Hz (Intuición)"
  },
  {
    emocion: "Vacío Espiritual o Desconexión",
    hz: 963,
    icon: "🪷",
    pregunta: "¿Qué parte de ti necesita recordar que estás unida al todo, en paz y protección absoluta?",
    frecuenciaLabel: "Frecuencia recomendada: 963 Hz (Consciencia Superior)"
  }
];

export default function ScreenSolfeoPractica({ onBack, onGuardar, idioma }) {
  const [practica, setPractica] = useState(null); // null, "resonancia", "transmutacion", "calibracion"
  const [ambiente, setAmbiente] = useState(528); // 528 Hz por defecto
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState("Preparación");
  const [ciclos, setCiclos] = useState(0);

  // States for Transmutación Emocional
  const [emocionSel, setEmocionSel] = useState(null);
  const [reflexion, setReflexion] = useState("");
  const [guardadoExitosa, setGuardadoExitosa] = useState(false);
  const [guardadoCalibracion, setGuardadoCalibracion] = useState(false);

  const handleBack = () => {
    if (practica === "resonancia" && ciclos > 0 && onGuardar) {
      onGuardar(`[Práctica Solfeggio ${ambiente}Hz - Resonancia Somática]\nSe realizó el ejercicio de Vocal Humming enfocado en la región: ${getSomaticInfo(ambiente).region} durante ${ciclos} ciclo(s).`);
    }
    setPractica(null);
    setActivo(false);
    detenerAudioDirecto();
  };

  // Sound Synth Refs
  const audioCtxRef = useRef(null);
  const sourcesRef = useRef([]);
  const gainRef = useRef(null);
  const timerRef = useRef(null);
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

  const iniciarAudio = (hzValue) => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }

    if (hzValue === "silencio") {
      detenerAudioDirecto();
      return;
    }
    
    // Si ya se está reproduciendo este mismo tono de forma activa, evitar reiniciarlo
    if (
      audioCtxRef.current &&
      sourcesRef.current.length > 0 &&
      currentFreqRef.current === hzValue
    ) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtxRef.current = new AudioContextClass();
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

    const freqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(hzValue)) || FRECUENCIAS_SOLFEGGIO[2];
    const nodes = iniciarTonoBinaural(ctx, freqObj.hz, freqObj.binauralOffset, gainRef.current);
    sourcesRef.current.push(nodes);
    currentFreqRef.current = hzValue;
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

  // Unified Audio and Practice Coordinator Hook
  useEffect(() => {
    // Si no está activo o no hay práctica seleccionada, limpiar timers y detener sonido de forma segura
    if (!activo || !practica) {
      clearTimeout(timerRef.current);
      detenerAudio();
      return;
    }

    clearTimeout(timerRef.current);

    if (practica === "resonancia") {
      iniciarAudio(ambiente);

      const secuencia = [
        { fase: "Inhala profundamente", ms: 4000 },
        { fase: "Sostén el aire y siente el centro de energía", ms: 4000 },
        { fase: "Exhala entonando un 'Mmmmmm' o 'Ahhhhh' al ritmo del sonido", ms: 5000 },
      ];
      let idx = 0;
      setFase(secuencia[0].fase);

      const avanzar = () => {
        idx = (idx + 1) % secuencia.length;
        if (idx === 0) setCiclos(c => c + 1);
        setFase(secuencia[idx].fase);
        timerRef.current = setTimeout(avanzar, secuencia[idx].ms);

        if (gainRef.current && audioCtxRef.current) {
          const ctx = audioCtxRef.current;
          const targetVol = idx === 0 ? 0.35 : idx === 1 ? 0.25 : 0.35;
          try {
            gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, ctx.currentTime);
            gainRef.current.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 1);
          } catch (e) {}
        }
      };

      timerRef.current = setTimeout(avanzar, secuencia[0].ms);

    } else if (practica === "transmutacion") {
      if (emocionSel) {
        iniciarAudio(emocionSel.hz);
      } else {
        detenerAudio();
      }
    } else if (practica === "calibracion") {
      iniciarAudio(ambiente);
    }

    return () => {
      clearTimeout(timerRef.current);
      detenerAudio();
    };
  }, [practica, activo, ambiente, emocionSel]);

  // General cleanup
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      detenerAudioDirecto();
    };
  }, []);

  const handleGuardarReflexion = () => {
    if (!reflexion.trim() || !emocionSel) return;
    const textoCompleto = `[Práctica Solfeggio ${emocionSel.hz}Hz - Transmutación de ${emocionSel.emocion}]\nPregunta: ${emocionSel.pregunta}\nReflexión: ${reflexion}`;
    if (onGuardar) onGuardar(textoCompleto);
    setGuardadoExitosa(true);
    setTimeout(() => {
      setGuardadoExitosa(false);
      setReflexion("");
      setEmocionSel(null);
      setActivo(false);
      setPractica(null);
    }, 2000);
  };

  const getSomaticInfo = (hz) => {
    switch (hz) {
      case 396: return { region: "Abdomen inferior / Cóccix", glandula: "Suprarrenales", afirmacion: "Me libero de las cargas del pasado y habito un espacio seguro." };
      case 417: return { region: "Pelvis / Sacro", glandula: "Gónadas", afirmacion: "Fluyo con el cambio y libero viejas memorias de estancamiento." };
      case 528: return { region: "Pecho / Corazón", glandula: "Timo", afirmacion: "Resueno en amor absoluto, restauración y compasión infinita." };
      case 639: return { region: "Corazón / Timo", glandula: "Timo", afirmacion: "Abro mi canal de empatía para sanar y armonizar mis relaciones." };
      case 741: return { region: "Garganta", glandula: "Tiroides", afirmacion: "Expreso mi verdad con claridad, soltando el miedo a no ser comprendido." };
      case 852: return { region: "Entrecejo / Tercer Ojo", glandula: "Pineal", afirmacion: "Me conecto con mi intuición interna para ver la verdad cristalina." };
      case 963: return { region: "Corona de la cabeza", glandula: "Pituitaria", afirmacion: "Soy parte de la unidad infinita del universo. Estoy en paz absoluta." };
      default: return { region: "Cuerpo entero", glandula: "General", afirmacion: "Vibro en armonía." };
    }
  };

  const activeFreqObj = FRECUENCIAS_SOLFEGGIO.find(f => f.hz === Number(ambiente)) || FRECUENCIAS_SOLFEGGIO[2];

  // Visual Breathing Guide
  const visualScale = fase.includes("Inhala") ? 1.6 : fase.includes("Exhala") ? 0.75 : fase.includes("Sostén") ? 1.6 : 1;
  const visualOpacity = fase.includes("Inhala") ? 0.8 : fase.includes("Exhala") ? 0.35 : fase.includes("Sostén") ? 0.95 : 0.55;

  return (
    <div className="ss-fade" style={{ 
      padding: "0", 
      minHeight: "100%", 
      flex: 1,
      display: "flex", 
      flexDirection: "column",
      background: (practica === "resonancia" && activo) ? "#0f172a" : "#f8fafc",
      transition: "background 1.5s ease-in-out",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Aura */}
      {practica && (
        <div style={{
          position: "absolute",
          top: "40%", left: "50%",
          width: 320, height: 320,
          marginLeft: -160, marginTop: -160,
          borderRadius: "50%",
          background: practica === "transmutacion" && emocionSel ? (FRECUENCIAS_SOLFEGGIO.find(f => f.hz === emocionSel.hz)?.color || "#F4E0E0") : activeFreqObj.color,
          filter: "blur(90px)",
          opacity: activo ? (practica === "resonancia" ? visualOpacity * 0.45 : 0.35) : 0.15,
          transform: `scale(${practica === "resonancia" && activo ? visualScale * 1.15 : 1})`,
          transition: "transform 4.5s ease-in-out, opacity 4.5s ease-in-out, background 1s ease",
          zIndex: 0
        }} />
      )}

      <div style={{ padding: "0 22px", zIndex: 1, paddingTop: 16 }}>
        <TopBar 
          title={practica ? t("Volver", idioma) : t("Prácticas de Solfeo", idioma)} 
          onBack={practica ? handleBack : onBack} 
          theme={(practica === "resonancia" && activo) ? "dark" : "light"}
        />
      </div>

      <div style={{ flex: 1, zIndex: 1, display: "flex", flexDirection: "column", padding: "0 22px 26px" }} className="ss-stagger">
        {!practica ? (
          // ================= MENU PRINCIPAL =================
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ color: MUTED, fontSize: 13, margin: "0 0 4px", lineHeight: 1.5 }}>
              {t("Integra el poder sanador de las frecuencias Solfeggio con ejercicios prácticos diseñados para movilizar tu energía somática y transmutar bloqueos emocionales.", idioma)}
            </p>

            {/* Tarjeta 1: Resonancia Somática */}
            <button
              onClick={() => { setPractica("resonancia"); setAmbiente(528); }}
              className="ss-card ss-card-hover"
              style={{
                background: "white",
                border: `1px solid ${LINE}`,
                borderRadius: 20,
                padding: "20px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                gap: 16,
                alignItems: "flex-start"
              }}
            >
              <div style={{ fontSize: 28, background: "#fef5ea", width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>📢</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: "0 0 4px", fontWeight: 700 }}>{t("Resonancia Somática (Vocal Humming)", idioma)}</h4>
                <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.45 }}>
                  {t("Usa tu propia voz para sintonizar and masajear órganos y glándulas endocrinas al ritmo de tonos binaurales específicos.", idioma)}
                </p>
              </div>
            </button>

            {/* Tarjeta 2: Transmutación Emocional */}
            <button
              onClick={() => { setPractica("transmutacion"); setEmocionSel(null); }}
              className="ss-card ss-card-hover"
              style={{
                background: "white",
                border: `1px solid ${LINE}`,
                borderRadius: 20,
                padding: "20px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                gap: 16,
                alignItems: "flex-start"
              }}
            >
              <div style={{ fontSize: 28, background: "#fdf4f6", width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🔥</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: "0 0 4px", fontWeight: 700 }}>{t("Armonización y Transmutación", idioma)}</h4>
                <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.45 }}>
                  {t("Identifica un nudo o emoción activa y permite que la frecuencia recomendada sostenga tu ejercicio de escritura reflexiva y catarsis.", idioma)}
                </p>
              </div>
            </button>

            {/* Tarjeta 3: Calibrador Sensorial */}
            <button
              onClick={() => { setPractica("calibracion"); setAmbiente(528); }}
              className="ss-card ss-card-hover"
              style={{
                background: "white",
                border: `1px solid ${LINE}`,
                borderRadius: 20,
                padding: "20px",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                gap: 16,
                alignItems: "flex-start"
              }}
            >
              <div style={{ fontSize: 28, background: "#eaf3ef", width: 52, height: 52, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>🎧</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: "0 0 4px", fontWeight: 700 }}>{t("Calibrador Sensorial", idioma)}</h4>
                <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.45 }}>
                  {t("Explora con total libertad los 7 tonos de bienestar, lee sus perfiles somáticos y siente dónde resuena cada vibración en tu cuerpo.", idioma)}
                </p>
              </div>
            </button>
          </div>
        ) : practica === "resonancia" ? (
          // ================= RESONANCIA SOMÁTICA =================
          <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, justifyContent: "center" }}>
            {!activo ? (
              <div className="ss-fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }}>
                  <p style={{ fontSize: 13, color: INK, margin: "0 0 12px", lineHeight: 1.5, fontWeight: 500 }}>
                    {t("1. Selecciona la frecuencia y el centro energético con el que deseas trabajar hoy:", idioma)}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "210px", overflowY: "auto", paddingRight: 4 }}>
                    
                    {/* Opción de Silencio (Predeterminado) */}
                    <button
                      onClick={() => setAmbiente("silencio")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: `1.5px solid ${ambiente === "silencio" ? SAGE_DARK : LINE}`,
                        background: ambiente === "silencio" ? SAGE_TINT : "rgba(255,255,255,0.6)",
                        color: INK,
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: FONT_BODY,
                        transition: "all 0.2s ease"
                      }}
                    >
                      <span style={{ fontSize: 18 }}>🔇</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <span style={{ fontSize: 12.5, fontWeight: 700 }}>{t("🔇 Silencio (Predeterminado)", idioma)}</span>
                        </div>
                        <div style={{ fontSize: 10.5, color: MUTED, marginTop: 1 }}>
                          {t("Práctica sin sonido de fondo", idioma)}
                        </div>
                      </div>
                    </button>

                    {FRECUENCIAS_SOLFEGGIO.map(f => {
                      const som = getSomaticInfo(f.hz);
                      return (
                        <button
                          key={f.hz}
                          onClick={() => setAmbiente(f.hz)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "10px 12px",
                            borderRadius: 12,
                            border: `1.5px solid ${ambiente === f.hz ? f.color : LINE}`,
                            background: ambiente === f.hz ? SAGE_TINT : "rgba(255,255,255,0.6)",
                            color: INK,
                            textAlign: "left",
                            cursor: "pointer",
                            fontFamily: FONT_BODY,
                            transition: "all 0.2s ease"
                          }}
                        >
                          <span style={{ fontSize: 18 }}>{f.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                              <span style={{ fontSize: 12.5, fontWeight: 700 }}>{f.hz} Hz — {t(f.intencion, idioma)}</span>
                            </div>
                            <div style={{ fontSize: 10.5, color: MUTED, marginTop: 1 }}>
                              {t("Somático:", idioma)} <strong>{t(som.region, idioma)}</strong>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 14, color: INK, margin: 0, fontWeight: 700 }}>{t("¿Cómo practicar?", idioma)}</h4>
                  <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>
                    {t("Durante la exhalación, emite un tono suave imitando el sonido que escuchas. Trata de sentir cómo la vibración física de tu propia voz reverbera específicamente en la zona corporal señalada.", idioma)}
                  </p>
                </div>

                <button
                  className="ss-btn ss-btn-primary"
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
                    setActivo(true);
                    setCiclos(0);
                  }}
                  style={{ width: "100%", marginTop: 10 }}
                >
                  {t("Comenzar práctica interactiva", idioma)}
                </button>
              </div>
            ) : (
              <div className="ss-fade" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, textAlign: "center" }}>
                <div>
                  <span style={{ fontSize: 12, color: SAGE, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>
                    {ambiente === "silencio" ? t("Resonancia en Silencio", idioma) : `${t("Resonancia", idioma)} ${ambiente} Hz`}
                  </span>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: 20, color: "white", margin: "6px 0 2px" }}>
                    {ambiente === "silencio" ? t("Enfoque en tu propia voz", idioma) : t(activeFreqObj.intencion, idioma)}
                  </h3>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                    {t("Vibración enfocada en:", idioma)} <strong>{t(getSomaticInfo(ambiente).region, idioma)}</strong>
                  </p>
                </div>

                {/* Floating Silence Trigger */}
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
                    } else {
                      setAmbiente("silencio");
                    }
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    marginBottom: -10,
                    marginTop: -10
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

                {/* Animated Somatic Pulse Core */}
                <div style={{
                  width: 150, height: 150,
                  borderRadius: "50%",
                  background: activeFreqObj.color,
                  border: `2px solid rgba(255, 255, 255, 0.15)`,
                  boxShadow: `0 0 40px ${activeFreqObj.color}44`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${visualScale})`,
                  opacity: visualOpacity,
                  transition: "transform 4s ease-in-out, opacity 4s ease-in-out",
                  position: "relative"
                }}>
                  <span style={{ fontSize: 36 }}>{ambiente === "silencio" ? "🧘" : activeFreqObj.emoji}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: activeFreqObj.text, marginTop: 4 }}>
                    {ambiente === "silencio" ? t("Silencio", idioma) : `${ambiente} Hz`}
                  </span>
                </div>

                <div style={{ minHeight: "60px", padding: "0 10px" }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "white", margin: 0, lineHeight: 1.45 }} className="ss-fade">
                    {t(fase, idioma)}
                  </p>
                  <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>
                    {fase.includes("Exhala") ? t("Emite el sonido y siente la vibración en tu cuerpo", idioma) : t("Respira con calma", idioma)}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16 }}>
                  <span style={{ fontSize: 11.5, color: "#94a3b8" }}>{t("Ciclos:", idioma)} <strong>{ciclos}</strong></span>
                  <button
                    onClick={() => {
                      if (onGuardar && ciclos > 0) {
                        onGuardar(`[Práctica Solfeggio ${ambiente}Hz - Resonancia Somática]\nSe realizó el ejercicio de Vocal Humming enfocándose en la región: ${t(getSomaticInfo(ambiente).region, idioma)} durante ${ciclos} ciclo(s).`);
                      }
                      setActivo(false);
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 12,
                      padding: "6px 14px",
                      color: "white",
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {t("Detener y terminar", idioma)}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : practica === "transmutacion" ? (
          // ================= TRANSMUTACIÓN EMOCIONAL =================
          <div className="ss-fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {!emocionSel ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <p style={{ fontSize: 13, color: MUTED, margin: "0 0 6px" }}>
                  {t("Elige la emoción o el bloqueo que sientes más latente en este momento para recibir la frecuencia y guía sugerida:", idioma)}
                </p>
                {EMOCIONES_TRANSMUTACION.map(e => (
                  <button
                    key={e.emocion}
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
                      setEmocionSel(e);
                      setActivo(true);
                      setReflexion("");
                    }}
                    className="ss-card ss-card-hover"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "white",
                      border: `1px solid ${LINE}`,
                      textAlign: "left",
                      cursor: "pointer"
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{e.icon}</span>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{t(e.emocion, idioma)}</span>
                      <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>
                        {t(e.frecuenciaLabel, idioma)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="ss-fade" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Active emotional transmutation panel */}
                <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${LINE}`, paddingBottom: 10, marginBottom: 12 }}>
                    <div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("Transmutando", idioma)}</span>
                      <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: 0, fontWeight: 700 }}>{t(emocionSel.emocion, idioma)}</h4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        onClick={() => {
                          const nextActivo = !activo;
                          if (nextActivo) {
                            if (!audioCtxRef.current) {
                              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                              if (AudioContextClass) {
                                audioCtxRef.current = new AudioContextClass();
                              }
                            }
                            if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                              audioCtxRef.current.resume();
                            }
                          }
                          setActivo(nextActivo);
                        }}
                        style={{ 
                          background: activo ? "#fee2e2" : SAGE_TINT, 
                          border: `1px solid ${activo ? "#fca5a5" : SAGE}`, 
                          borderRadius: 12, 
                          padding: "6px 14px", 
                          cursor: "pointer", 
                          fontSize: 12,
                          fontWeight: 700,
                          color: activo ? "#991b1b" : SAGE_DARK,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "all 0.2s ease"
                        }}
                        title={activo ? t("Silenciar", idioma) : t("Reproducir", idioma)}
                      >
                        <span>{activo ? `🔇 ${t("Silenciar", idioma)}` : `🔊 ${t("Activar Sonido", idioma)}`}</span>
                        <span style={{ fontSize: 11, opacity: 0.8 }}>({emocionSel.hz} Hz)</span>
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: 12, color: MUTED, fontStyle: "italic", lineHeight: 1.45, marginBottom: 14 }}>
                    {activo 
                      ? `${t("El tono de", idioma)} ${emocionSel.hz}Hz ${t("se está reproduciendo en bucle para sintonizar tu mente.", idioma)}` 
                      : t("La frecuencia de bienestar está silenciada. Puedes activarla en cualquier momento.", idioma)} {t("Lee la pregunta reflexiva con calma y escribe lo que sientas fluir:", idioma)}
                  </p>

                  <div style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px", marginBottom: 12 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: INK, margin: 0, lineHeight: 1.5 }}>
                      {t(emocionSel.pregunta, idioma)}
                    </p>
                  </div>

                  <textarea
                    value={reflexion}
                    onChange={(e) => setReflexion(e.target.value)}
                    placeholder={t("Escribe aquí de forma libre y honesta... Tu reflexión se integrará y guardará de forma segura en tu bitácora personal.", idioma)}
                    autoCorrect="on"
                    spellCheck={true}
                    autoCapitalize="sentences"
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      border: `1.5px solid ${LINE}`,
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 12.5,
                      fontFamily: FONT_BODY,
                      lineHeight: 1.5,
                      resize: "none",
                      outline: "none"
                    }}
                  />

                  {guardadoExitosa && (
                    <div style={{ background: "#eaf3ef", border: `1px solid ${SAGE}`, borderRadius: 10, padding: "8px 12px", marginTop: 10, color: SAGE_DARK, fontSize: 12, textAlign: "center", fontWeight: 600 }}>
                      {t("✓ Guardado exitosamente en tu bitácora personal.", idioma)}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button
                      className="ss-btn ss-btn-ghost"
                      onClick={() => { setEmocionSel(null); setActivo(false); }}
                      style={{ flex: 1, padding: "10px" }}
                    >
                      {t("Atrás", idioma)}
                    </button>
                    <button
                      className="ss-btn ss-btn-primary"
                      disabled={!reflexion.trim() || guardadoExitosa}
                      onClick={handleGuardarReflexion}
                      style={{ flex: 2, padding: "10px" }}
                    >
                      {t("Guardar en bitácora", idioma)}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // ================= CALIBRACIÓN SENSORIAL =================
          <div className="ss-fade" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${LINE}`, paddingBottom: 10, marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, textTransform: "uppercase" }}>{t("Calibración Libre", idioma)}</span>
                  <h4 style={{ fontFamily: FONT_DISPLAY, fontSize: 15, color: INK, margin: 0, fontWeight: 700 }}>{t("Sintonizador de 7 Frecuencias", idioma)}</h4>
                </div>
                <button
                  onClick={() => {
                    const nextActivo = !activo;
                    if (nextActivo) {
                      if (!audioCtxRef.current) {
                        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                        if (AudioContextClass) {
                          audioCtxRef.current = new AudioContextClass();
                        }
                      }
                      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
                        audioCtxRef.current.resume();
                      }
                    }
                    setActivo(nextActivo);
                  }}
                  style={{
                    background: activo ? "#fee2e2" : SAGE_TINT,
                    border: `1.5px solid ${activo ? "#fca5a5" : SAGE}`,
                    borderRadius: 10,
                    padding: "5px 12px",
                    color: activo ? "#991b1b" : SAGE_DARK,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {activo ? `🔇 ${t("Silenciar", idioma)}` : `🔊 ${t("Activar", idioma)}`}
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "200px", overflowY: "auto", paddingRight: 4 }}>
                
                {/* Opción de Silencio (Predeterminado) */}
                <button
                  onClick={() => {
                    setAmbiente("silencio");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: `1.5px solid ${ambiente === "silencio" ? SAGE_DARK : LINE}`,
                    background: ambiente === "silencio" ? SAGE_TINT : "rgba(255,255,255,0.6)",
                    color: INK,
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: FONT_BODY,
                    transition: "all 0.2s ease"
                  }}
                >
                  <span style={{ fontSize: 18 }}>🔇</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700 }}>{t("🔇 Silencio (Predeterminado)", idioma)}</span>
                    </div>
                  </div>
                </button>

                {FRECUENCIAS_SOLFEGGIO.map(f => (
                  <button
                    key={f.hz}
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
                      setAmbiente(f.hz);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: `1.5px solid ${ambiente === f.hz ? f.color : LINE}`,
                      background: ambiente === f.hz ? f.color + "20" : "rgba(255,255,255,0.6)",
                      color: INK,
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: FONT_BODY,
                      transition: "all 0.2s ease"
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{f.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700 }}>{f.hz} Hz — {t(f.intencion, idioma)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile info of selected frequency */}
            <div style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 18, padding: 16 }} className="ss-fade" key={ambiente}>
              <h5 style={{ margin: "0 0 6px", fontFamily: FONT_DISPLAY, fontSize: 13.5, color: ambiente === "silencio" ? INK : activeFreqObj.text, display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                <span>{ambiente === "silencio" ? "🔇" : activeFreqObj.emoji}</span> {ambiente === "silencio" ? t("Perfil Silencioso", idioma) : `${t("Perfil Sanador", idioma)} ${ambiente} Hz`}
              </h5>
              <p style={{ fontSize: 12, color: INK, margin: "0 0 10px", lineHeight: 1.5 }}>
                {ambiente === "silencio" 
                  ? t("Sintonización en silencio seleccionada de forma predeterminada. Elige cualquier frecuencia Solfeggio de la lista de arriba para activar su vibración relajante de fondo y leer su perfil sanador.", idioma) 
                  : t(activeFreqObj.descripcion, idioma)}
              </p>
              
              <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: MUTED }}>{t("Región Somática:", idioma)} <strong style={{ color: INK }}>{t(getSomaticInfo(ambiente).region, idioma)}</strong></span>
                <span style={{ fontSize: 11, color: MUTED }}>{t("Glándula Asociada:", idioma)} <strong style={{ color: INK }}>{t(getSomaticInfo(ambiente).glandula, idioma)}</strong></span>
                <span style={{ fontSize: 11, color: MUTED }}>{t("Decreto / Afirmación:", idioma)} <strong style={{ color: INK, fontStyle: "italic" }}>"{t(getSomaticInfo(ambiente).afirmacion, idioma)}"</strong></span>
              </div>

              {guardadoCalibracion && (
                <div style={{ background: "#eaf3ef", border: `1px solid ${SAGE}`, borderRadius: 10, padding: "8px 12px", marginTop: 10, color: SAGE_DARK, fontSize: 12, textAlign: "center", fontWeight: 600, transition: "all 0.3s ease" }}>
                  {t("✓ Sintonización guardada en tu bitácora personal.", idioma)}
                </div>
              )}

              <button
                onClick={() => {
                  if (onGuardar) {
                    if (ambiente === "silencio") {
                      onGuardar(`[Calibración Sensorial - Sintonización]\nSe sintonizó en silencio enfocado para calmar los sentidos y meditar.`);
                    } else {
                      onGuardar(`[Calibración Sensorial - Sintonización]\nSe exploró y sintonizó con la frecuencia de ${ambiente} Hz (${activeFreqObj.intencion}). Región: ${getSomaticInfo(ambiente).region}. Decreto: "${getSomaticInfo(ambiente).afirmacion}".`);
                    }
                  }
                  setGuardadoCalibracion(true);
                  setTimeout(() => setGuardadoCalibracion(false), 2500);
                }}
                className="ss-btn ss-btn-primary"
                style={{ width: "100%", marginTop: 4, padding: "10px 14px", fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                disabled={guardadoCalibracion}
              >
                <span>✨</span> {t("Registrar sintonización en mi bitácora", idioma)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
