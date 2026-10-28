import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Moon, Compass, Users, Check, ExternalLink, Activity, Award, MessageSquare } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { t } from "../data/translations.js";

const SAGE = "#6fa892";
const SAGE_DARK = "#3f6b5b";
const SAGE_TINT = "#eaf3ef";
const CREAM = "#faf8f3";
const INK = "#25332e";
const MUTED = "#6b7b74";

export default function ScreenLanding({ onEnterApp, onVerLegal, idioma = "es" }) {
  const [specialists, setSpecialists] = useState([]);
  const [loadingSpecialists, setLoadingSpecialists] = useState(true);

  useEffect(() => {
    async function fetchSpecialists() {
      try {
        const querySnapshot = await getDocs(collection(db, "specialists"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSpecialists(list);
      } catch (err) {
        console.error("Error al cargar especialistas en landing page:", err);
      } finally {
        setLoadingSpecialists(false);
      }
    }
    fetchSpecialists();
  }, []);

  // Especialista por defecto en caso de que la colección de Firestore esté vacía
  const fallbackSpecialists = [
    {
      id: "fallback-laura",
      nombre: "Laura Sanabria",
      especialidad: "Guía en Saberes Ancestrales y Herbolaria",
      descripcion: "Portadora de saberes ancestrales femeninos y herbolaria integrativa. Te acompaña a reconectar con los ciclos naturales, el útero, rituales de limpieza energética y el uso sabio de plantas para el bienestar integral.",
      email: "l.sanabria@sueltaysana.com",
      celular: "+57 310 892 4153",
      imagenUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  const listToRender = specialists.length > 0 ? specialists : fallbackSpecialists;

  return (
    <div style={{ backgroundColor: CREAM, color: INK, minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* HEADER */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(250, 248, 243, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(111,168,146,0.15)",
        padding: "16px 24px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              backgroundColor: SAGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: CREAM,
              fontWeight: "900",
              fontSize: "20px"
            }}>
              S
            </div>
            <div>
              <span style={{ fontSize: "20px", fontWeight: "900", color: SAGE_DARK, tracking: "-0.5px" }}>{t("¡SUELTA!", idioma)}</span>
              <div style={{ fontSize: "9px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "-3px" }}>LA ^ VACHE</div>
            </div>
          </div>

          <nav style={{ display: "flex", gap: "24px", fontSize: "14px", fontWeight: "500" }} className="hidden md:flex">
            <a href="#beneficios" style={{ color: MUTED, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = SAGE_DARK} onMouseOut={(e) => e.target.style.color = MUTED}>{t("Beneficios", idioma) || "Beneficios"}</a>
            <a href="#herramientas" style={{ color: MUTED, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = SAGE_DARK} onMouseOut={(e) => e.target.style.color = MUTED}>{t("Herramientas", idioma) || "Herramientas"}</a>
            <a href="#especialistas" style={{ color: MUTED, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = SAGE_DARK} onMouseOut={(e) => e.target.style.color = MUTED}>{t("Especialistas", idioma) || "Especialistas"}</a>
            <a href="#plan-bienestar" style={{ color: MUTED, textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = SAGE_DARK} onMouseOut={(e) => e.target.style.color = MUTED}>{t("Reto de 21 Días", idioma) || "Reto de 21 Días"}</a>
          </nav>

          <button 
            onClick={onEnterApp}
            style={{
              backgroundColor: SAGE_DARK,
              color: CREAM,
              border: "none",
              borderRadius: "12px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(63,107,91,0.15)",
              transition: "transform 0.2s, background-color 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = INK;
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = SAGE_DARK;
              e.target.style.transform = "translateY(0)";
            }}
          >
            {t("Abrir Aplicación", idioma) || "Abrir Aplicación"}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ position: "relative", overflow: "hidden", padding: "100px 24px 80px" }}>
        {/* Decorative subtle ambient blurs */}
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: "40%", height: "40%", background: "radial-gradient(circle, rgba(138,107,184,0.08) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(111,168,146,0.1) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: SAGE_TINT,
            color: SAGE_DARK,
            padding: "8px 16px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "600",
            marginBottom: "24px"
          }}>
            <Sparkles size={14} />
            <span>{t("La primera app interactiva de Biodescodificación", idioma) || "La primera app interactiva de Biodescodificación"}</span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(32px, 6vw, 64px)",
            fontWeight: "900",
            lineHeight: "1.1",
            color: INK,
            marginBottom: "24px",
            letterSpacing: "-1.5px"
          }}>
            {idioma === "en" ? (
              <>Learn to listen to the language of your body and <span style={{ color: SAGE_DARK, fontStyle: "italic" }}>let go</span> of what no longer belongs to you</>
            ) : idioma === "fr" ? (
              <>Apprenez à écouter le langage de votre corps et <span style={{ color: SAGE_DARK, fontStyle: "italic" }}>lâchez prise</span> sur ce qui ne vous appartient plus</>
            ) : idioma === "it" ? (
              <>Impara ad ascoltare il linguaggio del tuo corpo e <span style={{ color: SAGE_DARK, fontStyle: "italic" }}>lascia andare</span> ciò che non ti appartiene</>
            ) : (
              <>Aprende a escuchar el lenguaje de tu cuerpo y <span style={{ color: SAGE_DARK, fontStyle: "italic" }}>suelta</span> lo que no te pertenece</>
            )}
          </h1>

          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: MUTED,
            maxWidth: "700px",
            margin: "0 auto 40px",
            lineHeight: "1.6"
          }}>
            {t("Biodescodificación, constelaciones familiares, astronomía ancestral y frecuencias de solfeo. Tu espacio personal de bienestar e introspección emocional profunda en un solo lugar.", idioma)}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={onEnterApp}
              style={{
                backgroundColor: SAGE_DARK,
                color: CREAM,
                border: "none",
                borderRadius: "14px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(63,107,91,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = INK;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = SAGE_DARK;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span>{t("Comenzar gratis hoy", idioma)}</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="#herramientas"
              style={{
                backgroundColor: "transparent",
                color: SAGE_DARK,
                border: `2px solid ${SAGE}`,
                borderRadius: "14px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "700",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = SAGE_TINT;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              {t("Conocer herramientas", idioma)}
            </a>
          </div>
        </div>
      </section>

      {/* CORE BENEFITS (Módulos principales) */}
      <section id="beneficios" style={{ padding: "80px 24px", backgroundColor: "#fbfaf7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "900", color: INK, letterSpacing: "-1px" }}>
              {t("Nuestros Pilares de Crecimiento", idioma)}
            </h2>
            <p style={{ color: MUTED, fontSize: "16px", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>
              {t("Fusionamos la sabiduría ancestral con herramientas científicas de introspección para ayudarte a alcanzar la plenitud física y mental.", idioma)}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {/* Pilar 1 */}
            <div style={{ backgroundColor: CREAM, padding: "40px", borderRadius: "20px", border: "1px solid rgba(111,168,146,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.01)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", backgroundColor: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center", color: SAGE_DARK, marginBottom: "24px" }}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", color: INK, marginBottom: "14px" }}>{t("Biodescodificación", idioma)}</h3>
              <p style={{ color: MUTED, fontSize: "15px", lineHeight: "1.6" }}>
                {t("Identifica las emociones no resueltas y traumas transgeneracionales que se manifiestan como dolencias o patrones corporales. El cuerpo grita lo que el alma calla.", idioma)}
              </p>
            </div>

            {/* Pilar 2 */}
            <div style={{ backgroundColor: CREAM, padding: "40px", borderRadius: "20px", border: "1px solid rgba(111,168,146,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.01)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "rgba(138,107,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a6bb8", marginBottom: "24px" }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", color: INK, marginBottom: "14px" }}>{t("Astrología & Carta Natal", idioma)}</h3>
              <p style={{ color: MUTED, fontSize: "15px", lineHeight: "1.6" }}>
                {t("Calcula al instante tu Carta Astral y tu signo del Tonalpohualli (horóscopo azteca) para comprender tu plan vital de nacimiento, tus regentes cósmicos y tu numerología sagrada.", idioma)}
              </p>
            </div>

            {/* Pilar 3 */}
            <div style={{ backgroundColor: CREAM, padding: "40px", borderRadius: "20px", border: "1px solid rgba(111,168,146,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.01)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "12px", backgroundColor: "rgba(214,71,43,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D6472B", marginBottom: "24px" }}>
                <Moon size={24} />
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: "700", color: INK, marginBottom: "14px" }}>{t("Frecuencias de Solfeo", idioma)}</h3>
              <p style={{ color: MUTED, fontSize: "15px", lineHeight: "1.6" }}>
                {t("Utiliza terapia sonora activa basada en frecuencias de solfeo antiguas (como 528Hz para reparación o 417Hz para remover bloqueos) con un oscilador de audio de alta precisión.", idioma)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETALLE DE HERRAMIENTAS DE LA APP (MOCKUPS/TEXTO) */}
      <section id="herramientas" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
            {/* Bloque 1 */}
            <div style={{ display: "grid", gap: "40px", alignItems: "center" }} className="grid md:grid-cols-2">
              <div>
                <span style={{ fontSize: "13px", fontWeight: "700", color: SAGE_DARK, textTransform: "uppercase", letterSpacing: "1.5px" }}>{t("Análisis Inteligente", idioma)}</span>
                <h3 style={{ fontSize: "32px", fontWeight: "900", color: INK, margin: "10px 0 20px", letterSpacing: "-1px" }}>{t("Mi Diario Emocional & Retos", idioma)}</h3>
                <p style={{ color: MUTED, fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
                  {t("Un espacio de diario con formato Bullet Journal donde registras tus horas de sueño, nivel de energía, emociones diarias y viñetas personalizadas. Al cabo de 21 días, nuestro algoritmo realiza un análisis profundo de tus patrones de escritura.", idioma)}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center", color: SAGE_DARK }}><Check size={12} /></div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>{t("Detección de emociones dominantes", idioma)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center", color: SAGE_DARK }}><Check size={12} /></div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>{t("Análisis de patrones de expresión de sentimientos", idioma)}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: SAGE_TINT, display: "flex", alignItems: "center", justifyContent: "center", color: SAGE_DARK }}><Check size={12} /></div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>{t("Recomendaciones de entorno e introspección", idioma)}</span>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: "#faf8f3", border: `1px solid rgba(111,168,146,0.2)`, borderRadius: "20px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
                <div style={{ borderBottom: "1px solid #f0efe6", paddingBottom: "15px", marginBottom: "15px" }}>
                  <div style={{ fontSize: "12px", color: MUTED }}>{t("Diario Personal de Hoy", idioma)}</div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: SAGE_DARK }}>"{t("Mi espacio para soltar", idioma)}"</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" }}>
                  <span style={{ backgroundColor: "#f0f7f4", color: SAGE_DARK, padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>💡 {t("Comprensión", idioma)}</span>
                  <span style={{ backgroundColor: "#fbf3f0", color: "#d6472b", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>🌿 {t("Calma interior", idioma)}</span>
                  <span style={{ backgroundColor: "#f3eefc", color: "#8a6bb8", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>🌀 {t("Liberación", idioma)}</span>
                </div>
                <p style={{ fontSize: "13px", color: MUTED, fontStyle: "italic", lineHeight: "1.5" }}>
                  "{t("Hoy logré comprender que el dolor en mi garganta se asocia con aquello que no expresé durante mi última conversación. Decido soltar el miedo y hablar desde el amor propio...", idioma)}"
                </p>
                <div style={{ display: "flex", gap: "15px", marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #f0efe6" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "10px", color: MUTED }}>{t("Energía", idioma)}</div>
                    <div style={{ height: "6px", backgroundColor: "#e2e8f0", borderRadius: "3px", marginTop: "4px" }}><div style={{ width: "80%", height: "100%", backgroundColor: SAGE, borderRadius: "3px" }}></div></div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "10px", color: MUTED }}>{t("Sueño", idioma)}</div>
                    <div style={{ fontSize: "12px", fontWeight: "700", marginTop: "2px" }}>8.5 {t("horas", idioma)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIALISTAS INTEGRADOS DESDE FIRESTORE */}
      <section id="especialistas" style={{ padding: "80px 24px", backgroundColor: SAGE_TINT }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: SAGE_DARK, textTransform: "uppercase", letterSpacing: "1.5px" }}>{t("Red Profesional", idioma)}</span>
            <h2 style={{ fontSize: "36px", fontWeight: "900", color: INK, marginTop: "10px", letterSpacing: "-1px" }}>
              {t("Nuestros Especialistas & Acompañantes", idioma)}
            </h2>
            <p style={{ color: MUTED, fontSize: "16px", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0" }}>
              {t("Terapeutas y psicólogos holísticos certificados que pueden guiarte individualmente en tu proceso de biodescodificación y sanación.", idioma)}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {listToRender.map((spec, i) => (
              <div 
                key={spec.id || i}
                style={{ 
                  backgroundColor: CREAM, 
                  borderRadius: "20px", 
                  padding: "30px", 
                  border: "1px solid rgba(111,168,146,0.1)",
                  boxShadow: "0 10px 25px rgba(63,107,91,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                    <img 
                      src={spec.imagenUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"} 
                      alt={spec.nombre}
                      referrerPolicy="no-referrer"
                      style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: `2px solid ${SAGE}` }}
                    />
                    <div>
                      <h4 style={{ fontSize: "18px", fontWeight: "800", color: INK, margin: 0 }}>{spec.nombre}</h4>
                      <span style={{ fontSize: "13px", color: SAGE_DARK, fontWeight: "600", display: "block", marginTop: "2px" }}>{t(spec.especialidad, idioma)}</span>
                    </div>
                  </div>
                  <p style={{ color: MUTED, fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
                    {t(spec.descripcion, idioma)}
                  </p>
                </div>
                
                <div style={{ borderTop: "1px solid #f0efe6", paddingTop: "15px", display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: MUTED }}>{t("Correo:", idioma)}</span>
                    <a href={`mailto:${spec.email}`} style={{ color: SAGE_DARK, fontWeight: "600", textDecoration: "none" }}>{spec.email}</a>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: MUTED }}>{t("Contacto:", idioma)}</span>
                    <span style={{ color: INK, fontWeight: "600" }}>{spec.celular}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION/RETO DE 21 DIAS */}
      <section id="plan-bienestar" style={{ padding: "80px 24px", backgroundColor: "#fbfaf7" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "900", color: INK, letterSpacing: "-1px" }}>
            {t("El Reto de 21 Días de ¡Suelta!", idioma)}
          </h2>
          <p style={{ color: MUTED, fontSize: "16px", marginTop: "12px", marginBottom: "40px" }}>
            {t("La neurociencia demuestra que se requieren 21 días para codificar un hábito emocional y reconfigurar tu sistema nervioso. Nuestro reto paso a paso te guía diariamente.", idioma)}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left", marginBottom: "40px" }}>
            <div style={{ backgroundColor: CREAM, padding: "20px", borderRadius: "14px", border: "1px solid rgba(111,168,146,0.1)" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <span style={{ fontSize: "18px", fontWeight: "900", color: SAGE_DARK }}>01</span>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: INK, margin: 0 }}>{t("Fase de Diagnóstico y Toma de Conciencia", idioma)}</h4>
                  <p style={{ color: MUTED, fontSize: "14px", marginTop: "4px", margin: "4px 0 0", lineHeight: "1.5" }}>{t("Identifica qué dolencia física o conflicto relacional está frenando tu tranquilidad mediante la biodescodificación guiada.", idioma)}</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: CREAM, padding: "20px", borderRadius: "14px", border: "1px solid rgba(111,168,146,0.1)" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <span style={{ fontSize: "18px", fontWeight: "900", color: SAGE_DARK }}>02</span>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: INK, margin: 0 }}>{t("Práctica Diaria Vibracional", idioma)}</h4>
                  <p style={{ color: MUTED, fontSize: "14px", marginTop: "4px", margin: "4px 0 0", lineHeight: "1.5" }}>{t("Ejercicios de respiración diafragmática, reconexión con el presente, listas de gratitud activa y estimulación mediante frecuencias solfeo.", idioma)}</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: CREAM, padding: "20px", borderRadius: "14px", border: "1px solid rgba(111,168,146,0.1)" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <span style={{ fontSize: "18px", fontWeight: "900", color: SAGE_DARK }}>03</span>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: INK, margin: 0 }}>{t("Análisis Algorítmico Final", idioma)}</h4>
                  <p style={{ color: MUTED, fontSize: "14px", marginTop: "4px", margin: "4px 0 0", lineHeight: "1.5" }}>{t("Al completar el reto, se emite un reporte integral con tu patrón emocional primario y recomendaciones de largo plazo.", idioma)}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onEnterApp}
            style={{
              backgroundColor: SAGE_DARK,
              color: CREAM,
              border: "none",
              borderRadius: "14px",
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(63,107,91,0.2)",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = INK;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = SAGE_DARK;
            }}
          >
            {t("Aceptar el Reto Hoy", idioma)}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: INK,
        color: "#b0c4bc",
        padding: "60px 24px 30px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontSize: "14px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "40px", marginBottom: "40px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: SAGE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: CREAM,
                  fontWeight: "900",
                  fontSize: "16px"
                }}>
                  S
                </div>
                <span style={{ fontSize: "18px", fontWeight: "900", color: CREAM, tracking: "-0.5px" }}>¡SUELTA!</span>
              </div>
              <p style={{ maxWidth: "280px", color: "#879c93", lineHeight: "1.5", fontSize: "13px" }}>
                {t("Un espacio digital enfocado en el bienestar holístico, la biodescodificación, la astrología profunda y la reconciliación interior.", idioma)}
              </p>
              <div style={{ marginTop: "15px", fontSize: "11px", color: "#566b62", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {t("Un producto de LA ^ VACHE © 2026", idioma)}
              </div>
            </div>

            <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
              <div>
                <h4 style={{ color: CREAM, fontSize: "14px", fontWeight: "700", marginBottom: "15px" }}>{t("Legales", idioma)}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href="/terminos.html" style={{ color: "#879c93", textDecoration: "none" }} onMouseOver={(e) => e.target.style.color = CREAM} onMouseOut={(e) => e.target.style.color = "#879c93"}>{t("Términos y Condiciones", idioma)}</a>
                  <a href="/privacidad.html" style={{ color: "#879c93", textDecoration: "none" }} onMouseOver={(e) => e.target.style.color = CREAM} onMouseOut={(e) => e.target.style.color = "#879c93"}>{t("Política de Privacidad", idioma)}</a>
                  <a href="/eliminar-datos.html" style={{ color: "#879c93", textDecoration: "none" }} onMouseOver={(e) => e.target.style.color = CREAM} onMouseOut={(e) => e.target.style.color = "#879c93"}>{t("Eliminación de Datos", idioma)}</a>
                </div>
              </div>

              <div>
                <h4 style={{ color: CREAM, fontSize: "14px", fontWeight: "700", marginBottom: "15px" }}>{t("Administración", idioma)}</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href="#admin" style={{ color: "#879c93", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }} onMouseOver={(e) => e.target.style.color = CREAM} onMouseOut={(e) => e.target.style.color = "#879c93"}>
                    <span>{t("Acceso Administrador", idioma)}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            color: "#566b62"
          }}>
            {t("La información expuesta en este sitio y en la aplicación no reemplaza la consulta o terapia médica y psicológica profesional certificada.", idioma)}
          </div>
        </div>
      </footer>
    </div>
  );
}
