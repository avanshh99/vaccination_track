import React from 'react'
import { Routes, Route } from 'react-router-dom';
import VaccinationSidebar from './VaccinationSidebar';
import './VaccinationMain.css';
import AddVaccinationCenterUser from './AddVaccinationCenterUser';
const VaccinationMain = () => {
    return (
        <>
            <div className="vaccination-app">
                <VaccinationSidebar />
                <Routes>
                    <Route path="/add-vaccination-center" element={<AddVaccinationCenterUser />}></Route>
                </Routes>
            </div>
        </>
    )
}

export default VaccinationMain
