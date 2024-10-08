import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { FaTimes, FaBars } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the nav
    const { token, setToken } = useContext(StoreContext);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const toggleNavbar = () => {
        setIsNavOpen(!isNavOpen); // Toggles the mobile menu
    };

    return (
        <div className="w-full bg-blue-900 text-white">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                    <img src='logo.png' alt="Health Guardian Logo" className="h-10 mr-2" /> {/* Adjust the path */}
                    <span className="text-2xl font-bold">Health Guardian</span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex space-x-6">
                    <Link to="/" className="hover:text-blue-200 transition-colors font-bold">Home</Link>
                    <Link to="/view" className="hover:text-blue-200 transition-colors font-bold">Child Details</Link>
                    <Link to="/postTechnician" className="hover:text-blue-200 transition-colors font-bold">Consultant</Link>
                    <Link to="/qa" className="hover:text-blue-200 transition-colors font-bold">Q&A</Link>
                    <Link to="/cp" className="hover:text-blue-200 transition-colors font-bold">Child Profile</Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button className="text-white" onClick={toggleNavbar}>
                        {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Desktop Profile/Login Button */}
                <div className="hidden lg:flex items-center">
                    {!token ? (
                        <button 
                            onClick={() => setShowLogin(true)} 
                            className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
                            Sign In
                        </button>
                    ) : (
                        <div className="relative">
                            <img src={assets.profile_icon} alt="Profile" className="h-10 w-10 rounded-full cursor-pointer" />
                            <ul className="absolute right-0 mt-2 w-48 bg-white text-blue-600 shadow-lg rounded-lg">
                                <li 
                                    onClick={logout} 
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100">
                                    <img src={assets.cross_icon} alt="Logout Icon" className="h-5 w-5 mr-2" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <nav className={`${isNavOpen ? "block" : "hidden"} lg:hidden flex flex-col items-center space-y-4 bg-blue-700 text-white p-4`}>
                <Link onClick={toggleNavbar} to="/" className="hover:text-blue-200">Home</Link>
                <Link onClick={toggleNavbar} to="/view" className="hover:text-blue-200">Child Details</Link>
                <Link onClick={toggleNavbar} to="/postTechnician" className="hover:text-blue-200">Consultant</Link>
                <Link onClick={toggleNavbar} to="/qa" className="hover:text-blue-200">Q&A</Link>
                <Link onClick={toggleNavbar} to="/cp" className="hover:text-blue-200">Child Profile</Link>
                {!token ? (
                    <button 
                        onClick={() => { toggleNavbar(); setShowLogin(true); }} 
                        className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors">
                        Sign In
                    </button>
                ) : (
                    <div className="relative">
                        <img src={assets.profile_icon} alt="Profile" className="h-10 w-10 rounded-full cursor-pointer" />
                        <ul className="absolute right-0 mt-2 w-48 bg-white text-blue-600 shadow-lg rounded-lg">
                            <li 
                                onClick={logout} 
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100">
                                <img src={assets.cross_icon} alt="Logout Icon" className="h-5 w-5 mr-2" />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
