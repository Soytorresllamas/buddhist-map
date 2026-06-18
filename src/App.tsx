import { useState, useEffect } from 'react'
import { NODES, CENTRO, RELATIONS, type BodyBlock } from './data/nodes'
import NodeCard from './components/NodeCard'
import CentroNode from './components/CentroNode'
import NodeDetail from './components/NodeDetail'
import ConnectionsCanvas from './components/ConnectionsCanvas'
import RelationsPanel from './components/RelationsPanel'

interface ActiveDetail {
  id: string
  modalTitle: string
  modalSub: string
  modalColor: string
  body: BodyBlock[]
  link?: { href: string; label: string }
}

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [highlightedRelation, setHighlightedRelation] = useState<string | null>(null)
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([])

  // Staggered card entrance via IntersectionObserver (mirrors the original script)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const order = ['node-joyas', 'node-marcas', 'node-paramitas', 'node-centro-container', 'node-inconm', 'node-sendero']
    const cards = document.querySelectorAll<HTMLElement>('.node-card, .node-centro-container')

    cards.forEach(card => {
      const key = [...card.classList].find(c => order.includes(c))
      const idx = key ? order.indexOf(key) : 0
      card.classList.add('js-reveal')
      card.style.transitionDelay = `${idx * 70}ms`
    })

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })

    cards.forEach(card => obs.observe(card))
    return () => obs.disconnect()
  }, [])

  const activeData: ActiveDetail | null = (() => {
    if (!activeId) return null
    if (activeId === 'centro') return CENTRO
    return NODES.find(n => n.id === activeId) ?? null
  })()

  const handleRelationEnter = (id: string, a: string, b: string) => {
    setHighlightedRelation(id)
    setHighlightedNodes([a, b])
  }

  const handleRelationLeave = () => {
    setHighlightedRelation(null)
    setHighlightedNodes([])
  }

  const isDimmed = (id: string) => highlightedNodes.length > 0 && !highlightedNodes.includes(id)
  const isHighlighted = (id: string) => highlightedNodes.includes(id)

  return (
    <>
      <header>
        <div className="map-icon" aria-hidden="true">🪷</div>
        <h1>Mapa de la Sabiduría Budista</h1>
        <p className="subtitle">Explora los pilares del Dharma y sus conexiones profundas</p>
        <a className="play-cta" href="el-camino-del-monje.html">🧘 Jugar: El Camino del Monje</a>
      </header>

      <main className="map-viewport" id="mapViewport">
        <ConnectionsCanvas highlightedRelation={highlightedRelation} />

        <div className="map-nodes">
          <NodeCard node={NODES[0]} onClick={() => setActiveId('joyas')} dimmed={isDimmed('joyas')} highlighted={isHighlighted('joyas')} />
          <NodeCard node={NODES[1]} onClick={() => setActiveId('marcas')} dimmed={isDimmed('marcas')} highlighted={isHighlighted('marcas')} />
          <NodeCard node={NODES[2]} onClick={() => setActiveId('paramitas')} dimmed={isDimmed('paramitas')} highlighted={isHighlighted('paramitas')} />
          <CentroNode onClick={() => setActiveId('centro')} dimmed={isDimmed('centro')} highlighted={isHighlighted('centro')} />
          <NodeCard node={NODES[3]} onClick={() => setActiveId('inconm')} dimmed={isDimmed('inconm')} highlighted={isHighlighted('inconm')} />
          <NodeCard node={NODES[4]} onClick={() => setActiveId('sendero')} dimmed={isDimmed('sendero')} highlighted={isHighlighted('sendero')} />
        </div>

        <RelationsPanel
          relations={RELATIONS}
          onRelationEnter={handleRelationEnter}
          onRelationLeave={handleRelationLeave}
        />
      </main>

      <footer className="footer">
        <p>☸️ Haz clic en cualquier sección para ver detalles y contexto profundo. Desarrollado con armonía y claridad.</p>
      </footer>

      {activeData && (
        <NodeDetail
          data={activeData}
          open={!!activeId}
          onClose={() => setActiveId(null)}
        />
      )}
    </>
  )
}
