import React, { useState, useEffect } from 'react';

export default function HomeFavoritesButton({ipCoords}) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }, []);

    function addToFavorites() {
      const newFavorite = `${ipCoords.lat},${ipCoords.lng}`;
      if (!favorites.includes(newFavorite) && favorites.length < 11) {
        const updatedFavorites = [...favorites, newFavorite];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }
    }

    const isFavorite = favorites.includes(`${ipCoords.lat},${ipCoords.lng}`);
    const buttonText = isFavorite ? "Saved" : "Add to Favorites";

    return (
        <div className='Home--Favorite--Container'>
          <button className={isFavorite ? "Home--Favorite--Button" : "Home--Favorite--Button--1"} 
          onClick={addToFavorites}>{buttonText}</button>
        </div>
    )
}