import { useParams, useOutletContext, useNavigate } from 'react-router'
import { useBlogs, useBlogActions } from '../stores/blogs'
import ErrorBoundary from '../components/ErrorBoundary'
import Blog from '../components/Blog'

const BlogPage = () => {
  const { user } = useOutletContext()
  const blogs = useBlogs()
  const { removeBlog, incrementLikes } = useBlogActions()
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

  if (!currBlog) {
    return null
  }

  return (
    <ErrorBoundary>
      <Blog
        blog={currBlog}
        user={user}
        handleBlogLike={handleBlogLike}
        handleBlogRemove={handleBlogRemove}
      />
    </ErrorBoundary>
  )
}

export default BlogPage
