import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'
import { EmailDetails } from '../cmps/email-details.jsx'

export class EmailApp extends React.Component{

  state = {
    emails: [],
    filterBy: null,
    selectedEmail: null
  }

  componentDidMount(){
    console.log('Component Mounted! , loading emails')
    this.loadEmails()
  }
  
  loadEmails = () => {
    emailService.query()
      .then(emails => {this.setState({emails})})
  }
  
  onFavoriteAdd = (ev,email) => {
    ev.stopPropagation();
    emailService.setEmailFavorite(email.id)
      .then(this.loadEmails)
  }

  onSelectEmail = (selectedEmail) => {
    this.setState({selectedEmail})
  }
  
  render(){
    const {emails,selectedEmail} = this.state
    return <section className="email-container">
      <nav className="nav-container">
        <div className="active"><i className="fa fa-inbox fa-lg"></i>Inbox</div>
        <div><i className="fa fa-star fa-lg"></i>Starred</div>
        <div><i className="fa fa-paper-plane fa-med"></i>Sent Mail</div>
        <div><i className="fa fa-file-text fa-lg"></i>Drafts</div>
      </nav>
      
      {!selectedEmail && <EmailList emails={emails} onFavoriteAdd={this.onFavoriteAdd} onSelectEmail={this.onSelectEmail}/>}
      {selectedEmail && <EmailDetails email={selectedEmail}/>}
    </section>
  }
}