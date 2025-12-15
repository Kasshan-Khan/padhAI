import React, { useState, useEffect } from 'react'
import './JEE.css'

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState("PHYSICS");

  useEffect(() => {
    // Mock questions for demonstration
    let mockQuestions = [];
    if (subject === "PHYSICS") {
      mockQuestions = [
        {
          id: 1,
          question: "A particle is moving in a circle of radius R with constant speed v. The work done by the centripetal force in one complete revolution is:",
          options: ["2πRv", "mv²/R", "0", "mv²"]
        },
        {
          id: 2,
          question: "Which of the following is not a vector quantity?",
          options: ["Displacement", "Velocity", "Force", "Speed"]
        },
        {
          id: 3,
          question: "The dimension of Planck's constant is same as that of:",
          options: ["Angular Momentum", "Linear Momentum", "Work", "Energy"]
        }
      ];
    } else if (subject === "MATHS") {
      mockQuestions = [
        {
          id: 1,
          question: "The value of lim(x->0) (sin x)/x is:",
          options: ["0", "1", "infinity", "undefined"]
        },
        {
          id: 2,
          question: "The derivative of sin(x) is:",
          options: ["cos(x)", "-cos(x)", "tan(x)", "sec(x)"]
        },
        {
          id: 3,
          question: "Integration of 1/x dx is:",
          options: ["log x", "e^x", "x^2/2", "1/x^2"]
        }
      ];
    } else if (subject === "DSA") {
      mockQuestions = [
        {
          id: 1,
          question: "Time complexity of binary search is:",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"]
        },
        {
          id: 2,
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Linked List", "Tree"]
        },
        {
          id: 3,
          question: "Worst case time complexity of Quick Sort is:",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"]
        }
      ];
    }
    setQuestions(mockQuestions);
  }, [subject]);

  return (
    <div className="study-section-content" style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          style={{ 
            padding: '10px 15px', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#fff',
            outline: 'none'
          }}
        >
          <option value="MATHS">MATHS</option>
          <option value="PHYSICS">PHYSICS</option>
          <option value="DSA">DSA</option>
        </select>
      </div>

      <div className="questions-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {questions.map((q, index) => (
          <div key={q.id} className="question-card" style={{ 
            backgroundColor: '#fff', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)', 
            textAlign: 'left',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ marginTop: 0, color: '#333', fontSize: '1.1rem', marginBottom: '15px' }}>Q{index + 1}: {q.question}</h3>
            <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {q.options.map((opt, i) => (
                <div key={i} style={{ 
                  padding: '12px 15px', 
                  border: '1px solid #e0e0e0', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  backgroundColor: '#f8f9fa',
                  fontSize: '0.95rem',
                  transition: 'background 0.2s'
                }}>
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Questions