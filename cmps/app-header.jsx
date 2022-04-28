const { NavLink,Link } = ReactRouterDOM

export function AppHeader() {
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
      <section className="main-input-container">
      <i class="fa fa-search"></i>
      <input type="text" placeholder="Search here..." />
      </section>
      </div>
      <nav>
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
