import { useOutletContext } from 'react-router'
import ErrorBoundary from './ErrorBoundary'
import Blogs from './Blogs'

const BlogsPage = () => {
  const { user, blogs } = useOutletContext()

  return (
    <ErrorBoundary>
      <Blogs user={user} blogs={blogs} />
    </ErrorBoundary>
  )
}

export default BlogsPage
