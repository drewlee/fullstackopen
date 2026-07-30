import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import loginService from '../services/login'
import noteService from '../services/notes'
import Notification from './Notification'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const NoteList = ({ notes }) => {
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  useEffect(() => {
    if (!user) {
      const storedUser = noteService.getUser()
      if (storedUser) {
        setUser(storedUser)
      }
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const { username, password } = credentials
      const user = await loginService.login({ username, password })

      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      setUser(user)
      setCredentials({ username: '', password: '' })
    } catch (error) {
      console.error(error)
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={credentials.username}
          password={credentials.password}
          handleUsernameChange={({ target }) => setCredentials({
            ...credentials,
            username: target.value,
          })}
          handlePasswordChange={({ target }) => setCredentials({
            ...credentials,
            password: target.value,
          })}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {
        user
          ? <p>{user.name} logged in</p>
          : loginForm()
      }

      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NoteList
