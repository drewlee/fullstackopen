import { createContext, useState } from 'react'

const NotificationContext = createContext()

const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext as default, NotificationContextProvider }
