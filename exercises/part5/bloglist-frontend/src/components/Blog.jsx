import { useState } from 'react'
import './blog.css'

const Blog = ({ blog }) => {
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
            <button type="button">like</button>
          </li>
          <li className="blog-content-list-item">{blog.user.name}</li>
        </ul>
      </div>
    </article>
  )
}

export default Blog
