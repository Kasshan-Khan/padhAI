import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const token = localStorage.getItem("token");

  const features = [
    {
      title: "JEE Prep",
      description: "Comprehensive study materials and roadmaps for JEE aspirants.",
      link: "/jee",
      color: "#FF6B6B"
    },
    {
      title: "Short Notes",
      description: "Generate concise summaries from your documents instantly.",
      link: "/short-notes",
      color: "#4ECDC4"
    },
    {
      title: "Video Summarizer",
      description: "Turn long YouTube lectures into quick readable notes.",
      link: "/video-input",
      color: "#45B7D1"
    },
    {
      title: "Quiz Generator",
      description: "Test your knowledge with AI-generated quizzes.",
      link: "/jee",
      color: "#96CEB4"
    },
    {
      title: "Task Manager",
      description: "Keep track of your study goals and daily tasks.",
      link: "/todo",
      color: "#FF9F43"
    }
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to <span className="brand-name">padhAI</span></h1>
        <p>Your intelligent companion for smarter, faster learning.</p>
        {!token && <Link to="/signup"><button className="cta-btn">Get Started</button></Link>}
      </div>

      <div className="features-scroll-section">
        <h2>Explore Features</h2>
        <div className="horizontal-scroll-container">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="feature-card-link">
              <div className="feature-card" style={{ borderTop: `5px solid ${feature.color}` }}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </Link>
          ))}
          {/* Duplicate for visual length if needed, or add more features */}
          <div className="feature-card placeholder-card">
            <h3>More Coming Soon</h3>
            <p>Stay tuned for new AI tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
