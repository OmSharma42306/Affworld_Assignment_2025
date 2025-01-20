import express from "express"
import { Router } from "express";

const router = Router();
import userRouter from "../routes/user"

router.use("/user",userRouter);

export default router;