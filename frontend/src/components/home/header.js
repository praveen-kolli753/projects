import React, { useState } from 'react';
import { FiHome, FiBook, FiInfo, FiMail, FiAlignJustify } from 'react-icons/fi'; // Importing icons from react-icons
import { IoSchool } from 'react-icons/io5'; // Importing school icon
import { CgProfile } from 'react-icons/cg'; // Importing user profile icon
import './header.css'; 

const Navbar = () => {
    // Check if the screen width is less than or equal to 768px for mobile view
    const isMobile = window.innerWidth <= 768;

    // State to manage the dropdown visibility
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <header className="login_header">
            {/* Logo and platform name with school icon */}
            <div className="login_logo">
                {isMobile && <FiAlignJustify className="mobile-icon" onClick={toggleDropdown} />} {/* Align icon for mobile view */}
                <IoSchool className="login_school-logo" /> {/* School icon */}
                <span>Kiet Platform</span>
            </div>
            
            {/* Navigation Links - Visible in Desktop View */}
            <nav className="login_navbar">
                <a href="/home" className="nav-link">
                    <FiHome className="login_icon" /> {/* Home icon */}
                    Home
                </a>
                <a href="/courses" className="nav-link">
                    <FiBook className="login_icon" /> {/* Courses icon */}
                    Courses
                </a>
                <a href="#" className="nav-link">
                    <FiInfo className="login_icon" /> {/* About us icon */}
                    About Us
                </a>
                <a href="/home" className="nav-link">
                    <FiMail className="login_icon" /> {/* Contact us icon */}
                    Contact Us
                </a>
            </nav>

            {/* Dropdown Menu for Mobile */}
            {isMobile && isDropdownVisible && ( // Show dropdown menu only in mobile view when visible
                <div className="dropdown-menu">
                    <nav className="login_navbar">
                        <a href="/home" className="nav-link">
                            <FiHome className="login_icon" /> {/* Home icon */}
                            Home
                        </a>
                        <a href="#" className="nav-link">
                            <FiBook className="login_icon" /> {/* Courses icon */}
                            Courses
                        </a>
                        <a href="#" className="nav-link">
                            <FiInfo className="login_icon" /> {/* About us icon */}
                            About Us
                        </a>
                        <a href="/home" className="nav-link">
                            <FiMail className="login_icon" /> {/* Contact us icon */}
                            Contact Us
                        </a>
                    </nav>
                </div>
            )}
            
            {/* User profile section with profile icon */}
            <div className="login_profile-icon">
                <CgProfile className="login_user-profile-icon" /> {/* User profile icon */}
            </div>
        </header>
    );
};

export default Navbar;
