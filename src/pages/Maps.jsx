import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const apikey = process.env.REACT_APP_API_KEY;

export default function Maps() {

  const [selectedLayer, setSelectedLayer] = useState('temp_new');
  const url = `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${apikey}`;

  const handleLayerChange = (event) => {
    setSelectedLayer(event.target.value);
  };
  

  return (
    <div>
      <div className="Maps">
          <div className="Maps--Dropdown">
              <select value={selectedLayer} onChange={handleLayerChange}>
                  <option value="precipitation_new">Precipitation</option>
                  <option value="pressure_new">Pressure</option>
                  <option value="wind_new">Wind</option>
                  <option value="clouds_new">Clouds</option>
                  <option value="temp_new">Temperature</option>
              </select>
          </div>
          <MapContainer
              className="Maps--Container"
              center={[30, -50]}
              zoom={4}
              scrollWheelZoom={false}
              >
              <TileLayer
                  className="Map--tile"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TileLayer url={url}></TileLayer>
          </MapContainer>
      </div>
      <div className='Maps--HowTo'>
        <h1>How To Map</h1>
          <p>In the top right corner, you can select which map layer you would like to view.
            The options are "Precipitation", "Pressure", "Wind", "Clouds", and "Temperature." 
            Temperature is the default as the page loads.
          </p>
          <p>To move around the globe, drag the map in the opposite direction of where you would like to navigate to.
            Use the (+) and (-) buttons in the top left corner to zoom in and out.
          </p>
          <p>All map layers display the most up-to-date information available to us. 
            At the moment, we only support static maps, but that may change soon.
          </p>
        </div> 
    </div>
  );
} 

