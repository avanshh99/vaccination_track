import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

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

app.use("/", (req, res) => {
    res.send("Working");
});

app.listen(serverLive, () => {
    console.log(`Server is running on port ${serverLive}`);
});