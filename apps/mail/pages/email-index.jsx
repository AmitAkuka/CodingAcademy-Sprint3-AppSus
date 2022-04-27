import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'
import { EmailDetails } from '../cmps/email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'

export class EmailApp extends React.Component {

  state = {
    emails: [],
    filterBy: 'Inbox',
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

  onSelectEmail = (selectedEmail, ev = false) => {
    //if there is event sent - means user clicked preview button
    let isMarkAsUnreaded = false
    if (ev) {
      ev.stopPropagation();
      isMarkAsUnreaded = true
    }
    emailService.setReadedEmail(selectedEmail, isMarkAsUnreaded)
      .then(() => emailService.getUnreadAmout())
      .then((unreadedAmout) => {
        if (ev) {
          this.setState({ unreadedAmout })
          this.loadEmails()
        } else this.setState({ selectedEmail, unreadedAmout })
      })
  }

  onFilterEmails = (filterBy) => {
    this.setState({ filterBy }, () => {
      this.loadEmails()
      this.setState({ selectedEmail: null })
    })
  }

  render() {
    const { emails, selectedEmail, unreadedAmout } = this.state
    return <section className="main-email-container">
      <EmailFilter onFilterEmails={this.onFilterEmails}/>
      <section className="email-container">
        <EmailFolderList unreadedAmout={unreadedAmout} onFilterEmails={this.onFilterEmails} />
        {!selectedEmail && <EmailList emails={emails} onFavoriteAdd={this.onFavoriteAdd} onSelectEmail={this.onSelectEmail} />}
        {selectedEmail && <EmailDetails email={selectedEmail} />}
      </section>
    </section>
  }
}