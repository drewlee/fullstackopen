import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Notification, { NOTIFICATION } from './Notification'
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
      .then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
  }, [])

  const handleCreateBlog = (newBlog) => {
    if (!newBlog.title || !newBlog.url) {
      setNotification({
        message: 'Title and url are required',
        type: NOTIFICATION.TYPE.ERROR,
      })

      return Promise.resolve(false)
    }

    return blogService
      .createNew(newBlog)
      .then((createdBlog) => {
        setNotification({
          message: `${createdBlog.title} by ${createdBlog.author} added`,
          type: NOTIFICATION.TYPE.SUCCESS,
        })
        setBlogs([...blogs, createdBlog])

        return true
      })
      .catch((error) => {
        console.error(error)
        setNotification({
          message: 'Something went wrong, try again later',
          type: NOTIFICATION.TYPE.ERROR,
        })

        return false
      })
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
          type: NOTIFICATION.TYPE.ERROR,
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
          type: NOTIFICATION.TYPE.SUCCESS,
        })
      }).catch((error) => {
        console.error(error)
        setNotification({
          message: 'Something went wrong, try again later',
          type: NOTIFICATION.TYPE.ERROR,
        })
      })
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification
        message={notification.message}
        type={notification.type}
        handleDismiss={() => setNotification(nullNotification)}
      />

      <p>Logged in as {user.name}</p>
      <button type="button" onClick={onLogout}>logout</button>

      <Togglable buttonLabel="create new blog">
        <BlogForm handleCreateBlog={handleCreateBlog} />
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
