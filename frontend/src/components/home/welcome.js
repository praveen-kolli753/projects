import React from 'react';
import './welcome.css'; // Ensure this file exists
// import { SiCplusplus, SiPython, SiAdobe } from 'react-icons/si'; // Import available icons
import Image from './images/home.pic.png'; // Correct image path



const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-text">
        <h1>Welcome</h1>
        <h2>Trusted LMS Platform of K-HUB</h2>
        <p>Providing cutting-edge LLM tools and APIs for seamless language processing and smarter AI applications.</p>
        <p>Discover a wide range of courses tailored to your growth, from leadership and communication to technical skills.</p>
        <button className="welcome-button">Get Started</button>
        
      </div>
      <div className="welcome-image-container">
        <img src={Image} alt="Welcome" className="welcome-image" />
        {/* <div className="welcome-icons">
          <SiCplusplus className="icon cpp-icon" />
          <SiPython className="icon python-icon" />
          <SiAdobe className="icon xd-icon" />
        </div> */}
      </div>
    </div>
  );
};

export default Welcome;
