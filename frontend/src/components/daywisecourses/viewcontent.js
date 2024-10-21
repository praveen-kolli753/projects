import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Youtube, FileText, BookOpen, CheckSquare, Link as LinkIcon } from 'lucide-react';

export default function ViewContent() {
  const { courseName } = useParams();
  const [existingContent, setExistingContent] = useState([]);
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
      const content = data.filter(item => item.index >= 2);
      setExistingContent(content);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Failed to load existing content');
    }
  };

  const contentTypes = [
    { name: 'youtubeLinks', icon: Youtube, label: 'YouTube Videos' },
    { name: 'resourceLinks', icon: FileText, label: 'Resources' },
    { name: 'colabLinks', icon: BookOpen, label: 'Colab Notebooks' },
    { name: 'feedbackLinks', icon: CheckSquare, label: 'Feedback Forms' },
    { name: 'quizLinks', icon: LinkIcon, label: 'Quizzes' }
  ];

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold">Existing Content for {courseName}</h2>
      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}
      {existingContent.length === 0 ? (
        <p>No content available for this course.</p>
      ) : (
        existingContent.map((content, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Day {content.dayNumber}</h3>
            {contentTypes.map(({ name, label, icon: Icon }) => (
              <div key={name} className="mb-4">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Icon size={16} />
                  {label}
                </h4>
                <div className="space-y-1 ml-6">
                  {Array.isArray(content[name]) ? (
                    content[name].map((item, i) => (
                      <div key={i}>
                        {name === 'youtubeLinks' ? (
                          <Link 
                            to={`/watch/${courseName}/${content.dayNumber}/${i}`}
                            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Watch Session {i + 1}
                          </Link>
                        ) : (
                          <a
                            href={typeof item === 'object' ? item.link : item}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-500 hover:underline"
                          >
                            {`${label.slice(0, -1)} ${i + 1}`}
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No {label.toLowerCase()} available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}