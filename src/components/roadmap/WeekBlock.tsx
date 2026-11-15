import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { RichText } from '../ui/RichText'
import { DayRow } from './DayRow'
import type { Stage, Week } from '../../db/types'
import { useWeekProgress } from '../../hooks/useProgress'

interface WeekBlockProps {
  week: Week
  stage: Stage
  defaultOpen?: boolean
}

export function WeekBlock({ week, stage, defaultOpen = false }: WeekBlockProps) {
  const [open, setOpen] = useState(defaultOpen)
  const progress = useWeekProgress(week.id)

  return (
    <Card className={`week-block${open ? ' week-block--open' : ''}`} accent={open}>
      <button className="week-block__head" onClick={() => setOpen((value) => !value)} type="button">
        <div className="grow stack-sm">
          <span className="eyebrow">
            Semana {week.number} · {stage.title}
          </span>
          <strong className="week-block__title">{week.title}</strong>
          {week.deliverable ? (
            <span className="faint">Entregable: {week.deliverable.label}</span>
          ) : null}
        </div>
        <div className="week-block__meta">
          <span className="week-block__percent">
            {progress.done}/{progress.total}
          </span>
          <span className={`week-block__chevron${open ? ' week-block__chevron--open' : ''}`} aria-hidden="true">
            ⌄
          </span>
        </div>
      </button>

      <ProgressBar value={progress.percent} thin />

      {open ? (
        <div className="week-block__body">
          {week.objective ? (
            <p className="muted">
              <span className="faint">Objetivo · </span>
              <RichText raw={week.objective.raw} />
            </p>
          ) : null}

          <div className="stack">
            {week.days.map((day) => (
              <DayRow key={day.id} day={day} weekNumber={week.number} accent={stage.color} />
            ))}
          </div>

          <Link className="link-arrow" to={`/semana/${week.number}`}>
            Ver la semana completa →
          </Link>
        </div>
      ) : null}
    </Card>
  )
}
