import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

// Interfaces
import { Collector } from "../../interfaces/model";
// Helpers
import { comparePassword, hashPassword } from "../../helpers/hashPassword";

/* -------------------------------------------------------------------------- */

// Collector Schema
const CollectorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

CollectorSchema.index({ location: "2dsphere" });

const CollectorModel = mongoose.model<Collector>("Collector", CollectorSchema);

export default CollectorModel;

// Hashing password before saving
CollectorSchema.pre("save", async function (next) {
  const collector = this;

  if (collector.isModified("password")) {
    const password = collector.password;
    if (typeof password === "string") {
      collector.password = await hashPassword(password);
    } else {
      console.error("Password is not a string.");
      next(new Error("Password must be a string."));
      return;
    }
  }

  next();
});

// Compare password
CollectorSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const collector = this;

  return await comparePassword(password, collector.password);
};

CollectorSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET || "",
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};
