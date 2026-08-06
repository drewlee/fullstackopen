import { useAnecdoteActions } from '../store'
import { container } from './Filter.module.css'

const Filter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleChange = (event) => {
    const value = event.target.value.trim()
    setFilter(value)
  }

  return (
    <label className={container}>
      filter: <input onChange={handleChange} />
    </label>
  )
}

export default Filter
