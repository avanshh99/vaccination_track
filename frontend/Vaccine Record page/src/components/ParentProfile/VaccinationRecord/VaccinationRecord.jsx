// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

// const VaccinationRecord = () => {
//     const [childProfiles, setChildProfiles] = useState([]);

//     useEffect(() => {
//         fetchChildProfiles();
//     }, []);

//     const fetchChildProfiles = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/parent/child/children`, {
//                 withCredentials: true,
//                 headers: { "Content-Type": "application/json" },
//             });
//             if (response.data.success) {
//                 console.log(response.data.data);
//                 setChildProfiles(response.data.data);
//             } else {
//                 toast.error("Error");
//             }
//         } catch (error) {
//             console.error('Error fetching child profiles:', error);
//         }
//     };

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 Child Profiles
//             </Typography>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Age</TableCell>
//                             <TableCell>Date of Birth</TableCell>
//                             <TableCell>Gender</TableCell>
//                             <TableCell>Relationship</TableCell>
//                             <TableCell>Blood Group</TableCell>
//                             <TableCell>Address</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {childProfiles.map((child) => (
//                             <TableRow key={child._id}>
//                                 <TableCell>{child.name}</TableCell>
//                                 <TableCell>{child.age}</TableCell>
//                                 <TableCell>{new Date(child.dob).toLocaleDateString()}</TableCell>
//                                 <TableCell>{child.gender}</TableCell>
//                                 <TableCell>{child.relationshipWithParent}</TableCell>
//                                 <TableCell>{child.bloodGroup}</TableCell>
//                                 <TableCell>
//                                     {child.address.street}, {child.address.city}, {child.address.state}, {child.address.country}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default VaccinationRecord;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import 'chart.js/auto';
import './VaccinationRecord.css';

const VaccinationRecord = () => {
  const [childProfiles, setChildProfiles] = useState([]);

  useEffect(() => {
    fetchChildProfiles();
  }, []);

  const fetchChildProfiles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/parent/child/children`,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        setChildProfiles(response.data.data);
      } else {
        console.error('Error fetching child profiles');
      }
    } catch (error) {
      console.error('Error fetching child profiles:', error);
    }
  };

  const renderChildInfo = child => {
    const administeredVaccines = child.vaccinationHistory.filter(
      vaccine => vaccine.vaccinationStatus === 'Administered'
    ).length;
    const totalVaccines = child.vaccinationHistory.length;
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
      <div className="child-profile" key={child._id}>
        <Typography variant="h5" gutterBottom>
          <p>
            <strong>Full Name:</strong>
            {child.name}
          </p>
          <p>
            <strong>Gender:</strong> {child.gender}
          </p>
          <p>
            <strong>Age:</strong> {child.age} years
          </p>
        </Typography>
        <Typography variant="subtitle1">
          <p>
            <strong>Parent:</strong> {child.relationshipWithParent},
          </p>
          <p>
            <strong>Address :</strong> {child.address.city},
          </p>
        </Typography>

        <h3>Vaccination Record</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vaccine Name</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Book Appointment / Show Certificate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {child.vaccinationHistory.map((vaccine, index) => (
                <TableRow key={index}>
                  <TableCell>{vaccine.vaccineName}</TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        alert(`
                      Vaccine: ${vaccine.vaccineName}
                      Status: ${vaccine.vaccinationStatus}
                      Date: ${
                        vaccine.dateAdministered
                          ? new Date(vaccine.dateAdministered).toDateString()
                          : 'Not Administered'
                      }
                      Vaccination Center: ${vaccine.vaccinationCenter || 'N/A'}
                      Dose: ${vaccine.doseNumber || 'N/A'}
                    `)
                      }
                    >
                      Details
                    </button>
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        vaccine.vaccinationStatus === 'Administered'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    {vaccine.vaccinationStatus}
                  </TableCell>
                  <TableCell>
                    {vaccine.vaccinationStatus === 'Administered' ? (
                      <button
                        className="show-certificate"
                        onClick={() =>
                          alert(
                            `Showing certificate for ${vaccine.vaccineName}`
                          )
                        }
                      >
                        Show Certificate
                      </button>
                    ) : (
                      <button
                        className="book-appointment"
                        onClick={() =>
                          alert(
                            `Booking appointment for ${vaccine.vaccineName}`
                          )
                        }
                      >
                        Book Appointment
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>Vaccination Progress</h3>
        <div className="pie-chart-container">
          <Pie data={vaccineData} />
        </div>
      </div>
    );
  };

  return (
    <div className="vaccination-record-container">
      <Typography variant="h4" gutterBottom>
        Child Vaccination Records
      </Typography>
      {childProfiles.length === 0 ? (
        <Typography>No child profiles found.</Typography>
      ) : (
        <>
          {childProfiles.map(child => renderChildInfo(child))}
          <hr />
        </>
      )}
    </div>
  );
};

export default VaccinationRecord
