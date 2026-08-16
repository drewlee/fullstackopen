import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useField from '../hooks/use-field'
import { useNotificationActions } from '../stores/notification'

const LoginForm = ({ loginHandler }) => {
  const username = useField()
  const password = useField('password')
  const { notifyError } = useNotificationActions()

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const credentials = {
      username: username.getValue(),
      password: password.getValue(),
    }

    if (!credentials.username || !credentials.password) {
      notifyError('Username and password required')
      return
    }

    try {
      await loginHandler(credentials)
      username.reset()
      password.reset()
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
          <TextField id="login-username" label="username" {...username.props} />

          <TextField id="login-password" label="password" {...password.props} />

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
