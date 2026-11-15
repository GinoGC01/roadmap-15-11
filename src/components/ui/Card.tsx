import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../utils/cx'

interface CardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
  accent?: boolean
  flat?: boolean
  inset?: boolean
  tight?: boolean
  style?: CSSProperties
}

export function Card({
  children,
  className,
  as: Tag = 'div',
  accent = false,
  flat = false,
  inset = false,
  tight = false,
  style,
}: CardProps) {
  return (
    <Tag
      className={cx(
        'card',
        flat && 'card--flat',
        inset && 'card--inset',
        tight && 'card--tight',
        accent && 'card--accent',
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}
