import { bookService } from '../services/books.service.js'
import { eventBusService } from '../services/event-bus-service.js'

export class ReviewAdd extends React.Component {
  state = {
    review: {
      fullName: '',
      readAt: new Date().toLocaleDateString(),
      rating: 0,
      review: '',
      createdAt: new Date().toLocaleDateString(),
    },
    star1: React.createRef(),
    star2: React.createRef(),
    star3: React.createRef(),
    star4: React.createRef(),
    star5: React.createRef(),
  }

  onAddReview = (ev) => {
    ev.preventDefault()
    const { bookId } = this.props

    bookService.addReview(this.state.review, bookId).then(() => {
      this.props.onAddReview(bookId)
      eventBusService.emit('user-msg', { txt: 'Review Added', type: 'success' })
      this.clearReview()
    })
  }

  clearReview = () => {
    this.setState({
      review: {
        fullName: '',
        readAt: new Date().toLocaleDateString(),
        rating: 0,
        review: '',
        createdAt: new Date().toLocaleDateString(),
      },
    })
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    if (target.name === 'readAt') value = new Date(value).toLocaleDateString()
    this.setState((prevState) => ({
      review: { ...prevState.review, [field]: value },
    }))
  }

  handleRateChange = (rating) => {
    this.setState((prevState) => ({
      review: { ...prevState.review, rating },
    }))
  }

  onStarsHover = (starNum) => {
    for (let i = 1; i <= 5; i++) {
      this.state[`star${i}`].current.src = '../assets/img/star-empty.png'
    }
    for (let i = 1; i <= starNum; i++) {
      this.state[`star${i}`].current.src = '../assets/img/star-full.png'
    }
  }

  clearStars = () => {
    for (let i = 1; i <= 5; i++) {
      this.state[`star${i}`].current.src = '../assets/img/star-empty.png'
    }
    for (let i = this.state.review.rating; i >= 1; i--) {
      this.state[`star${i}`].current.src = '../assets/img/star-full.png'
    }
  }

  stars = [1, 2, 3, 4, 5]

  render() {
    const { review } = this.state
    return (
      <section className="add-review">
        <h2>Add review</h2>
        <form onSubmit={(event) => this.onAddReview(event)}>
          <div className="user-details">
            <label>
              Full name:
              <input
                type="text"
                name="fullName"
                onChange={this.handleChange}
                placeholder="Enter your name..."
                value={review.fullName}
              />
            </label>
            <div className="rating">
              Rate:
              <div className="stars-container" onMouseLeave={this.clearStars}>
                {this.stars.map((star) => (
                  <img
                    key={star}
                    onClick={() => this.handleRateChange(star)}
                    ref={this.state[`star${star}`]}
                    src="../assets/img/star-empty.png"
                    onMouseOver={() => this.onStarsHover(star)}
                  />
                ))}
              </div>
            </div>
            <label>
              Read at:
              <input type="date" name="readAt" onChange={this.handleChange} />
            </label>
          </div>
          <div className="review-submit">
            <label>
              Review:
              <textarea
                value={review.review}
                name="review"
                onChange={this.handleChange}
                cols="50"
                rows="6"
              ></textarea>
            </label>
            <button className="btn save-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}
