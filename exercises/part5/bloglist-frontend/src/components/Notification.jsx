import { useEffect } from 'react'
import { Alert } from '@mui/material'

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

  return <Alert severity={type}>{message}</Alert>
}

export { Notification as default, NOTIFICATION }
