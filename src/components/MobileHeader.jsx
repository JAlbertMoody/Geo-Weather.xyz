import React, { useState } from 'react';
import { NavLink } from "react-router-dom"

export default function MobileHeader(){
    const [isMetric, setIsMetric] = useState(JSON.parse(localStorage.getItem("units")) || false);

    const handleUnitChange = (event) => {
        localStorage.setItem("units", JSON.stringify(!isMetric));
        setIsMetric(event.target.value);
        window.location.reload();
      };


    return (
        <header className="Header">
            <NavLink className="Header--Title" to="/">Geo-Weather</NavLink>
            <div className="Dropdown">
                <div className="Header--Units">
                    <select value={isMetric} onChange={handleUnitChange}>
                        <option value="false">&deg;F</option>
                        <option value="true">&deg;C</option>
                    </select>
                </div>
                <div className="Dropdown--Container">
                    <button className="Dropdown--Button">Menu</button>
                    <div className="Dropdown--Content">
                        <NavLink to="/app" >App</NavLink>
                        <NavLink to="/favorites" >Favorites</NavLink>
                        <NavLink to="/maps" >Maps</NavLink>
                        <NavLink to="/about" >About</NavLink>
                        <NavLink to="/settings">Settings</NavLink>
                    </div> 
                </div>      
            </div>
    
        </header>
    )
}