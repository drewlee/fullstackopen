import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router'
import noteService from './services/notes'
import Home from './components/Home'
import Footer from './components/Footer'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
  }, [])

  const addNote = (noteObject) => {
    return noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
      .catch(error => {
        const msg = error?.response?.data?.error
          ? error.response.data.error
          : 'Unable to save note'

        throw new Error(msg)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    return noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(
          notes.map(note => note.id === id ? returnedNote : note)
        )
      })
      .catch(() => {
        setNotes(notes.filter(n => n.id !== id))
        throw new Error(`Note '${note.content}' was already removed from server`)
      })
  }

  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null
  const padding = {
    padding: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/notes/:id" element={
          <Note
            note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote}/>
        } />
      </Routes>

      <Footer />
    </>
  )
}

export default App
