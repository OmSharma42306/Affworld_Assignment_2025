import express from "express"
import z from "zod"
const router = express.Router();
import jwt from "jsonwebtoken"
import config from "../config"
import authMiddleware from "../middleware";
import { Request,Response } from "express";
import Users from "../db";
const {JWT_SECRET} = config;
router.post('/signup',async(req:Request|any,res:Response|any)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const checkExistingUser = await Users.findOne({email:email});
    if(checkExistingUser){
        return res.json({msg:"User Already Exists!"})
    }

    const newUser = new Users({
        name:name,
        email:email,
        password:password,
    })
    await newUser.save();
    const userId = newUser._id;
    const token = jwt.sign({userId},JWT_SECRET)
    return res.status(200).json({msg:"New User Created!",token:token})
    }catch(error){
        return res.json({msg:error});
    }
})

router.post('/login',async(req:Request | any,res:Response | any)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const checkUser = await Users.findOne({email:email});
        if(!checkUser){
            return res.status(400).json({msg:"User Not Found! Register User!"})
        }
        if(password !== checkUser.password){
            return res.status(400).json({msg:"Invalid Credentials!"});
        }

        const token = jwt.sign({userId:checkUser._id},JWT_SECRET)
        return res.status(200).json({msg:"Login Successful!",token:token})


    }catch(error){

    }
})




export default router