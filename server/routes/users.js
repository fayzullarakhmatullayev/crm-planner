import { Router } from "express";
import { createUser, getAllUsers, deleteUser } from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// Get all users
router.get("/get-users", verifyToken, getAllUsers);
// Create User
router.post("/create-user", verifyToken, createUser);
// Delete User
router.delete("/delete-user/:id", verifyToken, deleteUser);

export default router;
