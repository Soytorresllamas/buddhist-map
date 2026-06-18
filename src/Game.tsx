import { useState, useRef, useEffect, type CSSProperties } from 'react'

const CANVAS_W = 960
const CANVAS_H = 420
const GROUND = CANVAS_H - 70
const WORLD = 2600
const BODHI_X = WORLD - 70

const GROUPS = {
  prajna:  { name: 'Sabiduría',     color: '#d4a843' },
  sila:    { name: 'Ética',         color: '#7ed87e' },
  samadhi: { name: 'Concentración', color: '#9090e0' },
} as const

type GroupKey = keyof typeof GROUPS

const STEPS: { n: string; g: GroupKey; t: string; p: string; d: string }[] = [
  { n: '①', g: 'prajna',  t: 'Visión Correcta',        p: 'Sammā Diṭṭhi',   d: 'Comprender las Cuatro Nobles Verdades y ver la realidad tal como es: impermanente, insatisfactoria y sin un yo fijo.' },
  { n: '②', g: 'prajna',  t: 'Intención Correcta',     p: 'Sammā Saṅkappa', d: 'Cultivar la renuncia, la buena voluntad y la inofensividad. Es el corazón que orienta cada paso del camino.' },
  { n: '③', g: 'sila',    t: 'Habla Correcta',         p: 'Sammā Vācā',     d: 'No mentir, no calumniar, no hablar con dureza ni frivolidad. Palabras veraces, amables y oportunas.' },
  { n: '④', g: 'sila',    t: 'Acción Correcta',        p: 'Sammā Kammanta', d: 'No matar, no robar, no dañar. Obrar con integridad ética (Sīla) hacia todos los seres.' },
  { n: '⑤', g: 'sila',    t: 'Sustento Correcto',      p: 'Sammā Ājīva',    d: 'Ganarse la vida sin causar daño: un trabajo honesto que no explote ni perjudique a otros seres.' },
  { n: '⑥', g: 'samadhi', t: 'Esfuerzo Correcto',      p: 'Sammā Vāyāma',   d: 'Cultivar lo sano y abandonar lo dañino. La energía diligente que sostiene la práctica día a día.' },
  { n: '⑦', g: 'samadhi', t: 'Atención Correcta',      p: 'Sammā Sati',     d: 'Mindfulness: presencia plena y serena del cuerpo, las sensaciones, la mente y los fenómenos.' },
  { n: '⑧', g: 'samadhi', t: 'Concentración Correcta', p: 'Sammā Samādhi',  d: 'Unificar la mente en quietud luminosa (los jhānas). La calma profunda donde madura la sabiduría.' },
]

interface Station {
  x: number; learned: boolean; glow: number
  step: typeof STEPS[0]; idx: number; near?: boolean
}
interface ConceptData {
  type: 'step' | 'brahma' | 'gratitud'
  groupColor: string; groupName: string; num: string
  title: string; pali: string; text?: string
}

export default function Game() {
  const [phase, setPhase]           = useState<'start'|'play'|'concept'|'done'>('start')
  const [learnedCount, setLearned]  = useState(0)
  const [nextStep, setNextStep]     = useState('Visión Correcta')
  const [lotusDots, setLotusDots]   = useState<boolean[]>(Array(8).fill(false))
  const [concept, setConcept]       = useState<ConceptData | null>(null)
  const [muted, setMuted]           = useState(false)

  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const phaseRef        = useRef<'start'|'play'|'concept'|'done'>('start')
  const stationsRef     = useRef<Station[]>([])
  const monkRef         = useRef({ x: 120, y: GROUND, vy: 0, w: 34, h: 54, onGround: true, face: 1, walk: 0, speed: 3.2, jumps: 0, maxJumps: 2 })
  const camXRef         = useRef(0)
  const keysRef         = useRef<Record<string, boolean>>({})
  const tRef            = useRef(0)
  const learnedRef      = useRef(0)
  const heartRef        = useRef({ x: 0, y: 0, active: false, cooldown: false })
  const heart2Ref       = useRef({ x: 0, y: 0, active: false, cooldown: false })
  const brahmaSeen      = useRef(false)
  const activeStation   = useRef<Station | null>(null)
  const mutedRef        = useRef(false)
  const ambientRef      = useRef<HTMLAudioElement | null>(null)
  const rafRef          = useRef(0)
  const closeConceptRef = useRef<(() => void) | null>(null)
  const startGameRef    = useRef<(() => void) | null>(null)

  useEffect(() => {
    stationsRef.current = STEPS.map((s, i) => ({
      x: 360 + i * ((WORLD - 520) / (STEPS.length - 1)),
      learned: false, glow: 0, step: s, idx: i,
    }))
    heartRef.current  = { x: stationsRef.current[1].x + 70,  y: GROUND - 100, active: false, cooldown: false }
    heart2Ref.current = { x: heartRef.current.x + 160,        y: GROUND - 180, active: false, cooldown: false }

    // Audio
    const sfx = {
      learn:   Object.assign(new Audio('audio/game-learn.mp3'),   { volume: 0.8  }),
      jump:    Object.assign(new Audio('audio/game-jump.mp3'),    { volume: 0.45 }),
      heart:   new Audio('audio/game-heart.mp3'),
      nirvana: new Audio('audio/game-nirvana.mp3'),
    } as Record<string, HTMLAudioElement>
    const ambient = Object.assign(new Audio('audio/game-ambient.mp3'), { loop: true, volume: 0.32 })
    ambientRef.current = ambient

    const play = (name: string) => {
      if (mutedRef.current || !sfx[name]) return
      try { sfx[name].currentTime = 0; sfx[name].play().catch(() => {}) } catch {}
    }
    const startAmbient = () => { if (!mutedRef.current) ambient.play().catch(() => {}) }

    const updateHud = () => {
      setLearned(learnedRef.current)
      const next = stationsRef.current.find(s => !s.learned)
      setNextStep(next ? next.step.t : '¡Sendero completo!')
      setLotusDots(stationsRef.current.map(s => s.learned))
    }

    const openConcept = (st: Station) => {
      phaseRef.current = 'concept'; setPhase('concept')
      activeStation.current = st
      const g = GROUPS[st.step.g]
      setConcept({ type: 'step', groupColor: g.color, groupName: g.name, num: st.step.n, title: st.step.t, pali: st.step.p, text: st.step.d })
    }

    const closeConcept = () => {
      if (activeStation.current && !activeStation.current.learned) {
        activeStation.current.learned = true
        learnedRef.current++
        updateHud()
        play('learn')
      }
      activeStation.current = null
      setConcept(null)
      phaseRef.current = 'play'; setPhase('play')
      if (learnedRef.current === STEPS.length) setTimeout(endGame, 400)
    }

    const openBrahma = () => {
      phaseRef.current = 'concept'; setPhase('concept')
      activeStation.current = null; brahmaSeen.current = true; play('heart')
      setConcept({ type: 'brahma', groupColor: '#e090b8', groupName: 'Bonus · Corazón del sendero', num: '💗', title: 'Las Cuatro Inconmensurables', pali: 'Brahmaviharas — Moradas divinas' })
    }

    const openGratitud = () => {
      phaseRef.current = 'concept'; setPhase('concept')
      activeStation.current = null; play('heart')
      setConcept({ type: 'gratitud', groupColor: '#d4a843', groupName: 'Bonus · Gratitud', num: '💛', title: 'Kataññutā', pali: 'Gratitud — el corazón que reconoce' })
    }

    const endGame = () => { phaseRef.current = 'done'; setPhase('done'); play('nirvana') }

    const startGame = () => {
      const monk = monkRef.current
      Object.assign(monk, { x: 120, y: GROUND, vy: 0, face: 1, jumps: 0 })
      camXRef.current = 0; learnedRef.current = 0; activeStation.current = null
      stationsRef.current.forEach(s => { s.learned = false; s.glow = 0 })
      Object.assign(heartRef.current,  { active: false, cooldown: false })
      Object.assign(heart2Ref.current, { active: false, cooldown: false })
      brahmaSeen.current = false
      updateHud()
      phaseRef.current = 'play'; setPhase('play')
      startAmbient()
    }

    const doJump = () => {
      const monk = monkRef.current
      if (monk.jumps < monk.maxJumps) { monk.vy = -10.5; monk.onGround = false; monk.jumps++; play('jump') }
    }

    closeConceptRef.current = closeConcept
    startGameRef.current    = startGame

    // Input
    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (['arrowleft','arrowright','arrowup',' ','a','d','w'].includes(k)) e.preventDefault()
      keysRef.current[k] = true

      if (k === 'm') {
        const nm = !mutedRef.current; mutedRef.current = nm; setMuted(nm)
        if (nm) ambient.pause(); else if (phaseRef.current !== 'start') startAmbient()
        return
      }
      const p = phaseRef.current
      if (p === 'concept' && ['enter','e',' ','escape'].includes(k)) { closeConcept(); return }
      if (p === 'play' && ['e','enter'].includes(k)) {
        const near = stationsRef.current.find(s => Math.abs(s.x - monkRef.current.x) < 46)
        if (near) openConcept(near)
      }
      if ((p === 'start' || p === 'done') && k === 'enter') startGame()
      if (p === 'play' && [' ','arrowup','w'].includes(k) && !e.repeat) doJump()
    }
    const onKeyUp = (e: KeyboardEvent) => { keysRef.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    // Canvas drawing helpers
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = CANVAS_W, H = CANVAS_H

    const hexA = (hex: string, a: number) => {
      const h = hex.replace('#', '')
      return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`
    }
    const lighten = (hex: string, amt: number) => {
      const h = hex.replace('#', '')
      return `rgb(${[0,2,4].map(i => Math.min(255, parseInt(h.slice(i,i+2),16) + Math.round(255*amt))).join(',')})`
    }
    const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r)
      ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath()
    }
    const mountains = (off: number, base: number, mh: number, color: string) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, GROUND)
      for (let x = -100; x <= W + 100; x += 80)
        ctx.lineTo(x, base - Math.abs(Math.sin((x + off) * 0.004)) * mh)
      ctx.lineTo(W, GROUND); ctx.closePath(); ctx.fill()
    }

    const drawMonk = (px: number, py: number) => {
      const monk = monkRef.current; const t = tRef.current; const lc = learnedRef.current
      const f = monk.face; const swing = Math.sin(monk.walk) * 6
      ctx.save(); ctx.translate(px, py); ctx.scale(f, 1)
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 2, 18, 5, 0, 0, Math.PI*2); ctx.fill()
      ctx.strokeStyle = '#caa15e'; ctx.lineWidth = 6; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(-4,-14); ctx.lineTo(-4+swing*0.4,0); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(4,-14);  ctx.lineTo(4-swing*0.4,0);  ctx.stroke()
      const robe = ctx.createLinearGradient(0,-46,0,-12)
      robe.addColorStop(0,'#e8913f'); robe.addColorStop(1,'#c2611c')
      ctx.fillStyle = robe; ctx.beginPath()
      ctx.moveTo(-13,-12); ctx.lineTo(-9,-44)
      ctx.quadraticCurveTo(0,-52,9,-44); ctx.lineTo(13,-12)
      ctx.quadraticCurveTo(0,-6,-13,-12); ctx.fill()
      ctx.fillStyle = '#a94e14'; ctx.beginPath()
      ctx.moveTo(-9,-30); ctx.lineTo(9,-42); ctx.lineTo(9,-37); ctx.lineTo(-9,-25); ctx.fill()
      ctx.strokeStyle = '#caa15e'; ctx.lineWidth = 5
      ctx.beginPath(); ctx.moveTo(6,-40); ctx.lineTo(11+swing*0.3,-26); ctx.stroke()
      ctx.fillStyle = '#e8c08a'; ctx.beginPath(); ctx.arc(0,-52,9,0,Math.PI*2); ctx.fill()
      ctx.fillStyle = '#5a3a18'; ctx.beginPath(); ctx.arc(3,-53,1.1,0,Math.PI*2); ctx.fill()
      if (lc > 0) {
        ctx.strokeStyle = `rgba(212,168,67,${0.25+0.06*lc})`; ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(0,-54,13+Math.sin(t*0.08)*1.2,0,Math.PI*2); ctx.stroke()
      }
      ctx.restore()
    }

    const drawLotus = (x: number, y: number, st: Station) => {
      const g = GROUPS[st.step.g]; const t = tRef.current
      const pulse = st.learned ? 1 : (0.55 + st.glow * 0.45)
      ctx.save(); ctx.translate(x, y)
      const grd = ctx.createRadialGradient(0,-6,2,0,-6,46)
      grd.addColorStop(0, hexA(g.color, st.learned ? .5 : .18*pulse)); grd.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle = grd; ctx.fillRect(-50,-56,100,80)
      ctx.fillStyle = 'rgba(30,18,7,.9)'; ctx.beginPath(); ctx.ellipse(0,0,20,7,0,0,Math.PI*2); ctx.fill()
      const open = st.learned ? 1 : (0.6 + st.glow*0.4)
      ctx.fillStyle = st.learned ? g.color : hexA(g.color, .35+.4*pulse)
      for (let i = -2; i <= 2; i++) {
        ctx.save(); ctx.rotate(i*0.42*open); ctx.translate(0,-6)
        ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(7,-18,0,-30); ctx.quadraticCurveTo(-7,-18,0,0); ctx.fill()
        ctx.restore()
      }
      ctx.fillStyle = st.learned ? '#fff4d0' : hexA('#f0e6c8', .5)
      ctx.beginPath(); ctx.arc(0,-12,st.learned?5:4,0,Math.PI*2); ctx.fill()
      if (st.learned) {
        const fy = -34 - Math.sin(t*0.06+st.idx)*3
        ctx.fillStyle = hexA(g.color,.9); ctx.beginPath(); ctx.arc(0,fy,3.2,0,Math.PI*2); ctx.fill()
      }
      if (st.near) {
        const label = st.learned ? 'Repasar · E' : 'Pulsa E'
        const lw = st.learned ? 78 : 52
        ctx.fillStyle = 'rgba(18,9,2,.85)'; roundRect(-lw/2,-66,lw,20,6); ctx.fill()
        ctx.fillStyle = g.color; ctx.font = "600 12px 'Outfit',sans-serif"
        ctx.textAlign = 'center'; ctx.fillText(label, 0, -52)
      }
      ctx.fillStyle = st.learned ? g.color : 'rgba(160,128,96,.7)'
      ctx.font = "700 16px 'Cinzel',serif"; ctx.textAlign = 'center'
      ctx.fillText(st.step.n, 0, 22)
      ctx.restore()
    }

    const drawBodhi = (x: number) => {
      const t = tRef.current; const done = learnedRef.current === STEPS.length
      ctx.save(); ctx.translate(x, GROUND)
      ctx.fillStyle = '#5a3a18'; ctx.fillRect(-7,-70,14,70)
      const grd = ctx.createRadialGradient(0,-100,10,0,-100,80)
      grd.addColorStop(0, done ? 'rgba(212,168,67,.95)' : 'rgba(126,216,126,.85)')
      grd.addColorStop(1, done ? 'rgba(122,79,26,.5)'   : 'rgba(40,90,40,.5)')
      ctx.fillStyle = grd
      for (const [dx,dy,r] of [[0,-110,52],[-40,-90,38],[40,-92,40],[-20,-130,34],[24,-128,32]] as [number,number,number][]) {
        ctx.beginPath(); ctx.arc(dx,dy,r+(done?Math.sin(t*0.05)*2:0),0,Math.PI*2); ctx.fill()
      }
      if (done) {
        ctx.fillStyle = 'rgba(255,244,208,.9)'
        for (let i = 0; i < 10; i++) {
          const a = t*0.02+i; const rr = 70+Math.sin(t*0.04+i)*8
          ctx.beginPath(); ctx.arc(Math.cos(a)*rr,-100+Math.sin(a)*rr*0.6,2,0,Math.PI*2); ctx.fill()
        }
      }
      ctx.restore()
    }

    const drawHeart = (x: number, y: number, color = '#e090b8') => {
      const bob = Math.sin(tRef.current*0.06)*5
      ctx.save(); ctx.translate(x, y+bob)
      const gl = ctx.createRadialGradient(0,0,2,0,0,36)
      gl.addColorStop(0, hexA(color,.6)); gl.addColorStop(1, hexA(color,0))
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(0,0,36,0,Math.PI*2); ctx.fill()
      const s = 22; ctx.translate(0,-s/2)
      const grd = ctx.createLinearGradient(0,0,0,s)
      grd.addColorStop(0,lighten(color,.4)); grd.addColorStop(1,color)
      ctx.fillStyle = grd
      const top = s*0.3
      ctx.beginPath(); ctx.moveTo(0,top)
      ctx.bezierCurveTo(0,0,-s/2,0,-s/2,top); ctx.bezierCurveTo(-s/2,s*0.55,0,s*0.8,0,s)
      ctx.bezierCurveTo(0,s*0.8,s/2,s*0.55,s/2,top); ctx.bezierCurveTo(s/2,0,0,0,0,top)
      ctx.closePath(); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(-s*0.18,top+1,2.4,0,Math.PI*2); ctx.fill()
      ctx.restore()
    }

    const render = () => {
      const camX = camXRef.current; const monk = monkRef.current
      const heart = heartRef.current; const heart2 = heart2Ref.current
      const stations = stationsRef.current; const p = phaseRef.current; const t = tRef.current

      const sky = ctx.createLinearGradient(0,0,0,H)
      sky.addColorStop(0,'#1c0f04'); sky.addColorStop(.55,'#241405'); sky.addColorStop(1,'#0c0602')
      ctx.fillStyle = sky; ctx.fillRect(0,0,W,H)

      ctx.fillStyle = 'rgba(240,230,200,.5)'
      for (let i = 0; i < 40; i++) {
        const sx = ((i*173)-camX*0.2)%W; const sx2 = sx<0?sx+W:sx
        const sy = (i*53)%180+14
        ctx.globalAlpha = 0.3+0.3*Math.sin(t*0.03+i); ctx.fillRect(sx2,sy,1.6,1.6)
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = 'rgba(212,168,67,.18)'; ctx.beginPath(); ctx.arc(W*0.78,90,46,0,Math.PI*2); ctx.fill()

      mountains(-camX*0.25,GROUND-40,120,'#241606')
      mountains(-camX*0.5, GROUND-10,90, '#2e1c08')

      const gr = ctx.createLinearGradient(0,GROUND,0,H)
      gr.addColorStop(0,'#3a240d'); gr.addColorStop(1,'#1a0e05')
      ctx.fillStyle = gr; ctx.fillRect(0,GROUND,W,H-GROUND)
      ctx.strokeStyle = 'rgba(212,168,67,.25)'; ctx.lineWidth = 3
      ctx.setLineDash([14,12]); ctx.beginPath()
      ctx.moveTo(0,GROUND+14); ctx.lineTo(W,GROUND+14); ctx.stroke(); ctx.setLineDash([])

      ctx.save(); ctx.translate(-camX,0)
      stations.forEach(s => { if (s.x>camX-80&&s.x<camX+W+80) drawLotus(s.x,GROUND,s) })
      drawBodhi(BODHI_X)
      if (heart.active) {
        drawHeart(heart.x, heart.y)
        if (p==='play' && monk.onGround && Math.abs(monk.x-heart.x)<72) {
          ctx.save(); ctx.translate(heart.x, GROUND-150)
          ctx.fillStyle='rgba(18,9,2,.85)'; roundRect(-30,-13,60,22,7); ctx.fill()
          ctx.fillStyle='#e090b8'; ctx.font="600 12px 'Outfit',sans-serif"
          ctx.textAlign='center'; ctx.fillText('Salta ↑',0,2); ctx.restore()
        }
      }
      if (heart2.active) {
        drawHeart(heart2.x, heart2.y, '#d4a843')
        if (p==='play' && monk.onGround && Math.abs(monk.x-heart2.x)<80) {
          ctx.save(); ctx.translate(heart2.x, GROUND-240)
          ctx.fillStyle='rgba(18,9,2,.85)'; roundRect(-34,-13,68,22,7); ctx.fill()
          ctx.fillStyle='#d4a843'; ctx.font="600 12px 'Outfit',sans-serif"
          ctx.textAlign='center'; ctx.fillText('Salta ↑↑',0,2); ctx.restore()
        }
      }
      drawMonk(monk.x, monk.y)
      ctx.restore()
    }

    const update = () => {
      const p = phaseRef.current; const stations = stationsRef.current
      const monk = monkRef.current; const heart = heartRef.current; const heart2 = heart2Ref.current
      if (p !== 'play') { stations.forEach(s => { if (s.learned) s.glow = Math.min(1,s.glow+.05) }); return }
      const keys = keysRef.current
      const left = keys['arrowleft']||keys['a']; const right = keys['arrowright']||keys['d']
      let moving = false
      if (left)  { monk.x -= monk.speed; monk.face = -1; moving = true }
      if (right) { monk.x += monk.speed; monk.face =  1; moving = true }
      monk.x = Math.max(40, Math.min(BODHI_X-10, monk.x))
      monk.walk = moving ? (monk.walk+.25) : 0
      monk.vy += 0.55; monk.y += monk.vy
      if (monk.y >= GROUND) { monk.y = GROUND; monk.vy = 0; monk.onGround = true; monk.jumps = 0 }
      const target = monk.x - CANVAS_W*0.38
      camXRef.current += (target-camXRef.current)*0.08
      camXRef.current = Math.max(0, Math.min(WORLD-CANVAS_W, camXRef.current))
      stations.forEach(s => {
        const near = Math.abs(s.x-monk.x)<46; s.near = near
        if (s.learned) s.glow = Math.min(1,s.glow+.05)
        else s.glow = near ? Math.min(1,s.glow+.08) : Math.max(0,s.glow-.06)
      })
      const step = stations.find(s => !s.learned && Math.abs(s.x-monk.x)<30)
      if (step) openConcept(step)
      heart.active = stations[1].learned
      if (heart.active) {
        const dx = Math.abs(monk.x-heart.x)
        const touching = dx<26 && heart.y>=(monk.y-monk.h-6) && heart.y<=(monk.y+6)
        if (touching && !heart.cooldown) { openBrahma(); heart.cooldown = true }
        if (!touching) heart.cooldown = false
      }
      heart2.active = brahmaSeen.current
      if (heart2.active) {
        const dx = Math.abs(monk.x-heart2.x)
        const touching = dx<26 && heart2.y>=(monk.y-monk.h-6) && heart2.y<=(monk.y+6)
        if (touching && !heart2.cooldown) { openGratitud(); heart2.cooldown = true }
        if (!touching) heart2.cooldown = false
      }
    }

    updateHud()
    const loop = () => { tRef.current++; update(); render(); rafRef.current = requestAnimationFrame(loop) }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      ambient.pause()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMuteToggle = () => {
    const nm = !mutedRef.current; mutedRef.current = nm; setMuted(nm)
    const amb = ambientRef.current
    if (!amb) return
    if (nm) amb.pause(); else if (phaseRef.current !== 'start') amb.play().catch(() => {})
  }

  return (
    <>
      <header>
        <div className="game-icon">🧘</div>
        <h1 className="game-title">El Camino del Monje</h1>
        <p className="game-subtitle">Recorre el Óctuple Noble Sendero, paso a paso</p>
      </header>

      <div className="stage">
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} />

        <div className="hud">
          <div className="step-name">
            <div className="kicker">Próximo paso</div>
            <div className="label">{nextStep}</div>
          </div>
          <div className="progress">
            <span className="count">{learnedCount} / 8</span>
            <div className="lotus-row">
              {lotusDots.map((on, i) => <div key={i} className={on ? 'dot on' : 'dot'} />)}
            </div>
          </div>
        </div>

        <button className="sound-toggle" onClick={handleMuteToggle} title="Sonido (M)" aria-label="Activar o silenciar el sonido">
          {muted ? '🔇' : '🔊'}
        </button>

        {concept && (
          <div className="concept show">
            <div className="concept-card" style={{ '--accent': concept.groupColor } as CSSProperties}>
              <span className="group-tag">{concept.groupName}</span>
              <div className="num">{concept.num}</div>
              <h2>{concept.title}</h2>
              <div className="pali">{concept.pali}</div>
              {concept.type === 'step' && <p>{concept.text}</p>}
              {concept.type === 'brahma' && (
                <>
                  <p>La Intención Correcta florece en cuatro actitudes ilimitadas que dan corazón al sendero:</p>
                  <div className="brahma-list">
                    <div><b>Metta</b> · Amor bondadoso</div>
                    <div><b>Karuna</b> · Compasión</div>
                    <div><b>Mudita</b> · Alegría empática</div>
                    <div><b>Upekkha</b> · Ecuanimidad</div>
                  </div>
                </>
              )}
              {concept.type === 'gratitud' && (
                <>
                  <p>Kataññutā es la gratitud: reconocer y recordar el bien que otros han hecho por ti. El Buda la nombró, junto a katavedità, como la marca de una buena persona, rara en el mundo. Si las Inconmensurables vuelcan el amor hacia afuera, la gratitud gira el corazón hacia adentro para honrar lo recibido.</p>
                  <div className="grat-list">
                    <div><b>Kataññutā</b> · Reconocer el bien recibido</div>
                    <div><b>Katavedità</b> · Corresponder con hechos</div>
                  </div>
                </>
              )}
              <div className="hint">Pulsa <kbd>Enter</kbd> para continuar el camino</div>
              <button className="btn" style={{ marginTop: '1rem' }} onClick={() => closeConceptRef.current?.()}>
                Continuar
              </button>
            </div>
          </div>
        )}

        {phase === 'start' && (
          <div className="overlay">
            <div className="big">🪷</div>
            <h2>El Camino del Monje</h2>
            <p>Un monje emprende el Óctuple Sendero. Camina hacia la derecha y detente en cada loto de luz para aprender uno de los ocho pasos. Cuando reúnas los ocho, alcanzarás la iluminación.</p>
            <button className="btn" onClick={() => startGameRef.current?.()}>Comenzar el camino</button>
          </div>
        )}

        {phase === 'done' && (
          <div className="overlay">
            <div className="big">☸️</div>
            <h2>Has alcanzado el Nirvana</h2>
            <p>El monje ha completado el Óctuple Sendero: Sabiduría, Ética y Concentración en perfecta armonía. La llama del sufrimiento se ha apagado.</p>
            <button className="btn" onClick={() => startGameRef.current?.()}>Caminar de nuevo</button>
          </div>
        )}
      </div>

      <div className="controls">
        <strong style={{ color: 'var(--gold)' }}>Controles:</strong><br />
        <kbd>←</kbd> <kbd>→</kbd> o <kbd>A</kbd> <kbd>D</kbd> moverse &nbsp;·&nbsp;
        <kbd>Espacio</kbd> / <kbd>↑</kbd> saltar &nbsp;·&nbsp;
        <kbd>E</kbd> / <kbd>Enter</kbd> aprender en el loto &nbsp;·&nbsp;
        <kbd>M</kbd> sonido
      </div>

      <div className="game-footer">
        Parte del <a href="index.html">Mapa de la Sabiduría Budista</a>{' · '}
        <a href="octuple-noble-sendero.html">Guía del Óctuple Sendero</a>
      </div>
    </>
  )
}
