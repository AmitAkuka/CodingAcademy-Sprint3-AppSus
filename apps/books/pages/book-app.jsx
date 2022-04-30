import { bookService } from '../services/books.service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookModal } from '../cmps/book-modal.jsx'
import { AppHeader } from '../../../cmps/app-header.jsx'
const { Link } = ReactRouterDOM

export class BookApp extends React.Component {
  state = {
    books: [],
    filter: null,
    selectedBook: null,
  }

  componentDidMount() {
    this.loadBooks()
  }

  loadBooks = () => {
    bookService
      .query(this.state.filter)
      .then((books) => this.setState({ books }))
  }

  onSelectBook = (id) => {
    bookService
      .getById(id)
      .then(({ book: selectedBook }) => this.setState({ selectedBook }))
  }

  onSetFilter = (filter) => {
    this.setState({ filter }, () => {
      this.loadBooks()
    })
  }

  onDeselectBook = () => {
    this.setState({ selectedBook: null })
  }

  render() {
    const { books, selectedBook } = this.state

    return (
      <React.Fragment>
        <AppHeader />
        <section
          className={`books-display main-content ${
            this.state.selectedBook ? 'modal-open' : ''
          }`}
        >
          <div className="page-title">
            <h2>Books</h2>
            <Link to="/book-app/add-book">Add book</Link>
          </div>
          <BookFilter onSetFilter={this.onSetFilter} />
          <BookList
            books={books}
            onSelectBook={this.onSelectBook}
            selectedBook={selectedBook}
          />
        </section>
        {selectedBook && (
          <BookModal onDeselectBook={this.onDeselectBook} book={selectedBook} />
        )}
      </React.Fragment>
    )
  }
}
