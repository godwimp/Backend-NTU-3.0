import { Request, Response, NextFunction } from "express";

export const adminAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (user?.role !== "admin") {
      throw { name: "Forbidden Access" };
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};