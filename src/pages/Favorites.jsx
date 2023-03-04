import { useState, useEffect } from "react";

const apikey = process.env.REACT_APP_API_KEY; 

function Favorites() {
    
    const [weatherData, setWeatherData] = useState([]);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

    useEffect(() => {
        async function fetchData() {
        try {
            const weatherDataArr = [];

            for (let i = 0; i < favorites.length; i++) {
            const [lat, lng] = favorites[i].split(",");
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&exclude=hourly,daily&appid=${apikey}`;
            const response = await fetch(URL);
            const data = await response.json();
            weatherDataArr.push(data);
            }

            setWeatherData(weatherDataArr);
        } catch (error) {
            console.error(error);
        }
        }

        fetchData();
    }, [favorites]);

    const removeFavorite = (index) => {
        const updatedFavorites = [...favorites];
        updatedFavorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    if (!favorites.length) {
        return (
                <div className="No--Favorites">
                    <h1>No Favorites</h1>
                    <p>Click to "Add to Favorites" button in the "App" component to get started</p>
                </div>
            )
    }



  return (
    <div>
      {weatherData.map((data, index) => (
        <div key={data.name}>
            <div className="Favorite">
                <div className="Favorite--Container">
                    <div className="Favorite--1">
                        <h1>{(data.name ? data.name : `( ${data.coord.lat} , ${data.coord.lon} )`)}</h1>
                        <button onClick={() => removeFavorite(index)}>Remove</button>
                    </div>
                    <div className="Favorite--2">
                        <p className="Favorite--2--Header">{((data.main.temp - 273.15) * 1.8 + 32).toFixed(1)}&deg;</p>
                        <p className="Favorite--2--Body">Feels Like: {((data.main.feels_like - 273.15) * 1.8 + 32).toFixed(1)}&deg;</p>
                    </div>
                    <div className="Favorite--3">
                        <div className="Favorite--3--Icon--Container">
                            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                            alt="Weather Icon"
                            className="Favorite--3--Icon"/>
                        </div>
                        <p className="Favorite--3--Description">{(data.weather[0].description).toUpperCase()}</p>
                    </div>
                    <div className="Favorite--4">
                        <p>Humidity: {data.main.humidity}%</p>
                        <p>Pressure: {(data.main.pressure * 0.0295299830714).toFixed(2)} inHg</p>
                        <p>Cloud Cover: {data.clouds.all}%</p>
                    </div>
                    <div className="Favorite--5">
                        <div className="Favorite--5--Container">
                            <p>Wind</p>
                            <h3>{data.wind.deg < 22 ? "N " :
                                (22 < data.wind.deg && data.wind.deg < 68 ? "NE " :
                                (68 < data.wind.deg && data.wind.deg < 112 ? "E " :
                                (112 < data.wind.deg && data.wind.deg < 158 ? "SE " :
                                (158 < data.wind.deg && data.wind.deg < 202 ? "S " :
                                (202 < data.wind.deg && data.wind.deg < 248 ? "SW " :
                                (248 < data.wind.deg && data.wind.deg < 292 ? "W " :
                                (292 < data.wind.deg && data.wind.deg < 338 ? "NW " : "N")))))))} 
                                {(data.wind.speed * 2.23694).toFixed(0)} mph</h3>
                            <p>Gusts: {(data.wind.gust ? data.wind.gust : "0")} mph</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
