// IMPORT COMPONENTS HERE
import { AppHome } from './pages/app-home.jsx'
import { EmailApp } from './apps/mail/pages/email-index.jsx'
import { NoteApp } from './apps/note/pages/note-index.jsx'
import { EmailCompose } from './apps/mail/cmps/email-compose.jsx'
import { AppHeader } from './cmps/app-header.jsx'
// import { AppHome } from './pages/app-home.jsx' Dont forget to import books


//WILL NEED THAT FOR ROUTES
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
  return <Router>
    <AppHeader />
    <section className="main-app-container">
      <Switch>
        {/* ALL ROUTES HERE */}
        {/* REMEMBER - THE MOST SPECIFIC ROUTE AT THE TOP!!! */}
        <Route path="/Notes" component={NoteApp} />
        <Route path="/Emails" component={EmailApp} />
        <Route path="/" component={AppHome} />
      </Switch>
    </section>
    <EmailCompose />
    {/* <AppFooter /> */}
    {/* <UserMsg /> */}
  </Router>
}