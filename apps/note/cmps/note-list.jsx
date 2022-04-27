import { NotePreview } from './note-preview.jsx'

export function NoteList({
  notes,
  onDeleteNote,
  onPinNote,
  onChangeNoteColor,
}) {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NotePreview
          onPinNote={onPinNote}
          onChangeNoteColor={onChangeNoteColor}
          onDeleteNote={onDeleteNote}
          key={note.id}
          note={note}
        />
      ))}
    </section>
  )
}
