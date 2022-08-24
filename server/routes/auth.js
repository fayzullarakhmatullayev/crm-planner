import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.js";

const router = Router();

//Create a user
router.post("/signup", SignUp);
//Sign in
router.post("/signin", SignIn);

export default router;
