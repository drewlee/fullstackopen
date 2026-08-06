import { useAnecdoteActions, useNotificationActions } from '../store'
import { formContainer } from './AnecdoteForm.module.css'

const AnecdoteForm = () => {
  const { addNew } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()

    const content = evt.target.anecdote.value.trim()
    if (!content) {
      alert('Input value required')
      return
    }

    await addNew(content)
    setNotification(`Added "${content}"`)

    evt.target.reset()
  }

  return (
    <section>
      <h2>Create New</h2>

      <form onSubmit={handleFormSubmit} className={formContainer}>
        <div>
          <input
            type="text"
            name="anecdote"
            aria-label="New anecdote"
            placeholder="New anecdote"
          />
        </div>
        <button>create</button>
      </form>
    </section>
  )
}

export default AnecdoteForm
