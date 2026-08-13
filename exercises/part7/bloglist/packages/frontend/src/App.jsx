import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
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
                      new blog
                    </Button>
                  </li>
                )}
                <li className="primary-nav_list-item">
                  {user ? (
                    <Button
                      type="button"
                      onClick={handleLogoutClick}
                      color="inherit"
                      variant="outlined"
                    >
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
          onDismiss={() => setNotification(nullNotification)}
        />

        <Outlet
          context={{ user, setUser, blogs, setBlogs, notifySuccess, notifyError }}
        />
      </Container>
    </>
  )
}

export default App
