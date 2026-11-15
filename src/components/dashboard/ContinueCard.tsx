import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { RichText } from '../ui/RichText'
import { Badge } from '../ui/Badge'
import { ResourceLinks } from '../roadmap/ResourceLinks'
import { useProgressStats } from '../../hooks/useProgress'
import { useDayActions } from '../../hooks/useDayActions'

export function ContinueCard() {
  const { markDone } = useDayActions()
  const { nextPendingDay, nextPendingWeek } = useProgressStats()

  if (!nextPendingDay || !nextPendingWeek) {
    return (
      <Card className="continue">
        <span className="eyebrow">Siguiente paso</span>
        <h3 className="continue__title">Roadmap completo 🎉</h3>
        <p className="muted">No quedan jornadas pendientes. Revisá los entregables y defendé el proyecto.</p>
      </Card>
    )
  }

  return (
    <Card className="continue" accent>
      <div className="row-between wrap">
        <span className="eyebrow">Seguir con</span>
        <Badge variant="outline">Semana {nextPendingWeek.number}</Badge>
      </div>

      <h3 className="continue__title">
        {nextPendingWeek.title} · {nextPendingDay.weekday}
      </h3>

      <p className="continue__text">
        <RichText raw={nextPendingDay.anchor.raw} />
      </p>
      <ResourceLinks links={nextPendingDay.anchor.links} />

      <div className="row wrap">
        <Link className="btn btn--primary" to={`/dia/${nextPendingDay.id}`}>
          Abrir jornada
        </Link>
        <Button
          onClick={() =>
            markDone({ id: nextPendingDay.id, label: `${nextPendingDay.weekday} · Semana ${nextPendingWeek.number}` })
          }
        >
          Marcar como hecha
        </Button>
      </div>
    </Card>
  )
}
