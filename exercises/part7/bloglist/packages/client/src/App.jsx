import { useEffect } from 'react'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import persistentUser from './services/persistent-user'
import authService from './services/auth'
import useBlogsQuery from './hooks/use-blogs-query'
import useUserContext from './hooks/use-user-context'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import NotificationContextProvider from './contexts/NotificationContext'

const App = () => {
  const { user: loadedUser } = useLoaderData()
  const { user, setUser } = useUserContext()
  const { isPending, isError, blogs } = useBlogsQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (loadedUser) {
      setUser(loadedUser)
    }
  }, [loadedUser, setUser])

  const handleLogoutClick = () => {
    authService.setUser(null)
    persistentUser.removeUser()
    setUser(null)

    navigate('/')
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong. Try again lager.</p>
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <NotificationContextProvider>
          <NavigationBar user={user} handleLogoutClick={handleLogoutClick} />

          {user && (
            <Typography variant="body1" sx={{ margin: '16px 0' }}>
              Logged in as {user.name}
            </Typography>
          )}

          <Notification />

          <Outlet context={{ blogs }} />
        </NotificationContextProvider>
      </Container>
    </>
  )
}

export default App
