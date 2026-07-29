import { useState } from 'react'
import '../styles/blog.css'

const Blog = ({ user, blog, handleBlogLike, handleBlogRemove }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)

  const handleLikeButtonClick = () => {
    setIsLikeDisabled(true)
    handleBlogLike(blog).then(() => setIsLikeDisabled(false))
  }

  return (
    <article className="blog-container">
      <div className="blog-header">
        <h3 className="blog-heading">{blog.title} - {blog.author}</h3>
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          {!isVisible ? 'view' : 'hide'}
        </button>
      </div>

      <div className="blog-content" hidden={!isVisible}>
        <ul className="blog-content-list">
          <li className="blog-content-list-item">{blog.url}</li>
          <li className="blog-content-list-item blog-content-list-item_like">
            <span data-testid="blog-likes-count">
              {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
            </span>
            <button
              type="button"
              onClick={handleLikeButtonClick}
              disabled={isLikeDisabled}
            >
              like
            </button>
          </li>
          <li className="blog-content-list-item">{blog.user.name}</li>
        </ul>

        {user.username === blog.user.username &&
          <button
            type="button"
            onClick={() => handleBlogRemove(blog)}
          >
            remove
          </button>
        }
      </div>
    </article>
  )
}

export default Blog
