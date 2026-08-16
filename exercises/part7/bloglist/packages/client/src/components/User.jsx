import { Link } from 'react-router'
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
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
