import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VaccineRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    manufacturer: '',
    doseCount: 0,
    stock: 0,
    expiryDate: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const vaccineOptions = [
    "COVID-19 Vaccine",
    "Influenza Vaccine",
    "MMR Vaccine",
    "Polio Vaccine"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Vaccine name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (formData.doseCount <= 0) newErrors.doseCount = 'Dose count must be greater than 0';
    if (formData.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Here you would typically send the data to your backend
        // For now, we'll just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Form submitted:', formData);
        toast.success('Vaccine registered successfully!');
        
        // Reset form
        setFormData({
          name: '',
          type: '',
          manufacturer: '',
          doseCount: 0,
          stock: 0,
          expiryDate: '',
          description: ''
        });
        
        // Navigate to a different page (e.g., vaccine list)
        navigate('/vaccine-list');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to register vaccine. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Register New Vaccine</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Vaccine Name</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            required
          >
            <option value="">Select a vaccine</option>
            {vaccineOptions.map((vaccine, index) => (
              <option key={index} value={vaccine}>{vaccine}</option>
            ))}
          </select>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        {/* Repeat similar structure for other form fields */}
        <div>
          <label className="block mb-1">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.type ? 'border-red-500' : ''}`}
            required
          />
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>
        {/* ... other form fields ... */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={Object.keys(errors).length > 0}
        >
          Register Vaccine
        </button>
      </form>
    </div>
  );
};

export default VaccineRegisterForm;