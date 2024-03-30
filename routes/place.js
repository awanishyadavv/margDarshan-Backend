import express from "express";
import {getPlaceByName, getPlaces, getPlacesWithSelectedAttributes, newPlace } from "../controllers/place.js";
import { isAuthenticated } from "../middelwares/auth.js";

const router = express.Router();

router.post("/newPlace",isAuthenticated, newPlace);
router.get("/getPlaces",getPlaces);
router.get("/getPlace/:placeName",getPlaceByName);
router.get("/getAllPlaces",getPlacesWithSelectedAttributes);

export default router;