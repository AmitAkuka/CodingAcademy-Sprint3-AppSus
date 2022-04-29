import { EmailFilter } from "../apps/mail/cmps/email-filter.jsx"

const { NavLink,Link,Route, Switch } = ReactRouterDOM

export function AppHeader({onFilterEmails}) {
  return (
    <header className="app-header-container">
      <div className="logo">
        <div className="nav-container">
        <i className="fa fa-bars"></i>
        </div>
        <Link to="/">
        <img src="../../assets/img/horse-logo.jpg" alt="" />
        <h1>AppSus</h1>
        </Link>
      <Switch>
        <Route path="/Emails"><EmailFilter onFilterEmails={onFilterEmails} /></Route>
        {/* <Route path="/Notes" component={NoteApp} /> */}
      </Switch>
      </div>
      <nav className="nav-btns-container">
        <ul>
          <NavLink to="/" exact>
            <li>Home</li>
          </NavLink>
          <NavLink to="/Notes">
            <li>Note App</li>
          </NavLink>
          <NavLink to="/Emails/Inbox">
            <li>Email App</li>
          </NavLink>
          <NavLink to="/Books">
            <li>Book App</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}
