import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import bankuLogo from './assets/banku_logo.png';
import padhAI_logo from './assets/padhAI_logo.png';
import GoogleLoginButton from './components/GoogleLoginButton';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          goal
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      alert("Signup successful 🎉");
      navigate("/login"); 

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex justify-center items-center pt-24 pb-12 px-4 overflow-hidden">
      {/* Outer green container replacing loginsignup-outer-container-signup-container */}
      <motion.div 
        className="bg-secondary/40 backdrop-blur-lg rounded-3xl w-full max-w-5xl shadow-2xl p-8 lg:p-12 border border-secondary/50 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        
        {/* Left Side: Mascot and Welcome Text */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          <div className="flex flex-row items-center justify-center gap-4 mb-4">
            <p className="font-serif text-4xl lg:text-5xl text-base-content drop-shadow-md leading-none" style={{ fontFamily: '"Leckerli One", cursive' }}>Welcome to</p>
            <img src={padhAI_logo} alt="padhAI" className="h-16 lg:h-20 object-contain drop-shadow-md mt-4 lg:mt-6" />
          </div>
          <motion.img 
            src={bankuLogo} 
            alt="Banku Mascot" 
            className="w-56 lg:w-[300px] object-contain drop-shadow-2xl" 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        {/* Right Side: Form Container */}
        <motion.div 
          className="w-full max-w-sm flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-full flex flex-col items-center mb-6">
            <div className="w-16 h-1 bg-primary rounded-full mb-4"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="w-full">
              <input 
                type="text" 
                placeholder="Name" 
                className="input input-lg w-full rounded-full bg-base-200/80 border-none shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg placeholder:text-base-content/60" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="w-full">
              <input 
                type="email" 
                placeholder="Email Id" 
                className="input input-lg w-full rounded-full bg-base-200/80 border-none shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg placeholder:text-base-content/60" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="w-full">
              <input 
                type="password" 
                placeholder="Password" 
                className="input input-lg w-full rounded-full bg-base-200/80 border-none shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg placeholder:text-base-content/60" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="w-full">
              <select 
                className="select select-lg w-full rounded-full bg-base-200/80 border-none shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/30 text-lg text-base-content/70"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              >
                <option value="" disabled>Domain</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="ENGINEERING">Engineering</option>
              </select>
            </div>
            
            <div className="w-full flex justify-center mt-4">
              <button type="submit" className="btn btn-primary btn-lg rounded-full w-[220px] font-bold text-lg shadow-lg hover:-translate-y-1 transition-all border-none">
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-base-content/70 font-medium text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-base-content font-bold hover:underline">
              Login here
            </Link>
          </p>

          <div className="mt-4 w-full">
            <GoogleLoginButton />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Signup;