import { useEffect, useState } from 'react'
import axios from 'axios'
import CountrySearch from './components/CountrySearch'
import MatchesList from './components/MatchesList'

const App = () => {
  const [data, setData] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.data)
      .then(data => setData(data))
  }, [])

  const onCountrySearch = searchVal => {
    const nSearchVal = searchVal.trim().toLowerCase()

    if (nSearchVal === '' || data === null) {
      setMatches([])
      return
    }

    const fData = data.filter(record =>
      record.name.common.toLowerCase().includes(nSearchVal)
    )
    setMatches(fData)
  }

  return (
    <>
      <CountrySearch onCountrySearch={onCountrySearch} />
      <MatchesList matches={matches} />
    </>
  )
}

export default App
