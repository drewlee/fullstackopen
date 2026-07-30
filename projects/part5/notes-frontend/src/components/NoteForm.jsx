import { useState } from 'react'
import { useNavigate } from 'react-router'
import Notification from './Notification'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })
      .then(() => {
        setNewNote('')
        navigate('/notes')
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <Notification message={errorMessage} />

      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          placeholder="a new note..."
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
