const { Link } = ReactRouterDOM

export class Home extends React.Component {
  render() {
    return (
      <section className="hero main-content">
        <div className="hero-content">
          <h2>Books, Books, Books</h2>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            qui maiores reprehenderit excepturi harum. Dolorum atque cupiditate
            dolore earum nisi?
          </p>
          <Link to="/book-app">
            <button className="btn">Explore</button>
          </Link>
        </div>
        <img src="../assets/img/hero-img.png" alt="" />
      </section>
    )
  }
}
