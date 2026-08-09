import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAnecdote, getAnecdotes, updateAnecdote } from '../requests'
import useNotify from './use-notify'

const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const { isPending, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
      setNotification(`Added "${newAnecdote.content}"`)
    },
    onError: (error) => {
      setNotification(error.message)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((item) =>
          item.id === updatedAnecdote.id ? updatedAnecdote : item,
        ),
      )
      setNotification(`anecdote "${updatedAnecdote.content}" voted`)
    },
  })

  return {
    anecdotes: data,
    isPending,
    isError,
    addAnecdote: (anecdote) => newAnecdoteMutation.mutate(anecdote),
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate(anecdote),
  }
}

export default useAnecdotes
