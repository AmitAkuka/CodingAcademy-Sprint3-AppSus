import { MoreNotesTypes } from '../cmps/more-notes-type.jsx'

export class AddNote extends React.Component {
  state = {
    newNote: {
      type: 'note-txt',
      content: '',
    },
    isMoreTypes: false,
    isAddingRecord: false,
    isRecording: false,
    mediaRecorder: null,
  }

  inputRef = React.createRef()

  txtIcoRef = React.createRef()
  imgIcoRef = React.createRef()
  videoIcoRef = React.createRef()

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.type === 'number' ? +target.value : target.value
    this.setState((prevState) => ({
      newNote: { ...prevState.newNote, [field]: value },
    }))
  }

  onChangeNoteType = (ev, type) => {
    // changing input placeholder according to note type
    switch (type) {
      case 'note-txt':
        this.inputRef.current.placeholder = "what's on your mind..."
        break
      case 'note-img':
        this.inputRef.current.placeholder = 'Give me a link to an image'
        break
      case 'note-video':
        this.inputRef.current.placeholder = 'Give me a nice youtube link'
        break
      case 'note-todo':
        this.inputRef.current.placeholder = 'What are those todos about??'
        break
      case 'note-canvas':
        this.inputRef.current.placeholder = 'Care to title your next drawing?'
        break
      case 'note-audio':
        this.inputRef.current.placeholder = 'What are we listening to today?'
        break
      case 'note-map':
        this.inputRef.current.placeholder = 'Give us a title for this map'
        break
      case 'note-record':
        this.inputRef.current.placeholder = 'What are you recording about?'
        break
    }

    this.clearChosenTypeIcons()
    if (
      type !== 'note-canvas' &&
      type !== 'note-audio' &&
      type !== 'note-map' && 
      type !== 'note-record' &&
      type !== 'note-todo'
    ) {
      ev.target.classList.add('active')
    }


    this.setState((prevState) => {
      return { newNote: { ...prevState.newNote, type }, isAddingRecord: type === 'note-record' }
    })
  }

  onAddNote = (ev) => {
    ev.preventDefault()
    const { onAddNote } = this.props
    onAddNote(this.state.newNote)
    this.setState((prevState) => {
      return { newNote: { ...prevState.newNote, content: '' } }
    })
  }

  clearChosenTypeIcons() {
    this.txtIcoRef.current.classList.remove('active')
    this.imgIcoRef.current.classList.remove('active')
    this.videoIcoRef.current.classList.remove('active')
  }

  toggleRecord = (ev) => {
    const {isRecording} = this.state
    ev.target.classList.toggle('red')
    
    if(!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        this.setState({mediaRecorder, isRecording:true}, this.startRecording)
      })
    } else {
      this.setState({isRecording:true}, this.stopRecording)
    }
  }
  
  startRecording = () => {
    const {mediaRecorder} = this.state
    mediaRecorder.start()
    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      this.setState((prevState) => {return {newNote: {...prevState.newNote, audioUrl}}})
    });
  }

  stopRecording = () => {
    const {mediaRecorder} = this.state
    mediaRecorder.stop();
  }

  render() {
    const { newNote, isMoreTypes, isAddingRecord } = this.state
    return (
      <section className="add-note">
        <form className='add-note-form' onSubmit={this.onAddNote}>
          <input
            name="content"
            type="text"
            placeholder="Whats's on your mind..."
            onChange={this.handleChange}
            value={newNote.content}
            ref={this.inputRef}
            />
            {isAddingRecord && <i className="fa fa-circle fa-lg rec-ico" onClick={this.toggleRecord}></i>}
        </form>
        <div className="note-type-container">
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-txt')}
            className="fa fa-comment-o fa-lg active"
            ref={this.txtIcoRef}
            title="Text"
          ></i>
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-img')}
            className="fa fa-picture-o fa-lg"
            ref={this.imgIcoRef}
            title="Image"
          ></i>
          <i
            onClick={(event) => this.onChangeNoteType(event, 'note-video')}
            className="fa fa-youtube-play fa-lg"
            ref={this.videoIcoRef}
            title="Video"
          ></i>
          <i
            className="fa fa-bars fa-lg"
            title="More notes"
            onClick={() => this.setState({ isMoreTypes: !isMoreTypes })}
          ></i>
        </div>
        {isMoreTypes && (
          <MoreNotesTypes onChangeNoteType={this.onChangeNoteType} />
        )}
      </section>
    )
  }
}
