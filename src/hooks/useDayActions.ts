import { useCallback } from 'react'
import { useProgress } from './useProgress'
import { useConfirm } from './useConfirm'

export interface DayActionTarget {
  id: string
  /** Etiqueta legible: "Lun · Semana 1". */
  label?: string
}

/**
 * Acciones sobre una jornada:
 * - marcar como hecha pide confirmación en un diálogo;
 * - desmarcar es inmediato (es reversible en un clic).
 */
export function useDayActions() {
  const { isDayDone, setDayDone } = useProgress()
  const confirm = useConfirm()

  const markDone = useCallback(
    async (target: DayActionTarget) => {
      const ok = await confirm({
        title: '¿Marcar la jornada como hecha?',
        message: target.label
          ? `${target.label} queda como completada en tu avance. Si te equivocaste, podés desmarcarla cuando quieras.`
          : 'Queda como completada en tu avance. Si te equivocaste, podés desmarcarla cuando quieras.',
        confirmLabel: 'Sí, marcar como hecha',
        cancelLabel: 'Cancelar',
        variant: 'primary',
      })

      if (ok) setDayDone(target.id, true)
    },
    [confirm, setDayDone],
  )

  const markUndone = useCallback(
    (target: DayActionTarget) => {
      setDayDone(target.id, false)
    },
    [setDayDone],
  )

  return { isDayDone, markDone, markUndone }
}
