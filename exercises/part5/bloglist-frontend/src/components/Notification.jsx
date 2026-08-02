import { useEffect } from 'react'
import Alert from '@mui/material/Alert'

const NOTIFICATION = {
  TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
}

const Notification = ({
  message,
  type = NOTIFICATION.TYPE.ERROR,
  onDismiss,
  duration = 5000,
}) => {
  useEffect(() => {
    if (!duration) {
      return
    }

    let timeoutId = null

    if (message) {
      timeoutId = setTimeout(onDismiss, duration)
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

export { Notification as default, NOTIFICATION }
