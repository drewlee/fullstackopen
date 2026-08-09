import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAnecdote, getAnecdotes, updateAnecdote } from '../requests'

const useAnecdotes = () => {
  const queryClient = useQueryClient()

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
    },
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
