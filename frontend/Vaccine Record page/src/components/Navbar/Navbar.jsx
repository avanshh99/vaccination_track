import React, { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js'
import { FaTimes, FaBars } from 'react-icons/fa';
import './Navbar.css';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const navRef = useRef();
    const { token, setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const showNavbar = () => {
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-logo-left">
                Health Guardian
            </div>

            <nav ref={navRef} className="navbar-menu">
                <li><Link onClick={showNavbar} to="/">Home</Link></li>
                <li><Link onClick={showNavbar} to="/view">Child-details</Link></li>
                <li><Link onClick={showNavbar} to="/postTechnician">Consultant</Link></li>
                <li><Link onClick={showNavbar} to="/qa">Q&A</Link></li>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
            <div className="navbar-right">
                {!token ? (
                    <button onClick={() => { setShowLogin(true); }}>Sign In</button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className="dropdown">
                            <li onClick={logout}><img src={assets.cross_icon} alt="Logout Icon" /><p>Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
