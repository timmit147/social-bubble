if(localStorage.getItem("darkmode") == "true"){
  document.body.classList.toggle('darkmode');
}

import updateGraph from './modules/d3/D3-graph.js'
import { autoPlay } from './modules/sessions/playSession.js'
import { getAllActiveSessions } from './modules/sessions/getAllSessions.js'
import { createSession } from './modules/sessions/createSession.js'
import { getOpenedSessionData } from './modules/sessions/currentSessionData.js'
import { highlight } from './modules/d3/highlight.js'
import { downloadSVG } from './modules/data/downloadGraph.js'
import { parameters } from './modules/ui/parameters.js'
import { darkmode } from './modules/ui/darkmode.js'
import { resetSession } from './modules/sessions/resetSession.js'
import { getSessionTabs, getTabCloseButtons } from './modules/ui/sessionTabs.js';



// Buttons
const parameterButtons = document.querySelectorAll('section ul li')
const autoButton = document.querySelector('#runSim')
const resetButton = document.querySelector('#resetButton')
const addButton = document.querySelector('.addButton')
const darkmodeButton = document.querySelector('#darkmode')
const svgDownloadButton = document.querySelector('#downloadSVG')

const hash = window.location.hash.slice(1)

// Functions 
await getAllActiveSessions()

if(hash) {
  const data = await getOpenedSessionData(hash)
  updateGraph(await data)
}
getSessionTabs()
getTabCloseButtons()
parameters()

// Button Functions
autoButton.addEventListener('click', () => autoPlay(window.location.hash.slice(1)))
resetButton.addEventListener('click', () => resetSession(window.location.hash.slice(1)))
addButton.addEventListener('click', () => createSession())
darkmodeButton.addEventListener('click', () => darkmode())
svgDownloadButton.addEventListener('click', () => downloadSVG())

parameterButtons.forEach(accordion => {
  accordion.addEventListener('click', () =>
    accordion.classList.toggle('open-menu'))
})

////////////////////////////////////////////////
// Socket connection, only in console for now //
////////////////////////////////////////////////

const socketConnection= new WebSocket('ws://bubble-machine-api-dummy.herokuapp.com/action')

socketConnection.onopen = function (event) {
  socketConnection.send('{"id": 17}')
}

socketConnection.onmessage = async function (event) {
const socketData = await JSON.parse(event.data)
console.log(socketData)
}

