import { Router } from "express";

// Middleware
import { authenticate, authorize } from "../middleware/authentication";
// Controller
import { getNearestCollector } from "../controller/collectorController";

/* --------------------------------------------------------------------------------------------------------- */

const router = Router();

router.get("/nearest", authenticate, authorize(["Admin"]), getNearestCollector);

export default router;
