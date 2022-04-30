import { BookPreview } from './book-preview.jsx'

export function BookList({ books, onSelectBook }) {
  return (
    <section className="book-list">
      {books.map((book) => (
        <BookPreview onSelectBook={onSelectBook} key={book.id} book={book} />
      ))}
    </section>
  )
}
