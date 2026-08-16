import { Link } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import './NavigationBar.css'

const NavigationBar = ({ user, handleLogoutClick }) => {
  return (
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
  )
}

export default NavigationBar
