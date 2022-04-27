export class AddNote extends React.Component {
  state = {
    newNote: {
      type: 'note-txt',
      content: '',
    },
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, [field]: value },
    }))
  }

  onChangeNoteType = (type) => {
    this.setState((prevState) => {
      return { newNote: { ...prevState.newNote, type } }
    })
  }

  onAddNote = (ev) => {
    ev.preventDefault()
    const { onAddNote } = this.props
    onAddNote(this.state.newNote)
    this.setState((prevState) => {
      return { newNote: { ...prevState.newNote, content: '' } }
    })
  }

  render() {
    const { newNote } = this.state
    return (
      <section className="add-note">
        <form onSubmit={this.onAddNote}>
          <input
            name="content"
            type="text"
            placeholder="Whats's on your mind..."
            onChange={this.handleChange}
            value={newNote.content}
          />
        </form>
        <div className="note-type-container">
          <i
            onClick={() => this.onChangeNoteType('note-txt')}
            className="fa fa-comment-o fa-lg"
          ></i>
          <i
            onClick={() => this.onChangeNoteType('note-img')}
            className="fa fa-picture-o fa-lg"
          ></i>
          <i
            onClick={() => this.onChangeNoteType('note-video')}
            className="fa fa-youtube-play fa-lg"
          ></i>
          <i className="fa fa-bars fa-lg"></i>
        </div>
      </section>
    )
  }
}
