import express from "express";
import {deleteUser, getAllUserforAdmin, getMyProfile, login, logout, register, updateUserRoleAndStatus} from "../controllers/user.js";
import { isAuthenticated, isAuthenticatedAdmin } from "../middelwares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/admin/getAllUsers",isAuthenticatedAdmin, getAllUserforAdmin);
router.route("/admin/updateUser/:userId").put(isAuthenticatedAdmin, updateUserRoleAndStatus).delete(isAuthenticatedAdmin, deleteUser);
export default router;