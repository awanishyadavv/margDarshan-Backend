import express from "express";
import { isAuthenticatedAdmin } from "../../middelwares/auth.js";
import { deleteStatus, getStatus, newStatus, updateStatus } from "../../controllers/adminControllers/statusType.js";


const router = express.Router();

router.post("/newStatus",isAuthenticatedAdmin,newStatus);
router.get("/getStatus",getStatus);
router.route("/updateStatus/:statusId").put(isAuthenticatedAdmin,updateStatus).delete(isAuthenticatedAdmin,deleteStatus);

export default router; 