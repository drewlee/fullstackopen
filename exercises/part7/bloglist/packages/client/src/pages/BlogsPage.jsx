import { useOutletContext } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import Blogs from '../components/Blogs'

const BlogsPage = () => {
  const { user } = useOutletContext()

  return (
    <ErrorBoundary>
      <Blogs user={user} />
    </ErrorBoundary>
  )
}

export default BlogsPage
