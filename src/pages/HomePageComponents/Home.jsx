import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeMobile from './HomeMobile';
import HomeDesktop from './HomeDesktop';

export default function Home() {

    let navigate = useNavigate();

    function handleClick(){
        navigate("/app")

    }

    function Main(){
        const isMobile = useMediaQuery('(max-width: 750px)');

        return isMobile ? <HomeMobile /> : <HomeDesktop />;
    }

    return (
        <div>
            <div className='Home--Hero'>
                <h1>Explore the World's Weather<br /> in Real Time</h1>
                <button onClick={handleClick}>ENTER APP</button>
                <h2>Now supporting metric units!</h2>
            </div>
            <Main />
        </div>
    )
}