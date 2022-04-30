import { eventBusService } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email.service.js";

const { withRouter } = ReactRouterDOM

class _EmailCompose extends React.Component {

  state = {
    isComposeOpen: false,
    mailContent: {
      to: '',
      subject: '',
      body: ''
    }
  }
  removeEvent;

  componentDidMount() {
    console.log('compose up')
    this.removeEvent = eventBusService.on('show-compose', () => {
      const urlSrcPrm = new URLSearchParams(this.props.location.search)
      let paramObj = {}
      for (let value of urlSrcPrm.keys()) {
        paramObj[value] = urlSrcPrm.get(value);
      }
      if (!Object.keys(paramObj).length) {
        paramObj = null
      }
      let isComposeOpen = (paramObj) ? true : !this.state.isComposeOpen
      const { to,subject, body } = (paramObj) ? paramObj : this.state.mailContent
      this.setState(({isComposeOpen, mailContent: { to, subject, body } }))
    })
  }
  
  componentWillUnmount() {
    console.log('compose unmount')
    this.removeEvent()
  }



  handleChange = ({ target }) => {
    const value = target.value
    const field = target.name
    this.setState((prevState) => ({ mailContent: { ...prevState.mailContent, [field]: value } }))
  }

  onSendMail = (ev) => {
    ev.preventDefault()
    const { mailContent } = this.state
    emailService.addEmail(mailContent)
      .then(() => this.onDelete())
  }


  onCloseCompose() {
    //do not remove event 
    this.setState({ isComposeOpen: false })
  }

  onDelete() {
    this.cleanCompose()
    this.props.history.push({search: ''})
  }

  cleanCompose = () =>{
    this.setState({isComposeOpen: false,mailContent: { to: '', subject: '', body: '' } })
  }

  render() {
    const { isComposeOpen } = this.state
    if (!isComposeOpen) return <React.Fragment></React.Fragment>
    const { to, subject, body } = this.state.mailContent
    return <section className="email-compose-container">
      <div className="compose-header">
        <h1>New Message</h1>
        <button onClick={() => this.onCloseCompose()}><i className="fa fa-times"></i></button>
      </div>
      <form onSubmit={this.onSendMail}>
        <div className="compose-content-container">
          <div className="email-input-container">
            <label htmlFor="compose-email-input">To:</label>
            <input id="compose-email-input" type="email" name="to"
              value={to} onChange={this.handleChange} required="required" />
          </div>
          <div className="subject-input-container">
            <label htmlFor="compose-subject-input">Subject:</label>
            <input id="compose-subject-input" type="text" name="subject"
              value={subject} onChange={this.handleChange} required />
          </div>
          <textarea className="compose-text" rows="7" name="body"
            value={body} onChange={this.handleChange} required></textarea>
          <div className="compose-buttons-container">
            <button type="submit" onClick={this.onSendMail}><i className="fa fa-reply"></i></button>
            <button type="button" onClick={() => this.onDelete()}><i className="fa fa-trash"></i></button>
          </div>
        </div>
      </form>
    </section>
  }
}

export const EmailCompose = withRouter(_EmailCompose)