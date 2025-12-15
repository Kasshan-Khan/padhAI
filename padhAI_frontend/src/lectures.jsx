import React from 'react'
import './JEE.css'

const Lectures = () => {
  return (
    <div className="study-section-content" style={{ textAlign: 'center' }}>
      {/* <h2>Lectures</h2> */}
      <div className="video-list" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=cq-Bz3qVFfMTKnUP&amp;list=PLU6SqdYcYsfLPxjd-k-MaoG7qgRQ-2fKc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Gajendra Purohit</h3>
            <p style={{ margin: 0, color: '#666' }}>Engineering Mathematics</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=C2C0OmyRyk5fltGr&amp;list=PLT3bOBUU3L9iw3yQWge_IjhXZlDgRGwyq" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Pradeep Giri</h3>
            <p style={{ margin: 0, color: '#666' }}>Differential Calculus</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=zDbwK9tsVSusdMM-&amp;list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37" title="YouTube video player " allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Chai aur Code</h3>
            <p style={{ margin: 0, color: '#666' }}>Javascript</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=IJZrOddVblCMfcxQ&amp;list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Love Babbar</h3>
            <p style={{ margin: 0, color: '#666' }}>Placement DSA Course</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=zb2QLGtDfd69LESa&amp;list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Apna College</h3>
            <p style={{ margin: 0, color: '#666' }}>DSA</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=-848xsEsAzegzKeh&amp;list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Gate Smashers</h3>
            <p style={{ margin: 0, color: '#666' }}>Database Management Systems</p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=RnbARiQ1vuERrs5Z&amp;list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Striver</h3>
            <p style={{ margin: 0, color: '#666' }}>Placement DSA </p>
          </div>
        </div>
        <div className="video-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '320px' }}>
          <iframe width="100%" height="180" src="https://www.youtube.com/embed/videoseries?si=Zu6u2FOEnL3pZD84&amp;list=PLfzBO7vcQZ1IMDUDXph5wB9csF-yYD4GC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <div style={{ padding: '15px', textAlign: 'left' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>Bharat Acharya</h3>
            <p style={{ margin: 0, color: '#666' }}>Microprocessors and Microconotrollers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lectures