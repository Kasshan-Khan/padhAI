import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShortNotes.css';
import notesMakerLogo from './assets/notes_maker.png'

const VideoInput = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!link) {
      setError("Please enter a YouTube link first.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await fetch('http://localhost:5000/api/transcript/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ youtube_url: link }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to generate summary. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shortnotes-container">
      
      
      <div className="notes-logo" style={{ backgroundImage: `url(${notesMakerLogo})` }}>
        <div className="notes-header">
        </div>
        <div className="upload-box" style={{ borderStyle: 'solid' }}>
          <input
            type="text"
            className="video-input-field"
            placeholder="Paste YouTube Link Here..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <button
          className="action-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Short Notes'}
        </button>

        {error && (
          <div className="error-message" style={{ color: 'red', marginTop: '1rem' }}>
            {error}
          </div>
        )}


      </div>
        {summary && (
        <div className="summary-container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <h3>Generated Summary:</h3>
          <div className="summary-content" style={{
            background: '#f5f5f5',
            padding: '1.5rem',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap'
          }}>
            {summary}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInput;