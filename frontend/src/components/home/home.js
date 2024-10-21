import React from 'react';
import Header from './header';
import Footer from './footer';
import Welcome from './welcome'; // Import the Welcome component
import Aboutus from './about';
import WhatWeLearn from './whatwelearn';
import MeetOurAdvisors from './meetouradvisors';

function Home() {
  return (
    
      <div className="app-container">
        <Header/>
        <Welcome/>
        <Aboutus/>
        <WhatWeLearn/>
        <MeetOurAdvisors/>
        <Footer/>
      </div>
    
  );
}

export default Home;