import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const Space = () => {
  const location = useLocation();
  const [domain, setDomain] = useState("My");

  useEffect(() => {
    const userDomain = localStorage.getItem("userDomain");
    if (userDomain) {
      // Capitalize first letter and lowercase the rest for better aesthetics
      const formattedDomain = userDomain.charAt(0).toUpperCase() + userDomain.slice(1).toLowerCase();
      setDomain(formattedDomain);
    }
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden transition-colors duration-500">
      
      {/* Background Complex Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000 z-0 pointer-events-none"></div>

      {/* Hero Title */}
      <div className="text-center mb-10 z-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-base-content drop-shadow-md tracking-tight">
          {domain} <span className="text-primary relative inline-block">
             Space
             {/* Glowing underline */}
             <div className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 blur-sm rounded-full"></div>
          </span>
        </h1>
        <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
          Your personalized hub for top lectures, verified educators, and interactive practice questions tailored for {domain}.
        </p>
      </div>

      {/* Floating Pill Navigation */}
      <div className="sticky top-[80px] z-40 mb-10 animate-fade-in-up animation-delay-200">
        <div className="bg-base-100/60 backdrop-blur-2xl p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-base-300/80 flex gap-1 relative overflow-hidden group">
          {/* Subtle moving glow inside navbar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0"></div>
          
          <NavLink
            to="lectures"
            className={({ isActive }) => `relative z-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${isActive ? 'bg-primary text-primary-content shadow-[0_0_15px_rgba(16,97,45,0.4)]' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
          >
            📺 Lectures
          </NavLink>
          <NavLink
            to="teachers"
            className={({ isActive }) => `relative z-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${isActive ? 'bg-primary text-primary-content shadow-[0_0_15px_rgba(16,97,45,0.4)]' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
          >
            👨‍🏫 Teachers
          </NavLink>
          <NavLink
            to="questions"
            className={({ isActive }) => `relative z-10 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${isActive ? 'bg-primary text-primary-content shadow-[0_0_15px_rgba(16,97,45,0.4)]' : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'}`}
          >
            📝 Questions
          </NavLink>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl z-10">
        <Outlet />
      </div>

    </div>
  )
}

export default Space