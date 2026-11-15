import {
  days,
  getAdjacentDays,
  getDayById,
  getStageById,
  getStageOfWeek,
  getWeekByNumber,
  getWeekOfDay,
  roadmap,
  stages,
  weeks,
} from '../../db'
import type { Day, Roadmap, Stage, Week } from '../../db'

/**
 * Capa de acceso a datos.
 *
 * Hoy responde desde el JSON local, pero todas las funciones son `async` y
 * devuelven Promesas: para migrar a un servidor real alcanza con reemplazar
 * el cuerpo de cada query por un `fetch` (mismo contrato, misma firma).
 */

const SIMULATED_LATENCY_MS = 120

function delay(ms = SIMULATED_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface SearchResult {
  id: string
  kind: 'etapa' | 'semana' | 'jornada' | 'recurso'
  title: string
  subtitle: string
  href: string
  stageId: string
  color: string
}

export async function fetchRoadmap(): Promise<Roadmap> {
  await delay(0)
  return roadmap
}

export async function fetchStages(): Promise<Stage[]> {
  await delay()
  return stages
}

export async function fetchStage(stageId: string): Promise<Stage | null> {
  await delay()
  return getStageById(stageId) ?? null
}

export async function fetchWeek(weekNumber: number): Promise<Week | null> {
  await delay()
  return getWeekByNumber(weekNumber) ?? null
}

export async function fetchDay(dayId: string): Promise<Day | null> {
  await delay()
  return getDayById(dayId) ?? null
}

export async function fetchWeekOfDay(dayId: string): Promise<Week | null> {
  await delay(0)
  const day = getDayById(dayId)
  if (!day) return null
  return getWeekOfDay(day) ?? null
}

export async function fetchAdjacentDays(dayId: string): Promise<{ previous: Day | null; next: Day | null }> {
  await delay(0)
  return getAdjacentDays(dayId)
}

function matches(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle)
}

/** Busca en etapas, semanas, jornadas y recursos (links). */
export async function fetchSearchResults(query: string, limit = 12): Promise<SearchResult[]> {
  await delay(0)
  const term = query.trim().toLowerCase()
  if (term.length < 2) return []

  const results: SearchResult[] = []

  for (const stage of stages) {
    if (matches(stage.title, term)) {
      results.push({
        id: stage.id,
        kind: 'etapa',
        title: stage.title,
        subtitle: `Etapa ${stage.number} · semanas ${stage.weekFrom}–${stage.weekTo}`,
        href: `/etapa/${stage.id}`,
        stageId: stage.id,
        color: stage.color,
      })
    }
  }

  for (const week of weeks) {
    const stage = getStageOfWeek(week)
    if (!stage) continue
    if (matches(week.title, term) || matches(week.deliverable?.label ?? '', term)) {
      results.push({
        id: week.id,
        kind: 'semana',
        title: `Semana ${week.number}: ${week.title}`,
        subtitle: week.deliverable ? `Entregable: ${week.deliverable.label}` : stage.title,
        href: `/semana/${week.number}`,
        stageId: stage.id,
        color: stage.color,
      })
    }
  }

  for (const day of days) {
    const week = getWeekOfDay(day)
    const stage = week ? getStageOfWeek(week) : undefined
    if (!week || !stage) continue
    if (matches(day.anchor.text, term) || matches(day.practice.text, term) || matches(day.challenge.text, term)) {
      results.push({
        id: day.id,
        kind: 'jornada',
        title: `${day.weekday} · Semana ${week.number}`,
        subtitle: day.anchor.text,
        href: `/dia/${day.id}`,
        stageId: stage.id,
        color: stage.color,
      })
    }
  }

  const seen = new Set<string>()
  const resources: SearchResult[] = []
  for (const day of days) {
    const week = getWeekOfDay(day)
    const stage = week ? getStageOfWeek(week) : undefined
    if (!stage) continue
    for (const link of [...day.anchor.links, ...day.practice.links]) {
      if (!matches(link.label, term) && !matches(link.url, term)) continue
      const key = `${link.url}-${day.id}`
      if (seen.has(key)) continue
      seen.add(key)
      resources.push({
        id: key,
        kind: 'recurso',
        title: link.label,
        subtitle: `${stage.title} · ${day.weekday} (semana ${week?.number})`,
        href: link.url,
        stageId: stage.id,
        color: stage.color,
      })
    }
  }

  return [...results, ...resources].slice(0, limit)
}
