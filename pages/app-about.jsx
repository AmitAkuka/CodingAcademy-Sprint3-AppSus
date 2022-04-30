const { Link } = ReactRouterDOM

export function AppAbout() {



  return (<section className="app-about-container">
    <Link to="/"><button>Back to AppSus!</button></Link>
    <h1>About</h1>
    <main>
      <div className="avi-info-container">
        <img src="assets/img/ProfilePics/AviIsakov.jpeg" />
        <p>Hello!,<br />
          My name is avi
        </p>
        <a href="https://github.com/avi9022" target="_blank">
          <button><img src="assets/img/github-icon.png" />My Github</button>
        </a>
      </div>
      <div className="amit-info-container">
        <img src="assets/img/ProfilePics/AmitAkuka.png" />
        <p>Hello!,<br />
          My name is amit</p>
        <a href="https://github.com/AmitAkuka" target="_blank">
          <button><img src="assets/img/github-icon.png" />My Github</button>
        </a>
      </div>
    </main>
    <footer>
      <div className="info-container">
        Made with
        <img src="assets/img/reacticon.gif" />
        by Avi Isakov and Amit Akuka
      </div>
    </footer>
  </section>)
}