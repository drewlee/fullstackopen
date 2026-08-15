import { useState } from 'react'
import { Link } from 'react-router'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import useNotificationContext from '../hooks/use-notification-context'
import './Blog.css'

const Blog = ({ blog, user, handleBlogLike, handleBlogRemove }) => {
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(false)
  const { notifyError, notifySuccess } = useNotificationContext()

  const handleLikeClick = () => {
    setIsLikeDisabled(true)

    handleBlogLike(blog, {
      onError: () => notifyError('Something went wrong, try again later'),
      onSettled: () => setIsLikeDisabled(false),
    })
  }

  const handleRemoveClick = () => {
    const shouldRemove = confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!shouldRemove) {
      return
    }

    setIsRemoveDisabled(true)

    handleBlogRemove(blog.id, {
      onSuccess: () => notifySuccess(`Removed blog "${blog.title}" by ${blog.author}`),
      onError: () => notifyError('Something went wrong, try again later'),
      onSettled: () => setIsRemoveDisabled(false),
    })
  }

  return (
    <div>
      <Paper
        elevation={6}
        sx={{ marginTop: '24px', padding: '24px' }}
        component="article"
      >
        <Typography variant="h6" component="h2">
          {blog.title} - {blog.author}
        </Typography>

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
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleLikeClick}
                  disabled={isLikeDisabled}
                >
                  like
                </Button>
              )}
            </li>
            <li className="blog-content-list-item">Added by {blog.user.name}</li>
          </ul>

          {user?.username === blog.user.username && (
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleRemoveClick}
              disabled={isRemoveDisabled}
            >
              remove
            </Button>
          )}
        </div>
      </Paper>
    </div>
  )
}

export default Blog
