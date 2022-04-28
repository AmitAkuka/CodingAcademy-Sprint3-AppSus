import { emailService } from '../services/email.service.js'

export class EmailDetails extends React.Component {

  state = {
    email: null
  }

  componentDidMount() {
    console.log('Rendering email')
    console.log('my props',this.props)
    console.log('Got params:', this.props.match.params)
    this.loadEmail()
  }
  componentWillUnmount() {
    console.log('Email details unmounted!');
  }

  onTransferToNote = () => {
    console.log('here')
    const {to,subject,body} = this.state.email
    const urlSrcPrm = new URLSearchParams({to,subject,body})
    const paramStr = urlSrcPrm.toString()
    this.props.history.push(`/Notes?${paramStr}`)
  }

  //need to fix
  onDeleteEmail = (emailId) => {
    emailService.deleteEmail(emailId)
      .then(() => this.props.history.push('/Emails/Inbox'))
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
    console.log(this.props)
    if (!this.state.email) return <React.Fragment></React.Fragment>
    const { id,subject, from, sentAt, body, userName, profilePic } = this.state.email
    return <section className="email-details-container">
      <header className="email-header-container">
        <h2>{subject}</h2>
        <section className="buttons-container">
          <button><i className="fa fa-reply"></i></button>
          <button onClick={() => this.onTransferToNote()}><i className="fa fa-floppy-o"></i></button>
          <button onClick={() => this.onDeleteEmail(id)}><i className="fa fa-trash"></i></button>
        </section>
      </header>
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