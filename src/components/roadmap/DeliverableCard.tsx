import { Card } from '../ui/Card'
import { Checkbox } from '../ui/Checkbox'
import { RichText } from '../ui/RichText'
import { Badge } from '../ui/Badge'
import type { Deliverable } from '../../db/types'
import { useProgress } from '../../hooks/useProgress'

interface DeliverableCardProps {
  deliverable: Deliverable
  weekId: string
  collapsible?: boolean
}

export function DeliverableCard({ deliverable, weekId }: DeliverableCardProps) {
  const { isStepDone, toggleStep } = useProgress()
  const stepsDone = deliverable.steps.filter((_, index) => isStepDone(weekId, index)).length

  return (
    <Card className="deliverable">
      <div className="row-between wrap">
        <div className="stack-sm">
          <span className="eyebrow">Entregable</span>
          <h3 className="deliverable__name">{deliverable.label}</h3>
        </div>
        <Badge variant={stepsDone === deliverable.steps.length ? 'solid' : 'soft'}>
          {stepsDone}/{deliverable.steps.length} pasos
        </Badge>
      </div>

      <div className="deliverable__why">
        {deliverable.why ? (
          <p>
            <span className="faint">Por qué · </span>
            <RichText raw={deliverable.why.raw} />
          </p>
        ) : null}
        {deliverable.impact ? (
          <p>
            <span className="faint">Impacto · </span>
            <RichText raw={deliverable.impact.raw} />
          </p>
        ) : null}
        {deliverable.reflects ? (
          <p>
            <span className="faint">Qué refleja · </span>
            <RichText raw={deliverable.reflects.raw} />
          </p>
        ) : null}
      </div>

      {deliverable.steps.length > 0 ? (
        <div className="stack-sm">
          <span className="eyebrow">Guía de armado</span>
          <ul className="steps">
            {deliverable.steps.map((step, index) => (
              <li key={step.raw} className="steps__item">
                <Checkbox
                  checked={isStepDone(weekId, index)}
                  onChange={() => toggleStep(weekId, index)}
                  label={`Paso ${index + 1} de la guía`}
                  title={isStepDone(weekId, index) ? 'Desmarcar paso' : 'Marcar paso como hecho'}
                />
                <span className={isStepDone(weekId, index) ? 'steps__text steps__text--done' : 'steps__text'}>
                  <RichText raw={step.raw} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  )
}
