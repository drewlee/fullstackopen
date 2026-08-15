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

  const blogs = data && data.length ? data.sort((a, b) => b.votes - a.votes) : []

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

  return {
    addNewBlog: (newBlog, options) => newBlogMutation.mutate(newBlog, options),
  }
}

export { useBlogsQuery as default, useBlogsQueryMutations }
