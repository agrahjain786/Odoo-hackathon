import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest";
import { StatusCodes } from "http-status-codes";

// Models
import ReportTicketModel from "../models/reportTicket";
// Errors
import BadRequestError from "../errors/bad-request";
// Services
import { uploadImageData } from "../../service/aws-S3";

/* --------------------------------------------------------------------------------------------------------- */

/**
 * @route  POST /api/ticket/create
 * @description   Create a Ticket
 * @body   {photo, description, sector_based_waste, type_of_waste, special_request, quantity, latitude, longitude}
 * @returns {object} success, message
 */
export const createTicket = async (req: AuthRequest, res: Response) => {
  const {
    photo,
    description,
    sector_based_waste,
    type_of_waste,
    special_request = false,
    quantity,
    latitude,
    longitude,
  } = req.body;

  const { userId } = req.user as any;

  if (
    !photo ||
    !description ||
    !sector_based_waste ||
    !type_of_waste ||
    !quantity ||
    !latitude ||
    !longitude
  ) {
    throw new BadRequestError("Please provide all the required fields");
  }

  let url = "";

  const file = req.file as any;

  if (file) {
    url = await uploadImageData(
      file.buffer,
      `/images/${Date.now()}_${ile}/${file.mimetype}`
    );
  }

  const ticket = await ReportTicketModel.create({
    photo: url,
    description,
    sector_based_waste,
    type_of_waste,
    special_request,
    quantity,
    resident: userId,
    progress: "Pending",
    location: {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude],
    },
  });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "Ticket created" });
};

/**
 * @route  PATCH /api/ticket/assign/:ticketId
 * @description   Assign a Ticket
 * @param   ticketId
 * @body   {collectorId}
 * @returns {object} success, message, ticket
 */
export const assignTicket = async (req: AuthRequest, res: Response) => {
  const { ticketId } = req.params;
  const { collectorId } = req.body;

  if (!collectorId) {
    throw new BadRequestError("Please provide collectorId");
  }

  if (!ticketId) {
    throw new BadRequestError("Please provide ticketId");
  }

  const ticket = await ReportTicketModel.findByIdAndUpdate(
    ticketId,
    { collector: collectorId, progress: "In Progress" },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Ticket assigned", ticket });
};

/**
 * @route  PATCH /api/ticket/complete/:ticketId
 * @description   Complete a Ticket
 * @param   ticketId
 * @returns {object} success, message, ticket
 */
export const completeTicket = async (req: AuthRequest, res: Response) => {
  const { ticketId } = req.params;

  if (!ticketId) {
    throw new BadRequestError("Please provide ticketId");
  }

  const ticket = await ReportTicketModel.findByIdAndUpdate(
    ticketId,
    { progress: "Completed" },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Ticket completed", ticket });
};

export const getTickets = async (req: AuthRequest, res: Response) => {
  let { page = 1, limit = 10 } = req.query;
  const { latitude, longitude } = req.body;

  page = +page;
  limit = Math.min(+limit, 50);

  // Get ticekts based on location use aggregation pipeline and 2d sphere index

  const tickets = await ReportTicketModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: 10000,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);

  res.status(StatusCodes.OK).json({ success: true, tickets });
};
