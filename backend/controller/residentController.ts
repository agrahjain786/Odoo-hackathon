import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest";
import { StatusCodes } from "http-status-codes";

// Models
import ReportTicketModel from "../models/reportTicket";

// Errors
import BadRequestError from "../errors/bad-request";

/* --------------------------------------------------------------------------------------------------------- */

export const getResidentRaisedTickets = async (
  req: AuthRequest,
  res: Response
) => {
  const { id } = req.user as any;

  if (!id) {
    throw new BadRequestError("Please provide userId");
  }

  const tickets = await ReportTicketModel.find({ resident: id });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Resident Raised Tickets", tickets });
};
