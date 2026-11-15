import { useContext, useMemo } from 'react'
import { ProgressContext } from '../context/progress-context'
import type { ProgressContextValue } from '../context/progress-context'
import type { Day, Stage, Week } from '../db/types'
import { useRoadmapSelectors } from './useRoadmap'

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress debe usarse dentro de <ProgressProvider>')
  return context
}

export interface ProgressStats {
  completed: number
  total: number
  percent: number
  hoursDone: number
  hoursTotal: number
  nextPendingDay: Day | null
  nextPendingWeek: Week | null
  stepsDone: number
  stepsTotal: number
}

export function useProgressStats(): ProgressStats {
  const { state } = useProgress()
  const { days, stages, getWeekOfDay } = useRoadmapSelectors()

  return useMemo(() => {
    const completed = days.filter((day) => state.days[day.id]?.done).length
    const total = days.length
    const hoursPerDay = 2.5

    const nextPendingDay = days.find((day) => !state.days[day.id]?.done) ?? null
    const nextPendingWeek = nextPendingDay ? (getWeekOfDay(nextPendingDay) ?? null) : null

    let stepsDone = 0
    let stepsTotal = 0
    for (const stage of stages) {
      for (const week of stage.weeks) {
        const steps = state.steps[week.id] ?? []
        stepsTotal += week.deliverable?.steps.length ?? 0
        stepsDone += steps.filter(Boolean).length
      }
    }

    return {
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      hoursDone: Math.round(completed * hoursPerDay),
      hoursTotal: Math.round(total * hoursPerDay),
      nextPendingDay,
      nextPendingWeek,
      stepsDone,
      stepsTotal,
    }
  }, [state.days, state.steps, days, stages, getWeekOfDay])
}

export interface ScopeProgress {
  done: number
  total: number
  percent: number
}

export function useWeekProgress(weekId: string): ScopeProgress {
  const { state } = useProgress()
  const { getWeek } = useRoadmapSelectors()

  return useMemo(() => {
    const week = getWeek(weekId)
    if (!week) return { done: 0, total: 0, percent: 0 }
    const done = week.days.filter((day) => state.days[day.id]?.done).length
    return { done, total: week.days.length, percent: Math.round((done / week.days.length) * 100) }
  }, [state.days, getWeek, weekId])
}

export function useStageProgress(stageId: string): ScopeProgress {
  const { state } = useProgress()
  const { getStage } = useRoadmapSelectors()

  return useMemo(() => {
    const stage = getStage(stageId)
    if (!stage) return { done: 0, total: 0, percent: 0 }
    const allDays = stage.weeks.flatMap((week) => week.days)
    const done = allDays.filter((day) => state.days[day.id]?.done).length
    return { done, total: allDays.length, percent: Math.round((done / allDays.length) * 100) }
  }, [state.days, getStage, stageId])
}

export function useDayProgress(dayId: string) {
  const { state } = useProgress()
  return state.days[dayId] ?? null
}

export function useStageOfDay(day: Day | null): Stage | undefined {
  const { getWeekOfDay, getStageOfWeek } = useRoadmapSelectors()
  if (!day) return undefined
  const week = getWeekOfDay(day)
  return week ? getStageOfWeek(week) : undefined
}
