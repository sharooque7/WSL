import jsonwebtoken from "jsonwebtoken";
import ApiError from "../error/ApiError.js";
import { Request, Response, NextFunction } from "express";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  let decoded;
  try {
    if (!token) {
      throw new ApiError(401, "Access token expired,Please login");
    }
    decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError(401, "Not authenticated");
    }
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Corrupted token"));
    }
    return next(error);
  }
};
