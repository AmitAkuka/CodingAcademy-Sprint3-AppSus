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

  txtIcoRef = React.createRef()
  imgIcoRef = React.createRef()
  videoIcoRef = React.createRef()
  todoIcoRef = React.createRef()

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, [field]: value },
    }))
  }

  onChangeNoteType = (ev, type) => {
    // changing input placeholder according to note type
    switch (type) {
      case 'note-txt':
        this.inputRef.current.placeholder = "what's on your mind..."
        break
      case 'note-img':
        this.inputRef.current.placeholder = 'Give me a link to an image'
        break
      case 'note-video':
        this.inputRef.current.placeholder = 'Give me a nice youtube link'
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
      case 'note-map':
        this.inputRef.current.placeholder = 'Give us a title for this map'
        break
    }

    this.clearChosenTypeIcons()
    if (
      type !== 'note-canvas' &&
      type !== 'note-audio' &&
      type !== 'note-map'
    ) {
      ev.target.classList.add('active')
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

  clearChosenTypeIcons() {
    this.txtIcoRef.current.classList.remove('active')
    this.imgIcoRef.current.classList.remove('active')
    this.videoIcoRef.current.classList.remove('active')
    this.todoIcoRef.current.classList.remove('active')
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
            onClick={(event) => this.onChangeNoteType(event, 'note-txt')}
            className="fa fa-comment-o fa-lg active"
            ref={this.txtIcoRef}
          ></i>
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-img')}
            className="fa fa-picture-o fa-lg"
            ref={this.imgIcoRef}
          ></i>
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-video')}
            className="fa fa-youtube-play fa-lg"
            ref={this.videoIcoRef}
          ></i>
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-todo')}
            className="fa fa-list fa-lg"
            ref={this.todoIcoRef}
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
