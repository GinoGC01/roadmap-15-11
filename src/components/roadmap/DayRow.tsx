import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Card } from '../ui/Card'
import { Checkbox } from '../ui/Checkbox'
import { RichText } from '../ui/RichText'
import { ThreadBadge } from './ThreadBadge'
import { ResourceLinks } from './ResourceLinks'
import type { Day } from '../../db/types'
import { useDayActions } from '../../hooks/useDayActions'

interface DayRowProps {
  day: Day
  weekNumber: number
  accent?: string
}

export function DayRow({ day, weekNumber, accent }: DayRowProps) {
  const { isDayDone, markDone, markUndone } = useDayActions()
  const done = isDayDone(day.id)
  const target = { id: day.id, label: `${day.weekday} · Semana ${weekNumber}` }

  return (
    <Card
      className={`day-row${done ? ' day-row--done' : ''}`}
      style={accent ? ({ '--accent': accent } as CSSProperties) : undefined}
    >
      <div className="day-row__head">
        <Checkbox
          checked={done}
          onChange={() => (done ? markUndone(target) : markDone(target))}
          label={`Marcar ${day.weekday} de la semana ${weekNumber}`}
          title={done ? 'Desmarcar jornada' : 'Marcar jornada como hecha'}
        />
        <div className="grow stack-sm">
          <div className="row wrap">
            <strong className="day-row__day">{day.weekday}</strong>
            <span className="faint">Semana {weekNumber}</span>
            {day.threads.map((thread) => (
              <ThreadBadge key={thread} threadId={thread} />
            ))}
          </div>
          <p className="day-row__text">
            <RichText raw={day.anchor.raw} />
          </p>
          <ResourceLinks links={day.anchor.links} />
        </div>
        <Link className="btn btn--sm day-row__link" to={`/dia/${day.id}`}>
          Abrir
        </Link>
      </div>
    </Card>
  )
}
