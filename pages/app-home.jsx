import { AppHeader } from "../cmps/app-header.jsx"
const { Link } = ReactRouterDOM

export function AppHome() {
  return (
    <section className="app-home-container">
      <main>
        <img src="../assets/img/Appsus-logo.png" />
        <h1>Welcome to AppSus!</h1>
        <section className="home-buttons-container">
         <Link to="/Books"><button>Book App</button></Link> 
         <Link to="/Notes"><button>Note App</button></Link> 
         <Link to="/Emails/Inbox"><button>Email App</button></Link> 
         <Link to="/About"><button>About</button></Link> 
        </section>
      </main>
      <footer>
        <div className="info-container">
         Made with
         <img src="../assets/img/reacticon.gif" /> 
         by Avi Isakov and Amit Akuka
        </div>
        </footer>
    </section>
  )
}
