import { ColorPicker } from './color-picker.jsx'
import { InlineEdit } from './inline-edit.jsx'
import { notesService } from '../services/note.service.js'
import { Todos } from './todo.jsx'

export class NotePreview extends React.Component {
  state = {
    isPainting: false,
  }

  noteRef = React.createRef()

  togglePainting = () => {
    this.setState({ isPainting: !this.state.isPainting })
  }

  onChangeNoteColor = (color) => {
    this.props.onChangeNoteColor(this.props.note.id, color)
  }

  onAddTodo = (todo) => {
    this.props.onAddTodo(this.props.note.id, todo)
  }

  onCloneNote = () => {
    this.props.onCloneNote(this.props.note)
  }

  onDeleteNote = (id) => {
    this.noteRef.current.classList.add('fall-down-fade')
    this.props.onDeleteNote(id)
  }

  onInlineInputChange = (txt) => {
    notesService
      .updateNoteTxt(this.props.note.id, txt)
      .then((notes) => this.setState({ notes }))
  }

  onRemoveTodo = (todoId) => {
    this.props.onRemoveTodo(this.props.note.id, todoId)
  }

  onFinishTodo = (todoId) => {
    this.props.onFinishTodo(this.props.note.id, todoId)
  }

  getNoteContent = () => {
    const { info } = this.props.note
    if (info.txt)
      return (
        <InlineEdit
          txt={info.txt}
          onInlineInputChange={this.onInlineInputChange}
        />
      )
    if (info.imgUrl) return <img src={info.imgUrl}></img>
    if (info.videoUrl)
      return (
        <iframe
          src={`https://www.youtube.com/embed/${getVideoId(info.videoUrl)}`}
        ></iframe>
      )
    if (info.todos)
      return (
        <Todos
          onRemoveTodo={this.onRemoveTodo}
          info={info}
          onAddTodo={this.onAddTodo}
          onFinishTodo={this.onFinishTodo}
        />
      )
    if (info.canvasHeading)
      return (
        <div className="canvas-container">
          <h3>{info.canvasHeading}</h3>
          <canvas width="100%" height="100%"></canvas>
        </div>
      )
  }

  render() {
    const { isPainting } = this.state
    const { note, onPinNote, onCloneNote } = this.props
    const { id } = note
    return (
      <div className="note" style={note.style} ref={this.noteRef}>
        <div>
          <span className="created-at">{note.createdAt}</span>
          {note.isPinned && (
            <img className="pin-img" src="../../assets/img/pin-ico.png"></img>
          )}
          <div className="note-content">{this.getNoteContent()}</div>
        </div>
        <div className="note-footer">
          <div className="tools-container fa-md">
            <i
              onClick={() => onPinNote(id)}
              className="fa fa-thumb-tack fa-md"
            ></i>
            <i
              onClick={() => onCloneNote(note)}
              className="fa fa-clone fa-md"
            ></i>
            <i className="fa fa-envelope fa-md"></i>
            <i
              onClick={this.togglePainting}
              className="fa fa-paint-brush fa-md"
            ></i>
            <i
              onClick={() => this.onDeleteNote(id)}
              className="fa fa-trash fa-lg"
            ></i>
          </div>
        </div>
        {isPainting && (
          <ColorPicker onChangeNoteColor={this.onChangeNoteColor} />
        )}
      </div>
    )
  }
}

function getVideoId(videoUrl) {
  return videoUrl.substring(videoUrl.indexOf('=') + 1)
}
