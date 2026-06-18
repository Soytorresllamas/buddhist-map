import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { BodyBlock } from '@/data/nodes'

interface DetailData {
  id: string
  modalTitle: string
  modalSub: string
  modalColor: string
  body: BodyBlock[]
  link?: { href: string; label: string }
}

interface Props {
  data: DetailData
  open: boolean
  onClose: () => void
}

export default function NodeDetail({ data, open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent
        className="node-detail-dialog sm:max-w-[540px] ring-0 p-0 overflow-hidden"
        style={{ borderColor: data.modalColor } as React.CSSProperties}
        showCloseButton={false}
      >
        <div className="node-detail-inner">
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>

          <DialogHeader className="gap-1 mb-6">
            <DialogTitle
              className="modal-title"
              style={{ color: data.modalColor }}
            >
              {data.modalTitle}
            </DialogTitle>
            <DialogDescription className="modal-subtitle">
              {data.modalSub}
            </DialogDescription>
          </DialogHeader>

          <div className="modal-body">
            {data.body.map((block, i) => {
              if (typeof block === 'string') {
                return <p key={i}>{block}</p>
              }
              return (
                <ul key={i}>
                  {block.map(([label, text]) => (
                    <li key={label}>
                      <strong style={{ color: data.modalColor }}>{label}</strong>
                      {text && <span> {text}</span>}
                    </li>
                  ))}
                </ul>
              )
            })}

            {data.link && (
              <a
                className="modal-link"
                href={data.link.href}
                style={{ '--link-color': data.modalColor } as React.CSSProperties}
              >
                {data.link.label}
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
