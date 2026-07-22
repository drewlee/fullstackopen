import { useState } from 'react'
import userService from '../services/users'

const LoginForm = ({ onLogin }) => {
  const defaultCredentials = { username: '', password: '' }
  const [credentials, setCredentials] = useState(defaultCredentials)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const { username, password } = credentials
      const user = await userService.login({ username, password })

      onLogin(user)
      setCredentials(defaultCredentials)
    } catch {
      alert('Invalid username or password')
    }
  }

  return (
    <div>
      <h2>log in to application</h2>

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
