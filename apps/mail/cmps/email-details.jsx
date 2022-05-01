
export function EmailDetails({email,onDeleteEmail,onTransferToNote,onGoBack}) {

    const { subject, from, sentAt, body, userName, profilePic } = email
    return <section className="email-details-container">
      <header className="email-header-container">
        <h2>{subject}</h2>
        <section className="buttons-container">
          <button onClick={() => onGoBack()}><i className="fa fa-reply"></i></button>
          <button onClick={() => onTransferToNote(email)}><i className="fa fa-floppy-o"></i></button>
          <button onClick={(event) => onDeleteEmail(email,event)}><i className="fa fa-trash"></i></button>
        </section>
      </header>
      <div className="sender-info-container">
        <div className="sender-info">
          <img src={`assets/img/ProfilePics/${profilePic}.png`} />
          <div className="addresses-container">
            <div className="sender-address-container">
              <span>{'From: ' + userName}</span><span> {'<' + from + '>'}</span>
            </div>
              <span>{'To: me'}</span>
          </div>
        </div>
        <p>{new Date(sentAt).toDateString()}</p>
      </div>
      <main className="email-body-container">
        <p>{body}</p>
      </main>
    </section>
}
