import { emailService } from '../services/email.service.js'

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
       .then(emails => {
         console.log(emails)
       })
  }

  render(){

    return <section className="email-app-container">
      <h1>Hello from Email App!!</h1>
    </section>
  }
}