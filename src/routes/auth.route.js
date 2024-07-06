import {
	handleCreateUser,
	handleLoginUser,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import { validateMiddleware } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const userRoute = Router();

userRoute.post(
	"/register",
	validateMiddleware(registerSchema),
	handleCreateUser
);
userRoute.post("/login", validateMiddleware(loginSchema), handleLoginUser);

export default userRoute;
