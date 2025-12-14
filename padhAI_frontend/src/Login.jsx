import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";

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
    <div className="loginsignup-container">
      <div className="loginsignup-header">
        <div className="loginsignup-text">Login</div>
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
  );
};

export default Login;
