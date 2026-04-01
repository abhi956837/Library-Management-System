import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'

export default function FinePay({ fine, setFine, msg, show, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fine.transactionId) return show('error', 'Select a valid return transaction before confirming fine payment.')
    if (fine.fineAmount > 0 && !fine.finePaid) return show('error', 'Select the Fine Paid checkbox before completing a pending fine transaction.')
    onSubmit()
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Fine Pay</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <FormField label="Book Name">
          <input type="text" value={fine.title} readOnly />
        </FormField>
        <FormField label="Member Name">
          <input type="text" value={fine.memberName} readOnly />
        </FormField>
        <FormField label="Issue Date">
          <input type="date" value={fine.issueDate} readOnly />
        </FormField>
        <FormField label="Due Date">
          <input type="date" value={fine.dueDate} readOnly />
        </FormField>
        <FormField label="Actual Return Date">
          <input type="date" value={fine.actualReturnDate} readOnly />
        </FormField>
        <FormField label="Fine Amount">
          <input type="text" value={`Rs. ${fine.fineAmount}`} readOnly />
        </FormField>
        <label className="checkbox-field field-full">
          <input type="checkbox" checked={fine.finePaid} onChange={(e) => setFine((v) => ({ ...v, finePaid: e.target.checked }))} />
          <span>Fine Paid</span>
        </label>
        <FormField label="Remarks" full>
          <textarea rows="3" value={fine.remarks} onChange={(e) => setFine((v) => ({ ...v, remarks: e.target.value }))} placeholder="Optional remarks" />
        </FormField>
        <div className="actions field-full">
          <button type="submit">Complete Transaction</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
