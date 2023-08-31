import bcrypt from "bcrypt";
import vine from "@vinejs/vine";
import jsonwebtoken from "jsonwebtoken";
import userModel from "model/userModel.js";
import ApiError from "../error/ApiError.js";
import { Request, Response, NextFunction } from "express";
import { IUserController } from "interface/user/IUserController.js";
class userController implements IUserController {
  private readonly userModel: typeof userModel;
  constructor(modelUser: typeof userModel) {
    this.userModel = modelUser;
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const loginSchema = vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(5).maxLength(32),
      });
      const validator = vine.compile(loginSchema);
      const output = await validator.validate({ email, password });
      const user = await this.userModel.findOne({
        email: email,
      });
      if (!user) {
        throw new ApiError(404, "User not exist");
      }
      const isValidPassword = await bcrypt.compare(password, user.password!);
      if (!isValidPassword) {
        throw new ApiError(401, "Password incorrect Not Authorized");
      }
      console.log(isValidPassword);
      const key = process.env.JWT_SECRET!;
      const token = jsonwebtoken.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user.email,
        },
        key
      );
      res.status(200).json({ user, token });
    } catch (error: any) {
      console.log(error._message);
      const cases = error._message || error.status;
      switch (cases) {
        case "User validation failed": {
          return next(
            ApiError.badRequest(
              "Validation failed! Please check your input data before sending"
            )
          );
        }
        case 404: {
          return next(ApiError.badRequest("User does not exist register"));
        }
        case 422: {
          return next(
            new ApiError(
              422,
              "Validation failed! Please check your input data before sending"
            )
          );
        }
        case 401: {
          return next(
            new ApiError(401, "Unauthorized! User password incorrect!")
          );
        }
      }
    }
  }
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registerData = req.body;
      const registerSchema = vine.object({
        phone: vine.number(),
        gender: vine.string(),
        lastname: vine.string(),
        password: vine.string(),
        firstname: vine.string(),
        email: vine.string().email(),
      });
      const validator = vine.compile(registerSchema);
      const output = await validator.validate(registerData);
      const existingUser = await this.userModel?.findOne({
        email: registerData.email,
      });
      if (existingUser) {
        throw new ApiError(409, "User exist!");
      }
      const saltRounds = 10;
      const hash = await bcrypt.hash(registerData.password, saltRounds);
      const userHashed = Object.assign(Object.assign({}, registerData), {
        password: hash,
      });
      const user = await new this.userModel(userHashed).save();
      res.status(201).json(user);
    } catch (error: any) {
      console.log(error);
      console.log(error._message);
      const cases = error._message || error.status;
      switch (cases) {
        case "User validation failed": {
          return next(
            ApiError.badRequest(
              "Validation failed! Please check your input data before sending"
            )
          );
        }
        case "User exist!": {
          return next(
            ApiError.badRequest(
              "Validation failed! Please check your input data before sending"
            )
          );
        }
        case 422: {
          return next(
            new ApiError(
              422,
              "Validation failed! Please check your input data before sending"
            )
          );
        }
        case 409: {
          return next(new ApiError(409, "User already exist please login!"));
        }
      }
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.body;
      const user = await this.userModel.findOneAndUpdate(
        { _id },
        Object.assign({}, req.body),
        {
          new: true,
        }
      );
      res.status(201).json(user);
    } catch (error: any) {
      console.log(error);
      return next(new ApiError(500, "Something went wrong"));
    }
  }
}
export default userController;
