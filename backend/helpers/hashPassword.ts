import bcrypt from "bcrypt";

/* -------------------------------------------------------------------------- */

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(
    process.env.PASSWORD_SALT || "",
    process.env.SALT_ROUNDS || "8"
  );
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
