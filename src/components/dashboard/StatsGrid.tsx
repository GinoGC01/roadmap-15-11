import { StatCard } from '../ui/StatCard'
import { useProgressStats } from '../../hooks/useProgress'

export function StatsGrid() {
  const stats = useProgressStats()

  return (
    <div className="stats-grid">
      <StatCard label="Avance global" value={`${stats.percent}%`} hint={`${stats.completed} de ${stats.total} jornadas`} accent />
      <StatCard label="Horas estimadas" value={`${stats.hoursDone} h`} hint={`sobre ${stats.hoursTotal} h del plan`} />
      <StatCard
        label="Guía de armado"
        value={`${stats.stepsDone}/${stats.stepsTotal}`}
        hint="pasos completados"
      />
      <StatCard
        label="Semana actual"
        value={stats.nextPendingWeek ? `Sem ${stats.nextPendingWeek.number}` : '—'}
        hint={stats.nextPendingWeek ? stats.nextPendingWeek.title : 'roadmap terminado'}
      />
    </div>
  )
}
