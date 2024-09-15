import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VaccinationRecord = () => {
    const [children, setChildren] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChildrenProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/parent/child/children'); // Adjust the API endpoint if necessary
                if (response.data.success) {
                    setChildren(response.data.data);
                } else {
                    setError(response.data.message || 'Error fetching child profiles');
                }
            } catch (err) {
                setError('An error occurred while fetching data');
                console.error('Error fetching child profiles:', err);
            }
        };

        fetchChildrenProfiles();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Children's Vaccination Records</h1>
            {children.length === 0 ? (
                <p>No children profiles found.</p>
            ) : (
                <ul>
                    {children.map(child => (
                        <li key={child._id}>
                            <h2>{child.name}</h2>
                            <p>Email: {child.email}</p>
                            <p>Age: {child.age}</p>
                            <p>DOB: {new Date(child.dob).toLocaleDateString()}</p>
                            {/* Add more child details here as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VaccinationRecord;
