import React from 'react';
import { Link } from 'react-router-dom';
import './ShortNotes.css';

const ShortNotes = () => {
  return (
    <div className="shortnotes-container">
      <h1>AI Short Notes Generator</h1>
      <p>Turn your lengthy study materials or videos into concise, easy-to-revise short notes in seconds.</p>
      
      <div className="options-container">
        <div className="option-card">
          <h3>Upload Document</h3>
          <p>PDF, TXT, DOCX</p>
          <Link to="/upload">
            <button className="action-btn">Select File</button>
          </Link>
        </div>
        <div className="option-card">
          <h3>YouTube Video</h3>
          <p>Summarize via Link</p>
          <Link to="/video-input">
            <button className="action-btn">Paste Link</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShortNotes;