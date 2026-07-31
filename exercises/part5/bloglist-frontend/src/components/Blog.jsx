import { useState } from 'react'
import { Link } from 'react-router'
import '../styles/blog.css'

const Blog = ({
  blog,
  user,
  handleBlogLike,
  handleBlogRemove,
  notifyError,
  notifySuccess,
}) => {
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(false)

  const handleLikeClick = async () => {
    setIsLikeDisabled(true)

    try {
      handleBlogLike(blog)
    } catch (error) {
      notifyError(error.message)
    } finally {
      setIsLikeDisabled(false)
    }
  }

  const handleRemoveClick = async () => {
    const shouldRemove = confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!shouldRemove) {
      return
    }

    setIsRemoveDisabled(true)

    try {
      await handleBlogRemove()
      notifySuccess(`Removed blog "${blog.title}" by ${blog.author}`)
    } catch (error) {
      notifyError(error.message)
    } finally {
      setIsRemoveDisabled(false)
    }
  }

  return (
    <div>
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
            <button
              type="button"
              onClick={handleRemoveClick}
              disabled={isRemoveDisabled}
            >
              remove
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export default Blog
