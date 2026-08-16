/**
 * @typedef AuthUser
 * @prop {string} username
 * @prop {string} name
 * @prop {string} token
 */

/** @type {AuthUser | null} */
let authUser = null

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
  setUser,
  getUser,
  getToken,
}
