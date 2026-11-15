import { createContext } from 'react'

export type ThemeName = 'light' | 'dark'
export type ThemePreference = ThemeName | 'auto'

/** Punto de origen del revelado, en porcentajes del viewport (0-100). */
export interface ThemeOrigin {
  x: number
  y: number
}

export interface ThemeContextValue {
  /** Tema efectivo que se está mostrando. */
  theme: ThemeName
  /** Preferencia del usuario: claro, oscuro o seguir al sistema. */
  preference: ThemePreference
  setPreference: (preference: ThemePreference, origin?: ThemeOrigin) => void
  setTheme: (theme: ThemeName, origin?: ThemeOrigin) => void
  toggleTheme: (origin?: ThemeOrigin) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const THEME_STORAGE_KEY = 'roadmap-ai:theme'
