export function NotePreview({ note }) {
  return (
    <div className="note">
      <span>{note.info.txt}</span>
    </div>
  )
}
