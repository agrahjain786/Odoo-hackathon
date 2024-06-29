import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

// Interfaces
import { Resident } from "../../interfaces/model";
// Helpers
import { comparePassword, hashPassword } from "../../helpers/hashPassword";

/* -------------------------------------------------------------------------- */

// Resident Schema
const ResidentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ResidentModel = mongoose.model<Resident>("Resident", ResidentSchema);

export default ResidentModel;

// Hashing password before saving
ResidentSchema.pre("save", async function (next) {
  const resident = this;

  if (resident.isModified("password")) {
    const password = resident.password;
    if (typeof password === "string") {
      resident.password = await hashPassword(password);
    } else {
      console.error("Password is not a string.");
      next(new Error("Password must be a string."));
      return;
    }
  }

  next();
});

// Compare password
ResidentSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const resident = this;

  return await comparePassword(password, resident.password);
};

ResidentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
