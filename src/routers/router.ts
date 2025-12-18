import express, { Request, Response } from "express";
import { UsersController } from "../controllers/UserController";
import { authentication } from "../middlewares/authenticate";
import { adminAuth } from "../middlewares/authorization";
import dataRouter from "./data";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/register", authentication, adminAuth, UsersController.register);
router.post("/login", UsersController.login);

router.use("/data", dataRouter);

export default router;
