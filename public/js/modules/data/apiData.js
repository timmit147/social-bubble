const body = '{"name": "session_1", "number_of_agents": "102", "num_friends": "20", "num_steps_per_day": "1", "num_items_per_day": "20", "max_num_item_links": "20", "num_exposed_items_person_day": "20", "latitude_acceptance": "0.3", "sharpness": "13", "probability_post_social_net": "0.3", "user_behaviour": "RS_Social_Network", "rs_alg": "2", "rs_challenge": "False", "network": "predefined"}'

export const fetchDataFromAPI = async (method, url) => {
  if (method === 'DELETE') {
    fetch(url, {
      method: `${method}`
    })
  } else if (method === 'POST') {
    const response = await fetch(url, {
      body: body,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      method: `${method}`
    })
    const data = await response.json()
    return data
  } else if (method === 'PUT') {
    await fetch(url, {
      body: body,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      method: `${method}`
    })
  } else {
    const response = await fetch(url, {
      method: `${method}`,
      mode: 'cors'
    })
    const data = await response.json()
    return data
  }
}
