import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { Badge } from '../ui/Badge'
import type { Stage } from '../../db/types'
import { useStageProgress } from '../../hooks/useProgress'

interface StageCardProps {
  stage: Stage
}

export function StageCard({ stage }: StageCardProps) {
  const progress = useStageProgress(stage.id)

  return (
    <Card className="stage-card" accent>
      <div className="row-between wrap">
        <div className="stack-sm">
          <span className="eyebrow">
            Etapa {stage.number} · semanas {stage.weekFrom}–{stage.weekTo}
          </span>
          <h3 className="stage-card__title">{stage.title}</h3>
          {stage.outcome ? <p className="muted">{stage.outcome}</p> : null}
        </div>
        <Badge variant="solid">
          {progress.done}/{progress.total}
        </Badge>
      </div>

      <ProgressBar value={progress.percent} label={`Avance de ${stage.title}`} />

      <div className="row-between">
        <span className="faint">{progress.percent}% del avance de la etapa</span>
        <Link className="link-arrow" to={`/etapa/${stage.id}`}>
          Ver etapa →
        </Link>
      </div>
    </Card>
  )
}
