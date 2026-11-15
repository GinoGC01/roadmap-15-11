import type { ReactNode } from 'react'

interface SectionProps {
  title?: string
  eyebrow?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ title, eyebrow, action, children, className }: SectionProps) {
  return (
    <section className={className}>
      {title || eyebrow || action ? (
        <header className="section__head">
          <div className="stack-sm">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            {title ? <h2 className="section__title">{title}</h2> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  )
}
