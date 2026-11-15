import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ThemeContext, THEME_STORAGE_KEY } from './theme-context'
import type { ThemeName, ThemeOrigin, ThemePreference } from './theme-context'
import { usePersistentState } from '../hooks/useLocalStorage'

interface ThemeProviderProps {
  children: ReactNode
}

const DARK_QUERY = '(prefers-color-scheme: dark)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function systemTheme(): ThemeName {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // `null` = sin preferencia explícita → se sigue al tema del sistema.
  const [preference, setPreferenceState] = usePersistentState<ThemePreference | null>(
    THEME_STORAGE_KEY,
    null,
  )
  const [system, setSystem] = useState<ThemeName>(systemTheme)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystem(event.matches ? 'dark' : 'light')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const theme: ThemeName = preference === 'auto' || preference === null ? system : preference

  // Mantiene el DOM sincronizado (montaje y cambios del sistema).
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setPreference = useCallback(
    (next: ThemePreference, origin?: ThemeOrigin) => {
      const nextTheme = next === 'auto' ? system : next

      const commit = () => {
        applyTheme(nextTheme)
        setPreferenceState(next)
      }

      // Sin cambio real o sin soporte: se aplica directo.
      if (nextTheme === theme || !document.startViewTransition || prefersReducedMotion()) {
        commit()
        return
      }

      // Revelado circular desde el control que se pulsó (transición nativa).
      const root = document.documentElement
      root.dataset.vtTheme = 'on'
      root.style.setProperty('--vt-x', `${origin?.x ?? 92}%`)
      root.style.setProperty('--vt-y', `${origin?.y ?? 4}%`)
      try {
        const transition = document.startViewTransition(() => {
          flushSync(commit)
        })
        transition.finished.finally(() => {
          delete root.dataset.vtTheme
        })
      } catch {
        delete root.dataset.vtTheme
        commit()
      }
    },
    [system, theme, setPreferenceState],
  )

  const setTheme = useCallback(
    (next: ThemeName, origin?: ThemeOrigin) => setPreference(next, origin),
    [setPreference],
  )

  const toggleTheme = useCallback(
    (origin?: ThemeOrigin) => setPreference(theme === 'dark' ? 'light' : 'dark', origin),
    [theme, setPreference],
  )

  const value = useMemo(
    () => ({ theme, preference: preference ?? 'auto', setPreference, setTheme, toggleTheme }),
    [theme, preference, setPreference, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
