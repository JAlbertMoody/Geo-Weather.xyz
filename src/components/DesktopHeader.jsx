import React from "react"
import { NavLink } from "react-router-dom"

export default function Header(){
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
                <button className="Dropdown--Button">More</button>
                <div className="Dropdown--Content">
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </div>       
            </div>
    
        </header>
    )    
}