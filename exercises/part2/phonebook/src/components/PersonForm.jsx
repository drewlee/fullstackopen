import { useState } from 'react'

const PersonForm = ({ persons, onFormSubmit }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFormSubmit = event => {
    event.preventDefault()

    const normNewName = newName.trim()
    const normNewNumber = newNumber.trim()

    if (!normNewName || !normNewNumber) {
      alert('Must include name and number')
      return
    }

    const hasNewName = persons.some(person => person.name === normNewName)
    if (hasNewName) {
      alert(`${normNewName} is already added to phonebook`)
      return
    }

    onFormSubmit(normNewName, normNewNumber)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input type="text" onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input type="text" onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
