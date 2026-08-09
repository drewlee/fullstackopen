import { useContext, useEffect } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    let timeoutId = null

    if (notification) {
      timeoutId = setTimeout(() => setNotification(null), 5000)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [notification, setNotification])

  return <>{notification && <div style={style}>{notification}</div>}</>
}

export default Notification
