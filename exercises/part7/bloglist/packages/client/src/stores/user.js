import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
  user: null,
  actions: {
    setUser: (user) => set(() => ({ user })),
    getToken: () => {
      const { user } = get()
      if (user) {
        return `Bearer ${user.token}`
      }
      return ''
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
