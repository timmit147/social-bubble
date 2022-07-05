/* eslint-disable no-unmodified-loop-condition */

import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../data/apiData.js'

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let play = false

export const autoPlay = async (sessionID) => {
  const counter = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  const playDiv = document.querySelector('#runSim')

  if (playDiv.textContent === 'Run') {
    playDiv.textContent = 'Stop'
  } else {
    playDiv.textContent = 'Run'
  }

  play = !play
  for (let i = await counter.step; i <= 100; i++) {
    while (play === true) {
      const step = await fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`);
      document.querySelector(".steps").textContent = `Step ${step.step}`;
      const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
      updateGraph(await data)
      await wait(2000)
    }
  }
}
