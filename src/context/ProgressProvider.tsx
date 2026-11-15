import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { ProgressContext, PROGRESS_STORAGE_KEY, createEmptyState, emptyNotes } from './progress-context'
import type { DayNotes, ProgressContextValue, ProgressState } from './progress-context'
import { usePersistentState } from '../hooks/useLocalStorage'

interface ProgressProviderProps {
  children: ReactNode
}

function normalizeState(raw: ProgressState): ProgressState {
  const fallback = createEmptyState()
  if (!raw || typeof raw !== 'object') return fallback
  return {
    version: raw.version ?? fallback.version,
    days: raw.days ?? {},
    steps: raw.steps ?? {},
    updatedAt: raw.updatedAt ?? fallback.updatedAt,
  }
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [state, setState] = usePersistentState<ProgressState>(
    PROGRESS_STORAGE_KEY,
    createEmptyState(),
    (raw) => normalizeState(JSON.parse(raw) as ProgressState),
  )

  const commit = useCallback(
    (updater: (current: ProgressState) => ProgressState) => {
      setState((current) => ({ ...updater(current), updatedAt: new Date().toISOString() }))
    },
    [setState],
  )

  const isDayDone = useCallback((dayId: string) => state.days[dayId]?.done === true, [state.days])

  const setDayDone = useCallback(
    (dayId: string, done: boolean) => {
      commit((current) => {
        const entry = current.days[dayId]
        if ((entry?.done ?? false) === done) return current
        return {
          ...current,
          days: {
            ...current.days,
            [dayId]: {
              done,
              completedAt: done ? new Date().toISOString() : null,
              notes: entry?.notes ?? { ...emptyNotes },
            },
          },
        }
      })
    },
    [commit],
  )

  const setNote = useCallback(
    (dayId: string, key: keyof DayNotes, value: string) => {
      commit((current) => {
        const entry = current.days[dayId]
        return {
          ...current,
          days: {
            ...current.days,
            [dayId]: {
              done: entry?.done ?? false,
              completedAt: entry?.completedAt ?? null,
              notes: { ...(entry?.notes ?? emptyNotes), [key]: value },
            },
          },
        }
      })
    },
    [commit],
  )

  const isStepDone = useCallback(
    (weekId: string, index: number) => state.steps[weekId]?.[index] === true,
    [state.steps],
  )

  const toggleStep = useCallback(
    (weekId: string, index: number) => {
      commit((current) => {
        const steps = current.steps[weekId] ?? []
        const next = [...steps]
        next[index] = !next[index]
        return { ...current, steps: { ...current.steps, [weekId]: next } }
      })
    },
    [commit],
  )

  const resetDay = useCallback(
    (dayId: string) => {
      commit((current) => {
        const days = { ...current.days }
        delete days[dayId]
        return { ...current, days }
      })
    },
    [commit],
  )

  const resetAll = useCallback(() => {
    setState(createEmptyState())
  }, [setState])

  const exportProgress = useCallback(
    () => JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2),
    [state],
  )

  const importProgress = useCallback(
    (raw: string) => {
      try {
        const parsed = JSON.parse(raw) as ProgressState
        if (!parsed || typeof parsed !== 'object' || !parsed.days) return false
        setState(normalizeState(parsed))
        return true
      } catch {
        return false
      }
    },
    [setState],
  )

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      isDayDone,
      setDayDone,
      setNote,
      isStepDone,
      toggleStep,
      resetDay,
      resetAll,
      exportProgress,
      importProgress,
    }),
    [
      state,
      isDayDone,
      setDayDone,
      setNote,
      isStepDone,
      toggleStep,
      resetDay,
      resetAll,
      exportProgress,
      importProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
