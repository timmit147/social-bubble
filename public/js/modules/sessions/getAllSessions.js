import { fetchDataFromAPI } from '../data/apiData.js'

const url = 'https://bubble-machine-api-dummy.herokuapp.com/rest/session/'
const sessionsUl = document.querySelector('header > ul')

export const getAllActiveSessions = async () => {
  const sessionTabs = document.querySelectorAll('header > ul li')
  sessionTabs.forEach(session => {
    if (!session.className === 'addBtn') { session.remove() }
  })
  const allSessions = await fetchDataFromAPI('GET', url)
  allSessions.forEach(session => {
    const sessionLi = document.createElement('li')
    const sessionLink = document.createElement('a')
    sessionLink.href = `#${session.sessionId}`
    const sessionName = document.createTextNode(`Session: ${session.sessionId}`)
    sessionLink.appendChild(sessionName)
    sessionLi.appendChild(sessionLink)
    sessionLi.setAttribute('class', session.sessionId)

    const deleteBtn = document.createElement('button')
    const deleteBtnText = document.createTextNode('x')
    deleteBtn.appendChild(deleteBtnText)
    deleteBtn.setAttribute('class', session.sessionId)
    sessionLi.appendChild(deleteBtn)
    sessionsUl.appendChild(sessionLi)
  })
}
