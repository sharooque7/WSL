import { Schema, model } from "mongoose";
const userSchema = new Schema({
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    password: { type: String, require: true },
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
}, { timestamps: true });
const userModel = model("User", userSchema);
export default userModel;
//# sourceMappingURL=userModel.js.map