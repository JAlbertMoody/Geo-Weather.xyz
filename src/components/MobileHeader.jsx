import React from 'react';
import { NavLink } from "react-router-dom"

export default function MobileHeader(){



    return (
        <header className="Header">
            <NavLink className="Header--Title" to="/">Geo-Weather</NavLink>
            <div className="Dropdown">
                <button className="Dropdown--Button">Menu</button>
                <div className="Dropdown--Content">
                    <NavLink to="/app" >App</NavLink>
                    <NavLink to="/favorites" >Favorites</NavLink>
                    <NavLink to="/maps" >Maps</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>       
            </div>
    
        </header>
    )
}