import { useState } from 'react'
import { Link } from 'react-router'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useNotificationActions } from '../stores/notification'
import { useUser } from '../stores/user'
import './Blog.css'

const Blog = ({ blog, handleBlogLike, handleBlogRemove }) => {
  const user = useUser()
  const { notifySuccess, notifyError } = useNotificationActions()
  const [isLikeDisabled, setIsLikeDisabled] = useState(false)
  const [isRemoveDisabled, setIsRemoveDisabled] = useState(false)

  const handleLikeClick = async () => {
    setIsLikeDisabled(true)

    try {
      await handleBlogLike()
    } catch (error) {
      notifyError(error.message)
    } finally {
      setIsLikeDisabled(false)
    }
  }

  const handleRemoveClick = async () => {
    const shouldRemove = confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!shouldRemove) {
      return
    }

    setIsRemoveDisabled(true)

    try {
      await handleBlogRemove()
      notifySuccess(`Removed blog "${blog.title}" by ${blog.author}`)
    } catch (error) {
      notifyError(error.message)
    } finally {
      setIsRemoveDisabled(false)
    }
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
