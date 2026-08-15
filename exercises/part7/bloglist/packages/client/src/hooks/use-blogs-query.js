import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BLOGS_QUERY_KEY = ['blogs']

const useBlogsQuery = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: BLOGS_QUERY_KEY,
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  })

  const blogs = data && data.length ? data.sort((a, b) => b.likes - a.likes) : []

  return {
    isPending,
    isError,
    blogs,
  }
}

const useBlogsQueryMutations = () => {
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNew,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(BLOGS_QUERY_KEY)
      queryClient.setQueryData(BLOGS_QUERY_KEY, [...blogs, newBlog])
    },
    onError: (error) => console.error(error),
  })

  const incrementLikesMutation = useMutation({
    mutationFn: (blog) => {
      const { id } = blog
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }

      return blogService.update(id, updatedBlog)
    },
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(BLOGS_QUERY_KEY)
      queryClient.setQueryData(
        BLOGS_QUERY_KEY,
        blogs.map((blog) => {
          if (blog.id === updatedBlog.id) {
            return updatedBlog
          }
          return blog
        }),
      )
    },
    onError: (error) => console.error(error),
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, removedBlogId) => {
      const blogs = queryClient.getQueryData(BLOGS_QUERY_KEY)
      queryClient.setQueryData(
        BLOGS_QUERY_KEY,
        blogs.filter((blog) => blog.id !== removedBlogId),
      )
    },
    onError: (error) => console.error(error),
  })

  return {
    addNewBlog: (newBlog, options) => newBlogMutation.mutate(newBlog, options),
    incrementLikes: (blog, options) => incrementLikesMutation.mutate(blog, options),
    removeBlog: (id, options) => removeBlogMutation.mutate(id, options),
  }
}

export { useBlogsQuery as default, useBlogsQueryMutations }
