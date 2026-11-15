import { Badge } from '../ui/Badge'
import { getThread } from '../../db'

interface ThreadBadgeProps {
  threadId: string
}

export function ThreadBadge({ threadId }: ThreadBadgeProps) {
  const thread = getThread(threadId)
  const short =
    threadId === 'sql'
      ? 'SQL'
      : threadId.startsWith('proyecto')
        ? 'Proyecto'
        : threadId === 'testing'
          ? 'Testing'
          : threadId === 'redes'
            ? 'Redes'
            : (thread?.name ?? threadId)

  return (
    <Badge variant="outline" title={thread?.description.text ?? threadId}>
      {short}
    </Badge>
  )
}
