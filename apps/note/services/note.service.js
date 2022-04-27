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
  onInlineEdit,
  getFilteredNotes,
}

const gNotes = [
  {
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: 'I am a note!',
    },
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: 'I am a note!',
    },
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: 'I am a note!',
    },
    createdAt: new Date().toLocaleDateString(),
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

function onInlineEdit(noteId, txt) {
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
