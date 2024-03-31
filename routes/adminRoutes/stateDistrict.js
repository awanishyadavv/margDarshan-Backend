import express from "express";
import { isAuthenticatedAdmin } from "../../middelwares/auth.js";
import { deleteStateDistrict, getStateDistrict, newStateDistrict, updatestateDistrict } from "../../controllers/adminControllers/stateDistrict.js";


const router = express.Router();

router.post("/newStateDistricts",isAuthenticatedAdmin,newStateDistrict);
router.get("/getStateDistricts",getStateDistrict);
router.route("/updatestateDistricts/:stateId").put(isAuthenticatedAdmin,updatestateDistrict).delete(isAuthenticatedAdmin,deleteStateDistrict);

export default router;