import React from 'react';
import Img1 from "../SrcImages/openweather.png";
import Img2 from "../SrcImages/openstreetmap.png";
import Img3 from "../SrcImages/twitter.png";
import Img4 from "../SrcImages/SunriseAPI.png";
import { Tweet } from 'react-twitter-widgets'

export default function About() {
    return (
        <div className="About">
            <div className='Twitter'>
                <Tweet tweetId="1632699294703812613" 
                    options={{theme: 'dark'}}
             />
            </div>
            <div className="About--Question">
                <h2>Q&A</h2>
                <h3>Is the weather data current?</h3>
                <p>Yes, almost all data is real-time. If it's not current the location 
                    will be followed by a "historic" tag.</p>
                <h3>Are there forecasts?</h3>
                <p>Presently the website only support real-time weather data 
                    although hourly and daily forecasts are planned for the near 
                    future.</p>
                <h3>Why is it not working? / My screen is blank.</h3>
                <p>There are many reasons why the website may not be loading information quickly.
                    the most common reason is that the API provider is down so data cannot be fetched.
                    The API is up ~95% of the time so check back in later.</p>
                <h3>I think I found a bug!</h3>
                <p>If you think you found a bug please contact us at the email below.
                    be sure to include relevant screenshots or error messages.</p>

            </div>
            <div className="About--Api">
                <h2>API Providers</h2>
                <div className='About--Api--Img'>
                    <img src={Img1} alt="Openweathermap logo"/>
                    <img src={Img2} alt="Openstreetmap logo"/>
                    <a href='https://sunrise-sunset.org/api' target="_blank" rel="noreferrer">
                        <img src={Img4} alt="Sunrise-Sunset API logo" />
                    </a>
                </div>

            </div>
            <div className="About--Contact">
                <h2>Get in Touch</h2>
                <div className="About--Contact--Body">
                    <div>
                        <p>Email: GeoWeatherxyz@gmail.com</p>
                        <p>Twitter: @GeoWeather</p>
                    </div>
                    <div className="About--Contact--Twitter">
                        <a href="https://twitter.com/GeoWeatherxyz"
                        target="_blank" rel="noreferrer">
                            <img src={Img3} alt="Twitter logo"/>
                        </a>
                    </div>
                </div>

            </div>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" rel="noreferrer" className="DONTCLICK">
                Don't Click
            </a>
        </div>
    )
}