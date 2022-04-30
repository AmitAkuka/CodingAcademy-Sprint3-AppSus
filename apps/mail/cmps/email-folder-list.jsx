import { eventBusService } from "../../../services/event-bus-service.js"

const {NavLink} = ReactRouterDOM

export class EmailFolderList extends React.Component {
  
  state = {
    filterName: 'Inbox'
  }

  onChangeFilter = (folderListFilter) =>{
    this.setState({folderListFilter})
    this.props.onFilterEmails({folderListFilter})
  }

  onComposeClick = () => {
    console.log('show compose')
    eventBusService.emit('show-compose')
  }

  render() {
    const { unreadedAmout } = this.props
    return <nav className="nav-container">
      <div className="compose-btn" onClick={() => this.onComposeClick()}><img src="../../assets/img/google-compose.png"></img><span>Compose</span></div>
      <NavLink to="/Emails/Inbox"><div className="folder-btn" onClick={() => this.onChangeFilter('Inbox')}><i className="fa fa-inbox"></i> Inbox <span className="unreaded-amout">{unreadedAmout}</span></div></NavLink>
      <NavLink to="/Emails/Starred"><div className="folder-btn" onClick={() => this.onChangeFilter('Starred')}><i className="fa fa-star"></i>Starred</div></NavLink>
      <NavLink to="/Emails/Sent"><div  className="folder-btn"onClick={() => this.onChangeFilter('Sent')}><i className="fa fa-paper-plane"></i> Sent</div></NavLink>
      <NavLink to="/Emails/Drafts"><div className="folder-btn" onClick={() => this.onChangeFilter('Drafts')}><i className="fa fa-file-text"></i> Drafts</div></NavLink>
    </nav>
  }
}