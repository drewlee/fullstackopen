import { useNoteActions } from './store'

const NoteForm = () => {
  const { add } = useNoteActions()

  const addNote = async (e) => {
    e.preventDefault()

    const content = e.target.note.value
    add(content)
    e.target.reset()
  }

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" placeholder="Add a new note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NoteForm
