import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const AUTH_USER_KEY = 'blogListAuthUser'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authUserValue = localStorage.getItem(AUTH_USER_KEY)

    if (authUserValue) {
      const authUser = JSON.parse(authUserValue)

      setUser(authUser)
      blogService.setToken(authUser.token)
    }
  }, [])

  const handleOnLogin = (authUser) => {
    setUser(authUser)
    blogService.setToken(authUser.token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser))
  }

  const handleOnLogout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_USER_KEY)
  }

  return (
    <>
      {
        user
          ? <Blogs user={user} onLogout={handleOnLogout} />
          : <LoginForm onLogin={handleOnLogin} />
      }
    </>
  )
}

export default App
