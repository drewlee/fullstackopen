import { create } from 'zustand'

const NOTIFICATION = {
  TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
}

export const useNotificationStore = create((set) => ({
  message: null,
  type: null,
  setNotification: (message = null, type = null) => set(() => ({ message, type })),
}))

export const useNotification = () => ({
  message: useNotificationStore((state) => state.message),
  type: useNotificationStore((state) => state.type),
})

export const useNotificationActions = () => {
  const setNotification = useNotificationStore((state) => state.setNotification)

  return {
    notifyError: (message) => setNotification(message, NOTIFICATION.TYPE.ERROR),
    notifySuccess: (message) => setNotification(message, NOTIFICATION.TYPE.SUCCESS),
    reset: () => setNotification(),
  }
}
