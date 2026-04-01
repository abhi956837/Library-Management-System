import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { validateAddBook } from '../../utils/validation'

export default function UpdateBook({ books, updateBook, setUpdateBook, msg, show, clear, onLoadBook, onSubmit }) {
  const handleLoadBook = () => {
    if (!updateBook.lookupSerialNo.trim()) return show('error', 'Enter serial number before lookup.')
    const record = books.find((b) => b.serialNo === updateBook.lookupSerialNo.trim())
    if (!record) return show('error', 'Book or movie not found.')
    setUpdateBook({ lookupSerialNo: record.serialNo, type: record.type, title: record.title, author: record.author, serialNo: record.serialNo, category: record.category, available: record.available ? 'yes' : 'no' })
    clear()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateAddBook(updateBook.title, updateBook.author, updateBook.serialNo, updateBook.category)
    if (error) {
      return show('error', error)
    }
    onSubmit(updateBook)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>Update Book</h2>
        </div>
      </div>
      <div className="inline-tools">
        <FormField label="Serial Number">
          <input type="text" value={updateBook.lookupSerialNo} onChange={(e) => setUpdateBook((v) => ({ ...v, lookupSerialNo: e.target.value }))} />
        </FormField>
        <button type="button" onClick={handleLoadBook}>
          Load Item
        </button>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <fieldset className="field field-full radio-group">
          <legend>Type</legend>
          {['book', 'movie'].map((o) => (
            <label key={o}>
              <input type="radio" name="updateBookType" checked={updateBook.type === o} onChange={() => setUpdateBook((v) => ({ ...v, type: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <FormField label="Title">
          <input type="text" value={updateBook.title} onChange={(e) => setUpdateBook((v) => ({ ...v, title: e.target.value }))} />
        </FormField>
        <FormField label="Author / Director">
          <input type="text" value={updateBook.author} onChange={(e) => setUpdateBook((v) => ({ ...v, author: e.target.value }))} />
        </FormField>
        <FormField label="Serial Number">
          <input type="text" value={updateBook.serialNo} onChange={(e) => setUpdateBook((v) => ({ ...v, serialNo: e.target.value }))} />
        </FormField>
        <FormField label="Category">
          <input type="text" value={updateBook.category} onChange={(e) => setUpdateBook((v) => ({ ...v, category: e.target.value }))} />
        </FormField>
        <fieldset className="field field-full radio-group">
          <legend>Available</legend>
          {['yes', 'no'].map((o) => (
            <label key={o}>
              <input type="radio" name="availability" checked={updateBook.available === o} onChange={() => setUpdateBook((v) => ({ ...v, available: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <div className="actions field-full">
          <button type="submit">Update Item</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
