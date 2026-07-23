import { useEffect } from 'react'
import './notification.css'

const Notification = ({ message, type, onDismiss }) => {
  useEffect(() => {
    if (message) {
      setTimeout(onDismiss, 5000)
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

export default Notification
