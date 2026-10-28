import * as EphemerisNS from "circular-natal-horoscope-js";

export const DICTIONARY = [
  {
    id: "cabeza-dolor",
    keywords: ["cabeza", "dolor de cabeza", "migrana", "migraña"],
    termino: "Cabeza (dolores de)",
    capa: "Ectodermo",
    sentido:
      "La cabeza representa el centro de mando del \u201cyo soy\u201d. Un dolor localizado ahí suele aparecer cuando la persona se golpea a sí misma con juicios de devaluación intelectual: la sensación de no ser lo bastante inteligente, capaz o rápida.",
    enfoque:
      "Identificar la frase exacta de autodevaluación que se repite antes de que aparezca el dolor, y trabajar en desmontarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCabeza, dolores de\u201d)",
    otrasCausas: [
      "Un examen, entrevista o evaluación en la que sentiste que no diste la talla",
      "Una comparación con otra persona en la que saliste perdiendo",
      "Una decisión importante en la que dudaste mucho de tu propio criterio",
    ],
  },
  {
    id: "espalda-superior",
    keywords: ["espalda", "dolor de espalda", "espalda alta", "cervical", "cuello", "nuca"],
    termino: "Espalda (parte superior)",
    capa: "Mesodermo",
    sentido:
      "La parte alta de la espalda se conecta con el centro cardíaco y con las necesidades más básicas del ser. Suele activarse por sentirse desprotegido o por cargar afectivamente con algo que no le corresponde a uno.",
    enfoque:
      "Revisar qué carga afectiva se está sosteniendo por otra persona, y devolverla conscientemente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cEspalda, dolor de\u201d)",
    otrasCausas: [
      "Un momento en que sostuviste emocionalmente a alguien más de lo que te correspondía",
      "Una etapa en la que sentiste que nadie te estaba cuidando a ti",
      "Una responsabilidad familiar que asumiste sin haberlo decidido del todo",
    ],
  },
  {
    id: "estomago",
    keywords: ["estomago", "estómago", "digestivo", "indigestion", "indigestión", "gastritis", "acidez", "reflujo", "colon", "nausea", "náusea"],
    termino: "Estómago (dolencias del)",
    capa: "Endodermo",
    sentido:
      'Un "bocado indigesto": una situación, palabra o hecho que la persona no pudo asimilar ni digerir emocionalmente en el momento en que ocurrió.',
    enfoque:
      "Nombrar con precisión qué situación quedó sin digerir, y en qué momento de la historia personal ocurrió.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cEstómago, dolencias del\u201d)",
    otrasCausas: [
      "Una noticia inesperada que te costó asimilar",
      "Una discusión o comentario que se quedó dando vueltas mucho después de haber pasado",
      "Una decisión de otra persona que tuviste que aceptar sin poder cambiarla",
    ],
  },
  {
    id: "ansiedad",
    keywords: ["ansiedad", "angustia", "nervios", "preocupacion", "preocupación"],
    termino: "Ansiedad",
    capa: "Sistema nervioso",
    sentido:
      "Estado de alerta permanente del inconsciente biológico, vigilando un peligro que puede no ser actual sino memorizado de una vivencia pasada no resuelta.",
    enfoque:
      "Diferenciar el peligro real del peligro recordado, y devolver al cuerpo la señal de que ese peligro ya pasó.",
    fuente: "Nueva Medicina Germánica (Dr. Ryke Geerd Hamer), síntesis en banco local",
    otrasCausas: [
      "Un cambio importante que se veía venir pero no podías controlar",
      "Una etapa con mucha incertidumbre económica o laboral",
      "Una relación en la que sentías que algo malo podía pasar en cualquier momento",
    ],
  },
  {
    id: "piel",
    keywords: ["piel", "eczema", "dermatitis", "picazon", "picazón"],
    termino: "Piel (afecciones de la)",
    capa: "Ectodermo",
    sentido:
      "La piel es el órgano de contacto y separación. Sus afecciones suelen hablar de una necesidad de contacto no satisfecha, o de un contacto no deseado del que la persona quiere protegerse.",
    enfoque:
      "Identificar si el conflicto es de falta de contacto o de exceso de contacto no deseado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cPiel, afecciones de la\u201d)",
    otrasCausas: [
      "Un periodo de mucha soledad o aislamiento",
      "Una relación donde el contacto físico o emocional se sintió invasivo",
      "Una separación de alguien con quien tenías mucho contacto cotidiano",
    ],
  },
  {
    id: "garganta",
    keywords: ["garganta", "tragar", "voz", "afonia", "afonía", "laringitis", "nudo en la garganta"],
    termino: "Garganta",
    capa: "Ectodermo",
    sentido:
      "La garganta es el paso de la palabra: lo que se dice y lo que se traga en silencio. Un nudo o molestia ahí suele hablar de algo que se quiso decir y no se dijo, o de haber tenido que callar algo importante.",
    enfoque:
      "Preguntarte qué palabra, petición o verdad te queda atorada sin poder salir, y a quién iba dirigida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cGarganta\u201d)",
    otrasCausas: [
      "Una opinión o un límite que no pudiste expresar en el momento adecuado",
      "Un secreto o una verdad familiar que se quedó sin nombrar",
      "Una situación en la que tu voz no fue escuchada ni tomada en cuenta",
    ],
  },
  {
    id: "corazon",
    keywords: ["corazon", "corazón", "taquicardia", "palpitaciones"],
    termino: "Corazón",
    capa: "Mesodermo",
    sentido:
      "El corazón representa los asuntos del afecto: a quién amamos, a quién dejamos entrar, y las heridas que dejan las pérdidas o los desencuentros amorosos. Se activa cuando algo del amor propio o hacia otros queda en conflicto.",
    enfoque:
      "Identificar si lo que pide atención es una herida de amor reciente, o una forma antigua de quererte a ti misma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCorazón\u201d)",
    otrasCausas: [
      "Una ruptura o un desencuentro afectivo que aún duele",
      "Dificultad para recibir cariño, aunque lo desees profundamente",
      "Una forma dura de juzgarte a ti misma en asuntos del corazón",
    ],
  },
  {
    id: "pecho",
    keywords: ["pecho", "torax", "tórax", "pulmones", "opresion en el pecho", "opresión en el pecho"],
    termino: "Pecho (opresión o dolor en el)",
    capa: "Mesodermo",
    sentido:
      "El pecho alberga el corazón y los pulmones: el centro afectivo y el espacio para respirar la propia vida. Una opresión ahí suele hablar de afecto contenido, o de sentir que no hay suficiente espacio para respirar tranquila.",
    enfoque:
      "Notar si lo que pesa en el pecho es algo que no se ha dicho, o una carga que no te está dejando respirar con calma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cPecho, opresión del\u201d)",
    otrasCausas: [
      "Un cariño o una palabra importante que nunca llegaste a expresar",
      "Una etapa en la que sentiste que no podías mostrar tu vulnerabilidad",
      "Una responsabilidad que te quita el aire, literal o metafóricamente",
    ],
  },
  {
    id: "vientre",
    keywords: ["vientre", "abdomen", "intestino", "intestinos", "digestion", "digestión"],
    termino: "Vientre",
    capa: "Endodermo",
    sentido:
      "El vientre es el centro de lo instintivo y lo nutricio: de ahí viene el \u201cme cayó mal\u201d o el presentimiento visceral. Sus molestias suelen hablar de algo que no se ha podido digerir emocionalmente, o de un instinto que no se está escuchando.",
    enfoque:
      "Notar qué situación reciente \u201cno te cayó bien\u201d o qué corazonada has estado ignorando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cVientre\u201d)",
    otrasCausas: [
      "Una decisión que tu instinto ya había advertido antes de que pasara",
      "Una situación familiar difícil de \u201cdigerir\u201d emocionalmente",
      "Un cambio grande (de casa, de ciudad, de etapa) que el cuerpo aún está procesando",
    ],
  },
  {
    id: "espalda-baja",
    keywords: ["espalda baja", "lumbar", "lumbares", "cintura", "cadera"],
    termino: "Espalda (parte baja)",
    capa: "Mesodermo",
    sentido:
      "La zona lumbar sostiene todo el peso del cuerpo y suele asociarse al sostén material y económico de la vida: dinero, techo, lo básico para sobrevivir. Se activa cuando esa sensación de sostén se tambalea.",
    enfoque:
      "Revisar qué preocupación de sostén material o económico está presente en esta etapa, aunque parezca menor.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cEspalda, dolor lumbar\u201d)",
    otrasCausas: [
      "Una preocupación económica que llevas cargando en silencio",
      "Una etapa de mucha incertidumbre laboral o de vivienda",
      "Sentir que sostienes tú sola el peso material de tu familia",
    ],
  },
  {
    id: "brazos",
    keywords: ["brazos", "brazo", "manos", "hombros", "hombro", "codo", "muñeca"],
    termino: "Brazos y manos (molestias en)",
    capa: "Mesodermo",
    sentido:
      "Los brazos y las manos son el puente hacia el abrazo y hacia la acción: lo que damos, lo que sostenemos, lo que hacemos con nuestras propias manos. Sus molestias suelen hablar de un abrazo que falta o de una acción que se está conteniendo.",
    enfoque:
      "Preguntarte si hay un abrazo (literal o figurado) que necesitas dar o recibir, o algo que quieres hacer y te estás frenando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cBrazos, molestias en los\u201d)",
    otrasCausas: [
      "Un vínculo cercano donde falta contacto físico o afecto expresado",
      "Un proyecto que quieres emprender con tus propias manos y aún no te animas",
      "Una tarea que sientes que cargas tú sola sin ayuda",
    ],
  },
  {
    id: "piernas",
    keywords: ["piernas", "pierna", "rodillas", "rodilla", "pies", "pie", "tobillo"],
    termino: "Piernas y pies (molestias en)",
    capa: "Mesodermo",
    sentido:
      "Las piernas y los pies representan el avance en la vida: la dirección, el apoyo y la firmeza para seguir caminando. Sus molestias suelen aparecer cuando hay dudas sobre el rumbo, o resistencia a avanzar hacia algo.",
    enfoque:
      "Identificar hacia dónde sientes que deberías avanzar y qué te está deteniendo realmente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cPiernas, molestias en las\u201d)",
    otrasCausas: [
      "Una decisión importante sobre tu rumbo que llevas tiempo posponiendo",
      "Un cambio de dirección en tu vida que te da miedo dar",
      "Sentir que no tienes suficiente apoyo firme para seguir adelante",
    ],
  },
  {
    id: "alegria",
    keywords: ["alegría", "alegria", "feliz", "felicidad", "gozo", "dicha", "plenitud", "contento", "contenta", "alegre", "vitalidad", "entusiasmo", "ilusión", "ilusion"],
    termino: "Alegría y vitalidad expansiva",
    capa: "Emoción",
    sentido:
      "La alegría y el entusiasmo son respuestas biológicas de apertura, regeneración somática y celebración del presente. A nivel neurobiológico, activan el sistema vagal ventral y liberan endorfinas y dopamina, enviando al organismo la señal de que es seguro habitar el cuerpo, abrir el pecho y conectar con el mundo.",
    enfoque:
      "Anclar esta vivencia en el cuerpo con tres respiraciones conscientes, reconociendo el bienestar como un recurso interior siempre disponible.",
    fuente: "Psicosomática Clínica y Regulación Vagal (banco local, entrada “Alegría y Vitalidad”)",
    otrasCausas: [
      "Un logro significativo, cambio de etapa o superación que ahora da frutos",
      "Un vínculo afectivo genuino que te brinda seguridad, ligereza y reciprocidad",
      "Permiso interno para disfrutar plenamente sin miedo a que se termine",
    ],
  },
  {
    id: "gratitud",
    keywords: ["gratitud", "agradecido", "agradecida", "agradecimiento", "aprecio", "bendición", "bendicion"],
    termino: "Gratitud y plenitud del corazón",
    capa: "Emoción",
    sentido:
      "La gratitud promueve la coherencia cardíaca y calma la hipervigilancia del sistema nervioso. Reconoce que la vida, con sus luces y sombras, ofrece nutrición y apoyo. Ensancha la capacidad de recibir y fortalece la inmunidad.",
    enfoque:
      "Llevar una mano al pecho y nombrar internamente aquello que hoy nutre tu vida con calma y calidez.",
    fuente: "Coherencia Cardíaca y Neurobiología del Afecto (banco local, entrada “Gratitud y Plenitud”)",
    otrasCausas: [
      "Reconocer el acompañamiento o cuidado incondicional de seres queridos",
      "Superar una dificultad previa y cosechar madurez y aprendizaje",
      "Apreciación profunda de la paz, la salud y la serenidad cotidiana",
    ],
  },
  {
    id: "paz-interior",
    keywords: ["paz interior", "paz", "serenidad", "calma", "tranquilidad", "sosiego", "armonía", "armonia"],
    termino: "Paz interior y autorregulación",
    capa: "Emoción",
    sentido:
      "La paz interior y la serenidad marcan el estado de homeostasis óptimo, donde no hay necesidad biológica de atacar, huir ni paralizarse. Los tejidos se reparan y la mente reposa en claridad.",
    enfoque:
      "Permitirte habitar este momento de calma sin apurarte a resolver ni producir nada de inmediato.",
    fuente: "Neurobiología y Homeostasis Somática (banco local, entrada “Paz Interior y Homeostasis”)",
    otrasCausas: [
      "Cierre o resolución armónica de un conflicto previo",
      "Límites personales bien puestos que protegen tu espacio vital",
      "Aceptación profunda del momento presente y de tus propios tiempos",
    ],
  },
  {
    id: "esperanza-confianza",
    keywords: ["esperanza", "confianza", "fe", "optimismo", "motivación", "motivacion", "motivado", "motivo"],
    termino: "Esperanza y confianza básica",
    capa: "Emoción",
    sentido:
      "La esperanza y la motivación movilizan la energía creadora hacia el futuro con confianza en los recursos propios. Desactivan el catastrofismo y permiten avanzar paso a paso con certeza interior.",
    enfoque:
      "Dar hoy un paso concreto en dirección a lo que deseas, confiando en tu capacidad de sostener tu camino.",
    fuente: "Psicología Somática y Resiliencia (banco local, entrada “Esperanza y Confianza Básica”)",
    otrasCausas: [
      "Nuevos proyectos o propósitos alineados con tus valores esenciales",
      "El descubrimiento o reconexión con talentos y fortalezas personales",
      "Sensación de respaldo y claridad en la dirección de vida",
    ],
  },
  {
    id: "miedo",
    keywords: ["miedo", "temor", "panico", "pánico"],
    termino: "Miedo",
    capa: "Emoción",
    sentido:
      "El miedo biológico avisa de un peligro real o memorizado. Cuando se vuelve crónico, suele estar sosteniendo la sensación de no tener suficiente control ni protección sobre lo que puede pasar.",
    enfoque:
      "Distinguir qué parte del miedo responde a algo presente y qué parte pertenece a una vivencia anterior que se activó de nuevo.",
    fuente: "Nueva Medicina Germánica (Dr. Ryke Geerd Hamer), síntesis en banco local",
    otrasCausas: [
      "Un accidente o susto que viviste en la infancia",
      "Una amenaza o peligro real que enfrentó tu familia",
      "Una etapa en la que dependías por completo de la protección de otra persona",
    ],
  },
  {
    id: "culpa",
    keywords: ["culpa", "culpable"],
    termino: "Culpa",
    capa: "Emoción",
    sentido:
      "La culpa aparece cuando la persona siente que su existencia, sus decisiones o su bienestar le quitan algo a otro. Muchas veces protege una lealtad invisible hacia alguien de la familia.",
    enfoque:
      "Preguntarse a quién se estaría \u201ctraicionando\u201d si esa culpa desapareciera del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCulpabilidad\u201d)",
    otrasCausas: [
      "La muerte o enfermedad de alguien cercano en un momento en que a ti te iba bien",
      "Una decisión que tomaste priorizándote a ti y que otra persona no recibió bien",
      "Un secreto familiar que sientes que no te corresponde cargar, pero cargas igual",
    ],
  },
  {
    id: "rabia",
    keywords: ["rabia", "ira", "enojo", "furia"],
    termino: "Rabia",
    capa: "Emoción",
    sentido:
      "La rabia suele aparecer cuando algo importante fue arrebatado, invadido o impedido, y no hubo espacio ni momento para expresarlo cuando ocurrió.",
    enfoque:
      "Ubicar el momento exacto en que esa rabia se quedó sin salida, y encontrar una forma segura de expresarla ahora.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCólera\u201d)",
    otrasCausas: [
      "Una injusticia que viviste y no pudiste reclamar en su momento",
      "Alguien que tomó una decisión importante por ti sin consultarte",
      "Una situación en la que tuviste que quedarte en silencio para evitar un conflicto mayor",
    ],
  },
  {
    id: "tristeza",
    keywords: ["tristeza", "triste", "duelo", "melancolia", "melancolía"],
    termino: "Tristeza",
    capa: "Emoción",
    sentido:
      "La tristeza acompaña la pérdida de algo o alguien significativo. Cuando se queda estancada, suele ser porque el duelo no se terminó de reconocer o de despedir.",
    enfoque:
      "Identificar qué o a quién no se ha terminado de despedir del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cTristeza\u201d)",
    otrasCausas: [
      "Una mudanza, cambio de ciudad o de escuela que no elegiste",
      "El final de una amistad o relación que nunca se cerró del todo",
      "Un sueño o proyecto que tuviste que dejar ir",
    ],
  },
  {
    id: "abandono",
    keywords: ["abandono", "abandonada", "abandonado", "soledad"],
    termino: "Abandono",
    capa: "Emoción",
    sentido:
      "El sentimiento de abandono aparece cuando el vínculo de sostén más temprano se sintió inestable o ausente, y esa memoria se activa cada vez que un vínculo actual se percibe frágil.",
    enfoque:
      "Reconocer en qué vínculo actual se está repitiendo esa misma sensación temprana.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cAbandono\u201d)",
    otrasCausas: [
      "Una etapa de la infancia en la que uno de tus padres estuvo física o emocionalmente ausente",
      "Una relación que terminó de forma repentina y sin explicación",
      "Un momento en que pediste ayuda y no la recibiste",
    ],
  },
  {
    id: "verguenza",
    keywords: ["verguenza", "vergüenza", "humillacion", "humillación"],
    termino: "Vergüenza",
    capa: "Emoción",
    sentido:
      "La vergüenza surge cuando la persona siente que una parte suya, expuesta ante otros, no será aceptada. Suele estar ligada a un momento específico de exposición o juicio.",
    enfoque:
      "Nombrar la escena exacta donde se instaló esa vergüenza por primera vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cVergüenza\u201d)",
    otrasCausas: [
      "Un error que sentiste que todos notaron en su momento",
      "Una comparación negativa frente a otras personas, en tu familia o en el colegio",
      "Un aspecto de tu cuerpo o tu forma de ser que aprendiste a esconder",
    ],
  },
  {
    id: "impotencia",
    keywords: ["impotencia", "impotente"],
    termino: "Impotencia",
    capa: "Emoción",
    sentido:
      "La impotencia aparece cuando la persona quiere cambiar algo que está fuera de su control directo. A menudo esconde una exigencia interna de resolver algo que no le correspondía resolver sola.",
    enfoque:
      "Distinguir qué parte de la situación sí depende de la persona y cuál no, para soltar la que no.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cImpotencia\u201d)",
    otrasCausas: [
      "Una situación de salud, tuya o de alguien cercano, que no pudiste cambiar",
      "Un sistema, institución o jefe frente al que no tenías forma real de reclamar",
      "Un momento en que viste sufrir a alguien que amas sin poder hacer nada",
    ],
  },
  {
    id: "inseguridad",
    keywords: ["inseguridad", "insegura", "inseguro"],
    termino: "Inseguridad",
    capa: "Emoción",
    sentido:
      "La inseguridad aparece cuando la persona duda de su propio criterio o valor, y busca fuera de sí misma la confirmación de que está bien. Suele activarse en los mismos terrenos donde de niña no recibió una mirada de aprobación constante.",
    enfoque:
      "Identificar en qué área específica se necesita más la aprobación externa, y de quién se esperaba originalmente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cInseguridad\u201d)",
    otrasCausas: [
      "Una comparación constante con un hermano, hermana o compañero durante la infancia",
      "Un entorno familiar donde el afecto dependía de los logros o el buen comportamiento",
      "Una crítica temprana que se quedó grabada como una verdad sobre ti mismo",
    ],
  },
  {
    id: "desanimo",
    keywords: ["desanimo", "desánimo", "desmotivacion", "desmotivación"],
    termino: "Desánimo",
    capa: "Emoción",
    sentido:
      "El desánimo aparece cuando la persona ha sostenido un esfuerzo durante mucho tiempo sin ver el fruto esperado, y el sistema empieza a conservar energía retirando las ganas como forma de protección.",
    enfoque:
      "Reconocer cuánto tiempo lleva sosteniéndose ese esfuerzo, y si todavía tiene sentido seguir empujando de la misma forma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cDesánimo\u201d)",
    otrasCausas: [
      "Una etapa larga de esfuerzo sin resultados visibles",
      "Un sueño que fuiste posponiendo hasta perder de vista por qué lo querías",
      "Un entorno que no reconoce ni celebra tus avances",
    ],
  },
  {
    id: "frustracion",
    keywords: ["frustracion", "frustración", "frustrada", "frustrado"],
    termino: "Frustración",
    capa: "Emoción",
    sentido:
      "La frustración surge cuando el esfuerzo puesto en algo no logra el resultado esperado, y suele acumularse cuando esa brecha entre el esfuerzo y el resultado se repite varias veces sin ser reconocida.",
    enfoque:
      "Revisar si la expectativa que no se cumplió era realista, o si fue heredada de alguien más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cFrustración\u201d)",
    otrasCausas: [
      "Un proyecto en el que pusiste mucho esfuerzo y no obtuvo el reconocimiento esperado",
      "Una meta que perseguiste durante años sin lograr avanzar",
      "Una relación en la que sentiste que dabas más de lo que recibías",
    ],
  },
  {
    id: "celos",
    keywords: ["celos", "celosa", "celoso"],
    termino: "Celos",
    capa: "Emoción",
    sentido:
      "Los celos combinan miedo a perder algo importante con la sensación de no ser suficiente frente a otro. Suelen aparecer cuando un vínculo se percibe amenazado por la presencia o el valor de alguien más.",
    enfoque:
      "Distinguir si el miedo real es perder el vínculo, o es una vieja sensación de no ser lo bastante especial para alguien.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCelos\u201d)",
    otrasCausas: [
      "Una infancia en la que sentiste que un hermano o hermana recibía más atención que tú",
      "Una relación anterior en la que sí te fueron infiel o te dejaron por alguien más",
      "Un vínculo actual donde la comunicación sobre el compromiso no es del todo clara",
    ],
  },
  {
    id: "ojos",
    keywords: ["ojos", "vista", "vision", "visión", "ojo"],
    termino: "Ojos (molestias en la vista)",
    capa: "Ectodermo",
    sentido:
      "Los ojos son el órgano de \u201cno querer ver\u201d: algo en la realidad presente resulta tan difícil de mirar de frente que el cuerpo, literalmente, empieza a desenfocarlo. Suele activarse ante una situación familiar o laboral de la que preferiríamos apartar la mirada.",
    enfoque:
      "Preguntarte con honestidad qué es exactamente lo que no quieres ver, aunque ya lo sepas desde hace tiempo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cOjos, vista\u201d)",
    otrasCausas: [
      "Una situación familiar difícil que prefieres no mirar de frente",
      "Un futuro incierto que evitas visualizar porque te genera temor",
      "Algo evidente en una relación que decidiste no confirmar del todo",
    ],
  },
  {
    id: "oidos",
    keywords: ["oidos", "oídos", "oido", "oído", "audicion", "audición"],
    termino: "Oídos (molestias auditivas)",
    capa: "Ectodermo",
    sentido:
      "Los oídos son el órgano de \u201cno querer escuchar\u201d: algo que alguien dijo, o algo que se repite en tu entorno, resulta tan incómodo que el cuerpo empieza a bajarle el volumen. Es distinto del silencio elegido: aquí el cuerpo decide por ti.",
    enfoque:
      "Identificar qué comentario, discusión o ruido de fondo llevas tiempo intentando no escuchar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cOídos, audición\u201d)",
    otrasCausas: [
      "Una crítica repetida de alguien cercano que preferirías no seguir escuchando",
      "Un ambiente familiar o laboral con conflictos verbales constantes",
      "Una verdad que alguien te dijo y que decidiste no terminar de procesar",
    ],
  },
  {
    id: "dientes",
    keywords: ["dientes", "diente", "muela", "muelas", "dental"],
    termino: "Dientes (molestias dentales)",
    capa: "Mesodermo",
    sentido:
      "Los dientes representan la capacidad de \u201cmorder\u201d la vida: decidir, avanzar, defenderse. Sus molestias suelen aparecer cuando hay una agresividad o una decisión importante que se contuvo en vez de expresarse.",
    enfoque:
      "Notar si hay una decisión pendiente que vienes posponiendo, o una molestia que te has tragado en vez de decir.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cDientes\u201d)",
    otrasCausas: [
      "Una decisión importante que sigues aplazando por miedo a equivocarte",
      "Un enojo hacia alguien cercano que nunca terminaste de expresar",
      "Una etapa en la que sentiste que no podías \u201cdefenderte\u201d de una situación",
    ],
  },
  {
    id: "higado",
    keywords: ["higado", "hígado", "biliar", "bilis"],
    termino: "Hígado",
    capa: "Endodermo",
    sentido:
      "El hígado se relaciona con la sensación de carencia y con la rabia que no se permite expresar: \u201cme quitaron algo que era mío\u201d, o el miedo de fondo a no tener suficiente para sobrevivir. También es el órgano de la ira contenida hacia una injusticia.",
    enfoque:
      "Revisar si hay una injusticia reciente frente a la que te tragaste la rabia en vez de nombrarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cHígado\u201d)",
    otrasCausas: [
      "Una etapa de carencia económica real o el miedo a que vuelva a repetirse",
      "Una injusticia reciente en la que sentiste que te quitaron algo que te correspondía",
      "Una rabia antigua hacia una figura de autoridad que nunca se expresó",
    ],
  },
  {
    id: "rinones",
    keywords: ["rinones", "riñones", "rinon", "riñon", "riñón"],
    termino: "Riñones",
    capa: "Mesodermo",
    sentido:
      "Los riñones filtran lo que ya no sirve y sostienen el equilibrio interno; simbólicamente se relacionan con miedos profundos a perder la estructura de la propia vida —una relación, un estatus, un territorio— y con la dificultad para \u201csoltar\u201d líquidos, es decir, para dejar ir.",
    enfoque:
      "Identificar qué miedo profundo a \u201cperderlo todo\u201d ha estado presente en las últimas semanas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cRiñones\u201d)",
    otrasCausas: [
      "Un miedo profundo a perder tu estabilidad económica o tu hogar",
      "Una separación o cambio grande que sentiste como perder tu propio territorio",
      "Dificultad para soltar una situación que ya no tiene sentido sostener",
    ],
  },
  {
    id: "tiroides",
    keywords: ["tiroides", "hipotiroidismo", "hipertiroidismo"],
    termino: "Tiroides",
    capa: "Endodermo",
    sentido:
      "La tiroides regula el ritmo del cuerpo, y simbólicamente se activa ante la sensación de \u201cno ser lo bastante rápida\u201d frente a una amenaza o una exigencia —tener que actuar ya, sin el tiempo suficiente para hacerlo bien.",
    enfoque:
      "Observar si sientes que la vida te exige ir más rápido de lo que realmente puedes sostener.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cTiroides\u201d)",
    otrasCausas: [
      "Una etapa con plazos o exigencias que sientes imposibles de cumplir a tiempo",
      "Una responsabilidad que asumiste sin sentirte preparada para su ritmo",
      "Una comparación constante con la velocidad o el logro de otras personas",
    ],
  },
  {
    id: "alergias",
    keywords: ["alergia", "alergias", "rinitis", "alérgica", "alergica", "alérgico", "alergico"],
    termino: "Alergias",
    capa: "Ectodermo",
    sentido:
      "Una alergia es, simbólicamente, un rechazo del cuerpo hacia algo o alguien que en su momento se vivió como una intrusión no deseada. El sistema de defensa reacciona de más porque en el pasado algo similar sí representó una amenaza real.",
    enfoque:
      "Preguntarte a qué —o a quién— asocias inconscientemente con lo que te genera la reacción alérgica.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cAlergias\u201d)",
    otrasCausas: [
      "Una separación de alguien que en su momento sentiste como una invasión de tu espacio",
      "Una situación pasada que se repite en apariencia y reactiva la misma alarma",
      "Un ambiente actual —familiar o laboral— que sientes que invade tu territorio personal",
    ],
  },
  {
    id: "cabello",
    keywords: ["cabello", "pelo", "alopecia", "caida de cabello", "caída de cabello", "caida del cabello", "caída del cabello"],
    termino: "Cabello (caída del)",
    capa: "Ectodermo",
    sentido:
      "El cabello se asocia con la vitalidad y con la propia imagen frente al mundo. Su caída suele activarse tras una etapa de estrés sostenido, o cuando algo de la propia identidad —un rol, una etapa, una relación— se sintió amenazado.",
    enfoque:
      "Revisar qué tan sostenido ha sido tu nivel de estrés en los últimos meses, más allá de lo que aparentas hacia afuera.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCabello, caída del\u201d)",
    otrasCausas: [
      "Un periodo de estrés sostenido que has minimizado frente a los demás",
      "Un cambio de identidad o de rol —maternidad, trabajo, edad— que cuesta asimilar",
      "Una etapa en la que sentiste que perdías el control sobre tu propia imagen",
    ],
  },
  {
    id: "insomnio",
    keywords: ["insomnio", "no puedo dormir", "no logro dormir", "no duermo bien", "dificultad para dormir"],
    termino: "Insomnio",
    capa: "Ectodermo",
    sentido:
      "El insomnio suele ser el cuerpo en modo de vigilancia: una parte de ti sigue \u201cmontando guardia\u201d incluso de noche, como si soltar el control mientras duermes fuera peligroso. Es común en etapas de incertidumbre o cuando hay algo que se necesita resolver y aún no tiene solución.",
    enfoque:
      "Preguntarte de qué situación concreta sientes que no puedes \u201cdesconectarte\u201d ni siquiera para dormir.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cInsomnio\u201d)",
    otrasCausas: [
      "Una situación sin resolver que tu mente sigue repasando de noche",
      "Una responsabilidad que sientes que no puedes soltar ni un momento",
      "Un periodo de incertidumbre sobre el futuro cercano",
    ],
  },
  {
    id: "cansancio",
    keywords: ["cansancio", "fatiga", "agotamiento", "cansada", "cansado", "agotada", "agotado", "sin energia", "sin energía"],
    termino: "Cansancio y fatiga",
    capa: "Mesodermo",
    sentido:
      "El cansancio que no se explica solo por falta de sueño suele hablar de un desgaste por resistirse a algo: seguir sosteniendo una situación, un vínculo o un rol del que, en el fondo, ya te gustaría soltarte.",
    enfoque:
      "Identificar qué es exactamente lo que sigues sosteniendo aunque ya no tengas fuerzas para hacerlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cCansancio, fatiga\u201d)",
    otrasCausas: [
      "Una situación o vínculo que sostienes por obligación más que por deseo",
      "Una etapa larga de dar mucho sin recibir el mismo cuidado de vuelta",
      "Una resistencia interna a un cambio que sabes que necesitas hacer",
    ],
  },
  {
    id: "envidia",
    keywords: ["envidia", "envidiosa", "envidioso"],
    termino: "Envidia",
    capa: "Emoción",
    sentido:
      "La envidia rara vez habla de querer lo que el otro tiene; casi siempre señala un deseo propio que no te has permitido nombrar ni perseguir todavía. Es información valiosa sobre lo que sí quieres, disfrazada de incomodidad hacia otra persona.",
    enfoque:
      "Preguntarte, sin juzgarte, qué es exactamente lo que esa persona tiene que tú también deseas para ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cEnvidia\u201d)",
    otrasCausas: [
      "Un logro ajeno que te recuerda una meta propia que dejaste pausada",
      "Una comparación constante que aprendiste desde la infancia",
      "Un deseo genuino que nunca te has atrevido a perseguir abiertamente",
    ],
  },
  {
    id: "desconfianza",
    keywords: ["desconfianza", "desconfiar", "desconfiada", "desconfiado", "no confio", "no confío"],
    termino: "Desconfianza",
    capa: "Emoción",
    sentido:
      "La desconfianza suele ser una cicatriz con buena memoria: una vez que confiaste y salió mal, el cuerpo aprendió a protegerte por adelantado. El reto es que esa protección, sostenida por mucho tiempo, también te aleja de vínculos que sí podrían sostenerte.",
    enfoque:
      "Distinguir si la desconfianza actual responde a esta persona en concreto, o a una herida de confianza mucho más antigua.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cDesconfianza\u201d)",
    otrasCausas: [
      "Una traición pasada que aún no ha terminado de sanar",
      "Un patrón familiar donde confiar salió caro más de una vez",
      "Una situación actual con señales genuinamente confusas o contradictorias",
    ],
  },
  {
    id: "agobio",
    keywords: ["agobio", "agobiada", "agobiado", "sobrecarga", "sobrecargada", "sobrecargado", "abrumada", "abrumado"],
    termino: "Agobio / sobrecarga",
    capa: "Emoción",
    sentido:
      "El agobio aparece cuando lo que tienes que sostener supera, al menos por ahora, lo que sientes que puedes sostener. No es debilidad: es una señal clara de que algo en la carga actual necesita redistribuirse o soltarse.",
    enfoque:
      "Hacer una lista honesta de todo lo que estás sosteniendo ahora mismo, y preguntarte qué de eso no te corresponde solo a ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cAgobio, sobrecarga\u201d)",
    otrasCausas: [
      "Demasiadas responsabilidades acumuladas en un periodo corto de tiempo",
      "Dificultad para pedir ayuda o delegar tareas que sí podrías compartir",
      "Una exigencia personal muy alta sobre cómo \u201cdeberías\u201d estar manejándolo todo",
    ],
  },
  {
    id: "rechazo",
    keywords: ["rechazo", "rechazada", "rechazado", "no me eligieron", "no fui elegida", "no fui elegido"],
    termino: "Rechazo",
    capa: "Emoción",
    sentido:
      "El rechazo duele porque toca una pregunta muy antigua: \u201c¿soy suficiente para ser elegida?\u201d. A diferencia del abandono, que habla de que alguien se fue, el rechazo habla de no haber sido escogida desde el principio —en un trabajo, un grupo, una relación.",
    enfoque:
      "Recordar que no ser elegida en una situación puntual no es una sentencia sobre tu valor como persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cRechazo\u201d)",
    otrasCausas: [
      "Una oportunidad laboral o académica en la que no fuiste seleccionada",
      "Un grupo social en el que sentiste que no encajabas del todo",
      "Una infancia en la que sentiste que tenías que esforzarte demasiado para ser aceptada",
    ],
  },
  {
    id: "confusion",
    keywords: ["confusion", "confusión", "confundida", "confundido", "no se que hacer", "no sé qué hacer"],
    termino: "Confusión",
    capa: "Emoción",
    sentido:
      "La confusión suele aparecer cuando dos partes de ti quieren cosas distintas al mismo tiempo —lo que sientes y lo que \u201cdeberías\u201d sentir, por ejemplo. No es falta de inteligencia: es la señal de un conflicto interno que todavía no se ha nombrado con claridad.",
    enfoque:
      "En vez de buscar la respuesta correcta, nombrar por separado las dos (o más) voces internas que están en desacuerdo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cConfusión\u201d)",
    otrasCausas: [
      "Una decisión importante donde la razón y el deseo apuntan en direcciones distintas",
      "Demasiadas opiniones externas sobre qué deberías hacer con tu vida",
      "Un cambio de vida grande sin un punto de referencia claro para orientarte",
    ],
  },
  {
    id: "vacio",
    keywords: ["vacio", "vacío", "sin sentido", "sin proposito", "sin propósito", "vacio existencial", "vacío existencial"],
    termino: "Vacío existencial",
    capa: "Emoción",
    sentido:
      "El vacío no siempre significa que algo está mal; a veces marca el final honesto de una etapa que ya cumplió su función, antes de que la siguiente haya empezado a tomar forma. Es incómodo, pero suele ser un espacio fértil, no un callejón sin salida.",
    enfoque:
      "En vez de llenarlo de inmediato con ruido u obligaciones, permitirte habitarlo un poco para escuchar qué quiere surgir después.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada \u201cVacío existencial\u201d)",
    otrasCausas: [
      "El cierre de una etapa importante —estudios, trabajo, relación— sin un siguiente paso claro todavía",
      "Haber alcanzado una meta que perseguiste mucho tiempo y sentir que \u201cya no sabes qué sigue\u201d",
      "Una desconexión gradual de actividades que antes te daban sentido",
    ],
  },
  {
    id: "asma",
    keywords: ["asma", "asmatica", "asmática", "asmatico", "asmático", "falta de aire", "ahogo"],
    termino: "Asma",
    capa: "Endodermo",
    sentido:
      "El asma habla de un territorio familiar o afectivo donde sentiste que te faltaba espacio para respirar con libertad —a veces literal, a veces por una sobreprotección o un conflicto no resuelto en el hogar. El cuerpo reacciona cerrando el paso del aire, como si necesitara protegerse de algo en el ambiente.",
    enfoque:
      "Identificar en qué relación o espacio sientes que no puedes respirar con total libertad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Asma”)",
    otrasCausas: [
      "Un ambiente familiar sobreprotector o con conflictos de espacio",
      "Una etapa de la infancia con miedo a perder a una figura cercana",
      "Una situación actual donde sientes que no puedes expresarte con libertad",
    ],
  },
  {
    id: "tos-bronquitis",
    keywords: ["tos", "bronquitis", "bronquios"],
    termino: "Tos y bronquitis",
    capa: "Endodermo",
    sentido:
      "La tos suele ser el cuerpo intentando “ladrar” una irritación que no se expresó con palabras: una molestia hacia alguien cercano, o el deseo de llamar la atención sobre algo que se está pasando por alto en el entorno familiar o laboral.",
    enfoque:
      "Notar qué molestia reciente no lograste expresar en voz alta frente a quien correspondía.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Tos, bronquitis”)",
    otrasCausas: [
      "Una irritación hacia alguien cercano que no se expresó a tiempo",
      "Un ambiente cargado de humo, tensión o discusiones constantes",
      "Una necesidad de llamar la atención sobre algo que se ha ignorado",
    ],
  },
  {
    id: "sinusitis",
    keywords: ["sinusitis", "sinusal", "congestion nasal", "congestión nasal", "nariz tapada"],
    termino: "Sinusitis",
    capa: "Ectodermo",
    sentido:
      "La sinusitis suele activarse cuando hay una irritación de fondo hacia una persona muy cercana —alguien que “no soportas tener tan pegado”— pero que no puedes o no quieres alejar de tu vida.",
    enfoque:
      "Preguntarte quién en tu entorno cercano te genera una irritación que prefieres no nombrar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sinusitis”)",
    otrasCausas: [
      "Una convivencia cercana con alguien que te resulta agotador",
      "Una situación familiar de la que no puedes tomar distancia",
      "Un cambio de clima o entorno que coincide con tensión emocional",
    ],
  },
  {
    id: "estrenimiento",
    keywords: ["estreñimiento", "estrenimiento", "constipacion", "constipación"],
    termino: "Estreñimiento",
    capa: "Endodermo",
    sentido:
      "El estreñimiento habla de una dificultad para soltar: ideas, situaciones o vínculos que ya cumplieron su ciclo pero que te cuesta dejar ir. Es una retención física de algo que, simbólicamente, necesita salir.",
    enfoque:
      "Identificar qué situación o relación sigues sosteniendo por costumbre, aunque ya no aporte nada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Estreñimiento”)",
    otrasCausas: [
      "Dificultad general para soltar el control sobre los detalles de tu vida",
      "Un cambio de rutina o de entorno reciente",
      "Una situación que sabes que debes cerrar pero postergas",
    ],
  },
  {
    id: "diarrea",
    keywords: ["diarrea", "diarreas"],
    termino: "Diarrea",
    capa: "Endodermo",
    sentido:
      "La diarrea es lo opuesto al estreñimiento: el cuerpo quiere expulsar algo con urgencia, casi siempre relacionado con miedo o con el deseo de terminar rápido una situación que se volvió insoportable.",
    enfoque:
      "Notar de qué situación reciente sentiste un deseo urgente de escapar o terminar cuanto antes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Diarrea”)",
    otrasCausas: [
      "Un miedo puntual frente a una situación inminente",
      "El deseo de terminar rápido con algo que te incomoda profundamente",
      "Un cambio brusco que tu cuerpo aún no termina de asimilar",
    ],
  },
  {
    id: "vesicula",
    keywords: ["vesicula", "vesícula", "biliares", "calculos biliares", "cálculos biliares"],
    termino: "Vesícula biliar",
    capa: "Endodermo",
    sentido:
      "La vesícula almacena la bilis, y simbólicamente se relaciona con la amargura y el resentimiento acumulado —“tragarse sapos” frente a una injusticia o una relación que dejó un sabor amargo sin resolver.",
    enfoque:
      "Identificar qué situación reciente te dejó un resentimiento que no has terminado de procesar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vesícula biliar”)",
    otrasCausas: [
      "Un conflicto familiar o laboral que te dejó un resentimiento profundo",
      "Una injusticia que sentiste que tuviste que “tragarte”",
      "Una relación que terminó dejando un sabor amargo sin cerrar del todo",
    ],
  },
  {
    id: "pancreas",
    keywords: ["pancreas", "páncreas", "pancreatitis"],
    termino: "Páncreas",
    capa: "Endodermo",
    sentido:
      "El páncreas se asocia con la “dulzura de la vida”: cuando algo esencialmente amoroso o placentero falta en el día a día —sobre todo en el ámbito familiar—, este órgano puede activarse como reflejo de esa carencia afectiva.",
    enfoque:
      "Revisar si hay una carencia de afecto o de disfrute cotidiano que llevas tiempo sin nombrar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Páncreas”)",
    otrasCausas: [
      "Una etapa familiar marcada por la tristeza o la falta de cariño",
      "Una vida cotidiana que sientes vacía de momentos placenteros",
      "Un conflicto sobre quién “endulza” o cuida emocionalmente al otro en casa",
    ],
  },
  {
    id: "hemorroides",
    keywords: ["hemorroides", "hemorroide"],
    termino: "Hemorroides",
    capa: "Mesodermo",
    sentido:
      "Las hemorroides suelen relacionarse con una carga —económica, familiar o laboral— que se sostiene con enojo contenido, como si se llevara un peso sobre los hombros equivocados, sin poder soltarlo ni quejarse abiertamente.",
    enfoque:
      "Identificar qué carga sostienes con resentimiento en vez de haber podido pedir ayuda o delegarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hemorroides”)",
    otrasCausas: [
      "Una responsabilidad económica pesada que sostienes en silencio",
      "Un enojo relacionado con sentirte poco valorada por lo que aportas",
      "Una etapa de mucha presión sin espacio para descansar",
    ],
  },
  {
    id: "ulcera",
    keywords: ["ulcera", "úlcera", "ulcera gastrica", "úlcera gástrica", "ulcera peptica", "úlcera péptica"],
    termino: "Úlcera",
    capa: "Endodermo",
    sentido:
      "La úlcera es una herida que el propio cuerpo se hace por dentro, y suele hablar de una autocrítica corrosiva sostenida durante mucho tiempo —algo que te “carcome” por dentro, casi siempre relacionado con no sentirte digna de algo que deseas.",
    enfoque:
      "Notar qué diálogo interno crítico llevas repitiéndote desde hace tiempo, casi sin darte cuenta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Úlcera”)",
    otrasCausas: [
      "Una autocrítica sostenida por mucho tiempo sobre tu propio valor",
      "Una preocupación crónica que llevas “masticando” sin resolver",
      "Una situación en la que sientes que no mereces lo que deseas",
    ],
  },
  {
    id: "articulaciones",
    keywords: ["articulaciones", "articulacion", "articulación", "dolor articular", "dolores articulares"],
    termino: "Articulaciones (dolor general en las)",
    capa: "Mesodermo",
    sentido:
      "Las articulaciones permiten el movimiento y la flexibilidad; sus molestias suelen aparecer cuando hay una resistencia interna a cambiar de dirección en la vida, o una rigidez frente a algo que en el fondo sabes que necesita moverse.",
    enfoque:
      "Identificar en qué área de tu vida te estás resistiendo a un cambio necesario.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Articulaciones”)",
    otrasCausas: [
      "Una situación que exige flexibilidad y sientes que no puedes dar",
      "Miedo a un cambio de dirección importante en tu vida",
      "Una rigidez de pensamiento heredada de tu familia de origen",
    ],
  },
  {
    id: "fibromialgia",
    keywords: ["fibromialgia"],
    termino: "Fibromialgia",
    capa: "Mesodermo",
    sentido:
      "La fibromialgia suele aparecer tras años de exigencia hacia una misma sin descanso real, junto con una autodevaluación silenciosa: la sensación de que, hagas lo que hagas, nunca es suficiente.",
    enfoque:
      "Revisar cuánto tiempo llevas exigiéndote sin permitirte un descanso genuino.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fibromialgia”)",
    otrasCausas: [
      "Años de sobreexigencia personal sin descanso real",
      "Una autodevaluación silenciosa sostenida por mucho tiempo",
      "Una infancia donde el afecto se sintió condicionado al rendimiento",
    ],
  },
  {
    id: "escoliosis",
    keywords: ["escoliosis"],
    termino: "Escoliosis",
    capa: "Mesodermo",
    sentido:
      "La escoliosis, como desviación de la columna que sostiene el cuerpo, suele hablar de un desequilibrio en la estructura familiar —cargar con un rol que no corresponde a la propia posición dentro de la familia.",
    enfoque:
      "Observar si sientes que cargas con una responsabilidad familiar que no te correspondía por tu lugar en la familia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Escoliosis”)",
    otrasCausas: [
      "Un rol familiar asumido desde muy joven, fuera de lugar",
      "Una infancia con desequilibrio entre las figuras de autoridad",
      "Sentir que sostienes más de lo que te corresponde en tu familia",
    ],
  },
  {
    id: "osteoporosis",
    keywords: ["osteoporosis", "huesos debiles", "huesos débiles"],
    termino: "Osteoporosis",
    capa: "Mesodermo",
    sentido:
      "Los huesos son la estructura de sostén más profunda del cuerpo; su debilitamiento suele relacionarse con una sensación de falta de apoyo real —sentir que ya no tienes sobre qué sostenerte, o que el sostén familiar se ha debilitado.",
    enfoque:
      "Identificar en qué área de tu vida sientes que te falta un sostén real y estable.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Osteoporosis”)",
    otrasCausas: [
      "Una etapa de vida con poco sostén familiar o económico",
      "El envejecimiento vivido con miedo a perder independencia",
      "Una sensación general de inestabilidad en la propia vida",
    ],
  },
  {
    id: "acne",
    keywords: ["acne", "acné", "granos", "espinillas"],
    termino: "Acné",
    capa: "Ectodermo",
    sentido:
      "El acné suele aparecer en etapas de fuerte construcción de identidad —la adolescencia, sobre todo— y habla de un rechazo hacia la propia imagen, o del miedo a ser vista y juzgada por los demás.",
    enfoque:
      "Notar si detrás del malestar por tu piel hay un miedo más profundo a ser mirada o juzgada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Acné”)",
    otrasCausas: [
      "Una etapa de fuerte cuestionamiento sobre tu propia identidad",
      "Miedo a ser juzgada por tu apariencia frente a otros",
      "Una autocrítica constante sobre cómo te ven los demás",
    ],
  },
  {
    id: "psoriasis",
    keywords: ["psoriasis"],
    termino: "Psoriasis",
    capa: "Ectodermo",
    sentido:
      "La piel marca el límite entre uno mismo y el mundo; la psoriasis suele hablar de una herida en ese límite —sentir que alguien invadió tu espacio personal, o una separación dolorosa que dejó marca en la propia piel.",
    enfoque:
      "Revisar si hay una separación o invasión de tu espacio personal que aún duele.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Psoriasis”)",
    otrasCausas: [
      "Una separación dolorosa de una persona muy cercana",
      "Sentir que tu espacio personal fue invadido repetidamente",
      "Dificultad para establecer límites claros con los demás",
    ],
  },
  {
    id: "verrugas",
    keywords: ["verrugas", "verruga"],
    termino: "Verrugas",
    capa: "Ectodermo",
    sentido:
      "Las verrugas suelen relacionarse con una creencia de fealdad o de “tener algo feo” dentro de una misma —un pensamiento o un recuerdo del que te avergüenzas y que, simbólicamente, sale a la superficie de la piel.",
    enfoque:
      "Notar qué pensamiento o recuerdo sientes que te avergonzaría si alguien más lo conociera.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Verrugas”)",
    otrasCausas: [
      "Una creencia arraigada sobre no ser lo bastante bella o aceptable",
      "Un secreto o pensamiento del que sientes vergüenza",
      "Una comparación constante con el aspecto físico de otras personas",
    ],
  },
  {
    id: "unas",
    keywords: ["uñas", "unas quebradizas", "uñas quebradizas", "onicofagia", "morderse las uñas"],
    termino: "Uñas (fragilidad o morderse las)",
    capa: "Ectodermo",
    sentido:
      "Las uñas son una herramienta natural de defensa; su fragilidad, o el hábito de morderlas, suele hablar de una dificultad para defenderte a ti misma frente a los demás, o de una ansiedad que no encuentra otra salida.",
    enfoque:
      "Observar en qué situaciones sientes que no puedes defenderte con la firmeza que te gustaría.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Uñas”)",
    otrasCausas: [
      "Dificultad para poner límites o defender tu punto de vista",
      "Ansiedad acumulada que no encuentra otro canal de salida",
      "Una infancia donde no se te permitía “defenderte” abiertamente",
    ],
  },
  {
    id: "hipertension",
    keywords: ["hipertension", "hipertensión", "presion alta", "presión alta"],
    termino: "Hipertensión",
    capa: "Mesodermo",
    sentido:
      "La presión alta suele hablar de una presión de vida sostenida durante mucho tiempo —demasiadas responsabilidades acumuladas, sin válvula de escape— como si el sistema entero estuviera bajo tensión constante.",
    enfoque:
      "Identificar qué presión sostenida llevas cargando sin encontrar todavía una válvula de escape real.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hipertensión”)",
    otrasCausas: [
      "Demasiadas responsabilidades sostenidas por mucho tiempo",
      "Una tensión familiar o laboral crónica sin resolución",
      "Dificultad para expresar el enojo antes de que se acumule",
    ],
  },
  {
    id: "varices",
    keywords: ["varices", "vena varicosa", "venas varicosas"],
    termino: "Várices",
    capa: "Mesodermo",
    sentido:
      "Las várices en las piernas suelen relacionarse con la sensación de estar estancada en un camino que ya no disfrutas, cargando con obligaciones que te impiden avanzar con la ligereza que te gustaría.",
    enfoque:
      "Notar si sientes que avanzas en la vida por obligación más que por deseo real.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Várices”)",
    otrasCausas: [
      "Una etapa de vida donde avanzas más por obligación que por gusto",
      "Una carga familiar o laboral que sientes en las piernas cada día",
      "Falta de alegría en el camino que actualmente estás recorriendo",
    ],
  },
  {
    id: "colesterol",
    keywords: ["colesterol", "trigliceridos", "triglicéridos"],
    termino: "Colesterol alto",
    capa: "Mesodermo",
    sentido:
      "El colesterol alto suele relacionarse con un miedo antiguo a la carencia o a la escasez —una parte de ti que sigue “acumulando” por si acaso, incluso cuando la vida actual ya no exige esa protección.",
    enfoque:
      "Revisar si hay un miedo antiguo a no tener suficiente que ya no corresponde a tu realidad actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Colesterol”)",
    otrasCausas: [
      "Una infancia marcada por la carencia económica",
      "Miedo heredado a que “no alcance”, aunque hoy tengas lo suficiente",
      "Dificultad para disfrutar de la abundancia presente sin culpa",
    ],
  },
  {
    id: "vertigo",
    keywords: ["vertigo", "vértigo", "mareos", "mareo"],
    termino: "Vértigo y mareos",
    capa: "Ectodermo",
    sentido:
      "El vértigo habla de una pérdida de orientación frente a la vida: no saber bien hacia dónde ir, o sentir que el terreno bajo tus pies —una relación, un trabajo, un proyecto— ya no es tan estable como creías.",
    enfoque:
      "Preguntarte en qué área de tu vida sientes que perdiste el sentido de dirección.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vértigo, mareos”)",
    otrasCausas: [
      "Un cambio de vida grande sin un rumbo claro todavía",
      "Inestabilidad en un vínculo o una situación laboral",
      "Miedo a tomar una decisión importante sin saber qué vendrá después",
    ],
  },
  {
    id: "temblor",
    keywords: ["temblor", "temblores", "manos temblorosas"],
    termino: "Temblor",
    capa: "Ectodermo",
    sentido:
      "El temblor suele ser el sistema nervioso desbordado por un miedo o una emoción que no encontró otra vía de salida, y que el cuerpo termina expresando de forma involuntaria.",
    enfoque:
      "Identificar qué situación reciente te generó un miedo o nerviosismo que no lograste procesar del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Temblor”)",
    otrasCausas: [
      "Un miedo puntual frente a una situación de exposición o juicio",
      "Acumulación de tensión nerviosa sin una vía de descarga",
      "Una sensibilidad heredada frente a situaciones de estrés agudo",
    ],
  },
  {
    id: "diabetes",
    keywords: ["diabetes", "glucosa alta", "azucar alta", "azúcar alta"],
    termino: "Diabetes",
    capa: "Endodermo",
    sentido:
      "La diabetes se asocia, igual que el páncreas, con la falta de “dulzura” vivida en lo cotidiano —afecto, disfrute, ternura— y con una nostalgia profunda hacia una etapa donde esa dulzura sí estaba presente.",
    enfoque:
      "Notar qué momentos o vínculos de tu vida asocias con la última vez que sentiste esa dulzura plena.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Diabetes”)",
    otrasCausas: [
      "Una infancia recordada con mucho más afecto que el presente",
      "Una etapa actual con poco espacio para el disfrute cotidiano",
      "Un conflicto no resuelto sobre recibir cariño de los demás",
    ],
  },
  {
    id: "cistitis",
    keywords: ["cistitis", "vejiga", "infeccion urinaria", "infección urinaria"],
    termino: "Cistitis y vejiga",
    capa: "Ectodermo",
    sentido:
      "La vejiga se relaciona con marcar el propio territorio y con soltar lo que ya no sirve; sus molestias suelen aparecer cuando alguien invade tu espacio, o cuando sientes que no puedes soltar una situación vieja que sigue “pesando”.",
    enfoque:
      "Identificar si sientes que tu espacio o tu territorio personal ha sido invadido recientemente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cistitis, vejiga”)",
    otrasCausas: [
      "Una sensación de que invadieron tu espacio personal o tus decisiones",
      "Dificultad para soltar una situación vieja que sigue pesando",
      "Una etapa de fuerte tensión en la convivencia con otra persona",
    ],
  },
  {
    id: "prostata",
    keywords: ["prostata", "próstata"],
    termino: "Próstata",
    capa: "Endodermo",
    sentido:
      "La próstata suele relacionarse, en los hombres, con conflictos sobre la propia virilidad o el rol de proveedor y protector de la familia —el miedo a no ser “suficiente hombre” para sostener ese lugar.",
    enfoque:
      "Revisar si sientes presión sobre tu rol de proveedor o protector dentro de tu familia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Próstata”)",
    otrasCausas: [
      "Presión por cumplir con el rol de proveedor familiar",
      "Un conflicto sobre la propia masculinidad o virilidad",
      "El paso del tiempo vivido con temor a perder vigor o relevancia",
    ],
  },
  {
    id: "menstruacion",
    keywords: ["menstruacion", "menstruación", "regla", "ciclo menstrual", "dolor menstrual"],
    termino: "Menstruación (molestias en la)",
    capa: "Mesodermo",
    sentido:
      "Las molestias menstruales suelen hablar de un conflicto —consciente o no— con la propia feminidad, o con la idea de “tener que” pasar por este proceso cada mes, como una carga en vez de vivirse en paz con el propio cuerpo.",
    enfoque:
      "Notar qué relación tienes hoy con tu propio ciclo: ¿carga, incomodidad, o aceptación?",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Menstruación”)",
    otrasCausas: [
      "Un conflicto no resuelto con la propia feminidad",
      "Mensajes familiares antiguos sobre la menstruación como “carga”",
      "Tensión o rechazo hacia un cambio de etapa de vida",
    ],
  },
  {
    id: "ovarios",
    keywords: ["ovarios", "quiste ovarico", "quiste ovárico", "ovario"],
    termino: "Ovarios (quistes en los)",
    capa: "Mesodermo",
    sentido:
      "Los quistes ováricos suelen relacionarse con un proyecto de creación frustrado —no necesariamente un hijo, también puede ser un proyecto personal— que quedó “encapsulado”, esperando el momento de nacer.",
    enfoque:
      "Identificar qué proyecto propio sientes que quedó en pausa, esperando el momento de retomarlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ovarios, quistes”)",
    otrasCausas: [
      "Un proyecto personal importante que quedó pausado o frustrado",
      "Presión externa o interna sobre la maternidad",
      "Un conflicto de creación no resuelto en el ámbito profesional o personal",
    ],
  },
  {
    id: "utero",
    keywords: ["utero", "útero", "fibromas", "fibroma uterino"],
    termino: "Útero (fibromas en el)",
    capa: "Mesodermo",
    sentido:
      "El útero es el espacio de la creación y el cuidado; los fibromas suelen hablar de una frustración relacionada con el rol maternal o de cuidado —una decepción con un hijo, real o simbólico, que no se desarrolló como se esperaba.",
    enfoque:
      "Revisar si hay una frustración relacionada con el cuidado de alguien, o con un proyecto que sientes que no floreció.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Útero, fibromas”)",
    otrasCausas: [
      "Una frustración con el rol de madre o cuidadora",
      "Un proyecto de vida que sientes que no llegó a florecer",
      "Un conflicto no resuelto con la propia madre o con la maternidad",
    ],
  },
  {
    id: "infertilidad",
    keywords: ["infertilidad", "no puedo quedar embarazada", "no logro embarazarme"],
    termino: "Infertilidad",
    capa: "Emoción",
    sentido:
      "La dificultad para concebir es, sobre todo, una de las experiencias más dolorosas que puede atravesar una persona, y rara vez tiene una causa única. Simbólicamente, a veces se relaciona con miedos profundos y no del todo conscientes sobre la propia crianza, o con lealtades invisibles hacia la propia historia familiar.",
    enfoque:
      "Buscar acompañamiento profesional especializado es fundamental aquí; esta lectura solo ofrece una capa reflexiva adicional, nunca un diagnóstico ni una explicación cerrada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Infertilidad”)",
    otrasCausas: [
      "Miedos no conscientes relacionados con la propia crianza",
      "Lealtades familiares invisibles hacia la propia historia de origen",
      "El profundo peso emocional y social que ya de por sí implica este proceso",
    ],
  },
  {
    id: "aftas",
    keywords: ["aftas", "llagas en la boca"],
    termino: "Aftas y llagas bucales",
    capa: "Ectodermo",
    sentido:
      "Las aftas suelen aparecer cuando hay palabras duras —dichas hacia otros o hacia una misma— que se quedaron dando vueltas en la boca sin poder suavizarse antes de salir.",
    enfoque:
      "Notar si has estado especialmente dura contigo misma o con alguien más en tu forma de hablar últimamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aftas”)",
    otrasCausas: [
      "Palabras duras dichas hacia ti misma en el diálogo interno",
      "Un conflicto verbal reciente que te dejó incómoda",
      "Autocrítica excesiva sobre algo que dijiste o dejaste de decir",
    ],
  },
  {
    id: "encias",
    keywords: ["encias", "encías", "gingivitis"],
    termino: "Encías",
    capa: "Mesodermo",
    sentido:
      "Las encías sostienen a los dientes, es decir, sostienen la capacidad de decidir y actuar; sus molestias suelen relacionarse con una inseguridad de fondo frente a una decisión que ya se tomó, o que está por tomarse.",
    enfoque:
      "Revisar si dudas del sostén detrás de una decisión reciente o próxima.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Encías”)",
    otrasCausas: [
      "Inseguridad sobre una decisión ya tomada",
      "Falta de apoyo sentido al momento de decidir algo importante",
      "Dudas recurrentes sobre la propia capacidad de decidir bien",
    ],
  },
  {
    id: "fiebre",
    keywords: ["fiebre", "temperatura alta"],
    termino: "Fiebre",
    capa: "Mesodermo",
    sentido:
      "La fiebre es, casi siempre, señal de que el cuerpo está resolviendo activamente un conflicto interno —una especie de combustión necesaria. Simbólicamente suele acompañar etapas de rabia intensa que finalmente encuentra una vía de salida.",
    enfoque:
      "Observar qué situación reciente encendió una rabia o urgencia que el cuerpo está ahora procesando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fiebre”)",
    otrasCausas: [
      "Una rabia intensa reciente que finalmente encuentra salida",
      "Un conflicto que se está resolviendo activamente en este momento",
      "Agotamiento acumulado que el cuerpo procesa de golpe",
    ],
  },
  {
    id: "anemia",
    keywords: ["anemia", "hierro bajo", "falta de hierro"],
    termino: "Anemia",
    capa: "Mesodermo",
    sentido:
      "La sangre representa la alegría de vivir en circulación; la anemia suele hablar de una vitalidad drenada, casi siempre por una tristeza sostenida o por dar mucho de una misma sin recibir el mismo cuidado de vuelta.",
    enfoque:
      "Notar si llevas tiempo dando más de lo que recibes, y cómo eso ha afectado tu propia vitalidad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Anemia”)",
    otrasCausas: [
      "Una etapa larga de dar mucho sin recibir cuidado de vuelta",
      "Tristeza sostenida que ha ido drenando tu vitalidad",
      "Falta de alegría genuina en el día a día actual",
    ],
  },
  {
    id: "hipotension",
    keywords: ["hipotension", "hipotensión", "presion baja", "presión baja"],
    termino: "Hipotensión",
    capa: "Mesodermo",
    sentido:
      "La presión baja suele relacionarse con un desánimo profundo o con haber “bajado los brazos” frente a algo importante —una forma silenciosa en que el cuerpo expresa que ya no encuentra el impulso para seguir empujando.",
    enfoque:
      "Identificar frente a qué área de tu vida sientes que has bajado los brazos últimamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hipotensión”)",
    otrasCausas: [
      "Una desilusión reciente frente a una meta importante",
      "Agotamiento emocional sostenido por mucho tiempo",
      "Sensación de que el esfuerzo ya no vale la pena frente a algo puntual",
    ],
  },
  {
    id: "resentimiento",
    keywords: ["resentimiento", "resentida", "resentido", "rencor"],
    termino: "Resentimiento",
    capa: "Emoción",
    sentido:
      "El resentimiento es una rabia que no se expresó a tiempo y se quedó fermentando por dentro. A diferencia de la rabia, que es más aguda e inmediata, el resentimiento se sostiene en el tiempo, alimentado por repetir mentalmente la misma escena.",
    enfoque:
      "Identificar qué necesitarías decir, o a quién, para empezar a soltar ese rencor sostenido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Resentimiento”)",
    otrasCausas: [
      "Una injusticia antigua que nunca se resolvió del todo",
      "Dificultad para expresar el enojo en el momento en que ocurrió",
      "Una relación donde sientes que diste más de lo que recibiste",
    ],
  },
  {
    id: "nostalgia",
    keywords: ["nostalgia", "anoranza", "añoranza", "extraño esos tiempos"],
    termino: "Nostalgia",
    capa: "Emoción",
    sentido:
      "La nostalgia es un cariño hacia una etapa que ya pasó, y en dosis moderadas es parte natural de reconocer lo vivido. Se vuelve más pesada cuando se convierte en el único lugar cómodo, y el presente empieza a sentirse siempre insuficiente en comparación.",
    enfoque:
      "Distinguir si estás honrando una etapa pasada, o usándola para evitar comprometerte con tu presente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Nostalgia”)",
    otrasCausas: [
      "Un cambio de etapa reciente que cuesta asimilar",
      "Comparación constante entre el presente y una época idealizada",
      "Dificultad para encontrarle sentido pleno al momento actual",
    ],
  },
  {
    id: "perfeccionismo",
    keywords: ["perfeccionismo", "perfeccionista", "todo tiene que salir perfecto"],
    termino: "Perfeccionismo",
    capa: "Emoción",
    sentido:
      "El perfeccionismo suele ser miedo disfrazado de altos estándares: la creencia de que solo serás valiosa o aceptada si todo sale impecable. Es agotador porque la meta —la perfección— nunca termina de alcanzarse del todo.",
    enfoque:
      "Practicar entregar algo “suficientemente bueno” en vez de perfecto, y observar qué pasa realmente después.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Perfeccionismo”)",
    otrasCausas: [
      "Una infancia donde el cariño se sintió condicionado al logro",
      "Miedo profundo a ser juzgada o rechazada por un error",
      "Comparación constante con estándares externos muy altos",
    ],
  },
  {
    id: "apatia",
    keywords: ["apatia", "apatía", "no tengo ganas de nada", "indiferencia"],
    termino: "Apatía",
    capa: "Emoción",
    sentido:
      "La apatía suele ser una forma de protección tras demasiada decepción acumulada: si dejas de esperar algo, ya no puedes decepcionarte de nuevo. No es pereza; es un sistema emocional que bajó el volumen para protegerse.",
    enfoque:
      "Identificar cuándo empezaste a “esperar menos” de la vida, y qué decepción lo provocó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Apatía”)",
    otrasCausas: [
      "Decepciones repetidas que llevaron a bajar las expectativas",
      "Agotamiento emocional acumulado sin espacio de recuperación",
      "Una desconexión gradual de lo que antes te daba sentido",
    ],
  },
  {
    id: "codependencia",
    keywords: ["codependencia", "codependiente", "no puedo estar sin"],
    termino: "Codependencia",
    capa: "Emoción",
    sentido:
      "La codependencia es poner el propio bienestar tan en función del otro, que se vuelve difícil distinguir dónde termina uno y empieza la otra persona. Suele originarse en vínculos tempranos donde el amor se sintió condicionado a cuidar o “salvar” a alguien más.",
    enfoque:
      "Practicar preguntarte, antes de actuar por otro, qué necesitas tú misma en esta situación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Codependencia”)",
    otrasCausas: [
      "Una infancia donde cuidar de otros era la forma de ganarte el amor",
      "Una relación actual donde tu bienestar depende del estado del otro",
      "Dificultad para reconocer tus propias necesidades como válidas",
    ],
  },
  {
    id: "bruxismo",
    keywords: ["bruxismo", "aprieto los dientes", "rechino los dientes", "rechinar los dientes"],
    termino: "Bruxismo",
    capa: "Mesodermo",
    sentido:
      "Apretar o rechinar los dientes de noche suele hablar de una rabia contenida durante el día, que el cuerpo termina descargando mientras duermes, cuando ya no puedes controlarla conscientemente.",
    enfoque:
      "Identificar qué enojo del día no lograste expresar antes de irte a dormir.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bruxismo”)",
    otrasCausas: [
      "Una rabia diaria que se contiene frente a otros por educación o miedo",
      "Tensión acumulada por exigencias laborales o familiares",
      "Dificultad para poner límites durante el día, que el cuerpo cobra de noche",
    ],
  },
  {
    id: "tartamudez",
    keywords: ["tartamudez", "tartamudeo", "trabarse al hablar"],
    termino: "Tartamudez",
    capa: "Ectodermo",
    sentido:
      "La tartamudez suele aparecer cuando hay una prisa interna por decir algo importante junto con un miedo simultáneo a decirlo mal, o a ser interrumpida antes de terminar. El cuerpo se traba entre el impulso de hablar y el freno del miedo.",
    enfoque:
      "Notar si sientes que compites por espacio para hablar, o miedo a que lo que digas no importe.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Tartamudez”)",
    otrasCausas: [
      "Una infancia donde había que competir por ser escuchada",
      "Miedo a equivocarte al hablar frente a otros",
      "Una figura de autoridad que interrumpía frecuentemente al hablar",
    ],
  },
  {
    id: "hernia-discal",
    keywords: ["hernia discal", "hernia de disco", "disco herniado"],
    termino: "Hernia discal",
    capa: "Mesodermo",
    sentido:
      "Una hernia discal suele hablar de una carga sostenida durante demasiado tiempo, en una postura que ya no correspondía al peso real que se estaba cargando —muchas veces una responsabilidad ajena asumida como propia.",
    enfoque:
      "Revisar qué carga llevas sosteniendo que, en el fondo, no te correspondía asumir sola.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hernia discal”)",
    otrasCausas: [
      "Una responsabilidad ajena que asumiste como propia por mucho tiempo",
      "Una carga familiar o laboral sostenida sin apoyo suficiente",
      "Rigidez para pedir ayuda con el peso que llevas encima",
    ],
  },
  {
    id: "tinnitus",
    keywords: ["tinnitus", "zumbido en los oidos", "zumbido en los oídos", "pitido en el oido", "pitido en el oído"],
    termino: "Tinnitus (zumbido en los oídos)",
    capa: "Ectodermo",
    sentido:
      "El zumbido persistente suele hablar de un ruido interno —pensamientos repetitivos, preocupaciones que no se apagan— que el cuerpo termina expresando como sonido, cuando el ambiente externo ya está en silencio.",
    enfoque:
      "Notar qué pensamiento repetitivo suena de fondo en tu mente, incluso cuando todo está en silencio.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Tinnitus”)",
    otrasCausas: [
      "Una preocupación repetitiva que no logras silenciar",
      "Exposición reciente a ambientes de mucho ruido o estrés",
      "Dificultad para encontrar momentos de silencio real en tu rutina",
    ],
  },
  {
    id: "apnea-sueno",
    keywords: ["apnea del sueño", "apnea de sueño", "apnea del sueno", "dejo de respirar al dormir"],
    termino: "Apnea del sueño",
    capa: "Ectodermo",
    sentido:
      "La apnea, la interrupción breve de la respiración al dormir, puede relacionarse con un miedo profundo a soltar el control incluso mientras duermes —como si una parte de ti no confiara en dejarse llevar del todo.",
    enfoque:
      "Observar si te cuesta soltar el control incluso en los momentos donde deberías poder relajarte por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Apnea del sueño”)",
    otrasCausas: [
      "Dificultad general para confiar y soltar el control",
      "Una etapa de vida con mucha vigilancia o alerta constante",
      "Miedo inconsciente relacionado con la propia vulnerabilidad al dormir",
    ],
  },
  {
    id: "sonambulismo",
    keywords: ["sonambulismo", "sonambula", "sonámbula", "sonambulo", "sonámbulo", "camino dormida", "camino dormido"],
    termino: "Sonambulismo",
    capa: "Ectodermo",
    sentido:
      "El sonambulismo suele aparecer cuando hay una parte de ti que quiere “actuar” o resolver algo incluso mientras duermes —una inquietud o una tarea pendiente tan presente que ni el sueño logra detenerla del todo.",
    enfoque:
      "Identificar qué asunto pendiente sientes que necesitas resolver, incluso sin darte cuenta de ello.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sonambulismo”)",
    otrasCausas: [
      "Una inquietud o tarea pendiente muy presente en la mente",
      "Estrés acumulado que no encuentra descanso ni de noche",
      "Una etapa de la infancia con mucha inestabilidad en el hogar",
    ],
  },
  {
    id: "pesadillas",
    keywords: ["pesadillas", "pesadilla", "malos suenos", "malos sueños"],
    termino: "Pesadillas",
    capa: "Emoción",
    sentido:
      "Las pesadillas suelen ser el espacio donde la mente procesa, en imágenes, un miedo o una tensión que durante el día no tuvo dónde expresarse. No son un mal augurio: son el cuerpo haciendo limpieza emocional mientras duerme.",
    enfoque:
      "Notar si hay un miedo o una tensión reciente que tu mente está intentando procesar de noche.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pesadillas”)",
    otrasCausas: [
      "Una preocupación diaria que no se ha procesado del todo",
      "Una situación de miedo reciente que la mente sigue elaborando",
      "Recuerdos antiguos que resurgen en etapas de mayor estrés",
    ],
  },
  {
    id: "neumonia",
    keywords: ["neumonia", "neumonía", "pulmonia", "pulmonía"],
    termino: "Neumonía",
    capa: "Endodermo",
    sentido:
      "Una afectación pulmonar profunda suele relacionarse con una tristeza muy honda frente a una pérdida o un miedo existencial —el territorio vital sintiéndose amenazado de una forma que el cuerpo no puede ignorar.",
    enfoque:
      "Permitirte procesar con acompañamiento una tristeza profunda que quizás no te has dado el espacio de sentir del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Neumonía”)",
    otrasCausas: [
      "Una pérdida profunda reciente en tu vida",
      "Un miedo existencial no procesado del todo",
      "Agotamiento del sistema inmune tras una etapa de mucho estrés",
    ],
  },
  {
    id: "resfriado",
    keywords: ["resfriado", "gripe", "catarro"],
    termino: "Resfriado y gripe",
    capa: "Endodermo",
    sentido:
      "Un resfriado frecuente suele ser la forma en que el cuerpo pide una pausa que la mente no se estaba permitiendo tomar por su cuenta —demasiadas cosas ocurriendo a la vez, sin espacio para procesarlas todas.",
    enfoque:
      "Preguntarte si necesitabas un descanso que no te estabas dando permiso de tomar por voluntad propia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Resfriado, gripe”)",
    otrasCausas: [
      "Una acumulación de pendientes sin espacio real para pausar",
      "Un cambio de estación que coincide con más exigencia de lo habitual",
      "Necesidad de una pausa que no te habías permitido tomar",
    ],
  },
  {
    id: "apendicitis",
    keywords: ["apendicitis", "apendice", "apéndice"],
    termino: "Apendicitis",
    capa: "Endodermo",
    sentido:
      "La apendicitis suele relacionarse con un miedo a no ser lo bastante capaz o útil dentro de la familia o el grupo cercano, una sensación de pequeñez frente a lo que se espera de una misma.",
    enfoque:
      "Revisar si te has sentido “de más” o poco capaz en algún espacio familiar o social recientemente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Apendicitis”)",
    otrasCausas: [
      "Sentir que no aportas lo suficiente dentro de tu familia o grupo",
      "Miedo a ser vista como una carga para los demás",
      "Una comparación reciente con hermanos u otros miembros cercanos",
    ],
  },
  {
    id: "vitiligo",
    keywords: ["vitiligo"],
    termino: "Vitíligo",
    capa: "Ectodermo",
    sentido:
      "El vitíligo, que despigmenta zonas de la piel, suele relacionarse con un sentimiento de separación o de sentirse “diferente” dentro de un grupo o una familia —una parte de la identidad que se siente aislada del resto.",
    enfoque:
      "Notar si hay una sensación de no encajar del todo con quienes te rodean.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vitíligo”)",
    otrasCausas: [
      "Una sensación de ser diferente dentro de tu propia familia o grupo",
      "Una separación afectiva importante vivida en silencio",
      "Dificultad para sentirte plenamente parte de un colectivo",
    ],
  },
  {
    id: "rosacea",
    keywords: ["rosacea", "rosácea"],
    termino: "Rosácea",
    capa: "Ectodermo",
    sentido:
      "El enrojecimiento facial persistente suele relacionarse con una vergüenza o una exposición social incómoda —como si la piel siguiera “sonrojándose” por una situación pasada que ya debería haber quedado atrás.",
    enfoque:
      "Identificar si hay una vergüenza antigua relacionada con haber sido expuesta o juzgada frente a otros.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rosácea”)",
    otrasCausas: [
      "Una situación de vergüenza pública que quedó sin procesar",
      "Sensibilidad alta a ser observada o juzgada por otros",
      "Una autocrítica constante sobre cómo te perciben los demás",
    ],
  },
  {
    id: "urticaria",
    keywords: ["urticaria", "ronchas en la piel"],
    termino: "Urticaria",
    capa: "Ectodermo",
    sentido:
      "La urticaria suele ser una reacción de alarma frente a algo —o alguien— que se sintió como una agresión súbita al propio espacio, aunque no siempre se pueda nombrar con claridad qué la disparó.",
    enfoque:
      "Revisar qué situación reciente sentiste como una agresión repentina a tu tranquilidad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Urticaria”)",
    otrasCausas: [
      "Una situación repentina vivida como agresión o invasión",
      "Estrés acumulado que se manifiesta de forma súbita en la piel",
      "Una alergia emocional a una persona o ambiente específico",
    ],
  },
  {
    id: "quemaduras",
    keywords: ["quemaduras", "me queme", "me quemé"],
    termino: "Quemaduras",
    capa: "Ectodermo",
    sentido:
      "Una quemadura, más allá del accidente concreto, suele coincidir con etapas de rabia intensa “que arde” por dentro, buscando una salida repentina hacia el exterior.",
    enfoque:
      "Notar si últimamente sientes una rabia intensa que no has logrado canalizar de otra forma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Quemaduras”)",
    otrasCausas: [
      "Una rabia intensa reciente sin una vía clara de expresión",
      "Descuido o distracción ligada a sobrecarga mental",
      "Una situación que sientes que te “quema” por dentro desde hace tiempo",
    ],
  },
  {
    id: "artritis",
    keywords: ["artritis", "artritis reumatoide"],
    termino: "Artritis",
    capa: "Mesodermo",
    sentido:
      "A diferencia del dolor articular general, la artritis —como condición autoinmune— suele hablar de una dureza dirigida hacia una misma: una autocrítica muy severa, casi como si una parte de ti se “atacara” por no cumplir con estándares muy altos.",
    enfoque:
      "Observar qué tan dura eres contigo misma cuando sientes que no cumples con lo que esperas de ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Artritis”)",
    otrasCausas: [
      "Una autocrítica muy severa sostenida por años",
      "Dificultad para mostrar flexibilidad contigo misma ante errores",
      "Una infancia con estándares muy altos y poco margen de error",
    ],
  },
  {
    id: "autoinmune",
    keywords: ["enfermedad autoinmune", "autoinmune", "el cuerpo se ataca a si mismo"],
    termino: "Enfermedades autoinmunes (en general)",
    capa: "Mesodermo",
    sentido:
      "Cuando el propio sistema de defensa se vuelve contra una misma, suele simbolizar un conflicto interno de autoagresión: una parte de ti juzgando o castigando a otra parte, casi siempre por una culpa o una autoexigencia muy antigua.",
    enfoque:
      "Explorar con acompañamiento profesional qué diálogo interno de autojuicio llevas sosteniendo desde hace mucho tiempo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Enfermedades autoinmunes”)",
    otrasCausas: [
      "Una autoexigencia muy antigua, casi nunca cuestionada",
      "Culpa profunda por algo ocurrido hace mucho tiempo",
      "Dificultad para dirigir la compasión hacia una misma",
    ],
  },
  {
    id: "testiculos",
    keywords: ["testiculos", "testículos", "testicular"],
    termino: "Testículos",
    capa: "Mesodermo",
    sentido:
      "Los testículos se relacionan simbólicamente con la capacidad de crear y con la propia identidad masculina; sus molestias suelen aparecer en etapas de presión sobre la virilidad, la paternidad o el rendimiento.",
    enfoque:
      "Revisar si sientes presión sobre tu rol como hombre, padre, o proveedor en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Testículos”)",
    otrasCausas: [
      "Presión relacionada con la paternidad, presente o futura",
      "Un conflicto sobre la propia masculinidad o identidad",
      "Miedo al juicio sobre el propio rendimiento o virilidad",
    ],
  },
  {
    id: "disfuncion-erectil",
    keywords: ["disfuncion erectil", "disfunción eréctil", "impotencia sexual"],
    termino: "Disfunción eréctil",
    capa: "Emoción",
    sentido:
      "La disfunción eréctil casi siempre tiene un componente emocional de presión o miedo al juicio —el cuerpo “se frena” cuando la mente está más ocupada evaluando el desempeño que presente en el vínculo.",
    enfoque:
      "Notar si el miedo a fallar ha ocupado más espacio mental que la conexión real con la otra persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Disfunción eréctil”)",
    otrasCausas: [
      "Ansiedad de desempeño en el ámbito sexual",
      "Tensión o distancia emocional no resuelta con la pareja",
      "Estrés general que reduce la conexión con el propio cuerpo",
    ],
  },
  {
    id: "baja-libido",
    keywords: ["baja libido", "sin deseo sexual", "perdida del deseo", "pérdida del deseo"],
    termino: "Baja libido",
    capa: "Emoción",
    sentido:
      "El deseo sexual suele bajar cuando hay agotamiento emocional, una desconexión con la pareja, o una sobrecarga de responsabilidades que no deja espacio mental para el disfrute del cuerpo.",
    enfoque:
      "Identificar si el cansancio o la desconexión emocional, más que el deseo en sí, es lo que necesita atención primero.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Baja libido”)",
    otrasCausas: [
      "Agotamiento físico y emocional sostenido",
      "Una desconexión afectiva no resuelta con la pareja",
      "Sobrecarga de responsabilidades que no deja espacio para el disfrute",
    ],
  },
  {
    id: "olvidos",
    keywords: ["olvidos frecuentes", "se me olvidan las cosas", "fallas de memoria", "mala memoria"],
    termino: "Olvidos frecuentes",
    capa: "Ectodermo",
    sentido:
      "Los olvidos frecuentes, fuera de una causa física que siempre vale la pena descartar con un profesional, suelen relacionarse con una mente sobrecargada de información, o con un deseo inconsciente de “olvidar” algo doloroso.",
    enfoque:
      "Revisar si hay algo que preferirías no recordar, o si simplemente estás sosteniendo demasiada información a la vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Olvidos frecuentes”)",
    otrasCausas: [
      "Sobrecarga de información o responsabilidades simultáneas",
      "Un recuerdo doloroso que preferirías dejar atrás",
      "Falta de descanso mental real en las últimas semanas",
    ],
  },
  {
    id: "sudoracion",
    keywords: ["sudoracion excesiva", "sudoración excesiva", "hiperhidrosis", "sudo mucho"],
    termino: "Sudoración excesiva",
    capa: "Ectodermo",
    sentido:
      "El exceso de sudoración suele acompañar a un nerviosismo o una ansiedad de fondo que el cuerpo libera físicamente, muchas veces relacionado con el miedo a ser evaluada o expuesta frente a otros.",
    enfoque:
      "Identificar en qué situaciones sociales o de exposición se intensifica esta respuesta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sudoración excesiva”)",
    otrasCausas: [
      "Ansiedad ante situaciones de exposición o evaluación social",
      "Nerviosismo de fondo sostenido durante mucho tiempo",
      "Miedo al juicio ajeno en contextos públicos",
    ],
  },
  {
    id: "tics-nerviosos",
    keywords: ["tics nerviosos", "tic nervioso"],
    termino: "Tics nerviosos",
    capa: "Ectodermo",
    sentido:
      "Los tics nerviosos suelen ser pequeñas descargas de una tensión que no encuentra otra salida —una forma en que el cuerpo libera, en movimientos breves, algo que la mente no ha logrado procesar del todo.",
    enfoque:
      "Observar en qué momentos del día se intensifican, y qué tensión suele acompañarlos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Tics nerviosos”)",
    otrasCausas: [
      "Tensión nerviosa acumulada sin una vía clara de descarga",
      "Una etapa de mayor exigencia o presión externa",
      "Ansiedad de fondo no del todo consciente",
    ],
  },
  {
    id: "calambres",
    keywords: ["calambres", "calambre muscular"],
    termino: "Calambres musculares",
    capa: "Mesodermo",
    sentido:
      "Los calambres suelen aparecer cuando un músculo se “aferra” de más, como reflejo de una tensión sostenida por controlar o sostener algo con demasiada fuerza, física o emocionalmente.",
    enfoque:
      "Notar si hay algo que estás sosteniendo con más fuerza de la necesaria en este momento de tu vida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Calambres”)",
    otrasCausas: [
      "Tensión física acumulada por sostener algo con demasiada fuerza",
      "Estrés general que se somatiza en los músculos",
      "Falta de descanso muscular real tras un esfuerzo sostenido",
    ],
  },
  {
    id: "hipo",
    keywords: ["me dio hipo", "tengo hipo", "hipo persistente", "hipo repetido"],
    termino: "Hipo",
    capa: "Endodermo",
    sentido:
      "El hipo suele aparecer tras una interrupción brusca —una sorpresa, una risa cortada de golpe, un cambio repentino de ritmo— como un pequeño sobresalto que el cuerpo tarda un momento en asimilar.",
    enfoque:
      "Notar si algo te tomó por sorpresa o interrumpió de golpe un momento que estabas disfrutando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hipo”)",
    otrasCausas: [
      "Una interrupción brusca de un momento agradable",
      "Comer o reír de forma apresurada",
      "Un sobresalto o sorpresa reciente",
    ],
  },
  {
    id: "autoestima-baja",
    keywords: ["autoestima baja", "baja autoestima", "no me valoro", "no me quiero lo suficiente"],
    termino: "Autoestima baja",
    capa: "Emoción",
    sentido:
      "La autoestima baja no es una opinión objetiva sobre tu valor; es una historia aprendida, casi siempre en la infancia, sobre cuánto “valías” según el cariño o la aprobación que recibiste. Se puede reescribir, aunque lleve tiempo.",
    enfoque:
      "Practicar notar, cada día, una cosa concreta que hiciste bien, por pequeña que parezca.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Autoestima baja”)",
    otrasCausas: [
      "Una infancia con poco reconocimiento o validación afectiva",
      "Comparaciones constantes con hermanos u otras personas cercanas",
      "Relaciones adultas donde el cariño se sintió condicionado",
    ],
  },
  {
    id: "impaciencia",
    keywords: ["impaciencia", "impaciente", "no puedo esperar"],
    termino: "Impaciencia",
    capa: "Emoción",
    sentido:
      "La impaciencia suele ser ansiedad disfrazada de urgencia: la incomodidad de no tener el control sobre el tiempo que algo necesita para resolverse por sí mismo.",
    enfoque:
      "Practicar preguntarte, la próxima vez que sientas impaciencia, qué es lo que realmente temes que pase si esperas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Impaciencia”)",
    otrasCausas: [
      "Miedo de fondo a perder el control de una situación",
      "Una urgencia real externa que se ha vuelto crónica",
      "Dificultad para confiar en los tiempos naturales de las cosas",
    ],
  },
  {
    id: "indecision",
    keywords: ["indecision", "indecisión", "no puedo decidir", "me cuesta decidir"],
    termino: "Indecisión",
    capa: "Emoción",
    sentido:
      "La indecisión aparece cuando el miedo a equivocarte pesa más que el deseo de avanzar. A diferencia de la confusión, aquí sueles saber bien qué opciones tienes; lo que falta es confiar en que cualquier camino puede corregirse después.",
    enfoque:
      "Recordar que la mayoría de las decisiones se pueden ajustar después; muy pocas son verdaderamente irreversibles.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Indecisión”)",
    otrasCausas: [
      "Miedo profundo a equivocarte y a las consecuencias de fallar",
      "Una infancia donde los errores se castigaban con dureza",
      "Demasiadas opciones disponibles sin un criterio claro para elegir",
    ],
  },
  {
    id: "hipersensibilidad",
    keywords: ["hipersensibilidad", "soy muy sensible", "me afecta todo demasiado"],
    termino: "Hipersensibilidad",
    capa: "Emoción",
    sentido:
      "Ser muy sensible no es una debilidad: es percibir con más intensidad lo que ocurre alrededor, tanto lo hermoso como lo doloroso. El reto no es sentir menos, sino aprender a sostener esa intensidad sin que te desborde.",
    enfoque:
      "Practicar crear pequeñas pausas de calma después de situaciones intensas, en vez de exigirte “no sentir tanto”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hipersensibilidad”)",
    otrasCausas: [
      "Una sensibilidad natural poco comprendida o validada de niña",
      "Sobreestimulación en entornos muy ruidosos o intensos",
      "Falta de espacios propios de calma y desconexión",
    ],
  },
  {
    id: "desapego-emocional",
    keywords: ["desapego emocional", "me cuesta conectar", "no siento nada", "desconexion emocional", "desconexión emocional"],
    termino: "Desapego emocional",
    capa: "Emoción",
    sentido:
      "El desapego emocional suele ser una protección aprendida: si sentir demasiado dolió antes, una parte de ti decidió sentir menos para protegerte. El reto es que esa misma protección también dificulta el disfrute y la cercanía.",
    enfoque:
      "Practicar acercarte a la vulnerabilidad en pequeñas dosis, con personas que sí se han ganado tu confianza.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Desapego emocional”)",
    otrasCausas: [
      "Heridas afectivas pasadas que llevaron a protegerte sintiendo menos",
      "Un entorno familiar donde mostrar emociones no era seguro",
      "Agotamiento tras dar mucho en vínculos que no fueron recíprocos",
    ],
  },
  {
    id: "necesidad-control",
    keywords: ["necesidad de control", "necesito controlarlo todo", "me cuesta soltar el control"],
    termino: "Necesidad de control",
    capa: "Emoción",
    sentido:
      "La necesidad de controlarlo todo suele nacer de haber vivido, en algún momento, una situación verdaderamente impredecible o insegura. Controlar los detalles se volvió la forma de sentirte a salvo.",
    enfoque:
      "Practicar soltar el control en una situación pequeña y de bajo riesgo, para demostrarte que puedes estar bien igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de control”)",
    otrasCausas: [
      "Una infancia o etapa de vida marcada por la imprevisibilidad",
      "Una experiencia pasada donde perder el control tuvo consecuencias dolorosas",
      "Dificultad para confiar en que otros puedan manejar las cosas bien",
    ],
  },
  {
    id: "miedo-fracaso",
    keywords: ["miedo al fracaso", "miedo a fracasar", "miedo a fallar"],
    termino: "Miedo al fracaso",
    capa: "Emoción",
    sentido:
      "El miedo al fracaso casi siempre esconde una pregunta más profunda: “¿qué dirá esto sobre mi valor si no lo logro?”. Cuando el resultado se vuelve el único termómetro de tu valía, cualquier intento se siente peligroso.",
    enfoque:
      "Practicar separar tu valor personal del resultado de una tarea específica, aunque al principio se sienta forzado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al fracaso”)",
    otrasCausas: [
      "Una infancia donde el error se castigaba o avergonzaba",
      "Comparación constante con los logros de otras personas",
      "Un fracaso pasado que dejó una marca especialmente dolorosa",
    ],
  },
  {
    id: "miedo-compromiso",
    keywords: ["miedo al compromiso", "miedo a comprometerme", "no puedo comprometerme"],
    termino: "Miedo al compromiso",
    capa: "Emoción",
    sentido:
      "El miedo al compromiso suele relacionarse con el temor a perder la propia libertad o identidad dentro de un vínculo —o con haber visto, de cerca, un compromiso que salió mal y dejó huella.",
    enfoque:
      "Distinguir si el miedo es hacia esta relación en particular, o hacia la idea general de comprometerte con algo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al compromiso”)",
    otrasCausas: [
      "Haber presenciado de cerca un compromiso que terminó mal",
      "Miedo a perder independencia o identidad propia en un vínculo",
      "Una experiencia pasada de compromiso que dejó una herida importante",
    ],
  },
  {
    id: "culpa-exito",
    keywords: ["culpa por el exito", "culpa por el éxito", "miedo a triunfar", "no merezco tener exito", "no merezco tener éxito"],
    termino: "Culpa por el éxito",
    capa: "Emoción",
    sentido:
      "Sentir culpa al lograr algo bueno suele aparecer cuando, en tu entorno de origen, el éxito de una persona significó de algún modo la carencia o el sacrificio de otra —como si solo hubiera espacio limitado para que a alguien le fuera bien.",
    enfoque:
      "Recordar que tu bienestar no le quita espacio al de nadie más; ambos pueden existir a la vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por el éxito”)",
    otrasCausas: [
      "Una familia donde el éxito de uno implicó sacrificio de otro",
      "Miedo a distanciarte de tu entorno de origen al progresar",
      "Lealtad inconsciente hacia quienes no tuvieron las mismas oportunidades",
    ],
  },
  {
    id: "timidez",
    keywords: ["timidez", "timida", "tímida", "timido", "tímido", "ansiedad social"],
    termino: "Timidez y ansiedad social",
    capa: "Emoción",
    sentido:
      "La timidez suele ser un miedo al juicio ajeno amplificado: la sensación de que cualquier error frente a otros será notado y recordado, cuando en realidad casi siempre pasa mucho más desapercibido de lo que se imagina.",
    enfoque:
      "Practicar exponerte a interacciones pequeñas y de bajo riesgo, para ir comprobando que el juicio temido casi nunca llega.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Timidez”)",
    otrasCausas: [
      "Una infancia con burlas o juicios frecuentes en lo social",
      "Una autoexigencia alta sobre cómo “deberías” comportarte frente a otros",
      "Poca práctica temprana en situaciones sociales variadas",
    ],
  },
  {
    id: "aburrimiento",
    keywords: ["aburrimiento", "me aburro", "todo me aburre"],
    termino: "Aburrimiento",
    capa: "Emoción",
    sentido:
      "El aburrimiento sostenido no siempre es falta de estímulos externos; muchas veces habla de una desconexión con lo que realmente te apasiona, o de una rutina que dejó de tener sentido propio hace tiempo.",
    enfoque:
      "Preguntarte cuándo fue la última vez que hiciste algo solo porque te generaba curiosidad genuina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aburrimiento”)",
    otrasCausas: [
      "Una rutina que perdió sentido propio hace tiempo",
      "Desconexión de actividades que antes te apasionaban",
      "Falta de nuevos retos o aprendizajes en tu día a día",
    ],
  },
  {
    id: "orgullo-herido",
    keywords: ["orgullo herido", "me hirieron el orgullo", "mi orgullo no me deja"],
    termino: "Orgullo herido",
    capa: "Emoción",
    sentido:
      "El orgullo herido suele aparecer cuando una situación tocó, sin quererlo, una inseguridad de fondo que ya estaba ahí. Duele más por lo que confirma sobre un miedo antiguo, que por la situación puntual en sí misma.",
    enfoque:
      "Notar qué inseguridad antigua se activó, más allá de la situación puntual que lo disparó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Orgullo herido”)",
    otrasCausas: [
      "Una crítica pública que tocó una inseguridad ya existente",
      "Comparación desfavorable frente a alguien más en un momento clave",
      "Una autoimagen construida sobre la necesidad de tener siempre la razón",
    ],
  },
  {
    id: "no-pertenencia",
    keywords: ["no pertenezco", "no encajo", "sensacion de no pertenecer", "sensación de no pertenecer"],
    termino: "Sensación de no pertenecer",
    capa: "Emoción",
    sentido:
      "Sentir que no perteneces a un grupo, familia o lugar suele hablar de una diferencia genuina en valores o intereses, no de un defecto propio. A veces la respuesta no es encajar más, sino encontrar el espacio correcto donde ya no haga falta esforzarse tanto.",
    enfoque:
      "Preguntarte si el objetivo real es encajar en ese espacio, o encontrar uno donde puedas ser tú misma sin esfuerzo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de no pertenecer”)",
    otrasCausas: [
      "Valores o intereses genuinamente distintos a los del entorno actual",
      "Una mudanza o cambio de etapa reciente sin un grupo nuevo todavía",
      "Una infancia donde ya te sentiste “diferente” dentro de tu propia familia",
    ],
  },
  {
    id: "amigdalitis",
    keywords: ["amigdalitis", "anginas", "amigdalas inflamadas", "amígdalas inflamadas"],
    termino: "Amigdalitis",
    capa: "Endodermo",
    sentido:
      "Las amígdalas son la primera puerta de entrada de la garganta; su inflamación suele hablar de un miedo a “tragar” una situación nueva o desconocida —una noticia, un cambio, una palabra ajena— antes de sentirte lista para digerirla.",
    enfoque:
      "Identificar qué información o cambio reciente sientes que te “cayó” antes de estar preparada para recibirlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Amigdalitis”)",
    otrasCausas: [
      "Una noticia o cambio reciente difícil de asimilar",
      "Miedo a una situación nueva que se aproxima",
      "Tensión acumulada en el ambiente familiar o escolar",
    ],
  },
  {
    id: "boca-seca",
    keywords: ["boca seca", "sequedad bucal", "se me seca la boca"],
    termino: "Boca seca",
    capa: "Ectodermo",
    sentido:
      "La boca seca suele acompañar al miedo o al nerviosismo agudo —el cuerpo entero se prepara para “huir o pelear”, y en ese estado de alerta, funciones como la salivación quedan en pausa.",
    enfoque:
      "Notar en qué situaciones puntuales aparece, para identificar qué te genera esa alerta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Boca seca”)",
    otrasCausas: [
      "Nerviosismo agudo frente a una situación de exposición",
      "Miedo anticipatorio antes de un evento importante",
      "Tensión sostenida que mantiene al cuerpo en alerta",
    ],
  },
  {
    id: "halitosis",
    keywords: ["halitosis", "mal aliento"],
    termino: "Halitosis (mal aliento)",
    capa: "Endodermo",
    sentido:
      "El mal aliento persistente, más allá de causas dentales que siempre vale la pena revisar, a veces se relaciona con palabras guardadas que ya deberían haber salido —algo dicho a medias, o no dicho en absoluto, que se queda “fermentando”.",
    enfoque:
      "Reflexionar, sin culpa, si hay algo pendiente por decir que llevas guardando desde hace tiempo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Halitosis”)",
    otrasCausas: [
      "Palabras importantes que quedaron sin decir",
      "Una situación no resuelta con alguien cercano",
      "Tensión digestiva relacionada con el estrés",
    ],
  },
  {
    id: "calculos-renales",
    keywords: ["calculos renales", "cálculos renales", "piedras en el riñon", "piedras en el riñón"],
    termino: "Cálculos renales",
    capa: "Mesodermo",
    sentido:
      "Los cálculos renales suelen relacionarse con un resentimiento antiguo que se “cristalizó” por no haberse resuelto a tiempo —algo que en su momento generó rabia y que, al no procesarse, se fue endureciendo con el paso de los años.",
    enfoque:
      "Buscar si hay un resentimiento de larga data que nunca terminaste de procesar del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cálculos renales”)",
    otrasCausas: [
      "Un resentimiento antiguo nunca expresado abiertamente",
      "Rigidez sostenida frente a una situación familiar",
      "Dificultad para soltar un enojo de hace mucho tiempo",
    ],
  },
  {
    id: "gota",
    keywords: ["gota", "acido urico", "ácido úrico"],
    termino: "Gota",
    capa: "Mesodermo",
    sentido:
      "La gota suele relacionarse con una necesidad de dominar o tener siempre la razón, junto con una dificultad para aceptar límites impuestos por otros —una frustración que se acumula, literalmente, en las articulaciones.",
    enfoque:
      "Observar si te cuesta aceptar cuando alguien más tiene la razón o pone un límite que no esperabas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Gota”)",
    otrasCausas: [
      "Dificultad para aceptar límites impuestos por otros",
      "Necesidad frecuente de tener siempre la razón",
      "Frustración acumulada por no salirte con la tuya",
    ],
  },
  {
    id: "ciatica",
    keywords: ["ciatica", "ciática", "dolor de nervio ciatico", "dolor de nervio ciático"],
    termino: "Ciática",
    capa: "Mesodermo",
    sentido:
      "El nervio ciático recorre la pierna, el camino hacia adelante; su dolor suele relacionarse con miedo al futuro —especialmente en temas de dinero o estabilidad— y con la sensación de no poder avanzar con la seguridad que te gustaría.",
    enfoque:
      "Identificar qué miedo concreto sobre tu futuro económico o tu estabilidad sientes en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ciática”)",
    otrasCausas: [
      "Miedo a la inestabilidad económica futura",
      "Inseguridad sobre la propia dirección de vida",
      "Presión relacionada con sostener a otros económicamente",
    ],
  },
  {
    id: "torticolis",
    keywords: ["torticolis", "torticolis cervical", "cuello rigido", "cuello rígido", "no puedo girar el cuello"],
    termino: "Torticolis",
    capa: "Mesodermo",
    sentido:
      "La rigidez repentina del cuello suele hablar de una negativa firme, casi física, a “mirar hacia” algo o alguien en particular —una situación que preferirías directamente no voltear a ver.",
    enfoque:
      "Notar hacia qué dirección, literal o simbólica, te está costando “voltear a mirar” ahora mismo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Torticolis”)",
    otrasCausas: [
      "Una negativa firme a considerar cierta perspectiva o punto de vista",
      "Tensión acumulada por sostener una postura rígida frente a algo",
      "Una situación reciente que preferirías evitar mirar de frente",
    ],
  },
  {
    id: "bursitis",
    keywords: ["bursitis"],
    termino: "Bursitis",
    capa: "Mesodermo",
    sentido:
      "La bursitis, inflamación de las bolsas que amortiguan las articulaciones, suele relacionarse con un enojo contenido frente a un conflicto que se repite —una fricción constante que el cuerpo intenta “amortiguar”, sin lograr resolverla del todo.",
    enfoque:
      "Identificar qué conflicto repetitivo llevas “amortiguando” sin llegar a resolverlo de fondo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bursitis”)",
    otrasCausas: [
      "Un conflicto que se repite una y otra vez sin resolverse",
      "Enojo contenido frente a una fricción constante",
      "Sobrecarga física o emocional en una articulación específica",
    ],
  },
  {
    id: "tunel-carpiano",
    keywords: ["tunel carpiano", "túnel carpiano", "sindrome del tunel carpiano", "síndrome del túnel carpiano"],
    termino: "Túnel carpiano",
    capa: "Mesodermo",
    sentido:
      "El síndrome del túnel carpiano suele relacionarse con la sensación de estar “atrapada” en una tarea repetitiva que ya no tiene sentido, o con una sobrecarga de control sobre los detalles de un trabajo.",
    enfoque:
      "Revisar si sientes que repites una tarea sin sentido, o si necesitas soltar el control sobre algo específico en tu trabajo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Túnel carpiano”)",
    otrasCausas: [
      "Una tarea repetitiva que ya perdió sentido propio",
      "Necesidad de controlar cada detalle de tu trabajo",
      "Sobrecarga física sostenida sin pausas suficientes",
    ],
  },
  {
    id: "fascitis-plantar",
    keywords: ["fascitis plantar", "dolor en la planta del pie", "dolor de talon", "dolor de talón"],
    termino: "Fascitis plantar",
    capa: "Mesodermo",
    sentido:
      "El dolor en la planta del pie suele relacionarse con un miedo a avanzar hacia una nueva etapa, como si una parte de ti prefiriera quedarse firmemente anclada en el terreno conocido antes que dar el siguiente paso.",
    enfoque:
      "Notar qué paso importante sientes que estás postergando por miedo a lo desconocido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fascitis plantar”)",
    otrasCausas: [
      "Miedo a avanzar hacia una etapa nueva de vida",
      "Preferencia por quedarte en lo conocido, aunque ya no te sirva",
      "Presión económica o laboral que dificulta dar un paso importante",
    ],
  },
  {
    id: "hernia-inguinal",
    keywords: ["hernia inguinal", "hernia abdominal"],
    termino: "Hernia (inguinal o abdominal)",
    capa: "Mesodermo",
    sentido:
      "Una hernia suele hablar de una presión interna sostenida —una carga o preocupación que ya no cabe del todo dentro, y que termina empujando la propia estructura del cuerpo hacia afuera.",
    enfoque:
      "Identificar qué preocupación reciente sientes que ya no puedes contener del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hernia”)",
    otrasCausas: [
      "Una carga o preocupación sostenida por demasiado tiempo",
      "Presión económica o familiar difícil de contener",
      "Esfuerzo físico sostenido sin el descanso adecuado",
    ],
  },
  {
    id: "conjuntivitis",
    keywords: ["conjuntivitis", "ojos rojos", "ojos irritados"],
    termino: "Conjuntivitis",
    capa: "Ectodermo",
    sentido:
      "La irritación ocular aguda suele relacionarse con haber presenciado algo que generó una molestia inmediata —una escena, una noticia o una situación que “irritó la vista” de forma muy puntual.",
    enfoque:
      "Recordar qué viste o presenciaste recientemente que te generó una incomodidad inmediata.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Conjuntivitis”)",
    otrasCausas: [
      "Haber presenciado una escena o situación incómoda recientemente",
      "Una discusión reciente vivida con fuerte carga visual o presencial",
      "Exposición a un ambiente que generó tensión ocular real",
    ],
  },
  {
    id: "cataratas",
    keywords: ["cataratas"],
    termino: "Cataratas",
    capa: "Ectodermo",
    sentido:
      "Las cataratas, que nublan gradualmente la visión, suelen relacionarse con la dificultad para ver con claridad el futuro propio —una incertidumbre sostenida durante mucho tiempo sobre lo que viene, o una resistencia a mirar hacia adelante con esperanza.",
    enfoque:
      "Explorar con acompañamiento profesional qué tan clara sientes tu visión de futuro en esta etapa de tu vida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cataratas”)",
    otrasCausas: [
      "Incertidumbre sostenida sobre el futuro propio",
      "Dificultad para mirar hacia adelante con esperanza",
      "Una etapa de vida con pocas certezas claras",
    ],
  },
  {
    id: "amenorrea",
    keywords: ["amenorrea", "se me fue la regla", "se me corto la regla", "se me cortó la regla"],
    termino: "Amenorrea (ausencia de menstruación)",
    capa: "Mesodermo",
    sentido:
      "La ausencia del ciclo, fuera de causas físicas que siempre conviene revisar con un profesional, a veces se relaciona con una vida puesta “en pausa” frente a una decisión importante sobre la propia feminidad o la maternidad, consciente o no.",
    enfoque:
      "Buscar acompañamiento médico y, en paralelo, observar si sientes que alguna decisión de vida quedó en pausa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Amenorrea”)",
    otrasCausas: [
      "Estrés sostenido que el cuerpo procesa poniendo funciones en pausa",
      "Una decisión de vida importante que sientes pendiente",
      "Un conflicto no resuelto con la propia feminidad",
    ],
  },
  {
    id: "sindrome-premenstrual",
    keywords: ["sindrome premenstrual", "síndrome premenstrual", "spm", "tension premenstrual", "tensión premenstrual"],
    termino: "Síndrome premenstrual",
    capa: "Mesodermo",
    sentido:
      "La intensidad emocional previa al ciclo suele funcionar como una especie de lupa: lo que normalmente se sostiene con más control emocional, en esos días pide salir con más urgencia y menos filtro.",
    enfoque:
      "Aprovechar esos días de mayor sensibilidad como información, no como algo a “controlar” o esconder.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Síndrome premenstrual”)",
    otrasCausas: [
      "Emociones contenidas durante el resto del mes que buscan salida",
      "Sensibilidad hormonal genuina que merece ser validada, no minimizada",
      "Acumulación de tensiones no resueltas del ciclo anterior",
    ],
  },
  {
    id: "infeccion-vaginal",
    keywords: ["infeccion vaginal", "infección vaginal", "flujo vaginal", "candidiasis vaginal"],
    termino: "Infecciones vaginales",
    capa: "Ectodermo",
    sentido:
      "Las infecciones vaginales suelen relacionarse con un conflicto en torno a los límites de la propia intimidad —una situación reciente donde el espacio íntimo o afectivo se sintió invadido, o en desacuerdo con lo que realmente se deseaba.",
    enfoque:
      "Revisar, con cuidado y sin juicio, si tus límites íntimos han sido respetados plenamente en los vínculos recientes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Infecciones vaginales”)",
    otrasCausas: [
      "Un límite íntimo que sentiste que no fue del todo respetado",
      "Tensión o desacuerdo no expresado dentro de la pareja",
      "Un cambio reciente en la propia relación con la intimidad",
    ],
  },
  {
    id: "hongos-piel",
    keywords: ["hongos en la piel", "micosis", "hongos en las uñas"],
    termino: "Hongos en la piel",
    capa: "Ectodermo",
    sentido:
      "Las infecciones por hongos suelen relacionarse con una sensación de estancamiento o de “no avanzar” en un área de la vida, junto con cierta resignación silenciosa frente a una situación que se ha dejado crecer sin atenderla.",
    enfoque:
      "Identificar qué situación llevas tiempo dejando crecer sin atenderla directamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hongos en la piel”)",
    otrasCausas: [
      "Una situación estancada que se ha dejado crecer sin atender",
      "Resignación silenciosa frente a algo que te incomoda",
      "Ambientes húmedos o poco ventilados en lo físico y en lo emocional",
    ],
  },
  {
    id: "caspa",
    keywords: ["caspa"],
    termino: "Caspa",
    capa: "Ectodermo",
    sentido:
      "La caspa, como pequeñas partículas que se desprenden, suele relacionarse con pensamientos críticos hacia una misma que se repiten de forma casi automática —una autocrítica de bajo volumen, pero constante.",
    enfoque:
      "Notar qué autocrítica repites casi sin darte cuenta a lo largo del día.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Caspa”)",
    otrasCausas: [
      "Autocrítica constante de bajo nivel, casi automática",
      "Estrés sostenido que afecta el cuero cabelludo",
      "Cuidado personal postergado en épocas de mucha exigencia",
    ],
  },
  {
    id: "quistes-general",
    keywords: ["quiste", "quistes", "quiste en la piel", "lipoma"],
    termino: "Quistes (en general)",
    capa: "Mesodermo",
    sentido:
      "Un quiste suele simbolizar algo —una emoción, un proyecto, una idea— que quedó “encapsulado” en vez de expresarse o desarrollarse plenamente, a la espera de un momento más seguro para salir.",
    enfoque:
      "Preguntarte qué idea o sentimiento sientes que guardaste “para después” y nunca retomaste.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Quistes”)",
    otrasCausas: [
      "Un proyecto o idea que quedó pausado indefinidamente",
      "Una emoción guardada a la espera de un momento más seguro",
      "Dificultad para dar salida a algo que necesita expresarse",
    ],
  },
  {
    id: "intoxicacion-alimentaria",
    keywords: ["intoxicacion alimentaria", "intoxicación alimentaria", "me cayo mal la comida", "me cayó mal la comida"],
    termino: "Intoxicación alimentaria",
    capa: "Endodermo",
    sentido:
      "Más allá de la causa física real, la expresión “me cayó mal” suele aplicarse también en lo simbólico: una situación o una persona reciente que, literalmente, no “te cayó bien” y que el cuerpo rechazó con fuerza.",
    enfoque:
      "Revisar si además de la comida, hubo alguna situación reciente que sencillamente “no te cayó bien”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Intoxicación alimentaria”)",
    otrasCausas: [
      "Una situación reciente que no lograste “digerir” bien",
      "Una persona o comentario que te generó rechazo inmediato",
      "Un cambio brusco de rutina o alimentación",
    ],
  },
  {
    id: "sudoracion-nocturna",
    keywords: ["sudoracion nocturna", "sudoración nocturna", "sudo de noche", "sudores nocturnos"],
    termino: "Sudoración nocturna",
    capa: "Ectodermo",
    sentido:
      "Sudar de noche, fuera de causas físicas por descartar con un profesional, suele relacionarse con miedos o tensiones que el cuerpo procesa mientras duermes, cuando la mente consciente ya no puede controlarlos ni evitarlos.",
    enfoque:
      "Observar si hay un miedo de fondo que solo parece “salir a la luz” cuando bajas la guardia al dormir.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sudoración nocturna”)",
    otrasCausas: [
      "Miedos o tensiones que se procesan durante el sueño",
      "Ansiedad de fondo no del todo consciente durante el día",
      "Una etapa de mayor estrés general en tu vida",
    ],
  },
  {
    id: "estres",
    keywords: ["estres", "estrés", "estresada", "estresado", "muy estresante"],
    termino: "Estrés",
    capa: "Emoción",
    sentido:
      "El estrés es la respuesta natural del cuerpo ante una exigencia que percibe como mayor a sus recursos disponibles en ese momento. No es debilidad ni falta de organización: es información valiosa sobre que algo en tu carga actual necesita ajustarse.",
    enfoque:
      "Hacer una pausa breve para preguntarte qué, específicamente, sientes que supera tu capacidad actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Estrés”)",
    otrasCausas: [
      "Demasiadas exigencias simultáneas sin pausas suficientes",
      "Falta de recursos de apoyo o descanso adecuados",
      "Una percepción de amenaza más alta de lo que la situación real exige",
    ],
  },
  {
    id: "miedo-muerte",
    keywords: ["miedo a la muerte", "miedo a morir", "miedo existencial"],
    termino: "Miedo a la muerte",
    capa: "Emoción",
    sentido:
      "El miedo a la muerte suele intensificarse en etapas de cambio, pérdida cercana, o simplemente al detenerse a pensar en la finitud de la vida. Es una de las preguntas más humanas que existen, y no tiene una respuesta única ni definitiva.",
    enfoque:
      "Si este miedo se vuelve muy intenso o constante, conversarlo con un profesional puede aliviar mucho su peso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la muerte”)",
    otrasCausas: [
      "Una pérdida cercana reciente que activó esta pregunta",
      "Una etapa de cambio grande que confronta con la propia finitud",
      "Ansiedad general que se enfoca en este miedo en particular",
    ],
  },
  {
    id: "injusticia",
    keywords: ["sentimiento de injusticia", "no es justo", "siento que es injusto"],
    termino: "Sentimiento de injusticia",
    capa: "Emoción",
    sentido:
      "El sentimiento de injusticia aparece cuando lo vivido no corresponde con lo que consideras justo o merecido. Es una emoción legítima y a menudo motivadora; el reto es no dejar que se convierta en resentimiento si la situación no puede corregirse de inmediato.",
    enfoque:
      "Identificar qué acción concreta —dentro de tu control— puedes tomar frente a esta injusticia, más allá de la indignación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de injusticia”)",
    otrasCausas: [
      "Una situación reciente donde sentiste un trato desigual",
      "Comparación con cómo se trató a alguien más en circunstancias similares",
      "Impotencia frente a una decisión que no pudiste cambiar",
    ],
  },
  {
    id: "deseo-venganza",
    keywords: ["deseo de venganza", "quiero vengarme", "ganas de venganza"],
    termino: "Deseo de venganza",
    capa: "Emoción",
    sentido:
      "El deseo de venganza suele nacer de un dolor real que no ha encontrado otra forma de canalizarse. Es una emoción humana y válida de reconocer; actuar desde ella, sin embargo, rara vez trae la paz que en el fondo se está buscando.",
    enfoque:
      "Buscar una forma de procesar el dolor de origen —quizás con acompañamiento profesional— en vez de centrarte en la persona que lo causó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Deseo de venganza”)",
    otrasCausas: [
      "Una traición o daño significativo sin resolución ni disculpa",
      "Sentimiento de impotencia frente a la injusticia vivida",
      "Dolor profundo que busca, sin saberlo, ser validado",
    ],
  },
  {
    id: "estancamiento",
    keywords: ["estancamiento", "me siento estancada", "me siento estancado", "no avanzo"],
    termino: "Sensación de estancamiento",
    capa: "Emoción",
    sentido:
      "Sentir que no avanzas no siempre significa que no estés cambiando; a veces el crecimiento ocurre en una capa que no se ve de inmediato —una reflexión interna, una sanación silenciosa— antes de manifestarse en cambios externos visibles.",
    enfoque:
      "Revisar si ha habido cambios internos, aunque no se reflejen todavía en lo externo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de estancamiento”)",
    otrasCausas: [
      "Comparación con el ritmo de avance de otras personas",
      "Miedo inconsciente a lo que implicaría avanzar de verdad",
      "Una etapa de procesamiento interno antes de un cambio visible",
    ],
  },
  {
    id: "incertidumbre-futuro",
    keywords: ["incertidumbre", "no se que va a pasar", "no sé qué va a pasar", "miedo al futuro"],
    termino: "Incertidumbre sobre el futuro",
    capa: "Emoción",
    sentido:
      "La incertidumbre incomoda porque el cerebro busca previsibilidad como forma de sentirse a salvo. No saber qué va a pasar no es, en sí mismo, peligroso —aunque el cuerpo a veces lo sienta con la misma intensidad que una amenaza real.",
    enfoque:
      "Practicar identificar qué sí está bajo tu control hoy, en vez de intentar controlar todo el futuro incierto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Incertidumbre sobre el futuro”)",
    otrasCausas: [
      "Un cambio de vida grande en proceso, sin resultado claro todavía",
      "Experiencias pasadas donde lo inesperado trajo consecuencias difíciles",
      "Dificultad general para tolerar la ambigüedad",
    ],
  },
  {
    id: "sentirse-invisible",
    keywords: ["sentirse invisible", "nadie me ve", "siento que no me ven", "me siento invisible"],
    termino: "Sentirse invisible",
    capa: "Emoción",
    sentido:
      "Sentir que nadie te ve de verdad suele doler más que un conflicto abierto, precisamente porque no hay nada concreto contra qué reaccionar. A menudo tiene raíces en vínculos tempranos donde expresarte no generaba una respuesta clara del otro lado.",
    enfoque:
      "Practicar nombrar en voz alta, a alguien de confianza, que necesitas sentirte vista en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse invisible”)",
    otrasCausas: [
      "Una infancia donde expresarte no generaba una respuesta clara",
      "Un vínculo actual donde sientes que pasas desapercibida",
      "Comparación constante con alguien que “ocupa más espacio” en el entorno",
    ],
  },
  {
    id: "necesidad-aprobacion",
    keywords: ["necesidad de aprobacion", "necesidad de aprobación", "busco aprobacion", "busco aprobación"],
    termino: "Necesidad de aprobación",
    capa: "Emoción",
    sentido:
      "Buscar aprobación no es un defecto; es una necesidad humana básica de pertenencia. Se vuelve pesado cuando la aprobación externa se convierte en la única medida de tu propio valor, dejando poco espacio para tu propio criterio.",
    enfoque:
      "Practicar tomar una decisión pequeña basada solo en lo que tú prefieres, sin consultarlo antes con nadie.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de aprobación”)",
    otrasCausas: [
      "Una infancia donde el cariño se sintió condicionado al comportamiento",
      "Un entorno actual muy exigente o crítico",
      "Poca práctica confiando en tu propio criterio sin validación externa",
    ],
  },
  {
    id: "miedo-intimidad",
    keywords: ["miedo a la intimidad", "miedo a la cercania", "miedo a la cercanía", "me cuesta ser vulnerable"],
    termino: "Miedo a la intimidad",
    capa: "Emoción",
    sentido:
      "El miedo a la intimidad suele proteger una herida antigua: si mostrarte vulnerable antes trajo dolor, distancia o rechazo, una parte de ti aprendió que cercanía es sinónimo de riesgo.",
    enfoque:
      "Practicar la vulnerabilidad en pequeñas dosis, con personas que ya te han demostrado ser seguras.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la intimidad”)",
    otrasCausas: [
      "Una herida afectiva pasada relacionada con mostrarte vulnerable",
      "Un entorno de origen donde la cercanía emocional no era segura",
      "Miedo a depender de alguien más después de haber tenido que sostenerte sola",
    ],
  },
  {
    id: "necesidad-agradar",
    keywords: ["necesidad de agradar", "complacencia", "complaciente", "no se decir que no", "no sé decir que no"],
    termino: "Necesidad de agradar (complacencia)",
    capa: "Emoción",
    sentido:
      "Complacer a otros de forma constante suele ser una estrategia aprendida para evitar el conflicto o el rechazo. Funciona a corto plazo, pero a largo plazo deja poco espacio para tus propias necesidades y deseos.",
    enfoque:
      "Practicar decir “no” en una situación pequeña esta semana, y observar que el vínculo, casi siempre, sobrevive intacto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de agradar”)",
    otrasCausas: [
      "Una infancia donde poner límites generaba conflicto o castigo",
      "Miedo al rechazo si no cumples con lo que otros esperan",
      "Un entorno actual con personas que exigen mucho de ti",
    ],
  },
  {
    id: "soledad-en-pareja",
    keywords: ["soledad en pareja", "me siento sola en mi relacion", "me siento sola en mi relación", "me siento solo en mi relacion", "me siento solo en mi relación"],
    termino: "Soledad dentro de la pareja",
    capa: "Emoción",
    sentido:
      "Sentirte sola estando en pareja suele doler más que la soledad misma, porque además de la distancia emocional aparece la confusión de “tener a alguien y aun así sentir que falta algo”. Suele hablar de una desconexión en la comunicación más que de falta de amor.",
    enfoque:
      "Identificar un momento reciente donde sentiste que tu pareja no estaba realmente presente, y nombrarlo sin acusación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Soledad en pareja”)",
    otrasCausas: [
      "Una comunicación que se volvió superficial con el tiempo",
      "Rutinas que dejaron poco espacio para la conexión real",
      "Expectativas distintas sobre cómo debería sentirse la cercanía",
    ],
  },
  {
    id: "bloqueo-creativo",
    keywords: ["bloqueo creativo", "no tengo inspiracion", "no tengo inspiración", "bloqueo mental"],
    termino: "Bloqueo creativo",
    capa: "Emoción",
    sentido:
      "El bloqueo creativo casi nunca es falta de talento; suele ser miedo al juicio disfrazado de “no se me ocurre nada”. La autocrítica excesiva durante el proceso de creación es una de las formas más comunes de apagar la creatividad antes de que fluya.",
    enfoque:
      "Practicar crear algo “malo a propósito”, sin intención de mostrarlo a nadie, para bajarle la presión al proceso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bloqueo creativo”)",
    otrasCausas: [
      "Miedo al juicio ajeno sobre tu trabajo creativo",
      "Autocrítica excesiva durante el proceso de creación",
      "Agotamiento general que deja poco espacio mental para crear",
    ],
  },
  {
    id: "sindrome-impostor",
    keywords: ["sindrome del impostor", "síndrome del impostor", "me siento un fraude", "no merezco este puesto"],
    termino: "Síndrome del impostor",
    capa: "Emoción",
    sentido:
      "El síndrome del impostor es la sensación persistente de no merecer tus propios logros, junto con el miedo a ser “descubierta” como alguien menos capaz de lo que los demás creen. Es sorprendentemente común, incluso entre personas muy competentes.",
    enfoque:
      "Llevar un registro breve de tus logros reales, para contrastarlo con la voz interna que los minimiza.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Síndrome del impostor”)",
    otrasCausas: [
      "Comparación constante con los logros de otras personas",
      "Una infancia donde los logros no fueron reconocidos abiertamente",
      "Un ambiente laboral muy competitivo o poco validante",
    ],
  },
  {
    id: "miedo-vejez",
    keywords: ["miedo a envejecer", "miedo a la vejez", "miedo a hacerme vieja", "miedo a hacerme viejo"],
    termino: "Miedo a envejecer",
    capa: "Emoción",
    sentido:
      "El miedo a envejecer suele relacionarse menos con los años en sí, y más con el temor a perder relevancia, autonomía o un lugar reconocido en el mundo. Es una preocupación válida en una cultura que muchas veces asocia el valor con la juventud.",
    enfoque:
      "Identificar qué es lo que realmente temes perder al envejecer —independencia, propósito, vínculos— para trabajar directamente en eso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a envejecer”)",
    otrasCausas: [
      "Miedo a perder independencia o autonomía",
      "Preocupación por la propia relevancia o propósito futuro",
      "Una cultura o entorno que valora fuertemente la juventud",
    ],
  },
  {
    id: "ansiedad-anticipatoria",
    keywords: ["ansiedad anticipatoria", "me adelanto a lo peor", "siempre pienso en lo peor"],
    termino: "Ansiedad anticipatoria",
    capa: "Emoción",
    sentido:
      "La ansiedad anticipatoria es vivir el sufrimiento de un evento negativo antes —o incluso en vez— de que ocurra realmente. El cuerpo reacciona igual que si la amenaza ya estuviera presente, aunque solo exista todavía en la imaginación.",
    enfoque:
      "Practicar preguntarte, frente a un pensamiento anticipatorio, qué tan probable es realmente ese peor escenario.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ansiedad anticipatoria”)",
    otrasCausas: [
      "Experiencias pasadas donde lo peor sí llegó a ocurrir",
      "Necesidad de sentir que controlas el resultado al anticiparlo",
      "Un temperamento naturalmente más vigilante frente al riesgo",
    ],
  },
  {
    id: "ronquidos",
    keywords: ["ronquidos", "ronco al dormir", "ronca al dormir"],
    termino: "Ronquidos",
    capa: "Ectodermo",
    sentido:
      "Roncar suele relacionarse con una resistencia inconsciente a “dejar pasar” algo con fluidez —el aire se abre camino con esfuerzo, como reflejo de una tensión que tampoco fluye con facilidad durante el día.",
    enfoque:
      "Observar si hay una situación diurna donde te cuesta “dejar fluir” las cosas sin controlarlas de más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ronquidos”)",
    otrasCausas: [
      "Tensión acumulada durante el día que persiste al dormir",
      "Resistencia a soltar el control incluso en el descanso",
      "Cambios físicos o de rutina recientes que afectan el sueño",
    ],
  },
  {
    id: "paralisis-sueno",
    keywords: ["paralisis del sueno", "parálisis del sueño", "paralisis de sueno", "no me puedo mover al dormir"],
    termino: "Parálisis del sueño",
    capa: "Ectodermo",
    sentido:
      "La parálisis del sueño —despertar sin poder moverte por unos segundos— suele coincidir con etapas de mucho estrés o vigilancia, como si el cuerpo se quedara “atrapado” entre el sueño y la alerta que sostienes durante el día.",
    enfoque:
      "Revisar qué tan alerta o vigilante te sientes obligada a estar en tu vida despierta últimamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Parálisis del sueño”)",
    otrasCausas: [
      "Un periodo de estrés o vigilancia constante",
      "Horarios de sueño irregulares o descanso insuficiente",
      "Ansiedad de fondo que se manifiesta durante las transiciones del sueño",
    ],
  },
  {
    id: "espasmos",
    keywords: ["espasmos musculares", "espasmo muscular", "espasmos"],
    termino: "Espasmos musculares",
    capa: "Mesodermo",
    sentido:
      "Un espasmo es una contracción súbita e involuntaria; suele hablar de una tensión que el cuerpo ya no puede seguir conteniendo de forma silenciosa, y que se libera de golpe, sin previo aviso consciente.",
    enfoque:
      "Notar si hay una tensión que llevas conteniendo en silencio y que podría beneficiarse de una salida más consciente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Espasmos musculares”)",
    otrasCausas: [
      "Tensión emocional contenida que busca una salida física",
      "Fatiga muscular por sobreesfuerzo reciente",
      "Estrés acumulado sin espacios reales de relajación",
    ],
  },
  {
    id: "fracturas",
    keywords: ["fractura", "fracturas", "hueso roto", "me rompí un hueso"],
    termino: "Fracturas",
    capa: "Mesodermo",
    sentido:
      "Una fractura suele coincidir con una ruptura simbólica en la estructura de tu vida —un cambio brusco, una relación o una etapa que se “quiebra” de forma abrupta, más que gradual.",
    enfoque:
      "Identificar qué estructura de tu vida sientes que se rompió o cambió de forma repentina recientemente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fracturas”)",
    otrasCausas: [
      "Un cambio abrupto en una estructura importante de tu vida",
      "Una ruptura reciente —de una relación, un proyecto, una etapa",
      "Una sensación de fragilidad general en un periodo de mucho cambio",
    ],
  },
  {
    id: "esguince",
    keywords: ["esguince", "torcedura", "me torci el tobillo", "me torcí el tobillo"],
    termino: "Esguince",
    capa: "Mesodermo",
    sentido:
      "Un esguince suele aparecer cuando avanzas con prisa o con rigidez en una dirección que, en el fondo, te genera dudas —como si el cuerpo frenara de golpe un movimiento que la mente no terminaba de decidir del todo.",
    enfoque:
      "Revisar si tomaste una dirección reciente con más prisa de la que realmente sentías con claridad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Esguince”)",
    otrasCausas: [
      "Una decisión tomada con prisa, sin total convicción",
      "Avanzar en una dirección con dudas de fondo no resueltas",
      "Rigidez física o emocional frente a un cambio de rumbo",
    ],
  },
  {
    id: "rigidez-matutina",
    keywords: ["rigidez matutina", "amanezco entumecida", "amanezco entumecido", "me levanto tiesa", "me levanto tieso"],
    termino: "Rigidez matutina",
    capa: "Mesodermo",
    sentido:
      "Amanecer con el cuerpo rígido suele relacionarse con una resistencia inconsciente a empezar el día —una parte de ti que preferiría, literalmente, no tener que moverse todavía hacia lo que viene.",
    enfoque:
      "Notar si hay algo del día que se avecina que preferirías evitar o posponer.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rigidez matutina”)",
    otrasCausas: [
      "Resistencia inconsciente a comenzar la rutina diaria",
      "Tensión acumulada durante la noche sin procesar",
      "Falta de descanso profundo y reparador",
    ],
  },
  {
    id: "cicatrices",
    keywords: ["cicatrices", "cicatriz"],
    termino: "Cicatrices",
    capa: "Ectodermo",
    sentido:
      "Una cicatriz es la huella visible de algo que ya sanó, aunque haya dejado marca. Simbólicamente, recordarla no debería doler igual que la herida original — si todavía duele al mirarla, puede ser señal de que el proceso emocional detrás no cerró del todo.",
    enfoque:
      "Notar si al ver una cicatriz concreta, lo que revive es dolor o simplemente historia ya integrada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cicatrices”)",
    otrasCausas: [
      "Un proceso de sanación emocional que quedó incompleto",
      "Vergüenza o incomodidad asociada a una marca física",
      "Un recuerdo doloroso que la cicatriz sigue activando",
    ],
  },
  {
    id: "orzuelo",
    keywords: ["orzuelo", "orzuelos"],
    termino: "Orzuelo",
    capa: "Ectodermo",
    sentido:
      "El orzuelo, una pequeña inflamación en el párpado, suele relacionarse con una irritación puntual hacia algo que viste recientemente y que preferirías no haber presenciado —una versión más leve y localizada de la conjuntivitis.",
    enfoque:
      "Recordar qué situación reciente viste con desagrado o incomodidad, aunque fuera algo pequeño.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Orzuelo”)",
    otrasCausas: [
      "Una irritación puntual hacia algo presenciado recientemente",
      "Cansancio visual acumulado",
      "Una situación incómoda que preferirías no haber visto",
    ],
  },
  {
    id: "herpes-labial",
    keywords: ["herpes labial", "fuegos labiales", "ampolla en el labio"],
    termino: "Herpes labial",
    capa: "Ectodermo",
    sentido:
      "El herpes labial suele reactivarse en momentos de estrés o de conflicto no resuelto en torno a un beso o una palabra que no se pudo dar —afecto contenido en la misma zona por donde se expresa y se recibe cariño.",
    enfoque:
      "Notar si hay afecto que te gustaría dar o recibir y que, por alguna razón, se ha quedado contenido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Herpes labial”)",
    otrasCausas: [
      "Estrés acumulado que baja las defensas del cuerpo",
      "Afecto contenido que no se ha podido expresar",
      "Un conflicto reciente relacionado con un vínculo cercano",
    ],
  },
  {
    id: "ampollas",
    keywords: ["ampollas", "ampolla en la piel"],
    termino: "Ampollas",
    capa: "Ectodermo",
    sentido:
      "Las ampollas suelen aparecer tras una fricción sostenida —física o simbólica— en un punto muy específico: hacer, una y otra vez, algo para lo que ese punto de tu vida todavía no estaba preparado.",
    enfoque:
      "Identificar en qué área sientes que has forzado el ritmo más de lo que tu cuerpo o tu ánimo podían sostener.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ampollas”)",
    otrasCausas: [
      "Fricción repetida en una actividad para la que faltaba preparación",
      "Sobreesfuerzo en una tarea nueva o poco habitual",
      "Falta de protección adecuada frente a una exigencia física",
    ],
  },
  {
    id: "moretones",
    keywords: ["moretones", "me salen moretones facil", "me salen moretones fácil", "cardenales en la piel"],
    termino: "Moretones (facilidad para que salgan)",
    capa: "Mesodermo",
    sentido:
      "Salir moretones con facilidad, más allá de causas físicas por revisar, a veces se relaciona con una autoexigencia muy alta o una autocrítica que deja “marca” por dentro, aunque no siempre se note desde afuera.",
    enfoque:
      "Revisar qué tan dura eres contigo misma en el diálogo interno de un día común.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Moderetones”)",
    otrasCausas: [
      "Autocrítica interna más severa de lo que se percibe desde afuera",
      "Sensibilidad física que merece revisión especializada para descartar causas",
      "Una etapa de mucha exigencia física o emocional",
    ],
  },
  {
    id: "sangrado-nasal",
    keywords: ["sangrado nasal", "hemorragia nasal", "me sangra la nariz"],
    termino: "Sangrado nasal",
    capa: "Ectodermo",
    sentido:
      "El sangrado nasal, fuera de causas físicas a revisar, a veces coincide con una pérdida de vitalidad o con un conflicto familiar no expresado —la sangre como símbolo de la fuerza vital que busca salida cuando no hay otra vía.",
    enfoque:
      "Observar si últimamente sientes tu vitalidad más baja de lo habitual, o si hay un conflicto familiar sin nombrar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sangrado nasal”)",
    otrasCausas: [
      "Baja vitalidad general en la etapa actual",
      "Un conflicto familiar no expresado abiertamente",
      "Sequedad ambiental o irritación física que conviene revisar",
    ],
  },
  {
    id: "dolor-mandibula",
    keywords: ["dolor de mandibula", "dolor de mandíbula", "mandibula tensa", "mandíbula tensa"],
    termino: "Dolor de mandíbula",
    capa: "Mesodermo",
    sentido:
      "La tensión en la mandíbula, más allá del bruxismo nocturno, suele acompañar a palabras que se sostienen “apretadas” durante el día —cosas que te gustaría decir, pero que mantienes firmemente calladas por decisión consciente.",
    enfoque:
      "Notar qué palabra o límite sostienes firmemente callado durante tus días, de forma consciente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor de mandíbula”)",
    otrasCausas: [
      "Palabras o límites que sostienes callados de forma consciente",
      "Tensión acumulada durante conversaciones difíciles",
      "Autocontrol excesivo sobre lo que decides expresar",
    ],
  },
  {
    id: "infecciones-frecuentes",
    keywords: ["infecciones frecuentes", "me enfermo mucho", "defensas bajas", "sistema inmune debil", "sistema inmune débil"],
    termino: "Infecciones frecuentes (sistema inmune bajo)",
    capa: "Mesodermo",
    sentido:
      "Enfermarte con frecuencia puede relacionarse con una etapa donde tus propios límites —físicos y emocionales— se sienten más permeables de lo habitual, como si te costara “defenderte” de lo que llega desde afuera.",
    enfoque:
      "Revisar si en general te cuesta poner límites claros en distintas áreas de tu vida, no solo con los gérmenes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Infecciones frecuentes”)",
    otrasCausas: [
      "Agotamiento sostenido que debilita las defensas",
      "Dificultad general para poner límites claros",
      "Una etapa de mucho estrés que baja la capacidad de respuesta del cuerpo",
    ],
  },
  {
    id: "bazo",
    keywords: ["bazo", "esplenomegalia"],
    termino: "Bazo",
    capa: "Mesodermo",
    sentido:
      "El bazo, poco mencionado pero simbólicamente relevante, suele asociarse con una melancolía antigua y con la manera en que se “filtra” lo que ya no sirve emocionalmente —una tristeza de fondo que aún no termina de procesarse.",
    enfoque:
      "Explorar si hay una tristeza antigua, de larga data, que rara vez nombras en voz alta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bazo”)",
    otrasCausas: [
      "Una tristeza antigua nunca del todo procesada",
      "Dificultad para “filtrar” y soltar lo que ya no aporta",
      "Una melancolía de fondo poco nombrada en el día a día",
    ],
  },
  {
    id: "flatulencia",
    keywords: ["flatulencia", "gases estomacales", "muchos gases"],
    termino: "Flatulencia (gases)",
    capa: "Endodermo",
    sentido:
      "El exceso de gases suele relacionarse con ideas o emociones que no lograron “digerirse” del todo y buscan una salida —a veces literal— cuando no encuentran otra forma de liberarse.",
    enfoque:
      "Notar si hay una situación reciente que sientes que no terminaste de “procesar” del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Flatulencia”)",
    otrasCausas: [
      "Una situación reciente difícil de procesar del todo",
      "Ansiedad que se somatiza en el sistema digestivo",
      "Cambios alimenticios recientes junto con tensión emocional",
    ],
  },
  {
    id: "quistes-mama",
    keywords: ["quistes en el seno", "quiste en el seno", "quistes mamarios", "bulto en el seno"],
    termino: "Quistes en el seno",
    capa: "Mesodermo",
    sentido:
      "El seno se relaciona simbólicamente con el cuidado y la nutrición hacia otros; un quiste ahí a veces coincide con una tensión en torno al rol de cuidadora —dar demasiado, o sentir conflicto sobre a quién cuidar y cuánto.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, revisar si sientes tensión en torno a cuánto das de ti a los demás.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Quistes en el seno”)",
    otrasCausas: [
      "Tensión en torno al rol de cuidadora de la familia",
      "Conflicto sobre dar demasiado sin recibir el mismo cuidado de vuelta",
      "Preocupación materna reciente hacia alguien cercano",
    ],
  },
  {
    id: "endometriosis",
    keywords: ["endometriosis"],
    termino: "Endometriosis",
    capa: "Mesodermo",
    sentido:
      "La endometriosis suele coincidir con un conflicto profundo en torno al propio espacio creativo o maternal —sentir que ese territorio interno ha sido invadido, cuestionado, o vivido con dolor durante mucho tiempo.",
    enfoque:
      "Buscar acompañamiento médico especializado, y explorar en paralelo tu relación con tu propio espacio creativo y de cuidado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Endometriosis”)",
    otrasCausas: [
      "Un conflicto profundo relacionado con la maternidad, real o simbólica",
      "Sentir invadido tu espacio íntimo o creativo durante mucho tiempo",
      "Dolor sostenido en la relación con tu propia feminidad",
    ],
  },
  {
    id: "miedo-soledad",
    keywords: ["miedo a estar sola", "miedo a estar solo", "miedo a quedarme sola", "miedo a quedarme solo"],
    termino: "Miedo a estar sola",
    capa: "Emoción",
    sentido:
      "El miedo a estar sola suele ser distinto de disfrutar la compañía: aquí el temor es no poder sostenerte a ti misma sin la presencia de alguien más. Suele nacer de experiencias donde estar sola se sintió, en algún momento, como estar desprotegida.",
    enfoque:
      "Practicar pasar ratos breves y deliberados a solas, notando que sí puedes sostenerte en ellos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a estar sola”)",
    otrasCausas: [
      "Una infancia donde estar sola se sintió como desprotección real",
      "Una pérdida o abandono pasado que dejó huella profunda",
      "Poca práctica reciente de disfrutar tiempo a solas",
    ],
  },
  {
    id: "culpa-limites",
    keywords: ["culpa por poner limites", "culpa por poner límites", "me siento mal por decir que no"],
    termino: "Culpa por poner límites",
    capa: "Emoción",
    sentido:
      "Sentir culpa al poner un límite suele indicar que, en algún momento de tu historia, hacerlo tuvo un costo relacional —el vínculo se tensó, o alguien reaccionó mal, y esa asociación quedó grabada.",
    enfoque:
      "Recordar que un límite bien puesto, con respeto, no es un ataque hacia el otro; es cuidado hacia ti misma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por poner límites”)",
    otrasCausas: [
      "Experiencias pasadas donde poner límites generó conflicto",
      "Una familia de origen donde los límites no eran bien recibidos",
      "Miedo a ser vista como “difícil” o poco complaciente",
    ],
  },
  {
    id: "miedo-decepcionar",
    keywords: ["miedo a decepcionar", "miedo a fallarle a alguien", "no quiero decepcionar a nadie"],
    termino: "Miedo a decepcionar a otros",
    capa: "Emoción",
    sentido:
      "El miedo a decepcionar a otros suele colocar sus expectativas por encima de tus propias necesidades, casi de forma automática. Es agotador porque intenta controlar algo —la reacción ajena— que en realidad nunca estuvo bajo tu control total.",
    enfoque:
      "Practicar tomar una decisión pensando primero en lo que tú necesitas, y observar qué tan grave es realmente la reacción del otro.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a decepcionar a otros”)",
    otrasCausas: [
      "Una infancia donde el afecto dependía de cumplir expectativas ajenas",
      "Un rol familiar de “la responsable” asumido desde muy joven",
      "Miedo al conflicto o al distanciamiento si no cumples lo esperado",
    ],
  },
  {
    id: "sentirse-carga",
    keywords: ["sentirse una carga", "siento que soy una carga", "creo que molesto a los demas", "creo que molesto a los demás"],
    termino: "Sentir que eres una carga",
    capa: "Emoción",
    sentido:
      "Sentir que eres una carga para otros suele nacer de haber recibido, en algún momento, la señal —directa o indirecta— de que tus necesidades eran “demasiado”. Con el tiempo, eso puede llevar a esconder incluso pedidos razonables.",
    enfoque:
      "Practicar pedir ayuda en algo pequeño, y observar que la mayoría de las personas cercanas lo reciben mejor de lo que imaginas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentir que eres una carga”)",
    otrasCausas: [
      "Mensajes pasados, directos o indirectos, de que tus necesidades eran excesivas",
      "Un rol familiar de cuidar a otros sin recibir cuidado de vuelta",
      "Baja autoestima que minimiza el valor de tu propia presencia",
    ],
  },
  {
    id: "desconfianza-propia",
    keywords: ["no confio en mi misma", "no confío en mí misma", "no confio en mi mismo", "no confío en mí mismo", "desconfio de mis propias decisiones"],
    termino: "Desconfianza en una misma",
    capa: "Emoción",
    sentido:
      "Desconfiar de tu propio criterio suele tener raíz en decisiones pasadas que no salieron como esperabas, o en una infancia donde tus elecciones eran frecuentemente corregidas o cuestionadas por otros.",
    enfoque:
      "Llevar un registro de pequeñas decisiones que sí resultaron bien, para contrarrestar la narrativa de “no sé decidir bien”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Desconfianza en una misma”)",
    otrasCausas: [
      "Decisiones pasadas que no salieron como esperabas",
      "Una infancia donde tus elecciones eran frecuentemente cuestionadas",
      "Comparación constante con el criterio de otras personas",
    ],
  },
  {
    id: "ira-hacia-uno-mismo",
    keywords: ["ira hacia mi misma", "ira hacia mi mismo", "estoy enojada conmigo misma", "estoy enojado conmigo mismo", "me odio por"],
    termino: "Ira hacia una misma",
    capa: "Emoción",
    sentido:
      "La ira dirigida hacia una misma suele ser más difícil de identificar que la rabia hacia otros, porque no siempre se siente como enojo —a veces se disfraza de autocrítica dura, autoexigencia o castigo silencioso.",
    enfoque:
      "Practicar hablarte, frente a un error, con la misma calidez con la que le hablarías a una amiga en tu misma situación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ira hacia una misma”)",
    otrasCausas: [
      "Un error reciente que sientes que no te perdonas del todo",
      "Estándares personales muy altos y poco flexibles",
      "Dificultad histórica para dirigir la compasión hacia ti misma",
    ],
  },
  {
    id: "vacio-post-logro",
    keywords: ["vacio despues de lograr algo", "vacío después de lograr algo", "y ahora que", "y ahora qué", "no siento nada tras lograrlo"],
    termino: "Vacío después de un logro",
    capa: "Emoción",
    sentido:
      "Es más común de lo que parece: alcanzar una meta perseguida por mucho tiempo y sentir, en vez de plenitud, un extraño vacío. Suele pasar cuando el logro se buscó para llenar algo distinto —validación, seguridad— que la meta en sí no puede resolver del todo.",
    enfoque:
      "Preguntarte qué esperabas que este logro te diera realmente, más allá del logro mismo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vacío después de un logro”)",
    otrasCausas: [
      "Una meta perseguida para llenar una necesidad distinta a la que resuelve",
      "Falta de un siguiente propósito claro tras alcanzar la meta",
      "Expectativas poco realistas sobre lo que el logro cambiaría en tu vida",
    ],
  },
  {
    id: "miedo-perder-control",
    keywords: ["miedo a perder el control", "miedo a perder el control de todo", "no soporto no tener el control"],
    termino: "Miedo a perder el control",
    capa: "Emoción",
    sentido:
      "El miedo a perder el control suele ser, en el fondo, miedo a que algo malo ocurra si tú no lo estás vigilando de cerca. Sostenerlo todo el tiempo, sin embargo, es agotador y en la práctica imposible.",
    enfoque:
      "Elegir un área pequeña de tu vida donde practiques soltar el control de forma consciente, sin que pase nada grave.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder el control”)",
    otrasCausas: [
      "Una experiencia pasada donde perder el control tuvo consecuencias reales",
      "Un entorno de origen imprevisible o inestable",
      "Dificultad para confiar en que otros puedan manejar las cosas",
    ],
  },
  {
    id: "rigidez-mental",
    keywords: ["rigidez mental", "me cuesta cambiar de opinion", "me cuesta cambiar de opinión", "todo tiene que ser a mi manera"],
    termino: "Rigidez mental",
    capa: "Emoción",
    sentido:
      "La rigidez mental suele ser una forma de sentirse a salvo en medio de la incertidumbre: sostener una sola forma de ver las cosas da una sensación de control, aunque a costa de perderse otras perspectivas posiblemente valiosas.",
    enfoque:
      "Practicar preguntar activamente el punto de vista de alguien que piensa distinto a ti, con curiosidad genuina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rigidez mental”)",
    otrasCausas: [
      "Necesidad de certeza frente a la incertidumbre general de la vida",
      "Una infancia con reglas muy estrictas y poco espacio para el matiz",
      "Miedo a equivocarte si consideras otra perspectiva distinta",
    ],
  },
  {
    id: "necesidad-tener-razon",
    keywords: ["necesidad de tener siempre la razon", "necesidad de tener siempre la razón", "siempre tengo que tener la razon", "siempre tengo que tener la razón"],
    termino: "Necesidad de tener siempre la razón",
    capa: "Emoción",
    sentido:
      "Necesitar tener siempre la razón suele proteger una autoestima que se siente frágil por dentro: si admites un error, temes que se confirme una sospecha más profunda sobre no ser lo bastante capaz.",
    enfoque:
      "Practicar decir “tienes razón” en una discusión pequeña, y notar que tu valor como persona no se ve afectado por eso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de tener siempre la razón”)",
    otrasCausas: [
      "Una autoestima frágil que se protege evitando el error",
      "Una infancia donde equivocarte generaba burla o castigo",
      "Competitividad aprendida desde temprano con hermanos o compañeros",
    ],
  },
  {
    id: "sentirse-no-escuchada",
    keywords: ["nadie me escucha", "siento que no me escuchan", "no me toman en cuenta"],
    termino: "Sentir que no te escuchan",
    capa: "Emoción",
    sentido:
      "Sentir que no te escuchan es distinto de sentirte invisible: aquí sí te ven, pero tus palabras parecen no tener el mismo peso que las de otros. Suele doler especialmente en vínculos donde esperarías ser tomada en cuenta.",
    enfoque:
      "Practicar nombrar explícitamente, a la persona correspondiente, que necesitas sentir que tu opinión cuenta en esa conversación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentir que no te escuchan”)",
    otrasCausas: [
      "Una dinámica familiar donde tu opinión se minimizaba habitualmente",
      "Un vínculo actual con desequilibrio en quién decide o propone",
      "Dificultad para expresar tus ideas con la firmeza que merecen",
    ],
  },
  {
    id: "verguenza-por-sentir",
    keywords: ["vergüenza por sentir", "verguenza por llorar", "vergüenza por llorar", "me da pena sentir"],
    termino: "Vergüenza por sentir emociones",
    capa: "Emoción",
    sentido:
      "Sentir vergüenza por llorar o mostrar emoción suele venir de mensajes tempranos —directos o culturales— de que ciertas emociones son “debilidad”. Pero una emoción expresada casi siempre pesa menos que una escondida.",
    enfoque:
      "Practicar permitirte una emoción, aunque sea en privado, sin la exigencia adicional de sentirte fuerte todo el tiempo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vergüenza por sentir emociones”)",
    otrasCausas: [
      "Mensajes familiares o culturales de que mostrar emoción es debilidad",
      "Una infancia donde llorar era motivo de burla o castigo",
      "Un rol de “la fuerte” asumido desde hace mucho tiempo",
    ],
  },
  {
    id: "desconexion-cuerpo",
    keywords: ["desconexion de mi cuerpo", "desconexión de mi cuerpo", "no siento mi cuerpo", "vivo en mi cabeza"],
    termino: "Desconexión del propio cuerpo",
    capa: "Emoción",
    sentido:
      "Vivir “en la cabeza” y desconectada del cuerpo suele ser una estrategia de protección cuando, en algún momento, sentir plenamente el propio cuerpo estuvo asociado a dolor o vulnerabilidad excesiva.",
    enfoque:
      "Practicar ejercicios breves de atención al cuerpo —respiración, movimiento suave— sin exigirte sentir algo en particular.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Desconexión del propio cuerpo”)",
    otrasCausas: [
      "Experiencias pasadas donde sentir el cuerpo se asoció a dolor o vulnerabilidad",
      "Una vida muy mental, con poco espacio para lo sensorial",
      "Fatiga o sobrecarga que lleva a “apagar” las sensaciones físicas",
    ],
  },
  {
    id: "miedo-no-ser-amada",
    keywords: ["miedo a no ser amada", "miedo a no ser amado", "miedo a no merecer amor", "creo que no merezco ser amada", "creo que no merezco ser amado"],
    termino: "Miedo a no ser amada",
    capa: "Emoción",
    sentido:
      "El miedo a no ser digna de amor suele ser una de las heridas más profundas y más comunes que existen. Casi siempre se origina en vínculos tempranos donde el afecto se sintió inconsistente, condicionado, o insuficiente.",
    enfoque:
      "Recordar que el amor que no recibiste en su momento no fue por algo que te faltara a ti; fue una limitación de quien no pudo dártelo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a no ser amada”)",
    otrasCausas: [
      "Un vínculo temprano con afecto inconsistente o condicionado",
      "Comparaciones que te hicieron sentir menos digna de cariño",
      "Relaciones adultas que reforzaron esta misma creencia antigua",
    ],
  },
  {
    id: "manos-sudorosas",
    keywords: ["manos sudorosas", "sudor en las manos", "me sudan las manos"],
    termino: "Manos sudorosas",
    capa: "Ectodermo",
    sentido:
      "Las manos representan el contacto y la acción hacia el mundo; que suden en exceso suele acompañar al nerviosismo frente a situaciones donde sientes que debes “dar la talla”, como un saludo, una entrevista o una presentación.",
    enfoque:
      "Identificar en qué tipo de encuentros o situaciones se intensifica esta reacción.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos sudorosas”)",
    otrasCausas: [
      "Nerviosismo frente a situaciones de evaluación o primer contacto",
      "Ansiedad social en encuentros nuevos",
      "Presión por causar una buena impresión",
    ],
  },
  {
    id: "vomito",
    keywords: ["vomito", "vómito", "vomitar", "ganas de vomitar"],
    termino: "Vómito",
    capa: "Endodermo",
    sentido:
      "El vómito es el rechazo más contundente y literal que el cuerpo puede expresar: algo —una situación, una idea, una noticia— resultó tan indigesto que el cuerpo decide expulsarlo por completo, sin dejar lugar a duda.",
    enfoque:
      "Identificar qué situación reciente sientes que necesitas “expulsar” por completo de tu vida o de tu mente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vómito”)",
    otrasCausas: [
      "Una situación o noticia que resultó completamente indigesta emocionalmente",
      "Rechazo intenso hacia algo que se te impuso",
      "Ansiedad aguda frente a un evento inminente",
    ],
  },
  {
    id: "arritmia",
    keywords: ["arritmia", "arritmia cardiaca", "arritmia cardíaca", "el corazon se me acelera", "el corazón se me acelera"],
    termino: "Arritmia",
    capa: "Mesodermo",
    sentido:
      "Una arritmia, la pérdida del ritmo constante del corazón, suele coincidir con etapas donde el ritmo de vida se sintió alterado de forma abrupta —una noticia inesperada, un cambio que rompió la cadencia habitual de tus días.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, notar si tu ritmo de vida se ha visto alterado recientemente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Arritmia”)",
    otrasCausas: [
      "Un cambio abrupto en el ritmo habitual de tu vida",
      "Una noticia inesperada que alteró tu estabilidad emocional",
      "Ansiedad aguda frente a una situación puntual",
    ],
  },
  {
    id: "osteoartritis",
    keywords: ["osteoartritis", "artrosis", "desgaste articular"],
    termino: "Osteoartritis (artrosis)",
    capa: "Mesodermo",
    sentido:
      "A diferencia de la artritis autoinmune, la artrosis habla de un desgaste acumulado por el tiempo y el uso —sostener, cargar, moverte en una misma dirección durante años, sin muchas pausas para el descanso articular real.",
    enfoque:
      "Revisar si llevas mucho tiempo sosteniendo una misma carga, física o de responsabilidad, sin pausas suficientes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Osteoartritis”)",
    otrasCausas: [
      "Años de sostener una misma carga física o de responsabilidad",
      "Poco descanso articular a lo largo del tiempo",
      "Una autoexigencia física sostenida sin pausas adecuadas",
    ],
  },
  {
    id: "hormigueo-manos",
    keywords: ["hormigueo en las manos", "se me duermen las manos", "adormecimiento de manos"],
    termino: "Hormigueo en las manos",
    capa: "Ectodermo",
    sentido:
      "El hormigueo o adormecimiento en las manos, fuera de causas físicas por revisar, a veces se relaciona con una acción importante que sientes que no te atreves a “tomar en tus manos” todavía, como si una parte de ti se resistiera a actuar.",
    enfoque:
      "Identificar qué acción concreta sientes que necesitas tomar, pero has estado postergando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hormigueo en las manos”)",
    otrasCausas: [
      "Una decisión importante que sientes que no te atreves a tomar",
      "Mala postura o compresión física que conviene revisar con un especialista",
      "Ansiedad que se somatiza en las extremidades",
    ],
  },
  {
    id: "neuralgia",
    keywords: ["neuralgia", "dolor neuropatico", "dolor neuropático", "dolor nervioso agudo"],
    termino: "Neuralgia",
    capa: "Ectodermo",
    sentido:
      "El dolor neurálgico, agudo y de aparición repentina, suele coincidir con una alarma interna intensa —una situación reciente que activó el sistema nervioso con una fuerza que se siente literalmente como una descarga.",
    enfoque:
      "Identificar qué situación reciente sentiste como una verdadera “descarga” emocional.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Neuralgia”)",
    otrasCausas: [
      "Una alarma o susto emocional reciente e intenso",
      "Tensión nerviosa sostenida sin una vía clara de descarga",
      "Una situación que activó una respuesta de alerta muy fuerte",
    ],
  },
  {
    id: "menopausia",
    keywords: ["menopausia", "climaterio", "bochornos", "sofocos"],
    termino: "Menopausia",
    capa: "Mesodermo",
    sentido:
      "La menopausia es una transición natural, no una pérdida. Simbólicamente marca el cierre de una etapa fértil y la apertura de otra, con su propia sabiduría; los síntomas físicos a veces se intensifican cuando esta etapa se vive con resistencia en vez de aceptación.",
    enfoque:
      "Explorar qué parte de esta nueva etapa podrías empezar a recibir con curiosidad, en vez de solo con resistencia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Menopausia”)",
    otrasCausas: [
      "Resistencia cultural o personal a esta etapa de transición",
      "Duelo no procesado por el cierre de la etapa fértil",
      "Falta de referentes cercanos que vivan esta etapa con plenitud",
    ],
  },
  {
    id: "fatiga-cronica",
    keywords: ["fatiga cronica", "fatiga crónica", "cansancio extremo constante", "sindrome de fatiga cronica", "síndrome de fatiga crónica"],
    termino: "Fatiga crónica",
    capa: "Mesodermo",
    sentido:
      "La fatiga crónica es mucho más profunda que el cansancio ordinario, y merece siempre una valoración especializada completa. Simbólicamente, suele coincidir con años de exigencia sostenida sin momentos reales de recuperación, como si el cuerpo finalmente exigiera la pausa que la mente no se permitía.",
    enfoque:
      "Buscar acompañamiento médico especializado, y en paralelo, revisar cuánto tiempo llevas sin un descanso genuino.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fatiga crónica”)",
    otrasCausas: [
      "Años de exigencia sostenida sin descanso real",
      "Un agotamiento acumulado que el cuerpo ya no puede seguir ignorando",
      "Falta de límites claros entre el trabajo y el descanso",
    ],
  },
  {
    id: "fatiga-visual",
    keywords: ["fatiga visual", "cansancio en los ojos", "vista cansada", "ojos cansados"],
    termino: "Fatiga visual",
    capa: "Ectodermo",
    sentido:
      "El cansancio ocular suele coincidir con haber estado “mirando” o prestando atención a demasiadas cosas a la vez —pantallas, información, exigencias— sin pausas suficientes para que la vista, literal y simbólicamente, descanse.",
    enfoque:
      "Practicar pausas breves y frecuentes alejando la mirada de las pantallas durante tu día.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Fatiga visual”)",
    otrasCausas: [
      "Exposición prolongada a pantallas sin pausas suficientes",
      "Sobrecarga de información que procesar en poco tiempo",
      "Falta de descanso visual real durante la jornada",
    ],
  },
  {
    id: "dolor-pelvico",
    keywords: ["dolor pelvico", "dolor pélvico", "dolor en la pelvis"],
    termino: "Dolor pélvico",
    capa: "Mesodermo",
    sentido:
      "La pelvis sostiene el centro del cuerpo y se relaciona simbólicamente con la propia base de sostén y con temas de creación e intimidad; su dolor sostenido suele acompañar a tensiones no resueltas en alguna de estas áreas.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, revisar tu relación actual con tu sensación de estabilidad y sostén.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor pélvico”)",
    otrasCausas: [
      "Tensión no resuelta relacionada con la intimidad o la creación",
      "Una sensación de inestabilidad en la base de tu vida actual",
      "Estrés físico sostenido en la zona central del cuerpo",
    ],
  },
  {
    id: "intolerancia-lactosa",
    keywords: ["intolerancia a la lactosa", "no tolero los lacteos", "no tolero los lácteos"],
    termino: "Intolerancia a la lactosa",
    capa: "Endodermo",
    sentido:
      "La lactosa proviene de la leche materna simbólicamente asociada al cuidado más primario; su intolerancia a veces coincide con una dificultad para “recibir” cuidado o nutrición emocional de la forma en que se ofrece.",
    enfoque:
      "Revisar si te cuesta recibir cuidado de otros de la forma en que te lo ofrecen, aunque lo necesites.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Intolerancia a la lactosa”)",
    otrasCausas: [
      "Dificultad para recibir cuidado o nutrición emocional de otros",
      "Una relación compleja con el propio cuidado materno de origen",
      "Sensibilidad física real que conviene confirmar médicamente",
    ],
  },
  {
    id: "intolerancia-gluten",
    keywords: ["intolerancia al gluten", "celiaquia", "celiaquía", "enfermedad celiaca", "enfermedad celíaca"],
    termino: "Intolerancia al gluten (celiaquía)",
    capa: "Endodermo",
    sentido:
      "El gluten está presente en los alimentos más básicos y cotidianos; su intolerancia, más allá de la causa física real que siempre debe diagnosticarse clínicamente, simbólicamente puede relacionarse con dificultad para “digerir” lo común, lo esperado, lo de todos los días.",
    enfoque:
      "Seguir siempre la guía médica y nutricional profesional; en paralelo, observar si sientes que lo “cotidiano” de tu vida te cuesta más de lo habitual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Intolerancia al gluten”)",
    otrasCausas: [
      "Una condición física real que requiere diagnóstico y manejo profesional",
      "Dificultad simbólica para asimilar lo rutinario o esperado",
      "Sensibilidad digestiva que merece siempre valoración especializada",
    ],
  },
  {
    id: "unas-encarnadas",
    keywords: ["unas encarnadas", "uñas encarnadas", "uña enterrada"],
    termino: "Uñas encarnadas",
    capa: "Ectodermo",
    sentido:
      "Una uña encarnada, que crece hacia adentro en vez de hacia afuera, suele simbolizar una autocrítica que se dirige hacia dentro en vez de expresarse —una defensa que, en vez de protegerte de otros, termina lastimándote a ti misma.",
    enfoque:
      "Notar si hay una crítica o un enojo que sueles dirigir hacia ti misma en vez de expresarlo hacia afuera.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Uñas encarnadas”)",
    otrasCausas: [
      "Autocrítica dirigida hacia dentro en vez de expresarse",
      "Dificultad para defenderte abiertamente frente a otros",
      "Calzado o cuidado físico inadecuado que conviene revisar también",
    ],
  },
  {
    id: "otitis",
    keywords: ["otitis", "dolor de oido", "dolor de oído", "infeccion en el oido", "infección en el oído"],
    termino: "Otitis (dolor de oído)",
    capa: "Ectodermo",
    sentido:
      "El dolor agudo de oído, más intenso que el zumbido o la pérdida gradual de audición, suele coincidir con algo que se escuchó de forma muy abrupta o dolorosa —una noticia o un comentario que “dolió” al oírlo, de forma literal.",
    enfoque:
      "Recordar si escuchaste recientemente algo que te generó un dolor o una molestia inmediata.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Otitis”)",
    otrasCausas: [
      "Una noticia o comentario reciente que dolió al escucharlo",
      "Un conflicto verbal intenso vivido de forma reciente",
      "Exposición a un ambiente con ruido o tensión sostenida",
    ],
  },
  {
    id: "resequedad-piel",
    keywords: ["resequedad en la piel", "piel muy seca", "piel reseca"],
    termino: "Resequedad de la piel",
    capa: "Ectodermo",
    sentido:
      "La piel muy seca, más allá de causas ambientales, a veces se relaciona con una sensación de falta de nutrición afectiva —cariño, contacto, ternura— en el día a día, como si la piel reflejara hacia afuera esa sequedad emocional interna.",
    enfoque:
      "Revisar si sientes que te falta contacto afectivo o ternura en tu rutina actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Resequedad de la piel”)",
    otrasCausas: [
      "Falta de contacto afectivo o ternura en el día a día",
      "Factores ambientales como clima seco o baja hidratación",
      "Una etapa de vida con poco cuidado personal general",
    ],
  },
  {
    id: "dolor-cronico",
    keywords: ["dolor cronico", "dolor crónico", "dolor constante en el cuerpo", "me duele todo el cuerpo"],
    termino: "Dolor crónico (general)",
    capa: "Mesodermo",
    sentido:
      "El dolor crónico sostenido, siempre merecedor de valoración especializada integral, a veces coincide con una carga emocional que lleva mucho tiempo sin procesarse del todo, como si el cuerpo hablara en un idioma físico lo que la mente no ha terminado de nombrar.",
    enfoque:
      "Buscar siempre acompañamiento médico especializado, y explorar en paralelo qué carga emocional antigua podría estar pidiendo atención.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor crónico”)",
    otrasCausas: [
      "Una carga emocional antigua sin procesar del todo",
      "Agotamiento físico y emocional sostenido por años",
      "Una condición física real que siempre requiere manejo profesional",
    ],
  },
  {
    id: "sensibilidad-dental",
    keywords: ["sensibilidad dental", "dientes sensibles", "sensibilidad en los dientes"],
    termino: "Sensibilidad dental",
    capa: "Mesodermo",
    sentido:
      "La sensibilidad dental, más allá de causas odontológicas, a veces coincide con una sensación de vulnerabilidad frente a decisiones o confrontaciones que normalmente enfrentarías con más firmeza.",
    enfoque:
      "Notar si te sientes más vulnerable de lo habitual frente a una decisión o conflicto reciente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensibilidad dental”)",
    otrasCausas: [
      "Una sensación de vulnerabilidad reciente frente a una decisión",
      "Desgaste dental que siempre conviene revisar con un profesional",
      "Estrés que se somatiza en la zona de la mandíbula y los dientes",
    ],
  },
  {
    id: "miedo-juicio",
    keywords: ["miedo a ser juzgada", "miedo a ser juzgado", "miedo al que diran", "miedo al qué dirán"],
    termino: "Miedo al juicio de otros",
    capa: "Emoción",
    sentido:
      "El miedo al juicio ajeno suele darle a la opinión de los demás más peso del que en realidad tiene sobre tu vida real. La mayoría de las personas están mucho más ocupadas pensando en sí mismas de lo que solemos imaginar.",
    enfoque:
      "Practicar una acción pequeña que temas que “se vea mal”, y observar qué tan real fue el juicio que esperabas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al juicio de otros”)",
    otrasCausas: [
      "Una infancia con juicios frecuentes por parte de figuras cercanas",
      "Un entorno actual particularmente crítico",
      "Autoexigencia alta trasladada hacia lo que otros podrían pensar",
    ],
  },
  {
    id: "necesidad-ser-especial",
    keywords: ["necesidad de ser especial", "necesito destacar", "necesito ser diferente a los demas", "necesito ser diferente a los demás"],
    termino: "Necesidad de ser especial",
    capa: "Emoción",
    sentido:
      "La necesidad de sentirte especial o distinta a los demás, en su forma más profunda, suele esconder el miedo de que ser “común” significaría no ser digna de amor o atención.",
    enfoque:
      "Practicar valorar momentos ordinarios de tu vida, sin necesidad de que sean excepcionales para sentir que cuentan.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de ser especial”)",
    otrasCausas: [
      "Una infancia donde el amor parecía reservado solo para logros excepcionales",
      "Comparación constante con hermanos o compañeros destacados",
      "Miedo de fondo a pasar desapercibida",
    ],
  },
  {
    id: "decepcion-propia",
    keywords: ["decepcion de mi misma", "decepción de mí misma", "me decepciono a mi misma", "me decepciono a mí misma", "estoy decepcionada de mi misma", "estoy decepcionada de mí misma"],
    termino: "Decepción de una misma",
    capa: "Emoción",
    sentido:
      "Decepcionarte de ti misma suele doler más que la decepción de otros, porque no hay distancia posible: convives contigo todo el tiempo. Es importante distinguir un error puntual de una sentencia total sobre quién eres.",
    enfoque:
      "Practicar separar “hice algo que no me gustó” de “soy una decepción” — son afirmaciones muy distintas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Decepción de una misma”)",
    otrasCausas: [
      "Estándares personales muy altos y poco flexibles",
      "Un error reciente que se vive como definitorio de tu valor",
      "Dificultad histórica para perdonarte a ti misma",
    ],
  },
  {
    id: "sentimiento-inadecuacion",
    keywords: ["sentimiento de inadecuacion", "sentimiento de inadecuación", "no encajo aqui", "no encajo aquí", "siento que no doy la talla"],
    termino: "Sentimiento de inadecuación",
    capa: "Emoción",
    sentido:
      "Sentir que no “das la talla” en un contexto específico —un trabajo, un grupo, una etapa— suele ser situacional, no una verdad definitiva sobre tu capacidad general. El contexto equivocado puede hacer sentir inadecuada a cualquiera.",
    enfoque:
      "Preguntarte si es el contexto el que no encaja contigo, en vez de asumir automáticamente que el problema eres tú.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de inadecuación”)",
    otrasCausas: [
      "Un contexto o ambiente que genuinamente no se ajusta a tus fortalezas",
      "Comparación con estándares que no reflejan tu forma particular de aportar",
      "Una transición reciente a un espacio nuevo y poco familiar",
    ],
  },
  {
    id: "sentimiento-fracaso",
    keywords: ["sentimiento de fracaso", "me siento un fracaso", "siento que he fracasado"],
    termino: "Sentimiento de fracaso",
    capa: "Emoción",
    sentido:
      "Sentir que has fracasado, a diferencia del miedo al fracaso, ya asume que algo salió mal. Vale la pena revisar si ese “fracaso” es objetivamente así, o si es una etapa de un proceso más largo que aún no ha terminado de escribirse.",
    enfoque:
      "Hacer una lista de lo que sí aprendiste o ganaste en el proceso, aunque el resultado final no fuera el esperado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de fracaso”)",
    otrasCausas: [
      "Una meta no alcanzada según el plazo o la forma que esperabas",
      "Comparación con el éxito aparente de otras personas",
      "Estándares de éxito muy rígidos o poco realistas",
    ],
  },
  {
    id: "autoexigencia",
    keywords: ["autoexigencia", "soy muy exigente conmigo misma", "soy muy exigente conmigo mismo", "me exijo demasiado"],
    termino: "Autoexigencia",
    capa: "Emoción",
    sentido:
      "La autoexigencia alta puede impulsar logros reales, pero cuando no tiene límites se convierte en una fuente constante de insatisfacción, sin importar cuánto se logre —la meta siempre se mueve un poco más lejos.",
    enfoque:
      "Practicar fijar, de forma consciente, cuándo un resultado es “suficientemente bueno” antes de empezar una tarea.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Autoexigencia”)",
    otrasCausas: [
      "Una infancia donde el reconocimiento dependía del rendimiento",
      "Comparación constante con estándares externos muy altos",
      "Miedo de fondo a ser vista como mediocre o insuficiente",
    ],
  },
  {
    id: "sentirse-fragil",
    keywords: ["me siento fragil", "me siento frágil", "siento que me puedo quebrar", "sentirse vulnerable"],
    termino: "Sentirse frágil",
    capa: "Emoción",
    sentido:
      "Sentirte frágil no es lo mismo que ser débil; suele aparecer justo después de haber sostenido mucho durante mucho tiempo, como una señal honesta de que necesitas ser cuidada, no de que hayas fallado en algo.",
    enfoque:
      "Permitirte pedir apoyo en esta etapa, en vez de exigirte la misma fortaleza de siempre sin descanso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse frágil”)",
    otrasCausas: [
      "Un periodo largo de sostener mucho sin pausas ni apoyo",
      "Una acumulación de pequeñas pérdidas o decepciones recientes",
      "Agotamiento físico y emocional sostenido",
    ],
  },
  {
    id: "necesidad-estar-ocupada",
    keywords: ["necesidad de estar siempre ocupada", "necesidad de estar siempre ocupado", "no se estar sin hacer nada", "no sé estar sin hacer nada"],
    termino: "Necesidad de estar siempre ocupada",
    capa: "Emoción",
    sentido:
      "Llenar cada momento de actividad puede ser, sin darte cuenta, una forma de evitar quedarte a solas con pensamientos o emociones incómodas que surgen en el silencio y la quietud.",
    enfoque:
      "Practicar diez minutos de quietud deliberada, sin pantallas ni tareas, y observar qué surge cuando lo permites.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de estar siempre ocupada”)",
    otrasCausas: [
      "Evitación de pensamientos o emociones incómodas que surgen en la quietud",
      "Una identidad muy ligada a la productividad y el rendimiento",
      "Incomodidad genuina y poco explorada frente al descanso",
    ],
  },
  {
    id: "miedo-libertad",
    keywords: ["miedo a la libertad", "miedo a decidir por mi misma", "miedo a decidir por mí misma", "me da miedo no tener reglas"],
    termino: "Miedo a la libertad",
    capa: "Emoción",
    sentido:
      "Contrario a lo que parece, demasiada libertad o falta de estructura puede generar ansiedad en vez de alivio, especialmente si estás acostumbrada a que otros marquen el camino a seguir.",
    enfoque:
      "Practicar crear tu propia estructura pequeña y flexible, en vez de depender de que alguien más la imponga.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la libertad”)",
    otrasCausas: [
      "Un entorno de origen muy estructurado con pocas decisiones propias",
      "Miedo a equivocarte al no tener una guía externa clara",
      "Poca práctica histórica confiando en tu propio criterio",
    ],
  },
  {
    id: "culpa-descansar",
    keywords: ["culpa por descansar", "me siento culpable si descanso", "no puedo descansar sin culpa"],
    termino: "Culpa por descansar",
    capa: "Emoción",
    sentido:
      "Sentir culpa al descansar suele venir de asociar el propio valor únicamente con la productividad —como si descansar fuera algo que hay que “ganarse” en vez de una necesidad básica y legítima del cuerpo y la mente.",
    enfoque:
      "Practicar descansar sin haber “terminado todo” antes, y observar que el mundo, casi siempre, sigue funcionando igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por descansar”)",
    otrasCausas: [
      "Una identidad muy ligada al rendimiento y la productividad",
      "Mensajes familiares que asociaban el descanso con la pereza",
      "Miedo a quedar mal si no estás siempre disponible o activa",
    ],
  },
  {
    id: "miedo-cambio",
    keywords: ["miedo al cambio", "me cuesta adaptarme a los cambios", "resistencia al cambio"],
    termino: "Miedo al cambio",
    capa: "Emoción",
    sentido:
      "El miedo al cambio, incluso cuando el cambio es positivo, suele proteger la seguridad de lo ya conocido. El cerebro prefiere lo predecible, aunque sea incómodo, sobre lo incierto, aunque sea potencialmente mejor.",
    enfoque:
      "Identificar qué parte específica del cambio te genera más temor, en vez de resistir el cambio como un todo abstracto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al cambio”)",
    otrasCausas: [
      "Experiencias pasadas donde un cambio trajo consecuencias difíciles",
      "Necesidad alta de previsibilidad y control",
      "Una transición actual que toca varias áreas de vida a la vez",
    ],
  },
  {
    id: "desconexion-social",
    keywords: ["desconexion social", "desconexión social", "me siento desconectada de la gente", "me siento desconectado de la gente"],
    termino: "Desconexión social",
    capa: "Emoción",
    sentido:
      "Sentirte desconectada de quienes te rodean, incluso estando acompañada, suele hablar de una brecha entre lo que muestras hacia afuera y lo que realmente sientes por dentro, más que de una falta real de personas cercanas.",
    enfoque:
      "Practicar compartir algo genuino, aunque pequeño, con alguien de confianza esta semana.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Desconexión social”)",
    otrasCausas: [
      "Una brecha entre lo que muestras y lo que realmente sientes",
      "Una etapa de mucho cambio que dificulta mantener vínculos cercanos",
      "Agotamiento social tras un periodo de mucha exposición a otros",
    ],
  },
  {
    id: "necesidad-salvar-otros",
    keywords: ["necesidad de salvar a otros", "quiero rescatar a todos", "siempre trato de arreglar a los demas", "siempre trato de arreglar a los demás"],
    termino: "Necesidad de salvar a otros",
    capa: "Emoción",
    sentido:
      "Querer “rescatar” o arreglar a las personas cercanas suele partir de un lugar amoroso, pero también puede impedirles vivir sus propios procesos y aprendizajes, además de agotarte a ti en el intento.",
    enfoque:
      "Practicar preguntar “¿quieres que te ayude, o solo necesitas que te escuche?” antes de intentar resolver el problema de alguien más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de salvar a otros”)",
    otrasCausas: [
      "Un rol de “la que resuelve todo” asumido desde temprana edad",
      "Dificultad para tolerar el sufrimiento ajeno sin intervenir",
      "Sentido de valor propio ligado a ser indispensable para otros",
    ],
  },
  {
    id: "miedo-perder-alguien",
    keywords: ["miedo a perder a alguien", "miedo a que se vaya", "miedo a perder a mi pareja", "miedo a perder a un ser querido"],
    termino: "Miedo a perder a alguien",
    capa: "Emoción",
    sentido:
      "El miedo a perder a una persona querida suele intensificarse después de una pérdida pasada, o en vínculos donde el apego se siente especialmente profundo. Es un miedo humano y comprensible que, en exceso, puede tensar la propia relación.",
    enfoque:
      "Practicar disfrutar el vínculo presente, en vez de vivirlo permanentemente desde el miedo a perderlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder a alguien”)",
    otrasCausas: [
      "Una pérdida pasada que dejó una huella profunda",
      "Un apego muy intenso hacia la persona en cuestión",
      "Inseguridad general sobre la permanencia de los vínculos",
    ],
  },
  {
    id: "verguenza-pasado",
    keywords: ["verguenza de mi pasado", "vergüenza de mi pasado", "me averguenza quien era antes", "me avergüenza quien era antes"],
    termino: "Vergüenza del propio pasado",
    capa: "Emoción",
    sentido:
      "Sentir vergüenza de quién eras antes suele ignorar que esa versión tuya hizo lo mejor que pudo con la información y las herramientas que tenía en ese momento —no las que tienes ahora, con la ventaja de mirar hacia atrás.",
    enfoque:
      "Practicar agradecerle a tu yo del pasado por haberte traído hasta aquí, en vez de solo juzgarlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vergüenza del propio pasado”)",
    otrasCausas: [
      "Decisiones pasadas juzgadas con la información y madurez actuales",
      "Comparación entre quién eras y quién eres ahora",
      "Dificultad para integrar etapas pasadas como parte de tu historia completa",
    ],
  },
  {
    id: "dificultad-recibir",
    keywords: ["dificultad para recibir", "no se recibir ayuda", "no sé recibir ayuda", "me cuesta aceptar cumplidos", "me incomoda que me ayuden"],
    termino: "Dificultad para recibir",
    capa: "Emoción",
    sentido:
      "Muchas personas acostumbradas a dar tienen, paradójicamente, mucha dificultad para recibir —ayuda, cumplidos, cuidado— como si aceptarlo generara una deuda incómoda o revelara una vulnerabilidad que prefieren no mostrar.",
    enfoque:
      "Practicar simplemente decir “gracias” ante un cumplido o una ayuda, sin restarle valor ni devolver el favor de inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para recibir”)",
    otrasCausas: [
      "Un rol histórico de “la que da”, con poca práctica recibiendo",
      "Incomodidad con la vulnerabilidad que implica aceptar ayuda",
      "Miedo a sentirte en deuda con quien te ofrece algo",
    ],
  },
  {
    id: "manos-frias",
    keywords: ["manos frias", "manos frías", "se me enfrian las manos", "se me enfrían las manos", "pies frios", "pies fríos"],
    termino: "Manos y pies fríos",
    capa: "Mesodermo",
    sentido:
      "Las extremidades frías suelen coincidir con un repliegue emocional —el cuerpo concentra su energía hacia el centro, como en modo de protección, cuando algo se percibe como amenazante o cuando hay un retraimiento afectivo sostenido.",
    enfoque:
      "Notar si hay una situación reciente frente a la que sientes la necesidad de “retraerte” o protegerte.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos y pies fríos”)",
    otrasCausas: [
      "Un repliegue emocional frente a una situación percibida como amenazante",
      "Circulación sensible que conviene revisar con un especialista también",
      "Una etapa de retraimiento afectivo general",
    ],
  },
  {
    id: "ganglios-inflamados",
    keywords: ["ganglios inflamados", "ganglios hinchados", "inflamacion de ganglios", "inflamación de ganglios"],
    termino: "Ganglios inflamados",
    capa: "Mesodermo",
    sentido:
      "Los ganglios filtran lo que ya no le sirve al cuerpo; su inflamación simbólicamente puede coincidir con un proceso activo de “filtrar” o procesar una situación emocional reciente, mientras el sistema hace su trabajo de limpieza.",
    enfoque:
      "Observar qué situación reciente sientes que tu cuerpo y tu mente están todavía procesando activamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ganglios inflamados”)",
    otrasCausas: [
      "Un proceso activo de sanación o recuperación en curso",
      "Una infección real que siempre conviene confirmar médicamente",
      "Procesamiento emocional de una situación reciente",
    ],
  },
  {
    id: "distension-abdominal",
    keywords: ["distension abdominal", "distensión abdominal", "hinchazon abdominal", "hinchazón abdominal", "se me hincha el abdomen"],
    termino: "Distensión abdominal (hinchazón)",
    capa: "Endodermo",
    sentido:
      "La hinchazón abdominal suele acompañar a emociones “hinchadas” de más —preocupaciones o pendientes que ocupan mucho más espacio mental del que en realidad les corresponde.",
    enfoque:
      "Identificar qué preocupación reciente sientes que ha crecido más de lo proporcional en tu cabeza.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Distensión abdominal”)",
    otrasCausas: [
      "Una preocupación que ha crecido más de lo proporcional en tu mente",
      "Cambios alimenticios recientes junto con tensión emocional",
      "Ansiedad que se somatiza en el sistema digestivo",
    ],
  },
  {
    id: "higado-graso",
    keywords: ["higado graso", "hígado graso", "esteatosis hepatica", "esteatosis hepática"],
    termino: "Hígado graso",
    capa: "Endodermo",
    sentido:
      "Más allá de la causa metabólica real, que siempre merece seguimiento médico, el hígado graso simbólicamente puede coincidir con una acumulación sostenida de cargas o preocupaciones que nunca se llegaron a “procesar” del todo.",
    enfoque:
      "Seguir la guía médica correspondiente, y en paralelo, revisar qué cargas emocionales llevas acumulando sin procesar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hígado graso”)",
    otrasCausas: [
      "Una condición metabólica real que requiere manejo médico",
      "Cargas emocionales acumuladas durante mucho tiempo sin procesar",
      "Estrés sostenido que afecta los hábitos generales de cuidado",
    ],
  },
  {
    id: "eructos",
    keywords: ["eructos", "eructar mucho", "muchos eructos"],
    termino: "Eructos frecuentes",
    capa: "Endodermo",
    sentido:
      "Los eructos frecuentes suelen relacionarse con palabras o reacciones que se “tragaron” en el momento —una respuesta que no salió cuando debía, y que el cuerpo termina liberando después, a su manera.",
    enfoque:
      "Notar si hay una respuesta o comentario que te tragaste recientemente en vez de decirlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Eructos frecuentes”)",
    otrasCausas: [
      "Palabras o reacciones contenidas en el momento en que surgieron",
      "Comer con prisa o bajo tensión emocional",
      "Ansiedad que se somatiza en el sistema digestivo",
    ],
  },
  {
    id: "sudor-pies",
    keywords: ["sudor en los pies", "pies sudorosos", "me sudan mucho los pies"],
    termino: "Sudoración excesiva en los pies",
    capa: "Ectodermo",
    sentido:
      "Los pies representan el avance y la dirección de vida; su sudoración excesiva a veces coincide con nerviosismo frente al camino que estás tomando, como si una parte de ti dudara del terreno que estás por pisar.",
    enfoque:
      "Identificar si hay inseguridad frente a la dirección que está tomando tu vida en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sudoración en los pies”)",
    otrasCausas: [
      "Nerviosismo frente a una decisión importante de rumbo",
      "Ansiedad general que se somatiza en las extremidades",
      "Inseguridad sobre el camino de vida actual",
    ],
  },
  {
    id: "mareos-matutinos",
    keywords: ["mareos matutinos", "me mareo al levantarme", "mareo al despertar"],
    termino: "Mareos matutinos",
    capa: "Mesodermo",
    sentido:
      "Marearte justo al levantarte, más allá de causas físicas de presión arterial que siempre conviene revisar, a veces coincide con una resistencia a “ponerte de pie” frente al día que comienza —una parte de ti que preferiría quedarse un poco más en pausa.",
    enfoque:
      "Notar qué parte del día que comienza sientes que preferirías posponer un poco más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Mareos matutinos”)",
    otrasCausas: [
      "Presión arterial baja al levantarte, que conviene revisar con un especialista",
      "Resistencia inconsciente a comenzar el día",
      "Descanso insuficiente o de mala calidad durante la noche",
    ],
  },
  {
    id: "dolor-testicular",
    keywords: ["dolor testicular", "dolor en los testiculos", "dolor en los testículos"],
    termino: "Dolor testicular",
    capa: "Mesodermo",
    sentido:
      "El dolor en esta zona, más allá de la causa física que siempre debe revisarse primero, simbólicamente suele relacionarse con presión sobre la propia identidad masculina o el rol de proveedor dentro de la familia.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, revisar qué presión sientes sobre tu rol dentro de tu familia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor testicular”)",
    otrasCausas: [
      "Presión sobre el rol de proveedor o protector familiar",
      "Un conflicto reciente relacionado con la propia masculinidad",
      "Una condición física real que siempre debe evaluarse primero",
    ],
  },
  {
    id: "miedo-critica",
    keywords: ["miedo a la critica", "miedo a la crítica", "miedo a que me critiquen", "no soporto las criticas", "no soporto las críticas"],
    termino: "Miedo a la crítica",
    capa: "Emoción",
    sentido:
      "El miedo a la crítica suele hacer que cualquier retroalimentación, incluso la constructiva, se sienta como un ataque personal. Aprender a separar “esto que hice” de “quién soy” ayuda a recibir la crítica sin que duela tanto.",
    enfoque:
      "Practicar preguntarte, frente a una crítica, qué parte —si alguna— es realmente útil para mejorar, dejando el resto de lado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la crítica”)",
    otrasCausas: [
      "Una infancia con críticas frecuentes o muy duras",
      "Autoestima que depende en gran parte de la aprobación externa",
      "Experiencias pasadas donde la crítica vino acompañada de rechazo",
    ],
  },
  {
    id: "sentimiento-superioridad",
    keywords: ["sentimiento de superioridad", "me creo superior a los demas", "me creo superior a los demás"],
    termino: "Sentimiento de superioridad",
    capa: "Emoción",
    sentido:
      "Sentirte superior a otros, en muchos casos, funciona como una armadura frente a una inseguridad más profunda y menos visible —una forma de protegerte de sentir, aunque sea por un momento, que no eres suficiente.",
    enfoque:
      "Explorar, con honestidad y sin juicio, qué inseguridad podría estar escondida detrás de esta sensación de superioridad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de superioridad”)",
    otrasCausas: [
      "Una inseguridad profunda que se compensa hacia afuera",
      "Comparación constante como forma de medir el propio valor",
      "Un entorno de origen muy competitivo",
    ],
  },
  {
    id: "sentimiento-inferioridad",
    keywords: ["sentimiento de inferioridad", "me siento inferior a los demas", "me siento inferior a los demás"],
    termino: "Sentimiento de inferioridad",
    capa: "Emoción",
    sentido:
      "Sentirte inferior a otros suele nacer de comparaciones constantes, muchas veces con una sola dimensión de la otra persona —su éxito, su apariencia— sin considerar el panorama completo de su vida.",
    enfoque:
      "Practicar notar tus propias fortalezas específicas, en vez de compararte de forma general con los demás.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de inferioridad”)",
    otrasCausas: [
      "Comparación constante con una sola dimensión de otras personas",
      "Una infancia con mensajes que minimizaban tus logros",
      "Un entorno actual que fomenta la comparación constante",
    ],
  },
  {
    id: "miedo-ser-controlada",
    keywords: ["miedo a ser controlada", "miedo a ser controlado", "no me gusta que me controlen", "necesito mi espacio y libertad"],
    termino: "Miedo a ser controlada",
    capa: "Emoción",
    sentido:
      "El miedo a ser controlada por otra persona suele intensificarse en quienes, en algún momento, tuvieron muy poca autonomía sobre sus propias decisiones. Cualquier sugerencia externa puede sentirse, entonces, como una amenaza a la libertad recién ganada.",
    enfoque:
      "Distinguir entre alguien que realmente busca controlarte y alguien que solo está compartiendo una opinión o preocupación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser controlada”)",
    otrasCausas: [
      "Una infancia o relación pasada con muy poca autonomía personal",
      "Experiencias reales de control o manipulación previas",
      "Sensibilidad alta a cualquier forma de autoridad externa",
    ],
  },
  {
    id: "dificultad-perdonar",
    keywords: ["dificultad para perdonar", "no puedo perdonar", "me cuesta perdonar"],
    termino: "Dificultad para perdonar",
    capa: "Emoción",
    sentido:
      "Perdonar no significa que lo ocurrido estuvo bien, ni obliga a reconciliarte con quien te dañó. Es, sobre todo, un acto para ti misma: soltar el peso de cargar con esa herida activa todos los días.",
    enfoque:
      "Considerar el perdón como un proceso gradual para tu propia paz, sin la presión de sentirlo de golpe ni de una sola vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para perdonar”)",
    otrasCausas: [
      "Un daño profundo sin disculpa ni reconocimiento del otro lado",
      "Miedo a que perdonar signifique minimizar lo ocurrido",
      "Falta de acompañamiento en el proceso de sanar esa herida",
    ],
  },
  {
    id: "miedo-hablar-publico",
    keywords: ["miedo a hablar en publico", "miedo a hablar en público", "panico escenico", "pánico escénico"],
    termino: "Miedo a hablar en público",
    capa: "Emoción",
    sentido:
      "El miedo a hablar frente a otros es uno de los más comunes que existen, y suele intensificarse por la sensación de estar siendo evaluada en tiempo real, sin posibilidad de corregir lo dicho.",
    enfoque:
      "Practicar exponerte en grupos pequeños primero, para ir construyendo confianza de forma gradual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a hablar en público”)",
    otrasCausas: [
      "Una experiencia pasada incómoda al hablar frente a otros",
      "Miedo al juicio ajeno sobre tu forma de expresarte",
      "Poca práctica acumulada en situaciones de exposición pública",
    ],
  },
  {
    id: "ansiedad-separacion",
    keywords: ["ansiedad de separacion", "ansiedad de separación", "no soporto separarme de", "me angustia separarme"],
    termino: "Ansiedad de separación",
    capa: "Emoción",
    sentido:
      "La ansiedad de separación —sentir angustia intensa al alejarte de alguien importante, o al ver que alguien se aleja de ti— suele tener raíz en vínculos tempranos donde la separación se vivió con inseguridad genuina.",
    enfoque:
      "Practicar separaciones breves y seguras, para ir demostrándote que el vínculo permanece intacto al reencontrarse.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ansiedad de separación”)",
    otrasCausas: [
      "Vínculos tempranos donde la separación generó inseguridad real",
      "Una pérdida o abandono pasado que dejó huella profunda",
      "Un apego muy intenso hacia la persona en cuestión",
    ],
  },
  {
    id: "culpa-por-ser-feliz",
    keywords: ["culpa por ser feliz", "me siento culpable de estar bien", "culpa por estar bien cuando otros no"],
    termino: "Culpa por ser feliz",
    capa: "Emoción",
    sentido:
      "Sentir culpa por estar bien, especialmente cuando alguien cercano no lo está, es más común de lo que parece —como si tu bienestar, de alguna forma, le restara algo al sufrimiento ajeno. En realidad, tu bienestar no le quita nada a nadie.",
    enfoque:
      "Recordar que sanar o estar bien no traiciona a quienes todavía sufren; de hecho, suele ser lo que más les gustaría para ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por ser feliz”)",
    otrasCausas: [
      "Un ser querido cercano que atraviesa un momento difícil",
      "Un entorno familiar donde el sufrimiento se compartía como forma de lealtad",
      "Miedo inconsciente a “abandonar” a otros al sentirte bien",
    ],
  },
  {
    id: "miedo-mostrar-debilidad",
    keywords: ["miedo a mostrar debilidad", "no puedo mostrarme debil", "no puedo mostrarme débil", "tengo que ser siempre fuerte"],
    termino: "Miedo a mostrar debilidad",
    capa: "Emoción",
    sentido:
      "Creer que siempre debes mostrarte fuerte suele ser agotador a largo plazo. Mostrar vulnerabilidad no te hace menos capaz; casi siempre, es lo que permite que otros puedan sostenerte cuando de verdad lo necesitas.",
    enfoque:
      "Practicar compartir, con alguien de confianza, una dificultad real que estés atravesando, sin minimizarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a mostrar debilidad”)",
    otrasCausas: [
      "Un rol de “la fuerte” asumido desde temprana edad",
      "Una infancia donde mostrar vulnerabilidad generaba burla o castigo",
      "Miedo a decepcionar a quienes dependen de tu fortaleza habitual",
    ],
  },
  {
    id: "sentimiento-deslealtad",
    keywords: ["sentimiento de deslealtad", "siento que traiciono a mi familia", "me siento desleal"],
    termino: "Sentimiento de deslealtad",
    capa: "Emoción",
    sentido:
      "Sentir que traicionas a tu familia al tomar un camino distinto al esperado suele ser una lealtad invisible bien intencionada, pero que puede frenarte de vivir tu propia vida. Puedes honrar tu origen sin repetir exactamente el mismo camino.",
    enfoque:
      "Recordar que construir tu propio camino no borra ni desprecia el de quienes vinieron antes que tú.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de deslealtad”)",
    otrasCausas: [
      "Un camino de vida distinto al que tu familia esperaba de ti",
      "Lealtades familiares invisibles hacia patrones ya conocidos",
      "Miedo a distanciarte emocionalmente de tu entorno de origen",
    ],
  },
  {
    id: "miedo-defraudar-familia",
    keywords: ["miedo a defraudar a mi familia", "miedo a decepcionar a mis padres", "no quiero fallarle a mi familia"],
    termino: "Miedo a defraudar a la familia",
    capa: "Emoción",
    sentido:
      "El miedo a decepcionar a la familia, especialmente a los padres, suele ser una de las presiones más profundas y menos cuestionadas que existen —una lealtad que a veces pesa más que tus propios deseos genuinos.",
    enfoque:
      "Distinguir entre lo que tú realmente quieres para tu vida y lo que crees que se espera de ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a defraudar a la familia”)",
    otrasCausas: [
      "Expectativas familiares muy marcadas sobre tu camino de vida",
      "Un rol de “el orgullo de la familia” asumido desde joven",
      "Miedo al distanciamiento si tomas decisiones distintas a las esperadas",
    ],
  },
  {
    id: "dificultad-soltar-pasado",
    keywords: ["dificultad para soltar el pasado", "no puedo soltar el pasado", "vivo pensando en el pasado", "me quedo atrapada en el pasado"],
    termino: "Dificultad para soltar el pasado",
    capa: "Emoción",
    sentido:
      "Quedarte pensando en el pasado con frecuencia suele ser un intento de encontrarle sentido a algo que aún no cierra del todo, más que un simple apego a lo que ya fue. El presente compite en desventaja contra un pasado idealizado o sin resolver.",
    enfoque:
      "Identificar específicamente qué pregunta sobre el pasado sientes que sigue sin respuesta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para soltar el pasado”)",
    otrasCausas: [
      "Una situación pasada que no cerró con las respuestas que necesitabas",
      "Comparación constante entre el presente y una etapa idealizada",
      "Duelo no resuelto por una etapa o relación ya terminada",
    ],
  },
  {
    id: "sentirse-atrapada",
    keywords: ["me siento atrapada", "me siento atrapado", "siento que no tengo salida", "me siento sin salida"],
    termino: "Sentirse atrapada",
    capa: "Emoción",
    sentido:
      "Sentir que no hay salida suele ser una percepción más estrecha de lo que la realidad permite; casi siempre existen opciones, aunque ninguna sea perfecta o fácil. El primer paso suele ser solo identificar una, aunque sea pequeña.",
    enfoque:
      "Escribir tres opciones posibles frente a tu situación, aunque ninguna te convenza del todo por ahora.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse atrapada”)",
    otrasCausas: [
      "Una situación con opciones que parecen todas insatisfactorias",
      "Agotamiento que reduce la capacidad de ver alternativas",
      "Miedo a las consecuencias de cualquier cambio posible",
    ],
  },
  {
    id: "miedo-perder-identidad",
    keywords: ["miedo a perder mi identidad", "miedo a perderme en la relacion", "miedo a perderme en la relación", "no se quien soy fuera de mi pareja", "no sé quién soy fuera de mi pareja"],
    termino: "Miedo a perder la propia identidad",
    capa: "Emoción",
    sentido:
      "El miedo a perderte a ti misma dentro de una relación suele aparecer cuando el vínculo empieza a ocupar el espacio de intereses, amistades y actividades que antes eran solo tuyas.",
    enfoque:
      "Sostener, de forma consciente, al menos una actividad o vínculo que sea completamente tuyo, fuera de la relación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder la propia identidad”)",
    otrasCausas: [
      "Una relación que ha absorbido gradualmente tus espacios personales",
      "Dificultad histórica para sostener límites dentro de vínculos cercanos",
      "Una identidad que se construyó mucho en función de otra persona",
    ],
  },
  {
    id: "necesidad-ser-necesitada",
    keywords: ["necesidad de ser necesitada", "necesito que me necesiten", "me siento valiosa cuando me necesitan"],
    termino: "Necesidad de ser necesitada",
    capa: "Emoción",
    sentido:
      "Sentir que tu valor depende de cuánto te necesitan otros puede llevar a sostener relaciones o roles de forma poco saludable, incluso cuando ya no te hacen bien, solo por miedo a dejar de sentirte imprescindible.",
    enfoque:
      "Explorar qué otras fuentes de valor propio existen en tu vida, más allá de ser indispensable para alguien más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de ser necesitada”)",
    otrasCausas: [
      "Un rol de cuidadora que se volvió parte central de tu identidad",
      "Miedo a que tu valor dependa completamente de ser útil a otros",
      "Una infancia donde el reconocimiento llegaba solo al ayudar a otros",
    ],
  },
  {
    id: "miedo-exito",
    keywords: ["miedo al exito", "miedo al éxito", "me sabotage cuando las cosas van bien", "me autosaboteo cuando las cosas van bien"],
    termino: "Miedo al éxito",
    capa: "Emoción",
    sentido:
      "El miedo al éxito, menos hablado que el miedo al fracaso, suele relacionarse con temores más profundos: mayor visibilidad, mayor responsabilidad, o el temor a distanciarte de tu entorno actual si las cosas te empiezan a ir muy bien.",
    enfoque:
      "Identificar específicamente qué parte del éxito —la visibilidad, la responsabilidad, el cambio de entorno— te genera más temor.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al éxito”)",
    otrasCausas: [
      "Miedo a la mayor visibilidad o exposición que trae el éxito",
      "Temor a distanciarte de tu entorno actual al progresar",
      "Una creencia inconsciente de no merecer un resultado tan positivo",
    ],
  },
  {
    id: "sentimiento-desarraigo",
    keywords: ["sentimiento de desarraigo", "no tengo raices", "no tengo raíces", "no siento que pertenezco a ningun lugar", "no siento que pertenezco a ningún lugar"],
    termino: "Sentimiento de desarraigo",
    capa: "Emoción",
    sentido:
      "El desarraigo —no sentir un lugar propio al que pertenecer— es común tras mudanzas, migraciones o cambios grandes de vida. El sentido de pertenencia puede reconstruirse en las personas y rutinas, no solo en un lugar geográfico específico.",
    enfoque:
      "Identificar qué vínculos o rutinas actuales podrían convertirse en tu nuevo sentido de “hogar”, más allá del lugar físico.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de desarraigo”)",
    otrasCausas: [
      "Una migración o mudanza reciente lejos de tu lugar de origen",
      "Múltiples cambios de residencia a lo largo de la vida",
      "Dificultad para construir un sentido de pertenencia en el lugar actual",
    ],
  },
  {
    id: "dificultad-expresar-amor",
    keywords: ["dificultad para expresar amor", "no se decir te amo", "no sé decir te amo", "me cuesta ser cariñosa", "me cuesta ser cariñoso"],
    termino: "Dificultad para expresar amor",
    capa: "Emoción",
    sentido:
      "Sentir amor profundamente pero tener dificultad para expresarlo en palabras o gestos suele venir de un entorno de origen donde el afecto se mostraba de otras formas —el cuidado práctico, por ejemplo— en vez de la palabra directa.",
    enfoque:
      "Practicar una forma pequeña y concreta de expresar afecto esta semana, aunque se sienta incómoda al principio.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para expresar amor”)",
    otrasCausas: [
      "Un entorno de origen donde el afecto se mostraba de forma práctica, no verbal",
      "Incomodidad aprendida con la vulnerabilidad que implica expresar amor",
      "Poca práctica histórica verbalizando emociones positivas",
    ],
  },
  {
    id: "melancolia-lugar-origen",
    keywords: ["nostalgia por mi pais", "nostalgia por mi país", "extraño mi tierra", "morriña", "extraño mi ciudad natal"],
    termino: "Nostalgia por el lugar de origen",
    capa: "Emoción",
    sentido:
      "Extrañar profundamente el lugar de donde vienes —a veces llamado “morriña”— es una forma legítima de duelo por lo dejado atrás: personas, paisajes, costumbres, un idioma en el que te sentías completamente en casa.",
    enfoque:
      "Buscar pequeñas formas de mantener viva la conexión con tu origen, sin que eso te impida construir raíces también donde estás ahora.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Nostalgia por el lugar de origen”)",
    otrasCausas: [
      "Una migración reciente lejos de tu lugar de origen",
      "Dificultad para adaptarte del todo a un nuevo entorno",
      "Vínculos cercanos que quedaron atrás geográficamente",
    ],
  },
  {
    id: "miedo-ser-reemplazada",
    keywords: ["miedo a ser reemplazada", "miedo a ser reemplazado", "miedo a que me sustituyan", "miedo a volverme prescindible"],
    termino: "Miedo a ser reemplazada",
    capa: "Emoción",
    sentido:
      "El miedo a ser reemplazada —en el trabajo, en una amistad, en una relación— suele reflejar una inseguridad de fondo sobre tu valor único, como si cualquier otra persona pudiera ocupar exactamente tu mismo lugar.",
    enfoque:
      "Identificar qué es específicamente lo que solo tú aportas, de una forma que nadie más podría replicar igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser reemplazada”)",
    otrasCausas: [
      "Una experiencia pasada real de haber sido reemplazada en algún ámbito",
      "Inseguridad de fondo sobre tu valor único y diferenciado",
      "Un entorno laboral o social altamente competitivo",
    ],
  },
  {
    id: "sarpullido",
    keywords: ["sarpullido", "salpullido", "erupcion en la piel", "erupción en la piel"],
    termino: "Sarpullido",
    capa: "Ectodermo",
    sentido:
      "Un sarpullido repentino suele coincidir con una irritación aguda hacia una situación o persona reciente —algo que “irritó la piel” de forma súbita, sin previo aviso, como una reacción de alarma inmediata.",
    enfoque:
      "Recordar qué situación de las últimas horas o días te generó una irritación repentina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sarpullido”)",
    otrasCausas: [
      "Una irritación repentina hacia una situación reciente",
      "Contacto con algo que generó una reacción física real, por revisar con un especialista",
      "Estrés agudo que se somatiza en la piel",
    ],
  },
  {
    id: "nudo-estomago",
    keywords: ["nudo en el estomago", "nudo en el estómago", "se me hace nudo el estomago", "se me hace nudo el estómago"],
    termino: "Nudo en el estómago",
    capa: "Endodermo",
    sentido:
      "La sensación de nudo en el estómago suele ser la forma más literal en que el cuerpo expresa la anticipación de algo incómodo —una anticipación ansiosa, casi física, frente a una situación que todavía no ocurre.",
    enfoque:
      "Identificar qué situación próxima estás anticipando con esta ansiedad física.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Nudo en el estómago”)",
    otrasCausas: [
      "Anticipación ansiosa frente a una situación próxima",
      "Una conversación pendiente que genera incomodidad",
      "Miedo a una noticia o resultado inminente",
    ],
  },
  {
    id: "mal-sabor-boca",
    keywords: ["mal sabor de boca", "sabor amargo en la boca", "boca amarga"],
    termino: "Mal sabor de boca",
    capa: "Endodermo",
    sentido:
      "El mal sabor de boca persistente, más allá de causas físicas, a veces coincide con una experiencia reciente que “dejó un mal sabor” en sentido figurado —una situación que no terminó como esperabas, o una decepción reciente.",
    enfoque:
      "Identificar qué situación reciente sientes que te dejó, literalmente, un mal sabor de boca.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Mal sabor de boca”)",
    otrasCausas: [
      "Una experiencia reciente que no terminó como esperabas",
      "Una decepción o desilusión sin del todo procesar",
      "Cambios digestivos que conviene revisar también médicamente",
    ],
  },
  {
    id: "comezon-generalizada",
    keywords: ["comezon generalizada", "comezón generalizada", "picazon en todo el cuerpo", "picazón en todo el cuerpo"],
    termino: "Comezón generalizada",
    capa: "Ectodermo",
    sentido:
      "La comezón sin una causa dermatológica clara a veces se relaciona con una impaciencia de fondo —algo que sientes que necesita moverse o resolverse ya, y que se manifiesta como una inquietud física en la piel.",
    enfoque:
      "Notar si hay una situación frente a la que sientes una impaciencia importante por que avance o se resuelva.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Comezón generalizada”)",
    otrasCausas: [
      "Impaciencia de fondo frente a una situación que tarda en resolverse",
      "Sensibilidad de la piel que siempre conviene revisar con un especialista",
      "Ansiedad general que se somatiza en la piel",
    ],
  },
  {
    id: "dolor-coxis",
    keywords: ["dolor de coxis", "dolor en el coxis", "coccigodinia"],
    termino: "Dolor de cóccix",
    capa: "Mesodermo",
    sentido:
      "El cóccix es la base de la columna, el punto más profundo de sostén; su dolor a veces coincide con una sensación de inseguridad sobre el propio soporte básico —económico, familiar o emocional— en la vida actual.",
    enfoque:
      "Identificar en qué área sientes que te falta una base de sostén más segura.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor de cóccix”)",
    otrasCausas: [
      "Inseguridad sobre el propio sostén económico o familiar",
      "Una caída o golpe físico real que conviene revisar con un especialista",
      "Sensación general de inestabilidad en la vida actual",
    ],
  },
  {
    id: "sequedad-ocular",
    keywords: ["sequedad ocular", "ojos secos", "ojo seco"],
    termino: "Sequedad ocular (ojos secos)",
    capa: "Ectodermo",
    sentido:
      "Los ojos secos, más allá de la causa física, a veces coincide con una dificultad para permitirte llorar o soltar una tristeza —como si los ojos se quedaran secos ante algo que, en el fondo, sí necesita ser llorado.",
    enfoque:
      "Notar si hay una tristeza que llevas tiempo sin permitirte expresar del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sequedad ocular”)",
    otrasCausas: [
      "Dificultad para permitirte llorar o expresar tristeza",
      "Exposición prolongada a pantallas sin pausas suficientes",
      "Factores ambientales que siempre conviene revisar también",
    ],
  },
  {
    id: "pies-hinchados",
    keywords: ["pies hinchados", "hinchazon en los pies", "hinchazón en los pies", "manos hinchadas"],
    termino: "Pies y manos hinchados",
    capa: "Mesodermo",
    sentido:
      "La retención de líquidos en pies y manos, fuera de causas físicas por revisar, a veces se relaciona con emociones “retenidas” que no han encontrado su salida —algo que se sostiene y no se suelta del todo.",
    enfoque:
      "Identificar qué emoción reciente sientes que has estado conteniendo en vez de soltar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pies y manos hinchados”)",
    otrasCausas: [
      "Emociones contenidas que buscan una vía de expresión",
      "Retención de líquidos que siempre conviene revisar con un especialista",
      "Largos periodos sin movimiento físico suficiente",
    ],
  },
  {
    id: "bostezos-excesivos",
    keywords: ["bostezos excesivos", "bostezo mucho", "no dejo de bostezar"],
    termino: "Bostezos excesivos",
    capa: "Ectodermo",
    sentido:
      "Bostezar en exceso, más allá del cansancio físico, a veces coincide con el aburrimiento o la desconexión frente a una situación —el cuerpo señalando que necesita más estímulo o interés del que la actividad actual le ofrece.",
    enfoque:
      "Notar si hay una actividad o situación reciente frente a la que sientes desconexión o poco interés genuino.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bostezos excesivos”)",
    otrasCausas: [
      "Aburrimiento o desconexión frente a una actividad actual",
      "Descanso insuficiente que siempre conviene atender",
      "Necesidad de más oxígeno por poca actividad física reciente",
    ],
  },
  {
    id: "miedo-no-encontrar-pareja",
    keywords: ["miedo a no encontrar pareja", "miedo a quedarme sola para siempre", "miedo a quedarme solo para siempre", "miedo a no encontrar el amor"],
    termino: "Miedo a no encontrar pareja",
    capa: "Emoción",
    sentido:
      "El miedo a no encontrar pareja suele intensificarse con la comparación social y con plazos que en realidad son arbitrarios. El momento en que llega un vínculo significativo no sigue un cronograma fijo ni universal.",
    enfoque:
      "Practicar construir una vida que te resulte plena por sí misma, con o sin pareja, como base antes que como consecuencia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a no encontrar pareja”)",
    otrasCausas: [
      "Comparación social con los tiempos de vida de otras personas",
      "Presión familiar o cultural sobre el momento “adecuado” para tener pareja",
      "Experiencias pasadas que generaron desconfianza en encontrar un vínculo sano",
    ],
  },
  {
    id: "miedo-repetir-patrones-familiares",
    keywords: ["miedo a repetir patrones familiares", "miedo a ser como mis padres", "no quiero repetir la historia de mi familia"],
    termino: "Miedo a repetir patrones familiares",
    capa: "Emoción",
    sentido:
      "El miedo a repetir los patrones de tu familia de origen es, paradójicamente, uno de los motores más fuertes para el cambio consciente. Ser consciente del patrón ya es, en sí mismo, el primer paso para no repetirlo de forma automática.",
    enfoque:
      "Identificar con precisión cuál es el patrón específico que más te preocupa repetir, para poder trabajarlo de forma concreta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a repetir patrones familiares”)",
    otrasCausas: [
      "Un patrón familiar identificado que causó dolor en generaciones pasadas",
      "Comportamientos propios recientes que se parecen a los de un padre o madre",
      "Miedo a transmitir el mismo patrón a la siguiente generación",
    ],
  },
  {
    id: "urgencia-constante",
    keywords: ["sensacion de urgencia constante", "sensación de urgencia constante", "todo me parece urgente", "vivo con prisa"],
    termino: "Sensación de urgencia constante",
    capa: "Emoción",
    sentido:
      "Vivir como si todo fuera urgente, incluso lo que en realidad puede esperar, mantiene al cuerpo en un estado de alerta sostenido que resulta agotador a largo plazo, sin distinguir entre lo verdaderamente importante y lo simplemente inmediato.",
    enfoque:
      "Practicar clasificar tus pendientes entre “urgente” e “importante”, y notar cuántos de ellos realmente son lo primero.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de urgencia constante”)",
    otrasCausas: [
      "Un hábito de vida sostenido en modo de alerta constante",
      "Ansiedad de fondo que se traduce en prisa generalizada",
      "Una infancia con inestabilidad donde la urgencia era una constante real",
    ],
  },
  {
    id: "sentimiento-fingir",
    keywords: ["siento que finjo todo el tiempo", "siento que actuo un papel", "siento que actúo un papel", "no muestro quien soy realmente"],
    termino: "Sentimiento de estar fingiendo",
    capa: "Emoción",
    sentido:
      "Sentir que actúas un papel en vez de mostrarte tal cual eres suele aparecer en entornos donde, en algún momento, tu forma auténtica no fue bien recibida, y aprendiste a ajustarte a lo que el entorno parecía esperar de ti.",
    enfoque:
      "Identificar un espacio pequeño y seguro donde puedas practicar mostrarte con más autenticidad, poco a poco.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de estar fingiendo”)",
    otrasCausas: [
      "Un entorno donde mostrarte auténtica no fue bien recibido en el pasado",
      "Un rol social muy definido que sientes que debes sostener",
      "Miedo a que tu verdadero yo no sea aceptado por otros",
    ],
  },
  {
    id: "miedo-no-ser-suficiente",
    keywords: ["miedo a no ser suficiente", "siento que nunca es suficiente", "no soy suficiente"],
    termino: "Miedo a no ser suficiente",
    capa: "Emoción",
    sentido:
      "El miedo a no ser suficiente es una de las heridas más comunes y más profundas que existen. Suele nacer en la infancia, y persiste en la edad adulta a través de un diálogo interno que rara vez se cuestiona con la misma exigencia con que se repite.",
    enfoque:
      "Practicar preguntarte: “suficiente, ¿según el criterio de quién?”, cada vez que este pensamiento aparezca.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a no ser suficiente”)",
    otrasCausas: [
      "Una infancia con estándares de aprobación muy altos",
      "Comparación constante con otras personas o con una versión idealizada de ti misma",
      "Un entorno actual que refuerza esta misma creencia antigua",
    ],
  },
  {
    id: "dificultad-estar-presente",
    keywords: ["dificultad para estar presente", "siempre estoy en otro lado mentalmente", "no logro estar en el momento presente"],
    termino: "Dificultad para estar presente",
    capa: "Emoción",
    sentido:
      "Vivir mentalmente en el pasado o el futuro, en vez de en el presente, suele ser una forma de evitar sentir plenamente lo que ocurre ahora —a veces porque el presente contiene algo incómodo que preferirías no enfrentar de lleno.",
    enfoque:
      "Practicar anclarte, varias veces al día, en algo muy concreto del presente: un sonido, una textura, una respiración.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para estar presente”)",
    otrasCausas: [
      "Algo incómodo en el presente que resulta más fácil evitar",
      "Un hábito mental sostenido de planear o repasar constantemente",
      "Ansiedad que dirige la atención hacia el futuro de forma automática",
    ],
  },
  {
    id: "miedo-silencio",
    keywords: ["miedo al silencio", "no soporto el silencio", "necesito ruido de fondo siempre"],
    termino: "Miedo al silencio",
    capa: "Emoción",
    sentido:
      "La incomodidad frente al silencio suele relacionarse con lo que el silencio permite escuchar: pensamientos o emociones que el ruido constante mantenía convenientemente tapados.",
    enfoque:
      "Practicar unos minutos de silencio deliberado, con curiosidad hacia lo que surge, en vez de llenarlo de inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al silencio”)",
    otrasCausas: [
      "Pensamientos o emociones incómodas que el ruido constante evita enfrentar",
      "Un hábito sostenido de mantener siempre algún estímulo externo activo",
      "Ansiedad que se intensifica en ausencia de distracciones",
    ],
  },
  {
    id: "reloj-biologico",
    keywords: ["reloj biologico", "reloj biológico", "presion por tener hijos", "presión por tener hijos", "se me va a pasar el tiempo para ser madre"],
    termino: "Ansiedad por el reloj biológico",
    capa: "Emoción",
    sentido:
      "La presión en torno al tiempo disponible para la maternidad combina un factor biológico real con una enorme carga social y familiar añadida. Vale la pena separar cuál es tu deseo genuino de cuál es la presión externa que sientes.",
    enfoque:
      "Explorar, sin presión de tiempo en esta reflexión, qué es lo que tú realmente deseas para tu propia vida en este tema.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ansiedad por el reloj biológico”)",
    otrasCausas: [
      "Presión social o familiar constante sobre la maternidad",
      "Comparación con los tiempos de vida de amigas o hermanas",
      "Un deseo genuino de ser madre combinado con incertidumbre sobre el momento",
    ],
  },
  {
    id: "rivalidad-hermanos-adulta",
    keywords: ["rivalidad con mis hermanos", "competencia con mi hermano", "competencia con mi hermana", "siempre me comparan con mi hermano", "siempre me comparan con mi hermana"],
    termino: "Rivalidad entre hermanos en la adultez",
    capa: "Emoción",
    sentido:
      "La rivalidad fraterna no siempre termina en la infancia; puede sostenerse en la vida adulta a través de comparaciones familiares que se repiten en reuniones y conversaciones, reactivando una competencia que ya no debería tener el mismo peso.",
    enfoque:
      "Practicar notar tus propios logros de forma independiente, sin la vara de comparación de tu hermano o hermana.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rivalidad entre hermanos en la adultez”)",
    otrasCausas: [
      "Comparaciones familiares sostenidas desde la infancia hasta ahora",
      "Un trato desigual percibido por parte de los padres",
      "Roles familiares muy marcados entre “el exitoso” y “el otro”",
    ],
  },
  {
    id: "miedo-ser-igual-padre",
    keywords: ["miedo a ser igual que mi padre", "miedo a ser igual que mi madre", "no quiero ser como mi papa", "no quiero ser como mi papá", "no quiero ser como mi mama", "no quiero ser como mi mamá"],
    termino: "Miedo a ser igual que un padre o madre",
    capa: "Emoción",
    sentido:
      "El miedo a convertirte en tu padre o tu madre, en los aspectos que más te costaron de ellos, suele ser una motivación poderosa para el cambio consciente —aunque también puede generar una vigilancia agotadora sobre ti misma.",
    enfoque:
      "Identificar con precisión qué comportamiento específico quieres hacer diferente, en vez de vivir con miedo generalizado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser igual que un padre o madre”)",
    otrasCausas: [
      "Comportamientos difíciles de una figura parental que marcaron tu infancia",
      "Reconocer en ti misma, recientemente, un rasgo similar al de esa figura",
      "Miedo a transmitir el mismo patrón a tus propios hijos",
    ],
  },
  {
    id: "necesidad-espacio-propio",
    keywords: ["necesidad de espacio propio", "necesito mi espacio", "necesito tiempo a solas"],
    termino: "Necesidad de espacio propio",
    capa: "Emoción",
    sentido:
      "Necesitar espacio propio dentro de una relación o una familia no significa falta de amor hacia los demás; es una necesidad legítima para sostener tu propia energía y no perderte en las necesidades de quienes te rodean.",
    enfoque:
      "Practicar comunicar esta necesidad con claridad y sin culpa, en vez de esperar a sentirte completamente agotada para pedirlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de espacio propio”)",
    otrasCausas: [
      "Sobrecarga de convivencia sin momentos de soledad reparadora",
      "Dificultad histórica para pedir espacio sin sentir culpa",
      "Una etapa de vida con muchas demandas simultáneas de otros",
    ],
  },
  {
    id: "miedo-vulnerabilidad-economica",
    keywords: ["miedo a la vulnerabilidad economica", "miedo a la vulnerabilidad económica", "miedo a quedarme sin dinero", "miedo a la pobreza"],
    termino: "Miedo a la vulnerabilidad económica",
    capa: "Emoción",
    sentido:
      "El miedo a la inestabilidad económica, más allá de la situación financiera real actual, suele tener raíces en experiencias de carencia pasadas —propias o heredadas de la familia— que dejaron una sensación de alerta permanente en torno al dinero.",
    enfoque:
      "Distinguir entre el riesgo económico real actual y el miedo heredado que podría estar amplificándolo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la vulnerabilidad económica”)",
    otrasCausas: [
      "Una infancia marcada por la carencia económica real",
      "Miedo heredado de generaciones anteriores en torno al dinero",
      "Una etapa actual de inestabilidad económica genuina",
    ],
  },
  {
    id: "miedo-perder-proposito",
    keywords: ["miedo a perder mi proposito", "miedo a perder mi propósito", "que sentido tiene todo esto", "para que hago todo esto"],
    termino: "Miedo a perder el propio propósito",
    capa: "Emoción",
    sentido:
      "El miedo a que la vida pierda sentido suele aparecer en transiciones grandes —el fin de un rol, una etapa, un proyecto central. El propósito no siempre es fijo; a veces se transforma en algo nuevo antes de volverse visible con claridad.",
    enfoque:
      "Permitirte no tener la respuesta ahora mismo; el propósito muchas veces se revela caminando, no pensando de antemano.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder el propio propósito”)",
    otrasCausas: [
      "El cierre de una etapa o rol que ocupaba un lugar central en tu vida",
      "Una meta alcanzada sin un siguiente paso claro todavía",
      "Una transición de vida grande en curso",
    ],
  },
  {
    id: "dificultad-soltar-relaciones",
    keywords: ["dificultad para soltar relaciones", "no puedo terminar esta relacion", "no puedo terminar esta relación", "se que debo dejar esta relacion", "sé que debo dejar esta relación"],
    termino: "Dificultad para soltar relaciones que ya no funcionan",
    capa: "Emoción",
    sentido:
      "Saber que una relación ya no te hace bien y aun así no poder soltarla suele hablar más del miedo a lo desconocido que aparece después, que del vínculo en sí mismo.",
    enfoque:
      "Preguntarte qué es exactamente lo que temes que pase si terminas esta relación, y evaluar qué tan realista es ese temor.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para soltar relaciones que ya no funcionan”)",
    otrasCausas: [
      "Miedo a la soledad o al vacío que dejaría terminar el vínculo",
      "Inversión emocional o de tiempo que se siente difícil de “perder”",
      "Esperanza de que la relación todavía pueda cambiar para bien",
    ],
  },
  {
    id: "ansiedad-decisiones",
    keywords: ["ansiedad al tomar decisiones", "me da ansiedad decidir", "cada decision me genera ansiedad", "cada decisión me genera ansiedad"],
    termino: "Ansiedad frente a las decisiones",
    capa: "Emoción",
    sentido:
      "A diferencia de la indecisión, aquí el problema no es solo elegir, sino la ansiedad física que acompaña al proceso mismo de decidir —como si cada elección tuviera un peso desproporcionado frente a sus consecuencias reales.",
    enfoque:
      "Practicar decisiones pequeñas de bajo riesgo para entrenar la tolerancia a decidir sin la certeza absoluta de estar en lo correcto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ansiedad frente a las decisiones”)",
    otrasCausas: [
      "Miedo a equivocarte y a las consecuencias percibidas de un error",
      "Una infancia donde las decisiones propias eran frecuentemente corregidas",
      "Perfeccionismo aplicado también al proceso de decidir",
    ],
  },
  {
    id: "miedo-defraudar-pareja",
    keywords: ["miedo a defraudar a mi pareja", "miedo a no ser suficiente para mi pareja", "miedo a decepcionar a mi pareja"],
    termino: "Miedo a defraudar a la pareja",
    capa: "Emoción",
    sentido:
      "El miedo a no ser suficiente para tu pareja suele generar un esfuerzo constante por complacer, que a la larga puede volverse agotador y, paradójicamente, alejarte de mostrarte tal cual eres dentro de la relación.",
    enfoque:
      "Practicar preguntarle directamente a tu pareja qué espera de ti, en vez de asumirlo o imaginarlo por tu cuenta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a defraudar a la pareja”)",
    otrasCausas: [
      "Inseguridad general sobre tu propio valor dentro de la relación",
      "Una relación pasada donde sí decepcionaste o fuiste decepcionada profundamente",
      "Comparación con relaciones anteriores de tu pareja",
    ],
  },
  {
    id: "necesidad-plan-b",
    keywords: ["necesito siempre tener un plan b", "no puedo avanzar sin un plan alternativo", "siempre pienso en el peor escenario para prepararme"],
    termino: "Necesidad de tener siempre un plan B",
    capa: "Emoción",
    sentido:
      "Preparar alternativas puede ser sano, pero cuando se vuelve una necesidad constante, suele reflejar una desconfianza profunda en que las cosas puedan salir bien sin un control exhaustivo previo.",
    enfoque:
      "Practicar avanzar en algo pequeño sin un plan B preparado, y observar que puedes improvisar una solución si de verdad hace falta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de tener siempre un plan B”)",
    otrasCausas: [
      "Experiencias pasadas donde no tener un plan alternativo salió mal",
      "Desconfianza profunda en la propia capacidad de improvisar",
      "Ansiedad de fondo frente a lo impredecible",
    ],
  },
  {
    id: "dificultad-decir-adios",
    keywords: ["dificultad para decir adios", "dificultad para decir adiós", "me cuesta despedirme", "odio las despedidas"],
    termino: "Dificultad para decir adiós",
    capa: "Emoción",
    sentido:
      "Las despedidas —de personas, etapas o lugares— confrontan directamente con el cambio y la finitud. Cuesta más despedirse cuando el cierre se vive como una pérdida total, en vez de como el cierre natural de un capítulo que sí tuvo su valor.",
    enfoque:
      "Practicar nombrar en voz alta qué te llevas de esa etapa o vínculo, en vez de solo enfocarte en lo que termina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para decir adiós”)",
    otrasCausas: [
      "Despedidas pasadas que se vivieron de forma abrupta o dolorosa",
      "Dificultad general para aceptar los cierres de ciclo",
      "Apego profundo hacia la persona, etapa o lugar en cuestión",
    ],
  },
  {
    id: "colicos",
    keywords: ["colicos", "cólicos", "colicos abdominales", "cólicos abdominales"],
    termino: "Cólicos (generales)",
    capa: "Endodermo",
    sentido:
      "Los cólicos suelen relacionarse con una tensión que se contrae y se suelta de forma intermitente —similar a una emoción que aparece en oleadas, en vez de sostenerse de forma constante, y que el cuerpo procesa por rachas.",
    enfoque:
      "Notar si hay una emoción reciente que sientes en oleadas, en vez de una sola vez de forma constante.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cólicos”)",
    otrasCausas: [
      "Tensión emocional que se manifiesta en oleadas intermitentes",
      "Cambios digestivos recientes junto con estrés",
      "Ansiedad que se somatiza en el sistema digestivo",
    ],
  },
  {
    id: "contracturas",
    keywords: ["contracturas", "contractura muscular", "musculo contracturado", "músculo contracturado"],
    termino: "Contracturas musculares",
    capa: "Mesodermo",
    sentido:
      "A diferencia del espasmo, súbito y breve, la contractura es una tensión sostenida en el tiempo —un músculo que se queda “listo para actuar” durante días o semanas, como reflejo de una alerta que nunca termina de bajar.",
    enfoque:
      "Identificar qué situación sostenida te mantiene en un estado de alerta constante, sin momentos reales de relajación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Contracturas musculares”)",
    otrasCausas: [
      "Una alerta sostenida frente a una situación que no termina de resolverse",
      "Postura física inadecuada mantenida por mucho tiempo",
      "Estrés crónico sin espacios de relajación real",
    ],
  },
  {
    id: "culebrilla",
    keywords: ["culebrilla", "herpes zoster", "herpes zóster"],
    termino: "Culebrilla (herpes zóster)",
    capa: "Ectodermo",
    sentido:
      "La culebrilla suele reactivarse en etapas de estrés intenso o miedo sostenido, casi siempre después de haber “aguantado” una presión importante durante mucho tiempo sin una pausa real de descanso.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, revisar qué tan sostenida ha sido tu carga de estrés en los últimos meses.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culebrilla”)",
    otrasCausas: [
      "Estrés intenso y sostenido durante un periodo largo",
      "Un sistema inmune debilitado tras una etapa de mucha exigencia",
      "Miedo profundo sostenido sin una salida clara",
    ],
  },
  {
    id: "opresion-garganta",
    keywords: ["opresion en la garganta", "opresión en la garganta", "siento que me ahogo al hablar", "se me cierra la garganta"],
    termino: "Opresión en la garganta",
    capa: "Ectodermo",
    sentido:
      "La sensación de opresión en la garganta, distinta del nudo pasajero, suele relacionarse con un sentimiento sostenido de no poder expresarte con libertad en un área importante de tu vida —como si algo bloqueara la salida de las palabras de forma constante.",
    enfoque:
      "Identificar en qué espacio de tu vida sientes que no puedes hablar con la libertad que necesitarías.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Opresión en la garganta”)",
    otrasCausas: [
      "Un entorno donde expresarte libremente no se siente seguro",
      "Palabras importantes contenidas durante un periodo largo",
      "Ansiedad que se somatiza específicamente en la zona de la garganta",
    ],
  },
  {
    id: "resequedad-labios",
    keywords: ["labios resecos", "labios partidos", "resequedad en los labios"],
    termino: "Resequedad en los labios",
    capa: "Ectodermo",
    sentido:
      "Los labios resecos, más allá del clima, a veces se relacionan con una sensación de falta de cariño expresado a través del contacto físico —besos, cercanía— que se extraña sin siempre nombrarlo abiertamente.",
    enfoque:
      "Revisar si sientes que te falta contacto afectivo físico en tu vida actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Resequedad en los labios”)",
    otrasCausas: [
      "Falta de contacto afectivo físico en la etapa actual",
      "Factores ambientales como clima frío o seco",
      "Deshidratación general que conviene atender también",
    ],
  },
  {
    id: "sabor-metalico",
    keywords: ["sabor metalico", "sabor metálico", "sabor a metal en la boca"],
    termino: "Sabor metálico en la boca",
    capa: "Endodermo",
    sentido:
      "El sabor metálico persistente, más allá de causas físicas o medicamentosas por revisar, a veces coincide con una sensación de alarma o susto reciente —el cuerpo en un estado de alerta que altera hasta la percepción del gusto.",
    enfoque:
      "Notar si hubo un susto o una alarma reciente que tu cuerpo todavía está procesando.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sabor metálico”)",
    otrasCausas: [
      "Un susto o alarma reciente que el cuerpo sigue procesando",
      "Efectos de medicamentos que conviene revisar con un profesional",
      "Ansiedad aguda frente a una situación puntual",
    ],
  },
  {
    id: "perdida-equilibrio",
    keywords: ["perdida del equilibrio", "pérdida del equilibrio", "me cuesta mantener el equilibrio", "falta de equilibrio fisico", "falta de equilibrio físico"],
    termino: "Pérdida del equilibrio físico",
    capa: "Ectodermo",
    sentido:
      "Sentir que pierdes el equilibrio físico, distinto del vértigo giratorio, a veces coincide con una etapa donde también sientes que perdiste el equilibrio simbólico en tu vida —entre el trabajo y el descanso, entre dar y recibir.",
    enfoque:
      "Identificar en qué área de tu vida sientes que el equilibrio se ha perdido últimamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pérdida del equilibrio físico”)",
    otrasCausas: [
      "Un desequilibrio simbólico entre distintas áreas de tu vida",
      "Causas físicas del oído interno que siempre conviene revisar con un especialista",
      "Fatiga general que afecta la coordinación",
    ],
  },
  {
    id: "orfandad-emocional",
    keywords: ["orfandad emocional", "me siento huerfana emocionalmente", "me siento huérfana emocionalmente", "crecí sin apoyo emocional"],
    termino: "Orfandad emocional",
    capa: "Emoción",
    sentido:
      "Es posible sentirte huérfana emocionalmente incluso con padres presentes físicamente, cuando el acompañamiento afectivo genuino no estuvo disponible de la forma que necesitabas de niña. Es una pérdida real, aunque distinta a la pérdida física.",
    enfoque:
      "Buscar, en la adultez, las figuras y espacios que sí puedan ofrecerte el acompañamiento emocional que faltó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Orfandad emocional”)",
    otrasCausas: [
      "Padres presentes físicamente pero ausentes emocionalmente",
      "Una infancia donde tus emociones no encontraron acompañamiento genuino",
      "Figuras de cuidado enfocadas en lo material más que en lo afectivo",
    ],
  },
  {
    id: "miedo-no-dejar-huella",
    keywords: ["miedo a no dejar huella", "miedo a que mi vida no importe", "miedo a ser olvidada", "miedo a ser olvidado"],
    termino: "Miedo a no dejar huella",
    capa: "Emoción",
    sentido:
      "El miedo a que tu vida no deje una marca significativa suele intensificarse en etapas de reflexión sobre el propio propósito. Vale la pena recordar que el impacto más profundo casi nunca se mide en logros públicos, sino en los vínculos cotidianos que sí tocaste.",
    enfoque:
      "Identificar a alguien concreto cuya vida ya tocaste de forma positiva, por pequeño que parezca el gesto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a no dejar huella”)",
    otrasCausas: [
      "Una etapa de reflexión existencial sobre el propósito de vida",
      "Comparación con los logros públicos de otras personas",
      "Una pérdida reciente que activó preguntas sobre la propia mortalidad",
    ],
  },
  {
    id: "dificultad-nombrar-emociones",
    keywords: ["no se que siento", "no sé qué siento", "no logro nombrar lo que siento", "me cuesta identificar mis emociones"],
    termino: "Dificultad para nombrar las propias emociones",
    capa: "Emoción",
    sentido:
      "No lograr identificar con claridad qué sientes no es falta de sensibilidad; muchas veces es falta de práctica, especialmente en entornos donde las emociones no se nombraban abiertamente durante la infancia.",
    enfoque:
      "Practicar usar una lista de palabras emocionales como referencia, hasta que nombrar lo que sientes se vuelva más natural.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para nombrar las propias emociones”)",
    otrasCausas: [
      "Un entorno de origen donde las emociones no se nombraban abiertamente",
      "Poca práctica histórica identificando estados internos con precisión",
      "Desconexión general del propio mundo emocional",
    ],
  },
  {
    id: "miedo-intensidad-emociones",
    keywords: ["miedo a mis propias emociones", "miedo a sentir demasiado", "me asusta la intensidad de lo que siento"],
    termino: "Miedo a la intensidad de las propias emociones",
    capa: "Emoción",
    sentido:
      "Temer tus propias emociones intensas —como si pudieran “desbordarte” por completo— suele generar un esfuerzo constante por contenerlas, que a la larga resulta más agotador que sentirlas y dejarlas pasar.",
    enfoque:
      "Recordar que ninguna emoción, por intensa que sea, dura para siempre si le permites completar su curso natural.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la intensidad de las propias emociones”)",
    otrasCausas: [
      "Una experiencia pasada donde una emoción intensa se sintió fuera de control",
      "Un entorno de origen donde la intensidad emocional no era bien recibida",
      "Miedo a lo que otros pensarían al verte sentir con tanta intensidad",
    ],
  },
  {
    id: "miedo-decir-lo-que-pienso",
    keywords: ["miedo a decir lo que pienso", "no digo lo que realmente pienso", "me guardo mi opinion", "me guardo mi opinión"],
    termino: "Miedo a decir lo que realmente piensas",
    capa: "Emoción",
    sentido:
      "Guardarte tu opinión real por miedo al conflicto o al rechazo tiene un costo silencioso: con el tiempo, puede generar una sensación de invisibilidad, incluso cuando estás rodeada de gente todo el tiempo.",
    enfoque:
      "Practicar compartir tu opinión real en una situación de bajo riesgo esta semana, y observar cómo se siente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a decir lo que realmente piensas”)",
    otrasCausas: [
      "Miedo al conflicto o al rechazo al expresar una opinión distinta",
      "Una infancia donde opinar diferente generaba consecuencias negativas",
      "Un entorno actual donde disentir no se siente seguro",
    ],
  },
  {
    id: "necesidad-justificarse",
    keywords: ["necesidad de justificarme", "siempre tengo que explicar mis decisiones", "siento que debo justificar todo lo que hago"],
    termino: "Necesidad de justificarse constantemente",
    capa: "Emoción",
    sentido:
      "Sentir que debes explicar y justificar cada decisión que tomas suele venir de un entorno donde tus elecciones eran frecuentemente cuestionadas, generando la creencia de que necesitas “defender” cada paso que das.",
    enfoque:
      "Practicar tomar y compartir una decisión sin dar explicaciones adicionales, salvo que alguien las pida directamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de justificarse constantemente”)",
    otrasCausas: [
      "Un entorno donde tus decisiones eran frecuentemente cuestionadas",
      "Miedo al juicio ajeno sobre tus elecciones de vida",
      "Baja confianza en tu propio criterio de decisión",
    ],
  },
  {
    id: "deuda-emocional",
    keywords: ["deuda emocional", "siento que le debo algo a alguien", "me siento en deuda con mis padres"],
    termino: "Sentimiento de deuda emocional",
    capa: "Emoción",
    sentido:
      "Sentir que “le debes” algo a alguien —tiempo, sacrificio, felicidad— suele convertir los vínculos en una especie de contabilidad emocional constante, en vez de un intercambio libre basado en el deseo genuino de estar presente.",
    enfoque:
      "Distinguir entre el cariño genuino que sí quieres dar, y la obligación que sientes que “debes” por una deuda percibida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de deuda emocional”)",
    otrasCausas: [
      "Un sacrificio importante hecho por alguien cercano en el pasado",
      "Mensajes familiares que enmarcaron el cuidado como una deuda a pagar",
      "Dificultad para distinguir el amor genuino de la obligación",
    ],
  },
  {
    id: "culpa-limites-familia",
    keywords: ["culpa por poner limites a mi familia", "culpa por poner límites a mi familia", "me siento mal por decirle que no a mis padres"],
    termino: "Culpa por poner límites con la familia",
    capa: "Emoción",
    sentido:
      "Poner límites con la propia familia suele generar una culpa distinta y más profunda que con otros vínculos, porque toca lealtades muy antiguas. Aun así, un límite sano con la familia no es una falta de amor; es parte de una relación adulta y equilibrada.",
    enfoque:
      "Recordar que amar a tu familia y tener límites claros con ella pueden coexistir perfectamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por poner límites con la familia”)",
    otrasCausas: [
      "Una familia donde los límites personales no eran bien recibidos",
      "Lealtades familiares muy arraigadas desde la infancia",
      "Miedo al distanciamiento familiar al poner un límite",
    ],
  },
  {
    id: "miedo-abandono-vejez",
    keywords: ["miedo a quedarme sola en la vejez", "miedo a quedarme solo en la vejez", "miedo a envejecer sin compañia", "miedo a envejecer sin compañía"],
    termino: "Miedo al abandono en la vejez",
    capa: "Emoción",
    sentido:
      "El miedo a envejecer sin compañía combina el miedo a la soledad con el miedo al paso del tiempo, y suele intensificarse al ver a otros mayores en esa situación, o al no tener aún una red de apoyo consolidada.",
    enfoque:
      "Invertir hoy, de forma consciente, en los vínculos y comunidades que quisieras tener contigo en el futuro.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al abandono en la vejez”)",
    otrasCausas: [
      "Haber presenciado a alguien mayor envejecer en soledad",
      "Poca red de apoyo consolidada en la etapa actual",
      "Miedo general a la soledad proyectado hacia el futuro",
    ],
  },
  {
    id: "dificultad-sentir-gratitud",
    keywords: ["dificultad para sentir gratitud", "no logro sentirme agradecida", "no logro sentirme agradecido", "me cuesta apreciar lo que tengo"],
    termino: "Dificultad para sentir gratitud",
    capa: "Emoción",
    sentido:
      "Cuando cuesta sentir gratitud incluso por cosas buenas, suele ser señal de que la mente está capturada por una preocupación o un vacío de fondo que opaca la capacidad de apreciar el presente, más que un defecto de carácter.",
    enfoque:
      "Empezar con algo muy pequeño y concreto del día de hoy, sin la presión de sentir gratitud por todo a la vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para sentir gratitud”)",
    otrasCausas: [
      "Una preocupación de fondo que opaca la capacidad de apreciar el presente",
      "Agotamiento emocional sostenido por mucho tiempo",
      "Comparación constante que minimiza lo que sí tienes",
    ],
  },
  {
    id: "sentirse-oveja-negra",
    keywords: ["me siento la oveja negra", "soy la oveja negra de la familia", "no encajo con mi familia", "soy diferente a mi familia"],
    termino: "Sentirse la oveja negra de la familia",
    capa: "Emoción",
    sentido:
      "Sentir que eres la persona diferente dentro de tu familia —en valores, intereses o forma de vida— puede doler, pero también puede ser señal de que estás siendo fiel a quien realmente eres, en vez de encajar a la fuerza en un molde que no te corresponde.",
    enfoque:
      "Buscar comunidades fuera de la familia donde tu forma particular de ser sí encuentre eco y pertenencia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse la oveja negra de la familia”)",
    otrasCausas: [
      "Valores o decisiones de vida genuinamente distintos a los familiares",
      "Comparación constante con otros miembros de la familia",
      "Una familia con normas rígidas y poco espacio para la diferencia",
    ],
  },
  {
    id: "miedo-confrontacion",
    keywords: ["miedo a la confrontacion", "miedo a la confrontación", "evito los conflictos siempre", "no soporto discutir"],
    termino: "Miedo a la confrontación",
    capa: "Emoción",
    sentido:
      "Evitar cualquier forma de confrontación, incluso cuando algo realmente lo amerita, suele tener un costo alto: los desacuerdos no resueltos no desaparecen, solo se acumulan en silencio hasta que se vuelven más difíciles de abordar.",
    enfoque:
      "Practicar plantear un desacuerdo pequeño con calma, para comprobar que un conflicto manejado bien no destruye el vínculo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la confrontación”)",
    otrasCausas: [
      "Una infancia con conflictos intensos o mal manejados",
      "Miedo a que la confrontación termine el vínculo por completo",
      "Poca práctica histórica resolviendo desacuerdos de forma sana",
    ],
  },
  {
    id: "dificultad-pedir-disculpas",
    keywords: ["dificultad para pedir disculpas", "no se pedir perdon", "no sé pedir perdón", "me cuesta admitir que me equivoque", "me cuesta admitir que me equivoqué"],
    termino: "Dificultad para pedir disculpas",
    capa: "Emoción",
    sentido:
      "Costarte pedir disculpas suele relacionarse con vivir el error como una amenaza a tu propio valor, en vez de como una parte normal de cualquier relación humana. Disculparte no te hace menos válida; casi siempre fortalece el vínculo.",
    enfoque:
      "Practicar una disculpa breve y directa, sin sobreexplicar ni justificar excesivamente el error.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para pedir disculpas”)",
    otrasCausas: [
      "Una infancia donde equivocarte generaba castigo severo",
      "Asociar el error con una amenaza directa a tu propio valor",
      "Un entorno actual muy competitivo donde admitir fallas se siente riesgoso",
    ],
  },
  {
    id: "rescatador-familiar",
    keywords: ["soy el rescatador de mi familia", "soy la que arregla todo en mi familia", "siempre resuelvo los problemas de mi familia"],
    termino: "Rol de rescatador dentro de la familia",
    capa: "Emoción",
    sentido:
      "Ser quien siempre resuelve los problemas familiares puede darte un sentido de valor importante, pero también puede impedir que otros miembros de la familia desarrollen su propia capacidad de resolver las cosas por sí mismos.",
    enfoque:
      "Practicar dejar que otro miembro de tu familia resuelva algo por su cuenta, sin intervenir de inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rol de rescatador dentro de la familia”)",
    otrasCausas: [
      "Un rol asumido desde temprana edad como “la responsable” de la familia",
      "Dificultad para tolerar el sufrimiento o el error de otros miembros",
      "Sentido de valor propio muy ligado a ser indispensable en tu familia",
    ],
  },
  {
    id: "perdida-inocencia",
    keywords: ["perdida de la inocencia", "pérdida de la inocencia", "senti que crecí de golpe", "sentí que crecí de golpe", "tuve que madurar antes de tiempo"],
    termino: "Sentimiento de haber perdido la inocencia",
    capa: "Emoción",
    sentido:
      "Sentir que tuviste que madurar antes de tiempo, casi siempre por una circunstancia difícil vivida en la infancia o adolescencia, deja una sensación de haber perdido algo que no se puede recuperar exactamente igual, aunque sí se puede honrar y sanar.",
    enfoque:
      "Permitirte, en la adultez, pequeños espacios de ligereza y juego que quizás no tuviste oportunidad de vivir entonces.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pérdida de la inocencia”)",
    otrasCausas: [
      "Una circunstancia difícil vivida a edad temprana que exigió madurar rápido",
      "Responsabilidades asumidas antes de la edad esperada",
      "Un entorno familiar que requirió cuidar de otros desde niña",
    ],
  },
  {
    id: "miedo-no-proteger-seres-queridos",
    keywords: ["miedo a no poder proteger a los que amo", "miedo a no poder cuidar a mi familia", "miedo a fallarle a quienes amo"],
    termino: "Miedo a no poder proteger a los seres queridos",
    capa: "Emoción",
    sentido:
      "El miedo a no ser capaz de proteger a quienes amas suele intensificarse al convertirte en madre, padre o cuidadora principal, y refleja el peso real —y a veces desproporcionado— que se siente al querer garantizar la seguridad de otra persona.",
    enfoque:
      "Recordar que amar profundamente a alguien no significa poder controlar cada riesgo que pueda enfrentar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a no poder proteger a los seres queridos”)",
    otrasCausas: [
      "Convertirte recientemente en responsable principal de alguien más",
      "Una experiencia pasada donde no pudiste evitar que algo malo ocurriera",
      "Ansiedad general que se enfoca en la seguridad de tus seres queridos",
    ],
  },
  {
    id: "dificultad-confiar-nuevas-relaciones",
    keywords: ["dificultad para confiar en relaciones nuevas", "me cuesta confiar en alguien nuevo", "no logro abrirme en nuevas relaciones"],
    termino: "Dificultad para confiar en relaciones nuevas",
    capa: "Emoción",
    sentido:
      "Después de haber sido lastimada en un vínculo importante, es natural que abrirte a una relación nueva active alarmas de protección, aunque la persona frente a ti no tenga relación alguna con quien te dañó antes.",
    enfoque:
      "Practicar dar pequeños pasos de apertura, evaluando a la persona nueva por sus propias acciones, no por las de alguien más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para confiar en relaciones nuevas”)",
    otrasCausas: [
      "Una herida de confianza significativa en una relación pasada",
      "Miedo a repetir el mismo dolor con una persona nueva",
      "Poco tiempo transcurrido desde la herida original",
    ],
  },
  {
    id: "sensacion-falta-tiempo",
    keywords: ["siento que no me alcanza el tiempo", "nunca tengo tiempo para nada", "el tiempo no me alcanza"],
    termino: "Sensación de que el tiempo nunca alcanza",
    capa: "Emoción",
    sentido:
      "La sensación crónica de que el tiempo no alcanza suele hablar más de cuántas cosas intentas sostener a la vez, que de la cantidad real de horas disponibles. Rara vez se resuelve añadiendo más tiempo; se resuelve soltando algunas cosas.",
    enfoque:
      "Hacer una lista de todo lo que ocupa tu tiempo, y marcar con honestidad qué de eso podrías soltar o delegar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de que el tiempo nunca alcanza”)",
    otrasCausas: [
      "Demasiados compromisos simultáneos asumidos a la vez",
      "Dificultad para decir que no a nuevas responsabilidades",
      "Una identidad muy ligada a estar siempre ocupada y productiva",
    ],
  },
  {
    id: "necesidad-aprobacion-padres",
    keywords: ["necesito la aprobacion de mis padres", "necesito la aprobación de mis padres", "busco que mi papa este orgulloso", "busco que mi papá esté orgulloso", "busco que mi mama este orgullosa", "busco que mi mamá esté orgullosa"],
    termino: "Necesidad de aprobación de los padres",
    capa: "Emoción",
    sentido:
      "Buscar la aprobación de tus padres, incluso en la adultez, es profundamente humano. El reto aparece cuando esa búsqueda determina decisiones de vida que, en el fondo, no reflejan lo que tú realmente deseas para ti misma.",
    enfoque:
      "Identificar qué decisiones tomas realmente por ti, y cuáles tomas principalmente buscando esa aprobación específica.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de aprobación de los padres”)",
    otrasCausas: [
      "Una relación donde el reconocimiento parental se sintió escaso o condicionado",
      "Decisiones de vida tomadas principalmente para complacer a los padres",
      "Un vínculo actual donde la aprobación sigue sintiéndose distante",
    ],
  },
  {
    id: "sentirse-incomprendida",
    keywords: ["me siento incomprendida", "me siento incomprendido", "nadie me entiende de verdad", "siento que no me entienden"],
    termino: "Sentirse incomprendida",
    capa: "Emoción",
    sentido:
      "Sentir que no te entienden, incluso cuando sí te escuchan, es distinto de sentirte invisible: aquí la voz llega, pero el significado detrás de tus palabras parece perderse. Suele doler especialmente en los vínculos que más te importan.",
    enfoque:
      "Practicar explicar no solo lo que sientes, sino también el porqué, para reducir el espacio de malentendido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse incomprendida”)",
    otrasCausas: [
      "Diferencias genuinas de perspectiva con las personas cercanas",
      "Dificultad para expresar con claridad el trasfondo de lo que sientes",
      "Un vínculo donde el interés por entenderte realmente ha disminuido",
    ],
  },
  {
    id: "dedos-rigidos",
    keywords: ["dedos rigidos", "dedos rígidos", "se me entumen los dedos", "rigidez en los dedos"],
    termino: "Rigidez en los dedos",
    capa: "Mesodermo",
    sentido:
      "Los dedos permiten la precisión y el detalle en la acción; su rigidez a veces coincide con una resistencia a hacer algo con la delicadeza o el cuidado que la situación pide, optando en cambio por resolver todo con más fuerza de la necesaria.",
    enfoque:
      "Notar si hay una situación que estás abordando con más rigidez de la que realmente requiere.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Rigidez en los dedos”)",
    otrasCausas: [
      "Tensión acumulada en tareas que exigen precisión y control",
      "Frío o factores físicos que siempre conviene revisar también",
      "Resistencia a abordar algo con más delicadeza",
    ],
  },
  {
    id: "hiperventilacion",
    keywords: ["hiperventilacion", "hiperventilación", "respiracion superficial", "respiración superficial", "no puedo respirar profundo"],
    termino: "Hiperventilación (respiración superficial)",
    capa: "Ectodermo",
    sentido:
      "Respirar de forma superficial y acelerada suele acompañar a un estado de alerta intensa —el cuerpo preparándose para “huir” de algo, aunque la amenaza real sea, muchas veces, un pensamiento más que un peligro inmediato.",
    enfoque:
      "Practicar alargar conscientemente la exhalación, que es la parte de la respiración que más calma el sistema nervioso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hiperventilación”)",
    otrasCausas: [
      "Un estado de alerta o pánico agudo frente a una situación puntual",
      "Ansiedad generalizada que se somatiza en la respiración",
      "Un pensamiento catastrófico que el cuerpo interpreta como amenaza real",
    ],
  },
  {
    id: "dolor-costillas",
    keywords: ["dolor en las costillas", "dolor costal", "me duelen las costillas"],
    termino: "Dolor en las costillas",
    capa: "Mesodermo",
    sentido:
      "Las costillas protegen los órganos vitales del pecho; su dolor a veces coincide con una sensación de necesitar protegerte de algo que sientes cerca de tu corazón —una amenaza emocional, más que física.",
    enfoque:
      "Identificar de qué sientes que necesitas protegerte emocionalmente en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dolor en las costillas”)",
    otrasCausas: [
      "Una sensación de vulnerabilidad emocional reciente",
      "Tensión muscular por postura o respiración alterada",
      "Una situación que sientes como una amenaza cercana a tu bienestar",
    ],
  },
  {
    id: "exceso-saliva",
    keywords: ["exceso de saliva", "salivo mucho", "produzco mucha saliva"],
    termino: "Exceso de salivación",
    capa: "Endodermo",
    sentido:
      "El exceso de saliva, más allá de causas físicas, a veces coincide con una anticipación intensa hacia algo que está por “masticarse” o resolverse —el cuerpo preparándose de más para digerir una situación que se aproxima.",
    enfoque:
      "Notar si hay una situación próxima que estás anticipando con especial intensidad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Exceso de salivación”)",
    otrasCausas: [
      "Anticipación intensa frente a una situación próxima",
      "Causas médicas o medicamentosas que conviene revisar",
      "Ansiedad que se somatiza en el sistema digestivo",
    ],
  },
  {
    id: "sensacion-electricidad",
    keywords: ["sensacion de electricidad en el cuerpo", "sensación de electricidad en el cuerpo", "corrientazos en el cuerpo", "hormigueo en todo el cuerpo"],
    termino: "Sensación de electricidad en el cuerpo",
    capa: "Ectodermo",
    sentido:
      "Sentir pequeñas descargas o corrientazos por el cuerpo, fuera de causas físicas por revisar, a veces coincide con una activación nerviosa intensa —el sistema nervioso procesando una alerta o una emoción fuerte que aún no ha encontrado su cauce.",
    enfoque:
      "Identificar qué situación reciente activó una respuesta nerviosa particularmente intensa en ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de electricidad en el cuerpo”)",
    otrasCausas: [
      "Una activación nerviosa intensa frente a una situación reciente",
      "Ansiedad aguda que se somatiza en todo el cuerpo",
      "Fatiga del sistema nervioso tras un periodo de mucho estrés",
    ],
  },
  {
    id: "vacio-pecho",
    keywords: ["vacio en el pecho", "vacío en el pecho", "siento un hueco en el pecho"],
    termino: "Sensación de vacío en el pecho",
    capa: "Ectodermo",
    sentido:
      "La sensación de un hueco o vacío en el pecho suele acompañar al duelo, especialmente en las primeras etapas de una pérdida importante —el cuerpo procesando, de forma muy física, la ausencia de algo o alguien.",
    enfoque:
      "Permitirte sentir esta sensación sin apurar el proceso; el duelo tiene su propio tiempo, distinto para cada persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensación de vacío en el pecho”)",
    otrasCausas: [
      "Una pérdida o duelo reciente en proceso activo",
      "El fin de una etapa o vínculo significativo",
      "Nostalgia profunda por algo que ya no está presente",
    ],
  },
  {
    id: "sequedad-vaginal",
    keywords: ["sequedad vaginal", "resequedad vaginal"],
    termino: "Sequedad vaginal",
    capa: "Ectodermo",
    sentido:
      "La sequedad vaginal, más allá de causas hormonales que siempre merecen valoración especializada, a veces coincide con una desconexión de la propia sexualidad o con tensión no resuelta en el vínculo íntimo actual.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, revisar tu conexión actual con tu propia sexualidad y con tu vínculo íntimo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sequedad vaginal”)",
    otrasCausas: [
      "Cambios hormonales que siempre merecen valoración especializada",
      "Desconexión con la propia sexualidad en la etapa actual",
      "Tensión no resuelta dentro de la relación de pareja",
    ],
  },
  {
    id: "sentimiento-competencia-constante",
    keywords: ["siento que compito con todos", "vivo comparandome con los demas", "vivo comparándome con los demás", "todo se vuelve una competencia"],
    termino: "Sentimiento de competencia constante",
    capa: "Emoción",
    sentido:
      "Vivir cada situación como una competencia, incluso donde no hace falta, suele ser agotador y puede alejarte de disfrutar simplemente el momento, sin la necesidad constante de medirte contra alguien más.",
    enfoque:
      "Practicar identificar una actividad que hagas solo por placer, sin ninguna medida de comparación ni resultado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de competencia constante”)",
    otrasCausas: [
      "Un entorno de origen muy competitivo entre hermanos o compañeros",
      "Autoestima que depende de estar siempre por encima de otros",
      "Un entorno laboral o social que refuerza la comparación constante",
    ],
  },
  {
    id: "dificultad-celebrar-logros",
    keywords: ["no logro celebrar mis logros", "me cuesta disfrutar mis logros", "minimizo mis propios logros"],
    termino: "Dificultad para celebrar los propios logros",
    capa: "Emoción",
    sentido:
      "Pasar rápidamente de un logro al siguiente pendiente, sin detenerte a reconocerlo, suele dejar una sensación de insatisfacción constante, sin importar cuánto realmente logres a lo largo del tiempo.",
    enfoque:
      "Practicar detenerte, aunque sea un minuto, a reconocer conscientemente cada logro antes de pasar al siguiente pendiente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para celebrar los propios logros”)",
    otrasCausas: [
      "Una infancia donde los logros se daban por sentado sin reconocimiento",
      "Autoexigencia que mueve la meta apenas se alcanza la anterior",
      "Miedo a que celebrar se perciba como arrogancia",
    ],
  },
  {
    id: "miedo-que-se-acabe-algo-bueno",
    keywords: ["miedo a que se acabe algo bueno", "miedo a que esto no dure", "no puedo disfrutar por miedo a que se acabe"],
    termino: "Miedo a que algo bueno se termine",
    capa: "Emoción",
    sentido:
      "Anticipar el final de algo bueno mientras todavía lo estás viviendo puede robarte buena parte del disfrute presente. Es un intento de protegerte de una decepción futura, a costa de una alegría que sí es real ahora mismo.",
    enfoque:
      "Practicar nombrar en voz alta, en el momento presente, que estás disfrutando algo, sin adelantarte a su posible final.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que algo bueno se termine”)",
    otrasCausas: [
      "Experiencias pasadas donde algo bueno terminó de forma dolorosa",
      "Dificultad para confiar plenamente en la estabilidad de lo positivo",
      "Una creencia de fondo de que la felicidad completa no está permitida",
    ],
  },
  {
    id: "modo-supervivencia",
    keywords: ["vivo en modo supervivencia", "siento que solo sobrevivo", "estoy en modo supervivencia"],
    termino: "Sentirse en modo supervivencia",
    capa: "Emoción",
    sentido:
      "Vivir en modo supervivencia significa operar día a día resolviendo lo urgente, sin espacio real para lo que te nutre o te da sentido. Es sostenible por un tiempo, pero no como forma de vida permanente.",
    enfoque:
      "Identificar un solo cambio pequeño que te saque, aunque sea brevemente, del modo de urgencia constante.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse en modo supervivencia”)",
    otrasCausas: [
      "Una acumulación sostenida de crisis o urgencias sin pausa",
      "Recursos de apoyo insuficientes frente a la carga actual",
      "Una etapa de vida particularmente exigente en varios frentes a la vez",
    ],
  },
  {
    id: "miedo-perder-trabajo",
    keywords: ["miedo a perder mi trabajo", "miedo a que me despidan", "inseguridad laboral"],
    termino: "Miedo a perder el trabajo",
    capa: "Emoción",
    sentido:
      "El miedo a perder el empleo combina una preocupación económica real con, muchas veces, una parte de tu identidad y tu valor propio que se siente ligada al rol laboral que ocupas actualmente.",
    enfoque:
      "Distinguir qué parte de este miedo es preocupación económica concreta, y qué parte es tu valor propio ligado al puesto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder el trabajo”)",
    otrasCausas: [
      "Inestabilidad real en el entorno laboral actual",
      "Una identidad muy ligada al rol o cargo que ocupas",
      "Experiencias pasadas de haber perdido un empleo de forma inesperada",
    ],
  },
  {
    id: "dificultad-limites-trabajo",
    keywords: ["dificultad para poner limites en el trabajo", "dificultad para poner límites en el trabajo", "no se decir que no en el trabajo", "no sé decir que no en el trabajo", "trabajo fuera de mi horario siempre"],
    termino: "Dificultad para poner límites laborales",
    capa: "Emoción",
    sentido:
      "Costarte decir que no en el trabajo, incluso fuera de tu horario o tus funciones, suele venir del miedo a ser vista como poco comprometida, aunque el costo real sea tu propio agotamiento sostenido.",
    enfoque:
      "Practicar poner un límite laboral concreto esta semana, aunque sea pequeño, y observar las consecuencias reales.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para poner límites laborales”)",
    otrasCausas: [
      "Miedo a ser vista como poco comprometida o poco colaboradora",
      "Una cultura laboral que normaliza la disponibilidad constante",
      "Autoestima ligada al reconocimiento por sobreesfuerzo laboral",
    ],
  },
  {
    id: "domingo-triste",
    keywords: ["tristeza de domingo", "los domingos por la tarde me pongo triste", "angustia de domingo"],
    termino: "Tristeza de domingo por la tarde",
    capa: "Emoción",
    sentido:
      "Esa mezcla de nostalgia y angustia anticipatoria que aparece los domingos por la tarde suele ser, en el fondo, la despedida del tiempo libre y la anticipación de las exigencias de la semana que comienza.",
    enfoque:
      "Reservar algo pequeño y agradable específicamente para los domingos en la tarde, en vez de solo prepararte para el lunes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Tristeza de domingo por la tarde”)",
    otrasCausas: [
      "Anticipación ansiosa de las exigencias de la semana laboral",
      "Poco disfrute genuino durante el fin de semana en sí mismo",
      "Una rutina semanal que se siente más pesada que placentera",
    ],
  },
  {
    id: "necesidad-controlar-imagen",
    keywords: ["necesito controlar mi imagen", "me preocupa mucho como me ven los demas", "me preocupa mucho cómo me ven los demás", "cuido mucho lo que muestro en redes"],
    termino: "Necesidad de controlar la propia imagen",
    capa: "Emoción",
    sentido:
      "Cuidar mucho la imagen que proyectas hacia afuera no es superficial en sí mismo; se vuelve pesado cuando ese control constante te aleja de mostrarte tal como realmente eres, incluso frente a quienes ya te conocen bien.",
    enfoque:
      "Practicar compartir algo genuino y menos “curado” con alguien de confianza, y observar que la conexión real no depende de la imagen perfecta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de controlar la propia imagen”)",
    otrasCausas: [
      "Miedo al juicio ajeno sobre cómo te perciben públicamente",
      "Una infancia donde la imagen familiar era motivo de mucho cuidado",
      "Presión social o profesional por mantener una imagen específica",
    ],
  },
  {
    id: "estancamiento-profesional",
    keywords: ["estancamiento profesional", "mi carrera no avanza", "siento que no crezco laboralmente"],
    termino: "Sentimiento de estancamiento profesional",
    capa: "Emoción",
    sentido:
      "Sentir que tu carrera no avanza puede reflejar una limitación real del entorno, o puede ser momento de replantear si el camino que sigues todavía corresponde a lo que realmente deseas construir.",
    enfoque:
      "Distinguir si el estancamiento es del entorno actual, o si es momento de replantear tu propio camino profesional.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de estancamiento profesional”)",
    otrasCausas: [
      "Un entorno laboral con pocas oportunidades reales de crecimiento",
      "Miedo a dar el paso hacia un cambio profesional necesario",
      "Comparación con el avance profesional de otras personas de tu edad",
    ],
  },
  {
    id: "miedo-hablar-dinero",
    keywords: ["miedo a hablar de dinero", "me incomoda hablar de dinero", "no se negociar mi sueldo", "no sé negociar mi sueldo"],
    termino: "Miedo a hablar de dinero",
    capa: "Emoción",
    sentido:
      "La incomodidad para hablar de dinero —pedir un aumento, negociar un precio, discutir finanzas en pareja— suele venir de mensajes familiares que trataban el tema como algo vergonzoso o conflictivo del que mejor no hablar.",
    enfoque:
      "Practicar una conversación pequeña sobre dinero en un contexto de bajo riesgo, para ir perdiéndole el miedo al tema.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a hablar de dinero”)",
    otrasCausas: [
      "Una familia donde el dinero era un tema tabú o motivo de conflicto",
      "Miedo a parecer codiciosa o materialista al hablar de finanzas",
      "Poca práctica histórica negociando temas económicos",
    ],
  },
  {
    id: "nostalgia-quien-era",
    keywords: ["extraño quien era antes", "extraño a la persona que era", "siento que perdi una parte de mi", "siento que perdí una parte de mí"],
    termino: "Nostalgia por quien solías ser",
    capa: "Emoción",
    sentido:
      "Extrañar una versión anterior de ti misma —más espontánea, más libre, más despreocupada— es una forma válida de duelo por el paso del tiempo y los cambios de etapa, aunque esa versión no haya desaparecido del todo, solo se haya transformado.",
    enfoque:
      "Identificar qué cualidad específica de esa versión anterior te gustaría recuperar, aunque sea en una nueva forma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Nostalgia por quien solías ser”)",
    otrasCausas: [
      "Un cambio de etapa grande —maternidad, trabajo, edad— que transformó tu identidad",
      "Responsabilidades actuales que dejan poco espacio para la espontaneidad de antes",
      "Comparación entre tu presente y una versión idealizada de tu pasado",
    ],
  },
  {
    id: "miedo-opinion-hijos",
    keywords: ["miedo a lo que piensen mis hijos de mi", "miedo a decepcionar a mis hijos", "me preocupa que mis hijos me juzguen"],
    termino: "Miedo a la opinión de los hijos",
    capa: "Emoción",
    sentido:
      "Preocuparte por lo que tus hijos piensan de ti como madre o padre es natural, pero puede volverse pesado cuando te lleva a ocultar tus propias dificultades o a exigirte una perfección que ningún padre puede sostener siempre.",
    enfoque:
      "Recordar que mostrarte humana frente a tus hijos, con tus propios errores, también les enseña algo valioso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la opinión de los hijos”)",
    otrasCausas: [
      "Una autoexigencia alta sobre el propio rol de madre o padre",
      "Comparación con otros modelos de crianza que parecen “más perfectos”",
      "Miedo a repetir errores de tus propios padres frente a tus hijos",
    ],
  },
  {
    id: "necesidad-ser-perfecta-madre",
    keywords: ["necesito ser la madre perfecta", "necesito ser el padre perfecto", "siento que fallo como madre", "siento que fallo como padre"],
    termino: "Necesidad de ser una madre o padre perfecto",
    capa: "Emoción",
    sentido:
      "La crianza no tiene un estándar de perfección alcanzable; los hijos no necesitan un padre o madre perfectos, necesitan uno lo suficientemente presente y dispuesto a reparar cuando algo sale mal.",
    enfoque:
      "Practicar reconocer, frente a tus hijos, un error puntual y cómo piensas repararlo, en vez de aspirar a no cometer ninguno.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de ser una madre o padre perfecto”)",
    otrasCausas: [
      "Comparación constante con estándares de crianza poco realistas",
      "Miedo a que un error propio marque negativamente a tus hijos",
      "Una autoexigencia general trasladada también al rol de crianza",
    ],
  },
  {
    id: "dificultad-disfrutar-sin-culpa",
    keywords: ["me siento culpable al divertirme", "no puedo disfrutar sin culpa", "siento que no me merezco divertirme"],
    termino: "Dificultad para disfrutar sin culpa",
    capa: "Emoción",
    sentido:
      "Sentir culpa al pasarlo bien, distinto de la culpa por descansar, suele relacionarse con la creencia de que la diversión debe “ganarse” con suficiente esfuerzo previo, en vez de ser simplemente parte natural de una vida equilibrada.",
    enfoque:
      "Practicar disfrutar de algo placentero sin haber “terminado” antes toda tu lista de pendientes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para disfrutar sin culpa”)",
    otrasCausas: [
      "Una infancia donde la diversión se condicionaba al cumplimiento de deberes",
      "Una identidad muy ligada a la responsabilidad y poco a la ligereza",
      "Comparación con personas cercanas que atraviesan un momento difícil",
    ],
  },
  {
    id: "vision-borrosa",
    keywords: ["vision borrosa", "visión borrosa", "veo borroso"],
    termino: "Visión borrosa",
    capa: "Ectodermo",
    sentido:
      "La visión borrosa, distinta de la opacidad progresiva de las cataratas, a veces coincide con una etapa donde los detalles de una situación se sienten confusos o poco claros —como si prefirieras no ver algo con total nitidez todavía.",
    enfoque:
      "Identificar qué situación reciente sientes que no logras ver con total claridad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Visión borrosa”)",
    otrasCausas: [
      "Confusión genuina frente a una situación compleja actual",
      "Fatiga visual acumulada que conviene revisar también médicamente",
      "Resistencia a ver con claridad algo que ya intuyes",
    ],
  },
  {
    id: "ardor-piel-sin-causa",
    keywords: ["ardor en la piel sin causa", "me arde la piel sin razon", "me arde la piel sin razón"],
    termino: "Ardor en la piel sin causa aparente",
    capa: "Ectodermo",
    sentido:
      "Sentir ardor en la piel sin una causa física clara, más allá de la revisión especializada que siempre corresponde, a veces coincide con una rabia o vergüenza intensa que se manifiesta justo en el límite entre tú y el mundo exterior.",
    enfoque:
      "Identificar si hay una rabia o vergüenza reciente que sientes literalmente “arder” por dentro.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ardor en la piel sin causa”)",
    otrasCausas: [
      "Una rabia o vergüenza intensa reciente sin expresar",
      "Sensibilidad de la piel que siempre conviene revisar con un especialista",
      "Ansiedad aguda que se somatiza en la superficie del cuerpo",
    ],
  },
  {
    id: "latido-oidos",
    keywords: ["siento el latido en los oidos", "siento el latido en los oídos", "escucho mi pulso en la cabeza"],
    termino: "Sensación de latido en los oídos",
    capa: "Mesodermo",
    sentido:
      "Escuchar tu propio pulso de forma muy notoria suele coincidir con una hiperconciencia del propio cuerpo en momentos de ansiedad intensa, como si toda tu atención se concentrara, de golpe, en tu propia vitalidad.",
    enfoque:
      "Buscar valoración especializada para descartar causas físicas, y en paralelo, notar si hay una ansiedad aguda reciente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Latido en los oídos”)",
    otrasCausas: [
      "Ansiedad aguda que aumenta la conciencia del propio cuerpo",
      "Presión arterial que siempre conviene revisar con un especialista",
      "Un momento de alerta intensa frente a una situación puntual",
    ],
  },
  {
    id: "miedo-traicion",
    keywords: ["miedo a la traicion", "miedo a la traición", "miedo a que me traicionen", "miedo a que me sean infiel"],
    termino: "Miedo a la traición",
    capa: "Emoción",
    sentido:
      "El miedo a ser traicionada suele intensificar la vigilancia dentro de un vínculo, buscando señales de alerta incluso donde no las hay. Paradójicamente, esa vigilancia constante puede desgastar la confianza más que protegerla.",
    enfoque:
      "Distinguir entre señales reales de alerta y proyecciones basadas en heridas pasadas no relacionadas con esta persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a la traición”)",
    otrasCausas: [
      "Una traición real vivida en una relación anterior",
      "Haber presenciado una traición cercana en tu entorno familiar",
      "Inseguridad de fondo sobre tu propio valor dentro del vínculo",
    ],
  },
  {
    id: "sentimiento-atascada-emocional",
    keywords: ["me siento atascada emocionalmente", "me siento atascado emocionalmente", "mis emociones no avanzan", "sigo sintiendo lo mismo desde hace meses"],
    termino: "Sentirse atascada emocionalmente",
    capa: "Emoción",
    sentido:
      "A diferencia del estancamiento general de vida, sentirte atascada emocionalmente es más específico: una emoción particular —tristeza, rabia, miedo— parece no moverse ni transformarse, sin importar cuánto tiempo pase.",
    enfoque:
      "Considerar si esa emoción específica necesita un espacio de acompañamiento profesional para moverse de verdad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse atascada emocionalmente”)",
    otrasCausas: [
      "Una emoción que no ha encontrado un espacio real para procesarse",
      "Falta de acompañamiento adecuado frente a una herida específica",
      "Evitar sentir por completo esa emoción, lo cual impide que se transforme",
    ],
  },
  {
    id: "necesidad-proposito-grande",
    keywords: ["necesito un proposito grande", "necesito un propósito grande", "siento que mi vida deberia tener un gran significado", "siento que mi vida debería tener un gran significado"],
    termino: "Necesidad de un propósito grande",
    capa: "Emoción",
    sentido:
      "Creer que tu vida solo vale si tiene un propósito extraordinario puede hacerte pasar por alto el valor real de lo cotidiano: los vínculos, los pequeños cuidados, las cosas simples que también dan sentido genuino a una vida.",
    enfoque:
      "Practicar identificar el valor de una acción pequeña y cotidiana, sin necesidad de que sea trascendental.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de un propósito grande”)",
    otrasCausas: [
      "Comparación con historias de vida que parecen más extraordinarias",
      "Una infancia donde el valor se medía por logros excepcionales",
      "Presión social o cultural sobre “trascender” de alguna forma",
    ],
  },
  {
    id: "miedo-repetir-error",
    keywords: ["miedo a repetir el mismo error", "miedo a cometer el mismo error otra vez", "no quiero volver a equivocarme igual"],
    termino: "Miedo a repetir el mismo error",
    capa: "Emoción",
    sentido:
      "El miedo a repetir un error pasado puede ser una guía útil hasta cierto punto, pero cuando se vuelve excesivo, puede paralizarte incluso frente a situaciones genuinamente distintas a la que causó el error original.",
    enfoque:
      "Identificar qué es específicamente distinto en la situación actual, en vez de asumir que el resultado será igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a repetir el mismo error”)",
    otrasCausas: [
      "Un error pasado con consecuencias particularmente dolorosas",
      "Dificultad para diferenciar la situación actual de la anterior",
      "Autocrítica severa hacia decisiones pasadas",
    ],
  },
  {
    id: "dificultad-humor",
    keywords: ["me cuesta reirme de las cosas", "me cuesta reírme de las cosas", "perdi mi sentido del humor", "perdí mi sentido del humor", "todo me lo tomo muy en serio"],
    termino: "Dificultad para tomarse las cosas con humor",
    capa: "Emoción",
    sentido:
      "Perder la capacidad de reírte, incluso de ti misma, suele coincidir con etapas de mucho estrés o autoexigencia, donde todo se procesa desde la seriedad y el control, dejando poco espacio para la ligereza.",
    enfoque:
      "Practicar buscar, de forma deliberada, el lado absurdo o gracioso de una situación cotidiana esta semana.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para tomarse las cosas con humor”)",
    otrasCausas: [
      "Una etapa de estrés sostenido que reduce el espacio para la ligereza",
      "Autoexigencia alta que dificulta reírte de tus propios errores",
      "Un entorno actual particularmente serio o tenso",
    ],
  },
  {
    id: "sindrome-impostor-adulto",
    keywords: ["siento que estoy fingiendo ser adulta", "no me siento adulta de verdad", "no me siento adulto de verdad", "siento que actuo de adulta sin serlo", "siento que actúo de adulta sin serlo"],
    termino: "Sentirse un impostor en la vida adulta",
    capa: "Emoción",
    sentido:
      "Sentir que estás “actuando” de adulta, sin sentirte realmente preparada para serlo, es sorprendentemente común. La mayoría de las personas adultas, en el fondo, también están improvisando gran parte del camino.",
    enfoque:
      "Recordar que nadie recibe un manual completo para la vida adulta; todos aprenden principalmente sobre la marcha.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse un impostor en la vida adulta”)",
    otrasCausas: [
      "Responsabilidades adultas asumidas antes de sentirte preparada",
      "Comparación con otros adultos que parecen tener todo resuelto",
      "Falta de referentes cercanos que normalicen la incertidumbre adulta",
    ],
  },
  {
    id: "necesidad-cierre",
    keywords: ["necesito un cierre", "no tuve un cierre", "me quede sin explicaciones", "me quedé sin explicaciones", "necesito respuestas para cerrar esa etapa"],
    termino: "Necesidad de un cierre",
    capa: "Emoción",
    sentido:
      "No haber tenido un cierre claro —una explicación, una despedida, una conversación final— puede dejar una etapa abierta indefinidamente. A veces el cierre no llega de la otra persona, y hay que construirlo internamente, por tu cuenta.",
    enfoque:
      "Escribir, aunque sea solo para ti, la explicación o la despedida que necesitabas recibir y no llegó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de un cierre”)",
    otrasCausas: [
      "Una relación o etapa que terminó de forma abrupta o poco clara",
      "Preguntas sin responder que siguen presentes en tu mente",
      "Una despedida que no pudiste tener de la forma que hubieras querido",
    ],
  },
  {
    id: "dificultad-vulnerable-pareja",
    keywords: ["me cuesta ser vulnerable con mi pareja", "no le muestro mis emociones a mi pareja", "me cuesta abrirme con mi pareja"],
    termino: "Dificultad para ser vulnerable con la pareja",
    capa: "Emoción",
    sentido:
      "Mostrarte vulnerable específicamente con tu pareja, incluso cuando confías en general, puede tocar miedos particulares sobre esa relación en concreto —quizás el miedo a que ver tu lado más frágil cambie cómo te percibe.",
    enfoque:
      "Practicar compartir una emoción pequeña y genuina con tu pareja, sin la necesidad de resolverla o justificarla de inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para ser vulnerable con la pareja”)",
    otrasCausas: [
      "Miedo a que la vulnerabilidad cambie la forma en que tu pareja te ve",
      "Una relación pasada donde la vulnerabilidad fue usada en tu contra",
      "Un rol de “la fuerte” sostenido también dentro de la relación actual",
    ],
  },
  {
    id: "necesidad-mentor",
    keywords: ["necesito un mentor", "me falta alguien que me guie", "me falta alguien que me guíe", "necesito una guia en mi vida", "necesito una guía en mi vida"],
    termino: "Necesidad de un mentor o guía",
    capa: "Emoción",
    sentido:
      "Sentir que te falta una figura que te oriente es válido, especialmente en etapas de transición grande. Vale la pena buscar activamente esa guía en distintas fuentes, en vez de esperar a que aparezca por sí sola.",
    enfoque:
      "Identificar a alguien concreto, aunque no lo conozcas bien todavía, que podría ofrecerte esa orientación que buscas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de un mentor o guía”)",
    otrasCausas: [
      "Una etapa de transición grande sin una figura clara de orientación",
      "Ausencia de mentores o referentes cercanos en tu área de interés",
      "Una infancia sin figuras que ofrecieran una guía consistente",
    ],
  },
  {
    id: "miedo-perder-pasion",
    keywords: ["miedo a perder mi pasion", "miedo a perder mi pasión", "miedo a que se me apague la creatividad", "miedo a perder las ganas de crear"],
    termino: "Miedo a perder la propia pasión",
    capa: "Emoción",
    sentido:
      "El miedo a que se apague tu pasión por algo que amas suele intensificarse cuando esa actividad se convierte en obligación o trabajo. La pasión no siempre desaparece; a veces solo necesita un descanso o una forma nueva de reconectar con ella.",
    enfoque:
      "Practicar volver a esa actividad sin ninguna exigencia de resultado, solo por el placer original que alguna vez te dio.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder la propia pasión”)",
    otrasCausas: [
      "Convertir una pasión personal en una obligación laboral",
      "Agotamiento que reduce temporalmente la conexión con lo que amas",
      "Presión externa por producir resultados constantes en esa área",
    ],
  },
  {
    id: "dificultad-descansar-mente",
    keywords: ["no logro descansar la mente", "mi mente no para nunca", "no puedo apagar mis pensamientos"],
    termino: "Dificultad para descansar la mente",
    capa: "Emoción",
    sentido:
      "Sentir que la mente nunca se detiene, incluso en momentos de descanso físico, suele reflejar una acumulación de pendientes o preocupaciones que el cerebro sigue procesando de fondo, casi sin que lo decidas conscientemente.",
    enfoque:
      "Practicar escribir todos los pendientes en un papel antes de descansar, para “descargarlos” de la mente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para descansar la mente”)",
    otrasCausas: [
      "Una acumulación de pendientes sin procesar del todo",
      "Ansiedad de fondo que mantiene la mente en alerta constante",
      "Poca práctica en técnicas de desconexión mental real",
    ],
  },
  {
    id: "dificultad-relajarse-fisicamente",
    keywords: ["no logro relajarme ni de vacaciones", "mi cuerpo no se relaja nunca", "siempre estoy tensa aunque descanse", "siempre estoy tenso aunque descanse"],
    termino: "Dificultad para relajarse físicamente",
    capa: "Emoción",
    sentido:
      "Que el cuerpo se mantenga tenso incluso en el descanso, o incluso de vacaciones, suele reflejar un estado de alerta tan sostenido que se volvió el nuevo punto de referencia del cuerpo, en vez de la excepción.",
    enfoque:
      "Practicar ejercicios breves de relajación muscular progresiva, notando conscientemente la diferencia entre tensión y soltura.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para relajarse físicamente”)",
    otrasCausas: [
      "Un estado de alerta sostenido durante tanto tiempo que se volvió habitual",
      "Dificultad para confiar en que es seguro bajar completamente la guardia",
      "Poca práctica reciente en técnicas de relajación real",
    ],
  },
  {
    id: "piloto-automatico",
    keywords: ["siento que vivo en piloto automatico", "siento que vivo en piloto automático", "hago todo sin darme cuenta", "mi vida se siente mecanica", "mi vida se siente mecánica"],
    termino: "Sentirse en piloto automático",
    capa: "Emoción",
    sentido:
      "Vivir en piloto automático —haciendo lo mismo cada día sin plena conciencia de ello— suele ser una forma de conservar energía frente a la sobrecarga, aunque a la larga puede dejarte con la sensación de que el tiempo pasa sin que realmente lo vivas.",
    enfoque:
      "Elegir un momento pequeño del día para hacerlo con plena atención, en vez de en automático.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse en piloto automático”)",
    otrasCausas: [
      "Una rutina muy repetitiva sostenida por mucho tiempo",
      "Sobrecarga mental que lleva a automatizar tareas para ahorrar energía",
      "Desconexión general del propio presente",
    ],
  },
  {
    id: "dificultad-poner-en-practica",
    keywords: ["se que deberia pero no lo hago", "sé que debería pero no lo hago", "conozco la solucion pero no la aplico", "conozco la solución pero no la aplico"],
    termino: "Dificultad para poner en práctica lo que se sabe",
    capa: "Emoción",
    sentido:
      "Saber exactamente qué deberías hacer, y aun así no hacerlo, no es falta de inteligencia ni de voluntad; suele haber una razón emocional de fondo —miedo, comodidad, una creencia oculta— que vale la pena explorar en vez de solo repetirte la información.",
    enfoque:
      "Preguntarte, con honestidad, qué ganas —aunque no lo parezca— al seguir sin aplicar lo que ya sabes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para poner en práctica lo que se sabe”)",
    otrasCausas: [
      "Un miedo oculto detrás de la acción que sabes que deberías tomar",
      "Beneficios ocultos, aunque incómodos, de mantener las cosas como están",
      "Autoexigencia que paraliza en vez de motivar a actuar",
    ],
  },
  {
    id: "dividida-dos-culturas",
    keywords: ["me siento dividida entre dos culturas", "me siento dividido entre dos culturas", "no soy de aqui ni de alla", "no soy de aquí ni de allá", "no encajo en ninguna cultura"],
    termino: "Sentirse dividida entre dos culturas",
    capa: "Emoción",
    sentido:
      "Sentir que no perteneces del todo ni al lugar de origen ni al nuevo lugar donde vives es una experiencia muy común entre quienes migran o crecen entre culturas. No pertenecer completamente a ninguno de los dos mundos también puede convertirse, con el tiempo, en la capacidad única de moverte con fluidez entre ambos.",
    enfoque:
      "Explorar qué partes de cada cultura eliges conscientemente integrar en tu propia identidad, en vez de sentir que debes elegir solo una.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse dividida entre dos culturas”)",
    otrasCausas: [
      "Una migración propia o de la familia entre países o regiones distintas",
      "Diferencias marcadas entre el idioma o costumbres de origen y las actuales",
      "Comentarios de ambos lados que refuerzan la sensación de no encajar en ninguno",
    ],
  },
  {
    id: "frio-pecho",
    keywords: ["frio en el pecho", "frío en el pecho", "siento el pecho frio", "siento el pecho frío"],
    termino: "Sensación de frío en el pecho",
    capa: "Ectodermo",
    sentido:
      "A diferencia del vacío en el pecho, la sensación de frío suele acompañar a una desilusión afectiva reciente —como si el calor de un vínculo se hubiera enfriado de golpe, dejando una sensación física de distancia emocional.",
    enfoque:
      "Identificar qué vínculo o situación reciente sientes que perdió calidez de forma repentina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Frío en el pecho”)",
    otrasCausas: [
      "Una desilusión afectiva reciente en un vínculo cercano",
      "Una distancia emocional que se instaló de forma gradual",
      "Causas circulatorias que siempre conviene revisar con un especialista",
    ],
  },
  {
    id: "perdida-voz-emocion",
    keywords: ["se me fue la voz de la emocion", "se me fue la voz de la emoción", "me quede sin voz de los nervios", "me quedé sin voz de los nervios"],
    termino: "Pérdida temporal de la voz por emoción",
    capa: "Ectodermo",
    sentido:
      "Quedarte momentáneamente sin voz frente a una emoción intensa —antes de llorar, de una noticia fuerte— es el cuerpo mostrando, de forma muy literal, que las palabras no alcanzan para contener lo que se siente.",
    enfoque:
      "Permitirte ese momento de silencio antes de hablar; no toda emoción necesita traducirse en palabras de inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pérdida temporal de la voz por emoción”)",
    otrasCausas: [
      "Una emoción intensa que sobrepasa momentáneamente las palabras",
      "Una noticia inesperada reciente, buena o difícil",
      "Nerviosismo agudo frente a una situación de mucho peso emocional",
    ],
  },
  {
    id: "lagrimeo-excesivo",
    keywords: ["lagrimeo excesivo", "se me llenan los ojos de lagrimas facil", "se me llenan los ojos de lágrimas fácil", "lloro con facilidad"],
    termino: "Lagrimeo excesivo",
    capa: "Ectodermo",
    sentido:
      "Llorar con más facilidad de lo habitual, a veces sin una razón que lo explique del todo, suele coincidir con una acumulación emocional que finalmente encuentra una válvula de salida, más que con un problema en sí mismo.",
    enfoque:
      "Permitir esa salida sin juzgarla; el llanto es, muchas veces, la forma más eficiente que tiene el cuerpo de soltar tensión acumulada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Lagrimeo excesivo”)",
    otrasCausas: [
      "Una acumulación emocional que finalmente encuentra salida",
      "Sensibilidad hormonal en ciertas etapas del ciclo o la vida",
      "Agotamiento general que reduce la capacidad de contener emociones",
    ],
  },
  {
    id: "sudor-frio",
    keywords: ["sudor frio", "sudor frío", "me dio un sudor frio de repente", "me dio un sudor frío de repente"],
    termino: "Sudor frío",
    capa: "Ectodermo",
    sentido:
      "El sudor frío repentino, distinto de la sudoración por calor o ansiedad social, suele acompañar a un susto o un miedo agudo —el cuerpo entero reaccionando ante una alarma percibida como inmediata.",
    enfoque:
      "Identificar qué situación puntual generó esa sensación de susto o alarma repentina.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sudor frío”)",
    otrasCausas: [
      "Un susto o alarma repentina frente a una situación puntual",
      "Una caída brusca de presión que siempre conviene revisar con un especialista",
      "Miedo agudo frente a una noticia o situación inesperada",
    ],
  },
  {
    id: "miedo-defraudar-amigo",
    keywords: ["miedo a defraudar a un amigo", "miedo a decepcionar a mis amigos", "no quiero fallarle a mis amigos"],
    termino: "Miedo a defraudar a un amigo",
    capa: "Emoción",
    sentido:
      "El miedo a decepcionar a tus amistades, aunque menos hablado que el miedo a decepcionar a la familia o la pareja, puede pesar igual de fuerte, especialmente en amistades que llevas sosteniendo por muchos años.",
    enfoque:
      "Recordar que una amistad genuina puede sostener también tus límites y tus momentos de no poder estar disponible.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a defraudar a un amigo”)",
    otrasCausas: [
      "Una amistad de mucho tiempo con expectativas mutuas altas",
      "Miedo a perder un vínculo importante si no cumples lo esperado",
      "Una experiencia pasada donde decepcionaste a un amigo cercano",
    ],
  },
  {
    id: "vivir-vida-de-otro",
    keywords: ["siento que vivo la vida de otra persona", "siento que vivo la vida de otro", "esta no es la vida que yo hubiera elegido", "vivo segun las expectativas de otros", "vivo según las expectativas de otros"],
    termino: "Sentir que vives la vida de otra persona",
    capa: "Emoción",
    sentido:
      "Sentir que la vida que llevas responde más a expectativas ajenas que a tus propios deseos suele ser una señal importante, aunque incómoda, de que es momento de revisar qué decisiones tomarías si partieras solo de ti misma.",
    enfoque:
      "Escribir cómo se vería un día tuyo si estuviera diseñado completamente según tus propios deseos, sin condicionamientos externos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentir que vives la vida de otra persona”)",
    otrasCausas: [
      "Decisiones de vida tomadas principalmente para cumplir expectativas externas",
      "Un camino trazado por la familia desde edad temprana",
      "Poca práctica histórica identificando tus propios deseos genuinos",
    ],
  },
  {
    id: "dificultad-aceptar-cambio-en-otro",
    keywords: ["no acepto que esa persona cambio", "no acepto que esa persona cambió", "extraño a la persona que era antes", "esa persona ya no es quien conoci", "esa persona ya no es quien conocí"],
    termino: "Dificultad para aceptar que alguien cercano cambió",
    capa: "Emoción",
    sentido:
      "Cuesta aceptar cuando una persona cercana cambia de forma significativa —en valores, en forma de ser—, porque implica también soltar la versión de ella con la que construiste el vínculo original.",
    enfoque:
      "Permitirte hacer duelo por esa versión anterior de la relación, mientras decides cómo relacionarte con quien esa persona es ahora.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar que alguien cercano cambió”)",
    otrasCausas: [
      "Un cambio significativo y reciente en una persona importante para ti",
      "Apego a la versión anterior de esa relación",
      "Dificultad general para adaptarte a los cambios en los vínculos cercanos",
    ],
  },
  {
    id: "miedo-proceso-no-funcione",
    keywords: ["miedo a que el proceso no funcione", "miedo a que nada me ayude", "y si esto tampoco funciona"],
    termino: "Miedo a que el proceso de sanación no funcione",
    capa: "Emoción",
    sentido:
      "Es válido temer invertir tiempo y esperanza en un proceso de sanación y que no dé los resultados esperados. Vale la pena recordar que sanar rara vez es lineal, y que el proceso en sí mismo —no solo el resultado final— también tiene valor real.",
    enfoque:
      "Definir con quien te acompañe en el proceso qué pequeños cambios, no solo la meta final, contarían como progreso real.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que el proceso no funcione”)",
    otrasCausas: [
      "Experiencias pasadas de intentos de cambio que no dieron resultado",
      "Miedo a invertir esperanza en algo que podría decepcionar de nuevo",
      "Expectativas de un proceso lineal, cuando sanar rara vez lo es",
    ],
  },
  {
    id: "competir-con-pasado-pareja",
    keywords: ["siento que compito con el pasado de mi pareja", "me comparo con las ex de mi pareja", "me comparo con los ex de mi pareja"],
    termino: "Sentir que compites con el pasado de tu pareja",
    capa: "Emoción",
    sentido:
      "Compararte con relaciones anteriores de tu pareja suele nacer de una inseguridad propia, más que de una amenaza real actual. El pasado de tu pareja ya pasó; la relación presente se construye con quien tú eres hoy, no en comparación con quien fue antes.",
    enfoque:
      "Identificar qué inseguridad propia se activa en esta comparación, más allá de la relación actual en sí misma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Competir con el pasado de la pareja”)",
    otrasCausas: [
      "Una inseguridad de fondo sobre tu propio valor en la relación",
      "Comentarios o comparaciones hechas, directa o indirectamente, por la pareja",
      "Una relación anterior propia donde sí hubo comparación real",
    ],
  },
  {
    id: "dificultad-confiar-intuicion",
    keywords: ["no confio en mi intuicion", "no confío en mi intuición", "dudo de mis propias corazonadas", "ignoro lo que mi instinto me dice"],
    termino: "Dificultad para confiar en la propia intuición",
    capa: "Emoción",
    sentido:
      "Ignorar sistemáticamente tus corazonadas, incluso cuando después resultan acertadas, suele venir de haber sido enseñada a priorizar la lógica o la opinión externa por encima de tu propio sentir instintivo.",
    enfoque:
      "Llevar un pequeño registro de tus corazonadas y qué tan seguido, en retrospectiva, resultaron certeras.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para confiar en la propia intuición”)",
    otrasCausas: [
      "Una educación que priorizó la lógica por encima del instinto",
      "Ocasiones pasadas donde seguiste tu intuición y no salió como esperabas",
      "Poca práctica histórica validando tus propias corazonadas",
    ],
  },
  {
    id: "miedo-opinion-divorcio",
    keywords: ["miedo a que me juzguen por divorciarme", "miedo al que diran por mi separacion", "miedo al qué dirán por mi separación", "verguenza por mi divorcio", "vergüenza por mi divorcio"],
    termino: "Miedo al juicio por el divorcio o la separación",
    capa: "Emoción",
    sentido:
      "Separarte, aunque sea la decisión correcta para tu bienestar, puede venir acompañada de miedo al juicio ajeno, sobre todo en entornos donde el matrimonio se percibe como algo que “no se rompe” bajo ninguna circunstancia.",
    enfoque:
      "Recordar que las personas que realmente te quieren priorizarán tu bienestar por encima de una narrativa social sobre cómo “deberían” verse las relaciones.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al juicio por el divorcio”)",
    otrasCausas: [
      "Un entorno familiar o cultural donde el divorcio se juzga fuertemente",
      "Miedo a la reacción específica de la familia extendida",
      "Una identidad muy ligada al estatus de estar casada",
    ],
  },
  {
    id: "necesidad-probar-independencia",
    keywords: ["necesito demostrar que puedo sola", "necesito demostrar que puedo solo", "tengo que probar que no necesito a nadie"],
    termino: "Necesidad de probar la propia independencia",
    capa: "Emoción",
    sentido:
      "Sentir la necesidad constante de demostrar que puedes sola, especialmente después de una separación o pérdida, puede ser una forma sana de reconstruir confianza, pero también puede volverse agotador si se convierte en rechazar toda ayuda por sistema.",
    enfoque:
      "Distinguir entre aceptar ayuda puntual y depender de otros; ambas cosas son compatibles con ser una persona independiente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de probar la propia independencia”)",
    otrasCausas: [
      "Una separación o pérdida reciente que activó la necesidad de reconstruir confianza propia",
      "Comentarios pasados que cuestionaron tu capacidad de sostenerte sola",
      "Miedo a volver a depender emocionalmente de alguien más",
    ],
  },
  {
    id: "dificultad-empezar-de-nuevo",
    keywords: ["me cuesta empezar de nuevo", "no se como volver a empezar", "no sé cómo volver a empezar", "miedo a empezar de cero otra vez"],
    termino: "Dificultad para empezar de nuevo",
    capa: "Emoción",
    sentido:
      "Empezar de nuevo —tras una pérdida, una mudanza, un cambio grande— implica soltar lo conocido sin todavía tener la certeza de lo que viene después. Ese espacio intermedio suele ser el más incómodo de todo el proceso de cambio.",
    enfoque:
      "Dar un solo paso pequeño y concreto hacia ese nuevo comienzo, en vez de intentar resolverlo todo de una vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para empezar de nuevo”)",
    otrasCausas: [
      "Una pérdida o cierre de etapa reciente y significativo",
      "Miedo a invertir energía en algo nuevo que también podría no funcionar",
      "Agotamiento tras el cierre de la etapa anterior",
    ],
  },
  {
    id: "pausa-tras-maternidad",
    keywords: ["siento que mi vida quedo en pausa tras ser madre", "siento que mi vida quedó en pausa tras ser madre", "perdi mi identidad al ser mama", "perdí mi identidad al ser mamá"],
    termino: "Sentir que la vida quedó en pausa tras la maternidad",
    capa: "Emoción",
    sentido:
      "Amar profundamente a tus hijos y, al mismo tiempo, extrañar partes de tu identidad anterior a la maternidad no es contradictorio; ambas cosas pueden ser ciertas a la vez, sin que ninguna reste valor a la otra.",
    enfoque:
      "Identificar una actividad pequeña, solo tuya, que puedas retomar aunque sea en dosis breves dentro de tu rutina actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vida en pausa tras la maternidad”)",
    otrasCausas: [
      "Una identidad que se sintió absorbida casi por completo por el rol de madre",
      "Poco tiempo o apoyo disponible para sostener intereses propios",
      "Culpa al priorizar tiempo propio sobre el tiempo con los hijos",
    ],
  },
  {
    id: "necesidad-reconectar-pareja",
    keywords: ["necesito reconectar con mi pareja", "siento que nos distanciamos como pareja", "quiero recuperar la cercania con mi pareja", "quiero recuperar la cercanía con mi pareja"],
    termino: "Necesidad de reconectar con la pareja",
    capa: "Emoción",
    sentido:
      "El distanciamiento gradual en una relación de pareja rara vez ocurre por un solo evento grande; suele ser la suma de rutinas, cansancio y falta de espacios compartidos que, con intención, también se puede revertir poco a poco.",
    enfoque:
      "Proponer un espacio breve y regular, solo para los dos, sin la agenda de resolver temas logísticos de la relación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de reconectar con la pareja”)",
    otrasCausas: [
      "Rutinas y responsabilidades que dejaron poco espacio para la pareja",
      "Cansancio acumulado que reduce la energía disponible para conectar",
      "Falta de conversaciones profundas sostenidas por mucho tiempo",
    ],
  },
  {
    id: "criar-sola-acompanada",
    keywords: ["siento que crio sola aunque tengo pareja", "siento que crío sola aunque tengo pareja", "hago todo lo de la crianza yo sola", "mi pareja no se involucra en la crianza"],
    termino: "Sentir que crías en soledad, aunque acompañada",
    capa: "Emoción",
    sentido:
      "Sentir que llevas el peso principal de la crianza, incluso teniendo pareja presente, es una de las formas de soledad más silenciosas y menos habladas dentro de una relación, precisamente porque técnicamente no estás sola.",
    enfoque:
      "Nombrar explícitamente a tu pareja qué tareas específicas de la crianza necesitas que se compartan de forma más equitativa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Criar en soledad estando acompañada”)",
    otrasCausas: [
      "Una distribución desigual de las tareas de crianza dentro de la pareja",
      "Roles de género tradicionales asumidos sin cuestionarlos del todo",
      "Falta de conversaciones claras sobre expectativas de crianza compartida",
    ],
  },
  {
    id: "dificultad-dejar-ir-hijos",
    keywords: ["me cuesta dejar ir a mis hijos", "sindrome del nido vacio", "síndrome del nido vacío", "no se quien soy sin mis hijos en casa", "no sé quién soy sin mis hijos en casa"],
    termino: "Dificultad para dejar ir a los hijos (nido vacío)",
    capa: "Emoción",
    sentido:
      "Cuando los hijos crecen y se van, es natural sentir una mezcla de orgullo y una pérdida profunda de identidad, sobre todo si buena parte de tu vida giró alrededor de su crianza durante muchos años.",
    enfoque:
      "Identificar qué parte de tu identidad, más allá del rol de madre o padre, te gustaría reconstruir o retomar en esta nueva etapa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Síndrome del nido vacío”)",
    otrasCausas: [
      "Una identidad muy centrada en el rol de madre o padre durante años",
      "El cierre reciente de una etapa larga de crianza activa",
      "Miedo a la nueva forma que tomará el vínculo con los hijos adultos",
    ],
  },
  {
    id: "perdida-chispa-relacion",
    keywords: ["perdimos la chispa en la relacion", "perdimos la chispa en la relación", "siento que ya no hay pasion con mi pareja", "siento que ya no hay pasión con mi pareja"],
    termino: "Sentir que se perdió la chispa en la relación",
    capa: "Emoción",
    sentido:
      "La intensidad inicial de una relación naturalmente se transforma con el tiempo en algo distinto —más estable, menos eufórico—, lo cual no significa necesariamente que el amor haya desaparecido, sino que cambió de forma.",
    enfoque:
      "Diferenciar si extrañas la intensidad inicial en general, o si hay una desconexión más profunda que vale la pena atender directamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pérdida de la chispa en la relación”)",
    otrasCausas: [
      "Una etapa larga de la relación sin espacios nuevos ni sorpresas compartidas",
      "Rutinas cotidianas que dejaron poco espacio para el romance",
      "Comparación con la intensidad idealizada del inicio de la relación",
    ],
  },
  {
    id: "necesidad-sentirse-deseada",
    keywords: ["necesito sentirme deseada", "necesito sentirme deseado", "siento que ya no soy atractiva para mi pareja", "siento que ya no soy atractivo para mi pareja"],
    termino: "Necesidad de sentirse deseada",
    capa: "Emoción",
    sentido:
      "Sentirte deseada dentro de una relación de largo plazo es una necesidad legítima, no una vanidad. La rutina y el cansancio compartido a veces dejan este aspecto de lado, sin que eso signifique que el deseo desapareció por completo.",
    enfoque:
      "Comunicar esta necesidad directamente a tu pareja, en vez de esperar que la note por sí sola.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de sentirse deseada”)",
    otrasCausas: [
      "Rutinas y cansancio compartido que dejaron de lado la expresión del deseo",
      "Cambios de etapa de vida que afectaron la conexión física en pareja",
      "Poca comunicación explícita sobre esta necesidad dentro de la relación",
    ],
  },
  {
    id: "dificultad-hablar-sexualidad-pareja",
    keywords: ["me cuesta hablar de sexualidad con mi pareja", "no hablamos de intimidad en la relacion", "no hablamos de intimidad en la relación"],
    termino: "Dificultad para hablar de sexualidad con la pareja",
    capa: "Emoción",
    sentido:
      "Hablar abiertamente de intimidad y sexualidad con la pareja sigue siendo, para muchas personas, uno de los temas más incómodos de abordar, incluso en relaciones donde existe confianza en otras áreas de la vida compartida.",
    enfoque:
      "Empezar la conversación fuera del momento de intimidad misma, en un espacio tranquilo y sin presión de resultado inmediato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para hablar de sexualidad con la pareja”)",
    otrasCausas: [
      "Una educación donde la sexualidad se trataba como tema tabú",
      "Incomodidad general para hablar de necesidades íntimas en voz alta",
      "Miedo a herir a la pareja al expresar una necesidad o incomodidad",
    ],
  },
  {
    id: "calor-subito",
    keywords: ["calor subito", "calor súbito", "me sube el calor de repente", "oleadas de calor"],
    termino: "Oleadas de calor súbito",
    capa: "Mesodermo",
    sentido:
      "Sentir oleadas de calor repentino, fuera del contexto hormonal de la menopausia, a veces coincide con una rabia o vergüenza que sube con rapidez —una reacción emocional intensa que el cuerpo expresa, literalmente, subiendo de temperatura.",
    enfoque:
      "Identificar si hay una rabia o vergüenza reciente que sientes que “sube” con fuerza en el momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Oleadas de calor súbito”)",
    otrasCausas: [
      "Una rabia o vergüenza intensa reciente sin expresar del todo",
      "Cambios hormonales que siempre conviene revisar con un especialista",
      "Ansiedad aguda frente a una situación puntual",
    ],
  },
  {
    id: "parpadeo-excesivo",
    keywords: ["parpadeo excesivo", "parpadeo mucho", "no dejo de parpadear"],
    termino: "Parpadeo excesivo",
    capa: "Ectodermo",
    sentido:
      "Parpadear con más frecuencia de la habitual suele coincidir con una tensión nerviosa acumulada, como un pequeño intento del cuerpo de “refrescar” la mirada frente a algo que resulta incómodo de sostener con los ojos abiertos.",
    enfoque:
      "Notar qué situación reciente te resulta particularmente incómoda de “mirar de frente”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Parpadeo excesivo”)",
    otrasCausas: [
      "Tensión nerviosa acumulada sin una vía clara de descarga",
      "Fatiga visual que siempre conviene revisar también",
      "Ansiedad de fondo que se somatiza en los ojos",
    ],
  },
  {
    id: "debilidad-manos",
    keywords: ["debilidad en las manos", "se me debilitan las manos", "poca fuerza en las manos"],
    termino: "Debilidad en las manos",
    capa: "Mesodermo",
    sentido:
      "Sentir las manos débiles, distinto del hormigueo o el frío, a veces coincide con una sensación de no tener ya la fuerza para “sostener” una situación o una responsabilidad que llevas cargando por mucho tiempo.",
    enfoque:
      "Identificar qué responsabilidad sientes que ya no tienes la fuerza de sostener sola.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Debilidad en las manos”)",
    otrasCausas: [
      "Agotamiento físico y emocional sostenido por mucho tiempo",
      "Una responsabilidad que sientes que ya no puedes sostener sola",
      "Causas físicas que siempre conviene revisar con un especialista",
    ],
  },
  {
    id: "sensibilidad-ruido",
    keywords: ["sensibilidad al ruido", "los sonidos fuertes me molestan mucho", "no tolero el ruido"],
    termino: "Sensibilidad al ruido",
    capa: "Ectodermo",
    sentido:
      "La sensibilidad intensa a los sonidos suele intensificarse en etapas de sobrecarga nerviosa, cuando el sistema ya está procesando tantos estímulos que cualquier ruido adicional se siente desproporcionadamente invasivo.",
    enfoque:
      "Buscar momentos deliberados de silencio a lo largo del día para darle descanso a tu sistema nervioso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensibilidad al ruido”)",
    otrasCausas: [
      "Sobrecarga nerviosa general en la etapa actual",
      "Una sensibilidad sensorial natural poco comprendida o validada",
      "Ansiedad de fondo que amplifica la percepción de los estímulos externos",
    ],
  },
  {
    id: "duelo-mascota",
    keywords: ["duelo por mi mascota", "extraño mucho a mi mascota", "no supero la muerte de mi perro", "no supero la muerte de mi gato"],
    termino: "Duelo por la pérdida de una mascota",
    capa: "Emoción",
    sentido:
      "El duelo por una mascota es tan real y profundo como cualquier otra pérdida significativa, aunque a veces se minimiza socialmente. El vínculo con un animal suele ser de una lealtad y presencia incondicional difícil de replicar en otro tipo de relación.",
    enfoque:
      "Permitirte sentir este duelo con la misma seriedad que le darías a cualquier otra pérdida importante.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Duelo por la pérdida de una mascota”)",
    otrasCausas: [
      "La pérdida reciente de un vínculo de compañía profundo y cotidiano",
      "Poca validación externa hacia este tipo específico de duelo",
      "El cierre de una etapa de vida asociada a esa mascota en particular",
    ],
  },
  {
    id: "necesidad-otros-adivinen",
    keywords: ["quiero que adivinen lo que necesito", "espero que mi pareja adivine lo que siento", "no debería tener que pedirlo"],
    termino: "Necesidad de que otros adivinen tus necesidades",
    capa: "Emoción",
    sentido:
      "Esperar que alguien adivine lo que necesitas, sin decirlo abiertamente, suele generar frustración constante, ya que ni siquiera la persona que más te quiere puede leer la mente con precisión todo el tiempo.",
    enfoque:
      "Practicar pedir directamente lo que necesitas, aunque al principio se sienta menos “romántico” que ser adivinada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de que otros adivinen tus necesidades”)",
    otrasCausas: [
      "Una creencia de que pedir directamente resta valor al gesto",
      "Una infancia donde expresar necesidades abiertamente no era bien recibido",
      "Miedo a ser vista como demandante al pedir algo con claridad",
    ],
  },
  {
    id: "dificultad-disfrutar-soledad",
    keywords: ["no disfruto estar sola", "no disfruto estar solo", "siento que algo falta cuando estoy sola", "siento que algo falta cuando estoy solo"],
    termino: "Dificultad para disfrutar de la soledad",
    capa: "Emoción",
    sentido:
      "A diferencia del miedo a estar sola, aquí el reto no es el temor en sí, sino la dificultad para encontrarle disfrute genuino a tu propia compañía, como si la soledad solo pudiera vivirse como algo que hay que llenar o sobrellevar.",
    enfoque:
      "Practicar una actividad placentera diseñada específicamente para disfrutar en soledad, no solo para “matar el tiempo”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para disfrutar de la soledad”)",
    otrasCausas: [
      "Poca práctica histórica genuina de disfrute en soledad",
      "Una identidad construida principalmente en función de otras personas",
      "Incomodidad frente al silencio o la introspección que trae la soledad",
    ],
  },
  {
    id: "miedo-amigos-se-alejen",
    keywords: ["miedo a que mis amigos se alejen", "miedo a perder amistades al tener pareja", "miedo a perder amigos al tener hijos"],
    termino: "Miedo a que los amigos se alejen",
    capa: "Emoción",
    sentido:
      "Los cambios de etapa —pareja, hijos, mudanzas— naturalmente transforman las amistades. Algunas se distancian, otras se profundizan de forma distinta; el miedo a perderlas todas suele ser mayor que lo que realmente ocurre.",
    enfoque:
      "Identificar qué amistades quieres sostener de forma activa, y hacer un esfuerzo concreto por mantenerlas presentes en la nueva etapa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que los amigos se alejen”)",
    otrasCausas: [
      "Un cambio de etapa reciente que modifica tu disponibilidad de tiempo",
      "Experiencias pasadas donde una amistad sí se perdió tras un cambio similar",
      "Miedo general a la pérdida de vínculos importantes",
    ],
  },
  {
    id: "culpa-mudarse-lejos-familia",
    keywords: ["me siento culpable por mudarme lejos de mi familia", "culpa por dejar a mis padres", "me siento mal por vivir lejos de mi familia"],
    termino: "Culpa por mudarse lejos de la familia",
    capa: "Emoción",
    sentido:
      "Elegir un camino que te aleja geográficamente de tu familia, aunque sea la decisión correcta para tu vida, puede venir acompañada de una culpa profunda, sobre todo si en tu cultura de origen se espera cercanía física constante con los padres.",
    enfoque:
      "Buscar formas concretas y sostenidas de cercanía afectiva que no dependan de la distancia física.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por mudarse lejos de la familia”)",
    otrasCausas: [
      "Una cultura de origen que espera cercanía física constante con la familia",
      "Preocupación por el cuidado futuro de padres que envejecen",
      "Mensajes familiares directos o indirectos sobre “abandonar” el hogar",
    ],
  },
  {
    id: "miedo-opinion-no-hijos",
    keywords: ["miedo a que me juzguen por no querer hijos", "presion social por no tener hijos", "presión social por no tener hijos", "me cuestionan por no ser madre"],
    termino: "Miedo al juicio por no querer tener hijos",
    capa: "Emoción",
    sentido:
      "No desear tener hijos es una decisión de vida tan válida como cualquier otra, aunque en muchos entornos venga acompañada de preguntas insistentes y juicio social. Tu valor como persona no depende de convertirte en madre o padre.",
    enfoque:
      "Preparar respuestas breves y firmes para esas preguntas insistentes, sin sentir que debes justificar tu decisión en profundidad.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al juicio por no querer tener hijos”)",
    otrasCausas: [
      "Un entorno cultural o familiar que asume la maternidad como destino obligado",
      "Preguntas insistentes y repetidas de familiares o conocidos",
      "Comparación constante con otras mujeres de tu edad que sí son madres",
    ],
  },
  {
    id: "modo-arreglo-pareja",
    keywords: ["siempre trato de arreglar los problemas de mi pareja", "quiero resolverle todo a mi pareja", "no puedo ver sufrir a mi pareja sin intervenir"],
    termino: "Modo de “arreglar” constantemente a la pareja",
    capa: "Emoción",
    sentido:
      "Querer resolver cada dificultad que atraviesa tu pareja parte de un lugar de amor, pero puede impedirle procesar sus propias emociones a su manera, y además puede convertir la relación en una dinámica desequilibrada de rescate constante.",
    enfoque:
      "Practicar preguntar “¿quieres que te ayude a resolverlo, o solo necesitas que te escuche?” antes de intervenir.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Modo de arreglar constantemente a la pareja”)",
    otrasCausas: [
      "Un rol de “la que resuelve todo” trasladado también a la relación de pareja",
      "Dificultad para tolerar ver sufrir a alguien que amas sin intervenir",
      "Ansiedad propia que se calma al sentir que “hiciste algo” frente al problema",
    ],
  },
  {
    id: "miedo-pareja-se-aburra",
    keywords: ["miedo a que mi pareja se aburra de mi", "miedo a que mi pareja se aburra de mí", "miedo a volverme aburrida para mi pareja", "miedo a volverme aburrido para mi pareja"],
    termino: "Miedo a que la pareja se aburra de ti",
    capa: "Emoción",
    sentido:
      "El miedo a volverte “aburrida” para tu pareja suele generar un esfuerzo constante por mantenerte interesante, que a la larga resulta agotador y puede alejarte de simplemente ser tú misma dentro de la relación.",
    enfoque:
      "Recordar que la conexión profunda y duradera suele construirse más desde la autenticidad que desde el esfuerzo constante por entretener.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que la pareja se aburra de ti”)",
    otrasCausas: [
      "Inseguridad de fondo sobre tu propio valor dentro de la relación",
      "Una relación pasada donde sí perdiste el interés de tu pareja",
      "Comparación con relaciones que parecen más emocionantes desde afuera",
    ],
  },
  {
    id: "responsabilidad-animo-otros",
    keywords: ["me siento responsable del estado de animo de los demas", "me siento responsable del estado de ánimo de los demás", "si alguien esta mal siento que es mi culpa", "si alguien está mal siento que es mi culpa"],
    termino: "Sentirse responsable del estado de ánimo de los demás",
    capa: "Emoción",
    sentido:
      "Sentir que eres responsable de que las personas cercanas estén bien emocionalmente es agotador y, en el fondo, poco realista: cada persona es responsable de procesar sus propias emociones, aunque tú puedas acompañarla en el camino.",
    enfoque:
      "Practicar distinguir entre acompañar el malestar de alguien y sentirte responsable de resolverlo por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Responsabilidad por el estado de ánimo de otros”)",
    otrasCausas: [
      "Un rol de cuidadora emocional asumido desde temprana edad",
      "Una infancia donde el estado de ánimo de un adulto dependía de tu comportamiento",
      "Alta empatía combinada con dificultad para poner límites emocionales",
    ],
  },
  {
    id: "dificultad-aceptar-envejecimiento-padres",
    keywords: ["me cuesta ver a mis padres envejecer", "no acepto que mis padres estan viejos", "no acepto que mis padres están viejos", "me duele ver a mis padres mas debiles", "me duele ver a mis padres más débiles"],
    termino: "Dificultad para aceptar el envejecimiento de los padres",
    capa: "Emoción",
    sentido:
      "Ver a tus padres envejecer confronta directamente con su vulnerabilidad y con tu propia mortalidad, además de anticipar un cambio de roles donde, poco a poco, empiezas a cuidar a quienes antes te cuidaban a ti.",
    enfoque:
      "Permitirte procesar esta tristeza sin apurarla, mientras también encuentras formas de disfrutar el tiempo presente con ellos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar el envejecimiento de los padres”)",
    otrasCausas: [
      "Un cambio reciente y notorio en la salud o autonomía de un padre o madre",
      "Miedo anticipado a la pérdida futura de una figura parental",
      "Un cambio de roles donde ahora eres tú quien cuida de ellos",
    ],
  },
  {
    id: "miedo-superar-padres",
    keywords: ["miedo a superar a mis padres", "me siento culpable de tener mas exito que mis padres", "me siento culpable de tener más éxito que mis padres"],
    termino: "Miedo a superar a los padres",
    capa: "Emoción",
    sentido:
      "Sentir culpa o incomodidad al alcanzar logros que superan los de tus padres es más común de lo que parece, especialmente si tu éxito se percibe, sin quererlo, como una especie de distanciamiento de tus orígenes o de ellos mismos.",
    enfoque:
      "Recordar que tu éxito puede ser también un homenaje a los sacrificios que ellos hicieron para darte esas oportunidades.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a superar a los padres”)",
    otrasCausas: [
      "Padres con oportunidades limitadas frente a las que tú sí tuviste",
      "Una lealtad familiar invisible hacia no distanciarte de tus orígenes",
      "Comentarios directos o indirectos que generan esta culpa",
    ],
  },
  {
    id: "deuda-pais-origen",
    keywords: ["siento que le debo algo a mi pais de origen", "siento que le debo algo a mi país de origen", "tengo que triunfar por los sacrificios de mi familia", "debo hacerlo bien por quienes se quedaron"],
    termino: "Sentimiento de deuda con el país o la familia de origen",
    capa: "Emoción",
    sentido:
      "Sentir que debes “triunfar” para honrar los sacrificios de tu familia o de quienes se quedaron en tu país de origen es una presión profunda y muy común entre quienes migran, aunque rara vez se habla abiertamente de su peso real.",
    enfoque:
      "Distinguir entre honrar esos sacrificios y cargar con la exigencia de un éxito que, en el fondo, define alguien más.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Deuda con el país o familia de origen”)",
    otrasCausas: [
      "Sacrificios reales y visibles hechos por la familia para tu beneficio",
      "Una migración que implicó dejar atrás a seres queridos importantes",
      "Presión cultural sobre la responsabilidad de “representar bien” a los tuyos",
    ],
  },
  {
    id: "presion-primera-generacion",
    keywords: ["soy la primera generacion en mi familia en estudiar", "soy la primera generación en mi familia en estudiar", "presion de ser la primera en lograrlo", "presión de ser la primera en lograrlo", "no tengo a quien preguntarle como se hace esto"],
    termino: "Presión de ser la primera generación en lograr algo",
    capa: "Emoción",
    sentido:
      "Ser la primera persona de tu familia en estudiar una carrera, migrar, o alcanzar cierto logro implica avanzar sin un mapa claro de referencia, cargando además con la expectativa silenciosa de abrir camino para quienes vienen después.",
    enfoque:
      "Buscar activamente mentores o comunidades que sí tengan experiencia en el camino que estás abriendo, en vez de sentir que debes resolverlo completamente sola.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Presión de ser la primera generación”)",
    otrasCausas: [
      "Falta de referentes familiares cercanos en el camino que estás recorriendo",
      "Presión implícita de abrir camino para hermanos o futuras generaciones",
      "Miedo a fallar sin tener un modelo previo de cómo se hace bien",
    ],
  },
  {
    id: "piel-gallina-emocional",
    keywords: ["piel de gallina sin frio", "piel de gallina sin frío", "se me eriza la piel de la emocion", "se me eriza la piel de la emoción"],
    termino: "Piel de gallina por emoción",
    capa: "Ectodermo",
    sentido:
      "La piel de gallina fuera del contexto del frío suele acompañar a una emoción intensa —asombro, ternura, un recuerdo significativo— como si el cuerpo reaccionara físicamente ante algo que te tocó de forma profunda.",
    enfoque:
      "Identificar qué momento o recuerdo reciente te generó esta reacción física tan directa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Piel de gallina por emoción”)",
    otrasCausas: [
      "Un momento de asombro o ternura genuina vivido recientemente",
      "Un recuerdo significativo que resurge con fuerza emocional",
      "Sensibilidad emocional elevada en la etapa actual",
    ],
  },
  {
    id: "mariposas-estomago-nervios",
    keywords: ["mariposas en el estomago", "mariposas en el estómago", "cosquilleo de nervios en el estomago", "cosquilleo de nervios en el estómago"],
    termino: "Mariposas en el estómago",
    capa: "Endodermo",
    sentido:
      "A diferencia del nudo de ansiedad por dread, las “mariposas” suelen acompañar a una anticipación emocionante —un encuentro esperado, una nueva posibilidad— donde el nerviosismo se mezcla con ilusión genuina.",
    enfoque:
      "Disfrutar esta sensación como parte del entusiasmo, sin necesidad de calmarla del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Mariposas en el estómago”)",
    otrasCausas: [
      "Anticipación emocionante frente a un encuentro o una posibilidad nueva",
      "El inicio de una conexión romántica o de un proyecto ilusionante",
      "Nerviosismo positivo frente a algo que genuinamente deseas",
    ],
  },
  {
    id: "dificultad-aceptar-un-no",
    keywords: ["no acepto un no como respuesta", "me cuesta aceptar el rechazo", "no se aceptar cuando algo no se puede", "no sé aceptar cuando algo no se puede"],
    termino: "Dificultad para aceptar un no como respuesta",
    capa: "Emoción",
    sentido:
      "Costarte aceptar un no —de una persona, una circunstancia, la vida misma— suele reflejar una dificultad más amplia para tolerar la falta de control sobre los resultados, incluso cuando hiciste todo lo que estaba en tus manos.",
    enfoque:
      "Practicar distinguir entre lo que está en tu control y lo que, sencillamente, no depende de ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar un no como respuesta”)",
    otrasCausas: [
      "Una infancia donde insistir eventualmente conseguía lo que se quería",
      "Dificultad general para tolerar la falta de control sobre los resultados",
      "Una autoexigencia que asocia el no con un fracaso personal",
    ],
  },
  {
    id: "miedo-ser-demasiado",
    keywords: ["miedo a ser demasiado intensa", "miedo a ser demasiado intenso", "siento que soy demasiado para los demas", "siento que soy demasiado para los demás", "me dicen que soy exagerada", "me dicen que soy exagerado"],
    termino: "Miedo a ser “demasiado”",
    capa: "Emoción",
    sentido:
      "Sentir que tu intensidad, tu sensibilidad o tu forma de ser son “demasiado” para los demás suele venir de comentarios repetidos que te empujaron a hacerte más pequeña. Tu intensidad no es un defecto a corregir; es parte legítima de quién eres.",
    enfoque:
      "Buscar vínculos y espacios donde tu forma de ser, sin filtrar, sea recibida con aprecio genuino en vez de crítica.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser demasiado”)",
    otrasCausas: [
      "Comentarios repetidos sobre tu intensidad o sensibilidad",
      "Comparación con personas percibidas como más “calmadas” o mesuradas",
      "Una infancia donde tu forma expresiva de ser generaba incomodidad en el entorno",
    ],
  },
  {
    id: "relacion-por-costumbre",
    keywords: ["sigo en mi relacion por costumbre", "sigo en mi relación por costumbre", "estoy con mi pareja por rutina no por amor", "no se si sigo enamorada o es costumbre", "no sé si sigo enamorada o es costumbre"],
    termino: "Sentir que estás en la relación por costumbre",
    capa: "Emoción",
    sentido:
      "Notar que sostienes una relación más por rutina y comodidad que por deseo activo es una señal importante que vale la pena explorar, en vez de ignorar, aunque el camino que revele no sea sencillo.",
    enfoque:
      "Distinguir si esto refleja una etapa natural y estable de la relación, o una desconexión más profunda que necesita atención directa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Relación por costumbre”)",
    otrasCausas: [
      "Una relación larga que evolucionó hacia la rutina sin espacios de renovación",
      "Miedo al cambio que dificulta cuestionar el estado actual de la relación",
      "Comodidad material o logística que pesa más que la conexión emocional",
    ],
  },
  {
    id: "miedo-arrepentimiento",
    keywords: ["miedo a arrepentirme de mi decision", "miedo a arrepentirme de mi decisión", "y si me arrepiento despues", "y si me arrepiento después", "miedo a elegir mal y arrepentirme"],
    termino: "Miedo al arrepentimiento",
    capa: "Emoción",
    sentido:
      "El miedo a arrepentirte de una decisión importante puede paralizarte frente a cualquier elección, ya que casi ninguna decisión de vida viene con garantía total. Vale la pena decidir con la información que tienes ahora, no con la certeza imposible del futuro.",
    enfoque:
      "Recordar que incluso las decisiones que no resultan como se esperaba suelen traer aprendizajes que no habrías tenido de otra forma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo al arrepentimiento”)",
    otrasCausas: [
      "Un arrepentimiento pasado real que dejó una marca profunda",
      "Perfeccionismo aplicado a la toma de decisiones de vida",
      "Miedo a no poder deshacer una elección importante",
    ],
  },
  {
    id: "eleccion-carrera-equivocada",
    keywords: ["elegi mal mi carrera", "elegí mal mi carrera", "siento que estudie algo que no me gusta", "siento que estudié algo que no me gusta", "no me identifico con mi profesion", "no me identifico con mi profesión"],
    termino: "Sentir que elegiste la carrera equivocada",
    capa: "Emoción",
    sentido:
      "Sentir que tu profesión actual no refleja quién eres no significa que el tiempo invertido en ella haya sido en vano; los conocimientos y habilidades adquiridos suelen ser transferibles hacia un nuevo camino, aunque implique un giro importante.",
    enfoque:
      "Identificar qué elementos específicos de tu formación actual sí podrías aprovechar en una dirección nueva que te haga más sentido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Elección de carrera equivocada”)",
    otrasCausas: [
      "Una decisión de carrera tomada a edad temprana bajo presión familiar o social",
      "Falta de información real sobre la profesión antes de elegirla",
      "Un cambio genuino de intereses con el paso de los años",
    ],
  },
  {
    id: "necesidad-cambio-radical",
    keywords: ["necesito un cambio radical en mi vida", "quiero empezar de cero en todo", "siento que debo cambiarlo todo"],
    termino: "Necesidad de un cambio radical de vida",
    capa: "Emoción",
    sentido:
      "El impulso de cambiarlo todo de golpe —trabajo, ciudad, relaciones— suele surgir en momentos de fuerte insatisfacción acumulada. Vale la pena distinguir qué cambios responden a un deseo genuino y cuáles son, en el fondo, un intento de escapar de algo sin resolverlo.",
    enfoque:
      "Identificar un cambio concreto y manejable para empezar, en vez de intentar transformarlo todo simultáneamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de un cambio radical de vida”)",
    otrasCausas: [
      "Una insatisfacción acumulada durante mucho tiempo sin atender",
      "Una crisis de sentido o propósito en la etapa actual",
      "El deseo de escapar de una situación difícil sin resolverla directamente",
    ],
  },
  {
    id: "dificultad-aceptar-ayuda-hijos",
    keywords: ["me cuesta aceptar ayuda de mis hijos", "no quiero ser una carga para mis hijos", "me cuesta que mis hijos me cuiden a mi"],
    termino: "Dificultad para aceptar ayuda de los hijos ya adultos",
    capa: "Emoción",
    sentido:
      "Cuando los roles se invierten y los hijos comienzan a cuidar de sus padres, puede resultar difícil aceptar esa ayuda sin sentir que se pierde autonomía. Recibir cuidado de quienes cuidaste antes también puede vivirse como un acto de amor recíproco, no solo como una pérdida.",
    enfoque:
      "Permitirte recibir ese cuidado como una forma más de la relación de amor que ya construyeron juntos, sin que reste valor a tu autonomía.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar ayuda de los hijos adultos”)",
    otrasCausas: [
      "Miedo a perder autonomía o independencia en esta nueva etapa",
      "Una identidad muy ligada al rol de cuidadora, no de cuidada",
      "Incomodidad general para recibir ayuda de cualquier persona",
    ],
  },
  {
    id: "miedo-carga-vejez",
    keywords: ["miedo a ser una carga para mis hijos en la vejez", "miedo a ser una carga cuando sea mayor", "no quiero molestar cuando sea vieja", "no quiero molestar cuando sea viejo"],
    termino: "Miedo a ser una carga en la vejez",
    capa: "Emoción",
    sentido:
      "El miedo a convertirte en una carga para tus hijos al envejecer combina el miedo a depender de otros con el amor genuino de no querer complicarles la vida, aunque en la práctica, cuidar de un padre o madre mayor suele vivirse también como un privilegio, no solo como un peso.",
    enfoque:
      "Conversar abiertamente con tus hijos sobre tus deseos para esa etapa, en vez de asumir en silencio que serás una carga.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser una carga en la vejez”)",
    otrasCausas: [
      "Haber cuidado tú misma de un padre o madre mayor en el pasado",
      "Una identidad muy ligada a la independencia y la autosuficiencia",
      "Miedo a que el cuidado necesario tense la relación con los hijos",
    ],
  },
  {
    id: "necesidad-sentirse-util",
    keywords: ["necesito sentirme util", "necesito sentirme útil", "siento que ya no sirvo para nada", "sin trabajo no se quien soy", "sin trabajo no sé quién soy"],
    termino: "Necesidad de sentirse útil",
    capa: "Emoción",
    sentido:
      "Sentir que tu valor depende de qué tan útil eres —en el trabajo, en la familia— puede volverse doloroso en etapas donde ese rol cambia, como la jubilación o cuando los hijos crecen. Tu valor como persona no depende únicamente de tu utilidad funcional.",
    enfoque:
      "Identificar formas nuevas de aportar valor que no dependan del rol o la utilidad que tenías antes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de sentirse útil”)",
    otrasCausas: [
      "Un cambio de etapa que modificó tu rol habitual de utilidad",
      "Una identidad construida principalmente en función de ser productiva",
      "Mensajes culturales que asocian el valor personal con la utilidad funcional",
    ],
  },
  {
    id: "dificultad-aceptar-jubilacion",
    keywords: ["me cuesta aceptar la jubilacion", "me cuesta aceptar la jubilación", "no se que hacer con mi tiempo libre ahora que me jubile", "no sé qué hacer con mi tiempo libre ahora que me jubilé"],
    termino: "Dificultad para aceptar la jubilación",
    capa: "Emoción",
    sentido:
      "La jubilación, aunque deseada, puede confrontar con una pregunta incómoda: ¿quién soy sin mi trabajo? Es una transición de identidad tan real como cualquier otra etapa de cambio de vida, y merece el mismo espacio para procesarse.",
    enfoque:
      "Explorar qué actividades o proyectos, más allá del trabajo, podrían darte una nueva estructura y sentido en esta etapa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar la jubilación”)",
    otrasCausas: [
      "Una identidad muy centrada en el rol profesional durante décadas",
      "Falta de proyectos o intereses desarrollados fuera del trabajo",
      "Miedo a la pérdida de estructura y propósito diario",
    ],
  },
  {
    id: "dificultad-disfrutar-logros-ajenos",
    keywords: ["me cuesta alegrarme por los logros de otros", "siento envidia cuando a otros les va bien", "no logro disfrutar el exito ajeno", "no logro disfrutar el éxito ajeno"],
    termino: "Dificultad para disfrutar los logros de otras personas",
    capa: "Emoción",
    sentido:
      "Sentir una punzada incómoda ante el éxito ajeno, incluso de personas que quieres, no te hace mala persona; suele ser señal de una comparación constante que vale la pena trabajar, en vez de un reflejo de falta de cariño hacia esa persona.",
    enfoque:
      "Practicar separar el logro del otro de tu propio proceso; ambos pueden avanzar en paralelo sin restarse mutuamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para disfrutar los logros ajenos”)",
    otrasCausas: [
      "Comparación constante como forma habitual de medir tu propio progreso",
      "Una meta propia estancada que se activa al ver avanzar a otros",
      "Un entorno de origen muy competitivo entre hermanos o compañeros",
    ],
  },
  {
    id: "necesidad-aprobacion-mentor",
    keywords: ["necesito la aprobacion de mi mentor", "necesito la aprobación de mi mentor", "busco la aprobacion de mi jefe", "busco la aprobación de mi jefe", "necesito que mi maestro este orgulloso", "necesito que mi maestro esté orgulloso"],
    termino: "Necesidad de aprobación de un mentor o figura de autoridad",
    capa: "Emoción",
    sentido:
      "Buscar la aprobación de una figura de autoridad que admiras —un mentor, un jefe, un maestro— es natural, pero puede volverse pesado cuando tus decisiones profesionales empiezan a girar más en torno a complacerla que a tu propio criterio.",
    enfoque:
      "Identificar qué decisiones tomas realmente por convicción propia, y cuáles principalmente para obtener esa aprobación específica.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de aprobación de un mentor”)",
    otrasCausas: [
      "Una figura de autoridad cuya opinión valoras profundamente",
      "Poco reconocimiento recibido en otras áreas de tu vida",
      "Una infancia donde el reconocimiento de figuras de autoridad era escaso",
    ],
  },
  {
    id: "miedo-decisiones-irreversibles",
    keywords: ["miedo a tomar decisiones irreversibles", "miedo a que esta decision no tenga vuelta atras", "miedo a que esta decisión no tenga vuelta atrás"],
    termino: "Miedo a tomar decisiones irreversibles",
    capa: "Emoción",
    sentido:
      "Las decisiones que sientes que no tienen vuelta atrás generan una presión mayor a la habitual. Vale la pena revisar, sin embargo, cuántas decisiones de la vida son realmente tan irreversibles como parecen en el momento de tomarlas.",
    enfoque:
      "Investigar objetivamente qué tan reversible es realmente esta decisión, más allá de cómo se siente en el momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a tomar decisiones irreversibles”)",
    otrasCausas: [
      "Una decisión pasada verdaderamente irreversible que dejó consecuencias importantes",
      "Perfeccionismo que magnifica el peso de cualquier elección",
      "Miedo general a perder el control sobre el resultado de tu vida",
    ],
  },
  {
    id: "sentimiento-vida-a-medias",
    keywords: ["siento que vivo una vida a medias", "siento que no estoy viviendo del todo", "siento que me falta vivir de verdad"],
    termino: "Sentimiento de estar viviendo una vida a medias",
    capa: "Emoción",
    sentido:
      "La sensación de no estar viviendo del todo, de estar solo “pasando” los días, suele ser una señal importante de que algo en tu forma actual de vivir no está alineado con lo que realmente deseas experimentar.",
    enfoque:
      "Identificar una sola cosa concreta que, si la incorporaras a tu vida actual, te haría sentir más plenamente viva.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentimiento de vivir una vida a medias”)",
    otrasCausas: [
      "Una rutina que prioriza lo funcional sobre lo significativo",
      "Miedo a tomar los riesgos necesarios para vivir de forma más plena",
      "Una desconexión gradual de lo que alguna vez te dio sentido",
    ],
  },
  {
    id: "sensibilidad-luz",
    keywords: ["sensibilidad a la luz", "me molesta la luz", "fotofobia"],
    termino: "Sensibilidad a la luz",
    capa: "Ectodermo",
    sentido:
      "La sensibilidad excesiva a la luz, más allá de causas físicas por revisar, a veces coincide con una etapa donde prefieres pasar más desapercibida, evitando la exposición o la atención directa sobre ti.",
    enfoque:
      "Notar si hay una situación reciente donde preferirías no ser el centro de atención.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sensibilidad a la luz”)",
    otrasCausas: [
      "Fatiga ocular acumulada que conviene revisar con un especialista",
      "Preferencia reciente por pasar desapercibida o evitar exposición",
      "Migrañas u otras causas físicas que siempre deben evaluarse",
    ],
  },
  {
    id: "aprieta-dientes-dia",
    keywords: ["aprieto los dientes durante el dia", "aprieto los dientes durante el día", "tenso la mandibula todo el dia", "tenso la mandíbula todo el día"],
    termino: "Apretar los dientes durante el día",
    capa: "Mesodermo",
    sentido:
      "A diferencia del bruxismo nocturno, apretar los dientes durante el día suele ser una respuesta consciente, aunque automática, frente a una tensión o frustración que se sostiene activamente a lo largo de la jornada.",
    enfoque:
      "Notar en qué momentos del día aprietas más la mandíbula, y qué situación la acompaña.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Apretar los dientes durante el día”)",
    otrasCausas: [
      "Frustración sostenida durante la jornada sin expresarse",
      "Concentración intensa que se somatiza en la mandíbula",
      "Tensión general acumulada durante el día laboral",
    ],
  },
  {
    id: "manos-inquietas",
    keywords: ["manos inquietas", "no puedo quedarme quieta con las manos", "no puedo quedarme quieto con las manos", "necesito tener las manos ocupadas"],
    termino: "Manos inquietas",
    capa: "Ectodermo",
    sentido:
      "La necesidad constante de mantener las manos ocupadas —jugando con algo, moviéndolas sin parar— suele acompañar a una ansiedad de fondo que busca una salida física, aunque sea pequeña y casi automática.",
    enfoque:
      "Identificar qué ansiedad de fondo podría estar buscando esta salida a través de tus manos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos inquietas”)",
    otrasCausas: [
      "Ansiedad de fondo que busca una salida física constante",
      "Dificultad para sostener la quietud durante periodos prolongados",
      "Un hábito nervioso desarrollado en etapas de estrés anteriores",
    ],
  },
  {
    id: "miedo-hablar-idioma-no-nativo",
    keywords: ["miedo a hablar en un idioma que no es el mio", "miedo a hablar en un idioma que no es el mío", "me da verguenza mi acento", "me da vergüenza mi acento", "miedo a equivocarme al hablar otro idioma"],
    termino: "Miedo a hablar en un idioma no nativo",
    capa: "Emoción",
    sentido:
      "El miedo a equivocarte al hablar en un idioma distinto al tuyo suele venir acompañado de vergüenza por el acento o por errores gramaticales, aunque comunicarte en una segunda lengua, con imperfecciones incluidas, es en sí mismo un logro considerable.",
    enfoque:
      "Recordar que la mayoría de las personas valoran mucho más el esfuerzo de comunicarse que la perfección gramatical.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a hablar en un idioma no nativo”)",
    otrasCausas: [
      "Comentarios pasados sobre tu acento o forma de hablar",
      "Miedo al juicio en entornos laborales o académicos exigentes",
      "Comparación con hablantes nativos del idioma",
    ],
  },
  {
    id: "necesidad-demostrar-migracion-valio-pena",
    keywords: ["necesito demostrar que migrar valio la pena", "necesito demostrar que migrar valió la pena", "tengo que justificar haberme ido de mi pais", "tengo que justificar haberme ido de mi país"],
    termino: "Necesidad de demostrar que la migración valió la pena",
    capa: "Emoción",
    sentido:
      "Sentir que debes demostrar, ante ti misma o ante otros, que dejar tu país fue la decisión correcta puede generar una presión constante por mostrar solo los logros, ocultando las dificultades reales del proceso migratorio.",
    enfoque:
      "Recordar que el valor de una decisión de vida no depende de tener que justificarla constantemente ante nadie.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de demostrar que la migración valió la pena”)",
    otrasCausas: [
      "Comentarios de quienes se quedaron cuestionando la decisión de migrar",
      "Presión propia por justificar el sacrificio del proceso migratorio",
      "Comparación con historias de migración que parecen más exitosas",
    ],
  },
  {
    id: "impostor-profesional",
    keywords: ["siento que finjo saber de mi trabajo", "no me siento capacitada para mi puesto", "no me siento capacitado para mi puesto", "siento que no deberia tener este cargo", "siento que no debería tener este cargo"],
    termino: "Sentirse un impostor en el ámbito profesional",
    capa: "Emoción",
    sentido:
      "Sentir que no mereces tu puesto actual, incluso con la preparación y experiencia que sí tienes, es una de las formas más comunes del síndrome del impostor, especialmente en roles de mayor responsabilidad o visibilidad.",
    enfoque:
      "Hacer una lista objetiva de las razones concretas por las que fuiste seleccionada para ese puesto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse un impostor en el ámbito profesional”)",
    otrasCausas: [
      "Un ascenso o cambio de rol reciente con mayores responsabilidades",
      "Comparación con colegas que parecen más seguros de sí mismos",
      "Un entorno laboral muy exigente o poco validante",
    ],
  },
  {
    id: "necesidad-credenciales-validez",
    keywords: ["necesito un titulo para sentirme valida", "necesito un título para sentirme válida", "sin un certificado no me siento capacitada", "sin un certificado no me siento capacitado"],
    termino: "Necesidad de credenciales para sentirse válida",
    capa: "Emoción",
    sentido:
      "Sentir que necesitas un título o certificación específica para que tu conocimiento “cuente” de verdad puede hacerte subestimar la experiencia real y el aprendizaje que ya tienes, aunque no venga acompañado de un papel formal.",
    enfoque:
      "Reconocer el valor de tu experiencia práctica, incluso mientras trabajas en obtener una credencial adicional si así lo deseas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de credenciales para sentirse válida”)",
    otrasCausas: [
      "Un entorno que valora fuertemente los títulos formales por encima de la experiencia",
      "Comparación con colegas que sí cuentan con esas credenciales",
      "Inseguridad general sobre la legitimidad de tu propio conocimiento",
    ],
  },
  {
    id: "dificultad-delegar",
    keywords: ["no se delegar tareas", "no sé delegar tareas", "prefiero hacerlo todo yo misma", "prefiero hacerlo todo yo mismo", "no confio en que otros lo hagan bien", "no confío en que otros lo hagan bien"],
    termino: "Dificultad para delegar tareas",
    capa: "Emoción",
    sentido:
      "Costarte delegar, incluso cuando estás sobrecargada, suele reflejar una creencia de que solo tú puedes hacer las cosas correctamente, lo cual es agotador de sostener y, además, le resta a otros la oportunidad de aprender y aportar.",
    enfoque:
      "Practicar delegar una tarea pequeña y de bajo riesgo, tolerando que se haga de forma distinta a como tú la harías.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para delegar tareas”)",
    otrasCausas: [
      "Una creencia de que solo tú puedes garantizar el resultado correcto",
      "Experiencias pasadas donde delegar no salió como esperabas",
      "Necesidad de control que se extiende también al trabajo de otros",
    ],
  },
  {
    id: "miedo-reemplazo-tecnologia",
    keywords: ["miedo a que la tecnologia me reemplace", "miedo a que la tecnología me reemplace", "miedo a que la inteligencia artificial me quite el trabajo", "miedo a volverme obsoleta en mi trabajo", "miedo a volverme obsoleto en mi trabajo"],
    termino: "Miedo a ser reemplazada por la tecnología",
    capa: "Emoción",
    sentido:
      "El miedo a que la tecnología o la inteligencia artificial vuelvan obsoleto tu trabajo es una preocupación real y actual para muchas profesiones. Vale la pena canalizar esa inquietud hacia identificar qué habilidades humanas seguirán siendo insustituibles.",
    enfoque:
      "Identificar qué aspectos de tu trabajo dependen de tu criterio humano, tu relación con otros o tu creatividad, difíciles de automatizar por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser reemplazada por la tecnología”)",
    otrasCausas: [
      "Cambios reales y rápidos en tu industria por la automatización",
      "Poca actualización reciente en nuevas herramientas o habilidades",
      "Ansiedad generalizada frente a los cambios tecnológicos acelerados",
    ],
  },
  {
    id: "sentirse-desactualizada",
    keywords: ["me siento desactualizada", "me siento desactualizado", "ya no entiendo las nuevas tecnologias", "ya no entiendo las nuevas tecnologías", "siento que me quede atras con los cambios", "siento que me quedé atrás con los cambios"],
    termino: "Sentirse desactualizada",
    capa: "Emoción",
    sentido:
      "Sentir que te quedaste atrás frente a cambios rápidos —tecnológicos, culturales, laborales— es una experiencia cada vez más común. No refleja una falla personal, sino el ritmo acelerado con el que cambia el entorno actual para todas las personas.",
    enfoque:
      "Elegir una sola herramienta o cambio reciente para aprender a tu propio ritmo, sin la presión de dominarlo todo de golpe.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse desactualizada”)",
    otrasCausas: [
      "Cambios acelerados en tu campo laboral o en la tecnología cotidiana",
      "Comparación con generaciones más jóvenes que se adaptan con más rapidez",
      "Poco tiempo o espacio disponible para actualizarte en nuevas herramientas",
    ],
  },
  {
    id: "culpa-privilegio-propio",
    keywords: ["me siento culpable por mi privilegio", "siento culpa por tener mas oportunidades que otros", "siento culpa por tener más oportunidades que otros", "me siento mal por lo que tengo cuando otros no tienen"],
    termino: "Culpa por el propio privilegio",
    capa: "Emoción",
    sentido:
      "Sentir culpa por las oportunidades o recursos que tienes, mientras otros a tu alrededor no los tienen, es una emoción común y válida, aunque no siempre productiva si te paraliza en vez de movilizarte hacia una acción concreta.",
    enfoque:
      "Canalizar esa culpa hacia una acción específica —apoyar, compartir, contribuir— en vez de solo cargar con el sentimiento sin salida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por el propio privilegio”)",
    otrasCausas: [
      "Una conciencia reciente y genuina sobre desigualdades cercanas a ti",
      "Comparación directa con personas de tu entorno con menos oportunidades",
      "Valores personales que priorizan fuertemente la justicia social",
    ],
  },
  {
    id: "ansiedad-ecologica",
    keywords: ["ansiedad por el cambio climatico", "ansiedad por el cambio climático", "me angustia el futuro del planeta", "ansiedad ecologica", "ansiedad ecológica"],
    termino: "Ansiedad ecológica",
    capa: "Emoción",
    sentido:
      "La preocupación profunda por el futuro del planeta es una respuesta emocional genuina frente a una crisis real, no una exageración. El reto es encontrar una forma de canalizar esa preocupación en acciones concretas, sin que se convierta en una angustia paralizante.",
    enfoque:
      "Identificar una acción pequeña y sostenible que esté dentro de tu control, en vez de cargar con la responsabilidad de resolverlo todo tú misma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ansiedad ecológica”)",
    otrasCausas: [
      "Una exposición constante a noticias sobre la crisis climática",
      "Sentimiento de impotencia frente a un problema de escala global",
      "Valores personales fuertemente ligados al cuidado del medio ambiente",
    ],
  },
  {
    id: "impotencia-noticias",
    keywords: ["me siento impotente al ver las noticias", "las noticias me generan mucha angustia", "no puedo dejar de ver noticias negativas", "doomscrolling"],
    termino: "Sentimiento de impotencia frente a las noticias",
    capa: "Emoción",
    sentido:
      "Consumir noticias difíciles de forma constante, sin poder hacer nada directo al respecto, genera una sensación de impotencia acumulada que rara vez se resuelve viendo más contenido, sino estableciendo límites conscientes de exposición.",
    enfoque:
      "Definir horarios específicos y limitados para informarte, en vez de mantener el consumo de noticias abierto todo el día.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Impotencia frente a las noticias”)",
    otrasCausas: [
      "Exposición constante y sin límites a contenido noticioso negativo",
      "Sentimiento de impotencia frente a problemas de gran escala",
      "Ansiedad general que encuentra en las noticias un foco constante",
    ],
  },
  {
    id: "necesidad-ocultar-origen-humilde",
    keywords: ["oculto de donde vengo", "me da verguenza mi origen humilde", "me da vergüenza mi origen humilde", "escondo que crecí sin recursos", "escondo que creci sin recursos"],
    termino: "Necesidad de ocultar el propio origen humilde",
    capa: "Emoción",
    sentido:
      "Sentir la necesidad de esconder de dónde vienes, especialmente en espacios donde percibes que tu origen podría ser juzgado, suele generar una desconexión incómoda entre quien fuiste y quien te presentas ser ahora.",
    enfoque:
      "Identificar qué fortalezas concretas te dio ese origen, en vez de vivirlo únicamente como algo que ocultar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de ocultar el origen humilde”)",
    otrasCausas: [
      "Un entorno actual donde el origen socioeconómico se juzga abiertamente",
      "Comentarios pasados que generaron vergüenza sobre tu procedencia",
      "Movilidad social reciente que te distancia de tu entorno original",
    ],
  },
  {
    id: "pesadez-pecho",
    keywords: ["pesadez en el pecho", "siento un peso en el pecho", "peso constante en el pecho"],
    termino: "Pesadez en el pecho",
    capa: "Mesodermo",
    sentido:
      "A diferencia de la opresión aguda, la pesadez sostenida en el pecho suele acompañar a una tristeza o una carga emocional que llevas sosteniendo durante mucho tiempo, sin una salida clara todavía.",
    enfoque:
      "Identificar qué carga emocional larga llevas sosteniendo, y a quién podrías compartírsela para aligerarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Pesadez en el pecho”)",
    otrasCausas: [
      "Una tristeza sostenida durante mucho tiempo sin procesar",
      "Una carga emocional que llevas sosteniendo en silencio",
      "Agotamiento general que se somatiza en el pecho",
    ],
  },
  {
    id: "vacio-estomago-sin-hambre",
    keywords: ["vacio en el estomago sin hambre", "vacío en el estómago sin hambre", "siento el estomago vacio de tristeza", "siento el estómago vacío de tristeza"],
    termino: "Vacío en el estómago sin hambre",
    capa: "Endodermo",
    sentido:
      "Sentir un vacío en el estómago que no se relaciona con el hambre suele acompañar a una pérdida o una tristeza reciente —una sensación física de “falta algo” que refleja lo que también se siente por dentro.",
    enfoque:
      "Permitirte nombrar qué es exactamente lo que sientes que falta en este momento de tu vida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vacío en el estómago sin hambre”)",
    otrasCausas: [
      "Una pérdida o tristeza reciente en proceso",
      "Ansiedad que se somatiza como una sensación de vacío físico",
      "Un cambio de rutina o alimentación que conviene revisar también",
    ],
  },
  {
    id: "manos-agrietadas",
    keywords: ["manos agrietadas", "se me agrietan las manos", "piel partida en las manos"],
    termino: "Manos agrietadas",
    capa: "Ectodermo",
    sentido:
      "Las manos agrietadas, más allá del clima o el lavado frecuente, a veces coinciden con una etapa de mucho “hacer” por otros —cuidar, trabajar, sostener— con poco tiempo dedicado al propio cuidado.",
    enfoque:
      "Identificar un pequeño gesto de cuidado físico hacia ti misma que puedas incorporar esta semana.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos agrietadas”)",
    otrasCausas: [
      "Una etapa de mucho cuidado hacia otros con poco autocuidado",
      "Factores ambientales como frío o lavado frecuente de manos",
      "Sobrecarga de tareas físicas manuales recientes",
    ],
  },
  {
    id: "suspiros-frecuentes",
    keywords: ["suspiro mucho", "suspiros frecuentes", "no dejo de suspirar"],
    termino: "Suspiros frecuentes",
    capa: "Ectodermo",
    sentido:
      "Suspirar con frecuencia es una forma natural del cuerpo de liberar tensión acumulada y regular la respiración; suele intensificarse en etapas de tristeza, cansancio o resignación silenciosa frente a una situación difícil.",
    enfoque:
      "Notar qué situación reciente sientes que solo puedes “soltar” a través de un suspiro.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Suspiros frecuentes”)",
    otrasCausas: [
      "Tristeza o resignación silenciosa frente a una situación difícil",
      "Cansancio acumulado que el cuerpo libera a través de la respiración",
      "Una carga emocional sostenida sin otra vía de expresión",
    ],
  },
  {
    id: "tiempo-perdido-recuperar",
    keywords: ["siento que tengo tiempo perdido que recuperar", "quiero recuperar el tiempo que perdi", "quiero recuperar el tiempo que perdí"],
    termino: "Necesidad de recuperar el tiempo “perdido”",
    capa: "Emoción",
    sentido:
      "Sentir que debes “recuperar” años que consideras perdidos —en una relación, una carrera, una etapa— suele generar una presión adicional innecesaria, como si el tiempo vivido de otra forma no hubiera tenido ningún valor propio.",
    enfoque:
      "Identificar qué aprendiste durante esa etapa, en vez de solo enfocarte en el tiempo que sientes que “se fue”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de recuperar el tiempo perdido”)",
    otrasCausas: [
      "Una etapa larga dedicada a algo que ya no sientes que valió la pena",
      "Comparación con el avance de otras personas de tu edad",
      "Un cambio de rumbo reciente que activa esta sensación de urgencia",
    ],
  },
  {
    id: "dificultad-aceptar-no-controlar-crianza",
    keywords: ["no puedo controlar como resulta mi hijo", "no puedo controlar como resulta mi hija", "hice todo bien y aun asi salio mal", "hice todo bien y aún así salió mal"],
    termino: "Dificultad para aceptar que no se puede controlar el resultado de la crianza",
    capa: "Emoción",
    sentido:
      "Por más esfuerzo y amor que pongas en la crianza, cada hijo tiene su propio temperamento, decisiones y camino. Aceptar esto no es rendirte; es reconocer que criar bien no garantiza un resultado específico, y que eso no depende solo de ti.",
    enfoque:
      "Enfocarte en lo que sí está en tus manos —tu presencia, tu amor consistente— en vez de en el resultado final que no puedes controlar del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar que no se controla el resultado de la crianza”)",
    otrasCausas: [
      "Una situación reciente con un hijo que no salió como esperabas",
      "Autoexigencia alta trasladada también al rol de crianza",
      "Comparación con otras familias que parecen tener mejores resultados",
    ],
  },
  {
    id: "sacrificar-carrera-familia",
    keywords: ["sacrifique mi carrera por mi familia", "sacrifiqué mi carrera por mi familia", "deje mi trabajo por mis hijos", "dejé mi trabajo por mis hijos", "siento que perdi mi carrera por ser madre", "siento que perdí mi carrera por ser madre"],
    termino: "Sentir que sacrificaste tu carrera por la familia",
    capa: "Emoción",
    sentido:
      "Haber priorizado a tu familia por encima de tu desarrollo profesional es una decisión válida y a menudo necesaria, aunque puede dejar una sensación de pérdida que merece espacio para procesarse, sin que eso reste valor a lo que sí construiste en casa.",
    enfoque:
      "Explorar si hay una forma, aunque sea pequeña, de retomar algo de ese desarrollo profesional en esta etapa actual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sacrificar la carrera por la familia”)",
    otrasCausas: [
      "Una decisión de priorizar el cuidado familiar sobre el desarrollo profesional",
      "Falta de apoyo o alternativas reales para sostener ambos a la vez",
      "Comparación con otras mujeres que sí sostuvieron su carrera activa",
    ],
  },
  {
    id: "necesidad-reconocimiento-trabajo-hogar",
    keywords: ["nadie valora todo lo que hago en la casa", "el trabajo del hogar no se reconoce", "siento que mi trabajo en casa no cuenta"],
    termino: "Necesidad de reconocimiento por el trabajo del hogar",
    capa: "Emoción",
    sentido:
      "El trabajo doméstico y de cuidado, aunque sostiene por completo la vida cotidiana de una familia, rara vez se reconoce con el mismo peso que un trabajo remunerado. Sentir esta falta de reconocimiento es una respuesta válida a una desigualdad real, no una exageración.",
    enfoque:
      "Nombrar explícitamente a tu familia el trabajo específico que realizas, en vez de esperar que se note por sí solo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Reconocimiento por el trabajo del hogar”)",
    otrasCausas: [
      "Una distribución desigual del reconocimiento entre el trabajo remunerado y el doméstico",
      "Falta de conversaciones explícitas sobre el valor del trabajo en casa",
      "Un entorno cultural que invisibiliza el trabajo de cuidado",
    ],
  },
  {
    id: "sanar-como-obligacion",
    keywords: ["siento que sanar es otra obligacion mas", "siento que sanar es otra obligación más", "me canso de trabajar en mi misma todo el tiempo", "me canso de trabajar en mí misma todo el tiempo", "la sanacion se siente como una tarea pendiente", "la sanación se siente como una tarea pendiente"],
    termino: "Sentir que sanar se volvió otra obligación más",
    capa: "Emoción",
    sentido:
      "Es posible cansarse incluso del propio proceso de sanación, cuando se convierte en una lista más de tareas pendientes en vez de un espacio de alivio. Sanar no tiene que ser perfecto ni constante; también está permitido tomar pausas del propio proceso de crecimiento.",
    enfoque:
      "Permitirte una pausa consciente del trabajo interior, sin culpa, confiando en que el proceso sigue ahí cuando quieras retomarlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sanar como obligación”)",
    otrasCausas: [
      "Un proceso de crecimiento personal vivido con la misma exigencia que otras metas",
      "Sobrecarga general que también alcanza al tiempo dedicado al autoconocimiento",
      "Comparación con el ritmo de sanación de otras personas",
    ],
  },
  {
    id: "miedo-querido-solo-por-dar",
    keywords: ["miedo a que me quieran solo por lo que doy", "miedo a que me quieran solo por lo que hago por los demas", "miedo a que me quieran solo por lo que hago por los demás", "temo que sin dar nada nadie me quiera"],
    termino: "Miedo a ser querida solo por lo que das",
    capa: "Emoción",
    sentido:
      "El miedo a que tu valor dependa únicamente de cuánto das —ayuda, cuidado, favores— suele generar una prueba constante e imposible de superar: si dejaras de dar por completo, ¿seguirían queriéndote igual?",
    enfoque:
      "Practicar, con alguien de confianza, dejarte cuidar sin dar nada a cambio en ese momento, y observar que el vínculo se sostiene igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a ser querida solo por lo que das”)",
    otrasCausas: [
      "Un vínculo temprano donde el afecto se sintió condicionado a dar o ayudar",
      "Una identidad construida principalmente en función de ser útil a otros",
      "Experiencias donde dejar de dar coincidió con el distanciamiento de alguien",
    ],
  },
  {
    id: "dificultad-aceptar-ayuda-profesional",
    keywords: ["me cuesta aceptar que necesito ayuda profesional", "me da verguenza pedir apoyo", "me da vergüenza pedir apoyo", "siento que pedir ayuda es debilidad"],
    termino: "Dificultad para aceptar la necesidad de ayuda profesional",
    capa: "Emoción",
    sentido:
      "Reconocer que necesitas acompañamiento profesional no es debilidad; es una de las formas más valientes de cuidarte. Buscar ayuda cuando algo te sobrepasa es exactamente lo que haría alguien que se toma en serio su propio bienestar.",
    enfoque:
      "Ver la búsqueda de ayuda profesional como un acto de fortaleza, no como un último recurso frente al fracaso personal.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar ayuda profesional”)",
    otrasCausas: [
      "Estigma cultural o familiar en torno a la salud emocional y el acompañamiento",
      "Una creencia de que pedir ayuda equivale a admitir debilidad",
      "Miedo al juicio de otros al reconocer que necesitas apoyo",
    ],
  },
  {
    id: "comparacion-vida-resuelta",
    keywords: ["siento que todo el mundo tiene su vida resuelta menos yo", "todos parecen tener todo claro menos yo", "siento que me quede atras en la vida", "siento que me quedé atrás en la vida"],
    termino: "Sentir que todos tienen la vida resuelta menos tú",
    capa: "Emoción",
    sentido:
      "Comparar tu propio proceso interno, con toda su incertidumbre, con la versión pulida que otros muestran hacia afuera es una comparación desigual desde el inicio. Casi nadie tiene realmente todo resuelto; solo lo aparenta mejor que tú en ese momento.",
    enfoque:
      "Recordar que estás comparando tu detrás de cámaras con el escenario final de otra persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentir que todos tienen la vida resuelta menos tú”)",
    otrasCausas: [
      "Comparación constante con la imagen pública de otras personas",
      "Una etapa propia de incertidumbre genuina en varias áreas de vida",
      "Poca visibilidad de las dificultades reales que otros también enfrentan",
    ],
  },
  {
    id: "permiso-alegria-en-dolor",
    keywords: ["no me permito sentir alegria en medio del dolor", "no me permito sentir alegría en medio del dolor", "me siento culpable de reirme despues de la perdida", "me siento culpable de reírme después de la pérdida"],
    termino: "Permiso para sentir alegría en medio del dolor",
    capa: "Emoción",
    sentido:
      "Sentir un momento de alegría genuina mientras atraviesas un duelo no significa que hayas dejado de honrar tu pérdida. El dolor y la alegría pueden coexistir; permitirte reír no borra ni minimiza lo que sigues sintiendo por dentro.",
    enfoque:
      "Recordar que un momento de ligereza no es una traición al duelo; ambos pueden estar presentes a la vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Permiso para sentir alegría en medio del dolor”)",
    otrasCausas: [
      "Una pérdida reciente y significativa en proceso de duelo activo",
      "Creencias sobre cómo “debería” verse el duelo desde afuera",
      "Miedo al juicio de otros al mostrarte bien en medio de una pérdida",
    ],
  },
  {
    id: "miedo-hijos-hereden-trauma",
    keywords: ["miedo a que mis hijos hereden mi trauma", "miedo a transmitirle mis heridas a mis hijos", "no quiero que mis hijos carguen con lo mismo que yo"],
    termino: "Miedo a que los hijos hereden el propio trauma",
    capa: "Emoción",
    sentido:
      "El miedo a transmitir tus propias heridas a tus hijos, lejos de ser algo negativo, suele ser una señal de la conciencia y el cuidado que ya estás poniendo en romper ciertos patrones. El solo hecho de preguntártelo ya te distingue de quienes no lo hicieron antes que tú.",
    enfoque:
      "Identificar un patrón específico que ya estés trabajando activamente para no repetir, y reconocer ese esfuerzo como valioso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que los hijos hereden el trauma”)",
    otrasCausas: [
      "Una herida propia claramente identificada de tu infancia",
      "Momentos recientes donde reconociste un patrón familiar repitiéndose",
      "Un compromiso consciente con romper ciclos familiares dañinos",
    ],
  },
  {
    id: "manos-calientes",
    keywords: ["manos calientes", "me arden las palmas de las manos", "calor en las palmas"],
    termino: "Manos calientes o ardor en las palmas",
    capa: "Ectodermo",
    sentido:
      "El calor o ardor en las palmas, distinto del sudor frío, suele coincidir con una energía de rabia o urgencia que busca salida a través de la acción —las manos “listas” para hacer algo con fuerza.",
    enfoque:
      "Identificar qué situación reciente te genera ganas de “hacer algo” con urgencia o fuerza.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos calientes”)",
    otrasCausas: [
      "Rabia o urgencia reciente que busca expresarse a través de la acción",
      "Circulación sensible que conviene revisar con un especialista también",
      "Ansiedad que se somatiza como calor en las extremidades",
    ],
  },
  {
    id: "piel-palida",
    keywords: ["me puse palida de repente", "me puse pálida de repente", "me puse palido de repente", "me puse pálido de repente", "piel palida por susto", "piel pálida por susto"],
    termino: "Palidez repentina",
    capa: "Mesodermo",
    sentido:
      "Ponerte pálida de golpe suele acompañar a un susto o una noticia impactante —el cuerpo redirige la sangre hacia los órganos vitales como respuesta de alerta, dejando la piel momentáneamente sin su color habitual.",
    enfoque:
      "Identificar qué noticia o situación reciente generó esa reacción de alerta tan inmediata.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Palidez repentina”)",
    otrasCausas: [
      "Un susto o noticia impactante reciente",
      "Una caída de presión que siempre conviene revisar con un especialista",
      "Miedo agudo frente a una situación inesperada",
    ],
  },
  {
    id: "sed-excesiva",
    keywords: ["sed excesiva", "tengo mucha sed todo el tiempo", "no se me quita la sed"],
    termino: "Sed excesiva",
    capa: "Endodermo",
    sentido:
      "Fuera de causas físicas que siempre deben revisarse, la sed excesiva simbólicamente puede relacionarse con un deseo profundo —de afecto, de cambio, de algo distinto— que sientes que no logras “saciar” del todo en tu vida actual.",
    enfoque:
      "Identificar qué deseo profundo sientes que no logras satisfacer plenamente en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sed excesiva”)",
    otrasCausas: [
      "Una condición física real que siempre debe evaluarse primero",
      "Un deseo profundo de afecto o cambio no del todo satisfecho",
      "Deshidratación por factores ambientales o de actividad física",
    ],
  },
  {
    id: "necesidad-casa-perfecta",
    keywords: ["necesito que mi casa este siempre perfecta", "necesito que mi casa esté siempre perfecta", "no soporto que mi casa este desordenada", "no soporto que mi casa esté desordenada"],
    termino: "Necesidad de que la casa esté siempre perfecta",
    capa: "Emoción",
    sentido:
      "Necesitar que tu hogar esté impecable en todo momento puede ser, en el fondo, una forma de sentir que controlas algo cuando otras áreas de tu vida se sienten más caóticas o fuera de tu control.",
    enfoque:
      "Practicar tolerar un pequeño desorden deliberado, notando que no ocurre nada grave si la casa no está perfecta por un rato.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de que la casa esté perfecta”)",
    otrasCausas: [
      "Otras áreas de la vida que se sienten fuera de control",
      "Una infancia donde el orden del hogar era motivo de tensión o crítica",
      "Ansiedad general que se canaliza a través del control del espacio físico",
    ],
  },
  {
    id: "dificultad-aceptar-desorden",
    keywords: ["no tolero el desorden", "me estresa mucho el desorden", "el caos a mi alrededor me genera ansiedad"],
    termino: "Dificultad para aceptar el desorden",
    capa: "Emoción",
    sentido:
      "Sentir un malestar intenso frente al desorden, más allá de una simple preferencia por el orden, suele reflejar una necesidad de control que busca calmar una ansiedad de fondo, canalizada hacia lo físico y visible.",
    enfoque:
      "Practicar tolerar un espacio desordenado por un tiempo breve, observando qué ansiedad de fondo aparece al hacerlo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para aceptar el desorden”)",
    otrasCausas: [
      "Ansiedad de fondo que se canaliza a través del control del entorno físico",
      "Una infancia caótica que generó la necesidad de orden como forma de seguridad",
      "Sobrecarga mental que hace insoportable cualquier estímulo visual adicional",
    ],
  },
  {
    id: "miedo-noten-fingir-estar-bien",
    keywords: ["miedo a que se den cuenta que finjo estar bien", "miedo a que noten que no estoy bien", "finjo una sonrisa todo el dia", "finjo una sonrisa todo el día"],
    termino: "Miedo a que noten que finges estar bien",
    capa: "Emoción",
    sentido:
      "Sostener una sonrisa mientras por dentro sientes algo muy distinto es agotador, y el miedo a que se note suele sumar una capa extra de tensión sobre el malestar original que ya estás cargando.",
    enfoque:
      "Buscar al menos una persona de confianza con quien puedas soltar esa máscara, aunque sea por un momento breve.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que noten que finges estar bien”)",
    otrasCausas: [
      "Un entorno donde mostrar malestar real no se siente seguro",
      "Un rol de “la que siempre está bien” sostenido durante mucho tiempo",
      "Miedo a preocupar a otros si muestras cómo te sientes realmente",
    ],
  },
  {
    id: "soledad-en-la-cima",
    keywords: ["me siento sola en la cima", "me siento solo en la cima", "el exito me alejo de los demas", "el éxito me alejó de los demás", "nadie entiende mi exito", "nadie entiende mi éxito"],
    termino: "Sentirse sola en la cima",
    capa: "Emoción",
    sentido:
      "Alcanzar el éxito puede generar una distancia inesperada con quienes te rodeaban antes —algunos se alejan por envidia, otros porque ya no comparten las mismas realidades—, dejando una soledad particular que rara vez se anticipa al perseguir una meta.",
    enfoque:
      "Buscar activamente comunidades o vínculos con personas que atraviesan realidades similares a la tuya actualmente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse sola en la cima”)",
    otrasCausas: [
      "Un logro reciente que generó distancia con el círculo social anterior",
      "Falta de nuevos vínculos que compartan tu realidad actual",
      "Envidia o incomodidad de personas cercanas frente a tu éxito",
    ],
  },
  {
    id: "dificultad-aceptar-alguien-no-cambiara",
    keywords: ["acepto que esa persona no va a cambiar", "no acepto que esa persona no va a cambiar", "sigo esperando que cambie aunque no lo hace", "sigo esperando a que esa persona cambie"],
    termino: "Dificultad para aceptar que alguien no cambiará",
    capa: "Emoción",
    sentido:
      "Sostener la esperanza de que alguien cambiará, a pesar de la evidencia repetida de que no lo hará, suele mantenerte atrapada en un ciclo de decepción constante. Aceptar esto no es rendirte con esa persona; es liberarte de la espera.",
    enfoque:
      "Preguntarte cómo cambiaría tu decisión actual si aceptaras, con total honestidad, que esa persona seguirá siendo igual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar que alguien no cambiará”)",
    otrasCausas: [
      "Un patrón repetido de promesas de cambio que no se cumplen",
      "Esperanza depositada en el potencial de la persona, más que en su comportamiento real",
      "Dificultad para soltar el vínculo aunque siga generando el mismo dolor",
    ],
  },
  {
    id: "necesidad-senal-externa-decidir",
    keywords: ["necesito una senal para decidir", "necesito una señal para decidir", "espero una señal del universo", "espero una señal antes de actuar"],
    termino: "Necesidad de una señal externa para decidir",
    capa: "Emoción",
    sentido:
      "Buscar una señal externa antes de tomar una decisión puede ser una forma válida de conectar con tu intuición, aunque también puede convertirse en una manera de posponer indefinidamente una decisión que, en el fondo, ya conoces.",
    enfoque:
      "Preguntarte con honestidad qué decisión tomarías si ya supieras, sin ninguna duda, que la señal correcta ya llegó.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de una señal externa para decidir”)",
    otrasCausas: [
      "Miedo a asumir la responsabilidad completa de una decisión difícil",
      "Una espiritualidad que otorga un papel central a las señales externas",
      "Dificultad para confiar en tu propio criterio sin validación externa",
    ],
  },
  {
    id: "miedo-ayuda-no-suficiente",
    keywords: ["miedo a que mi ayuda no sea suficiente", "siento que nunca hago lo suficiente por quien cuido", "no se si estoy cuidando bien", "no sé si estoy cuidando bien"],
    termino: "Miedo a que la ayuda que das no sea suficiente",
    capa: "Emoción",
    sentido:
      "Cuidar de alguien —un hijo, un padre enfermo, una persona querida— casi siempre viene con la sensación de que podrías estar haciendo más, incluso cuando ya estás dando todo lo que tienes disponible en ese momento.",
    enfoque:
      "Recordar que el cuidado tiene límites humanos reales, y que hacer lo posible, aunque no sea perfecto, sigue siendo un acto de amor genuino.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que la ayuda no sea suficiente”)",
    otrasCausas: [
      "Una responsabilidad de cuidado grande y sostenida en el tiempo",
      "Autoexigencia alta trasladada también al rol de cuidadora",
      "Comparación con un ideal poco realista de cuidado perfecto",
    ],
  },
  {
    id: "resentimiento-hacia-quien-cuidas",
    keywords: ["siento resentimiento hacia quien cuido", "me siento culpable por estar cansada de cuidar", "me siento culpable por estar cansado de cuidar", "a veces resiento cuidar a mi familiar"],
    termino: "Resentimiento hacia la persona que cuidas",
    capa: "Emoción",
    sentido:
      "Sentir, en algunos momentos, resentimiento hacia quien cuidas —incluso queriéndole profundamente— es una reacción humana ante el agotamiento del cuidado sostenido, no un reflejo de falta de amor real hacia esa persona.",
    enfoque:
      "Buscar apoyo o espacios de respiro en el cuidado, para que ese agotamiento tenga menos espacio de convertirse en resentimiento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Resentimiento hacia quien cuidas”)",
    otrasCausas: [
      "Un rol de cuidado sostenido durante mucho tiempo sin pausas de respiro",
      "Falta de apoyo adicional para compartir la responsabilidad del cuidado",
      "Agotamiento físico y emocional acumulado en el proceso de cuidar",
    ],
  },
  {
    id: "necesidad-justicia-constante",
    keywords: ["necesito que todo sea justo siempre", "no soporto la injusticia en las cosas pequeñas", "me obsesiona que todo se reparta igual"],
    termino: "Necesidad de justicia constante",
    capa: "Emoción",
    sentido:
      "Necesitar que todo se reparta o se resuelva de forma exactamente justa, incluso en asuntos pequeños, puede generar un desgaste emocional constante, ya que la vida rara vez ofrece un equilibrio perfecto en cada situación.",
    enfoque:
      "Practicar identificar cuándo una pequeña injusticia realmente amerita tu energía, y cuándo puedes simplemente dejarla pasar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de justicia constante”)",
    otrasCausas: [
      "Una infancia donde el trato desigual entre hermanos generó heridas importantes",
      "Valores personales muy fuertes en torno a la equidad y la justicia",
      "Dificultad para tolerar la ambigüedad moral de muchas situaciones cotidianas",
    ],
  },
  {
    id: "dificultad-tolerar-incertidumbre-medica",
    keywords: ["no soporto esperar resultados medicos", "no soporto esperar resultados de salud", "la espera de un resultado me angustia", "la espera de un resultado me angustia"],
    termino: "Dificultad para tolerar la incertidumbre de salud",
    capa: "Emoción",
    sentido:
      "Esperar resultados médicos —propios o de alguien querido— coloca a la mente en un estado de alerta sostenido frente a lo desconocido, donde la imaginación suele llenar los vacíos con los escenarios más temidos.",
    enfoque:
      "Buscar apoyo durante esta espera, y recordar que anticipar el peor escenario no cambia el resultado real, solo añade sufrimiento adicional mientras esperas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Dificultad para tolerar la incertidumbre de salud”)",
    otrasCausas: [
      "Una espera activa de resultados médicos propios o de un ser querido",
      "Experiencias pasadas donde una espera de resultados trajo noticias difíciles",
      "Ansiedad general que se intensifica frente a lo desde el punto de vista físico",
    ],
  },
  {
    id: "insensibilidad-piel",
    keywords: ["no siento nada en la piel", "insensibilidad en la piel", "siento la piel dormida"],
    termino: "Insensibilidad en la piel",
    capa: "Ectodermo",
    sentido:
      "Sentir la piel “dormida” o sin sensibilidad, más allá de causas físicas por revisar, a veces coincide con una desconexión emocional protectora —una forma de no sentir del todo, cuando sentir se ha vuelto demasiado doloroso.",
    enfoque:
      "Buscar valoración especializada siempre, y en paralelo, notar si hay una emoción que has estado evitando sentir por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Insensibilidad en la piel”)",
    otrasCausas: [
      "Una desconexión emocional protectora frente a algo doloroso",
      "Causas físicas o neurológicas que siempre deben evaluarse primero",
      "Agotamiento emocional que reduce la sensibilidad general del cuerpo",
    ],
  },
  {
    id: "mordisqueo-labios",
    keywords: ["me muerdo los labios", "mordisqueo mis labios", "me como los labios de los nervios"],
    termino: "Morderse los labios",
    capa: "Ectodermo",
    sentido:
      "Morderte los labios de forma repetitiva suele acompañar a palabras que estás conteniendo activamente en el momento —una forma física de “sellar” algo que preferirías no decir en voz alta todavía.",
    enfoque:
      "Notar qué palabra o comentario estás conteniendo justo en el momento en que te muerdes los labios.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Morderse los labios”)",
    otrasCausas: [
      "Palabras contenidas que prefieres no decir en el momento",
      "Nerviosismo general frente a una situación de tensión",
      "Un hábito desarrollado en etapas de ansiedad anteriores",
    ],
  },
  {
    id: "necesidad-orden-antes-cambio",
    keywords: ["necesito dejar todo en orden antes de un cambio grande", "no puedo viajar sin dejar todo resuelto", "necesito cerrar todos los pendientes antes de avanzar"],
    termino: "Necesidad de dejar todo en orden antes de un cambio",
    capa: "Emoción",
    sentido:
      "Sentir que necesitas resolver absolutamente todo antes de un viaje o cambio importante puede ser una forma de control frente a la incertidumbre que ese cambio representa, aunque en la práctica sea imposible dejar la vida completamente “cerrada”.",
    enfoque:
      "Identificar qué pendientes son realmente urgentes, y cuáles puedes soltar o posponer sin consecuencias reales.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de orden antes de un cambio”)",
    otrasCausas: [
      "Ansiedad frente a la incertidumbre que trae el cambio próximo",
      "Necesidad de control que se intensifica antes de una transición grande",
      "Miedo a que algo salga mal si no queda todo resuelto de antemano",
    ],
  },
  {
    id: "miedo-proceso-revele-algo",
    keywords: ["miedo a que el proceso revele algo que no quiero saber", "miedo a descubrir algo de mi en el proceso", "me da miedo lo que pueda encontrar si profundizo"],
    termino: "Miedo a que la terapia revele algo que no quieres saber",
    capa: "Emoción",
    sentido:
      "El miedo a lo que un proceso terapéutico podría revelar sobre ti misma o tu historia es comprensible, aunque casi siempre lo que ya sientes de fondo, sin nombrarlo, pesa más que enfrentarlo directamente con acompañamiento adecuado.",
    enfoque:
      "Recordar que el ritmo del proceso terapéutico se puede ajustar contigo; no tienes que enfrentarlo todo de golpe.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que el proceso revele algo”)",
    otrasCausas: [
      "Una intuición de que hay algo doloroso todavía sin procesar",
      "Miedo a que enfrentar ciertos temas cambie tu relación con tu propia historia",
      "Experiencias pasadas donde profundizar en algo trajo dolor inesperado",
    ],
  },
  {
    id: "miedo-union-familiar-se-rompa",
    keywords: ["miedo a que mi familia se rompa por un conflicto", "miedo a que mi familia se separe para siempre", "no quiero que este conflicto divida a la familia"],
    termino: "Miedo a que la unión familiar se rompa",
    capa: "Emoción",
    sentido:
      "El miedo a que un conflicto puntual termine dividiendo permanentemente a la familia suele generar un esfuerzo agotador por mantener la paz a toda costa, incluso a costa de tus propias necesidades o de la resolución honesta del conflicto real.",
    enfoque:
      "Recordar que abordar un conflicto de frente, con respeto, no necesariamente rompe a una familia; a veces es lo que la fortalece a largo plazo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que la familia se rompa”)",
    otrasCausas: [
      "Un conflicto familiar activo y sin resolver todavía",
      "Experiencias pasadas de rupturas familiares dolorosas",
      "Un rol de “la que mantiene todo unido” asumido desde hace tiempo",
    ],
  },
  {
    id: "puente-familiar-conflicto",
    keywords: ["siento que soy el puente entre mi familia", "siempre media entre los conflictos de mi familia", "siempre medio entre los conflictos de mi familia", "todos me usan para pasar mensajes en la familia"],
    termino: "Sentirse el “puente” en los conflictos familiares",
    capa: "Emoción",
    sentido:
      "Ser quien conecta y traduce entre miembros de la familia que no se hablan directamente es un rol agotador que rara vez se elige conscientemente, y que puede colocarte en medio de conflictos que en realidad no te corresponden resolver.",
    enfoque:
      "Practicar devolver la comunicación directa a las personas involucradas, en vez de ser tú quien transmita los mensajes entre ellas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sentirse el puente en conflictos familiares”)",
    otrasCausas: [
      "Un rol de mediadora asumido desde temprana edad dentro de la familia",
      "Miembros de la familia que evitan la comunicación directa entre sí",
      "Dificultad para poner el límite de no seguir transmitiendo mensajes ajenos",
    ],
  },
  {
    id: "necesidad-mantener-paz-familia",
    keywords: ["necesito mantener la paz en mi familia a toda costa", "evito cualquier tema que pueda generar conflicto familiar", "prefiero callar con tal de que no haya pelea en casa"],
    termino: "Necesidad de mantener la paz familiar a toda costa",
    capa: "Emoción",
    sentido:
      "Sacrificar tu propia opinión o necesidad con tal de evitar cualquier tensión familiar suele generar una paz superficial, mientras las tensiones reales se acumulan calladamente por debajo.",
    enfoque:
      "Practicar expresar un desacuerdo pequeño dentro de la familia, tolerando la incomodidad breve que eso pueda generar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de mantener la paz familiar”)",
    otrasCausas: [
      "Una infancia donde el conflicto familiar se vivía como algo peligroso",
      "Un rol de “la pacificadora” asumido desde hace mucho tiempo",
      "Miedo a que expresar un desacuerdo active un conflicto mayor",
    ],
  },
  {
    id: "dificultad-aceptar-dos-personas-no-se-llevan",
    keywords: ["no acepto que dos personas que amo no se llevan bien", "me cuesta que mi pareja y mi familia no se lleven bien", "sufro porque mis seres queridos no se soportan entre si", "sufro porque mis seres queridos no se soportan entre sí"],
    termino: "Dificultad para aceptar que dos personas que amas no se llevan bien",
    capa: "Emoción",
    sentido:
      "Querer que todas las personas importantes en tu vida se lleven bien entre sí es comprensible, pero no siempre está en tu control ni es tu responsabilidad resolver. Puedes amar profundamente a ambas partes, aunque ellas no logren llevarse bien entre sí.",
    enfoque:
      "Practicar sostener vínculos individuales con cada persona, sin sentir que debes fusionar ambas relaciones en una sola.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar que dos personas queridas no se llevan bien”)",
    otrasCausas: [
      "Una tensión real y sostenida entre dos personas importantes para ti",
      "Sentir la responsabilidad de “arreglar” la relación entre ambas",
      "Momentos compartidos —fiestas, reuniones— que se vuelven tensos por este conflicto",
    ],
  },
  {
    id: "miedo-elegir-bando",
    keywords: ["miedo a tener que elegir un bando", "no quiero tomar partido en este conflicto familiar", "me piden que elija entre mi mama y mi papa", "me piden que elija entre mi mamá y mi papá"],
    termino: "Miedo a tener que elegir un bando",
    capa: "Emoción",
    sentido:
      "Sentir presión para tomar partido en un conflicto entre personas que amas —padres separados, amigos peleados— es una de las posiciones más difíciles de sostener, precisamente porque cualquier elección se siente como una traición hacia alguien importante.",
    enfoque:
      "Practicar comunicar con claridad que puedes amar a ambas partes sin necesidad de posicionarte en su conflicto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a tener que elegir un bando”)",
    otrasCausas: [
      "Un conflicto activo entre dos personas importantes para ti",
      "Presión directa o indirecta de alguna de las partes para que tomes posición",
      "Miedo a perder el vínculo con quien sientas que no elegiste",
    ],
  },
  {
    id: "necesidad-proteger-hijos-conflictos-adultos",
    keywords: ["quiero proteger a mis hijos de los conflictos de adultos", "no quiero que mis hijos vean nuestras peleas", "trato de que mis hijos no se enteren de los problemas familiares"],
    termino: "Necesidad de proteger a los hijos de los conflictos de adultos",
    capa: "Emoción",
    sentido:
      "Querer proteger a tus hijos de los conflictos adultos —una separación, una tensión familiar— parte de un lugar amoroso, aunque el equilibrio entre protegerlos y ser honesta sobre lo que ocurre no siempre es sencillo de encontrar.",
    enfoque:
      "Buscar orientación sobre cómo hablarles de forma adecuada a su edad, sin necesidad de exponerlos a todos los detalles del conflicto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Proteger a los hijos de conflictos de adultos”)",
    otrasCausas: [
      "Un conflicto familiar activo que los hijos podrían presenciar",
      "Tu propia infancia, donde sí presenciaste conflictos adultos sin protección",
      "Incertidumbre sobre cuánto es apropiado compartir según su edad",
    ],
  },
  {
    id: "miedo-secreto-familiar-salga-luz",
    keywords: ["miedo a que salga a la luz un secreto familiar", "miedo a que se sepa un secreto de mi familia", "tenemos un secreto familiar que nadie menciona"],
    termino: "Miedo a que un secreto familiar salga a la luz",
    capa: "Emoción",
    sentido:
      "Los secretos familiares —una adopción, una infidelidad, un tema silenciado por generaciones— suelen pesar sobre el sistema familiar entero, incluso sin que se hable de ellos abiertamente. Sacarlos a la luz, aunque incómodo, a menudo alivia más de lo que se anticipa.",
    enfoque:
      "Considerar, con acompañamiento adecuado, si es momento de abordar directamente ese secreto en vez de seguir sosteniéndolo en silencio.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que salga a la luz un secreto familiar”)",
    otrasCausas: [
      "Un secreto familiar sostenido durante mucho tiempo por varias generaciones",
      "Miedo a las consecuencias reales de que ese secreto se conozca",
      "Una lealtad implícita hacia quienes decidieron mantenerlo oculto",
    ],
  },
  {
    id: "miedo-repetir-tipo-pareja",
    keywords: ["siempre me atraen el mismo tipo de pareja problematica", "siempre me atraen el mismo tipo de pareja problemática", "repito el mismo patron de pareja", "repito el mismo patrón de pareja"],
    termino: "Miedo a repetir el mismo tipo de pareja",
    capa: "Emoción",
    sentido:
      "Notar que sigues un patrón repetido al elegir pareja —el mismo tipo de dinámica difícil, una y otra vez— es una observación valiosa, aunque incómoda, que suele señalar una herida de fondo todavía sin resolver del todo.",
    enfoque:
      "Identificar qué necesidad emocional antigua parece repetirse en cada una de esas relaciones similares.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a repetir el mismo tipo de pareja”)",
    otrasCausas: [
      "Una herida afectiva temprana que se busca resolver, sin saberlo, en cada relación",
      "Familiaridad con cierta dinámica, aunque sea dolorosa, que se confunde con atracción",
      "Poco trabajo consciente todavía sobre el patrón identificado",
    ],
  },
  {
    id: "dificultad-aceptar-vida-no-es-justa",
    keywords: ["me cuesta aceptar que la vida no es justa", "no acepto que las cosas no siempre son justas", "por que a mi si hice todo bien", "por qué a mí si hice todo bien"],
    termino: "Dificultad para aceptar que la vida no siempre es justa",
    capa: "Emoción",
    sentido:
      "Creer que hacer las cosas “bien” debería garantizar resultados justos es una expectativa comprensible, aunque la vida no siempre distribuye sus consecuencias de forma proporcional al esfuerzo o la bondad de cada quien.",
    enfoque:
      "Permitirte sentir la frustración de esta injusticia, sin que se convierta en la creencia de que tus propios esfuerzos no importan.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar que la vida no siempre es justa”)",
    otrasCausas: [
      "Una situación reciente donde el esfuerzo no correspondió con el resultado obtenido",
      "Una creencia aprendida de que el mundo funciona con justicia proporcional",
      "Comparación con personas que parecen recibir mejores resultados sin el mismo esfuerzo",
    ],
  },
  {
    id: "manos-torpes",
    keywords: ["se me caen las cosas de las manos", "estoy muy torpe con las manos", "no puedo sostener nada bien"],
    termino: "Manos torpes (se te caen las cosas)",
    capa: "Ectodermo",
    sentido:
      "Que se te caigan las cosas con más frecuencia de lo habitual a veces coincide con una etapa donde sientes que estás “soltando” o perdiendo el control de varias áreas de tu vida a la vez, más allá de lo físico.",
    enfoque:
      "Identificar qué área de tu vida sientes que se te está “escapando de las manos” en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Manos torpes”)",
    otrasCausas: [
      "Una sensación general de perder el control en varias áreas de vida",
      "Falta de concentración por sobrecarga mental",
      "Cansancio físico que afecta la coordinación",
    ],
  },
  {
    id: "incapacidad-llorar",
    keywords: ["no puedo llorar aunque quiero", "quiero llorar y no puedo", "se me secan las lagrimas", "se me secan las lágrimas"],
    termino: "Incapacidad de llorar cuando se quiere",
    capa: "Ectodermo",
    sentido:
      "Sentir la necesidad de llorar sin lograrlo suele ser más frustrante que llorar directamente; a veces el cuerpo bloquea el llanto cuando la emoción de fondo se siente demasiado grande o abrumadora para soltarla de una sola vez.",
    enfoque:
      "Permitirte buscar un espacio y compañía donde sientas la seguridad suficiente para que el llanto, cuando llegue, no se sienta tan amenazante.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Incapacidad de llorar”)",
    otrasCausas: [
      "Una emoción de fondo que se siente demasiado abrumadora para soltar de golpe",
      "Un entorno donde llorar no se siente seguro en este momento",
      "Una desconexión emocional protectora frente a un dolor muy grande",
    ],
  },
  {
    id: "no-llenar-pulmones",
    keywords: ["no puedo llenar los pulmones del todo", "siento que no respiro completo", "me falta terminar de inhalar"],
    termino: "Sensación de no poder llenar los pulmones por completo",
    capa: "Endodermo",
    sentido:
      "Sentir que la respiración se queda “a medias”, sin poder completar una inhalación plena, suele acompañar a una sensación de no poder “tomar” del todo algo que necesitas —espacio, tiempo, aire— en tu vida actual.",
    enfoque:
      "Identificar qué sientes que no logras “tomar” plenamente en este momento de tu vida.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “No poder llenar los pulmones”)",
    otrasCausas: [
      "Ansiedad que se somatiza como una respiración incompleta",
      "Una sensación de no tener suficiente espacio o tiempo para ti misma",
      "Tensión muscular en el pecho que dificulta la respiración plena",
    ],
  },
  {
    id: "duelo-anticipado",
    keywords: ["duelo anticipado", "estoy de duelo antes de que pase", "ya estoy sufriendo por algo que aun no ocurre", "ya estoy sufriendo por algo que aún no ocurre"],
    termino: "Duelo anticipado",
    capa: "Emoción",
    sentido:
      "Empezar a sentir dolor de pérdida antes de que la pérdida ocurra por completo —frente a una enfermedad terminal, una despedida próxima— es un duelo real y válido, aunque distinto al duelo posterior. Ambos merecen espacio y acompañamiento.",
    enfoque:
      "Permitirte sentir esta anticipación sin culpa, buscando también momentos de presencia plena con quien todavía está contigo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Duelo anticipado”)",
    otrasCausas: [
      "Una enfermedad terminal o un pronóstico difícil de un ser querido",
      "Una despedida próxima ya anunciada",
      "El deterioro gradual y visible de alguien importante para ti",
    ],
  },
  {
    id: "dificultad-hablar-muerte-naturalidad",
    keywords: ["me cuesta hablar de la muerte con naturalidad", "no se como hablar de la muerte", "no sé cómo hablar de la muerte", "evito el tema de la muerte siempre"],
    termino: "Dificultad para hablar de la muerte con naturalidad",
    capa: "Emoción",
    sentido:
      "Muchas culturas tratan la muerte como un tema a evitar, lo cual puede dificultar procesos importantes como despedirse conscientemente o hablar de los propios deseos finales. Hablar de la muerte con naturalidad no la acerca; simplemente le da el espacio que merece.",
    enfoque:
      "Practicar nombrar el tema con calma en una conversación de confianza, sin la urgencia de resolverlo todo de una vez.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hablar de la muerte con naturalidad”)",
    otrasCausas: [
      "Una cultura o familia donde la muerte es un tema tabú",
      "Miedo a que hablar de la muerte la haga sentir más cercana o real",
      "Poca práctica y pocos referentes de cómo abordar el tema con calma",
    ],
  },
  {
    id: "miedo-olvidar-voz-rostro",
    keywords: ["miedo a olvidar la voz de quien murio", "miedo a olvidar la voz de quien murió", "miedo a olvidar el rostro de mi ser querido", "tengo miedo de olvidarme de como era"],
    termino: "Miedo a olvidar la voz o el rostro de quien murió",
    capa: "Emoción",
    sentido:
      "El miedo a que los detalles de una persona amada se difuminen con el tiempo —su voz exacta, su risa, sus gestos— es una de las angustias más silenciosas del duelo, aunque el vínculo y el amor no dependen únicamente de recordar cada detalle con precisión.",
    enfoque:
      "Buscar y conservar grabaciones, fotos o cartas que te ayuden a preservar esos detalles que más temes perder.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a olvidar la voz o el rostro”)",
    otrasCausas: [
      "El paso del tiempo desde la pérdida, que naturalmente difumina algunos detalles",
      "Pocas grabaciones o registros conservados de esa persona",
      "Un miedo más profundo a que el vínculo se disuelva con el olvido",
    ],
  },
  {
    id: "culpa-no-estar-presente-muerte",
    keywords: ["me siento culpable por no estar presente cuando murio", "me siento culpable por no estar presente cuando murió", "no llegue a despedirme antes de que muriera", "no llegué a despedirme antes de que muriera"],
    termino: "Culpa por no haber estado presente en el momento de la muerte",
    capa: "Emoción",
    sentido:
      "No haber podido estar físicamente presente en el momento final de un ser querido genera una culpa profunda y común, aunque casi nunca estuvo realmente en tus manos controlar el momento exacto en que alguien parte.",
    enfoque:
      "Recordar que la presencia en una relación se construye a lo largo de toda una vida compartida, no solo en un instante final que rara vez se puede predecir o controlar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Culpa por no estar presente en la muerte”)",
    otrasCausas: [
      "Circunstancias fuera de tu control que impidieron tu presencia en ese momento",
      "Una creencia de que “deberías” haber podido preverlo o estar ahí",
      "El peso cultural o familiar puesto sobre estar presente en el momento final",
    ],
  },
  {
    id: "necesidad-hablarle-a-quien-no-esta",
    keywords: ["le hablo a quien ya no esta", "le hablo a quien ya no está", "sigo hablandole a mi ser querido fallecido", "sigo hablándole a mi ser querido fallecido"],
    termino: "Necesidad de hablarle a quien ya no está",
    capa: "Emoción",
    sentido:
      "Seguir hablándole a alguien que murió —en voz alta, en pensamiento, frente a una foto— es una forma común y sana de sostener el vínculo, no una señal de que algo anda mal en tu proceso de duelo.",
    enfoque:
      "Permitirte esta práctica con la frecuencia que la necesites, sin sentir que debes justificarla ante nadie.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hablarle a quien ya no está”)",
    otrasCausas: [
      "Un vínculo profundo que sigue presente más allá de la pérdida física",
      "Una necesidad genuina de mantener la conexión de alguna forma",
      "Preguntas o conversaciones pendientes que sientes que aún necesitas compartir",
    ],
  },
  {
    id: "dificultad-deshacerse-pertenencias-fallecido",
    keywords: ["no puedo deshacerme de las cosas de mi ser querido fallecido", "conservo toda la ropa de la persona que murio", "conservo toda la ropa de la persona que murió", "me cuesta donar las pertenencias de mi familiar fallecido"],
    termino: "Dificultad para deshacerse de las pertenencias de alguien fallecido",
    capa: "Emoción",
    sentido:
      "Conservar los objetos de alguien que murió —su ropa, sus cosas cotidianas— suele sentirse como sostener una última conexión física con esa persona. No hay un tiempo correcto para soltarlos; cada quien tiene su propio ritmo para este proceso.",
    enfoque:
      "Ir soltando, si y cuando se sienta correcto, algunos objetos de forma gradual, quizás conservando solo aquellos con mayor significado emocional.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Deshacerse de pertenencias de alguien fallecido”)",
    otrasCausas: [
      "Una pérdida reciente donde los objetos se sienten como el último vínculo físico",
      "Miedo a que soltar los objetos signifique soltar también el recuerdo",
      "Presión externa para “avanzar” más rápido de lo que sientes posible",
    ],
  },
  {
    id: "miedo-celebrar-fechas-sin-esa-persona",
    keywords: ["miedo a celebrar fechas especiales sin esa persona", "no se como celebrar mi cumpleaños sin mi ser querido", "no sé cómo celebrar mi cumpleaños sin mi ser querido", "las fiestas ya no se sienten igual desde que murio", "las fiestas ya no se sienten igual desde que murió"],
    termino: "Miedo a celebrar fechas especiales sin esa persona",
    capa: "Emoción",
    sentido:
      "Las primeras fechas especiales sin alguien que murió —cumpleaños, fiestas, aniversarios— suelen ser particularmente dolorosas, y es común sentir que celebrar de alguna forma “traiciona” el duelo, cuando en realidad ambas cosas pueden coexistir con el tiempo.",
    enfoque:
      "Permitirte crear una forma nueva de honrar esa fecha, que incluya tanto el recuerdo de esa persona como un poco de espacio para seguir viviendo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Celebrar fechas especiales sin esa persona”)",
    otrasCausas: [
      "Una fecha significativa próxima que antes se compartía con esa persona",
      "Miedo a que celebrar minimice la importancia de la pérdida",
      "El primer año atravesando fechas clave sin su presencia física",
    ],
  },
  {
    id: "sentimiento-duelo-deberia-haber-terminado",
    keywords: ["siento que mi duelo ya deberia haber terminado", "siento que mi duelo ya debería haber terminado", "los demas creen que ya deberia estar bien", "los demás creen que ya debería estar bien", "me presionan para que ya supere la perdida", "me presionan para que ya supere la pérdida"],
    termino: "Sentir que el duelo “ya debería haber terminado”",
    capa: "Emoción",
    sentido:
      "El duelo no sigue un calendario fijo ni una duración estándar, sin importar lo que otros esperen o sugieran. Sentir que “ya debería” estar superado, según el tiempo o la opinión de alguien más, añade una presión innecesaria sobre un proceso profundamente personal.",
    enfoque:
      "Recordar que tu proceso de duelo tiene su propio ritmo, y que no le debes una explicación a nadie sobre cuánto tiempo necesitas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “El duelo debería haber terminado”)",
    otrasCausas: [
      "Comentarios externos, directos o indirectos, sobre el tiempo de tu duelo",
      "Comparación con cómo otras personas procesaron pérdidas similares",
      "Presión social para “volver a la normalidad” antes de sentirte lista",
    ],
  },
  {
    id: "necesidad-validacion-dolor-propio",
    keywords: ["siento que mi dolor no es tan grave como el de otros", "no se si tengo derecho a sufrir tanto por esto", "no sé si tengo derecho a sufrir tanto por esto", "comparo mi dolor con el de otros y me siento exagerada", "comparo mi dolor con el de otros y me siento exagerado"],
    termino: "Necesidad de validar el propio dolor",
    capa: "Emoción",
    sentido:
      "Comparar tu dolor con el de otras personas, para decidir si “tienes derecho” a sentirlo, resta valor a una experiencia que es genuinamente tuya. El dolor no se mide en una escala comparativa con el sufrimiento ajeno; el tuyo es válido tal como lo sientes.",
    enfoque:
      "Practicar nombrar tu dolor sin la palabra “pero” después —sin compararlo automáticamente con algo que consideras “peor”.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Validar el propio dolor”)",
    otrasCausas: [
      "Una tendencia a minimizar las propias experiencias frente a las de otros",
      "Comentarios pasados que invalidaron tu forma de sentir",
      "Una autoexigencia que se extiende también a cómo “deberías” sentir dolor",
    ],
  },
  {
    id: "comezon-cuero-cabelludo",
    keywords: ["comezon en el cuero cabelludo", "comezón en el cuero cabelludo", "me pica la cabeza sin razon", "me pica la cabeza sin razón"],
    termino: "Comezón en el cuero cabelludo",
    capa: "Ectodermo",
    sentido:
      "La comezón en el cuero cabelludo, más allá de causas dermatológicas, a veces coincide con pensamientos que “dan vueltas” de forma insistente, como si la mente sobrecargada se manifestara físicamente justo en esa zona.",
    enfoque:
      "Identificar qué pensamiento repetitivo lleva “dando vueltas” en tu cabeza últimamente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Comezón en el cuero cabelludo”)",
    otrasCausas: [
      "Pensamientos repetitivos o rumiación mental sostenida",
      "Causas dermatológicas que siempre conviene revisar también",
      "Estrés general que se somatiza en el cuero cabelludo",
    ],
  },
  {
    id: "miedo-vida-demasiado-facil",
    keywords: ["siento que todo va demasiado bien y me da miedo", "algo malo tiene que pasar porque todo esta muy bien", "algo malo tiene que pasar porque todo está muy bien", "no confio en que las cosas sigan bien", "no confío en que las cosas sigan bien"],
    termino: "Miedo a que la vida se sienta “demasiado fácil”",
    capa: "Emoción",
    sentido:
      "Sentir que algo malo debe estar por ocurrir precisamente porque las cosas van bien es una forma común de anticipar el dolor antes de tiempo, como una manera de protegerte de una posible decepción futura, a costa de disfrutar el presente estable.",
    enfoque:
      "Practicar permitirte disfrutar un periodo de calma sin la necesidad de estar constantemente vigilante frente a una amenaza que aún no existe.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que la vida sea demasiado fácil”)",
    otrasCausas: [
      "Etapas pasadas donde un periodo de calma fue seguido por una dificultad real",
      "Dificultad para confiar en la estabilidad después de mucha inestabilidad previa",
      "Una creencia de que la tranquilidad constante no es sostenible ni merecida",
    ],
  },
  {
    id: "sentimiento-deuda-karmica",
    keywords: ["siento que tengo una deuda karmica", "siento que tengo una deuda kármica", "algo bueno me va a costar caro despues", "algo bueno me va a costar caro después", "todo lo bueno se paga tarde o temprano"],
    termino: "Sentimiento de deuda kármica",
    capa: "Emoción",
    sentido:
      "Creer que cada cosa buena que recibes tiene un “costo” oculto que tarde o temprano deberás pagar suele generar una desconfianza constante hacia tu propia buena fortuna, en vez de permitirte simplemente recibirla.",
    enfoque:
      "Practicar recibir algo bueno sin buscar de inmediato cuál sería su “precio” oculto.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Deuda kármica”)",
    otrasCausas: [
      "Creencias espirituales o familiares sobre el equilibrio entre lo bueno y lo malo",
      "Experiencias pasadas donde algo bueno sí vino seguido de una dificultad",
      "Dificultad para aceptar la buena fortuna sin sentir que debes “merecerla” primero",
    ],
  },
  {
    id: "necesidad-permiso-dejar-intentar",
    keywords: ["necesito permiso para dejar de intentarlo", "quiero rendirme pero me siento culpable", "necesito permiso para soltar esta meta"],
    termino: "Necesidad de permiso para dejar de intentarlo",
    capa: "Emoción",
    sentido:
      "Soltar una meta, un proyecto o una relación en la que invertiste mucho esfuerzo no siempre es rendirse; a veces es reconocer, con honestidad, que ese camino ya no te lleva a donde realmente quieres llegar.",
    enfoque:
      "Date el permiso que estás buscando externamente: soltar algo que ya no te sirve también es una forma válida de cuidarte.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Permiso para dejar de intentarlo”)",
    otrasCausas: [
      "Mucho tiempo y esfuerzo ya invertido en algo que no avanza",
      "Miedo a que soltar se perciba como debilidad o fracaso",
      "Una autoexigencia que asocia el valor personal con la persistencia a toda costa",
    ],
  },
  {
    id: "dificultad-aceptar-sueno-no-cumplira",
    keywords: ["acepto que este sueño no se va a cumplir", "no acepto que este sueño no se va a cumplir", "tengo que soltar un sueño que tenia", "tengo que soltar un sueño que tenía"],
    termino: "Dificultad para aceptar que un sueño no se cumplirá",
    capa: "Emoción",
    sentido:
      "Soltar un sueño importante —una meta, una forma de vida imaginada— implica un duelo real, aunque distinto al de perder a una persona. Merece el mismo espacio para procesarse, sin la presión de simplemente “reemplazarlo” por otro de inmediato.",
    enfoque:
      "Permitirte sentir la tristeza de este cierre antes de buscar apresuradamente un nuevo sueño que lo reemplace.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar que un sueño no se cumplirá”)",
    otrasCausas: [
      "Circunstancias reales que hacen inviable ese sueño específico",
      "Una identidad construida en gran parte alrededor de esa meta",
      "Dificultad para imaginar un sentido de vida distinto al que tenías planeado",
    ],
  },
  {
    id: "sentimiento-esperando-vida-empiece",
    keywords: ["siento que estoy esperando que mi vida empiece", "siento que mi vida real todavia no comienza", "siento que mi vida real todavía no comienza", "cuando esto pase por fin voy a vivir de verdad"],
    termino: "Sentir que estás esperando que la vida empiece",
    capa: "Emoción",
    sentido:
      "Vivir con la sensación de que tu “vida real” comenzará después de cierto logro o etapa —graduarte, casarte, ganar cierto dinero— puede hacerte posponer indefinidamente el disfrute del presente, que también es, en efecto, tu vida ya en curso.",
    enfoque:
      "Identificar una forma pequeña de vivir hoy mismo algo de lo que asocias con esa “vida futura” que esperas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Esperando que la vida empiece”)",
    otrasCausas: [
      "Una meta específica que se percibe como el verdadero punto de partida de la vida",
      "Dificultad para encontrarle valor al presente mientras no se alcanza esa meta",
      "Comparación con una vida idealizada que se vive solo “después de” algo",
    ],
  },
  {
    id: "necesidad-colapso-para-descansar",
    keywords: ["siento que necesito llegar al limite para poder descansar", "siento que necesito llegar al límite para poder descansar", "solo paro cuando ya no puedo mas", "solo paro cuando ya no puedo más"],
    termino: "Necesidad de llegar al límite para permitirte descansar",
    capa: "Emoción",
    sentido:
      "Solo detenerte cuando el cuerpo o la mente ya no dan más, en vez de descansar de forma preventiva, suele ser un patrón agotador que se repite hasta que una crisis te obliga a parar. El descanso no debería requerir llegar primero al colapso.",
    enfoque:
      "Practicar programar pausas antes de sentirte completamente agotada, en vez de esperar a que el cuerpo te frene por la fuerza.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de colapso para descansar”)",
    otrasCausas: [
      "Una identidad muy ligada a la productividad constante",
      "Dificultad para reconocer las señales tempranas de agotamiento",
      "Una creencia de que el descanso solo se “gana” llegando al límite",
    ],
  },
  {
    id: "miedo-decir-te-amo-primero",
    keywords: ["miedo a decir te amo primero", "miedo a ser la primera en decir te quiero", "miedo a ser el primero en decir te quiero"],
    termino: "Miedo a decir “te amo” primero",
    capa: "Emoción",
    sentido:
      "El miedo a ser quien primero exprese un sentimiento profundo en una relación suele venir del temor a la vulnerabilidad de no recibir lo mismo de vuelta, aunque decir lo que sientes, sin importar la respuesta, es en sí mismo un acto de honestidad valioso.",
    enfoque:
      "Recordar que expresar lo que sientes no obliga a la otra persona a nada; simplemente comparte tu verdad en ese momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a decir te amo primero”)",
    otrasCausas: [
      "Una experiencia pasada donde expresar amor primero no fue correspondido",
      "Miedo a la vulnerabilidad que implica ser la primera en abrir esa puerta",
      "Inseguridad sobre el nivel real de compromiso de la otra persona",
    ],
  },
  {
    id: "dificultad-relacion-distancia",
    keywords: ["me cuesta sostener una relacion a distancia", "me cuesta sostener una relación a distancia", "la distancia esta desgastando mi relacion", "la distancia está desgastando mi relación"],
    termino: "Dificultad para sostener una relación a distancia",
    capa: "Emoción",
    sentido:
      "Las relaciones a distancia exigen una comunicación intencional que las relaciones presenciales no siempre requieren, y es natural sentir el peso de sostener la conexión sin la cercanía física cotidiana.",
    enfoque:
      "Crear rituales concretos de conexión —llamadas, mensajes, planes compartidos— que sostengan el vínculo de forma consistente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Relación a distancia”)",
    otrasCausas: [
      "Una separación geográfica reciente o prolongada en la relación",
      "Incertidumbre sobre cuándo la distancia podría terminar",
      "Falta de rituales concretos de conexión a pesar de la distancia",
    ],
  },
  {
    id: "miedo-primera-cita-despues-tiempo",
    keywords: ["miedo a mi primera cita despues de mucho tiempo", "miedo a mi primera cita después de mucho tiempo", "estoy fuera de practica para las citas", "estoy fuera de práctica para las citas", "no se como volver a citas despues de tanto tiempo"],
    termino: "Miedo a la primera cita después de mucho tiempo",
    capa: "Emoción",
    sentido:
      "Volver a las citas después de un periodo largo sin hacerlo —tras una relación larga, un divorcio, o simplemente tiempo sin buscarlo— puede generar una ansiedad similar a la de la adolescencia, incluso con toda la experiencia de vida acumulada.",
    enfoque:
      "Recordar que no existe una forma “correcta” de reingresar a las citas; date permiso de sentirte torpe mientras te vuelves a familiarizar con el proceso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Primera cita después de mucho tiempo”)",
    otrasCausas: [
      "Un periodo largo fuera del contexto de citas o relaciones nuevas",
      "Comparación con cómo eran las citas en una etapa de vida anterior",
      "Inseguridad sobre cómo presentarte después de cambios personales importantes",
    ],
  },
  {
    id: "nudo-nuca",
    keywords: ["nudo en la nuca", "tension en la nuca", "tensión en la nuca"],
    termino: "Nudo en la nuca",
    capa: "Mesodermo",
    sentido:
      "La nuca sostiene el peso de la cabeza y las decisiones que en ella se procesan; un nudo ahí suele coincidir con una carga mental sostenida —demasiadas cosas que “pensar” o resolver al mismo tiempo.",
    enfoque:
      "Identificar qué preocupación mental llevas sosteniendo con más peso del habitual en estos días.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Nudo en la nuca”)",
    otrasCausas: [
      "Sobrecarga mental por procesar demasiadas decisiones a la vez",
      "Postura física sostenida frente a pantallas por periodos largos",
      "Tensión acumulada que no ha encontrado una vía de descarga",
    ],
  },
  {
    id: "necesidad-desahogo-sin-consejos",
    keywords: ["solo necesito desahogarme sin consejos", "no quiero consejos solo que me escuchen", "me frustra que me den soluciones cuando solo quiero hablar"],
    termino: "Necesidad de desahogarte sin recibir consejos",
    capa: "Emoción",
    sentido:
      "A veces lo que necesitas no es una solución, sino sentirte escuchada. Cuando alguien responde con consejos no pedidos frente a un desahogo emocional, puede sentirse como si tu sentir importara menos que “arreglar” el problema.",
    enfoque:
      "Practicar decir explícitamente “solo necesito que me escuches, no busco consejos ahora” antes de compartir lo que sientes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Desahogarte sin consejos”)",
    otrasCausas: [
      "Vínculos donde las conversaciones suelen ir directo a la solución, no a la escucha",
      "Poca práctica pidiendo explícitamente el tipo de apoyo que necesitas",
      "Una necesidad genuina de procesar en voz alta antes de pensar en soluciones",
    ],
  },
  {
    id: "dificultad-aceptar-estoy-bien-falso",
    keywords: ["se que dice que esta bien pero no le creo", "sé que dice que está bien pero no le creo", "me frustra cuando alguien dice estoy bien y no lo esta", "me frustra cuando alguien dice estoy bien y no lo está"],
    termino: "Dificultad para aceptar un “estoy bien” que no es cierto",
    capa: "Emoción",
    sentido:
      "Sentir que alguien cercano dice estar bien cuando percibes que no lo está genera una frustración particular, porque no puedes forzar su apertura ni resolver algo que la otra persona no está lista para compartir todavía.",
    enfoque:
      "Ofrecer tu disponibilidad de forma clara, sin insistir, para que la persona sepa que puede acudir a ti cuando esté lista.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Un estoy bien que no es cierto”)",
    otrasCausas: [
      "Una persona cercana que suele minimizar o esconder su malestar",
      "Preocupación genuina combinada con la impotencia de no poder ayudar directamente",
      "Tu propio patrón de reconocer señales de malestar en otros con facilidad",
    ],
  },
  {
    id: "sobreanalizar-interacciones-sociales",
    keywords: ["repaso las conversaciones una y otra vez en mi cabeza", "analizo demasiado lo que dije despues de hablar con alguien", "analizo demasiado lo que dije después de hablar con alguien", "no dejo de pensar en como me vieron los demas", "no dejo de pensar en cómo me vieron los demás"],
    termino: "Sobreanalizar las interacciones sociales después de que ocurren",
    capa: "Emoción",
    sentido:
      "Repasar mentalmente una conversación una y otra vez, buscando errores o momentos incómodos, suele generar más ansiedad de la que la situación original realmente tuvo, alimentada por una autocrítica que rara vez es tan precisa como se siente.",
    enfoque:
      "Practicar poner un límite de tiempo consciente a este repaso mental, por ejemplo, cinco minutos, y luego dirigir la atención a otra cosa.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sobreanalizar interacciones sociales”)",
    otrasCausas: [
      "Ansiedad social que se intensifica después del momento de interacción",
      "Autocrítica alta sobre tu desempeño en situaciones sociales",
      "Experiencias pasadas donde un error social generó consecuencias reales",
    ],
  },
  {
    id: "dificultad-cambio-planes-ultimo-momento",
    keywords: ["me cuesta mucho un cambio de planes de ultimo momento", "me cuesta mucho un cambio de planes de último momento", "me genera ansiedad cuando cambian los planes de repente", "no tolero los imprevistos en mis planes"],
    termino: "Dificultad para aceptar cambios de planes de último momento",
    capa: "Emoción",
    sentido:
      "Sentir una ansiedad desproporcionada frente a un cambio repentino de planes suele reflejar una necesidad de previsibilidad como forma de sentirte segura, más que una simple preferencia por el orden.",
    enfoque:
      "Practicar dejar un plan deliberadamente abierto o flexible, notando que la incertidumbre resultante es tolerable de sostener.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cambios de planes de último momento”)",
    otrasCausas: [
      "Una necesidad alta de previsibilidad como forma de sentir seguridad",
      "Experiencias pasadas donde un cambio de planes trajo consecuencias difíciles",
      "Ansiedad general que se intensifica frente a lo inesperado",
    ],
  },
  {
    id: "necesidad-guion-conversaciones-dificiles",
    keywords: ["necesito preparar un guion antes de una conversacion dificil", "necesito preparar un guión antes de una conversación difícil", "ensayo mentalmente lo que voy a decir antes de hablar", "no puedo tener una conversacion importante sin prepararla antes", "no puedo tener una conversación importante sin prepararla antes"],
    termino: "Necesidad de un guion antes de conversaciones difíciles",
    capa: "Emoción",
    sentido:
      "Preparar mentalmente lo que vas a decir antes de una conversación importante puede ayudarte a sentirte más segura, aunque también puede generar más ansiedad si la conversación real no sigue el guion imaginado, como suele ocurrir.",
    enfoque:
      "Practicar preparar solo el punto principal que quieres comunicar, dejando el resto de la conversación abierto a fluir naturalmente.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Guion antes de conversaciones difíciles”)",
    otrasCausas: [
      "Ansiedad social que busca controlar el resultado de la conversación",
      "Miedo a quedarte sin palabras o a decir algo incorrecto en el momento",
      "Experiencias pasadas donde una conversación no preparada salió mal",
    ],
  },
  {
    id: "dificultad-opinion-diferente-no-ataque",
    keywords: ["siento que una opinion diferente es un ataque", "siento que una opinión diferente es un ataque", "me pongo a la defensiva cuando alguien piensa distinto", "no tolero que me contradigan"],
    termino: "Dificultad para ver una opinión diferente sin sentirla como un ataque",
    capa: "Emoción",
    sentido:
      "Sentir que alguien piensa distinto a ti es, en sí mismo, una amenaza personal suele dificultar mucho la relación con quienes no comparten tu misma perspectiva, incluso cuando no hay ninguna intención real de atacarte.",
    enfoque:
      "Practicar escuchar una opinión distinta buscando entenderla, en vez de prepararte de inmediato para defenderte o refutarla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Opinión diferente como ataque”)",
    otrasCausas: [
      "Una autoestima que depende en gran parte de tener siempre la razón",
      "Un entorno de origen donde disentir se vivía como conflicto abierto",
      "Inseguridad de fondo que se activa frente a cualquier desacuerdo",
    ],
  },
  {
    id: "necesidad-que-todo-tenga-razon",
    keywords: ["necesito que todo tenga una razon de ser", "necesito que todo tenga una razón de ser", "no soporto que algo pase sin explicacion", "no soporto que algo pase sin explicación", "todo tiene que pasar por algo"],
    termino: "Necesidad de que todo tenga una razón",
    capa: "Emoción",
    sentido:
      "Buscar una razón detrás de cada cosa que ocurre puede darte una sensación de orden frente al caos, aunque la vida también incluye eventos genuinamente aleatorios que no responden a ningún propósito superior identificable.",
    enfoque:
      "Practicar tolerar, aunque sea en dosis pequeñas, que algunas cosas simplemente ocurren sin una razón que puedas identificar del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Necesidad de que todo tenga una razón”)",
    otrasCausas: [
      "Una necesidad de sentido como forma de tolerar la incertidumbre",
      "Creencias espirituales o filosóficas que otorgan un propósito a cada evento",
      "Dificultad para aceptar la aleatoriedad genuina de ciertos sucesos de vida",
    ],
  },
  {
    id: "piel-tirante",
    keywords: ["siento la piel tirante", "piel tensa sin razon", "piel tensa sin razón"],
    termino: "Sensación de piel tirante",
    capa: "Ectodermo",
    sentido:
      "Sentir la piel tensa o “tirante”, más allá de la hidratación, a veces coincide con una sensación de estar “conteniendo” algo dentro de ti, como si el propio límite corporal reflejara una tensión emocional sostenida.",
    enfoque:
      "Identificar qué emoción sientes que estás conteniendo con más esfuerzo del habitual.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Piel tirante”)",
    otrasCausas: [
      "Una tensión emocional sostenida que buscas contener",
      "Factores de hidratación o clima que siempre conviene revisar también",
      "Estrés general que se somatiza en la piel",
    ],
  },
  {
    id: "parpado-tiembla",
    keywords: ["me tiembla el parpado", "me tiembla el párpado", "tic en el ojo", "se me mueve el ojo solo"],
    termino: "Temblor en el párpado",
    capa: "Ectodermo",
    sentido:
      "El pequeño temblor involuntario del párpado suele coincidir con una acumulación de estrés o fatiga nerviosa —una descarga mínima de tensión que el cuerpo libera en una zona muy sensible del rostro.",
    enfoque:
      "Revisar cuánto descanso real has tenido en los últimos días, más allá de las horas de sueño.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Temblor en el párpado”)",
    otrasCausas: [
      "Fatiga nerviosa acumulada en los últimos días",
      "Exceso de cafeína o estimulantes que siempre conviene revisar",
      "Estrés sostenido sin pausas suficientes de descanso",
    ],
  },
  {
    id: "miedo-pareja-descubra-secreto-pasado",
    keywords: ["miedo a que mi pareja descubra un secreto de mi pasado", "tengo un secreto que no le he contado a mi pareja", "miedo a que se sepa algo de mi pasado"],
    termino: "Miedo a que la pareja descubra un secreto del pasado",
    capa: "Emoción",
    sentido:
      "Cargar con un secreto sobre tu propio pasado dentro de una relación actual genera una tensión constante entre el deseo de intimidad real y el miedo a cómo esa información podría cambiar la forma en que te ve tu pareja.",
    enfoque:
      "Evaluar, con honestidad, si ese secreto realmente compete a la relación actual o si es una parte de tu historia que puedes procesar sin necesidad de compartirla.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Secreto del pasado en la pareja”)",
    otrasCausas: [
      "Una etapa pasada de tu vida que sientes que podría ser juzgada",
      "Miedo a que la confianza en la relación se vea afectada",
      "Experiencias pasadas donde compartir algo similar trajo consecuencias dolorosas",
    ],
  },
  {
    id: "yo-secreto-nadie-conoce",
    keywords: ["siento que tengo un yo secreto que nadie conoce", "nadie conoce quien soy realmente", "muestro una version de mi que no es del todo real", "muestro una versión de mí que no es del todo real"],
    termino: "Sentir que tienes un “yo secreto” que nadie conoce",
    capa: "Emoción",
    sentido:
      "Sentir que existe una versión más profunda y auténtica de ti misma que nadie a tu alrededor conoce del todo puede generar una soledad particular, incluso rodeada de personas que te quieren, pero que solo ven una parte de quien realmente eres.",
    enfoque:
      "Identificar a una sola persona con quien podrías, poco a poco, mostrar un poco más de esa versión más auténtica de ti misma.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Un yo secreto que nadie conoce”)",
    otrasCausas: [
      "Un entorno donde mostrar tu forma auténtica no se sintió seguro en el pasado",
      "Roles sociales muy definidos que dejan poco espacio para mostrarte distinta",
      "Miedo a que esa versión más profunda de ti no sea bien recibida",
    ],
  },
  {
    id: "dificultad-aceptar-cambio-opinion",
    keywords: ["me da verguenza haber cambiado de opinion", "me da vergüenza haber cambiado de opinión", "siento que soy inconsistente si cambio de idea", "me cuesta admitir que pensaba diferente antes"],
    termino: "Dificultad para aceptar haber cambiado de opinión",
    capa: "Emoción",
    sentido:
      "Cambiar de opinión con el tiempo, a la luz de nueva información o experiencias, no es inconsistencia; es una señal de que sigues aprendiendo y creciendo, en vez de aferrarte rígidamente a una postura solo por haberla sostenido antes.",
    enfoque:
      "Practicar decir abiertamente “antes pensaba distinto, y ahora veo esto de otra forma”, sin necesidad de justificarte en exceso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Cambiar de opinión”)",
    otrasCausas: [
      "Miedo a que cambiar de opinión se perciba como debilidad o falta de criterio",
      "Una postura pasada defendida públicamente que ahora se siente distinta",
      "Autoexigencia que asocia la consistencia con la rigidez de no cambiar nunca",
    ],
  },
  {
    id: "necesidad-lugar-propio",
    keywords: ["necesito un lugar que sea completamente mio", "necesito un lugar que sea completamente mío", "no tengo un espacio fisico que sienta propio", "no tengo un espacio físico que sienta propio"],
    termino: "Necesidad de un lugar físico que se sienta propio",
    capa: "Emoción",
    sentido:
      "Tener un espacio físico, aunque sea pequeño, que refleje quién eres y que puedas llamar completamente tuyo cumple una función emocional importante: te recuerda que ocupas un lugar legítimo en el mundo, distinto al de los demás.",
    enfoque:
      "Identificar un rincón, aunque sea reducido, que puedas transformar en un espacio que sí sea completamente tuyo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Un lugar físico propio”)",
    otrasCausas: [
      "Una convivencia donde todo el espacio se comparte sin áreas individuales",
      "Una etapa de vida sin un hogar estable o definitivo todavía",
      "Falta histórica de un espacio propio, incluso desde la infancia",
    ],
  },
  {
    id: "miedo-crecimiento-aleje-familia",
    keywords: ["miedo a que mi crecimiento personal me aleje de mi familia", "siento que ya no encajo con mi familia desde que cambie", "siento que ya no encajo con mi familia desde que cambié", "mi familia no entiende mi proceso de crecimiento"],
    termino: "Miedo a que el crecimiento personal te aleje de la familia",
    capa: "Emoción",
    sentido:
      "Crecer y transformarte puede generar una distancia real con familiares que no atraviesan el mismo proceso, y es válido sentir tristeza por ese distanciamiento, incluso mientras eliges seguir avanzando en tu propio camino.",
    enfoque:
      "Buscar formas de mantener el vínculo familiar en lo que sí pueden compartir, sin necesidad de que todos entiendan por completo tu proceso interno.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Crecimiento personal y distancia familiar”)",
    otrasCausas: [
      "Un proceso de crecimiento personal activo y reciente",
      "Una familia con poca apertura hacia el cambio o el crecimiento individual",
      "Diferencias nuevas de valores o perspectivas con el entorno familiar",
    ],
  },
  {
    id: "necesidad-otros-noten-crecimiento",
    keywords: ["necesito que los demas noten cuanto he cambiado", "necesito que los demás noten cuánto he cambiado", "nadie ve todo el trabajo interno que he hecho", "siento que mi crecimiento pasa desapercibido"],
    termino: "Necesidad de que otros noten tu crecimiento personal",
    capa: "Emoción",
    sentido:
      "Después de un proceso interno significativo, es natural querer que los demás reconozcan ese cambio, aunque el crecimiento genuino no siempre es visible desde afuera de inmediato, y su valor no depende de que otros lo confirmen.",
    enfoque:
      "Practicar reconocer tú misma tu propio proceso, como la validación más importante, independiente de si otros lo notan o no.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Que otros noten tu crecimiento”)",
    otrasCausas: [
      "Un proceso de trabajo interno intenso que se siente invisible desde afuera",
      "Necesidad de validación externa sobre tus propios logros internos",
      "Comparación con cambios más visibles o tangibles en otras personas",
    ],
  },
  {
    id: "dificultad-aceptar-recaidas-sanar",
    keywords: ["senti que recai en mi proceso de sanar", "sentí que recaí en mi proceso de sanar", "vuelvo al mismo patron despues de tanto trabajo", "vuelvo al mismo patrón después de tanto trabajo", "siento que retrocedí en mi crecimiento personal"],
    termino: "Dificultad para aceptar recaídas en el proceso de sanar",
    capa: "Emoción",
    sentido:
      "Sanar no es una línea recta ascendente; incluye recaídas, retrocesos y días donde los viejos patrones reaparecen. Esto no borra el progreso ya hecho; es una parte normal y esperable de cualquier proceso genuino de cambio.",
    enfoque:
      "Ver una recaída como información valiosa sobre qué área todavía necesita más atención, en vez de como un fracaso total del proceso.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Recaídas en el proceso de sanar”)",
    otrasCausas: [
      "Expectativas poco realistas de que el crecimiento sea lineal y constante",
      "Un patrón antiguo profundamente arraigado que toma tiempo transformar del todo",
      "Comparación con procesos de sanación idealizados de otras personas",
    ],
  },
  {
    id: "zumbido-cabeza",
    keywords: ["zumbido en la cabeza", "escucho un zumbido en la cabeza", "siento la cabeza zumbando"],
    termino: "Zumbido en la cabeza",
    capa: "Ectodermo",
    sentido:
      "A diferencia del tinnitus localizado en el oído, un zumbido percibido en toda la cabeza suele coincidir con una sobrecarga mental de pensamientos simultáneos, como si demasiadas voces internas hablaran a la vez sin claridad.",
    enfoque:
      "Identificar cuántos asuntos distintos estás procesando mentalmente al mismo tiempo en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Zumbido en la cabeza”)",
    otrasCausas: [
      "Sobrecarga mental por procesar demasiados asuntos a la vez",
      "Fatiga acumulada que afecta la claridad mental",
      "Causas físicas que siempre conviene revisar con un especialista",
    ],
  },
  {
    id: "miedo-opinion-hijos-adultos-decisiones-padres",
    keywords: ["miedo a que mis hijos adultos juzguen mis decisiones", "mis hijos ya grandes cuestionan como vivo mi vida", "siento que mis hijos adultos me juzgan por mis decisiones"],
    termino: "Miedo a que los hijos adultos juzguen tus decisiones",
    capa: "Emoción",
    sentido:
      "Cuando los hijos crecen, a veces comienzan a cuestionar decisiones de vida de sus padres —una nueva pareja, un gasto, una forma de vivir— desde una perspectiva adulta que antes no tenían. Sentir ese juicio, incluso viniendo de quienes amas profundamente, puede doler de una forma particular.",
    enfoque:
      "Recordar que, como adulta, tienes derecho a tomar tus propias decisiones de vida, incluso si tus hijos adultos no las comparten del todo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Hijos adultos juzgando decisiones de los padres”)",
    otrasCausas: [
      "Una decisión de vida reciente que tus hijos adultos no esperaban",
      "Un cambio en la dinámica familiar donde los hijos ahora opinan más abiertamente",
      "Diferencias generacionales en cómo se percibe una misma decisión",
    ],
  },
  {
    id: "dificultad-aceptar-padre-tuvo-limitaciones",
    keywords: ["me cuesta aceptar que mi padre tambien tuvo limitaciones", "me cuesta aceptar que mi padre también tuvo limitaciones", "mi madre hizo lo que pudo con lo que tenia", "mi madre hizo lo que pudo con lo que tenía", "entiendo que mis padres tambien fueron humanos", "entiendo que mis padres también fueron humanos"],
    termino: "Dificultad para aceptar que tus padres también tuvieron limitaciones",
    capa: "Emoción",
    sentido:
      "Ver a tus padres como personas completas, con sus propias heridas y limitaciones —no solo como la figura idealizada o la culpable de todo— es un paso de madurez emocional que no borra el dolor que pudieron causarte, pero sí permite mirarlo con más contexto.",
    enfoque:
      "Explorar, si te sientes lista, qué historia y qué limitaciones propias cargaban tus padres cuando te criaron.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar las limitaciones de los padres”)",
    otrasCausas: [
      "Un proceso de sanación que empieza a incluir una mirada más compleja hacia los padres",
      "Nueva información reciente sobre la historia o las dificultades de tus padres",
      "Dificultad para sostener a la vez el dolor causado y la comprensión hacia ellos",
    ],
  },
  {
    id: "sentimiento-viviendo-sueno-otra-persona-fallecida",
    keywords: ["siento que vivo el sueño de alguien que ya murio", "siento que vivo el sueño de alguien que ya murió", "cumplo la meta que mi ser querido fallecido no pudo cumplir", "vivo por quien ya no esta", "vivo por quien ya no está"],
    termino: "Sentir que vives el sueño de alguien que falleció",
    capa: "Emoción",
    sentido:
      "Perseguir una meta que perteneció a alguien que ya murió puede ser una hermosa forma de honrar su memoria, aunque también puede convertirse en una carga si esa meta ya no refleja lo que tú realmente deseas para tu propia vida.",
    enfoque:
      "Distinguir entre honrar la memoria de esa persona y vivir tu propia vida según tus propios deseos genuinos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vivir el sueño de alguien que falleció”)",
    otrasCausas: [
      "Una meta o sueño que perteneció a un ser querido que ya no está",
      "Lealtad profunda hacia la memoria de esa persona",
      "Dificultad para distinguir tus propios deseos de los que heredaste de alguien más",
    ],
  },
  {
    id: "necesidad-reconciliarse-antes-tarde",
    keywords: ["necesito reconciliarme con alguien antes de que sea tarde", "quiero hacer las paces antes de que ya no se pueda", "tengo miedo de que sea demasiado tarde para reconciliarnos"],
    termino: "Necesidad de reconciliarte antes de que sea tarde",
    capa: "Emoción",
    sentido:
      "Sentir la urgencia de reconciliarte con alguien —especialmente si su salud o edad avanzada lo hacen sentir urgente— es una señal válida que vale la pena escuchar, aunque el resultado de esa reconciliación no dependa solo de ti.",
    enfoque:
      "Dar el primer paso posible hacia esa reconciliación, aceptando que no puedes controlar cómo responderá la otra persona.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Reconciliarte antes de que sea tarde”)",
    otrasCausas: [
      "La salud frágil o edad avanzada de alguien con quien tienes un conflicto sin resolver",
      "Un distanciamiento prolongado que nunca se abordó directamente",
      "Miedo a cargar con un arrepentimiento si la reconciliación no llega a tiempo",
    ],
  },
  {
    id: "miedo-hijo-no-perdone",
    keywords: ["miedo a que mi hijo no me perdone", "miedo a que mi hija no me perdone", "temo que mis hijos no me perdonen mis errores", "miedo a que mi hijo me guarde rencor de adulto"],
    termino: "Miedo a que un hijo no te perdone",
    capa: "Emoción",
    sentido:
      "El miedo a que un hijo cargue, ya de adulto, con resentimiento hacia errores cometidos durante su crianza es profundo y común, especialmente al mirar hacia atrás con la conciencia y la información que no tenías en su momento.",
    enfoque:
      "Considerar una conversación honesta con tu hijo adulto, reconociendo lo que hiciste distinto de lo que hoy harías, sin exigir el perdón, solo abriendo la puerta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que un hijo no te perdone”)",
    otrasCausas: [
      "Errores reconocidos en la crianza que se ven distinto con la distancia del tiempo",
      "Una relación actual con cierta distancia o tensión con ese hijo",
      "Autocrítica alta sobre tu propio desempeño como madre o padre",
    ],
  },
  {
    id: "sentimiento-tiempo-prestado",
    keywords: ["siento que vivo tiempo prestado", "siento que cada dia es un regalo desde que sobrevivi", "siento que cada día es un regalo desde que sobreviví", "desde que pase por eso veo la vida distinto", "desde que pasé por eso veo la vida distinto"],
    termino: "Sentir que vives en “tiempo prestado”",
    capa: "Emoción",
    sentido:
      "Después de sobrevivir una enfermedad grave, un accidente o una pérdida cercana, es común sentir que cada día adicional es, en cierto modo, un regalo inesperado —una perspectiva que puede traer tanto gratitud profunda como una ansiedad de fondo poco habitual.",
    enfoque:
      "Permitirte sostener ambas partes de esta experiencia: la gratitud genuina y la vulnerabilidad que también trae consigo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Vivir en tiempo prestado”)",
    otrasCausas: [
      "Haber sobrevivido recientemente una enfermedad grave o un accidente",
      "Una pérdida cercana que confrontó directamente con tu propia mortalidad",
      "Un cambio de perspectiva profundo tras una experiencia límite",
    ],
  },
  {
    id: "miedo-reaccion-familia-nueva-pareja",
    keywords: ["miedo a que mi familia no acepte a mi nueva pareja", "miedo a presentar a mi nueva pareja a mi familia", "no se como va a reaccionar mi familia con mi nueva relacion", "no sé cómo va a reaccionar mi familia con mi nueva relación"],
    termino: "Miedo a la reacción de la familia ante una nueva pareja",
    capa: "Emoción",
    sentido:
      "Presentar una nueva pareja a la familia, especialmente después de una relación anterior significativa o en una etapa de vida distinta, puede generar mucha ansiedad anticipatoria sobre cómo será recibida esa persona importante para ti.",
    enfoque:
      "Recordar que, aunque la aprobación familiar importa, la decisión final sobre tu relación te corresponde a ti.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Reacción de la familia ante nueva pareja”)",
    otrasCausas: [
      "Una familia con opiniones fuertes o muy involucradas en tus decisiones de pareja",
      "Una relación anterior que la familia apreciaba particularmente",
      "Diferencias notables entre la nueva pareja y lo que la familia esperaba",
    ],
  },
  {
    id: "lealtad-hacia-ex",
    keywords: ["siento lealtad hacia mi ex a pesar de tener nueva pareja", "me siento culpable de estar bien con alguien nuevo", "siento que traiciono a mi ex al ser feliz con otra persona"],
    termino: "Sentimiento de lealtad hacia un ex a pesar de una nueva relación",
    capa: "Emoción",
    sentido:
      "Sentir una lealtad persistente hacia una expareja, incluso estando en una nueva relación sana, puede generar una culpa confusa, especialmente si esa relación anterior terminó de forma dolorosa o inconclusa.",
    enfoque:
      "Recordar que construir una nueva relación feliz no invalida ni traiciona lo que viviste antes; ambas etapas pueden tener su propio lugar en tu historia.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Lealtad hacia un ex”)",
    otrasCausas: [
      "Una relación anterior que terminó sin un cierre claro",
      "Culpa por avanzar mientras la otra persona quizás no lo ha hecho",
      "Un vínculo profundo que aún no ha terminado de procesarse del todo",
    ],
  },
  {
    id: "necesidad-ganarse-amor-hijastros",
    keywords: ["siento que tengo que ganarme el amor de mis hijastros", "me cuesta que mis hijastros me acepten", "no se como ganarme la confianza de los hijos de mi pareja", "no sé cómo ganarme la confianza de los hijos de mi pareja"],
    termino: "Necesidad de ganarte el amor de los hijastros",
    capa: "Emoción",
    sentido:
      "Formar un vínculo genuino con los hijos de tu pareja lleva tiempo y no siempre sigue un camino lineal; la aceptación de un hijastro no se puede forzar ni apresurar, y llega, cuando llega, a su propio ritmo.",
    enfoque:
      "Enfocarte en ser una presencia constante y respetuosa, sin la presión de “ganar” su cariño en un plazo específico.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ganarte el amor de los hijastros”)",
    otrasCausas: [
      "Una familia reconstituida en una etapa temprana de adaptación",
      "Lealtad natural de los hijastros hacia su otro padre o madre biológica",
      "Expectativas propias de una cercanía más rápida de la que es realista",
    ],
  },
  {
    id: "dificultad-lugar-familia-mezclada",
    keywords: ["no encuentro mi lugar en esta familia mezclada", "no se cual es mi rol en esta familia ensamblada", "no sé cuál es mi rol en esta familia ensamblada", "me siento fuera de lugar en mi propia familia reconstituida"],
    termino: "Dificultad para encontrar tu lugar en una familia mezclada",
    capa: "Emoción",
    sentido:
      "Las familias reconstituidas no tienen un manual claro de roles, y sentir incertidumbre sobre tu propio lugar —ni completamente madre, ni completamente invitada— es una experiencia común que se resuelve con tiempo y comunicación abierta, no con un rol predefinido.",
    enfoque:
      "Conversar abiertamente con tu pareja sobre qué rol y qué límites tienen sentido para ambos en esta nueva configuración familiar.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Lugar en una familia mezclada”)",
    otrasCausas: [
      "Una familia reconstituida relativamente reciente sin roles claramente definidos",
      "Falta de conversaciones explícitas sobre expectativas mutuas",
      "Comparación con el modelo de familia tradicional que sientes que “debería” ser",
    ],
  },
  {
    id: "mandibula-bloqueada",
    keywords: ["se me bloquea la mandibula", "se me bloquea la mandíbula", "siento la mandibula trabada", "siento la mandíbula trabada"],
    termino: "Mandíbula bloqueada",
    capa: "Mesodermo",
    sentido:
      "Sentir la mandíbula “atascada” o difícil de mover, más allá de bruxismo o tensión diaria, a veces coincide con una palabra o decisión que sientes completamente “atorada”, sin poder avanzar hacia adelante ni hacia atrás.",
    enfoque:
      "Identificar qué decisión o palabra sientes que está completamente estancada en este momento.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Mandíbula bloqueada”)",
    otrasCausas: [
      "Una decisión importante que sientes completamente estancada",
      "Tensión articular que siempre conviene revisar con un especialista también",
      "Palabras contenidas durante un periodo prolongado de tiempo",
    ],
  },
  {
    id: "necesidad-dolor-tenga-proposito",
    keywords: ["necesito que mi dolor tenga un proposito", "necesito que mi dolor tenga un propósito", "quiero que este sufrimiento sirva para algo", "si voy a sufrir que al menos tenga sentido"],
    termino: "Necesidad de que el propio dolor tenga un propósito",
    capa: "Emoción",
    sentido:
      "Buscar un sentido o propósito detrás de tu sufrimiento puede ayudarte a transitarlo, aunque también puede generar una presión adicional si sientes que debes “encontrar la lección” antes de permitirte simplemente sentir el dolor tal como es.",
    enfoque:
      "Permitirte sentir el dolor primero, sin la exigencia inmediata de encontrarle un sentido; el propósito, si llega, puede revelarse después, no necesariamente ahora.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Que el dolor tenga un propósito”)",
    otrasCausas: [
      "Una experiencia dolorosa reciente sin un sentido claro todavía",
      "Creencias espirituales o personales que buscan sentido en cada sufrimiento",
      "Dificultad para sostener el dolor sin necesidad de justificarlo de inmediato",
    ],
  },
  {
    id: "dificultad-aceptar-ayuda-quien-lastimo",
    keywords: ["me cuesta aceptar ayuda de quien antes me lastimo", "me cuesta aceptar ayuda de quien antes me lastimó", "no se si aceptar la ayuda de alguien que me daño antes", "no sé si aceptar la ayuda de alguien que me dañó antes"],
    termino: "Dificultad para aceptar ayuda de quien antes te lastimó",
    capa: "Emoción",
    sentido:
      "Recibir ayuda genuina de alguien que en el pasado te causó daño genera una tensión real: la necesidad presente choca con la desconfianza aprendida. Puedes aceptar la ayuda sin que eso signifique olvidar u obviar lo que ocurrió antes.",
    enfoque:
      "Evaluar la ayuda ofrecida en el contexto actual, sin la obligación de que aceptarla signifique una reconciliación completa con el pasado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Ayuda de quien antes te lastimó”)",
    otrasCausas: [
      "Una herida pasada real con la persona que ahora ofrece ayuda",
      "Necesidad genuina de apoyo en el momento presente",
      "Confusión entre aceptar ayuda puntual y reconciliarte por completo",
    ],
  },
  {
    id: "sentimiento-crecido-mas-rapido-pareja",
    keywords: ["siento que he crecido mas rapido que mi pareja", "siento que he crecido más rápido que mi pareja", "siento que ya no estamos en la misma etapa de crecimiento", "mi pareja no ha trabajado en si misma como yo", "mi pareja no ha trabajado en sí misma como yo"],
    termino: "Sentir que has crecido más rápido que tu pareja",
    capa: "Emoción",
    sentido:
      "Notar que tu proceso de crecimiento personal avanzó más rápido que el de tu pareja puede generar una distancia incómoda, sin que eso signifique necesariamente que la relación ya no tenga futuro; a veces solo indica que cada quien tiene su propio ritmo.",
    enfoque:
      "Conversar abiertamente sobre esta diferencia, sin exigirle a tu pareja que avance al mismo ritmo que tú, ni minimizando lo que tú sientes.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Crecer más rápido que la pareja”)",
    otrasCausas: [
      "Un proceso de trabajo personal activo en uno mismo, no compartido igual por la pareja",
      "Ritmos distintos de desarrollo emocional entre ambos",
      "Diferencias nuevas de perspectiva que antes no existían en la relación",
    ],
  },
  {
    id: "dificultad-aceptar-amor-no-siempre-suficiente",
    keywords: ["me cuesta aceptar que el amor no siempre es suficiente", "nos amamos pero no funciona la relacion", "nos amamos pero no funciona la relación", "el amor no basto para salvar mi relacion", "el amor no bastó para salvar mi relación"],
    termino: "Dificultad para aceptar que el amor no siempre es suficiente",
    capa: "Emoción",
    sentido:
      "Que dos personas se amen profundamente no garantiza que una relación funcione; a veces hacen falta compatibilidad, tiempo, circunstancias y otros factores que el amor por sí solo no puede resolver. Aceptar esto no resta valor al amor sentido.",
    enfoque:
      "Permitirte honrar el amor real que existió, sin la necesidad de que ese amor hubiera “debido” ser suficiente para sostener la relación.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “El amor no siempre es suficiente”)",
    otrasCausas: [
      "El cierre reciente de una relación donde el amor sí estaba presente",
      "Una creencia cultural de que el amor verdadero siempre encuentra la forma",
      "Dificultad para aceptar que otros factores también determinan el destino de una relación",
    ],
  },
  {
    id: "miedo-opinion-terminar-amistad-toxica",
    keywords: ["miedo a que me juzguen por terminar una amistad", "miedo a la opinion de otros por alejarme de una amiga", "miedo a la opinión de otros por alejarme de una amiga", "que van a pensar si dejo de hablarle a esta persona"],
    termino: "Miedo al juicio por terminar una amistad tóxica",
    capa: "Emoción",
    sentido:
      "Alejarte de una amistad que ya no te hace bien, aunque sea saludable para ti, puede generar miedo al juicio de un círculo social compartido que quizás no ve la dinámica completa que tú sí experimentas de cerca.",
    enfoque:
      "Recordar que proteger tu bienestar emocional no requiere la aprobación de un tribunal social externo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Juicio por terminar una amistad”)",
    otrasCausas: [
      "Un círculo social compartido que podría no entender tu decisión",
      "Una amistad de mucho tiempo que termina generando reacciones fuertes en el entorno",
      "Miedo a ser vista como la responsable de la ruptura del vínculo",
    ],
  },
  {
    id: "alivio-despues-perdida-dificil",
    keywords: ["siento alivio despues de una perdida dificil", "siento alivio después de una pérdida difícil", "me siento culpable de sentir alivio tras su muerte", "senti paz cuando por fin termino ese sufrimiento", "sentí paz cuando por fin terminó ese sufrimiento"],
    termino: "Sentir alivio después de una pérdida difícil",
    capa: "Emoción",
    sentido:
      "Sentir alivio tras la muerte de alguien que sufrió mucho, o tras el fin de una relación muy difícil, no significa que no lo amaras o que el duelo no sea real. El alivio y la tristeza pueden coexistir sin contradicción alguna.",
    enfoque:
      "Permitirte sentir ese alivio sin culpa, reconociendo que es una respuesta humana comprensible ante el fin de un sufrimiento prolongado.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Alivio después de una pérdida difícil”)",
    otrasCausas: [
      "Una enfermedad prolongada y dolorosa de un ser querido que finalmente terminó",
      "El fin de una relación muy conflictiva o desgastante",
      "Presión social para sentir solo tristeza, sin espacio para el alivio genuino",
    ],
  },
  {
    id: "miedo-sanacion-cambie-identidad",
    keywords: ["miedo a que sanar cambie por completo quien soy", "miedo a no reconocerme despues de sanar", "miedo a no reconocerme después de sanar", "si sano ya no se quien voy a ser", "si sano ya no sé quién voy a ser"],
    termino: "Miedo a que sanar cambie tu identidad por completo",
    capa: "Emoción",
    sentido:
      "El miedo a que sanar te transforme tanto que ya no te reconozcas es válido, aunque en la práctica, sanar suele revelar una versión más plena de quien ya eres, en vez de reemplazarte por alguien completamente distinto.",
    enfoque:
      "Recordar que sanar no borra tu esencia; suele quitar capas de protección que ya no necesitas, dejando ver con más claridad quién eres de fondo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Sanar y el miedo a cambiar de identidad”)",
    otrasCausas: [
      "Una identidad construida en gran parte alrededor de un dolor o patrón antiguo",
      "Miedo a que el cambio te distancie de vínculos que conociste con tu versión anterior",
      "Incertidumbre sobre quién serías sin las estrategias de protección actuales",
    ],
  },
  {
    id: "gratitud-incomoda-quien-lastimo",
    keywords: ["siento una gratitud incomoda hacia quien me lastimo", "siento una gratitud incómoda hacia quien me lastimó", "aprendi mucho de la persona que me hizo daño", "aprendí mucho de la persona que me hizo daño"],
    termino: "Gratitud incómoda hacia quien te lastimó",
    capa: "Emoción",
    sentido:
      "Es posible reconocer un aprendizaje genuino que surgió de una relación dolorosa, sin que eso justifique ni minimice el daño causado. Ambas cosas —la gratitud por lo aprendido y el reconocimiento del daño— pueden coexistir sin contradicción.",
    enfoque:
      "Permitirte sostener esta complejidad, sin sentir que reconocer un aprendizaje te obliga a perdonar o justificar lo ocurrido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Gratitud hacia quien te lastimó”)",
    otrasCausas: [
      "Un aprendizaje genuino y significativo que surgió de una experiencia dolorosa",
      "Dificultad para sostener sentimientos aparentemente contradictorios a la vez",
      "Un proceso de sanación que integra tanto el daño como el crecimiento posterior",
    ],
  },
  {
    id: "necesidad-disculpa-que-nunca-llegara",
    keywords: ["necesito una disculpa que nunca va a llegar", "espero una disculpa que se que nunca llegara", "espero una disculpa que sé que nunca llegará", "esa persona nunca va a reconocer lo que hizo"],
    termino: "Necesidad de una disculpa que nunca llegará",
    capa: "Emoción",
    sentido:
      "Esperar una disculpa de alguien que nunca la ofrecerá —por orgullo, por no reconocer el daño, o porque ya falleció— puede mantenerte atada a una espera indefinida. Sanar, en estos casos, a veces implica soltar la necesidad de esa disculpa externa.",
    enfoque:
      "Explorar qué necesitarías sentir internamente para avanzar, aunque esa disculpa externa nunca llegue a darse.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Una disculpa que nunca llegará”)",
    otrasCausas: [
      "Una persona que nunca ha reconocido el daño causado",
      "El fallecimiento de alguien antes de poder recibir esa disculpa",
      "Una espera prolongada que mantiene abierta una herida antigua",
    ],
  },
  {
    id: "dificultad-perdona-pero-no-olvida",
    keywords: ["perdono pero no puedo olvidar lo que paso", "perdono pero no puedo olvidar lo que pasó", "dije que perdonaba pero el recuerdo sigue doliendo", "puedo perdonar pero no confiar igual"],
    termino: "Dificultad para aceptar que se puede perdonar sin olvidar",
    capa: "Emoción",
    sentido:
      "Perdonar no significa borrar el recuerdo de lo ocurrido, ni recuperar automáticamente la misma confianza de antes. Puedes soltar el rencor hacia alguien y, al mismo tiempo, sostener límites distintos basados en lo que ya sabes que ocurrió.",
    enfoque:
      "Permitirte perdonar a tu propio ritmo, sin la exigencia de que perdonar signifique olvidar u obviar lo sucedido por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Perdonar sin olvidar”)",
    otrasCausas: [
      "Una creencia de que el perdón verdadero requiere olvidar por completo",
      "Un daño significativo que dejó una huella difícil de borrar",
      "Presión externa para “ya superarlo” completamente tras perdonar",
    ],
  },
  {
    id: "sentimiento-crecer-distinto-hermanos",
    keywords: ["senti que creci muy distinto a mis hermanos", "sentí que crecí muy distinto a mis hermanos", "mis hermanos y yo tuvimos infancias muy diferentes", "no entiendo como mis hermanos ven la familia tan distinto"],
    termino: "Sentir que creciste muy distinto a tus hermanos",
    capa: "Emoción",
    sentido:
      "Aunque compartieron el mismo hogar, cada hermano puede haber vivido una infancia emocionalmente distinta, según el orden de nacimiento, la etapa de los padres, o experiencias particulares no compartidas. Esto explica por qué la misma familia se recuerda tan diferente entre hermanos.",
    enfoque:
      "Validar tu propia experiencia de infancia, aunque difiera notablemente de cómo la recuerdan tus hermanos.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Crecer distinto a los hermanos”)",
    otrasCausas: [
      "Diferencias reales en cómo los padres criaron a cada hijo según la etapa",
      "Experiencias individuales no compartidas entre hermanos",
      "El orden de nacimiento, que influye en el rol y la experiencia de cada hijo",
    ],
  },
  {
    id: "necesidad-tiempo-cure-mas-rapido",
    keywords: ["quiero que el tiempo cure esto mas rapido", "quiero que el tiempo cure esto más rápido", "me frustra que todavia me duela despues de tanto tiempo", "me frustra que todavía me duela después de tanto tiempo"],
    termino: "Necesidad de que el tiempo cure más rápido",
    capa: "Emoción",
    sentido:
      "Sentir frustración porque una herida sigue doliendo después de mucho tiempo transcurrido no significa que hagas algo mal en tu proceso; el tiempo ayuda a sanar, pero no según un cronograma fijo que puedas controlar o apresurar.",
    enfoque:
      "Soltar la expectativa de una fecha límite para sanar, y en cambio, notar los pequeños avances reales, aunque el dolor no haya desaparecido por completo.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Que el tiempo cure más rápido”)",
    otrasCausas: [
      "Una herida profunda que naturalmente requiere más tiempo del esperado",
      "Comparación con los tiempos de sanación de otras personas",
      "Presión externa o propia para “ya estar mejor” según cierto plazo",
    ],
  },
  {
    id: "miedo-perdon-signifique-culpa",
    keywords: ["miedo a que perdonar signifique que fue mi culpa", "si perdono siento que le doy la razon", "si perdono siento que le doy la razón", "perdonar se siente como aceptar que yo tuve la culpa"],
    termino: "Miedo a que perdonar signifique aceptar la culpa",
    capa: "Emoción",
    sentido:
      "Perdonar a alguien no significa aceptar que tú tuviste la culpa de lo ocurrido, ni que lo que hizo estuvo bien. El perdón es, principalmente, un acto para tu propia paz interna, no una declaración sobre quién tenía la razón.",
    enfoque:
      "Separar claramente el acto de perdonar —por tu propio bienestar— de cualquier admisión sobre quién causó el daño original.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Perdonar y la culpa”)",
    otrasCausas: [
      "Una situación donde la responsabilidad del daño no ha sido reconocida abiertamente por la otra persona",
      "Confusión entre el acto de perdonar y el de justificar lo ocurrido",
      "Miedo a que perdonar se interprete, externamente, como restarle gravedad a lo sucedido",
    ],
  },
  {
    id: "miedo-amor-condicional",
    keywords: ["miedo a que el amor sea condicional", "siento que me quieren solo si cumplo ciertas condiciones", "el amor que recibi siempre tuvo condiciones", "el amor que recibí siempre tuvo condiciones"],
    termino: "Miedo a que el amor sea condicional",
    capa: "Emoción",
    sentido:
      "Sentir que el amor que recibes depende de cumplir ciertas condiciones —comportarte de cierta forma, lograr ciertas metas— suele originarse en vínculos tempranos donde el afecto realmente estuvo ligado a expectativas específicas, dejando una desconfianza de fondo hacia el amor incondicional.",
    enfoque:
      "Practicar identificar, en tus vínculos actuales, momentos donde sí recibiste cariño sin ninguna condición de por medio.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que el amor sea condicional”)",
    otrasCausas: [
      "Una infancia donde el afecto dependía de cumplir expectativas específicas",
      "Relaciones adultas que reforzaron esta misma creencia condicional",
      "Dificultad para reconocer el amor incondicional cuando sí está presente",
    ],
  },
  {
    id: "miedo-proceso-termine-sin-apoyo",
    keywords: ["miedo a que termine mi proceso y me quede sin apoyo", "miedo a completar el proceso", "qué va a pasar cuando termine el acompañamiento", "miedo a no tener a quien acudir cuando termine el proceso"],
    termino: "Miedo a que termine el proceso terapéutico",
    capa: "Emoción",
    sentido:
      "El miedo a que termine un proceso de acompañamiento profesional, incluso cuando ya avanzaste mucho, es comprensible: ese espacio se volvió un lugar seguro. Completar el acompañamiento no significa perder las herramientas aprendidas; significa que ya las llevas contigo.",
    enfoque:
      "Conversar con quien te acompaña sobre un plan de cierre gradual, en vez de un corte abrupto, para sentirte más preparada.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a que termine el proceso”)",
    otrasCausas: [
      "Un proceso terapéutico significativo que se acerca a su cierre natural",
      "Miedo a enfrentar nuevas dificultades sin ese espacio de apoyo regular",
      "Una identidad que se apoyó fuertemente en el proceso terapéutico durante un tiempo",
    ],
  },
  {
    id: "calma-se-siente-rara-tras-caos",
    keywords: ["la calma se siente rara despues de tanto caos", "la calma se siente rara después de tanto caos", "no se como estar en paz despues de tanto tiempo en crisis", "no sé cómo estar en paz después de tanto tiempo en crisis", "me incomoda que todo este tranquilo", "me incomoda que todo esté tranquilo"],
    termino: "La calma se siente extraña después de mucho caos",
    capa: "Emoción",
    sentido:
      "Después de vivir en modo de crisis constante durante mucho tiempo, la calma puede sentirse incómoda o incluso sospechosa, como si el cuerpo no supiera todavía reconocerla como segura, en vez de como una amenaza disfrazada.",
    enfoque:
      "Practicar quedarte en la calma un poco más de tiempo cada vez, permitiendo que tu sistema nervioso aprenda, poco a poco, que también es un estado seguro.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “La calma se siente extraña”)",
    otrasCausas: [
      "Un periodo largo y sostenido de crisis o inestabilidad",
      "Un sistema nervioso acostumbrado a la alerta constante como estado base",
      "Poca práctica reciente reconociendo la calma como algo seguro",
    ],
  },
  {
    id: "dificultad-aceptar-depender-medicamento-bienestar",
    keywords: ["me cuesta aceptar que dependo de un medicamento para estar bien", "siento que necesitar medicacion es una debilidad", "siento que necesitar apoyo o indicación especializada es una debilidad", "me da verguenza tomar medicamento para mi salud mental", "me da vergüenza tomar medicamento para mi salud mental"],
    termino: "Dificultad para aceptar la necesidad de apoyo o indicación especializada",
    capa: "Emoción",
    sentido:
      "Necesitar apoyo o indicación especializada recetada por un profesional para tu bienestar emocional no es una debilidad ni un fracaso personal; es una herramienta médica, igual de válida que cualquier otro proceso de acompañamiento para una condición física.",
    enfoque:
      "Conversar tus dudas o incomodidades directamente con tu especialista que te acompaña, quien puede orientarte sobre tu proceso específico.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Aceptar la necesidad de apoyo o indicación especializada”)",
    otrasCausas: [
      "Estigma social o familiar en torno a la apoyo o indicación especializada para la salud mental",
      "Una creencia de que la fuerza de voluntad debería ser suficiente por sí sola",
      "Miedo al juicio de otros al conocerse esta parte de tu proceso de acompañamiento",
    ],
  },
  {
    id: "miedo-bienestar-dependa-circunstancias-externas",
    keywords: ["miedo a que mi bienestar dependa de las circunstancias externas", "solo estoy bien cuando todo afuera esta bien", "solo estoy bien cuando todo afuera está bien", "mi paz depende de que nada salga mal"],
    termino: "Miedo a que el bienestar dependa de circunstancias externas",
    capa: "Emoción",
    sentido:
      "Sentir que tu estabilidad emocional depende por completo de que las circunstancias externas estén bien controladas puede generar una vigilancia agotadora, ya que la vida rara vez ofrece control total sobre todo lo que ocurre a tu alrededor.",
    enfoque:
      "Practicar identificar y fortalecer pequeñas fuentes de estabilidad interna que no dependan directamente de que todo salga como esperas.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Bienestar dependiente de lo externo”)",
    otrasCausas: [
      "Poca práctica desarrollando recursos internos de regulación emocional",
      "Una etapa de vida con muchas variables externas fuera de tu control",
      "Un patrón aprendido donde la calma siempre dependió del entorno, no de ti misma",
    ],
  },
  {
    id: "extranar-intensidad-drama-anterior",
    keywords: ["extraño la intensidad de mi relacion anterior toxica", "extraño la intensidad de mi relación anterior tóxica", "esta relacion tranquila se siente aburrida comparada con la anterior", "esta relación tranquila se siente aburrida comparada con la anterior", "extraño el drama de antes"],
    termino: "Extrañar la intensidad de un vínculo anterior más caótico",
    capa: "Emoción",
    sentido:
      "Después de salir de una relación intensa o inestable, una nueva relación tranquila puede sentirse, al principio, casi “aburrida” en comparación, no porque le falte algo, sino porque tu sistema se había acostumbrado a confundir intensidad con amor real.",
    enfoque:
      "Practicar reconocer la tranquilidad actual como una señal de salud en el vínculo, en vez de una señal de que algo falta.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Extrañar la intensidad de un vínculo anterior”)",
    otrasCausas: [
      "Una relación anterior con altibajos emocionales muy marcados",
      "Un sistema nervioso acostumbrado a asociar la intensidad con la conexión real",
      "Poco tiempo transcurrido desde la relación anterior más caótica",
    ],
  },
  {
    id: "dificultad-aceptar-bienestar-no-es-constante",
    keywords: ["me cuesta aceptar que el bienestar no es constante", "creia que una vez sanara ya no volveria a sentirme mal", "creía que una vez sanara ya no volvería a sentirme mal", "pense que estar bien significaba no volver a sentir dolor", "pensé que estar bien significaba no volver a sentir dolor"],
    termino: "Dificultad para aceptar que el bienestar no es constante",
    capa: "Emoción",
    sentido:
      "Creer que sanar significa no volver a sentir dolor o dificultad nunca más suele generar una decepción innecesaria cuando, inevitablemente, aparece un día difícil. El bienestar real incluye altibajos; no es la ausencia total de dificultad, sino una relación más sana con ella.",
    enfoque:
      "Redefinir el bienestar como la capacidad de atravesar los días difíciles con más herramientas, no como la eliminación completa de esos días.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “El bienestar no es constante”)",
    otrasCausas: [
      "Expectativas poco realistas sobre lo que significa “estar sanada”",
      "Un día o etapa difícil reciente después de un periodo de estabilidad",
      "Comparación con una idea idealizada de bienestar permanente",
    ],
  },
  {
    id: "miedo-perder-herramientas-aprendidas",
    keywords: ["miedo a perder las herramientas que aprendí en el proceso", "miedo a perder las herramientas que aprendí en el proceso", "miedo a olvidar lo que aprendi sobre mi misma", "miedo a olvidar lo que aprendí sobre mí misma", "miedo a volver a ser como era antes de sanar"],
    termino: "Miedo a perder las herramientas aprendidas en el proceso de sanar",
    capa: "Emoción",
    sentido:
      "El miedo a “olvidar” todo lo aprendido durante un proceso de crecimiento y volver a ser exactamente como eras antes es común, aunque en la práctica, la conciencia y las herramientas genuinamente integradas rara vez desaparecen por completo, incluso en los días más difíciles.",
    enfoque:
      "Recordar que un mal día no borra el trabajo hecho; simplemente significa que, en ese momento, necesitas volver a poner en práctica lo ya aprendido.",
    fuente: "Diccionario de las Enfermedades Emocionales (banco local, entrada “Miedo a perder las herramientas aprendidas”)",
    otrasCausas: [
      "Un día o etapa difícil reciente que activó viejos patrones",
      "Miedo de fondo a que el crecimiento logrado no sea permanente",
      "Comparación entre un momento de dificultad actual y el progreso ya alcanzado",
    ],
  },
];

export function buscarEnDiccionario(texto) {
  const t = texto.toLowerCase();
  const resultados = DICTIONARY.map((entry) => {
    let score = 0;
    entry.keywords.forEach((k) => {
      if (t.includes(k)) score += 1;
    });
    return { ...entry, score };
  }).filter((e) => e.score > 0);
  resultados.sort((a, b) => b.score - a.score);
  return resultados.slice(0, 2);
}

export const ZODIACO = [
  { signo: "Capricornio", desde: [12, 22], hasta: [1, 19], elemento: "Tierra", modalidad: "Cardinal", regente: "Saturno", clave: "Estructura", luz: "Disciplina, responsabilidad, visión a largo plazo", sombra: "Rigidez, autoexigencia, dificultad para pedir ayuda", zonaCorporal: "Huesos, articulaciones y rodillas" },
  { signo: "Acuario", desde: [1, 20], hasta: [2, 18], elemento: "Aire", modalidad: "Fijo", regente: "Saturno / Urano", clave: "Innovación", luz: "Originalidad, conciencia colectiva, independencia", sombra: "Desapego emocional, sentirse incomprendido", zonaCorporal: "Tobillos y sistema circulatorio" },
  { signo: "Piscis", desde: [2, 19], hasta: [3, 20], elemento: "Agua", modalidad: "Mutable", regente: "Júpiter / Neptuno", clave: "Compasión", luz: "Empatía, intuición, sensibilidad artística", sombra: "Evasión de la realidad, límites difusos", zonaCorporal: "Pies y sistema linfático" },
  { signo: "Aries", desde: [3, 21], hasta: [4, 19], elemento: "Fuego", modalidad: "Cardinal", regente: "Marte", clave: "Impulso", luz: "Iniciativa, coraje, capacidad de empezar de cero", sombra: "Impulsividad, impaciencia", zonaCorporal: "Cabeza y rostro" },
  { signo: "Tauro", desde: [4, 20], hasta: [5, 20], elemento: "Tierra", modalidad: "Fijo", regente: "Venus", clave: "Estabilidad", luz: "Constancia, disfrute sensorial, paciencia", sombra: "Apego excesivo, resistencia al cambio", zonaCorporal: "Cuello y garganta" },
  { signo: "Géminis", desde: [5, 21], hasta: [6, 20], elemento: "Aire", modalidad: "Mutable", regente: "Mercurio", clave: "Curiosidad", luz: "Comunicación, adaptabilidad, mente ágil", sombra: "Dispersión, superficialidad", zonaCorporal: "Brazos, manos y pulmones" },
  { signo: "Cáncer", desde: [6, 21], hasta: [7, 22], elemento: "Agua", modalidad: "Cardinal", regente: "Luna", clave: "Protección", luz: "Sensibilidad, cuidado, memoria emocional", sombra: "Hermetismo, apego al pasado", zonaCorporal: "Pecho, estómago y sistema digestivo" },
  { signo: "Leo", desde: [7, 23], hasta: [8, 22], elemento: "Fuego", modalidad: "Fijo", regente: "Sol", clave: "Expresión", luz: "Generosidad, creatividad, liderazgo cálido", sombra: "Necesidad de validación, orgullo", zonaCorporal: "Corazón y columna vertebral" },
  { signo: "Virgo", desde: [8, 23], hasta: [9, 22], elemento: "Tierra", modalidad: "Mutable", regente: "Mercurio", clave: "Servicio", luz: "Análisis, cuidado del detalle", sombra: "Autocrítica excesiva, perfeccionismo", zonaCorporal: "Intestinos y sistema digestivo" },
  { signo: "Libra", desde: [9, 23], hasta: [10, 22], elemento: "Aire", modalidad: "Cardinal", regente: "Venus", clave: "Equilibrio", luz: "Diplomacia, sentido estético, búsqueda de justicia", sombra: "Indecisión, dependencia del otro", zonaCorporal: "Riñones y zona lumbar" },
  { signo: "Escorpio", desde: [10, 23], hasta: [11, 21], elemento: "Agua", modalidad: "Fijo", regente: "Marte / Plutón", clave: "Transformación", luz: "Profundidad emocional, capacidad de regenerarse", sombra: "Desconfianza, control", zonaCorporal: "Órganos reproductivos y excretores" },
  { signo: "Sagitario", desde: [11, 22], hasta: [12, 21], elemento: "Fuego", modalidad: "Mutable", regente: "Júpiter", clave: "Expansión", luz: "Optimismo, búsqueda de sentido, libertad", sombra: "Exceso, evasión del compromiso", zonaCorporal: "Caderas y muslos" },
];

// Lo que rige cada planeta y con qué tono propio lo hace — tomado del archivo de
// astrología compartido, usado para la capa de "planeta regente" en la carta natal.
export const PLANETAS_REGENTES = {
  "Sol": { rige: "la identidad esencial, la vitalidad y el propósito de vida", tono: "voluntad y vitalidad" },
  "Luna": { rige: "las emociones, los instintos y la memoria afectiva", tono: "sensibilidad e instinto" },
  "Mercurio": { rige: "la comunicación, el pensamiento y el aprendizaje", tono: "mente ágil e intercambio" },
  "Venus": { rige: "el amor, los valores y el disfrute de los vínculos", tono: "afecto y armonía" },
  "Marte": { rige: "la acción, el deseo y el impulso para ir tras algo", tono: "acción y energía directa" },
  "Júpiter": { rige: "la expansión, el crecimiento y el sentido de vida", tono: "fe y abundancia" },
  "Saturno": { rige: "la estructura, los límites y la responsabilidad", tono: "disciplina y madurez" },
  "Urano": { rige: "el cambio súbito, la originalidad y la ruptura consciente", tono: "libertad e innovación" },
  "Neptuno": { rige: "la espiritualidad, la intuición y la disolución de límites rígidos", tono: "sueños e intuición" },
  "Plutón": { rige: "la transformación profunda y los procesos de muerte y renacimiento simbólicos", tono: "poder y transformación" },
};

function calcularSignoSolar(fechaStr) {
  if (!fechaStr) return null;
  const [y, m, d] = fechaStr.split("-").map(Number);
  for (const z of ZODIACO) {
    const [dm, dd] = z.desde;
    const [hm, hd] = z.hasta;
    if (dm === hm) {
      if (m === dm && d >= dd && d <= hd) return z;
    } else {
      if ((m === dm && d >= dd) || (m === hm && d <= hd)) return z;
    }
  }
  return ZODIACO[0];
}

// ===== Carta astral completa (Ascendente, Luna, Medio Cielo, casas) =====
// Usa una librería de efemérides real (astronomy-engine por debajo, vía
// circular-natal-horoscope-js) para calcular posiciones reales a partir de fecha, hora
// y coordenadas de nacimiento. El huso horario y el horario de verano histórico se
// derivan automáticamente de la latitud/longitud, así que no hace falta pedirlos.
// Import robusto: en el build de producción (Rollup) las exportaciones nombradas llegan
// directo en el namespace; en desarrollo (Vite/esbuild) el paquete CJS solo expone su
// interop en ".default" — se cubren ambos casos en vez de asumir uno solo.
export const EphemerisOrigin = EphemerisNS.Origin || EphemerisNS.default.Origin;
export const EphemerisHoroscope = EphemerisNS.Horoscope || EphemerisNS.default.Horoscope;

export const SIGNOS_EN_ES = {
  Aries: "Aries",
  Taurus: "Tauro",
  Gemini: "Géminis",
  Cancer: "Cáncer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Escorpio",
  Sagittarius: "Sagitario",
  Capricorn: "Capricornio",
  Aquarius: "Acuario",
  Pisces: "Piscis",
};

// Ciudades más buscadas por la audiencia hispanohablante de la app, con coordenadas
// aproximadas de su centro. Sirve para no depender de un servicio externo de geocodificación
// (la app no tiene backend). Quien no encuentre su ciudad puede ingresar coordenadas a mano.
export const CIUDADES_NACIMIENTO = [
  { nombre: "Ciudad de México", pais: "México", lat: 19.4326, lon: -99.1332 },
  { nombre: "Guadalajara", pais: "México", lat: 20.6597, lon: -103.3496 },
  { nombre: "Monterrey", pais: "México", lat: 25.6866, lon: -100.3161 },
  { nombre: "Puebla", pais: "México", lat: 19.0414, lon: -98.2063 },
  { nombre: "Tijuana", pais: "México", lat: 32.5149, lon: -117.0382 },
  { nombre: "Mérida", pais: "México", lat: 20.9674, lon: -89.5926 },
  { nombre: "Cancún", pais: "México", lat: 21.1619, lon: -86.8515 },
  { nombre: "Ciudad de Guatemala", pais: "Guatemala", lat: 14.6349, lon: -90.5069 },
  { nombre: "San Salvador", pais: "El Salvador", lat: 13.6929, lon: -89.2182 },
  { nombre: "Tegucigalpa", pais: "Honduras", lat: 14.0723, lon: -87.1921 },
  { nombre: "Managua", pais: "Nicaragua", lat: 12.1364, lon: -86.2514 },
  { nombre: "San José", pais: "Costa Rica", lat: 9.9281, lon: -84.0907 },
  { nombre: "Ciudad de Panamá", pais: "Panamá", lat: 8.9824, lon: -79.5199 },
  { nombre: "La Habana", pais: "Cuba", lat: 23.1136, lon: -82.3666 },
  { nombre: "Santo Domingo", pais: "República Dominicana", lat: 18.4861, lon: -69.9312 },
  { nombre: "San Juan", pais: "Puerto Rico", lat: 18.4655, lon: -66.1057 },
  { nombre: "Bogotá", pais: "Colombia", lat: 4.7110, lon: -74.0721 },
  { nombre: "Medellín", pais: "Colombia", lat: 6.2442, lon: -75.5812 },
  { nombre: "Cali", pais: "Colombia", lat: 3.4516, lon: -76.5320 },
  { nombre: "Barranquilla", pais: "Colombia", lat: 10.9685, lon: -74.7813 },
  { nombre: "Caracas", pais: "Venezuela", lat: 10.4806, lon: -66.9036 },
  { nombre: "Maracaibo", pais: "Venezuela", lat: 10.6427, lon: -71.6125 },
  { nombre: "Quito", pais: "Ecuador", lat: -0.1807, lon: -78.4678 },
  { nombre: "Guayaquil", pais: "Ecuador", lat: -2.1894, lon: -79.8891 },
  { nombre: "Lima", pais: "Perú", lat: -12.0464, lon: -77.0428 },
  { nombre: "Arequipa", pais: "Perú", lat: -16.4090, lon: -71.5375 },
  { nombre: "La Paz", pais: "Bolivia", lat: -16.5000, lon: -68.1500 },
  { nombre: "Santa Cruz de la Sierra", pais: "Bolivia", lat: -17.7833, lon: -63.1821 },
  { nombre: "Asunción", pais: "Paraguay", lat: -25.2637, lon: -57.5759 },
  { nombre: "Montevideo", pais: "Uruguay", lat: -34.9011, lon: -56.1645 },
  { nombre: "Buenos Aires", pais: "Argentina", lat: -34.6037, lon: -58.3816 },
  { nombre: "Córdoba", pais: "Argentina", lat: -31.4201, lon: -64.1888 },
  { nombre: "Rosario", pais: "Argentina", lat: -32.9468, lon: -60.6393 },
  { nombre: "Mendoza", pais: "Argentina", lat: -32.8908, lon: -68.8272 },
  { nombre: "Santiago", pais: "Chile", lat: -33.4489, lon: -70.6693 },
  { nombre: "Valparaíso", pais: "Chile", lat: -33.0472, lon: -71.6127 },
  { nombre: "Madrid", pais: "España", lat: 40.4168, lon: -3.7038 },
  { nombre: "Barcelona", pais: "España", lat: 41.3851, lon: 2.1734 },
  { nombre: "Valencia", pais: "España", lat: 39.4699, lon: -0.3763 },
  { nombre: "Sevilla", pais: "España", lat: 37.3891, lon: -5.9845 },
  { nombre: "Bilbao", pais: "España", lat: 43.2630, lon: -2.9350 },
  { nombre: "Málaga", pais: "España", lat: 36.7213, lon: -4.4214 },
  { nombre: "Los Ángeles", pais: "Estados Unidos", lat: 34.0522, lon: -118.2437 },
  { nombre: "Nueva York", pais: "Estados Unidos", lat: 40.7128, lon: -74.0060 },
  { nombre: "Miami", pais: "Estados Unidos", lat: 25.7617, lon: -80.1918 },
  { nombre: "Houston", pais: "Estados Unidos", lat: 29.7604, lon: -95.3698 },
  { nombre: "Chicago", pais: "Estados Unidos", lat: 41.8781, lon: -87.6298 },
  { nombre: "San Antonio", pais: "Estados Unidos", lat: 29.4241, lon: -98.4936 },
  { nombre: "Phoenix", pais: "Estados Unidos", lat: 33.4484, lon: -112.0740 },
  { nombre: "El Paso", pais: "Estados Unidos", lat: 31.7619, lon: -106.4850 },
  { nombre: "Londres", pais: "Reino Unido", lat: 51.5074, lon: -0.1278 },
  { nombre: "París", pais: "Francia", lat: 48.8566, lon: 2.3522 },
  { nombre: "Roma", pais: "Italia", lat: 41.9028, lon: 12.4964 },
  { nombre: "Berlín", pais: "Alemania", lat: 52.5200, lon: 13.4050 },
  { nombre: "Toronto", pais: "Canadá", lat: 43.6511, lon: -79.3470 },
];

export function ssNormalizarTexto(txt) {
  return (txt || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function buscarCiudadesNacimiento(query) {
  const q = ssNormalizarTexto(query).trim();
  if (q.length < 2) return [];
  return CIUDADES_NACIMIENTO.filter(
    (c) => ssNormalizarTexto(c.nombre).includes(q) || ssNormalizarTexto(c.pais).includes(q)
  ).slice(0, 6);
}

// Respaldo para cuando la ciudad no está en la lista local de arriba (~55 ciudades):
// geocodifica con Nominatim (OpenStreetMap), gratuito y sin necesidad de API key, para
// que CUALQUIER lugar del mundo pueda dar coordenadas y desbloquear el ascendente y las
// casas — no solo las ciudades grandes que alcanzamos a precargar. Si no hay red o el
// servicio falla, se degrada con gracia a "sin sugerencias remotas" sin romper el formulario.
export async function buscarCiudadesGeocodificacion(query) {
  const q = query.trim();
  if (q.length < 3) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&accept-language=es&q=${encodeURIComponent(q)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data = await res.json();
    const vistos = new Set();
    const resultados = [];
    for (const d of data) {
      if (!d.lat || !d.lon) continue;
      const addr = d.address || {};
      const nombreCiudad = addr.city || addr.town || addr.village || addr.municipality || addr.county || d.name || q;
      const pais = addr.country || "";
      const clave = `${nombreCiudad}|${pais}`;
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      resultados.push({ nombre: nombreCiudad, pais, lat: parseFloat(d.lat), lon: parseFloat(d.lon) });
    }
    return resultados;
  } catch {
    return [];
  }
}

// Calcula la carta completa cuando hay hora y coordenadas de nacimiento; si falta algo,
// devuelve solo el signo solar (igual que antes) para no romper las pantallas que ya
// dependían de eso.
export function calcularCartaCompleta(nacimiento) {
  const sol = calcularSignoSolar(nacimiento?.fecha);
  if (!sol) return null;
  const tieneUbicacion = !!(nacimiento.hora && typeof nacimiento.lat === "number" && typeof nacimiento.lon === "number");
  if (!tieneUbicacion) return { completo: false, sol };

  try {
    const [y, m, d] = nacimiento.fecha.split("-").map(Number);
    const [hh, mm] = nacimiento.hora.split(":").map(Number);
    const origin = new EphemerisOrigin({
      year: y,
      month: m - 1,
      date: d,
      hour: hh,
      minute: mm,
      latitude: nacimiento.lat,
      longitude: nacimiento.lon,
    });
    const horoscope = new EphemerisHoroscope({
      origin,
      houseSystem: "whole-sign",
      zodiac: "tropical",
      aspectPoints: ["bodies"],
      aspectWithPoints: ["bodies"],
      aspectTypes: ["major"],
      customOrbs: {},
      language: "es",
    });
    // La librería no siempre respeta `language: "es"` para el Ascendente (bug conocido:
    // devuelve el nombre del signo en inglés aunque el resto de la carta esté en español).
    // Se intenta el match directo y, si falla, se traduce desde inglés como respaldo.
    const buscarSigno = (nombreSigno) =>
      ZODIACO.find((z) => z.signo === nombreSigno) ||
      (SIGNOS_EN_ES[nombreSigno] ? ZODIACO.find((z) => z.signo === SIGNOS_EN_ES[nombreSigno]) : null) ||
      null;

    const solCalculado = buscarSigno(horoscope.CelestialBodies.sun.Sign.label) || sol;
    const luna = buscarSigno(horoscope.CelestialBodies.moon.Sign.label);
    const ascendente = buscarSigno(horoscope.Ascendant.Sign.label);
    const medioCielo = buscarSigno(horoscope.Midheaven.Sign.label);
    const idxAsc = ZODIACO.findIndex((z) => z === ascendente);
    const descendente = idxAsc >= 0 ? ZODIACO[(idxAsc + 6) % 12] : null;
    const idxMC = ZODIACO.findIndex((z) => z === medioCielo);
    const fondoCielo = idxMC >= 0 ? ZODIACO[(idxMC + 6) % 12] : null;
    const casas = horoscope.Houses.map((h) => ({ numero: h.id, nombre: h.label, signo: buscarSigno(h.Sign.label) }));

    return { completo: true, sol: solCalculado, luna, ascendente, descendente, medioCielo, fondoCielo, casas };
  } catch {
    // Si la librería falla por cualquier razón (fecha/hora mal formada, etc.), degradamos
    // con gracia al cálculo simple de solo signo solar en vez de romper la pantalla.
    return { completo: false, sol };
  }
}

export const TONALPOHUALLI_SIGNOS = [
  { nombre: "Cipactli", es: "Caimán", deidad: "Tonacatecuhtli", energia: "Origen, inicio, fuerza primordial" },
  { nombre: "Ehécatl", es: "Viento", deidad: "Quetzalcóatl", energia: "Comunicación, movimiento, cambio" },
  { nombre: "Calli", es: "Casa", deidad: "Tepeyollotl", energia: "Hogar, interioridad, protección" },
  { nombre: "Cuetzpalin", es: "Lagartija", deidad: "Huehuecóyotl", energia: "Fertilidad, agilidad, regeneración" },
  { nombre: "Cóatl", es: "Serpiente", deidad: "Chalchiuhtlicue", energia: "Transformación, sabiduría, instinto" },
  { nombre: "Miquiztli", es: "Muerte", deidad: "Tecciztécatl", energia: "Cierre de ciclos, renacimiento" },
  { nombre: "Mázatl", es: "Venado", deidad: "Tláloc", energia: "Sensibilidad, intuición, cuidado" },
  { nombre: "Tochtli", es: "Conejo", deidad: "Mayahuel", energia: "Abundancia, fertilidad, celebración" },
  { nombre: "Atl", es: "Agua", deidad: "Xiuhtecuhtli", energia: "Emoción, purificación, flujo" },
  { nombre: "Itzcuintli", es: "Perro", deidad: "Mictlantecuhtli", energia: "Lealtad, guía, compañía" },
  { nombre: "Ozomahtli", es: "Mono", deidad: "Xochipilli", energia: "Creatividad, juego, ingenio" },
  { nombre: "Malinalli", es: "Hierba", deidad: "Patécatl", energia: "Resiliencia, adaptación, tenacidad" },
  { nombre: "Ácatl", es: "Carrizo", deidad: "Tezcatlipoca", energia: "Rectitud, liderazgo, dirección" },
  { nombre: "Océlotl", es: "Jaguar", deidad: "Tlazoltéotl", energia: "Poder, misterio, fuerza interior" },
  { nombre: "Cuāuhtli", es: "Águila", deidad: "Xipe Tótec", energia: "Visión amplia, libertad, ambición" },
  { nombre: "Cozcacuāuhtli", es: "Zopilote", deidad: "Itzpapálotl", energia: "Longevidad, sabiduría, limpieza" },
  { nombre: "Ollin", es: "Movimiento", deidad: "Xólotl", energia: "Transformación constante, dinamismo" },
  { nombre: "Técpatl", es: "Pedernal", deidad: "Chalchiuhtotolin", energia: "Claridad, decisión, corte preciso" },
  { nombre: "Quiáhuitl", es: "Lluvia", deidad: "Tonatiuh", energia: "Renovación, generosidad del cielo" },
  { nombre: "Xóchitl", es: "Flor", deidad: "Xochiquétzal", energia: "Belleza, arte, plenitud" },
];

// Correlación de Alfonso Caso: 13 de agosto de 1521 (calendario juliano) = 1-Cóatl.
// Equivale al 23 de agosto de 1521 en el calendario gregoriano proléptico.
export const ANCLA_TONALLI = Date.UTC(1521, 7, 23);
export const ANCLA_SIGNO_IDX = 4; // Cóatl
export const ANCLA_NUMERO = 1;

// ===== Números sagrados (numerología del camino de vida) =====
// Se calcula sumando todos los dígitos de la fecha de nacimiento y reduciendo el
// resultado a un solo dígito, salvo que se trate de un número maestro (11, 22, 33),
// que se conserva sin reducir — es la convención estándar en numerología occidental.
export const NUMEROLOGIA_CAMINO_VIDA = {
  1: {
    nombre: "El Iniciador",
    sentido:
      "El 1 es la energía de comenzar: liderazgo, independencia y la fuerza para abrir camino donde antes no había ninguno. Quienes portan este número suelen sentirse llamados a decidir por sí mismos, más que a seguir instrucciones ajenas.",
    enfoque: "Practica confiar en tu primera decisión antes de pedir demasiadas opiniones externas.",
  },
  2: {
    nombre: "El Diplomático",
    sentido:
      "El 2 es la energía del vínculo: cooperación, sensibilidad y la capacidad de sostener a otros sin perderse en el intento. Suele manifestarse como una atención fina a lo que el otro necesita, a veces más que a lo que uno mismo necesita.",
    enfoque: "Practica nombrar tus propias necesidades con la misma claridad con que percibes las ajenas.",
  },
  3: {
    nombre: "El Comunicador",
    sentido:
      "El 3 es la energía de la expresión: creatividad, alegría y la necesidad de que lo que se siente por dentro encuentre una forma de salir —palabra, arte, conversación. Cuando se bloquea, suele sentirse como un peso en el pecho o la garganta.",
    enfoque: "Practica compartir una idea o sentimiento a la semana sin pulirlo antes de decirlo.",
  },
  4: {
    nombre: "El Constructor",
    sentido:
      "El 4 es la energía de la estructura: disciplina, orden y la paciencia de construir algo que dure. Quienes portan este número suelen ser el sostén silencioso de sus familias o equipos, aunque pocas veces lo reconozcan en voz alta.",
    enfoque: "Practica pedir reconocimiento por lo que sostienes, en vez de esperar a que se note solo.",
  },
  5: {
    nombre: "El Explorador",
    sentido:
      "El 5 es la energía del movimiento: libertad, cambio y una curiosidad que no tolera bien la rutina prolongada. La quietud forzada suele sentirse, para este número, como una forma sutil de encierro.",
    enfoque: "Practica introducir un cambio pequeño y deliberado cuando sientas que todo se volvió predecible.",
  },
  6: {
    nombre: "El Cuidador",
    sentido:
      "El 6 es la energía del hogar: responsabilidad, cuidado y un sentido profundo de comunidad y familia. Su reto más común es confundir el amor con la obligación de resolverle la vida a los demás.",
    enfoque: "Practica cuidar sin rescatar: pregúntate si lo que estás por hacer te lo pidieron, o si lo asumiste tú sola.",
  },
  7: {
    nombre: "El Buscador",
    sentido:
      "El 7 es la energía de la introspección: análisis, espiritualidad y una necesidad genuina de entender el porqué detrás de las cosas, no solo el qué. Suele requerir más soledad que la mayoría para procesar lo que vive.",
    enfoque: "Practica permitirte ese tiempo a solas sin culpa, en vez de forzarte a estar siempre disponible.",
  },
  8: {
    nombre: "El Realizador",
    sentido:
      "El 8 es la energía del logro: poder personal, abundancia material y la capacidad de materializar visiones grandes. Su aprendizaje central suele ser distinguir el poder que construye del poder que controla.",
    enfoque: "Practica revisar si tus decisiones últimas vienen de la abundancia o del miedo a no tener suficiente.",
  },
  9: {
    nombre: "El Compasivo",
    sentido:
      "El 9 es la energía del cierre de ciclos: compasión amplia, servicio a otros y la sabiduría que llega después de haber vivido mucho. Suele cargar una sensibilidad especial hacia el sufrimiento ajeno, a veces más que hacia el propio.",
    enfoque: "Practica cerrar un ciclo pendiente antes de abrir uno nuevo; el 9 sana soltando, no acumulando.",
  },
  11: {
    nombre: "El Intuitivo (número maestro)",
    sentido:
      "El 11 es un número maestro: intuición elevada, sensibilidad casi profética y una capacidad de inspirar a otros con el propio ejemplo. Esa misma sensibilidad puede volverse abrumadora si no se aprende a poner límites energéticos claros.",
    enfoque: "Practica proteger tu energía tanto como confías en tu intuición; ambas son parte del mismo don.",
  },
  22: {
    nombre: "El Constructor Maestro (número maestro)",
    sentido:
      "El 22 es un número maestro: la capacidad de tomar una visión grande e idealista y volverla realidad concreta, a gran escala. El reto suele ser el peso de sentir que cada proyecto debe ser trascendental para valer la pena.",
    enfoque: "Practica permitirte construir también en pequeño, sin que todo tenga que cambiar el mundo.",
  },
  33: {
    nombre: "El Maestro Sanador (número maestro)",
    sentido:
      "El 33 es un número maestro: servicio incondicional, compasión elevada y una vocación natural de acompañar la sanación de otros. El riesgo es dar tanto que se olvide sanarse a una misma primero.",
    enfoque: "Practica recibir cuidado con la misma generosidad con la que lo das a los demás.",
  },
};

export function reducirNumeroSagrado(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

export function calcularNumeroSagrado(fechaStr) {
  if (!fechaStr) return null;
  const digitos = fechaStr.replace(/-/g, "").split("").map(Number);
  const suma = digitos.reduce((a, b) => a + b, 0);
  return reducirNumeroSagrado(suma);
}

// Número de expresión (o destino): se calcula con el valor numérico de cada letra del
// nombre completo, según la tabla pitagórica tradicional de numerología, y se reduce
// igual que el número de camino de vida (conservando los números maestros 11/22/33).
export const VALORES_PITAGORICOS = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};