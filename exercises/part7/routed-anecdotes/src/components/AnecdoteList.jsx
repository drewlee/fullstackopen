import { useAnecdotes } from '../hooks'

const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()

  const handleDelete = (anecdote) => {
    const shouldDelete = confirm(`Delete "${anecdote.content}"?`)

    if (shouldDelete) {
      deleteAnecdote(anecdote.id)
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}
            <button type="button" onClick={() => handleDelete(anecdote)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList
