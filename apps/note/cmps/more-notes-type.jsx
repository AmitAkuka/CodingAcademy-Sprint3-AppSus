export function MoreNotesTypes({ onChangeNoteType }) {
  return (
    <div className="more-types-container fade-in">
      <i
        onClick={(event) => onChangeNoteType(event, 'note-canvas')}
        className="fa fa-pencil-square-o fa-lg"
        title="Canvas"
      ></i>
      <i
        onClick={(event) => onChangeNoteType(event, 'note-audio')}
        className="fa fa-volume-up fa-lg"
        title="Audio"
      ></i>
      <i
        onClick={(event) => onChangeNoteType(event, 'note-map')}
        className="fa fa-map-o fa-lg"
        title="Map"
      ></i>
      <i class="fa fa-microphone fa-lg" title="Record" onClick={(event) => onChangeNoteType(event, 'note-record')}></i>
      <i
            onClick={(event) => onChangeNoteType(event, 'note-todo')}
            className="fa fa-list fa-lg"
            title="Todo"
          ></i>
    </div>
    
  )
}
