import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import './footer.css'; // Ensure this file is created with the correct name

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo">
            <h2>Kiet Platform</h2>
          </div>
          <nav className="footer-nav">
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/contact">Contact us</a></li>
            </ul>
          </nav>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <h3>More about our Platform</h3>
          <p>Our LLM platform offers diverse courses, including Python, C, AI, and Machine Learning, tailored to equip you with in-demand tech skills. With a focus on practical learning and expert guidance, we provide personalized paths to help you master key concepts and excel in your career.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>@Team7 K-Hub, all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
