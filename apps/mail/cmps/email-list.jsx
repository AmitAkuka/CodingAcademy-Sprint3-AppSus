import {EmailPreview} from './email-preview.jsx'

export function EmailList({emails}){
  console.log(emails)

  return <section className="email-list-container">
    <h1>email list</h1>
    {emails.map(email => <EmailPreview email={email} key={email.id} />)}
  </section>
}