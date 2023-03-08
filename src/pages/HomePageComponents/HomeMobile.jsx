import React from 'react';
import { Link } from 'react-router-dom';
import { Follow } from 'react-twitter-widgets'
import Img1 from "../../SrcImages/DroppedPin.png";
import Img2 from "../../SrcImages/Utah.jpg";
import Img3 from "../../SrcImages/MapSample.png";


export default function HomeMobile() {
    return (
        <div className="Home--Main">
                <div className="Home--Body">
                    <div className="Home--Body--1">
                        <img className="Home--Img" src={Img1} alt="Dropped pin on a map"/>
                    </div>
                    <div className="Home--Body--2">
                        <p>Get the latest weather information from anywhere in the world with our convenient 
                            and user-friendly <Link to="/app">App</Link>.</p>
                    </div>
                    <div className="Home--Body--3">
                        <p>Save time and hassle by storing your favorite locations in our intuitive and easy-to-use <Link to="/favorites">Favorites</Link> tab.</p> 
                    </div>
                    <div className="Home--Body--4">
                        <img className="Home--Img" src={Img2} alt="Desert towers of Utah"/>
                    </div>
                    <div className="Home--Body--5">
                        <img className="Home--Img" src={Img3} alt="Temperature map sample"/>
                    </div>
                    <div className="Home--Body--6">
                        <p>Take your weather forecasting to the next level with our interactive and dynamic weather <Link to="/maps">Maps</Link>.</p>
                    </div>
                </div>
                <div className='Home--Twitter--Container'>
                    <Follow className="Home--Twitter--Follow" username='GeoWeatherxyz' />
                </div>
            </div>
    )}