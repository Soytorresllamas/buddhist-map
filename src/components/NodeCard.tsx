import type { NodeData } from '@/data/nodes'

interface Props {
  node: NodeData
  onClick: () => void
  dimmed?: boolean
  highlighted?: boolean
}

export default function NodeCard({ node, onClick, dimmed, highlighted }: Props) {
  return (
    <section
      className={[
        'node-card',
        node.cssClass,
        dimmed ? 'dimmed' : '',
        highlighted ? 'highlighted' : '',
      ].filter(Boolean).join(' ')}
      data-node-id={node.id}
      id={`node-${node.id}`}
      tabIndex={0}
      aria-label={`Sección de ${node.cardTitle}`}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <h2 className="card-title">{node.cardTitle}</h2>
      <p className="card-subtitle">{node.cardSubtitle}</p>
      <div className="card-tags">
        {node.tags.map(tag => (
          <span
            key={tag.label}
            className={['tag', tag.gold ? 'tag-gold' : ''].filter(Boolean).join(' ')}
          >
            {tag.label}
          </span>
        ))}
      </div>
      {node.link && (
        <a
          className="card-link"
          href={node.link.href}
          onClick={e => e.stopPropagation()}
        >
          {node.link.label}
        </a>
      )}
    </section>
  )
}
