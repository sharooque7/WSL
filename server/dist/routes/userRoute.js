import { Router } from "express";
import userModel from "../model/userModel.js";
import userController from "../controller/userController.js";
const router = Router();
const user = new userController(userModel);
router.route("/login").post(user.login.bind(user));
router.route("/update").put(user.update.bind(user));
router.route("/register").post(user.register.bind(user));
// router
//   .route("/login")
//   .get((req: Request, res: Response, next: NextFunction) => {
//     user.login(req, res, next);
//   });
export default router;
//# sourceMappingURL=userRoute.js.map