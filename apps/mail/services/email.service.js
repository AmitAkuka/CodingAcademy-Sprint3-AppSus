import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'


export const emailService = {
    query,
    setEmailFavorite
}
const EMAILS_KEY = 'emailsDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Sprint3 Appsus'
}

function query() {
    let emails = _loadFromStorage()
    if (!emails) {
        emails = _createEmails()
        _saveToLocalStorage(emails)
    }


    console.log('Loaded Emails')
    return Promise.resolve(emails)
}

function _createEmails() {
    const emails = [{
            id: utilService.makeId(),
            subject: 'Whats going on with sprint3??',
            body: 'Its so easy! finish with it, and dont forget to use deep refresh when needed!',
            isRead: false,
            sentAt: 1551133930594,
            to: loggedinUser.email,
            from: 'Yaron@CodingAcademy.com',
            userName: 'Yaron Biton',
            isFavorite: false
        },
        {
            id: utilService.makeId(),
            subject: 'Pulse Hex progress',
            body: 'Dont worry, prec-20 will be ready soon!',
            isRead: false,
            sentAt: 1551133930594,
            to: loggedinUser.email,
            from: 'RichardHeart@gmail.com',
            userName: 'Richard Heart',
            isFavorite: false
        },
        {
            id: utilService.makeId(),
            subject: 'Miss you baby!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            to: loggedinUser.email,
            from: 'KimKardashian@gmail.com',
            userName: 'Kim Kardashian',
            isFavorite: false
        },
        {
            id: utilService.makeId(),
            subject: 'SpaceX',
            body: 'Would you like to join?',
            isRead: false,
            sentAt: 1551133930594,
            to: loggedinUser.email,
            from: 'ElonMusk@gmail.com',
            userName: 'Elon Musk',
            isFavorite: false
        },
        {
            id: utilService.makeId(),
            subject: 'Wake me up',
            body: 'Please dont forget to wake me up, so i wont fall asleep',
            isRead: false,
            sentAt: 1551133930594,
            to: loggedinUser.email,
            from: 'JoeBiden@gmail.com',
            userName: 'Joe Biden',
            isFavorite: false
        }
    ]
    return emails
}

function setEmailFavorite(emailId) {
    let emails = _loadFromStorage()
    getEmailIndexById(emailId)
        .then(emailIdx => {
            console.log('emailidx', emailIdx)
            console.log('after:', emails[emailIdx].isFavorite)
            emails[emailIdx].isFavorite = !emails[emailIdx].isFavorite
            console.log('before:', emails[emailIdx].isFavorite)
            _saveToLocalStorage(emails)
        })
    return Promise.resolve()
}

function getEmailIndexById(emailId) {
    let emails = _loadFromStorage()
    let emailIdx = emails.findIndex(email => email.id === emailId)
    return Promise.resolve(emailIdx)
}

function getEmailById(emailId) {
    let emails = _loadFromStorage()
    let email = emails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

// function _createEmails() {
//     const emails = []
//     for (let i = 0; i < 20; i++) {
//         emails.push(_createEmail())
//     }
//     return emails
// }

// function _createEmail() {
//     console.log('creating email!')
//     return {
//         id: utilService.makeId(),
//         subject: 'Miss you!',
//         body: 'Would love to catch up sometimes',
//         isRead: false,
//         sentAt: 1551133930594,
//         to: 'momo@momo.com'
//     }
// }


function _loadFromStorage() {
    return storageService.loadFromStorage(EMAILS_KEY)
}

function _saveToLocalStorage(emails) {
    return storageService.saveToStorage(EMAILS_KEY, emails)
}