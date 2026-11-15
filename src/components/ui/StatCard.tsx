import type { ReactNode } from 'react'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: ReactNode
  hint?: string
  accent?: boolean
}

export function StatCard({ label, value, hint, accent = false }: StatCardProps) {
  return (
    <Card className="stat" accent={accent}>
      <span className="eyebrow">{label}</span>
      <strong className="stat__value">{value}</strong>
      {hint ? <span className="faint">{hint}</span> : null}
    </Card>
  )
}
