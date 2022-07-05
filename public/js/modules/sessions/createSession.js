
import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../data/apiData.js'
import { getSessionTabs, getTabCloseButtons } from '../ui/sessionTabs.js'
import { getOpenedSessionData } from './currentSessionData.js'

export const createSession = async () => {
  const sessionUl = document.querySelector('header > ul')
  const sessionId = await fetchDataFromAPI('POST', 'https://bubble-machine-api-dummy.herokuapp.com/rest/session')
  const newSession = document.createElement('li')
  const sessionNumber = document.createTextNode(`Session: ${await sessionId.sessionId}`)
  const sessionLink = document.createElement('a')
  sessionLink.href = `#${await sessionId.sessionId}`
  sessionLink.appendChild(sessionNumber)
  newSession.appendChild(sessionLink)

  newSession.setAttribute('class', `${await sessionId.sessionId} opened`)
    const sessionTabs = document.querySelectorAll('header > ul li')
    sessionTabs.forEach((session) => session.classList.remove('opened'))
  
  const newButton = document.createElement('button')
  const buttonText = document.createTextNode('x')
  newButton.appendChild(buttonText)
  newButton.setAttribute('class', sessionId.sessionId )
  newSession.appendChild(newButton)
  sessionUl.insertAdjacentElement('beforeend', newSession)
  window.location.hash = sessionId.sessionId
  const data = await getOpenedSessionData(window.location.hash.slice(1))
  updateGraph(await data)
  getTabCloseButtons()
  getSessionTabs()
}
