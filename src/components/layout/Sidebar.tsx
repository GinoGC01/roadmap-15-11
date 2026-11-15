import { NavLink } from 'react-router-dom'
import { paths } from '../../routes/paths'
import { useRoadmapSelectors } from '../../hooks/useRoadmap'
import { ThemeSwitcher } from './ThemeSwitcher'
import { APP_NAME, APP_TAGLINE } from '../../config/app'

interface SidebarProps {
  open: boolean
  onNavigate?: () => void
}

export function Sidebar({ open, onNavigate }: SidebarProps) {
  const { stages } = useRoadmapSelectors()

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          C+
        </span>
        <div className="stack-sm">
          <strong>{APP_NAME}</strong>
          <span className="faint">{APP_TAGLINE}</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to={paths.home}
          end
          onClick={onNavigate}
          className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
        >
          <span aria-hidden="true">◈</span> Inicio
        </NavLink>
        <NavLink
          to={paths.roadmap}
          onClick={onNavigate}
          className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
        >
          <span aria-hidden="true">≡</span> Roadmap
        </NavLink>

        <span className="eyebrow sidebar__section">Etapas</span>
        {stages.map((stage) => (
          <NavLink
            key={stage.id}
            to={paths.stage(stage.id)}
            onClick={onNavigate}
            className={({ isActive }) => `sidebar__link sidebar__link--stage${isActive ? ' sidebar__link--active' : ''}`}
          >
            <span className="sidebar__dot" style={{ background: stage.color }} aria-hidden="true" />
            <span className="sidebar__link-text">
              {stage.number}. {stage.title}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__foot">
        <div className="sidebar__theme">
          <span className="eyebrow">Tema</span>
          <ThemeSwitcher />
        </div>
        <p className="faint">
          Fuente de verdad: <code>src/db/roadmap.json</code>
        </p>
      </div>
    </aside>
  )
}
