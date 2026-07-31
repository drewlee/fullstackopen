import { Link } from 'react-router'
import Notification, { NOTIFICATION } from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const Blogs = ({ user, blogs }) => {
  // const handleBlogRemove = (blogToRemove) => {
  //   const shouldRemove = confirm(
  //     `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`,
  //   )
  //   if (!shouldRemove) {
  //     return
  //   }

  //   blogService
  //     .remove(blogToRemove.id)
  //     .then(() => {
  //       setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
  //       setNotification({
  //         message: `Removed blog "${blogToRemove.title}" by ${blogToRemove.author}`,
  //         type: NOTIFICATION.TYPE.SUCCESS,
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setNotification({
  //         message: 'Something went wrong, try again later',
  //         type: NOTIFICATION.TYPE.ERROR,
  //       })
  //     })
  // }

  return (
    <div>
      <h2>blogs</h2>

      {user && <p>Logged in as {user.name}</p>}

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
