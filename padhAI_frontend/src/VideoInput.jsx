import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShortNotes.css';

const VideoInput = () => {
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (link) {
      // Navigate to loading page to simulate processing
      navigate('/loading');
    } else {
      alert("Please enter a YouTube link first.");
    }
  };

  return (
    <div className="shortnotes-container">
      <h2>Summarize YouTube Video</h2>
      <div className="upload-box" style={{ borderStyle: 'solid' }}>
        <input 
            type="text" 
            className="video-input-field"
            placeholder="Paste YouTube Link Here..." 
            value={link}
            onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <button className="action-btn" onClick={handleGenerate}>Generate Short Notes</button>
    </div>
  );
};

export default VideoInput;