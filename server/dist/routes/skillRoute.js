import { Router } from "express";
import skillModel from "../model/skillModel.js";
import { verifyToken } from "../middleware/authentication.js";
import skillController from "../controller/skillController.js";
const router = Router();
const skill = new skillController(skillModel);
router.route("/pull").get(skill.pull.bind(skill));
router.route("/read").post(verifyToken, skill.read.bind(skill));
router.route("/update").put(verifyToken, skill.update.bind(skill));
router.route("/create").post(verifyToken, skill.create.bind(skill));
router.route("/remove").delete(verifyToken, skill.remove.bind(skill));
export default router;
//# sourceMappingURL=skillRoute.js.map