import React, { useState } from "react"
import { NavLink } from "react-router-dom"

// degree symbol &deg;

export default function Header(){
    const [isMetric, setIsMetric] = useState(JSON.parse(localStorage.getItem("units")) || false);

    const handleUnitChange = (event) => {
        localStorage.setItem("units", JSON.stringify(!isMetric));
        setIsMetric(event.target.value);
        window.location.reload();
      };

    return (
        <header className="Header">
            <NavLink className="Header--Title" to="/">Geo-Weather</NavLink>
            <div className="Header--Container">
                <NavLink to="/app">App</NavLink>
                <p> / </p>
                <NavLink to="/favorites">Favorites</NavLink>
                <p> / </p>
                <NavLink to="/maps">Maps</NavLink>
            </div>
            <div className="Dropdown">
                <div className="Header--Units">
                    <select value={isMetric} onChange={handleUnitChange}>
                        <option value="false">&deg;F</option>
                        <option value="true">&deg;C</option>
                    </select>
                </div>
                <div className="Dropdown--Container">
                    <button className="Dropdown--Button">More</button>
                    <div className="Dropdown--Content">
                        <NavLink to="/about" >About</NavLink>
                        <NavLink to="/settings">Settings</NavLink>
                    </div> 
                </div>      
            </div>
    
        </header>
    )    
}
