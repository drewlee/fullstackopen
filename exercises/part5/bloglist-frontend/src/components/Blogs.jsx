import { Link } from 'react-router'
import Notification, { NOTIFICATION } from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
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
