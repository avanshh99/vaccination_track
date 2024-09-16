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
function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/view" element={<VaccinationRecord />}></Route>
          <Route path="/cp/*" element={<ChildProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
