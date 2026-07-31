import { useParams, useOutletContext } from 'react-router'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogPage = () => {
  const { blogs, setBlogs, user } = useOutletContext()
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

    // Update the UI for immediate visual feedback
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)

    try {
      blogService.update(id, {
        ...updatedBlog,
        user: blog.user.id,
      })
    } catch (error) {
      console.error(error)
      // Revert blogs if there was a server error
      setBlogs(prevBlogs)
      throw new Error('Something went wrong, try again later')
    }
  }

  const handleBlogRemove = () => {
    // todo
  }

  return (
    <Blog
      blog={blog}
      user={user}
      handleBlogLike={handleBlogLike}
      handleBlogRemove={handleBlogRemove}
    />
  )
}

export default BlogPage
