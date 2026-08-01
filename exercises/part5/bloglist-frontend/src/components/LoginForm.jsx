import { useState } from 'react'
import Notification, { NOTIFICATION } from './Notification'

const LoginForm = ({ loginHandler, notifyError }) => {
  const nullCredentials = { username: '', password: '' }
  const [credentials, setCredentials] = useState(nullCredentials)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    try {
      for (const [key, value] of Object.entries(credentials)) {
        credentials[key] = value.trim()
      }
      const { username, password } = credentials

      if (!username || !password) {
        notifyError('Username and password required')
        return
      }

      await loginHandler(credentials)
      setCredentials(nullCredentials)
    } catch (error) {
      notifyError(error.message)
    }
  }

  return (
    <div>
      <h2 id="login-heading">log in to application</h2>

      <form onSubmit={handleFormSubmit} aria-labelledby="login-heading">
        <div>
          <label htmlFor="login-username">username</label>
          <input
            id="login-username"
            type="text"
            value={credentials.username}
            onChange={(evt) =>
              setCredentials({ ...credentials, username: evt.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="login-password">password</label>
          <input
            id="login-password"
            type="password"
            value={credentials.password}
            onChange={(evt) =>
              setCredentials({ ...credentials, password: evt.target.value })
            }
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
