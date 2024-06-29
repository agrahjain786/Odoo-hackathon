import { Router } from "express";

// Controller
import { signUp, signIn, } from "../controller/authController";

const router = Router();

/* --------------------------------------------------------------------------------------------------------- */

router.post("/signup", signUp);

router.post("/signin", signIn);


export default router;
