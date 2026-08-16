/** @import {AuthUser} from './auth' */

const AUTH_USER_KEY = 'blogListAuthUser'

/** @type {() => AuthUser | null} */
const getUser = () => {
  try {
    const authUserItem = localStorage.getItem(AUTH_USER_KEY)
    if (authUserItem) {
      return JSON.parse(authUserItem)
    }
  } catch {
    console.log('Unable to access local storage')
  }
  return null
}

/** @type {(authUser: AuthUser) => void} */
const saveUser = (authUser) => {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))
  } catch {
    console.log('Unable to write to local storage')
  }
}

/** @type {() => void} */
const removeUser = () => {
  try {
    localStorage.removeItem(AUTH_USER_KEY)
  } catch {
    console.log('Unable to access local storage')
  }
}

export default { getUser, saveUser, removeUser }
