import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import bankuLogo from './assets/banku_logo.png';
import padhAI_logo from './assets/padhAI_logo.png';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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
      navigate("/login"); // redirect after signup

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className='mainContainer'>
      <div className="loginsignup-outer-container-signup-container">
      <div className="banku banku-logo">
        <div className='logo-abc'>
          <p className="text_ab_ab_sngup">Welcome to</p>
          <img id = "abc1" src={padhAI_logo} alt="padhAI"/>
        </div>
        <img src={bankuLogo} alt="banku" border="0" className='bankuLogo'/>
      </div>
      <div className="banku banku-form">
        <div className='loginsignup-container'>
          <div className="loginsignup-header">
            <div className="loginsignup-text">  
            </div>
            <div className="loginsignup-underline"></div>
          </div>

          {/* IMPORTANT: onSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="loginsignup-inputs">

              <div className="loginsignup-input">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="loginsignup-input">
                <input
                  type="email"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="loginsignup-input">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="loginsignup-input">
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
<<<<<<< HEAD
                  <option value="" disabled>Select Goal</option>
                  {/* <option value="JEE">JEE</option>
                  <option value="NEET">NEET</option> */}
=======
                  <option value="" disabled>Domain</option>
>>>>>>> 4ff3205a2576207691e59a6c817992eeac9e4bca
                  <option value="ENGG.">Engineering</option>
                </select>
              </div>

            </div>

            <div className="loginsignup-submit-container">
              <button type="submit" className="loginsignup-submit">
                Sign Up
              </button>
            </div>
          </form>

          <div className="loginsignup-toggle">
            <p>
              Already have an account?
              <Link to="/login"><span> Login here</span></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;