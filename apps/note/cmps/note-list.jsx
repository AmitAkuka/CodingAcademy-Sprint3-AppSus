import { NotePreview } from './note-preview.jsx'

export function NoteList({
  notes,
  onDeleteNote,
  onPinNote,
  onChangeNoteColor,
  onAddTodo,
  onCloneNote,
  onInlineEdit,
  onRemoveTodo,
  onFinishTodo,
  onAddLocation,
}) {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NotePreview
          onPinNote={onPinNote}
          onAddTodo={onAddTodo}
          onChangeNoteColor={onChangeNoteColor}
          onDeleteNote={onDeleteNote}
          key={note.id}
          note={note}
          onCloneNote={onCloneNote}
          onInlineEdit={onInlineEdit}
          onRemoveTodo={onRemoveTodo}
          onFinishTodo={onFinishTodo}
          onAddLocation={onAddLocation}
        />
      ))}
    </section>
  )
}
