import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export function getSignedJwtToken(
  id: string,
  name: string,
  email: string,
  role: string
) {
  return jwt.sign({ id, name, email, role }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRE || "4d",
  });
}
