import axios from 'axios'

const baseUrl = '/api/blogs'
let token = ''

const setToken = value => {
  token = `Bearer ${value}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)

  return response.data
}

export default { getAll, createNew, setToken }
