import { useContext, useMemo } from 'react'
import { RoadmapContext } from '../context/roadmap-context'
import type { RoadmapContextValue } from '../context/roadmap-context'
import type { Day, Stage, Week } from '../db/types'

export function useRoadmap(): RoadmapContextValue {
  const context = useContext(RoadmapContext)
  if (!context) throw new Error('useRoadmap debe usarse dentro de <RoadmapProvider>')
  return context
}

export interface RoadmapSelectors {
  stages: Stage[]
  weeks: Week[]
  days: Day[]
  getStage: (id: string) => Stage | undefined
  getWeek: (idOrNumber: string | number) => Week | undefined
  getDay: (id: string) => Day | undefined
  getStageOfWeek: (week: Week) => Stage | undefined
  getWeekOfDay: (day: Day) => Week | undefined
  getAdjacentDays: (dayId: string) => { previous: Day | null; next: Day | null }
}

/** Selectores derivados del roadmap cargado en el contexto. */
export function useRoadmapSelectors(): RoadmapSelectors {
  const { roadmap } = useRoadmap()

  return useMemo(() => {
    const stages = roadmap?.stages ?? []
    const weeks = stages.flatMap((stage) => stage.weeks)
    const days = weeks.flatMap((week) => week.days)

    const getStage = (id: string) => stages.find((stage) => stage.id === id)
    const getWeek = (idOrNumber: string | number) =>
      typeof idOrNumber === 'number'
        ? weeks.find((week) => week.number === idOrNumber)
        : weeks.find((week) => week.id === idOrNumber)
    const getDay = (id: string) => days.find((day) => day.id === id)
    const getStageOfWeek = (week: Week) =>
      stages.find((stage) => stage.weeks.some((item) => item.id === week.id))
    const getWeekOfDay = (day: Day) => weeks.find((week) => week.days.some((item) => item.id === day.id))
    const getAdjacentDays = (dayId: string) => {
      const index = days.findIndex((day) => day.id === dayId)
      if (index === -1) return { previous: null, next: null }
      return {
        previous: index > 0 ? days[index - 1] : null,
        next: index < days.length - 1 ? days[index + 1] : null,
      }
    }

    return {
      stages,
      weeks,
      days,
      getStage,
      getWeek,
      getDay,
      getStageOfWeek,
      getWeekOfDay,
      getAdjacentDays,
    }
  }, [roadmap])
}
