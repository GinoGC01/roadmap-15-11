import { Link, useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Checkbox } from '../components/ui/Checkbox'
import { RichText } from '../components/ui/RichText'
import { ResourceLinks } from '../components/roadmap/ResourceLinks'
import { ThreadBadge } from '../components/roadmap/ThreadBadge'
import { DeliverableCard } from '../components/roadmap/DeliverableCard'
import { EmptyState } from '../components/ui/EmptyState'
import { paths } from '../routes/paths'
import { useDayActions } from '../hooks/useDayActions'
import { useRoadmapSelectors } from '../hooks/useRoadmap'

export function WeekPage() {
  const { weekNumber } = useParams()
  const { isDayDone, markDone, markUndone } = useDayActions()
  const { getWeek, getStageOfWeek, weeks } = useRoadmapSelectors()
  const week = getWeek(Number(weekNumber))

  if (!week) {
    return (
      <div className="page">
        <EmptyState
          title="Semana no encontrada"
          description="El número de semana no existe en el roadmap."
          action={
            <Link className="btn" to={paths.roadmap}>
              Volver al roadmap
            </Link>
          }
        />
      </div>
    )
  }

  const stage = getStageOfWeek(week)
  const index = weeks.findIndex((item) => item.id === week.id)
  const previous = index > 0 ? weeks[index - 1] : null
  const next = index < weeks.length - 1 ? weeks[index + 1] : null

  return (
    <div className="page">
      <header className="page__head">
        <span className="eyebrow">
          {stage ? `Etapa ${stage.number} · ${stage.title}` : 'Semana'} · Semana {week.number}
        </span>
        <h1 className="page__title">{week.title}</h1>
        {week.objective ? (
          <p className="muted page__lead">
            <RichText raw={week.objective.raw} />
          </p>
        ) : null}
      </header>

      {week.deliverable ? (
        <DeliverableCard deliverable={week.deliverable} weekId={week.id} />
      ) : null}

      <section className="stack">
        {week.days.map((day) => {
          const done = isDayDone(day.id)
          return (
            <Card
              key={day.id}
              className={`day-card${done ? ' day-card--done' : ''}`}
              style={stage ? ({ '--accent': stage.color } as CSSProperties) : undefined}
            >
              <div className="day-card__head">
                <Checkbox
                  checked={done}
                  onChange={() =>
                    done
                      ? markUndone({ id: day.id, label: `${day.weekday} · Semana ${week.number}` })
                      : markDone({ id: day.id, label: `${day.weekday} · Semana ${week.number}` })
                  }
                  label={`Marcar ${day.weekday}`}
                  title={done ? 'Desmarcar jornada' : 'Marcar jornada como hecha'}
                />
                <strong className="day-card__weekday">{day.weekday}</strong>
                {day.threads.map((thread) => (
                  <ThreadBadge key={thread} threadId={thread} />
                ))}
                <Link className="btn btn--sm" to={paths.day(day.id)}>
                  Detalle
                </Link>
              </div>

              <div className="day-card__blocks">
                <div className="day-card__block">
                  <span className="eyebrow">Recurso ancla</span>
                  <p>
                    <RichText raw={day.anchor.raw} />
                  </p>
                  <ResourceLinks links={day.anchor.links} />
                </div>

                <div className="day-card__block">
                  <span className="eyebrow">Práctica</span>
                  <p>
                    <RichText raw={day.practice.raw} />
                  </p>
                  <ResourceLinks links={day.practice.links} />
                </div>

                <div className="day-card__block">
                  <span className="eyebrow">Desafío</span>
                  <p>
                    <RichText raw={day.challenge.raw} />
                  </p>
                  <ResourceLinks links={day.challenge.links} />
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      <nav className="pager">
        {previous ? (
          <Link className="btn" to={paths.week(previous.number)}>
            ← Semana {previous.number}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="btn" to={paths.week(next.number)}>
            Semana {next.number} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {stage ? (
        <div className="row wrap">
          <Badge variant="muted">Etapa {stage.number}</Badge>
          <Link className="link-arrow" to={paths.stage(stage.id)}>
            Ver la etapa completa →
          </Link>
        </div>
      ) : null}
    </div>
  )
}
