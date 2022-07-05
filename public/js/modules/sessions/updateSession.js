
// import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../data/apiData.js'

export const nextStep = async (sessionID) => {
  fetchDataFromAPI('POST', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/step`)
  // const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)

  // updateGraph(await data)
}
