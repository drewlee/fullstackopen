import { useState } from 'react'
import { Link } from 'react-router'
import Notification, { NOTIFICATION } from './Notification'
import '../styles/blog.css'

const Blog = ({ blog, user, handleBlogLike, handleBlogRemove }) => {
  const nullNotification = { message: '', type: '' }
  const [notification, setNotification] = useState(nullNotification)
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)

  const handleLikeClick = async () => {
    setIsLikeDisabled(true)

    try {
      handleBlogLike(blog)
    } catch (error) {
      setNotification({
        message: error.message,
        type: NOTIFICATION.TYPE.ERROR,
      })
    } finally {
      setIsLikeDisabled(false)
    }
  }

  return (
    <div>
      <Notification
        message={notification.message}
        type={notification.type}
        handleDismiss={() => setNotification(nullNotification)}
      />

      <article className="blog-container">
        <h3 className="blog-heading">
          {blog.title} - {blog.author}
        </h3>

        <div className="blog-content">
          <ul className="blog-content-list">
            <li className="blog-content-list-item">
              <a href={blog.url} target="_blank">
                {blog.url}
              </a>
            </li>
            <li className="blog-content-list-item blog-content-list-item_like">
              <span data-testid="blog-likes-count">
                {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
              </span>
              {user && (
                <button
                  type="button"
                  onClick={handleLikeClick}
                  disabled={isLikeDisabled}
                >
                  like
                </button>
              )}
            </li>
            <li className="blog-content-list-item">Added by {blog.user.name}</li>
          </ul>

          {user?.username === blog.user.username && (
            <button type="button" onClick={() => handleBlogRemove(blog)}>
              remove
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export default Blog
