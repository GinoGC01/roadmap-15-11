import raw from './roadmap.json'
import type { Day, Roadmap, Stage, Week } from './types'

export * from './types'

/** Fuente de verdad de la app. Se genera con `npm run db:build`. */
export const roadmap = raw as Roadmap

export const stages: Stage[] = roadmap.stages

export const weeks: Week[] = stages.flatMap((stage) => stage.weeks)

export const days: Day[] = weeks.flatMap((week) => week.days)

export const totalDays = days.length

export function getStageById(id: string): Stage | undefined {
  return stages.find((stage) => stage.id === id)
}

export function getStageByNumber(number: number): Stage | undefined {
  return stages.find((stage) => stage.number === number)
}

export function getWeekById(id: string): Week | undefined {
  return weeks.find((week) => week.id === id)
}

export function getWeekByNumber(number: number): Week | undefined {
  return weeks.find((week) => week.number === number)
}

export function getDayById(id: string): Day | undefined {
  return days.find((day) => day.id === id)
}

export function getStageOfWeek(week: Week): Stage | undefined {
  return stages.find((stage) => stage.weeks.some((item) => item.id === week.id))
}

export function getWeekOfDay(day: Day): Week | undefined {
  return weeks.find((week) => week.days.some((item) => item.id === day.id))
}

/** Jornada anterior y siguiente en el orden del roadmap (semana → día). */
export function getAdjacentDays(dayId: string): { previous: Day | null; next: Day | null } {
  const index = days.findIndex((day) => day.id === dayId)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? days[index - 1] : null,
    next: index < days.length - 1 ? days[index + 1] : null,
  }
}

export function getThread(threadId: string) {
  return roadmap.meta.threads.find((thread) => thread.id === threadId)
}
