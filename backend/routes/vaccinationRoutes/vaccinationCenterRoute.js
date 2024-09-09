import express from "express";
import { vaccinationCenterInfo } from "../../controllers/vaccinationCenterControllers/vaccinationCenterController.js";
import {jwtAuth} from "../../middleware/auth.js"


const vaccinationCenterRouter = express.Router();

vaccinationCenterRouter.post("/create", jwtAuth, vaccinationCenterInfo);

export default vaccinationCenterRouter;