import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '39-44-5323523'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (newName) {
      const hasNewName = persons.some(person => person.name === newName)

      if (hasNewName) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const newEntry = {
          name: newName,
          number: newNumber
        }

        setPersons(persons.concat(newEntry))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(
          person => <li key={person.name}>{person.name}: {person.number}</li>
        )}
      </ul>
      <div>debug: {newName} {newNumber}</div>
    </div>
  )
}

export default App
