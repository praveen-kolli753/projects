import React from 'react';
import './meetouradvisors.css';  // Create this CSS file
 import advisor1 from './images/welcome.jpeg'; // Example image paths
 import advisor2 from './images/welcome.jpeg';
 import advisor3 from './images/welcome.jpeg';
 import advisor4 from './images/welcome.jpeg';

const MeetOurAdvisors = () => {
  return (
    <section className="meet-advisors">
      <h1>Meet Our <span>Advisors</span></h1>
      <p className="advisors-description">
        Our team of dedicated advisors brings years of industry expertise and mentorship experience. Their goal is to guide
        you through your learning journey, helping you achieve success and build valuable career skills.
      </p>

      <div className="advisors-grid">
        <div className="advisor-card">
          <img src={advisor1} alt="Advisor 1" className="advisor-image" />
          <h3>Dr. Jane Doe</h3>
          <p>Industry Expert in AI and Machine Learning</p>
        </div>

        <div className="advisor-card">
          <img src={advisor2} alt="Advisor 2" className="advisor-image" />
          <h3>John Smith</h3>
          <p>Software Engineer & Mentor in Full Stack Development</p>
        </div>

        <div className="advisor-card">
          <img src={advisor3} alt="Advisor 3" className="advisor-image" />
          <h3>Emily Johnson</h3>
          <p>Product Manager & Expert in Data Analytics</p>
        </div>
        <div className="advisor-card">
          <img src={advisor4} alt="Advisor 4" className="advisor-image" />
          <h3>Emily Johnson</h3>
          <p>Product Manager & Expert in Data Analytics</p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurAdvisors;
