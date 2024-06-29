import { ObjectId } from "mongoose";

export interface Address {
  address: string;
  city: string;
  state: string;
  pincode: number;
}

export interface Location {
  location: {
    type: {
      type: String;
      enum: ["Point"];
      required: true;
    };
    coordinates: {
      type: [Number];
      required: true;
    };
  };
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends Timestamps {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface Admin extends User {
  role: "Admin" | "SuperAdmin" | string;
}

export interface Resident extends User {
  role: "Resident" | string;
}

export interface Collector extends User, Address, Location {
  role: "Collector" | string;
}

export type UserType = "Admin" | "Resident" | "Collector" | null;

export type SectorBasedWaste =
  | "Industrial"
  | "Household"
  | "Market"
  | "Office"
  | string;

export type TypeOfWaste =
  | "Plastic"
  | "Paper"
  | "Metal"
  | "Glass"
  | "Organic"
  | "E-Waste"
  | "";

export type Progress = "Pending" | "In Progress" | "Completed" | "";

export interface ReportTicket extends Timestamps, Location {
  photo: string;
  description: string;
  sector_based_waste: SectorBasedWaste;
  type_of_waste: TypeOfWaste;
  progress: Progress;
  quantity: string;
  special_request: boolean;
  resident: Resident;
  collector: Collector;
  assignedBy: Admin;
}
