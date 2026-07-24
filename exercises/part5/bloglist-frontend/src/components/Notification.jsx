import { useEffect } from 'react'
import '../styles/notification.css'

const NOTIFICATION = {
  TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
}

const Notification = ({ message, type, handleDismiss }) => {
  useEffect(() => {
    let toId

    if (message) {
      toId = setTimeout(handleDismiss, 5000)
    }

    return () => {
      if (toId) {
        clearTimeout(toId)
      }
    }
  })

  return (
    <>
      {message && (
        <div className={`notification-${type}`}>
          <p className="notification-message">{message}</p>
        </div>
      )}
    </>
  )
}

export { Notification as default, NOTIFICATION }
