import { useEffect, useState } from 'react'

/**
 * Estado persistente en localStorage.
 *
 * `parse` permite corregir el formato guardado (por ejemplo, completar campos
 * faltantes de una versión vieja). Solo se usa al leer el valor inicial.
 */
export function usePersistentState<T>(
  key: string,
  fallback: T,
  parse?: (raw: string) => T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return fallback
      return parse ? parse(raw) : (JSON.parse(raw) as T)
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage puede estar bloqueado (modo privado): la app sigue funcionando en memoria.
    }
  }, [key, value])

  return [value, setValue]
}

/** Lee un valor de localStorage sin montar estado. */
export function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
