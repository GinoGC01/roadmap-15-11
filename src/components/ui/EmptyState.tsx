import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty">
      <span className="empty__mark">·</span>
      <strong>{title}</strong>
      {description ? <p className="muted">{description}</p> : null}
      {action}
    </div>
  )
}
