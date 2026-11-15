import { Button } from '../ui/Button'
import { SearchBox } from './SearchBox'
import { elementOrigin } from '../../utils/origin'
import { useTheme } from '../../hooks/useTheme'

interface TopbarProps {
  onMenu: () => void
}

export function Topbar({ onMenu }: TopbarProps) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'claro' : 'oscuro'

  return (
    <header className="topbar">
      <Button className="topbar__menu" variant="ghost" size="sm" onClick={onMenu} aria-label="Abrir menú">
        ☰
      </Button>

      <SearchBox />

      <Button
        variant="ghost"
        size="sm"
        onClick={(event) => toggleTheme(elementOrigin(event.currentTarget))}
        title={`Cambiar a tema ${next}`}
        aria-label={`Cambiar a tema ${next}`}
      >
        {theme === 'dark' ? '☾' : '☀'}
      </Button>
    </header>
  )
}
