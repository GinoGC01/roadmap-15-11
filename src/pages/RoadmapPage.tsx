import { useMemo, useState } from 'react'
import { Card } from '../components/ui/Card'
import { WeekBlock } from '../components/roadmap/WeekBlock'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'
import { useProgress, useProgressStats } from '../hooks/useProgress'
import { useRoadmapSelectors } from '../hooks/useRoadmap'

export function RoadmapPage() {
  const { stages } = useRoadmapSelectors()
  const { isDayDone } = useProgress()
  const stats = useProgressStats()
  const [query, setQuery] = useState('')
  const [onlyPending, setOnlyPending] = useState(false)

  const term = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      stages
        .map((stage) => {
          const weeks = stage.weeks
            .map((week) => {
              const days = week.days.filter((day) => {
                if (onlyPending && isDayDone(day.id)) return false
                if (!term) return true
                return (
                  week.title.toLowerCase().includes(term) ||
                  stage.title.toLowerCase().includes(term) ||
                  (week.deliverable?.label.toLowerCase().includes(term) ?? false) ||
                  day.anchor.text.toLowerCase().includes(term) ||
                  day.practice.text.toLowerCase().includes(term) ||
                  day.challenge.text.toLowerCase().includes(term)
                )
              })
              return { week, days }
            })
            .filter((entry) => entry.days.length > 0)
          return { stage, weeks }
        })
        .filter((entry) => entry.weeks.length > 0),
    [stages, term, onlyPending, isDayDone],
  )

  const currentWeekId = stats.nextPendingWeek?.id

  return (
    <div className="page">
      <header className="page__head">
        <span className="eyebrow">Roadmap completo</span>
        <h1 className="page__title">7 etapas · 28 semanas · 140 jornadas</h1>
        <p className="muted page__lead">
          Marcá cada jornada a medida que la hagas. El avance se guarda en este navegador.
        </p>
      </header>

      <Card className="filters" flat>
        <input
          className="input"
          type="search"
          value={query}
          placeholder="Filtrar por semana, entregable o texto…"
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Filtrar el roadmap"
        />
        <Button
          variant={onlyPending ? 'primary' : 'default'}
          size="sm"
          onClick={() => setOnlyPending((value) => !value)}
        >
          {onlyPending ? 'Solo pendientes' : 'Mostrar todo'}
        </Button>
        <span className="faint">
          {stats.completed}/{stats.total} jornadas hechas
        </span>
        <ProgressBar value={stats.percent} thin />
      </Card>

      {visible.length === 0 ? (
        <Card inset className="center">
          <p className="muted">Ninguna jornada coincide con el filtro.</p>
        </Card>
      ) : (
        <div className="stack roadmap">
          {visible.map(({ stage, weeks }) => (
            <section key={stage.id} className="roadmap__stage">
              <header className="roadmap__stage-head">
                <span className="roadmap__dot" style={{ background: stage.color }} aria-hidden="true" />
                <div className="stack-sm">
                  <span className="eyebrow">
                    Etapa {stage.number} · semanas {stage.weekFrom}–{stage.weekTo}
                  </span>
                  <h2 className="roadmap__stage-title">{stage.title}</h2>
                </div>
              </header>

              <div className="stack">
                {weeks.map(({ week }) => (
                  <WeekBlock
                    key={week.id}
                    week={week}
                    stage={stage}
                    defaultOpen={week.id === currentWeekId}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
