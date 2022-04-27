const { Link } = ReactRouterDOM

export function EmailPreview({ email, onFavoriteAdd,onSelectEmail }) {

  return <Link to={`/Emails/${email.id}`} className="clean-link" onClick={() => onSelectEmail(email)}>
    <div className="email-preview">
      <i className={(email.isFavorite) ? "fa fa-star" : "fa fa-star-o"} onClick={(event) => onFavoriteAdd(event,email)}></i>
      <h2>{email.subject}</h2>
      <h3>{email.body}</h3>
    </div>
  </Link>
}