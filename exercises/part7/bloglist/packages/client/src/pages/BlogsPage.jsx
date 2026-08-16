import { useOutletContext } from 'react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import Blogs from '../components/Blogs'

const BlogsPage = () => {
  const { blogs } = useOutletContext()

  return (
    <ErrorBoundary>
      <Blogs blogs={blogs} />
    </ErrorBoundary>
  )
}

export default BlogsPage
