export class EmailFilter extends React.Component{

  state = {
    emailStateFilter: 'All'
  }

  render(){
    const {emailStateFilter: activeFilter} = this.state
    return <section className="email-filter-container">
      <section className="sub-filter-container">
        <button className={(activeFilter === 'All') ? 'selected' : ''}>All</button>
        <button className={(activeFilter === 'Read') ? 'selected' : ''}>Read</button>
        <button className={(activeFilter === 'Unread') ? 'selected' : ''}>Unread</button>
      </section>
    </section>
  }
}