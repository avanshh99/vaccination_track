import express from "express";
import { vaccinationCenterInfo } from "../../controllers/vaccinationCenterControllers/vaccinationCenterController.js";
import {jwtAuth} from "../../middleware/auth.js"
import { createVaccine, getAllVaccines } from "../../controllers/vaccinationCenterControllers/vaccineController.js";

const vaccinationCenterRouter = express.Router();

vaccinationCenterRouter.post("/create", jwtAuth, vaccinationCenterInfo);
vaccinationCenterRouter.post("/add-vaccine", jwtAuth, createVaccine);
vaccinationCenterRouter.get("/get-vaccine", jwtAuth,getAllVaccines);


export default vaccinationCenterRouter;