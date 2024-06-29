import mongoose, { Schema } from "mongoose";

// Interfaces
import { Resident } from "../../interfaces/model";

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
