import { useContext } from 'react'
import { ConfirmContext } from '../context/confirm-context'
import type { ConfirmOptions } from '../context/confirm-context'

/** Abre el diálogo de confirmación y devuelve `true` si el usuario acepta. */
export function useConfirm(): (options: ConfirmOptions) => Promise<boolean> {
  const context = useContext(ConfirmContext)
  if (!context) throw new Error('useConfirm debe usarse dentro de <ConfirmProvider>')
  return context.confirm
}
