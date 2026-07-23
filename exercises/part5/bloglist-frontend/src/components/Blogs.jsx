import { useEffect, useState } from 'react'
import { NOTIFICATION } from '../shared/config'
import blogService from '../services/blogs'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const Blogs = ({ user, onLogout }) => {
  const nullNotification = { message: '', type: '' }
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(nullNotification)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleNewBlog = (error, blog) => {
    if (error) {
      setNotification({
        message: error.message,
        type: NOTIFICATION.ERROR,
      })
      return
    }

    setNotification({
      message: `${blog.title} added by ${blog.author}`,
      type: NOTIFICATION.SUCCESS,
    })
    setBlogs([...blogs, blog])
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification
        message={notification.message}
        type={notification.type}
        onDismiss={() => setNotification(nullNotification)}
      />

      <p>Logged in as {user.name}</p>
      <button type="button" onClick={onLogout}>logout</button>

      <Togglable buttonLabel="create new blog">
        <BlogForm onNewBlog={handleNewBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
