import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Welcome from './components/welcome'; // Import the Welcome component
import Aboutus from './components/about';
import WhatWeLearn from './components/whatwelearn';
import MeetOurAdvisors from './components/meetouradvisors';
import './App.css'; // Global CSS for the whole app

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Include the header */}
        <Routes>
          <Route path="/" element={<Welcome/>} /> {/* Set Welcome as the home page */}
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/whatwelearn" component={WhatWeLearn} />  
          {/* <Route path="/about" element={<Aboutus/>} /> */}
        </Routes>
        <Aboutus/>
        <WhatWeLearn/>
        <MeetOurAdvisors/>
        <Footer /> {/* Include the footer */}
      </div>
    </Router>
  );
}

export default App;
