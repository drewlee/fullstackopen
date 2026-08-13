import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const BlogForm = ({ handleCreateBlog, notifyError, notifySuccess }) => {
  const nullBlog = {
    title: '',
    author: '',
    url: '',
  }
  const [blog, setBlog] = useState(nullBlog)

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const newBlog = { ...blog }

    for (const [key, value] of Object.entries(newBlog)) {
      newBlog[key] = value.trim()
    }

    if (!newBlog.title || !newBlog.url) {
      notifyError('Title and url are required')
      return
    }

    try {
      await handleCreateBlog(newBlog)
      notifySuccess(`Added ${newBlog.title} by ${newBlog.author}`)
      setBlog(nullBlog)
    } catch (error) {
      notifyError(error.message)
    }
  }

  return (
    <>
      <section className="new-blog-form_container">
        <Typography
          variant="h4"
          component="h2"
          sx={{ margin: '24px 0' }}
          id="create-blog-heading"
        >
          create new
        </Typography>

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="new-blog-form"
          aria-labelledby="create-blog-heading"
        >
          <Stack spacing={2}>
            <TextField
              type="text"
              label="title"
              id="blog-title"
              required
              value={blog.title}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  title: evt.target.value,
                })
              }
            />

            <TextField
              type="text"
              label="author"
              id="blog-author"
              value={blog.author}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  author: evt.target.value,
                })
              }
            />

            <TextField
              type="text"
              label="url"
              id="blog-url"
              required
              value={blog.url}
              onChange={(evt) =>
                setBlog({
                  ...blog,
                  url: evt.target.value,
                })
              }
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                alignSelf: 'flex-start',
              }}
            >
              create
            </Button>
          </Stack>
        </form>
      </section>
    </>
  )
}

export default BlogForm
