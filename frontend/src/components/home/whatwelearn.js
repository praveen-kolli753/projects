import React from 'react';
import './whatwelearn.css';  // Ensure you create this file
import { FaCertificate, FaChalkboardTeacher, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';  // Example icons

const WhatWeLearn = () => {
  return (
    <section className="what-we-learn">
      <h1>What Can <span>You Learn?</span></h1>
      <p className="what-description">
        Our Platform Offers Top Courses Like Python And C Programming, Alongside Emerging Fields Such As Artificial Intelligence 
        And Machine Learning, Tailored To Meet The Demands Of Today’s Technology Landscape. We Enhance Your Learning With Unique 
        Services, Including Free Mentorship, 24/7 Access To Resources, And Certification Upon Course Completion, Ensuring A 
        Comprehensive And Flexible Learning Experience.
      </p>

      <div className="learning-benefits">
        <div className="benefit">
          <FaCertificate className="icon" />
          <h3>Free Certification</h3>
          <p>Earn many recognized certifications at no extra cost upon completing our courses, validating your skills.</p>
        </div>

        <div className="benefit">
          <FaChalkboardTeacher className="icon" />
          <h3>Mentorship</h3>
          <p>Get personalized guidance from experienced mentors who support your learning journey.</p>
        </div>

        <div className="benefit">
          <FaLaptopCode className="icon" />
          <h3>Hands-on Projects</h3>
          <p>Put your skills into practice with real-world projects, building a strong portfolio to showcase to employers.</p>
        </div>

        <div className="benefit">
          <FaGraduationCap className="icon" />
          <h3>Flexible Learning</h3>
          <p>Learn at your own pace with flexible courses and 24/7 access to resources.</p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeLearn;
