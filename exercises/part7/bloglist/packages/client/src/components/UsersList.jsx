import { Link } from 'react-router'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const UsersList = ({ users }) => {
  return (
    <section>
      <Typography variant="h4" component="h2" sx={{ margin: '24px 0' }}>
        users
      </Typography>

      {users.length ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Total blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <MuiLink
                      color="primary"
                      underline="hover"
                      component={Link}
                      to={`/users/${user.id}`}
                    >
                      {user.name}
                    </MuiLink>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No users found</p>
      )}
    </section>
  )
}

export default UsersList
