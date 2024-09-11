import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    relationshipWithParent: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    photo: { type: String },
    bloodGroup: { type: String, enum: ['O+', 'O-', 'AB+', 'AB-', 'B+', 'B-', 'A+', 'A-'], required: true },
    consentForm: { type: Boolean, default: false },
    disability: { type: Boolean, default: false },
    vaccinationHistory: [{
        vaccineName: { type: String, enum: ['BCG', 'DTP', 'Hepatitis B', 'Polio', 'MMR', 'Pneumococcal', 'HPV'], required: true },
        vaccinationStatus: { type: String, enum: ['Administered', 'Pending'], required: true },
        dateAdministered: { type: Date },
        doseNumber: { type: Number },
        vaccinationCenter: { type: String },
        previousIllness: { type: String },
        doctorsRecommendations: { type: String }
    }],
    medicalCondition: {
        currentCondition: { type: String },
        otherDetails: { type: String }
    },
    upcomingVaccinations: [{
        vaccineName: { type: String, required: true },
        suggestedDate: { type: Date },
        slotBooking: { type: String },
        vaccinationCenter: { type: String }
    }],
    vaccineAvailabilityAlerts: { type: Boolean, default: false },
    healthInsurance: {
        providerName: { type: String },
        policyNumber: { type: String },
        coverageDetails: { type: String }
    }
}, { timestamps: true });

const Child = mongoose.models.user || mongoose.model("ChildProfile", childSchema);

export default Child;
