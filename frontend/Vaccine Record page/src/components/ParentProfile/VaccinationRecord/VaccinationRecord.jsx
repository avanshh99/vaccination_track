import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const VaccinationRecord = () => {
    const [childProfiles, setChildProfiles] = useState([]);

    useEffect(() => {
        fetchChildProfiles();
    }, []);

    const fetchChildProfiles = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/parent/child/children`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                setChildProfiles(response.data.data);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.error('Error fetching child profiles:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Child Profiles
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Relationship</TableCell>
                            <TableCell>Blood Group</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {childProfiles.map((child) => (
                            <TableRow key={child._id}>
                                <TableCell>{child.name}</TableCell>
                                <TableCell>{child.age}</TableCell>
                                <TableCell>{new Date(child.dob).toLocaleDateString()}</TableCell>
                                <TableCell>{child.gender}</TableCell>
                                <TableCell>{child.relationshipWithParent}</TableCell>
                                <TableCell>{child.bloodGroup}</TableCell>
                                <TableCell>
                                    {child.address.street}, {child.address.city}, {child.address.state}, {child.address.country}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default VaccinationRecord;