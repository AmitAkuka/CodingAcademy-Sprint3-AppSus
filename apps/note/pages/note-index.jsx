import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'
import { FilterNotes } from '../cmps/filter-notes.jsx'

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
    console.log(urlSrcPrm)
    // let paramObj = {}
    // for (var value of urlSrcPrm.keys()) {
    //     paramObj[value] = urlSrcPrm.get(value);
    // }
    // if (!Object.keys(paramObj)) paramObj = null
    // console.log(paramObj);
    // this.setState(prevState => ({ ...prevState, filterBy: paramObj }), () => {
    //     this.loadCars()
    // })
    this.loadNotes()
  }

  loadNotes = () => {
    notesService
      .query(this.state.filterBy)
      .then((notes) => this.setState({ notes }))
  }

  onAddNote = (note) => {
    notesService.addNote(note).then(this.loadNotes)
  }

  onDeleteNote = (noteId) => {
    setTimeout(() => {
      notesService.deleteNote(noteId).then(this.loadNotes)
    }, 1000)
  }

  onChangeNoteColor = (noteId, color) => {
    notesService.changeNoteColor(noteId, color).then(this.loadNotes)
  }

  onPinNote = (noteId) => {
    notesService.pinNote(noteId).then(this.loadNotes)
  }

  onAddTodo = (noteId, todo) => {
    notesService.addTodo(noteId, todo).then(this.loadNotes)
  }

  onCloneNote = (note) => {
    notesService.cloneNote(note).then(this.loadNotes)
  }

  onInlineEdit = (noteId, value) => {
    notesService.onInlineEdit(noteId, value).then(this.loadNotes())
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadNotes)
  }

  onRemoveTodo = (noteId, todoId) => {
    notesService.removeTodo(noteId, todoId).then(this.loadNotes())
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
      <section className="note-app-container">
        <FilterNotes onChangeFilter={this.onChangeFilter} />
        <AddNote onAddNote={this.onAddNote} />
        {notes.length ? (
          <section className="all-notes-container">
            <NoteList
              onPinNote={this.onPinNote}
              onChangeNoteColor={this.onChangeNoteColor}
              onDeleteNote={this.onDeleteNote}
              notes={this.getPinnedNotes(notes)}
              onAddTodo={this.onAddTodo}
              onCloneNote={this.onCloneNote}
              onInlineEdit={this.onInlineEdit}
              onRemoveTodo={this.onRemoveTodo}
              onFinishTodo={this.onFinishTodo}
              onAddLocation={this.onAddLocation}
            />
            <NoteList
              onPinNote={this.onPinNote}
              onChangeNoteColor={this.onChangeNoteColor}
              onDeleteNote={this.onDeleteNote}
              notes={this.getRegNotes(notes)}
              onAddTodo={this.onAddTodo}
              onCloneNote={this.onCloneNote}
              onInlineEdit={this.onInlineEdit}
              onRemoveTodo={this.onRemoveTodo}
              onFinishTodo={this.onFinishTodo}
              onAddLocation={this.onAddLocation}
            />
          </section>
        ) : (
          'No notes Yet'
        )}
      </section>
    )
  }
}
