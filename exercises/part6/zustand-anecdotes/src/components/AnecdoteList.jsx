import { useAnecdotes, useAnecdoteActions, useNotificationActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { addVote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleClick = async ({ content, id }) => {
    await addVote(id)
    setNotification(`You voted "${content}"`)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
