import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function Maps() {

  

  const API_KEY = '203184ed50248b437c48b6b85828ae84';
  const [selectedLayer, setSelectedLayer] = useState('temp_new');
  const url = `https://tile.openweathermap.org/map/${selectedLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`;

  const handleLayerChange = (event) => {
    setSelectedLayer(event.target.value);
  };

  return (
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
            scrollWheelZoom={true}
            >
            <TileLayer
                className="Map--tile"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer url={url}></TileLayer>
        </MapContainer>
    </div>
  );
} 

