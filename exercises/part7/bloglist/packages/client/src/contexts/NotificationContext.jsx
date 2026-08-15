import { createContext, useReducer } from 'react'

const NOTIFICATION = {
  TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
  ACTION: {
    SUCCESS: 'notify_success',
    ERROR: 'notify_error',
  },
}
const NotificationContext = createContext()
const nullNotification = { message: '', type: '' }

const reducer = (state, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case NOTIFICATION.ACTION.SUCCESS:
      return {
        message: action.message,
        type: NOTIFICATION.TYPE.SUCCESS,
      }
    case NOTIFICATION.ACTION.ERROR:
      return {
        message: action.message,
        type: NOTIFICATION.TYPE.ERROR,
      }
    default:
      return nullNotification
  }
  /* eslint-enable indent */
}

const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, nullNotification)

  const notifySuccess = (message) =>
    dispatch({ message, type: NOTIFICATION.ACTION.SUCCESS })
  const notifyError = (message) =>
    dispatch({ message, type: NOTIFICATION.ACTION.ERROR })
  const reset = () => dispatch({ type: 'reset' })

  return (
    <NotificationContext value={{ notification, notifySuccess, notifyError, reset }}>
      {children}
    </NotificationContext>
  )
}

export { NotificationContextProvider as default, NotificationContext }
