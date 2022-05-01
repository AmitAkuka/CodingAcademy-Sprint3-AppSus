import { func } from 'prop-types'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'


export const emailService = {
    query,
    setEmailFavorite,
    setReadedEmail,
    getUnreadAmout,
    addEmail,
    getEmailById,
    deleteEmail
}
const EMAILS_KEY = 'emailsDB'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Sprint3 Appsus'
}

function query({ folderListFilter, unreadReadFilter, searchStrFilter, emailParamFilter }) {
    console.log(emailParamFilter)
    let emails = _loadFromStorage()
    if (!emails || !emails.length) {
        emails = _createEmails()
        _saveToLocalStorage(emails)
    }
    if (folderListFilter || unreadReadFilter) {
        emails = emails.filter(email => {
            if (folderListFilter === 'Inbox') {
                if (unreadReadFilter === 'All') {
                    return (email.from !== loggedinUser.email &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Read') {
                    console.log('read')
                    return (email.from !== loggedinUser.email && email.isReaded &&
                        ((email.userName.toLowerCase().includes(searchStrFilter)) ||
                            (email.subject.toLowerCase().includes(searchStrFilter)) ||
                            (email.body.toLowerCase().includes(searchStrFilter))))
                } else if (unreadReadFilter === 'Unread') {
                    return (email.from !== loggedinUser.email && !email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                }
            } else if (folderListFilter === 'Starred') {
                if (unreadReadFilter === 'All') {
                    return (email.isFavorite &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Read') {
                    return (email.isFavorite && email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Unread') {
                    return (email.isFavorite && !email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                }
            } else if (folderListFilter === 'Sent') {
                if (unreadReadFilter === 'All') {
                    return (email.from === loggedinUser.email && !email.isDraft &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Read') {
                    return (email.from === loggedinUser.email && !email.isDraft && email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Unread') {
                    return (email.from === loggedinUser.email && !email.isDraft && !email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                }
            } else if (folderListFilter === 'Drafts') {
                if (unreadReadFilter === 'All') {
                    return (email.isDraft &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Read') {
                    return (email.isDraft && email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                } else if (unreadReadFilter === 'Unread') {
                    return (email.isDraft && !email.isReaded &&
                        (email.userName.toLowerCase().includes(searchStrFilter) ||
                            email.subject.toLowerCase().includes(searchStrFilter) ||
                            email.body.toLowerCase().includes(searchStrFilter)))
                }
            }
        })

    }
    console.log('sortBy', emailParamFilter)
    if (emailParamFilter === 'Date') {
        emails = emails.sort((a, b) => b.sentAt - a.sentAt)
    } else if (emailParamFilter === 'Name') {
        emails = emails.sort(function(a, b) {
            if (a.userName < b.userName) { return -1; }
            if (a.userName > b.userName) { return 1; }
            return 0;
        })
    } else if (emailParamFilter === 'Subject') {
        emails = emails.sort(function(a, b) {
            if (a.subject < b.subject) { return -1; }
            if (a.subject > b.subject) { return 1; }
            return 0;
        })
    }
    console.log('Loaded Emails')
    return Promise.resolve(emails)
}

function addEmail({ to, subject, body, isDraft = false }) {
    let emails = _loadFromStorage()
    emails.push({
        id: utilService.makeId(),
        subject,
        body,
        sentAt: Date.now(),
        to,
        from: loggedinUser.email,
        userName: loggedinUser.fullname,
        isFavorite: false,
        isReaded: true,
        profilePic: 'AmitAkuka',
        isDraft
    })
    _saveToLocalStorage(emails)
    return Promise.resolve()
}

function _createEmails() {
    const emails = [{
            id: utilService.makeId(),
            subject: 'Whats going on with sprint3??',
            body: 'Its so easy! dont forget to use deep refresh when needed!',
            sentAt: 1651256929216,
            to: loggedinUser.email,
            from: 'Yaron@CodingAcademy.com',
            userName: 'Yaron Biton',
            isFavorite: false,
            isReaded: false,
            profilePic: 'YaronBiton'
        },
        {
            id: utilService.makeId(),
            subject: 'Pulse Hex progress',
            body: 'Dont worry, prec-20 will be ready soon!',
            sentAt: 1251256929216,
            to: loggedinUser.email,
            from: 'RichardHeart@gmail.com',
            userName: 'Richard Heart',
            isFavorite: false,
            isReaded: false,
            profilePic: 'RichardHeart'
        },
        {
            id: utilService.makeId(),
            subject: 'Miss you baby!',
            body: 'Would love to catch up sometimes',
            sentAt: 1601256929216,
            to: loggedinUser.email,
            from: 'KimKardashian@gmail.com',
            userName: 'Kim Kardashian',
            isFavorite: false,
            isReaded: false,
            profilePic: 'KimKardashian'
        },
        {
            id: utilService.makeId(),
            subject: 'SpaceX',
            body: 'Would you like to join?',
            sentAt: 1551256929216,
            to: loggedinUser.email,
            from: 'ElonMusk@gmail.com',
            userName: 'Elon Musk',
            isFavorite: false,
            isReaded: false,
            profilePic: 'ElonMusk'
        },
        {
            id: utilService.makeId(),
            subject: 'Wake me up',
            body: 'Please dont forget to wake me up, so i wont fall asleep',
            sentAt: 1650006929216,
            to: loggedinUser.email,
            from: 'JoeBiden@gmail.com',
            userName: 'Joe Biden',
            isFavorite: false,
            isReaded: false,
            profilePic: 'JoeBiden'
        }
    ]
    return emails
}

function setEmailFavorite(emailId) {
    let emails = _loadFromStorage()
    getEmailIndexById(emailId)
        .then(emailIdx => {
            emails[emailIdx].isFavorite = !emails[emailIdx].isFavorite
            _saveToLocalStorage(emails)
        })
    return Promise.resolve()
}

function setReadedEmail(email, isUnreadBtnClk) {
    //isUnreadBtnClk will always be false if user clicked on the email itself
    if (email.isReaded && !isUnreadBtnClk) return Promise.resolve();
    let emails = _loadFromStorage()
    getEmailIndexById(email.id)
        .then(emailIdx => {
            emails[emailIdx].isReaded = !emails[emailIdx].isReaded
            _saveToLocalStorage(emails)
        })
    return Promise.resolve()
}

function getUnreadAmout() {
    let emails = _loadFromStorage()
    let unreadCounter = 0
    emails.forEach(email => { if (!email.isReaded) unreadCounter++ })
    console.log(unreadCounter)
    return Promise.resolve(unreadCounter)
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

function deleteEmail(emailId) {
    let emails = _loadFromStorage()
    getEmailIndexById(emailId)
        .then(emailIdx => {
            emails.splice(emailIdx, 1)
            _saveToLocalStorage(emails)
        })
    return Promise.resolve()
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