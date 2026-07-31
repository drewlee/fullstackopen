import { useNavigate, useOutletContext } from 'react-router'
import userService from '../services/users'
import LoginForm from './LoginForm'

const LoginFormPage = () => {
  const navigate = useNavigate()
  const { setUser } = useOutletContext()

  const loginHandler = async (credentials) => {
    try {
      const user = await userService.login(credentials)

      setUser(user)
      userService.setStoredUser(user)
      navigate('/')
    } catch (error) {
      let message = 'Something went wrong, try again later'

      if (error?.request?.status === 401) {
        message = 'Invalid username or password'
      }

      throw new Error(message)
    }
  }

  return <LoginForm loginHandler={loginHandler} />
}

export default LoginFormPage
