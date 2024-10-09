import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import 'tailwindcss/tailwind.css';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 18,
    margin: 5,
    color: '#34495e',
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#7f8c8d',
  },
});

const BookingSlotPage = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [childName, setChildName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [fee, setFee] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slotAvailable, setSlotAvailable] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [vaccinationCenterEmail, setVaccinationCenterEmail] = useState(''); // State for center email
  const [userEmail, setUserEmail] = useState(''); // State for user email input

  // Dummy fee data
  const dummyVaccineFees = {
    Hepatitis: 499,
    // Add more dummy data as needed
  };

  useEffect(() => {
    // Fetch vaccination center email from the backend (dummy URL here)
    const fetchEmail = async () => {
      try {
        const response = await fetch('https://your-backend-url/api/vaccination-center/email'); // Replace with your backend URL
        const data = await response.json();
        setVaccinationCenterEmail(data.email);
      } catch (error) {
        console.error('Error fetching vaccination center email:', error);
      }
    };

    fetchEmail();
  }, []);

  const handleVaccineChange = (e) => {
    const name = e.target.value;
    setVaccineName(name);
    // Fetch fee based on vaccine name
    if (dummyVaccineFees[name]) {
      setFee(dummyVaccineFees[name]);
    } else {
      setFee(''); // Reset fee if not found
    }
  };

  const checkSlotAvailability = () => {
    // Check if all fields are filled before checking slot availability
    if (!vaccineName || !childName || !dob || !age || !fee || !selectedSlot) {
      alert('Please fill in all fields and select a slot before checking availability.');
      return; // Exit if any field is not filled
    }

    // Check for specific unavailable slots
    if (selectedSlot === '1:00 PM' || selectedSlot === '2:00 PM') {
      alert('No slot available for the selected time. Check other centers or slots. Thank you.');
      window.location.href = '/vaccine-center'; // Redirect to Vaccination Center
      return;
    } else {
      alert('Slot Available! Thank you.');
      setSlotAvailable(true);
    }
  };

  // Document component for PDF
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.section}>Vaccine: <Text style={styles.text}>{vaccineName}</Text></Text>
        <Text style={styles.section}>Child Name: <Text style={styles.text}>{childName}</Text></Text>
        <Text style={styles.section}>DOB: <Text style={styles.text}>{dob}</Text></Text>
        <Text style={styles.section}>Age: <Text style={styles.text}>{age}</Text></Text>
        <Text style={styles.section}>Fee: <Text style={styles.text}>₹{fee}</Text></Text>
        <Text style={styles.section}>Selected Slot: <Text style={styles.text}>{selectedSlot}</Text></Text>
        <Text style={styles.section}>Vaccination Center Email: <Text style={styles.text}>{vaccinationCenterEmail}</Text></Text>
        <Text style={styles.footer}>Thank you for booking!</Text>
      </Page>
    </Document>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!slotAvailable) {
      return; // Do not proceed if the slot is not available
    }

    alert('Booking confirmed!');
    setBookingConfirmed(true); // Set booking as confirmed
    setTimeout(() => {
      // Redirect to vaccination center after 4 seconds
      window.location.href = '/vaccination-center';
    }, 4000);
  };

  return (
    <div className="max-w-md mx-auto p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Booking Slot Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Vaccine Name:</label>
          <input
            type="text"
            value={vaccineName}
            onChange={handleVaccineChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Child's Name:</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Fee:</label>
          <input
            type="text"
            value={fee}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Center Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Choose Slot:</label>
          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select a time slot</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
          </select>
          <button
            type="button"
            onClick={checkSlotAvailability}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            <FaCheckCircle className="inline" /> Check Slot Availability
          </button>
        </div>

        <button
          type="submit"
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${!slotAvailable ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={!slotAvailable} // Disable button if slot is not available
        >
          Confirm Booking
        </button>

        {bookingConfirmed && ( // Only show download link if booking is confirmed
          <PDFDownloadLink
            document={<MyDocument />}
            fileName="Booking_Certificate.pdf"
            style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}
          >
            {({ loading }) => (loading ? 'Loading PDF...' : 'Download Certificate')}
          </PDFDownloadLink>
        )}
      </form>
    </div>
  );
};

export default BookingSlotPage;
