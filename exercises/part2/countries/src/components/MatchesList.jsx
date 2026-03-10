import CountryMatch from './CountryMatch'

const MatchesList = ({ matches }) => {
  if (!matches.length) {
    return
  }

  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return matches.length > 1
    ? matches.map(record => <div key={record.cca3}>{record.name.common}</div>)
    : <CountryMatch record={matches[0]} />
}

export default MatchesList
