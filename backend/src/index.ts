import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import rootRouter from "./api/index"
import Users from "./db";
const app = express();
const PORT = 3000
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1",rootRouter);

app.get('/',async(req:Request|any,res:Response|any)=>{
    try{
        const newUser = new Users({
            name:"OmSharma",
            email:"omsharma.8317333333@gmail.com",
            password : "123444444"
        })
        await newUser.save();
        return res.json({msg:"I am from Backend!"});
    }catch(error){
        return res.json({msg:error});    
    }
    
})

app.listen(PORT,()=>{
    console.log(`Server Started at PORT :${PORT}`)
})