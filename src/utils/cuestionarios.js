// Localized self-knowledge questionnaires (Cuestionarios de autoconocimiento)
// Fully supported for Spanish (es), English (en), French (fr), Italian (it)

export const CUESTIONARIOS_RAW = [
  {
    id: "estres",
    titulo: {
      es: "¿Cómo reaccionas bajo estrés?",
      en: "How do you react under stress?",
      fr: "Comment réagissez-vous sous stress ?",
      it: "Come reagisci sotto stress?"
    },
    desc: {
      es: "Descubre si tu respuesta tiende más a la lucha, la huida, la parálisis o la complacencia.",
      en: "Discover whether your response leans more towards fight, flight, freeze, or fawn.",
      fr: "Découvrez si votre réaction tend plutôt vers la lutte, la fuite, la paralysie ou la complaisance.",
      it: "Scopri se la tua reazione tende più alla lotta, alla fuga, al congelamento o all'accondiscendenza."
    },
    preguntas: [
      {
        texto: {
          es: "Cuando surge un conflicto, tu primer impulso es...",
          en: "When a conflict arises, your first impulse is...",
          fr: "Quand un conflit survient, votre premier réflexe est de...",
          it: "Quando sorge un conflitto, il tuo primo impulso è..."
        },
        opciones: [
          {
            tipo: "lucha",
            texto: {
              es: "Enfrentarlo de inmediato, aunque suba el tono",
              en: "Confront it immediately, even if the tone rises",
              fr: "L'affronter immédiatement, même si le ton monte",
              it: "Affrontarlo subito, anche se i toni si alzano"
            }
          },
          {
            tipo: "huida",
            texto: {
              es: "Buscar la salida más rápida posible",
              en: "Find the quickest possible exit",
              fr: "Chercher l'échappatoire la plus rapide possible",
              it: "Cercare la via d'uscita più rapida possibile"
            }
          },
          {
            tipo: "paralisis",
            texto: {
              es: "Quedarte en blanco, sin saber qué hacer",
              en: "Go blank, not knowing what to do",
              fr: "Avoir un blanc, sans savoir quoi faire",
              it: "Rimanere bloccato/a, senza sapere cosa fare"
            }
          },
          {
            tipo: "complacencia",
            texto: {
              es: "Intentar calmar a todos, aunque tú te quedes callada",
              en: "Try to calm everyone down, even if you stay quiet",
              fr: "Essayer d'apaiser tout le monde, quitte à vous taire",
              it: "Cercare di calmare tutti, anche a costo di tacere"
            }
          }
        ]
      },
      {
        texto: {
          es: "Frente a una fecha límite o sobrecarga de tareas, sueles...",
          en: "Faced with a tight deadline or work overload, you usually...",
          fr: "Face à une échéance serrée ou une surcharge de travail, vous avez tendance à...",
          it: "Di fronte a una scadenza imminente o a un sovraccarico di impegni, di solito..."
        },
        opciones: [
          {
            tipo: "lucha",
            texto: {
              es: "Acelerar y trabajar sin parar hasta terminar",
              en: "Speed up and work non-stop until it's done",
              fr: "Accélérer et travailler sans interruption jusqu'à terminer",
              it: "Accelerare e lavorare senza sosta fino a completare tutto"
            }
          },
          {
            tipo: "huida",
            texto: {
              es: "Procrastinar o distraerte con otras cosas",
              en: "Procrastinate or get distracted by other things",
              fr: "Procrastiner ou vous distraire avec d'autres choses",
              it: "Procrastinare o distrarti con altre cose"
            }
          },
          {
            tipo: "paralisis",
            texto: {
              es: "Sentirte abrumada y no saber por dónde empezar",
              en: "Feel overwhelmed and not know where to start",
              fr: "Vous sentir dépassé(e) et ne plus savoir par où commencer",
              it: "Sentirti sopraffatto/a e non sapere da dove cominciare"
            }
          },
          {
            tipo: "complacencia",
            texto: {
              es: "Aceptar más trabajo para no decepcionar a nadie",
              en: "Take on even more work so as not to disappoint anyone",
              fr: "Accepter encore plus de travail pour ne décevoir personne",
              it: "Accettare altro lavoro pur di non deludere nessuno"
            }
          }
        ]
      },
      {
        texto: {
          es: "Cuando cometes un error importante...",
          en: "When you make a significant mistake...",
          fr: "Quand vous commettez une erreur importante...",
          it: "Quando commetti un errore importante..."
        },
        opciones: [
          {
            tipo: "lucha",
            texto: {
              es: "Te enojas contigo o buscas resolverlo ya",
              en: "Get angry at yourself or rush to fix it immediately",
              fr: "Vous énerver contre vous-même ou vouloir tout réparer sur-le-champ",
              it: "Arrabbiarti con te stesso/a o cercare di risolverlo subito"
            }
          },
          {
            tipo: "huida",
            texto: {
              es: "Prefieres posponerlo o evitarlo un tiempo",
              en: "Prefer to postpone or avoid dealing with it for a while",
              fr: "Préférer repousser ou éviter d'y faire face un moment",
              it: "Preferire rimandarlo o evitarlo per un po'"
            }
          },
          {
            tipo: "paralisis",
            texto: {
              es: "Te bloqueas y te cuesta empezar de nuevo",
              en: "Freeze up and find it hard to start again",
              fr: "Vous bloquer et avoir du mal à repartir de l'avant",
              it: "Bloccarti e fare fatica a ricominciare"
            }
          },
          {
            tipo: "complacencia",
            texto: {
              es: "Te disculpas de más, aunque no siempre sea tu culpa",
              en: "Over-apologize, even when it's not entirely your fault",
              fr: "Vous excuser excessivement, même si ce n'est pas votre faute",
              it: "Scusarti eccessivamente, anche quando non è sempre colpa tua"
            }
          }
        ]
      },
      {
        texto: {
          es: "En una relación cercana, cuando algo te incomoda...",
          en: "In a close relationship, when something bothers you...",
          fr: "Dans une relation proche, quand quelque chose vous dérange...",
          it: "In una relazione stretta, quando qualcosa ti infastidisce..."
        },
        opciones: [
          {
            tipo: "lucha",
            texto: {
              es: "Lo dices directamente, aunque genere tensión",
              en: "Say it directly, even if it creates tension",
              fr: "Le dire directement, même si cela crée des tensions",
              it: "Dirlo chiaramente, anche se crea tensione"
            }
          },
          {
            tipo: "huida",
            texto: {
              es: "Prefieres no hablarlo y guardar distancia",
              en: "Prefer not to talk about it and maintain distance",
              fr: "Préférer ne pas en parler et garder vos distances",
              it: "Preferire non parlarne e prendere le distanze"
            }
          },
          {
            tipo: "paralisis",
            texto: {
              es: "Te cuesta encontrar las palabras en el momento",
              en: "Struggle to find the right words in the moment",
              fr: "Avoir du mal à trouver les mots sur le coup",
              it: "Avere difficoltà a trovare le parole sul momento"
            }
          },
          {
            tipo: "complacencia",
            texto: {
              es: "Prefieres callarlo con tal de mantener la paz",
              en: "Prefer to stay quiet just to keep the peace",
              fr: "Préférer vous taire pour préserver la paix",
              it: "Preferire tacere pur di mantenere la pace"
            }
          }
        ]
      }
    ],
    resultados: {
      lucha: {
        titulo: {
          es: "Modo lucha",
          en: "Fight mode",
          fr: "Mode lutte",
          it: "Modalità lotta"
        },
        texto: {
          es: "Tu sistema nervioso responde al estrés activándose hacia afuera: confrontas, resuelves, avanzas. Es una respuesta valiosa cuando hay límites que defender, pero puede agotarte si se activa incluso donde no hay una amenaza real. Practicar una pausa antes de reaccionar puede ayudarte a elegir cuándo luchar y cuándo simplemente observar.",
          en: "Your nervous system responds to stress by activating outwards: you confront, resolve, and push forward. This is a valuable response when boundaries must be defended, but it can drain you if triggered when there is no real threat. Practicing a pause before reacting can help you choose when to engage and when to simply observe.",
          fr: "Votre système nerveux réagit au stress en s'activant vers l'extérieur : vous affrontez, résolvez et avancez. C'est une réponse précieuse pour défendre vos limites, mais elle peut vous épuiser si elle s'enclenche même en l'absence de réelle menace. Marquer une pause avant de réagir peut vous aider à choisir quand agir et quand simplement observer.",
          it: "Il tuo sistema nervoso risponde allo stress attivandosi verso l'esterno: affronti, risolvi, avanzi. È una risposta preziosa per difendere i tuoi confini, ma può prosciugarti se si attiva anche quando non c'è una reale minaccia. Esercitarti a fare una pausa prima di reagire può aiutarti a scegliere quando lottare e quando semplicemente osservare."
        }
      },
      huida: {
        titulo: {
          es: "Modo huida",
          en: "Flight mode",
          fr: "Mode fuite",
          it: "Modalità fuga"
        },
        texto: {
          es: "Ante el estrés, tu instinto busca distancia: evitar, posponer, salir de la situación. Esto te protege de conflictos innecesarios, pero si se repite mucho puede dejarte con temas sin resolver que vuelven una y otra vez. Acercarte poco a poco a lo que evitas, con pasos pequeños, puede ser un buen punto de partida.",
          en: "Under stress, your instinct seeks distance: avoiding, postponing, exiting the situation. This protects you from unnecessary conflict, but if repeated often it may leave unresolved matters that resurface continually. Gradually approaching what you avoid with small steps can be a constructive starting point.",
          fr: "Face au stress, votre instinct recherche la distance : éviter, reporter, quitter la situation. Cela vous préserve des conflits inutiles, mais si cela se répète trop, cela peut laisser des questions non résolues qui reviennent sans cesse. Vous rapprocher petit à petit de ce que vous évitez, par de petites étapes, est un excellent point de départ.",
          it: "Davanti allo stress, il tuo istinto cerca la distanza: evitare, rimandare, allontanarsi dalla situazione. Questo ti protegge da conflitti inutili, ma se si ripete spesso può lasciare questioni irrisolte che continuano a ripresentarsi. Avvicinarti a piccoli passi a ciò che eviti può essere un ottimo punto di partenza."
        }
      },
      paralisis: {
        titulo: {
          es: "Modo parálisis",
          en: "Freeze mode",
          fr: "Mode paralysie",
          it: "Modalità congelamento"
        },
        texto: {
          es: "Cuando el estrés te desborda, tu cuerpo elige quedarse quieto: la mente se pone en blanco y cuesta reaccionar. No es debilidad ni torpeza: es una respuesta de protección muy antigua. Darte permiso de tomarte un momento antes de responder, sin exigirte inmediatez, puede aliviar mucho esta reacción.",
          en: "When stress overwhelms you, your body chooses stillness: the mind goes blank and it is difficult to react. This is neither weakness nor clumsiness; it is an ancestral protective response. Giving yourself permission to take a quiet moment before answering, without demanding immediacy, can deeply soothe this reaction.",
          fr: "Quand le stress vous submerge, votre corps choisit l'immobilité : l'esprit se vide et il devient difficile de réagir. Ce n'est ni faiblesse ni maladresse : c'est un mécanisme de protection ancestral. Vous autoriser un moment de répit avant de répondre, sans exiger d'immédiateté, peut grandement apaiser cette réaction.",
          it: "Quando lo stress ti sopraffà, il tuo corpo sceglie l'immobilità: la mente si svuota ed è difficile reagire. Non è debolezza né inadeguatezza: è una risposta protettiva antichissima. Darti il permesso di prenderti un momento prima di rispondere, senza pretendere immediatezza, può alleviare profondamente questa reazione."
        }
      },
      complacencia: {
        titulo: {
          es: "Modo complacencia",
          en: "Fawn mode",
          fr: "Mode complaisance",
          it: "Modalità accondiscendenza"
        },
        texto: {
          es: "Frente al estrés, tu prioridad es mantener la armonía, incluso a costa tuya. Esto habla de una gran capacidad de cuidar a otros, pero también de una dificultad para poner tus propias necesidades en el centro. Practicar decir lo que sí sientes, aunque incomode un poco, es un paso hacia el equilibrio.",
          en: "Faced with stress, your priority is maintaining harmony, even at your own expense. This reflects a great capacity to care for others, but also a difficulty placing your own needs at the center. Practicing expressing what you truly feel, even if slightly uncomfortable, is a vital step toward balance.",
          fr: "Face au stress, votre priorité est de préserver l'harmonie, quitte à vous oublier. Cela témoigne d'une grande attention portée aux autres, mais aussi d'une difficulté à placer vos propres besoins au centre. Vous entraîner à exprimer ce que vous ressentez réellement, même si cela bouscule un peu, est un pas essentiel vers l'équilibre.",
          it: "Di fronte allo stress, la tua priorità è mantenere l'armonia, anche a tue spese. Questo dimostra una grande empatia e cura per gli altri, ma anche la fatica nel mettere al centro i tuoi bisogni personali. Esercitarti a esprimere ciò che provi davvero, anche se può creare un piccolo disagio, è un passo fondamentale verso l'equilibrio."
        }
      }
    }
  },
  {
    id: "apego",
    titulo: {
      es: "¿Cuál es tu estilo de apego?",
      en: "What is your attachment style?",
      fr: "Quel est votre style d'attachement ?",
      it: "Qual è il tuo stile di attaccamento?"
    },
    desc: {
      es: "Explora cómo te vinculas emocionalmente con las personas importantes en tu vida.",
      en: "Explore how you emotionally bond with the important people in your life.",
      fr: "Découvrez comment vous vous liez émotionnellement aux personnes importantes de votre vie.",
      it: "Esplora come ti leghi emotivamente alle persone importanti della tua vita."
    },
    preguntas: [
      {
        texto: {
          es: "Cuando alguien importante se aleja o está distante...",
          en: "When someone important pulls away or is distant...",
          fr: "Quand une personne importante s'éloigne ou reste distante...",
          it: "Quando una persona importante si allontana o appare distante..."
        },
        opciones: [
          {
            tipo: "seguro",
            texto: {
              es: "Confías en que todo está bien y le das su espacio",
              en: "You trust everything is fine and give them their space",
              fr: "Vous avez confiance et lui laissez son espace",
              it: "Hai fiducia che tutto vada bene e le lasci il suo spazio"
            }
          },
          {
            tipo: "ansioso",
            texto: {
              es: "Te preocupas y necesitas confirmar que todo está bien",
              en: "You worry and need reassurance that everything is okay",
              fr: "Vous vous inquiétez et avez besoin de vérifier que tout va bien",
              it: "Ti preoccupi e hai bisogno di continue conferme che tutto vada bene"
            }
          },
          {
            tipo: "evitativo",
            texto: {
              es: "Prefieres también tomar distancia, sin darle mucha importancia",
              en: "You also pull away without giving it too much importance",
              fr: "Vous préférez aussi prendre vos distances sans trop y prêter attention",
              it: "Preferisci prendere le distanze a tua volta, minimizzando"
            }
          },
          {
            tipo: "desorganizado",
            texto: {
              es: "Sientes una mezcla confusa de necesitarlo y querer alejarte",
              en: "You feel a confusing mix of needing them and wanting to pull away",
              fr: "Vous ressentez un mélange confus de besoin de proximité et d'envie de fuir",
              it: "Provi un misto confuso tra il bisogno di vicinanza e la voglia di fuggire"
            }
          }
        ]
      },
      {
        texto: {
          es: "En una relación cercana, la intimidad emocional te hace sentir...",
          en: "In a close relationship, emotional intimacy makes you feel...",
          fr: "Dans une relation intime, la proximité émotionnelle vous fait sentir...",
          it: "In una relazione intima, la vicinanza emotiva ti fa sentire..."
        },
        opciones: [
          {
            tipo: "seguro",
            texto: {
              es: "Cómoda, es algo natural para ti",
              en: "Comfortable, it feels natural to you",
              fr: "À l'aise, c'est tout à fait naturel pour vous",
              it: "A tuo agio, è qualcosa di naturale per te"
            }
          },
          {
            tipo: "ansioso",
            texto: {
              es: "La deseas mucho, a veces más de lo que la otra persona puede dar",
              en: "You crave it deeply, sometimes more than the other person can give",
              fr: "Vous la désirez ardemment, parfois plus que ce que l'autre peut donner",
              it: "La desideri molto, a volte più di quanto l'altro possa offrire"
            }
          },
          {
            tipo: "evitativo",
            texto: {
              es: "Incómoda si se vuelve demasiado intensa",
              en: "Uncomfortable if it gets too intense",
              fr: "Mal à l'aise si cela devient trop intense",
              it: "A disagio se diventa troppo intensa"
            }
          },
          {
            tipo: "desorganizado",
            texto: {
              es: "La deseas, pero también te da miedo",
              en: "You desire it, but it also scares you",
              fr: "Vous la désirez, mais elle vous effraie en même temps",
              it: "La desideri, ma allo stesso tempo ti spaventa"
            }
          }
        ]
      },
      {
        texto: {
          es: "Cuando tienes un problema, sueles...",
          en: "When you have a problem, you usually...",
          fr: "Quand vous rencontrez un problème, vous avez tendance à...",
          it: "Quando affronti un problema, di solito..."
        },
        opciones: [
          {
            tipo: "seguro",
            texto: {
              es: "Pedir apoyo con confianza cuando lo necesitas",
              en: "Ask for support with confidence when you need it",
              fr: "Demander du soutien avec confiance dès que nécessaire",
              it: "Chiedere supporto con fiducia quando ne hai bisogno"
            }
          },
          {
            tipo: "ansioso",
            texto: {
              es: "Necesitar bastante reafirmación de que te quieren",
              en: "Need significant reassurance that you are loved",
              fr: "Avoir grandement besoin d'être rassuré(e) sur l'affection qu'on vous porte",
              it: "Aver bisogno di continue rassicurazioni sull'affetto altrui"
            }
          },
          {
            tipo: "evitativo",
            texto: {
              es: "Resolverlo tú sola, sin pedir mucha ayuda",
              en: "Solve it entirely on your own without asking for much help",
              fr: "Le résoudre seul(e), sans trop demander d'aide",
              it: "Risolvertelo da solo/a, senza chiedere molto aiuto"
            }
          },
          {
            tipo: "desorganizado",
            texto: {
              es: "Dudar entre pedir ayuda y aislarte",
              en: "Hesitate between asking for help and isolating yourself",
              fr: "Hésiter entre solliciter de l'aide et vous isoler",
              it: "Esitare continuamente tra chiedere aiuto e isolarti"
            }
          }
        ]
      },
      {
        texto: {
          es: "Tu mayor miedo en una relación cercana es...",
          en: "Your greatest fear in a close relationship is...",
          fr: "Votre plus grande peur dans une relation intime est de...",
          it: "La tua più grande paura in una relazione intima è..."
        },
        opciones: [
          {
            tipo: "seguro",
            texto: {
              es: "No tener uno en particular; confías en el vínculo",
              en: "Not having one in particular; you trust the bond",
              fr: "Ne pas en avoir en particulier ; vous faites confiance au lien",
              it: "Non averne una in particolare; hai fiducia nel legame"
            }
          },
          {
            tipo: "ansioso",
            texto: {
              es: "Que la otra persona deje de quererte o se aleje",
              en: "That the other person stops loving you or leaves",
              fr: "Que l'autre cesse de vous aimer ou prenne ses distances",
              it: "Che l'altra persona smetta di amarti o si allontani"
            }
          },
          {
            tipo: "evitativo",
            texto: {
              es: "Perder tu independencia o sentirte atrapada",
              en: "Losing your independence or feeling trapped",
              fr: "Perdre votre indépendance ou vous sentir pris(e) au piège",
              it: "Perdere la tua indipendenza o sentirti in trappola"
            }
          },
          {
            tipo: "desorganizado",
            texto: {
              es: "Ser lastimada, aunque también temes quedarte sola",
              en: "Being hurt, while also fearing ending up alone",
              fr: "Être blessé(e), tout en redoutant de finir seul(e)",
              it: "Essere ferito/a, pur temendo di rimanere solo/a"
            }
          }
        ]
      }
    ],
    resultados: {
      seguro: {
        titulo: {
          es: "Apego seguro",
          en: "Secure attachment",
          fr: "Attachement sécure",
          it: "Attaccamento sicuro"
        },
        texto: {
          es: "Sueles confiar en tus vínculos y sentirte cómoda tanto dando como recibiendo cercanía. Esto no significa que no tengas heridas, sino que probablemente creciste en un entorno donde el afecto fue relativamente estable. Sigue cuidando esa base: es un recurso valioso para todas tus relaciones.",
          en: "You tend to trust your relationships and feel comfortable both giving and receiving closeness. This does not mean you are free of wounds, but rather that you likely grew in an environment with relatively steady affection. Keep nurturing this foundation: it is an invaluable resource for all your bonds.",
          fr: "Vous avez confiance en vos liens et vous sentez à l'aise tant pour donner que pour recevoir de la proximité. Cela ne signifie pas l'absence de blessures, mais plutôt un développement dans un cadre d'affection stable. Continuez à chérir cette base précieuse pour toutes vos relations.",
          it: "Tendi ad avere fiducia nei tuoi legami e a sentirti a tuo agio sia nel dare che nel ricevere vicinanza. Ciò non significa essere immuni da ferite, ma riflette basi affettive stabili. Continua a custodire questa risorsa preziosa per tutte le tue relazioni."
        }
      },
      ansioso: {
        titulo: {
          es: "Apego ansioso",
          en: "Anxious attachment",
          fr: "Attachement anxieux",
          it: "Attaccamento ansioso"
        },
        texto: {
          es: "Necesitas sentir cercanía y reafirmación constante en tus vínculos, y la distancia del otro puede activarte rápido. Esto suele tener raíz en momentos donde el afecto se sintió inconsistente. Aprender a calmarte a ti misma antes de buscar la tranquilidad afuera puede aliviar mucho esta ansiedad.",
          en: "You yearn for closeness and steady reassurance in your bonds, and another's distance can quickly trigger alarm. This often stems from past inconsistencies in receiving affection. Learning to soothe yourself before seeking external reassurance can deeply soften this anxiety.",
          fr: "Vous recherchez une proximité et une réassurance constantes, et la distance d'autrui peut vite vous alarmer. Cela prend souvent racine dans des moments d'affection perçue comme inconstante. Apprendre à vous apaiser vous-même avant de chercher le calme à l'extérieur peut grandement alléger cette anxiété.",
          it: "Hai bisogno di vicinanza e continue rassicurazioni nei tuoi legami, e la distanza altrui può metterti subito in allerta. Questo affonda spesso le radici in affetti vissuti come discontinui. Imparare ad auto-rassicurarti prima di cercare pace all'esterno può alleggerire enormemente quest'ansia."
        }
      },
      evitativo: {
        titulo: {
          es: "Apego evitativo",
          en: "Avoidant attachment",
          fr: "Attachement évitant",
          it: "Attaccamento evitante"
        },
        texto: {
          es: "Valoras mucho tu independencia y te cuesta depender emocionalmente de otros, incluso cuando los quieres. Esto suele desarrollarse cuando, de niña, pedir ayuda no siempre fue bien recibido. Permitirte necesitar a alguien, poco a poco, no te hace más débil ni menos autónoma.",
          en: "You deeply prize your independence and find it difficult to rely emotionally on others, even when you love them. This often develops when asking for help was unsupported early in life. Allowing yourself to need someone, step by step, does not make you weaker or less autonomous.",
          fr: "Vous valorisez grandement votre indépendance et éprouvez des difficultés à dépendre émotionnellement d'autrui, même avec amour. Cela se construit souvent lorsque demander de l'aide n'était pas encouragé. Vous autoriser à avoir besoin d'autrui ne vous rend ni vulnérable ni moins autonome.",
          it: "Attribuisci un valore immenso alla tua indipendenza e fai fatica a dipendere emotivamente dagli altri, anche se provi affetto. Questo schema nasce spesso quando chiedere aiuto non veniva accolto in tenera età. Permetterti di appoggiarti a qualcuno, gradualmente, non ti rende debole né meno autonomo/a."
        }
      },
      desorganizado: {
        titulo: {
          es: "Apego desorganizado",
          en: "Disorganized attachment",
          fr: "Attachement désorganisé",
          it: "Attaccamento disorganizzato"
        },
        texto: {
          es: "Sientes una mezcla de deseo y miedo hacia la cercanía: quieres el vínculo, pero también te protege alejarte de él. Suele originarse en vínculos tempranos que combinaron amor y miedo a la vez. Ir despacio, y con acompañamiento profesional si lo sientes necesario, puede ayudarte a construir vínculos más estables.",
          en: "You feel a poignant mixture of longing and fear regarding intimacy: you yearn for connection yet seek safety in distance. This typically originates in early bonds that blended love with distress. Moving gently, and with compassionate guidance, can support you in fostering secure, peaceful connections.",
          fr: "Vous ressentez une dualité entre désir et peur de l'intimité : vous aspirez au lien tout en cherchant refuge dans l'éloignement. Cela découle souvent de premiers liens mêlant affection et crainte. Avancer doucement, éventuellement accompagné(e), vous permettra de tisser des relations plus sereines.",
          it: "Vivi una combinazione di forte desiderio e timore dell'intimità: cerchi il legame ma trovi rifugio nella distanza. Ciò ha spesso origine in vissuti precoci che hanno unito affetto e timore. Procedere con gentilezza, anche con un supporto professionale, ti aiuterà a costruire relazioni più stabili e serene."
        }
      }
    }
  },
  {
    id: "patron-emocional",
    titulo: {
      es: "¿Qué patrón emocional repites más?",
      en: "Which emotional pattern do you repeat most?",
      fr: "Quel schéma émotionnel répétez-vous le plus ?",
      it: "Quale schema emotivo ripeti più spesso?"
    },
    desc: {
      es: "Identifica cuál de tus emociones aparece con más frecuencia cuando algo te desborda.",
      en: "Identify which emotion appears most frequently when something overwhelms you.",
      fr: "Identifiez quelle émotion surgit le plus fréquemment lorsque vous êtes submergé(e).",
      it: "Identifica quale emozione emerge più frequentemente quando qualcosa ti sopraffà."
    },
    preguntas: [
      {
        texto: {
          es: "Cuando algo no sale como esperabas, lo primero que sientes es...",
          en: "When something doesn't go as expected, the first thing you feel is...",
          fr: "Quand les choses ne se passent pas comme prévu, votre premier ressenti est...",
          it: "Quando qualcosa non va come previsto, la prima cosa che provi è..."
        },
        opciones: [
          {
            tipo: "miedo",
            texto: {
              es: "Miedo a que las cosas empeoren",
              en: "Fear that things will get worse",
              fr: "La peur que la situation empire",
              it: "Paura che le cose peggiorino"
            }
          },
          {
            tipo: "tristeza",
            texto: {
              es: "Tristeza por lo que se perdió o no fue",
              en: "Sadness for what was lost or did not happen",
              fr: "De la tristesse pour ce qui a été perdu ou n'a pas été",
              it: "Tristezza per ciò che è andato perduto o non è stato"
            }
          },
          {
            tipo: "rabia",
            texto: {
              es: "Rabia por cómo se dieron las cosas",
              en: "Anger at how things turned out",
              fr: "De la colère face au déroulement des événements",
              it: "Rabbia per come sono andate le cose"
            }
          }
        ]
      },
      {
        texto: {
          es: "Frente a una injusticia, tu reacción interna suele ser...",
          en: "Faced with an injustice, your internal reaction is usually...",
          fr: "Face à une injustice, votre réaction intérieure est souvent...",
          it: "Di fronte a un'ingiustizia, la tua reazione interiore di solito è..."
        },
        opciones: [
          {
            tipo: "miedo",
            texto: {
              es: "Ansiedad por no saber cómo resolverlo",
              en: "Anxiety from not knowing how to resolve it",
              fr: "De l'anxiété de ne pas savoir comment résoudre la situation",
              it: "Ansia per non sapere come risolvere la situazione"
            }
          },
          {
            tipo: "tristeza",
            texto: {
              es: "Desánimo, como si no valiera la pena intentarlo",
              en: "Discouragement, as if it weren't worth trying",
              fr: "Du découragement, comme si rien n'en valait la peine",
              it: "Sconforto, come se non valesse la pena tentare"
            }
          },
          {
            tipo: "rabia",
            texto: {
              es: "Indignación y ganas de reclamar",
              en: "Indignation and a desire to speak up or push back",
              fr: "De l'indignation et l'envie de protester",
              it: "Indignazione e voglia di ribellarsi o farsi valere"
            }
          }
        ]
      },
      {
        texto: {
          es: "Cuando piensas en el futuro cercano, sientes más...",
          en: "When you think about the near future, you feel mostly...",
          fr: "Quand vous pensez à l'avenir proche, vous ressentez plutôt...",
          it: "Quando pensi al futuro prossimo, provi soprattutto..."
        },
        opciones: [
          {
            tipo: "miedo",
            texto: {
              es: "Incertidumbre y preocupación",
              en: "Uncertainty and worry",
              fr: "De l'incertitude et de l'inquiétude",
              it: "Incertezza e preoccupazione"
            }
          },
          {
            tipo: "tristeza",
            texto: {
              es: "Nostalgia por etapas que ya pasaron",
              en: "Nostalgia for chapters that have passed",
              fr: "De la nostalgie pour les étapes révolues",
              it: "Nostalgia per fasi ormai passate"
            }
          },
          {
            tipo: "rabia",
            texto: {
              es: "Impaciencia por que las cosas cambien ya",
              en: "Impatience for things to change immediately",
              fr: "De l'impatience que les choses changent enfin",
              it: "Impazienza affinché le cose cambino subito"
            }
          }
        ]
      },
      {
        texto: {
          es: "En los conflictos con otras personas, sueles quedarte pensando en...",
          en: "In conflicts with other people, you often find yourself dwelling on...",
          fr: "Lors de conflits avec autrui, vous avez tendance à ressasser...",
          it: "Nei conflitti con le altre persone, tendi a rimuginare su..."
        },
        opciones: [
          {
            tipo: "miedo",
            texto: {
              es: "Qué podría salir mal después de eso",
              en: "What could go wrong afterwards",
              fr: "Ce qui pourrait mal tourner ensuite",
              it: "Cosa potrebbe andare storto in seguito"
            }
          },
          {
            tipo: "tristeza",
            texto: {
              es: "Lo que se rompió o se perdió en la relación",
              en: "What was fractured or lost in the relationship",
              fr: "Ce qui s'est brisé ou perdu dans la relation",
              it: "Cosa si è rotto o è andato perso nella relazione"
            }
          },
          {
            tipo: "rabia",
            texto: {
              es: "Lo injusto que fue lo que pasó",
              en: "How unfair what happened was",
              fr: "À quel point ce qui s'est passé était injuste",
              it: "Quanto sia stato ingiusto ciò che è accaduto"
            }
          }
        ]
      }
    ],
    resultados: {
      miedo: {
        titulo: {
          es: "Miedo y alerta",
          en: "Fear and vigilance",
          fr: "Peur et vigilance",
          it: "Paura e allerta"
        },
        texto: {
          es: "Tu patrón más frecuente activa el sistema de alerta: anticipas lo que podría salir mal antes de que pase. Esto te ha ayudado a prevenir problemas, pero también puede mantenerte en tensión incluso cuando no hay una amenaza real presente. Nombrar el miedo específico, en vez de generalizarlo, suele bajarle intensidad.",
          en: "Your most frequent pattern activates the alarm system: anticipating what could go wrong before it occurs. While this has protected you, it can also keep you on edge when no real danger exists. Naming the specific fear, rather than generalizing it, helps reduce its intensity.",
          fr: "Votre schéma prédominant active le système d'alerte : anticiper le pire avant même qu'il ne se produise. Cela vous a aidé(e) à prévenir des obstacles, mais peut vous maintenir sous tension en l'absence de menace réelle. Nommer la peur précise plutôt que de la généraliser permet d'en réduire l'intensité.",
          it: "Il tuo schema prevalente attiva il sistema di allerta: anticipi ciò che potrebbe andare storto prima che accada. Sebbene ti abbia protetto/a in passato, può tenerti sotto tensione anche quando non vi è alcun pericolo reale. Dare un nome preciso alla paura specifica aiuta ad abbassarne l'intensità."
        }
      },
      tristeza: {
        titulo: {
          es: "Tristeza y pérdida",
          en: "Sadness and loss",
          fr: "Tristesse et perte",
          it: "Tristezza e perdita"
        },
        texto: {
          es: "Tu patrón más frecuente es la tristeza: notas con facilidad lo que se pierde, lo que cambia, lo que ya no es como antes. Esto habla de una gran sensibilidad y capacidad de conexión. Permitirte sentir esa tristeza sin apurarte a “estar bien” es, paradójicamente, el camino más corto para transformarla.",
          en: "Your most frequent pattern is sadness: you readily notice what is lost, what changes, and what is no longer as it was. This reflects deep sensitivity and capacity for connection. Allowing yourself to feel this sadness without rushing to 'be okay' is, paradoxically, the swiftest way to transform it.",
          fr: "Votre schéma prédominant est la tristesse : vous percevez avec acuité ce qui s'efface, change ou n'est plus. Cela révèle une profonde sensibilité et une belle aptitude au lien. Vous autoriser à accueillir cette tristesse sans vous presser d'aller bien est la voie royale pour la transformer.",
          it: "Il tuo schema prevalente è la tristezza: cogli con facilità ciò che si perde, ciò che cambia o non è più come prima. Questo esprime grande sensibilità e profondità emotiva. Permetterti di accogliere questa tristezza senza fretta di stare subito bene è il sentiero più autentico per trasformarla."
        }
      },
      rabia: {
        titulo: {
          es: "Rabia y conflicto interno",
          en: "Anger and inner conflict",
          fr: "Colère et conflit intérieur",
          it: "Rabbia e conflitto interiore"
        },
        texto: {
          es: "Tu patrón más frecuente es la rabia: reaccionas con fuerza ante lo que sientes injusto o fuera de tu control. Esta emoción suele señalar un límite que necesita ser puesto. Preguntarte qué límite específico está pidiendo ser defendido puede transformar esa rabia en una acción concreta.",
          en: "Your most frequent pattern is anger: you react strongly to whatever feels unfair or beyond your control. This emotion often signals a boundary that must be established. Asking yourself what specific boundary needs upholding can transform that anger into constructive, clear action.",
          fr: "Votre schéma prédominant est la colère : vous réagissez vivement à ce qui vous paraît injuste ou hors de contrôle. Cette émotion signale souvent une limite à poser. Vous demander quelle frontière précise demande à être protégée permet de canaliser cette colère en action constructive.",
          it: "Il tuo schema prevalente è la rabbia: reagisci con impeto a ciò che percepisci come ingiusto o fuori dal tuo controllo. Questa emozione indica spesso un limite che chiede di essere tracciato. Chiederti quale confine specifico necessiti di tutela può trasformare la rabbia in un'azione costruttiva."
        }
      }
    }
  }
];

export function getLocalizedCuestionarios(lang = "es") {
  const l = (lang === "en" || lang === "fr" || lang === "it") ? lang : "es";
  return CUESTIONARIOS_RAW.map(q => ({
    id: q.id,
    titulo: q.titulo[l] || q.titulo.es,
    desc: q.desc[l] || q.desc.es,
    preguntas: q.preguntas.map(p => ({
      texto: p.texto[l] || p.texto.es,
      opciones: p.opciones.map(o => ({
        tipo: o.tipo,
        texto: o.texto[l] || o.texto.es
      }))
    })),
    resultados: Object.fromEntries(
      Object.entries(q.resultados).map(([tipo, res]) => [
        tipo,
        {
          titulo: res.titulo[l] || res.titulo.es,
          texto: res.texto[l] || res.texto.es
        }
      ])
    )
  }));
}

export function getLocalizedCuestionarioById(id, lang = "es") {
  const all = getLocalizedCuestionarios(lang);
  return all.find(q => q.id === id) || all[0];
}
