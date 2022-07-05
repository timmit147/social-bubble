import updateGraph from '../d3/D3-graph.js'
import { getOpenedSessionData } from '../sessions/currentSessionData.js'
import { deleteSession } from '../sessions/deleteSession.js'

export const getSessionTabs = () => {
  const sessionTabs = document.querySelectorAll('header > ul li')

  sessionTabs.forEach(session => {
    const openSession = async () => {
      if (session.className !== 'addButton') {
        const data = await getOpenedSessionData(session.className)
        updateGraph(await data)
        sessionTabs.forEach((session) => session.classList.remove('opened'))
        session.classList.add('opened')
      }
    }
    session.addEventListener('click', () => openSession())
  })
}

export const getTabCloseButtons = () => {
  const tabCloseButtons = document.querySelectorAll('header > ul li button')

  tabCloseButtons.forEach(tab => {
    const clicked = () => {
      if (tab.className) {
        deleteSession(tab.className)
        window.location.hash = ''
      }
    }
    tab.addEventListener('click', (e) => {
      if(tab.id !== 'addButton') {
        e.stopPropagation()
      }
      clicked()
    })
  })
}
