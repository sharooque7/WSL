// @ts-ignore
import vine from "@vinejs/vine";
import { ObjectId } from "bson";
import ApiError from "../error/ApiError.js";
class skillController {
    skillModel;
    constructor(modelSkill) {
        this.skillModel = modelSkill;
    }
    async create(req, res, next) {
        try {
            const skillSchema = vine.object({
                user: vine.string(),
                level: vine.string(),
                language: vine.string(),
                percentage: vine.number(),
                experience: vine.number(),
            });
            const validator = vine.compile(skillSchema);
            const output = await validator.validate(req.body);
            const skill = await new this.skillModel({
                user: new ObjectId(req.body.user),
                ...req.body,
            }).save();
            res.status(201).json(skill);
        }
        catch (error) {
            console.log(error);
            const cases = error._message || error.status;
            switch (cases) {
                case "User validation failed": {
                    return next(ApiError.badRequest("Validation failed! Please check your input data before sending"));
                }
                case 422: {
                    return next(new ApiError(422, "Validation failed! Please check your input data before sending"));
                }
            }
        }
    }
    async read(req, res, next) {
        try {
            const { user } = req.body;
            const skills = await this.skillModel.find({
                user: new ObjectId(user),
            });
            res.status(200).json(skills);
        }
        catch (error) {
            console.log(error);
            const cases = error._message || error.status;
            switch (cases) {
                case "User validation failed": {
                    return next(ApiError.badRequest("Validation failed! Please check your input data before sending"));
                }
                case 422: {
                    return next(new ApiError(422, "Validation failed! Please check your input data before sending"));
                }
                case 409: {
                    return next(new ApiError(409, "User already exist please login!"));
                }
            }
        }
    }
    async update(req, res, next) {
        try {
            console.log(req.body);
            const { _id } = req.body;
            const updateSchema = vine.object({
                user: vine.string(),
                level: vine.string(),
                language: vine.string(),
                percentage: vine.number(),
                experience: vine.number(),
            });
            const validator = vine.compile(updateSchema);
            const output = await validator.validate(req.body);
            const update = await this.skillModel.findByIdAndUpdate({ _id: new ObjectId(_id) }, { ...req.body }, { new: true });
            res.status(201).json(update);
        }
        catch (error) {
            console.log(error);
        }
    }
    async remove(req, res, next) {
        try {
            console.log(req.body);
            const { _id } = req.body;
            console.log(_id);
            const isDeleted = await this.skillModel.findByIdAndDelete({
                _id: new ObjectId(_id),
            }, { new: true });
            res.status(200).json(isDeleted);
        }
        catch (error) {
            console.log(error);
        }
    }
    async pull(req, res, next) {
        try {
            console.log("pull");
            const skills = await this.skillModel.find();
            res.status(200).json(skills);
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default skillController;
//# sourceMappingURL=skillController.js.map