/**
 * @typedef AuthUser
 * @prop {string} username
 * @prop {string} name
 * @prop {string} token
 */

const AUTH_USER_KEY = 'blogListAuthUser'

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

export default {
  getUserFromStorage,
  setUserInStorage,
  removeUserFromStorage,
}
