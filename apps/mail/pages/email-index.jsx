import { emailService } from '../services/email.service.js'
import { eventBusService } from "../../../services/event-bus-service.js"

import { EmailList } from '../cmps/email-list.jsx'
import { EmailDetails } from '../cmps/email-details.jsx'
import { EmailFolderList } from '../cmps/email-folder-list.jsx'
import { AppHeader } from '../../../cmps/app-header.jsx'

const { Route } = ReactRouterDOM

export class EmailApp extends React.Component {

  state = {
    emails: [],
    filterBy: {
      folderListFilter: 'Inbox',
      unreadReadFilter: 'All',
      searchStrFilter: '',
      emailParamFilter: 'Date'
    },
    selectedEmail: null,
    unreadedAmout: 0
  }

  componentDidMount() {
    console.log('Component Mounted! , loading emails')
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    let paramObj = {}
    for (let value of urlSrcPrm.keys()) {
      paramObj[value] = urlSrcPrm.get(value);
    }
    if (!Object.keys(paramObj).length) {
      paramObj = null
    }
    if (paramObj) {
      eventBusService.emit('show-compose')
      this.loadEmails()
    } else this.loadEmails()
    emailService.getUnreadAmout()
      .then((unreadedAmout) => this.setState({ unreadedAmout }))
  }

  loadEmails = () => {
    emailService.query(this.state.filterBy)
      .then(emails => this.setState({ emails }))
      console.log('got emails!',this.state.emails)
  }

  onFavoriteAdd = (event, email) => {
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
        } else {
          this.setState({ selectedEmail, unreadedAmout })
        }
      })
  }

  onDeleteEmail = (email, event) => {
    event.stopPropagation()
    emailService.deleteEmail(email.id)
      .then(() => {
        this.loadEmails()
        this.setState({ selectedEmail: null })
      })
  }

  onFilterEmails = (filterBy) => {
    console.log('FILTER SET', filterBy)
    const filterName = Object.keys(filterBy)
    const filterValue = Object.values(filterBy)[0]
    console.log('Our new filter:', filterName,filterValue)
    this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [filterName]: filterValue } }), () => {
      this.loadEmails()
      this.setState({ selectedEmail: null })
    })
  }

  onTransferToNote = (email) => {
    const { to, subject, body } = email
    const urlSrcPrm = new URLSearchParams({ to, subject, body })
    const paramStr = urlSrcPrm.toString()
    this.props.history.push(`/Notes?${paramStr}`)
  }

  render() {
    const { emails, selectedEmail, unreadedAmout, filterBy } = this.state
    // const { pathname } = this.props.location
    return <React.Fragment>
      <AppHeader onFilterEmails={this.onFilterEmails} />
      <section className="main-email-container">
        <section className="email-container">
          <EmailFolderList unreadedAmout={unreadedAmout} onFilterEmails={this.onFilterEmails} />
          {!selectedEmail && <EmailList emails={emails} onFavoriteAdd={this.onFavoriteAdd} onDeleteEmail={this.onDeleteEmail} onSelectEmail={this.onSelectEmail} filterBy={filterBy} />}
          {selectedEmail && <Route path={["/Emails/Inbox/:emailId", "/Emails/Starred/:emailId", "/Emails/Sent/:emailId", "/Emails/Drafts/:emailId"]}> <EmailDetails email={selectedEmail} onDeleteEmail={this.onDeleteEmail} onTransferToNote={this.onTransferToNote} /> </Route>}
        </section>
      </section>
    </React.Fragment>
  }
}