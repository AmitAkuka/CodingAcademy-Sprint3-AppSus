export class NoteCanvas extends React.Component {
  state = {
    fillColor: '#000',
    size: '20px',
    isDrawing: false,
    startPos: {},
    endPos: {},
    ctx: null,
    touchEvs: ['touchstart', 'touchmove', 'touchend'],
  }

  canvasRef = React.createRef()

  componentDidMount() {
    this.addMouseListeners()
    this.addTouchListeners()
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
    console.log(mousePos)
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

  render() {
    const { noteHeading } = this.props
    return (
      <div className="canvas-container">
        <h3>{noteHeading}</h3>
        <div className="tools-container">
          <div className="save-container">
            <i className="fa fa-download fa-lg"></i>
          </div>
          <div className="draw-container">
            <i className="fa fa-paint-brush fa-lg"></i>
            <i
              className="fa fa-circle sm"
              onClick={() => this.setState({ size: '12px' })}
            ></i>
            <i
              className="fa fa-circle md"
              onClick={() => this.setState({ size: '16px' })}
            ></i>
            <i
              className="fa fa-circle lg"
              onClick={() => this.setState({ size: '20px' })}
            ></i>
          </div>
        </div>
        <canvas width="100%" height="100%" ref={this.canvasRef}></canvas>
      </div>
    )
  }
}
