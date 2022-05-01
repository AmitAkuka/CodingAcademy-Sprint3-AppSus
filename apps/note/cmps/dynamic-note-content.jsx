import { MapNote } from './map-note.jsx'
import { Todos } from './todo.jsx'
import { InlineEdit } from './inline-edit.jsx'
import { NoteCanvas } from './note-canvas.jsx'

export class NoteContent extends React.Component {
  render() {
    const NoteContent = ({
      note,
      onAddLocation,
      onAddTodo,
      onFinishTodo,
      onRemoveTodo,
      onInlineInputChange,
    }) => {
      const { type, info } = note
      switch (type) {
        case 'note-txt':
          return (
            <InlineEdit
              txt={info.txt}
              onInlineInputChange={onInlineInputChange}
            />
          )
        case 'note-img':
          return <img src={info.imgUrl}></img>
        case 'note-video':
          return (
            <iframe
              src={`https://www.youtube.com/embed/${getVideoId(info.videoUrl)}`}
            ></iframe>
          )
        case 'note-todo':
          return (
            <Todos
              onRemoveTodo={onRemoveTodo}
              info={info}
              onAddTodo={onAddTodo}
              onFinishTodo={onFinishTodo}
            />
          )
        case 'note-audio':
          return (
            <audio controls>
              <source src={info.audioLink} type="audio/mp3" />
            </audio>
          )
        case 'note-canvas':
          return <NoteCanvas />
        case 'note-map':
          return (
            <MapNote
              onAddLocation={onAddLocation}
              mapId={info.mapId}
              locations={info.locations}
            />
          )
        case 'note-record':
          return (
            <div className="recorded-container">
              <h3>{info.noteHeading}</h3>
              <audio controls autoplay>
                <source src={info.audioUrl} type="audio/mp3" />
              </audio>
            </div>
          )
        case 'note-email':
          return (
            <div className="email-note-container">
              <div className="email-note-header">
                <h3>{info.subject}</h3>
                <h4>From: {info.to}</h4>
              </div>
              <InlineEdit
                txt={info.body}
                onInlineInputChange={onInlineInputChange}
              />
            </div>
          )
      }
    }

    const {
      note,
      onAddLocation,
      onAddTodo,
      onFinishTodo,
      onRemoveTodo,
      onInlineInputChange,
    } = this.props
    return (
      <React.Fragment>
        <NoteContent
          note={note}
          onRemoveTodo={onRemoveTodo}
          onInlineInputChange={onInlineInputChange}
          onAddLocation={onAddLocation}
          onAddTodo={onAddTodo}
          onFinishTodo={onFinishTodo}
        />
      </React.Fragment>
    )
  }
}

function getVideoId(videoUrl) {
  return videoUrl.substring(videoUrl.indexOf('=') + 1)
}
