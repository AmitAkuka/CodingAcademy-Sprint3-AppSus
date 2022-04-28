export class EmailFilter extends React.Component {

  state = {
    filterName: 'All'
  }

  onChangeFilter = (unreadReadFilter) => {
    this.setState({filterName: unreadReadFilter })
    this.props.onFilterEmails({ unreadReadFilter })
  }

  render() {
    const { filterName } = this.state
    console.log(filterName)
    return <section className="email-filter-container">
      <section className="sub-filter-container">
        <button className={(filterName === 'All') ? 'Active' : ''} onClick={() => this.onChangeFilter('All')} >All</button>
        <button className={(filterName === 'Read') ? 'Active' : ''} onClick={() => this.onChangeFilter('Read')} >Read</button>
        <button className={(filterName === 'Unread') ? 'Active' : ''} onClick={() => this.onChangeFilter('Unread')} >Unread</button>
      </section>
    </section>
  }
}