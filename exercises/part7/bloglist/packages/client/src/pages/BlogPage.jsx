import { useParams, useNavigate } from 'react-router'
import { useBlogs, useBlogActions } from '../stores/blogs'
import ErrorBoundary from '../components/ErrorBoundary'
import Blog from '../components/Blog'

const BlogPage = () => {
  const blogs = useBlogs()
  const { removeBlog, incrementLikes, addComment } = useBlogActions()
  const navigate = useNavigate()
  const { id } = useParams()
  const currBlog = blogs.find((blog) => blog.id === id)

  const handleBlogLike = async () => {
    try {
      await incrementLikes(currBlog)
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
  }

  const handleBlogRemove = async () => {
    try {
      await removeBlog(currBlog)
      navigate('/')
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
  }

  const handleAddComment = async (comment) => {
    try {
      await addComment(id, comment)
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
  }

  if (!currBlog) {
    return null
  }

  return (
    <ErrorBoundary>
      <Blog
        blog={currBlog}
        handleBlogLike={handleBlogLike}
        handleBlogRemove={handleBlogRemove}
        handleAddComment={handleAddComment}
      />
    </ErrorBoundary>
  )
}

export default BlogPage
