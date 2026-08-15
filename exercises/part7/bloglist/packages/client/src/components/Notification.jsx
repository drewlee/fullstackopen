import { useEffect } from 'react'
import Alert from '@mui/material/Alert'
import { NotificationContext } from '../contexts/NotificationContext'
import useNotificationContext from '../hooks/use-notification-context'

const Notification = ({ duration = 5000 }) => {
  const { notification, reset } = useNotificationContext()
  const { message, type } = notification

  useEffect(() => {
    if (!duration) {
      return
    }

    let timeoutId = null

    if (message) {
      timeoutId = setTimeout(reset, duration)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }
  })

  if (!message) {
    return null
  }

  return (
    <Alert severity={type} sx={{ marginTop: '24px' }}>
      {message}
    </Alert>
  )
}

export default Notification
