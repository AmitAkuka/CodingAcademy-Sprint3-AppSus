import { notesService } from '../services/note.service.js'
import { NoteList } from '../cmps/note-list.jsx'
import { AddNote } from '../cmps/add-note.jsx'

export class NoteApp extends React.Component {
  state = {
    notes: [],
  }

  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    notesService.query().then((notes) => this.setState({ notes }))
  }

  onAddNote = (note) => {
    notesService.addNote(note).then((notes) => this.setState({ notes }))
  }

  onDeleteNote = (noteId) => {
    notesService.deleteNote(noteId).then((notes) => this.setState({ notes }))
  }

  onChangeNoteColor = (noteId, color) => {
    notesService
      .changeNoteColor(noteId, color)
      .then((notes) => this.setState({ notes }))
      .then('color changed')
  }

  render() {
    const { notes } = this.state
    return (
      <section className="note-app-container">
        <h1>Hello from Note App</h1>
        <AddNote onAddNote={this.onAddNote} />
        {notes.length ? (
          <NoteList
            onChangeNoteColor={this.onChangeNoteColor}
            onDeleteNote={this.onDeleteNote}
            notes={notes}
          />
        ) : (
          'No notes Yet'
        )}
      </section>
    )
  }
}
