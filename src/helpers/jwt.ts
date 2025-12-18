import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/index";

const secret = process.env.JWT_SECRET as string;

export const createToken = (payload: JWTPayload): string => {
   return jwt.sign(payload, secret);
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, secret) as JWTPayload;
};
