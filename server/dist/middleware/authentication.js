import jsonwebtoken from "jsonwebtoken";
import ApiError from "../error/ApiError.js";
export const verifyToken = async (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
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
    }
    catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(new ApiError(401, "Corrupted token"));
        }
        return next(error);
    }
};
//# sourceMappingURL=authentication.js.map