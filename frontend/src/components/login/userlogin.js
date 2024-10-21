import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../home/header'; // Importing Navbar component
import './userlogin.css';
import Footer from '../home/footer'; // Importing Footer component
import loginImage from './img.jpg';
import axios from 'axios';

const UserLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/user-login', formData);
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('userEmail', formData.email);
            navigate('/userdashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="new-login-page">
            <Navbar /> {/* Adding Navbar component */}
            <main className="new-login-main">
                <section className="new-login-form-section">
                    <h2 className="new-login-title">USER LOGIN</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form className="new-login-form" onSubmit={handleSubmit}>
                        <div className="new-form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="new-form-input"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="new-form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="new-form-input"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="new-login-button">Login Now</button>
                    </form>
                    <p className="new-login-options">
                        Login with <a href="#" className="new-login-link">Others</a> or <Link to="/usersignup" className="new-login-link">Signup</Link>
                    </p>
                </section>
                <section className="new-login-image-section">
                    <img src={loginImage} alt="Login Banner" className="new-login-image" />
                </section>
            </main>
            <Footer /> {/* Adding Footer component */}
        </div>
    );
};

export default UserLogin;