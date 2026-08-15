import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useNotificationContext from '../hooks/use-notification-context'

const nullCredentials = { username: '', password: '' }

const LoginForm = ({ loginHandler }) => {
  const [credentials, setCredentials] = useState(nullCredentials)
  const { notifyError } = useNotificationContext()

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
      <Typography
        variant="h4"
        component="h2"
        sx={{ margin: '24px 0' }}
        id="login-heading"
      >
        log in to application
      </Typography>

      <form onSubmit={handleFormSubmit} aria-labelledby="login-heading">
        <Stack spacing={2}>
          <TextField
            type="text"
            label="username"
            id="login-username"
            value={credentials.username}
            onChange={(evt) =>
              setCredentials({ ...credentials, username: evt.target.value })
            }
          />

          <TextField
            type="password"
            label="password"
            id="login-password"
            value={credentials.password}
            onChange={(evt) =>
              setCredentials({ ...credentials, password: evt.target.value })
            }
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            login
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default LoginForm
