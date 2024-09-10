import express from "express";
import { jwtAuth } from "../../middleware/auth.js";
import {createChildProfile} from "../../controllers/parentController/childParentController.js"
const parentCreateRouter = express.Router();

parentCreateRouter.post('/child-create', jwtAuth, createChildProfile);
export default parentCreateRouter;