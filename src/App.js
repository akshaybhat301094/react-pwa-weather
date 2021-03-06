import React, { useState, useEffect } from 'react';
import { fetchWeather, fetchWeatherByLatLong } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // use users location if they accept geolocation
        const data = await fetchWeatherByLatLong(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeather(data);
        console.log(data);
      },
      async (error) => {
        // called in case user does not accept geolocation
        const data = await fetchWeatherByLatLong(28.7041, 77.1025);
        setWeather(data);
      }
    );
  }, []);

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className='main-container'>
      <input
        type='text'
        className='search'
        placeholder='Enter city name ....'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className='info'>
            <img
              className='city-icon'
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
