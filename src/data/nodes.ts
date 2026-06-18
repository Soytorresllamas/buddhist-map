export type BodyBlock = string | [string, string][]

export interface Tag {
  label: string
  gold?: boolean
}

export interface NodeData {
  id: string
  cardTitle: string
  cardSubtitle: string
  cssClass: string
  tags: Tag[]
  modalTitle: string
  modalSub: string
  modalColor: string
  body: BodyBlock[]
  link?: { href: string; label: string }
}

export interface RelationData {
  id: string
  nodeA: string
  nodeB: string
  headerColor: string
  header: string
  desc: string
}

export const NODES: NodeData[] = [
  {
    id: 'joyas',
    cardTitle: '💎 Las Tres Joyas',
    cardSubtitle: 'El refugio fundamental',
    cssClass: 'node-joyas',
    tags: [
      { label: 'Buda' },
      { label: 'Dharma' },
      { label: 'Sangha' },
    ],
    modalTitle: '💎 Las Tres Joyas',
    modalSub: 'El Triple Refugio — fundamento de la práctica budista',
    modalColor: 'var(--color-joyas)',
    body: [
      'Tomar refugio en las Tres Joyas es el acto que convierte a alguien en budista. Son la orientación del practicante.',
      [
        ['Buda:', 'El maestro despierto — tanto el Buda histórico como el principio de la iluminación que todos podemos realizar.'],
        ['Dharma:', 'Las enseñanzas — todo el mapa es Dharma.'],
        ['Sangha:', 'La comunidad de practicantes — los compañeros del camino.'],
      ],
      'Las Tres Joyas son el contexto dentro del cual todo lo demás tiene sentido.',
    ],
  },
  {
    id: 'marcas',
    cardTitle: '🌀 Las Tres Marcas',
    cardSubtitle: 'Características de la existencia',
    cssClass: 'node-marcas',
    tags: [
      { label: 'Impermanencia (Anicca)' },
      { label: 'Insatisfacción (Dukkha)' },
      { label: 'No-yo (Anatta)' },
    ],
    modalTitle: '🌀 Las Tres Marcas de la Existencia',
    modalSub: 'Trilakshana — Lo que toda experiencia tiene en común',
    modalColor: 'var(--color-marcas)',
    body: [
      'Son las tres características que el Buda observó en toda experiencia condicionada:',
      [
        ['Anicca (Impermanencia):', 'Todo fenómeno surge y perece. Nada dura. Resistir esto genera sufrimiento.'],
        ['Dukkha (Insatisfacción):', 'Lo impermanente no puede darnos satisfacción duradera.'],
        ['Anatta (No-yo):', 'No hay un yo fijo, permanente e independiente. Los fenómenos surgen en interdependencia.'],
      ],
      'La Visión Correcta (paso 1) es comprender estas tres marcas. La Prajna paramita es su realización directa.',
    ],
  },
  {
    id: 'paramitas',
    cardTitle: '✨ Las Seis Paramitas',
    cardSubtitle: 'Perfecciones del Bodhisattva',
    cssClass: 'node-paramitas',
    tags: [
      { label: 'Generosidad' },
      { label: 'Ética' },
      { label: 'Paciencia' },
      { label: 'Esfuerzo' },
      { label: 'Meditación' },
      { label: 'Sabiduría' },
    ],
    modalTitle: '✨ Las Seis Paramitas',
    modalSub: 'Perfecciones del Bodhisattva — tradición Mahayana',
    modalColor: 'var(--color-paramitas)',
    body: [
      'Las paramitas son las perfecciones que cultiva un Bodhisattva —alguien que aspira a la iluminación para beneficio de todos los seres.',
      [
        ['1. Dana (Generosidad):', 'Dar sin apego al resultado — material, tiempo, Dharma.'],
        ['2. Sila (Ética):', 'Conducta moral, los preceptos. Paralela a pasos 3-5 del Sendero.'],
        ['3. Kshanti (Paciencia):', 'Aguantar el daño sin reactividad, con comprensión.'],
        ['4. Virya (Esfuerzo):', 'Perseverancia gozosa en el camino. Paralela al paso 6.'],
        ['5. Dhyana (Meditación):', 'Absorción meditativa. Paralela a pasos 7-8.'],
        ['6. Prajna (Sabiduría):', 'Comprensión directa de la vacuidad (sunyata). Paralela a pasos 1-2.'],
      ],
      'Las paramitas son la respuesta Mahayana a: ¿cómo practico el sendero por el bien de todos?',
    ],
  },
  {
    id: 'inconm',
    cardTitle: '💗 Inconmensurables',
    cardSubtitle: 'Brahmaviharas — Moradas divinas',
    cssClass: 'node-inconm',
    tags: [
      { label: 'Amor bondadoso (Metta)' },
      { label: 'Compasión (Karuna)' },
      { label: 'Alegría empática (Mudita)' },
      { label: 'Ecuanimidad (Upekkha)' },
      { label: '💛 Gratitud (Kataññutā)', gold: true },
    ],
    modalTitle: '💗 Las 4 Inconmensurables',
    modalSub: 'Brahmaviharas — Las cuatro moradas divinas',
    modalColor: 'var(--color-inconm)',
    body: [
      'Son estados del corazón ilimitados e inconmensurables porque se extienden hacia todos los seres sin excepción.',
      [
        ['1. Metta (Amor bondadoso):', 'El deseo genuino de que todos los seres sean felices. Antídoto del odio.'],
        ['2. Karuna (Compasión):', 'El deseo de que todos los seres estén libres del sufrimiento. Antídoto de la crueldad.'],
        ['3. Mudita (Alegría empática):', 'Alegrarse sinceramente por el bienestar de otros. Antídoto de la envidia.'],
        ['4. Upekkha (Ecuanimidad):', 'Equilibrio sereno ante el placer y el dolor. Antídoto del apego y el rechazo.'],
      ],
      'La Intención Correcta (paso 2) es esencialmente Metta y Karuna. Sin estos estados del corazón, el sendero se vuelve árido y rígido.',
      '💛 Kataññutā completa el círculo: si las cuatro inconmensurables irradian el corazón hacia afuera —hacia todos los seres—, la gratitud lo voltea hacia adentro para honrar el bien recibido. Katavedità (corresponder con hechos) es su par inseparable. El Buda las nombró como la marca de una persona excelente, rara en el mundo.',
    ],
  },
  {
    id: 'sendero',
    cardTitle: '🛤️ El Óctuple Sendero',
    cardSubtitle: 'El camino a la liberación',
    cssClass: 'node-sendero',
    tags: [
      { label: '① Visión' },
      { label: '② Intención' },
      { label: '③ Habla' },
      { label: '④ Acción' },
      { label: '⑤ Sustento' },
      { label: '⑥ Esfuerzo' },
      { label: '⑦ Atención' },
      { label: '⑧ Concentración' },
    ],
    modalTitle: '🛤️ El Óctuple Noble Sendero',
    modalSub: 'Magga — La cuarta noble verdad en detalle',
    modalColor: 'var(--color-sendero)',
    body: [
      'El sendero se divide en tres grandes grupos que se nutren mutuamente:',
      [
        ['PRAJNA — Sabiduría', ''],
        ['1. Visión correcta (Samma ditthi):', 'Comprender las 4 Nobles Verdades, la impermanencia, el karma.'],
        ['2. Intención correcta (Samma sankappa):', 'Intención de renuncia, buena voluntad y no-daño.'],
        ['SILA — Ética', ''],
        ['3. Habla correcta:', 'Verdad, palabras amables, no chisme ni habla divisiva.'],
        ['4. Acción correcta:', 'No matar, no robar, conducta sexual responsable.'],
        ['5. Sustento correcto:', 'Ganarse la vida sin causar daño.'],
        ['SAMADHI — Concentración', ''],
        ['6. Esfuerzo correcto:', 'Cultivar estados hábiles, abandonar los no hábiles.'],
        ['7. Atención correcta (Sati):', 'Mindfulness del cuerpo, sensaciones, mente y objetos mentales.'],
        ['8. Concentración correcta:', 'Los cuatro jhanas — estados de absorción meditativa.'],
      ],
    ],
    link: { href: 'octuple-noble-sendero.html', label: '📖 Recorre la guía completa del Óctuple Sendero →' },
  },
]

export const CENTRO = {
  id: 'centro',
  modalTitle: '☸️ Las Cuatro Nobles Verdades',
  modalSub: 'El primer discurso del Buda — la base de todo el Dharma',
  modalColor: 'var(--color-centro)',
  body: [
    'Son el punto de partida de toda enseñanza budista, pronunciadas por Siddhartha Gautama en el Parque de los Ciervos en Sarnath.',
    [
      ['1. Dukkha (Sufrimiento):', 'La existencia conlleva insatisfacción, sufrimiento, imperfección.'],
      ['2. Samudaya (Origen):', 'El sufrimiento surge del deseo, el apego y la ignorancia.'],
      ['3. Nirodha (Cesación):', 'El sufrimiento puede cesar — esto es Nirvana.'],
      ['4. Magga (El camino):', 'El Óctuple Noble Sendero es la vía hacia esa cesación.'],
    ],
    'Todo lo demás en el mapa —el Sendero, las Paramitas, las Inconmensurables— son desarrollos y ampliaciones de estas cuatro verdades.',
  ] as BodyBlock[],
}

export const RELATIONS: RelationData[] = [
  {
    id: 'rel-sendero-paramitas',
    nodeA: 'sendero',
    nodeB: 'paramitas',
    headerColor: 'var(--color-sendero)',
    header: '🛤️ Sendero ↔ ✨ Paramitas',
    desc: 'Sila (pasos 3-5) ↔ Dana/Sila. Samadhi (6-8) ↔ Dhyana. Prajna (1-2) ↔ Prajna paramita. Caminos complementarios en Theravada y Mahayana.',
  },
  {
    id: 'rel-sendero-inconm',
    nodeA: 'sendero',
    nodeB: 'inconm',
    headerColor: 'var(--color-inconm)',
    header: '🛤️ Sendero ↔ 💗 Inconmensurables',
    desc: 'La intención correcta (paso 2) incluye buena voluntad y compasión (Metta y Karuna). Las inconmensurables le dan corazón y vivacidad al sendero.',
  },
  {
    id: 'rel-paramitas-inconm',
    nodeA: 'paramitas',
    nodeB: 'inconm',
    headerColor: 'var(--color-paramitas)',
    header: '✨ Paramitas ↔ 💗 Inconmensurables',
    desc: 'Dana nace del amor bondadoso (Metta). Kshanti se nutre de Karuna. Upekkha es el fruto maduro de la sabiduría (Prajna paramita).',
  },
  {
    id: 'rel-centro-joyas',
    nodeA: 'centro',
    nodeB: 'joyas',
    headerColor: 'var(--color-centro)',
    header: '☸️ Verdades ↔ 💎 Las Tres Joyas',
    desc: 'Las 4 Nobles Verdades son el núcleo del Dharma enseñado por el Buda, el cual es realizado y sostenido por la comunidad (Sangha).',
  },
]
