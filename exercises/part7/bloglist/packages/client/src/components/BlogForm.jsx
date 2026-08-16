import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import useField from '../hooks/use-field'
import { useNotificationActions } from '../stores/notification'

const BlogForm = ({ handleCreateBlog }) => {
  const title = useField()
  const author = useField()
  const url = useField()
  const { notifyError, notifySuccess } = useNotificationActions()

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const newBlog = {
      title: title.getValue(),
      author: author.getValue(),
      url: url.getValue(),
    }

    if (!newBlog.title || !newBlog.url) {
      notifyError('Title and url are required')
      return
    }

    try {
      await handleCreateBlog(newBlog)
      notifySuccess(`Added ${newBlog.title} by ${newBlog.author}`)
      title.reset()
      author.reset()
      url.reset()
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
            <TextField id="blog-title" label="title" required {...title.props} />

            <TextField id="blog-author" label="author" {...author.props} />

            <TextField id="blog-url" label="url" required {...url.props} />

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
