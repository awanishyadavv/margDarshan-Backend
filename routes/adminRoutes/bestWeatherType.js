import express from "express";
import { deleteWeather, getWeather, newWeather, updateWeather } from "../../controllers/adminControllers/bestWeatherType.js";
import { isAuthenticatedAdmin } from "../../middelwares/auth.js";

const router = express.Router();

router.post("/newWeather",isAuthenticatedAdmin,newWeather);
router.get("/getWeather",getWeather);
router.route("/updateWeather/:weatherId").put(isAuthenticatedAdmin,updateWeather).delete(isAuthenticatedAdmin,deleteWeather);

export default router; 