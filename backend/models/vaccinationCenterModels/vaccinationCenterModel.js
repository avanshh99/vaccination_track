import mongoose from "mongoose";

const vaccinationCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { 
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String }
  },
  operatingHours: { 
    weekdays: { type: String },  
    weekends: { type: String } 
  },
  capacity: { type: Number, required: true },
  availableVaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' }],
});

const VaccinationCenter = mongoose.model('VaccinationCenterInformation', vaccinationCenterSchema);

export default VaccinationCenter; 