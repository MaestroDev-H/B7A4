import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";

const router = Router();

router.post("/register", validateRequest(registerValidation), AuthControllers.register);
router.post("/login", validateRequest(loginValidation), AuthControllers.login);
router.get("/me", auth(), AuthControllers.getMe);

export const AuthRoutes = router;
