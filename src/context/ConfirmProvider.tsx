import { useCallback, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ConfirmContext } from './confirm-context'
import type { ConfirmOptions } from './confirm-context'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'

interface ConfirmProviderProps {
  children: ReactNode
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolver = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback(
    (next: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        resolver.current = resolve
        setOptions(next)
      }),
    [],
  )

  const onResolve = useCallback((value: boolean) => {
    resolver.current?.(value)
    resolver.current = null
    setOptions(null)
  }, [])

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog options={options} onResolve={onResolve} />
    </ConfirmContext.Provider>
  )
}
