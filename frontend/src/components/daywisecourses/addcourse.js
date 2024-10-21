import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [image, setImage] = useState(null);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState(['']);
  const [courseIncludes, setCourseIncludes] = useState(['']);
  const [content, setContent] = useState([{ title: '', description: '' }]);
  const [message, setMessage] = useState('');

  const handleAddPoint = (setPoints, points) => {
    setPoints([...points, '']);
  };

  const handleAddContent = () => {
    setContent([...content, { title: '', description: '' }]);
  };

  const handleInputChange = (e, index, points, setPoints) => {
    const newPoints = [...points];
    newPoints[index] = e.target.value;
    setPoints(newPoints);
  };

  const handleContentChange = (e, index) => {
    const updatedContent = [...content];
    updatedContent[index][e.target.name] = e.target.value;
    setContent(updatedContent);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Handle file uploads
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('image', image); // Upload image file
    formData.append('whatYouWillLearn', JSON.stringify(whatYouWillLearn));
    formData.append('courseIncludes', JSON.stringify(courseIncludes));
    formData.append('content', JSON.stringify(content));

    try {
      const token = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
      const response = await axios.post(
        'http://localhost:5000/api/add-course',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Error adding course. Please try again.');
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Course Image</label>
          <input type="file" onChange={handleImageChange} required />
        </div>

        <div>
          <label>What You Will Learn</label>
          {whatYouWillLearn.map((point, index) => (
            <input
              key={index}
              type="text"
              value={point}
              onChange={(e) => handleInputChange(e, index, whatYouWillLearn, setWhatYouWillLearn)}
              placeholder="Enter a point"
            />
          ))}
          <button type="button" onClick={() => handleAddPoint(setWhatYouWillLearn, whatYouWillLearn)}>
            Add Point
          </button>
        </div>

        <div>
          <label>Course Includes</label>
          {courseIncludes.map((point, index) => (
            <input
              key={index}
              type="text"
              value={point}
              onChange={(e) => handleInputChange(e, index, courseIncludes, setCourseIncludes)}
              placeholder="Enter a point"
            />
          ))}
          <button type="button" onClick={() => handleAddPoint(setCourseIncludes, courseIncludes)}>
            Add Point
          </button>
        </div>

        <div>
          <label>Course Content</label>
          {content.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="title"
                value={item.title}
                onChange={(e) => handleContentChange(e, index)}
                placeholder="Enter title"
              />
              <input
                type="text"
                name="description"
                value={item.description}
                onChange={(e) => handleContentChange(e, index)}
                placeholder="Enter description"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddContent}>
            Add Content
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCourse;
