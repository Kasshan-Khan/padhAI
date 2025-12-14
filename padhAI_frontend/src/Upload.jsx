import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShortNotes.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // Navigate to loading page to simulate processing
      navigate('/loading');
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="shortnotes-container">
      <h2>Upload Study Material</h2>
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} accept=".pdf,.txt,.docx" />
        <p>Supported formats: PDF, TXT, DOCX</p>
      </div>
      <button className="action-btn" onClick={handleUpload}>Generate Short Notes</button>
    </div>
  );
};

export default Upload;