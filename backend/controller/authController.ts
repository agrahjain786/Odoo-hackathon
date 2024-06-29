import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

// Errors
import BadRequestError from "../errors/bad-request";
// Models
import AdminModel from "../models/users/admin";
import ResidentModel from "../models/users/resident";
import CollectorModel from "../models/users/collector";
// Helpers
import { getSignedJwtToken } from "../helpers/jwt";
import { comparePassword } from "../helpers/bcrypt";
import { hashPassword } from "./../helpers/bcrypt";
import { AuthRequest } from "../interfaces/authRequest";

/* --------------------------------------------------------------------------------------------------------- */

/**
 * @route  POST /api/auth/signup
 * @description   Sign Up
 * @body   {name, email, password, role, address, city, state, pincode, latitude, longitude}
 * @returns {object} success, message, token
 */
export const signUp = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    address,
    city,
    state,
    pincode,
    latitude,
    longitude,
  } = req.body;

  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email, password and role");
  }

  if (
    role === "Collector" &&
    (!address || !city || !state || !pincode || !latitude || !longitude)
  ) {
    throw new BadRequestError(
      "Please provide address, city, state, pincode, latitude and longitude"
    );
  }

  let user: any = null;

  const hashedPassword = await hashPassword(password);

  if (role === "Admin") {
    user = (await AdminModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    })) as any;
  } else if (role === "Resident") {
    user = (await ResidentModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    })) as any;
  } else if (role === "Collector") {
    user = (await CollectorModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      address,
      city,
      state,
      pincode,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    })) as any;
  }

  if (!user) {
    throw new Error();
  }

  const token: string = getSignedJwtToken(user._id, name, email, role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, message: "Sign Up successfull", token });
};

/**
 * @route  POST /api/auth/signin
 * @description   Sign In
 * @body   {email, password, role}
 * @returns {object} success, message, user, token
 */
export const signIn = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email, password and role");
  }

  let user: any = null;

  if (role === "Admin") {
    user = await AdminModel.findOne({
      email,
    });
  } else if (role === "Resident") {
    user = await ResidentModel.findOne({
      email,
    });
  } else if (role === "Collector") {
    user = await CollectorModel.findOne({
      email,
    });
  }

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const token: string = getSignedJwtToken(user._id, user.name, email, role);

  delete user.password;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Sign In successfull", user, token });
};

/**
 * @route  GET /api/auth/user
 * @description   Get User Details
 * @returns {object} success, message, user
 */
export const getUserDetails = async (req: AuthRequest, res: Response) => {
  const { id, role } = req.user as any;

  if (!id || !role) {
    throw new BadRequestError("Please provide id and role");
  }

  let user: any = null;

  if (role === "Admin") {
    user = await AdminModel.findById(id);
  } else if (role === "Resident") {
    user = await ResidentModel.findById(id);
  } else if (role === "Collector") {
    user = await CollectorModel.findById(id);
  }

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "User details", user });
};
