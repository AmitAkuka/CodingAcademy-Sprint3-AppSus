import { EmailPreview } from './email-preview.jsx'

export function EmailList({ emails, onFavoriteAdd, onSelectEmail, filterBy, onDeleteEmail }) {

  return <section className="email-main-container">
    <main className="email-list-container">
      {emails.map(email => <EmailPreview email={email} key={email.id} onDeleteEmail={onDeleteEmail} onFavoriteAdd={onFavoriteAdd} onSelectEmail={onSelectEmail} filterBy={filterBy} />)}
    </main>
  </section>
}