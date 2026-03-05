import { useState } from 'react'

const PersonForm = ({ persons, setNewPerson, updatePerson }) => {
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

    const matchingPerson = persons.find(person => person.name === normNewName)

    if (matchingPerson) {
      const msg = `${normNewName} is already added to phonebook, replace the old number with a new one?`

      if (confirm(msg)) {
        updatePerson({
          ...matchingPerson,
          number: normNewNumber
        })
      }

      return
    }

    setNewPerson(normNewName, normNewNumber)
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
