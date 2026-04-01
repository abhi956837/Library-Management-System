import { fmt } from '../../utils/date'

export default function Reports({ transactions }) {
  const returned = transactions.filter((t) => t.status === 'Returned').length
  const pendingFines = transactions.filter((t) => t.status === 'Returned' && t.fineAmount > 0).length

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Reports</p>
          <h2>Library Reports</h2>
        </div>
      </div>
      <div className="stats-grid compact">
        <article className="stat-card">
          <span>Returned Books</span>
          <strong>{returned}</strong>
        </article>
        <article className="stat-card">
          <span>Pending Fines</span>
          <strong>{pendingFines}</strong>
        </article>
        <article className="stat-card">
          <span>Active Members</span>
          <strong>{transactions.filter((t) => t.status === 'Issued').length}</strong>
        </article>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Member</th>
              <th>Issue Date</th>
              <th>Due / Return</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.type}</td>
                <td>{t.title}</td>
                <td>{t.member}</td>
                <td>{fmt(t.issueDate)}</td>
                <td>{fmt(t.actualReturnDate || t.returnDate)}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
