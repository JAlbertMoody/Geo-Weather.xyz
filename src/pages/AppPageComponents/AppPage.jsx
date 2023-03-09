import React, { useState } from 'react';
import Map from "./Map"
import CurrentWeather from "./CurrentWeather";
import TimeInfo from "./TimeInfo"


function AppPage() {

  const [coordinates, setCoordinates] = useState(JSON.parse(localStorage.getItem("coords")) || {lat: 41.26, lng: -95.93});

  return (
    <div className="App">
      <Map setCoordinates={setCoordinates} />
      <>
          <CurrentWeather coordinates={coordinates} />
      </>
      <TimeInfo coordinates={coordinates} />
    </div>
  );
}

export default AppPage;

// <TimeInfo coordinates={coordinates} />