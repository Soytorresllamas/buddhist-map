import { useRef, useCallback, useEffect } from 'react'

const CONNECTIONS = [
  { from: 'centro', to: 'joyas', type: 'core' },
  { from: 'centro', to: 'marcas', type: 'core' },
  { from: 'centro', to: 'paramitas', type: 'core' },
  { from: 'centro', to: 'inconm', type: 'core' },
  { from: 'centro', to: 'sendero', type: 'core' },
  { id: 'rel-sendero-paramitas', from: 'sendero', to: 'paramitas', type: 'relation' },
  { id: 'rel-sendero-inconm', from: 'sendero', to: 'inconm', type: 'relation' },
  { id: 'rel-paramitas-inconm', from: 'paramitas', to: 'inconm', type: 'relation' },
  { id: 'rel-centro-joyas', from: 'centro', to: 'joyas', type: 'relation' },
] as const

interface Props {
  highlightedRelation: string | null
}

export default function ConnectionsCanvas({ highlightedRelation }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  const draw = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    const viewport = svg.closest('.map-viewport') as HTMLElement | null
    if (!viewport) return

    svg.innerHTML = ''
    if (window.innerWidth <= 1023) return

    const vRect = viewport.getBoundingClientRect()

    for (const conn of CONNECTIONS) {
      const fromEl = document.querySelector(`[data-node-id="${conn.from}"]`)
      const toEl = document.querySelector(`[data-node-id="${conn.to}"]`)
      if (!fromEl || !toEl) continue

      const fRect = fromEl.getBoundingClientRect()
      const tRect = toEl.getBoundingClientRect()

      const x1 = (fRect.left + fRect.width / 2) - vRect.left
      const y1 = (fRect.top + fRect.height / 2) - vRect.top
      const x2 = (tRect.left + tRect.width / 2) - vRect.left
      const y2 = (tRect.top + tRect.height / 2) - vRect.top

      const dx = x2 - x1
      const dy = y2 - y1
      let cx1: number, cy1: number, cx2: number, cy2: number

      if (conn.type === 'core') {
        cx1 = x1 + dx * 0.4; cy1 = y1 + dy * 0.1
        cx2 = x1 + dx * 0.6; cy2 = y2 - dy * 0.1
      } else {
        cx1 = x1 + dx * 0.2; cy1 = y1 + dy * 0.8
        cx2 = x1 + dx * 0.8; cy2 = y2 - dy * 0.2
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`)

      const isActive = 'id' in conn && conn.id === highlightedRelation
      path.setAttribute('class', `connection-path${isActive ? ' active' : ''}`)

      if ('id' in conn && conn.id) path.setAttribute('id', conn.id)

      if (conn.type === 'relation') {
        path.style.stroke = 'rgba(212, 168, 67, 0.08)'
        path.style.strokeWidth = '1.5px'
      }

      svg.appendChild(path)
    }
  }, [highlightedRelation])

  useEffect(() => {
    const raf = requestAnimationFrame(draw)
    const ro = new ResizeObserver(draw)
    const viewport = document.querySelector('.map-viewport')
    if (viewport) ro.observe(viewport)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [draw])

  return (
    <svg
      ref={svgRef}
      className="connections-canvas"
      id="connectionsSvg"
      aria-hidden="true"
    />
  )
}
