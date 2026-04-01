export default function BookTable({ books, selected, onSelect, columns }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {books.length ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.type}</td>
                {onSelect && (
                  <td>
                    <input
                      type="radio"
                      name="selectedBook"
                      checked={selected === String(book.id)}
                      onChange={() => onSelect(String(book.id))}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No books found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
