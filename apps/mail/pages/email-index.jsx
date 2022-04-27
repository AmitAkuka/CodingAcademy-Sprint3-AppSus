import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-list.jsx'

export class EmailApp extends React.Component{

  state = {
    emails: [],
    filterBy: null,
  }
  
  componentDidMount(){
    console.log('Component Mounted!')
    this.loadEmails()
  }

  loadEmails = () => {
  emailService.query()
       .then(emails => {this.setState({emails})})
  }

  render(){
    const {emails} = this.state
    return <section className="email-app-container">
      <EmailList emails={emails}/>
    </section>
  }
}