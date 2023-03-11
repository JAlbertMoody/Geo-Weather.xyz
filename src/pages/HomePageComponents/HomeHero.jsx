import React, { useState, useEffect } from 'react';
import { useGeolocated } from "react-geolocated";
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';
import { Layer, Stage, Line } from "react-konva";
import useMediaQuery from '@mui/material/useMediaQuery';

import SearchBar from './SearchBar';
import HomeFavoritesButton from './HomeFavoritesButton';
const apikey = process.env.REACT_APP_API_KEY; 

export default function HomeHero() {
  const {coords} = useGeolocated();
  const [ipCoords, setIpCoords] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const units = useState(JSON.parse(localStorage.getItem("units")) || false);

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      setIpCoords({
        lat: parseFloat(latitude.toFixed(4)),
        lng: parseFloat(longitude.toFixed(4)),
      });
    }
  }, [coords]);


  useEffect(() => {
    async function fetchWeatherData() {
        if (ipCoords) {
          const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${ipCoords.lat}&lon=${ipCoords.lng}&exclude=hourly,daily&appid=${apikey}`;
          try {
            const response = await fetch(URL);
            if (response.ok) {
              const data = await response.json();
              setWeatherData(data);
              console.log("called")
            } else {
              throw new Error('API request failed');
            }
          } catch (error) {
            console.error(error);

          }
        }
      }
    fetchWeatherData();
  }, [ipCoords] );


  function DisplayWeatherData() {
    const isMobile = useMediaQuery('(max-width: 767px)');

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

      if (weatherData.name && weatherData.name.length) {
        cityName = weatherData.name.length > maxLength ? weatherData.name.substring(0, maxLength) + "..." : weatherData.name;
        cityName = `${cityName}`;
      } else {
        cityName = `${ipCoords.lat}, ${ipCoords.lng}`;
      }

      let country = weatherData.sys.country

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

      const metric = units[0]



      let sunriseinit = weatherData.sys.sunrise  
      let sunsetinit = weatherData.sys.sunset

      const timeZoneId = tzlookup(ipCoords.lat, ipCoords.lng);
      const now = moment().tz(timeZoneId);
      const utcOffset = now.utcOffset();
      const localTime = now.format('h:mm A');
      const localTime2 = now.format('hh:mm:ss A')

      let sunrise = moment.utc(sunriseinit * 1000).add(utcOffset, "minutes").format("hh:mm:ss A");
      let sunset = moment.utc(sunsetinit * 1000).add(utcOffset, "minutes").format("hh:mm:ss A");
      let sunriseAbr = moment.utc(sunriseinit * 1000).add(utcOffset, "minutes").format("h:mm A");
      let sunsetAbr = moment.utc(sunsetinit * 1000).add(utcOffset, "minutes").format("h:mm A");

      function convertTimeToDecimal(timeString) {
        const date = new Date("1970-01-01T" + timeString.slice(0, -3));
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        if (timeString.slice(-2).toLowerCase() === "pm") {
          hours += 12;
        } else if (timeString.slice(-2).toLowerCase() === "am" && hours === 12) {
          hours = 0;
        }
        const decimalHours = hours + minutes / 60 + seconds / 3600;
        return decimalHours.toFixed(2);
      }

      const sunriseConverted = convertTimeToDecimal(sunrise);
      const sunsetConverted = convertTimeToDecimal(sunset);
      const localTimeConverted = convertTimeToDecimal(localTime2);

      const chartWidth = 24;
      const chartHeight = 2;

      const date1 = new Date(sunriseinit * 1000);
      const date2 = new Date(sunsetinit * 1000);

      const diffMilliseconds = date2 - date1;
      const diffMinutes = Math.floor(diffMilliseconds / 60000);
      const daylightHours = Math.floor(diffMinutes / 60);
      const daylightMinutes = diffMinutes % 60;

      const daylightTimeString = `Daylight: ${daylightHours} hours ${daylightMinutes} minutes`;

      return (
        <div>
          <div className="Home--Hero">
            <SearchBar setIpCoords={setIpCoords}/>
            <div className="Home--Hero--Weather">
              <div className="Home--Hero--1">
                <div className='Home--Hero--1Head'>
                  <h1 className='Home--Hero--1Head1'>Current Weather for:</h1>
                  <h1 className='Home--Hero--1Head2'>{cityName}, {country}</h1>
                </div>
              </div>

              <div className="Home--Hero--2">
                <div className="Home--Weather--2">
                  <p className='Home--Weather--2--Header'>{(metric ? Mtemperature : temperature)}&deg;</p>
                  <p className='Home--Weather--2--Body'>Feels Like: {(metric ? MfeelsLike : feelsLike)}&deg;</p>
                </div>

                <div className="Home--Weather--3">
                  <div className='Home--Weather--3--Icon--Container'>
                    <img src={IconSrc} alt="Weather Icon"/>
                  </div>
                  <p className="Home--Weather--3--Description">{description}</p>
                </div>

                <div className="Home--Weather--4">
                    <p>Humidity: {humidity}%</p>
                    <p>Pressure: {(metric ? Mpressure : pressure)}</p>
                    <p>Cloud Cover: {cloudCover}%</p>
                </div>

                <div className="Home--Weather--5">
                  <div className='Home--Weather--5--Container'>
                    <p>Wind</p>
                    <h3>{windDir} {(metric ? MwindSpeed : windSpeed)}</h3>
                    <p>Gusts: {(metric ? MwindGusts : windGustRender)}</p>
                  </div>
                </div>
              </div>

              <div className='Home--Hero--3'>
                <div className="Home--Time--Local">
                    <h2 className="Home--Time--Local--Header">Local Time</h2>
                    <p className="Home--Time--Local--Time">{localTime}</p>
                </div>
                <div className="Home--Time--SunInfo">
                  <div className='Home--Sunrise--Sunset'>
                      <p>Sunrise: {sunriseAbr}</p>
                      <p>Sunset: {sunsetAbr}</p>
                  </div>
                  <div className="Home--Sunris--Sunset--Graphic">
                      <Stage width={isMobile ? 300 : 400} height={40}>
                          <Layer scaleX={(isMobile ? 300 : 400) / chartWidth} scaleY={50 / chartHeight}>
                              <Line
                              points={[0, 0.5, 24, 0.5]}
                              stroke="rgb(17, 18, 24)"
                              strokeWidth={0.15}
                              
                              />
                              <Line
                              points={[parseFloat(sunriseConverted), -1, parseFloat(sunriseConverted), 1]}
                              stroke="#019BD8"
                              strokeWidth={0.4}
                              
                              />
                              <Line
                              points={[parseFloat(sunsetConverted), -1, parseFloat(sunsetConverted), 1]}
                              stroke="#1AC5E0"
                              strokeWidth={0.4}
                              
                              />
                              <Line
                              points={[parseFloat(localTimeConverted), -1, parseFloat(localTimeConverted), 1]}
                              stroke="black"
                              strokeWidth={0.25}
                              
                              />
                          </Layer>
                      </Stage>
                  </div>
                  <div className='Home--Sunrise--Sunset--Extra'>
                      <p>{daylightTimeString}</p>
                  </div>
                </div>
              </div>

            </div>
            <HomeFavoritesButton ipCoords={ipCoords}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='Home--Hero'>
          <SearchBar setIpCoords={setIpCoords}/>
            <div className='Home--Hero--Weather'>
              <div className='Home--Hero--Alternate'>
                <h1>Explore the World's Weather<br /> in Real Time</h1>
                <p>Allow location to view your local weather here,</p>
                <p>or use the search bar above.</p>
              </div>
            </div>
          </div>
        </div>
      )
      
    }
  }

  return (
    <>
      <DisplayWeatherData />
    </>
  );
}
