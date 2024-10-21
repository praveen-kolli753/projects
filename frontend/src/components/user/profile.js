import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileDetails(response.data.profileDetails);
      setEditedDetails(response.data.profileDetails);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/profile', editedDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileDetails(editedDetails);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={editedDetails.firstName || ''}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={editedDetails.lastName || ''}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="middleName"
              value={editedDetails.middleName || ''}
              onChange={handleChange}
              placeholder="Middle Name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="college"
              value={editedDetails.college || ''}
              onChange={handleChange}
              placeholder="College"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="gender"
              value={editedDetails.gender || ''}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p><strong>First Name:</strong> {profileDetails.firstName || 'Not set'}</p>
          <p><strong>Last Name:</strong> {profileDetails.lastName || 'Not set'}</p>
          <p><strong>Middle Name:</strong> {profileDetails.middleName || 'Not set'}</p>
          <p><strong>College:</strong> {profileDetails.college || 'Not set'}</p>
          <p><strong>Gender:</strong> {profileDetails.gender || 'Not set'}</p>
          <button
            onClick={handleEdit}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;