import { Link } from 'react-router'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const User = ({ user }) => {
  return (
    <section>
      <Typography variant="h4" component="h2" sx={{ margin: '24px 0' }}>
        {user.name}
      </Typography>

      {user.blogs.length ? (
        <>
          <Typography variant="h6" component="h3">
            Added blogs
          </Typography>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <MuiLink
                  color="primary"
                  underline="hover"
                  component={Link}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </MuiLink>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No added blogs</p>
      )}
    </section>
  )
}

export default User
