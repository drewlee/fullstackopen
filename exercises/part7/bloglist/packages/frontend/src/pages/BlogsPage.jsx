import { useOutletContext } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import Blogs from '../components/Blogs'

const BlogsPage = () => {
  const { user, blogs } = useOutletContext()

  return (
    <ErrorBoundary>
      <Blogs user={user} blogs={blogs} />
    </ErrorBoundary>
  )
}

export default BlogsPage
