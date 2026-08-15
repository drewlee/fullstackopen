import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useNotificationContext from '../hooks/use-notification-context'

const nullBlog = {
  title: '',
  author: '',
  url: '',
}

const BlogForm = ({ handleCreateBlog }) => {
  const [blog, setBlog] = useState(nullBlog)
  const { notifyError, notifySuccess } = useNotificationContext()

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

    handleCreateBlog(newBlog, {
      onSuccess(savedBlog) {
        setBlog(nullBlog)
        notifySuccess(`Added ${savedBlog.title} by ${savedBlog.author}`)
      },
      onError() {
        notifyError('Something went wrong, try again later')
      },
    })
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
