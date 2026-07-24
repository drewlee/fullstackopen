import { useState } from 'react'
import userService from '../services/users'
import Notification, { NOTIFICATION } from './Notification'

const LoginForm = ({ onLogin }) => {
  const nullCredentials = { username: '', password: '' }
  const nullNotification = { message: '', type: '' }
  const [credentials, setCredentials] = useState(nullCredentials)
  const [notification, setNotification] = useState(nullNotification)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const { username, password } = credentials
      const user = await userService.login({ username, password })

      onLogin(user)
      setCredentials(nullCredentials)
    } catch (error) {
      const newNotification = {
        message: 'Something went wrong, try again later',
        type: NOTIFICATION.TYPE.ERROR,
      }

      if (error?.request?.status === 401) {
        newNotification.message = 'Invalid username or password'
      }

      setNotification(newNotification)
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
            onChange={(evt) => setCredentials(
              { ...credentials, username: evt.target.value }
            )}
          />
        </div>

        <div>
          <label htmlFor="login-password">password</label>
          <input
            id="login-password"
            type="password"
            value={credentials.password}
            onChange={(evt) => setCredentials(
              { ...credentials, password: evt.target.value }
            )}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
