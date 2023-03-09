import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const apikey = process.env.REACT_APP_API_KEY; 


function CurrentWeather({ coordinates }) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const units = useState(JSON.parse(localStorage.getItem("units")) || false);

  useEffect(() => {
    async function fetchWeatherData() {
        if (coordinates) {
          const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=hourly,daily&appid=${apikey}`;
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
  

  }, [coordinates] );

  useEffect(() => {
    async function fetchCityName() {
      if (coordinates) {
        const URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&limit=1&appid=${apikey}`;
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

    let navigate = useNavigate();

    function handleClick() {
        navigate("/settings")
    }



    if (weatherData) {
      const temperature = ((weatherData.main.temp - 273.15) * 1.8 + 32).toFixed(1);
      const feelsLike = ((weatherData.main.feels_like - 273.15) * 1.8 + 32).toFixed(1);
      const description = (weatherData.weather[0].description).toUpperCase();
      const cloudCover = weatherData.clouds.all;
      const humidity = weatherData.main.humidity;
      const pressure = (weatherData.main.pressure * 0.0295299830714).toFixed(2) + " inHg";
      const windSpeed = (weatherData.wind.speed * 2.23694).toFixed(0) + " mph";
      const windD = weatherData.wind.deg;
      const windGust = weatherData.wind.gust;
      const windGustConverted = (weatherData.wind.gust * 2.23694).toFixed(0) + " mph";
      
      const windGustRender = (windGust ? windGustConverted : "0 mph")
      // const cityName = (city && city.length ? `in ${city[0].name}` : `at ${coordinates.lat}, ${coordinates.lng}`)

      const maxLength = 21; 
      let cityName;

      if (city && city.length) {
        cityName = city[0].name.length > maxLength ? city[0].name.substring(0, maxLength) + "..." : city[0].name;
        cityName = `in ${cityName}`;
      } else {
        cityName = `at ${coordinates.lat}, ${coordinates.lng}`;
      }

      const icon = weatherData.weather[0].icon
      const IconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png` 

      const Mtemperature = (weatherData.main.temp - 273.15).toFixed(1);
      const MfeelsLike = (weatherData.main.feels_like - 273.15).toFixed(1);
      const Mpressure = weatherData.main.pressure.toFixed(0) + " hPa";
      const MwindSpeed = (weatherData.wind.speed).toFixed(0) + " m/s";
      const MwindGusts = (windGust ? windGust.toFixed(0) + " m/s" : "0 m/s");
  


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

      const metric = units[0]


      return (
        <div>
          <div className="Weather">
            <div className="Weather--Container">
              <div className="Weather--1">
                <h1>Current Weather {cityName}</h1>
              </div>
              <div className="Weather--2">
                <p className='Weather--2--Header'>{(metric ? Mtemperature : temperature)}&deg;</p>
                <p className='Weather--2--Body'>Feels Like: {(metric ? MfeelsLike : feelsLike)}&deg;</p>
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
                  <p>Pressure: {(metric ? Mpressure : pressure)}</p>
                  <p>Cloud Cover: {cloudCover}%</p>
                </div>
              </div>
              <div className="Weather--5">
                <div className='Weather--5--Container'>
                  <p>Wind</p>
                  <h3>{windDir} {(metric ? MwindSpeed : windSpeed)}</h3>
                  <p>Gusts: {(metric ? MwindGusts : windGustRender)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='Weather--Button--Container'>
              <button className={isFavorite ? "Weather--Button" : "Weather--Button--1"} 
              onClick={addToFavorites}>{buttonText}</button>
              <button className='Weather--Unit--Button'
              onClick={handleClick}>Change Units</button>
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
