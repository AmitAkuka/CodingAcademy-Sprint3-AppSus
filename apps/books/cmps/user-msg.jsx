import { eventBusService } from '../services/event-bus-service.js'

export class UserMsg extends React.Component {
  state = {}

  removeEvent
  timeoutId

  componentDidMount() {
    this.removeEvent = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg })
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(this.onCloseMsg, 5000)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }

  getClasses = () => {
    const { msg } = this.state
    return `user-msg ${msg.type} fade-in-out`
  }

  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    return <div className={this.getClasses()}>{msg.txt}</div>
  }
}
