import React from 'react';
import './about.css'; // Ensure this file contains your updated styles
import Image from './images/home.pic (1).png'; // Ensure the correct path to your image

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <div className="about-image">
                    <img src={Image} alt="About Us" />
                </div>
                <div className="about-text">
                    <h1>About Us</h1>
                    <p>
                        The LLM Platform empowers individuals through tailored learning experiences, offering a range of 
                        courses focusing on leadership, communication, and technical skills. Our mission is to create a 
                        dynamic space where learners can grow and thrive in today's fast-paced world.
                        Crafted by industry experts, our courses ensure high-quality education. We understand that every 
                        learner's journey is unique, which is why we offer flexible learning paths that cater to different 
                        styles and schedules.
                    </p>
                    {/* <p>
                        Crafted by industry experts, our courses ensure high-quality education. We understand that every 
                        learner's journey is unique, which is why we offer flexible learning paths that cater to different 
                        styles and schedules.
                    </p> */}
                    <p>
                        <strong>Join us and take the next step in your personal and professional development!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
