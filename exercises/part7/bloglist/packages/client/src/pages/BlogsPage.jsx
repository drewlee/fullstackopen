import ErrorBoundary from '../components/ErrorBoundary'
import Blogs from '../components/Blogs'

const BlogsPage = () => {
  return (
    <ErrorBoundary>
      <Blogs />
    </ErrorBoundary>
  )
}

export default BlogsPage
