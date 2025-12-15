import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './JEE.css'

const JEE = () => {
  return (
    <div className="jee-wrapper">
      {/* Secondary Navbar */}
      <div className="jee-navbar" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
        padding: '20px', 
        backgroundColor: '#e9ecef',
        marginBottom: '20px'
      }}>
        <NavLink 
          to="lectures" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#ffffffff' : 'black', 
            fontSize: '1.2rem', 
            fontWeight: '600', 
            margin: 'auto',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: isActive ? '#10612D' : 'transparent',
            transition: 'background-color 0.3s'
          })}
        >
          Lectures
        </NavLink>
        <NavLink 
          to="teachers" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#ffffffff' : 'black', 
            fontSize: '1.2rem', 
            fontWeight: '600', 
            margin: 'auto',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: isActive ? '#10612D' : 'transparent',
            transition: 'background-color 0.3s'
          })}
        >
          Teachers
        </NavLink>
        <NavLink 
          to="questions" 
          style={({ isActive }) => ({ 
            textDecoration: 'none', 
            color: isActive ? '#ffffffff' : 'black', 
            fontSize: '1.2rem', 
            fontWeight: '600', 
            margin: 'auto',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: isActive ? '#10612D' : 'transparent',
            transition: 'background-color 0.3s'
          })}
        >
          Questions
        </NavLink>
      </div>

      {/* Content Area */}
      <div className="jee-content-area" style={{ padding: '0 20px' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default JEE