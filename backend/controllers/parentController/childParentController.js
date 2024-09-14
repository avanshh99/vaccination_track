import ChildProfile from "../../models/parentModels/childModel.js";
import ParentUser from "../../models/parentModels/parentLogin.js";

// Create a new child profile and associate it with the parent
export const createChildProfile = async (req, res) => {
    try {
        const parentId = req.user.userId; // Parent ID from JWT authentication
        console.log(`Parent ID: ${parentId}`);

        if (!req.body.name || !req.body.age || !req.body.dob || !req.body.gender) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newChild = new ChildProfile(req.body);
        const savedChild = await newChild.save();

        const parent = await ParentUser.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }

        // Add the new child's ID to the parent's 'children' array
        parent.children.push(savedChild._id);
        await parent.save(); // Save the updated parent document
        
        res.status(201).json({ success:true, message: "Child profile created successfully", child: savedChild });
    } catch (error) {
        console.error("Error creating child profile:", error);
        res.status(500).json({ success:false, message: "Error creating child profile", error });
    }
};

// Get all child profiles associated with the logged-in parent
export const getParentChildrenProfiles = async (req, res) => {
    try {
        const parentId = req.user.userId; // Parent ID from JWT authentication
        console.log(`Fetching child profiles for Parent ID: ${parentId}`);
        console.log(parentId);
        // Find the parent and populate their children's profiles
        const parent = await ParentUser.findById(parentId).populate('children');
        if (!parent) {
            return res.status(404).json({ message: "Parent not found" });
        }
        console.log(parent);

        // If no children are associated, return an empty array
        if (!parent.children || parent.children.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Respond with the child profiles
        console.log("Child profiles found:", parent.children);
        res.status(200).json({ success: true, data: parent.children });
    } catch (error) {
        console.error("Error fetching child profiles:", error);
        res.status(500).json({ success:false, message: "Error fetching child profiles", error });
    }
};
