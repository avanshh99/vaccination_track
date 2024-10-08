import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import ChildProfile from './components/ChildProfile/ChildProfile';
import VaccinationRecord from './components/ParentProfile/VaccinationRecord/VaccinationRecord';
import SideBar from "./components/Sidebar/SideBar"; // Import the Sidebar
import VaccineRegisterForm from './components/VaccineRegisterForm/VaccineRegisterForm';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <div style={{ display: 'flex' }}>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/view" element={<VaccinationRecord />} />
              <Route path="/cp/*" element={<ChildProfile />} />
              <Route path="/vaccine-register" element={<VaccineRegisterForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
