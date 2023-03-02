import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Img1 from "../SrcImages/DroppedPin.png";
import Img2 from "../SrcImages/Utah.jpg";
import Img3 from "../SrcImages/MapSample.png";

export default function Home() {

    let navigate = useNavigate();

    function handleClick(){
        navigate("/app")

    }
    return (
        <div>
            <div className='Home--Hero'>
                <h1>Explore the World's Weather<br /> in Real Time</h1>
                <button onClick={handleClick}>ENTER APP</button>
            </div>
            <div className="Home--Main">
                <div className="Home--Body">
                    <div className="Home--Body--1">
                        <img className="Home--Img" src={Img1} alt="Dropped pin on a map"/>
                    </div>
                    <div className="Home--Body--2">
                        <p>Instant weather reports from every corner of the globe. 
                                Just one click away in the <Link to="/app">"App"</Link> tab</p>
                    </div>
                    <div className="Home--Body--3">
                        <p>Save your favorite locations for later and 
                            access them in the <Link to="/favorites">"Favorites"</Link> tab</p>
                    </div>
                    <div className="Home--Body--4">
                        <img className="Home--Img" src={Img2} alt="Desert towers of Utah"/>
                    </div>
                    <div className="Home--Body--5">
                        <img className="Home--Img" src={Img3} alt="Temperature map sample"/>
                    </div>
                    <div className="Home--Body--6">
                        <p>Explore interactive weather maps displaying
                            temperature, precipitation and more
                            in the <Link to="/maps">"Maps"</Link> tab</p>
                    </div>
                </div>
            </div>
        </div>
    )
}