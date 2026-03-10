import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const BASE_IMG_URL = 'https://openweathermap.org/payload/api/media/file'

const getDataForLatLon = async (lat, lng) => {
  if (!API_KEY) {
    console.warn('Open Weather API key not set')
    return null
  }

  const response = await axios.get(
    `${BASE_URL}?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`
  )
  return response.data
}

const getIconSrc = iconName => {
  return `${BASE_IMG_URL}/${iconName}.png`
}

export default {
  getDataForLatLon,
  getIconSrc
}
