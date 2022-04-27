'use strict'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const notesService = {
  query,
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
  return Promise.resolve(notes)
}

function _loadNotesFromStorage() {
  storageService.loadFromStorage(STORAGE_KEY)
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(STORAGE_KEY, notes)
}
