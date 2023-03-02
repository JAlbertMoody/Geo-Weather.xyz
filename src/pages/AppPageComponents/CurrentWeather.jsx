import React, { useState, useEffect } from 'react';

function CurrentWeather({ coordinates }) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
        if (coordinates) {
          const API_KEY = '203184ed50248b437c48b6b85828ae84';
          const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly,daily&appid=${API_KEY}`;
          try {
            const response = await fetch(URL);
            if (response.ok) {
              const data = await response.json();
              setWeatherData(data);
            } else {
              throw new Error('API request failed');
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    fetchWeatherData();
  }, [coordinates]);

  useEffect(() => {
    async function fetchCityName() {
      if (coordinates) {
        const API_KEY = '203184ed50248b437c48b6b85828ae84';
        const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&limit=1&appid=${API_KEY}`;
        try {
          const response = await fetch(URL);
          if (response.ok) {
            const data = await response.json();
            setCity(data);
          } else {
            throw new Error('API request failed');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchCityName()
  }, [coordinates])

  function DisplayWeatherData() {
    if (weatherData) {
      const temperature = ((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(1);
      const feelsLike = ((weatherData.main.feels_like - 273.15) * 1.8 + 32).toFixed(1);
      const description = (weatherData.weather[0].description).toUpperCase();
      const cloudCover = weatherData.clouds.all;
      const humidity = weatherData.main.humidity;
      const pressure = (weatherData.main.pressure * 0.0295299830714).toFixed(2);
      const windSpeed = (weatherData.wind.speed * 2.23694).toFixed(0);
      const windD = weatherData.wind.deg;
      const windGust = weatherData.wind.gust;
      const windGustConverted = (weatherData.wind.gust * 2.23694).toFixed(0);
      
      const cityName = (city ? `in ${city[0].name}` : `at ${coordinates.lat}, ${coordinates.lng}`)
      let windDir = ""
      if (windD < 22){
        windDir = "S"
      } else if (22 < windD < 68){
        windDir = "SW"
      } else if (68 < windD < 112){
        windDir = "W"
      } else if (112 < windD < 158){
        windDir = "NW"
      } else if (158 < windD < 202){
        windDir = "N"
      } else if (202 < windD < 248){
        windDir = "NE"
      } else if (248 < windD < 292){
        windDir = "E"
      } else if (292 < windD < 338){
        windDir = "SE"
      } else {
        windDir = "S"
      }


      return (
        <div>
            <h1 className="CurrentWeather--Header">Current Weather {cityName}</h1>
            <div className="CurrentWeather--Body">
              <div className="CurrentWeather--SubHeader">
                  <h1>{temperature} &deg;F</h1>
                  <h3>Feels Like: {feelsLike} &deg;F</h3>
                  <h2>{description}</h2>
              </div>
              <div>
                <div className="CurrentWeather--Extra">
                  <div className="CurrentWeather--Extra1">
                      <p>Cloud Cover: {cloudCover} %</p>
                      <p>Humidity: {humidity} %</p>
                      <p>Pressure: {pressure} inHg</p>
                  </div>
                  <div className="CurrentWeather--Wind">
                      <p>Wind:</p>
                      <p className='CurrentWeather--Wind1'>{windDir} {windSpeed} mph</p>
                      <p>{windGust ? `Gusts: ${windGustConverted} mph` : "Gusts: none"}</p>
                  </div>
                </div>
              </div>
            </div>
            
        </div>
      );
    } else {
      return <h1>Click Map To Get Weather Data</h1>;
    }
  }

  return (
    <div className="CurrentWeather">
      <DisplayWeatherData />
    </div>
  );
}

export default CurrentWeather;
