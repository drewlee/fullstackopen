import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const setNewPerson = (name, number) => {
    personsService
      .create({
        name,
        number
      })
      .then(
        newPersons => setPersons(persons.concat(newPersons))
      )
  }

  const updatePerson = (person) => {
    personsService
      .update(person)
      .then(newPerson => {
        setPersons(
          persons.map(person => person.id === newPerson.id ? newPerson : person)
        )
      })
  }

  const setNewFilter = value => setFilter(value)

  const getFilteredNames = () => {
    const normFilter = filter.trim().toLowerCase()

    return persons.filter(person => {
      return person.name.toLocaleLowerCase().includes(normFilter)
    })
  }

  const deletePerson = id => {
    personsService
      .deleteEntry(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
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

      <PersonForm
        persons={persons}
        setNewPerson={setNewPerson}
        updatePerson={updatePerson}
      />

      <h3>Numbers</h3>

      <Persons persons={shownPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
