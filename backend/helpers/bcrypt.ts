import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

/* -------------------------------------------------------------------------- */

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_SALT_ROUNDS || "10")
  );
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
