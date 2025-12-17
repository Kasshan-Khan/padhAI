import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from './components/navbar';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import image3 from './assets/images/image3.jpg';
import image4 from './assets/images/image4.jpg';
import image5 from './assets/images/image5.jpg';
import image6 from './assets/images/image6.jpg';

const Home = () => {
<<<<<<< HEAD
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

=======
>>>>>>> 4ff3205a2576207691e59a6c817992eeac9e4bca
  return (
    <div>
      <Navbar />
      <section className="hero">
        <div style={{width: "30%"}}></div>
        <div className="heroGrid">
          <div className="heroContent">
            <h1 className="headline">
              Stop Reading.
              <br />
              Start Understanding.
            </h1>

            {/* <p className="subheadline">
              Upload your textbooks, notes, or essays. padhAi reads them instantly
              and builds a personalized study plan, infinite quizzes, and a 24/7
              AI tutor—just for you.
            </p> */}

            <div className="ctaGroup">
              <button className="primaryCTA" onClick={() => console.log('Start Learning clicked')}>Start Learning for Free</button>
              <button className="secondaryCTA" onClick={() => console.log('Watch Demo clicked')}>Watch Demo</button>
            </div>

            <p className="trustBadge">
              🔒 Private & Secure • No Credit Card Required
            </p>
          </div>
        </div>
      </section>
      {/* Background slideshow */}
      <div className="slideshowWrapper">
        <div className="slideshow">
          <img src={image1} alt="Upload study material" />
          <img src={image2} alt="AI explanation view" />
          <img src={image3} alt="Quiz generation" />
          <img src={image4} alt="AI tutor chat" />
          <img src={image5} alt="AI tutor chat" />
          <img src={image6} alt="AI tutor chat" />
          {/* Duplicate for seamless loop */}
          <img src={image1} alt="Upload study material" />
          <img src={image2} alt="AI explanation view" />
          <img src={image3} alt="Quiz generation" />
          <img src={image4} alt="AI tutor chat" />
          <img src={image5} alt="AI tutor chat" />
          <img src={image6} alt="AI tutor chat" />
        </div>
      </div>
    </div>
  );
};

export default Home;
