import { NextFunction,Request,Response } from "express";
import config from "./config"
const {JWT_SECRET} = config;
import jwt from "jsonwebtoken"


async function authMiddleware(req:Request,res:Response,next:NextFunction){
const authHeader = req.headers["authorization"];
if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({msg:"Authorization Header is Missing!"})
}

const token = authHeader.split(' ')[1];
console.log("Token : ",token);
try{
    const decoded = jwt.verify(token,JWT_SECRET);
    console.log("Decoded Token",decoded);
    // req.userId = decoded.userId;
    next();
}catch(error){
    return res.status(400).json({msg:"Middleware Failed!"})
}

}

export default authMiddleware;