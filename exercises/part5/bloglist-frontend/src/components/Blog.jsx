import { useState } from 'react'
import './blog.css'

const Blog = ({ user, blog, handleBlogLike, handleBlogRemove }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <article className="blog-container">
      <div className="blog-heading">
        <p>{blog.title} - {blog.author}</p>
        <button type="button" onClick={() => setIsVisible(!isVisible)}>
          {!isVisible ? 'view' : 'hide'}
        </button>
      </div>

      <div className="blog-content" hidden={!isVisible}>
        <ul className="blog-content-list">
          <li className="blog-content-list-item">{blog.url}</li>
          <li className="blog-content-list-item">
            {blog.likes}
            <button type="button" onClick={() => handleBlogLike(blog)}>like</button>
          </li>
          <li className="blog-content-list-item">{blog.user.name}</li>
        </ul>

        {user.username === blog.user.username && (
          <button
            type="button"
            onClick={() => handleBlogRemove(blog)}
          >
            remove
          </button>
        )}
      </div>
    </article>
  )
}

export default Blog
