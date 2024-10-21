import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/courses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setCourses(data);
                } else {
                    setError(data.message || 'Error fetching courses');
                }
            } catch (err) {
                setError('Error fetching courses');
            }
        };

        fetchCourses();
    }, []);

    // Navigate to the Add Content page
    const handleCourseClick = (courseName) => {
        navigate(`/course-dashboard/${courseName}`);
    };
    return (
        <div>
            <h1>Your Courses</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div
                            key={index}
                            style={{ border: '1px solid #ccc', padding: '20px', cursor: 'pointer' }}
                            onClick={() => handleCourseClick(course.collectionName)} // Handle course click
                        >
                            <h3>{course.courseName}</h3>
                            <img
                                src={`data:image/jpeg;base64,${course.image}`}
                                alt={course.courseName}
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                    ))
                ) : (
                    <p>No courses found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminCourses;
