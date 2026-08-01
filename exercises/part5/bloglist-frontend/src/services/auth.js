/**
 * @typedef AuthUser
 * @prop {string} username
 * @prop {string} name
 * @prop {string} token
 */

const AUTH_USER_KEY = 'blogListAuthUser'

/** @type {AuthUser | null} */
let authUser = null

/** @type {() => AuthUser | null} */
const getUserFromStorage = () => {
  const authUserItem = localStorage.getItem(AUTH_USER_KEY)
  if (authUserItem) {
    return JSON.parse(authUserItem)
  }
  return null
}

/** @type {(authUser: AuthUser) => void} */
const setUserInStorage = (authUser) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))
}

/** @type {() => void} */
const removeUserFromStorage = () => {
  localStorage.removeItem(AUTH_USER_KEY)
}

/** @type {(user: AuthUser) => void} */
const setUser = (user) => {
  authUser = user
}

/** @type {() => AuthUser | null} */
const getUser = () => {
  return authUser
}

/** @type {() => string} */
const getToken = () => {
  if (authUser) {
    return `Bearer ${authUser.token}`
  }
  return ''
}

export default {
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
  setUser,
  getUser,
  getToken,
}
