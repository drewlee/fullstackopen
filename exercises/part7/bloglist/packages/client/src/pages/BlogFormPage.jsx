import { useNavigate } from 'react-router'
import { useBlogsQueryMutations } from '../hooks/use-blogs-query'
import BlogForm from '../components/BlogForm'

const BlogFormPage = () => {
  const navigate = useNavigate()
  const { addNewBlog } = useBlogsQueryMutations()

  const handleCreateBlog = (newBlog, options) => {
    const currOnSuccess = options?.onSuccess ? options.onSuccess : () => {}

    addNewBlog(newBlog, {
      ...options,
      onSuccess() {
        currOnSuccess(...arguments)
        navigate('/')
      },
    })
  }

  return <BlogForm handleCreateBlog={handleCreateBlog} />
}

export default BlogFormPage
