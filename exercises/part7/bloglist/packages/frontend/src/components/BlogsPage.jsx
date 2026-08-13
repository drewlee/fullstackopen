import { useOutletContext } from 'react-router'
import Blogs from './Blogs'

const BlogsPage = () => {
  const { user, blogs } = useOutletContext()

  return <Blogs user={user} blogs={blogs} />
}

export default BlogsPage
