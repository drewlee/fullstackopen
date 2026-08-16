import { Link, useNavigate, Outlet } from 'react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useUser, useUserActions } from './stores/user'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import persistentUser from './services/persistent-user'

const App = () => {
  const user = useUser()
  const { setUser } = useUserActions()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    setUser(null)
    persistentUser.removeUser()

    navigate('/')
  }

  return (
    <>
      <CssBaseline />
      <Container>
        <NavigationBar user={user} handleLogoutClick={handleLogoutClick} />

        {user && (
          <Typography variant="body1" sx={{ margin: '16px 0' }}>
            Logged in as {user.name}
          </Typography>
        )}

        <Notification />

        <Outlet />
      </Container>
    </>
  )
}

export default App
