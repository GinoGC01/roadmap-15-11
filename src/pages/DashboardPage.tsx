import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { ProgressRing } from '../components/ui/ProgressRing'
import { ContinueCard } from '../components/dashboard/ContinueCard'
import { StatsGrid } from '../components/dashboard/StatsGrid'
import { StageProgressList } from '../components/dashboard/StageProgressList'
import { Section } from '../components/ui/Section'
import { RichText } from '../components/ui/RichText'
import { useProgressStats } from '../hooks/useProgress'
import { useRoadmap, useRoadmapSelectors } from '../hooks/useRoadmap'
import { APP_NAME, APP_TAGLINE } from '../config/app'

export function DashboardPage() {
  const stats = useProgressStats()
  const { stages } = useRoadmapSelectors()
  const { roadmap } = useRoadmap()

  if (!roadmap) return null

  return (
    <div className="page">
      <header className="page__head">
        <span className="eyebrow">
          {APP_NAME} · {APP_TAGLINE}
        </span>
        <h1 className="page__title">Tu recorrido</h1>
        <p className="muted page__lead">{roadmap.meta.profile}</p>
      </header>

      <div className="dashboard">
        <div className="stack dashboard__main">
          <ContinueCard />
          <StatsGrid />
        </div>

        <Card className="dashboard__ring">
          <ProgressRing value={stats.percent} size={150} thickness={14}>
            <strong className="ring__value">{stats.percent}%</strong>
            <span className="faint">avance</span>
          </ProgressRing>
          <div className="stack-sm center">
            <span className="faint">
              {stats.completed} de {stats.total} jornadas
            </span>
            <span className="faint">
              {stats.hoursDone} h de {stats.hoursTotal} h
            </span>
            <Link className="link-arrow" to="/roadmap">
              Ver roadmap →
            </Link>
          </div>
        </Card>
      </div>

      <Section title="Avance por etapa" eyebrow="Roadmap">
        <StageProgressList stages={stages} />
      </Section>

      <Section title="Cómo es cada jornada" eyebrow="Ritmo" className="page__section">
        <div className="journey">
          {roadmap.meta.journey.map((block) => (
            <Card key={block.block} className="journey__card">
              <span className="eyebrow">{block.time}</span>
              <strong>{block.block}</strong>
              <p className="muted">
                <RichText raw={block.description.raw} />
              </p>
            </Card>
          ))}
        </div>

        <Card inset className="rules">
          <span className="eyebrow">Reglas</span>
          <ul className="rules__list">
            {roadmap.meta.rules.map((rule) => (
              <li key={rule.raw}>
                <RichText raw={rule.raw} />
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </div>
  )
}
