import type { RelationData } from '@/data/nodes'

interface Props {
  relations: RelationData[]
  onRelationEnter: (id: string, nodeA: string, nodeB: string) => void
  onRelationLeave: () => void
}

export default function RelationsPanel({ relations, onRelationEnter, onRelationLeave }: Props) {
  return (
    <section className="relations-panel" aria-label="Relaciones conceptuales del mapa">
      <h2 className="relations-title">⚡ Relaciones Clave</h2>
      <div className="relations-grid">
        {relations.map(rel => (
          <div
            key={rel.id}
            className="relation-card"
            data-relation-id={rel.id}
            data-node-a={rel.nodeA}
            data-node-b={rel.nodeB}
            tabIndex={0}
            onMouseEnter={() => onRelationEnter(rel.id, rel.nodeA, rel.nodeB)}
            onMouseLeave={onRelationLeave}
            onFocus={() => onRelationEnter(rel.id, rel.nodeA, rel.nodeB)}
            onBlur={onRelationLeave}
          >
            <div className="relation-header" style={{ color: rel.headerColor }}>
              <span>{rel.header}</span>
            </div>
            <p className="relation-desc">{rel.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
