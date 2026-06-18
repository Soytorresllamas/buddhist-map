interface Props {
  onClick: () => void
  dimmed?: boolean
  highlighted?: boolean
}

export default function CentroNode({ onClick, dimmed, highlighted }: Props) {
  return (
    <div
      className={[
        'node-centro-container',
        'node-centro',
        dimmed ? 'dimmed' : '',
        highlighted ? 'highlighted' : '',
      ].filter(Boolean).join(' ')}
      data-node-id="centro"
      id="node-centro"
      tabIndex={0}
      aria-label="Sección de Las Cuatro Nobles Verdades, centro del Dharma"
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="node-centro-inner">
        <img
          src="buddha.png"
          alt="Buda Gautama en meditación"
          className="center-avatar"
        />
        <h2 className="center-title">4 Nobles Verdades</h2>
        <p className="center-subtitle">El corazón del Dharma</p>
      </div>
    </div>
  )
}
