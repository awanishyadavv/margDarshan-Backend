import express from "express";
import { deleteTrip, myTrips, newTrip, updateTrip } from "../controllers/trip.js";
import { isAuthenticated } from "../middelwares/auth.js";

const router = express.Router();

router.post("/newTrip", isAuthenticated, newTrip);
router.get("/myTrips", isAuthenticated, myTrips);
router.route("/myTrip/:tripId").put(isAuthenticated, updateTrip).delete(isAuthenticated, deleteTrip);


export default router;