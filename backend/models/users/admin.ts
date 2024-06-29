import mongoose, { Schema } from "mongoose";

// Interfaces
import { Admin } from "../../interfaces/model";

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
