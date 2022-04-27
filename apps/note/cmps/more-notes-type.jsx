export function MoreNotesTypes({ onChangeNoteType }) {
  return (
    <div className="more-types-container fade-in">
      <i
        onClick={(event) => onChangeNoteType(event, 'note-canvas')}
        className="fa fa-pencil-square-o fa-lg"
      ></i>
      <i
        onClick={(event) => onChangeNoteType(event, 'note-audio')}
        className="fa fa-volume-up fa-lg"
      ></i>
    </div>
  )
}
