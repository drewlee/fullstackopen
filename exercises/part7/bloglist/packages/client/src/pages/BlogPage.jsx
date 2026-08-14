import { useParams, useOutletContext, useNavigate } from 'react-router'
import blogService from '../services/blogs'
import ErrorBoundary from '../components/ErrorBoundary'
import Blog from '../components/Blog'

const BlogPage = () => {
  const { blogs, setBlogs, user } = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const blog = blogs.find((blog) => blog.id === id)

  const handleBlogLike = async () => {
    const prevBlogs = blogs
    const updatedBlog = {
      ...blog,
      user: {
        ...blog.user,
      },
      likes: blog.likes + 1,
    }
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        return updatedBlog
      }
      return blog
    })

    // Updates the UI for immediate visual feedback
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)

    try {
      blogService.update(id, {
        ...updatedBlog,
        user: blog.user.id,
      })
    } catch (error) {
      console.error(error)
      // Roll back the blogs if there was a server error
      setBlogs(prevBlogs)
      throw new Error('Something went wrong, try again later')
    }
  }

  const handleBlogRemove = async () => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((currBlog) => currBlog.id !== blog.id))
      navigate('/')
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
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
