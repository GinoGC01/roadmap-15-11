import { Link, useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { RichText } from '../components/ui/RichText'
import { ResourceLinks } from '../components/roadmap/ResourceLinks'
import { ThreadBadge } from '../components/roadmap/ThreadBadge'
import { EmptyState } from '../components/ui/EmptyState'
import { paths } from '../routes/paths'
import { useProgress } from '../hooks/useProgress'
import { useDayActions } from '../hooks/useDayActions'
import { useRoadmapSelectors } from '../hooks/useRoadmap'

const NOTE_FIELDS = [
  { key: 'understood', label: 'Qué entendí' },
  { key: 'blocked', label: 'Qué me trabó' },
  { key: 'next', label: 'Qué sigue' },
] as const

export function DayPage() {
  const { dayId } = useParams()
  const { state, setNote } = useProgress()
  const { isDayDone, markDone, markUndone } = useDayActions()
  const { getDay, getWeekOfDay, getStageOfWeek, getAdjacentDays } = useRoadmapSelectors()
  const day = dayId ? getDay(dayId) : undefined

  if (!day) {
    return (
      <div className="page">
        <EmptyState
          title="Jornada no encontrada"
          description="Esa jornada no existe en el roadmap."
          action={
            <Link className="btn" to={paths.roadmap}>
              Volver al roadmap
            </Link>
          }
        />
      </div>
    )
  }

  const week = getWeekOfDay(day)
  const stage = week ? getStageOfWeek(week) : undefined
  const { previous, next } = getAdjacentDays(day.id)
  const done = isDayDone(day.id)
  const notes = state.days[day.id]?.notes ?? { understood: '', blocked: '', next: '' }

  return (
    <div className="page">
      <header className="page__head">
        <span className="eyebrow">
          {stage ? `Etapa ${stage.number} · ${stage.title}` : 'Jornada'}
          {week ? ` · Semana ${week.number}` : ''}
        </span>
        <h1 className="page__title">
          {day.weekday} · {week?.title ?? ''}
        </h1>
        <div className="row wrap">
          {day.threads.map((thread) => (
            <ThreadBadge key={thread} threadId={thread} />
          ))}
          <span className="faint">{week ? `Semana ${week.number} de 28` : ''}</span>
        </div>
      </header>

      <Card
        className="day-detail"
        style={stage ? ({ '--accent': stage.color } as CSSProperties) : undefined}
      >
        <div className="day-detail__block">
          <span className="eyebrow">Recurso ancla</span>
          <p className="day-detail__text">
            <RichText raw={day.anchor.raw} />
          </p>
          <ResourceLinks links={day.anchor.links} />
        </div>

        <hr className="divider" />

        <div className="day-detail__block">
          <span className="eyebrow">Práctica</span>
          <p className="day-detail__text">
            <RichText raw={day.practice.raw} />
          </p>
          <ResourceLinks links={day.practice.links} />
        </div>

        <hr className="divider" />

        <div className="day-detail__block">
          <span className="eyebrow">Desafío del día</span>
          <p className="day-detail__text">
            <RichText raw={day.challenge.raw} />
          </p>
          <ResourceLinks links={day.challenge.links} />
        </div>
      </Card>

      <Card className="day-notes" accent>
        <div className="row-between wrap">
          <div className="stack-sm">
            <span className="eyebrow">Registro</span>
            <h2 className="section__title">Qué entendí, qué me trabó, qué sigue</h2>
          </div>
          <Button
            variant={done ? 'default' : 'primary'}
            onClick={() =>
              done ? markUndone({ id: day.id, label: `${day.weekday} · Semana ${week?.number ?? ''}` }) : markDone({ id: day.id, label: `${day.weekday} · Semana ${week?.number ?? ''}` })
            }
          >
            {done ? 'Desmarcar jornada' : 'Marcar jornada como hecha'}
          </Button>
        </div>

        <div className="notes-grid">
          {NOTE_FIELDS.map((field) => (
            <label key={field.key} className="stack-sm">
              <span className="eyebrow">{field.label}</span>
              <textarea
                className="textarea"
                rows={3}
                value={notes[field.key]}
                placeholder="Escribí acá…"
                onChange={(event) => setNote(day.id, field.key, event.target.value)}
              />
            </label>
          ))}
        </div>

        <p className="faint">El registro se guarda solo en este navegador (localStorage).</p>
      </Card>

      <nav className="pager">
        {previous ? (
          <Link className="btn" to={paths.day(previous.id)}>
            ← {previous.weekday}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="btn" to={paths.day(next.id)}>
            {next.weekday} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {week ? (
        <Link className="link-arrow" to={paths.week(week.number)}>
          ← Volver a la semana {week.number}
        </Link>
      ) : null}
    </div>
  )
}
