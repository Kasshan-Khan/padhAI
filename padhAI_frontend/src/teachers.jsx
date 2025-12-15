import React from 'react'
import './JEE.css'
import gajendra from './assets/teachers/gajendra.webp'
import shraddha from './assets/teachers/shraddha.webp'
import varun from './assets/teachers/varun.webp'
import chaiorcode from './assets/teachers/chaiorcode.jpg'
import lovebabbar from './assets/teachers/lovebabbar.webp'
import pradeepgiri from './assets/teachers/pradeepgiri.jpeg'
import striver from './assets/teachers/striver.jpg'
import bharatacharya from './assets/teachers/bharatacharya.jpeg'

const Teachers = () => {
  return (
    <div className="study-section-content" style={{ textAlign: 'center' }}>
      {/* <h2>Popular Channels</h2> */}
      <div className="channels-grid" style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <a href="https://www.youtube.com/@gajendrapurohit" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={gajendra} alt="Gajendra Sir" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Gajendra Purohit</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@pradeepgiriacademy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={pradeepgiri} alt="Pradeep Giri" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Pradeep Giri</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@chaiaurcode" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={chaiorcode} alt="Chai or Code" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Chai aur Code</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@codehelp" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={lovebabbar} alt="Love Babbar" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Love Babbar</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@ApnaCollegeOfficial" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={shraddha} alt="Shraddha Ma'am" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Shraddha Khapra</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@gatesmashers" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={varun} alt="Varun Sir" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Gate Smashers</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@striver" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={striver} alt="Striver" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Striver</h3>
            </div>
          </div>
        </a>
        <a href="https://www.youtube.com/@bharatacharya" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="channel-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', width: '280px', display: 'flex', flexDirection: 'column' }}>
            <img src={bharatacharya} alt="Bharat Acharya" style={{ width: '100%', height: '250px', objectFit: "cover" }} />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0', color: '#333', fontSize: '1.2rem' }}>Bharat Acharya</h3>
            </div>
          </div>
        </a>
        
      </div>
    </div>
  )
}

export default Teachers