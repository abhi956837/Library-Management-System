import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import { validateAddBook } from '../../utils/validation'

export default function AddBook({ addBook, setAddBook, msg, show, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validateAddBook(addBook.title, addBook.author, addBook.serialNo, addBook.category)
    if (error) {
      return show('error', error)
    }
    onSubmit(addBook)
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>Add Book</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSubmit}>
        <fieldset className="field field-full radio-group">
          <legend>Type</legend>
          {['book', 'movie'].map((o) => (
            <label key={o}>
              <input type="radio" name="addBookType" checked={addBook.type === o} onChange={() => setAddBook((v) => ({ ...v, type: o }))} />
              <span>{o}</span>
            </label>
          ))}
        </fieldset>
        <FormField label="Title">
          <input type="text" value={addBook.title} onChange={(e) => setAddBook((v) => ({ ...v, title: e.target.value }))} />
        </FormField>
        <FormField label="Author / Director">
          <input type="text" value={addBook.author} onChange={(e) => setAddBook((v) => ({ ...v, author: e.target.value }))} />
        </FormField>
        <FormField label="Serial Number">
          <input type="text" value={addBook.serialNo} onChange={(e) => setAddBook((v) => ({ ...v, serialNo: e.target.value }))} />
        </FormField>
        <FormField label="Category">
          <input type="text" value={addBook.category} onChange={(e) => setAddBook((v) => ({ ...v, category: e.target.value }))} />
        </FormField>
        <div className="actions field-full">
          <button type="submit">Add Item</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
    </section>
  )
}
