import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

/* ---------------------------------------------------------------------------------------------- */

//        Middleware to handle the Unmatched Routes

const notFound = (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, message: "Route does not exist" });
};

export default notFound;
