import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import { FaTimes, FaBars } from 'react-icons/fa';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the nav
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State to manage profile dropdown
  const { token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen); // Toggles the mobile menu
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen); // Toggles the profile dropdown
  };

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-blue-900 text-white z-50 shadow-lg">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <img
              src="logo.png"
              alt="Health Guardian Logo"
              className="h-10 mr-2"
            />{' '}
            {/* Adjust the path */}
            <span className="text-2xl font-bold">Health Guardian</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6">
            <Link
              to="/home"
              className="hover:text-blue-200 transition-colors font-bold"
            >
              Home
            </Link>
            <Link
              to="/parent/view"
              className="hover:text-blue-200 transition-colors font-bold"
            >
              Child Details
            </Link>
            <Link
              to="/vaccine-center"
              className="hover:text-blue-200 transition-colors font-bold"
            >
              Vaccination Center
            </Link>
            <Link
              to="/chatbot"
              className="hover:text-blue-200 transition-colors font-bold"
            >
              Q&A
            </Link>
            <Link
              to="/parent/cp"
              className="hover:text-blue-200 transition-colors font-bold"
            >
              Child Profile
            </Link>
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
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
              >
                Sign In
              </button>
            ) : (
              <div className="relative">
                <img
                  src={assets.profile_icon}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={toggleProfileDropdown}
                />
                {isProfileOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-blue-600 shadow-lg rounded-lg">
                    <li
                      onClick={logout}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      <img
                        src={assets.cross_icon}
                        alt="Logout Icon"
                        className="h-5 w-5 mr-2"
                      />
                      <p>Logout</p>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <nav
          className={`${
            isNavOpen ? 'block' : 'hidden'
          } lg:hidden flex flex-col items-center space-y-4 bg-blue-700 text-white p-4`}
        >
          <Link to="/home" className="hover:text-blue-200 transition-colors font-bold">
            Home
          </Link>
          <Link to="/parent/view" className="hover:text-blue-200 transition-colors font-bold">
            Child Details
          </Link>
          <Link to="/vaccine-center" className="hover:text-blue-200 transition-colors font-bold">
            Vaccination Center
          </Link>
          <Link to="/chatbot" className="hover:text-blue-200 transition-colors font-bold">
            Q&A
          </Link>
          <Link to="/parent/cp" className="hover:text-blue-200 transition-colors font-bold">
            Child Profile
          </Link>
          {!token ? (
            <button
              onClick={() => {
                toggleNavbar();
                setShowLogin(true);
              }}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={toggleProfileDropdown}
              />
              {isProfileOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-blue-600 shadow-lg rounded-lg">
                  <li
                    onClick={logout}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    <img src={assets.cross_icon} alt="Logout Icon" className="h-5 w-5 mr-2" />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* Page Content */}
      <div className="pt-20"> {/* Adjust padding-top based on navbar height */}
        {/* Your main content here */}
        <h1></h1>
      </div>
    </>
  );
};

export default Navbar;
