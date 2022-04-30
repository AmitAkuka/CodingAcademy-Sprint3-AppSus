const { withRouter } = ReactRouterDOM

class _EmailPreview extends React.Component {

  emailSelectedClick = (email) => {
    const { folderListFilter } = this.props.filterBy
    this.props.onSelectEmail(email)
    this.props.history.push(`/Emails/${folderListFilter}/${email.id}`)
  }

  render() {
    const { email, onFavoriteAdd, onSelectEmail, onDeleteEmail } = this.props
    const { isReaded, isFavorite, subject, body, sentAt, userName } = email
    let bodyTxt = (subject.length + body.length > 80) ? body.slice(0, 70) + '...' : body
    const sentTime = new Date(sentAt).toDateString()
    return <section onClick={() => this.emailSelectedClick(email)}>
      <div className={(isReaded) ? 'email-preview slide-left readed' : 'email-preview slide-left'}>
        <i className={(isFavorite) ? "fa fa-star" : "fa fa-star-o"} onClick={(event) => onFavoriteAdd(event, email)}></i>
        <div className="email-info-container">
          <h2>{userName}</h2>
          <h2 className="body-preview">{subject} - <span>{bodyTxt}</span></h2>
          {/* Fix invalid date for added emails */}
          <h2 className="time-preview">{(typeof sentAt === 'number') ? sentTime : sentAt}</h2>
          <div className="email-preview-buttons">
            <button onClick={(event) => onSelectEmail(email, event)}><i className={(email.isReaded) ? 'fa fa-envelope-open' : 'fa fa-envelope'}></i></button>
            <button onClick={(event) => onDeleteEmail(email, event)}><i className="fa fa-trash"></i></button>
          </div>
        </div>
      </div>
    </section>
  }
}


export const EmailPreview = withRouter(_EmailPreview)