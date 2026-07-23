import { useState } from 'react'

const Togglable = ({ buttonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div hidden={isVisible}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div hidden={!isVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable
