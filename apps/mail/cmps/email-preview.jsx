const { Link } = ReactRouterDOM

export function EmailPreview({ email, onFavoriteAdd, onSelectEmail }) {
  const sentTime = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
  return <Link to={`/Emails/${email.id}`} className="clean-link" onClick={() => onSelectEmail(email)}>
    <div className={(email.isReaded) ? 'email-preview readed' : 'email-preview'}>
      <i className={(email.isFavorite) ? "fa fa-star" : "fa fa-star-o"} onClick={(event) => onFavoriteAdd(event, email)}></i>
      <div className="email-info-container">
        <h2 className="subject-preview">{email.subject}</h2>
        <h3 className="body-preview">{email.body}</h3>
        <h3 className="time-preview">{sentTime}</h3>
      </div>
    </div>
  </Link>
}