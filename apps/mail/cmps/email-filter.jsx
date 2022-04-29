export class EmailFilter extends React.Component {

  state = {
    unreadReadFilter: 'All',
    searchStrFilter: '',
    emailParamFilter: 'Date'
  }

  onChangeFilter = (filter) => {
    const filterName = Object.keys(filter)[0]
    const filterValue = Object.values(filter)[0]
    this.setState({[filterName]: filterValue})
    this.props.onFilterEmails({[filterName]: filterValue})
  }

  handleChange = ({ target }) => {
    const searchStrFilter = target.value.toLowerCase()
    this.setState({ searchStrFilter })
    this.props.onFilterEmails({ searchStrFilter })
  }

  render() {
    const { unreadReadFilter, searchStrFilter } = this.state
    console.log(unreadReadFilter)
    return <section className="email-filter-container" value={searchStrFilter} >
      <section className="main-input-container">
        <i className="fa fa-search"></i>
        <input type="text" placeholder="Search here..." onChange={this.handleChange} />
          <select className="sort-filter" onChange={(event) => this.onChangeFilter({emailParamFilter: (event.target.value)})}>
            <option value="Date">Sort by Date</option>
            <option value="Name">Sort by Name</option>
            <option value="Subject">Sort by Subject</option>
          </select>
          </section>
            <section className="sub-filter-container">
              <button className={(unreadReadFilter === 'All') ? 'Active' : ''} onClick={() => this.onChangeFilter({unreadReadFilter: 'All'})} ><span><span>All</span></span></button>
              <button className={(unreadReadFilter === 'Read') ? 'Active' : ''} onClick={() => this.onChangeFilter({unreadReadFilter: 'Read'})} ><span><span>Read</span></span></button>
              <button className={(unreadReadFilter === 'Unread') ? 'Active' : ''} onClick={() => this.onChangeFilter({unreadReadFilter: 'Unread'})} ><span><span>Unread</span></span></button>
            </section>
          </section>
  }
}