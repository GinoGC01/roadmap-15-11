import type { ThemeOrigin } from '../context/theme-context'

/**
 * Centro de un elemento en porcentajes del viewport.
 * Se usa como punto de partida del revelado circular al cambiar de tema.
 */
export function elementOrigin(element: Element): ThemeOrigin {
  const rect = element.getBoundingClientRect()
  return {
    x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
    y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
  }
}
