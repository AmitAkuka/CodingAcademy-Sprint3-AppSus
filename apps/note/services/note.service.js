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
    id: 'KTKyKgKX',
    info: { todoHeading: 'get my life together' },
    todoHeading: 'get my life together',
    todos: ['start learning C++', 'doing deep refresh', 'doing something'],
    isPinned: true,
    type: 'note-todo',
  },
  {
    createdAt: '27.4.2022',
    id: 'A6eAazWA',
    info: {
      todoHeading: 'Coding meme generator',
      todos: ['open vscode', 'FREAK OUT!!'],
    },
    todoHeading: 'Coding meme generator',
    todos: ['open vscode', 'FREAK OUT!!'],
    isPinned: true,
    type: 'note-todo',
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

function query() {
  let notes = _loadNotesFromStorage()
  if (!notes) {
    notes = gNotes
    _saveNotesToStorage(notes)
  }

  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
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
  }

  const notes = _loadNotesFromStorage()
  notes.push(newNote)
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function deleteNote(noteId) {
  const notes = _loadNotesFromStorage()
  const updatedNotes = notes.filter((note) => note.id !== noteId)
  _saveNotesToStorage(updatedNotes)
  const notesToDisplay = getNotesToDisplay(updatedNotes)
  return Promise.resolve(notesToDisplay)
}

function changeNoteColor(noteId, color) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.style = { ...note.style, backgroundColor: color }
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function pinNote(noteId) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.isPinned = !note.isPinned
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function addTodo(noteId, todo) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.info.todos.push(todo)
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function cloneNote(note) {
  const notes = _loadNotesFromStorage()
  note.isPinned = false
  note.id = utilService.makeId()
  notes.push(note)
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function updateNoteTxt(noteId, txt) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.info.txt = txt
  _saveNotesToStorage(notes)
  const notesToDisplay = getNotesToDisplay(notes)
  return Promise.resolve(notesToDisplay)
}

function getFilteredNotes({ txt, type }) {
  const notes = _loadNotesFromStorage()
  const filteredNotes = notes.filter((note) => {
    if (type === 'note-pinned') return note.isPinned
    if (type !== 'note-txt' && type !== 'all') return note.type === type
    if (type === 'note-txt')
      return note.type === type && note.info.txt.includes(txt)
    if (type === 'all') return true
  })

  const notesToDisplay = getNotesToDisplay(filteredNotes)
  return Promise.resolve(notesToDisplay)
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes)
}
