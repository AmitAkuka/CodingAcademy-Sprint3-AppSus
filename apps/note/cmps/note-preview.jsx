import { ColorPicker } from './color-picker.jsx'
import { Todos } from './todo.jsx'

export class NotePreview extends React.Component {
  state = {
    isPainting: false,
  }

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

  render() {
    const { isPainting } = this.state
    const { note, onDeleteNote, onPinNote, onCloneNote } = this.props
    const { id, info } = note
    return (
      <div className="note" style={note.style}>
        {note.isPinned && (
          <img className="pin-img" src="../../assets/img/pin-ico.png"></img>
        )}
        <div className="note-content">
          {getNoteContent(info, this.onAddTodo)}
        </div>
        <div className="note-footer">
          <span className="created-at">{note.createdAt}</span>
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
              onClick={() => {
                onDeleteNote(id)
              }}
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

function getNoteContent(info, onAddTodo) {
  if (info.txt) return <span contentEditable>{info.txt}</span>
  if (info.imgUrl) return <img src={info.imgUrl}></img>
  if (info.videoUrl)
    return (
      <iframe
        src={`https://www.youtube.com/embed/${getVideoId(info.videoUrl)}`}
      ></iframe>
    )
  if (info.todos) return <Todos info={info} onAddTodo={onAddTodo} />
}

function getVideoId(videoUrl) {
  return videoUrl.substring(videoUrl.indexOf('=') + 1)
}
