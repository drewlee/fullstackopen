import { useState, useEffect } from 'react'
import { Link, useLoaderData } from 'react-router'
import { Outlet } from 'react-router'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import './App.css'

const App = () => {
  const { blogs: blogData } = useLoaderData()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(blogData)

  useEffect(() => {
    const authUser = userService.getStoredUser()
    if (authUser) {
      blogService.setToken(authUser.token)
      setUser(authUser)
    }
  }, [])

  const handleLogoutClick = () => {
    setUser(null)
    userService.removeStoredUser()
  }

  return (
    <>
      <nav className="primary-nav">
        <ul className="primary-nav_list">
          <li className="primary-nav_list-item">
            <Link to="/">blogs</Link>
          </li>
          {user && (
            <li className="primary-nav_list-item">
              <Link to="/create">new blog</Link>
            </li>
          )}
          <li className="primary-nav_list-item">
            {user ? (
              <button type="button" onClick={handleLogoutClick}>
                logout
              </button>
            ) : (
              <Link to="/login">login</Link>
            )}
          </li>
        </ul>
      </nav>

      <Outlet context={{ user, setUser, blogs, setBlogs }} />
    </>
  )
}

export default App
