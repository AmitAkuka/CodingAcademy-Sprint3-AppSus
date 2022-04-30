import { ReviewAdd } from './review-add.jsx'
import { ReviewList } from './review-list.jsx'
import { bookService } from '../services/books.service.js'
import { eventBusService } from '../services/event-bus-service.js'
const { withRouter } = ReactRouterDOM

class _Reviews extends React.Component {
  state = {
    reviews: null,
  }

  componentDidMount() {
    const { bookId } = this.props.match.params
    this.loadReviews(bookId)
  }

  componentDidUpdate(prevProps) {
    const { bookId } = this.props.match.params
    if (!prevProps.match) return
    if (prevProps.match.params.bookId !== bookId) {
      this.loadReviews(bookId)
    }
  }

  loadReviews = (bookId) => {
    bookService.getById(bookId).then(({ book }) => {
      console.log(bookId)
      if (!book.reviews) this.setState({ reviews: 'no books' })
      else this.setState({ reviews: book.reviews })
    })
  }

  onDeleteReview = (id) => {
    const { bookId } = this.props
    bookService.deleteReview(bookId, id).then((reviews) => {
      this.setState({ reviews })
      eventBusService.emit('user-msg', {
        type: 'danger',
        txt: 'Review Deleted',
      })
    })
  }

  render() {
    const { bookId } = this.props
    return (
      <section className="reviews-container">
        <div className="existing-reviews">
          <h2>Reviews</h2>
          {!this.state.reviews && <h2>Loading...</h2>}
          {this.state.reviews === 'no books' && (
            <h3>Be the first to leave a review!</h3>
          )}
          {this.state.reviews && this.state.reviews !== 'no books' && (
            <ReviewList
              onDeleteReview={this.onDeleteReview}
              reviews={this.state.reviews}
            />
          )}
        </div>
        <ReviewAdd bookId={bookId} onAddReview={this.loadReviews} />
      </section>
    )
  }
}

export const Reviews = withRouter(_Reviews)
