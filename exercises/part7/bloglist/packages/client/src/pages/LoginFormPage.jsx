import { useNavigate, useOutletContext } from 'react-router'
import userService from '../services/users'
import authService from '../services/auth'
import LoginForm from '../components/LoginForm'

const LoginFormPage = () => {
  const navigate = useNavigate()
  const { setUser, notifyError } = useOutletContext()

  const loginHandler = async (credentials) => {
    try {
      const user = await userService.login(credentials)

      setUser(user)
      authService.setUser(user)
      authService.setUserInStorage(user)

      navigate('/')
    } catch (error) {
      const message =
        error?.request?.status === 401
          ? 'Invalid username or password'
          : 'Something went wrong, try again later'

      throw new Error(message)
    }
  }

  return <LoginForm loginHandler={loginHandler} notifyError={notifyError} />
}

export default LoginFormPage
