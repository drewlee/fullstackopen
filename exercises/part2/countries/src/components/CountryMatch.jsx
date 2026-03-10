const CountryMatch = ({ record }) => {
  return (
    <section>
      <h1>{record.name.common}</h1>
      <div>Capital: {record.capital}</div>
      <div>Area: {record.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.values(record.languages).map(value => <li key={value}>{value}</li>)}
      </ul>

      <img src={record.flags.svg} alt={record.flags.alt} height="200" />
    </section>
  )
}

export default CountryMatch
