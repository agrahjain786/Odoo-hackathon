import mongoose, { Schema } from "mongoose";

// Interfaces
import { ReportTicket } from "../interfaces/model";

/* -------------------------------------------------------------------------- */

// ReportTicket Schema
const ReportTicketSchema: Schema = new Schema(
  {
    photo: { type: String },
    description: { type: String },
    sector_based_waste: { type: String, required: true },
    type_of_waste: { type: String, required: true },
    special_request: { type: Boolean, required: true, default: false },
    progress: { type: String, required: true },
    quantity: { type: Number, required: true },
    resident: { type: Schema.Types.ObjectId, ref: "Resident", required: true },
    collector: { type: Schema.Types.ObjectId, ref: "Collector" },
    assignedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
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

ReportTicketSchema.index({ location: "2dsphere" });

const ReportTicketModel = mongoose.model<ReportTicket>(
  "ReportTicket",
  ReportTicketSchema
);

export default ReportTicketModel;
