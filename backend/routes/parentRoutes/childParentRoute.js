

import express from "express";
import { jwtAuth } from "../../middleware/auth.js";
import { createChildProfile, displayDoctorList, getParentChildrenProfiles, updateChildProfile } from "../../controllers/parentController/childParentController.js";

const parentCreateRouter = express.Router();

// Route for creating a child profile
parentCreateRouter.post('/child-create', jwtAuth, createChildProfile);

// Optional: Route for fetching parent’s children profiles
parentCreateRouter.get('/children', jwtAuth, getParentChildrenProfiles);


parentCreateRouter.get('/doctor', displayDoctorList);

// for updating parent child form 
parentCreateRouter.put("/update/:childProfileId", jwtAuth, updateChildProfile);
export default parentCreateRouter;
