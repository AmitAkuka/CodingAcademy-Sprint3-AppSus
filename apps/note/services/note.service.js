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

const colors = [
  '#e8eaed',
  'ccff90',
  '#fdcfe8',
  '#aecbfa',
  '#fff475',
  '#d7aefb',
  'e6c9a8',
  '#f28b82',
]

const gNotes = [
  {
    createdAt: '27.4.2022',
    id: 'WbHZPLaD',
    info: { txt: 'Just plain text...' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
    desc: 'Just plain text...f',
  },
  {
    createdAt: '29.4.2022',
    id: 'nE03tRaG',
    info: { txt: 'Must remember to deep refresh...' },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: 'SUzjVBKu',
    info: {
      mapHeading: 'My map',
      locations: [
        { id: 'Wujm4evj', lat: 32.075347312297126, lng: 34.907828238592536 },
        { id: 'vpLpHexn', lat: 32.07220742508224, lng: 34.91145894377032 },
        { id: 'Y9r4a4Fb', lat: 32.062937302142394, lng: 34.919162738848144 },
        { id: 'UGMuLkkr', lat: 31.628942120504075, lng: 34.871159091370224 },
      ],
      mapId: 'TiUrd8Ne',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-map',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'gfCAnNpi',
    info: {
      imgUrl:
        'https://media1.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif?cid=ecf05e47c523bdd44358f15c430b4036d5c18c1866c50029&rid=giphy.gif&ct=g',
    },
    isPinned: true,
    desc: 'me realizing i can just copy code from the internet and nobody will know',
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: 'HALDCcXo',
    info: { videoUrl: 'https://www.youtube.com/watch?v=FWy_LbhHtug' },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-video',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'XZG0tr5E',
    info: { videoUrl: 'https://www.youtube.com/watch?v=6OkUjnrfjC4' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-video',
    desc: 'Place for some text..',
  },
  {
    createdAt: '23.01.1997',
    id: 'qSdknG2t',
    info: { txt: 'Avi was born today!!!' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: 'WdFzqbKy',
    info: { imgUrl: 'https://www.coding-academy.org/images/team/yaron.jpg' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'F0qGkmcI',
    info: {
      imgUrl: 'https://c.tenor.com/yY_2I-E9xNIAAAAC/head-banging-anime.gif',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'iqWOZF4V',
    info: {
      imgUrl:
        'https://media3.giphy.com/media/aFTt8wvDtqKCQ/giphy.gif?cid=ecf05e47eeurqhchu8kyvk3sq9738cqjp39cz4eq33jfhubi&rid=giphy.gif&ct=g',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: '6iGRwp5f',
    info: {
      imgUrl:
        'https://media1.giphy.com/media/e5EcjjJx3dCFi/giphy.gif?cid=ecf05e47haac99zn8nei22fhddyeu2kg4rftx4ezczunv3ql&rid=giphy.gif&ct=g',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'PcfponrG',
    info: { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: true,
    type: 'note-video',
    desc: 'Place for some text..',
  },
  {
    createdAt: '30.4.2022',
    id: 'LMSQ9Ocu',
    info: { videoUrl: 'https://www.youtube.com/watch?v=EPIlAiOTqLY' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: false,
    type: 'note-video',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: '7DFuvZSp',
    info: { txt: 'one more note' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: false,
    type: 'note-txt',
  },
  {
    createdAt: '27.4.2022',
    id: 'X5jaG81a',
    info: { txt: 'you can edit me!\n\n\nand even copy :O' },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: true,
    type: 'note-txt',
    desc: 'my notef',
  },
  {
    createdAt: '27.4.2022',
    id: 'x2mIqdMn',
    info: {
      imgUrl: 'https://c.tenor.com/NOGjHRHDL_cAAAAC/naruto-uzumaki-naruto.gif',
    },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    isPinned: false,
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'AJrjkBVb',
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1651020696818-9b44bcc38f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some text..',
  },
  {
    createdAt: '27.4.2022',
    id: 'FKM4RPNr',
    info: {
      imgUrl:
        'https://images.unsplash.com/photo-1650997062224-e1d14f5143ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80',
    },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-img',
    desc: 'Place for some texgt..ffd',
  },
  {
    createdAt: '30.4.2022',
    id: '7c11EJf2',
    info: {
      imgUrl:
        'https://c.tenor.com/VU4nI9l0e64AAAAC/majin-boo-dragon-ball-z.gif',
    },
    isPinned: true,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    desc: 'Me after a whole day of sprint and no eating',
    type: 'note-img',
  },
  {
    createdAt: '27.4.2022',
    id: '3tPSYvck',
    info: { canvasHeading: 'my canvas' },
    isPinned: false,
    style: { backgroundColor: utilService.getRandFromArray(colors) },
    type: 'note-canvas',
    desc: 'Place for some text..',
  },
  {
    createdAt: '30.4.2022',
    id: 'FilLUU5u',
    info: {
      todoHeading: 'Doing sprint 3',
      todos: [
        { txt: 'open vscode', isDone: false, id: 'dgQmxBKE' },
        { txt: 'FREAK OUT!!!', isDone: true, id: 'yi77V3gY' },
        { txt: 'Submit project...', isDone: false, id: 'uwzaW2BJ' },
      ],
    },
    isPinned: true,
    type: 'note-todo',
    desc: 'Place for some text..',
    style: { backgroundColor: utilService.getRandFromArray(colors) },
  },
  {
    createdAt: '30.4.2022',
    id: 'FilLMU5u',
    info: {
      todoHeading: 'Doing sprint 4',
      todos: [
        { txt: 'FREAK OUT!!!', isDone: false, id: 'yi77V3gY' },
        { txt: 'FREAK OUT!!!', isDone: false, id: 'yi77q3gY' },
        { txt: 'FREAK OUT!!!', isDone: false, id: 'yi77f3gY' },
        { txt: 'FREAK OUT!!!', isDone: false, id: 'yi77s3gY' },
        { txt: 'FREAK OUT!!!', isDone: false, id: 'yi7793gY' },
      ],
    },
    isPinned: false,
    type: 'note-todo',
    desc: 'Place for some text..',
    style: { backgroundColor: utilService.getRandFromArray(colors) },
  },
  {
    createdAt: '30.4.2022',
    id: 'FilHMU5u',
    info: {
      todoHeading: 'Things todo after sprint',
      todos: [
        { txt: 'Eat', isDone: false, id: 'yi77V3gY' },
        { txt: 'Shower', isDone: false, id: 'yi77q3gY' },
        { txt: 'Eat', isDone: false, id: 'yi77f3gY' },
        { txt: 'Feed cat', isDone: false, id: 'yi77s3gY' },
        { txt: 'Keep working on sprint :(...', isDone: false, id: 'yi7793gY' },
      ],
    },
    isPinned: false,
    type: 'note-todo',
    desc: 'Place for some text..',
  },
  {
    id: 'Ebcth4D2',
    type: 'note-txt',
    isPinned: false,
    createdAt: '30.4.2022',
    info: { txt: 'my note' },
    desc: 'my noteg',
  },
  {
    id: 'JT38UxNR',
    type: 'note-audio',
    isPinned: false,
    createdAt: '30.4.2022',
    desc: 'cool sound',
    info: {
      audioLink:
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
  },
  {
    id: 'HnN6oyHl',
    type: 'note-audio',
    isPinned: true,
    createdAt: '30.4.2022',
    desc: 'The sound from amits room during a sprint',
    info: {
      audioLink:
        'https://www.fesliyanstudios.com/soundeffects/2019-01-24/c/fast-pace-Typing-on-mechanical-keyboard-1-www.FesliyanStudios.com.mp3',
    },
  },
  {
    id: 'lbwleefb',
    type: 'note-img',
    isPinned: true,
    createdAt: '30.4.2022',
    desc: 'Colors that work well together...\n\n**good for projects',
    info: {
      imgUrl:
        'https://www.e-education.psu.edu/geog486/sites/www.e-education.psu.edu.geog486/files/Lesson_04/Images/multihue_2_r.png',
    },
  },
  {
    id: '4wGUSvXN',
    type: 'note-img',
    isPinned: false,
    createdAt: '30.4.2022',
    desc: 'Yes i know, another sprint done',
    info: {
      imgUrl: 'https://media0.giphy.com/media/wdX9wTpG2oiJmfndlN/giphy.webp',
    },
  },
  {
    id: 'N1BQo5UL',
    type: 'note-todo',
    isPinned: false,
    createdAt: '30.4.2022',
    desc: 'Must go before weekend!!!',
    info: {
      todoHeading: 'Grocery list',
      todos: [
        { txt: 'Onion', isDone: false, id: 'XUtKePdC' },
        { txt: 'toilet paper', isDone: false, id: 'heZ7kWat' },
        { txt: 'wings', isDone: false, id: 'xIV6dJwl' },
      ],
    },
    style: { backgroundColor: utilService.getRandFromArray(colors) },
  },
  {
    id: 'j3I3wSZ0',
    type: 'note-video',
    isPinned: false,
    createdAt: '30.4.2022',
    desc: 'for sad times..',
    info: { videoUrl: 'https://www.youtube.com/watch?v=td7NuXYpb7M' },
  },
]

const STORAGE_KEY = 'notesDB'

function query(filter) {
  let notes = _loadNotesFromStorage()
  if (!notes) {
    notes = _addTextLine(gNotes)
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

function addNote({ type, content, audioUrl, title }) {
  const newNote = {
    id: utilService.makeId(),
    type,
    isPinned: false,
    title,
    createdAt: new Date().toLocaleDateString(),
  }

  if (type !== 'note-txt' && type !== 'note-email')
    newNote.desc = 'Place for some text'

  switch (type) {
    case 'note-txt':
      newNote.info = { txt: content }
      break
    case 'note-img':
      if (!isImage(content)) return Promise.reject('Url is not an image..')
      newNote.info = { imgUrl: content }
      break
    case 'note-video':
      newNote.info = { videoUrl: content }
      break
    case 'note-todo':
      newNote.info = {
        todos: content.split(',').map((todo) => ({
          txt: todo,
          isDone: false,
          id: utilService.makeId(),
        })),
      }
      break
    case 'note-canvas':
      newNote.desc = content
      break
    case 'note-audio':
      newNote.info = {
        audioLink: content,
      }
      break
    case 'note-map':
      newNote.desc = content
      newNote.info = {
        locations: [],
        mapId: utilService.makeId(),
      }
      break
    case 'note-record':
      newNote.info = {
        audioUrl,
      }
      break
    case 'note-email':
      newNote.info = {
        to: content.to,
        subject: content.subject,
        body: content.body,
      }
      break
  }

  const notes = _loadNotesFromStorage()
  notes.push(newNote)
  return _finishUpdating(notes)
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
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
  _addTextLine(note)
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
  if (note.type === 'note-txt') note.info.txt = txt
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
  const filteredNotesByType = notes.filter((note) => {
    if (type === 'note-pinned') return note.isPinned
    if (type !== 'all') return note.type === type
    if (type === 'all') return true
  })

  if (!txt) return Promise.resolve(filteredNotesByType)

  const filteredNotesByTxt = filteredNotesByType.filter((note) => {
    return (
      ('desc' in note && note.desc.toLowerCase().includes(txt)) ||
      ('info' in note &&
        'txt' in note.info &&
        note.info.txt.toLowerCase().includes(txt)) ||
      ('title' in note && note.title.toLowerCase().includes(txt)) ||
      ('info' in note &&
        'todos' in note.info &&
        note.info.todos.forEach((todo) => todo.txt.toLowerCase().includes(txt)))
    )
  })
  const notesToDisplay = getNotesToDisplay(filteredNotesByTxt)
  return Promise.resolve(notesToDisplay)
}

function _addTextLine(notes) {
  if (!notes.length) {
    if (!notes.desc && notes.type !== 'note-email')
      return { ...notes, desc: 'Place for some text..' }
    else return notes
  }
  return notes.map((note) => {
    if (note.type !== 'note-txt' && !note.desc && note.type !== 'note-txt')
      return { ...note, desc: 'Place for some text..' }
    else return note
  })
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
