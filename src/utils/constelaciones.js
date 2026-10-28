// Constelaciones Familiares: Readings and narrative generator in 4 languages
// Supported: es, en, fr, it

export const VINCULOS = [
  { id: "cercano", label: "Cercano", dist: 0.4 },
  { id: "protector", label: "Protector / de cuidado", dist: 0.45 },
  { id: "dependiente", label: "Dependiente", dist: 0.55 },
  { id: "ambivalente", label: "Ambivalente", dist: 0.85 },
  { id: "distante", label: "Distante", dist: 1 },
  { id: "frio", label: "Frío / formal", dist: 1.1 },
  { id: "conflictivo", label: "Conflictivo", dist: 1.3 },
  { id: "roto", label: "Roto / sin contacto", dist: 1.7 },
];

export const PARENTESCOS = [
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

export const vinculosDe = (m) => (Array.isArray(m.vinculos) ? m.vinculos : m.vinculo ? [m.vinculo] : []);

export const distanciaVinculos = (m) => {
  const ids = vinculosDe(m);
  if (ids.length === 0) return 1;
  const suma = ids.reduce((acc, id) => {
    const v = VINCULOS.find((x) => x.id === id);
    return acc + (v ? v.dist : 1);
  }, 0);
  return suma / ids.length;
};

const CITAS_CONSTELACIONES = {
  es: "Hellinger, B. (2001). Órdenes del amor: cursos seleccionados (trad. S. Kabelka). Barcelona: Herder. (Título original: Ordnungen der Liebe. Ein Kurs-Buch, 2000).",
  en: "Hellinger, B. (2001). Orders of Love: How to Clarify Relationships. (Original: Ordnungen der Liebe, 2000).",
  fr: "Hellinger, B. (2001). Les ordres de l'amour : un guide pour l'âme. (Titre original : Ordnungen der Liebe, 2000).",
  it: "Hellinger, B. (2001). Gli ordini dell'amore: corsi scelti. (Titolo originale: Ordnungen der Liebe, 2000)."
};

export function generarLecturasConstelacion(familia, idioma = "es") {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";
  const lecturas = [];
  const excluidos = familia.filter((m) => m.excluido);
  const noNacidos = familia.filter((m) => m.estado === "no_nacido");
  const noConocidos = familia.filter((m) => m.noConocido && m.estado !== "no_nacido");
  const fallecidosAntesDeNacer = familia.filter((m) => m.fallecioAntesDeNacer);
  const rotos = familia.filter((m) => vinculosDe(m).includes("roto"));
  const conflictivos = familia.filter((m) => vinculosDe(m).includes("conflictivo"));
  const ambivalentes = familia.filter((m) => {
    const v = vinculosDe(m);
    return v.includes("ambivalente") || (v.includes("cercano") && v.includes("conflictivo"));
  });
  const dependientes = familia.filter((m) => vinculosDe(m).includes("dependiente"));
  const frios = familia.filter((m) => vinculosDe(m).includes("frio"));
  const protectores = familia.filter((m) => vinculosDe(m).includes("protector"));

  if (lang === "en") {
    if (excluidos.length > 0) {
      lecturas.push({
        orden: "Order of belonging",
        texto: `There is ${excluidos.length === 1 ? "one excluded member" : excluidos.length + " excluded members"} in the system (${excluidos.map((e) => e.nombre).join(", ")}). According to Bert Hellinger, every member who ever belonged to a family preserves the sacred right to their place. When someone is excluded, the system tends to remember them through a descendant later on, without anyone choosing it consciously.`
      });
    }
    if (noNacidos.length > 0) {
      lecturas.push({
        orden: "Order of belonging",
        texto: `You registered ${noNacidos.length === 1 ? "someone who was never born" : noNacidos.length + " individuals who were never born"} (${noNacidos.map((n) => n.nombre).join(", ")}). In Hellinger's work, children or siblings lost to miscarriage, termination, or stillbirth belong with full right to the family system, even when they are rarely named openly. Naming them here, as you have done, is a meaningful first step in returning them to their rightful place.`
      });
    }
    if (noConocidos.length > 0) {
      lecturas.push({
        orden: "Order of belonging",
        texto: `You did not get to meet or have a personal relationship with ${noConocidos.map((n) => n.nombre).join(", ")}. This is distinct from a severed relationship: no conscious contact ever existed here. Still, that person occupies a place in your system, and their absence doesn't erase the imprint their story left on those who did know them.`
      });
    }
    if (fallecidosAntesDeNacer.length > 0) {
      lecturas.push({
        orden: "Order of hierarchy",
        texto: `${fallecidosAntesDeNacer.map((f) => f.nombre).join(", ")} passed away before you were born. It is common not to see this as personal grief, but systemically, their absence and the grief surrounding them shaped the environment into which you arrived.`
      });
    }
    if (rotos.length > 0) {
      lecturas.push({
        orden: "Order of hierarchy",
        texto: `The bond with ${rotos.map((r) => r.nombre).join(", ")} is severed or without contact. It is worth looking at whether an invisible loyalty sustains that distance, rather than just personal conflict — sometimes distancing is an unconscious attempt to protect.`
      });
    }
    if (conflictivos.length > 0) {
      lecturas.push({
        orden: "Order of balance (give and take)",
        texto: `There is active tension with ${conflictivos.map((c) => c.nombre).join(", ")}. Sustained conflicts often signal an imbalance between giving and receiving in that relationship.`
      });
    }
    if (ambivalentes.length > 0) {
      lecturas.push({
        orden: "Ambivalent bond",
        texto: `You described the relationship with ${ambivalentes.map((a) => a.nombre).join(", ")} as simultaneously close and tense. Systemically, this ambivalence often emerges when love coexists with an unvoiced loyalty or debt.`
      });
    }
    if (dependientes.length > 0) {
      lecturas.push({
        orden: "Order of hierarchy",
        texto: `The relationship with ${dependientes.map((d) => d.nombre).join(", ")} includes dependency. When places become inverted, the one who should receive ends up giving, or vice versa.`
      });
    }
    if (frios.length > 0) {
      lecturas.push({
        orden: "Order of belonging",
        texto: `With ${frios.map((f) => f.nombre).join(", ")}, contact exists but without warmth. Persistent coldness is usually a protective distance born from past wounds.`
      });
    }
    if (protectores.length > 0) {
      lecturas.push({
        orden: "Order of balance (give and take)",
        texto: `The bond with ${protectores.map((p) => p.nombre).join(", ")} carries a caretaker dynamic. Caring is beautiful, but when it only flows in one direction, the balance tips — the giver also needs permission to receive.`
      });
    }
    const paternos = familia.filter((m) => m.lado === "paterno").length;
    const maternos = familia.filter((m) => m.lado === "materno").length;
    if (paternos === 0 && maternos > 0) {
      lecturas.push({
        orden: "System observation",
        texto: "The paternal branch is empty in your tree. This may reflect an actual disconnection with that branch of the family."
      });
    }
    if (maternos === 0 && paternos > 0) {
      lecturas.push({
        orden: "System observation",
        texto: "The maternal branch is empty in your tree. It is worth reflecting on whether a similar disconnection exists in everyday life."
      });
    }
    if (lecturas.length === 0) {
      lecturas.push({
        orden: "System observation",
        texto: "Your system appears relatively balanced according to Hellinger's three orders of love (belonging, hierarchy, and balance). Keep adding family members for deeper insight."
      });
    }
    return lecturas;
  }

  if (lang === "fr") {
    if (excluidos.length > 0) {
      lecturas.push({
        orden: "Ordre d'appartenance",
        texto: `Il y a ${excluidos.length === 1 ? "un membre exclu" : excluidos.length + " membres exclus"} du système (${excluidos.map((e) => e.nombre).join(", ")}). Selon Bert Hellinger, tout membre ayant appartenu à la famille conserve le droit inaliénable à sa place. Lorsqu'un membre est exclu, le système tend à le rappeler à travers un descendant, de manière inconsciente.`
      });
    }
    if (noNacidos.length > 0) {
      lecturas.push({
        orden: "Ordre d'appartenance",
        texto: `Vous avez enregistré ${noNacidos.length === 1 ? "une personne qui n'a pas vu le jour" : noNacidos.length + " personnes qui n'ont pas vu le jour"} (${noNacidos.map((n) => n.nombre).join(", ")}). Dans les constellations familiales, les enfants ou frères et sœurs non nés (fausse couche, IVG ou mortinatalité) appartiennent pleinement au système. Les nommer ici est un premier pas pour leur redonner leur juste place.`
      });
    }
    if (noConocidos.length > 0) {
      lecturas.push({
        orden: "Ordre d'appartenance",
        texto: `Vous n'avez pas connu ou côtoyé ${noConocidos.map((n) => n.nombre).join(", ")}. Bien qu'aucun lien direct n'ait été noué, cette personne fait partie intégrante de votre histoire familiale et son empreinte continue d'exister à travers ses proches.`
      });
    }
    if (fallecidosAntesDeNacer.length > 0) {
      lecturas.push({
        orden: "Ordre de hiérarchie",
        texto: `${fallecidosAntesDeNacer.map((f) => f.nombre).join(", ")} est décédé(e) avant votre naissance. Son absence et le deuil qui a traversé la famille ont façonné l'atmosphère dans laquelle vous êtes arrivé(e) au monde.`
      });
    }
    if (rotos.length > 0) {
      lecturas.push({
        orden: "Ordre de hiérarchie",
        texto: `Le lien avec ${rotos.map((r) => r.nombre).join(", ")} est rompu ou sans contact. Cette distance peut parfois masquer une loyauté invisible plutôt qu'un désaccord superficiel.`
      });
    }
    if (conflictivos.length > 0) {
      lecturas.push({
        orden: "Ordre d'équilibre (donner et recevoir)",
        texto: `Il existe une tension active avec ${conflictivos.map((c) => c.nombre).join(", ")}. Les conflits durables révèlent souvent un déséquilibre profond entre ce qui a été donné et ce qui a été reçu.`
      });
    }
    if (ambivalentes.length > 0) {
      lecturas.push({
        orden: "Lien ambivalent",
        texto: `Vous décrivez le lien avec ${ambivalentes.map((a) => a.nombre).join(", ")} comme à la fois proche et conflictuel. Cette ambivalence apparaît lorsque l'amour côtoie une dette ou une loyauté indicible.`
      });
    }
    if (dependientes.length > 0) {
      lecturas.push({
        orden: "Ordre de hiérarchie",
        texto: `La relation avec ${dependientes.map((d) => d.nombre).join(", ")} comporte une dépendance marquée. Les rôles peuvent s'inverser : celui qui devrait recevoir finit par porter, ou inversement.`
      });
    }
    if (frios.length > 0) {
      lecturas.push({
        orden: "Ordre d'appartenance",
        texto: `Avec ${frios.map((f) => f.nombre).join(", ")}, le contact existe mais sans chaleur. Une froideur prolongée est souvent une distance protectrice face à d'anciennes blessures.`
      });
    }
    if (protectores.length > 0) {
      lecturas.push({
        orden: "Ordre d'équilibre (donner et recevoir)",
        texto: `Le lien avec ${protectores.map((p) => p.nombre).join(", ")} est très protecteur. Prendre soin est un geste d'amour, mais lorsqu'il ne va que dans un sens, l'équilibre s'érode : le protecteur a aussi besoin de recevoir.`
      });
    }
    const paternos = familia.filter((m) => m.lado === "paterno").length;
    const maternos = familia.filter((m) => m.lado === "materno").length;
    if (paternos === 0 && maternos > 0) {
      lecturas.push({
        orden: "Observation systémique",
        texto: "La branche paternelle est vide dans votre arbre. Cela peut traduire une déconnexion avec cette lignée."
      });
    }
    if (maternos === 0 && paternos > 0) {
      lecturas.push({
        orden: "Observation systémique",
        texto: "La branche maternelle est vide dans votre arbre. Il peut être enrichissant d'explorer cette distance."
      });
    }
    if (lecturas.length === 0) {
      lecturas.push({
        orden: "Observation systémique",
        texto: "Votre système semble harmonieux selon les trois ordres de l'amour de Hellinger. Continuez d'enrichir votre arbre pour affiner ces observations."
      });
    }
    return lecturas;
  }

  if (lang === "it") {
    if (excluidos.length > 0) {
      lecturas.push({
        orden: "Ordine di appartenenza",
        texto: `C'è ${excluidos.length === 1 ? "un membro escluso" : excluidos.length + " membri esclusi"} dal sistema (${excluidos.map((e) => e.nombre).join(", ")}). Secondo Bert Hellinger, ogni membro che ha fatto parte della famiglia conserva il diritto al proprio posto. Quando qualcuno viene escluso, il sistema tende a ricordarlo attraverso un discendente.`
      });
    }
    if (noNacidos.length > 0) {
      lecturas.push({
        orden: "Ordine di appartenenza",
        texto: `Hai registrato ${noNacidos.length === 1 ? "una persona mai nata" : noNacidos.length + " persone mai nate"} (${noNacidos.map((n) => n.nombre).join(", ")}). Nelle costellazioni familiari, i figli o fratelli non nati appartengono a pieno titolo al sistema. Dare loro un nome qui è un primo passo per restituire loro il giusto posto.`
      });
    }
    if (noConocidos.length > 0) {
      lecturas.push({
        orden: "Ordine di appartenenza",
        texto: `Non hai avuto modo di conoscere o frequentare ${noConocidos.map((n) => n.nombre).join(", ")}. Anche in assenza di un legame cosciente, questa persona continua ad occupare uno spazio nel tuo albero familiare.`
      });
    }
    if (fallecidosAntesDeNacer.length > 0) {
      lecturas.push({
        orden: "Ordine di gerarchia",
        texto: `${fallecidosAntesDeNacer.map((f) => f.nombre).join(", ")} è venuto/a a mancare prima della tua nascita. La sua assenza e il lutto familiare hanno fatto parte del contesto in cui sei venuto/a al mondo.`
      });
    }
    if (rotos.length > 0) {
      lecturas.push({
        orden: "Ordine di gerarchia",
        texto: `Il legame con ${rotos.map((r) => r.nombre).join(", ")} è interrotto o privo di contatti. Spesso dietro questa distanza si cela una lealtà invisibile.`
      });
    }
    if (conflictivos.length > 0) {
      lecturas.push({
        orden: "Ordine di equilibrio (dare e ricevere)",
        texto: `C'è tensione attiva con ${conflictivos.map((c) => c.nombre).join(", ")}. I conflitti prolungati segnalano spesso uno squilibrio tra ciò che viene dato e ciò che viene ricevuto.`
      });
    }
    if (ambivalentes.length > 0) {
      lecturas.push({
        orden: "Legame ambivalente",
        texto: `Hai descritto il legame con ${ambivalentes.map((a) => a.nombre).join(", ")} come vicino e conflittuale allo stesso tempo. Questa ambivalenza sorge quando l'affetto convive con un debito o una lealtà non espressa.`
      });
    }
    if (dependientes.length > 0) {
      lecturas.push({
        orden: "Ordine di gerarchia",
        texto: `Il legame con ${dependientes.map((d) => d.nombre).join(", ")} presenta dipendenza. Quando i ruoli si invertono, chi dovrebbe ricevere finisce per farsi carico dell'altro.`
      });
    }
    if (frios.length > 0) {
      lecturas.push({
        orden: "Ordine di appartenenza",
        texto: `Con ${frios.map((f) => f.nombre).join(", ")}, il contatto esiste ma è privo di calore. Una freddezza costante è spesso una distanza protettiva nata da ferite passate.`
      });
    }
    if (protectores.length > 0) {
      lecturas.push({
        orden: "Ordine di equilibrio (dare e ricevere)",
        texto: `Il legame con ${protectores.map((p) => p.nombre).join(", ")} ha una natura protettiva. Prendersi cura è un grande atto d'amore, ma chi dona sempre ha bisogno a sua volta di concedersi di ricevere.`
      });
    }
    const paternos = familia.filter((m) => m.lado === "paterno").length;
    const maternos = familia.filter((m) => m.lado === "materno").length;
    if (paternos === 0 && maternos > 0) {
      lecturas.push({
        orden: "Osservazione del sistema",
        texto: "Il ramo paterno è vuoto nel tuo albero. Questo potrebbe riflettere una reale disconnessione da quella linea familiare."
      });
    }
    if (maternos === 0 && paternos > 0) {
      lecturas.push({
        orden: "Osservazione del sistema",
        texto: "Il ramo materno è vuoto nel tuo albero. Vale la pena riflettere su questo legame nella quotidianità."
      });
    }
    if (lecturas.length === 0) {
      lecturas.push({
        orden: "Osservazione del sistema",
        texto: "Il tuo sistema appare equilibrato secondo i tre ordini dell'amore di Hellinger. Continua ad aggiungere membri per un quadro più approfondito."
      });
    }
    return lecturas;
  }

  // Spanish (default)
  if (excluidos.length > 0) {
    lecturas.push({
      orden: "Orden de pertenencia",
      texto: `Hay ${excluidos.length === 1 ? "un miembro" : excluidos.length + " miembros"} excluido${excluidos.length === 1 ? "" : "s"} del sistema (${excluidos.map((e) => e.nombre).join(", ")}). Según Bert Hellinger, todo miembro que alguna vez perteneció a la familia conserva el derecho a un lugar en ella. Cuando se excluye a alguien, el sistema tiende a "recordarlo" a través de otro miembro, más adelante, sin que nadie lo elija conscientemente.`
    });
  }
  if (noNacidos.length > 0) {
    lecturas.push({
      orden: "Orden de pertenencia",
      texto: `Registraste a ${noNacidos.length === 1 ? "alguien que no llegó a nacer" : noNacidos.length + " personas que no llegaron a nacer"} (${noNacidos.map((n) => n.nombre).join(", ")}). En el trabajo de Hellinger, los hijos o hermanos perdidos por aborto espontáneo, interrupción del embarazo o mortinato pertenecen igual de pleno derecho al sistema familiar, aunque casi nunca se les nombra ni se les hace duelo abiertamente. Cuando esa pérdida queda en silencio, otro miembro —muchas veces sin saberlo— puede terminar cargando parte de ese dolor no llorado, o repitiendo inconscientemente algo de ese destino interrumpido. Nombrarlo aquí, como acabas de hacer, ya es un primer paso hacia devolverle su lugar.`
    });
  }
  if (noConocidos.length > 0) {
    lecturas.push({
      orden: "Orden de pertenencia",
      texto: `No llegaste a conocer o tener relación con ${noConocidos.map((n) => n.nombre).join(", ")}. Esto es distinto de una relación rota: aquí nunca hubo vínculo consciente que sostener. Aun así, esa persona sigue ocupando un lugar en tu sistema familiar, y su ausencia de tu historia personal no borra la influencia que su propia historia pudo haber dejado en quienes sí la conocieron —y de ahí, en ti.`
    });
  }
  if (fallecidosAntesDeNacer.length > 0) {
    lecturas.push({
      orden: "Orden de jerarquía",
      texto: `${fallecidosAntesDeNacer.map((f) => f.nombre).join(", ")} falleció${fallecidosAntesDeNacer.length === 1 ? "" : "n"} antes de que tú nacieras. Es común no considerar esto un duelo propio —nunca hubo tiempo compartido, después de todo— pero en términos sistémicos, la ausencia de esa persona y el duelo que la rodeó en la familia sí forman parte del ambiente en el que llegaste al mundo. A veces se hereda una tristeza de fondo sin saber exactamente de dónde viene; esta podría ser una de sus raíces.`
    });
  }
  if (rotos.length > 0) {
    lecturas.push({
      orden: "Orden de jerarquía",
      texto: `El vínculo con ${rotos.map((r) => r.nombre).join(", ")} está roto o sin contacto. Vale la pena mirar si detrás de esa distancia hay una lealtad invisible sosteniéndola, más que un motivo puramente personal — a veces alejarse de alguien es una forma inconsciente de protegerlo, o de protegerse.`
    });
  }
  if (conflictivos.length > 0) {
    lecturas.push({
      orden: "Orden de equilibrio (dar y recibir)",
      texto: `Hay tensión activa con ${conflictivos.map((c) => c.nombre).join(", ")}. Los conflictos sostenidos suelen señalar un desequilibrio entre lo que se da y lo que se recibe en esa relación — vale la pena revisar si uno de los dos ha estado dando de más, o tomando de más, durante mucho tiempo.`
    });
  }
  if (ambivalentes.length > 0) {
    lecturas.push({
      orden: "Vínculo ambivalente",
      texto: `Describiste el vínculo con ${ambivalentes.map((a) => a.nombre).join(", ")} como cercano y tenso a la vez. En el marco sistémico, esa ambivalencia rara vez es casual: suele aparecer cuando el amor hacia alguien convive con una lealtad o una deuda no nombrada. No se trata de elegir entre acercarte o alejarte, sino de mirar qué es exactamente lo que ese vínculo te pide sostener.`
    });
  }
  if (dependientes.length > 0) {
    lecturas.push({
      orden: "Orden de jerarquía",
      texto: `El vínculo con ${dependientes.map((d) => d.nombre).join(", ")} tiene un componente de dependencia. Cuando alguien depende demasiado de otro —o se depende demasiado de alguien—, los lugares del sistema tienden a invertirse: el que debería recibir termina dando, o al revés. Vale la pena preguntarte si cada quien está ocupando el lugar que le corresponde según su orden de llegada.`
    });
  }
  if (frios.length > 0) {
    lecturas.push({
      orden: "Orden de pertenencia",
      texto: `Con ${frios.map((f) => f.nombre).join(", ")} el contacto existe, pero sin calidez. En términos sistémicos, la frialdad sostenida suele ser una distancia protectora: algo que en algún momento dolió y que el vínculo "congeló" para no volver a tocarlo. El primer paso no es forzar cercanía, sino reconocer qué se congeló y cuándo.`
    });
  }
  if (protectores.length > 0) {
    lecturas.push({
      orden: "Orden de equilibrio (dar y recibir)",
      texto: `El vínculo con ${protectores.map((p) => p.nombre).join(", ")} tiene un carácter protector o de cuidado. Cuidar es una forma hermosa de amar, pero cuando el cuidado fluye siempre en una sola dirección, el equilibrio entre dar y recibir se inclina — y quien siempre da también necesita, en algún momento, permitirse recibir.`
    });
  }
  const paternos = familia.filter((m) => m.lado === "paterno").length;
  const maternos = familia.filter((m) => m.lado === "materno").length;
  if (paternos === 0 && maternos > 0) {
    lecturas.push({
      orden: "Observación del sistema",
      texto: "El lado paterno está vacío en tu árbol. A veces esto refleja una desconexión real con esa rama de la familia, más allá de lo que se registró aquí."
    });
  }
  if (maternos === 0 && paternos > 0) {
    lecturas.push({
      orden: "Observación del sistema",
      texto: "El lado materno está vacío en tu árbol. Vale la pena preguntarte si hay una desconexión similar en la vida real."
    });
  }
  if (lecturas.length === 0) {
    lecturas.push({
      orden: "Observación del sistema",
      texto: "Tu sistema, tal como lo describiste, se ve relativamente equilibrado según los tres órdenes del amor de Hellinger (pertenencia, jerarquía y equilibrio). Sigue agregando miembros para una lectura más completa."
    });
  }
  return lecturas;
}

export function generarNarrativaConstelacion(nombre, sexo, familia, lecturas, idioma = "es") {
  const lang = ["es", "en", "fr", "it"].includes(idioma) ? idioma : "es";
  const n = nombre || (lang === "en" ? "you" : lang === "fr" ? "vous" : lang === "it" ? "tu" : "tú");
  const parrafos = [];
  const nombresFamilia = familia.map((m) => m.nombre).filter(Boolean);
  const cita = CITAS_CONSTELACIONES[lang] || CITAS_CONSTELACIONES.es;

  if (lang === "en") {
    parrafos.push(
      `${n}, looking at your family system as described (${nombresFamilia.length > 0 ? nombresFamilia.join(", ") : "no members registered yet"}), there ${lecturas.length === 1 ? "is a dynamic" : "are " + lecturas.length + " dynamics"} worth exploring gently. Bert Hellinger, pioneer of family constellations, articulated three "orders of love" that sustain any system: belonging, hierarchy, and the balance between giving and receiving. When any of these is disrupted, the system seeks resolution, often through those who least consciously chose it.`
    );
    lecturas.forEach((l) => parrafos.push(l.texto));
    parrafos.push(
      `Hellinger observed that every family behaves with a shared collective consciousness: a force that seeks balance and inclusion across generations. When someone is excluded or unmourned, that consciousness tends to remember them through descendants who unconsciously carry their burden or replicate their destiny. He called this "blind love" — love that repeats out of loyalty rather than freeing.`
    );
    const haySenales = lecturas.some((l) => l.orden.includes("belonging") || l.orden.includes("hierarchy") || l.orden.includes("balance"));
    if (haySenales) {
      parrafos.push(
        `This does not mean anything is broken in your family: family systems evolve over generations, and they also heal through mindful, conscious steps. Often the first step is simply acknowledging what was previously unsaid, just as you have done here. Every name you place on your tree is an act of honor and love towards those who came before and those who come after.`
      );
    } else {
      parrafos.push(
        `A system without overt warning signs continues to benefit from mindful presence. The orders of love are sustained over time. Adding more family members — aunts, uncles, grandparents, children — will further enrich this constellation.`
      );
    }
    parrafos.push(
      `This reading is based on the members and bonds entered in your tree; the more complete your tree, the deeper the systemic clarity. Source framework: ${cita}`
    );
    return parrafos;
  }

  if (lang === "fr") {
    parrafos.push(
      `${n}, en observant votre système familial tel que décrit (${nombresFamilia.length > 0 ? nombresFamilia.join(", ") : "aucun membre enregistré pour le moment"}), il émerge ${lecturas.length === 1 ? "une dynamique" : lecturas.length + " dynamiques"} qu'il est précieux d'explorer. Bert Hellinger, créateur des constellations familiales, a décrit trois « ordres de l'amour » : l'appartenance, la hiérarchie et l'équilibre entre donner et recevoir. Lorsqu'un ordre est perturbé, le système cherche à rétablir l'équilibre, souvent à travers les descendants.`
    );
    lecturas.forEach((l) => parrafos.push(l.texto));
    parrafos.push(
      `Hellinger a mis en lumière l'existence d'une conscience collective familiale : une force inconsciente veillant à l'intégrité du système. Lorsqu'un membre est exclu ou non honoré, un descendant peut inconsciemment répéter une part de son destin par loyauté invisible (« l'amour aveugle »).`
    );
    const haySenales = lecturas.some((l) => l.orden.includes("appartenance") || l.orden.includes("hiérarchie") || l.orden.includes("équilibre"));
    if (haySenales) {
      parrafos.push(
        `Cela ne signifie en rien que votre famille a échoué : les systèmes s'emmêlent sur plusieurs générations et s'apaisent par des prises de conscience progressives. Nommer ce qui était tus est déjà un geste libérateur. Chaque nom posé sur votre arbre est un acte d'amour bienveillant.`
      );
    } else {
      parrafos.push(
        `Un système sans tension apparente s'entretient dans la durée. Continuer d'enrichir votre arbre permettra d'approfondir la clarté de ces liens.`
      );
    }
    parrafos.push(
      `Cette lecture s'appuie sur les données saisies dans votre arbre. Référence théorique : ${cita}`
    );
    return parrafos;
  }

  if (lang === "it") {
    parrafos.push(
      `${n}, osservando il tuo sistema familiare così come descritto (${nombresFamilia.length > 0 ? nombresFamilia.join(", ") : "nessun membro ancora registrato"}), emergono ${lecturas.length === 1 ? "una dinamica" : lecturas.length + " dinamiche"} che meritano uno sguardo attento. Bert Hellinger ha formulato i tre "ordini dell'amore": appartenenza, gerarchia ed equilibrio tra dare e ricevere.`
    );
    lecturas.forEach((l) => parrafos.push(l.texto));
    parrafos.push(
      `Ogni famiglia condivide una coscienza collettiva che mira a preservare l'ordine del sistema. Quando qualcuno viene escluso, un discendente tende a ripeterne inconsciamente il destino per lealtà profonda ("amore cieco").`
    );
    const haySenales = lecturas.some((l) => l.orden.includes("appartenenza") || l.orden.includes("gerarchia") || l.orden.includes("equilibrio"));
    if (haySenales) {
      parrafos.push(
        `Ciò non indica che qualcosa sia errato nella tua famiglia: i sistemi richiedono generazioni per sciogliersi e si riordinano con piccoli passi consapevoli. Dare voce a ciò che non veniva nominato è già un grande atto di guarigione.`
      );
    } else {
      parrafos.push(
        `Anche un sistema privo di segnali di allarme trae beneficio dall'attenzione continua. Aggiungere altri membri permette di perfezionare la comprensione del tuo albero.`
      );
    }
    parrafos.push(
      `Questa lettura si basa sulle informazioni inserite nel tuo albero. Riferimento teorico: ${cita}`
    );
    return parrafos;
  }

  // Spanish (default)
  parrafos.push(
    `${n}, al mirar tu sistema familiar tal como lo describiste (${nombresFamilia.length > 0 ? nombresFamilia.join(", ") : "todavía sin miembros registrados"}), aparecen ${lecturas.length === 1 ? "una dinámica que" : lecturas.length + " dinámicas que"} vale la pena observar de cerca. Bert Hellinger, el facilitador que desarrolló el método de constelaciones familiares, describió tres “órdenes del amor” que sostienen a cualquier sistema: pertenencia, jerarquía y equilibrio entre dar y recibir. Cuando alguno de estos tres se rompe, el sistema tiende a buscar restaurarlo por su cuenta, muchas veces a través de quien menos lo eligió conscientemente.`
  );

  lecturas.forEach((l) => parrafos.push(l.texto));

  parrafos.push(
    `Hellinger observó que toda familia se comporta como si tuviera una "conciencia colectiva": una fuerza que no se siente conscientemente, pero que busca mantener el orden del sistema —que todos pertenezcan, que se respete quién llegó antes, que haya equilibrio. Cuando alguien queda excluido, esa conciencia tiende a "recordarlo" a través de un descendiente, que sin saberlo repite algo de su sentir o su destino, hasta que se le vuelve a mirar con amor. A esto lo llamó "amor ciego": el amor que, por lealtad, repite en lugar de liberar.`
  );

  const haySenales = lecturas.some((l) => l.orden === "Orden de pertenencia" || l.orden === "Orden de jerarquía" || l.orden === "Orden de equilibrio (dar y recibir)");
  if (haySenales) {
    parrafos.push(
      `En conjunto, esto no significa que algo esté “mal” en tu familia ni que debas resolverlo de inmediato: los sistemas familiares tardan generaciones en desordenarse, y también pueden reordenarse con pasos pequeños y conscientes. El primer paso suele ser simplemente nombrar lo que antes no se nombraba, tal como acabas de hacerlo aquí. Cada nombre que pones en tu árbol es un acto de amor hacia quienes vinieron antes, y hacia quien vendrá después de ti.`
    );
  } else {
    parrafos.push(
      `Un sistema sin señales de alerta evidentes no deja de necesitar atención: los tres órdenes del amor se sostienen con el tiempo, no de una vez para siempre. Vale la pena seguir agregando miembros a tu árbol —tíos, abuelos, hijos— para que esta lectura se afine y pueda anticipar patrones antes de que se conviertan en conflictos.`
    );
  }

  parrafos.push(
    `Esta lectura se basa únicamente en los datos que ${n} ingresó en el árbol; cuantas más personas y vínculos agregues, más preciso será el patrón que el sistema puede detectar. Fuente del marco teórico: ${cita}`
  );

  return parrafos;
}
