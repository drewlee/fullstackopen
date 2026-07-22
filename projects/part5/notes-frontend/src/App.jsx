import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        const msg = error?.response?.data?.error
          ? error.response.data.error
          : 'Unable to save note'

        setErrorMessage(msg)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(
          notes.map(note => note.id === id ? returnedNote : note)
        )
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const { username, password } = credentials
      const user = await loginService.login({ username, password })

      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)

      setUser(user)
      setCredentials({ username: '', password: '' })
    } catch (error) {
      console.error(error);
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={credentials.username}
              onChange={({ target }) => setCredentials(
                { ...credentials, username: target.value }
              )}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={credentials.password}
              onChange={({ target }) => setCredentials(
                { ...credentials, password: target.value})
              }
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input type="text" value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  )

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {
        user
          ? (
            <div>
              <p>{user.name} logged in</p>
              {noteForm()}
            </div>
          )
          : loginForm()
      }

      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  )
}

export default App
