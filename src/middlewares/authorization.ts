import { Request, Response, NextFunction } from "express";

export const adminAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if ((req as any).user?.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
