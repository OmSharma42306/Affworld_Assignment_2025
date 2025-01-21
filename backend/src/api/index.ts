import express from "express"
import { Router } from "express";

const router = Router();
import userRouter from "../routes/user"
import authRouter from "../routes/authRoutes"
import taskRouter from "../routes/tasks"
router.use("/user",userRouter);
router.use("/auth",authRouter)
router.use("/task",taskRouter)
export default router;