import { Router } from "express";
import AuthController from "./authController";
import isAuthenticated from "../../middlewares/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/logout", isAuthenticated, AuthController.logout);
router.get("/me", isAuthenticated, AuthController.getCurrentUser);

const authRouter = router;
export default authRouter;