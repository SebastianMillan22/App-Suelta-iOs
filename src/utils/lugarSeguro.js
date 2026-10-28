// Localized data and generator for "Lugar Seguro" / Sensory Phase
// Supported languages: es, en, fr, it

export const getLocalizedPasosLugarSeguro = (nombre, sexo, idioma = "es") => {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";
  const esFemenino = sexo !== "M";

  // Address terms
  let n = nombre;
  if (!n) {
    if (lang === "en") n = "traveler";
    else if (lang === "fr") n = esFemenino ? "voyageuse" : "voyageur";
    else if (lang === "it") n = esFemenino ? "viaggiatrice" : "viaggiatore";
    else n = esFemenino ? "viajera" : "viajero";
  }

  const adj = {
    es: esFemenino ? "segura" : "seguro",
    en: "safe",
    fr: "en sécurité",
    it: "al sicuro"
  }[lang];

  if (lang === "en") {
    return [
      {
        titulo: `Imagine, ${n}`,
        texto: `You are going to imagine a space where you feel completely ${adj}. It can be a real landscape you remember fondly, or an invented sanctuary. Let the image form gently in your mind, without rushing.`,
        colorGlow: "rgba(138, 107, 184, 0.2)",
        sabor: "Visualize the soft light and contours...",
      },
      {
        titulo: "Contemplate the colors",
        texto: `${n}, look around with your inner eye: what colors do you see? Is it daytime with warm sunshine, or a starry, protective night? Notice if there are trees, crystal-clear water, or a cozy room.`,
        colorGlow: "rgba(63, 107, 91, 0.2)",
        sabor: "Focus your attention on a beautiful detail.",
      },
      {
        titulo: "Listen to the melody of the space",
        texto: `Pay attention to the sounds of your surroundings, ${n}: do you hear the gentle murmur of a stream, the breeze through the leaves, or a deep, healing silence? Activate the sacred sounds below to accompany you.`,
        colorGlow: "rgba(232, 207, 179, 0.25)",
        sabor: "Allow the calm to clear your thoughts.",
      },
      {
        titulo: "Feel the touch and support",
        texto: `Perceive the climate and the gentle touch of the breeze on your skin. Feel the exact spot where your body rests: the softness of the earth, warm sand, or a cozy chair. The ground supports you with love.`,
        colorGlow: "rgba(201, 139, 107, 0.2)",
        sabor: "Release all your weight, you are safe.",
      },
      {
        titulo: "A sacred sanctuary",
        texto: `In this place, ${n}, nothing that burdens you can reach you. You are completely safe. Breathe slowly and deeply, inhabiting the fullness of your sacred space for a few moments.`,
        colorGlow: "rgba(138, 107, 184, 0.3)",
        sabor: "Inhale deep peace... Exhale all tension.",
      },
      {
        titulo: "Return to your center",
        texto: `When you feel the moment is right, gently come back here. Remember, ${n}, that this sanctuary belongs to you; it doesn't disappear, it lives inside you and you can return anytime with a deep breath. You are ${adj}!`,
        colorGlow: "rgba(63, 107, 91, 0.25)",
        sabor: "Carry this feeling of calm with you.",
      }
    ];
  }

  if (lang === "fr") {
    return [
      {
        titulo: `Imagine, ${n}`,
        texto: `Tu vas imaginer un espace où tu te sens complètement ${adj}. Ce peut être un paysage réel dont tu te souviens avec tendresse, ou un refuge inventé. Laisse l'image se former peu à peu dans ton esprit, sans te presser.`,
        colorGlow: "rgba(138, 107, 184, 0.2)",
        sabor: "Visualise la douce lumière et les contours...",
      },
      {
        titulo: "Contemple les couleurs",
        texto: `${n}, regarde autour de toi avec ton œil intérieur : quelles couleurs vois-tu ? Fait-il jour avec un soleil tiède, ou une nuit étoilée et protectrice ? Observe s'il y a des arbres, de l'eau cristalline ou une pièce chaleureuse.`,
        colorGlow: "rgba(63, 107, 91, 0.2)",
        sabor: "Fixe ton attention sur un détail précieux.",
      },
      {
        titulo: "Écoute la mélodie du lieu",
        texto: `Prête attention aux sons de ton environnement, ${n} : entends-tu le murmure d'un ruisseau, la brise dans les feuilles, ou un silence profond et réparateur ? Active les sons sacrés ci-dessous pour t'accompagner.`,
        colorGlow: "rgba(232, 207, 179, 0.25)",
        sabor: "Laisse le calme apaiser tes pensées.",
      },
      {
        titulo: "Ressens le toucher et le soutien",
        texto: `Ressens la douceur de l'air sur ta peau. Sens le point d'appui de ton corps : la souplesse de la terre, le sable chaud, ou un fauteuil confortable. Le sol te soutient avec bienveillance.`,
        colorGlow: "rgba(201, 139, 107, 0.2)",
        sabor: "Dépose tout ton poids, tu es en sécurité.",
      },
      {
        titulo: "Un sanctuaire sacré",
        texto: `En ce lieu, ${n}, rien de ce qui t'oppresse ne peut t'atteindre. Tu es totalement en sécurité. Respire lentement et profondément, en habitant la plénitude de ton sanctuaire sacré quelques instants.`,
        colorGlow: "rgba(138, 107, 184, 0.3)",
        sabor: "Inspire une paix profonde... Expire toute tension.",
      },
      {
        titulo: "Reviens à ton centre",
        texto: `Quand tu sentiras que c'est le moment, reviens doucement ici. Souviens-toi, ${n}, que ce sanctuaire t'appartient ; il ne disparaît pas, il vit en toi et tu peux y retourner d'une simple respiration profonde. Tu es ${adj} !`,
        colorGlow: "rgba(63, 107, 91, 0.25)",
        sabor: "Emporte cette sensation de calme avec toi.",
      }
    ];
  }

  if (lang === "it") {
    return [
      {
        titulo: `Immagina, ${n}`,
        texto: `Immaginerai uno spazio dove ti senti completamente ${adj}. Può essere un paesaggio reale che ricordi con affetto, o un rifugio inventato. Lascia che l'immagine prenda forma a poco a poco nella tua mente, senza fretta.`,
        colorGlow: "rgba(138, 107, 184, 0.2)",
        sabor: "Visualizza la luce soffusa e i contorni...",
      },
      {
        titulo: "Contempla i colori",
        texto: `${n}, guardati attorno con l'occhio interiore: che colori vedi? È giorno con un sole tiepido, o una notte stellata e protettiva? Osserva se ci sono alberi, acqua cristallina o una stanza accogliente.`,
        colorGlow: "rgba(63, 107, 91, 0.2)",
        sabor: "Fissa la tua attenzione su un dettaglio prezioso.",
      },
      {
        titulo: "Ascolta la melodia dello spazio",
        texto: `Presta attenzione al suono del tuo ambiente, ${n}: si sente il mormorio di un ruscello, la brezza tra le foglie o un silenzio profondo e rigenerante? Attiva i suoni sacri qui sotto per accompagnarti.`,
        colorGlow: "rgba(232, 207, 179, 0.25)",
        sabor: "Lascia che la calma distenda i tuoi pensieri.",
      },
      {
        titulo: "Senti il tocco e il sostegno",
        texto: `Percepisci il clima e la carezza dell'aria sulla pelle. Senti il punto esatto in cui il tuo corpo poggia: la morbidezza della terra, la sabbia tiepida o una comoda poltrona. La terra ti sostiene con amore.`,
        colorGlow: "rgba(201, 139, 107, 0.2)",
        sabor: "Lascia andare tutto il tuo peso, sei al sicuro.",
      },
      {
        titulo: "Un santuario sacro",
        texto: `In questo luogo, ${n}, nulla di ciò che ti opprime può raggiungerti. Sei completamente al sicuro. Respira lentamente e profondamente, abitando la pienezza del tuo spazio sacro per qualche istante.`,
        colorGlow: "rgba(138, 107, 184, 0.3)",
        sabor: "Inspira una pace profonda... Espira ogni tensione.",
      },
      {
        titulo: "Ritorna al tuo centro",
        texto: `Quando senti che è il momento, torna dolcemente qui. Ricorda, ${n}, che questo santuario è tuo; non scompare, vive dentro di te e puoi ritornarvi con un semplice respiro profondo. Sei ${adj}!`,
        colorGlow: "rgba(63, 107, 91, 0.25)",
        sabor: "Porta con te questa sensazione di calma.",
      }
    ];
  }

  // Spanish (default)
  return [
    {
      titulo: `Imagina, ${n}`,
      texto: `Vas a imaginar un espacio donde te sientas completamente ${adj}. Puede ser un paisaje real que recuerdes con cariño, o un refugio inventado. Deja que la imagen se forme poco a poco en tu mente, sin prisa.`,
      colorGlow: "rgba(138, 107, 184, 0.2)",
      sabor: "Visualiza la luz suave y los contornos...",
    },
    {
      titulo: "Contempla los colores",
      texto: `${n}, mira a tu alrededor con tu ojo interior: ¿qué colores ves? ¿Es de día con sol tibio, o una noche estrellada y protectora? Observa si hay árboles, agua cristalina, o una habitación abrigada.`,
      colorGlow: "rgba(63, 107, 91, 0.2)",
      sabor: "Fija tu atención en un detalle hermoso.",
    },
    {
      titulo: "Escucha la melodía del espacio",
      texto: `Presta atención al sonido de tu entorno, ${n}: ¿se escucha el murmullo de un arroyo, la brisa entre las hojas, o un silencio profundo y sanador? Activa los sonidos sagrados abajo para acompañarte.`,
      colorGlow: "rgba(232, 207, 179, 0.25)",
      sabor: "Permite que la calma limpie tus pensamientos.",
    },
    {
      titulo: "Siente el tacto y el sostén",
      texto: `Percibe el clima y la caricia del aire en tu piel. Siente el lugar exacto donde tu cuerpo se apoya: la suavidad de la tierra, la arena tibia, o una cómoda butaca. El suelo te sostiene con amor.`,
      colorGlow: "rgba(201, 139, 107, 0.2)",
      sabor: "Suelta todo tu peso, estás a salvo.",
    },
    {
      titulo: "Un santuario sagrado",
      texto: `En este lugar, ${n}, nada que te agobie puede alcanzarte. Estás totalmente a salvo. Respira lenta y profundamente, habitando la plenitud de tu espacio sagrado por unos instantes.`,
      colorGlow: "rgba(138, 107, 184, 0.3)",
      sabor: "Inhala paz profunda... Exhala toda tensión.",
    },
    {
      titulo: "Regresa a tu centro",
      texto: `Cuando sientas que es el momento, vuelve suavemente aquí. Recuerda, ${n}, que este santuario es tuyo; no desaparece, vive en tu interior y puedes regresar con solo respirar profundo. ¡Eres ${adj}!`,
      colorGlow: "rgba(63, 107, 91, 0.25)",
      sabor: "Lleva esta sensación de calma contigo.",
    }
  ];
};

export const getLocalizedLugarSeguroUI = (idioma = "es") => {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";

  const data = {
    es: {
      title: "Lugar seguro",
      phaseLabel: "FASE SENSORIAL",
      frequencyAccomp: "ACOMPAÑAMIENTO DE FRECUENCIA",
      silence: "Silencio",
      btnNext: "Siguiente",
      btnIntegrate: "Integrar y terminar",
      completedTitle: (nombre) => nombre ? `${nombre}, tu lugar te habita` : "Tu lugar seguro te habita",
      completedDesc: "Has integrado tu espacio protector. Recuerda que no necesitas buscarlo afuera, pues ya reside como un ancla en tu propia respiración.",
      anchorTip: "⚓ Puedes regresar a esta sensación en cualquier momento del día.",
      btnRepeat: "Volver a recorrer",
      logCompleted: (freq) => `Práctica de Lugar Seguro completada con éxito${freq ? ` (acompañado de frecuencia de ${freq} Hz)` : ""}. Integrando el espacio protector personal.`
    },
    en: {
      title: "Safe Place",
      phaseLabel: "SENSORY PHASE",
      frequencyAccomp: "FREQUENCY ACCOMPANIMENT",
      silence: "Silence",
      btnNext: "Next",
      btnIntegrate: "Integrate & Complete",
      completedTitle: (nombre) => nombre ? `${nombre}, your space lives in you` : "Your safe place lives in you",
      completedDesc: "You have integrated your protective sanctuary. Remember you don't need to search for it outside; it already resides as an anchor within your own breath.",
      anchorTip: "⚓ You can return to this calm feeling at any time of the day.",
      btnRepeat: "Journey through again",
      logCompleted: (freq) => `Safe Place practice completed successfully${freq ? ` (accompanied by ${freq} Hz frequency)` : ""}. Integrating personal protective space.`
    },
    fr: {
      title: "Lieu sécurisant",
      phaseLabel: "PHASE SENSORIELLE",
      frequencyAccomp: "ACCOMPAGNEMENT DE FRÉQUENCE",
      silence: "Silence",
      btnNext: "Suivant",
      btnIntegrate: "Intégrer et terminer",
      completedTitle: (nombre) => nombre ? `${nombre}, ton sanctuaire vit en toi` : "Ton refuge protecteur vit en toi",
      completedDesc: "Tu as intégré ton espace protecteur. Souviens-toi que tu n'as pas besoin de le chercher dehors : il réside déjà comme une ancre dans ton souffle.",
      anchorTip: "⚓ Tu peux retrouver cet apaisement à tout moment de la journée.",
      btnRepeat: "Revivre l'expérience",
      logCompleted: (freq) => `Pratique du Lieu Sécurisant complétée avec succès${freq ? ` (accompagnée de la fréquence ${freq} Hz)` : ""}. Intégration du sanctuaire protecteur.`
    },
    it: {
      title: "Luogo sicuro",
      phaseLabel: "FASE SENSORIALE",
      frequencyAccomp: "ACCOMPAGNAMENTO DI FREQUENZA",
      silence: "Silenzio",
      btnNext: "Avanti",
      btnIntegrate: "Integra e termina",
      completedTitle: (nombre) => nombre ? `${nombre}, il tuo luogo vive in te` : "Il tuo luogo sicuro vive in te",
      completedDesc: "Hai integrato il tuo spazio protettivo. Ricorda che non hai bisogno di cercarlo fuori: risiede già come un'ancora nel tuo respiro.",
      anchorTip: "⚓ Puoi tornare a questa sensazione di calma in ogni momento della giornata.",
      btnRepeat: "Ripercorri l'esperienza",
      logCompleted: (freq) => `Pratica del Luogo Sicuro completata con successo${freq ? ` (accompagnata dalla frequenza ${freq} Hz)` : ""}. Integrazione dello spazio protettivo.`
    }
  };

  return data[lang];
};
