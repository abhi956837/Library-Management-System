export default function DashboardPage({ auth, books, memberships, transactions }) {
  const availableBooks = books.filter((b) => b.available).length
  const issued = transactions.filter((t) => t.status === 'Issued').length

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Library dashboard</h2>
        </div>
        <span className="status-badge">{auth?.role?.toUpperCase() || 'GUEST'}</span>
      </div>
      <div className="stats-grid">
        <article className="stat-card">
          <span>Total Books</span>
          <strong>{books.length}</strong>
        </article>
        <article className="stat-card">
          <span>Available</span>
          <strong>{availableBooks}</strong>
        </article>
        <article className="stat-card">
          <span>Issued</span>
          <strong>{issued}</strong>
        </article>
        <article className="stat-card">
          <span>Members</span>
          <strong>{memberships.length}</strong>
        </article>
      </div>
      <div className="dashboard-grid">
        <article className="panel-card">
          <h3>Access rules</h3>
          <ul className="plain-list">
            <li>Admin can access maintenance, reports and transactions.</li>
            <li>User can access reports and transactions, but not maintenance.</li>
            <li>Passwords stay hidden on the login page.</li>
          </ul>
        </article>
        <article className="panel-card">
          <h3>Validation highlights</h3>
          <ul className="plain-list">
            <li>Book Available requires at least one search input.</li>
            <li>Book Issue prevents issue dates earlier than today.</li>
            <li>Fine Pay requires Fine Paid for pending fines.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
