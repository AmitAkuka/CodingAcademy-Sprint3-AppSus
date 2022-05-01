export class ColorPicker extends React.Component {
  pickerRef = React.createRef()

  componentDidMount() {
    document.addEventListener('click', this.closePainting)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePainting)
  }

  closePainting = (ev) => {
    const { closePainting } = this.props
    if (!this.pickerRef.current.contains(ev.target)) {
      this.pickerRef.current.classList.add('fade-out')
      setTimeout(closePainting, 1200)
    }
  }

  render() {
    const { onChangeNoteColor } = this.props
    return (
      <div className="color-picker fade-in" ref={this.pickerRef}>
        <div
          onClick={() => onChangeNoteColor('f28b82')}
          className="color red"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#ccff90')}
          className="color green"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#aecbfa')}
          className="color blue"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#fff475')}
          className="color yellow"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#d7aefb')}
          className="color purple"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#e6c9a8')}
          className="color brown"
        ></div>
        <div
          onClick={() => onChangeNoteColor('#fdcfe8')}
          className="color pink"
        ></div>
      </div>
    )
  }
}
