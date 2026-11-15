import { useState } from 'react'
import { ViewTransition } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="shell">
      <div
        className={`shell__overlay${menuOpen ? ' shell__overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <div className="shell__main">
        <Topbar onMenu={() => setMenuOpen((value) => !value)} />
        <main className="shell__content">
          <ViewTransition name="page">
            <div key={location.pathname} className="page-transition">
              <Outlet />
            </div>
          </ViewTransition>
        </main>
      </div>
    </div>
  )
}
