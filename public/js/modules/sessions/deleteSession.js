
import { fetchDataFromAPI } from '../data/apiData.js'

export const deleteSession = async (sessionID) => {
  await fetchDataFromAPI('DELETE', `https://bubble-machine-api-dummy.herokuapp.com/rest/session/${sessionID}`)
  const deleteTab = document.getElementsByClassName(sessionID)
  deleteTab[0].remove()
}
