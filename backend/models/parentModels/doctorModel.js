import mongoose from 'mongoose';

// Define the ParentUser schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Please enter a valid email address'] }, // Email validation
    location: { type: String, required: true },
    contactNumber : {type:Number, required:true},
}, { timestamps: true });

const DoctorUser = mongoose.models.user || mongoose.model('doctor', doctorSchema);

export default DoctorUser;
