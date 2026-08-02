import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@mui/material'
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
        <AppBar position="static">
          <Toolbar>
            <nav className="primary-nav">
              <ul className="primary-nav_list">
                <li className="primary-nav_list-item">
                  <Button component={Link} to="/" color="inherit">
                    blogs
                  </Button>
                </li>
                {user && (
                  <li className="primary-nav_list-item">
                    <Button component={Link} to="/create" color="inherit">
                      create
                    </Button>
                  </li>
                )}
                <li className="primary-nav_list-item">
                  {user ? (
                    <Button type="button" onClick={handleLogoutClick} color="inherit">
                      logout
                    </Button>
                  ) : (
                    <Button component={Link} to="/login" color="inherit">
                      login
                    </Button>
                  )}
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>

        {user && (
          <Typography variant="body1" sx={{ margin: '16px 0' }}>
            Logged in as {user.name}
          </Typography>
        )}

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
