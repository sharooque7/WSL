import { Schema, model } from "mongoose";
const skillSchema = new Schema({
    level: { type: String, required: true },
    language: { type: String, required: true },
    experience: { type: Number, required: true },
    percentage: { type: Number, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
}, { timestamps: true });
const skillModel = model("Skill", skillSchema);
export default skillModel;
//# sourceMappingURL=skillModel.js.map