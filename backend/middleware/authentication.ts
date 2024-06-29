import { Response, NextFunction } from "express";
// Errors
import { BadRequestError, UnauthenticatedError } from "../errors/allErr";
// Cookie Verification
import { verifyCookie } from "../utils/authUtil";
// Auth Request Interface
import { AuthRequest } from "../interfaces/authRequest";

/* ---------------------------------------------------------------------------------------------------------------------------- */

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get Bearer Token
  const token = req.cookies?.cookie;

  next();
};
