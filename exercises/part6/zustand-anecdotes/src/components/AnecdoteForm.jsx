import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { addNew } = useAnecdoteActions()

  const handleFormSubmit = (evt) => {
    evt.preventDefault()

    const content = evt.target.anecdote.value.trim()
    if (!content) {
      alert('Input value required')
      return
    }

    addNew(content)

    evt.target.reset()
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="text" name="anecdote" aria-label="New anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
