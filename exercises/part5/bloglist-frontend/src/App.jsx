import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Notification, { NOTIFICATION } from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import authService from './services/auth'
import './App.css'

const App = () => {
  const nullNotification = { message: '', type: '' }
  const navigate = useNavigate()
  const { blogs: blogData, user: userData } = useLoaderData()
  const [user, setUser] = useState(userData)
  const [blogs, setBlogs] = useState(blogData)
  const [notification, setNotification] = useState(nullNotification)

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
    authService.setUser(null)
    authService.removeUserFromStorage()

    navigate('/')
  }

  return (
    <>
      <CssBaseline />
      <Container>
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
      </Container>
    </>
  )
}

export default App
