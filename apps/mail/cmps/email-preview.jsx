

export function EmailPreview({email}){
  console.log(email)
  return <div className="email-preview">
    <h2>{email.subject}</h2>
    <h3>{email.body}</h3>
  </div>
}