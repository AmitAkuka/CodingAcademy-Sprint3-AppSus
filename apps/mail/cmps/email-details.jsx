import { emailService } from '../services/email.service.js'

export class EmailDetails extends React.Component {

  state = {
    email: null
  }

  componentDidMount() {
    console.log('Rendering email')
    console.log('Got params:', this.props.match.params)
    this.loadEmail()
  }
  componentWillUnmount() {
    console.log('Email details unmounted!');
  }


  loadEmail = () => {
    const { emailId } = this.props.match.params
    emailService.getEmailById(emailId)
      .then(email => {
        console.log(email)
        if (!email) return this.props.history.push('/')
        this.setState({ email })
      })
  }


  render() {
    if (!this.state.email) return <React.Fragment></React.Fragment>
    const { subject, from, sentAt, body, userName, profilePic } = this.state.email
    return <section className="email-details-container">
      <h2>{subject}</h2>
      <div className="sender-info-container">
        <div className="sender-info">
          <img src={`../../assets/img/ProfilePics/${profilePic}.png`} />
          {'From: ' + userName}<span> {'<' + from + '>'}</span>
        </div>
        <p>{new Date(sentAt).toDateString()}</p>
      </div>
      <main className="email-body-container">
        <p>{body}</p>
      </main>
    </section>
  }
}