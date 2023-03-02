import React, { useState } from 'react';
import Map from "./AppPageComponents/Map"
import CurrentWeather from "./AppPageComponents/CurrentWeather";


function AppPage() {

  const [coordinates, setCoordinates] = useState({
    lat: 41.26,
    lng: -95.93
  });

  return (
    <div className="App">
      <Map setCoordinates={setCoordinates} />
      <div className="Weather">
          <CurrentWeather coordinates={coordinates}/>
      </div>
    </div>
  );
}


export default AppPage;