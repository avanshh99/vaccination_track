import React, { useState } from 'react';

const ScheduleViewer = () => {
  const [email, setEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    // TODO: Implement actual API call to search for the email
    // This is a mock implementation
    if (email === 'parent@example.com') {
      setSearchResult({
        name: 'John Doe',
        vaccine: 'COVID-19',
        age: '2',
        date: '2024-10-15',
        time: '10:00 AM',
        status: 'Scheduled',
        gender: "Male",
        relationshipWithParent: "Son",
        bloodGroup: "O+",
      });
      setError('');
    } else {
      setSearchResult(null);
      setError('No registration found for this email.');
    }
  };

  const handleMarkDone = () => {
    // TODO: Implement API call to mark the appointment as done
    setSearchResult(prev => ({ ...prev, status: 'Completed' }));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>View the Schedule</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Enter parent's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>
      
      {error && (
        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {searchResult && (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
          <h3 style={{ fontWeight: 'bold' }}>{searchResult.name}</h3>
          <p>Age: {searchResult.age}</p>
          <p>Gender: {searchResult.gender}</p>
          <p>Relationship: {searchResult.relationshipWithParent}</p>
          <p>Blood Group: {searchResult.bloodGroup}</p>
          <p>Vaccine: {searchResult.vaccine}</p>
          <p>Date: {searchResult.date}</p>
          <p>Time: {searchResult.time}</p>
          <p>Status: {searchResult.status}</p>
          {searchResult.status === 'Scheduled' && (
            <button 
              onClick={handleMarkDone}
              style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Mark as Done
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScheduleViewer;