import axios from 'axios'

const baseUrl = 'api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(response => response.data)
    .catch(error => {
      const result = { error: 'Unable to save new person' }

      if (error?.response?.data?.error) {
        result.error = error.response.data.error
      } else if (error?.message) {
        result.error = error.message
      }

      return result
    })
}

const deleteEntry = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const update = newObject => {
  return axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then(response => response.data)
}

export default {
  getAll,
  create,
  deleteEntry,
  update
}
