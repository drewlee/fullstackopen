import axios from 'axios'

const baseUrl = '/api/notes'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token }
  }

  return axios
    .post(baseUrl, newObject, config)
    .then(response => response.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  setToken,
}
