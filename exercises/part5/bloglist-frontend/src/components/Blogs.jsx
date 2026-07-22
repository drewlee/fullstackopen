import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleNewBlog = (blog) => {
    setBlogs([...blogs, blog])
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>{user.name} logged in</p>
      <button type="button" onClick={onLogout}>logout</button>

      <BlogForm onNewBlog={handleNewBlog} />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
