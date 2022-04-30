export class MoreNotesTypes extends React.Component {
  moreTypes = React.createRef()

  componentDidMount() {
    document.addEventListener('click', this.closeMoreTypes)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMoreTypes)
  }

  closeMoreTypes = (ev) => {
    const { closeMoreTypes } = this.props
    if (!this.moreTypes.current.contains(ev.target)) {
      this.moreTypes.current.classList.add('fade-out')
      setTimeout(closeMoreTypes, 1200)
    }
  }
  render() {
    const { onChangeNoteType } = this.props
    return (
      <div className="more-types-container fade-in" ref={this.moreTypes}>
        <i
          onClick={(event) => onChangeNoteType(event, 'note-canvas')}
          className="fa fa-pencil-square-o fa-lg"
          title="Canvas"
        ></i>
        <i
          onClick={(event) => onChangeNoteType(event, 'note-audio')}
          className="fa fa-volume-up fa-lg"
          title="Audio"
        ></i>
        <i
          onClick={(event) => onChangeNoteType(event, 'note-map')}
          className="fa fa-map-o fa-lg"
          title="Map"
        ></i>
        <i
          className="fa fa-microphone fa-lg"
          title="Record"
          onClick={(event) => onChangeNoteType(event, 'note-record')}
        ></i>
        <i
          onClick={(event) => onChangeNoteType(event, 'note-todo')}
          className="fa fa-list fa-lg"
          title="Todo"
        ></i>
      </div>
    )
  }
}
