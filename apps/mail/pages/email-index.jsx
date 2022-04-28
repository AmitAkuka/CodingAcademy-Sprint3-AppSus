import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'
import { EmailDetails } from '../cmps/email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { EmailFilter } from '../cmps/email-filter.jsx'

const { Route } = ReactRouterDOM

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
      .then(emails => this.setState({ emails }) )
  }

  onFavoriteAdd = (event, email) => {
    console.log('Favorite')
    event.stopPropagation();
    emailService.setEmailFavorite(email.id)
      .then(this.loadEmails)
  }

  onSelectEmail = (selectedEmail, event = false) => {
    //if there is event sent - means user clicked preview button
    let isUnreadBtnClk = false
    if (event) {
      event.stopPropagation()
      isUnreadBtnClk = true
    }
    emailService.setReadedEmail(selectedEmail, isUnreadBtnClk)
      .then(() => emailService.getUnreadAmout())
      .then((unreadedAmout) => {
        if (event) {
          this.setState({ unreadedAmout })
          this.loadEmails()
        } else this.setState({ selectedEmail, unreadedAmout })
      })
  }

  onFilterEmails = (filterBy) => {
    console.log('FILTET SET',filterBy)
    this.setState({ filterBy }, () => {
      this.loadEmails()
      this.setState({ selectedEmail: null })
    })
  }

  render() {
    const { emails, selectedEmail, unreadedAmout,filterBy } = this.state
    return <section className="main-email-container">
      <EmailFilter onFilterEmails={this.onFilterEmails}/>
      <section className="email-container">
        <EmailFolderList unreadedAmout={unreadedAmout} onFilterEmails={this.onFilterEmails} />
        {!selectedEmail && <EmailList emails={emails} onFavoriteAdd={this.onFavoriteAdd} onSelectEmail={this.onSelectEmail} filterBy={filterBy}/>}
        {selectedEmail && <Route path={["/Emails/Inbox/:emailId","/Emails/Starred/:emailId","/Emails/Sent/:emailId","/Emails/Drafts/:emailId"]} component={EmailDetails} />}
      </section>
    </section>
  }
}