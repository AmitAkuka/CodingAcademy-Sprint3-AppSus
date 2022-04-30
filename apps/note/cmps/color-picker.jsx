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
          onClick={() => onChangeNoteColor('tomato')}
          className="color red"
        ></div>
        <div
          onClick={() => onChangeNoteColor('rgb(98, 167, 98)')}
          className="color green"
        ></div>
        <div
          onClick={() => onChangeNoteColor('dodgerblue')}
          className="color blue"
        ></div>
        <div
          onClick={() => onChangeNoteColor('yellow')}
          className="color yellow"
        ></div>
        <div
          onClick={() => onChangeNoteColor('rgb(197, 79, 197)')}
          className="color purple"
        ></div>
        <div
          onClick={() => onChangeNoteColor('brown')}
          className="color brown"
        ></div>
      </div>
    )
  }
}
