import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Notification from './Notification'

const Note = ({ note, toggleImportanceOf, deleteNote }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  if (!note) {
    return null
  }

  const label = note.important
    ? 'make not important'
    : 'make important'

  const handleToggleClick = () => {
    toggleImportanceOf(id)
      .catch((error) => {
        setErrorMessage(error.message)
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  const handleDelete = () => {
    if (window.confirm(`Delete note "${note.content}"?`)) {
      deleteNote(id)
      navigate('/notes')
    }
  }

  return (
    <>
      <Notification message={errorMessage} />

      <div style={{ margin: '20px 0' }} className="note">
        <span>{note.content}</span>&nbsp;
        <button type="button" onClick={handleToggleClick}>{label}</button>
        <button type="button" onClick={handleDelete}>delete</button>
      </div>
    </>
  )
}

export default Note
