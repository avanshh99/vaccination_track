import React, { useState } from 'react';
import './HealthcareCenters.css';

const healthcareCenters = [
  {
    name: 'City Hospital',
    image: 'https://documentapi-fargate-documentbucket-15qi4tpdvnhlz.s3.amazonaws.com/207/90db46c0-66fe-11ee-b2e3-8bff142fa989.jpg',
    contact: '123-456-7890',
    address: '123 Main St, Cityville',
  },
  {
    name: 'Green Valley Clinic',
    image: 'https://sdra.com/wp-content/uploads/2017/08/eugene-va-heathcare-center-01-1440x785.jpg',
    contact: '987-654-3210',
    address: '456 Oak Rd, Greendale',
  },
  {
    name: 'Health Plus Center',
    image: 'https://www.parrishhealthcare.com/cms/thumbnails/00/830x415//images/system/locations/pmc-locations-page_1.jpg',
    contact: '555-555-5555',
    address: '789 Pine Ln, Healthcity',
  },
  {
    name: 'Sunrise Medical',
    image: 'https://s3.amazonaws.com/gazelle2.cdn.yolocare.com/sites/111/2019/02/Stoney-848x350-3.jpg',
    contact: '111-222-3333',
    address: '101 Sunset Blvd, Sunnytown',
  },
  {
    name: 'Blue Ocean Health',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Jewish_Healthcare_Center_Worcester_2015.JPG',
    contact: '222-333-4444',
    address: '202 Ocean Dr, Bluetown',
  },
  {
    name: 'Riverstone Clinic',
    image: 'https://www.driftwoodhc.com/wp-content/uploads/2014/11/Driftwood_07.jpg',
    contact: '333-444-5555',
    address: '303 River Rd, Riverville',
  },
  {
    name: 'Mountain View Health',
    image: 'https://healthcaresnapshots.com/wp-content/uploads/sites/5/2019/03/healthcare-center-in-son-servera-1050x750.jpg',
    contact: '444-555-6666',
    address: '404 Mountain St, Mountainville',
  },
  {
    name: 'Clearwater Clinic',
    image: 'https://www.fhn.org/images/locations/fhn-burchard.jpg',
    contact: '555-666-7777',
    address: '505 Clearwater Ave, Clearcity',
  },
];

const vaccines = [
  { name: 'BCG', quantity: Math.floor(Math.random() * 100) },
  { name: 'DTP', quantity: Math.floor(Math.random() * 100) },
  { name: 'Hepatitis B', quantity: Math.floor(Math.random() * 100) },
  { name: 'Polio', quantity: Math.floor(Math.random() * 100) },
  { name: 'MMR', quantity: Math.floor(Math.random() * 100) },
  { name: 'Pneumococcal', quantity: Math.floor(Math.random() * 100) },
  { name: 'HPV', quantity: Math.floor(Math.random() * 100) },
];

const HealthcareCenters = () => {
  const [visibleCenter, setVisibleCenter] = useState(null);
  const [visibleDetails, setVisibleDetails] = useState(null);

  const toggleVaccineList = (centerIndex) => {
    if (visibleCenter === centerIndex) {
      setVisibleCenter(null); 
    } else {
      setVisibleCenter(centerIndex); 
    }
  };

  const toggleDetails = (centerIndex) => {
    if (visibleDetails === centerIndex) {
      setVisibleDetails(null); 
    } else {
      setVisibleDetails(centerIndex); 
    }
  };

  return (
    <div>
      <h1 className="center-list-heading">Vaccination Center List</h1>
      
      
      <div className="search-bar-container">
        
        <input
          type="text"
          className="search-input"
          placeholder="Search by Health care center name"
        />

                <select className="search-filter">
          <option value="">Filter by location</option>
          <option value="Cityville">Cityville</option>
          <option value="Greendale">Greendale</option>
          <option value="Healthcity">Healthcity</option>
          <option value="Sunnytown">Sunnytown</option>
          <option value="Bluetown">Bluetown</option>
          <option value="Riverville">Riverville</option>
          <option value="Mountainville">Mountainville</option>
          <option value="Clearcity">Clearcity</option>
        </select>

        
        <select className="search-filter">
          <option value="">Filter by vaccine</option>
          {vaccines.map((vaccine, index) => (
            <option key={index} value={vaccine.name}>{vaccine.name}</option>
          ))}
        </select>

        
        <select className="search-filter1">
          <option value="">Select time slot</option>
          <option value="morning">Morning Slot: 10am - 12.30pm</option>
          <option value="afternoon">Late Afternoon Slot: 3.30pm - 5.30pm</option>
          <option value="evening">Evening Slot: 7pm - 8.30pm</option>
        </select>

        
        <button className="search-button">Search</button>
      </div>

      <div className="grid-container">
        {healthcareCenters.map((center, index) => (
          <div key={index} className="healthcare-card">
            <img src={center.image} alt={center.name} />
            <h3>{center.name}</h3>
            <button
              className="check-vaccine-btn"
              onClick={() => toggleVaccineList(index)}
            >
              Check Vaccine Quantity
            </button>
            {visibleCenter === index && (
              <div className="vaccine-quantity-list">
                <h4>Vaccine Quantities at {center.name}</h4>
                {vaccines.map((vaccine, i) => (
                  <p key={i}>
                    {vaccine.name}: {vaccine.quantity} doses left
                  </p>
                ))}
              </div>
            )}
            <button
              className="view-details-btn"
              onClick={() => toggleDetails(index)}
            >
              View Details
            </button>
            {visibleDetails === index && (
              <div className="details-list">
                <h4>Contact Info</h4>
                <p>Phone: {center.contact}</p>
                <p>Address: {center.address}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareCenters;

