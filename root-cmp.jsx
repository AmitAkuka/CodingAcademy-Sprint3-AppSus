// IMPORT COMPONENTS HERE
import { AppHome } from './pages/app-home.jsx'
import { AppAbout } from './pages/app-about.jsx'
import { EmailApp } from './apps/mail/pages/email-index.jsx'
import { NoteApp } from './apps/note/pages/note-index.jsx'
import { EmailCompose } from './apps/mail/cmps/email-compose.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
// import { AppHome } from './pages/app-home.jsx' Dont forget to import books


//WILL NEED THAT FOR ROUTES
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export function App() {
  return <Router>
    <section className="main-app-container">

      <Switch>
        <Route path="/About" component={AppAbout} />
        <Route path="/Emails" component={EmailApp} />
        <Route path="/Notes" component={NoteApp} />
        <Route path="/" component={AppHome} />
      </Switch>
    </section>
    <EmailCompose />
    {/* <AppFooter /> */}
    <UserMsg />
  </Router>
}