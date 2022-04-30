import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"
import { NavList } from "./nav-list.jsx"

const { Link, Route, Switch } = ReactRouterDOM

export class AppHeader extends React.Component {

  state = {
    isNavListOpen: false
  }

  onClickNavMenu = () =>{
    const { isNavListOpen } = this.state
    this.setState({ isNavListOpen: !isNavListOpen })
  }
  render() {
    const { onFilterEmails } = this.props
    const { isNavListOpen } = this.state
    return <header className="app-header-container main-layout">
      <div className="logo">
        <div className="nav-container">
          {/* <i className="fa fa-bars"></i> */}
        </div>
        <Link to="/">
          <img src="../../assets/img/horse-logo.jpg" />
          <h1>AppSus</h1>
        </Link>
        <Switch>
          <Route path="/Emails"><EmailFilter onFilterEmails={onFilterEmails} /></Route>
          {/* <Route path="/Notes" component={NoteApp} /> */}
        </Switch>
      </div>
      <nav className="nav-btns-container">
        <img src="../../assets/img/squared-menu.png" onClick={this.onClickNavMenu} />
        {isNavListOpen && <NavList onClickNavMenu={this.onClickNavMenu}/>}
      </nav>
    </header>
  }
}
