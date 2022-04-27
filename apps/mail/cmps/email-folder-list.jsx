import { eventBusService } from "../../../services/event-bus-service.js"

export class EmailFolderList extends React.Component {
  
  state = {
    filterName: 'Inbox'
  }

  onChangeFilter = (filterName) =>{
    this.setState({filterName})
    this.props.onFilterEmails(filterName)
  }

  onComposeClick = () => {
    eventBusService.emit('show-compose')
  }

  render() {
    const { unreadedAmout } = this.props
    const {filterName} = this.state
    return <nav className="nav-container">
      <div onClick={() => this.onComposeClick()}><img src="../../assets/img/google-compose.png"></img>Compose</div>
      <div className={(filterName === 'Inbox')? 'active' : ''} onClick={() => this.onChangeFilter('Inbox')}><i className="fa fa-inbox fa-lg"></i>Inbox <span className="unreaded-amout">{unreadedAmout}</span></div>
      <div className={(filterName === 'Starred')? 'active' : ''} onClick={() => this.onChangeFilter('Starred')}><i className="fa fa-star fa-lg"></i>Starred</div>
      <div className={(filterName === 'Sent')? 'active' : ''} onClick={() => this.onChangeFilter('Sent')}><i className="fa fa-paper-plane fa-med"></i>Sent</div>
      <div className={(filterName === 'Drafts')? 'active' : ''} onClick={() => this.onChangeFilter('Drafts')}><i className="fa fa-file-text fa-lg"></i>Drafts</div>
    </nav>
  }
}