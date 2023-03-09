import React, { useState, useEffect } from 'react';
import Map from "./Map"
import CurrentWeather from "./CurrentWeather";
import TimeInfo from "./TimeInfo"


function AppPage() {

  const [coordinates, setCoordinates] = useState(JSON.parse(localStorage.getItem("coords")) || {lat: 41.26, lng: -95.93});

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

    const isFavorite = favorites.includes(`${coordinates.lat},${coordinates.lng}`);
    const buttonText = isFavorite ? "Saved" : "Add to Favorites";

  return (
    <div className="App">
      <Map setCoordinates={setCoordinates} />
      <>
          <CurrentWeather coordinates={coordinates} />
      </>
      <TimeInfo coordinates={coordinates} />
      <div className='Weather--Button--Container'>
          <button className={isFavorite ? "Weather--Button" : "Weather--Button--1"} 
          onClick={addToFavorites}>{buttonText}</button>
      </div>
    </div>
  );
}

export default AppPage;

// <TimeInfo coordinates={coordinates} />