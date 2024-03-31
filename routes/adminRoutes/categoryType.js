import express from "express";
import { isAuthenticatedAdmin } from "../../middelwares/auth.js";
import { deleteCategory, getCategories, newCategory, updateCategory } from "../../controllers/adminControllers/categoryType.js";

const router = express.Router();

router.post("/newCategory",isAuthenticatedAdmin,newCategory);
router.get("/getCategory",getCategories);
router.route("/updateCategory/:categoryId").put(isAuthenticatedAdmin,updateCategory).delete(isAuthenticatedAdmin,deleteCategory);

export default router; 