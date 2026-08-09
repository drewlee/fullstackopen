import { createContext, useState } from 'react'

const CounterContext = createContext()

const CounterContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter(counter + 1)
  const decrement = () => setCounter(counter - 1)
  const zero = () => setCounter(0)

  return (
    <CounterContext.Provider value={{ counter, increment, decrement, zero }}>
      {children}
    </CounterContext.Provider>
  )
}

export { CounterContext as default, CounterContextProvider }
