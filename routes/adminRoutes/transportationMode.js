import express from "express";
import { isAuthenticatedAdmin } from "../../middelwares/auth.js";
import { deleteTransportationMode, getTransportationMode, newTransportationMode, updateTransportationMode } from "../../controllers/adminControllers/transportationMode.js";

const router = express.Router();

router.post("/new-trans-mode",isAuthenticatedAdmin,newTransportationMode);
router.get("/get-trans-mode",getTransportationMode);
router.route("/update-trans-mode/:transModeId").put(isAuthenticatedAdmin,updateTransportationMode).delete(isAuthenticatedAdmin,deleteTransportationMode);

export default router; 