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
            <div className="Header--About--Container">
                <NavLink className="Header--About" to="/about">?</NavLink>
            </div>
    
        </header>
    )    
}