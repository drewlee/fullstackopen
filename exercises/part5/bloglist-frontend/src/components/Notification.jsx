import { useEffect } from 'react'
import '../styles/notification.css'

const NOTIFICATION = {
  TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
}

const Notification = ({ message, type = NOTIFICATION.TYPE.ERROR, handleDismiss }) => {
  useEffect(() => {
    let timeoutId

    if (message) {
      timeoutId = setTimeout(handleDismiss, 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })

  if (!message) {
    return null
  }

  return (
    <div className={`notification-${type}`}>
      <p className="notification-message">{message}</p>
    </div>
  )
}

export { Notification as default, NOTIFICATION }
