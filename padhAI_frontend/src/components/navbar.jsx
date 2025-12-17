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
