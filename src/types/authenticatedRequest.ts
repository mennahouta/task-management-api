import { Request as ExpressRequest } from "express";

export interface AuthenticatedRequest extends ExpressRequest {
  userId?: string;
}
