import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeMobile from './HomeMobile';
import HomeDesktop from './HomeDesktop';
import HomeHero from './HomeHero';


export default function Home() {

    function Main(){
        const isMobile = useMediaQuery('(max-width: 750px)');

        return isMobile ? <HomeMobile /> : <HomeDesktop />;
    }

    return (
        <div>
            <HomeHero />
            <Main />
        </div>
    )
}
