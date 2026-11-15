import type { ResourceLink as LinkData } from '../../db/types'

interface ResourceLinksProps {
  links: LinkData[]
}

export function ResourceLinks({ links }: ResourceLinksProps) {
  if (links.length === 0) return null

  return (
    <div className="row wrap resource-links">
      {links.map((link) => (
        <a
          key={link.url}
          className="resource-chip"
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link.label} ↗
        </a>
      ))}
    </div>
  )
}
