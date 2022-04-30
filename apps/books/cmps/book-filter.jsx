export class BookFilter extends React.Component {
  state = {
    filterBy: {
      title: '',
      price: null,
    },
  }

  handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value
    const field = target.name
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy)
      }
    )
  }

  onFilter = (ev) => {
    ev.preventDefault()
    this.props.onSetFilter(this.state.filterBy)
  }

  render() {
    return (
      <section className="filter">
        <form onSubmit={this.onFilter}>
          <label>
            Name:
            <input
              type="text"
              placeholder="Enter book title.."
              onChange={this.handleChange}
              name="title"
            />
          </label>
          <label>
            Price Range:
            <input
              type="range"
              min={0}
              max={150}
              onChange={this.handleChange}
              name="price"
            />
          </label>
          <button className="btn btn-filter">Filter</button>
        </form>
      </section>
    )
  }
}
