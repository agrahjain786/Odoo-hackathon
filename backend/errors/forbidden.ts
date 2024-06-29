import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class ForbiddenError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN; // 403
  }
}

export default ForbiddenError;
