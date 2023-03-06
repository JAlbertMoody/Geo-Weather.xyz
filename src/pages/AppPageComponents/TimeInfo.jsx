import React, { useState, useEffect } from 'react';
import tzlookup from 'tz-lookup';
import moment from 'moment-timezone';
import { Layer, Stage, Line } from "react-konva";
import useMediaQuery from '@mui/material/useMediaQuery';

function TimeInfo({ coordinates }) {
    const [timeData, setTimeData ] = useState('');

    useEffect(() => {
        async function fetchTimeData() {
            if (coordinates) {
              const URL = `https://api.sunrise-sunset.org/json?lat=${coordinates.lat}&lng=${coordinates.lng}&date=today`;
              try {
                const response = await fetch(URL);
                if (response.ok) {
                  const data = await response.json();
                  setTimeData(data);
                } else {
                  throw new Error('API request failed');
                }
              } catch (error) {
                console.error(error);
              }
            }
          }
        fetchTimeData();

    }, [coordinates])


    function DisplayTimeData(){

        const isMobile = useMediaQuery('(max-width: 750px)');


        if (timeData) {
            const timeZoneId = tzlookup(coordinates.lat, coordinates.lng);
            const now = moment().tz(timeZoneId);
            const utcOffset = now.utcOffset();
            const localTime = now.format('h:mm A');
            const localTime2 = now.format('hh:mm:ss A')
            const { results } = timeData;
            let sunrise = moment.utc(results.sunrise, "hh:mm:ss A").add(utcOffset, "minutes").format("hh:mm:ss A");
            let sunset = moment.utc(results.sunset, "hh:mm:ss A").add(utcOffset, "minutes").format("hh:mm:ss A");
            let sunriseAbr = moment.utc(results.sunrise, "hh:mm:ss A").add(utcOffset, "minutes").format("h:mm A");
            let sunsetAbr = moment.utc(results.sunset, "hh:mm:ss A").add(utcOffset, "minutes").format("h:mm A");

            function convertTimeToDecimal(timeString) {
                const date = new Date("1970-01-01T" + timeString.slice(0, -3));
                let hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                if (timeString.slice(-2).toLowerCase() === "pm") {
                  hours += 12;
                } else if (timeString.slice(-2).toLowerCase() === "am" && hours === 12) {
                  hours = 0;
                }
                const decimalHours = hours + minutes / 60 + seconds / 3600;
                return decimalHours.toFixed(2);
              }

            const sunriseConverted = convertTimeToDecimal(sunrise);
            const sunsetConverted = convertTimeToDecimal(sunset);
            const localTimeConverted = convertTimeToDecimal(localTime2);

            const chartWidth = 24;
            const chartHeight = 2;

            const [daylightHours, daylightMinutes] = results.day_length.split(":");
            const daylightTimeString = `Daylight: ${daylightHours} hours ${daylightMinutes} minutes`;

    

            return(
                <div className="Time--Info">
                    <div className="Time--Local">
                        <h2 className="Time--Local--Header">Local Time</h2>
                        <p className="Time--Local--Time">{localTime}</p>
                    </div>
                    <div className="Time--SunInfo">
                        <div className='Sunrise--Sunset'>
                            <p>Sunrise: {sunriseAbr}</p>
                            <p>Sunset: {sunsetAbr}</p>
                        </div>
                        <div className="Sunris--Sunset--Graphic">
                            <Stage width={isMobile ? 300 : 400} height={40}>
                                <Layer scaleX={(isMobile ? 300 : 400) / chartWidth} scaleY={50 / chartHeight}>
                                    <Line
                                    points={[0, 0.5, 24, 0.5]}
                                    stroke="rgb(17, 18, 24)"
                                    strokeWidth={0.15}
                                    
                                    />
                                    <Line
                                    points={[parseFloat(sunriseConverted), -1, parseFloat(sunriseConverted), 1]}
                                    stroke="#019BD8"
                                    strokeWidth={0.4}
                                    
                                    />
                                    <Line
                                    points={[parseFloat(sunsetConverted), -1, parseFloat(sunsetConverted), 1]}
                                    stroke="#1AC5E0"
                                    strokeWidth={0.4}
                                    
                                    />
                                    <Line
                                    points={[parseFloat(localTimeConverted), -1, parseFloat(localTimeConverted), 1]}
                                    stroke="whitesmoke"
                                    strokeWidth={0.25}
                                    
                                    />
                                </Layer>
                            </Stage>
                        </div>
                        <div className='Sunrise--Sunset--Extra'>
                            <p>{daylightTimeString}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
                return;
        }
    }

    return (
        <>
            <DisplayTimeData />
        </>
    );
}

export default TimeInfo;