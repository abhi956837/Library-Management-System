import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { validateReturnBook } from '../../utils/validation'

export default function ReturnBook({ transactions, ret, setRet, msg, show, onSubmit }) {
  const issued = transactions.filter((t) => t.status === 'Issued')

  const handleSelectReturn = (transactionId) => {
    const tx = transactions.find((t) => String(t.id) === transactionId)
    if (!tx) return
    setRet({ transactionId: String(tx.id), bookName: tx.title, author: tx.author || '', serialNo: tx.serialNo || '', memberName: tx.member || '', issueDate: tx.issueDate, returnDate: tx.returnDate })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateReturnBook(ret.transactionId, ret.bookName, ret.serialNo, ret.issueDate, ret.returnDate)
    if (error) {
      return show('error', error)
    }
    const tx = transactions.find((t) => String(t.id) === ret.transactionId)
    if (!tx) return show('error', 'Select a valid return transaction.')
    onSubmit(tx)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Return Book</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <FormField label="Name of Book">
          <select value={ret.transactionId} onChange={(e) => handleSelectReturn(e.target.value)}>
            <option value="">Select issued book</option>
            {issued.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Author Name">
          <input type="text" value={ret.author} readOnly />
        </FormField>
        <FormField label="Serial No of Book">
          <input type="text" value={ret.serialNo} readOnly />
        </FormField>
        <FormField label="Issue Date">
          <input type="date" value={ret.issueDate} readOnly />
        </FormField>
        <FormField label="Return Date">
          <input type="date" value={ret.returnDate} onChange={(e) => setRet((v) => ({ ...v, returnDate: e.target.value }))} />
        </FormField>
        <FormField label="Member Name">
          <input type="text" value={ret.memberName} readOnly />
        </FormField>
        <div className="actions field-full">
          <button type="submit">Confirm Return</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
