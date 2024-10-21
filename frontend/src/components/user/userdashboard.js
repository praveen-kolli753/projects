import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userCourses, setUserCourses] = useState({
    enrolledCourses: [],
    completedCourses: [],
    requestedCourses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCourses();
  }, []);

  const fetchUserCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/user/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      setLoading(false);
    }
  };

  const renderCourseList = (courses, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {courses.length > 0 ? (
        <ul className="space-y-2">
          {courses.map((course, index) => (
            <li key={index} className="bg-white p-4 rounded shadow">
              <p className="font-medium">{course.name}</p>
              {course.currentDay && (
                <p className="text-sm text-gray-600">Current Day: {course.currentDay}</p>
              )}
              {course.percentage !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Progress: {course.percentage}%</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nothing found</p>
      )}
    </div>
  );

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>

      {renderCourseList(userCourses.enrolledCourses, "Enrolled Courses")}
      {renderCourseList(userCourses.completedCourses, "Completed Courses")}
      {renderCourseList(userCourses.requestedCourses, "Requested Courses")}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Total Details</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">Enrolled Courses</p>
            <p className="text-2xl font-bold mt-2">{userCourses.enrolledCourses.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">Completed Courses</p>
            <p className="text-2xl font-bold mt-2">{userCourses.completedCourses.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="font-medium">Requested Courses</p>
            <p className="text-2xl font-bold mt-2">{userCourses.requestedCourses.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;