import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { addVote, addNew } = useAnecdoteActions()

  const handleFormSubmit = (evt) => {
    evt.preventDefault()

    const content = evt.target.anecdote.value
    addNew(content)

    evt.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>

      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="text" name="anecdote" aria-label="New anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
