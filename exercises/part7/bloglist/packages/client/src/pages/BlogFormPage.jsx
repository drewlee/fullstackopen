import { useOutletContext, useNavigate } from 'react-router'
import blogService from '../services/blogs'
import BlogForm from '../components/BlogForm'

const BlogFormPage = () => {
  const { blogs, setBlogs } = useOutletContext()
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

  return <BlogForm handleCreateBlog={handleCreateBlog} />
}

export default BlogFormPage
