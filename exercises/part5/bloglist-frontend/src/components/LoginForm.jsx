import { useState } from 'react'
import Notification, { NOTIFICATION } from './Notification'

const LoginForm = ({ loginHandler }) => {
  const nullCredentials = { username: '', password: '' }
  const nullNotification = { message: '', type: '' }
  const [credentials, setCredentials] = useState(nullCredentials)
  const [notification, setNotification] = useState(nullNotification)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    try {
      for (const [key, value] of Object.entries(credentials)) {
        credentials[key] = value.trim()
      }
      const { username, password } = credentials

      if (!username || !password) {
        setNotification({
          message: 'Username and password required',
          type: NOTIFICATION.TYPE.ERROR,
        })
        return
      }

      await loginHandler(credentials)
      setCredentials(nullCredentials)
    } catch (error) {
      setNotification({
        message: error.message,
        type: NOTIFICATION.TYPE.ERROR,
      })
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

      <Notification
        message={notification.message}
        type={notification.type}
        handleDismiss={() => setNotification(nullNotification)}
      />

      <form onSubmit={handleFormSubmit}>
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
