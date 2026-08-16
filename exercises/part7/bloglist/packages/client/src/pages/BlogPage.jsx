import { useParams, useOutletContext, useNavigate } from 'react-router'
import { useBlogsQueryMutations } from '../hooks/use-blogs-query'
import useUserContext from '../hooks/use-user-context'
import ErrorBoundary from '../components/ErrorBoundary'
import Blog from '../components/Blog'

const BlogPage = () => {
  const { blogs } = useOutletContext()
  const { user } = useUserContext()
  const { incrementLikes, removeBlog } = useBlogsQueryMutations()
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  const handleBlogLike = (likedBlog, options) => {
    incrementLikes(likedBlog, options)
  }

  const handleBlogRemove = (blogId, options) => {
    const currOnSuccess = options?.onSuccess ? options.onSuccess : () => {}
    removeBlog(blogId, {
      ...options,
      onSuccess() {
        currOnSuccess(...arguments)
        navigate('/')
      },
    })
  }

  if (!blog) {
    return null
  }

  return (
    <ErrorBoundary>
      <Blog
        blog={blog}
        user={user}
        handleBlogLike={handleBlogLike}
        handleBlogRemove={handleBlogRemove}
      />
    </ErrorBoundary>
  )
}

export default BlogPage
