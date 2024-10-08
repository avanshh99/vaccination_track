import React, { useEffect, useState } from 'react';
import './HealthcareCenters.css';
import axios from 'axios';


const vaccines = [
    { name: 'BCG', quantity: Math.floor(Math.random() * 100) },
    { name: 'DTP', quantity: Math.floor(Math.random() * 100) },
    { name: 'Hepatitis B', quantity: Math.floor(Math.random() * 100) },
    { name: 'Polio', quantity: Math.floor(Math.random() * 100) },
    { name: 'MMR', quantity: Math.floor(Math.random() * 100) },
    { name: 'Pneumococcal', quantity: Math.floor(Math.random() * 100) },
    { name: 'HPV', quantity: Math.floor(Math.random() * 100) },
];

const HealthcareCenters = () => {
    const [visibleCenter, setVisibleCenter] = useState(null);
    const [visibleDetails, setVisibleDetails] = useState(null);
    const [healthcareCenters, setHealthcareCenters] = useState([]);

    const toggleVaccineList = (centerIndex) => {
        if (visibleCenter === centerIndex) {
            setVisibleCenter(null);
        } else {
            setVisibleCenter(centerIndex);
        }
    };

    const toggleDetails = (centerIndex) => {
        if (visibleDetails === centerIndex) {
            setVisibleDetails(null);
        } else {
            setVisibleDetails(centerIndex);
        }
    };

    useEffect(() => {
        const fetchHealthCareCenters = async () => {
            try {
                const response = await axios.get('http://localhost:5000/vaccine/center/get-vaccination-center');
                setHealthcareCenters(response.data.data);
            } catch (error) {
                console.log('Error Fetching data ', error);
            }
        }
        fetchHealthCareCenters();
    }, []);

    return (
        <div>
            <h1 className="center-list-heading">Vaccination Center List</h1>
            <div className="grid-container">
                {healthcareCenters.map((center, index) => (
                    <div key={index} className="healthcare-card">
                        <img src="../../public/carousel3.jpg" alt={center.name} />
                        <h3>{center.name}</h3>
                        <button
                            className="check-vaccine-btn"
                            onClick={() => toggleVaccineList(index)}
                        >
                            Check Vaccine Quantity
                        </button>
                        {visibleCenter === index && (
                            <div className="vaccine-quantity-list">
                                <h4>Vaccine Quantities at {center.name}</h4>
                                {vaccines.map((vaccine, i) => (
                                    <p key={i}>
                                        {vaccine.name}: {vaccine.quantity} doses left
                                    </p>
                                ))}
                            </div>
                        )}
                        <button
                            className="view-details-btn"
                            onClick={() => toggleDetails(index)}
                        >
                            View Details
                        </button>
                        {visibleDetails === index && (
                            <div className="details-list">
                                <h4>Contact Info</h4>
                                <p>Phone: {center.phone}</p>
                                <p>Address: {center.location.address}, {center.location.city}, {center.location.state}, {center.location.postalCode}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthcareCenters;
