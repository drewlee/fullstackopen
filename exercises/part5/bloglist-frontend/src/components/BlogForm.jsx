import { useState } from 'react'
import Notification, { NOTIFICATION } from './Notification'
import '../styles/blog-form.css'

const BlogForm = ({ handleCreateBlog }) => {
  const nullBlog = {
    title: '',
    author: '',
    url: '',
  }
  const nullNotification = { message: '', type: '' }
  const [blog, setBlog] = useState(nullBlog)
  const [notification, setNotification] = useState(nullNotification)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const newBlog = { ...blog }

    for (const [key, value] of Object.entries(newBlog)) {
      newBlog[key] = value.trim()
    }

    if (!newBlog.title || !newBlog.url) {
      setNotification({
        message: 'Title and url are required',
        type: NOTIFICATION.TYPE.ERROR,
      })
      return
    }

    try {
      await handleCreateBlog(newBlog)
      setBlog(nullBlog)
    } catch (error) {
      console.error(error)
      setNotification({
        message: error.message,
        type: NOTIFICATION.TYPE.ERROR,
      })
    }
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        handleDismiss={() => setNotification(nullNotification)}
      />

      <section className="new-blog-form_container">
        <h2>create new</h2>

        <form onSubmit={handleFormSubmit} noValidate className="new-blog-form">
          <div className="new-blog-form_field">
            <label htmlFor="blog-title">title</label>
            <input
              type="text"
              id="blog-title"
              value={blog.title}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  title: evt.target.value,
                })
              }
              required
            />
          </div>

          <div className="new-blog-form_field">
            <label htmlFor="blog-author">author</label>
            <input
              type="text"
              id="blog-author"
              value={blog.author}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  author: evt.target.value,
                })
              }
            />
          </div>

          <div className="new-blog-form_field">
            <label htmlFor="blog-url">url</label>
            <input
              type="text"
              id="blog-url"
              value={blog.url}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  url: evt.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit">create</button>
        </form>
      </section>
    </>
  )
}

export default BlogForm
