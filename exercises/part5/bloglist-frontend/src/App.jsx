import { useState, useEffect } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import Notification, { NOTIFICATION } from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import './App.css'

const App = () => {
  const nullNotification = { message: '', type: '' }
  const navigate = useNavigate()
  const { blogs: blogData } = useLoaderData()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(blogData)
  const [notification, setNotification] = useState(nullNotification)

  useEffect(() => {
    const authUser = userService.getStoredUser()
    if (authUser) {
      blogService.setToken(authUser.token)
      setUser(authUser)
    }
  }, [])

  const notifySuccess = (message) => {
    setNotification({
      message,
      type: NOTIFICATION.TYPE.SUCCESS,
    })
  }

  const notifyError = (message) => {
    setNotification({
      message,
      type: NOTIFICATION.TYPE.ERROR,
    })
  }

  const handleLogoutClick = () => {
    setUser(null)
    userService.removeStoredUser()
    navigate('/')
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

      {user && <p>Logged in as {user.name}</p>}

      <Notification
        message={notification.message}
        type={notification.type}
        handleDismiss={() => setNotification(nullNotification)}
      />

      <Outlet
        context={{ user, setUser, blogs, setBlogs, notifySuccess, notifyError }}
      />
    </>
  )
}

export default App
