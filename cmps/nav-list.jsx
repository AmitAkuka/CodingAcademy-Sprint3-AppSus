const { Link } = ReactRouterDOM

export function NavList({onClickNavMenu}){


  return <div className="nav-menu-container">
    <div className="icons-container">
  <div className="email-app-container" onClick={onClickNavMenu}>
  <Link to="/Emails/Inbox">
    <img src="../../assets/img/menu-icon-mail.png" />
    <span>Email app</span>
  </Link>
  </div>
  <div className="note-app-container" onClick={onClickNavMenu}>
  <Link to="/Notes">
    <img src="../../assets/img/menu-icon-note.png" />
    <span>Note app</span>
    </Link>
  </div>
  <div className="book-app-container" onClick={onClickNavMenu}>
  <Link to="/Books">
    <img src="../../assets/img/menu-icon-book.png" />
    <span>Book app</span>
    </Link>
  </div>
</div>
</div>
}