import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

function Map({setCoordinates}) {
    const [position, setPosition] = useState([41.26, -95.93])

    function AddMarkerToClick({ onClick }) {
        useMapEvents({
          click(event) {
            onClick(event);
          },
        });
    
        return null;
      }

      function handleClick(event) {
        setPosition([event.latlng.lat, event.latlng.lng]);
        const newCoordinates = {
            lat: (event.latlng.lat).toFixed(2),
            lng: (event.latlng.lng).toFixed(2)
          };
        setCoordinates(newCoordinates);
      }

  return (
    <div className="Map">
      <MapContainer
        center={[40, -96]}
        zoom={4}
        scrollWheelZoom={true}
        className="Map--container"
      >
        <TileLayer className='Map--tile'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarkerToClick onClick={handleClick} />
        {position && (
        <Marker position={position}>
          <Popup>You clicked here</Popup>
        </Marker>
      )}
      </MapContainer>
    </div>
  );
}

export default Map;