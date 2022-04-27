import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote }) {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NotePreview onDeleteNote={onDeleteNote} key={note.id} note={note} />
      ))}
    </section>
  )
}
