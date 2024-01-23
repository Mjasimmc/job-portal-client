import React from 'react';
import { ParallaxProvider } from "react-scroll-parallax";
import BannerAbout from '../../components/userComponents/aboutComp/bannerAbout';
const AboutPage = () => {

    return (<>
        <ParallaxProvider>
            <BannerAbout />

        </ParallaxProvider>
    </>
    );
}

export default AboutPage;
