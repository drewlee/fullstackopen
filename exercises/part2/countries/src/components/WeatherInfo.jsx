import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const WeatherInfo = ({ record }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const { latlng } = record.capitalInfo

    weatherService
      .getDataForLatLon(latlng[0], latlng[1])
      .then(data => setData(data))
  }, [record])

  if (!data) {
    return
  }

  const imgSrc = weatherService.getIconSrc(data.weather[0].icon)

  return (
    <>
      <h2>Weather in {record.capital[0]}</h2>
      <div>Temperature: {data.main.temp} Fahrenheit</div>
      <img src={imgSrc} alt={data.weather[0].description} width="100" height="100" />
      <div>Wind: {data.wind.speed} mi/hr</div>
    </>
  )
}

export default WeatherInfo
