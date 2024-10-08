// routes/vaccineRoutes.js
import express from 'express';
import { bookVaccine } from '../controllers/bookVaccine.js';
const mailRouter = express.mailRouter();
mailRouter.post('/book-vaccine', bookVaccine);
export default mailRouter;
