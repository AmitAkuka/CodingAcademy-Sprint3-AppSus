'use strict'
let gElCanvas
let gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gDrawKit = {
  fillColor: '#000',
  isDrawing: false,
  startPos: {},
  endPos: {},
}

function initCanvas() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  addListeners()
}

function addListeners() {
  addMouseListeners()
  addKeyBoardListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', draw)
  gElCanvas.addEventListener('mousedown', startDrawing)
  gElCanvas.addEventListener('mouseup', stopDrawing)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', draw)
  gElCanvas.addEventListener('touchstart', startDrawing)
  gElCanvas.addEventListener('touchend', stopDrawing)
}

function startDrawing(ev) {
  const pos = getEvPos(ev)
  gDrawKit.isDrawing = true
  gDrawKit.startPos = pos
}

function stopDrawing(ev) {
  gDrawKit.isDrawing = false
  const mousePos = getEvPos(ev)
  if (gDrawKit.startPos.x === mousePos.x && gDrawKit.startPos.y === mousePos.y)
    return
  addShape(gDrawKit)
}

function draw(ev) {
  if (!gDrawKit.isDrawing) return
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop * 3,
    }
  }
  return pos
}
