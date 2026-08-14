import { useEffect } from 'react'
import Alert from '@mui/material/Alert'
import { useNotification, useNotificationActions } from '../stores/notification'

const Notification = ({ duration = 5000 }) => {
  const { message, type } = useNotification()
  const { reset } = useNotificationActions()

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
