import { createContext } from 'react'

export interface DayNotes {
  understood: string
  blocked: string
  next: string
}

export interface DayProgress {
  done: boolean
  completedAt: string | null
  notes: DayNotes
}

export interface ProgressState {
  version: number
  days: Record<string, DayProgress>
  steps: Record<string, boolean[]>
  updatedAt: string
}

export interface ProgressContextValue {
  state: ProgressState
  isDayDone: (dayId: string) => boolean
  setDayDone: (dayId: string, done: boolean) => void
  setNote: (dayId: string, key: keyof DayNotes, value: string) => void
  isStepDone: (weekId: string, index: number) => boolean
  toggleStep: (weekId: string, index: number) => void
  resetDay: (dayId: string) => void
  resetAll: () => void
  exportProgress: () => string
  importProgress: (raw: string) => boolean
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export const PROGRESS_STORAGE_KEY = 'roadmap-ai:progress:v1'

export const emptyNotes: DayNotes = { understood: '', blocked: '', next: '' }

export function createEmptyState(): ProgressState {
  return { version: 1, days: {}, steps: {}, updatedAt: new Date().toISOString() }
}
