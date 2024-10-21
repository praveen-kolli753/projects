import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Watch() {
  const { courseName, dayNumber, sessionIndex } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/courses/${courseName}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        const dayContent = data.find(item => item.dayNumber === parseInt(dayNumber));
        if (dayContent && dayContent.youtubeLinks[sessionIndex]) {
          setVideoData(dayContent.youtubeLinks[sessionIndex]);
        } else {
          setError('Video not found');
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        setError('Failed to load video data');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [courseName, dayNumber, sessionIndex]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!videoData) return <div>No video data available</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {courseName} - Day {dayNumber} - Session {parseInt(sessionIndex) + 1}
      </h2>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeId(videoData.link)}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <h3 className="text-xl font-semibold mb-2">Description:</h3>
      <p>{videoData.description}</p>
    </div>
  );
}

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}