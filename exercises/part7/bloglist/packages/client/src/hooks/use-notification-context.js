import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

const useNotificationContext = () => useContext(NotificationContext)

export default useNotificationContext
