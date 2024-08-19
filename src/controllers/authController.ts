import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/authService";
import { HttpException } from "../types/httpException";
import { StatusCodes } from "../utils/statusCodes";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await authService.createUser(username as string, password as string);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await authService.verifyLogin(username, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1y",
    });
    res.header("Authorization", token).json({ token });
  } catch (err: any) {
    const httpErr: HttpException = err;
    httpErr.status = StatusCodes.BAD_REQUEST;
    next(httpErr);
  }
};
