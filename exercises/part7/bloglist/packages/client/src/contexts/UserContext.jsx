import { createContext, useState } from 'react'

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return <UserContext value={{ user, setUser }}>{children}</UserContext>
}

export { UserContextProvider as default, UserContext }
