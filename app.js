import express, { Router } from "express";

// Router import
import userRouter from "./routes/user.js"
import placeRouter from "./routes/place.js";
import tripRouter from "./routes/trip.js";
import contactRouter from "./routes/contact.js";

// Admin Routers import
import weatherRouter from "./routes/adminRoutes/bestWeatherType.js";
import categoryRouter from "./routes/adminRoutes/categoryType.js";
import stateDistrictRouter from "./routes/adminRoutes/stateDistrict.js";
import statusRouter from "./routes/adminRoutes/statusType.js";
import transportationModeRouter from "./routes/adminRoutes/transportationMode.js";

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
app.use("/api/v1/contact", contactRouter);

// Using Admin Routes by Importing
app.use("/api/v1/weather", weatherRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/stateDistrict",stateDistrictRouter);
app.use("/api/v1/status",statusRouter);
app.use("/api/v1/trans-mode",transportationModeRouter);


app.get("/", (req,res) => {
    res.send("Nice Working")
})



// Error Handelling  Middleware
app.use(errorMiddleware)