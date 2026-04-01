import FormField from '../../components/FormField'
import ErrorMessage from '../../components/ErrorMessage'
import BookTable from '../../components/BookTable'
import { validateBookSearch } from '../../utils/validation'

export default function BookAvailable({ books, search, setSearch, results, setResults, msg, show, clear }) {
  const categories = [...new Set(books.map((b) => b.category))].sort()
  const availableBooks = books.filter((b) => b.available)

  const handleSearch = (e) => {
    e.preventDefault()
    const error = validateBookSearch(search.title, search.category)
    if (error) {
      return show('error', error)
    }
    setResults(
      availableBooks.filter((b) => b.title.toLowerCase().includes(search.title.trim().toLowerCase()) && (!search.category || b.category === search.category)),
    )
    clear()
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Transactions</p>
          <h2>Book Available</h2>
        </div>
      </div>
      <form className="form-grid" onSubmit={handleSearch}>
        <FormField label="Book Name">
          <input
            type="text"
            value={search.title}
            onChange={(e) => setSearch((v) => ({ ...v, title: e.target.value }))}
            placeholder="Search by title"
          />
        </FormField>
        <FormField label="Category">
          <select value={search.category} onChange={(e) => setSearch((v) => ({ ...v, category: e.target.value }))}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>
        <div className="actions">
          <button type="submit">Search</button>
        </div>
      </form>
      <ErrorMessage msg={msg} />
      <BookTable books={results} selected={search.selectedBookId} onSelect={(id) => setSearch((v) => ({ ...v, selectedBookId: id }))} columns={['Title', 'Author', 'Category', 'Type', 'Select']} />
    </section>
  )
}
