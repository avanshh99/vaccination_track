import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './VaccinationRecord.css';

const VaccinationRecord = () => {

  const [vaccines, setVaccines] = useState([
    { name: 'BCG', type: 'Live attenuated', doseInfo: '0.1ml', price: '$20', schedule: 'At birth', administered: false },
    { name: 'DTP', type: 'Inactivated', doseInfo: '0.5ml', price: '$25', schedule: '2, 4, 6 months', administered: false },
    { name: 'Hepatitis B', type: 'Subunit', doseInfo: '0.5ml', price: '$30', schedule: 'Birth, 1, 6 months', administered: true },
    { name: 'Polio', type: 'Oral', doseInfo: '2 drops', price: '$10', schedule: '2, 4, 6 months', administered: false },
    { name: 'MMR', type: 'Live attenuated', doseInfo: '0.5ml', price: '$35', schedule: '12-15 months', administered: false },
    { name: 'Pneumococcal', type: 'Conjugate', doseInfo: '0.5ml', price: '$40', schedule: '2, 4, 6 months', administered: true },
    { name: 'HPV', type: 'Virus-like particle', doseInfo: '0.5ml', price: '$45', schedule: '11-12 years', administered: false },
  ]);

  const childInfo = {
    fullName: 'Kshitij Hundre',
    gender: 'Male',
    age: 10,
    parentName: 'Maruti Hundre ',
    uid: '15131294',
  };

  const administeredVaccines = vaccines.filter(vaccine => vaccine.administered).length;
  const totalVaccines = vaccines.length;
  const vaccineData = {
    labels: ['Administered', 'Pending'],
    datasets: [
      {
        label: 'Vaccination Status',
        data: [administeredVaccines, totalVaccines - administeredVaccines],
        backgroundColor: ['#4CAF50', '#FF5722'],
        hoverBackgroundColor: ['#45a049', '#e64a19'],
      },
    ],
  };

  return (
    <div className="vaccination-record-container">
      <h1>Child Vaccination Record</h1>
      <div className="child-info">
        <h2>Child's Information</h2>
        <p><strong>Full Name:</strong> {childInfo.fullName}</p>
        <p><strong>Gender:</strong> {childInfo.gender}</p>
        <p><strong>Age:</strong> {childInfo.age}</p>
        <p><strong>Parent's Name:</strong> {childInfo.parentName}</p>
        <p><strong>Unique ID (UID):</strong> {childInfo.uid}</p>
      </div>

      <h2>Vaccination Record</h2>
      <table className="vaccination-table">
        <thead>
          <tr>
            <th>Vaccine Name</th>
            <th>Details</th>
            <th>Vaccine Administered</th>
            <th>Vaccine Pending</th>
            <th>Book Appointment / Show Certificate</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine, index) => (
            <tr key={index}>
              <td>{vaccine.name}</td>
              <td>
                <button onClick={() => alert(`
                Name: ${vaccine.name}
                Type: ${vaccine.type}
                Dosage: ${vaccine.doseInfo}
                Price: ${vaccine.price}
                Schedule: ${vaccine.schedule}
                `)}>Details</button>
              </td>
              <td style={{ color: vaccine.administered ? 'green' : 'gray' }}>
                {vaccine.administered ? 'Yes' : 'No'}
              </td>
              <td style={{ color: vaccine.administered ? 'gray' : 'red' }}>
                {vaccine.administered ? 'No' : 'Yes'}
              </td>
              <td>
                {vaccine.administered ? (
                  <button className="show-certificate" onClick={() => alert(`Showing certificate for ${vaccine.name}`)}>
                    Show Certificate
                  </button>
                ) : (
                  <button className="book-appointment" onClick={() => alert(`Booking appointment for ${vaccine.name}`)}>
                    Book Appointment
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <h2>Vaccination Progress</h2>
      <div className="pie-chart-container">
        <Pie data={vaccineData} />
      </div>
    </div>
  );
};

export default VaccinationRecord;

