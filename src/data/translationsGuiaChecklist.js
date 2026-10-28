// Localized Data and UI for Roadmap & Module Checklist (GuiaChecklistPasoAPaso)
// Supports app languages: es (Español), en (English), fr (Français), it (Italiano)

export function getLocalizedGuiaUI(idioma = "es") {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";

  const ui = {
    es: {
      tituloModal: "Guía y Checklist de Módulos",
      subtituloModal: "Paso a paso interactivo y comprensible",
      tuProgreso: "Tu Progreso en Suelta",
      pasoBadge: "Paso del Checklist",
      completadoBadge: "Completado",
      queEsTitulo: "¿En qué consiste este paso?",
      quePuedesHacerTitulo: "Lo que puedes hacer y practicar:",
      irAModulo: "Ir a este módulo ahora",
      marcarCompletado: "Marcar como completado en checklist",
      desmarcarCompletado: "Desmarcar del checklist",
      cerrar: "Cerrar",
      tarjetaInicioTitulo: "Inicia aquí: Guía paso a paso",
      tarjetaInicioSub: "Conoce cada módulo y lo que puedes hacer",
      badgeBloqueado: "🔒 Premium",
      badgeAnual: "💎 Anual",
      badgeDesbloqueado: "✓ Desbloqueado",
      badgePrueba: "🌱 En tu prueba",
      bannerActivoTitulo: "Tu Suscripción está Activa",
      bannerActivoSub: "Disfruta de acceso ilimitado a todas tus herramientas de bienestar.",
      bannerActivoBtn: "Ver detalles de mi suscripción",
      bannerPruebaTitulo: "Desbloquea todos los módulos con 3 días gratis",
      bannerPruebaSub: "Cancela en cualquier momento sin penalizaciones.",
      bannerPruebaBtn: "Ver Planes y Activar Prueba"
    },
    en: {
      tituloModal: "Roadmap & Module Guide",
      subtituloModal: "Step-by-step interactive onboarding",
      tuProgreso: "Your Progress in Suelta",
      pasoBadge: "Roadmap Step",
      completadoBadge: "Completed",
      queEsTitulo: "What is this step?",
      quePuedesHacerTitulo: "What you can practice & explore:",
      irAModulo: "Go to this module now",
      marcarCompletado: "Mark as completed in checklist",
      desmarcarCompletado: "Unmark from checklist",
      cerrar: "Close",
      tarjetaInicioTitulo: "Start Here: Module Guide",
      tarjetaInicioSub: "Understand all your available features",
      badgeBloqueado: "🔒 Premium",
      badgeAnual: "💎 Annual",
      badgeDesbloqueado: "✓ Unlocked",
      badgePrueba: "🌱 In your trial",
      bannerActivoTitulo: "Your Subscription is Active",
      bannerActivoSub: "Enjoy unlimited access to all your wellness tools and modules.",
      bannerActivoBtn: "View Subscription Details",
      bannerPruebaTitulo: "Unlock All Modules with 3-Day Free Trial",
      bannerPruebaSub: "Cancel anytime. Google Play billing protection.",
      bannerPruebaBtn: "View Plans & Activate Trial"
    },
    pt: {
      tituloModal: "Guia & Checklist de Módulos",
      subtituloModal: "Passo a passo interativo e compreensível",
      tuProgreso: "Seu Progresso no Suelta",
      pasoBadge: "Passo do Guia",
      completadoBadge: "Concluído",
      queEsTitulo: "O que é este módulo?",
      quePuedesHacerTitulo: "O que você pode fazer e praticar:",
      irAModulo: "Ir a este módulo agora",
      marcarCompletado: "Marcar como concluído no checklist",
      desmarcarCompletado: "Desmarcar do checklist",
      cerrar: "Fechar",
      tarjetaInicioTitulo: "Comece Aqui: Guia de Módulos",
      tarjetaInicioSub: "Conheça seus módulos disponíveis e práticas",
      badgeBloqueado: "🔒 Premium",
      badgeAnual: "💎 Anual",
      badgeDesbloqueado: "✓ Desbloqueado",
      badgePrueba: "🌱 No seu teste",
      bannerActivoTitulo: "Sua Assinatura está Ativa",
      bannerActivoSub: "Aproveite acesso ilimitado a todas as ferramentas de bem-estar.",
      bannerActivoBtn: "Ver detalhes da assinatura",
      bannerPruebaTitulo: "Desbloqueie todos os módulos com 3 dias grátis",
      bannerPruebaSub: "Cancele a qualquer momento sem penalidades.",
      bannerPruebaBtn: "Ver Planos e Ativar Teste"
    },
    fr: {
      tituloModal: "Guide & Checklist des Modules",
      subtituloModal: "Parcours pas à pas interactif et accessible",
      tuProgreso: "Votre Progression dans Suelta",
      pasoBadge: "Étape du Guide",
      completadoBadge: "Terminé",
      queEsTitulo: "En quoi consiste cette étape ?",
      quePuedesHacerTitulo: "Ce que vous pouvez pratiquer et explorer :",
      irAModulo: "Accéder à ce module maintenant",
      marcarCompletado: "Marquer comme terminé dans la checklist",
      desmarcarCompletado: "Décocher de la checklist",
      cerrar: "Fermer",
      tarjetaInicioTitulo: "Commencez ici : Guide pas à pas",
      tarjetaInicioSub: "Découvrez chaque module et ses bienfaits",
      badgeBloqueado: "🔒 Premium",
      badgeAnual: "💎 Annuel",
      badgeDesbloqueado: "✓ Débloqué",
      badgePrueba: "🌱 Pendant votre essai",
      bannerActivoTitulo: "Votre Abonnement est Actif",
      bannerActivoSub: "Profitez d'un accès illimité à tous vos outils de bien-être.",
      bannerActivoBtn: "Voir les détails de l'abonnement",
      bannerPruebaTitulo: "Débloquez tous les modules avec 3 jours gratuits",
      bannerPruebaSub: "Annulez à tout moment sans pénalités. Sécurisé par Google Play.",
      bannerPruebaBtn: "Voir les Formules et Activer l'Essai"
    },
    it: {
      tituloModal: "Guida e Checklist dei Moduli",
      subtituloModal: "Percorso interattivo e intuitivo passo dopo passo",
      tuProgreso: "Il Tuo Progresso in Suelta",
      pasoBadge: "Passaggio della Guida",
      completadoBadge: "Completato",
      queEsTitulo: "In cosa consiste questo passaggio?",
      quePuedesHacerTitulo: "Cosa puoi fare e praticare:",
      irAModulo: "Vai a questo modulo adesso",
      marcarCompletado: "Segna come completato nella checklist",
      desmarcarCompletado: "Deseleziona dalla checklist",
      cerrar: "Chiudi",
      tarjetaInicioTitulo: "Inizia qui: Guida passo dopo passo",
      tarjetaInicioSub: "Scopri ciascun modulo e cosa puoi fare",
      badgeBloqueado: "🔒 Premium",
      badgeAnual: "💎 Annuale",
      badgeDesbloqueado: "✓ Sbloccato",
      badgePrueba: "🌱 Nella tua prova",
      bannerActivoTitulo: "Il Tuo Abbonamento è Attivo",
      bannerActivoSub: "Approfitta dell'accesso illimitato a tutti gli strumenti di benessere.",
      bannerActivoBtn: "Vedi dettagli abbonamento",
      bannerPruebaTitulo: "Sblocca tutti i moduli con 3 giorni gratuiti",
      bannerPruebaSub: "Cancella in qualsiasi momento senza penali. Protetto da Google Play.",
      bannerPruebaBtn: "Vedi Piani e Attiva Prova"
    }
  };

  return ui[lang] || ui.es;
}

export function getLocalizedEstructuraGuia(idioma = "es", context = {}) {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";
  const {
    esUsuarioSubscrito = false,
    enPruebaActiva = false,
    planPago = "prueba",
    tieneAccesoTotal = false,
    diasRestantesPrueba = 0
  } = context;

  const data = {
    es: [
      {
        id: "iniciaAqui",
        titulo: "1. Inicia aquí",
        subtitulo: "Primeros pasos para entender y transformar tu bienestar",
        items: [
          {
            id: "bienvenido",
            titulo: "Bienvenido a Suelta",
            icono: "🤝",
            descCorta: "Comprende el propósito y cómo opera el bienestar integral",
            contenidoLargo: {
              queEs: "Suelta es una plataforma de acompañamiento y liberación bioemocional que conecta cuerpo, mente y energía a través de la Biodescodificación, la Nueva Medicina Germánica (NMG), el autoconocimiento astrológico y la sonoterapia.",
              quePuedesHacer: [
                "Identificar qué conflicto emocional se esconde detrás de tus dolores o síntomas físicos",
                "Realizar prácticas diarias de respiración y registrar tus sentires en tu diario somático",
                "Armonizar tu sistema nervioso con frecuencias puras de Solfeo",
                "Descubrir tus cartas natal, astral y azteca para comprender tu mapa de vida"
              ],
              accionTexto: "Ir a la pantalla principal",
              destino: "inicio"
            }
          },
          {
            id: "camino",
            titulo: "Encuentra tu camino",
            icono: "🧭",
            descCorta: "Cómo empezar según si buscas calma, claridad o sanar un síntoma",
            contenidoLargo: {
              queEs: "Tu camino de sanación es personal. Puedes ingresar a la app por diferentes puertas según tu necesidad inmediata:",
              quePuedesHacer: [
                "Si sientes ansiedad o insomnio: Ve a 'Calma' para escuchar frecuencias Solfeo y respirar",
                "Si tienes un dolor o síntoma físico: Ve a 'Diario' y toca la parte del cuerpo en el mapa somático",
                "Si buscas constancia y sanación emocional: Inicia el 'Reto de 21 días'",
                "Si deseas entender tu propósito y raíces: Ve a 'Perspectivas' para ver tus cartas y constelaciones"
              ],
              accionTexto: "Abrir Diario Somático",
              destino: "diario"
            }
          },
          {
            id: "pilares",
            titulo: "Pilares de la Metodología",
            icono: "🏛️",
            descCorta: "Biodescodificación, NMG, Astrología y Constelaciones Familiares",
            contenidoLargo: {
              queEs: "Nuestra metodología integra 4 pilares complementarios para una sanación consciente y profunda:",
              quePuedesHacer: [
                "1. Biodescodificación: Cada órgano expresa un conflicto biológico no resuelto",
                "2. Nueva Medicina Germánica: La enfermedad como respuesta biológica de adaptación y supervivencia",
                "3. Arquetipos Astrológicos: Tu carta natal, astral y azteca como espejo de tu psique",
                "4. Constelaciones Familiares: Desatar nudos transgeneracionales y honrar tu linaje"
              ],
              accionTexto: "Ver perspectivas y constelaciones",
              destino: "hub"
            }
          },
          {
            id: "habito",
            titulo: "Práctica de Consciencia Diaria",
            icono: "🧘‍♀️",
            descCorta: "5 minutos al día para registrar tus emociones y liberar tensiones",
            contenidoLargo: {
              queEs: "El bienestar se construye día a día. Dedicar solo 5 minutos a escuchar tu cuerpo y completar tu día del reto transforma tus patrones emocionales.",
              quePuedesHacer: [
                "Registrar tu estado emocional en el Diario con nota o voz",
                "Hacer 3 minutos de respiración consciente guiada",
                "Completar el ejercicio del día en el Reto de 21 días",
                "Activar recordatorios conscientes en tu dispositivo"
              ],
              accionTexto: "Comenzar Reto de 21 Días",
              destino: "reto"
            }
          }
        ]
      },
      {
        id: "modulos",
        titulo: "2. Revisa los módulos y lo que puedes hacer",
        subtitulo: "Explicación clara de cada módulo y cómo aprovecharlo al máximo",
        items: [
          {
            id: "mod_reto",
            titulo: "Reto de 21 Días de Liberación",
            icono: "🎯",
            etapa: "reto",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Acompañamiento día a día con audios, preguntas y tareas reflexivas",
            contenidoLargo: {
              queEs: "Un programa de 21 días progresivos diseñado para reprogramar patrones inconscientes, sanar heridas del pasado y reconectar con tu paz interior.",
              quePuedesHacer: [
                "Escuchar la reflexión en audio de cada día",
                "Responder las preguntas guiadas de autoindagación",
                "Seguir tu racha de días completados",
                "Reprogramar creencias limitantes paso a paso"
              ],
              accionTexto: "Ir al Reto de 21 Días",
              destino: "reto"
            }
          },
          {
            id: "mod_calma",
            titulo: "Calma: Frecuencias Solfeo & Respiración",
            icono: "🎵",
            etapa: "herramientas",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "parcial"),
            descCorta: "Tonos puros de armonización celular y técnicas de respiración somática",
            contenidoLargo: {
              queEs: "Tu espacio sonoro y somático con frecuencias puras de Solfeo (396Hz liberación, 528Hz transformación, 852Hz intuición...) y técnicas de respiración 4-7-8 y coherencia cardíaca.",
              quePuedesHacer: [
                "Reproducir frecuencias sagradas mientras meditas o descansas",
                "Realizar sesiones de respiración guiada con animación somática",
                "Activar temporizador para dormir o trabajar en calma",
                "Regular tu ritmo cardíaco en minutos"
              ],
              accionTexto: "Ir a Módulo de Calma",
              destino: "herramientas"
            }
          },
          {
            id: "mod_hub",
            titulo: "Perspectivas: Cartas & Constelaciones",
            icono: "🌌",
            etapa: "hub",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Tus cartas completas, lecturas de constelación familiar y cuestionarios",
            contenidoLargo: {
              queEs: "El centro de autoconocimiento profundo. Calcula con precisión astronómica tus cartas Natal, Astral y Azteca según tu fecha y lugar de nacimiento, e integra dinámicas de constelaciones familiares.",
              quePuedesHacer: [
                "Descubrir tus planetas, casas y aspectos astrológicos personalizados",
                "Conocer tu signo azteca y animal protector (nahual)",
                "Hacer lecturas de constelaciones para sanar lazos familiares",
                "Resolver cuestionarios de bienestar emocional y apego"
              ],
              accionTexto: "Ir a Perspectivas",
              destino: "hub"
            }
          },
          {
            id: "mod_diario",
            titulo: "Diario Somático & Mapa Corporal",
            icono: "📖",
            etapa: "diario",
            disponibilidad: "desbloqueado",
            descCorta: "Toca el cuerpo para ver el significado biológico y guarda tus sentires",
            contenidoLargo: {
              queEs: "Tu diario íntimo e interactivo con un mapa corporal. Al tocar cualquier zona del cuerpo (cuello, espalda, estómago, rodillas...) descubres el conflicto emocional asociado según la NMG.",
              quePuedesHacer: [
                "Seleccionar partes del cuerpo y leer su descodificación biológica",
                "Escribir o dictar por voz tus reflexiones diarias",
                "Llevar un historial privado de síntomas y emociones",
                "Identificar patrones recurrentes de dolor y tensión"
              ],
              accionTexto: "Ir al Diario Somático",
              destino: "diario"
            }
          },
          {
            id: "mod_especialistas",
            titulo: "Red de Especialistas Calificados",
            icono: "⚕️",
            etapa: "especialistas",
            disponibilidad: (tieneAccesoTotal || planPago === "anual") ? "desbloqueado" : "anual",
            descCorta: "Directorio de psicólogos, terapeutas y médicos para sesiones 1 a 1",
            contenidoLargo: {
              queEs: "Un directorio verificado de profesionales de la salud, psicoterapeutas, médicos integrativos y consteladores familiares listos para acompañarte en sesiones personalizadas.",
              quePuedesHacer: [
                "Explorar perfiles con experiencia y credenciales verificadas",
                "Filtrar por especialidad: Biodescodificación, Ansiedad, Duelo, etc.",
                "Contactar de forma directa y confidencial por WhatsApp",
                "Disponible de forma exclusiva con el Plan Anual / Acceso Total"
              ],
              accionTexto: "Ver Directorio de Especialistas",
              destino: "especialistas"
            }
          }
        ]
      },
      {
        id: "membresia",
        titulo: "3. Tu membresía y lo que tienes disponible",
        subtitulo: "Entiende qué incluye tu plan actual y cómo activar tus beneficios",
        items: [
          {
            id: "estado_membresia",
            titulo: esUsuarioSubscrito 
              ? (planPago === "anual" || tieneAccesoTotal ? "👑 Plan Anual Activo (Acceso Total)" : "✨ Plan Mensual Activo")
              : (enPruebaActiva ? "🌱 Prueba Gratuita de 3 Días Activa" : "🔒 Modo Inicial Gratuito"),
            icono: esUsuarioSubscrito ? "👑" : (enPruebaActiva ? "🌱" : "🔒"),
            descCorta: esUsuarioSubscrito
              ? "Tienes acceso ilimitado a todas las funciones y herramientas"
              : (enPruebaActiva ? `${diasRestantesPrueba} días restantes de prueba completa` : "Activa tu prueba o suscripción para desbloquear todos los módulos"),
            contenidoLargo: {
              queEs: esUsuarioSubscrito
                ? "Tu suscripción está activa y protegida. Tienes acceso completo a todas las meditaciones, frecuencias sonoras, análisis astrológicos, constelaciones y el reto de 21 días sin límites."
                : "En modo libre disfrutas de tu Diario Somático y frecuencias base. Al suscribirte desbloqueas todos los días del Reto, tus Cartas Astrales y Aztecas completas, lecturas de Constelaciones Familiares y Directorio de Especialistas.",
              quePuedesHacer: esUsuarioSubscrito
                ? [
                    "Acceso 100% ilimitado a todos los días del Reto de 21 Días",
                    "Todas las Frecuencias Solfeo y ejercicios somáticos",
                    "Cartas Astral, Natal y Azteca completas con interpretaciones",
                    "Lecturas de Constelaciones Familiares ilimitadas",
                    planPago === "anual" || tieneAccesoTotal ? "Directorio Exclusivo de Especialistas y Terapeutas" : "Opción de cambiar al Plan Anual para acceder a Especialistas"
                  ]
                : [
                    "Primeros 3 días de prueba sin costo (Cancela cuando desees)",
                    "Desbloqueo inmediato de los 21 días del Reto emocional",
                    "Cartas astrológicas y mayas con efemérides completas",
                    "Constelaciones familiares y cuestionarios clínicos",
                    "Garantía oficial y facturación segura de Google Play"
                  ],
              accionTexto: esUsuarioSubscrito ? "Ver detalles de mi suscripción" : "Ver Planes y Activar Prueba",
              destino: esUsuarioSubscrito ? "suscripcion" : "paywall"
            }
          }
        ]
      }
    ],
    en: [
      {
        id: "iniciaAqui",
        titulo: "1. Start Here",
        subtitulo: "First steps to discover and transform your holistic wellbeing",
        items: [
          {
            id: "bienvenido",
            titulo: "Welcome to Suelta",
            icono: "🤝",
            descCorta: "Understand the purpose and methodology of emotional liberation",
            contenidoLargo: {
              queEs: "Suelta is an emotional and somatic liberation platform combining Biodecoding, German New Medicine (GNM), Astrological self-knowledge, Family Constellations, and Solfeggio sound therapy.",
              quePuedesHacer: [
                "Identify emotional conflicts behind physical symptoms and pains",
                "Practice daily guided breathwork and log your body feelings in the Somatic Diary",
                "Harmonize your nervous system with pure Solfeggio frequencies",
                "Generate your Natal, Astral, and Aztec Mayan charts to map your life path"
              ],
              accionTexto: "Explore Home",
              destino: "inicio"
            }
          },
          {
            id: "camino",
            titulo: "Find Your Path",
            icono: "🧭",
            descCorta: "How to begin according to your immediate state and emotional needs",
            contenidoLargo: {
              queEs: "Your healing journey is unique. You can enter the app through different pathways depending on what you need right now:",
              quePuedesHacer: [
                "If you feel anxious or stressed: Go to 'Calm' for Solfeggio tones & breathwork",
                "If you feel bodily tension or illness: Go to 'Diary' and tap the body map",
                "If you seek daily discipline & emotional healing: Start the '21-Day Challenge'",
                "If you want to understand your roots & purpose: Go to 'Perspectives' for charts & constellations"
              ],
              accionTexto: "Open Somatic Diary",
              destino: "diario"
            }
          },
          {
            id: "pilares",
            titulo: "Suelta Methodology Pillars",
            icono: "🏛️",
            descCorta: "Biodecoding, GNM, Astrology, and Family Constellations",
            contenidoLargo: {
              queEs: "Our methodology integrates 4 complementary pillars for deep and conscious emotional healing:",
              quePuedesHacer: [
                "1. Biodecoding: Each organ and symptom expresses an unexpressed biological conflict",
                "2. German New Medicine: Disease as an adaptive survival biological program",
                "3. Astrological Archetypes: Your natal and Aztec charts reflecting your psyche and potential",
                "4. Family Constellations: Untangling transgenerational loyalties and honoring your lineage"
              ],
              accionTexto: "Explore Perspectives & Charts",
              destino: "hub"
            }
          },
          {
            id: "habito",
            titulo: "Daily Awareness Habit",
            icono: "🧘‍♀️",
            descCorta: "5 minutes a day to track emotions, release tension, and regulate yourself",
            contenidoLargo: {
              queEs: "True emotional health is built through daily micro-habits. Taking 5 minutes daily creates neural pathways of safety and emotional regulation.",
              quePuedesHacer: [
                "Log your emotional state in the Diary via text or voice",
                "Complete 3 minutes of guided somatic breathing",
                "Progress through your daily 21-Day Challenge practice",
                "Set mindful reminders on your device"
              ],
              accionTexto: "Start 21-Day Challenge",
              destino: "reto"
            }
          }
        ]
      },
      {
        id: "modulos",
        titulo: "2. Explore Your Modules",
        subtitulo: "Detailed overview of each tool available in Suelta and how to use it",
        items: [
          {
            id: "mod_reto",
            titulo: "21-Day Emotional Release Challenge",
            icono: "🎯",
            etapa: "reto",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Daily guided journey with audios, reflective inquiries, and somatic exercises",
            contenidoLargo: {
              queEs: "A progressive 21-day program designed to rewire unconscious patterns, heal past emotional wounds, and reconnect with inner peace.",
              quePuedesHacer: [
                "Listen to daily guided audio reflections",
                "Answer self-inquiry somatic prompts",
                "Keep your daily streak and celebrate progress",
                "Reprogram limiting beliefs step by step"
              ],
              accionTexto: "Go to 21-Day Challenge",
              destino: "reto"
            }
          },
          {
            id: "mod_calma",
            titulo: "Calm: Solfeggio Frequencies & Breathwork",
            icono: "🎵",
            etapa: "herramientas",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "parcial"),
            descCorta: "Pure cellular harmonizing tones and somatic breathing techniques",
            contenidoLargo: {
              queEs: "Your sound and somatic sanctuary with pure Solfeggio tones (396Hz release, 528Hz DNA repair, 852Hz intuition...) and 4-7-8 and box breathing animations.",
              quePuedesHacer: [
                "Play pure healing frequencies while meditating or resting",
                "Engage in guided breathing with visual somatic pacing",
                "Activate sleep timers for peaceful night rest",
                "Calm your heart rate and nervous system in minutes"
              ],
              accionTexto: "Open Calm Module",
              destino: "herramientas"
            }
          },
          {
            id: "mod_hub",
            titulo: "Perspectives: Charts & Constellations",
            icono: "🌌",
            etapa: "hub",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Full astrological charts, family constellation readings, and wellbeing tests",
            contenidoLargo: {
              queEs: "The self-knowledge center. Calculates exact astronomical ephemeris for your Natal, Astral, and Aztec charts, alongside interactive family constellation dynamics.",
              quePuedesHacer: [
                "Discover your planets, houses, and personalized cosmic aspects",
                "Learn your Aztec sign and guardian nahual animal",
                "Perform constellation readings to heal family bonds",
                "Complete emotional wellness and attachment assessments"
              ],
              accionTexto: "Go to Perspectives",
              destino: "hub"
            }
          },
          {
            id: "mod_diario",
            titulo: "Somatic Diary & Body Map",
            icono: "📖",
            etapa: "diario",
            disponibilidad: "desbloqueado",
            descCorta: "Tap body zones to reveal biological meanings and log your emotions",
            contenidoLargo: {
              queEs: "Your private somatic diary featuring an interactive body map. Tapping any body zone reveals its emotional biodecoding conflict according to GNM.",
              quePuedesHacer: [
                "Select body parts to read their biological decoding meaning",
                "Write or voice-dictate your daily emotional entries",
                "Keep a private log of symptoms and feelings",
                "Identify recurring patterns of physical pain and tension"
              ],
              accionTexto: "Open Somatic Diary",
              destino: "diario"
            }
          },
          {
            id: "mod_especialistas",
            titulo: "Network of Certified Specialists",
            icono: "⚕️",
            etapa: "especialistas",
            disponibilidad: (tieneAccesoTotal || planPago === "anual") ? "desbloqueado" : "anual",
            descCorta: "Directory of biodecoders, therapists, and doctors for 1-on-1 sessions",
            contenidoLargo: {
              queEs: "A verified network of certified health practitioners, psychotherapists, integrative doctors, and family constellators ready for personalized virtual sessions.",
              quePuedesHacer: [
                "Explore profiles with verified clinical credentials",
                "Filter by specialty: Biodecoding, Anxiety, Grief, Somatics",
                "Contact directly and confidentially via WhatsApp",
                "Exclusively available with Annual Plan / All Access"
              ],
              accionTexto: "View Specialists Directory",
              destino: "especialistas"
            }
          }
        ]
      },
      {
        id: "membresia",
        titulo: "3. Your Subscription & Access",
        subtitulo: "Understand what is included in your plan and how to unlock all benefits",
        items: [
          {
            id: "estado_membresia",
            titulo: esUsuarioSubscrito 
              ? (planPago === "anual" || tieneAccesoTotal ? "👑 Active Annual Plan (All Access)" : "✨ Active Monthly Plan")
              : (enPruebaActiva ? "🌱 Active 3-Day Free Trial" : "🔒 Free Starter Mode"),
            icono: esUsuarioSubscrito ? "👑" : (enPruebaActiva ? "🌱" : "🔒"),
            descCorta: esUsuarioSubscrito
              ? "You have unrestricted access to all features and tools"
              : (enPruebaActiva ? `${diasRestantesPrueba} days remaining in your free full trial` : "Activate your trial or subscription to unlock all modules"),
            contenidoLargo: {
              queEs: esUsuarioSubscrito
                ? "Your subscription is active and secured. You enjoy full access to all 21 challenge days, Solfeggio soundscapes, complete astrological charts, constellations, and specialists."
                : "In free mode you have access to the Somatic Diary and base frequencies. Subscribing unlocks all 21 Challenge days, complete Astral & Aztec charts, Constellation readings, and Specialists.",
              quePuedesHacer: esUsuarioSubscrito
                ? [
                    "100% unlimited access to all 21 days of the Release Challenge",
                    "All pure Solfeggio frequencies and somatic breathing sessions",
                    "Complete Natal, Astral, and Aztec charts with interpretations",
                    "Unlimited Family Constellations readings and assessments",
                    planPago === "anual" || tieneAccesoTotal ? "Exclusive Specialists & Therapists Directory" : "Upgrade to Annual Plan for Specialists access"
                  ]
                : [
                    "First 3 days completely free (Cancel anytime without penalty)",
                    "Instant unlock of all 21 emotional release challenge days",
                    "Complete astrological charts with accurate ephemeris",
                    "Family constellation readings and clinical questionnaires",
                    "Google Play billing security and official guarantee"
                  ],
              accionTexto: esUsuarioSubscrito ? "View Subscription Details" : "View Plans & Activate Trial",
              destino: esUsuarioSubscrito ? "suscripcion" : "paywall"
            }
          }
        ]
      }
    ],
    pt: [
      {
        id: "iniciaAqui",
        titulo: "1. Comece Aqui",
        subtitulo: "Primeiros passos para compreender e transformar seu bem-estar",
        items: [
          {
            id: "bienvenido",
            titulo: "Bem-vindo ao Suelta",
            icono: "🤝",
            descCorta: "Entenda o propósito e como funciona a libertação bioemocional",
            contenidoLargo: {
              queEs: "O Suelta é uma plataforma de libertação somática e bioemocional que une Biodescodificação, Nova Medicina Germânica (NMG), mapas astrais, Constelações Familiares e frequências Solfeggio.",
              quePuedesHacer: [
                "Identificar conflitos emocionais por trás de dores e sintomas físicos",
                "Praticar respiração guiada diária e registrar sentimentos no diário somático",
                "Harmonizar seu sistema nervoso com frequências sonoras sagradas",
                "Descobrir seu mapa natal, astral e asteca maia para guiar sua vida"
              ],
              accionTexto: "Explorar Início",
              destino: "inicio"
            }
          },
          {
            id: "camino",
            titulo: "Encontre Seu Caminho",
            icono: "🧭",
            descCorta: "Como começar conforme sua necessidade atual de calma ou clareza",
            contenidoLargo: {
              queEs: "Sua jornada de cura é pessoal. Você pode acessar o aplicativo de acordo com a sua necessidade imediata:",
              quePuedesHacer: [
                "Se sente ansiedade ou insônia: Vá para 'Calma' ouvir frequências e respirar",
                "Se sente dor ou sintoma físico: Vá ao 'Diário' e toque no mapa corporal",
                "Se busca disciplina e cura emocional: Inicie o 'Desafio de 21 Dias'",
                "Se busca autoconhecimento e raízes: Vá em 'Perspectivas' ver suas cartas e constelações"
              ],
              accionTexto: "Abrir Diário Somático",
              destino: "diario"
            }
          },
          {
            id: "pilares",
            titulo: "Pilares da Metodologia",
            icono: "🏛️",
            descCorta: "Biodescodificação, NMG, Astrologia e Constelações Familiares",
            contenidoLargo: {
              queEs: "Nossa metodologia integra 4 pilares complementares para uma transformação profunda e consciente:",
              quePuedesHacer: [
                "1. Biodescodificação: Cada órgão expressa um conflito biológico não resolvido",
                "2. Nova Medicina Germânica: O sintoma como programa biológico de sobrevivência",
                "3. Arquétipos Astrais: Seus mapas natal e asteca como espelho de sua alma",
                "4. Constelações Familiares: Desatar nós ancestrais e honrar sua linhagem"
              ],
              accionTexto: "Ver perspectivas e constelações",
              destino: "hub"
            }
          },
          {
            id: "habito",
            titulo: "Hábito Diário de Consciência",
            icono: "🧘‍♀️",
            descCorta: "5 minutos por dia para registrar emoções, liberar tensões e regular-se",
            contenidoLargo: {
              queEs: "O bem-estar se constrói com micro-hábitos. Dedicar 5 minutos diários cria caminhos neurais de segurança e regulação emocional.",
              quePuedesHacer: [
                "Registrar seu estado emocional no Diário por texto ou voz",
                "Fazer 3 minutos de respiração somática guiada",
                "Completar o exercício do dia no Desafio de 21 Dias",
                "Ativar lembretes conscientes em seu dispositivo"
              ],
              accionTexto: "Iniciar Desafio de 21 Dias",
              destino: "reto"
            }
          }
        ]
      },
      {
        id: "modulos",
        titulo: "2. Conheça os Módulos",
        subtitulo: "Guia detalhado de cada ferramenta do aplicativo e como aproveitá-la",
        items: [
          {
            id: "mod_reto",
            titulo: "Desafio de 21 Dias de Liberação",
            icono: "🎯",
            etapa: "reto",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Jornada diária guiada com áudios, perguntas e tarefas reflexivas",
            contenidoLargo: {
              queEs: "Um programa progressivo de 21 dias desenhado para reprogramar padrões inconscientes, curar feridas do passado e resgatar sua paz.",
              quePuedesHacer: [
                "Ouvir a reflexão diária em áudio",
                "Responder perguntas guiadas de autoindagação somática",
                "Acompanhar sua sequência de dias completados",
                "Ressignificar crenças limitantes passo a passo"
              ],
              accionTexto: "Ir ao Desafio de 21 Dias",
              destino: "reto"
            }
          },
          {
            id: "mod_calma",
            titulo: "Calma: Frequências Solfeggio & Respiração",
            icono: "🎵",
            etapa: "herramientas",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "parcial"),
            descCorta: "Tons puros de harmonização celular e respiração guiada",
            contenidoLargo: {
              queEs: "Seu santuário sonoro com frequências Solfeggio (396Hz liberação, 528Hz transformação, 852Hz intuição...) e respiração 4-7-8 e caixa.",
              quePuedesHacer: [
                "Tocar frequências sagradas enquanto medita ou descansa",
                "Praticar respiração guiada com animação visual",
                "Programar temporizador para dormir ou trabalhar em paz",
                "Acalmar o ritmo cardíaco em poucos minutos"
              ],
              accionTexto: "Abrir Módulo de Calma",
              destino: "herramientas"
            }
          },
          {
            id: "mod_hub",
            titulo: "Perspectivas: Cartas & Constelações",
            icono: "🌌",
            etapa: "hub",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Cartas astrais completas, leituras de constelação e testes de bem-estar",
            contenidoLargo: {
              queEs: "O centro de autoconhecimento profundo. Calcula com precisão astronômica suas cartas Natal, Astral e Asteca, integrando constelações familiares.",
              quePuedesHacer: [
                "Descobrir seus planetas, casas e aspectos astrológicos",
                "Conhecer seu signo asteca e animal protetor (nahual)",
                "Fazer leituras de constelações para curar laços familiares",
                "Completar questionários de bem-estar emocional e apego"
              ],
              accionTexto: "Ir para Perspectivas",
              destino: "hub"
            }
          },
          {
            id: "mod_diario",
            titulo: "Diário Somático & Mapa Corporal",
            icono: "📖",
            etapa: "diario",
            disponibilidad: "desbloqueado",
            descCorta: "Toque no mapa corporal para decodificar sintomas e registrar emoções",
            contenidoLargo: {
              queEs: "Seu diário íntimo com mapa corporal interativo. Ao tocar qualquer parte do corpo, descubra o conflito emocional correspondente pela NMG.",
              quePuedesHacer: [
                "Tocar em áreas do corpo para ver a descodificação biológica",
                "Escrever ou ditar por voz suas reflexões diárias",
                "Manter um histórico privado de sintomas e alívio",
                "Identificar padrões recorrentes de dor e tensão"
              ],
              accionTexto: "Abrir Diário Somático",
              destino: "diario"
            }
          },
          {
            id: "mod_especialistas",
            titulo: "Rede de Especialistas Certificados",
            icono: "⚕️",
            etapa: "especialistas",
            disponibilidad: (tieneAccesoTotal || planPago === "anual") ? "desbloqueado" : "anual",
            descCorta: "Diretório de terapeutas, psicólogos e médicos para consultas individuais",
            contenidoLargo: {
              queEs: "Um diretório verificado de profissionais de saúde integrativa, psicoterapeutas e consteladores prontos para sessões online personalizadas.",
              quePuedesHacer: [
                "Explorar perfis com credenciais clínicas verificadas",
                "Filtrar por especialidade: Biodescodificação, Ansiedade, Luto",
                "Contatar de forma direta e confidencial via WhatsApp",
                "Disponível exclusivamente no Plano Anual / Acesso Total"
              ],
              accionTexto: "Ver Especialistas",
              destino: "especialistas"
            }
          }
        ]
      },
      {
        id: "membresia",
        titulo: "3. Sua Assinatura e Acesso",
        subtitulo: "Confira o que está incluído no seu plano e como ativar todos os benefícios",
        items: [
          {
            id: "estado_membresia",
            titulo: esUsuarioSubscrito 
              ? (planPago === "anual" || tieneAccesoTotal ? "👑 Plano Anual Ativo (Acesso Total)" : "✨ Plano Mensal Ativo")
              : (enPruebaActiva ? "🌱 Teste Gratuito de 3 Dias Ativo" : "🔒 Modo Inicial Gratuito"),
            icono: esUsuarioSubscrito ? "👑" : (enPruebaActiva ? "🌱" : "🔒"),
            descCorta: esUsuarioSubscrito
              ? "Você possui acesso ilimitado a todas as ferramentas"
              : (enPruebaActiva ? `${diasRestantesPrueba} dias restantes do seu teste gratuito completo` : "Ative seu teste ou assinatura para desbloquear todos os módulos"),
            contenidoLargo: {
              queEs: esUsuarioSubscrito
                ? "Sua assinatura está ativa e segura. Você desfruta de acesso total aos 21 dias do Desafio, frequências Solfeggio, mapas astrais, constelações e especialistas."
                : "No modo gratuito você acessa o Diário Somático e frequências base. Assinando você libera os 21 dias do Desafio, mapas astrais e astecas completos e constelações.",
              quePuedesHacer: esUsuarioSubscrito
                ? [
                    "Acesso 100% ilimitado a todos os 21 dias do Desafio",
                    "Todas as frequências Solfeggio e exercícios somáticos",
                    "Cartas Astral, Natal e Asteca completas com análises",
                    "Leituras ilimitadas de Constelações Familiares",
                    planPago === "anual" || tieneAccesoTotal ? "Diretório Exclusivo de Especialistas" : "Opção de mudar para o Plano Anual para acessar Especialistas"
                  ]
                : [
                    "Primeiros 3 dias totalmente grátis (Cancele quando quiser)",
                    "Desbloqueio imediato dos 21 dias do Desafio emocional",
                    "Cartas astrológicas e maias completas",
                    "Constelações familiares e questionários clínicos",
                    "Garantia oficial e segurança do Google Play"
                  ],
              accionTexto: esUsuarioSubscrito ? "Ver detalhes da assinatura" : "Ver Planos e Ativar Teste",
              destino: esUsuarioSubscrito ? "suscripcion" : "paywall"
            }
          }
        ]
      }
    ],
    fr: [
      {
        id: "iniciaAqui",
        titulo: "1. Commencez ici",
        subtitulo: "Premières étapes pour comprendre et transformer votre bien-être global",
        items: [
          {
            id: "bienvenido",
            titulo: "Bienvenue sur Suelta",
            icono: "🤝",
            descCorta: "Comprenez la méthode et comment fonctionne la libération bioémotionnelle",
            contenidoLargo: {
              queEs: "Suelta est une plateforme d'accompagnement et de libération bioémotionnelle reliant corps, esprit et énergie via le Décodage Biologique, la Nouvelle Médecine Germanique (NMG), l'astrologie et la sonothérapie.",
              quePuedesHacer: [
                "Identifier le conflit émotionnel caché derrière vos douleurs ou symptômes",
                "Pratiquer la respiration guidée et consigner vos ressentis dans votre journal somatique",
                "Harmoniser votre système nerveux grâce aux fréquences pures du Solfège sacré",
                "Découvrir vos thèmes natal, astral et aztèque pour comprendre votre plan de vie"
              ],
              accionTexto: "Explorer l'Accueil",
              destino: "inicio"
            }
          },
          {
            id: "camino",
            titulo: "Trouvez votre chemin",
            icono: "🧭",
            descCorta: "Comment débuter selon votre besoin immédiat de calme, clarté ou guérison",
            contenidoLargo: {
              queEs: "Votre cheminement est personnel. Vous pouvez entrer dans l'application selon votre besoin du moment :",
              quePuedesHacer: [
                "Si vous ressentez stress ou insomnie : Allez dans 'Calme' pour écouter les fréquences et respirer",
                "Si vous avez une douleur physique : Allez dans 'Journal' et touchez la carte corporelle",
                "Si vous visez la constance et la paix intérieure : Lancez le 'Défi 21 Jours'",
                "Si vous cherchez vos racines et votre mission : Allez dans 'Perspectives' pour les thèmes et constellations"
              ],
              accionTexto: "Ouvrir le Journal Somatique",
              destino: "diario"
            }
          },
          {
            id: "pilares",
            titulo: "Piliers de la Méthodologie",
            icono: "🏛️",
            descCorta: "Biodécodage, NMG, Astrologie et Constellations Familiales",
            contenidoLargo: {
              queEs: "Notre approche réunit 4 piliers complémentaires pour une transformation consciente et durable :",
              quePuedesHacer: [
                "1. Décodage Biologique : Chaque organe exprime un conflit biologique non résolu",
                "2. Nouvelle Médecine Germanique : La maladie comme programme d'adaptation et survie",
                "3. Archétypes Astrologiques : Vos thèmes astral et aztèque comme miroirs psychiques",
                "4. Constellations Familiales : Dénouer les loyautés invisibles et honorer votre lignée"
              ],
              accionTexto: "Voir perspectives et constellations",
              destino: "hub"
            }
          },
          {
            id: "habito",
            titulo: "Pratique Quotidienne de Conscience",
            icono: "🧘‍♀️",
            descCorta: "5 minutes par jour pour observer vos émotions et libérer les tensions",
            contenidoLargo: {
              queEs: "Le bien-être s'établit au quotidien. Prendre 5 minutes par jour ancre de nouveaux circuits neuronaux de sécurité et d'autorégulation.",
              quePuedesHacer: [
                "Consigner votre état émotionnel dans le Journal par texte ou voix",
                "Effectuer 3 minutes de respiration somatique guidée",
                "Accomplir la pratique du jour dans le Défi 21 Jours",
                "Activer des rappels conscients sur votre appareil"
              ],
              accionTexto: "Démarrer le Défi 21 Jours",
              destino: "reto"
            }
          }
        ]
      },
      {
        id: "modulos",
        titulo: "2. Découvrez vos modules",
        subtitulo: "Présentation détaillée de chaque outil disponible et comment en tirer profit",
        items: [
          {
            id: "mod_reto",
            titulo: "Défi de 21 Jours de Libération Émotionnelle",
            icono: "🎯",
            etapa: "reto",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Parcours quotidien guidé avec audios, introspections et exercices",
            contenidoLargo: {
              queEs: "Un programme progressif de 21 jours conçu pour reprogrammer les schémas inconscients, guérir les blessures du passé et retrouver la paix.",
              quePuedesHacer: [
                "Écouter la réflexion audio quotidienne",
                "Répondre aux questions guidées d'auto-investigation",
                "Suivre votre série de jours accomplis",
                "Transformer pas à pas les croyances limitantes"
              ],
              accionTexto: "Aller au Défi 21 Jours",
              destino: "reto"
            }
          },
          {
            id: "mod_calma",
            titulo: "Calme : Fréquences Sacrées & Respiration",
            icono: "🎵",
            etapa: "herramientas",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "parcial"),
            descCorta: "Sons purs d'harmonisation cellulaire et respiration somatique",
            contenidoLargo: {
              queEs: "Votre espace sonore avec fréquences pures du Solfège (396Hz libération, 528Hz transformation, 852Hz intuition...) et exercices 4-7-8.",
              quePuedesHacer: [
                "Écouter des fréquences sacrées pendant la méditation ou le repos",
                "Pratiquer la cohérence cardiaque avec animation visuelle",
                "Activer un minuteur pour le sommeil ou la concentration",
                "Apaiser le rythme cardiaque en quelques minutes"
              ],
              accionTexto: "Ouvrir le Module Calme",
              destino: "herramientas"
            }
          },
          {
            id: "mod_hub",
            titulo: "Perspectives : Thèmes Astraux & Constellations",
            icono: "🌌",
            etapa: "hub",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Thèmes astraux complets, constellations familiales et bilans",
            contenidoLargo: {
              queEs: "Le pôle de connaissance de soi. Calcule avec précision vos thèmes Natal, Astral et Aztèque selon vos coordonnées de naissance, avec constellations familiales.",
              quePuedesHacer: [
                "Découvrir vos planètes, maisons et aspects astrologiques",
                "Connaître votre signe aztèque et votre animal protecteur (nahual)",
                "Effectuer des constellations pour apaiser les liens familiaux",
                "Compléter des questionnaires de bien-être émotionnel"
              ],
              accionTexto: "Aller aux Perspectives",
              destino: "hub"
            }
          },
          {
            id: "mod_diario",
            titulo: "Journal Somatique & Carte Corporelle",
            icono: "📖",
            etapa: "diario",
            disponibilidad: "desbloqueado",
            descCorta: "Touchez le corps pour décoder vos symptômes et consigner vos ressentis",
            contenidoLargo: {
              queEs: "Votre journal privé avec carte corporelle interactive. En touchant n'importe quelle zone du corps, découvrez le conflit émotionnel associé selon la NMG.",
              quePuedesHacer: [
                "Sélectionner des zones du corps et lire le décodage biologique",
                "Écrire ou dicter vocalement vos réflexions du jour",
                "Garder un historique confidentiel de vos ressentis",
                "Repérer les schémas récurrents de tension et douleur"
              ],
              accionTexto: "Ouvrir le Journal Somatique",
              destino: "diario"
            }
          },
          {
            id: "mod_especialistas",
            titulo: "Réseau de Spécialistes Certifiés",
            icono: "⚕️",
            etapa: "especialistas",
            disponibilidad: (tieneAccesoTotal || planPago === "anual") ? "desbloqueado" : "anual",
            descCorta: "Annuaire de thérapeutes, psychologues et médecins pour consultations",
            contenidoLargo: {
              queEs: "Un annuaire certifié de professionnels de santé intégrative, psychothérapeutes et praticiens en constellations pour un accompagnement individuel.",
              quePuedesHacer: [
                "Consulter des profils aux compétences vérifiées",
                "Filtrer par spécialité : Biodécodage, Anxiété, Deuil, etc.",
                "Contacter directement et confidentiellement via WhatsApp",
                "Inclus exclusivement dans la Formule Annuelle / Accès Total"
              ],
              accionTexto: "Voir l'Annuaire des Spécialistes",
              destino: "especialistas"
            }
          }
        ]
      },
      {
        id: "membresia",
        titulo: "3. Votre Abonnement et Accès",
        subtitulo: "Comprenez ce qu'inclut votre formule et comment débloquer tous vos avantages",
        items: [
          {
            id: "estado_membresia",
            titulo: esUsuarioSubscrito 
              ? (planPago === "anual" || tieneAccesoTotal ? "👑 Formule Annuelle Active (Accès Total)" : "✨ Formule Mensuelle Active")
              : (enPruebaActiva ? "🌱 Essai Gratuit de 3 Jours Actif" : "🔒 Mode Gratuit Initial"),
            icono: esUsuarioSubscrito ? "👑" : (enPruebaActiva ? "🌱" : "🔒"),
            descCorta: esUsuarioSubscrito
              ? "Vous bénéficiez d'un accès illimité à tous les modules"
              : (enPruebaActiva ? `${diasRestantesPrueba} jours restants dans votre essai complet` : "Activez votre essai ou abonnement pour débloquer tous les modules"),
            contenidoLargo: {
              queEs: esUsuarioSubscrito
                ? "Votre abonnement est actif et protégé. Vous profitez d'un accès sans limites au Défi 21 Jours, aux fréquences sonores, thèmes astraux, constellations et spécialistes."
                : "En mode gratuit vous disposez du Journal Somatique et des fréquences de base. L'abonnement débloque l'intégralité du Défi, les thèmes complets et les constellations.",
              quePuedesHacer: esUsuarioSubscrito
                ? [
                    "Accès 100% illimité aux 21 jours du Défi de Libération",
                    "Toutes les fréquences Solfège et exercices de respiration",
                    "Thèmes Astral, Natal et Aztèque complets avec interprétations",
                    "Lectures illimitées de Constellations Familiales",
                    planPago === "anual" || tieneAccesoTotal ? "Annuaire Exclusif de Spécialistes" : "Possibilité de passer à la Formule Annuelle pour les Spécialistes"
                  ]
                : [
                    "3 premiers jours offerts sans frais (Annulable à tout moment)",
                    "Déblocage instantané des 21 jours du Défi émotionnel",
                    "Thèmes astraux et éphémérides complètes",
                    "Constellations familiales et bilans émotionnels",
                    "Garantie officielle et paiement sécurisé Google Play"
                  ],
              accionTexto: esUsuarioSubscrito ? "Voir les détails de l'abonnement" : "Voir les Formules et Activer l'Essai",
              destino: esUsuarioSubscrito ? "suscripcion" : "paywall"
            }
          }
        ]
      }
    ],
    it: [
      {
        id: "iniciaAqui",
        titulo: "1. Inizia qui",
        subtitulo: "Primi passi per comprendere e trasformare il tuo benessere olistico",
        items: [
          {
            id: "bienvenido",
            titulo: "Benvenuto su Suelta",
            icono: "🤝",
            descCorta: "Comprendi lo scopo e il metodo di liberazione bioemotiva",
            contenidoLargo: {
              queEs: "Suelta è una piattaforma di liberazione bioemotiva e somatica che unisce Biodecodifica, Nuova Medicina Germanica (NMG), astrologia, Costellazioni Familiari e frequenze Solfeggio.",
              quePuedesHacer: [
                "Identificare il conflitto emotivo dietro dolori o sintomi fisici",
                "Praticare la respirazione guidata e annotare le tue sensazioni nel diario",
                "Armonizzare il sistema nervoso con frequenze pure di Solfeggio",
                "Generare le tue carte natale, astrale e azteca per comprendere il tuo cammino"
              ],
              accionTexto: "Esplora la Home",
              destino: "inicio"
            }
          },
          {
            id: "camino",
            titulo: "Trova il tuo percorso",
            icono: "🧭",
            descCorta: "Come iniziare in base al tuo stato attuale e alle tue esigenze",
            contenidoLargo: {
              queEs: "Il tuo percorso di guarigione è personale. Puoi accedere all'app secondo le tue necessità immediate:",
              quePuedesHacer: [
                "Se provi ansia o insonnia: Vai su 'Calma' per ascoltare frequenze e respirare",
                "Se hai un sintomo o dolore fisico: Vai su 'Diario' e tocca la mappa corporea",
                "Se cerchi costanza e trasformazione: Inizia la 'Sfida di 21 Giorni'",
                "Se desideri comprendere radici e scopo: Vai su 'Prospettive' per carte e costellazioni"
              ],
              accionTexto: "Apri Diario Somatico",
              destino: "diario"
            }
          },
          {
            id: "pilares",
            titulo: "Pilastri della Metodologia",
            icono: "🏛️",
            descCorta: "Biodecodifica, NMG, Astrologia e Costellazioni Familiari",
            contenidoLargo: {
              queEs: "Il nostro metodo integra 4 pilastri complementari per una guarigione profonda e consapevole:",
              quePuedesHacer: [
                "1. Biodecodifica: Ogni organo esprime un conflitto biologico irrisolto",
                "2. Nuova Medicina Germanica: Il sintomo come programma biologico di sopravvivenza",
                "3. Archetipi Astrologici: Le tue carte come specchio della psiche",
                "4. Costellazioni Familiari: Sciogliere i nodi generazionali e onorare il lignaggio"
              ],
              accionTexto: "Vedi prospettive e carte",
              destino: "hub"
            }
          },
          {
            id: "habito",
            titulo: "Pratica Quotidiana di Consapevolezza",
            icono: "🧘‍♀️",
            descCorta: "5 minuti al giorno per osservare le emozioni e rilasciare tensioni",
            contenidoLargo: {
              queEs: "Il benessere si costruisce ogni giorno. Dedicare 5 minuti al giorno crea percorsi neurali di sicurezza e autoregolazione emotiva.",
              quePuedesHacer: [
                "Registrare lo stato emotivo nel Diario tramite testo o voce",
                "Completare 3 minuti di respirazione somatica guidata",
                "Svolgere la pratica quotidiana della Sfida di 21 Giorni",
                "Attivare promemoria consapevoli sul tuo dispositivo"
              ],
              accionTexto: "Inizia la Sfida di 21 Giorni",
              destino: "reto"
            }
          }
        ]
      },
      {
        id: "modulos",
        titulo: "2. Esplora i tuoi moduli",
        subtitulo: "Guida dettagliata di ciascuno strumento e come trarne il massimo",
        items: [
          {
            id: "mod_reto",
            titulo: "Sfida di 21 Giorni di Liberazione Emotiva",
            icono: "🎯",
            etapa: "reto",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Percorso quotidiano guidato con audio, domande introspettive ed esercizi",
            contenidoLargo: {
              queEs: "Un programma progressivo di 21 giorni pensato per riprogrammare schemi inconsci, sanare ferite del passato e ritrovare la pace.",
              quePuedesHacer: [
                "Ascoltare la riflessione audio guidata di ogni giorno",
                "Rispondere alle domande guidate di autoindagine",
                "Tenere traccia dei giorni completati consecutivi",
                "Riprogrammare credenze limitanti passo dopo passo"
              ],
              accionTexto: "Vai alla Sfida di 21 Giorni",
              destino: "reto"
            }
          },
          {
            id: "mod_calma",
            titulo: "Calma: Frequenze Solfeggio & Respirazione",
            icono: "🎵",
            etapa: "herramientas",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "parcial"),
            descCorta: "Toni puri di armonizzazione cellulare e respirazione somatica",
            contenidoLargo: {
              queEs: "Il tuo santuario sonoro con frequenze Solfeggio (396Hz rilascio, 528Hz trasformazione, 852Hz intuizione...) e respirazione guidata 4-7-8.",
              quePuedesHacer: [
                "Riprodurre frequenze pure durante meditazione o riposo",
                "Praticare respirazione guidata con animazione visiva",
                "Attivare timer per dormire o lavorare in tranquillità",
                "Calmare il battito cardiaco in pochi minuti"
              ],
              accionTexto: "Apri Modulo Calma",
              destino: "herramientas"
            }
          },
          {
            id: "mod_hub",
            titulo: "Prospettive: Carte Natali & Costellazioni",
            icono: "🌌",
            etapa: "hub",
            disponibilidad: esUsuarioSubscrito ? "desbloqueado" : (enPruebaActiva ? "prueba" : "bloqueado"),
            descCorta: "Carte natali complete, letture di costellazioni e questionari",
            contenidoLargo: {
              queEs: "Il centro di profonda conoscenza di sé. Calcola con precisione astronomica le tue carte Natale, Astrale e Azteca in base alla tua nascita, con costellazioni familiari.",
              quePuedesHacer: [
                "Scoprire i tuoi pianeti, case e aspetti astrologici",
                "Conoscere il tuo segno azteco e animale protettore (nahual)",
                "Eseguire letture di costellazioni per sanare legami familiari",
                "Completare questionari di benessere emotivo e attaccamento"
              ],
              accionTexto: "Vai a Prospettive",
              destino: "hub"
            }
          },
          {
            id: "mod_diario",
            titulo: "Diario Somatico & Mappa Corporea",
            icono: "📖",
            etapa: "diario",
            disponibilidad: "desbloqueado",
            descCorta: "Tocca il corpo per decodificare i sintomi e registrare le emozioni",
            contenidoLargo: {
              queEs: "Il tuo diario privato con mappa corporea interattiva. Toccando qualsiasi zona del corpo scopri il conflitto emotivo secondo la NMG.",
              quePuedesHacer: [
                "Selezionare parti del corpo e leggere la decodifica biologica",
                "Scrivere o dettare a voce le tue riflessioni quotidiane",
                "Mantenere uno storico privato di sintomi ed evoluzione",
                "Riconoscere schemi ricorrenti di dolore e tensione"
              ],
              accionTexto: "Apri Diario Somatico",
              destino: "diario"
            }
          },
          {
            id: "mod_especialistas",
            titulo: "Rete di Specialisti Qualificati",
            icono: "⚕️",
            etapa: "especialistas",
            disponibilidad: (tieneAccesoTotal || planPago === "anual") ? "desbloqueado" : "anual",
            descCorta: "Elenco di terapeuti, psicologi e medici per sessioni individuali",
            contenidoLargo: {
              queEs: "Un elenco verificato di professionisti della salute integrativa, psicoterapeuti e costellatori pronti ad accompagnarti in sessioni online personalizzate.",
              quePuedesHacer: [
                "Esplorare profili con credenziali cliniche verificate",
                "Filtrare per specialità: Biodecodifica, Ansia, Lutto, ecc.",
                "Contattare direttamente e in modo riservato tramite WhatsApp",
                "Disponibile esclusivamente con Piano Annuale / Accesso Totale"
              ],
              accionTexto: "Vedi Elenco Specialisti",
              destino: "especialistas"
            }
          }
        ]
      },
      {
        id: "membresia",
        titulo: "3. Il Tuo Abbonamento e Accesso",
        subtitulo: "Scopri cosa include il tuo piano attuale e come attivare tutti i vantaggi",
        items: [
          {
            id: "estado_membresia",
            titulo: esUsuarioSubscrito 
              ? (planPago === "anual" || tieneAccesoTotal ? "👑 Piano Annuale Attivo (Accesso Totale)" : "✨ Piano Mensile Attivo")
              : (enPruebaActiva ? "🌱 Prova Gratuita di 3 Giorni Attiva" : "🔒 Modalità Iniziale Gratuita"),
            icono: esUsuarioSubscrito ? "👑" : (enPruebaActiva ? "🌱" : "🔒"),
            descCorta: esUsuarioSubscrito
              ? "Hai accesso illimitato a tutte le funzioni e strumenti"
              : (enPruebaActiva ? `${diasRestantesPrueba} giorni rimanenti della tua prova gratuita completa` : "Attiva la prova o l'abbonamento per sbloccare tutti i moduli"),
            contenidoLargo: {
              queEs: esUsuarioSubscrito
                ? "Il tuo abbonamento è attivo e protetto. Hai accesso completo alla Sfida di 21 Giorni, frequenze Solfeggio, carte astrologiche, costellazioni e specialisti."
                : "In modalità gratuita accedi al Diario Somatico e alle frequenze base. Abbonandoti sblocchi tutti i 21 giorni della Sfida, carte complete e costellazioni.",
              quePuedesHacer: esUsuarioSubscrito
                ? [
                    "Accesso 100% illimitato a tutti i 21 giorni della Sfida",
                    "Tutte le frequenze Solfeggio e sessioni di respirazione",
                    "Carte Astrale, Natale e Azteca complete di interpretazioni",
                    "Letture illimitate di Costellazioni Familiari",
                    planPago === "anual" || tieneAccesoTotal ? "Elenco Esclusivo di Specialisti e Terapeuti" : "Opzione per passare al Piano Annuale per accedere agli Specialisti"
                  ]
                : [
                    "Primi 3 giorni gratuiti (Cancella quando vuoi senza penali)",
                    "Sblocco immediato dei 21 giorni della Sfida emotiva",
                    "Carte astrologiche ed effemeridi complete",
                    "Costellazioni familiari e questionari clinici",
                    "Garanzia ufficiale e fatturazione sicura Google Play"
                  ],
              accionTexto: esUsuarioSubscrito ? "Vedi dettagli abbonamento" : "Vedi Piani e Attiva Prova",
              destino: esUsuarioSubscrito ? "suscripcion" : "paywall"
            }
          }
        ]
      }
    ]
  };

  return data[lang] || data.es;
}
