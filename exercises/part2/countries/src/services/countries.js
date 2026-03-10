import axios from 'axios'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const response = await axios.get(`${BASE_URL}/all`)
  return response.data
}

export default { getAll }
