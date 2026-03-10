import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import CountrySearch from './components/CountrySearch'
import MatchesList from './components/MatchesList'

const App = () => {
  const [data, setData] = useState(null)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
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

  const onShowCountry = country => {
    const fData = matches.filter(record => record.name.common === country)
    setMatches(fData)
  }

  return (
    <>
      <CountrySearch onCountrySearch={onCountrySearch} />
      <MatchesList matches={matches} onShowCountry={onShowCountry} />
    </>
  )
}

export default App
