import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import padhAI_logo from '../assets/padhAI_logo.png';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
                            <div className="dropdown">
                                <p className="dropdown-init">AI Tools</p>
                                <div className="dropdown-content">
                                    <Link to="/short-notes">Short Notes Generator</Link>
                                </div>
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
        </div>
    );
}

export default Navbar;
