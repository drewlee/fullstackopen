const Filter = ({ filter, onFilterChange }) => {
  const handleFilterChange = event => {
    onFilterChange(event.target.value)
  }

  return (
    <div>
      filter shown with:
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
