import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost'
  size?: 'md' | 'sm'
  round?: boolean
  children?: ReactNode
}

export function Button({
  variant = 'default',
  size = 'md',
  round = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'btn',
        variant === 'primary' && 'btn--primary',
        variant === 'ghost' && 'btn--ghost',
        size === 'sm' && 'btn--sm',
        round && 'btn--icon',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
