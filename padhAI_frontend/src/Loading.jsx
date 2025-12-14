import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShortNotes.css';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      navigate('/download', {
        state: {
          notes: `Here are your generated short notes:

1. Key Concepts:
   - Concept A: Definition and importance.
   - Concept B: Formula and application.

2. Important Formulas:
   - E = mc^2
   - F = ma

3. Summary:
   This chapter covers the fundamental principles of...
   
(This is a sample generated output for demonstration)`
        }
      });
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="shortnotes-container">
      <div className="loader"></div>
      <h2>Generating your Short Notes...</h2>
      <p>Please wait while our AI processes your document.</p>
    </div>
  );
};

export default Loading;