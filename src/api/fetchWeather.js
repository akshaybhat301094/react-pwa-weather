import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '2826e9547141b6011504fe61a1075efe';

export const fetchWeather = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY,
    },
  });

  return data;
};

export const fetchWeatherByLatLong = async (lat, long) => {
  const { data } = await axios.get(URL, {
    params: {
      lat: lat,
      lon: long,
      units: 'metric',
      APPID: API_KEY,
    },
  });

  return data;
};
