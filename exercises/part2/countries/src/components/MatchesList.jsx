import CountryMatch from './CountryMatch'

const MatchesList = ({ matches, onShowCountry }) => {
  if (!matches.length) {
    return
  }

  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    matches.length > 1
      ? matches.map(record => {
        return (
          <div key={record.cca3}>
            {record.name.common}
            &nbsp;
            <button type="button" onClick={() => onShowCountry(record.name.common)}>
              Show
            </button>
          </div>
        )
      })
      : <CountryMatch record={matches[0]} />
  )
}

export default MatchesList
