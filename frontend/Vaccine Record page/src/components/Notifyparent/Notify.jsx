import React, { useState, useEffect } from 'react';

const Notify = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [vaccines, setVaccines] = useState([]);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call to fetch available vaccines
    setVaccines(['COVID-19', 'Polio', 'MMR', 'DPT']);
  }, []);

  const fetchRecipients = (vaccine) => {
    // TODO: Replace with actual API call to fetch recipients for the selected vaccine
    const mockRecipients = [
      { email: 'parent1@example.com', childName: 'Child 1' },
      { email: 'parent2@example.com', childName: 'Child 2' },
      { email: 'parent3@example.com', childName: 'Child 3' },
    ];
    setRecipients(mockRecipients);
  };

  const handleVaccineChange = (e) => {
    const vaccine = e.target.value;
    setSelectedVaccine(vaccine);
    if (vaccine) {
      fetchRecipients(vaccine);
    } else {
      setRecipients([]);
    }
  };

  const handleNotifyParents = () => {
    // TODO: Implement actual API call to send notification emails
    if (notificationMessage.trim() !== '' && selectedVaccine && recipients.length > 0) {
      setNotificationStatus(`Notification sent successfully to ${recipients.length} recipients for ${selectedVaccine} vaccine!`);
      // In a real implementation, you would send emails here
      console.log(`Sending notification for ${selectedVaccine}: ${notificationMessage}`);
      console.log(`Recipients: ${recipients.map(r => r.email).join(', ')}`);
      setNotificationMessage('');
    } else {
      setNotificationStatus('Please select a vaccine, ensure there are recipients, and enter a notification message.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
      <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Notify Parents</h3>
      <select 
        value={selectedVaccine} 
        onChange={handleVaccineChange}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}
      >
        <option value="">Select a vaccine</option>
        {vaccines.map(vaccine => (
          <option key={vaccine} value={vaccine}>{vaccine}</option>
        ))}
      </select>
      {recipients.length > 0 && (
        <p style={{ marginBottom: '0.5rem' }}>
          Recipients: {recipients.length} parents of children registered for {selectedVaccine}
        </p>
      )}
      <textarea
        placeholder="Enter notification message..."
        value={notificationMessage}
        onChange={(e) => setNotificationMessage(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}
        rows="4"
      />
      <button 
        onClick={handleNotifyParents}
        style={{ padding: '0.5rem 1rem', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Send Notification
      </button>
      {notificationStatus && (
        <p style={{ marginTop: '0.5rem', color: notificationStatus.includes('successfully') ? '#28a745' : '#dc3545' }}>
          {notificationStatus}
        </p>
      )}
    </div>
  );
};

export default Notify;