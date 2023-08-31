import { Schema } from "mongoose";
export interface ISkill {
  _id?: Schema.Types.ObjectId;
  level: string;
  language: string;
  experience: number;
  percentage: number;
  user?: Schema.Types.ObjectId;
}
