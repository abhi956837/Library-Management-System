import { labels, nav } from '../data/mockData'

export default function Navbar({ auth, currentScreen, onNavigate, onLogout }) {
  if (!auth) return null

  const allowed = nav[auth.role]

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <p className="eyebrow">Library Management System</p>
        <h1>Control Panel</h1>
        <p className="intro-copy">Welcome, {auth.name}. Navigate between maintenance, transactions and reports.</p>
      </div>
      <nav className="nav-list">
        {allowed.map((key) => (
          <button
            key={key}
            type="button"
            className={currentScreen === key ? 'nav-link active' : 'nav-link'}
            onClick={() => onNavigate(key)}
          >
            {labels[key]}
          </button>
        ))}
      </nav>
      <button type="button" className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </aside>
  )
}
