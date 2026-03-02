import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5323523', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    const newEntry = {
      name: normNewName,
      number: normNewNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(newEntry))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const getFilteredNames = () => {
    const normFilter = filter.trim().toLowerCase()
    return persons.filter(person => {
      return person.name.toLocaleLowerCase().includes(normFilter)
    })
  }

  const shownPersons = filter
    ? getFilteredNames()
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input type="text" onChange={handleFilterChange} value={filter} />
      </div>
      <form onSubmit={handleFormSubmit}>
        <h2>Add a new</h2>
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
        {shownPersons.map(
          person => <li key={person.id}>{person.name}: {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App
