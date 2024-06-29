import { NextFunction, Request, Response } from "express";

/* ---------------------------------------------------------------------------------------------------- */

//          Middleware to change the Response headers of the Server

const resHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Powered-By", "Trash-Tracker-Server");
  res.setHeader("Recognition", "Trash-Tracker");

  res.setHeader("Content-Type", "application/json");

  next();
};

export default resHeaders;
