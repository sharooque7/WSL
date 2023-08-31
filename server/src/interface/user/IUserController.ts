import { Request, Response, NextFunction } from "express";
import { IUser } from "./IUser.js";

export interface IUserController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
}
