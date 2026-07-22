import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ onNewBlog }) => {
  const nullBlog = {
    title: '',
    author: '',
    url: '',
  }
  const [blog, setBlog] = useState(nullBlog)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const blogEntries = Object.entries(blog)
    const newBlog = {}

    for (const [key, value] of blogEntries) {
      newBlog[key] = value.trim()
    }

    if (!newBlog.title || !newBlog.url) {
      alert('Title and url required')
      return
    }

    try {
      const result = await blogService.createNew(newBlog)

      onNewBlog(result)
      setBlog(nullBlog)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleFormSubmit} noValidate>
        <div>
          <label htmlFor="blog-title">title</label>
          <input
            type="text"
            id="blog-title"
            value={blog.title}
            onChange={(evt) => setBlog({
              ...blog,
              title: evt.target.value,
            })}
            required
          />
        </div>

        <div>
          <label htmlFor="blog-author">author</label>
          <input
            type="text"
            id="blog-author"
            value={blog.author}
            onChange={(evt) => setBlog({
              ...blog,
              author: evt.target.value,
            })}
          />
        </div>

        <div>
          <label htmlFor="blog-url">url</label>
          <input
            type="text"
            id="blog-url"
            value={blog.url}
            onChange={(evt) => setBlog({
              ...blog,
              url: evt.target.value,
            })}
            required
          />
        </div>

        <button type="submit">create</button>
      </form>
      <br />
    </div>
  )
}

export default BlogForm
