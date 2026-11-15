import { createContext } from 'react'
import type { Roadmap } from '../db/types'

export interface RoadmapContextValue {
  roadmap: Roadmap | null
  loading: boolean
  error: string | null
  reload: () => void
}

export const RoadmapContext = createContext<RoadmapContextValue | null>(null)
