const { Link } = ReactRouterDOM

export function Logo() {
  return (
    <Link to="/">
      <h1 className="logo">MissBook</h1>
    </Link>
  )
}
