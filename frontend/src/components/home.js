import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // const handleNavigation = (role) => {
  //   navigate(`/${role}-login`);
  // };
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div style={styles.container}>
      <h1>Welcome to the Learning Platform</h1>
      <div style={styles.buttonContainer}>
        <button onClick={() => handleNavigation('/mainadmin-login')} style={styles.button}>
          Main Admin
        </button>
        <button onClick={() => handleNavigation('/admin-login')} style={styles.button}>
          Admin
        </button>
        <button onClick={() => handleNavigation('/user-login')} style={styles.button}>
          User
        </button>
        <button onClick={() => handleNavigation('/courses')} style={styles.button}>
          Courses
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default HomePage;
