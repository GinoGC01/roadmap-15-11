import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { Badge } from '../ui/Badge'
import { RichText } from '../ui/RichText'
import type { Week } from '../../db/types'
import { useWeekProgress } from '../../hooks/useProgress'

interface WeekCardProps {
  week: Week
  stageTitle?: string
}

export function WeekCard({ week, stageTitle }: WeekCardProps) {
  const progress = useWeekProgress(week.id)

  return (
    <Card className="week-card">
      <div className="row-between wrap">
        <div className="stack-sm">
          <span className="eyebrow">
            Semana {week.number}
            {stageTitle ? ` · ${stageTitle}` : ''}
          </span>
          <h3 className="week-card__title">{week.title}</h3>
          {week.objective ? (
            <p className="muted week-card__objective">
              <RichText raw={week.objective.raw} />
            </p>
          ) : null}
        </div>
        <Badge variant={progress.done === progress.total ? 'solid' : 'soft'}>
          {progress.done}/{progress.total}
        </Badge>
      </div>

      {week.deliverable ? (
        <div className="week-card__deliverable">
          <span className="faint">Entregable</span>
          <strong>{week.deliverable.label}</strong>
        </div>
      ) : null}

      <ProgressBar value={progress.percent} thin label={`Avance de la semana ${week.number}`} />

      <div className="row-between">
        <span className="faint">{progress.percent}% de las jornadas</span>
        <Link className="link-arrow" to={`/semana/${week.number}`}>
          Abrir semana →
        </Link>
      </div>
    </Card>
  )
}
