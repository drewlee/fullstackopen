import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
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

    async addVote(id) {
      const anecdote = get().anecdotes.find((item) => item.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })

      set(
        (state) => ({
          anecdotes: state.anecdotes.map((item) => item.id === updated.id ? updated : item)
        })
      )
    },

    async remove(id) {
      await anecdoteService.remove(id)
      set((state) => ({ anecdotes: state.anecdotes.filter((item) => item.id !== id) }))
    },

    setFilter(value) {
      set(() => ({ filter: value }))
    }
  },
}))

const useNotificationStore = create((set) => ({
  notification: null,
  actions: {
    setNotification(notification) {
      set(() => ({ notification }))
      setTimeout(() => set(() => ({ notification: null })), 5000)
    },
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const sorted = anecdotes.toSorted((a, b) => b.votes - a.votes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter) {
    return sorted.filter(
      (anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }

  return sorted
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export default useAnecdoteStore
