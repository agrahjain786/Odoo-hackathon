import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

/* ----------------------------------------------------------------------------------------------- */

//                      Middleware to handle all the thrown Error

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Create the error
  let customError: { statusCode: number; message: string } = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Server error try again later",
  };

  return res
    .status(customError.statusCode)
    .json({ success: false, message: customError.message });
};

export default errorHandlerMiddleware;
