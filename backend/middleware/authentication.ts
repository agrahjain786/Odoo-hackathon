import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// Errors
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
} from "../errors/allErr";

// Auth Request Interface
import { AuthRequest } from "../interfaces/authRequest";
// Auth Store
import AuthStore from "../hashmaps/authStore";

/* ---------------------------------------------------------------------------------------------------------------------------- */

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get Bearer Token
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthenticatedError("Sign In required");
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    if (!AuthStore.hasInstance(decoded.id)) {
      const User = `${decoded.role}Model` as any;

      const user = await User.findById(decoded.id);

      if (!user) {
        throw new BadRequestError("User not found");
      }

      AuthStore.setInstance(decoded.id, {
        token,
        ...decoded,
      });
    } else {
      const auth = AuthStore.getInstance(decoded.id) as any;

      if (auth.token !== token) {
        throw new UnauthenticatedError("Sign In required");
      }
    }

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
