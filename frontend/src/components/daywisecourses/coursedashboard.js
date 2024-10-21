import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDashboard = () => {
  const navigate = useNavigate();
  const { courseName } = useParams(); // Get course name from URL

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to {courseName} Dashboard</h2>
      <p>This page is accessible only to Admins for managing {courseName}.</p>
      <div style={styles.buttonContainer}>
        <button onClick={() => handleNavigation(`/add-content/${courseName}`)} style={styles.button}>
          Add Quiz
        </button>
        <button onClick={() => handleNavigation(`/add-content/${courseName}`)} style={styles.button}>
          Add Content
        </button>
        <button onClick={() => handleNavigation(`/add-content/${courseName}`)} style={styles.button}>
          Add Exam
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

export default CourseDashboard;
