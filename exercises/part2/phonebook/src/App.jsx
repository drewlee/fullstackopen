import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const setNewPerson = (name, number) => {
    const newEntry = {
      name,
      number,
      id: persons.length + 1,
    }

    setPersons(persons.concat(newEntry))
  }

  const setNewFilter = value => setFilter(value)

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

      <Filter filter={filter} onFilterChange={setNewFilter} />

      <h3>Add a new</h3>

      <PersonForm persons={persons} onFormSubmit={setNewPerson} />

      <h3>Numbers</h3>

      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
