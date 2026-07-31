import axios from 'axios'
import blogService from './blogs'

const AUTH_USER_KEY = 'blogListAuthUser'
const BASE_URL = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(BASE_URL, credentials)
  return response.data
}

const getStoredUser = () => {
  const authUserValue = localStorage.getItem(AUTH_USER_KEY)

  if (authUserValue) {
    const authUser = JSON.parse(authUserValue)
    return authUser
  }
}

const setStoredUser = (authUser) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))
  blogService.setToken(authUser.token)
}

const removeStoredUser = () => {
  localStorage.removeItem(AUTH_USER_KEY)
}

export default { login, getStoredUser, setStoredUser, removeStoredUser }
