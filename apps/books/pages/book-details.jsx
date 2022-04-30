import { utilService } from '../services/util.service.js'
import { bookService } from '../services/books.service.js'
import { LongText } from '../cmps/long-text.jsx'
import { Reviews } from '../cmps/reviews.jsx'
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {
  state = {
    isLongTxtShown: false,
    book: null,
  }

  componentDidMount() {
    if (!this.props.book) this.loadBook()
    else this.setState({ book: this.props.book })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.match) return
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }

  onReadMoreToggle = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }

  getSwitchBookId = (id, step) => {
    return bookService.getNextBookId(id, step)
  }

  loadBook = () => {
    const { bookId } = this.props.match.params
    bookService.getById(bookId).then(({ book }) => {
      this.setState({ book })
    })
  }

  render() {
    const { book } = this.state
    if (!book) return <h2>Loading...</h2>
    const {
      thumbnail,
      subtitle,
      title,
      listPrice,
      description,
      categories,
      authors,
      pageCount,
      publishedDate,
      id,
    } = book

    const nextBookId = this.getSwitchBookId(id, 1)
    const prevBookId = this.getSwitchBookId(id, -1)

    return (
      <div className={this.props.book ? 'modal book-details' : 'book-details'}>
        <div className="thumbnail">
          {listPrice.isOnSale && (
            <img className="for-sale" src="assets/img/for-sale.png" alt="" />
          )}
          <img src={thumbnail} alt="" />
        </div>
        <div className="specifics">
          <div className="header">
            <h3 className="title">{title}</h3>
            <div
              className={`price ${listPrice.amount > 150 ? 'red' : ''} ${
                listPrice.amount < 20 ? 'green' : ''
              }`}
            >
              <span>
                {listPrice.amount}
                {utilService.getCurrencySymbol(listPrice.currencyCode)}
              </span>
            </div>
          </div>
          <h3 className="subtitle">{subtitle}</h3>
          <h4 className="authors">
            By: <span>{authors}</span>
          </h4>
          <div className="desc">
            <LongText
              text={description}
              isLongTxtShown={this.state.isLongTxtShown}
            />
            <span className="read-more" onClick={this.onReadMoreToggle}>
              {this.state.isLongTxtShown ? 'Read Less' : 'Read More'}
            </span>
          </div>
          {categories && (
            <h4 className="categ">
              Categories: <span>{categories.join(', ')}</span>
            </h4>
          )}
          <p>
            {utilService.getLengthDesc(pageCount)}{' '}
            {utilService.getAgeDesc(publishedDate)}
          </p>
          <div className="switch-books">
            <Link to={`/book-app/${prevBookId}`}>
              <span className="prev">← Previous</span>
            </Link>
            <Link to={`/book-app/${nextBookId}`}>
              <span className="next">Next →</span>
            </Link>
          </div>
          <Reviews bookId={id} />
        </div>
        <div className="btns">
          <Link to="/book-app">
            <button
              className="btn btn-close"
              onClick={() => this.props.history.push('/book-app')}
            >
              Close
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
