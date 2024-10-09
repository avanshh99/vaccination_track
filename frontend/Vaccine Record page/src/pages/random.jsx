import React, { useState } from "react";

const VaccineRegisterForm = () => {
    // Vaccination Center States
    const [centerName, setCenterName] = useState("");
    const [centerLocation, setCenterLocation] = useState("");
    const [centerContact, setCenterContact] = useState("");
    const [centerEmail, setCenterEmail] = useState("");
    const [centerCity, setCenterCity] = useState("");
    const [centerState, setCenterState] = useState("");
    const [centerPostalCode, setCenterPostalCode] = useState("");
    const [centerLat, setCenterLat] = useState("");
    const [centerLng, setCenterLng] = useState("");
    const [centerWeekdays, setCenterWeekdays] = useState("");
    const [centerWeekends, setCenterWeekends] = useState("");
    const [centerCapacity, setCenterCapacity] = useState("");

    // Vaccine States (if you want them persisted too)
    const [vaccineName, setVaccineName] = useState("");
    const [vaccineType, setVaccineType] = useState("");
    const [vaccineManufacturer, setVaccineManufacturer] = useState("");
    const [vaccineDoseCount, setVaccineDoseCount] = useState("");
    const [vaccineStock, setVaccineStock] = useState("");
    const [vaccineExpiryDate, setVaccineExpiryDate] = useState("");
    const [vaccineDescription, setVaccineDescription] = useState("");

    const handleCenterSubmit = (e) => {
        e.preventDefault();
        // Handle vaccination center registration logic here
    };

    const handleVaccineSubmit = (e) => {
        e.preventDefault();
        // Handle vaccine addition logic here
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-2 gap-8">
                {/* Register Vaccination Center Form */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Register Vaccination Center</h2>
                    <form onSubmit={handleCenterSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Center Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerName}
                                onChange={(e) => setCenterName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded"
                                value={centerEmail}
                                onChange={(e) => setCenterEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerLocation}
                                onChange={(e) => setCenterLocation(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerCity}
                                onChange={(e) => setCenterCity(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">State</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerState}
                                onChange={(e) => setCenterState(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerPostalCode}
                                onChange={(e) => setCenterPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerContact}
                                onChange={(e) => setCenterContact(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Latitude</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={centerLat}
                                onChange={(e) => setCenterLat(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Longitude</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={centerLng}
                                onChange={(e) => setCenterLng(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Weekdays Operating Hours</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerWeekdays}
                                onChange={(e) => setCenterWeekdays(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Weekends Operating Hours</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={centerWeekends}
                                onChange={(e) => setCenterWeekends(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Capacity</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={centerCapacity}
                                onChange={(e) => setCenterCapacity(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-blue-600 rounded"
                        >
                            Register Center
                        </button>
                    </form>
                </div>

                {/* Add Vaccine Form */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Add Vaccine</h2>
                    <form onSubmit={handleVaccineSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Vaccine Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={vaccineName}
                                onChange={(e) => setVaccineName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Type</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={vaccineType}
                                onChange={(e) => setVaccineType(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Manufacturer</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={vaccineManufacturer}
                                onChange={(e) => setVaccineManufacturer(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Dose Count</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={vaccineDoseCount}
                                onChange={(e) => setVaccineDoseCount(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Stock</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={vaccineStock}
                                onChange={(e) => setVaccineStock(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Expiry Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={vaccineExpiryDate}
                                onChange={(e) => setVaccineExpiryDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="3"
                                value={vaccineDescription}
                                onChange={(e) => setVaccineDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-green-600 rounded"
                        >
                            Add Vaccine
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VaccineRegisterForm;
