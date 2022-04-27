export function EmailDetails({email}){
  console.log(email)

  const {subject,from,sentAt,body,userName} = email
  return <section className="email-details-container">
    <h2>{subject}</h2>
    <div className="sender-info-container">
    <h3>{'From: ' + userName}<span> {'<'+from+'>'}</span></h3>
    <h3>{new Date(sentAt).toDateString()}</h3>
    </div>
    <main className="email-body-container">
      <p>{body}</p>
    </main>
  </section>
}