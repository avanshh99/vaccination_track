import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AddVaccinationCenter from './AddVaccinationCenter';
import VaccinationSidebar from './VaccinationSidebar';
import './VaccinationMain.css';
const VaccinationMain = () => {
    return (
        <>
            <div className="vaccination-app">
                <VaccinationSidebar />
                <Routes>
                    <Route path="/add-vaccination-center" element={<AddVaccinationCenter />}></Route>
                </Routes>
            </div>
        </>
    )
}

export default VaccinationMain
