import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes, onDeleteNote, onChangeNoteColor }) {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NotePreview
          onChangeNoteColor={onChangeNoteColor}
          onDeleteNote={onDeleteNote}
          key={note.id}
          note={note}
        />
      ))}
    </section>
  )
}
