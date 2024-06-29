import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

// Errors
import BadRequestError from "../errors/bad-request";
// Models
import AdminModel from "../models/users/admin";
import ResidentModel from "../models/users/resident";
import CollectorModel from "../models/users/collector";

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

  if (role === "Admin") {
    user = (await AdminModel.create({
      name,
      email,
      password,
      role,
      phone,
    })) as any;
  } else if (role === "Resident") {
    user = (await ResidentModel.create({
      name,
      email,
      password,
      role,
      phone,
    })) as any;
  } else if (role === "Collector") {
    user = (await CollectorModel.create({
      name,
      email,
      password,
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

  const token: string = user.getSignedJwtToken();

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

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const token: string = user.getSignedJwtToken();

  delete user.password;

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Sign In successfull", user, token });
};
