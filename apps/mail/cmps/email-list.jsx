import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onFavoriteAdd,onSelectEmail,filterBy }) {

  return <section className="email-main-container">
      <main className="email-list-container">
        {emails.map(email => <EmailPreview email={email} key={email.id} onFavoriteAdd={onFavoriteAdd} onSelectEmail={onSelectEmail} filterBy={filterBy}/>)}
      </main>
  </section>
}