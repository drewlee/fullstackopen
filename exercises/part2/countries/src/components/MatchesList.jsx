import CountryMatch from './CountryMatch'
import WeatherInfo from './WeatherInfo'

const MatchesList = ({ matches, onShowCountry }) => {
  let output = null

  if (matches.length > 10) {
    output = <div>Too many matches, specify another filter</div>
  } else if (matches.length > 1) {
    output = matches.map(record => {
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
  } else if (matches.length > 0) {
    output = (
      <>
        <CountryMatch record={matches[0]} />
        <WeatherInfo record={matches[0]} />
      </>
    )
  }

  return output
}

export default MatchesList
