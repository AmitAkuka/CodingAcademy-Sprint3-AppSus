'use strict'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const notesService = {
  query,
  addNote,
  deleteNote,
  changeNoteColor,
  pinNote,
  addTodo,
  cloneNote,
  updateNoteTxt,
  getFilteredNotes,
  removeTodo,
  finishTodo,
  addLoc,
}

const colors = ['tomato', 'rgb(98, 167, 98)', 'dodgerblue', 'yellow', 'rgb(197, 79, 197)', 'brown']

const gNotes = [
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { txt: 'Just plain text...' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
  },
  {
    createdAt: '29.4.2022',
    id: utilService.makeId(),
    info: { txt: 'Must remember to deep refresh...' },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      mapHeading: 'My map',
      locations: [],
      mapId: utilService.makeId(),
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-map',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg' },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { videoUrl: 'https://www.youtube.com/watch?v=FWy_LbhHtug' },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-video',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { videoUrl: 'https://www.youtube.com/watch?v=6OkUjnrfjC4' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-video',
  },
  {
    createdAt: '23.01.1997',
    id: utilService.makeId(),
    info: { txt: 'Avi was born today!!!' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl: 'https://c.tenor.com/yY_2I-E9xNIAAAAC/head-banging-anime.gif',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl: 'https://giphy.com/gifs/papermag-e5EcjjJx3dCFi',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl:
        'https://media1.giphy.com/media/e5EcjjJx3dCFi/giphy.gif?cid=ecf05e47haac99zn8nei22fhddyeu2kg4rftx4ezczunv3ql&rid=giphy.gif&ct=g',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl: 'https://giphy.com/gifs/forever-alone-V46sLZRVrOUXm',
    },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: true,
    type: 'note-video',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { txt: 'one more note' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: false,
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { txt: 'my note' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: true,
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl: 'https://c.tenor.com/NOGjHRHDL_cAAAAC/naruto-uzumaki-naruto.gif',
    },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: false,
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1651020696818-9b44bcc38f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1650997062224-e1d14f5143ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: utilService.makeId(),
    info: { canvasHeading: 'my canvas' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-canvas',
  },
]
const STORAGE_KEY = 'notesDB'

function query(filter) {
  let notes = _loadNotesFromStorage()
  if (!notes) {
    notes = _addTextLines(gNotes)
    _saveNotesToStorage(notes)
  }

  return getFilteredNotes(filter)
}

function getNotesToDisplay(notes) {
  const notesToDisplay = []
  notes.forEach((note) => {
    if (note.isPinned) notesToDisplay.unshift(note)
    else notesToDisplay.push(note)
  })

  return notesToDisplay
}

function getNoteById(notes, id) {
  return notes.find((note) => note.id === id)
}

function addNote({ type, content, audioUrl }) {
  const newNote = {
    id: utilService.makeId(),
    type,
    isPinned: false,
    createdAt: new Date().toLocaleDateString(),
  }

  switch (type) {
    case 'note-txt':
      newNote.info = { txt: content }
      break
    case 'note-img':
      newNote.info = { imgUrl: content }
      break
    case 'note-video':
      newNote.info = { videoUrl: content }
      break
    case 'note-todo':
      newNote.info = {
        todoHeading: content,
        todos: [],
      }
      break
    case 'note-canvas':
      newNote.info = {
        canvasHeading: content,
      }
      break
    case 'note-audio':
      newNote.info = {
        audioLink: content,
      }
      break
    case 'note-map':
      newNote.info = {
        mapHeading: content,
        locations: [],
        mapId: utilService.makeId(),
      }
      break
      case 'note-record':
        newNote.info = {
          noteHeading: content,
          audioUrl
        }
  }

  const notes = _loadNotesFromStorage()
  notes.push(newNote)
  return _finishUpdating(notes)
}

function deleteNote(noteId) {
  const notes = _loadNotesFromStorage()
  const updatedNotes = notes.filter((note) => note.id !== noteId)
  return _finishUpdating(updatedNotes)
}

function changeNoteColor(noteId, color) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.style = { ...note.style, backgroundColor: color }
  return _finishUpdating(notes)
}

function pinNote(noteId) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.isPinned = !note.isPinned
  return _finishUpdating(notes)
}

function addTodo(noteId, todoTxt) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  const todo = {
    txt: todoTxt,
    isDone: false,
    id: utilService.makeId(),
  }
  note.info.todos.push(todo)
  return _finishUpdating(notes)
}

function removeTodo(noteId, todoId) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  const updatedTodos = note.info.todos.filter((todo) => todo.id !== todoId)
  note.info.todos = updatedTodos
  return _finishUpdating(notes)
}

function finishTodo(noteId, todoId) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  const todo = note.info.todos.find((todo) => todo.id === todoId)
  todo.isDone = !todo.isDone
  return _finishUpdating(notes)
}

function cloneNote(note) {
  const notes = _loadNotesFromStorage()
  note.isPinned = false
  note.id = utilService.makeId()
  notes.push(note)
  return _finishUpdating(notes)
}

function updateNoteTxt(noteId, txt) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  if(note.type === 'note.txt') note.info.txt = txt
  else note.desc = txt
  return _finishUpdating(notes)
}

function addLoc(noteId, pos) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  const location = { id: utilService.makeId(), ...pos }
  note.info.locations.push(location)
  return _finishUpdating(notes)
}

function getFilteredNotes({ txt, type }) {
  const notes = _loadNotesFromStorage()
  const filteredNotes = notes.filter((note) => {
    if (type === 'note-pinned') return note.isPinned
    if (type !== 'note-txt' && type !== 'all') return note.type === type
    if (type === 'note-txt')
      return note.type === type && note.info.txt.toLowerCase().includes(txt)
    if (type === 'all') return true
  })

  const notesToDisplay = getNotesToDisplay(filteredNotes)
  return Promise.resolve(notesToDisplay)
}

function _addTextLines(notes) {
  return notes.map(note => {
    if (note.type !== 'note-txt') return {...note, desc:'You can write here what ever you like...'}
    else return note
  })
   notes
}

function _finishUpdating(notes) {
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes)
}
