import { useState } from 'react'

const CountrySearch = ({ onCountrySearch }) => {
  const [searchVal, setSearchVal] = useState('')

  const handleOnChange = evt => {
    const value = evt.target.value;

    setSearchVal(value)
    onCountrySearch(value)
  }

  return (
    <div>
      <label htmlFor="country-search">Find countries</label>
      &nbsp;
      <input
        id="country-search"
        type="text"
        value={searchVal}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default CountrySearch
