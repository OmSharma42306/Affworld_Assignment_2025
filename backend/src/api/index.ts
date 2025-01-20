import express from "express"
import { Router } from "express";

const router = Router();
import userRouter from "../routes/user"
import authRouter from "../routes/authRoutes"
router.use("/user",userRouter);
router.use("/auth",authRouter)

export default router;