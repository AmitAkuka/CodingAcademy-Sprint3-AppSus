import { utilService } from '../services/util.service.js'
import { LongText } from './long-text.jsx'
const { Link } = ReactRouterDOM

export class BookModal extends React.Component {
  state = {
    isLongTxtShown: false,
  }

  onReadMoreToggle = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  }

  render() {
    const { book, onDeselectBook } = this.props
    const { thumbnail, subtitle, title, listPrice, description, authors, id } =
      book
    return (
      <div className="modal book-details">
        <div className="thumbnail">
          {listPrice.isOnSale && (
            <img className="for-sale" src="../assets/img/for-sale.png" alt="" />
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
        </div>
        <div className="btns">
          <Link to="/book-app">
            <button className="btn btn-close" onClick={onDeselectBook}>
              Close
            </button>
          </Link>
          <Link to={`/book-app/${book.id}`}>
            <button className="btn btn-show-full">Full Details</button>
          </Link>
        </div>
      </div>
    )
  }
}
