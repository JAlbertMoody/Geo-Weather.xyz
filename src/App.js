import React, { useState } from 'react';
import Header from "./components/Header"
import Map from "./components/Map"
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from './components/ForecastWeather';
import Footer from "./components/Footer"

function App() {

  const [coordinates, setCoordinates] = useState({
    lat: 41.26,
    lng: -95.93
  });

  return (
    <div className="App">
      <Header />
      <Map setCoordinates={setCoordinates} />
      <div className="Weather">
          <CurrentWeather coordinates={coordinates}/>
          <ForecastWeather coordinates={coordinates}/>
      </div>
      <Footer />
    </div>
  );
}


export default App;
