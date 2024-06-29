import { Router } from "express";

// Helpers
import upload from "./../helpers/multer";

// Controller
import {
  assignTicket,
  completeTicket,
  createTicket,
  getTickets,
  // getTicket
} from "../controller/ticketController";
import { authenticate, authorize } from "../middleware/authentication";

const router = Router();

/* --------------------------------------------------------------------------------------------------------- */

router.post(
  "/create",
  authenticate,
  authorize(["Resident"]),
  upload.single("photo"),
  createTicket
);

router.patch(
  "/assign/:ticketId",
  authenticate,
  authorize(["Admin"]),
  assignTicket
);

router.patch(
  "/complete/:ticketId",
  authenticate,
  authorize(["Admin"]),
  completeTicket
);

router.get("/getTicekts", authenticate, authorize(["Admin"]), getTickets);

// router.get(
//   "/ticekt/:ticketId",
//   authenticate,
//   authorize(["Admin", "Resident", "Collector"]),
//   getTicket
// );

export default router;
