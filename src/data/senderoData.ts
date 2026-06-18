export interface PathFactor {
  id: number
  nameSpa: string
  namePali: string
  nameEng: string
  category: 'Sabiduría' | 'Ética' | 'Meditación'
  symbol: string
  color: string
  angle: number
  shortDesc: string
  fullDesc: string
  practice: string
  obstacle: string
  example: string
  quote: string
}

export interface TrainingCategory {
  key: string
  name: string
  pali: string
  color: string
  desc: string
}

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  { key: 'Sabiduría', name: 'Sabiduría', pali: 'Paññā', color: '#c8632a', desc: 'Comprensión correcta de la realidad' },
  { key: 'Ética',     name: 'Ética',     pali: 'Sīla',  color: '#6b7c5a', desc: 'Conducta moral y virtud' },
  { key: 'Meditación',name: 'Meditación',pali: 'Samādhi',color: '#7b5ea7', desc: 'Cultivo de la mente' },
]

export const EIGHTFOLD_PATH: PathFactor[] = [
  {
    id: 1,
    nameSpa: 'Visión Correcta', namePali: 'Sammā diṭṭhi', nameEng: 'Right View',
    category: 'Sabiduría', symbol: '👁️', color: '#c8632a', angle: 0,
    shortDesc: 'Comprender las Cuatro Nobles Verdades y la naturaleza de la realidad.',
    fullDesc: 'La Visión Correcta es la comprensión de la realidad tal como es, sin la distorsión de ilusiones, prejuicios o aversiones. Implica entender las Cuatro Nobles Verdades: la existencia del sufrimiento (dukkha), su origen en el apego y el deseo (samudāya), la posibilidad de su cese (nirodha) y el sendero hacia esa liberación (magga). También comprende entender las tres características de la existencia: impermanencia (anicca), insatisfacción (dukkha) y ausencia de un yo fijo (anattā).',
    practice: 'Estudia las enseñanzas del Buda (Dharma) con mente abierta. Observa cómo el apego genera sufrimiento en tu vida cotidiana. Reflexiona sobre la impermanencia de todos los fenómenos.',
    obstacle: 'La ilusión del yo permanente (attā), las opiniones rígidas y los puntos de vista extremos del eternalismo o el nihilismo.',
    example: 'Cuando pierdes algo que aprecias —un trabajo, una relación— la Visión Correcta te permite ver que el sufrimiento surge del apego a que las cosas sean permanentes, no del evento en sí.',
    quote: '"Ver el surgir y el cesar de los cinco agregados con sabiduría perfecta conduce a la cesación del sufrimiento." — Saṃyutta Nikāya',
  },
  {
    id: 2,
    nameSpa: 'Intención Correcta', namePali: 'Sammā saṅkappa', nameEng: 'Right Intention',
    category: 'Sabiduría', symbol: '🌱', color: '#b5581e', angle: 45,
    shortDesc: 'Cultivar intenciones de renuncia, buena voluntad y no-daño.',
    fullDesc: 'La Intención Correcta es el compromiso ético que emerge de la Visión Correcta. Se refiere a las motivaciones que guían nuestras acciones. El Buda identificó tres intenciones correctas: renuncia (nekkhamma-saṅkappa) —alejarse de la avaricia y el apego sensorial—, buena voluntad (abyāpāda-saṅkappa) —amor benevolente hacia todos los seres—, y no-daño (avihiṃsā-saṅkappa) —compasión, abstenerse de causar sufrimiento. Se oponen a tres intenciones incorrectas: deseo sensorial, mala voluntad y crueldad.',
    practice: 'Antes de actuar, pregúntate: ¿Esta acción surge del deseo, la aversión o la ignorancia? Cultiva metta (amor benevolente) dedicando pensamientos de bienestar a ti mismo y a otros cada mañana.',
    obstacle: 'El deseo sensorial que busca placer, la mala voluntad que busca daño, y la crueldad disfrazada de indiferencia.',
    example: 'Al tener un conflicto con alguien, la intención incorrecta te lleva a buscar "ganar". La intención correcta te lleva a buscar comprensión mutua y no causar más sufrimiento.',
    quote: '"Los pensamientos son los precursores de todos los actos. Si alguien habla o actúa con mente pura, la felicidad lo sigue como una sombra que nunca se va." — Dhammapada',
  },
  {
    id: 3,
    nameSpa: 'Habla Correcta', namePali: 'Sammā vācā', nameEng: 'Right Speech',
    category: 'Ética', symbol: '🗣️', color: '#6b7c5a', angle: 90,
    shortDesc: 'Abstenerse de mentir, habla divisiva, palabras duras e inutilidad.',
    fullDesc: 'El Habla Correcta es el primero de los tres factores éticos (sīla). El Buda identificó cuatro aspectos: abstenerse de mentir (musāvādā veramaṇī), abstenerse del habla divisiva que crea discordia (pisuṇāya vācāya veramaṇī), abstenerse de palabras ásperas o crueles (pharusāya vācāya veramaṇī), y abstenerse de charla frívola o sin sentido (samphappalāpā veramaṇī). El habla correcta es veraz, amable, oportuna, bien intencionada y beneficiosa.',
    practice: 'Antes de hablar, aplica el filtro triple: ¿Es verdad? ¿Es amable? ¿Es necesario? Practica el silencio cuando no tienes algo útil que contribuir. Observa el impacto de tus palabras en otros.',
    obstacle: 'El hábito de chismear, la tendencia a exagerar o minimizar para quedar bien, el sarcasmo como mecanismo de defensa.',
    example: 'En una reunión de trabajo, cuando alguien comete un error, el habla incorrecta lo señala públicamente para quedar bien. El habla correcta lo aborda en privado, con veracidad y gentileza.',
    quote: '"La palabra amable puede ser corta y fácil de decir, pero su eco es verdaderamente interminable." — Atribuida a la tradición budista',
  },
  {
    id: 4,
    nameSpa: 'Acción Correcta', namePali: 'Sammā kammanta', nameEng: 'Right Action',
    category: 'Ética', symbol: '🤲', color: '#5c7a4a', angle: 135,
    shortDesc: 'Abstenerse de matar, robar y conducta sexual incorrecta.',
    fullDesc: 'La Acción Correcta se refiere a la conducta corporal ética. El Buda la definió en términos de tres abstenciones: abstenerse de quitar la vida (pāṇātipātā veramaṇī), abstenerse de tomar lo no dado (adinnādānā veramaṇī), y abstenerse de conducta sexual incorrecta que causa daño (kāmesumicchācārā veramaṇī). En su aspecto positivo, implica actuar con compasión hacia todos los seres, generosidad y honestidad en las relaciones.',
    practice: 'Practica los Cinco Preceptos (pañcasīla) como base. Consume de manera consciente: evalúa si tus hábitos de consumo (alimentación, compras) causan daño a otros seres o al planeta.',
    obstacle: 'Los impulsos reactivos —actuar desde la ira, el miedo o el deseo— sin pausa reflexiva entre el estímulo y la respuesta.',
    example: 'Encuentras dinero extra en tu cambio. La acción incorrecta es guardarlo. La acción correcta es devolverlo, incluso si es inconveniente.',
    quote: '"No hagas daño, practica el bien, purifica la mente: esta es la enseñanza de los Budas." — Dhammapada 183',
  },
  {
    id: 5,
    nameSpa: 'Medio de Vida Correcto', namePali: 'Sammā ājīva', nameEng: 'Right Livelihood',
    category: 'Ética', symbol: '⚖️', color: '#4e6e40', angle: 180,
    shortDesc: 'Ganarse la vida sin causar daño a otros seres.',
    fullDesc: 'El Medio de Vida Correcto extiende la ética al ámbito económico y profesional. El Buda señaló explícitamente cinco oficios incorrectos para laicos: comercio de armas, de seres vivos, de carne, de intoxicantes y de venenos. Más ampliamente, cualquier trabajo que implique engaño, coacción o daño es incorrecto. El medio de vida correcto contribuye al bienestar de la sociedad y permite sostener la práctica espiritual.',
    practice: 'Reflexiona sobre cómo tu trabajo impacta a otros. ¿Tu trabajo contribuye al bienestar? ¿Eres honesto en tus transacciones? ¿Tu consumo de recursos es proporcional a tu necesidad real?',
    obstacle: 'La presión económica que racionaliza compromisos éticos ("es sólo un trabajo"), y la separación artificial entre "vida espiritual" y "vida laboral".',
    example: 'Un vendedor que emplea tácticas de miedo o engaño para cerrar ventas ejerce un medio de vida incorrecto. Uno que informa honestamente sobre sus productos, aunque venda menos, ejerce el correcto.',
    quote: '"La riqueza ganada con dharma no perece; la ganada sin él se va con el viento." — Proverbio budista',
  },
  {
    id: 6,
    nameSpa: 'Esfuerzo Correcto', namePali: 'Sammā vāyāma', nameEng: 'Right Effort',
    category: 'Meditación', symbol: '🔥', color: '#7b5ea7', angle: 225,
    shortDesc: 'Cultivar estados mentales hábiles y abandonar los no hábiles.',
    fullDesc: 'El Esfuerzo Correcto es el primero de los tres factores de meditación (samādhi). El Buda lo detalló en cuatro esfuerzos: prevenir estados no hábiles (akusala) que aún no han surgido, abandonar los estados no hábiles que ya surgieron, cultivar estados hábiles (kusala) que aún no han surgido, y mantener los estados hábiles que ya surgieron. No se trata de esfuerzo violento ni de represión, sino de un esfuerzo persistente, entusiasta y bien dirigido (viriya).',
    practice: 'Identifica tus "estados no hábiles" más frecuentes (ira, ansiedad, pereza). Cuando surjan, no los suprimas ni los alimentes; obsérvales con ecuanimidad. Cultiva estados hábiles como gratitud y compasión activamente.',
    obstacle: 'Los dos extremos: el esfuerzo excesivo que genera tensión, y la pereza espiritual (thīna-middha) que abandona la práctica.',
    example: 'Cuando surge la irritación, el esfuerzo incorrecto la suprime o la expresa. El correcto la reconoce ("hay irritación"), investiga su causa, y la deja pasar sin actuar desde ella.',
    quote: '"Si el esfuerzo es demasiado intenso, conducirá a la agitación; si es demasiado relajado, llevará a la pereza." — Ānāpānasati Sutta',
  },
  {
    id: 7,
    nameSpa: 'Atención Plena Correcta', namePali: 'Sammā sati', nameEng: 'Right Mindfulness',
    category: 'Meditación', symbol: '🧘', color: '#6a50a0', angle: 270,
    shortDesc: 'Presencia consciente en cuatro bases: cuerpo, sensaciones, mente y objetos mentales.',
    fullDesc: 'La Atención Plena Correcta es el corazón práctico del sendero, desarrollada sistemáticamente en el Satipaṭṭhāna Sutta. Consiste en mantener atención clara, continua y sin reacción sobre cuatro fundamentos: el cuerpo (kāya) —incluyendo la respiración, las posturas y los movimientos—; las sensaciones (vedanā) —agradables, desagradables o neutras—; los estados de la mente (citta) —si hay deseo, aversión, distracción, etc.—; y los objetos mentales (dhammā) —incluyendo los obstáculos, los agregados y los factores del despertar.',
    practice: 'Práctica formal: siéntate 10–20 minutos observando la respiración sin controlarla. Práctica informal: elige una actividad diaria (comer, caminar, lavar platos) y hazla con atención completa, sin multitarea.',
    obstacle: 'La dispersión mental (vikkhitta citta), el olvido (pamāda) y la confusión entre mindfulness y mera relajación.',
    example: 'Comes mientras revisas el teléfono: tu cuerpo está en la mesa pero tu mente está en otro lugar. La atención plena es saborear cada bocado, percibir el hambre y la saciedad, estar completamente en el acto de comer.',
    quote: '"Monjes, este es el camino directo para la purificación de los seres, para superar el dolor y el lamento —los cuatro fundamentos de la atención." — Satipaṭṭhāna Sutta',
  },
  {
    id: 8,
    nameSpa: 'Concentración Correcta', namePali: 'Sammā samādhi', nameEng: 'Right Concentration',
    category: 'Meditación', symbol: '💎', color: '#5a44a0', angle: 315,
    shortDesc: 'Desarrollar los cuatro jhānas: estados de absorción meditativa progresiva.',
    fullDesc: 'La Concentración Correcta es el cultivo sistemático de estados de absorción meditativa llamados jhānas. El Buda describió cuatro jhānas: el primero, con pensamiento discursivo y bienestar profundo; el segundo, con quietud interna y éxtasis sin pensamiento; el tercero, con ecuanimidad y bienestar consciente tras el desvanecimiento del éxtasis; y el cuarto, caracterizado por ecuanimidad y atención puras. Estos estados no son el objetivo final sino condiciones que permiten el surgimiento de la sabiduría liberadora (vipassanā).',
    practice: 'Siéntate en postura estable. Elige un objeto de meditación (la respiración, metta, una imagen). Cuando la mente divague, nótalo sin juicio y regresa gentilmente. La concentración se desarrolla gradualmente con práctica constante.',
    obstacle: 'Los cinco obstáculos (nīvaraṇa): deseo sensorial, mala voluntad, pereza, agitación y duda. También confundir jhāna con la liberación.',
    example: 'La mente concentrada es como un lago tranquilo que refleja la luna con claridad. La mente dispersa es como un lago agitado por el viento: la luna existe, pero la imagen se distorsiona.',
    quote: '"El que ha abandonado los cinco obstáculos, defectos mentales que debilitan la sabiduría, entra y permanece en el primer jhāna." — Sāmaññaphala Sutta',
  },
]

export interface FourTruth {
  id: string
  number: string
  pali: string
  nameSpa: string
  color: string
  symbol: string
  diagnosis: string
  body: string
  practice: string
}

export const FOUR_TRUTHS: FourTruth[] = [
  {
    id: 'dukkha', number: '1ª', pali: 'Dukkha', nameSpa: 'El sufrimiento existe',
    color: '#8b4a8b', symbol: '🌊',
    diagnosis: 'Diagnóstico',
    body: 'El Buda no enseñó que la vida es solo sufrimiento, sino que contiene sufrimiento (dukkha). Dukkha tiene tres dimensiones: el sufrimiento evidente (dukkha-dukkha) como dolor físico y mental; la impermanencia de la experiencia placentera (vipariṇāma-dukkha); y la insatisfacción inherente en los cinco agregados condicionados (saṅkhāra-dukkha). La primera noble verdad es un acto de honestidad radical: ver la experiencia tal como es.',
    practice: 'No huyas del malestar. Cuando surja incomodidad —física o emocional— obsérvala con curiosidad en lugar de intentar eliminarla inmediatamente. Esta presencia honesta es el primer paso del sendero.',
  },
  {
    id: 'samudaya', number: '2ª', pali: 'Samudaya', nameSpa: 'El origen del sufrimiento',
    color: '#c8632a', symbol: '🔥',
    diagnosis: 'Etiología',
    body: 'El sufrimiento surge del deseo (taṇhā) —literalmente "sed". El Buda identificó tres tipos de taṇhā: deseo sensorial (kāma-taṇhā), deseo de existencia (bhava-taṇhā) y deseo de no-existencia (vibhava-taṇhā). Este deseo se alimenta de la ignorancia (avijjā) sobre la verdadera naturaleza de la realidad: tomamos como permanente lo impermanente, como satisfactorio lo insatisfactorio, como "yo" lo que no tiene yo fijo. El ciclo de condicionamiento es descrito en detalle en el Paticcasamuppāda.',
    practice: 'Observa el surgimiento del deseo sin actuar inmediatamente sobre él. La pausa entre el impulso y la acción es el espacio donde nace la libertad. Nota: "hay deseo de X" sin convertirte en ese deseo.',
  },
  {
    id: 'nirodha', number: '3ª', pali: 'Nirodha', nameSpa: 'La cesación del sufrimiento',
    color: '#4a7fa5', symbol: '✨',
    diagnosis: 'Pronóstico',
    body: 'La cesación completa del deseo, el desapego y la liberación de este es Nirvana (Nibbāna en pali). Nirvana no es una aniquilación ni un paraíso externo: es el cese de las condiciones que generan sufrimiento. El Buda lo describió como "la no-codicia, el no-odio, la no-ilusión" y como "la paz suprema". Es la demostración viviente de que el sufrimiento puede cesar —el Buda mismo es la prueba viva de esta posibilidad.',
    practice: 'Cultiva el soltar (nekkhamma). Cada vez que dejas ir una expectativa, un juicio o un apego —sin resignación sino con comprensión— experimentas un pequeño fogonazo de lo que el Buda llamó Nibbāna.',
  },
  {
    id: 'magga', number: '4ª', pali: 'Magga', nameSpa: 'El sendero hacia la cesación',
    color: '#6b7c5a', symbol: '☸️',
    diagnosis: 'Tratamiento',
    body: 'El sendero es el Óctuple Noble Sendero (Aṭṭhaṅgika Magga): Visión Correcta, Intención Correcta, Habla Correcta, Acción Correcta, Medio de Vida Correcto, Esfuerzo Correcto, Atención Plena Correcta y Concentración Correcta. No se trata de mandamientos sino de un entrenamiento integral que cultiva sabiduría (paññā), ética (sīla) y concentración (samādhi) de forma interdependiente. El sendero no es lineal: es una rueda en la que cada factor sostiene a todos los demás.',
    practice: 'Elige un factor del sendero que sientas más relevante para tu momento actual y practícalo conscientemente durante una semana. Observa cómo el trabajo en ese factor afecta a los demás.',
  },
]

export interface Khandha {
  id: string
  nameSpa: string
  namePali: string
  nameEng: string
  symbol: string
  color: string
  desc: string
  analogy: string
  misidentification: string
}

export const FIVE_KHANDHAS: Khandha[] = [
  {
    id: 'rupa', nameSpa: 'Forma', namePali: 'Rūpa', nameEng: 'Form',
    symbol: '🌊', color: '#4a7fa5',
    desc: 'Todo lo material: el cuerpo físico con sus cuatro elementos (tierra, agua, fuego, viento) y los seis órganos sensoriales. Rūpa es el soporte material de la experiencia.',
    analogy: 'Una ola en el océano. Parece una cosa sólida con nombre propio, pero es solo agua en movimiento temporal bajo el empuje del viento. No hay "la ola" —hay agua que ondula y luego se aplana.',
    misidentification: 'Identificarse con "mi cuerpo" como si fuera un yo permanente, cuando el cuerpo cambia constantemente y no está bajo control total del pensamiento.',
  },
  {
    id: 'vedana', nameSpa: 'Sensación / Tono hedónico', namePali: 'Vedanā', nameEng: 'Feeling-tone',
    symbol: '💧', color: '#5a8fa5',
    desc: 'El tono hedónico inmediato de cada experiencia: agradable (sukha), desagradable (dukkha) o neutro (adukkhamasukha). Vedanā no es una emoción compleja sino el sabor básico que precede a la reacción.',
    analogy: 'El indicador de pH de una solución. No te dice de qué sustancia se trata ni qué hacer con ella —solo si es ácida, básica o neutra. Ese "sabor" básico llega antes que cualquier análisis.',
    misidentification: 'Confundir el tono hedónico con la realidad: "esto es malo" en lugar de "hay tono desagradable". El problema no es vedanā sino la reacción automática de apego o aversión que dispara.',
  },
  {
    id: 'sanna', nameSpa: 'Percepción', namePali: 'Saññā', nameEng: 'Perception',
    symbol: '🔷', color: '#5a7aa5',
    desc: 'El reconocimiento y clasificación de los objetos de experiencia. Saññā aplica "etiquetas" conocidas a la experiencia nueva, filtrando la realidad a través del condicionamiento previo.',
    analogy: 'Un sello que imprime una marca en cera. Cada vez que el sello toca la cera (experiencia), deja una impresión reconocible. El problema es que el sello ya viene pre-formado por el condicionamiento previo.',
    misidentification: 'Tomar la etiqueta por la realidad: "esa persona es mala" o "esa situación es un fracaso", cuando saññā solo asignó una categoría aprendida, no vio la situación en sí.',
  },
  {
    id: 'sankhara', nameSpa: 'Formaciones mentales', namePali: 'Saṅkhāra', nameEng: 'Mental formations',
    symbol: '⚡', color: '#6a70a5',
    desc: 'Las voliciones, intenciones y formaciones mentales que condicionan las respuestas. Incluye todos los factores mentales (cetasika) que acompañan a la consciencia: atención, intención, fe, esfuerzo, compasión, etc.',
    analogy: 'Un director de orquesta invisible. Mientras rūpa son los instrumentos, vedanā el timbre emocional y saññā las partituras, saṅkhāra es quien dirige, acelera, frena, enfatiza. Muchas veces opera sin que lo "escuchemos".',
    misidentification: 'Identificarse con las intenciones y hábitos mentales como si fueran "quien soy yo", cuando son patrones condicionados que pueden ser cultivados o abandonados.',
  },
  {
    id: 'vinnana', nameSpa: 'Consciencia', namePali: 'Viññāṇa', nameEng: 'Consciousness',
    symbol: '✨', color: '#7a60a5',
    desc: 'La consciencia que surge del contacto entre un órgano sensorial y su objeto. No es un "yo" que observa —es el proceso de conocer que emerge condicionadamente.',
    analogy: 'El reflejo de la luna en distintas cuencas de agua. Hay luna (objeto), hay agua (base sensorial), hay reflejo (consciencia). El reflejo no es la luna ni el agua —es el encuentro de ambos.',
    misidentification: 'Asumir que hay un "observador" permanente y continuo detrás de la consciencia —un "yo" que tiene experiencias— cuando el Buda enseñó que la consciencia surge y cesa momento a momento.',
  },
]

export interface Lakshana {
  id: string
  pali: string
  nameSpa: string
  symbol: string
  color: string
  desc: string
  body: string
  praticeImplication: string
}

export const THREE_LAKSHANAS: Lakshana[] = [
  {
    id: 'anicca', pali: 'Anicca', nameSpa: 'Impermanencia',
    symbol: '🌊', color: '#4a7fa5',
    desc: 'Todo fenómeno condicionado está en constante cambio y eventual disolución.',
    body: 'Anicca es la primera de las tres marcas de la existencia (tilakkhaṇa). El Buda señaló que todos los fenómenos condicionados (saṅkhāra) son impermanentes: surgen, persisten brevemente y cesan. Esto incluye el cuerpo, los estados mentales, las relaciones, las instituciones, los pensamientos. La impermanencia no es solo una filosofía abstracta sino una característica observable de la experiencia momento a momento. La resistencia a anicca —el intento de retener lo que cambia— es una fuente primaria de sufrimiento.',
    praticeImplication: 'Observa la impermanencia en la experiencia directa: el cuerpo cambia con cada respiración, los estados mentales surgen y pasan. Esta contemplación debilita el apego y cultiva ecuanimidad.',
  },
  {
    id: 'dukkha', pali: 'Dukkha', nameSpa: 'Insatisfacción',
    symbol: '🔥', color: '#c8632a',
    desc: 'Todo lo condicionado conlleva insatisfacción, sufrimiento o imperfección inherente.',
    body: 'Dukkha como lakshaṇa trasciende el sufrimiento obvio de la primera noble verdad. Indica una insatisfacción sutil, pervasiva: incluso las experiencias agradables son imperfectas porque cambian, terminan o generan apego. El Buda usó tres capas: dukkha-dukkha (sufrimiento evidente), vipariṇāma-dukkha (el sufrimiento del cambio) y saṅkhāra-dukkha (la insatisfacción inherente en todo lo condicionado). Reconocer esto no lleva al pesimismo sino a dejar de buscar satisfacción permanente donde no puede encontrarse.',
    praticeImplication: 'Cuando surge una experiencia placentera, nota: "esto es agradable Y es impermanente". Esto no niega el placer —lo pone en perspectiva y reduce la angustia cuando termina.',
  },
  {
    id: 'anatta', pali: 'Anattā', nameSpa: 'No-yo',
    symbol: '💨', color: '#7b5ea7',
    desc: 'Ningún fenómeno condicionado posee una esencia permanente, independiente o sustancial.',
    body: 'Anattā (literalmente "no-alma") es la característica más distintiva del budismo y la más difícil de comprender. El Buda enseñó que no existe un "yo" permanente, inmutable o sustancial en ninguno de los cinco agregados ni en su combinación. Lo que llamamos "yo" es un proceso dinámico e interdependiente de cuerpo, sensaciones, percepciones, formaciones y consciencia. Esto no significa que no existamos: significa que lo que somos es proceso, no cosa; relación, no esencia.',
    praticeImplication: 'Cuando la mente dice "yo soy así" o "siempre hago esto", investiga: ¿dónde está ese "yo" que eres? Observa cómo las características que asumes como fijas cambian con el contexto, el humor, el tiempo.',
  },
]

export interface JhanaFactor {
  pali: string
  spa: string
  desc: string
}

export interface Jhana {
  number: string
  namePali: string
  group: 'form' | 'formless'
  symbol: string
  color: string
  shortDesc: string
  analogy: string
  factors: { present: string[]; abandoned: string[] }
}

export const JHANAS: Jhana[] = [
  {
    number: 'Primero', namePali: 'Paṭhama jhāna', group: 'form',
    symbol: '🌅', color: '#7b5ea7',
    shortDesc: 'Pensamiento aplicado y sostenido, con arrobamiento y felicidad nacidos del retiro.',
    analogy: 'Un estanque de montaña alimentado por un manantial subterráneo. El agua de alegría y felicidad impregna todo el cuerpo sin que ningún rincón quede sin saturar —pero la superficie todavía muestra pequeñas ondas (vitakka y vicāra).',
    factors: {
      present: ['Vitakka (pensamiento aplicado)', 'Vicāra (pensamiento sostenido)', 'Pīti (arrobamiento)', 'Sukha (felicidad)', 'Ekaggatā (unificación mental)'],
      abandoned: ['Los cinco obstáculos (nīvaraṇa)'],
    },
  },
  {
    number: 'Segundo', namePali: 'Dutiya jhāna', group: 'form',
    symbol: '🌊', color: '#6a50a0',
    shortDesc: 'Confianza interna, unificación mental, sin pensamiento discursivo.',
    analogy: 'El mismo estanque, pero ahora la fuente subterránea surge desde adentro del lago mismo. No hay afluente externo visible —el agua brota desde el fondo, impregnando todo desde su interior. La superficie está más tranquila.',
    factors: {
      present: ['Pīti (arrobamiento)', 'Sukha (felicidad)', 'Ekaggatā (unificación mental)', 'Samādhi (confianza interna)'],
      abandoned: ['Vitakka (abandonado)', 'Vicāra (abandonado)'],
    },
  },
  {
    number: 'Tercero', namePali: 'Tatiya jhāna', group: 'form',
    symbol: '🌸', color: '#5a44a0',
    shortDesc: 'Ecuanimidad y atención plena, el noble declara: "vive con ecuanimidad".',
    analogy: 'Un lago de montaña en un día sin viento al atardecer. No hay manantial visible, no hay olas, no hay corriente. El agua simplemente está —quieta, clara, luminosa. No hay excitación, pero la presencia es total.',
    factors: {
      present: ['Sukha (felicidad consciente)', 'Ekaggatā (unificación mental)', 'Upekkhā (ecuanimidad)', 'Sati (atención plena)'],
      abandoned: ['Pīti (arrobamiento —desvanecido)'],
    },
  },
  {
    number: 'Cuarto', namePali: 'Catuttha jhāna', group: 'form',
    symbol: '💎', color: '#4a3890',
    shortDesc: 'Ecuanimidad y atención puras, sin placer ni dolor.',
    analogy: 'Un espejo perfectamente pulido en una habitación sin corrientes de aire. No refleja nada en particular —simplemente está disponible para reflejar con perfecta fidelidad cualquier cosa que se le presente. No hay preferencia por una imagen sobre otra.',
    factors: {
      present: ['Upekkhā pura (ecuanimidad perfecta)', 'Sati pura (atención perfecta)', 'Ekaggatā (unificación profunda)'],
      abandoned: ['Sukha (placer —trascendido)', 'Dukkha (dolor —abandonado)'],
    },
  },
  {
    number: 'Quinto', namePali: 'Ākāsānañcāyatana', group: 'formless',
    symbol: '🌌', color: '#3a3880',
    shortDesc: 'Base del espacio infinito — disolución de la percepción de forma.',
    analogy: 'Imagina que el cristal del espejo del cuarto jhāna se disuelve. Ya no hay superficie —solo el espacio en el que el espejo existía, extendiéndose sin límite en todas las direcciones.',
    factors: {
      present: ['Percepción de espacio infinito', 'Ecuanimidad profunda', 'Atención sutil'],
      abandoned: ['Percepción de forma material'],
    },
  },
  {
    number: 'Sexto', namePali: 'Viññāṇañcāyatana', group: 'formless',
    symbol: '🔮', color: '#2a2870',
    shortDesc: 'Base de la consciencia infinita — espacio percibido por el espacio mismo.',
    analogy: 'El espacio se vuelve consciente de sí mismo. Ya no hay distinción entre el "espacio" como objeto y la "consciencia" que lo percibe —se colapsan en una sola experiencia ilimitada.',
    factors: {
      present: ['Percepción de consciencia infinita', 'Ecuanimidad más sutil', 'Unificación profundísima'],
      abandoned: ['Percepción de espacio infinito'],
    },
  },
  {
    number: 'Séptimo', namePali: 'Ākiñcaññāyatana', group: 'formless',
    symbol: '🌑', color: '#1a1a60',
    shortDesc: 'Base de la nada — "no hay nada en absoluto".',
    analogy: 'Cuando el testigo de la consciencia también desaparece, queda solo el reconocimiento susurrado de "nada": ni espacio, ni consciencia, ni objeto, ni sujeto. Solo el eco quieto de la ausencia.',
    factors: {
      present: ['Percepción de "nada"', 'Ecuanimidad extremadamente sutil'],
      abandoned: ['Percepción de consciencia infinita'],
    },
  },
  {
    number: 'Octavo', namePali: 'Neva-saññā-nāsaññāyatana', group: 'formless',
    symbol: '∞', color: '#0a0a50',
    shortDesc: 'Ni percepción ni no-percepción — el umbral del cese.',
    analogy: 'Un espacio tan sutil que la pregunta "¿hay algo aquí?" ya no tiene sentido —ni sí ni no. Demasiado para llamarlo "nada", demasiado vacío para llamarlo "algo".',
    factors: {
      present: ['Estado de percepción extremadamente sutil', 'Ni definible ni indefinible'],
      abandoned: ['Percepción de nada'],
    },
  },
]

export interface Nivarana {
  id: string
  pali: string
  nameSpa: string
  symbol: string
  color: string
  desc: string
  antidote: string
  jhanaEffect: string
}

export const FIVE_NIVARANAS: Nivarana[] = [
  {
    id: 'kama', pali: 'Kāmacchanda', nameSpa: 'Deseo sensorial',
    symbol: '🔥', color: '#c8632a',
    desc: 'El anhelo persistente de objetos sensoriales agradables —sonidos, sabores, imágenes, sensaciones táctiles, pensamientos placenteros. La mente que persigue placeres sensoriales no puede asentarse en la quietud.',
    antidote: 'Contemplar la impermanencia y las consecuencias del deseo. Praticar la percepción de lo no bello (asubha bhāvanā). Reducir el estímulo sensorial antes de sentarse a meditar.',
    jhanaEffect: 'Impide completamente la entrada al primer jhāna. La mente está "fuera", persiguiendo objetos.',
  },
  {
    id: 'vyapada', pali: 'Vyāpāda', nameSpa: 'Mala voluntad / Aversión',
    symbol: '⚡', color: '#8b3a3a',
    desc: 'La irritación, el resentimiento, la ira o el rechazo hacia personas, situaciones o hacia uno mismo. Incluso una leve aversión contamina la quietud meditativa con resistencia.',
    antidote: 'Metta bhāvanā (amor benevolente): enviar deseos de bienestar a uno mismo, a seres amados, neutros y difíciles. Investigar la causa de la aversión con curiosidad en lugar de supresión.',
    jhanaEffect: 'Genera tensión y contracción mental que impide el arrobamiento (pīti) necesario para el primer jhāna.',
  },
  {
    id: 'thina', pali: 'Thīna-middha', nameSpa: 'Pereza y torpor',
    symbol: '😴', color: '#6a6a4a',
    desc: 'El par de pereza mental (thīna) y sopor físico (middha). La mente pierde claridad y vivacidad; el cuerpo quiere dormir. A menudo aumenta después de comer o en ambientes cálidos.',
    antidote: 'Aumentar la luz, cambiar de postura (levantarse, caminar). Contemplar la muerte (maraṇasati) para avivar urgencia espiritual. Respirar profundamente. Enfocarse en objetos brillantes o energizantes.',
    jhanaEffect: 'Produce un estado de subabsorción o sueño meditativo que no es jhāna real. La mente no tiene la claridad necesaria.',
  },
  {
    id: 'uddhacca', pali: 'Uddhacca-kukkucca', nameSpa: 'Agitación y preocupación',
    symbol: '🌪️', color: '#a07830',
    desc: 'La agitación mental (uddhacca) como inquietud de la mente que salta de objeto en objeto, combinada con la preocupación (kukkucca) por acciones pasadas o futuras. La mente no puede descansar.',
    antidote: 'Reducir estímulos externos. Enfocarse en una sola cosa con paciencia. Practicar samatha (meditación de calma). La práctica regular acumula "capital de calma" que reduce la agitación basal.',
    jhanaEffect: 'La mente no puede unificarse (ekaggatā) si está constantemente saltando. El primer jhāna requiere un grado significativo de quietud.',
  },
  {
    id: 'vicikiccha', pali: 'Vicikicchā', nameSpa: 'Duda',
    symbol: '❓', color: '#5a5a7a',
    desc: 'La duda paralizante sobre el Buda, el Dharma, la Saṅgha, la práctica misma o sobre la propia capacidad de progresar. No es la duda investigativa que lleva a comprensión, sino la que produce inacción.',
    antidote: 'Estudiar el Dharma para resolver dudas conceptuales. Relacionarse con maestros y comunidad (Saṅgha) de confianza. Mantener la práctica aunque haya dudas —la experiencia directa resuelve lo que el intelecto no puede.',
    jhanaEffect: 'La duda impide el compromiso completo necesario para entrar en absorción. La mente siempre "retiene una parte" como reserva.',
  },
]

export interface TraditionComparison {
  id: string
  topic: string
  theravada: string
  mahayana: string
}

export const TRADITIONS_COMPARISON: TraditionComparison[] = [
  {
    id: 'history',
    topic: 'Origen histórico y la gran escisión',
    theravada: 'Se considera heredero de las escuelas del budismo temprano. Su canon (Tipiṭaka en pali) fue fijado en Sri Lanka ~80 a.C. Se extendió por Sri Lanka, Tailandia, Birmania, Camboya y Laos.',
    mahayana: 'Surgió en India entre los siglos II a.C. y II d.C., con textos que afirman ser la "segunda vuelta de la rueda del Dharma". Se extendió por China, Japón, Corea, Tibet y Vietnam.',
  },
  {
    id: 'canon',
    topic: 'Canon y autoridad de las escrituras',
    theravada: 'El Tipiṭaka en pali (Vinaya Piṭaka, Sutta Piṭaka, Abhidhamma Piṭaka) como única fuente autoritativa. Los suttas del Majjhima y Dīgha Nikāya son centrales.',
    mahayana: 'Acepta el canon pali como válido pero lo complementa con sutras mahāyāna (Prajñāpāramitā, Lotus Sutra, Vimalakirti, Avatamsaka). Los sutras mahāyāna son considerados revelaciones budicas.',
  },
  {
    id: 'ideal',
    topic: 'Ideal soteriológico: arahant vs bodhisattva',
    theravada: 'El ideal es el arahant —quien, siguiendo el sendero, alcanza la liberación personal de toda afición y entra en el Nirvana tras la muerte. El monje es el modelo principal.',
    mahayana: 'El ideal es el bodhisattva —quien, motivado por la compasión universal (karuṇā), difiere el Nirvana final para ayudar a todos los seres a liberarse. La bodhicitta (mente de despertar) es central.',
  },
  {
    id: 'buddha',
    topic: 'Naturaleza del Buda y buddhología',
    theravada: 'El Buda histórico (Siddhattha Gotama) fue un ser humano excepcional que alcanzó el despertar completo (sammā-sambuddha). El Buda ha entrado en parinirvāṇa y no interviene activamente.',
    mahayana: 'El Buda trasciende al ser humano histórico: el "cuerpo de la verdad" (dharmakāya) es omnisciente y eterno. Los Budas cósmicos (Amitābha, Akṣobhya) y bodhisattvas (Avalokiteśvara, Mañjuśrī) están disponibles para ayudar.',
  },
  {
    id: 'sunyata',
    topic: 'Vacuidad, anattā y la naturaleza de la realidad',
    theravada: 'Anattā se aplica principalmente a personas: no hay un yo sustancial en los cinco agregados. El Abhidhamma analiza los fenómenos en dhammas (momentos de experiencia) que son reales aunque impermanentes.',
    mahayana: 'La escuela Madhyamaka (Nāgārjuna) extiende la vacuidad (śūnyatā) a todos los fenómenos, incluyendo los dhammas del Abhidhamma: nada tiene naturaleza propia (svabhāva). La Yogācāra añade la teoría de la "solo-mente" (vijñaptimātratā).',
  },
  {
    id: 'laity',
    topic: 'Papel del laico y acceso al despertar',
    theravada: 'Históricamente el monje ordenado tiene mayor acceso al despertar en esta vida. Los laicos acumulan mérito (puñña) apoyando a la saṅgha monástica para mejores renacimientos.',
    mahayana: 'Democratiza el acceso al despertar: laicos como Vimalakirti pueden ser más avanzados que monjes. El voto del bodhisattva está disponible para todos. Algunas escuelas (Chan/Zen, Tierra Pura) son especialmente accesibles.',
  },
  {
    id: 'meditation',
    topic: 'Práctica meditativa',
    theravada: 'Enfatiza samatha (calma) y vipassanā (insight/perspectiva directa) como métodos primarios. El sistema de los cuatro jhānas como base para vipassanā. El satipaṭṭhāna (cuatro fundamentos de la atención) es central.',
    mahayana: 'Mayor diversidad: el Chan/Zen usa kōans y zazén; el Vajrayāna tibetano incorpora visualizaciones, mantras y mudras; la Tierra Pura usa la recitación del nombre de Amitābha. El tong-len (tonglen) tibetano cultiva compasión activa.',
  },
  {
    id: 'ethics',
    topic: 'Ética, compasión y los votos',
    theravada: 'Los cinco preceptos (pañcasīla) para laicos, vinaya para monjes. La ética es base del sendero. La compasión (karuṇā) es una de las cuatro brahmaviharās pero no el eje central del ideal.',
    mahayana: 'Los votos del bodhisattva añaden una dimensión universal: "No entraré en el Nirvana hasta que todos los seres estén liberados." La compasión activa (karuṇā) es motor del camino. Los bodhisattvas reaparecen voluntariamente para servir.',
  },
]

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿Cuál es el término pali para "Visión Correcta"?',
    options: ['Sammā vācā', 'Sammā diṭṭhi', 'Sammā sati', 'Sammā vāyāma'],
    correctIndex: 1,
    explanation: 'Sammā diṭṭhi es el primer factor del Óctuple Sendero, en la categoría de Sabiduría (Paññā).',
  },
  {
    id: 'q2',
    question: '"Abstenerse de matar, robar y conducta sexual incorrecta" corresponde a...',
    options: ['Habla Correcta', 'Medio de Vida Correcto', 'Acción Correcta', 'Intención Correcta'],
    correctIndex: 2,
    explanation: 'Sammā kammanta (Acción Correcta) cubre las tres abstenciones corporales del código ético budista.',
  },
  {
    id: 'q3',
    question: '¿A qué categoría de entrenamiento pertenece el Esfuerzo Correcto?',
    options: ['Sabiduría (Paññā)', 'Ética (Sīla)', 'Meditación (Samādhi)', 'Ninguna'],
    correctIndex: 2,
    explanation: 'El Esfuerzo Correcto (Sammā vāyāma) es el primero de los tres factores de meditación junto con la Atención Plena y la Concentración.',
  },
  {
    id: 'q4',
    question: '¿Cuál de los Cinco Agregados (khandhas) se refiere al "tono hedónico"?',
    options: ['Rūpa', 'Saññā', 'Vedanā', 'Saṅkhāra'],
    correctIndex: 2,
    explanation: 'Vedanā es el tono hedónico inmediato de cada experiencia: agradable, desagradable o neutro.',
  },
  {
    id: 'q5',
    question: '¿Cuál obstáculo (nīvaraṇa) impide la meditación por generar agitación mental?',
    options: ['Kāmacchanda', 'Thīna-middha', 'Vicikicchā', 'Uddhacca-kukkucca'],
    correctIndex: 3,
    explanation: 'Uddhacca-kukkucca es la agitación y preocupación: la mente inquieta que salta de objeto en objeto y no puede unificarse.',
  },
  {
    id: 'q6',
    question: '¿Qué jhāna se caracteriza por ecuanimidad y atención puras, sin placer ni dolor?',
    options: ['Primer jhāna', 'Segundo jhāna', 'Tercer jhāna', 'Cuarto jhāna'],
    correctIndex: 3,
    explanation: 'El cuarto jhāna (catuttha jhāna) tiene upekkhā (ecuanimidad) y sati (atención) puras; el placer y el dolor han sido trascendidos.',
  },
  {
    id: 'q7',
    question: 'En el Mahāyāna, el ideal del bodhisattva difiere del arahant Theravāda en que...',
    options: [
      'El bodhisattva solo practica meditación',
      'El bodhisattva difiere el Nirvana para ayudar a todos los seres',
      'El bodhisattva rechaza los cinco preceptos',
      'El bodhisattva no sigue el Óctuple Sendero',
    ],
    correctIndex: 1,
    explanation: 'El bodhisattva, motivado por la bodhicitta y la compasión universal, hace el voto de no entrar en el Nirvana final hasta que todos los seres sean liberados.',
  },
  {
    id: 'q8',
    question: '¿Cuál es la tercera de las Cuatro Nobles Verdades?',
    options: ['Dukkha — el sufrimiento existe', 'Samudaya — el origen del sufrimiento', 'Nirodha — la cesación del sufrimiento', 'Magga — el sendero'],
    correctIndex: 2,
    explanation: 'Nirodha es la tercera noble verdad: la cesación completa del deseo que produce el Nirvana (Nibbāna).',
  },
]
