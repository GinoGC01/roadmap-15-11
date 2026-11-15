import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { RoadmapContext } from './roadmap-context'
import { fetchRoadmap } from '../server/querys'
import { roadmap as localRoadmap } from '../db'

interface RoadmapProviderProps {
  children: ReactNode
}

export function RoadmapProvider({ children }: RoadmapProviderProps) {
  // Se parte del mock local para no tener un primer render vacío y después
  // se hidrata con la capa de queries (mismo contrato, lista para un servidor real).
  const [state, setState] = useState({
    roadmap: localRoadmap,
    loading: true,
    error: null as string | null,
  })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    fetchRoadmap()
      .then((data) => {
        if (!active) return
        setState({ roadmap: data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!active) return
        setState((current) => ({
          ...current,
          loading: false,
          error: err instanceof Error ? err.message : 'No se pudo cargar el roadmap',
        }))
      })

    return () => {
      active = false
    }
  }, [attempt])

  const reload = useCallback(() => setAttempt((value) => value + 1), [])

  return (
    <RoadmapContext.Provider value={{ ...state, reload }}>{children}</RoadmapContext.Provider>
  )
}
