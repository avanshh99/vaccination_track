import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VaccineRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    weekdays: '',
    weekends: '',
    capacity: 0
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Center name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.latitude) newErrors.latitude = 'Latitude is required';
    if (!formData.longitude) newErrors.longitude = 'Longitude is required';
    if (!formData.weekdays) newErrors.weekdays = 'Weekday hours are required';
    if (!formData.weekends) newErrors.weekends = 'Weekend hours are required';
    if (formData.capacity <= 0) newErrors.capacity = 'Capacity must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        toast.success('Vaccination Center registered successfully!');
        setFormData({
          email: '',
          name: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          latitude: '',
          longitude: '',
          weekdays: '',
          weekends: '',
          capacity: '',
        });
        navigate('/center-list');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Register Vaccination Center</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Center Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.city ? 'border-red-500' : ''}`}
            required
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.state ? 'border-red-500' : ''}`}
            required
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
        <div>
          <label className="block mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.postalCode ? 'border-red-500' : ''}`}
            required
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>
        <div>
          <label className="block mb-1">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.latitude ? 'border-red-500' : ''}`}
            required
          />
          {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
        </div>
        <div>
          <label className="block mb-1">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.longitude ? 'border-red-500' : ''}`}
            required
          />
          {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
        </div>
        <div>
          <label className="block mb-1">Weekday Operating Hours</label>
          <input
            type="text"
            name="weekdays"
            value={formData.weekdays}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.weekdays ? 'border-red-500' : ''}`}
            required
          />
          {errors.weekdays && <p className="text-red-500 text-sm mt-1">{errors.weekdays}</p>}
        </div>
        <div>
          <label className="block mb-1">Weekend Operating Hours</label>
          <input
            type="text"
            name="weekends"
            value={formData.weekends}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.weekends ? 'border-red-500' : ''}`}
            required
          />
          {errors.weekends && <p className="text-red-500 text-sm mt-1">{errors.weekends}</p>}
        </div>
        <div>
          <label className="block mb-1">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.capacity ? 'border-red-500' : ''}`}
            required
          />
          {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Register Center
        </button>
      </form>
    </div>
  );
};

export default VaccineRegisterForm;
