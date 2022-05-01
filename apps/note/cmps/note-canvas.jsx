export class NoteCanvas extends React.Component {
  state = {
    fillColor: '#000',
    size: 20,
    isDrawing: false,
    startPos: {},
    endPos: {},
    ctx: null,
    touchEvs: ['touchstart', 'touchmove', 'touchend'],
  }

  canvasRef = React.createRef()
  colorPicker = React.createRef()
  downLink = React.createRef()

  componentDidMount() {
    this.addMouseListeners()
    this.addTouchListeners()
    window.addEventListener('resize', () => {
      this.resizeCanvas()
    })
    this.resizeCanvas()
    this.setState({ ctx: this.canvasRef.current.getContext('2d') })
  }

  addMouseListeners() {
    this.canvasRef.current.addEventListener('mousemove', this.draw)
    this.canvasRef.current.addEventListener('mousedown', this.startDrawing)
    this.canvasRef.current.addEventListener('mouseup', this.stopDrawing)
  }

  addTouchListeners() {
    this.canvasRef.current.addEventListener('touchmove', this.draw)
    this.canvasRef.current.addEventListener('touchstart', this.startDrawing)
    this.canvasRef.current.addEventListener('touchend', this.stopDrawing)
  }

  draw = (ev) => {
    if (!this.state.isDrawing) return
    const { fillColor, size, ctx } = this.state
    const mousePos = this.getEvPos(ev)
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.arc(mousePos.x, mousePos.y, size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  startDrawing = () => {
    this.setState({ isDrawing: true })
  }

  stopDrawing = () => {
    this.setState({ isDrawing: false })
  }

  updateColor = ({ target }) => {
    const fillColor = target.value
    this.setState({ fillColor })
    this.colorPicker.current.style.color = fillColor
  }

  getEvPos = (ev) => {
    var pos = {
      x: ev.offsetX,
      y: ev.offsetY,
    }
    if (this.state.touchEvs.includes(ev.type)) {
      ev.preventDefault()
      ev = ev.changedTouches[0]
      pos = {
        x: ev.pageX - ev.target.offsetLeft,
        y: ev.pageY - ev.target.offsetTop * 3,
      }
    }
    return pos
  }

  resizeCanvas() {
    this.canvasRef.current.width =
      this.canvasRef.current.parentElement.offsetWidth - 20
  }

  downloadCanvas = ({ target }) => {
    console.log(target)
    const data = this.canvasRef.current.toDataURL()
    this.downLink.current.href = data
    this.downLink.current.download = 'my-canvas'
  }

  render() {
    return (
      <div className="canvas-container">
        <div className="tools-container">
          <div className="save-container">
            <a
              ref={this.downLink}
              href="#"
              onClick={this.downloadCanvas}
              download="my-drawing"
            >
              <i className="fa fa-download fa-lg"></i>
            </a>
          </div>
          <div className="draw-container">
            <i className="fa fa-paint-brush fa-lg" ref={this.colorPicker}>
              <input type="color" onChange={this.updateColor} />
            </i>
            <i
              className="fa fa-circle sm"
              onClick={() => this.setState({ size: 8 })}
            ></i>
            <i
              className="fa fa-circle md"
              onClick={() => this.setState({ size: 12 })}
            ></i>
            <i
              className="fa fa-circle lg"
              onClick={() => this.setState({ size: 20 })}
            ></i>
          </div>
        </div>
        <canvas width="300px" height="350px" ref={this.canvasRef}></canvas>
      </div>
    )
  }
}
