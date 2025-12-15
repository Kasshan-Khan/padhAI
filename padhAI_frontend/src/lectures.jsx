import React from 'react'
import './JEE.css'

const Lectures = () => {
  return (
    <div className="study-section-content" style={{ textAlign: 'center' }}>
      {/* <h2>Lectures</h2> */}
      <div className="video-list" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=cq-Bz3qVFfMTKnUP&amp;list=PLU6SqdYcYsfLPxjd-k-MaoG7qgRQ-2fKc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Unstoppable Motivation</h3>
            <p style={{ margin: 0, color: '#666' }}>Push your limits and achieve your goals.</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=tcfVfV3rNI5DxDtG&amp;list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Study Hard</h3>
            <p style={{ margin: 0, color: '#666' }}>Focus on your studies and build your future.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lectures