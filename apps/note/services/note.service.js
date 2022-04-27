'use strict'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const notesService = {
  query,
  addNote,
  deleteNote,
  changeNoteColor,
  pinNote,
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

  getNotesToDisplay(notes)
  return Promise.resolve(notes)
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
  }

  const notes = _loadNotesFromStorage()
  notes.push(newNote)
  _saveNotesToStorage(notes)
  return Promise.resolve(notes)
}

function deleteNote(noteId) {
  const notes = _loadNotesFromStorage()
  const updatedNotes = notes.filter((note) => note.id !== noteId)
  _saveNotesToStorage(updatedNotes)
  return Promise.resolve(updatedNotes)
}

function changeNoteColor(noteId, color) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.style = { ...note.style, backgroundColor: color }
  _saveNotesToStorage(notes)
  return Promise.resolve(notes)
}

function pinNote(noteId) {
  const notes = _loadNotesFromStorage()
  const note = getNoteById(notes, noteId)
  note.isPinned = !note.isPinned
  _saveNotesToStorage(notes)
  return Promise.resolve(notes)
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes)
}
