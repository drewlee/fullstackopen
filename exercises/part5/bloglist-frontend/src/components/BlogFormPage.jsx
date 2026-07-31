import { useOutletContext, useNavigate } from 'react-router'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const BlogFormPage = () => {
  const { user, blogs, setBlogs, notifyError, notifySuccess } = useOutletContext()
  const navigate = useNavigate()

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createNew(newBlog)
      setBlogs([...blogs, createdBlog])
      navigate('/')
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
  }

  // TODO: Provide a better way of checking for login state
  // Redirects should be handled in the loader
  if (!user) {
    return <p>Must be logged in</p>
  }

  return (
    <BlogForm
      handleCreateBlog={handleCreateBlog}
      notifyError={notifyError}
      notifySuccess={notifySuccess}
    />
  )
}

export default BlogFormPage
