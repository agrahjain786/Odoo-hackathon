import { Router } from "express";

// Middleware
import { authenticate } from "../middleware/authentication";

// Controller
import { signUp, signIn, getUserDetails } from "../controller/authController";
const router = Router();

/* --------------------------------------------------------------------------------------------------------- */

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/user", authenticate, getUserDetails);

export default router;
