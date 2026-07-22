import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const onLogin = (authUser) => {
    setUser(authUser)
  }

  return (
    <>
      {user ? <Blogs blogs={blogs} user={user} /> : <LoginForm onLogin={onLogin} />}
    </>
  )
}

export default App
