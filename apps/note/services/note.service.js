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

const gNotes = [
  {
    createdAt: '27.4.2022',
    id: '9VlYFa4E',
    info: { txt: 'txet wen!' },
    isPinned: false,
    style: { backgroundColor: 'rgb(98, 167, 98)' },
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: '9VlYFQ4E',
    info: {
      mapHeading: 'My map',
      locations: [],
      mapId: utilService.makeId(),
    },
    isPinned: false,
    style: { backgroundColor: 'rgb(98, 167, 98)' },
    type: 'note-map',
  },
  {
    id: 'aRKwz747',
    createdAt: '27.4.2022',
    id: 'aRKwz747',
    info: { imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg' },
    isPinned: true,
    style: { backgroundColor: 'dodgerblue' },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'enpq2PzI',
    info: { videoUrl: 'https://www.youtube.com/watch?v=FWy_LbhHtug' },
    isPinned: true,
    type: 'note-video',
  },
  {
    createdAt: '27.4.2022',
    id: '97GEmdh7',
    info: { imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg' },
    imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg',
    isPinned: false,
    style: { backgroundColor: 'tomato' },
    backgroundColor: 'tomato',
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'l8PFpo0s',
    info: { txt: 'one more note' },
    txt: 'one more note',
    isPinned: false,
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: 'ixQyy7DU',
    info: { txt: 'my note' },
    txt: 'my note',
    isPinned: true,
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: 'seQiNRrO',
    info: {
      imgUrl: 'https://c.tenor.com/NOGjHRHDL_cAAAAC/naruto-uzumaki-naruto.gif',
    },
    imgUrl: 'https://c.tenor.com/NOGjHRHDL_cAAAAC/naruto-uzumaki-naruto.gif',
    isPinned: false,
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'HuHidVSL',
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1651020696818-9b44bcc38f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    isPinned: false,
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'BYa3xWXC',
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1650997062224-e1d14f5143ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    },
    isPinned: true,
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'Ky7gVaYa',
    info: { canvasHeading: 'my canvas' },
    isPinned: false,
    type: 'note-canvas',
  },
]
const STORAGE_KEY = 'notesDB'

function query(filter) {
  let notes = _loadNotesFromStorage()
  if (!notes) {
    notes = gNotes
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

function addNote({ type, content }) {
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
  note.info.txt = txt
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
