import { Request } from "express";

/* ------------------------------------------------------------------------------ */

//        Request Interface to handle the extra data to be attched to the Request

export interface AuthRequest extends Request {
  file?: any;
  user?: { userId: string; role: string };
}
