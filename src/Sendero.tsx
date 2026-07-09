import { useState, useRef, useEffect, CSSProperties } from 'react'
import {
  EIGHTFOLD_PATH, TRAINING_CATEGORIES, FOUR_TRUTHS,
  FIVE_KHANDHAS, THREE_LAKSHANAS, JHANAS, FIVE_NIVARANAS,
  TRADITIONS_COMPARISON, QUIZ_QUESTIONS,
  type PathFactor,
} from './data/senderoData'

// ── Nav structure ─────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    key: 'foundations', label: 'Fundamentos',
    items: [
      { key: 'fourTruths', symbol: '🌊', label: 'Cuatro Nobles Verdades' },
      { key: 'aggregates', symbol: '🔷', label: 'Cinco Agregados' },
      { key: 'lakshanas',  symbol: '💨', label: 'Tres Lakshaṇas' },
      { key: 'paticca',    symbol: '🔗', label: 'Origen Dependiente' },
    ],
  },
  {
    key: 'practice', label: 'Práctica',
    items: [
      { key: 'explore',   symbol: '☸️',  label: 'Óctuple Sendero' },
      { key: 'jhanas',    symbol: '💎',  label: 'Jhānas' },
      { key: 'nivaranas', symbol: '🌪️', label: 'Cinco Obstáculos' },
    ],
  },
  {
    key: 'compare', label: 'Comparar',
    items: [
      { key: 'traditions', symbol: '🏛️', label: 'Theravāda · Mahāyāna' },
      { key: 'map',        symbol: '🗺️', label: 'Mapa de conexiones' },
      { key: 'quiz',       symbol: '✏️', label: 'Cuestionario' },
    ],
  },
]

const MODULE_META: Record<string, { title: string; subtitle: string; audio?: string }> = {
  fourTruths: { title: 'Las Cuatro Nobles Verdades', subtitle: 'Cattāri ariyasaccāni · El marco diagnóstico del Dharma', audio: 'fourTruths' },
  aggregates: { title: 'Los Cinco Agregados',        subtitle: 'Pañca khandha · La anatomía budista de la experiencia',   audio: 'aggregates' },
  lakshanas:  { title: 'Los Tres Lakshaṇas',         subtitle: 'Anicca · Dukkha · Anattā — las tres características',    audio: 'lakshanas' },
  paticca:    { title: 'Origen Dependiente',          subtitle: 'Paticcasamuppāda · Los doce eslabones del condicionamiento', audio: 'paticca' },
  explore:    { title: 'El Óctuple Noble Sendero',    subtitle: 'Aṭṭhaṅgika Magga · La cuarta noble verdad',              audio: 'explore' },
  jhanas:     { title: 'Los Jhānas',                  subtitle: 'Estados de absorción meditativa · Sammā samādhi',        audio: 'jhanas' },
  nivaranas:  { title: 'Los Cinco Obstáculos',        subtitle: 'Pañca nīvaraṇa · Lo que impide la absorción',           audio: 'nivaranas' },
  traditions: { title: 'Theravāda y Mahāyāna',        subtitle: 'Las dos grandes corrientes del budismo',                 audio: 'traditions' },
  map:        { title: 'Mapa de Conexiones',           subtitle: 'Cómo se relacionan los conceptos fundamentales' },
  quiz:       { title: 'Cuestionario',                 subtitle: 'Pon a prueba tu comprensión del Dharma' },
}

// ── Audio bar ─────────────────────────────────────────────────────
function AudioBar({ moduleKey }: { moduleKey: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('0:00')
  const base = import.meta.env.BASE_URL || '/'

  const src = MODULE_META[moduleKey]?.audio
    ? `${base}audio/${MODULE_META[moduleKey].audio}.mp3`
    : null

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setPlaying(false)
    setProgress(0)
    setTime('0:00')
    if (!src) return
    const a = new Audio(src)
    audioRef.current = a
    a.addEventListener('timeupdate', () => {
      if (!a.duration) return
      setProgress((a.currentTime / a.duration) * 100)
      const m = Math.floor(a.currentTime / 60)
      const s = Math.floor(a.currentTime % 60).toString().padStart(2, '0')
      setTime(`${m}:${s}`)
    })
    a.addEventListener('ended', () => setPlaying(false))
    return () => { a.pause(); a.src = '' }
  }, [src])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().catch(() => {}); setPlaying(true) }
  }

  if (!src) return null

  return (
    <div className="audio-bar">
      <button className={`audio-btn${playing ? ' playing' : ''}`} onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproducir'}>
        {playing ? '⏸' : '▶'}
      </button>
      <span className="audio-label">Narración · {MODULE_META[moduleKey]?.title}</span>
      <div className="audio-progress">
        <div className="audio-fill" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <span className="audio-time">{time}</span>
    </div>
  )
}

// ── Dharma Wheel SVG ──────────────────────────────────────────────
function DharmaWheel({ selected, onSelect }: { selected: PathFactor | null; onSelect: (p: PathFactor) => void }) {
  const cx = 150, cy = 150, r = 110, rInner = 38, rHub = 20

  const sectorPath = (i: number) => {
    const start = (i * 45 - 90 - 22.5) * (Math.PI / 180)
    const end   = (i * 45 - 90 + 22.5) * (Math.PI / 180)
    const gap = 0.03
    const s = start + gap, e = end - gap
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s)
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e)
    const x3 = cx + rInner * Math.cos(e), y3 = cy + rInner * Math.sin(e)
    const x4 = cx + rInner * Math.cos(s), y4 = cy + rInner * Math.sin(s)
    return `M${x4},${y4} L${x1},${y1} A${r},${r},0,0,1,${x2},${y2} L${x3},${y3} A${rInner},${rInner},0,0,0,${x4},${y4}Z`
  }

  const labelPos = (i: number) => {
    const angle = (i * 45 - 90) * (Math.PI / 180)
    const rLabel = (r + rInner) / 2
    return { x: cx + rLabel * Math.cos(angle), y: cy + rLabel * Math.sin(angle) }
  }

  return (
    <svg viewBox="0 0 300 300" className="path-wheel" role="img" aria-label="Rueda del Óctuple Sendero">
      <defs>
        <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a227" stopOpacity=".9" />
          <stop offset="100%" stopColor="#8a6010" stopOpacity=".6" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Spokes */}
      {EIGHTFOLD_PATH.map((_, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        return (
          <line key={i}
            x1={cx + rHub * Math.cos(angle)} y1={cy + rHub * Math.sin(angle)}
            x2={cx + rInner * Math.cos(angle)} y2={cy + rInner * Math.sin(angle)}
            stroke="#c9a227" strokeWidth=".8" strokeOpacity=".3"
          />
        )
      })}

      {/* Sectors */}
      {EIGHTFOLD_PATH.map((p, i) => {
        const isActive = selected?.id === p.id
        return (
          <g key={p.id} className={`wheel-sector${isActive ? ' active' : ''}`} onClick={() => onSelect(p)}>
            <path
              d={sectorPath(i)}
              fill={p.color}
              fillOpacity={isActive ? .9 : .55}
              stroke={isActive ? '#c9a227' : 'rgba(14,7,2,.5)'}
              strokeWidth={isActive ? 1.5 : .5}
            />
            <text
              x={labelPos(i).x} y={labelPos(i).y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="14" style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {p.symbol}
            </text>
          </g>
        )
      })}

      {/* Hub ring */}
      <circle cx={cx} cy={cy} r={rInner} fill="rgba(14,7,2,.6)" stroke="#c9a227" strokeWidth="1" strokeOpacity=".4" />
      <circle cx={cx} cy={cy} r={rHub} fill="url(#hubGrad)" filter="url(#glow)" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="16" style={{ userSelect: 'none' }}>☸️</text>

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 4} fill="none" stroke="#c9a227" strokeWidth=".5" strokeOpacity=".2" />
    </svg>
  )
}

// ── Section: Explore (Óctuple Sendero) ────────────────────────────
function ExploreSection() {
  const [selected, setSelected] = useState<PathFactor | null>(null)

  return (
    <div>
      <p className="section-intro">
        El Buda enseñó este sendero como la cuarta de las Cuatro Nobles Verdades. No es un dogma, sino un <em>camino práctico</em> de entrenamiento que conduce al nirvana —la liberación del sufrimiento (<em>dukkha</em>). Selecciona cualquier factor de la rueda para explorar.
      </p>

      <div className="path-layout">
        <div className="wheel-wrap">
          <DharmaWheel selected={selected} onSelect={f => setSelected(prev => prev?.id === f.id ? null : f)} />
        </div>

        <div className="path-list">
          {TRAINING_CATEGORIES.map(cat => (
            <div key={cat.key} className="path-category-section">
              <div className="category-label" style={{ '--cat-color': cat.color } as CSSProperties}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, display: 'inline-block' }} />
                {cat.name} · <em style={{ fontFamily: 'Lora, serif', fontWeight: 400, opacity: .8 }}>{cat.pali}</em>
              </div>
              {EIGHTFOLD_PATH.filter(p => p.category === cat.key).map(p => (
                <button
                  key={p.id}
                  className={`path-btn${selected?.id === p.id ? ' selected' : ''}`}
                  style={{ '--factor-color': p.color } as CSSProperties}
                  onClick={() => setSelected(prev => prev?.id === p.id ? null : p)}
                >
                  <span className="path-btn-icon">{p.symbol}</span>
                  <span className="path-btn-num">{p.id}</span>
                  <span>
                    <div className="path-btn-spa">{p.nameSpa}</div>
                    <div className="path-btn-pali">{p.namePali}</div>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="factor-panel" style={{ '--f-color': selected.color } as CSSProperties}>
          <div className="factor-header">
            <div className="factor-icon-wrap">{selected.symbol}</div>
            <div className="factor-titles">
              <div className="factor-name">{selected.nameSpa}</div>
              <div className="factor-pali">{selected.namePali} · <span style={{ opacity: .7 }}>{selected.nameEng}</span></div>
              <div className="factor-cat-badge">{selected.category}</div>
            </div>
          </div>

          <p className="factor-body">{selected.fullDesc}</p>

          <div className="factor-row-grid">
            {[
              { label: 'Práctica', text: selected.practice },
              { label: 'Obstáculo principal', text: selected.obstacle },
              { label: 'Ejemplo cotidiano', text: selected.example },
            ].map(b => (
              <div key={b.label} className="factor-box">
                <div className="factor-box-label">{b.label}</div>
                <div className="factor-box-text">{b.text}</div>
              </div>
            ))}
          </div>

          <blockquote className="factor-quote">{selected.quote}</blockquote>
        </div>
      )}

      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,162,39,.18)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--palm)', marginBottom: '.5rem' }}>
          Las tres categorías de entrenamiento
        </h2>
        <p style={{ fontSize: '.88rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
          Los ocho factores se cultivan de forma interdependiente, no como pasos secuenciales.
        </p>
        <div className="card-grid card-grid-3">
          {TRAINING_CATEGORIES.map(cat => (
            <div key={cat.key} className="card cat-card" style={{ '--cat-color': cat.color, borderColor: `${cat.color}30` } as CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--accent-ink)', fontSize: '.9rem' }}>
                  {cat.name}
                </span>
                <span className="cat-pali" style={{ fontFamily: 'Lora, serif', fontStyle: 'italic', color: 'var(--accent-ink)', fontSize: '.8rem' }}>
                  {cat.pali}
                </span>
              </div>
              <p style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '.75rem' }}>{cat.desc}</p>
              {EIGHTFOLD_PATH.filter(p => p.category === cat.key).map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelected(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '.3rem .5rem', borderRadius: 3, fontSize: '.8rem',
                    color: selected?.id === p.id ? 'var(--palm)' : 'rgba(var(--text-rgb),.75)',
                    background: selected?.id === p.id ? `${cat.color}20` : 'transparent',
                    marginBottom: '.2rem',
                  }}
                >
                  {p.symbol} {p.nameSpa}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section: Four Truths ──────────────────────────────────────────
function FourTruthsSection() {
  return (
    <div>
      <p className="section-intro">
        Las Cuatro Nobles Verdades (Cattāri ariyasaccāni) son el primer discurso del Buda en el Parque de los Ciervos en Sarnath. Estructuradas como un diagnóstico médico: identifica la enfermedad, su causa, el pronóstico de cura y el tratamiento.
      </p>
      <div className="truth-grid">
        {FOUR_TRUTHS.map(t => (
          <div key={t.id} className="truth-card" style={{ '--truth-color': t.color } as CSSProperties}>
            <div className="truth-number">{t.number} Noble Verdad</div>
            <div className="truth-pali">{t.symbol} {t.pali}</div>
            <div className="truth-spa">{t.nameSpa}</div>
            <div className="truth-tag">{t.diagnosis}</div>
            <p className="truth-body">{t.body}</p>
            <p className="truth-practice">Práctica: {t.practice}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section: Aggregates ───────────────────────────────────────────
function AggregatesSection() {
  return (
    <div>
      <p className="section-intro">
        Los cinco agregados (Pañca khandha) son los componentes que el Buda identificó en el análisis de lo que llamamos "ser" o "yo". Ninguno de ellos, por separado ni en conjunto, constituye un yo permanente o sustancial.
      </p>
      <div className="khandha-grid">
        {FIVE_KHANDHAS.map(k => (
          <div key={k.id} className="khandha-card" style={{ '--k-color': k.color } as CSSProperties}>
            <div className="khandha-header">
              <span className="khandha-icon">{k.symbol}</span>
              <div>
                <div className="khandha-pali">{k.namePali}</div>
                <div className="khandha-spa">{k.nameSpa}</div>
              </div>
            </div>
            <p className="khandha-desc">{k.desc}</p>
            <p className="khandha-analogy">Analogía: {k.analogy}</p>
          </div>
        ))}
      </div>
      <div className="katannuta-bonus">
        <div className="katannuta-label">Nota adicional</div>
        <p style={{ fontSize: '.9rem', lineHeight: 1.75, color: 'rgba(var(--text-rgb),.85)' }}>
          El Buda no enseñó que no existimos —enseñó que lo que somos es <em>proceso</em>, no cosa; <em>relación</em>, no esencia. La pregunta "¿quién soy yo?" recibe una respuesta práctica: eres este fluir de rūpa, vedanā, saññā, saṅkhāra y viññāṇa, momento a momento. Sin eje fijo.
        </p>
      </div>
    </div>
  )
}

// ── Section: Lakshanas ────────────────────────────────────────────
function LakshanasSection() {
  return (
    <div>
      <p className="section-intro">
        Las tres marcas de la existencia (Tilakkhaṇa) son características universales de toda experiencia condicionada. El Buda enseñó que ver estas tres marcas directamente —no solo intelectualmente— es el núcleo de la sabiduría liberadora (vipassanā).
      </p>
      <div className="laksana-grid">
        {THREE_LAKSHANAS.map(l => (
          <div key={l.id} className="laksana-card" style={{ '--l-color': l.color } as CSSProperties}>
            <div className="laksana-icon">{l.symbol}</div>
            <div className="laksana-pali">{l.pali}</div>
            <div className="laksana-spa">{l.nameSpa}</div>
            <p className="laksana-body">{l.body}</p>
            <p className="laksana-practice">Práctica: {l.praticeImplication}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '.85rem', color: 'var(--gold)', marginBottom: '.75rem', letterSpacing: '.06em' }}>
          Interdependencia entre los tres lakshaṇas
        </h3>
        <p style={{ fontSize: '.88rem', lineHeight: 1.75, color: 'rgba(var(--text-rgb),.82)' }}>
          Las tres marcas se implican mutuamente: porque todo es impermanente (anicca), todo es insatisfactorio (dukkha); porque es insatisfactorio no puede ser un yo sólido (anattā); y porque no hay yo sólido, no puede haber permanencia real. Ver cualquiera de las tres en profundidad conduce a ver las otras dos.
        </p>
      </div>
    </div>
  )
}

// ── Section: Paticcasamuppada ─────────────────────────────────────
const PATICCA_LINKS = [
  { n: 1,  pali: 'Avijjā',         spa: 'Ignorancia',           desc: 'La ignorancia sobre las Cuatro Nobles Verdades y las tres marcas de la existencia condiciona las formaciones volitivas.' },
  { n: 2,  pali: 'Saṅkhāra',       spa: 'Formaciones volitivas',desc: 'Las intenciones y acciones condicionadas por la ignorancia generan karma y condicionan la consciencia.' },
  { n: 3,  pali: 'Viññāṇa',        spa: 'Consciencia',          desc: 'La consciencia condicionada por el karma busca un soporte de renacimiento o momento de experiencia.' },
  { n: 4,  pali: 'Nāma-rūpa',      spa: 'Nombre y forma',       desc: 'La consciencia condiciona la aparición del complejo psicofísico: mente (nāma) y cuerpo (rūpa).' },
  { n: 5,  pali: 'Saḷāyatana',     spa: 'Seis bases sensoriales',desc: 'El complejo psicofísico desarrolla los seis sentidos: ojo, oído, nariz, lengua, cuerpo y mente.' },
  { n: 6,  pali: 'Phassa',         spa: 'Contacto',             desc: 'Las bases sensoriales entran en contacto con objetos sensoriales, generando el contacto.' },
  { n: 7,  pali: 'Vedanā',         spa: 'Sensación hedónica',   desc: 'El contacto produce inevitablemente un tono hedónico: agradable, desagradable o neutro.' },
  { n: 8,  pali: 'Taṇhā',          spa: 'Sed / Deseo',          desc: 'La sensación agradable despierta el deseo de más; la desagradable, el deseo de escapar.' },
  { n: 9,  pali: 'Upādāna',        spa: 'Apego / Aferramiento', desc: 'El deseo se intensifica en apego: a placeres sensuales, opiniones, rituales o a la doctrina del yo.' },
  { n: 10, pali: 'Bhava',          spa: 'Devenir',              desc: 'El apego genera las condiciones para el devenir: la continuación del proceso de existencia.' },
  { n: 11, pali: 'Jāti',           spa: 'Nacimiento',           desc: 'El devenir produce el nacimiento —el surgimiento de un nuevo ser o de un nuevo momento de experiencia.' },
  { n: 12, pali: 'Jarā-maraṇa',    spa: 'Vejez y muerte',       desc: 'Todo lo nacido envejece y muere, generando dolor, lamentación, pena y desesperación —que retroalimentan la ignorancia.' },
]

function PatticcaSection() {
  return (
    <div>
      <p className="section-intro">
        El Paticcasamuppāda (Originación Condicionada) es la descripción más técnica del Buda sobre el mecanismo del sufrimiento. Sus doce eslabones muestran cómo, a partir de la ignorancia, surge el ciclo completo de existencia condicionada. Comprender estos doce eslabones <em>en detalle</em> es, según el Buda, sinónimo de comprender el Dharma.
      </p>
      <div className="paticca-links" style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {PATICCA_LINKS.map(l => (
          <div key={l.n} style={{
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            padding: '1rem 1.25rem',
            background: 'rgba(0,0,0,.25)',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: 'var(--radius)',
          }}>
            <div style={{
              minWidth: 28, height: 28, borderRadius: '50%',
              background: 'rgba(201,162,39,.15)',
              border: '1px solid var(--gold-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif)', fontSize: '.72rem', color: 'var(--gold)',
              flexShrink: 0,
            }}>{l.n}</div>
            <div>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'baseline', marginBottom: '.3rem', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '.88rem', color: 'var(--gold)', fontWeight: 600 }}>{l.pali}</span>
                <span style={{ fontSize: '.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{l.spa}</span>
              </div>
              <p style={{ fontSize: '.86rem', lineHeight: 1.7, color: 'rgba(var(--text-rgb),.82)' }}>{l.desc}</p>
              {l.n < 12 && (
                <div className="paticca-arrow">
                  ↓ condiciona ·
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <p style={{ fontSize: '.88rem', lineHeight: 1.75, color: 'var(--muted)', fontStyle: 'italic' }}>
          El Buda enseñó el Paticcasamuppāda tanto en orden directo (surgimiento del sufrimiento) como en orden inverso (cese del sufrimiento): cuando la ignorancia cesa, las formaciones cesan; cuando las formaciones cesan, la consciencia cesa; y así hasta el cese del sufrimiento.
        </p>
      </div>
    </div>
  )
}

// ── Section: Jhanas ───────────────────────────────────────────────
function JhanasSection() {
  const formJhanas = JHANAS.filter(j => j.group === 'form')
  const formlessJhanas = JHANAS.filter(j => j.group === 'formless')

  return (
    <div>
      <p className="section-intro">
        Los jhānas son estados de absorción meditativa profunda que el Buda describió como la base del Sammā samādhi (Concentración Correcta). Son condición necesaria —no suficiente— para el despertar. El Buda mismo los alcanzó antes de su iluminación y los recomendó como vehículo de la sabiduría.
      </p>

      <div className="jhana-group-title">Rūpa jhānas · Con forma</div>
      <div className="jhana-grid">
        {formJhanas.map(j => (
          <JhanaCard key={j.number} jhana={j} />
        ))}
      </div>

      <div className="jhana-group-title" style={{ marginTop: '.5rem' }}>Arūpa jhānas · Sin forma</div>
      <div className="jhana-grid">
        {formlessJhanas.map(j => (
          <JhanaCard key={j.number} jhana={j} />
        ))}
      </div>
    </div>
  )
}

function JhanaCard({ jhana }: { jhana: typeof JHANAS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="jhana-card" style={{ '--j-color': jhana.color } as CSSProperties}>
      <div className="jhana-header">
        <span className="jhana-icon">{jhana.symbol}</span>
        <div>
          <div className="jhana-num">{jhana.number} jhāna</div>
          <div className="jhana-pali">{jhana.namePali}</div>
        </div>
      </div>
      <p className="jhana-desc">{jhana.shortDesc}</p>
      <p className="jhana-analogy">Analogía: {jhana.analogy}</p>
      <button
        className="jhana-toggle"
        onClick={() => setOpen(o => !o)}
      >
        {open ? '▲ ocultar factores' : '▼ ver factores'}
      </button>
      {open && (
        <div className="jhana-factors">
          <div className="jhana-factors-label">Factores presentes</div>
          <div>{jhana.factors.present.map(f => (
            <span key={f} className="jhana-factor-tag">{f}</span>
          ))}</div>
          {jhana.factors.abandoned.length > 0 && (
            <>
              <div className="jhana-factors-label" style={{ marginTop: '.4rem' }}>Abandonados / Trascendidos</div>
              <div>{jhana.factors.abandoned.map(f => (
                <span key={f} className="jhana-factor-tag abandoned">{f}</span>
              ))}</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── Section: Nivaranas ────────────────────────────────────────────
function NivaranasSection() {
  return (
    <div>
      <p className="section-intro">
        Los cinco obstáculos (Pañca nīvaraṇa) son los estados mentales que bloquean la meditación y velan la sabiduría. El Buda los comparó con agua turbia: mientras estos obstáculos están presentes, la mente no puede ver con claridad, igual que un lago revuelto no puede reflejar la luna.
      </p>
      <div className="nivarana-grid">
        {FIVE_NIVARANAS.map(n => (
          <div key={n.id} className="nivarana-card" style={{ '--n-color': n.color } as CSSProperties}>
            <div className="nivarana-header">
              <span className="nivarana-icon">{n.symbol}</span>
              <div>
                <div className="nivarana-pali">{n.pali}</div>
                <div className="nivarana-spa">{n.nameSpa}</div>
              </div>
            </div>
            <p className="nivarana-desc">{n.desc}</p>
            <p className="nivarana-antidote">Antídoto: {n.antidote}</p>
            <p className="nivarana-jhana">En meditación: {n.jhanaEffect}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section: Traditions ───────────────────────────────────────────
function TraditionsSection() {
  return (
    <div>
      <p className="section-intro">
        El Theravāda ("enseñanza de los ancianos") y el Mahāyāna ("gran vehículo") representan las dos corrientes principales del budismo. Comparten la misma base —las enseñanzas del Buda histórico— pero divergen en interpretación, práctica e ideal soteriológico.
      </p>

      {/* Desktop table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="traditions-table">
          <thead>
            <tr>
              <th>Dimensión</th>
              <th>Theravāda · Pali</th>
              <th>Mahāyāna · Sánscrito</th>
            </tr>
          </thead>
          <tbody>
            {TRADITIONS_COMPARISON.map(row => (
              <tr key={row.id}>
                <td>{row.topic}</td>
                <td>{row.theravada}</td>
                <td>{row.mahayana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="traditions-mobile">
        {TRADITIONS_COMPARISON.map(row => (
          <div key={row.id} className="card">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '.78rem', color: 'var(--gold)', marginBottom: '.75rem', letterSpacing: '.06em' }}>
              {row.topic}
            </h3>
            <div style={{ display: 'grid', gap: '.75rem', gridTemplateColumns: '1fr 1fr' }}>
              <div className="trad-col" style={{ '--cat-color': '#c8632a' } as CSSProperties}>
                <div className="trad-label">Theravāda</div>
                <p style={{ fontSize: '.82rem', lineHeight: 1.65, color: 'rgba(var(--text-rgb),.82)' }}>{row.theravada}</p>
              </div>
              <div className="trad-col" style={{ '--cat-color': '#7b5ea7' } as CSSProperties}>
                <div className="trad-label">Mahāyāna</div>
                <p style={{ fontSize: '.82rem', lineHeight: 1.65, color: 'rgba(var(--text-rgb),.82)' }}>{row.mahayana}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Section: Connection Map ───────────────────────────────────────
const MAP_NODES = [
  { id: 'dukkha',   label: 'Dukkha',           sub: '1ª Verdad',     color: '#8b4a8b', x: 200, y: 60,  module: 'fourTruths' },
  { id: 'samudaya', label: 'Taṇhā/Samudaya',   sub: '2ª Verdad',     color: '#c8632a', x: 360, y: 130, module: 'fourTruths' },
  { id: 'nirodha',  label: 'Nirodha',           sub: '3ª Verdad',     color: '#4a7fa5', x: 360, y: 270, module: 'fourTruths' },
  { id: 'magga',    label: 'Magga',             sub: '4ª Verdad',     color: '#6b7c5a', x: 200, y: 340, module: 'fourTruths' },
  { id: 'sendero',  label: 'Óctuple Sendero',   sub: 'Aṭṭhaṅgika',   color: '#c8632a', x: 50,  y: 270, module: 'explore' },
  { id: 'khandhas', label: 'Cinco Khandhas',    sub: 'Pañca khandha', color: '#4a7fa5', x: 50,  y: 130, module: 'aggregates' },
  { id: 'jhanas',   label: 'Jhānas',            sub: 'Samādhi',       color: '#7b5ea7', x: 130, y: 200, module: 'jhanas' },
  { id: 'paticca',  label: 'Paticcasamuppāda',  sub: '12 eslabones',  color: '#3a3a5a', x: 280, y: 200, module: 'paticca' },
  { id: 'nivaranas',label: 'Nīvaraṇas',         sub: '5 obstáculos',  color: '#a07830', x: 130, y: 310, module: 'nivaranas' },
  { id: 'sotapatti',label: 'Sotāpatti',         sub: 'Entrada corriente', color: '#c9a227', x: 280, y: 310, module: 'explore' },
]

const MAP_EDGES = [
  { from: 'dukkha',   to: 'khandhas',  label: 'analizado en' },
  { from: 'samudaya', to: 'paticca',   label: 'mecanismo' },
  { from: 'magga',    to: 'sendero',   label: 'es' },
  { from: 'sendero',  to: 'jhanas',    label: 'sammā samādhi →' },
  { from: 'jhanas',   to: 'nirodha',   label: 'base para' },
  { from: 'nivaranas',to: 'jhanas',    label: 'suprimidos en' },
  { from: 'paticca',  to: 'khandhas',  label: 'vedanā = 2º khandha' },
  { from: 'jhanas',   to: 'sotapatti', label: 'base para' },
  { from: 'sendero',  to: 'sotapatti', label: 'lleva a' },
  { from: 'nivaranas',to: 'sendero',   label: 'obstaculizan' },
  { from: 'paticca',  to: 'sotapatti', label: 'comprender →' },
]

function ConnectionMap({ onNavigate }: { onNavigate: (key: string) => void }) {
  const W = 420, H = 420
  const nodeById = Object.fromEntries(MAP_NODES.map(n => [n.id, n]))

  return (
    <div>
      <p className="section-intro">
        Los conceptos del Dharma no son islas aisladas: se condicionan y explican mutuamente. Este mapa visualiza las relaciones principales entre los temas de esta guía.
      </p>
      <div className="map-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="conn-map" role="img" aria-label="Mapa de conexiones del Dharma">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3Z" fill="rgba(201,162,39,.4)" />
            </marker>
          </defs>

          {MAP_EDGES.map((e, i) => {
            const from = nodeById[e.from], to = nodeById[e.to]
            if (!from || !to) return null
            const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2
            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke="rgba(201,162,39,.2)" strokeWidth="1"
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="3 3"
                />
                <text x={mx} y={my - 5} textAnchor="middle" fontSize="8" className="edge-label">
                  {e.label}
                </text>
              </g>
            )
          })}

          {MAP_NODES.map(n => (
            <g key={n.id} className="map-node" style={{ cursor: 'pointer', '--cat-color': n.color } as CSSProperties} onClick={() => onNavigate(n.module)}>
              <circle cx={n.x} cy={n.y} r={26} fill={`${n.color}20`} stroke={n.color} strokeWidth="1" strokeOpacity=".6" />
              <text x={n.x} y={n.y - 5} textAnchor="middle" dominantBaseline="middle" fontSize="8.5" fontWeight="600" fill="var(--accent-ink)">
                {n.label.split('/')[0]}
              </text>
              <text x={n.x} y={n.y + 9} textAnchor="middle" dominantBaseline="middle" fontSize="6.5" className="node-sub" fill="rgba(var(--text-rgb),.72)" fontStyle="italic">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--muted)', fontStyle: 'italic' }}>
        Haz clic en un nodo para navegar a esa sección.
      </p>
    </div>
  )
}

// ── Section: Quiz ─────────────────────────────────────────────────
function QuizSection() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = QUIZ_QUESTIONS[current]

  const choose = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.correctIndex) setScore(s => s + 1)
  }

  const next = () => {
    if (current + 1 >= QUIZ_QUESTIONS.length) { setDone(true); return }
    setCurrent(c => c + 1)
    setSelected(null)
    setAnswered(false)
  }

  const restart = () => {
    setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false)
  }

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100)
  const msg = pct >= 88 ? '🌟 Excelente — tu comprensión del Dharma es sólida.'
            : pct >= 62 ? '🌿 Buen progreso — sigue estudiando y practicando.'
            :             '🌱 Sigue practicando — el sendero se recorre paso a paso.'

  if (done) {
    return (
      <div className="quiz-wrap">
        <div className="quiz-score">
          <div className="quiz-score-num">{score}/{QUIZ_QUESTIONS.length}</div>
          <div className="quiz-score-label">{pct}% de respuestas correctas</div>
          <p className="quiz-score-msg">{msg}</p>
          <button className="quiz-restart" onClick={restart}>Repetir cuestionario</button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-wrap">
      <p className="section-intro">
        Pon a prueba tu comprensión de los fundamentos del Dharma. {QUIZ_QUESTIONS.length} preguntas sobre el Óctuple Sendero, los Khandhas, los Jhānas y más.
      </p>

      <div className="quiz-progress">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} className={`quiz-dot${i < current ? ' done' : i === current ? ' current' : ''}`} />
        ))}
      </div>

      <p className="quiz-question">{q.question}</p>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.correctIndex) cls += ' correct'
            else if (i === selected)  cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              {opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div className="quiz-explanation">{q.explanation}</div>
          <button className="quiz-next" onClick={next}>
            {current + 1 >= QUIZ_QUESTIONS.length ? 'Ver resultado' : 'Siguiente →'}
          </button>
        </>
      )}
    </div>
  )
}

// ── Main Sendero component ────────────────────────────────────────
export default function Sendero() {
  const [module, setModule] = useState<string>('explore')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'dark'|'light'>(() => {
    try {
      const saved = localStorage.getItem('dhamma-theme') as 'dark'|'light'
      if (saved) document.documentElement.setAttribute('data-theme', saved)
      return saved || 'dark'
    } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('dhamma-theme', theme) } catch {}
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const navigate = (key: string) => {
    setModule(key)
    setSidebarOpen(false)
  }

  const meta = MODULE_META[module]

  const renderContent = () => {
    switch (module) {
      case 'fourTruths': return <FourTruthsSection />
      case 'aggregates': return <AggregatesSection />
      case 'lakshanas':  return <LakshanasSection />
      case 'paticca':    return <PatticcaSection />
      case 'explore':    return <ExploreSection />
      case 'jhanas':     return <JhanasSection />
      case 'nivaranas':  return <NivaranasSection />
      case 'traditions': return <TraditionsSection />
      case 'map':        return <ConnectionMap onNavigate={navigate} />
      case 'quiz':       return <QuizSection />
      default:           return <ExploreSection />
    }
  }

  return (
    <div className="sendero-app">
      {/* Backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-wheel">☸</div>
          <div className="brand-sub">Budismo Theravāda</div>
          <div className="brand-title">Fundamentos<br />del Dharma</div>
          <div className="brand-tagline">Guía viva · Budismo Theravāda</div>
        </div>

        <div className="gold-rule" />

        <nav className="sidebar-nav">
          {NAV_GROUPS.map(group => (
            <div key={group.key}>
              <div className="nav-group-label">{group.label}</div>
              {group.items.map(item => (
                <button
                  key={item.key}
                  className={`nav-item${module === item.key ? ' active' : ''}`}
                  onClick={() => navigate(item.key)}
                >
                  <span className="nav-icon">{item.symbol}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="gold-rule" />
        <div className="sidebar-footer">
          <p className="sidebar-quote">
            Sabbe saṅkhārā aniccā — todas las formaciones son impermanentes.
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="main-area">
        <header className="main-header">
          <div className="header-row">
            <button className="hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Abrir menú">
              <span /><span /><span />
            </button>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h1 className="header-title">{meta?.title}</h1>
              {meta?.subtitle && <p className="header-sub">{meta.subtitle}</p>}
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
          <div className="gold-rule header-rule" />
        </header>

        <AudioBar moduleKey={module} />

        <div className="content-scroll">
          <div className="content-inner" key={module}>
            <div className="section-eyebrow">Fundamentos del Dharma</div>
            <h2 className="section-heading">{meta?.title}</h2>
            {meta?.subtitle && <p className="section-subheading">{meta.subtitle}</p>}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
