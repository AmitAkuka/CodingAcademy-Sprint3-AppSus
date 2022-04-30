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

  getNoteContent = () => {
    const { info, id } = this.props.note
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
    if (info.audioLink)
      return (
        <audio controls autoplay>
          <source src={info.audioLink} type="audio/mp3" />
        </audio>
      )

    if (info.locations)
      return (
        <MapNote
          onAddLocation={this.onAddLocation}
          mapId={info.mapId}
          locations={info.locations}
        />
      )
  }

  render() {

    const { isPainting } = this.state
    const { note, onPinNote, onCloneNote } = this.props
    const { id, style } = note


    return (
      <div className="note" style={note.style} ref={this.noteRef}>
        <div>
          {note.isPinned && (
            <img className="pin-img" src='../../../assets/img/pin-ico.png'></img>
          )}
          <div className="note-content">
            <NoteContent 
              note={note} 
              onRemoveTodo={this.onRemoveTodo} 
              onAddTodo={this.onAddTodo} 
              onFinishTodo={this.onFinishTodo} 
              onAddLocation={this.onAddLocation} />
              {note.type !== 'note-txt' && <InlineEdit txt={note.desc} onInlineInputChange={this.onInlineInputChange}/>}
          </div>
        </div>
        <div className="note-footer">
          <span className={style && style.backgroundColor === 'yellow' ? 'created-at dark' : 'created-at'}>{note.createdAt}</span>
          <div className="tools-container">
            <i
              onClick={() => onPinNote(id)}
              className="fa fa-thumb-tack fa-md"
            ></i>
            <i
              onClick={() => onCloneNote(note)}
              className="fa fa-clone fa-md"
            ></i>
            <i
              onClick={() => this.sendToMail(note)}
              className="fa fa-envelope fa-md"
            ></i>
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


export const NotePreview = withRouter(_NotePreview)
