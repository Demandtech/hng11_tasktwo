import { Router } from "express";
import { handleGetUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.get("/:id", handleGetUser);

export default userRouter;
