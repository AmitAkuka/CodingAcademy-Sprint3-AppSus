export class InlineEdit extends React.Component {
  state = {
    isEditing: false,
    txt: this.props.txt,
  }

  handleChange = ({ target }) => {
    this.setState({ txt: target.value })
  }

  onInlineEdit = () => {
    this.setState({ isEditing: true })
  }

  onInlineInputChange = (ev) => {
    ev.preventDefault()
    this.props.onInlineInputChange(this.state.txt)
    this.setState({ isEditing: false })
  }

  render() {
    const { txt, isEditing } = this.state
    return (
      <div className="inline-txt-container">
        {!isEditing && <span onDoubleClick={this.onInlineEdit}>{txt}</span>}
        {isEditing && (
          <form onSubmit={this.onInlineInputChange} id="inline-form">
            <input
              className="inline-input"
              type="text"
              name="txt"
              placeholder="text"
              value={txt}
              onChange={this.handleChange}
            />
          </form>
        )}
      </div>
    )
  }
}
