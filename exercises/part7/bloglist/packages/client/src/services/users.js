import axios from 'axios'

const BASE_URL = '/api/users'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

export default { getAll }
