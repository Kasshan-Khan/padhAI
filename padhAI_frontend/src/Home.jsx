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
