import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const AddVaccinationCenter = () => {
    const { email } = useContext(StoreContext);
    const [centerData, setCenterData] = useState({
        phone: '',
        location: {
            address: '',
            city: '',
            state: '',
            postalCode: '',
            coordinates: {
                lat: '',
                lng: ''
            }
        },
        operatingHours: {
            weekdays: '',
            weekends: ''
        },
        capacity: '',
        availableVaccines: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('location') || name.includes('coordinates') || name.includes('operatingHours')) {
            const keys = name.split('.');
            setCenterData(prevState => {
                let updatedData = { ...prevState };
                keys.reduce((acc, key, idx) => {
                    if (idx === keys.length - 1) {
                        acc[key] = value;
                    }
                    return acc[key];
                }, updatedData);
                return updatedData;
            });
        } else {
            setCenterData({ ...centerData, [name]: value });
        }
    };

    const handleVaccineChange = (e) => {
        setCenterData({ ...centerData, availableVaccines: e.target.value.split(',') });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log("toekn"  ,token)
            const response = await axios.post(`http://localhost:5000/vaccine/center/create`, {
                email: email,
                ...centerData
            },
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": `Bearer ${token}`, 
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                setCenterData({
                    phone: '',
                    location: {
                        address: '',
                        city: '',
                        state: '',
                        postalCode: '',
                        coordinates: {
                            lat: '',
                            lng: ''
                        }
                    },
                    operatingHours: {
                        weekdays: '',
                        weekends: ''
                    },
                    capacity: '',
                    availableVaccines: []
                });
                onSave();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Error registering vaccination center');
        }
    };

    return (
        <div className="add-vaccination-center max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Register Vaccination Center</h2>
            <form onSubmit={handleSubmit} className="vaccination-center-form space-y-4">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={centerData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="location.address"
                        value={centerData.location.address}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="location.city"
                        value={centerData.location.city}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                        type="text"
                        name="location.state"
                        value={centerData.location.state}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        name="location.postalCode"
                        value={centerData.location.postalCode}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                    <input
                        type="text"
                        name="location.coordinates.lat"
                        value={centerData.location.coordinates.lat}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                    <input
                        type="text"
                        name="location.coordinates.lng"
                        value={centerData.location.coordinates.lng}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Operating Hours (Weekdays)</label>
                    <input
                        type="text"
                        name="operatingHours.weekdays"
                        value={centerData.operatingHours.weekdays}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Operating Hours (Weekends)</label>
                    <input
                        type="text"
                        name="operatingHours.weekends"
                        value={centerData.operatingHours.weekends}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Capacity</label>
                    <input
                        type="number"
                        name="capacity"
                        value={centerData.capacity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Available Vaccines (comma-separated)</label>
                    <input
                        type="text"
                        value={centerData.availableVaccines.join(', ')}
                        onChange={handleVaccineChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div> */}

                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-500 transition duration-200">
                    Register Center
                </button>
            </form>
        </div>

    );
};

export default AddVaccinationCenter;
