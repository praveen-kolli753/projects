import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to Admin Home Page</h2>
      <p>This page is accessible only to Admins.</p>
      <div style={styles.buttonContainer}>
        <button onClick={() => handleNavigation('/add-course')} style={styles.button}>
          Add Course
        </button>
        <button onClick={() => handleNavigation('/add-content')} style={styles.button}>
          Add Content
        </button>
        <button onClick={() => handleNavigation('/admincourses')} style={styles.button}>
          Your Courses
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

export default AdminHome;
