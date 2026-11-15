import { useEffect, useState } from 'react'
import { fetchSearchResults } from '../server/querys'
import type { SearchResult } from '../server/querys'

/** Búsqueda con debounce sobre la capa de queries. */
export function useRoadmapSearch(query: string, delayMs = 220): SearchResult[] {
  const [results, setResults] = useState<SearchResult[]>([])
  const term = query.trim()

  useEffect(() => {
    if (term.length < 2) return

    let active = true
    const timer = window.setTimeout(() => {
      fetchSearchResults(term).then((data) => {
        if (active) setResults(data)
      })
    }, delayMs)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [term, delayMs])

  return term.length < 2 ? [] : results
}
