import React from "react";
import "../styles/UpcomingVaccinations.css";

function UpcomingVaccinations() {
  return (
    <div className="upcoming-vaccinations-box">
      <h2>Upcoming Vaccinations</h2>
      <table className="vaccine-table">
        <thead>
          <tr>
            <th>Vaccine Name</th>
            <th>Due Date</th>
            <th>Vaccination Center</th>
            <th>Doctor Name</th>
            <th>Book Appointment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hepatitis B</td>
            <td>25/09/2024</td>
            <td>XYZ Clinic</td>
            <td>Dr. Jane Doe</td>
            <td><button className="book-button">Book</button></td>
          </tr>
          <tr>
            <td>DTP Vaccine</td>
            <td>10/10/2024</td>
            <td>LMN Hospital</td>
            <td>Dr. John Smith</td>
            <td><button className="book-button">Book</button></td>
          </tr>
          <tr>
            <td>MMR Vaccine</td>
            <td>15/11/2024</td>
            <td>ABC Health Center</td>
            <td>Dr. Emily Clark</td>
            <td><button className="book-button">Book</button></td>
          </tr>
          <tr>
            <td>Polio Vaccine</td>
            <td>30/12/2024</td>
            <td>PQR Clinic</td>
            <td>Dr. Michael Brown</td>
            <td><button className="book-button">Book</button></td>
          </tr>
          <tr>
            <td>Chickenpox Vaccine</td>
            <td>05/01/2025</td>
            <td>GHI Hospital</td>
            <td>Dr. Laura Green</td>
            <td><button className="book-button">Book</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UpcomingVaccinations;
