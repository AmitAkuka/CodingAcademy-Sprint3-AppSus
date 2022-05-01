const { Link } = ReactRouterDOM

export function NavList({ onClickNavMenu }) {
  return (
    <div className="nav-menu-container">
      <div className="icons-container">
        <div className="menu-home-app-container" onClick={onClickNavMenu}>
          <Link to="/">
            <img src="assets/img/menu-icon-home.png" />
            <span>Home</span>
          </Link>
        </div>
        <div className="menu-email-app-container" onClick={onClickNavMenu}>
          <Link to="/Emails/Inbox">
            <img src="assets/img/menu-icon-mail.png" />
            <span>Email app</span>
          </Link>
        </div>
        <div className="menu-note-app-container" onClick={onClickNavMenu}>
          <Link to="/Notes">
            <img src="assets/img/menu-icon-note.png" />
            <span>Note app</span>
          </Link>
        </div>
        <div className="menu-book-app-container" onClick={onClickNavMenu}>
          <Link to="/book-app">
            <img src="assets/img/menu-icon-book.png" />
            <span>Book app</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
