import { cx } from '../../utils/cx'
import { elementOrigin } from '../../utils/origin'
import { useTheme } from '../../hooks/useTheme'
import type { ThemePreference } from '../../context/theme-context'

const OPTIONS: Array<{ value: ThemePreference; label: string; icon: string; title: string }> = [
  { value: 'light', label: 'Claro', icon: '☀', title: 'Tema claro' },
  { value: 'dark', label: 'Oscuro', icon: '☾', title: 'Tema oscuro' },
  { value: 'auto', label: 'Auto', icon: '◐', title: 'Seguir al sistema' },
]

export function ThemeSwitcher() {
  const { preference, setPreference } = useTheme()

  return (
    <div className="theme-switch" role="group" aria-label="Tema de la interfaz">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          aria-pressed={preference === option.value}
          className={cx(
            'theme-switch__option',
            preference === option.value && 'theme-switch__option--on',
          )}
          onClick={(event) => setPreference(option.value, elementOrigin(event.currentTarget))}
        >
          <span aria-hidden="true">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  )
}
