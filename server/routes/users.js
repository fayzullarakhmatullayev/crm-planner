import { Router } from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../verifyToken.js";

const router = Router();

// Get all users
router.get("/get-users", verifyToken, getAllUsers);
// Create User
router.post("/create-user", verifyToken, createUser);
// Get a user
router.get("/get-user/:id", verifyToken, getUser);
// Update a user
router.put("/update-user/:id", verifyToken, updateUser);
// Delete User
router.delete("/delete-user/:id", verifyToken, deleteUser);

export default router;
