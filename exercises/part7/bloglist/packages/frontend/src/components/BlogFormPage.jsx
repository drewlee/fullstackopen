import { useOutletContext, useNavigate } from 'react-router'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const BlogFormPage = () => {
  const { blogs, setBlogs, notifyError, notifySuccess } = useOutletContext()
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

  return (
    <BlogForm
      handleCreateBlog={handleCreateBlog}
      notifyError={notifyError}
      notifySuccess={notifySuccess}
    />
  )
}

export default BlogFormPage
