import axios from 'axios'

const baseUrl = '/api/notes'

const getToken = () => {
  const user = getUser()

  if (user && user.token) {
    return `Bearer ${user.token}`
  }

  return null
}

const getUser = () => {
  const loggedUserJSON = localStorage.getItem('loggedNoteappUser')

  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }

  return null
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: { Authorization: getToken() }
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

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove,
  getUser,
}
