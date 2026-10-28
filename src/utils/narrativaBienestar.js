import { t } from "../data/translations.js";

export const TEMAS_HISTORIA = {
  familia: [
    // ES
    "mamá", "mama", "papá", "papa", "madre", "padre", "hermano", "hermana", "abuela", "abuelo", "familia", "hijo", "hija", "tío", "tía", "tio", "tia", "primo", "prima", "árbol", "ancestros", "linaje", "lealtad",
    // EN
    "mom", "mother", "dad", "father", "brother", "sister", "grandma", "grandmother", "grandpa", "grandfather", "family", "son", "daughter", "uncle", "aunt", "cousin", "parents", "ancestors", "lineage",
    // FR
    "maman", "mère", "mere", "papa", "père", "pere", "frère", "frere", "sœur", "soeur", "grand-mère", "grand-père", "famille", "fils", "fille", "oncle", "tante", "cousin", "cousine", "parents", "ancêtres",
    // IT
    "mamma", "madre", "papà", "papa", "padre", "fratello", "sorella", "nonna", "nonno", "famiglia", "figlio", "figlia", "zio", "zia", "cugino", "cugina", "genitori", "antenati"
  ],
  perdida: [
    // ES
    "murió", "murio", "falleció", "fallecio", "muerte", "perdí", "perdi", "duelo", "perder", "fallecimiento", "pérdida", "perdida", "despedida", "adiós",
    // EN
    "died", "passed away", "death", "lost", "loss", "grief", "mourning", "bereavement", "goodbye",
    // FR
    "mort", "morte", "décès", "deces", "décédé", "perdu", "perte", "deuil", "adieu",
    // IT
    "morto", "morta", "decesso", "deceduto", "perso", "perdita", "lutto", "addio"
  ],
  pareja: [
    // ES
    "pareja", "esposo", "esposa", "novio", "novia", "matrimonio", "divorcio", "separación", "separacion", "exnovio", "exnovia", "ex pareja", "infidelidad", "distanciamiento",
    // EN
    "partner", "husband", "wife", "boyfriend", "girlfriend", "marriage", "divorce", "separation", "breakup", "ex", "spouse", "infidelity",
    // FR
    "conjoint", "mari", "femme", "copain", "copine", "mariage", "divorce", "séparation", "rupture", "ex", "couple", "infidélité",
    // IT
    "partner", "marito", "moglie", "fidanzato", "fidanzata", "matrimonio", "divorzio", "separazione", "rottura", "ex", "coppia", "infedeltà"
  ],
  trabajo: [
    // ES
    "trabajo", "jefe", "jefa", "empleo", "dinero", "deuda", "despido", "renuncié", "renuncie", "negocio", "desempleo", "laboral", "sobrecarga", "profesional",
    // EN
    "work", "job", "boss", "employment", "money", "debt", "fired", "laid off", "quit", "business", "unemployment", "career", "overload",
    // FR
    "travail", "boulot", "patron", "patronne", "emploi", "argent", "dette", "licencié", "démission", "entreprise", "chômage", "surcharge",
    // IT
    "lavoro", "capo", "impiego", "denaro", "soldi", "debito", "licenziato", "dimesso", "azienda", "disoccupazione", "sovraccarico"
  ]
};

export const EMOCIONES_EXPANSIVAS = new Set([
  "alegría", "alegria", "entusiasmo", "gratitud", "paz interior", "esperanza",
  "ilusión", "ilusion", "serenidad", "motivación", "motivacion", "confianza",
  "joy", "enthusiasm", "gratitude", "inner peace", "hope", "excitement", "serenity", "motivation", "trust",
  "joie", "enthousiasme", "paix intérieure", "espoir", "élan de vie", "sérénité",
  "gioia", "gratitudine", "pace interiore", "speranza", "slancio vitale", "serenità", "motivazione", "fiducia"
]);

export function detectarTemas(texto) {
  const t = (texto || "").toLowerCase();
  const temas = {};
  Object.entries(TEMAS_HISTORIA).forEach(([tema, palabras]) => {
    temas[tema] = palabras.some((p) => t.includes(p));
  });
  return temas;
}

export function parrafoConstelaciones(idioma = "es") {
  switch (idioma) {
    case "en":
      return `Something you shared relates to your family, and it is worth looking at from this perspective: within the framework of Family Constellations, the systemic method created by Bert Hellinger, what we feel often does not originate solely from what happened to us personally, but from an invisible loyalty toward someone else in the family system — an unspoken place, a destiny that is "inherited" without anyone consciously deciding to. You don't need to have the answer right now; it is enough to ask yourself, with curiosity and without guilt, whether what you feel also belonged to someone before you in your family.`;
    case "fr":
      return `Une part de ce que vous avez partagé touche à votre famille, et il est précieux de l'observer sous cet angle : dans le cadre des Constellations Familiales, l'approche systémique développée par Bert Hellinger, ce que nous ressentons ne naît pas toujours uniquement de notre propre vécu, mais d'une loyauté invisible envers un autre membre du système — un non-dit, un destin qui « s'hérite » sans que personne ne le décide consciemment. Il n'est pas nécessaire d'avoir la réponse immédiatement ; il suffit de vous demander, avec bienveillance et sans culpabilité, si ce ressenti n'a pas appartenu auparavant à quelqu'un d'autre dans votre arbre généalogique.`;
    case "it":
      return `Qualcosa di ciò che hai condiviso riguarda la tua famiglia, e vale la pena guardarlo anche da questa prospettiva: nell'ambito delle Costellazioni Familiari, il metodo sistemico creato da Bert Hellinger, spesso ciò che proviamo non nasce soltanto da ciò che è accaduto a noi direttamente, ma da una lealtà invisibile verso qualcun altro nel sistema familiare — un vuoto mai nominato, un destino che si "eredita" senza che nessuno lo decida consapevolmente. Non occorre avere la risposta adesso; è sufficiente chiederti, con curiosità e senza colpa, se ciò che provi sia appartenuto prima a qualcun altro nella tua famiglia.`;
    default:
      return `Algo de lo que compartiste tiene que ver con tu familia, y vale la pena mirarlo también desde ahí: en el marco de las Constelaciones Familiares, el método sistémico creado por Bert Hellinger, muchas veces lo que sentimos no nace solo de lo que nos pasó a nosotras mismas, sino de una lealtad invisible hacia alguien más del sistema — un lugar que quedó sin nombrar, un destino que "se hereda" sin que nadie lo decida a propósito. No hace falta tener la respuesta ahora; basta con preguntarte, con curiosidad y sin culpa, si esto que sientes también le perteneció antes a alguien más en tu familia.`;
  }
}

export function parrafoPatronTransgeneracional(idioma = "es") {
  switch (idioma) {
    case "en":
      return `Within this same framework, there are recognized patterns worth knowing, in case any resonate with you: "invisible family loyalty" (unknowingly repeating the fate of an ancestor), the "replacement child" (being born after a loss and unwittingly carrying that identity), "parentification" (a child emotionally taking on the role of a parent), "excluded members" (someone pushed aside by secret or judgment, whose empty place tends to be filled by another), and "systemic identification" (feeling or manifesting something that actually belongs to an unresolved fate in your family tree). None of these is a sentence; each is, above all, an invitation to observe with broader context.`;
    case "fr":
      return `Au sein de ce même cadre existent des schémas identifiés qu'il est utile de connaître si l'un d'eux résonne en vous : la « loyauté familiale invisible » (répéter inconsciemment le destin d'un ancêtre), l'« enfant de remplacement » (naître après un deuil et porter sans le vouloir cette identité), la « parentification » (un enfant assumant émotionnellement le rôle d'un parent), les « membres exclus » (quelqu'un écarté du système par un secret ou un jugement, dont la place vide cherche à être occupée), et l'« identification systémique » (ressentir ou manifester ce qui appartient au destin non résolu d'une autre personne de votre lignée). Aucun n'est une fatalité ; chacun est une invitation à regarder avec plus de profondeur.`;
    case "it":
      return `All'interno di questa stessa cornice esistono schemi già identificati che vale la pena conoscere, qualora qualcuno risuoni con te: la "lealtà familiare invisibile" (ripetere inconsapevolmente il destino di un antenato), il "figlio di sostituzione" (nascere dopo un lutto e farsi carico senza volerlo di quell'identità), la "parentificazione" (un figlio che assume emotivamente il ruolo di genitore), i "membri esclusi" (qualcuno allontanato dal sistema per segreto o giudizio, il cui posto vuoto tende a essere occupato da un altro), e l'"identificazione sistemica" (provare o manifestare qualcosa che appartiene al destino irrisolto di un'altra persona del tuo albero genealogico). Nessuno di questi è una condanna; sono tutti un invito a guardare con maggiore contesto.`;
    default:
      return `Dentro de este mismo marco existen patrones ya identificados que vale la pena conocer, por si alguno resuena contigo: la "lealtad familiar invisible" (repetir sin saberlo el destino de un ancestro), el "hijo de reemplazo" (nacer después de una pérdida y cargar sin quererlo con esa identidad), la "parentificación" (un hijo asumiendo emocionalmente el rol de uno de sus padres), los "miembros excluidos" (alguien apartado del sistema por secreto o juicio, cuyo lugar vacío tiende a ser ocupado por otro), y la "identificación sistémica" (sentir o manifestar algo que en realidad le pertenece al destino no resuelto de otra persona de tu árbol). Ninguno es una sentencia; todos son, ante todo, una invitación a mirar con más contexto.`;
  }
}

export function parrafoPerdida(idioma = "es") {
  switch (idioma) {
    case "en":
      return `In what you shared, a sense of loss appears. Grief follows neither a strict schedule nor linear logic; both the body and emotions often continue processing long after it "should already be overcome" — this is not a shortcoming, it is simply how genuine healing works.`;
    case "fr":
      return `Dans ce que vous avez écrit apparaît une perte. Le deuil ne suit ni calendrier ni logique linéaire ; le corps et les émotions continuent souvent d'élaborer bien après le moment où « tout devrait être surmonté » — ce n'est aucunement un échec, c'est simplement ainsi que s'opère une véritable guérison.`;
    case "it":
      return `In ciò che hai scritto emerge una perdita. Il lutto non segue orari né una logica lineare; il corpo e le emozioni spesso continuano a elaborare molto tempo dopo il momento in cui "dovrebbe essere già superato" — questo non è un tuo errore, è semplicemente il modo in cui funziona la vera guarigione.`;
    default:
      return `En lo que escribiste aparece una pérdida. El duelo no sigue un horario ni una lógica ordenada, y el cuerpo y la emoción muchas veces siguen procesando algo mucho después de que "ya debería estar superado" — eso no es una falla tuya, es simplemente cómo funciona sanar de verdad.`;
  }
}

export function parrafoPareja(idioma = "es") {
  switch (idioma) {
    case "en":
      return `What you shared also touches on a relationship bond. These manifestations often intensify when there is something in the dynamic — present or past — that is still seeking to be named, acknowledged, or understood, rather than quickly "fixed".`;
    case "fr":
      return `Ce que vous avez partagé touche également à un lien affectif ou de couple. Ces affections s'intensifient souvent lorsqu'il y a un élément du lien — présent ou passé — qui cherche encore à être nommé, clôturé ou compris, plutôt que « réglé » à la hâte.`;
    case "it":
      return `Quanto hai condiviso tocca anche un legame di coppia. Questi disturbi tendono a intensificarsi quando c'è qualcosa nella relazione — presente o passata — che chiede ancora di essere nominato, compreso o integrato, prima ancora di essere "risolto" in fretta.`;
    default:
      return `Lo que compartiste toca también un vínculo de pareja. Estas afectaciones suelen intensificarse cuando hay algo del vínculo —presente o pasado— que todavía busca ser nombrado, cerrado o comprendido, más que "resuelto" de inmediato.`;
  }
}

export function parrafoTrabajo(idioma = "es") {
  switch (idioma) {
    case "en":
      return `Among what you shared, the realm of work or financial support also appears. This type of tension often activates the body with the same intensity as an emotional conflict, even if we sometimes take it less seriously thinking it is "only" about finances.`;
    case "fr":
      return `Dans votre récit apparaît également le domaine du travail ou de la sécurité matérielle. Ce type de tension active souvent le corps avec la même vigueur qu'un conflit affectif, même si on a parfois tendance à le minimiser sous prétexte qu'il s'agit « seulement » d'argent.`;
    case "it":
      return `Tra ciò che hai raccontato emerge anche la sfera del lavoro o del sostentamento economico. Questo tipo di tensione attiva spesso il corpo con la stessa forza di un conflitto affettivo, anche se a volte la sottovalutiamo pensando che si tratti "solo" di questioni pratiche.`;
    default:
      return `Entre lo que contaste aparece también el terreno del trabajo o el sostén económico. Este tipo de tensión suele activar al cuerpo con la misma fuerza que un conflicto afectivo, aunque a veces la tomamos menos en serio por tratarse "solo" de dinero.`;
  }
}

export function generarEjemploCotidiano(r, idioma = "es") {
  if (!r || !r.capa) return null;
  const termino = (r.termino || "").toLowerCase();
  
  if (idioma === "en") {
    const ejemplos = {
      Ectodermo: `To make this more concrete: imagine someone who, after a conversation where they felt unheard or ignored, notices that very evening a physical reaction around “${termino}” that was not there before — without consciously linking it to the conversation. The ectoderm (skin, eyes, ears, nervous system) often expresses precisely what words could not fully convey.`,
      Mesodermo: `An everyday example: someone who has been carrying weeks of heavy responsibility without asking for help, and starts noticing “${termino}” with no apparent physical injury. The mesoderm — muscles, bones, structure, circulatory system — often literally translates feelings like “carrying the weight” or “lacking support”.`,
      Endodermo: `To illustrate this: someone who avoids a difficult conversation for days, and right before finally having it, begins to notice “${termino}”. The endoderm often expresses what a person has not yet been able to “digest” or emotionally assimilate.`,
      "Sistema nervioso": `An everyday example: someone going through a period of continuous overload who begins noticing “${termino}”, as if the body were on high alert all the time, even during apparent moments of calm. The nervous system is often the first to register sustained tension before the mind fully puts a name to it.`,
      Emoción: `An example of how this feels day to day: someone who, following a key emotional experience, notices how “${termino}” shapes their reactions, bodily openness, and perception of safety in daily encounters.`
    };
    return ejemplos[r.capa] || null;
  }
  
  if (idioma === "fr") {
    const ejemplos = {
      Ectodermo: `Pour rendre cela plus concret : imaginez une personne qui, après une discussion où elle s'est sentie ignorée ou incomprise, ressent le soir même une réaction physique dans la zone de « ${termino} » — sans faire consciemment le lien avec la conversation. L'ectoderme (peau, yeux, oreilles, système nerveux) exprime précisément ce que la parole n'a pas pu formuler.`,
      Mesodermo: `Un exemple du quotidien : quelqu'un qui porte depuis des semaines une lourde responsabilité sans demander d'aide, et commence à ressentir « ${termino} » sans cause physique apparente. Le mésoderme — muscles, os, structure, système circulatoire — traduit souvent de manière littérale des ressentis tels que « porter tout le poids » ou « manquer de soutien ».`,
      Endodermo: `Pour illustrer cela : quelqu'un qui repousse un échange difficile pendant des jours, et juste avant de l'avoir enfin, commence à ressentir « ${termino} ». L'endoderme a tendance à exprimer ce qu'on n'a pas encore pu « digérer » ou intégrer sur le plan émotionnel.`,
      "Sistema nervioso": `Un exemple concret : une personne traversant une période de surcharge constante qui commence à remarquer « ${termino} », comme si son organisme était en alerte perpétuelle, même dans les moments de repos apparent. Le système nerveux est souvent le premier à enregistrer une tension continue, avant même que l'esprit ne parvienne à la nommer.`,
      Emoción: `Un exemple de la façon dont cela se vit au quotidien : « ${termino} » influence directement la manière dont le corps s'ouvre ou se protège, guidant vos choix et vos interactions avec l'entourage.`
    };
    return ejemplos[r.capa] || null;
  }

  if (idioma === "it") {
    const ejemplos = {
      Ectodermo: `Per renderlo più concreto: immagina qualcuno che, dopo una conversazione in cui non si è sentito ascoltato o compreso, avverte quella sera stessa una reazione fisica nell'area di “${termino}” — senza collegarla consapevolmente alla discussione. L'ectoderma (pelle, occhi, orecchie, sistema nervoso) esprime proprio ciò che le parole non sono riuscite a dire fino in fondo.`,
      Mesodermo: `Un esempio quotidiano: qualcuno che da settimane sostiene una responsabilità impegnativa senza chiedere aiuto, e inizia ad avvertire “${termino}” senza una causa fisica evidente. Il mesoderma — muscoli, ossa, struttura, sistema circolatorio — traduce spesso letteralmente sensazioni come "sostenere tutto il peso" o "non avere appoggio".`,
      Endodermo: `Per illustrarlo: qualcuno che rimanda un confronto difficile per giorni, e proprio prima di affrontarlo, inizia a notare “${termino}”. L'endoderma tende a esprimere ciò che la persona non è ancora riuscita a "digerire" o elaborare emotivamente.`,
      "Sistema nervioso": `Un esempio concreto: qualcuno che attraversa una fase di sovraccarico continuo e comincia ad avvertire “${termino}”, come se il corpo fosse sempre in stato di allerta, persino nei momenti di apparente tranquillità. Il sistema nervoso è spesso il primo a registrare una tensione prolungata, prima che la mente riesca a darle un nome.`,
      Emoción: `Un esempio di come questo si vive nella quotidianità: “${termino}” modella la disponibilità del corpo a rilassarsi o a proteggersi, orientando il modo in cui ci si relaziona con se stessi e con gli altri.`
    };
    return ejemplos[r.capa] || null;
  }

  // Default Spanish
  const ejemplos = {
    Ectodermo: `Para que se sienta más concreto: imagina a alguien que, después de una conversación donde sintió que no la escucharon del todo, nota esa misma noche una reacción física en la zona de “${termino}” que no tenía antes —sin relacionarla conscientemente con la conversación—. El ectodermo (piel, ojos, oídos, sistema nervioso) suele expresar justo así lo que la palabra no logró decir del todo.`,
    Mesodermo: `Un ejemplo cotidiano: alguien que lleva semanas sosteniendo una responsabilidad sin pedir ayuda, y empieza a notar “${termino}” sin ninguna causa física clara. El mesodermo —músculos, huesos, estructura, sistema circulatorio— suele traducir literalmente sensaciones como “sostener peso” o “no tener soporte”.`,
    Endodermo: `Para ilustrarlo: alguien que evita una conversación difícil durante días, y justo antes de finalmente tenerla, empieza a notar “${termino}”. El endodermo suele expresar así aquello que la persona todavía no logra “digerir” o “procesar” emocionalmente.`,
    "Sistema nervioso": `Un ejemplo cotidiano: alguien que atraviesa una etapa de sobrecarga constante y empieza a notar “${termino}”, como si el cuerpo estuviera en alerta todo el tiempo, incluso en momentos de calma aparente. El sistema nervioso suele ser el primero en registrar una tensión sostenida, antes de que la mente termine de nombrarla del todo.`,
    Emoción: `Un ejemplo de cómo esto se siente en el día a día: “${termino}” no es un estado aislado en la cabeza; modula la apertura del pecho, el ritmo de tu respiración y la disposición del cuerpo para confiar o replegarse.`
  };
  return ejemplos[r.capa] || null;
}

// Generates a deterministic integer hash from string inputs for varied narrative archetypes
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generarNarrativaBienestar(nombre, sexo, datos, resultados, idioma = "es", usuarioContexto = {}) {
  const currentLang = idioma || "es";
  
  // Clean, humanized name handling
  const rawNombre = (nombre || usuarioContexto.nombre || usuarioContexto.apodo || "").trim();
  const primerNombre = rawNombre ? rawNombre.split(" ")[0].charAt(0).toUpperCase() + rawNombre.split(" ")[0].slice(1) : "";
  const tieneNombre = primerNombre.length > 0;

  // Emotion list formatting with translation & polarity classification
  const emArr = Array.isArray(datos.emocion) ? datos.emocion : datos.emocion ? [datos.emocion] : [];
  const emTexto = emArr
    .map((e) => (t(e, currentLang) || e || "").toLowerCase())
    .filter(Boolean)
    .join(", ");
    
  const hayEmocion = emTexto.length > 0;
  const hayHistoria = !!(datos.historia && datos.historia.trim());
  const hayFisica = !!(datos.fisica && datos.fisica.trim());
  const temas = hayHistoria ? detectarTemas(datos.historia) : {};

  // Valence detection
  const emocionesLower = emArr.map((e) => (e || "").toLowerCase());
  const tieneExpansivas = emocionesLower.some((e) => EMOCIONES_EXPANSIVAS.has(e));
  const tieneProtectoras = emocionesLower.some((e) => !EMOCIONES_EXPANSIVAS.has(e));
  const esMixto = tieneExpansivas && tieneProtectoras;
  const esSoloExpansivo = tieneExpansivas && !tieneProtectoras;

  // Context & Days active extraction
  const diaReto = Number(usuarioContexto.diaReto || usuarioContexto.retoDiaActual || 1);
  const retoCompletados = usuarioContexto.retoCompletados || [];
  const rachaDias = retoCompletados.length || (diaReto > 1 ? diaReto - 1 : 0);
  const entradasCount = Number(usuarioContexto.entradasCount || 0);

  // Construct listaPartes according to language
  const partes = [];
  if (hayHistoria) {
    if (currentLang === "en") partes.push("your story");
    else if (currentLang === "fr") partes.push("votre récit");
    else if (currentLang === "it") partes.push("la tua storia");
    else partes.push("tu historia");
  }
  if (hayFisica) {
    const fTrim = datos.fisica.trim();
    if (currentLang === "en") partes.push(`the physical symptom you described (“${fTrim}”)`);
    else if (currentLang === "fr") partes.push(`l'affection physique décrite (« ${fTrim} »)`);
    else if (currentLang === "it") partes.push(`il disturbo fisico descritto (“${fTrim}”)`);
    else partes.push(`la afectación física que describiste (“${fTrim}”)`);
  }
  if (hayEmocion) {
    if (currentLang === "en") partes.push(`the emotion you identified (${emTexto})`);
    else if (currentLang === "fr") partes.push(`l'émotion identifiée (${emTexto})`);
    else if (currentLang === "it") partes.push(`l'emozione che hai identificato (${emTexto})`);
    else partes.push(`la emoción que identificaste (${emTexto})`);
  }

  const andWord = currentLang === "en" ? " and " : currentLang === "fr" ? " et " : currentLang === "it" ? " e " : " y ";
  const listaPartes = partes.length === 0
    ? (currentLang === "en" ? "what you shared" : currentLang === "fr" ? "ce que vous avez partagé" : currentLang === "it" ? "quanto hai condiviso" : "lo que compartiste")
    : partes.length === 1
    ? partes[0]
    : partes.slice(0, -1).join(", ") + andWord + partes[partes.length - 1];

  const parrafos = [];
  const secciones = {
    intro: "",
    jornada: "",
    polaridad: "",
    historia: "",
    historiaFragmento: "",
    sistemicos: [],
    ejemploCotidiano: "",
    segundoHilo: "",
    brujula: "",
    cierre: ""
  };

  // Párrafo 0: No match found
  if (!resultados || resultados.length === 0) {
    const saludoVacio = tieneNombre ? `${primerNombre}, ` : "";
    if (currentLang === "en") {
      parrafos.push(
        `${saludoVacio}with what you shared so far we couldn't find an exact match in our biological dictionary yet. This doesn't mean there is nothing to explore, but perhaps with different words we can locate it better.`
      );
      parrafos.push(
        `If you described a physical symptom, try naming it simply and directly (for example: “headache”, “gastritis”, “back pain”). You can also add an emotion or recent situation, but it is optional: the symptom alone is enough for an initial reading.`
      );
    } else if (currentLang === "fr") {
      parrafos.push(
        `${saludoVacio}avec ce que vous avez partagé jusqu'à présent, nous n'avons pas encore trouvé de lecture claire dans notre dictionnaire. Cela ne signifie pas qu'il n'y a rien à explorer, mais peut-être qu'avec d'autres mots nous pourrons mieux le situer.`
      );
      parrafos.push(
        `Si vous avez décrit un symptôme physique, essayez de le nommer de manière simple et directe (par exemple : « maux de tête », « gastrite », « mal de dos »). Vous pouvez également ajouter une émotion ou une situation récente si vous le souhaitez, mais ce n'est pas obligatoire : le symptôme suffit pour tenter une première lecture.`
      );
    } else if (currentLang === "it") {
      parrafos.push(
        `${saludoVacio}con quanto hai condiviso finora non siamo ancora riusciti a trovare una corrispondenza chiara nel nostro dizionario. Ciò non significa che non ci sia nulla da osservare, ma forse con altre parole possiamo individuarlo meglio.`
      );
      parrafos.push(
        `Se hai descritto un disturbo fisico, prova a nominarlo in modo semplice e diretto (ad esempio: “mal di testa”, “gastrite”, “mal di schiena”). Puoi anche aggiungere un'emozione o una situazione recente se vuoi, ma non è obbligatorio: il sintomo è sufficiente per tentare una prima lettura.`
      );
    } else {
      parrafos.push(
        `${saludoVacio}con lo que compartiste hasta ahora todavía no logramos encontrar una lectura clara en nuestro diccionario biológico. Esto no significa que no haya nada que ver, sino que quizás con otras palabras podamos ubicarlo mejor.`
      );
      parrafos.push(
        `Si describiste una afectación física, prueba nombrándola de forma sencilla y directa (por ejemplo: “dolor de cabeza”, “gastritis”, “dolor de espalda”). También puedes añadir una emoción o una situación reciente si quieres, pero no es obligatorio: con el síntoma basta para intentar una primera lectura.`
      );
    }
    return parrafos;
  }

  const r = resultados[0];
  const capaTraducida = (t(r.capa, currentLang) || r.capa || "").toLowerCase();

  // Dynamic Opening Archetype Selection (0: Somatic Mirror, 1: Compassionate Inquiry, 2: Systemic Clarity, 3: Integrative Pause)
  const seedString = `${primerNombre}_${datos.historia || ''}_${datos.fisica || ''}_${emTexto}_${diaReto}_${r.id}`;
  const openingVariant = hashString(seedString) % 4;

  // Build Personalized Opening
  if (currentLang === "en") {
    const intros = [
      tieneNombre
        ? `${primerNombre}, as we listen closely to ${listaPartes}, there is a distinct somatic coherence pointing to “${r.termino}” (${capaTraducida} layer). ${r.sentido}`
        : `As we listen closely to ${listaPartes}, there is a distinct somatic coherence pointing to “${r.termino}” (${capaTraducida} layer). ${r.sentido}`,
      tieneNombre
        ? `Thank you for taking this moment of presence, ${primerNombre}. When reflecting upon ${listaPartes}, the body and psyche bring focus to “${r.termino}”, an expression of the ${capaTraducida} layer. ${r.sentido}`
        : `Taking this moment of presence allows us to observe ${listaPartes} clearly: the body and psyche bring focus to “${r.termino}”, an expression of the ${capaTraducida} layer. ${r.sentido}`,
      tieneNombre
        ? `${primerNombre}, behind ${listaPartes}, there is a meaningful biological thread connected to “${r.termino}” (related to the ${capaTraducida} layer). ${r.sentido}`
        : `Looking at ${listaPartes}, there is a meaningful biological thread connected to “${r.termino}” (related to the ${capaTraducida} layer). ${r.sentido}`,
      tieneNombre
        ? `In this moment of your path, ${primerNombre}, ${listaPartes} sheds light on “${r.termino}”, an affection of the ${capaTraducida} layer. ${r.sentido}`
        : `In this moment of reflection, ${listaPartes} sheds light on “${r.termino}”, an affection of the ${capaTraducida} layer. ${r.sentido}`
    ];
    parrafos.push(intros[openingVariant]);
  } else if (currentLang === "fr") {
    const intros = [
      tieneNombre
        ? `${primerNombre}, en écoutant avec attention ${listaPartes}, une cohérence somatique nette se dégage vers « ${r.termino} » (couche ${capaTraducida}). ${r.sentido}`
        : `En écoutant avec attention ${listaPartes}, une cohérence somatique nette se dégage vers « ${r.termino} » (couche ${capaTraducida}). ${r.sentido}`,
      tieneNombre
        ? `Merci pour ce temps de présence, ${primerNombre}. En observant ${listaPartes}, le corps et la psyché mettent en lumière « ${r.termino} », une affection de couche ${capaTraducida}. ${r.sentido}`
        : `Ce temps de présence permet d'observer ${listaPartes} avec clarté : le corps et la psyché mettent en lumière « ${r.termino} », une affection de couche ${capaTraducida}. ${r.sentido}`,
      tieneNombre
        ? `${primerNombre}, derrière ${listaPartes}, un fil biologique profond se relie à « ${r.termino} » (associé à la couche ${capaTraducida}). ${r.sentido}`
        : `En contemplant ${listaPartes}, un fil biologique profond se relie à « ${r.termino} » (associé à la couche ${capaTraducida}). ${r.sentido}`,
      tieneNombre
        ? `À cette étape de votre parcours, ${primerNombre}, ${listaPartes} révèle « ${r.termino} », une affection de couche ${capaTraducida}. ${r.sentido}`
        : `À cette étape d'exploration, ${listaPartes} révèle « ${r.termino} », une affection de couche ${capaTraducida}. ${r.sentido}`
    ];
    parrafos.push(intros[openingVariant]);
  } else if (currentLang === "it") {
    const intros = [
      tieneNombre
        ? `${primerNombre}, ascoltando con cura ${listaPartes}, emerge una chiara coerenza somatica verso “${r.termino}” (livello ${capaTraducida}). ${r.sentido}`
        : `Ascoltando con cura ${listaPartes}, emerge una chiara coerenza somatica verso “${r.termino}” (livello ${capaTraducida}). ${r.sentido}`,
      tieneNombre
        ? `Grazie per questo spazio di ascolto sincero, ${primerNombre}. Osservando ${listaPartes}, il corpo e l'emozione mettono a fuoco “${r.termino}”, un'espressione del livello ${capaTraducida}. ${r.sentido}`
        : `Questo momento di ascolto permette di osservare ${listaPartes} con nitidezza: il corpo e l'emozione mettono a fuoco “${r.termino}”, un'espressione del livello ${capaTraducida}. ${r.sentido}`,
      tieneNombre
        ? `${primerNombre}, dietro ${listaPartes}, c'è un filo biologico significativo legato a “${r.termino}” (connesso al livello ${capaTraducida}). ${r.sentido}`
        : `Guardando ${listaPartes}, c'è un filo biologico significativo legato a “${r.termino}” (connesso al livello ${capaTraducida}). ${r.sentido}`,
      tieneNombre
        ? `In questa fase del tuo cammino, ${primerNombre}, ${listaPartes} porta chiarezza su “${r.termino}”, un'affezione del livello ${capaTraducida}. ${r.sentido}`
        : `In questo momento di riflessione, ${listaPartes} porta chiarezza su “${r.termino}”, un'affezione del livello ${capaTraducida}. ${r.sentido}`
    ];
    parrafos.push(intros[openingVariant]);
  } else {
    // Spanish
    const intros = [
      tieneNombre
        ? `${primerNombre}, al escuchar con detenimiento ${listaPartes}, surge una coherencia somática muy clara hacia “${r.termino}”, una afectación de capa ${capaTraducida}. ${r.sentido}`
        : `Al escuchar con detenimiento ${listaPartes}, surge una coherencia somática muy clara hacia “${r.termino}”, una afectación de capa ${capaTraducida}. ${r.sentido}`,
      tieneNombre
        ? `Qué valioso este espacio de pausa que te regalas, ${primerNombre}. Al contemplar ${listaPartes}, el cuerpo y el sentir ponen en foco “${r.termino}”, correspondiente a la capa ${capaTraducida}. ${r.sentido}`
        : `Hacer esta pausa consciente permite mirar ${listaPartes} con nitidez: el cuerpo y el sentir ponen en foco “${r.termino}”, correspondiente a la capa ${capaTraducida}. ${r.sentido}`,
      tieneNombre
        ? `${primerNombre}, detrás de ${listaPartes}, se dibuja un hilo biológico lleno de sentido que conecta con “${r.termino}” (capa ${capaTraducida}). ${r.sentido}`
        : `Al observar ${listaPartes}, se dibuja un hilo biológico lleno de sentido que conecta con “${r.termino}” (capa ${capaTraducida}). ${r.sentido}`,
      tieneNombre
        ? `En este momento de tu recorrido personal, ${primerNombre}, ${listaPartes} arroja luz sobre “${r.termino}”, una manifestación en la capa ${capaTraducida}. ${r.sentido}`
        : `En este momento de tu recorrido, ${listaPartes} arroja luz sobre “${r.termino}”, una manifestación en la capa ${capaTraducida}. ${r.sentido}`
    ];
    parrafos.push(intros[openingVariant]);
  }

  // Personalization by Journey Phase (Días en la app / Reto de 21 días)
  if (diaReto > 0 || rachaDias > 0 || entradasCount > 0) {
    if (diaReto === 1 && rachaDias === 0 && entradasCount <= 1) {
      // Day 1 / Initial discovery
      if (currentLang === "en") {
        parrafos.push(`Taking this first step to register what you feel is foundational. When beginning to name both physical sensations and emotional states without judgment, the nervous system starts releasing accumulated defense mechanisms.`);
      } else if (currentLang === "fr") {
        parrafos.push(`Faire ce premier pas pour nommer ce que vous ressentez est fondamental. En commençant à observer sans jugement vos sensations corporelles et vos émotions, le système nerveux amorce la libération des tensions accumulées.`);
      } else if (currentLang === "it") {
        parrafos.push(`Compiere questo primo passo per dare un nome a ciò che provi è fondamentale. Quando inizi a osservare senza giudizio le sensazioni fisiche e gli stati emotivi, il sistema nervoso comincia ad allentare i meccanismi di difesa accumulati.`);
      } else {
        parrafos.push(`Dar este primer paso para nombrar lo que sientes es fundamental. Al comenzar a observar sin juicio lo que tu cuerpo y tu sentir guardan, el sistema nervioso empieza a desactivar tensiones defensivas que llevaban tiempo acumuladas.`);
      }
    } else if (diaReto >= 2 && diaReto <= 7) {
      // Days 2-7: Phase 1 (Awareness building)
      if (currentLang === "en") {
        parrafos.push(`Being on day ${diaReto} of your process, your body is developing conscious somatic listening. In this initial phase of your 21-day journey, connecting recurring tensions with what you experience helps shift from confusion into regulation.`);
      } else if (currentLang === "fr") {
        parrafos.push(`En étant au jour ${diaReto} de votre processus, votre corps affine son écoute somatique. Dans cette première phase de votre parcours de 21 jours, relier les tensions récurrentes à votre vécu aide le système nerveux à passer de la confusion à la régulation.`);
      } else if (currentLang === "it") {
        parrafos.push(`Trovandoti al giorno ${diaReto} del tuo percorso, il tuo corpo sta sviluppando un ascolto somatico consapevole. In questa prima fase del cammino dei 21 giorni, collegare le tensioni ricorrenti con ciò che vivi aiuta il sistema nervoso a passare dalla confusione alla regolazione.`);
      } else {
        parrafos.push(`Estando en el día ${diaReto} de tu proceso, tu cuerpo está desarrollando una escucha somática más fina. En esta primera fase de tu camino de 21 días, notar cómo dialogan tus tensiones con lo que vives en tu día a día es justo lo que permite pasar de la confusión a la autorregulación.`);
      }
    } else if (diaReto >= 8 && diaReto <= 14) {
      // Days 8-14: Phase 2 (Deepening & Roots)
      if (currentLang === "en") {
        parrafos.push(`At day ${diaReto} of your journey, your records reveal deeper root patterns rather than isolated moments. You are in the stage where family loyalties, old self-demands, and relational boundaries become clear enough to gently transform.`);
      } else if (currentLang === "fr") {
        parrafos.push(`Au jour ${diaReto} de votre parcours, vos observations révèlent des schémas de fond plutôt que des faits isolés. Vous êtes dans la phase où les loyautés familiales, les exigences anciennes et les limites relationnelles deviennent visibles pour être doucement transformées.`);
      } else if (currentLang === "it") {
        parrafos.push(`Al giorno ${diaReto} del tuo percorso, le tue osservazioni mostrano schemi profondi e non semplici eventi isolati. Ti trovi nella fase in cui le lealtà familiari, le vecchie autoesigenze e i confini relazionali diventano abbastanza chiari da poter essere trasformati.`);
      } else {
        parrafos.push(`Al estar en el día ${diaReto} de tu proceso, tus registros van tejiendo un patrón de fondo y no solo hechos aislados. Te encuentras en la etapa de profundización, donde las lealtades familiares, las exigencias aprendidas y los límites personales se vuelven visibles para soltar lo que ya no te corresponde.`);
      }
    } else if (diaReto >= 15) {
      // Days 15+: Phase 3 (Integration & Embodiment)
      if (currentLang === "en") {
        parrafos.push(`Reaching day ${diaReto} reflects deep dedication to your inner sovereignty. At this stage of maturity, every symptom or emotion you acknowledge becomes integrated wisdom, helping you maintain centered presence.`);
      } else if (currentLang === "fr") {
        parrafos.push(`Atteindre le jour ${diaReto} témoigne d'un engagement profond envers votre bien-être. À ce stade de maturité, chaque symptôme ou émotion reconnue se transforme en sagesse intégrée pour préserver votre alignement intérieur.`);
      } else if (currentLang === "it") {
        parrafos.push(`Raggiungere il giorno ${diaReto} riflette un impegno profondo verso la tua sovranità interiore. In questo stadio di maturazione, ogni sintomo o emozione che riconosci diventa saggezza integrata per custodire il tuo equilibrio.`);
      } else {
        parrafos.push(`Llegar al día ${diaReto} refleja un compromiso muy maduro con tu bienestar. En este punto de integración, cada síntoma o emoción que reconoces se convierte en sabiduría somática para sostener tu centro y tu soberanía emocional.`);
      }
    }
  }

  // Emotional Polarity Deepening (Expansive / Mixed / Protective)
  if (hayEmocion) {
    if (esSoloExpansivo) {
      if (currentLang === "en") {
        parrafos.push(
          `The presence of ${emTexto} signals an open ventral vagal state and cardiac coherence. In biological decodification, expansive emotions are profound somatic resources: they signal to your organism that it is safe to thrive, open the chest, and celebrate your present ground without fear of losing it.`
        );
      } else if (currentLang === "fr") {
        parrafos.push(
          `La présence de ${emTexto} témoigne d'un état vagal ventral ouvert et d'une belle cohérence cardiaque. En décodage biologique, les émotions d'expansion sont de puissantes ressources somatiques : elles indiquent à l'organisme qu'il est en sécurité pour s'épanouir, respirer amplement et savourer le présent.`
        );
      } else if (currentLang === "it") {
        parrafos.push(
          `La presenza di ${emTexto} indica uno stato vagale ventrale di apertura e coerenza cardiaca. Nella decodifica biologica, le emozioni di espansione sono preziose risorse somatiche: trasmettono al corpo la sicurezza necessaria per aprirsi, respirare a pieno petto e godersi il presente.`
        );
      } else {
        parrafos.push(
          `La presencia de ${emTexto} señala un estado de regulación vagal ventral y apertura biológica. En biodescodificación, las emociones de expansión y alegría son recursos somáticos muy poderosos: le avisan a tu cuerpo que es seguro florecer, expandir el pecho y habitar el bienestar sin el temor inconsciente a que se termine.`
        );
      }
    } else if (esMixto) {
      if (currentLang === "en") {
        parrafos.push(
          `You identified a rich emotional coexistence (${emTexto}). In somatic psychology, holding expansive and tender protective emotions simultaneously is natural: joy and gratitude often serve as an internal anchor that allows deeper fears or grief to be felt and metabolized safely.`
        );
      } else if (currentLang === "fr") {
        parrafos.push(
          `Vous avez identifié une riche coexistence émotionnelle (${emTexto}). En psychologie somatique, ressentir à la fois des émotions d'expansion et des émotions de protection est profondément humain : la joie et la gratitude offrent l'ancrage sécurisant nécessaire pour traverser les peurs ou la tristesse sans être submergé.`
        );
      } else if (currentLang === "it") {
        parrafos.push(
          `Hai individuato una ricca coesistenza emotiva (${emTexto}). Nella psicologia somatica, accogliere insieme emozioni di espansione e di protezione è un segno di maturità: la gioia e la gratitudine creano il terreno sicuro per elaborare le paure o la tristezza senza sentirsi sopraffatti.`
        );
      } else {
        parrafos.push(
          `Identificaste una convivencia de emociones muy reveladora (${emTexto}). En psicología somática, sentir al mismo tiempo emociones de apertura y emociones de protección es profundamente humano: la gratitud y la alegría actúan como un puerto seguro que permite a la mente y al cuerpo procesar los miedos o duelos sin sentirse desbordados.`
        );
      }
    } else {
      // Protective / Alarm emotions
      const plural = emArr.length > 1;
      if (currentLang === "en") {
        parrafos.push(
          plural
            ? `Additionally, you named several emotions at once (${emTexto}). Experiencing them together is very common: often one emotion acts as the gateway and the others are layers underneath, protecting vulnerable parts of your story.`
            : `The emotion of ${emTexto} is acting as a biological alarm: it is the language in which the body translates a need for protection, boundaries, or unresolved expression.`
        );
      } else if (currentLang === "fr") {
        parrafos.push(
          plural
            ? `De plus, vous avez nommé plusieurs émotions à la fois (${emTexto}). Leur coexistence est fréquente : souvent, une émotion sert de porte d'entrée tandis que les autres sont des couches sous-jacentes protégeant une sensibilité plus intime.`
            : `L'émotion de ${emTexto} agit comme un signal d'alarme protecteur : c'est la langue par laquelle le corps exprime un besoin de sécurité, de limites claires ou d'apaisement.`
        );
      } else if (currentLang === "it") {
        parrafos.push(
          plural
            ? `Inoltre, hai indicato diverse emozioni contemporaneamente (${emTexto}). Che si presentino insieme è naturale: spesso un'emozione è la porta d'accesso e le altre sono strati sottostanti a protezione di vissuti più intimi.`
            : `L'emozione di ${emTexto} agisce come un segnale di allarme protettivo: è il linguaggio attraverso cui il corpo esprime il bisogno di sicurezza, di confini chiari o di ascolto.`
        );
      } else {
        parrafos.push(
          plural
            ? `Además, nombraste varias emociones a la vez (${emTexto}). Que aparezcan juntas no es casual: muchas veces una emoción es la puerta de entrada visible y las demás son capas protectoras debajo de ella, cuidando partes sensibles de tu historia.`
            : `La emoción de ${emTexto} funciona como una señal biológica de protección: es el idioma con el que tu cuerpo comunica una necesidad de límites, seguridad o expresión pendiente.`
        );
      }
    }
  }

  // Link with user's written narrative and symptoms
  if (hayHistoria) {
    const rawH = (datos.historia || "").trim();
    const fragmento = rawH.length > 90 ? rawH.slice(0, 90).trim() : rawH;
    const puntoSuspensivo = rawH.length > 90 ? "..." : "";
    if (currentLang === "en") {
      parrafos.push(
        `In what you wrote, you noted: “${fragmento}${puntoSuspensivo}”. That is the precise link between what you lived through and how your physiology is translating it today.`
      );
    } else if (currentLang === "fr") {
      parrafos.push(
        `Dans ce que vous avez écrit, vous avez partagé : « ${fragmento}${puntoSuspensivo} ». C'est là que réside la cohérence directe entre votre vécu et la façon dont votre corps l'exprime actuellement.`
      );
    } else if (currentLang === "it") {
      parrafos.push(
        `In ciò che hai scritto hai espresso: “${fragmento}${puntoSuspensivo}”. È proprio qui che si rivela il legame diretto tra la tua esperienza e la risposta del tuo corpo.`
      );
    } else {
      parrafos.push(
        `En lo que escribiste compartiste: “${fragmento}${puntoSuspensivo}”. Ahí está el puente directo entre lo que viviste y la manera en que tu cuerpo o tu emoción lo está metabolizando en este momento.`
      );
    }
  } else if (hayFisica && hayEmocion) {
    if (currentLang === "en") {
      parrafos.push(
        `That “${datos.fisica.trim()}” and the experience of ${emTexto} coincide highlights how the nervous system and tissues work as one continuous circuit: the sensation in the body grounds the emotional signal.`
      );
    } else if (currentLang === "fr") {
      parrafos.push(
        `La concomitance de « ${datos.fisica.trim()} » et de l'émotion de ${emTexto} montre à quel point le système nerveux et les tissus corporels forment un même circuit : la sensation physique ancre le message émotionnel.`
      );
    } else if (currentLang === "it") {
      parrafos.push(
        `Il manifestarsi congiunto di “${datos.fisica.trim()}” e di ${emTexto} evidenzia come il sistema nervoso e i tessuti corporei agiscano all'unisono: la sensazione corporea radica il segnale emotivo.`
      );
    } else {
      parrafos.push(
        `Que coincidan “${datos.fisica.trim()}” y la vivencia de ${emTexto} subraya cómo el sistema nervioso y el tejido corporal actúan en sintonía: la sensación física es el anclaje somático de lo que la emoción busca comunicar.`
      );
    }
  }

  // Systemic / Archetypal Themes (Constellations, Loss, Couple, Work)
  if (hayHistoria) {
    if (temas.perdida) parrafos.push(parrafoPerdida(currentLang));
    else if (temas.familia) {
      parrafos.push(parrafoConstelaciones(currentLang));
      parrafos.push(parrafoPatronTransgeneracional(currentLang));
    } else if (temas.pareja) parrafos.push(parrafoPareja(currentLang));
    else if (temas.trabajo) parrafos.push(parrafoTrabajo(currentLang));
  }

  // Somatic / Everyday Example
  const ejemplo = generarEjemploCotidiano(r, currentLang);
  if (ejemplo) parrafos.push(ejemplo);

  // Second result if any
  if (resultados.length > 1) {
    const r2 = resultados[1];
    if (currentLang === "en") {
      parrafos.push(
        `We also recognized a complementary thread in “${r2.termino}”: ${r2.sentido}`
      );
    } else if (currentLang === "fr") {
      parrafos.push(
        `Nous avons également identifié un fil complémentaire avec « ${r2.termino} » : ${r2.sentido}`
      );
    } else if (currentLang === "it") {
      parrafos.push(
        `Abbiamo inoltre individuato un secondo filo complementare con “${r2.termino}”: ${r2.sentido}`
      );
    } else {
      parrafos.push(
        `También reconocimos un segundo hilo complementario con “${r2.termino}”: ${r2.sentido}`
      );
    }
  }

  // Therapeutic Practice & Action Focus
  if (currentLang === "en") {
    const texto = `the practical invitation for your day is grounded in gentle somatic awareness: ${r.enfoque} Take this as a living compass to observe your reactions with curiosity rather than self-criticism.`;
    parrafos.push(tieneNombre ? `${primerNombre}, ${texto}` : `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`);
  } else if (currentLang === "fr") {
    const texto = `l'invitation concrète pour aujourd'hui repose sur une écoute bienveillante : ${r.enfoque} Prenez ceci comme une boussole pour observer vos ressentis avec curiosité plutôt qu'avec autocritique.`;
    parrafos.push(tieneNombre ? `${primerNombre}, ${texto}` : `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`);
  } else if (currentLang === "it") {
    const texto = `l'invito pratico per oggi poggia su un ascolto somatico gentile: ${r.enfoque} Considera questa guida come una bussola viva per osservare le tue reazioni con curiosità invece che con giudizio.`;
    parrafos.push(tieneNombre ? `${primerNombre}, ${texto}` : `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`);
  } else {
    const texto = `la invitación práctica para el día de hoy se enfoca en una escucha somática amable: ${r.enfoque} Tómate esto como una brújula viva para observarte con curiosidad y sin exigencias rígidas.`;
    parrafos.push(tieneNombre ? `${primerNombre}, ${texto}` : `${texto.charAt(0).toUpperCase()}${texto.slice(1)}`);
  }

  // Personalized & Hopeful Closing
  const camposLlenos = [hayHistoria, hayFisica, hayEmocion].filter(Boolean).length;
  if (currentLang === "en") {
    parrafos.push(
      tieneNombre
        ? `Thank you for honoring your process today, ${primerNombre}. Soltar begins by naming, and every entry you record builds greater self-trust and somatic clarity.`
        : `Thank you for honoring your process today. Soltar begins by naming, and every reflection you record builds greater self-trust and somatic clarity.`
    );
  } else if (currentLang === "fr") {
    parrafos.push(
      tieneNombre
        ? `Merci d'honorer votre cheminement aujourd'hui, ${primerNombre}. Lâcher prise commence par nommer, et chaque pas affine votre clarté intérieure.`
        : `Merci d'honorer votre cheminement aujourd'hui. Lâcher prise commence par nommer, et chaque pas affine votre clarté intérieure.`
    );
  } else if (currentLang === "it") {
    parrafos.push(
      tieneNombre
        ? `Grazie per dedicarti questo tempo, ${primerNombre}. Lasciare andare comincia dal dare un nome, e ogni passo rafforza la tua chiarezza e fiducia interiore.`
        : `Grazie per dedicarti questo tempo. Lasciare andare comincia dal dare un nome, e ogni passo rafforza la tua chiarezza e fiducia interiore.`
    );
  } else {
    parrafos.push(
      tieneNombre
        ? `Gracias por honrar tu proceso hoy, ${primerNombre}. Soltar empieza por nombrar, y cada registro que realizas fortalece tu soberanía emocional y tu claridad interna.`
        : `Gracias por honrar este momento de escucha. Soltar empieza por nombrar, y cada registro que realizas fortalece tu soberanía emocional y tu claridad interna.`
    );
  }

  return parrafos;
}
