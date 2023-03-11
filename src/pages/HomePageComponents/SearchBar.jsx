import React, { useState } from 'react';
const apikey = process.env.REACT_APP_API_KEY; 

export default function SearchBar({setIpCoords}){
    const [formData, setFormData] = useState(
        {city: "", state: "", country: ""}
    )

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleClick() {
        async function fetchGeoCoords() {
            if (formData) {
              const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${formData.city},${formData.state},${formData.country}&limit=1&appid=${apikey}`;
              try {
                const response = await fetch(URL);
                if (response.ok) {
                  const data = await response.json();
                  setIpCoords({
                    lat: (data[0].lat).toFixed(4),
                    lng: (data[0].lon).toFixed(4),
                  })
                } else {
                  throw new Error('API request failed');
                }
              } catch (error) {
                console.error(error);
    
              }
            }
          }
        fetchGeoCoords();
    }

    return (
        <div className='SearchBar'>
            <h2>Search Locations:</h2>
            <div className='SearchBar--Inputs'>
                <input
                    className='SearchBar--Input'
                    type="text"
                    placeholder="City"
                    onChange={handleChange}
                    name="city"
                    value={formData.city}
                />
                <input
                    className='SearchBar--Input'
                    type="text"
                    placeholder="State (US Only)"
                    onChange={handleChange}
                    name="state"
                    value={formData.state}
                />
                <input
                    className='SearchBar--Input'
                    type="email"
                    placeholder="Country"
                    onChange={handleChange}
                    name="country"
                    value={formData.country}
                />
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}