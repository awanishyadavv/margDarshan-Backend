import express from "express";
import { deleteUser, getAllUsers, getUserById, register, special, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.get("/userid/special",special)

// Dynamic URL
// router.get("/userid/:id", getUserById)
// router.put("/userid/:id", updateUser)
// router.delete("/userid/:id", deleteUser)

// chaining above 3 routers due to same route

router.route("/userid/:id").get(getUserById).put(updateUser).delete(deleteUser);



export default router