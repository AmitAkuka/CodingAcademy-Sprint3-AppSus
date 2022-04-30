export class FilterNotes extends React.Component {
  state = {
    filterBy: {
      txt: '',
      type: 'all',
    },
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    this.setState(
      (prevState) => ({
        filterBy: { ...prevState.filterBy, [field]: value },
      }),
      this.onSearch
    )
  }

  onSearch = (ev) => {
    if (ev) ev.preventDefault()
    const { filterBy } = this.state
    this.props.onChangeFilter(filterBy)
  }

  render() {
    const { filterBy } = this.state
    return (
      <div className="notes-filter-container">
        <section className="main-input-container">
        <form onSubmit={this.onSearch}>
        <i className="fa fa-search"></i>
          <input
            onChange={this.handleChange}
            type="text"
            name="txt"
            placeholder="Search here..."
            value={filterBy.txt}
            disabled={filterBy.type !== 'note-txt'}
          />
          <select className="sort-filter" onChange={this.handleChange} name="type">
            <option value="all">All</option>
            <option value="note-txt">Text</option>
            <option value="note-img">Image</option>
            <option value="note-video">Video</option>
            <option value="note-todo">Todos</option>
            <option value="note-pinned">Pinned</option>
          </select>
        </form>
        </section>
      </div>
    )
  }
}
