import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const AUTH_USER_KEY = 'blogListAuthUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authUserValue = localStorage.getItem(AUTH_USER_KEY)

    if (authUserValue) {
      const authUser = JSON.parse(authUserValue)
      setUser(authUser)
    }

    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleOnLogin = (authUser) => {
    setUser(authUser)
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
          ? <Blogs blogs={blogs} user={user} onLogout={handleOnLogout} />
          : <LoginForm onLogin={handleOnLogin} />
      }
    </>
  )
}

export default App
