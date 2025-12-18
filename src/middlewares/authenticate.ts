import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";
import db from "../models";

interface AuthenticatedRequest extends Request {
    user?: {
        id: any;
        email: string;
        role: string;
        name: string;
        username: string;
    };
}
const { User } = db;


export const authentication = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    const [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") {
      throw { name: "Unauthorized" };
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      username: user.username,
    };

    next();
  } catch (err) {
    next(err);
  }
};
