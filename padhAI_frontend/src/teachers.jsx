import React from 'react'
import './JEE.css'
import alakh from './assets/Alakh_pandey.jpeg'
import nv from './assets/NV_sir.jpg'
import prateek from './assets/Prateek_jain.jpg'

const Teachers = () => {
  return (
    <div className="study-section-content" style={{ textAlign: 'center' }}>
      {/* <h2>Popular Channels</h2> */}
      <div className="channels-grid" style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
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
  )
}

export default Teachers