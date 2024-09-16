import ChildProfile from '../../models/parentModels/childModel.js';
export const createChildProfile = async (req, res) => {
    const { name, age, dob, gender, relationshipWithParent, address, bloodGroup, vaccinationHistory, medicalCondition, upcomingVaccinations, healthInsurance } = req.body;
    const { userId } = req.user;

    if (!name || !age || !dob || !gender || !relationshipWithParent || !address || !bloodGroup) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const newChildProfile = new ChildProfile({
            userId,
            name,
            age,
            dob,
            gender,
            relationshipWithParent,
            address,
            bloodGroup,
            vaccinationHistory,
            medicalCondition,
            upcomingVaccinations,
            healthInsurance
        });

        const savedChildProfile = await newChildProfile.save();
        return res.status(200).json({ success: true, message: "Child profile added successfully", data: savedChildProfile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// List Child Profiles
export const getParentChildrenProfiles = async (req, res) => {
    const { userId } = req.user;

    try {
        const childProfiles = await ChildProfile.find({ userId });
        return res.json({ success: true, data: childProfiles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error fetching child profiles" });
    }
};

export const removeChildProfile = async (req, res) => {
    const { childProfileId } = req.params;
    const { userId } = req.user;

    try {
        const childProfile = await ChildProfile.findOneAndDelete({ _id: childProfileId, userId });

        if (childProfile) {
            console.log("Child profile deleted successfully:", childProfileId);
            return res.json({ success: true, message: "Deleted successfully" });
        } else {
            console.error("Child profile not found or unauthorized:", childProfileId);
            return res.status(404).json({ success: false, message: "Child profile not found or unauthorized" });
        }
    } catch (error) {
        console.log("Error in removeChildProfile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update Child Profile
export const updateChildProfile = async (req, res) => {
    const { childProfileId } = req.params;
    const { userId } = req.user;
    const updateData = req.body;

    try {
        const updatedChildProfile = await ChildProfile.findOneAndUpdate(
            { _id: childProfileId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedChildProfile) {
            console.log("not provided updated child profile");
            return res.status(404).json({ success: false, message: "Child profile not found or unauthorized" });
        }

        return res.status(200).json({ success: true, message: "Child profile updated successfully", data: updatedChildProfile });
    } catch (error) {
        console.error("Error updating child profile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
