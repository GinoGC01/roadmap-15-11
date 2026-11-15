import { useEffect, useRef } from 'react'
import type { ConfirmOptions } from '../../context/confirm-context'

interface ConfirmDialogProps {
  options: ConfirmOptions | null
  onResolve: (value: boolean) => void
}

export function ConfirmDialog({ options, onResolve }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = options !== null

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (open && !element.open) element.showModal()
    else if (!open && element.open) element.close()
  }, [open])

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      ref.current?.querySelector<HTMLButtonElement>('.confirm__confirm')?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  return (
    <dialog
      ref={ref}
      className="confirm"
      onCancel={(event) => {
        // ESC → cancelar.
        event.preventDefault()
        onResolve(false)
      }}
    >
      {options ? (
        <>
          <h2 className="confirm__title">{options.title}</h2>
          {options.message ? <p className="muted confirm__message">{options.message}</p> : null}
          <div className="confirm__actions">
            <button type="button" className="btn" onClick={() => onResolve(false)}>
              {options.cancelLabel ?? 'Cancelar'}
            </button>
            <button
              type="button"
              className={`btn confirm__confirm${options.variant === 'primary' ? ' btn--primary' : ''}`}
              onClick={() => onResolve(true)}
            >
              {options.confirmLabel ?? 'Confirmar'}
            </button>
          </div>
        </>
      ) : null}
    </dialog>
  )
}
