import { Request, Response, NextFunction } from "express";
import { HttpException } from "../types/httpException";

const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${status} - ${message} - ${req.method} ${req.url} - ${req.ip}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.status(status).json({
    status: "error",
    statusCode: status,
    message: message,
  });
};

export default errorHandler;
