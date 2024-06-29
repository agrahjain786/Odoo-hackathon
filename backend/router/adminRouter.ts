import { Router } from "express";

// Middleware
import { authenticate, authorize } from "../middleware/authentication";
// Controller
import { getTickets } from "../controller/ticketController";

/* --------------------------------------------------------------------------------------------------------- */

const router = Router();

router.get("/tickets", authenticate, authorize(["Admin"]), getTickets);

export default router;
