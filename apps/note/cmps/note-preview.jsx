export function NotePreview({ note, onDeleteNote }) {
  const { id, info } = note
  return (
    <div className="note">
      <div className="note-content">
        <span>{info.txt}</span>
      </div>
      <div className="note-footer">
        {/* <span className="created-at">{note.createdAt}</span> */}
        <div className="tools-container fa-lg">
          <i className="fa fa-thumb-tack fa-lg"></i>
          <i className="fa fa-pencil-square-o fa-lg"></i>
          <i className="fa fa-envelope fa-lg"></i>
          <i className="fa fa-paint-brush fa-lg"></i>
          <i
            onClick={() => {
              onDeleteNote(id)
            }}
            className="fa fa-trash fa-lg"
          ></i>
        </div>
      </div>
    </div>
  )
}
