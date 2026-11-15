import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { cx } from '../../utils/cx'

const TOKEN_RE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g
const LINK_RE = /^\[([^\]]+)\]\(([^)\s]+)\)$/

/** Renderiza el markdown inline del roadmap (negrita, código y links). */
export function RichText({ raw, className }: { raw: string; className?: string }) {
  const nodes = useMemo(() => parseInline(raw), [raw])
  return <span className={cx('rich', className)}>{nodes}</span>
}

function parseInline(raw: string): ReactNode[] {
  const parts = raw.split(TOKEN_RE).filter((part) => part !== undefined && part !== '')

  return parts.map((part, index) => {
    const key = `${index}-${part.slice(0, 8)}`

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={key}>{part.slice(1, -1)}</code>
    }

    const link = LINK_RE.exec(part)
    if (link) {
      return (
        <a key={key} href={link[2]} target="_blank" rel="noreferrer noopener">
          {link[1]}
        </a>
      )
    }

    return <span key={key}>{part}</span>
  })
}
