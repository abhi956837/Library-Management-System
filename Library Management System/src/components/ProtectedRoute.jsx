import { nav } from '../data/mockData'

export default function ProtectedRoute({ auth, screen, children }) {
  if (!auth) {
    return null
  }

  const allowed = nav[auth.role]
  if (!allowed.includes(screen)) {
    return <div className="panel"><p>Access Denied</p></div>
  }

  return children
}
