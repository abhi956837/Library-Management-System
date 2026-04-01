import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { today, plusDays } from '../../utils/date'
import { validateBookIssue } from '../../utils/validation'

export default function BookIssue({ books, memberships, issue, setIssue, msg, show, onSubmit }) {
  const availableBooks = books.filter((b) => b.available)
  const members = memberships.filter((m) => m.status === 'Active').map((m) => m.name)

  const handleSelectBook = (bookId) => {
    const book = books.find((b) => String(b.id) === bookId)
    setIssue((v) => ({ ...v, bookId, author: book?.author || '', returnDate: plusDays(v.issueDate || today(), 15) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateBookIssue(issue.bookId, issue.memberName, issue.issueDate, issue.returnDate, today(), issue.issueDate)
    if (error) {
      return show('error', error)
    }
    const book = books.find((b) => String(b.id) === issue.bookId)
    if (!book) return show('error', 'Select a valid book name.')
    onSubmit(book)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Book Issue</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <FormField label="Name of Book">
          <select value={issue.bookId} onChange={(e) => handleSelectBook(e.target.value)}>
            <option value="">Select book</option>
            {availableBooks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Name of Author">
          <input type="text" value={issue.author} readOnly />
        </FormField>
        <FormField label="Member Name">
          <select value={issue.memberName} onChange={(e) => setIssue((v) => ({ ...v, memberName: e.target.value }))}>
            <option value="">Select member</option>
            {members.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Issue Date">
          <input
            type="date"
            min={today()}
            value={issue.issueDate}
            onChange={(e) => setIssue((v) => ({ ...v, issueDate: e.target.value, returnDate: plusDays(e.target.value, 15) }))}
          />
        </FormField>
        <FormField label="Return Date">
          <input
            type="date"
            min={issue.issueDate}
            max={plusDays(issue.issueDate, 15)}
            value={issue.returnDate}
            onChange={(e) => setIssue((v) => ({ ...v, returnDate: e.target.value }))}
          />
        </FormField>
        <FormField label="Remarks" full>
          <textarea
            rows="3"
            value={issue.remarks}
            onChange={(e) => setIssue((v) => ({ ...v, remarks: e.target.value }))}
            placeholder="Optional remarks"
          />
        </FormField>
        <div className="actions field-full">
          <button type="submit">Issue Book</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
