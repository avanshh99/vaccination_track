import React from 'react';
// import HomePhoto from './HomePhoto';
import HomeAbout from './HomeAbout';
// import HomeServices from './HomeServices';
import HomeFooter from './HomeFooter';
import HomeInfoPolice from './HomeInfoPolice';
import Homemain from './Homemain';

const Home = () => {
    return (
        <div className="space-y-5 bg-gray-100">
            <Homemain></Homemain>
            {/* <HomePhoto /> */}
            <hr />
            <HomeAbout />
            <HomeInfoPolice />
            {/* <HomeServices /> */}
            <hr />
            <HomeFooter />
        </div>
    );
};

export default Home;