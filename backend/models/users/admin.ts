import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

// Interfaces
import { Admin } from "../../interfaces/model";

// Helpers
import { comparePassword, hashPassword } from "../../helpers/hashPassword";

/* -------------------------------------------------------------------------- */

// Admin Schema

const AdminSchema: Schema = new Schema(
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

const AdminModel = mongoose.model<Admin>("Admin", AdminSchema);

export default AdminModel;

// Hashing password before saving
AdminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    const password = admin.password;
    if (typeof password === "string") {
      admin.password = await hashPassword(password);
    } else {
      console.error("Password is not a string.");
      next(new Error("Password must be a string."));
      return;
    }
  }

  next();
});

// Compare password
AdminSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const admin = this;

  return await comparePassword(password, admin.password);
};

AdminSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
