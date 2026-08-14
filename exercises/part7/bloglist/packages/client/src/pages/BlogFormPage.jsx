import { useNavigate } from 'react-router'
import { useBlogActions } from '../stores/blogs'
import BlogForm from '../components/BlogForm'

const BlogFormPage = () => {
  const { addBlog } = useBlogActions()
  const navigate = useNavigate()

  const handleCreateBlog = async (newBlog) => {
    try {
      await addBlog(newBlog)
      navigate('/')
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong, try again later')
    }
  }

  return <BlogForm handleCreateBlog={handleCreateBlog} />
}

export default BlogFormPage
