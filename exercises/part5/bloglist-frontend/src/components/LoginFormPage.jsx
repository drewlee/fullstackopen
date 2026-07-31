import { useNavigate, useOutletContext, Navigate } from 'react-router'
import userService from '../services/users'
import LoginForm from './LoginForm'

const LoginFormPage = () => {
  const navigate = useNavigate()
  const { user, setUser, notifyError } = useOutletContext()

  const loginHandler = async (credentials) => {
    try {
      const user = await userService.login(credentials)

      setUser(user)
      userService.setStoredUser(user)
      navigate('/')
    } catch (error) {
      const message =
        error?.request?.status === 401
          ? 'Invalid username or password'
          : 'Something went wrong, try again later'

      throw new Error(message)
    }
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <LoginForm loginHandler={loginHandler} notifyError={notifyError} />
}

export default LoginFormPage
