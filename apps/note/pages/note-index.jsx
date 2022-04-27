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
    console.log(this.state.notes)
  }

  onAddNote = (ev, note) => {
    ev.preventDefault()
    notesService.addNote(note).then((notes) => this.setState({ notes }))
  }

  render() {
    const { notes } = this.state
    return (
      <section className="note-app-container">
        <h1>Hello from Note App</h1>
        <AddNote onAddNote={this.onAddNote} />
        {notes.length ? <NoteList notes={notes} /> : 'No notes Yet'}
      </section>
    )
  }
}
