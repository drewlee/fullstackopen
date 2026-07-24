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
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
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

  const handleBlogLike = (blog) => {
    const { id } = blog
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    blogService
      .update(id, updatedBlog)
      .then((savedBlog) => {
        setBlogs(blogs.map((blog) => {
          if (blog.id === id) {
            return savedBlog
          }
          return blog
        }))
      }).catch(() => {
        setNotification({
          message: 'Something went wrong, try again later',
          type: NOTIFICATION.ERROR,
        })
      })
  }

  const handleBlogRemove = (blogToRemove) => {
    const shouldRemove = confirm(
      `Remove blog "${blogToRemove.title}" by ${blogToRemove.author}?`
    )
    if (!shouldRemove) {
      return
    }

    blogService
      .remove(blogToRemove.id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id))
        setNotification({
          message: `Removed blog "${blogToRemove.title}" by ${blogToRemove.author}`,
          type: NOTIFICATION.SUCCESS,
        })
      }).catch(() => {
        setNotification({
          message: 'Something went wrong, try again later',
          type: NOTIFICATION.ERROR,
        })
      })
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
        <Blog 
          key={blog.id}
          user={user}
          blog={blog}
          handleBlogLike={handleBlogLike}
          handleBlogRemove={handleBlogRemove}
        />
      )}
    </div>
  )
}

export default Blogs
