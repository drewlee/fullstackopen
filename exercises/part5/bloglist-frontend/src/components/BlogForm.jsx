import { useState } from 'react'
import '../styles/blog-form.css'

const BlogForm = ({ handleCreateBlog }) => {
  const nullBlog = {
    title: '',
    author: '',
    url: '',
  }
  const [blog, setBlog] = useState(nullBlog)

  const handleFormSubmit = (evt) => {
    evt.preventDefault()

    const newBlog = { ...blog }

    for (const [key, value] of Object.entries(newBlog)) {
      newBlog[key] = value.trim()
    }

    handleCreateBlog(newBlog).then((wasCreated) => {
      if (wasCreated) {
        setBlog(nullBlog)
      }
    })
  }

  return (
    <section className="new-blog-form_container">
      <h2>create new</h2>

      <form onSubmit={handleFormSubmit} noValidate className="new-blog-form">
        <div className="new-blog-form_field">
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

        <div className="new-blog-form_field">
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

        <div className="new-blog-form_field">
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
    </section>
  )
}

export default BlogForm
