import { utilService } from '../services/util.service.js'

export function BookPreview({ book, onSelectBook }) {
  const { title, thumbnail, id, listPrice } = book
  return (
    <article
      onClick={() => onSelectBook(id)}
      className="card book-card flip-in-ver-right"
    >
      <div className="thumbnail">
        <img src={thumbnail} alt="" />
      </div>
      <h3>{title}</h3>
      <h4>
        Price:{' '}
        <span>
          {listPrice.amount}
          {utilService.getCurrencySymbol(listPrice.currencyCode)}
        </span>
      </h4>
    </article>
  )
}
