import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'

interface BadgeProps {
  children: ReactNode
  variant?: 'soft' | 'solid' | 'outline' | 'muted'
  className?: string
  title?: string
}

export function Badge({ children, variant = 'soft', className, title }: BadgeProps) {
  return (
    <span
      title={title}
      className={cx(
        'badge',
        variant === 'solid' && 'badge--solid',
        variant === 'outline' && 'badge--outline',
        variant === 'muted' && 'badge--muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
