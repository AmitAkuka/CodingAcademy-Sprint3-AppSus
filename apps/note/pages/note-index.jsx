import { NoteList } from '../cmps/note-list.jsx'
import { notesService } from '../services/note.service.js'

export class NoteApp extends React.Component {
  state = {
    notes: [],
  }

  componentDidMount() {
    this.loadNotes()
  }

  loadNotes = () => {
    notesService.loadNotes().then((notes) => this.setState({ notes }))
  }

  render() {
    const { notes } = this.state
    return (
      <section className="note-app-container">
        <h1>Hello from Note App</h1>
        {notes.length ? <NoteList notes={notes} /> : 'No notes Yet'}
      </section>
    )
  }
}
