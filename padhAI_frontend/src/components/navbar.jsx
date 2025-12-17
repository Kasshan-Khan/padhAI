import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import padhAI_logo_white from "../assets/logo.png";
import padhAi_logo_color from "../assets/padhAI_logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

<<<<<<< HEAD
    return (
        <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="navbar-logo">
                <img src={padhAI_logo} alt="PadhAI Logo" className="navbar-logo-img"/>
            </div>
            <ul>
                {/* HOME (always visible) */}
                <li>
                    <div>
                        <Link className="dropdown-init" to="/">Home</Link>
                    </div>
                </li>
                
                

                {/* SHOW ONLY IF LOGGED IN */}
                {token && (
                    <>
                        <li>    
                            <div>
                                <Link className="dropdown-init" to="/todo">My Tasks</Link>
                            </div>
                        </li>
                        <li>
                            <div>
                                <Link className="dropdown-init" to="/jee">My Space</Link>
                            </div>
                        </li>

                        <li>
                            <div>
                                    <Link className="dropdown-init" to="/Ai">AI Tools</Link>
                            </div>
                        </li>
                    </>
                )}

                {/* AUTH SECTION */}
                <li>
                    <div className="dropdown">
                        {!token ? (
                            <>
                                {/* <Link
                                    to="/signup"
                                    className="dropdown-init"
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    Sign Up
                                </Link> */}
                                <Link
                                    to="/login"
                                    className="dropdown-init"
                                    style={{ textDecoration: "none" }}
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <p
                                className="dropdown-init"
                                style={{ cursor: "pointer" }}
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                        )}
                    </div>
                </li>
            </ul>
=======
  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <nav className="navbar">
      <div className="navContainer">
        <div className="navLogo">
          <img
            src={isHomePage ? padhAI_logo_white : padhAi_logo_color}
            alt="PadhAI Logo"
          />
>>>>>>> 4ff3205a2576207691e59a6c817992eeac9e4bca
        </div>
        <div className="navLinks">
          <Link to="/" className="navLink">
            Home
          </Link>
          {token && (
            <>
              <Link to="/short-notes" className="navLink">
                NotesMaker
              </Link>
              <Link to="/todo" className="navLink">
                My Tasks
              </Link>
              <Link to="/jee" className="navLink">
                My Space
              </Link>
            </>
          )}
          <button className="navCTA" onClick={handleLogout}>
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
