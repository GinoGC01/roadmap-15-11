export interface ResourceLink {
  label: string
  url: string
}

/** Texto con su versión en markdown original, para render inline. */
export interface RichText {
  raw: string
  text: string
}

export interface TextSegment {
  text: string
  links: ResourceLink[]
}

/** Bloque de texto con links resueltos y segmentos por recurso. */
export interface TextBlock extends RichText {
  links: ResourceLink[]
  segments: TextSegment[]
}

export interface JourneyBlock {
  block: string
  time: string
  description: RichText
}

export interface Thread {
  id: string
  name: string
  description: RichText
}

export interface LibraryEntry {
  name: string
  description: RichText
  links: ResourceLink[]
}

export interface StageSummary {
  number: number
  title: string
  weeks: string
  outcome: string
}

export interface RoadmapMeta {
  title: string
  profile: string
  pace: {
    daysPerWeek: number
    hoursPerDay: number
    hoursPerWeek: number
    totalHours: number
  }
  journey: JourneyBlock[]
  rules: RichText[]
  threads: Thread[]
  library: LibraryEntry[]
  stageSummary: StageSummary[]
}

export interface Deliverable {
  names: string[]
  label: string
  isFinal: boolean
  why: RichText | null
  impact: RichText | null
  reflects: RichText | null
  steps: RichText[]
}

export interface Day {
  id: string
  weekday: string
  weekdayIndex: number
  anchor: TextBlock
  practice: TextBlock
  challenge: TextBlock
  threads: string[]
}

export interface Week {
  id: string
  number: number
  title: string
  objective: RichText | null
  deliverable: Deliverable | null
  days: Day[]
}

export interface StageEvaluation extends RichText {
  title: string
}

export interface Stage {
  id: string
  number: number
  title: string
  weekFrom: number
  weekTo: number
  color: string
  note: TextBlock | null
  outcome: string
  evaluation: StageEvaluation | null
  weeks: Week[]
}

export interface Roadmap {
  version: number
  generatedFrom: string
  meta: RoadmapMeta
  stages: Stage[]
}
