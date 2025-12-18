import { Request, Response, NextFunction } from "express";
import { comparePassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jwt";
import db from "../models";

const { User } = db;

export class UsersController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, username, email, password } = req.body;
      await User.create({ name, username, email, password });
      const data = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });
      
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) {
        throw { name: "Invalid username or password." };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Invalid username or password." };
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { name: "Invalid password" };
      }

      const token = createToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        username: user.username,
      });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
}
