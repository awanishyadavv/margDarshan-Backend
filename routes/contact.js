import express from "express";
import { getContact, newContact, updateQuery } from "../controllers/contact.js";
import { isAuthenticated } from "../middelwares/auth.js";

const router = express.Router();

router.post("/newContact",newContact);
router.get("/getContact",isAuthenticated, getContact);
router.put("/updateQuery/:queryId",isAuthenticated, updateQuery);

export default router;