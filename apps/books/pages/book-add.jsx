import { bookService } from '../services/books.service.js'
import { googleApiService } from '../services/google-api.service.js'
import { SearchResults } from '../cmps/search-results.jsx'
import { eventBusService } from '../services/event-bus-service.js'
import { AppHeader } from '../../../cmps/app-header.jsx'
const { Link } = ReactRouterDOM

export class BookAdd extends React.Component {
  state = {
    searchResults: null,
  }

  onBookSearch = (ev) => {
    ev.preventDefault()
    googleApiService
      .getBooksFromAPI(ev.target[0].value)
      .then((searchResults) => {
        this.setState({ searchResults })
      })
  }

  onAddBook = (book) => {
    bookService
      .addBook(book)
      .then(
        eventBusService.emit('user-msg', { txt: 'Book Added', type: 'success' })
      )
  }

  render() {
    const { searchResults } = this.state
    return (
      <React.Fragment>
        <AppHeader />
        <section className="add-book main-content">
          <div className="page-title">
            <h2>Add book</h2>
            <Link to="/book-app">Books list</Link>
          </div>
          <form onSubmit={this.onBookSearch}>
            <div className="search-container">
              <input type="text" placeholder="Enter book title..." />
              <button className="btn btn-search">
                <img src="../assets/img/search.png" alt="" />
              </button>
            </div>
          </form>
          {searchResults && (
            <SearchResults onAddBook={this.onAddBook} results={searchResults} />
          )}
        </section>
      </React.Fragment>
    )
  }
}
