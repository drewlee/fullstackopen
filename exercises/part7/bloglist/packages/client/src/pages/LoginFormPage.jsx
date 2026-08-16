import { useNavigate } from 'react-router'
import userService from '../services/users'
import authService from '../services/auth'
import persistentUser from '../services/persistent-user'
import useUserContext from '../hooks/use-user-context'
import LoginForm from '../components/LoginForm'

const LoginFormPage = () => {
  const navigate = useNavigate()
  const { setUser } = useUserContext()

  const loginHandler = async (credentials) => {
    try {
      const user = await userService.login(credentials)

      authService.setUser(user)
      persistentUser.saveUser(user)
      setUser(user)

      navigate('/')
    } catch (error) {
      const message =
        error?.request?.status === 401
          ? 'Invalid username or password'
          : 'Something went wrong, try again later'

      throw new Error(message)
    }
  }

  return <LoginForm loginHandler={loginHandler} />
}

export default LoginFormPage
