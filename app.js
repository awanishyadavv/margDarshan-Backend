import express, { Router } from "express";

// Router import
import userRouter from "./routes/user.js"
import placeRouter from "./routes/place.js";
import tripRouter from "./routes/trip.js";

import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middelwares/error.js";

// Import Cors for Deployment and Server Routing(Check Cors on Internet)

import cors from "cors"


// App Engine HTML
export const app = express();

config({
    path:"./data/config.env",
});

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))


// Using Routes by Importing Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/trip", tripRouter);


app.get("/", (req,res) => {
    res.send("Nice Working")
})



// Error Handelling  Middleware
app.use(errorMiddleware)