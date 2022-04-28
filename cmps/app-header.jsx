const { NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header-container">
      <div className="logo">
        <img src="../../assets/img/horse-logo.jpg" alt="" />
        <h1>Appsus</h1>
      </div>
      <nav>
        <ul>
          <NavLink to="/">
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
