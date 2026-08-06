import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    async initialize() {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },

    async addNew(content) {
      const newAnecdote = await anecdoteService.addNew({ content, votes: 0 })
      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },

    addVote: (id) => set((state) => {
      return {
        anecdotes: state.anecdotes.map((anecdote) => {
          if (anecdote.id === id) {
            return {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
          }
          return { ...anecdote }
        })
      }
    }),

    setFilter(value) {
      set(() => ({ filter: value }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter) {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  }
  return anecdotes
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
