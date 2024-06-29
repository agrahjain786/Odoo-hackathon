import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Errors
import { ForbiddenError, UnauthenticatedError } from "../errors/allErr";

// Auth Request Interface
import { AuthRequest } from "../interfaces/authRequest";

/* ---------------------------------------------------------------------------------------------------------------------------- */

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get Bearer Token
  const token = req.headers?.token || (req.cookies?.token as any);

  if (!token) {
    throw new UnauthenticatedError("Sign In required");
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    // Attach User to Request
    req.user = decoded as any;

    next();
  } catch (error) {
    throw new UnauthenticatedError("Sign In required");
  }

  next();
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req?.user?.role && !roles.includes(req?.user?.role)) {
      throw new ForbiddenError("Not authorized to access");
    }

    next();
  };
};
