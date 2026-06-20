import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col pt-16 relative overflow-hidden transition-colors duration-500">
      
      {/* Hyper-Complex Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-base-100 to-base-200 z-0"></div>
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/40 rounded-full mix-blend-screen filter blur-[150px] opacity-70 animate-blob z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-primary/30 rounded-full mix-blend-screen filter blur-[150px] opacity-60 animate-blob animation-delay-2000 z-0"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-accent/20 rounded-full mix-blend-screen filter blur-[180px] opacity-80 animate-blob animation-delay-4000 z-0"></div>

      {/* Subtle Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 opacity-50"></div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 z-10">
        
        <div className="text-center max-w-4xl flex flex-col items-center gap-8">
          <div className="badge badge-primary badge-outline mb-4 animate-bounce bg-base-100/50 backdrop-blur-sm px-4 py-3 h-auto shadow-sm">
            ✨ Your AI-Powered Learning Space
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-base-content drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] font-serif">
            Stop Reading. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary drop-shadow-[0_0_25px_rgba(16,97,45,0.5)]">
              Start Understanding.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-base-content/80 max-w-2xl leading-relaxed">
            Upload your textbooks, notes, or essays. padhAI reads them instantly
            and builds a personalized study plan, infinite quizzes, and a 24/7
            AI tutor—just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button 
              className="btn btn-primary btn-lg rounded-full shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all border-none px-10 text-lg"
              onClick={() => navigate('/signup')}
            >
              Start Learning for Free
            </button>
            <button 
              className="btn btn-outline btn-lg rounded-full shadow-md bg-base-100/80 backdrop-blur-md hover:-translate-y-1 transition-all px-10 text-lg"
              onClick={() => navigate('/short-notes')}
            >
              Try Notes Maker
            </button>
          </div>

          <p className="text-sm text-base-content/60 mt-6 flex items-center gap-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary"><path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" /></svg>
            Private & Secure • No Credit Card Required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200/50 backdrop-blur-sm z-10 border-t border-base-300/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-serif text-base-content drop-shadow-sm">Why Students Love padhAI</h2>
            <p className="text-xl text-base-content/70">Smart tools designed to supercharge your learning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100/60 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-base-300 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(16,97,45,0.2)] hover:border-primary/50 transition-all duration-500 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="card-body items-center text-center p-8">
                <div className="w-20 h-20 rounded-[2rem] bg-secondary/20 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">📝</div>
                <h3 className="card-title text-2xl font-extrabold mb-2">AI Notes Maker</h3>
                <p className="text-base-content/70 mt-2 font-medium">Paste any YouTube lecture link and get concise, AI-generated summaries in seconds. Study smarter, not harder.</p>
              </div>
            </div>

            <div className="card bg-base-100/60 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-base-300 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(16,97,45,0.2)] hover:border-primary/50 transition-all duration-500 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="card-body items-center text-center p-8">
                <div className="w-20 h-20 rounded-[2rem] bg-primary/20 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">⏱️</div>
                <h3 className="card-title text-2xl font-extrabold mb-2">Smart Study Planner</h3>
                <p className="text-base-content/70 mt-2 font-medium">AI-powered Pomodoro schedules and Eisenhower priority matrices built around your goals and available time.</p>
              </div>
            </div>

            <div className="card bg-base-100/60 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-base-300 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(16,97,45,0.2)] hover:border-primary/50 transition-all duration-500 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="card-body items-center text-center p-8">
                <div className="w-20 h-20 rounded-[2rem] bg-accent/20 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">🤖</div>
                <h3 className="card-title text-2xl font-extrabold mb-2">Banku AI Tutor</h3>
                <p className="text-base-content/70 mt-2 font-medium">Your 24/7 AI study buddy. Ask Banku anything — concepts, formulas, study tips — and get clear, friendly answers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content mt-auto z-10">
        <aside>
          <div className="flex gap-4 font-bold text-lg mb-4">
            <Link to="/signup" className="link link-hover text-primary">Get Started</Link>
            <Link to="/short-notes" className="link link-hover text-primary">Notes Maker</Link>
            <Link to="/login" className="link link-hover text-primary">Login</Link>
          </div>
          <p className="opacity-70">Copyright © {new Date().getFullYear()} - padhAI. Built with ❤️ for students.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
