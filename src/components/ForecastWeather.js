import React from 'react';


function ForecastWeather({ coordinates }) {
    const [derp, setDerp] = React.useState(false)
    const [pepe, setPepe] = React.useState(true)

    function handleClick(){
        setDerp(prevDerp => !prevDerp)
        setPepe(prevPepe => !prevPepe)
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
  
    return (
      <div className="ForecastWeather">
        <h1 className="ForecastWeather--Title">About</h1>
        <div className="ForecastWeather--Body">
          <ul>
            <li>Click on the map to generate geo-specific weather data for any location.<br /></li>
            <li>There is a six second cooldown between weather requests.</li>
          </ul>
          <div>
            {pepe ? <button className="ForecastWeather--Button" onClick={handleClick}>Generate Forecast</button> : ""}
            {derp ? <p className="ForecastWeather--Text">Wouldn't you like to know,  weather boy?</p>: ""}
          </div>
        </div>
      </div>  
    );
  }
  


export default ForecastWeather;

