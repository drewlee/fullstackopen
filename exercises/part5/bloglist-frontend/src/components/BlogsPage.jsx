import { useOutletContext, useLoaderData } from 'react-router'
import Blogs from './Blogs'

const BlogsPage = () => {
  const { user } = useOutletContext()
  const { blogs } = useLoaderData()

  return <Blogs user={user} data={blogs} />
}

export default BlogsPage
