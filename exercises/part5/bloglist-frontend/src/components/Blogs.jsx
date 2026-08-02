import { Link } from 'react-router'
import { Typography } from '@mui/material'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ margin: '24px 0' }}>
        blogs
      </Typography>

      <ul className="blogs-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blogs-list-item">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
