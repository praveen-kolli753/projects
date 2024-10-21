import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses'); // Adjust the API endpoint as needed
                const data = await response.json();
                console.log(data);  // Log the data to check the structure
                // Ensure the response is an array before setting it in the state
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error('Unexpected data format:', data);
                    setCourses([]);  // Fallback to an empty array if the data is not an array
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="course-list">
            {courses.length === 0 ? (
                <p>No courses available.</p>
            ) : (
                courses.map((course, index) => (
                    <div className="course-card" key={index}>
                        <Link to={`/courses/${course.collectionName}`}>
                            <img src={`data:image/jpeg;base64,${course.image}`} alt={course.collectionName} />
                            <h3>{course.collectionName}</h3>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default CourseList;
