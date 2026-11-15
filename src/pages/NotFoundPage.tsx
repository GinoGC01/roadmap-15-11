import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui/EmptyState'
import { paths } from '../routes/paths'

export function NotFoundPage() {
  return (
    <div className="page">
      <EmptyState
        title="404 · página inexistente"
        description="El enlace no apunta a ninguna parte del roadmap."
        action={
          <Link className="btn btn--primary" to={paths.home}>
            Volver al inicio
          </Link>
        }
      />
    </div>
  )
}
