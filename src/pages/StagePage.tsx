import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { WeekCard } from '../components/roadmap/WeekCard'
import { RichText } from '../components/ui/RichText'
import { EmptyState } from '../components/ui/EmptyState'
import { paths } from '../routes/paths'
import { useRoadmapSelectors } from '../hooks/useRoadmap'

export function StagePage() {
  const { stageId } = useParams()
  const { getStage } = useRoadmapSelectors()
  const stage = stageId ? getStage(stageId) : undefined

  if (!stage) {
    return (
      <div className="page">
        <EmptyState
          title="Etapa no encontrada"
          description="Esa etapa no existe en el roadmap."
          action={
            <Link className="btn" to={paths.roadmap}>
              Volver al roadmap
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page__head">
        <span className="eyebrow">
          Etapa {stage.number} · semanas {stage.weekFrom}–{stage.weekTo}
        </span>
        <h1 className="page__title">{stage.title}</h1>
        {stage.outcome ? <p className="muted page__lead">{stage.outcome}</p> : null}
      </header>

      {stage.note ? (
        <Card inset className="stage-note">
          <RichText raw={stage.note.raw} />
        </Card>
      ) : null}

      <section className="stack">
        {stage.weeks.map((week) => (
          <WeekCard key={week.id} week={week} stageTitle={stage.title} />
        ))}
      </section>

      {stage.evaluation ? (
        <Card className="stage-evaluation" accent>
          <span className="eyebrow">{stage.evaluation.title}</span>
          <p>
            <RichText raw={stage.evaluation.raw} />
          </p>
        </Card>
      ) : null}
    </div>
  )
}
