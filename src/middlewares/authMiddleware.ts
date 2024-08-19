import { AuthenticatedRequest } from "../types/authenticatedRequest";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "../utils/statusCodes";

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send("Access Denied");
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    req.userId = verifiedToken.id;
    next();
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send("Invalid Token");
  }
};
