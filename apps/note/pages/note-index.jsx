import { NoteList } from '../cmps/note-list.jsx'

export class NoteApp extends React.Component {
  state = {
    notes: [
      {
        txt: 'I am a note',
      },
    ],
  }

  render() {
    const { notes } = this.state
    return (
      <section className="note-app-container">
        <h1>Hello from Note App</h1>
        <NoteList notes={notes} />
      </section>
    )
  }
}
