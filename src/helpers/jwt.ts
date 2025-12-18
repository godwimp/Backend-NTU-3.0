import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/index";

const secret = process.env.JWT_SECRET as string;

export const createToken = (payload: JWTPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

export const verifyToken = (token: string): JWTPayload => {
  const payload = jwt.verify(token, secret) as JWTPayload;
  return payload;
};
