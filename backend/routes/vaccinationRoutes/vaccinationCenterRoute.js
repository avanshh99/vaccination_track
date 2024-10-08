import express from "express";
import { getVaccinationCenterInfo, vaccinationCenterInfo } from "../../controllers/vaccinationCenterControllers/vaccinationCenterController.js";
import {jwtAuth} from "../../middleware/auth.js"
import { createVaccine, getAllVaccines } from "../../controllers/vaccinationCenterControllers/vaccineController.js";

const vaccinationCenterRouter = express.Router();

vaccinationCenterRouter.post("/create", vaccinationCenterInfo);
vaccinationCenterRouter.post("/add-vaccine", jwtAuth, createVaccine);
vaccinationCenterRouter.get("/get-vaccine", jwtAuth,getAllVaccines);
vaccinationCenterRouter.get("/get-vaccination-center", getVaccinationCenterInfo);

export default vaccinationCenterRouter;