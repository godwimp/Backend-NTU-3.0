import { Request } from "express";

export interface AuthenticatedUser {
  id: number;
  email: string;
  role: string;
  name: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
