import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import vaccinationUserRouter from "./routes/vaccinationRoutes/vaccinationUserRoute.js";
import vaccinationCenterRouter from "./routes/vaccinationRoutes/vaccinationCenterRoute.js";
import parentUserRouter from "./routes/parentRoutes/parentUser.js";
import parentCreateRouter from "./routes/parentRoutes/childParentRoute.js";
import 'dotenv/config';

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

// Middleware setup
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes

// Parent routes for user and child management
app.use("/parent/user", parentUserRouter);
app.use("/parent/child", parentCreateRouter);

// Vaccination routes for user and centers
app.use("/vaccine/user", vaccinationUserRouter);
app.use("/vaccine/center", vaccinationCenterRouter);

console.log(process.env.SECRET);
// Global error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(serverLive, () => {
    console.log(`Server is running on port ${serverLive}`);
});
