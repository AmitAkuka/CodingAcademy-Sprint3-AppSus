export function NotePreview({ note, onDeleteNote }) {
  const { id, info } = note
  return (
    <div className="note">
      <div className="note-content">
        <span>{getNoteContent(info)}</span>
      </div>
      <div className="note-footer">
        <span className="created-at">{note.createdAt}</span>
        <div className="tools-container fa-md">
          <i className="fa fa-thumb-tack fa-md"></i>
          <i className="fa fa-pencil-square-o fa-md"></i>
          <i className="fa fa-envelope fa-md"></i>
          <i className="fa fa-paint-brush fa-md"></i>
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

function getNoteContent(info) {
  if (info.txt) return info.txt
  if (info.imgUrl) return <img src={info.imgUrl}></img>
  if (info.videoUrl)
    return (
      <iframe
        src={`https://www.youtube.com/embed/${getVideoId(info.videoUrl)}`}
      ></iframe>
    )
}

function getVideoId(videoUrl) {
  return videoUrl.substring(videoUrl.indexOf('=') + 1)
}
