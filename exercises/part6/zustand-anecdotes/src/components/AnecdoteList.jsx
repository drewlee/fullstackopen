import { container, actions } from './AnecdoteList.module.css'
import { useAnecdotes, useAnecdoteActions, useNotificationActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { addVote, remove } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVoteClick = async ({ content, id }) => {
    await addVote(id)
    setNotification(`You voted "${content}"`)
  }

  const handleRemoveClick = async ({ content, id }) => {
    await remove(id)
    setNotification(`Removed "${content}"`)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <article key={anecdote.id} className={container}>
          <div>{anecdote.content}</div>
          <div className={actions}>
            has {anecdote.votes}
            <button type="button" onClick={() => handleVoteClick(anecdote)}>
              vote
            </button>
            {anecdote.votes === 0 && (
              <button type="button" onClick={() => handleRemoveClick(anecdote)}>
                remove
              </button>
            )}
          </div>
        </article>
      ))}
    </>
  )
}

export default AnecdoteList
