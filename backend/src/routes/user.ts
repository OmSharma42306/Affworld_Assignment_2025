import express from "express"
import z from "zod"
const router = express.Router();
import jwt from "jsonwebtoken"
import config from "../config"
import authMiddleware from "../middleware";
import { Request,Response } from "express";
import Users from "../db";
import transporter from "../emailService";
import crypto from "crypto"
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

router.post('/forgot-password',async(req:Request | any,res: Response | any)=>{
    const email = req.body.email;

    try{
        const user = await Users.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"User not Found!"})
        }

        // generate otp.

        const otp = crypto.randomInt(100000,999999).toString();
        const otpExpiry = new Date(Date.now() + 10*60*1000); // otp valid for 10 minutes.   

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();



        // send otp via email!
        const mailOptions = {
            from : "omsharma.83173@gmail.com",
            to : email,
            subject : "Password Reset OTP",
            text : `Your OTP for Password Reset is : ${otp}`,
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({message:"OTP sent to your email!"})

    }catch(error){
        return res.status(400).json({msg:error});
    }
})


// verify otp 

router.post('/verify-otp',async(req:Request | any, res:Response | any)=>{
    const email = req.body.email;
    const otp = req.body.otp;

    try{
        const user = await Users.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User Not Found!"});

        if(user.otp !== otp){
            return res.status(401).json({msg:"Invalid otp or Expired Otp!"});

        }
        user.otp = null
        user.otpExpiry = null
        await user.save();
        res.status(200).json({status:"Success",msg:"OTP Verified!, Proceed to Reset Password!"})
    }catch(error){
        return res.status(400).json({msg:error})
    }
})


router.post('/reset-password',async(req:Request | any, res:Response | any)=>{
const email = req.body.email;
const password = req.body.password;

try{
    const user = await Users.findOne({email:email});
    if(!user){
        return res.status(401).json({msg:"User not Found!"})
    }
    user.password = password;
    await user.save();
    return res.status(200).json({status:"Success",msg:"Password reset Successfully!"});

}catch(error){
    return res.status(400).json({msg:error});
}


})

export default router