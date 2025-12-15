import React from 'react'
import './JEE.css'

const Questions = () => {
  return (
    <div className="study-section-content" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      {/* <h2>Quiz Generator</h2> */}
      <form className="quiz-form" onSubmit={(e) => e.preventDefault()}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Select Topic</label>
        <select defaultValue="Physics" style={{ padding: '10px', width: '100%', marginBottom: '20px' }}>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Maths">Maths</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Generate Quiz</button>
      </form>
    </div>
  )
}

export default Questions