import axios from 'axios'
import authService from './auth'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (blog) => {
  const config = {
    headers: { Authorization: authService.getToken() },
  }
  const response = await axios.post(baseUrl, blog, config)

  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: { Authorization: authService.getToken() },
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, blog, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: authService.getToken() },
  }
  const url = `${baseUrl}/${id}`
  await axios.delete(url, config)
}

export default {
  getAll,
  createNew,
  update,
  remove,
}
