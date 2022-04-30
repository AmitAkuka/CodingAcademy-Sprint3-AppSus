import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { AppHeader } from '../../../cmps/app-header.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'

export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: {
      txt: '',
      type: 'all',
    },
  }

  componentDidMount() {
    const urlSrcPrm = new URLSearchParams(this.props.location.search)
    let paramObj = {}
    for (var value of urlSrcPrm.keys()) {
      paramObj[value] = urlSrcPrm.get(value)
    }
    if (Object.keys(paramObj).length) {
      const newNote = {
        type: 'note-email',
        content: {
          body: paramObj.body,
          subject: paramObj.subject,
          to: paramObj.to,
        },
      }

      this.onAddNote(newNote)
      return
    }
    this.loadNotes()
  }

  loadNotes = () => {
    notesService
      .query(this.state.filterBy)
      .then((notes) => this.setState({ notes }))
  }

  onAddNote = (note) => {
    notesService.addNote(note).then(this.loadNotes)
    eventBusService.emit('user-msg', {
      type: 'success',
      txt: 'Note added succesfuly!',
    })
  }

  onDeleteNote = (noteId) => {
    setTimeout(() => {
      notesService.deleteNote(noteId).then(this.loadNotes)
    }, 1000)

    eventBusService.emit('user-msg', {
      type: 'danger',
      txt: 'Note deleted!',
    })
  }

  onChangeNoteColor = (noteId, color) => {
    notesService.changeNoteColor(noteId, color).then(this.loadNotes)
  }

  onPinNote = (noteId) => {
    notesService.pinNote(noteId).then(this.loadNotes)
    eventBusService.emit('user-msg', {
      type: 'success',
      txt: 'Note pinned!',
    })
  }

  onAddTodo = (noteId, todo) => {
    notesService.addTodo(noteId, todo).then(this.loadNotes)
    eventBusService.emit('user-msg', {
      type: 'success',
      txt: 'Todo added!',
    })
  }

  onCloneNote = (note) => {
    notesService.cloneNote(note).then(this.loadNotes)
    eventBusService.emit('user-msg', {
      type: 'success',
      txt: 'Note cloned!',
    })
  }

  onInlineInputChange = (noteId, value) => {
    notesService.updateNoteTxt(noteId, value).then(this.loadNotes())
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadNotes)
  }

  onRemoveTodo = (noteId, todoId) => {
    notesService.removeTodo(noteId, todoId).then(this.loadNotes())
    eventBusService.emit('user-msg', {
      type: 'danger',
      txt: 'Todo removed!',
    })
  }

  onFinishTodo = (noteId, todoId) => {
    notesService.finishTodo(noteId, todoId).then(this.loadNotes())
  }

  onAddLocation = (noteId, pos) => {
    notesService.addLoc(noteId, pos).then(this.loadNotes)
  }

  getPinnedNotes(notes) {
    return notes.filter((note) => note.isPinned)
  }

  getRegNotes(notes) {
    return notes.filter((note) => !note.isPinned)
  }

  render() {
    const { notes } = this.state
    return (
      <React.Fragment>
        <AppHeader onFilter={this.onChangeFilter} />
        <section className="note-app-container">
          <AddNote onAddNote={this.onAddNote} />
          {notes.length ? (
            <section className="all-notes-container">
              <h3>Pinned notes</h3>
              <NoteList
                onPinNote={this.onPinNote}
                onChangeNoteColor={this.onChangeNoteColor}
                onDeleteNote={this.onDeleteNote}
                notes={this.getPinnedNotes(notes)}
                onAddTodo={this.onAddTodo}
                onCloneNote={this.onCloneNote}
                onInlineInputChange={this.onInlineInputChange}
                onRemoveTodo={this.onRemoveTodo}
                onFinishTodo={this.onFinishTodo}
                onAddLocation={this.onAddLocation}
              />
              <h3>Regular notes</h3>
              <NoteList
                onPinNote={this.onPinNote}
                onChangeNoteColor={this.onChangeNoteColor}
                onDeleteNote={this.onDeleteNote}
                notes={this.getRegNotes(notes)}
                onAddTodo={this.onAddTodo}
                onCloneNote={this.onCloneNote}
                onInlineInputChange={this.onInlineInputChange}
                onRemoveTodo={this.onRemoveTodo}
                onFinishTodo={this.onFinishTodo}
                onAddLocation={this.onAddLocation}
              />
            </section>
          ) : (
            'No notes Yet'
          )}
        </section>
      </React.Fragment>
    )
  }
}
