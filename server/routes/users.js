import { Router } from "express";
import { getAllUsers } from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// Get all users
router.get("/getusers", verifyToken, getAllUsers);

export default router;
