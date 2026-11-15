import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import type { Stage } from '../../db/types'
import { useStageProgress } from '../../hooks/useProgress'

interface StageProgressListProps {
  stages: Stage[]
}

export function StageProgressList({ stages }: StageProgressListProps) {
  return (
    <div className="stack">
      {stages.map((stage) => (
        <StageProgressRow key={stage.id} stage={stage} />
      ))}
    </div>
  )
}

function StageProgressRow({ stage }: { stage: Stage }) {
  const progress = useStageProgress(stage.id)

  return (
    <Card
      className="stage-row"
      style={{ '--accent': stage.color } as CSSProperties}
    >
      <div className="row-between wrap">
        <div className="row">
          <span className="stage-row__dot" style={{ background: stage.color }} aria-hidden="true" />
          <div className="stack-sm">
            <Link className="stage-row__title" to={`/etapa/${stage.id}`}>
              {stage.number}. {stage.title}
            </Link>
            <span className="faint">Semanas {stage.weekFrom}–{stage.weekTo}</span>
          </div>
        </div>
        <span className="stage-row__percent">{progress.percent}%</span>
      </div>
      <ProgressBar value={progress.percent} thin />
      <span className="faint">
        {progress.done} de {progress.total} jornadas
      </span>
    </Card>
  )
}
