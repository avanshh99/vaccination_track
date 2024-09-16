import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { User, Settings, PlusCircle } from 'lucide-react';
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';


// Initial profile state
const initialProfileState = {
  name: '',
  age: '',
  dob: '',
  gender: '',
  relationshipWithParent: '',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  },
  photo: '',
  bloodGroup: '',
  consentForm: false,
  disability: false,
  vaccinationHistory: [],
  medicalCondition: {
    currentCondition: 'Healthy',
    otherDetails: ''
  },
  upcomingVaccinations: [],
  vaccineAvailabilityAlerts: false,
  healthInsurance: {
    providerName: '',
    policyNumber: '',
    coverageDetails: ''
  }
};


const doctors = [
  {
    "name": "Dr. Aakash Mehta",
    "specialization": "Cardiologist",
    "location": "Mumbai",
    "contactNumber": "91 7999505967"
  },
  {
    "name": "Dr. Priya shetty",
    "specialization": "Pediatrician",
    "location": "Delhi",
    "contactNumber": "91 8369079412"
  },
  {
    "name": "Dr. Rohan Desai",
    "specialization": "Dermatologist",
    "location": "Bangalore",
    "contactNumber": "+91-9876543230"
  },
  {
    "name": "Dr. Meera Patel",
    "specialization": "Orthopedic",
    "location": "Ahmedabad",
    "contactNumber": "+91-9876543240"
  },
  {
    "name": "Dr. Vikram Rao",
    "specialization": "Neurologist",
    "location": "Hyderabad",
    "contactNumber": "+91-9876543250"
  }
];




// Component for displaying a child profile
const ChildProfileView = ({ profile }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">{profile.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Relationship:</strong> {profile.relationshipWithParent}</p>
        <p><strong>Address:</strong> {`${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.postalCode}, ${profile.address.country}`}</p>
        <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
        <p><strong>Consent Form:</strong> {profile.consentForm ? 'Yes' : 'No'}</p>
        <p><strong>Disability:</strong> {profile.disability ? 'Yes' : 'No'}</p>
        <p><strong>Medical Condition:</strong> {profile.medicalCondition.currentCondition}</p>
        <p><strong>Vaccine Alerts:</strong> {profile.vaccineAvailabilityAlerts ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
};

// Component for the profile form
const ProfileForm = ({ profile, setProfile, onSave, isNewProfile }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        };
      }
      return { ...prev, [name]: type === 'checkbox' ? checked : value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewProfile) {
        const response = await axios.post(`http://localhost:5000/parent/child/child-create`, profile, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        console.log('Profile created:', response.data);
      } else {
        const response = await axios.put(`http://localhost:5000/parent/child/update/${profile.id}`, profile, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
          console.log('Profile updated:', response.data);
          toast.success(response.data.message);
        } else {
          console.log("error");
          toast.error(response.data.message);
        }
        console.log('Profile updated:', response.data);
      }
      onSave();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-blue-800">Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Age:</label>
          <input type="number" name="age" value={profile.age} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Date of Birth:</label>
          <input type="date" name="dob" value={profile.dob} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Gender:</label>
          <select name="gender" value={profile.gender} onChange={handleChange} required className="w-full p-2 border rounded-md">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Relationship with Parent:</label>
          <input type="text" name="relationshipWithParent" value={profile.relationshipWithParent} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Street:</label>
          <input type="text" name="address.street" value={profile.address.street} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">City:</label>
          <input type="text" name="address.city" value={profile.address.city} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">State:</label>
          <input type="text" name="address.state" value={profile.address.state} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Postal Code:</label>
          <input type="text" name="address.postalCode" value={profile.address.postalCode} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Country:</label>
          <input type="text" name="address.country" value={profile.address.country} onChange={handleChange} required className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Blood Group:</label>
          <select name="bloodGroup" value={profile.bloodGroup} onChange={handleChange} required className="w-full p-2 border rounded-md">
            <option value="">Select Blood Group</option>
            {['O+', 'O-', 'AB+', 'AB-', 'B+', 'B-', 'A+', 'A-'].map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Consent Form:</label>
          <input type="checkbox" name="consentForm" checked={profile.consentForm} onChange={handleChange} className="mr-2" />
          <span>Signed</span>
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Disability:</label>
          <input type="checkbox" name="disability" checked={profile.disability} onChange={handleChange} className="mr-2" />
          <span>Yes</span>
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Current Medical Condition:</label>
          <input type="text" name="medicalCondition.currentCondition" value={profile.medicalCondition.currentCondition} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block mb-2 text-blue-800">Vaccine Availability Alerts:</label>
          <input type="checkbox" name="vaccineAvailabilityAlerts" checked={profile.vaccineAvailabilityAlerts} onChange={handleChange} className="mr-2" />
          <span>Enable</span>
        </div>
      </div>
      <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        {isNewProfile ? 'Add Child' : 'Update Profile'}
      </button>
    </form>
  );
};

// Sidebar component
const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white p-6 h-screen">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      <nav>
        <Link to="/cp/profiles" className="flex items-center mb-4 hover:bg-blue-700 p-2 rounded">
          <User size={20} />
          <span className="ml-3">Child Profiles</span>
        </Link>
        <Link to="/cp/add" className="flex items-center mb-4 hover:bg-blue-700 p-2 rounded">
          <PlusCircle size={20} />
          <span className="ml-3">Add Another Child</span>
        </Link>
        <Link to="/cp/settings" className="flex items-center mb-4 hover:bg-blue-700 p-2 rounded">
          <Settings size={20} />
          <span className="ml-3">Settings</span>
        </Link>
        <Link to="/cp/doctor" className="flex items-center mb-4 hover:bg-blue-700 p-2 rounded">
          <Settings size={20} />
          <span className="ml-3">Connect with Doctor</span>
        </Link>
      </nav>
    </div>
  );
};

// Main child profile component
const ChildProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState(initialProfileState);
  const navigate = useNavigate();

  useEffect(() => {

    setProfiles([
      {
        id: 'CHD12345',
        name: 'John Doe',
        age: 5,
        dob: '2018-05-15',
        gender: 'Male',
        relationshipWithParent: 'Son',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'State',
          postalCode: '12345',
          country: 'Country'
        },
        bloodGroup: 'A+',
        consentForm: true,
        disability: false,
        medicalCondition: {
          currentCondition: 'Healthy',
          otherDetails: ''
        },
        vaccineAvailabilityAlerts: true
      }
    ]);
  }, []);

  const handleSave = (profile, isNewProfile = false) => {
    if (isNewProfile) {
      setProfiles(prev => [...prev, { ...profile, id: `CHD${Date.now()}` }]);
    } else {
      setProfiles(prev => prev.map(p => p.id === profile.id ? profile : p));
    }
    navigate('/cp/profiles');
  };
  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="profiles" element={
            <>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Child Profiles</h2>
              {profiles.map(profile => (
                <div key={profile.id} className="mb-6">
                  <ChildProfileView profile={profile} />
                  <Link
                    to={`/cp/update/${profile.id}`}
                    className="mt-2 inline-block bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Update Profile
                  </Link>
                </div>
              ))}
            </>
          } />
          <Route path="update/:id" element={
            <UpdateProfile profiles={profiles} handleSave={handleSave} />
          } />
          <Route path="add" element={
            <>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Add New Child</h2>
              <ProfileForm
                profile={newProfile}
                setProfile={setNewProfile}
                onSave={() => handleSave(newProfile, true)}
                isNewProfile={true}
              />
            </>
          } />
          <Route path="settings" element={
            <>
              <h2 className="text-3xl font-bold mb-6 text-blue-800">Settings</h2>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p>Settings page content goes here.</p>
              </div>
            </>
          } />


          <Route path="doctor" element={
            <>
              <h2 className='text-3xl font-bold mb-6 text-blue-800'>Connect With Doctor</h2>
              <ConnectWithDoctor />
            </>
          } />
        </Routes>


      </div>
    </div>
  );
};


// connect with doctor : 


const ConnectWithDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleWhatsAppClick = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/\s+/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Connect with a Doctor</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name, specialization, or location"
        className="w-full p-2 mb-4 border rounded-md"
      />
      <ul>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <>
              <li key={doctor.name} className="mb-2">
                <strong>{doctor.name}</strong> - {doctor.specialization} - {doctor.location} <br />
                Contact: {doctor.contactNumber}
              </li>
              <div className="mt-4 md:mt-0 md:block md:items-center">
                <button className="bg-[#00008B] text-white text-lg px-6 py-2 rounded-full hover:bg-primary-light transition duration-300">
                  Apply
                </button>
                <div className="p-3">
                  <img className='cursor-pointer w-10 h-10 rounded-full border-4 border-gray-300 shadow-lg object-cover' src={assets.whatsapp} alt="Connect with Whatsapp" onClick={() => handleWhatsAppClick(doctor.contactNumber)} />
                </div>
              </div>
            </>
          ))
        ) : (
          <li>No doctors found</li>
        )}
      </ul>
    </div>
  );
};


// Update profile component
const UpdateProfile = ({ profiles, handleSave }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const profileToUpdate = profiles.find(p => p.id === id);
    if (profileToUpdate) {
      setProfile(profileToUpdate);
    }
  }, [id, profiles]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 text-blue-800">Update Profile</h2>
      <ProfileForm
        profile={profile}
        setProfile={setProfile}
        onSave={() => handleSave(profile)}
        isNewProfile={false}
      />
    </>
  );
};

export default ChildProfile;
