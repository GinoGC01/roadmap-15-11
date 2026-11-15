import { createContext } from 'react'

export interface ConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  /** `primary` para el botón de confirmación, `default` para acciones reversibles. */
  variant?: 'default' | 'primary'
}

export interface ConfirmContextValue {
  /** Abre el diálogo y resuelve en `true` si el usuario confirma. */
  confirm: (options: ConfirmOptions) => Promise<boolean>
}

export const ConfirmContext = createContext<ConfirmContextValue | null>(null)
