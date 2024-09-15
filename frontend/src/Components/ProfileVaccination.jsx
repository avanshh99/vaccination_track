import React from "react";
import "../styles/ProfileVaccination.css";
import babyphoto from "../photos/babyphoto.jpg";

function ProfileVaccination() {
  return (
    <div className="profile-vaccination-container">
      <div className="profile-box">
        <h2>Profile</h2>
        <div className="profile-content">
          <img
            className="profile-image"
            src={babyphoto}
            alt="Profile"
          />
          <div className="profile-info">
            <p>Name: John Doe</p>
            <p>Age: 5</p>
            <p>Date of Birth: 01/01/2018</p>
            <button className="edit-button">Edit</button>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: '67%' }}></div>
          </div>
          <p className="progress-text">Vaccines Completed: 4/6</p>
        </div>
      </div>

      <div className="vaccination-history-box">
        <h2>Vaccination History</h2>
        <table className="vaccine-table">
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Date</th>
              <th>Vaccination Center</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Polio Vaccine</td>
              <td>01/02/2022</td>
              <td>ABC Clinic</td>
              <td><button className="download-button">Download</button></td>
            </tr>
            <tr>
              <td>MMR Vaccine</td>
              <td>15/05/2023</td>
              <td>XYZ Hospital</td>
              <td><button className="download-button">Download</button></td>
            </tr>
            <tr>
              <td>Hepatitis B</td>
              <td>20/08/2023</td>
              <td>LMN Clinic</td>
              <td><button className="download-button">Download</button></td>
            </tr>
            <tr>
              <td>DTP Vaccine</td>
              <td>25/11/2023</td>
              <td>PQR Health Center</td>
              <td><button className="download-button">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfileVaccination;
