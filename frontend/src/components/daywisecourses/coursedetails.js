import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
    const { courseName } = useParams();
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const [enrollmentStatus, setEnrollmentStatus] = useState('');

    // Get user email from localStorage (assuming it is stored there after login)
    const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${courseName}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }

                const data = await response.json();
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course details:', error);
                setError(error.message);
            }
        };

        fetchCourseDetails();
    }, [courseName]);

    const handleEnroll = async () => {
        if (!userEmail) {
            setEnrollmentStatus('User email not found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/enroll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseName, email: userEmail }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to enroll');
            }

            setEnrollmentStatus(data.message);
        } catch (error) {
            console.error('Error enrolling in course:', error);
            setEnrollmentStatus(error.message || 'Failed to enroll. Please try again.');
        }
    };

    if (error) {
        return <div>Error fetching course details: {error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{course[1].courseName}</h1>
            <img src={`data:image/png;base64,${course[1].image}`} alt={course[1].courseName} />
            
            <h2>What You'll Learn</h2>
            <ul>
                {course[1].whatYouWillLearn.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>Course Includes</h2>
            <ul>
                {course[1].courseIncludes.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h2>Content</h2>
            <ul>
                {course[1].content.map((item, index) => (
                    <li key={index}>{item.title}: {item.description}</li>
                ))}
            </ul>

            {/* Removed the email input field since the email is fetched from localStorage */}
            <button 
                onClick={handleEnroll}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Enroll Now
            </button>

            {enrollmentStatus && <p>{enrollmentStatus}</p>}
        </div>
    );
};

export default CourseDetail;
