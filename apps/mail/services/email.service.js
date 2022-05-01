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
    const emails = [_createEmail('Whats going on with sprint3??', 'Its so easy! dont forget to use deep refresh when needed!',
            1651256929216, 'Yaron@CodingAcademy.com', 'Yaron Biton', 'YaronBiton'),
        _createEmail('Pulse Hex progress', 'Dont worry, prec-20 will be ready soon!',
            1251256929216, 'RichardHeart@gmail.com', 'Richard Heart', 'RichardHeart'),
        _createEmail('Miss you baby!', 'Would love to catch up sometimes',
            1601256929216, 'KimKardashian@gmail.com', 'Kim Kardashian', 'KimKardashian'),
        _createEmail('SpaceX', 'Would you like to join?',
            1551256929216, 'ElonMusk@gmail.com', 'Elon Musk', 'ElonMusk'),
        _createEmail('Wake me up', 'Please dont forget to wake me up, so i wont fall asleep',
            1650006929216, 'JoeBiden@gmail.com', 'Joe Biden', 'JoeBiden'),
        _createEmail('Your iCloud storage is full', `
            Hello Amit Akuka,
            Your iCloud storage is full. You have exceeded your storage plan and this means that your documents, contacts and device data are no longer being backed up to iCloud. Your photos and videos are also not being uploaded to iCloud Photos. iCloud Drive and iCloud-enabled apps are not being updated across your devices.
            To keep using these iCloud services, you need to upgrade to iCloud+ or reduce the amount of storage that you are using.
            Upgrade to iCloud+ with 50 GB for ₪3.90 per month
            Sincerely,
            The iCloud Team`,
            1651400198022, 'noreply@email.apple.com', 'iCloud', 'iCloud'),
        _createEmail(`3 new jobs for 'junior front end developer'`, `
            Your job alert for junior front end developer
            3 new jobs in Israel match your preferences.

            Ethosia	
            Frontend Developer
            Ethosia · Tel Aviv, Israel (Hybrid)
            Actively recruiting
        
            Toptal	
            Front-end Developer
            Toptal · Unknown (Remote)
            Actively recruiting
        
            Ethosia	
            Frontend Developer
            Ethosia · Herzliyya, Tel Aviv, Israel (Hybrid)
        
            See all jobs
         
            premium
            Amit Akuka
            See jobs where you're a top applicant`,
            1611400198022, 'jobalerts-noreply@linkedin.com', 'LinkedIn Job Alerts', 'LinkedIn'),
        _createEmail('[Important] Scheduled Maintenance for Crypto.com', `
            Dear Valued Customer,

            Please be informed that we will perform system maintenance for the Crypto.com App,
            Exchange, NFT, DeFi Wallet, and Pay starting at 08:00 HKT (00:00 UTC) on 11 April 2022.
            It is expected to take approximately`,
            1647940198022, 'no-reply@serviceinfo.crypto.com', 'Crypto.com Exchange', 'Cryptocom'),
        _createEmail(`3 new jobs for 'junior front end developer'`, `
            Your job alert for junior front end developer
            3 new jobs in Israel match your preferences.

            Ethosia	
            Frontend Developer
            Ethosia · Tel Aviv, Israel (Hybrid)
            Actively recruiting
        
            Toptal	
            Front-end Developer
            Toptal · Unknown (Remote)
            Actively recruiting
        
            Ethosia	
            Frontend Developer
            Ethosia · Herzliyya, Tel Aviv, Israel (Hybrid)
        
            See all jobs
         
            premium
            Amit Akuka
            See jobs where you're a top applicant`,
            1611400198022, 'jobalerts-noreply@linkedin.com', 'LinkedIn Job Alerts', 'LinkedIn'),
        _createEmail(`Introducing NEW personalized discounts for you!`, `
                Hi Amit,
                Enroll in a Udacity program today! Stay ahead of the curve and get the skills you'll need for the jobs of the future.
                Explore programs   →
                By claiming this discount, you've taken the first step in advancing your career with Udacity. Our programs take a learn-by-doing approach by incorporating real-world projects to prepare you for the workplace.
                Still have questions about Udacity, Amit?
                of Academic Advisors would be happy to answer any questions you have about our courses or personalized discounts. Feel free to schedule a ti‍‍me that works best for you. We are in office between 5:30 am to 2:30 pm PT | 12:30 pm to 9:30 pm GMT, Monday through Friday.`,
            1645670198022, 'support@udacity.com', 'Udacity ', 'Udacity')
    ]
    return emails
}

function _createEmail(subject, body, sentAt, from, userName, profilePic) {
    console.log('creating email!')
    return {
        id: utilService.makeId(),
        subject,
        body,
        sentAt,
        to: loggedinUser.email,
        from,
        userName,
        isFavorite: false,
        isReaded: false,
        profilePic
    }
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




function _loadFromStorage() {
    return storageService.loadFromStorage(EMAILS_KEY)
}

function _saveToLocalStorage(emails) {
    return storageService.saveToStorage(EMAILS_KEY, emails)
}