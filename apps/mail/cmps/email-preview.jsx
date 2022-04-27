const { Link } = ReactRouterDOM

export function EmailPreview({ email, onFavoriteAdd, onSelectEmail }) {
  const sentTime = new Date(Date.now())
  const { id, isReaded, isFavorite, subject, body, sentAt } = email
  return <Link to={`/Emails/${id}`} className="clean-link" onClick={() => onSelectEmail(email)}>
    <div className={(isReaded) ? 'email-preview readed' : 'email-preview'}>
      <i className={(isFavorite) ? "fa fa-star" : "fa fa-star-o"} onClick={(event) => onFavoriteAdd(event, email)}></i>
      <div className="email-info-container">
        <h2 className="subject-preview">{subject}</h2>
        <h3 className="body-preview">{body}</h3>
        {/* Fix invalid date for added emails */}
        <h3 className="time-preview">{(typeof sentAt === 'number') ? sentTime : sentAt}
        </h3>
          <div className="email-preview-buttons">
            <button onClick={(event) => onSelectEmail(email,event)}><i className={(email.isReaded) ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i></button>
            <button><i className="fa fa-trash"></i></button>
          </div>
      </div>
    </div>
  </Link>
}