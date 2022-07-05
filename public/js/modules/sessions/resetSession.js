
import updateGraph from '../d3/D3-graph.js'
import { fetchDataFromAPI } from '../data/apiData.js'

export const resetSession = async (sessionID) => {
  await fetchDataFromAPI('PUT', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}/reset`)
  const data = await fetchDataFromAPI('GET', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  updateGraph(await data)
}
