import React, { useState, useEffect } from 'react';

function checkAPILimit() {

  let apiUsage = JSON.parse(localStorage.getItem('apiUsage')) || { count: 0, timestamp: 0 };
  
  let now = Date.now();
  let hourInMillis = 60 * 60 * 1000;
  if (now - apiUsage.timestamp > hourInMillis) {
    apiUsage.count = 0;
    apiUsage.timestamp = now;
  }
  
  if (apiUsage.count >= 250) {
    alert('Sorry, you have exceeded the API limit for this hour. Please try again later.');
    return false;
  }
  
  apiUsage.count++;
  localStorage.setItem('apiUsage', JSON.stringify(apiUsage));
  
  return true;
}

checkAPILimit()

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
    checkAPILimit();
  

  }, [coordinates] );

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
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }, []);

    function addToFavorites() {
      const newFavorite = `${coordinates.lat},${coordinates.lng}`;
      if (!favorites.includes(newFavorite) && favorites.length < 11) {
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    }


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
      
      const windGustRender = (windGust ? windGustConverted : "0")
      const cityName = (city && city.length ? `in ${city[0].name}` : `at ${coordinates.lat}, ${coordinates.lng}`)

      const icon = weatherData.weather[0].icon
      const IconSrc = `http://openweathermap.org/img/wn/${icon}@2x.png` 


      let windDir = ""
      if (windD < 22){
        windDir = "N"
      } else if (22 < windD < 68){
        windDir = "NE"
      } else if (68 < windD < 112){
        windDir = "E"
      } else if (112 < windD < 158){
        windDir = "SE"
      } else if (158 < windD < 202){
        windDir = "S"
      } else if (202 < windD < 248){
        windDir = "SW"
      } else if (248 < windD < 292){
        windDir = "W"
      } else if (292 < windD < 338){
        windDir = "NW"
      } else {
        windDir = "N"
      }

      const isFavorite = favorites.includes(`${coordinates.lat},${coordinates.lng}`);
      const buttonText = isFavorite ? "Saved" : "Add to Favorites";


      return (
        <div>
          <div className="Weather">
            <div className="Weather--Container">
              <div className="Weather--1">
                <h1>Current Weather {cityName}</h1>
              </div>
              <div className="Weather--2">
                <p className='Weather--2--Header'>{temperature}&deg;</p>
                <p className='Weather--2--Body'>Feels Like: {feelsLike}&deg;</p>
              </div>
              <div className="Weather--3">
                <div className='Weather--3--Icon--Container'>
                  <img src={IconSrc} alt="Weather Icon"/>
                </div>
                <p className="Weather--3--Description">{description}</p>
              </div>
              <div className="Weather--4">
                <div className='Weather--4--Container'>
                  <p>Humidity: {humidity}%</p>
                  <p>Pressure: {pressure} inHg</p>
                  <p>Cloud Cover: {cloudCover}%</p>
                </div>
              </div>
              <div className="Weather--5">
                <div className='Weather--5--Container'>
                  <p>Wind</p>
                  <h3>{windDir} {windSpeed} mph</h3>
                  <p>Gusts: {windGustRender} mph</p>
                </div>
              </div>
            </div>
          </div>
          <div className='Weather--Button--Container'>
              <button className={isFavorite ? "Weather--Button" : "Weather--Button--1"} 
              onClick={addToFavorites}>{buttonText}</button>
          </div>
        </div>
      );
    } else {
      return <h1 className='Current--Leftover'>Click Map To Get Weather Data</h1>;
      
    }
  }

  return (
    <>
      <DisplayWeatherData />
    </>
  );
}

export default CurrentWeather;
