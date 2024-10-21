import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AddCourseContent() {
  const { courseName } = useParams();
  const [courseContent, setCourseContent] = useState({
    dayNumber: '',
    youtubeLinks: [{ link: '', description: '' }],
    resourceLinks: [''],
    colabLinks: [''],
    feedbackLinks: [''],
    quizLinks: ['']
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExistingContent();
  }, [courseName]);

  const fetchExistingContent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMessage('Content loaded successfully');
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Failed to load existing content');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/courses/${courseName}/content`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseContent)
      });

      if (response.ok) {
        setMessage('Content added successfully!');
        setCourseContent({
          dayNumber: '',
          youtubeLinks: [{ link: '', description: '' }],
          resourceLinks: [''],
          colabLinks: [''],
          feedbackLinks: [''],
          quizLinks: ['']
        });
      } else {
        setMessage('Failed to add content');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding content');
    }
  };

  const handleAddYoutubeLink = () => {
    setCourseContent(prev => ({
      ...prev,
      youtubeLinks: [...prev.youtubeLinks, { link: '', description: '' }]
    }));
  };

  const handleLinkChange = (type, index, value) => {
    setCourseContent(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleYoutubeLinkChange = (index, field, value) => {
    setCourseContent(prev => ({
      ...prev,
      youtubeLinks: prev.youtubeLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddLink = (type) => {
    setCourseContent(prev => ({
      ...prev,
      [type]: [...prev[type], '']
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Content to {courseName}</h1>

      {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Day Number Input */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Day Number:</label>
          <input
            type="number"
            value={courseContent.dayNumber}
            onChange={(e) => setCourseContent(prev => ({ ...prev, dayNumber: e.target.value }))}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* YouTube Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">YouTube Links:</label>
          {courseContent.youtubeLinks.map((item, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="url"
                value={item.link}
                onChange={(e) => handleYoutubeLinkChange(index, 'link', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter YouTube link"
                required
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleYoutubeLinkChange(index, 'description', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter description for the link"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddYoutubeLink}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Another YouTube Link
          </button>
        </div>

        {/* Resource Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Resource Links:</label>
          {courseContent.resourceLinks.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handleLinkChange('resourceLinks', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter resource link"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddLink('resourceLinks')}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Another Resource Link
          </button>
        </div>

        {/* Colab Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Colab Links:</label>
          {courseContent.colabLinks.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handleLinkChange('colabLinks', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter Colab link"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddLink('colabLinks')}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Another Colab Link
          </button>
        </div>

        {/* Feedback Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Feedback Links:</label>
          {courseContent.feedbackLinks.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handleLinkChange('feedbackLinks', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter feedback link"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddLink('feedbackLinks')}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Another Feedback Link
          </button>
        </div>

        {/* Quiz Links Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <label className="block mb-2 font-medium">Quiz Links:</label>
          {courseContent.quizLinks.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handleLinkChange('quizLinks', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter quiz link"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddLink('quizLinks')}
            className="text-blue-500 hover:text-blue-600"
          >
            + Add Another Quiz Link
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Content
        </button>
      </form>
    </div>
  );
}
