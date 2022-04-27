import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'
import { EmailDetails } from '../cmps/email-details.jsx'
import { EmailNavBar } from '../cmps/email-nav-bar.jsx'

export class EmailApp extends React.Component {

  state = {
    emails: [],
    filterBy: null,
    selectedEmail: null,
    unreadedAmout: 0
  }

  componentDidMount() {
    console.log('Component Mounted! , loading emails')
    this.loadEmails()
    emailService.getUnreadAmout()
      .then((unreadedAmout) => this.setState({ unreadedAmout }))
  }

  loadEmails = () => {
    emailService.query(this.state.filterBy)
      .then(emails => { this.setState({ emails }) })
  }

  onFavoriteAdd = (ev, email) => {
    ev.stopPropagation();
    emailService.setEmailFavorite(email.id)
      .then(this.loadEmails)
  }

  onSelectEmail = (selectedEmail) => {
    // if(selectedEmail.isReaded) return
    emailService.setReadedEmail(selectedEmail)
      .then(() => emailService.getUnreadAmout())
      .then((unreadedAmout) => this.setState({ selectedEmail, unreadedAmout }))
  }

  onFilterEmails = (filterBy) => {
    console.log(filterBy)
    this.setState({filterBy}, () => {
      this.loadEmails()
    })
  }

  render() {
    const { emails, selectedEmail, unreadedAmout } = this.state
    return <section className="email-container">
      <EmailNavBar unreadedAmout={unreadedAmout} onFilterEmails={this.onFilterEmails} />
      {!selectedEmail && <EmailList emails={emails} onFavoriteAdd={this.onFavoriteAdd} onSelectEmail={this.onSelectEmail} />}
      {selectedEmail && <EmailDetails email={selectedEmail} />}
    </section>
  }
}