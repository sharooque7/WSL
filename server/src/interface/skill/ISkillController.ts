import { ISkill } from "./ISkill.js";
import { Request, Response, NextFunction } from "express";

export interface ISkillController {
  read(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  remove(req: Request, res: Response, next: NextFunction): Promise<void>;
}
