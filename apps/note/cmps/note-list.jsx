import { NotePreview } from './note-preview.jsx'

export function NoteList({ notes }) {
  return notes.map((note) => <NotePreview note={note} />)
}
