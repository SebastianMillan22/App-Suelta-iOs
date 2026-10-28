// Localized Specialists Data and UI Translations
// Supported languages: es, en, fr, it

export const getLocalizedEspecialistas = (idioma = "es") => {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";

  const data = {
    es: [
      {
        id: 7,
        nombre: "Laura Sanabria",
        rol: "Guía en Saberes Ancestrales",
        enfoque: "Plantas sagradas y saberes tradicionales",
        modalidad: "Presencial y en línea",
        color: "#6b8f5c",
        inicial: "L",
        exp: "15 años",
        frase: "Volver a la tierra es sanar la raíz de nuestra desconexión moderna y habitar el sagrado templo del cuerpo.",
        bio: "Portadora de saberes ancestrales femeninos y herbolaria integrativa. Te acompaña a reconectar con los ciclos naturales, el útero, rituales de limpieza energética y el uso sabio de plantas para el bienestar integral.",
        tags: ["Herbolaria", "Sabiduría Femenina", "Limpieza energética", "Rituales de tierra"],
        disponibilidad: "Fines de semana y Viernes"
      }
    ],
    en: [
      {
        id: 7,
        nombre: "Laura Sanabria",
        rol: "Ancestral Wisdom Guide",
        enfoque: "Sacred Plants & Herbalism",
        modalidad: "In-person & Online",
        color: "#6b8f5c",
        inicial: "L",
        exp: "15 years",
        frase: "Returning to the earth is healing the root of modern disconnection and inhabiting the sacred temple of the body.",
        bio: "Bearer of ancestral feminine wisdom and holistic herbalism. Guides you to reconnect with natural cycles, energetic cleansing rituals, and the wise use of plants for holistic wellbeing.",
        tags: ["Herbalism", "Feminine Wisdom", "Energy Cleansing", "Earth Rituals"],
        disponibilidad: "Friday & Weekends"
      }
    ],
    fr: [
      {
        id: 7,
        nombre: "Laura Sanabria",
        rol: "Guide en Sagesses Ancestrales",
        enfoque: "Plantes sacrées & Herboristerie",
        modalidad: "En présentiel et en ligne",
        color: "#6b8f5c",
        inicial: "L",
        exp: "15 ans",
        frase: "Revenir à la terre, c'est guérir la racine de notre déconnexion moderne et habiter le temple sacré de notre corps.",
        bio: "Gardienne de sagesses ancestrales féminines et d'herboristerie intégrative. Elle vous accompagne pour renouer avec les cycles naturels, les rituels énergétiques et la sagesse des plantes.",
        tags: ["Herboristerie", "Sagesse féminine", "Purification énergétique", "Rituels de la terre"],
        disponibilidad: "Vendredi et week-ends"
      }
    ],
    it: [
      {
        id: 7,
        nombre: "Laura Sanabria",
        rol: "Guida in Saperi Ancestrali",
        enfoque: "Piante sacre & Tradizioni erboristiche",
        modalidad: "In presenza e online",
        color: "#6b8f5c",
        inicial: "L",
        exp: "15 anni",
        frase: "Tornare alla terra significa guarire la radice della disconnessione moderna e abitare il tempio sacro del corpo.",
        bio: "Custode di saperi ancestrali femminili ed erboristeria olistica. Ti accompagna a riconnetterti con i cicli naturali, rituali di purificazione e l'uso sapiente delle piante per il benessere integrale.",
        tags: ["Erboristeria", "Saggezza femminile", "Purificazione energetica", "Rituali di terra"],
        disponibilidad: "Venerdì e fine settimana"
      }
    ]
  };

  return data[lang];
};

export const getLocalizedCategorias = (idioma = "es") => {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";

  const labels = {
    es: {
      todos: "Todos",
      emocion: "Emocional",
      constela: "Constelaciones",
      coach: "Coaching",
      tarot: "Tarot",
      bio: "Biodescodificación",
      astro: "Astrología",
      ancestral: "S. Ancestral"
    },
    en: {
      todos: "All",
      emocion: "Emotional",
      constela: "Constellations",
      coach: "Coaching",
      tarot: "Tarot",
      bio: "Biodecoding",
      astro: "Astrology",
      ancestral: "Ancestral W."
    },
    fr: {
      todos: "Tous",
      emocion: "Émotionnel",
      constela: "Constellations",
      coach: "Coaching",
      tarot: "Tarot",
      bio: "Biodécodage",
      astro: "Astrologie",
      ancestral: "S. Ancestrale"
    },
    it: {
      todos: "Tutti",
      emocion: "Emozionale",
      constela: "Costellazioni",
      coach: "Coaching",
      tarot: "Tarocchi",
      bio: "Biodecodifica",
      astro: "Astrologia",
      ancestral: "S. Ancestrale"
    }
  }[lang];

  return [
    { id: "todos", label: labels.todos, matchKey: "all", color: "#eef5f2", activeColor: "#284a3e", textColor: "#44594f" },
    { id: "emocion", label: labels.emocion, matchKey: "emocion", color: "#e3ece9", activeColor: "#6fa892", textColor: "#385e50" },
    { id: "constela", label: labels.constela, matchKey: "constela", color: "#f1eff7", activeColor: "#8a6bb8", textColor: "#594d75" },
    { id: "coach", label: labels.coach, matchKey: "coach", color: "#fbf3ee", activeColor: "#c98b6b", textColor: "#6e452f" },
    { id: "tarot", label: labels.tarot, matchKey: "tarot", color: "#f2edf8", activeColor: "#8a6bb8", textColor: "#4a336e" },
    { id: "bio", label: labels.bio, matchKey: "bio", color: "#e9f2ee", activeColor: "#284a3e", textColor: "#284a3e" },
    { id: "astro", label: labels.astro, matchKey: "astro", color: "#faf5eb", activeColor: "#b58b4c", textColor: "#61441b" },
    { id: "ancestral", label: labels.ancestral, matchKey: "ancestral", color: "#f0f5ee", activeColor: "#6b8f5c", textColor: "#354f2c" }
  ];
};

export const getLocalizedEspecialistasUI = (idioma = "es") => {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";

  const data = {
    es: {
      topBarTitle: "Acompañamiento profesional",
      bannerTitle: "Tu camino es único",
      bannerDesc: "Estos facilitadores y guías están certificados por ¡Suelta!. Si deseas un acompañamiento humano profundo, puedes solicitar una sesión personalizada sin ningún tipo de compromiso.",
      searchPlaceholder: "Buscar por nombre, especialidad o enfoque...",
      exploreDisciplines: "Explorar Disciplinas",
      viewAll: "Ver todas",
      filterBy: "Filtrado por:",
      clearFilters: "Limpiar",
      noResultsTitle: "No encontramos especialistas",
      noResultsDesc: "Intenta cambiar la disciplina o la palabra que ingresaste en el buscador.",
      requestedBadge: "Solicitado",
      expSuffix: "de exp.",
      approachLabel: "Enfoque:",
      modalityLabel: "Modalidad:",
      btnBook: "Ver perfil y agendar",
      btnBookAgain: "Solicitar otra sesión",
      disclaimer: "Los profesionales del directorio son independientes. ¡Suelta! facilita este puente de forma segura, pero cada sesión se coordina directamente entre tú y el especialista.",
      modalProfileTitle: "Perfil Profesional",
      typicalAvailability: "Disponibilidad típica:",
      motiveQuestion: "¿Cuál es tu motivo de consulta principal?",
      motives: [
        { id: "Ansiedad y Estrés", label: "Ansiedad y Estrés" },
        { id: "Crecimiento Personal", label: "Crecimiento Personal" },
        { id: "Duelo o Pérdida", label: "Duelo o Pérdida" },
        { id: "Relaciones de Pareja", label: "Relaciones de Pareja" },
        { id: "Gestión Emocional", label: "Gestión Emocional" },
        { id: "Sanación de Infancia", label: "Sanación de Infancia" }
      ],
      preferredModality: "Modalidad preferida",
      modalityOnline: "En línea",
      modalityInPerson: "Presencial",
      preferredSchedule: "Preferencia de horario",
      schedules: [
        { id: "mañana", label: "Mañana", desc: "8 AM - 12 PM" },
        { id: "tarde", label: "Tarde", desc: "12 PM - 6 PM" },
        { id: "noche", label: "Noche", desc: "6 PM - 9 PM" }
      ],
      messageLabel: (name) => `Mensaje para ${name}`,
      optional: "Opcional",
      messagePlaceholder: "Escribe brevemente si hay algo específico que quieras abordar...",
      btnSubmit: "Enviar solicitud de sesión",
      successTitle: "¡Solicitud enviada con éxito!",
      successMessage: (name) => `Hemos enlazado tu perfil con ${name}. Se pondrá en contacto contigo muy pronto para agendar tu primera sesión de valoración.`,
      summaryTitle: "Resumen del acompañamiento",
      summarySpecialist: "Especialista:",
      summaryModality: "Modalidad:",
      summarySchedule: "Horario:",
      summaryMotives: "Motivos:",
      btnClose: "Cerrar"
    },
    en: {
      topBarTitle: "Professional Guidance",
      bannerTitle: "Your path is unique",
      bannerDesc: "These guides and facilitators are certified by Let Go!. If you wish to receive deep human support, you can request a personalized session with no obligation.",
      searchPlaceholder: "Search by name, specialty, or approach...",
      exploreDisciplines: "Explore Disciplines",
      viewAll: "View all",
      filterBy: "Filtered by:",
      clearFilters: "Clear",
      noResultsTitle: "No specialists found",
      noResultsDesc: "Try changing the discipline or search term entered in the search bar.",
      requestedBadge: "Requested",
      expSuffix: "of exp.",
      approachLabel: "Approach:",
      modalityLabel: "Modality:",
      btnBook: "View profile & book",
      btnBookAgain: "Request another session",
      disclaimer: "Specialists in this directory are independent practitioners. Let Go! provides this connection safely, and each session is scheduled directly between you and the specialist.",
      modalProfileTitle: "Professional Profile",
      typicalAvailability: "Typical availability:",
      motiveQuestion: "What is your main reason for consultation?",
      motives: [
        { id: "Ansiedad y Estrés", label: "Anxiety & Stress" },
        { id: "Crecimiento Personal", label: "Personal Growth" },
        { id: "Duelo o Pérdida", label: "Grief & Loss" },
        { id: "Relaciones de Pareja", label: "Couples & Relationships" },
        { id: "Gestión Emocional", label: "Emotional Regulation" },
        { id: "Sanación de Infancia", label: "Childhood Wound Healing" }
      ],
      preferredModality: "Preferred modality",
      modalityOnline: "Online",
      modalityInPerson: "In-person",
      preferredSchedule: "Preferred schedule",
      schedules: [
        { id: "mañana", label: "Morning", desc: "8 AM - 12 PM" },
        { id: "tarde", label: "Afternoon", desc: "12 PM - 6 PM" },
        { id: "noche", label: "Evening", desc: "6 PM - 9 PM" }
      ],
      messageLabel: (name) => `Message for ${name}`,
      optional: "Optional",
      messagePlaceholder: "Briefly share if there is something specific you would like to explore...",
      btnSubmit: "Send session request",
      successTitle: "Request sent successfully!",
      successMessage: (name) => `We have connected your profile with ${name}. They will reach out to you very soon to schedule your initial consultation.`,
      summaryTitle: "Session Request Summary",
      summarySpecialist: "Specialist:",
      summaryModality: "Modality:",
      summarySchedule: "Schedule:",
      summaryMotives: "Reasons:",
      btnClose: "Close"
    },
    fr: {
      topBarTitle: "Accompagnement professionnel",
      bannerTitle: "Votre chemin est unique",
      bannerDesc: "Ces praticiens et guides sont certifiés par Lâche prise !. Si vous souhaitez un accompagnement humain et bienveillant, vous pouvez demander une séance personnalisée sans engagement.",
      searchPlaceholder: "Rechercher par nom, spécialité ou approche...",
      exploreDisciplines: "Explorer les disciplines",
      viewAll: "Toutes afficher",
      filterBy: "Filtré par :",
      clearFilters: "Effacer",
      noResultsTitle: "Aucun spécialiste trouvé",
      noResultsDesc: "Essayez de modifier la discipline sélectionnée ou les mots-clés de votre recherche.",
      requestedBadge: "Demandé",
      expSuffix: "d'exp.",
      approachLabel: "Approche :",
      modalityLabel: "Modalité :",
      btnBook: "Voir le profil et réserver",
      btnBookAgain: "Demander une autre séance",
      disclaimer: "Les praticiens de cet annuaire exercent de manière indépendante. Lâche prise ! facilite cette mise en relation sécurisée, chaque séance étant coordonnée directement entre vous et le spécialiste.",
      modalProfileTitle: "Profil Professionnel",
      typicalAvailability: "Disponibilité habituelle :",
      motiveQuestion: "Quel est votre motif principal de consultation ?",
      motives: [
        { id: "Ansiedad y Estrés", label: "Anxiété & Stress" },
        { id: "Crecimiento Personal", label: "Développement personnel" },
        { id: "Duelo o Pérdida", label: "Deuil & Séparation" },
        { id: "Relaciones de Pareja", label: "Relations de couple" },
        { id: "Gestión Emocional", label: "Gestion des émotions" },
        { id: "Sanación de Infancia", label: "Guérison de l'enfance" }
      ],
      preferredModality: "Modalité souhaitée",
      modalityOnline: "En ligne",
      modalityInPerson: "En présentiel",
      preferredSchedule: "Horaire de préférence",
      schedules: [
        { id: "mañana", label: "Matin", desc: "8h - 12h" },
        { id: "tarde", label: "Après-midi", desc: "12h - 18h" },
        { id: "noche", label: "Soirée", desc: "18h - 21h" }
      ],
      messageLabel: (name) => `Message pour ${name}`,
      optional: "Optionnel",
      messagePlaceholder: "Précisez brièvement s'il y a un sujet particulier que vous souhaitez aborder...",
      btnSubmit: "Envoyer la demande de séance",
      successTitle: "Demande envoyée avec succès !",
      successMessage: (name) => `Nous avons transmis votre demande à ${name}. Le spécialiste vous recontactera très prochainement pour fixer votre premier rendez-vous.`,
      summaryTitle: "Récapitulatif de la demande",
      summarySpecialist: "Spécialiste :",
      summaryModality: "Modalité :",
      summarySchedule: "Créneau :",
      summaryMotives: "Motifs :",
      btnClose: "Fermer"
    },
    it: {
      topBarTitle: "Supporto professionale",
      bannerTitle: "Il tuo percorso è unico",
      bannerDesc: "Questi operatori e guide sono certificati da Lascia andare !. Se desideri un accompagnamento umano profondo, puoi richiedere una sessione personalizzata senza alcun impegno.",
      searchPlaceholder: "Cerca per nome, disciplina o approccio...",
      exploreDisciplines: "Esplora le discipline",
      viewAll: "Mostra tutte",
      filterBy: "Filtrato per:",
      clearFilters: "Reimposta",
      noResultsTitle: "Nessun professionista trovato",
      noResultsDesc: "Prova a cambiare categoria o la parola inserita nel campo di ricerca.",
      requestedBadge: "Richiesto",
      expSuffix: "di esp.",
      approachLabel: "Approccio:",
      modalityLabel: "Modalità:",
      btnBook: "Vedi profilo e prenota",
      btnBookAgain: "Richiedi un'altra sessione",
      disclaimer: "I professionisti presenti nella directory operano in modo indipendente. Lascia andare ! facilita il contatto in modo sicuro, ma ogni sessione è concordata direttamente con lo specialista.",
      modalProfileTitle: "Profilo Professionale",
      typicalAvailability: "Disponibilità tipica:",
      motiveQuestion: "Qual è il motivo principale della tua richiesta?",
      motives: [
        { id: "Ansiedad y Estrés", label: "Ansia e Stress" },
        { id: "Crecimiento Personal", label: "Crescita personale" },
        { id: "Duelo o Pérdida", label: "Lutto o separazione" },
        { id: "Relaciones de Pareja", label: "Relazioni di coppia" },
        { id: "Gestión Emocional", label: "Gestione emotiva" },
        { id: "Sanación de Infancia", label: "Cura delle ferite d'infanzia" }
      ],
      preferredModality: "Modalità preferita",
      modalityOnline: "Online",
      modalityInPerson: "In presenza",
      preferredSchedule: "Fascia oraria preferita",
      schedules: [
        { id: "mañana", label: "Mattina", desc: "8:00 - 12:00" },
        { id: "tarde", label: "Pomeriggio", desc: "12:00 - 18:00" },
        { id: "noche", label: "Sera", desc: "18:00 - 21:00" }
      ],
      messageLabel: (name) => `Messaggio per ${name}`,
      optional: "Opzionale",
      messagePlaceholder: "Scrivi brevemente se c'è un tema specifico che vorresti esplorare...",
      btnSubmit: "Invia richiesta di sessione",
      successTitle: "Richiesta inviata con successo!",
      successMessage: (name) => `Abbiamo collegato il tuo profilo con ${name}. Ti contatterà al più presto per concordare la tua prima sessione.`,
      summaryTitle: "Riepilogo della richiesta",
      summarySpecialist: "Specialista:",
      summaryModality: "Modalità:",
      summarySchedule: "Fascia oraria:",
      summaryMotives: "Motivi:",
      btnClose: "Chiudi"
    }
  };

  return data[lang];
};
