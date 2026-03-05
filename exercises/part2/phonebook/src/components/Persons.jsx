const Persons = ({ persons, onDelete }) => {
  const handleOnDelete = ({id, name}) => {
    if (window.confirm(`Delete ${name}?`)) {
      onDelete(id)
    }
  }

  return (
    <ul>
      {persons.map(person => {
        return (
          <li key={person.id}>
            {person.name}: {person.number}
            &nbsp;
            <button
              type="button"
              onClick={() => handleOnDelete(person)}
            >
              delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Persons
