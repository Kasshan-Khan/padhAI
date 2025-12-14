import React from 'react'
import './JEE.css'
import alakh from './assets/Alakh_pandey.jpeg'
import nv from './assets/NV_sir.jpg'
import prateek from './assets/Prateek_jain.jpg'

const JEE = () => {
  return (
    <div className="study-page-container">
      {/* Left Side: Motivation Videos */}
      <div className="study-section study-left">
        <h2>Motivation Station</h2>
        <div className="video-list">
          <div className="video-item">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/A-pAakRqg4A?si=0jKRXcBMDwPcWzfR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div className="video-item">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/0maUAh9KyDU?si=XAxWw8EaRb45yskT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      </div>

      {/* Middle: Popular Channels & Photos */}
      <div className="study-section study-middle">
        <h2>Popular Channels</h2>
        <div className="channels-grid">
          <div className="channel-card">
            <img src={alakh} className="channel-img" alt="Alakh Pandey" style={{objectFit: "cover"}} />
            <p>Alakh Pandey</p>
          </div>
          <div className="channel-card">
            <img src={nv} className="channel-img" alt="NV Sir" style={{objectFit: "cover"}} />
            <p>NV Sir</p>
          </div>
          <div className="channel-card">
            <img src={prateek} className="channel-img" alt="Prateek Jain" style={{objectFit: "cover"}} />
            <p>Prateek Jain</p>
          </div>
        </div>
      </div>

      {/* Right Side: Quiz Generator */}
      <div className="study-section study-right">
        <h2>Quiz Generator</h2>
        <form className="quiz-form" onSubmit={(e) => e.preventDefault()}>
          <label>Select Topic</label>
          <select defaultValue="Physics">
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
          </select>
          <button type="submit">Generate Quiz</button>
        </form>
      </div>
    </div>
  )
}

export default JEE