export class InlineEdit extends React.Component {
  state = {
    txt: this.props.txt,
  }

  textRef = React.createRef()

  componentDidMount() {
    this.resizeTextBox(this.textRef.current)
  }

  handleChange = ({ target }) => {
    this.resizeTextBox(target)
    this.setState({ txt: target.value })
  }

  saveTxt = () => {
    this.props.onInlineInputChange(this.state.txt)
  }

  resizeTextBox(target) {
    if (target.scrollHeight > 33) {
      target.style.height = '5px'
      target.style.height = target.scrollHeight + 'px'
    }
  }

  render() {
    const { txt } = this.state
    return (
      <div className="inline-txt-container">
        <form id="inline-form">
          <textarea
            className="inline-input"
            rows={1}
            type="text"
            name="txt"
            value={txt}
            onChange={this.handleChange}
            ref={this.textRef}
            onBlur={this.saveTxt}
          />
        </form>
      </div>
    )
  }
}
