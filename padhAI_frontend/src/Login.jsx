import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import bankuLogo from "./assets/banku_logo.png";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      // 🔽 🔽 🔽 THIS IS WHERE 🔽 🔽 🔽
      localStorage.setItem("token", data.token);
      navigate("/jee");
      // 🔼 🔼 🔼 END 🔼 🔼 🔼

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <>
      <div className="loginsignup-outer-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
        <div className="banku" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <div className="text_ab_ab_sngup" style={{ marginBottom: '20px' }}>Login</div>
          <img src={bankuLogo} alt="banku" border="0" className='bankuLogo' style={{ maxWidth: '300px', height: 'auto' }}/>
        </div>
        <div className="banku" style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <div className="loginsignup-container" style={{ width: '100%', maxWidth: '400px' }}>
            <div className="loginsignup-header">
              <div className="loginsignup-text">  
              </div>
              <div className="loginsignup-underline"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="loginsignup-inputs">
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
              </div>

              <div className="loginsignup-submit-container">
                <button type="submit" className="loginsignup-submit">
                  Login
                </button>
              </div>
            </form>

            <div className="loginsignup-toggle">
              <p>
                Don’t have an account?
                <Link to="/signup"><span> Sign Up here</span></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};

export default Login;
