import { ColorPicker } from './color-picker.jsx'
import { notesService } from '../services/note.service.js'
import { NoteContent } from './dynamic-note-content.jsx'
import { InlineEdit } from './inline-edit.jsx'

const { withRouter } = ReactRouterDOM

class _NotePreview extends React.Component {
  state = {
    isPainting: false,
  }

  noteRef = React.createRef()

  openPainting = () => {
    if (this.state.isPainting) return
    this.setState({ isPainting: true })
  }
  closePainting = () => {
    this.setState({ isPainting: false })
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
    this.props.onInlineInputChange(this.props.note.id, txt)
  }

  onRemoveTodo = (todoId) => {
    this.props.onRemoveTodo(this.props.note.id, todoId)
  }

  onFinishTodo = (todoId) => {
    this.props.onFinishTodo(this.props.note.id, todoId)
  }

  onAddLocation = (pos) => {
    this.props.onAddLocation(this.props.note.id, pos)
  }

  sendToMail = (note) => {
    let subject = ''
    let body = ''

    switch (note.type) {
      case 'note-txt':
        subject = 'New email'
        body = note.info.txt
        break
      case 'note-img':
        subject = 'Come see this image!!!'
        body = note.info.imgUrl
        break
      case 'note-video':
        subject = 'Come see this crazy video!!!'
        body = note.info.videoUrl
        break
      case 'note-todo':
        subject = 'My missions for today'
        body = note.info
        break
      case 'note-audio':
        subject = 'You have to listen to this'
        body = note.info.audioUrl
        break
      case 'note-map':
        subject = 'Check out these locations'
        body = note.info.locations
        break
    }

    const urlSrcPrm = new URLSearchParams({ subject, body, to: '' })
    const searchStr = urlSrcPrm.toString()
    this.props.history.push(`/Emails/Inbox?${searchStr}`)
  }

  render() {
    const { isPainting } = this.state
    const { note, onPinNote, onCloneNote } = this.props
    const { id, style } = note

    return (
      <div className="note" style={note.style} ref={this.noteRef}>
        <div>
          {note.isPinned && (
            <img
              className="pin-img"
              src="../../../assets/img/pin-ico.png"
            ></img>
          )}
          <div className="note-content">
            <NoteContent
              note={note}
              onRemoveTodo={this.onRemoveTodo}
              onAddTodo={this.onAddTodo}
              onFinishTodo={this.onFinishTodo}
              onAddLocation={this.onAddLocation}
              onInlineInputChange={this.onInlineInputChange}
            />
            {note.type !== 'note-txt' && (
              <InlineEdit
                txt={note.desc}
                onInlineInputChange={this.onInlineInputChange}
              />
            )}
          </div>
        </div>
        <div className="note-footer">
          <span
            className={
              style && style.backgroundColor === 'yellow'
                ? 'created-at dark'
                : 'created-at'
            }
          >
            {note.createdAt}
          </span>
          <div className="tools-container">
            <i
              title="Pin note"
              onClick={() => onPinNote(id)}
              className="fa fa-thumb-tack fa-md"
            ></i>
            <i
              title="Clone note"
              onClick={() => onCloneNote(note)}
              className="fa fa-clone fa-md"
            ></i>
            <i
              title="Send via email"
              onClick={() => this.sendToMail(note)}
              className="fa fa-envelope fa-md"
            ></i>
            <i
              title="Background color"
              onClick={this.openPainting}
              className="fa fa-paint-brush fa-md"
            ></i>
            <i
              title="Delete"
              onClick={() => this.onDeleteNote(id)}
              className="fa fa-trash fa-lg"
            ></i>
          </div>
        </div>
        {isPainting && (
          <ColorPicker
            closePainting={this.closePainting}
            onChangeNoteColor={this.onChangeNoteColor}
          />
        )}
      </div>
    )
  }
}

export const NotePreview = withRouter(_NotePreview)
