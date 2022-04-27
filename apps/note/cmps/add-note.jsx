import { MoreNotesTypes } from '../cmps/more-notes-type.jsx'

export class AddNote extends React.Component {
  state = {
    newNote: {
      type: 'note-txt',
      content: '',
    },
    isMoreTypes: false,
  }

  inputRef = React.createRef()

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, [field]: value },
    }))
  }

  onChangeNoteType = (type) => {
    // changing input placeholder according to note type
    switch (type) {
      case 'note-txt':
        this.inputRef.current.placeholder = "what's on your mind..."
        break
      case 'note-img':
        this.inputRef.current.placeholder = 'Give me a link to an image'
        break
      case 'note-video':
        this.inputRef.current.placeholder = 'Give a nice youtube link'
        break
      case 'note-todo':
        this.inputRef.current.placeholder = 'What are those todos about??'
        break
      case 'note-canvas':
        this.inputRef.current.placeholder = 'Care to title your next drawing?'
        break
      case 'note-audio':
        this.inputRef.current.placeholder = 'What are we listening to today?'
        break
    }

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
    const { newNote, isMoreTypes } = this.state
    return (
      <section className="add-note">
        <form onSubmit={this.onAddNote}>
          <input
            name="content"
            type="text"
            placeholder="Whats's on your mind..."
            onChange={this.handleChange}
            value={newNote.content}
            ref={this.inputRef}
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
          <i
            onClick={() => this.onChangeNoteType('note-todo')}
            className="fa fa-list fa-lg"
          ></i>
          <i
            className="fa fa-bars fa-lg"
            onClick={() => this.setState({ isMoreTypes: !isMoreTypes })}
          ></i>
        </div>
        {isMoreTypes && (
          <MoreNotesTypes onChangeNoteType={this.onChangeNoteType} />
        )}
      </section>
    )
  }
}
