const { Link } = ReactRouterDOM

export function AppHeader(){

  return <header className="app-header-container">
    <h1>Hello from app header</h1>

    <Link to="/Notes"><button>Note App</button></Link>
    <Link to="/Emails/Inbox"><button>Email App</button></Link>
    <Link to="/Books"><button>Book App</button></Link> 
  </header>
}