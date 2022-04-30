const { Switch, Route, NavLink } = ReactRouterDOM

export function About() {
  return (
    <section className="about main-content">
      <nav className="about-nav">
        <NavLink to="/about/team">Team</NavLink>
        <NavLink to="/about/vision">Vision</NavLink>
      </nav>
      <section className="about-content">
        <Switch>
          <Route path="/about/team" component={Team} />
          <Route path="/about/vision" component={Vision} />
        </Switch>
      </section>
    </section>
  )
}

function Team() {
  return (
    <section className="team">
      <div>Mishu Mashu</div>
      <div>Jorge </div>
    </section>
  )
}

function Vision() {
  return (
    <section className="vision">
      <div>To take your money</div>
      <div>Sell nice books</div>
    </section>
  )
}
