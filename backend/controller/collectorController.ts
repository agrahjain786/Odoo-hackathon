import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Errors
import BadRequestError from "../errors/bad-request";
// Models
import CollectorModel from "../models/users/collector";

/* --------------------------------------------------------------------------------------------------------- */

/**
 * @route  POST /api/collector/nearest
 * @description   Get Nearest Collector
 * @body   {latitude, longitude}
 * @returns {object} success, message, collector
 */
export const getNearestCollector = async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    throw new BadRequestError("Please provide latitude and longitude");
  }

  const nearestCollector = await CollectorModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        distanceField: "distance",
        maxDistance: 5000,
        spherical: true,
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        phone: 1,
        distance: 1,
      },
    },
  ]);

  if (nearestCollector.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "No collector found",
      collectior: null,
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Nearest Collector",
    collector: nearestCollector,
  });
};
