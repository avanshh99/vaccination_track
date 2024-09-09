import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import vaccinationUserRouter from "./routes/vaccinationRoutes/vaccinationUserRoute.js";
import 'dotenv/config';
import vaccinationCenterRouter from "./routes/vaccinationRoutes/vaccinationCenterRoute.js";
const app = express();
const serverLive = process.env.PORT || 5000; 

const allowedOrigins = [
    'http://localhost:5173',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();


/* here is the list of vaccination CENTER  */
/*******************START*********************/ 
app.use("/vaccine/user", vaccinationUserRouter);
app.use("/vaccine/center", vaccinationCenterRouter);

/*******************END*********************/ 



app.listen(serverLive, () => {
    console.log(`Server is running on port ${serverLive}`);
});